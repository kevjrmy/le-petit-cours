---
name: le-petit-cours App Assistant
summary: Vue 3 + Vite PWA teaching A2 French to native Spanish speakers. Bled content patterns inside a Claude.ai-style app shell, tricolore palette, light + dark.
description: |
  Workspace assistant for the `le-petit-cours` PWA — Vue 3, Vite, Vue Router, vite-plugin-pwa.
  Read this file before touching anything. The specialised agents in `.claude/agents/`
  cover the recurring jobs: design-system (tokens and component look), lesson-author
  (prose lessons), exercise-author (interactive drills and their answer data), nav-wiring
  (navigation.js, routes, relatedPages), page-auditor (technical regressions) and
  content-proofreader (the French and Spanish themselves). Open bugs live in `AUDIT.md`.
whenToUse: |
  Any work inside `le-petit-cours`: adding lessons, styling, routing, dark-mode fixes,
  or adjusting the design system.
---

# le-petit-cours

## 1. Audience — this drives every content decision

- **Native language: Spanish.** Learners are hispanophone. Lean on cognates, flag false
  friends, and write every glossary/translation column in **Spanish, never English**.
- **Level: A2.** Short sentences, everyday vocabulary, concrete examples. No complex
  subordinate clauses, no C1/C2 grammar metalanguage.
- Comparing French to Spanish is encouraged (gendered articles, conjugation families).
  **Never assume the learner knows English.**

## 2. Architecture

```
src/
  App.vue                  ← the app shell: sidebar + topbar + <RouterView>
  style.css                ← the whole design system (tokens, base, Bled content patterns)
  data/navigation.js       ← SINGLE SOURCE OF TRUTH for chapters, lessons, relatedPages
  data/conjugaisons.js     ← the verb tables + the pure generators that build every form
  data/prononciation.js    ← the sound sheets, grouped by family
  router/index.js          ← explicit routes with static import() (code-splitting)
  composables/
    useTheme.js            ← light | dark | system, persisted, sets <html data-theme>
    useSidebar.js          ← collapse/rail (desktop), drawer (mobile), expanded chapters
    usePageTitle.js        ← breadcrumbs + document.title, derived from navigation.js
    useSpeech.js           ← French TTS for dictees/, prononciation/, exercices/; unmount cleanup
  components/
    AppSidebar.vue         ← collapsible nav tree + lesson filter + theme toggle
    AppTopbar.vue          ← sticky bar: menu, back, breadcrumb
    ChapterIndex.vue       ← renders ANY chapter landing page from navigation.js
    ChapterIcon.vue        ← chapter glyph map (static icon imports)
    PageHeader.vue         ← in-sheet title block (eyebrow + h1 + tricolore rule)
    RelatedLinks.vue       ← "Pour aller plus loin" — cross-links at the foot of a page
    ConjugationSheet.vue   ← renders ANY verb from data/conjugaisons.js
    PronunciationSheet.vue ← renders ANY sound sheet from data/prononciation.js
    ThemeToggle.vue, Footer.vue
  layouts/
    DefaultLayout.vue      ← the reading sheet (.page-sheet)
    AltLayout.vue          ← identical; both kept so existing views compile
  utils/viewMeta.js        ← view-meta dates → "Nouveau" badge, sidebar dot, "Récemment ajouté"
  views/{chapter}/         ← index.vue (one-line ChapterIndex wrapper) + lesson files
```

Open bugs live in **`AUDIT.md`**; the six agent briefs in `.claude/agents/` carry the
how-to for each recurring job. This file carries the rules and the traps — what any
change must not break.

**The shell lives in `App.vue`, not in a layout.** That is deliberate: the sidebar keeps
its scroll position and expanded state across navigation. Layouts only own the sheet.

## 3. Design system

Read `src/style.css` top to bottom once — it documents its own three token layers.

