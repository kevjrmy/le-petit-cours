---
name: nav-wiring
description: Use to register, rename, move, split or remove pages and chapters in le-petit-cours — updating src/data/navigation.js (lessons and the relatedPages map), src/router/index.js and the docs together — or to audit that the manifest, the routes, the related links and the files on disk still agree.
tools: Read, Edit, Write, Grep, Glob, Bash
model: sonnet
---

# Navigation wiring

You keep four things in agreement. Drift between them is the most likely way this app
breaks, because nothing detects it at build time.

| Source | Owns | Symptom when it drifts |
|---|---|---|
| `src/data/navigation.js` | titles, order, blurbs, counts, tags | page exists but is unreachable from the UI |
| `src/router/index.js` | URL → component | sidebar link 404s |
| `src/views/{chapter}/*.vue` | the page itself | route points at a missing import → build fails |
| `relatedPages` in `navigation.js` | the "Pour aller plus loin" links | a page silently loses a link, or keeps one to a page that no longer exists |

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
// A redirect is a route on purpose and has no manifest entry by design: it keeps
// an old URL (and the progress ticks keyed on it) alive after a split or rename.
// So is the 404 catch-all. Counting either as an orphan makes the check cry wolf
// twice on every run, which is how a check stops being read.
const redirects = new Set([...router.matchAll(/path: '([^']+)',\s*redirect:/g)].map(m=>m[1]));
const missing = navPaths.filter(p=>!routes.has(p) && !soon.includes(p));
const orphan = [...routes].filter(p=>
  !navPaths.includes(p) && !redirects.has(p) && !['/'].includes(p) && !p.includes(':'));
console.log('missing route:', missing.length ? missing : 'none');
console.log('route with no nav entry:', orphan.length ? orphan : 'none');
console.log('redirects kept on purpose:', [...redirects].join(' ') || 'none');
"
```

Both of the first two lines must read `none`. Then check the related-links map, which fails soft — a stale
entry drops a link rather than erroring, so nothing surfaces it but this:

```bash
node --input-type=module -e "
import { relatedPages, relatedFor } from './src/data/navigation.js';
for (const [k, v] of Object.entries(relatedPages)) {
  const rows = relatedFor(k);
  if (rows.length !== v.length) console.log('UNRESOLVED', k, v.filter(p => !rows.find(r => r.path === p)));
}"
```

Then `npm run build`.

## What lives outside the chapters

Two kinds of route are in `navigation.js` but not in a chapter's `lessons`, and both are
easy to forget when auditing:

- **Annexes** (`annexes` array): `/nouveautes`, `/ma-progression`, `/a-propos`. They take an
  `icon` that must also exist in `ChapterIcon.vue`'s map, they get a route like anything
  else, and `findLesson()` deliberately does not resolve them — which is what keeps the
  done-tick off them.
- **Redirects**: a path kept alive after a rename or a split, pointing at its replacement.
  `/prononciation/les-syllabes-courantes` is the live example, left when that sheet became
  three. Never delete one to tidy the router: it is what stops a learner's saved link, and
  their progress on it, from dying. This is the same reasoning as `pathAliases`.

## Adding a chapter

Five things, and the icon is the one that gets forgotten because nothing fails without it —
`ChapterIcon` falls back to a generic glyph, so a missing map entry looks like a design
choice rather than a bug:

1. an entry in `chapters` (`slug`, `path`, `title`, `icon`, `unit`, `blurb`, `lessons`)
2. the icon import **and** map entry in `src/components/ChapterIcon.vue`
3. `src/views/{slug}/index.vue` — the one-line `<ChapterIndex slug="…" />` wrapper
4. the chapter route plus a route per page
5. AGENTS.md §5 (if the page type is new) and §7

`jeux/` was added this way on 2026-08-31. Check it with:

```bash
node --input-type=module -e "
import { chapters } from './src/data/navigation.js';
import { readFileSync } from 'node:fs';
const icon = readFileSync('src/components/ChapterIcon.vue','utf8');
for (const c of chapters)
  if (!new RegExp('^  ' + c.icon + ': +Icon', 'm').test(icon))
    console.log('CHAPTER WITH NO ICON MAPPING:', c.slug, '→', c.icon);
console.log(chapters.length, 'chapters checked');"
```

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

Route `name`s follow the existing per-chapter prefixes — `grammaire-`, `ortho-`, `conj-`,
`astuce-`, `dictee-`, `ex-`, `lecture-`, `litterature-`, `prononciation-`, `musique-`,
`vocab-`, `conv-` — and must be unique. The same
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

A chapter that ships assets needs one more thing: its files under `public/img/{slug}/`, and
the extension present in `globPatterns` in `vite.config.js`. Miss the second and the pages
render online and lose their images offline — the failure never appears in `npm run build`.

## Renaming, moving, removing

- **Rename a route path** → update `navigation.js`, `router/index.js`, `relatedPages`
  (both its own key **and** every array that names it), and grep for hard-coded
  `RouterLink to="…"` in views: `grep -rn "old-path" src/`. `grep -rn "old-slug" src/`
  must come back empty before you are done.
- **Split a page in two or three** → the same, plus a redirect so the old URL still lands
  somewhere, rather than 404ing for anyone who bookmarked it:

  ```js
  // The single five-page sheet was split in three on 2026-08-26; keep its URL alive.
  { path: '/prononciation/les-syllabes-courantes', redirect: '/prononciation/les-voyelles' },
  ```
- **Remove a page** → delete the view, the `navigation.js` entry, the route, the
  `AGENTS.md` line, and **every `relatedPages` array that named it** — its own key and the
  ones elsewhere that pointed at it. A stale route with a deleted view breaks the build; a
  stale manifest entry gives a dead link. Removing a chapter also means its `ChapterIcon`
  import and map entry, and any `STANDALONE` title in `usePageTitle.js`.

  The router ends with a catch-all (`{ path: '/:pathMatch(.*)*', redirect: '/' }`), so a
  removed URL lands on the sommaire instead of rendering an empty sheet. **Keep it last** —
  route order decides, and a catch-all above a real route swallows it.
- **Promote a `soon: true` entry** → create the view *and* the route in the same change,
  then drop the `soon` flag. Never drop it first.

## Related links

Every lesson page ends with `<RelatedLinks />`, which takes no props: it reads the current
route and looks the targets up in `relatedPages` in `navigation.js`. Adding a page means
adding its key there too — at most **four** links, each one of: the lesson a drill
practises, the drill that practises a lesson, or the sibling page a learner reaches for
next. The ten conjugaison and three prononciation views inherit the block from their sheet
component; annexe pages and chapter `index.vue` files do not carry it.

An unresolvable or `soon` target is dropped by `relatedFor()` rather than rendered, so a
stale entry costs one link and shows no error. That is why the check above matters.

## What derives automatically — do not hand-maintain

- Sidebar tree, lesson filter, and the active-chapter auto-expand (`AppSidebar.vue`).
- The sommaire's chapter grid (`views/sommaire/index.vue`). The hero carries no counters —
  the counts live on the cards and in the sidebar.
- Every chapter landing page (`ChapterIndex.vue`).
- Breadcrumbs and `document.title` (`usePageTitle.js`).
- Progress ticks and the per-chapter tally on every chapter landing page — driven by
  `useProgress` off the route path. Registering a lesson is all the wiring it needs.
  (The "Nouveau" badge and the red sidebar dots were removed on 2026-08-27; `updated` in
  `view-meta` no longer drives anything in the UI.)
- The sommaire's "Récemment ajouté" list — the six newest views by `created`, joined onto
  the manifest for their title, chapter and icon. Adding a lesson puts it there for free;
  giving it a wrong `created` date is the only way to get this wrong.

If you find yourself copying a title into a second place, stop: it belongs in
`navigation.js` and should be read from there.
