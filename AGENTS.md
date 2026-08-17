---
name: le-petit-cours App Assistant
summary: Vue 3 + Vite PWA teaching A2 French to native Spanish speakers. Bled content patterns inside a Claude.ai-style app shell, tricolore palette, light + dark.
description: |
  Workspace assistant for the `le-petit-cours` PWA — Vue 3, Vite, Vue Router, vite-plugin-pwa.
  Read this file before touching anything. The specialised agents in `.claude/agents/`
  cover the recurring jobs (design tokens, lesson authoring, navigation wiring, auditing).
whenToUse: |
  Any work inside `le-petit-cours`: adding lessons, styling, routing, dark-mode fixes,
  print/PDF output, or adjusting the design system.
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
  style.css                ← the whole design system (tokens, base, Bled patterns, print)
  data/navigation.js       ← SINGLE SOURCE OF TRUTH for chapters & lessons
  router/index.js          ← explicit routes with static import() (code-splitting)
  composables/
    useTheme.js            ← light | dark | system, persisted, sets <html data-theme>
    useSidebar.js          ← collapse/rail (desktop), drawer (mobile), expanded chapters
    usePageTitle.js        ← breadcrumbs + document.title, derived from navigation.js
    useSpeech.js           ← French TTS for dictees/ + prononciation/, with unmount cleanup
  components/
    AppSidebar.vue         ← collapsible nav tree + lesson filter + theme toggle
    AppTopbar.vue          ← sticky bar: menu, back, breadcrumb
    ChapterIndex.vue       ← renders ANY chapter landing page from navigation.js
    ChapterIcon.vue        ← chapter glyph map (static icon imports)
    PageHeader.vue         ← in-sheet title block (eyebrow + h1 + tricolore rule)
    ThemeToggle.vue, Footer.vue
  layouts/
    DefaultLayout.vue      ← the A4 reading sheet (.page-sheet)
    AltLayout.vue          ← identical; both kept so existing views compile
  views/{chapter}/         ← index.vue (one-line ChapterIndex wrapper) + lesson files
```

**The shell lives in `App.vue`, not in a layout.** That is deliberate: the sidebar keeps
its scroll position and expanded state across navigation. Layouts only own the A4 sheet.

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

### The A4 lock

`--max-width: 794px` is **A4 at 96 dpi (210 mm)** and must never be widened. The shell is
full-width; the *reading column* (`.page-sheet`) stays at A4 so every lesson prints to PDF
without reflowing. The single content breakpoint is `@media (max-width: 794px)`; the shell
breakpoint (sidebar → drawer) is `900px` and is mirrored in `useSidebar.js`.

## 4. Adding a lesson — the checklist

1. Create `src/views/{chapter}/{slug}.vue` with a `view-meta` comment carrying today's date,
   wrapped in `<AltLayout title="…">`.
2. Add the PDF **Télécharger** button — unless it is an `exercices/`, `conversation/`,
   `litterature/`, or `lecture/` page (see §5).
3. Add the lesson to its chapter's `lessons` array in **`src/data/navigation.js`**.
4. Add an explicit route in `src/router/index.js`.
5. Update **§7 Current content** below.

Steps 3 and 4 are both required and must agree — `navigation.js` drives the sidebar, the
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

| Page type | PDF button | Notes |
|---|---|---|
| `grammaire/`, `orthographe/`, `conjugaison/`, `astuces/`, `dictees/`, `prononciation/`, `musique/`, `vocabulaire/`, `theme/` | **yes** | standard lesson |
| `exercices/` | no | interactive, self-scoring |
| `conversation/`, `litterature/` | no | |
| `lecture/` | no | ends with the comprehension quiz + hidden translation |
| any `index.vue` | no | |

### Lesson structure (in order)

`<div class="rule">` main rule → `<table>` paradigm if needed → `<div class="example">`
2–4 examples → `<div class="attention">` one key exception → download button.

**Length** (one A4 ≈ 1123 px at 96 dpi):

- **Lesson pages — 1–2 A4 max.** Two or three `<article>` blocks. Split longer topics in two.
- **Vocabulary reference pages — 3 A4 max.** A glossary is consulted, not absorbed in one
  sitting, and a word list has an irreducible length. Use `<table class="dense">` for lists
  of roughly 8+ rows. Known 3-page pages: `vocabulaire/les-nombres` (the whole number system
  belongs on one sheet). `vocabulaire/le-docteur` predates this rule at 4 pages.

Splitting is the preferred remedy whenever a page really covers two topics — that is why
`l-heure` and `les-jours-et-la-date` are separate files.

**Tables**: visually-hidden `<caption class="sr-only">`, blue `<thead>`, zebra rows,
4 columns maximum. Translation column in **Spanish**.

**Verify the length — don't estimate it.** With the dev server running:

```bash
google-chrome --headless --disable-gpu --no-sandbox --virtual-time-budget=4000 \
  --no-pdf-header-footer --print-to-pdf=p.pdf http://localhost:5173/<route>
