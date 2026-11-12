#!/usr/bin/env node
/**
 * Check every reading quiz for mechanical faults.
 *
 * Nothing in `npm run build` reads a question. This walks `lecture/` and
 * `litterature/`, imports each page's `questions.ts` (`SETS`, one list per
 * level) and reports: a missing or empty set, an answer index out of range,
 * fewer than two or more than four options, a duplicate option, a `because`
 * too short to teach anything, a markdown character (it prints as typed), and
 * an em dash used as prose punctuation. A piece of text is a string or
 * `{ fr, es }` (#102); both halves are checked.
 *
 *   node scripts/check-quizzes.mjs
 *
 * **It cannot see an option the text does not actually contradict, or a B1
 * question that only restates its A2 neighbour** — read the sets for that
 * (`.claude/agents/lesson-author.md`). Prints what it counted (`AGENTS.md` §9).
 *
 * No deps (Node 22+ reads the .ts modules). Exits 1 on any problem.
 */
import { readdirSync, existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

process.chdir(join(dirname(fileURLToPath(import.meta.url)), ".."));

const halves = (t) => (typeof t === "string" ? [t] : [t.fr, t.es]);
let files = 0;
let items = 0;
const bad = [];

for (const chapter of ["lecture", "litterature"]) {
  for (const name of readdirSync(join("src/app", chapter))) {
    const page = chapter + "/" + name;
    const path = join("src/app", page, "questions.ts");
    if (!existsSync(path)) { bad.push(page + ": no questions.ts"); continue; }
    files++;
    const { SETS } = await import(pathToFileURL(resolve(path)).href);
    if (!SETS) { bad.push(page + ": questions.ts exports no SETS"); continue; }
    for (const [level, qs] of Object.entries(SETS)) {
      if (!Array.isArray(qs) || qs.length === 0) { bad.push(`${page}/${level}: empty set`); continue; }
      for (const q of qs) {
        items++;
        const at = `${page}/${level} « ${halves(q.question)[0].slice(0, 36)} »`;
        const n = q.options.length;
        if (!Number.isInteger(q.answer) || q.answer < 0 || q.answer >= n) bad.push(at + ": answer out of range");
        if (n < 2 || n > 4) bad.push(`${at}: ${n} options`);
        const firsts = q.options.map((o) => halves(o)[0]);
        if (new Set(firsts).size !== n) bad.push(at + ": duplicate options");
        if (!q.because || halves(q.because).some((b) => !b || b.length < 20)) bad.push(at + ": because too short");
        for (const t of [q.question, q.because, ...q.options].filter(Boolean).flatMap(halves)) {
          if (/[*_]/.test(t)) bad.push(at + ": markdown character in rendered text");
          if (/[\p{L}\p{N}] — /u.test(t)) bad.push(at + ": em dash used as prose punctuation");
        }
      }
    }
  }
}

console.log("files checked:", files, "/ questions checked:", items);
console.log("problems:", bad.length ? bad : "none");
process.exit(bad.length ? 1 : 0);
