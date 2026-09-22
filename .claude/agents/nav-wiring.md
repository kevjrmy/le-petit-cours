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

## There is no route table

**Routes are the filesystem.** A folder containing `page.tsx` *is* the route. Nothing registers a
route and there is no list of them to keep in step.

**So the filesystem is the thing that can disagree with the manifest.** An entry with no matching
folder is a link to a 404; a `page.tsx` with no entry is a page nothing links to. Neither fails a
build, which is what the audit below exists for.

**Nothing routes by name, and `id` is not a name.** The manifest carries a required `id` per
lesson; it looks like a route name and is not one. It is what progress is keyed by, it addresses no
route, and it never changes (`docs/decisions.md` #50).

## The audit

Run this whenever you touch navigation, and before reporting done:

```bash
node --experimental-strip-types --input-type=module -e "
import { readdirSync, readFileSync, existsSync } from 'node:fs'
import { chapters, annexes, relatedPages, featuredChapterSlugs, unlistedPages } from './src/data/navigation.ts'

// Routes on disk: every directory under src/app holding a page.tsx. Dynamic
// segments are skipped here and resolved from the manifest just below.
const routes = new Set()
;(function walk(dir, url) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    if (!e.isDirectory() || e.name.startsWith('_') || e.name.startsWith('(') || e.name.startsWith('[')) continue
    const next = url + '/' + e.name
    if (existsSync(dir + '/' + e.name + '/page.tsx')) routes.add(next)
    walk(dir + '/' + e.name, next)
  }
})('src/app', '')
if (existsSync('src/app/page.tsx')) routes.add('/')

// Every chapter landing page comes from one generated route.
if (existsSync('src/app/[chapitre]/page.tsx')) for (const c of chapters) routes.add(c.path)

// So does every verb sheet (#56). A chapter whose pages are generated from a
// data file needs a line here, or its lessons read as missing on every run —
// the walk above skips `[verbe]` along with every other dynamic segment.
if (existsSync('src/app/conjugaison/[verbe]/page.tsx'))
  for (const l of chapters.find(c => c.slug === 'conjugaison').lessons) routes.add(l.path)

// Real routes with no manifest entry, by design — the home page, the results
// page and the specimen. The list is `unlistedPages` in the manifest rather
// than a copy here, so adding such a route is a manifest edit like any other.
// (The sommaire *is* in the manifest, as an annexe, because the sidebar links
// it.)
const allowed = new Set(unlistedPages)

const declared = [...chapters.flatMap(c => [c, ...c.lessons]), ...annexes]
const missing = declared.filter(l => !routes.has(l.path)).map(l => l.path)
const orphan  = [...routes].filter(p => !allowed.has(p) && !declared.some(l => l.path === p))

// Cross-links fail soft — an unresolvable target is dropped rather than
// rendered — so nothing but this surfaces a stale one.
const paths = new Set(declared.map(l => l.path))
const stale = Object.entries(relatedPages).flatMap(([from, tos]) => [
  ...(paths.has(from) ? [] : [from + ' (source)']),
  ...tos.filter(t => !paths.has(t)).map(t => from + ' -> ' + t),
])

// The home page's pills are the one hand-kept list in the manifest, and they
// fail soft in the same way — a slug that resolves to nothing costs a pill and
// says so nowhere.
const slugs = new Set(chapters.map(c => c.slug))
const pills = featuredChapterSlugs.filter(s => !slugs.has(s))

// A page marked perLevel holds one body of work per level, in a module beside
// its page.tsx (#68, #76): questions.ts exporting SETS for a reading quiz,
// data.ts exporting BANKS for a drill. Its keys and the manifest's levels are
// two lists that must say the same thing, and the manifest wins where they
// differ — so a level tagged with nothing behind it serves another level's
// material rather than failing. Nothing else says so.
//
// The other direction is the one that costs a tick: several sets and no
// perLevel means two bodies of work sharing one circle, and adding the flag
// later moves every tick on the page. A single set with no flag is the ordinary
// case and fine -- the module is just where that page keeps its data.
//
// No backticks in these comments: the whole script is a double-quoted bash
// string, so bash would run their contents as commands before node sees it.
const sets = []
for (const l of declared) {
  const levels = l.levels ?? []
  let keys = null
  for (const [file, name] of [['/questions.ts', 'SETS'], ['/data.ts', 'BANKS']]) {
    const path = './src/app' + l.path + file
    if (!existsSync(path)) continue
    const map = (await import(path))[name]
    if (map) { keys = Object.keys(map).sort(); break }
  }
  if (keys === null) {
    if (l.perLevel) sets.push(l.path + ' -> perLevel, no per-level module')
    continue
  }
  if (!l.perLevel) {
    if (keys.length > 1) sets.push(l.path + ' -> ' + keys.length + ' sets [' + keys + '], no perLevel in the manifest')
    continue
  }
  const want = [...levels].sort().join(',')
  if (keys.join(',') !== want) sets.push(l.path + ' -> module [' + keys + '] vs manifest [' + want + ']')
}

// Cross-links are declared in the manifest and checked above. An inline
// Link inside a lesson's prose is not: it is hand-written beside the rule it
// belongs to, nothing resolves it, and a typo there is a 404 that the build
// does not see and the shell cannot fail soft around. /connexion is reachable
// without being a route -- it is a redirect in next.config.ts, matched before
// the filesystem (#26).
const sources = []
;(function collect(dir) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const full = dir + '/' + e.name
    if (e.isDirectory()) collect(full)
    else if (e.name.endsWith('.tsx')) sources.push(full)
  }
})('src')
const reachable = new Set([...paths, ...allowed, '/connexion'])
const dead = []
for (const file of sources)
  for (const m of readFileSync(file, 'utf8').matchAll(/href=\"(\/[^\"]*)\"/g))
    if (!reachable.has(m[1].split('?')[0].split('#')[0]))
      dead.push(file.replace('src/app', '') + ' -> ' + m[1])

console.log('in the manifest, no page.tsx:', missing.length ? missing : 'none')
console.log('page.tsx, not in the manifest:', orphan.length ? orphan : 'none')
console.log('cross-links that resolve to nothing:', stale.length ? stale : 'none')
console.log('home pills that resolve to nothing:', pills.length ? pills : 'none')
console.log('per-level material that disagrees with the manifest:', sets.length ? sets : 'none')
console.log('inline links that resolve to nothing:', dead.length ? dead : 'none')
"
```

All six lines must read `none`. (`npx tsx` works too if the manifest ever grows syntax that type
stripping cannot handle.)

The last four matter most, because they all **fail soft or worse**: an unresolvable cross-link or
home pill is dropped rather than rendered, and a level with no question set behind it shows another
level's questions — each costs something real and raises no error anywhere else. The inline link is
the one that does not fail soft: it renders, it is clickable, and it lands on a 404.

**A chapter's `outbound` link is checked by none of the six**, because it leaves the site: the audit
walks `src/app` and the manifest, and neither knows whether someone else's page still exists. It is
also the one link in the course that does nothing offline. Curl it when you touch it, and never
hang anything a page needs on it — `delf`'s exists because #78 forbids hosting the file it points
at, not because the chapter is incomplete without it.

Then `npm run build`.

## Adding a lesson

1. `src/app/{chapitre}/{lecon}/page.tsx`.
2. The manifest entry, **inside the chapter's `lessons` array, in reading order** — the array
   order *is* the display order in the sidebar and on the chapter page. Carry the lesson's
   `created` date here: recency (a fresh tint on a new card, and whatever "récemment ajouté" page
   is eventually written) reads the manifest, so a wrong date puts the page in the wrong place or
   nowhere.
3. Its cross-links, and a link back from whatever relates to it.

`levels` is **required** on every entry, and `[]` is how you say "no level, always visible" — an
omitted field and a deliberate `[]` must not look the same in a diff (`docs/decisions.md` #23).
Write it as `from("A2")` — the rung the page is written at, and every rung above it, because a
page is listed from its floor upward (#76). A tag written out — `["A1"]` — is the exception and
claims something higher up supersedes the page. **Never widen downward**: an A1 learner who needs
the topic gets the simpler A1 page (#72), not the A2 page's tag.

`perLevel: true` is the separate claim that the page holds **one body of work per level** — a
question set or an item bank per rung. It is what the tick keys on, so adding or removing it moves
every tick on the page between `id` and `id@LEVEL`, silently: ship the backfill in the same commit.
A page that sets it lists exactly the levels it has material for, so `from()` is wrong there.

`id` is **required** too, and it is the one field you can never revise. It is the key every
progress tick is stored under (#50), so pick it once when the entry is written and treat it as
frozen from that commit on. Shape: lower case, digits and hyphens, alphanumeric at both ends. The
convention is a short chapter prefix and the lesson's own name — `gram-articles`, `ex-pluriel`,
`conj-etre` — which keeps ids readable in a diff and steps around the collisions paths already have
(`/grammaire/les-articles` and `/exercices/les-articles` are two lessons). **The prefix is a
reading aid, not a lookup key**: nothing parses it, and a lesson that later moves to another
chapter keeps the id it was born with rather than being renamed to match.

Duplicates and malformed ids throw when `src/data/navigation.ts` is *imported*, so they fail
`npm run build` — and the audit below, which imports it too.

Optional manifest keys worth knowing: a rich label for superscripts, a subtitle (author, scenario),
a short tag badge, the DELF descriptor and the `created` date.

**There is no flag for a lesson that does not exist yet** (`docs/decisions.md` #51). An entry goes
in the manifest in the same commit as its `page.tsx`, never before — the old `soon` flag and the
"Bientôt" row it drew were deleted along with the thirty-nine placeholder entries. A chapter with
an empty `lessons` array is fine and is the normal state of most of them: `listedChapters()` keeps
it out of the sidebar, the sommaire, the home pills and search until its first lesson lands, and
its landing page says so honestly to anyone arriving by URL. **Do not add a placeholder entry, a
dimmed row or a "planned" count to fill a chapter out.**

## Adding a chapter

1. The `chapters` entry: slug, path, title, optional short title for the sidebar, blurb, lessons,
   **and `icon`**. There is no count noun any more — nothing counts a chapter. The icon is required and its
   type is a union, so a chapter without one does not compile and a name with no drawing does not
   either — add the glyph to `src/components/nav/ChapterIcon.tsx` in the same change. **Never give
   that map a `default` entry**: an earlier version of it ended `?? icons.default`, so a forgotten
   chapter rendered a generic glyph, looked like a design choice and failed nowhere (#29, repaired
   by #42).
   The mark on a *sommaire card* is still the chapter's initial in the serif — a different surface
   with room for lettering, and nothing to keep in step.
2. **Nothing else.** `src/app/[chapitre]/page.tsx` renders every chapter landing page from the
   manifest, so the new chapter has one the moment its entry exists. Never hand-write one, and
   never add a `src/app/{chapitre}/page.tsx` beside it — everything the page shows (title, blurb,
   rows, tags, levels, the empty-chapter message) comes from the manifest, and a bespoke one drifts
   the moment a lesson is added. A new chapter with no lessons is invisible in every listing until
   its first page exists (#51) — that is expected, not a wiring fault.
3. `AGENTS.md` §7 if the page type is new.

A chapter that ships images needs one more thing: its files under `public/`, and the format
covered by whatever the service worker precaches. Miss the second and the pages render online and
lose their images offline — a failure that never appears in `npm run build`.

## Adding an annexe — a page that belongs to no chapter

`where` says which surface offers it, and the union makes each position ask for what that surface
draws. Give it the wrong position and nothing fails; give it a position without its fields and it
does not compile, which is the point.

| `where` | Drawn | Also required |
|---|---|---|
| `top` | above the chapter list | `icon` |
| `tree` | the foot of the sidebar, with the chapters | `icon` |
| `menu` | the account popover | `icon`, **`signedOut`** |
| `footer` | the line under the home page and its own pages | nothing — it is text |

`signedOut` is `"hide"` or `{ title }` (#47, #70). `hide` drops the row for a visitor with no
account; a title replaces the signed-in one where the page is a different offer without one, and
**that row becomes the way in** — the popover appends `?suivant=` to it so signing in returns the
learner to the page they were on. There is no default: a popover row has to say which it is.

A new `icon` means a new member of `IconName` **and** a drawing in `ChapterIcon.tsx`, exactly as a
chapter's does. A `footer` annexe is reachable from the home page only, so put a page anywhere else
if a lesson has to link it (#63).

## Renaming, moving, removing

**A rename used to be the dangerous one**, and is not any more: progress is keyed by the lesson's
`id`, not by its path (`docs/decisions.md` #50), so a renamed page keeps every tick on it. What
this now means is one rule with no exceptions — **never change a lesson's `id`**. Changing one
deletes that lesson from every learner's history, silently, and nothing anywhere will fail. Rename
the folder, the path and the title as freely as the course needs; leave the id alone.

In the **same commit**:

- move the folder, update the manifest's `path` and every cross-link array that names it — the
  entry's `id` stays exactly as it was;
- add a redirect in `next.config.ts` so bookmarks and shared links still land somewhere:

  ```ts
  // next.config.ts — the single five-page sheet was split in three; keep its URL alive.
  async redirects() {
    return [{ source: '/prononciation/les-syllabes-courantes',
              destination: '/prononciation/les-voyelles', permanent: true }]
  }
  ```

  Never delete one to tidy the config. It is what stops a learner's saved link from dying — their
  progress survives the rename on its own now, but the link does not.
- `grep -rn "old-slug" src/` must come back empty before you are done.

**Splitting a page** is the same, plus a redirect from the old path to whichever half inherits it.

**Removing a page** means the folder, the manifest entry, the `AGENTS.md` line, and **every
cross-link array that named it** — its own key and the ones elsewhere pointing at it. A stale
manifest entry gives a dead link; a stale cross-link quietly costs one. Removing a chapter is just
its manifest entry: the landing page is generated, so there is no file to delete and no icon
mapping to remember.

## Cross-links — "Pour aller plus loin"

Every lesson ends with the block, and **the shell draws it** — `LessonEnd`, from the current path,
against one map (`docs/decisions.md` #49). Nothing is added to a page: declaring the relation in
`relatedPages` is the whole job, and a lesson cannot lose its cross-links by forgetting to render
them.

- **Four links maximum.** Past four it stops being a hint and becomes a second navigation menu.
- The pairing is always one of three: the lesson a drill practises, the drill that practises a
  lesson, or the sibling page a learner reaches for next. Anything else is decoration.
- Chapter landing pages and annexes do not carry the block — the shell only draws it where
  `findLesson` resolves, so this needs no allowlist.
- Inline links inside a lesson are a different thing and stay — they sit next to the rule they
  belong to. The foot block is where a learner goes *after*.

## What derives automatically — do not hand-maintain

- The sidebar's chapter list and its active row. It is one level deep on purpose (#40): a chapter
  links to its landing page and never opens a list of lessons, and the row is a name and an icon.
- The sommaire's chapter grid — a mark, a name, a blurb. **Nothing counts what is in a chapter**,
  here, in the sidebar or on the chapter page: the rows are the count, and the `unit` noun that fed
  those tallies is gone from the manifest with them.
- Every chapter landing page and the rows on it.
- Breadcrumbs and the document title.
- Progress ticks, the per-chapter tally and `/ma-progression` — driven off the entry's `id`, and
  settable from the chapter's own row as well as from the foot of the lesson (#79).
  **Registering a lesson is all the wiring progress needs**; there is nothing to add to the page.
- The « J'ai terminé » control and the « Pour aller plus loin » block, both drawn by the shell for
  any path that resolves to a lesson (#49).
- Recency, from `created` dates in the manifest. (`/nouveautes` was a placeholder annexe with no
  page and was deleted with the rest of them, #51; the dates stay, ready for whatever reads them.)

If you find yourself copying a title into a second place, stop: it belongs in the manifest and
should be read from there.

**`relatedPages` is not entirely hand-written any more.** The verb sheets' cross-links are derived
from the conjugaison chapter's own lessons and merged into the exported map, so adding a verb stays
one data entry (#56). The audit reads the merged map, so a derived link that resolves to nothing is
reported exactly like a typed one. Add a chapter to that treatment only when its pages genuinely all
want the same links; anywhere else, type them.