- **Pure CSS only.** No Tailwind, no utility libraries, no CSS-in-JS. Component styles go
  in `<style scoped>` inside the `.vue` file.
- **Never write a raw color in a component.** A hex in a view is a bug: it will not follow
  dark mode. Use the semantic tokens (`--surface-*`, `--text-*`, `--border*`, `--accent*`,
  `--danger*`, `--warn*`, `--success*`).
- The legacy `--clr-*` names still work (they alias the semantic layer) so old views keep
  compiling, but **new code uses the semantic names**.
- Aesthetic: **Bled content inside a Claude.ai shell**. Clean cards on a quiet background,
  generous spacing, Georgia serif for headings, Inter sans for UI and body.
- Palette is the **tricolore**: blue (`--accent`, primary), white (surfaces),
  red (`--danger`, rule accents and the "Nouveau" badge). Amber is callouts, green is
  "correct answer" in exercises. The flag appears literally only in the `.tricolore` rule
  under a page title.
- **Dark mode is not optional.** Every change must work in both. `useTheme` supports
  clair / sombre / système.
- Content patterns for lesson views: `.rule` (blue left border), `.example` (tinted mono
  box), `.attention` (amber "À retenir"), `.exception` (red tint), `.astuce` (blue card,
  "ASTUCE" eyebrow + `.astuce-hook` — the memory hook of an `astuces/` page).
- Accessibility: semantic HTML, `focus-visible` rings, `aria-label` on icon-only controls,
  `<caption class="sr-only">` on every table.

### The reading column

`--max-width: 52rem` is the width of `.page-sheet`, sized for reading on screen. It was
pinned to 794px — A4 at 96 dpi — while pages were meant to print; **PDF export was removed
on 2026-08-26**, so it is a measure in rem now and scales with the root font size. Widen it
much and prose runs past a comfortable line length; narrow it and the four-column tables
crowd. The single content breakpoint is `@media (max-width: 52rem)` and must move with the
column; the shell breakpoint (sidebar → drawer) is `900px`, mirrored in `useSidebar.js`.

## 4. Adding a lesson — the checklist

1. Create `src/views/{chapter}/{slug}.vue` with a `view-meta` comment carrying today's date,
   wrapped in `<AltLayout title="…">`.
2. Add the lesson to its chapter's `lessons` array in **`src/data/navigation.js`**.
3. Add an explicit route in `src/router/index.js`.
4. Add `<RelatedLinks />` before `</main>` and an entry in `relatedPages` (see §5).
5. Update **§7 Current content** below.

Steps 2 and 3 are both required and must agree — `navigation.js` drives the sidebar, the
sommaire and the chapter index; the router makes the URL resolve. There is no automatic
sync, so a missing route means a dead sidebar link.

**You never write a chapter `index.vue` by hand.** It is a one-line wrapper:

```vue
<!-- view-meta: created=YYYY-MM-DD; updated=YYYY-MM-DD -->
<template>
  <ChapterIndex slug="grammaire" />
</template>

<script setup>
import ChapterIndex from '@/components/ChapterIndex.vue'
</script>
```

Everything it shows (title, blurb, rows, tags, subtitles, "Bientôt" placeholders) comes
from `navigation.js`.

### New chapter

Add an entry to `chapters` in `navigation.js` (with `icon`, `unit`, `blurb`), add the icon
import + map entry in `ChapterIcon.vue`, create `views/{slug}/index.vue` as above, and
register the routes.

## 5. Page-type rules

| Page type | Notes |
|---|---|
| `grammaire/`, `orthographe/`, `conjugaison/`, `astuces/`, `dictees/`, `prononciation/`, `musique/`, `vocabulaire/` | standard lesson |
| `exercices/` | interactive, self-scoring |
| `conversation/`, `litterature/` | |
| `lecture/` | ends with the comprehension quiz + hidden translation |
| any `index.vue` | |

