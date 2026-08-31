# Content audit — 2026-08-26, closed 2026-08-27

Full pass over all 89 published pages: mechanical checks on every view, a page-length
sweep of every route, and a content read of the French and Spanish. Every item it opened
was fixed on 2026-08-27, the same day the vocabulaire chapter gained three pages.

The course has grown a great deal since the pass closed and now carries **119 published
lessons across 14 chapters**, plus three annexes. Everything past the original 89 is outside
the sweep; what was checked on each addition is in §6.

**Retired 2026-08-26:** the A4 page-budget item and the dictée print-caption item went with
the PDF feature — there is no print output to measure or caption any more. The theme chapter
and the contact page were removed the same day, taking their entries with them.

**Nothing is open.** §1–§4 are kept as a record of what was found and fixed; §6 records what
was checked on everything written since, including the bugs that the checks caught before the
pages shipped.

New findings go back into a §3, as a tick-off list. An item is only ticked once it is
fixed *and* the check that found it passes again — the re-run commands are in §5.

---

## 1–2. Fixed on 2026-08-26 (commits 84b518d, a3881c1)

Kept as a short record; the full diagnosis is in the commit messages, and the rules each one
produced are now in the agent briefs.

**Wrong French shown to learners** — `grammaire/la-negation` rendered « venuns » in the
*nous* row (`venu`+`ns` instead of `ven`+`ons`) · `orthographe/les-pronoms-possessifs` had an
accent rule that contradicted itself mid-sentence · `theme/ecrire-un-livre` had
« un(e) personnage principal(e) », which is masculine only · `grammaire/les-adjectifs` said
"Cinq adjectifs irréguliers" over a list of three · `theme/la-famille` wrote « soeur »
without the ligature, twice · `theme/ah-si-jetais-riche` had a table header half in French,
half in Spanish.

**Drills that confirmed a wrong answer** — all six `conversation/` pages accepted a
grammatically wrong number (21 variants removed; « deux croissants » took *croissant*, « des
maux de tête » took *mal*) · `exercices/phrases-en-desordre` served the sentence already in
the correct order 9.5 % of the time, now 0.000 % with Fisher–Yates plus a re-draw guard.

**`prononciation/les-syllabes-courantes`** printed to five A4; split into three sheets of two
(§3 below), with all ten sections and all 51 examples kept.

## 3–4. Closed on 2026-08-27

The open list is empty. Kept as a record; the diagnosis for each is in the commit.

- [x] **Five `conversation/` pages broke the gapfill contract.** All five were rebuilt from
  `demander-son-chemin`: `who` is `left`/`right`, the branch is `v-if="part.id == null"`, and
  the ~300 lines of scoped CSS per page are gone — roughly 1 500 lines removed, with every
  blank and every dialogue line preserved (counts diffed against the previous commit).
- [x] **The biased `sort(() => Math.random() - 0.5)` shuffle** is gone from all 18 files that
  carried it, and the five correct local Fisher–Yates copies were promoted too. There is now
  one `shuffle()` in `src/utils/shuffle.js`, plus `shuffleChanged()` for the drills where the
  input order is the answer. Measured after the change: all 120 permutations of a five-item
  array appear (min 893, max 1073 in 120 000 draws), identity rate 0.87 % against the 0.83 %
  a uniform shuffle predicts, and `shuffleChanged` returns the input order 0.000 % of the time.
- [x] **`grammaire/le-conditionnel-present`** — the `sr-only` caption said "les trois emplois"
  over a four-row table. Now "quatre".
- [x] **The two pages disagreed on how many verbs take *être*.** `astuces/etre-ou-avoir` said
  "une vingtaine" and listed 12; `grammaire/le-passe-compose` said 14 and listed 14. The astuce
  now says **quatorze** and lists all fourteen.
- [x] **`astuces/etre-ou-avoir` paired rester / tomber as opposites.** They are not. The
  pairing device now covers the five real pairs (ten verbs) and the remaining four —
  *rester, tomber, passer, retourner* — are given their own table as verbs with no contrary,
  which also supplied the two the page was missing.
