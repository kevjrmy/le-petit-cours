#!/usr/bin/env node
/**
 * Generate every app icon from public/logo-mark.svg.
 *
 * The mark is the cursive P lifted from the "Petit" of public/logo.svg — the
 * same Playwrite FR Trad outlines as the wordmark, so the icon and the logo are
 * literally the same hand. A wordmark cannot be an icon (eleven letters of
 * hairline script do not survive 48px, let alone a circle), but one letterform
 * on a solid ground does.
 *
 * White on #0044AA, always opaque: a transparent icon vanishes into a dark home
 * screen, which is what the previous set did.
 *
 *   node scripts/make-icons.mjs
 *
 * Needs Node 22+ (global WebSocket) and google-chrome on PATH. No dependencies.
 * Chrome is only a rasteriser here; the SVG is the source of truth.
 */
import { spawn } from "node:child_process";
import { mkdtemp, rm } from "node:fs/promises";
import { readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { deflateSync, inflateSync } from "node:zlib";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const BRAND = "#0044AA";
const INK = "#FFFFFF";

const markSvg = readFileSync(join(ROOT, "public/logo-mark.svg"), "utf8");
/* The full wordmark, recoloured white. It is outlined paths with the brand blue
   baked into a style attribute, so a string replace is the whole job — and it
   keeps the share image and the logo the same artwork rather than a copy. */
const wordmarkSvg = readFileSync(join(ROOT, "public/logo.svg"), "utf8")
  .replace(/fill:#0044aa/gi, "fill:#ffffff");
const viewBox = markSvg.match(/viewBox="0 0 ([\d.]+) ([\d.]+)"/);
const [, GW, GH] = viewBox.map(Number);
const glyphPath = markSvg.match(/ d="([^"]+)"/)[1];

/**
 * A full-bleed square: brand ground, white glyph centred at `pct` of the height.
 * `pct` is the one number that matters — 60 keeps the glyph inside the maskable
 * safe zone (a centred circle 80% of the icon wide), 68 is the normal weight,
 * and 78 gives the 16/32px favicon tiles enough presence to read in a tab.
 */
function compose(size, pct) {
  const gh = (size * pct) / 100;
  const gw = (gh * GW) / GH;
  const x = (size - gw) / 2;
  const y = (size - gh) / 2;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">` +
    `<rect width="${size}" height="${size}" fill="${BRAND}"/>` +
    `<g transform="translate(${x.toFixed(3)} ${y.toFixed(3)}) scale(${(gh / GH).toFixed(6)})">` +
    `<path fill="${INK}" d="${glyphPath}"/></g></svg>`;
}

/** The link-share card: the wordmark on the brand ground, nothing else. No
 *  text beyond the logo, so the image needs no font and cannot render in
 *  whatever face the rasteriser happens to have. */
function ogCard(width, height) {
  return `<div style="width:${width}px;height:${height}px;background:${BRAND};` +
    `display:flex;align-items:center;justify-content:center">` +
    `<div style="width:${Math.round(width * 0.62)}px">${wordmarkSvg
      .replace(/\swidth="[^"]*"/, ' width="100%"')
      .replace(/\sheight="[^"]*"/, ' height="auto"')}</div></div>`;
}

const page = (svg) =>
  "data:text/html;charset=utf-8," +
  encodeURIComponent(`<!doctype html><style>html,body{margin:0;padding:0;background:${BRAND}}
  svg{display:block}</style>${svg}`);


/* ── PNG re-encoding ─────────────────────────────────────────────────────────
   Chrome encodes a fully opaque capture as RGB and drops the alpha channel.
   Next's ICO decoder rejects that outright — "The PNG is not in RGBA format!" —
   so the favicon tiles are decoded and re-encoded with an alpha channel. Every
   pixel stays opaque; only the channel count changes. */

const CRC_TABLE = (() => {
  const t = new Int32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c;
  }
  return t;
})();

function crc32(buf) {
  let c = -1;
  for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ -1) >>> 0;
}

function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const body = Buffer.concat([Buffer.from(type, "latin1"), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body));
  return Buffer.concat([len, body, crc]);
}

const paeth = (a, b, c) => {
  const p = a + b - c;
  const pa = Math.abs(p - a), pb = Math.abs(p - b), pc = Math.abs(p - c);
  return pa <= pb && pa <= pc ? a : pb <= pc ? b : c;
};