**There is no PDF button.** Download-to-PDF was removed on 2026-08-26 along with every
`@media print` block, the dictée print answer sheets and the `.no-print` / `.print-only`
flags. Do not reintroduce a `downloadPdf()` method or a `window.print()` call.

### Related links — "Pour aller plus loin"

Every page ends with `<RelatedLinks />`, just before `</main>`. It takes no props: it reads the current route and looks the targets up
in **`relatedPages`** in `navigation.js`, so the relations stay in one file. The conjugaison
and prononciation views inherit it from their sheet component; annexe pages and chapter
`index.vue` files don't carry it. **`nav-wiring` owns the map** and its check.

- **Four links maximum** (`MAX_RELATED`). Past four it stops being a hint and becomes a
  second navigation menu.
- The pairing is always one of three: the lesson a drill practises, the drill that practises
  a lesson, or the sibling page a learner reaches for next. Anything else is decoration.
- A target that no longer resolves — renamed, or still `soon` — is dropped by `relatedFor()`
  rather than rendered, so a stale entry costs a link and raises no error. That is why it
  needs its own check (see `.claude/agents/nav-wiring.md`).
- Inline `.lesson-link` `RouterLink`s inside a lesson are a different thing and stay: they
  sit next to the rule they belong to. The foot block is where a learner goes *after*.

### Lesson structure (in order)

`<div class="rule">` main rule → `<table>` paradigm if needed → `<div class="example">`
2–4 examples → `<div class="attention">` one key exception.

**Length.** There is no page budget any more — it existed because every lesson printed to
A4, and PDF export is gone. What remains is editorial: **two or three `<article>` blocks**
for a lesson, and a topic needing more than that is two lessons. Vocabulary references run
longer by nature; use `<table class="dense">` for lists of roughly 8+ rows.

Splitting is the preferred remedy whenever a page really covers two topics — that is why
`l-heure` and `les-jours-et-la-date` are separate files.

**Tables**: visually-hidden `<caption class="sr-only">`, blue `<thead>`, zebra rows,
4 columns maximum. Translation column in **Spanish**.

### A new lesson needs no `<style>` block

All the lesson chrome — paradigm tables, `.hl-blue` / `.hl-red`, `.note`, `.sep`,
`.method`, `.method-example`, `.exception-ex` — is defined globally under
`.lesson` in `style.css`. Write `<main class="lesson">`, use the classes, add no CSS.

Lessons written before that block carry their own identical scoped copies. Scoped selectors
win on specificity, so they are unaffected; don't bother stripping them except when you are
already editing the file.

### Conjugaison pages

The only **data-driven** chapter. Every verb view is a one-line
`<ConjugationSheet slug="etre" />`; the tables come from `src/data/conjugaisons.js` and the
chrome from `ConjugationSheet.vue`. Adding a verb means an entry in that data file, a view
wrapper, a `navigation.js` line and a route — never a hand-written table.

**Scope is A2 and stays A2**: présent, passé composé, impératif, participe présent. No
imparfait, futur or subjonctif — those belong to the grammaire lessons.

Two toggles (affirmatif/négatif, masculin/féminin) drive the whole sheet, so the forms are
generated, not stored. The generators live in the data file and are pure functions — test
them there rather than through the UI:

```bash
node --input-type=module -e "
import { verbs, conjugate } from './src/data/conjugaisons.js';
const J = s => s.map(x => x.s).join('');
for (const v of verbs) console.log(v.infinitif,
  conjugate(v,'passeCompose',true,'feminin').map(l => J(l.segments)).join(' | '));"
```

**The colouring is the point of the sheet.** A conjugation table nobody can scan is just a
list; the terminaison has to pop so the pattern is visible down a column
(fin**is** · fin**is** · fin**it** · fin**issons** · fin**issez** · fin**issent**). Forms are
stored with a `|` marking the stem/ending boundary — `'parl|ons'`, `'fin|issent'` — and the
generators return typed segments the view paints:

