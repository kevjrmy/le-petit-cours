#!/usr/bin/env node
/**
 * Find raw values where a design token belongs (`AGENTS.md` §5, #96).
 *
 * A raw colour breaks dark mode; a raw size, space, radius, layer or shadow is
 * the same bug, and none of them fails a build. Four checks, comments ignored:
 *
 *   colour   a hex or `white`/`black` outside `globals.css`
 *   size     a `font-size` in rem or px (the twelve `--type-*` excepted)
 *   space    a margin, padding or gap in rem, unless its line says « measured »
 *   rest     a z-index, radius, transition, animation or shadow not on a token
 *
 * The two colours a token cannot reach — `viewport.themeColor` in `layout.tsx`
 * and `theme_color`/`background_color` in `manifest.ts` — are listed apart:
 * keep them equal to `--surface-app`.
 *
 *   node scripts/check-tokens.mjs
 *
 * No deps. Exits 1 on any finding.
 */
import { readdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

process.chdir(join(dirname(fileURLToPath(import.meta.url)), ".."));

const files = [];
(function walk(dir) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, e.name);
    if (e.isDirectory()) walk(full);
    else if (/\.(css|tsx?)$/.test(e.name)) files.push(full);
  }
})("src");

/** The file with its comments blanked, line numbers kept. */
function code(file) {
  let s = readFileSync(file, "utf8");
  const blank = (m) => m.replace(/[^\n]/g, " ");
  s = s.replace(/\/\*[\s\S]*?\*\//g, blank);
  if (!file.endsWith(".css")) s = s.replace(/(^|[\s;{(])\/\/[^\n]*/g, blank);
  return s.split("\n");
}

const EXCEPTED = { "src/app/layout.tsx": /color:/, "src/app/manifest.ts": /(theme|background)_color:/ };
const found = { colour: [], size: [], space: [], rest: [] };
const excepted = [];

for (const file of files) {
  const css = file.endsWith(".css");
  const raw = readFileSync(file, "utf8").split("\n");
  code(file).forEach((line, i) => {
    const at = `${file}:${i + 1}: ${line.trim().slice(0, 90)}`;
    if (file !== "src/app/globals.css") {
      // A decision cited in text, « (#102) », is not a colour.
      const hex = [...line.matchAll(/#[0-9a-fA-F]{3,8}\b/g)].filter(
        (m) => !(/^#\d+$/.test(m[0]) && /[(,]\s*$/.test(line.slice(0, m.index))),
      );
      if (hex.length || /:\s*(white|black)\b/.test(line)) {
        if (EXCEPTED[file]?.test(line)) excepted.push(at);
        else found.colour.push(at);
      }
    }
    if (!css) return;
    if (/font-size:\s*[0-9.]+(rem|px)/.test(line) && !/^\s*--type-/.test(line)) found.size.push(at);
    if (/(margin|padding|gap)[a-z-]*:[^;]*[0-9.]+rem/.test(line) && !/measured/.test(raw[i]))
      found.space.push(at);
    if (/^\s*(z-index|border-radius|transition|animation|box-shadow)[a-z-]*:[^;]*[0-9]/.test(line) && !/var\(--|!important/.test(line))
      found.rest.push(at);
  });
}

for (const [check, hits] of Object.entries(found))
  console.log(`${check}:`, hits.length ? "\n  " + hits.join("\n  ") : "none");
console.log(`excepted (keep equal to --surface-app): ${excepted.length}`);
for (const e of excepted) console.log("  " + e);
console.log(`files checked: ${files.length}`);
process.exit(Object.values(found).some((h) => h.length) ? 1 : 0);
