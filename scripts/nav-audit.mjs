#!/usr/bin/env node
/**
 * Check that the manifest, the route folders and every link agree.
 *
 * Nothing detects drift between `src/data/navigation.ts` and `src/app/` at
 * build time (`AGENTS.md` §6): an entry with no folder is a 404, a folder with
 * no entry is unreachable, and the links fail soft or not at all. Six lines,
 * each `none` on a clean tree:
 *
 *   1. in the manifest, no page.tsx       — a sidebar link that 404s
 *   2. page.tsx, not in the manifest      — a page nothing links to
 *   3. cross-links that resolve to nothing — `relatedPages`, dropped silently
 *   4. home pills that resolve to nothing  — `featuredChapterSlugs`, same
 *   5. per-level material vs the manifest  — `SETS`/`BANKS`/a1.tsx… vs `sets`
 *   6. inline links that resolve to nothing — an href in a .tsx: a real 404
 *
 *   node scripts/nav-audit.mjs
 *
 * No deps (Node 22+ reads the .ts manifest). Exits 1 when a line is not `none`.
 */
import { readdirSync, readFileSync, existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

process.chdir(join(dirname(fileURLToPath(import.meta.url)), ".."));
const load = (path) => import(pathToFileURL(resolve(path)).href);

const { chapters, annexes, relatedPages, featuredChapterSlugs, unlistedPages } =
  await load("src/data/navigation.ts");

// Routes on disk: every folder under src/app holding a page.tsx. Dynamic
// segments are skipped here and resolved from the manifest just below.
const routes = new Set();
(function walk(dir, url) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    if (!e.isDirectory() || /^[_([]/.test(e.name)) continue;
    const next = url + "/" + e.name;
    if (existsSync(join(dir, e.name, "page.tsx"))) routes.add(next);
    walk(join(dir, e.name), next);
  }
})("src/app", "");
if (existsSync("src/app/page.tsx")) routes.add("/");

// Every chapter landing page comes from one generated route (#29), and so does
// every verb sheet (#56). A new chapter generated from a data file needs a
// line here, or its lessons read as missing.
// A chapter that is its own page (`isChapterPage`, #94) is not generated: its
// folder must exist like any lesson's, so it is left to the walk above.
if (existsSync("src/app/[chapitre]/page.tsx"))
  for (const c of chapters)
    if (!c.lessons.some((l) => l.path === c.path)) routes.add(c.path);
if (existsSync("src/app/conjugaison/[verbe]/page.tsx"))
  for (const l of chapters.find((c) => c.slug === "conjugaison").lessons) routes.add(l.path);

// Real routes with no manifest entry, by design, are the manifest's own list.
const allowed = new Set(unlistedPages);

const declared = [...chapters.flatMap((c) => [c, ...c.lessons]), ...annexes];
const paths = new Set(declared.map((l) => l.path));
const missing = declared.filter((l) => !routes.has(l.path)).map((l) => l.path);
const orphan = [...routes].filter((p) => !allowed.has(p) && !paths.has(p));

const stale = Object.entries(relatedPages).flatMap(([from, tos]) => [
  ...(paths.has(from) ? [] : [from + " (source)"]),
  ...tos.filter((t) => !paths.has(t)).map((t) => from + " -> " + t),
]);

const slugs = new Set(chapters.map((c) => c.slug));
const pills = featuredChapterSlugs.filter((s) => !slugs.has(s));

// A page with sets holds one body of work per level (#68, #87): questions.ts
// exporting SETS, or data.ts exporting BANKS, and for a literary work one
// a1.tsx/a2.tsx/b1.tsx body each (#92). The manifest wins where they differ,
// so a level with nothing behind it serves another level's material silently.
// Several sets and no `sets` in the manifest is the other failure: adding the
// flag later moves every tick on the page. One set and no flag is fine.
const sets = [];
for (const l of declared) {
  let keys = null;
  for (const [file, name] of [["/questions.ts", "SETS"], ["/data.ts", "BANKS"]]) {
    const path = "src/app" + l.path + file;
    if (!existsSync(path)) continue;
    const map = (await load(path))[name];
    if (map) { keys = Object.keys(map).sort(); break; }
  }
  if (keys === null) {
    if (l.sets) sets.push(l.path + " -> sets, no per-level module");
    continue;
  }
  if (!l.sets) {
    if (keys.length > 1) sets.push(`${l.path} -> ${keys.length} sets [${keys}], no sets in the manifest`);
    continue;
  }
  const want = [...l.sets].sort().join(",");
  if (keys.join(",") !== want) sets.push(`${l.path} -> module [${keys}] vs manifest [${want}]`);
  const bodies = ["A1", "A2", "B1", "B2"].filter((v) => existsSync(`src/app${l.path}/${v.toLowerCase()}.tsx`));
  if (bodies.length && bodies.join(",") !== want) sets.push(`${l.path} -> bodies [${bodies}] vs manifest [${want}]`);
}

// An inline href in a .tsx is hand-written, resolved by nothing, and does not
// fail soft: a typo renders and lands on a 404. /connexion is a redirect in
// next.config.ts, matched before the filesystem (#26).
const sources = [];
(function collect(dir) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, e.name);
    if (e.isDirectory()) collect(full);
    else if (e.name.endsWith(".tsx")) sources.push(full);
  }
})("src");
const reachable = new Set([...paths, ...allowed, "/connexion"]);
const dead = [];
for (const file of sources)
  for (const m of readFileSync(file, "utf8").matchAll(/href="(\/[^"]*)"/g))
    if (!reachable.has(m[1].split("?")[0].split("#")[0]))
      dead.push(file.replace("src/app", "") + " -> " + m[1]);

const lines = [
  ["in the manifest, no page.tsx", missing],
  ["page.tsx, not in the manifest", orphan],
  ["cross-links that resolve to nothing", stale],
  ["home pills that resolve to nothing", pills],
  ["per-level material that disagrees with the manifest", sets],
  ["inline links that resolve to nothing", dead],
];
for (const [label, found] of lines) console.log(label + ":", found.length ? found : "none");
process.exit(lines.some(([, found]) => found.length) ? 1 : 0);