| Segment | Colour | Is |
|---|---|---|
| `stem` / `pron` | `--text-1` / `--text-3` | radical, subject pronoun |
| `end` | `--accent-text`, bold | the terminaison — the pattern to notice |
| `neg` | `--danger-text` | `ne` / `n'` / ` pas` |
| `accord` | `--warn-text`, bold | the participle's agreement letters (être only) |

Three roles, no more — a fourth colour and none of them mean anything. Use the `-text`
token variants, not the plain `--accent` / `--danger` / `--warn` fills, which are too light
on a surface in dark mode.

The legend renders above the grid, in that order (radical → terminaison, the way the word
is built). **Each entry appears only when its colour is actually
on screen** — no `négation` in affirmative mode, no `accord` on an `avoir` verb — so the key
never explains something the learner cannot see.

That makes the row length vary, which is why each entry carries its `sg-*` class on the
`<li>` (the dash and the word then share one colour). **Never colour the legend by
`:nth-child`**: with entries appearing and disappearing, positional rules mis-key every row.

A form with **no `|` is left uncoloured** — `j'ai`, `il a`, `va` are irregular enough that
no ending is worth marking. Don't invent a split to make the column look uniform.

Concatenating every segment's `s` must reproduce the plain sentence exactly. That is the
regression test: capture the joined output, change the data, diff.

Three rules the generators encode, easy to get wrong by hand:

- **Only `je` and `ne` elide.** `j'ai`, `je n'ai pas` — but `elle est`, never `ell'est`.
- **`ne … pas` wraps the auxiliary, not the participle**: *je n'ai pas parlé*, not
  *je n'ai parlé pas*.
- **The participle agrees only when the auxiliary is `être`.** With `avoir` the feminine
  toggle changes nothing but the pronouns, and the sheet says so in a `.conj-hint` rather
  than leaving the learner hunting for a difference.

`pouvoir` has no impératif — `imperatif: null` renders an explicit note. Don't invent forms
to fill the grid.

`ConjugationSheet.vue` keeps its CSS in a scoped block, which is correct here: one component
owns the whole page type, so there is nothing to duplicate and nothing to promote.

### Prononciation pages

The second **data-driven** chapter. Every sheet is a one-line
`<PronunciationSheet slug="les-voyelles" />`; the sections come from
`src/data/prononciation.js` and the chrome from `PronunciationSheet.vue`. Adding a
sheet means an entry in that data file, a view wrapper, a `navigation.js` line and
a route — never a hand-written table.

One sheet per **sound family** (voyelles / voyelles nasales / consonnes), and
**three or four sections per sheet, no more**. The single page that covered all ten
sections ran five screens deep; the sections are what cost the space, not the examples.
Render them as `.sound-section` divs inside **one** `<article>`, never one `<article>`
each — the global card padding costs ~4 rem per section, and the stylesheet already
draws a separator rule between them.

Audio is `useSpeech()`, and the sheet **checks `hasVoice` after the first play** for
the same reason `ecoute-et-choisis` does: a Spanish default voice reading *tu* and
*tout* makes the contrast the page exists to teach inaudible. Checking on mount would
flash a false alarm, since `getVoices()` is empty until `voiceschanged` fires.

A graphie is not always pronounceable alone — « an » or « ill » read aloud is noise —
so each row carries a `soundVal` (a real word) that is what gets spoken.

### Astuce pages

Memory hooks for rules taught elsewhere — mnemonics, substitution tests, "look at the last
letter" shortcuts. A standard `<main class="lesson">` page.

Three rules make this chapter work:

1. **One `.astuce` block per section, and it carries the hook** — the single line the learner
   should walk away with, in `.astuce-hook`. More than one per section and none of them lands.
2. **An astuce that has exceptions must state them.** A trick presented as absolute teaches a
   mistake: "pays en -e → en" is useless without *au Mexique*. Pair every shortcut with an
   `.exception` block, or don't ship it.