- [x] **`astuces/le-genre-des-noms`** used *un lait* as a note-the-article example; an
  uncountable noun is the wrong shape for that advice. Now *un nez*, which keeps the point
  that the French gender differs from the Spanish (*la nariz*).
- [x] **`vocabulaire/les-jours-et-la-date`** had two columns both headed "Mois" and no Spanish
  for them. Days and months are now separate tables, both four columns, with all twelve months
  glossed.

## 5. Re-running the checks

Reuse the dev server already running on 5173 — do not start or kill one.

```bash
# conjugaison generators (all verbs × tenses × négation × genre)
node --input-type=module -e "
import { verbs, conjugate } from './src/data/conjugaisons.js';
const J = s => s.map(x => x.s).join('');
for (const v of verbs) console.log(v.infinitif,
  conjugate(v,'passeCompose',true,'feminin').map(l => J(l.segments)).join(' | '));"

# related links still resolve
node --input-type=module -e "
import { relatedPages, relatedFor } from './src/data/navigation.js';
for (const [k, v] of Object.entries(relatedPages)) {
  const rows = relatedFor(k);
  if (rows.length !== v.length) console.log('UNRESOLVED', k);
}"

# the promoted shuffle stays uniform (expect ~0.83 % identity, 120/120 permutations)
node --input-type=module -e "
import { shuffle } from './src/utils/shuffle.js';
const b = [0,1,2,3,4]; const seen = new Map(); let same = 0;
for (let i=0;i<120000;i++) { const o = shuffle(b);
  if (o.every((v,j)=>v===b[j])) same++;
  const k = o.join(''); seen.set(k, (seen.get(k) ?? 0) + 1); }
console.log('identity', (100*same/120000).toFixed(2)+'%', '| permutations', seen.size+'/120');"
```

## 6. Verified clean — do not re-audit without a reason

- **Conjugaison generators** — re-run on 2026-08-31 for all **30 verbs**, now across
  présent / passé composé / **futur simple** × négation × masculin-féminin, plus impératif
  and participe présent: elision (`j'ai`, `je n'ai`, `j'irai`, never `ell'est`), *ne … pas*
  around the auxiliary, participle agreement only with *être*, and no malformed segment in
  any of the generated forms. Every form was printed and read. The futur is assembled from a
  stored stem, so its 30 stems were read separately (`ser`, `aur`, `ir`, `fer`, `verr`,
  `achèter`, `appeller`…) — all correct.
- **Every MCQ answer key** across the 17 exercises that existed at the time: answer present
  in its options, no duplicate options, no out-of-range index. (The 18th,
  `la-bonne-terminaison`, is not an MCQ — see its entry below.)
- **`trouve-la-faute`** — all 10 substitutions produce a grammatical sentence.
- **`ecoute-et-choisis`** — no homophones inside any minimal-pair set.
- **All lecture quiz keys**, checked against the source texts (Petit Prince,
  Monte-Cristo, Lion et Rat, Tour du monde, entretien).
- **`litterature/introduction`** — all 25 authors and dates correct.
- **`vocabulaire/les-nombres`** — *quatre-vingts*, *deux cents*, *mille* invariable,
  *soixante-et-onze*, ordinals.
- **Mechanical, every page as of 2026-08-26**: no dead RouterLinks, no raw hex colours, no
  `window.*` called from a template, no `{ text: '' }`, valid `view-meta` headers,
  navigation.js ↔ router ↔ disk in agreement.
- **The three pages added on 2026-08-27** (`vocabulaire/la-famille`, `le-corps`,
  `les-couleurs`) were put through the same mechanical checks as they were written: no raw
  hex, valid `view-meta`, every `RouterLink` resolves, and manifest ↔ router ↔ disk agree.
  Their French and Spanish have **not** been through a second reader yet.
