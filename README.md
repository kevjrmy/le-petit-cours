# Le Petit Cours

Vue 3 + Vite PWA for A2 French lessons aimed at native Spanish speakers.

## Stack

- Vue 3 with `<script setup>`
- Vite
- Vue Router
- `vite-plugin-pwa`
- Pure CSS — design tokens, content patterns and the per-page-type shells all live in `src/style.css`

## Project Shape

- `src/data/navigation.js` is the single source of truth for chapters and lessons — the sidebar, sommaire and every chapter index read from it.
- `src/router/index.js` defines all routes explicitly, and must agree with `navigation.js` (nothing syncs them automatically).
- `src/views/{chapter}/index.vue` files list lessons inside each chapter.
- `src/composables/` holds the shared behaviour: theme, sidebar, page title, and `useSpeech` for the audio pages.
- `src/views/sommaire/index.vue` discovers chapter counts with `import.meta.glob`.
- `src/layouts/DefaultLayout.vue` is used for the home/sommaire shell.
- `src/layouts/AltLayout.vue` is used for lesson pages with back navigation.
- `AGENTS.md` is the source of project conventions and must stay synchronized with route/view changes.
- Every view file starts with `<!-- view-meta: created=YYYY-MM-DD; updated=YYYY-MM-DD -->`.
- Index pages can use `src/utils/viewMeta.js` to show a new badge for views created today.

## Commands

```sh
npm install
npm run dev
npm run build
npm run preview
npm run generate-pwa-icons
```

## Content Rules

- Lessons use a modern Bled-style layout constrained to A4 width (`--max-width: 794px`).
- Glossaries and translation columns use Spanish, not English.
- Non-exercise lesson pages use a `downloadPdf()` method that calls `window.print()`.
- Exercise pages, lecture pages, conversation pages, litterature pages, and index pages do not include the PDF button.
- Lesson pages fit 1–2 A4 (vocabulary references, 3). Measure by printing to PDF and counting pages, not by eye.
- Lecture pages end with a button-based comprehension quiz and a hidden Spanish translation panel.