3. **Never restate the paradigm table.** Astuce pages link to the lesson that owns the rule
   with `<RouterLink class="lesson-link">`, so the two can't drift apart when one is edited.
   Link to the matching `exercices/` page too when one exists.

Because these pages cross-reference heavily, check the links resolve — a `RouterLink` to a
path with no route renders as a dead anchor with no warning:

```bash
python3 - <<'PY'
import re, pathlib
paths = set(re.findall(r"path:\s*'([^']+)'", pathlib.Path('src/router/index.js').read_text()))
for p in pathlib.Path('src/views/astuces').glob('*.vue'):
    for t in re.findall(r'RouterLink[^>]*?(?<![:\w-])to="([^"]+)"', p.read_text(), re.S):
        print('OK ' if t in paths else 'DEAD', t, p.name)
PY
```

The lookbehind skips bound props (`:to="chapter.path"`), which hold an expression rather
than a literal path.

### Dictée pages

Listen, type, compare, plus a Spanish clue per sentence.

The chrome is global: write `<main class="dictee">` and **no `<style>` block**. Copy
`dictees/une-journee-en-vacances.vue` and replace only the `dictation` object.

Audio comes from **`useSpeech()`** — never hand-roll `SpeechSynthesisUtterance`. It resolves
a French voice lazily (`getVoices()` is empty until `voiceschanged` fires), exposes
`speaking` to disable the buttons mid-utterance, and cancels on unmount — without that,
audio keeps playing after the learner navigates away.

```js
const { speak, speaking } = useSpeech()
speak(sentence.text, 0.85)   // 0.85 = normal, 0.55 = the "Lentement" button
```

The `clean()` answer comparator lowercases, folds curly to straight apostrophes, strips
punctuation and collapses whitespace. Keep the apostrophe **out** of the punctuation class:
elision (`d'aller`, `l'empêchent`) is orthography the learner must get right, not
punctuation. It is accent-sensitive on purpose — accents are the point of a dictée — but
ligatures are normalised (`œ`→`oe`), because a Spanish keyboard cannot type them; say so on
the page when a sentence needs one (`.prep-intro.tip` is the amber aside for that).

### Exercise pages

Self-scoring. Written by the **exercise-author** agent, which carries the
validators and the per-mechanic guidance; this is the contract every drill obeys.

Shell: `<main class="exo">` and no CSS for it — `style.css` owns `.instructions`, `.meta` /
`.progress-track` / `.progress-fill`, `.card`, `.feedback*`, `.actions`, `.btn-verify` /
`.btn-next` / `.btn-restart` and the `.result` score screen. Only the board is scoped.

State shape: `deck` (shuffled), `currentIndex`, `checked`, `score`, `finished`, plus
`resultEmoji` / `resultMsg` thresholds at 1 / 0.75 / 0.5.

**Vary the mechanic.** Coverage: MCQ (×9), matching pairs, tap-to-order, bucket sort,
locate-and-retype, multi-select, listening, type-in conjugation, timed round. Prefer a
missing mechanic over a tenth MCQ.

Each of the following has already cost a bug:

- **Shuffle with Fisher–Yates**, never `sort(() => Math.random() - 0.5)`: it is biased, and
  in `phrases-en-desordre` it served the sentence already in the correct order 9.5 % of the
  time. Where the original order *is* the answer, re-draw while the shuffle equals the input.
- **An `accept` list may hold case and accent variants, never a different number or
  gender.** `answer: 'croissants', accept: ['croissant']` marks *deux croissant* correct.
- **A timed round owns two timers** — the countdown `setInterval` and the `setTimeout` that
  holds the correction before auto-advancing — and both must be cleared on unmount, with the
  advance callback re-checking the phase. Score on accuracy (`score / attempts`), not volume.
- **Listening drills must check `hasVoice`**, and only after the first play; minimal-pair
  sets must contain no homophones (`cent/sang/sans`, `vert/verre` are out).
