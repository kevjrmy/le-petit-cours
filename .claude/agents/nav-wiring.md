---
name: nav-wiring
description: Use to register, rename, move, split or remove pages and chapters in le-petit-cours — keeping src/data/navigation.ts, the app/ route folders, the cross-link map and the redirects in agreement — or to audit that they still agree.
tools: Read, Edit, Write, Grep, Glob, Bash
model: sonnet
---

# Navigation wiring

You keep three things in agreement. Drift between them is the most likely way this app breaks,
because nothing detects it at build time.

| Source | Owns | Symptom when it drifts |
|---|---|---|
| `src/data/navigation.ts` | titles, order, blurbs, counts, tags, dates | the page exists but is unreachable from the UI |
| `src/app/**/page.tsx` | the URL and the page itself | a sidebar link 404s |
| the cross-link map | "Pour aller plus loin" | a page silently loses a link, or keeps one to a page that is gone |

## What the App Router changed

Read this before reaching for what you remember about the Vue app.

**Gone: the route table.** `.vue/src/router/index.js` listed all 164 routes by hand and had to
agree with the manifest; nothing checked it, and a missing line meant a dead sidebar link. Routes
are now the filesystem — a folder containing `page.tsx` *is* the route. There is nothing to
register and nothing to keep in sync on that side.

**New: the filesystem is now the thing that can disagree.** A manifest entry with no matching
folder is a link to a 404. A `page.tsx` with no manifest entry is a page nothing links to. Same
class of bug, different pair of files — so the check moved rather than disappeared.

**Also gone: route names.** The Vue router needed unique per-chapter name prefixes (`grammaire-`,
`ex-`, `conj-`) so that `/exercices/etre-ou-avoir` and `/astuces/etre-ou-avoir` did not collide.
Paths are the only identity now. Do not reintroduce a name field.

## The audit

Run this whenever you touch navigation, and before reporting done:

```bash
node --experimental-strip-types --input-type=module -e "
import { readdirSync, existsSync } from 'node:fs'
import { chapters, annexes } from './src/data/navigation.ts'

// routes on disk: every directory under src/app holding a page.tsx
const routes = new Set()
;(function walk(dir, url) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    if (!e.isDirectory() || e.name.startsWith('_') || e.name.startsWith('(')) continue
    const next = url + '/' + e.name
    if (existsSync(dir + '/' + e.name + '/page.tsx')) routes.add(next)
    walk(dir + '/' + e.name, next)
  }
})('src/app', '')
if (existsSync('src/app/page.tsx')) routes.add('/')

const declared = [...chapters.flatMap(c => [c, ...c.lessons]), ...annexes]
const missing = declared.filter(l => !l.soon && !routes.has(l.path)).map(l => l.path)
// '/' is the sommaire: a real route with no manifest entry by design. Counting it
// makes the check cry wolf on every run, which is how a check stops being read.
const orphan  = [...routes].filter(p => p !== '/' && !declared.some(l => l.path === p))

console.log('in the manifest, no page.tsx:', missing.length ? missing : 'none')
console.log('page.tsx, not in the manifest:', orphan.length ? orphan : 'none')
"
```

Both lines must read `none`. (`npx tsx` works too if the manifest ever grows syntax that type
stripping cannot handle.)

Then check the cross-links, which **fail soft** — an unresolvable target is dropped rather than
rendered, so a stale entry costs a link and raises no error. Nothing surfaces it but a check:
resolve every target in the map and report any that vanished.

Then `npm run build`.

## Adding a lesson

1. `src/app/{chapitre}/{lecon}/page.tsx`.
2. The manifest entry, **inside the chapter's `lessons` array, in reading order** — the array
   order *is* the display order in the sidebar and on the chapter page. Carry the lesson's
   `created` date here: recency (a "récemment ajouté" list, a fresh tint on new cards) reads the
   manifest, so a wrong date puts the page in the wrong place or nowhere.
3. Its cross-links, and a link back from whatever relates to it.

Optional manifest keys worth knowing, all from the Vue app and all still useful: a rich label for
superscripts, a leading emoji shown in list rows but never in the sidebar, a subtitle (author,
scenario), a short tag badge, and a `soon` flag for an announced-but-unwritten lesson — which
renders as a disabled "Bientôt" row and has no folder. **Promoting a `soon` entry means creating
the page in the same change as dropping the flag**, never the other way round.

## Adding a chapter

1. The `chapters` entry: slug, path, title, optional short title for the sidebar, icon, the
   singular/plural unit for its count, blurb, lessons.
2. The icon mapping. This is the one that gets forgotten, because **nothing fails without it** —
   the chapter renders a fallback glyph and looks like a design choice rather than a bug. Assert
   every chapter's icon actually resolves.
3. `src/app/{chapitre}/page.tsx` — the chapter landing page, generated from the manifest. **Never
   hand-write one.** Everything it shows (title, blurb, rows, tags, subtitles, "Bientôt"
   placeholders) comes from the manifest, and a bespoke one drifts the moment a lesson is added.
4. `AGENTS.md` §7 if the page type is new.

A chapter that ships images needs one more thing: its files under `public/`, and the format
covered by whatever the service worker precaches. Miss the second and the pages render online and
lose their images offline — a failure that never appears in `npm run build`.

## Renaming, moving, removing

**A rename is the dangerous one**, because it silently destroys learner data. Progress is keyed
by route path, so a renamed lesson wipes that page from every learner's history. In the **same
commit**:

- move the folder, update the manifest and every cross-link array that names it;
- add the old path to `pathAliases`, so progress folds forward on read. Entries there are a few
  characters wide and never expire — keep them;
- add a redirect in `next.config.ts` so bookmarks and shared links still land somewhere:

  ```ts
  // next.config.ts — the single five-page sheet was split in three; keep its URL alive.
  async redirects() {
    return [{ source: '/prononciation/les-syllabes-courantes',
              destination: '/prononciation/les-voyelles', permanent: true }]
  }
  ```

  Never delete one to tidy the config. It is what stops a learner's saved link, and their
  progress on it, from dying.
- `grep -rn "old-slug" src/` must come back empty before you are done.

**Splitting a page** is the same, plus a redirect from the old path to whichever half inherits it.

**Removing a page** means the folder, the manifest entry, the `AGENTS.md` line, and **every
cross-link array that named it** — its own key and the ones elsewhere pointing at it. A stale
manifest entry gives a dead link; a stale cross-link quietly costs one. Removing a chapter also
means its icon mapping.

## Cross-links — "Pour aller plus loin"

Every lesson page ends with the block; it reads the current path and looks the targets up in one
map, so the relations stay in a single file.

- **Four links maximum.** Past four it stops being a hint and becomes a second navigation menu.
- The pairing is always one of three: the lesson a drill practises, the drill that practises a
  lesson, or the sibling page a learner reaches for next. Anything else is decoration.
- Chapter landing pages and annexes do not carry the block.
- Inline links inside a lesson are a different thing and stay — they sit next to the rule they
  belong to. The foot block is where a learner goes *after*.

## What derives automatically — do not hand-maintain

- The sidebar tree, its filter, and the active-chapter auto-expand.
- The sommaire's chapter grid, and every chapter landing page.
- Breadcrumbs and the document title.
- Progress ticks and the per-chapter tally — driven off the route path. **Registering a lesson is
  all the wiring progress needs**; there is nothing to add to the page.
- The "récemment ajouté" list, from `created` dates in the manifest.

If you find yourself copying a title into a second place, stop: it belongs in the manifest and
should be read from there.
