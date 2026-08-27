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
  scroll position across navigation. The two layouts only own the reading sheet and are
  identical — `AltLayout` for lessons, `DefaultLayout` for exercises and the sommaire.
- `src/views/{chapter}/index.vue` is always a one-line `<ChapterIndex slug="…" />` wrapper.
- Two chapters are **data-driven**: `conjugaison/` renders from `src/data/conjugaisons.js`
  through `ConjugationSheet.vue`, and `prononciation/` from `src/data/prononciation.js`
  through `PronunciationSheet.vue`. Their views are one-line wrappers too.
- `src/composables/` holds the shared behaviour: `useTheme`, `useSidebar`, `usePageTitle`,
  `useSpeech` for the audio pages, and `useProgress` for the done-ticks. `src/utils/shuffle.js`
  is the one shuffle every drill imports — never re-implement it in a view.
- Every view starts with `<!-- view-meta: created=YYYY-MM-DD; updated=YYYY-MM-DD -->`;
  `src/utils/viewMeta.js` turns `created` into the sommaire's "Récemment ajouté" list and
  into the warm tint on chapter-index rows added in the last week. The "Nouveau" badge and
  the sidebar dots were removed on 2026-08-26.

## Content rules

- The reading column is `--max-width: 52rem`, sized for reading on screen. It was pinned to
  A4 while pages printed; PDF export was removed on 2026-08-26.
- A lesson is two or three `<article>` blocks. A topic needing more than that is two lessons.
- Glossaries and translation columns are in **Spanish**, never English.
- Lecture pages end with a button-based comprehension quiz and a hidden Spanish translation.
- Every lesson page ends with `<RelatedLinks />` — up to four cross-links, declared in
  `relatedPages`.

## Progress

Learners tick pages off by hand — including exercises, which record their last score but
never mark themselves done. The « J'ai terminé » control is rendered by the two layouts and
appears on any route `navigation.js` knows as a lesson, so **adding a lesson needs no
progress work**; `src/views/annexe/ma-progression.vue` is the summary page.

Progress is keyed by route path and stored in `localStorage` behind a swappable adapter in
`useProgress.js` — the seam for real accounts later. Renaming a lesson path would orphan
every tick on it, so a rename must add the old path to `pathAliases` in `navigation.js` in
the same commit. See AGENTS.md §6b.

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