- **Type-in answers are accent-sensitive; multiple-choice ones need not be.** Give every
  input the same width — sizing it to its answer leaks the length of the expected form.
- **Multi-answer questions need three result states**: right, wrongly ticked, and *missed*
  (amber, not red — a different mistake). All-or-nothing on the exact set.
- **Substitution items are verified by performing the substitution**, not by reading them.
- Feedback colours come from tokens (`--success*` / `--danger*`), never a raw hex.
- **Beware the global `section` rule.** Bare `section`/`article` are content cards
  (`padding: 1.5rem 1.75rem`, plus `section + section { margin-top: 1rem }`), so a
  `<section>` used as a layout box sits inset and offset. Use a `<div>`, or reset both.

### Conversation (gap-fill) pages

Interactive dialogues, also owned by **exercise-author**. `<main class="gapfill">`
and **no `<style>` block** — `.word-bank`, `.chip`, `.chat`, `.bubble`, `.slot`, `.suggest`,
`.actions`, `.result` and `.drag-ghost` are global. Copy the `<script setup>` from
`conversation/demander-son-chemin.vue`, the only page that follows the contract, and replace
the `dialogue` array: each line is `{ who: 'left'|'right', parts: [...] }`, each part either
`{ text: '…' }` or a blank `{ id, answer, accept: […] }`.

Speakers are `.left` / `.right`, **never character names** — the five older pages use
`boulangere`, `cliente`… and carry ~300 lines of scoped CSS keyed on them.

**Never write `{ text: '' }`.** The older pages branch on `v-if="part.text"`, so an
empty-string part is falsy, renders as a blank, and throws on `part.answer.length` — the
route goes blank with only a console warning. If a line must start with a blank, make the
blank the first element; new pages branch on `v-if="part.id == null"`, which cannot fail
this way.

### Lecture (reading) pages

Real public-domain French text or an original A2 dialogue — no machine-generated filler.
Include: source stamp, inline hints (`<span class="hl-word" title="traducción ES">`),
vocabulary table (français | définition FR | español), a `<button>`-based MCQ quiz
("Avez-vous compris ?") with green/red feedback and a score, and a hidden Spanish
translation in `<details>` (amber). Use `<button>` options, **not** hidden radios — the
click targets overlap. Print CSS hides the quiz and the translation.

## 6. View metadata

Every `src/views/**/*.vue` starts with:

```html
<!-- view-meta: created=YYYY-MM-DD; updated=YYYY-MM-DD -->
```

New views use their real creation date; editing a view updates only `updated`.
Views created before tracking began carry `created=2026-08-02`.

`src/utils/viewMeta.js` reads these dates and is the only source for three things:

| Signal | Reads | Where |
|---|---|---|
| **Nouveau** badge, sidebar dot | `updated` = today | chapter index, sidebar |
| **Récemment ajouté** | `created`, newest first | sommaire |
| — | — | nothing else derives from dates |

"Récemment ajouté" sorts on **`created`, never `updated`**: it answers "what is new here",
and a typo fix on an old page must not push it back to the top. Ties fall in manifest order,
so a batch added on the same day reads in the book's own order. That means an accurate
`created` date matters as much as bumping `updated` — a new page dated to the day it was
copied from will surface in the wrong place, or not at all.

## 7. Current content

Authoritative list is `src/data/navigation.js` — this table is the human summary.

- **grammaire** (22) — ordered as a course in `navigation.js`, not alphabetically:
  - *classes de mots*: les-articles, les-adjectifs, les-demonstratifs, les-adverbes
  - *phrase*: la-negation, l-interrogation
  - *verbes*: verbe-1er/2eme/3eme-groupe, les-verbes-pronominaux, les-verbes-modaux, l-imperatif
  - *temps*: le-passe-compose, l-imparfait, passe-compose-ou-imparfait, le-futur-proche, le-futur-simple, le-conditionnel-present
  - *pronoms et comparaison*: les-pronoms-cod-coi, les-pronoms-y-en, le-comparatif-et-le-superlatif, les-prepositions-de-lieu
