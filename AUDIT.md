# Content audit — 2026-08-26

Full pass over all 89 published pages: mechanical checks on every view, an A4
page-count sweep of every route, and a content read of the French and Spanish.

§1 and §2 are fixed and collapsed to a summary. **§3 and §4 are the open list.**

Tick items as they are fixed. Delete an item only once it is fixed *and* the
check that found it passes again — the re-run commands are in §5.

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

## 3. Drift from the rules in AGENTS.md

- [ ] **Six pages over the A4 budget** (§5 "Length"; excludes the two documented
  exceptions `vocabulaire/les-nombres` and `le-docteur`):

  | Pages | Route |
  |---|---|
  | 4 | `/litterature/introduction` |
  | 3 | `/grammaire/les-articles`, `/grammaire/les-adverbes`, `/grammaire/le-passe-compose`, `/orthographe/les-homophones`, `/lecture/entretien-d-embauche` |

  The five `theme/` pages that were on this list are gone — the chapter was removed on
  2026-08-26. Worth knowing before attacking the rest: collapsing five `<article>` cards
  into one took `theme/ecrire-un-livre` from 4 pages to 3 but no further, so the remaining
  entries here may need content decisions rather than a layout fix.

- [ ] **Five of six `conversation/` pages break the gapfill contract** (§5 "Conversation
  (gap-fill) pages"). `a-la-boulangerie`, `a-disneyland-paris`, `a-la-pharmacie`,
  `chez-le-medecin`, `en-vacances` each:
  1. use character names as `who` (`boulangere`, `cliente`, `medecin`…) instead of
     `left` / `right`;
  2. carry ~300 lines of scoped CSS re-implementing the global `.gapfill` chrome,
     keyed on those names;
  3. branch on `v-if="part.text"` — the shape documented as the blank-page crash —
     instead of `v-if="part.id == null"`.

  `demander-son-chemin` is the one that follows the pattern; use it as the model.

- [ ] **Nineteen files use the biased `sort(() => Math.random() - 0.5)` shuffle**,
  against Fisher–Yates in the four newest exercises (`le-bon-pronom`,
  `mets-au-bon-temps`, `ecoute-et-choisis`, `devine-les-temps`). Same root cause as
  the `phrases-en-desordre` bug, lower stakes elsewhere. Promote one correct
  `shuffle()` rather than fixing each copy.

- [ ] **`src/views/grammaire/le-conditionnel-present.vue:92`** — `sr-only` caption says
  "Les **trois** emplois" over a **four**-row table (Politesse, Souhait, Conseil,
  Hypothèse).

- [ ] **The three `dictees/` print-only answer tables have no `<caption class="sr-only">`.**
  Low impact — they are `display:none` on screen — but it is the only a11y gap the
  sweep found.

- [ ] **Two linked pages disagree on how many verbs take *être*.**
  `grammaire/le-passe-compose` says **14** (and lists 14); `astuces/etre-ou-avoir`
  says **"une vingtaine"** and its pairs table lists **12**. Pick one number and
  reconcile both pages.

## 4. Minor

- [ ] `astuces/etre-ou-avoir` pairs **rester / tomber** as opposites — they are not;
  the pairing device breaks down on that row.
- [ ] `astuces/le-genre-des-noms` uses **« un lait »** as a vocabulary-noting example;
  odd for an uncountable noun.
- [ ] `vocabulaire/les-jours-et-la-date` months table has **two columns both headed
  "Mois"** and no Spanish for the months.

## 5. Re-running the checks

Reuse the dev server already running on 5173 — do not start or kill one.

```bash
# A4 page-count sweep (all published routes)
node --input-type=module -e "
import { chapters, publishedLessons } from './src/data/navigation.js';
for (const c of chapters) for (const l of publishedLessons(c)) console.log(l.path);
" | while read -r r; do
  google-chrome --headless --disable-gpu --no-sandbox --virtual-time-budget=4000 \
    --no-pdf-header-footer --print-to-pdf=/tmp/s.pdf "http://localhost:5173$r" 2>/dev/null
  echo "$(python3 -c "import re;print(len(re.findall(rb'/Type\s*/Page[^s]',open('/tmp/s.pdf','rb').read())))") $r"
done | sort -rn

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

# shuffle bias, if you want the numbers again
node -e "
const sh = a => [...a].sort(() => Math.random() - 0.5);
const b = [0,1,2,3,4]; let same = 0;
for (let i=0;i<20000;i++) if (sh(b).every((v,j)=>v===b[j])) same++;
console.log('identical to original:', (100*same/20000).toFixed(2)+'%');"
```

## 6. Verified clean — do not re-audit without a reason

- **Conjugaison generators** — 10 verbs × présent/passé composé × négation ×
  masculin/féminin: elision (`j'ai`, `je n'ai`, never `ell'est`), *ne … pas* around
  the auxiliary, participle agreement only with *être*. All correct.
- **Every MCQ answer key** across the 17 exercises: answer present in its options,
  no duplicate options, no out-of-range index.
- **`trouve-la-faute`** — all 10 substitutions produce a grammatical sentence.
- **`ecoute-et-choisis`** — no homophones inside any minimal-pair set.
- **All lecture quiz keys**, checked against the source texts (Petit Prince,
  Monte-Cristo, Lion et Rat, Tour du monde, entretien).
- **`litterature/introduction`** — all 25 authors and dates correct.
- **`vocabulaire/les-nombres`** — *quatre-vingts*, *deux cents*, *mille* invariable,
  *soixante-et-onze*, ordinals.
- **Mechanical, all 89 pages**: no dead RouterLinks, no raw hex colours, no
  `window.*` called from a template, no `{ text: '' }`, valid `view-meta` headers,
  PDF-button rules respected, navigation.js ↔ router ↔ disk in agreement.

Known accepted debt, deliberately not listed above: ~5 000 lines of scoped CSS
across 51 older pages duplicating the global chrome. AGENTS.md §5 already records
that as fix-when-you-are-already-in-the-file.
