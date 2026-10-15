#!/usr/bin/env node
/**
 * Check the contrast of the colour tokens, in both themes.
 *
 * A token changed in `src/app/globals.css` fails nothing: the page still
 * builds, and a label is quietly a little too pale on one ground in one theme.
 * This reads the tokens, resolves each pair for light and for dark, and says
 * which fall under their floor (WCAG 2.2 AA, `docs/decisions.md` #99):
 *
 *   4.5:1  text on the ground it may sit on
 *   3:1    an edge or a ring that is the only thing saying « here is a control »
 *
 *   node scripts/contrast.mjs          # the pairs under their floor, and a count
 *   node scripts/contrast.mjs --all    # every pair
 *
 * **The pairs are the rule, so they are written out below** rather than
 * discovered: a token is allowed on the grounds listed for it and on no other.
 * Putting `--warn-text` on `--danger-soft` is not checked because nothing may
 * do it. A new text token, or a new ground, is added here in the same change.
 *
 * Not checked, on purpose: `--border`, `--border-soft`, `--border-strong` and
 * the `-line` tokens divide things that are read without them; `--warn` as an
 * edge (« à retenir », a missed answer) always comes with a printed word or a
 * mark. Neither is ever the only carrier (`AGENTS.md` §5). `--star` is ornament
 * and marks nothing (#100).
 *
 * No deps. Exits 1 when a pair is under its floor.
 */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const SURFACES = ["--surface-app", "--surface-1", "--surface-2", "--surface-3", "--surface-sidebar"];
const ACCENT_TINTS = ["--accent-subtle", "--accent-soft"];
const TINTS = [...ACCENT_TINTS, "--success-soft", "--danger-soft", "--warn-soft"];

/* [floor, what it is, the tokens, the grounds each may sit on] */
const RULES = [
  [4.5, "text", ["--text-1", "--text-2", "--text-3"], [...SURFACES, ...TINTS]],
  [4.5, "a heading", ["--text-heading"], SURFACES],
  [4.5, "a link, or the accent as text", ["--accent", "--accent-hover", "--accent-text"], [...SURFACES, ...ACCENT_TINTS]],
  [4.5, "a right answer's words", ["--success-text"], [...SURFACES, "--success-soft"]],
  [4.5, "a wrong answer's words", ["--danger-text"], [...SURFACES, "--danger-soft"]],
  [4.5, "« à retenir »'s words", ["--warn-text"], [...SURFACES, "--warn-soft"]],
  [4.5, "ink on a filled accent", ["--text-on-accent"], ["--accent", "--accent-hover"]],
  [4.5, "ink on a filled green", ["--text-on-success"], ["--success", "--success-text"]],
  [3, "an edge or a ring", ["--border-control", "--accent", "--danger", "--success"], SURFACES],
];

const css = readFileSync(
  join(dirname(fileURLToPath(import.meta.url)), "../src/app/globals.css"),
  "utf8",
);

/* Every token has one definition (`AGENTS.md` §5), so the first match is it. */
const raw = new Map();
for (const [, name, value] of css.matchAll(/^\s*(--[\w-]+):\s*([^;]+);/gm)) {
  if (!raw.has(name)) raw.set(name, value.trim());
}

function resolve(value, theme) {
  const pair = /^light-dark\(([\s\S]*)\)$/.exec(value);
  if (pair) {
    /* Split on the comma that is not inside a `var()` or an `rgb()`. */
    const parts = [""];
    let depth = 0;
    for (const ch of pair[1]) {
      if (ch === "(") depth += 1;
      if (ch === ")") depth -= 1;
      if (ch === "," && depth === 0) parts.push("");
      else parts[parts.length - 1] += ch;
    }
    return resolve(parts[theme].trim(), theme);
  }
  const ref = /^var\((--[\w-]+)\)$/.exec(value);
  if (ref) {
    if (!raw.has(ref[1])) throw new Error(`${ref[1]} is not defined in globals.css`);
    return resolve(raw.get(ref[1]), theme);
  }
  const hex = /^#([0-9a-f]{6})$/i.exec(value);
  if (!hex) throw new Error(`cannot read « ${value} » as an opaque colour`);
  return [0, 2, 4].map((i) => parseInt(hex[1].slice(i, i + 2), 16));
}

function luminance(rgb) {
  const [r, g, b] = rgb.map((channel) => {
    const c = channel / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function ratio(a, b) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

function token(name, theme) {
  if (!raw.has(name)) throw new Error(`${name} is not defined in globals.css`);
  return resolve(raw.get(name), theme);
}

const all = process.argv.includes("--all");
const themes = ["light", "dark"];
let checked = 0;
let under = 0;

for (const [floor, what, tokens, grounds] of RULES) {
  for (const fg of tokens) {
    for (const bg of grounds) {
      const ratios = themes.map((_, theme) => ratio(token(fg, theme), token(bg, theme)));
      checked += ratios.length;
      const failing = ratios.filter((value) => value < floor).length;
      under += failing;
      if (!all && failing === 0) continue;
      const cells = ratios
        .map((value, theme) => `${themes[theme]} ${value.toFixed(2)}${value < floor ? " ✗" : "  "}`)
        .join("  ");
      console.log(`${fg.padEnd(18)} on ${bg.padEnd(18)} ${cells}  ${floor}:1, ${what}`);
    }
  }
}

console.log(`${checked} pairs checked in two themes, ${under} under their floor.`);
process.exit(under ? 1 : 0);
