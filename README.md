# Le Petit Cours

Vue 3 + Vite PWA teaching A2 French to native Spanish speakers. Bled-style content inside a
Claude.ai-style app shell, tricolore palette, light and dark.

## Stack

- Vue 3 with `<script setup>`, Vite, Vue Router, `vite-plugin-pwa`
- Pure CSS — design tokens, content patterns and the per-page-type shells all live in
  `src/style.css`. No Tailwind, no utility libraries, no CSS-in-JS.

## Project shape

- **`src/data/navigation.js` is the single source of truth** for chapters, lessons and the
  `relatedPages` cross-link map. The sidebar, the sommaire and every chapter index read from
  it — there is no auto-discovery.
- `src/router/index.js` declares every route explicitly, with static `import()` so Vite can
  code-split. It must agree with `navigation.js`; nothing syncs them.
- `src/App.vue` owns the shell (sidebar + topbar + `<RouterView>`), so the sidebar keeps its
  scroll position across navigation. The two layouts only own the A4 reading sheet and are
  identical — `AltLayout` for lessons, `DefaultLayout` for exercises and the sommaire.
- `src/views/{chapter}/index.vue` is always a one-line `<ChapterIndex slug="…" />` wrapper.
- Two chapters are **data-driven**: `conjugaison/` renders from `src/data/conjugaisons.js`
  through `ConjugationSheet.vue`, and `prononciation/` from `src/data/prononciation.js`
  through `PronunciationSheet.vue`. Their views are one-line wrappers too.
- `src/composables/` holds the shared behaviour: `useTheme`, `useSidebar`, `usePageTitle`,
  and `useSpeech` for the audio pages.
- Every view starts with `<!-- view-meta: created=YYYY-MM-DD; updated=YYYY-MM-DD -->`;
  `src/utils/viewMeta.js` turns those dates into the "Nouveau" badge and the sidebar dot.

## Content rules

- Lessons are constrained to A4 width (`--max-width: 794px` = 210 mm at 96 dpi) so every
  page prints to PDF without reflowing. Never widen it.
- Lesson pages fit **1–2 A4** (vocabulary references, 3). Measure by printing to PDF and
  counting pages, not by eye.
- Glossaries and translation columns are in **Spanish**, never English.
- `grammaire/`, `orthographe/`, `conjugaison/`, `astuces/`, `dictees/`, `prononciation/`,
  `musique/`, `vocabulaire/` and `theme/` carry a `downloadPdf()` button; `exercices/`,
  `conversation/`, `litterature/`, `lecture/` and every `index.vue` do not.
- Lecture pages end with a button-based comprehension quiz and a hidden Spanish translation.
- Every lesson page ends with `<RelatedLinks />` — up to four cross-links, declared in
  `relatedPages`.

## Docs

| File | Carries |
|---|---|
| `AGENTS.md` | the conventions and the traps — read before touching anything |
| `.claude/agents/*.md` | the how-to for each recurring job (design, lessons, drills, wiring, auditing, proofreading) |
| `AUDIT.md` | known-open bugs, and what has been verified clean |

## Commands

```sh
npm install
npm run dev      # http://localhost:5173
npm run build    # must pass before a change is done
npm run preview
npm run generate-pwa-icons
```