python3 -c "import re;print(len(re.findall(rb'/Type\s*/Page[^s]',open('p.pdf','rb').read())))"
```

Three pages or more means trim: merge adjacent `<article>` blocks (each costs ~4 rem of
padding and gap), collapse consecutive `.example` boxes into one with `·` separators, or
split the lesson in two.

### A new lesson needs no `<style>` block

All the lesson chrome — paradigm tables, `.hl-blue` / `.hl-red`, `.note`, `.sep`,
`.method`, `.method-example`, `.exception-ex`, `.download-btn` — is defined globally under
`.lesson` in `style.css`. Write `<main class="lesson">`, use the classes, add no CSS.

Lessons written before that block carry their own identical scoped copies. Scoped selectors
win on specificity, so they are unaffected; don't bother stripping them except when you are
already editing the file.

### PDF download pattern

`window` is **not** in Vue template scope — `@click="() => window.print()"` fails silently.
Always call a method:

```vue
<button class="download-btn" @click="downloadPdf" aria-label="Télécharger cette leçon en PDF">
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
       stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M12 3v14m0 0-5-5m5 5 5-5"/><path d="M3 20h18"/>
  </svg>
  <span>Télécharger</span>
</button>

<script setup>
function downloadPdf() { window.print() }
</script>
```

Style it with `--border` / `--text-2`, hover to `--accent`, and hide it in `@media print`.

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
is built), and prints with the sheet. **Each entry appears only when its colour is actually
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

### Astuce pages

Memory hooks for rules taught elsewhere — mnemonics, substitution tests, "look at the last
letter" shortcuts. A standard `<main class="lesson">` page with the PDF button.

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

Listen, type, compare — plus a Spanish clue per sentence and a `.print-only` answer sheet.
Dictées are the one interactive page type that *does* keep the PDF button.

The chrome is global: write `<main class="dictee">` and declare **no `<style>` block** —
`.prep-card`, `.spanish-prompt`, `.audio-controls` / `.btn-audio`, `.input-area`,
`.feedback-card`, `.comparison`, the red `.rule`, the `.result` screen and the whole
`@media print` answer sheet all live in `style.css`. Copy the structure from
`dictees/une-journee-en-vacances.vue` and replace only the `dictation` object.

Audio comes from **`useSpeech()`** — never hand-roll `SpeechSynthesisUtterance`. The
composable picks an installed French voice (`getVoices()` is empty until `voiceschanged`
fires, so it resolves lazily), exposes `speaking` to disable the buttons mid-utterance, and
cancels on unmount — without that, audio keeps playing after the learner navigates away.

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

Self-scoring, no PDF button. The shell is global: write `<main class="exo">` and rely on
`style.css` for `.instructions`, `.meta` / `.progress-track` / `.progress-fill`, `.card`,
`.feedback*`, `.actions`, `.btn-verify` / `.btn-next` / `.btn-restart` and the `.result`
score screen. Only the exercise's own *body* (board, pool, columns…) is styled scoped.

State shape shared by every exercise: `deck` (shuffled), `currentIndex`, `checked`,
`score`, `finished`, plus `resultEmoji` / `resultMsg` thresholds at 1 / 0.75 / 0.5.

**Vary the mechanic.** Nine of the first eleven exercises were the same 4-option MCQ.
Current coverage: MCQ (×9), matching pairs (`associe-les-pairs`), tap-to-order
(`phrases-en-desordre`), bucket sort (`etre-ou-avoir`), locate-and-retype
(`trouve-la-faute`), multi-select (`devine-les-temps`). Still unbuilt: **listening** (TTS
exists in `dictees/` and `prononciation/` via `useSpeech()`, but no exercise uses it),
full-paradigm conjugation typing, and timed rounds. Prefer a missing mechanic over a
tenth MCQ.

**Multi-answer questions need three result states, not two.** In `devine-les-temps` a chip
can be right (green ✓), wrongly ticked (red ✗) or *missed* (amber dashed +). Amber, not
red, for the omission: failing to spot the second tense is a different mistake from naming
a tense that is not there, and the learner has to see which one they made. Scoring is
all-or-nothing on the exact set — partial credit would hide exactly that distinction.

Feedback colors come from tokens (`--success*` / `--danger*`) — never a raw hex.

**Substitution exercises must be validated.** In `trouve-la-faute` the learner replaces one
token, so replacing `words[badIndex]` with `fix` *must* yield a grammatical sentence. Errors
of insertion, deletion or word order cannot be expressed that way. Check every item by
actually performing the substitution before shipping:

```bash
node -e "items.forEach(it=>{const o=[...it.words];o[it.badIndex]=it.fix;console.log(o.join(' '))})"
```

**Beware the global `section` rule.** `style.css` styles bare `section`/`article` as content
cards (`padding: 1.5rem 1.75rem`) and adds `section + section { margin-top: 1rem }`. A
`<section>` used as a layout box — a sort column, a panel — inherits both and will look
inset and vertically offset from its sibling. Reset `padding: 0; margin-top: 0`, or use a
`<div>`.

### Conversation (gap-fill) pages

Interactive drag-and-drop / type-in dialogues. No PDF button. The chrome is global:
write `<main class="gapfill">` and declare **no `<style>` block** — `.word-bank`, `.chip`,
`.chat`, `.bubble`, `.slot`, `.suggest`, `.actions`, `.result` and `.drag-ghost` all live in
`style.css`. Speakers are `.left` / `.right`, never character names, so the block stays
reusable. Copy the `<script setup>` (drag state, bank, accent-insensitive matching) verbatim
from `conversation/demander-son-chemin.vue` and replace only the `dialogue` array.

Dialogue data — each line is `{ who: 'left'|'right', parts: [...] }`, where a part is either
`{ text: '…' }` or a blank `{ id, answer, accept: […] }`.

**Never write `{ text: '' }`.** The older pages branch on `v-if="part.text"`, so an
empty-string part is falsy, gets rendered as a blank, and throws
`Cannot read properties of undefined (reading 'length')` on `part.answer.length` — the whole
route renders blank with only a console warning. If a line must *start* with a blank, just
make the blank the first element. New pages should branch on `v-if="part.id == null"`
instead, which cannot fail this way.

`accept` should carry the capitalised/uncapitalised variant whenever a blank starts a
sentence — matching is accent-insensitive but not case-insensitive at the data level.

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
`src/utils/viewMeta.js` reads these to show the **Nouveau** badge (sommaire, chapter
index) and the red dot (sidebar) when `updated` is today. Views created before tracking
began carry `created=2026-08-02`.

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
- **exercices** (14, interactive): associe-les-pairs, emoji-francais, quel-groupe-verbe-appartient, conjugaison-present, les-articles, la-negation, le-futur-proche, le-passe-compose, les-adverbes, les-adjectifs-accord, phrases-en-desordre, etre-ou-avoir, trouve-la-faute, devine-les-temps
- **lecture** (5): le-lion-et-le-rat, le-petit-prince, entretien-d-embauche, le-comte-de-monte-cristo, le-tour-du-monde
- **litterature** (1): introduction
- **prononciation** (1): les-syllabes-courantes
- **musique** (0 + 3 planned) — chapter shows "Bientôt"
- **vocabulaire** (11) — base first, then the everyday themes: 100-mots-les-plus-utilises,
  les-nombres, l-heure, les-jours-et-la-date, la-maison, les-vetements, la-ville,
  les-transports, le-travail, la-meteo, le-docteur
- **conversation** (6): en-vacances, a-la-boulangerie, a-disneyland-paris, chez-le-medecin, a-la-pharmacie, demander-son-chemin
- **theme** (5): la-famille, les-loisirs, la-nourriture, ecrire-un-livre, ah-si-jetais-riche
- **annexe** (utility routes, not chapters): a-propos, contact

Entries marked *planned* exist in `navigation.js` with `soon: true` — they render as
disabled "Bientôt" rows and have no route. Removing `soon` requires creating the view
and the route in the same change.

## 8. Keep context files in sync

Treat `AGENTS.md` as part of the deliverable. If behaviour and docs disagree, the change
is not done. In the **same change**:

- Added / renamed / moved / deleted a view or chapter → update `navigation.js`, the router,
  and §7 above.
- Changed a shared pattern (tokens, PDF button, lecture structure, layout width) → update
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
≤900 px drawer), and print-preview any page you touched that carries a PDF button.