- **`exercices/la-bonne-terminaison`** (2026-08-27) — the drill was driven through its whole
  deck twice in a real browser: answering every item correctly scores 19/19 with the blank
  and the chosen chip green, answering every item wrong scores 0/19 with the true answer
  highlighted in the pool and the full form named in the correction. Every one of the 19
  answers exists in the 18-chip pool, `-ée` is the only chip that is never an answer, and
  every item carries the infinitive and the tense that make its ending unique.
- **`culture/les-regions-de-france`** (2026-08-27) — the 13 photographs are local WebP files
  under `public/img/culture/regions/`, all 13 appear in the generated `dist/sw.js` precache
  manifest, and a browser pass with lazy-loading forced off found no broken image and no
  console error in either theme. The 13 chefs-lieux and the licence line of each credit were
  checked against the Commons file pages. Its French and Spanish have **not** been through a
  second reader yet.

### Written 2026-08-31 — checked as written, **not yet opened in a browser**

Everything below was verified by running its own data check and, where it has logic, by
testing that logic in isolation. **None of it has been through a browser pass in either
theme**, unlike the 2026-08-27 entries above. That is the outstanding debt on this batch.

- **`exercices/construis-l-imparfait`** — 18 items: subject + radical + ending reproduces the
  stored form exactly, the answer is among the three options with no duplicates, every ending
  is in the five-chip pool and every pool entry is some item's answer (no undocumented trap).
- **`jeux/motus`** — the evaluator was cross-checked against an independently written
  implementation over all **1 600 word pairs** plus 40 self-matches: zero divergences. Two
  hand-written expectations I wrote first were themselves wrong, which is why the file
  documents the cross-check rather than a fixture. 40 words, all five letters, folding 1:1,
  no `œ` or `ç`.
- **`jeux/un-ou-une`** — 102 nouns, 31 traps. Spanish gender is stored, never derived from the
  written article (`el agua` is feminine). Twenty **mass nouns** shipped first and were
  removed: *un poivre* is not French, so the un/une question had no answer. The file now
  carries an explicit `MASS` list and asserts none has returned.
- **`jeux/mots-meles`** — 500 grids generated from the real word lists: every word placed and
  every word recovered through the same tap-first/tap-last path the player uses, zero
  failures. Validation reads the line rather than stored coordinates, because 2 % of placed
  words also appear elsewhere in the filler by accident.
- **`jeux/jacques-a-dit`** — the eight-case truth table (Jacques spoke or not × tap-right /
  tap-wrong / stay-still / timeout) tested in isolation: a timeout after a non-Jacques order
  scores, it does not cost a life. 15 body parts, all present on `vocabulaire/le-corps`.
- **`vocabulaire/la-nourriture`, `orthographe/les-accents`, `conversation/au-restaurant`** —
  mechanical checks only: no `<style>` block, no raw hex, every `RouterLink` resolves, every
  table has an `sr-only` caption and at most four columns, and for the dialogue the shared
  `<script setup>` is byte-identical to `conversation/demander-son-chemin.vue`. Their French
  and Spanish have **not** been through a second reader.
- **`annexe/nouveautes`** — `viewsSince()` run against the real view files: the window and the
  grouping are correct, and the sommaire's six are exactly the first six rows of the page.

**A lesson worth keeping.** Three separate data checks silently under-matched their own data:
a regex requiring single spaces skipped a column-aligned row (`un-ou-une`, 101 of 102), and
two more missed values quoted with `"` because they contain an apostrophe — `det: "l'"` in
`jacques-a-dit` (13 of 15) and `n: "l'épicerie"` in a simulation. Every check now counts what
it matched against the number of declared rows and fails loudly when the two disagree. A check
that skips a row is worse than no check, because it reports clean.

Known accepted debt, deliberately not listed above: roughly 3 500 lines of scoped CSS
across the older lesson pages duplicating the global chrome — down from ~5 000, since the
five conversation rewrites took about 1 500 of it. AGENTS.md §5 records the rest as
fix-when-you-are-already-in-the-file.
