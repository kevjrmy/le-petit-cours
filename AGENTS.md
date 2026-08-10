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
  box), `.attention` (amber "À retenir"), `.exception` (red tint).
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
| `grammaire/`, `orthographe/`, `dictees/`, `prononciation/`, `musique/`, `vocabulaire/`, `theme/` | **yes** | standard lesson |
| `exercices/` | no | interactive, self-scoring |
| `conversation/`, `litterature/` | no | |
| `lecture/` | no | ends with the comprehension quiz + hidden translation |
| any `index.vue` | no | |

### Lesson structure (in order)

`<div class="rule">` main rule → `<table>` paradigm if needed → `<div class="example">`
2–4 examples → `<div class="attention">` one key exception → download button.

**Length: 1–2 A4 pages max** (one A4 ≈ 1123 px at 96 dpi). Two or three `<article>` blocks.
Split longer topics into two files.

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
- **orthographe** (3): les-homophones, les-determinants-possessifs, les-pronoms-possessifs
- **dictees** (1 + 2 planned): une-journee-en-vacances
- **exercices** (11, interactive): associe-les-pairs, emoji-francais, quel-groupe-verbe-appartient, conjugaison-present, les-articles, la-negation, le-futur-proche, le-passe-compose, les-adverbes, les-adjectifs-accord, phrases-en-desordre
- **lecture** (5): le-lion-et-le-rat, le-petit-prince, entretien-d-embauche, le-comte-de-monte-cristo, le-tour-du-monde
- **litterature** (1): introduction
- **prononciation** (1): les-syllabes-courantes
- **musique** (0 + 3 planned) — chapter shows "Bientôt"
- **vocabulaire** (2): 100-mots-les-plus-utilises, le-docteur
- **conversation** (5): en-vacances, a-la-boulangerie, a-disneyland-paris, chez-le-medecin, a-la-pharmacie
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