/** Decode an 8-bit non-interlaced PNG to { width, height, rgba }. */
function decodePng(buf) {
  let pos = 8; // skip the signature
  let ihdr = null;
  const idat = [];
  while (pos < buf.length) {
    const len = buf.readUInt32BE(pos);
    const type = buf.toString("latin1", pos + 4, pos + 8);
    const data = buf.subarray(pos + 8, pos + 8 + len);
    if (type === "IHDR") ihdr = data;
    else if (type === "IDAT") idat.push(data);
    else if (type === "IEND") break;
    pos += 12 + len;
  }
  const width = ihdr.readUInt32BE(0);
  const height = ihdr.readUInt32BE(4);
  const depth = ihdr[8], colorType = ihdr[9], interlace = ihdr[12];
  const channels = { 0: 1, 2: 3, 4: 2, 6: 4 }[colorType];
  if (depth !== 8 || interlace !== 0 || !channels) {
    throw new Error(`unsupported PNG: depth ${depth}, colour type ${colorType}, interlace ${interlace}`);
  }

  const raw = inflateSync(Buffer.concat(idat));
  const stride = width * channels;
  const out = Buffer.alloc(height * stride);
  let prev = Buffer.alloc(stride);
  for (let y = 0; y < height; y++) {
    const filter = raw[y * (stride + 1)];
    const row = Buffer.from(raw.subarray(y * (stride + 1) + 1, (y + 1) * (stride + 1)));
    for (let i = 0; i < stride; i++) {
      const a = i >= channels ? row[i - channels] : 0;
      const b = prev[i];
      const c = i >= channels ? prev[i - channels] : 0;
      if (filter === 1) row[i] = (row[i] + a) & 0xff;
      else if (filter === 2) row[i] = (row[i] + b) & 0xff;
      else if (filter === 3) row[i] = (row[i] + ((a + b) >> 1)) & 0xff;
      else if (filter === 4) row[i] = (row[i] + paeth(a, b, c)) & 0xff;
      else if (filter !== 0) throw new Error(`bad filter ${filter}`);
    }
    row.copy(out, y * stride);
    prev = row;
  }

  const rgba = Buffer.alloc(width * height * 4);
  for (let i = 0, n = width * height; i < n; i++) {
    const s = i * channels, d = i * 4;
    if (channels >= 3) {
      rgba[d] = out[s]; rgba[d + 1] = out[s + 1]; rgba[d + 2] = out[s + 2];
      rgba[d + 3] = channels === 4 ? out[s + 3] : 255;
    } else {
      rgba[d] = rgba[d + 1] = rgba[d + 2] = out[s];
      rgba[d + 3] = channels === 2 ? out[s + 1] : 255;
    }
  }
  return { width, height, rgba };
}