- **conjugaison** (10) — reference tables, A2 tenses only, all rendered by one component
  from `src/data/conjugaisons.js`: etre, avoir, parler, finir, aller, faire, pouvoir,
  vouloir, venir, prendre
- **orthographe** (3): les-homophones, les-determinants-possessifs, les-pronoms-possessifs
- **astuces** (4) — mnemonics for rules taught elsewhere; each page links back to its lesson:
  a-en-au-aux, le-genre-des-noms, etre-ou-avoir, le-test-de-substitution
- **dictees** (3): une-journee-en-vacances, la-pierre-de-rosette, les-fleurs-du-mal
- **exercices** (17, interactive): associe-les-pairs, emoji-francais, quel-groupe-verbe-appartient, conjugaison-present, les-articles, la-negation, le-futur-proche, le-passe-compose, les-adverbes, les-adjectifs-accord, phrases-en-desordre, etre-ou-avoir, trouve-la-faute, devine-les-temps, ecoute-et-choisis, mets-au-bon-temps, le-bon-pronom
- **lecture** (5): le-lion-et-le-rat, le-petit-prince, entretien-d-embauche, le-comte-de-monte-cristo, le-tour-du-monde
- **litterature** (1): introduction
- **prononciation** (3) — data-driven like conjugaison: les-voyelles, les-voyelles-nasales,
  les-consonnes, all rendered by `PronunciationSheet.vue` from `src/data/prononciation.js`
- **musique** (1 + 2 planned): la-vie-en-rose. Song pages quote **short excerpts only** —
  the twentieth-century repertoire is still in copyright, so a page carries a few verses
  with commentary, a vocabulary table and a grammar focus, never a full lyric sheet.
- **vocabulaire** (11) — base first, then the everyday themes: 100-mots-les-plus-utilises,
  les-nombres, l-heure, les-jours-et-la-date, la-maison, les-vetements, la-ville,
  les-transports, le-travail, la-meteo, le-docteur
- **conversation** (6): en-vacances, a-la-boulangerie, a-disneyland-paris, chez-le-medecin, a-la-pharmacie, demander-son-chemin
- **annexe** (utility route, not a chapter): a-propos

Entries marked *planned* exist in `navigation.js` with `soon: true` — they render as
disabled "Bientôt" rows and have no route. Removing `soon` requires creating the view
and the route in the same change.

## 8. Keep context files in sync

Treat the context files as part of the deliverable. If behaviour and docs disagree, the
change is not done. There are four:

| File | Carries |
|---|---|
| `AGENTS.md` | the rules and the traps — what any change must not break |
| `.claude/agents/*.md` | the how-to for each recurring job, one agent per job |
| `AUDIT.md` | known-open bugs, and what has been verified clean |
| `README.md` | the stack and the shape, for a human arriving cold |

In the **same change**:

- Added / renamed / moved / split / deleted a view or chapter → update `navigation.js`
  (lessons **and** `relatedPages`), the router, and §7 above.
- Fixed something listed in `AUDIT.md` → tick it there, with the fix recorded in one line.
- Changed how a page type is written → update the owning agent brief too, not just here.
- Changed a shared pattern (tokens, lecture structure, the reading width) → update
  the prose **and** every code snippet demonstrating it, recording exceptions explicitly.
- Found a recurring bug worth standardising (e.g. `window` not in template scope; hidden-radio
  click overlap; `flex: 1` stretching in a column flex container) → capture it here so it is
  not reintroduced.

Never leave the docs describing removed behaviour.

## 9. Verifying a change

```bash
npm run dev     # http://localhost:5173
npm run build   # must pass before you call a change done
```

Check every visual change in **both themes** and at **both breakpoints** (desktop shell,
≤900 px drawer).
