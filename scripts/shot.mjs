#!/usr/bin/env node
/**
 * Screenshot a route in a chosen theme, over the Chrome DevTools Protocol.
 *
 * The old recipe — `--blink-settings=preferredColorScheme=0` — stopped working
 * silently somewhere before Chrome 152: the flag is ignored and you get a
 * light screenshot in a file named `dark.png`. Since half this app's bugs live
 * in one theme only, a dark check that quietly runs in light is worse than no
 * check at all. CDP's Emulation.setEmulatedMedia still does the job.
 *
 *   node scripts/shot.mjs <url> <out.png> [--dark] [--mobile] [--full]
 *                                         [--width=1280] [--height=900]
 *                                         [--eval="<js>"]
 *
 * --eval runs an expression in the page before the shutter, which is how you
 * photograph a state a URL cannot reach on its own — an open mobile drawer, an
 * expanded section, a drill mid-answer.
 *
 * Needs Node 22+ (global WebSocket) and google-chrome on PATH. No deps.
 */
import { spawn } from "node:child_process";
import { mkdtemp, rm } from "node:fs/promises";
import { writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const args = process.argv.slice(2);
const flag = (n) => args.includes(`--${n}`);
const opt = (n, d) => {
  const hit = args.find((a) => a.startsWith(`--${n}=`));
  return hit ? Number(hit.split("=")[1]) : d;
};
const str = (n) => {
  const hit = args.find((a) => a.startsWith(`--${n}=`));
  return hit ? hit.slice(`--${n}=`.length) : null;
};
const [url, out] = args.filter((a) => !a.startsWith("--"));

if (!url || !out) {
  console.error("usage: node scripts/shot.mjs <url> <out.png> [--dark] [--mobile] [--full]");
  process.exit(1);
}

const mobile = flag("mobile");
const width = opt("width", mobile ? 430 : 1280);
const height = opt("height", mobile ? 900 : 900);
const port = 9222 + Math.floor(Math.random() * 900);
const profile = await mkdtemp(join(tmpdir(), "shot-"));

const chrome = spawn(
  "google-chrome",
  [
    "--headless",
    "--disable-gpu",
    "--no-sandbox",
    "--hide-scrollbars",
    `--remote-debugging-port=${port}`,
    `--user-data-dir=${profile}`,
    "about:blank",
  ],
  { stdio: "ignore" }
);

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function browserSocket() {
  for (let i = 0; i < 100; i++) {
    try {
      const res = await fetch(`http://127.0.0.1:${port}/json/version`);
      return (await res.json()).webSocketDebuggerUrl;
    } catch {
      await sleep(100);
    }
  }
  throw new Error("Chrome never opened its debugging port");
}

let id = 0;
const pending = new Map();
const ws = new WebSocket(await browserSocket());
await new Promise((r) => (ws.onopen = r));
ws.onmessage = (e) => {
  const msg = JSON.parse(e.data);
  if (msg.id && pending.has(msg.id)) {
    const { resolve, reject } = pending.get(msg.id);
    pending.delete(msg.id);
    if (msg.error) reject(new Error(msg.error.message));
    else resolve(msg.result);
  }
};

const send = (method, params = {}, sessionId) =>
  new Promise((resolve, reject) => {
    const n = ++id;
    pending.set(n, { resolve, reject });
    ws.send(JSON.stringify({ id: n, method, params, sessionId }));
  });

try {
  const { targetId } = await send("Target.createTarget", { url: "about:blank" });
  const { sessionId } = await send("Target.attachToTarget", { targetId, flatten: true });
  const s = sessionId;

  await send("Emulation.setDeviceMetricsOverride",
    { width, height, deviceScaleFactor: 1, mobile }, s);

  /* prefers-reduced-motion is not optional: without it a page transition
     leaves the shot half-faded and the colours cannot be judged. */
  await send("Emulation.setEmulatedMedia", {
    features: [
      { name: "prefers-color-scheme", value: flag("dark") ? "dark" : "light" },
      { name: "prefers-reduced-motion", value: "reduce" },
    ],
  }, s);

  await send("Page.enable", {}, s);
  await send("Page.navigate", { url }, s);
  await sleep(1800); // let webfonts land before the shutter

  const script = str("eval");
  if (script) {
    const { exceptionDetails } = await send(
      "Runtime.evaluate", { expression: script, awaitPromise: true }, s);
    if (exceptionDetails) throw new Error(`--eval failed: ${exceptionDetails.text}`);
    await sleep(500); // let whatever it triggered settle
  }

  const params = { format: "png" };
  if (flag("full")) {
    const { cssContentSize } = await send("Page.getLayoutMetrics", {}, s);
    params.captureBeyondViewport = true;
    params.clip = {
      x: 0, y: 0,
      width: cssContentSize.width,
      height: cssContentSize.height,
      scale: 1,
    };
  }
  const { data } = await send("Page.captureScreenshot", params, s);
  writeFileSync(out, Buffer.from(data, "base64"));
  console.log(`${out}  ${width}x${height}  ${flag("dark") ? "dark" : "light"}`);
} finally {
  ws.close();
  chrome.kill();
  /* Chrome is still flushing its profile as it exits; a failed cleanup of a
     temp dir is not worth failing the screenshot over. */
  await sleep(300);
  await rm(profile, { recursive: true, force: true }).catch(() => {});
}
