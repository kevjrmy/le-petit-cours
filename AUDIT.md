# Content audit — 2026-08-26

Full pass over all 89 published pages: mechanical checks on every view, an A4
page-count sweep of every route, and a content read of the French and Spanish.

Tick items as they are fixed. Delete an item only once it is fixed *and* the
check that found it passes again — the re-run commands are in §5.

---

## 1. Real errors — wrong content shown to learners

- [ ] **`src/views/grammaire/la-negation.vue:63` — the table renders « venuns ».**
  The cell is split `<span class="stem">venu</span><span class="end">ns</span>`;
  it should be `ven` + `ons` → *venons*. A non-word sits in the *nous* row of a
  core grammar paradigm.

- [ ] **`src/views/orthographe/les-pronoms-possessifs.vue:98` — self-contradictory rule.**
  Reads « *sans accent au pluriel* : les nôtres, les vôtres **conservent le ô** ».
  It says the accent disappears, then that it stays. The intended contrast is with
  the *determiners* notre/votre, which have no accent.

- [ ] **`src/views/theme/ecrire-un-livre.vue:55` — « un(e) personnage principal(e) ».**
  *Personnage* is masculine only, whatever the character's gender: *un personnage
  principal*. The same page is correct at lines 139 and 176.

- [ ] **`src/views/grammaire/les-adjectifs.vue:125` — "Cinq adjectifs irréguliers", three listed.**
  Only beau, nouveau, vieux appear. Either say *Trois*, or add *fou → fol* and
  *mou → mol* (rare at A2 — dropping the number is probably better).

- [ ] **`src/views/theme/la-famille.vue:34,81` — « soeur » / « soeurs » without the ligature.**
  Every other page writes *sœur*. (The « soeur » in `dictees/les-fleurs-du-mal.vue:20`
  is deliberate — it tells the learner they may type it that way.)

- [ ] **`src/views/theme/ah-si-jetais-riche.vue:31` — header « Définition en francés ».**
  Half French, half Spanish. The other four theme pages say *Definición en francés*.

## 2. Broken exercise behaviour

- [ ] **All six `conversation/` pages accept a grammatically wrong number — 20 blanks.**
  `a-la-boulangerie.vue:138` marks *croissant* correct for « deux **croissants** »;
  `en-vacances.vue:122` accepts *vacance* for **vacances** (not a word in that sense);
  same shape at `a-disneyland-paris.vue:128,133` (*billet*, *adulte*) and in
  `a-la-pharmacie` (7 blanks), `chez-le-medecin` (2), `demander-son-chemin` (1).
  The drill confirms the wrong form. Accent- and case-variants in `accept` are fine;
  singular-for-plural is not.

- [ ] **`src/views/exercices/phrases-en-desordre.vue:177` — the puzzle is pre-solved ~1 time in 10.**
  Words are shuffled with `sort(() => Math.random() - 0.5)` and nothing guards
  against `shuffled === original`. Measured over 20 000 runs: a 5-word sentence
  comes out in the correct order **9.5 %** of the time (6-word: 4.8 %), and the
  first word stays put 32 % of the time versus 20 % for a real shuffle.
  Fix = Fisher–Yates + re-shuffle while the result equals the original.

## 3. Drift from the rules in AGENTS.md

- [ ] **Twelve pages over the A4 budget** (§5 "Length"; excludes the two documented
  exceptions `vocabulaire/les-nombres` and `le-docteur`):

  | Pages | Route |
  |---|---|
  | 5 | `/prononciation/les-syllabes-courantes` — 10 sections, 15 graphies, 51 examples; the clear split candidate |
  | 4 | `/theme/ecrire-un-livre`, `/theme/ah-si-jetais-riche`, `/litterature/introduction` |
  | 3 | `/grammaire/les-articles`, `/grammaire/les-adverbes`, `/grammaire/le-passe-compose`, `/orthographe/les-homophones`, `/theme/la-famille`, `/theme/les-loisirs`, `/theme/la-nourriture`, `/lecture/entretien-d-embauche` |

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
- [ ] `theme/ecrire-un-livre` files **Amélie Nothomb** under *roman populaire* beside
  Levy and Musso. Literary-prize author on a literary imprint — debatable at best.
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