/** Encode RGBA pixels as an 8-bit RGBA PNG, one unfiltered scanline per row. */
function encodeRgbaPng({ width, height, rgba }) {
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;    // bit depth
  ihdr[9] = 6;    // colour type: truecolour with alpha
  const stride = width * 4;
  const raw = Buffer.alloc(height * (stride + 1));
  for (let y = 0; y < height; y++) {
    raw[y * (stride + 1)] = 0; // filter: none
    rgba.copy(raw, y * (stride + 1) + 1, y * stride, (y + 1) * stride);
  }
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk("IHDR", ihdr),
    chunk("IDAT", deflateSync(raw, { level: 9 })),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

const toRgba = (png) => encodeRgbaPng(decodePng(png));

/* ── minimal CDP client ──────────────────────────────────────────────────── */
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const port = 9500 + Math.floor(Math.random() * 400);
const profile = await mkdtemp(join(tmpdir(), "icons-"));
const chrome = spawn("google-chrome", [
  "--headless", "--disable-gpu", "--no-sandbox", "--hide-scrollbars",
  `--remote-debugging-port=${port}`, `--user-data-dir=${profile}`, "about:blank",
], { stdio: "ignore" });

async function wsUrl() {
  for (let i = 0; i < 100; i++) {
    try {
      const r = await fetch(`http://127.0.0.1:${port}/json/version`);
      return (await r.json()).webSocketDebuggerUrl;
    } catch { await sleep(100); }
  }
  throw new Error("Chrome never opened its debugging port");
}

let id = 0;
const pending = new Map();
const ws = new WebSocket(await wsUrl());
await new Promise((r) => (ws.onopen = r));
ws.onmessage = (e) => {
  const m = JSON.parse(e.data);
  if (m.id && pending.has(m.id)) {
    const { resolve, reject } = pending.get(m.id);
    pending.delete(m.id);
    if (m.error) reject(new Error(m.error.message));
    else resolve(m.result);
  }
};
const send = (method, params = {}, sessionId) =>
  new Promise((resolve, reject) => {
    const n = ++id;
    pending.set(n, { resolve, reject });
    ws.send(JSON.stringify({ id: n, method, params, sessionId }));
  });

/** Rasterise one composition to a PNG buffer at exactly size x size. */
async function render(session, size, pct) {
  await send("Emulation.setDeviceMetricsOverride",
    { width: size, height: size, deviceScaleFactor: 1, mobile: false }, session);
  await send("Page.navigate", { url: page(compose(size, pct)) }, session);
  await sleep(220);
  const { data } = await send("Page.captureScreenshot", { format: "png" }, session);
  return Buffer.from(data, "base64");
}

/** ICO is a 6-byte header, then 16 bytes per image, then the PNGs verbatim. */
function ico(images) {
  const head = Buffer.alloc(6);
  head.writeUInt16LE(0, 0);            // reserved
  head.writeUInt16LE(1, 2);            // 1 = icon
  head.writeUInt16LE(images.length, 4);
  const dir = Buffer.alloc(16 * images.length);
  let offset = head.length + dir.length;
  images.forEach(({ size, png }, i) => {
    const o = i * 16;
    dir.writeUInt8(size >= 256 ? 0 : size, o);
    dir.writeUInt8(size >= 256 ? 0 : size, o + 1);
    dir.writeUInt8(0, o + 2);          // palette size
    dir.writeUInt8(0, o + 3);          // reserved
    dir.writeUInt16LE(1, o + 4);       // colour planes
    dir.writeUInt16LE(32, o + 6);      // bits per pixel
    dir.writeUInt32LE(png.length, o + 8);
    dir.writeUInt32LE(offset, o + 12);
    offset += png.length;
  });
  return Buffer.concat([head, dir, ...images.map((i) => i.png)]);
}

try {
  const { targetId } = await send("Target.createTarget", { url: "about:blank" });
  const { sessionId } = await send("Target.attachToTarget", { targetId, flatten: true });
  await send("Page.enable", {}, sessionId);

  const pngs = [
    ["public/pwa-64x64.png", 64, 68],
    ["public/pwa-192x192.png", 192, 68],
    ["public/pwa-512x512.png", 512, 68],
    /* A file convention, not a public/ asset: iOS only auto-discovers
       /apple-touch-icon.png at the root, and declaring metadata.icons to
       point at a custom name replaces the other conventions instead of
       adding to it — which silently drops icon.svg from the head. */
    ["src/app/apple-icon.png", 180, 68],
    /* The maskable is the only one that has to survive Android's circle, so it
       is the only one that pays for the safe zone. */
    ["public/maskable-icon-512x512.png", 512, 60],
  ];
  for (const [file, size, pct] of pngs) {
    writeFileSync(join(ROOT, file), await render(sessionId, size, pct));
    console.log(`  ${file}  ${size}px @ ${pct}%`);
  }

  /* Optically sized: the small tiles carry a larger glyph, because a browser
     tab has no mask to respect and 16px of hairline script needs the width. */
  const tiles = [
    { size: 16, png: toRgba(await render(sessionId, 16, 78)) },
    { size: 32, png: toRgba(await render(sessionId, 32, 78)) },
    { size: 48, png: toRgba(await render(sessionId, 48, 68)) },
  ];
  writeFileSync(join(ROOT, "src/app/favicon.ico"), ico(tiles));
  console.log("  src/app/favicon.ico  16 + 32 + 48");

  writeFileSync(join(ROOT, "src/app/icon.svg"), compose(512, 68) + "\n");
  console.log("  src/app/icon.svg  vector, for browsers that take it");

  await send("Emulation.setDeviceMetricsOverride",
    { width: 1200, height: 630, deviceScaleFactor: 1, mobile: false }, sessionId);
  await send("Page.navigate", { url: page(ogCard(1200, 630)) }, sessionId);
  await sleep(300);
  const og = await send("Page.captureScreenshot", { format: "png" }, sessionId);
  writeFileSync(join(ROOT, "src/app/opengraph-image.png"), Buffer.from(og.data, "base64"));
  console.log("  src/app/opengraph-image.png  1200x630 link-share card");
} finally {
  ws.close();
  chrome.kill();
  await sleep(300);
  await rm(profile, { recursive: true, force: true }).catch(() => {});
}
