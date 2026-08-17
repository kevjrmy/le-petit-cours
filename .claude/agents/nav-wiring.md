---
name: nav-wiring
description: Use to register, rename, move or remove pages and chapters in le-petit-cours — updating src/data/navigation.js, src/router/index.js and the docs together — or to audit that the manifest, the routes and the files on disk still agree.
tools: Read, Edit, Write, Grep, Glob, Bash
model: sonnet
---

# Navigation wiring

You keep three things in agreement. Drift between them is the most likely way this app
breaks, because nothing detects it at build time.

| Source | Owns | Symptom when it drifts |
|---|---|---|
| `src/data/navigation.js` | titles, order, blurbs, counts, tags | page exists but is unreachable from the UI |
| `src/router/index.js` | URL → component | sidebar link 404s |
| `src/views/{chapter}/*.vue` | the page itself | route points at a missing import → build fails |

## The audit

Run this whenever you touch navigation, and before reporting done:

```bash
node --input-type=module -e "
import fs from 'fs';
const nav = fs.readFileSync('src/data/navigation.js','utf8');
const router = fs.readFileSync('src/router/index.js','utf8');
const navPaths = [...nav.matchAll(/path: '([^']+)'/g)].map(m=>m[1]);
const soon = [...nav.matchAll(/\{ path: '([^']+)'[^}]*soon: true/g)].map(m=>m[1]);
const routes = new Set([...router.matchAll(/path: '([^']+)'/g)].map(m=>m[1]));
const missing = navPaths.filter(p=>!routes.has(p) && !soon.includes(p));
const orphan = [...routes].filter(p=>!navPaths.includes(p) && !['/','/a-propos','/contact'].includes(p));
console.log('missing route:', missing.length ? missing : 'none');
console.log('route with no nav entry:', orphan.length ? orphan : 'none');
"
```

Both lines must read `none`. Then `npm run build`.

## Adding a lesson

`navigation.js` entry (inside the chapter's `lessons` array, in reading order):

```js
{ path: '/grammaire/les-adjectifs', title: 'Les adjectifs' }
```

Optional keys: `titleHtml` (rich label — superscripts), `emoji` (leading emoji, shown in
list rows only, never in the sidebar), `subtitle` (author / scenario / description line),
`tag` (short badge), `soon: true` (announced, no route yet — renders disabled "Bientôt").

Route, in the matching chapter group:

```js
{ path: '/grammaire/les-adjectifs', name: 'grammaire-les-adjectifs',
  component: () => import('../views/grammaire/les-adjectifs.vue') },
```

Keep `import()` **static and literal** — Vite needs it to code-split. No template strings,
no dynamic mapping.

Route `name`s follow the existing per-chapter prefixes (`grammaire-`, `ortho-`, `conj-`, `astuce-`,
`ex-`, `lecture-`, `conv-`, `theme-`, `vocab-`, `dictee-`) and must be unique. The same
slug can appear in two chapters (`/exercices/etre-ou-avoir` and `/astuces/etre-ou-avoir`),
so the prefix is what keeps the names apart — check for collisions:

```bash
grep -o "name: '[^']*'" src/router/index.js | sort | uniq -d
```

## Adding a chapter

1. `chapters` entry in `navigation.js`: `slug`, `path`, `title`, optional `shortTitle`
   (used in the sidebar and breadcrumbs when the full title is long), `icon`, `unit`
   (`['leçon', 'leçons']` — singular/plural for the count), `blurb`, `lessons`.
   Array order **is** the display order in the sidebar and the sommaire.
2. `ChapterIcon.vue`: a static `import Icon… from '~icons/mdi/…'` plus a map entry keyed by
   the `icon` value. The auto-resolver cannot handle dynamic icon names — omit this and the
   chapter renders the fallback document glyph.
3. `src/views/{slug}/index.vue` — a one-line `<ChapterIndex slug="{slug}" />` wrapper.
   Never write a bespoke chapter index.
4. Routes for the index and every lesson.
5. The §7 list in `AGENTS.md`.

## Renaming, moving, removing

- **Rename a route path** → update `navigation.js`, `router/index.js`, and grep for
  hard-coded `RouterLink to="…"` in views: `grep -rn "old-path" src/`.
- **Remove a page** → delete the view, the `navigation.js` entry, the route, and the
  `AGENTS.md` line. A stale route with a deleted view breaks the build; a stale manifest
  entry gives a 404 link.
- **Promote a `soon: true` entry** → create the view *and* the route in the same change,
  then drop the `soon` flag. Never drop it first.

## What derives automatically — do not hand-maintain

- Sidebar tree, lesson filter, and the active-chapter auto-expand (`AppSidebar.vue`).
- Sommaire hero stats and chapter grid (`views/sommaire/index.vue`).
- Every chapter landing page (`ChapterIndex.vue`).
- Breadcrumbs and `document.title` (`usePageTitle.js`).
- "Nouveau" badges and sidebar dots — driven by the `view-meta` comment dates via
  `utils/viewMeta.js`, not by the manifest.

If you find yourself copying a title into a second place, stop: it belongs in
`navigation.js` and should be read from there.
