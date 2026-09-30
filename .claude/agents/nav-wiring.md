---
name: nav-wiring
description: Use to register, rename, move, split or remove pages and chapters in le-petit-cours — keeping src/data/navigation.ts, the app/ route folders, the cross-link map and the redirects in agreement — or to audit that they still agree.
tools: Read, Edit, Write, Grep, Glob, Bash
model: sonnet
---

# Navigation wiring

You keep three things in agreement. Nothing detects drift between them at build time (`AGENTS.md`
§6).

| Source | Owns | Symptom when it drifts |
|---|---|---|
| `src/data/navigation.ts` | titles, order, blurbs, tags, dates | the page exists but is unreachable from the UI |
| `src/app/**/page.tsx` | the URL and the page itself | a sidebar link 404s |
| the cross-link map | "Pour aller plus loin" | a page silently loses a link, or keeps one to a page that is gone |

## There is no route table

**Routes are the filesystem**: a folder holding `page.tsx` *is* the route. So the filesystem is what
can disagree with the manifest — an entry with no folder is a 404, a `page.tsx` with no entry is a
page nothing links to, and neither fails a build.

**`id` is not a route name.** It is what progress is keyed by, addresses no route, and never changes
(#50).

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
// the walk above skips [verbe] along with every other dynamic segment.
if (existsSync('src/app/conjugaison/[verbe]/page.tsx'))
  for (const l of chapters.find(c => c.slug === 'conjugaison').lessons) routes.add(l.path)

// Real routes with no manifest entry, by design — the home page, the results
// page, the specimen, the atelier's door and the onboarding (/bienvenue). The list is unlistedPages in the manifest rather
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

// A page with sets holds one body of work per level, in a module beside
// its page.tsx (#68, #87): questions.ts exporting SETS for a reading quiz,
// data.ts exporting BANKS for a drill. Its keys and the manifest's sets are
// two lists that must say the same thing, and the manifest wins where they
// differ — so a level tagged with nothing behind it serves another level's
// material rather than failing. Nothing else says so.
//
// The other direction is the one that costs a tick: several sets and no
// no sets in the manifest means two bodies of work sharing one circle, and adding the flag
// later moves every tick on the page. A single set with no flag is the ordinary
// case and fine -- the module is just where that page keeps its data.
//
// No backticks in these comments: the whole script is a double-quoted bash
// string, so bash would run their contents as commands before node sees it.
const sets = []
for (const l of declared) {
  const levels = l.sets ?? []
  let keys = null
  for (const [file, name] of [['/questions.ts', 'SETS'], ['/data.ts', 'BANKS']]) {
    const path = './src/app' + l.path + file
    if (!existsSync(path)) continue
    const map = (await import(path))[name]
    if (map) { keys = Object.keys(map).sort(); break }
  }
  if (keys === null) {
    if (l.sets) sets.push(l.path + ' -> sets, no per-level module')
    continue
  }
  if (!l.sets) {
    if (keys.length > 1) sets.push(l.path + ' -> ' + keys.length + ' sets [' + keys + '], no sets in the manifest')
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

All six lines must read `none`.

The last four **fail soft or worse**: a stale cross-link or home pill is dropped rather than
rendered, and a level with no set behind it shows another level's material. The inline link does
not fail soft — it renders and lands on a 404.

**A chapter's `outbound` link is checked by none of the six** — it leaves the site, and it is the one
link that does nothing offline. Curl it when you touch it, and hang nothing a page needs on it
(`delf`'s exists because #78 forbids hosting the file it points at).

Then `npm run build`.

## Adding a lesson

1. `src/app/{chapitre}/{lecon}/page.tsx`.
2. The manifest entry, **inside the chapter's `lessons` array, in teaching order** — the array order
   *is* the display order (§6, #72). Carry its `created` date: recency reads it, so a wrong date puts
   the page in the wrong place or nowhere.
3. Its cross-links, and a link back from whatever relates to it.

**`level`** is required: the rung the page is written at, or `null` for none (#86). **`sets`** is the
separate claim of one body of work per level: written out in ladder order, the first equal to
`level` (checked at import); adding or removing it moves every tick between `id` and `id@LEVEL`, so
ship the backfill in the same commit (§8). **A lesson removed or re-id'd must leave every parcours
first** (`src/data/parcours/`, #88) — a parcours naming a missing id fails the build.

**`id`** is required and the one field you can never revise (#50). Shape: lower case, digits and
hyphens, alphanumeric at both ends. Convention: a short chapter prefix plus the lesson's name —
`gram-articles-definis`, `ex-etre-ou-avoir`, `conj-etre` — which also separates paths that collide
(`orth-homophones-demonstratif` and `ex-homophones-demonstratif`). **The prefix is a reading aid,
not a lookup key**: a lesson that moves chapter keeps the id it was born with. Duplicate or
malformed ids throw on import, so they fail the build and the audit.

Optional keys: a rich label for superscripts, a subtitle (author, scenario), a short tag badge, the
DELF descriptor, `created`.

**No entry before its `page.tsx`** (#51). An empty chapter is normal: `listedChapters()` hides it
everywhere until its first lesson lands. **No placeholder entry, dimmed row or "planned" count.**

## Adding a chapter

1. The `chapters` entry: slug, path, title, optional short title for the sidebar, blurb, lessons,
   **and `icon`** — add the glyph to `src/components/nav/ChapterIcon.tsx` in the same change, and
   **never give that map a `default` entry** (#42). Three optional keys: `untracked` for pages sat,
   not ticked (`delf`, #82), `scratch` for the atelier alone (#80), `outbound` for its one link off
   the site. Test tracking with `isTracked()`, never either flag. The sommaire card's mark is the
   chapter's initial in the serif; nothing to keep in step.
2. **Nothing else.** `src/app/[chapitre]/page.tsx` renders every landing page from the manifest
   (#29); never add a `src/app/{chapitre}/page.tsx` beside it. A chapter with no lessons is invisible
   until its first page exists (#51) — expected, not a fault.
3. `AGENTS.md` §7 if the page type is new.

A chapter that ships images needs its files under `public/`, and — once Serwist is installed (§2) —
the format in the precache, or the images vanish offline without a build error.

## Adding an annexe — a page that belongs to no chapter

`where` says which surface offers it; a position without its fields does not compile.

| `where` | Drawn | Also required |
|---|---|---|
| `top` | above the chapter list | `icon` |
| `tree` | the foot of the sidebar, with the chapters | `icon` |
| `menu` | the account popover | `icon`, **`signedOut`** |
| `footer` | the line under the home page and its own pages | nothing — it is text |

`signedOut` is `"hide"` or `{ title }` (#47, #70). A title replaces the signed-in one where the page
is a different offer without an account, and **that row becomes the way in** — the popover appends
`?suivant=`. There is no default.

A new `icon` means a new `IconName` member **and** a drawing in `ChapterIcon.tsx`. A `footer` annexe
is reachable from the home page only (#63).

## Renaming, moving, removing

**Never change a lesson's `id`** (#50) — it silently deletes that lesson from every learner's
history. Rename the folder, path and title freely.

In the **same commit**:

- move the folder, update the manifest's `path` and every cross-link array naming it — the `id`
  stays;
- add a redirect in `next.config.ts`:

  ```ts
  // next.config.ts — the single five-page sheet was split in three; keep its URL alive.
  async redirects() {
    return [{ source: '/prononciation/les-syllabes-courantes',
              destination: '/prononciation/les-voyelles', permanent: true }]
  }
  ```

  Never delete one to tidy the config: progress survives a rename on its own, a saved link does not.
- `grep -rn "old-slug" src/` must come back empty.

**Splitting a page** is the same, plus a redirect from the old path to whichever half inherits it.

**Removing a page** means the folder, the manifest entry, the `AGENTS.md` line, and **every
cross-link array that named it** — its own key and the ones pointing at it. Removing a chapter is
just its manifest entry.

## The atelier — adding and clearing scratch pages

`temp` is emptied on purpose (#80); why, and what it is not, is `docs/atelier.md`. It carries
`scratch: true`, so the weekly reset is a manifest edit and a folder, with no migration.

**Adding a page** is « Adding a lesson », with four differences:

- **The id carries the date**: `temp-2026-09-22-terminaisons`.
- **`level: null`**, and never in a parcours (it cannot be ticked, #88).
- **No `relatedPages` entry pointing *at* it.** It may have a key of its **own**, linking out —
  delete that key with the page (the audit's third line reports a source that no longer resolves).
- **Nothing in `featuredChapterSlugs`.**

**Clearing it** is the manifest entries and the folders:

```bash
git rm -r src/app/temp/<slug>          # for each page being cleared
# then delete its entry from the `temp` chapter's `lessons` array
```

… and its `relatedPages` key, if any. The `_`-prefixed folders — `_exercice/` (`Choix`, `Faute`,
`Trous`, the « tu » `Bilan`) and `_texte/` (`Copie`, `Corrige`, the scoped styles) — go once the
last page using them is gone; the underscore hides them from the router **and** the audit, so left
behind they are dead code. No redirect. `grep -rn "/temp/" src/` checks nothing permanent linked in.
The chapter stays in the manifest with `lessons: []`.

**Keeping a page** is a new page in its real chapter, with a **new permanent id** and a real `level`
tag.

Run the audit either way: an entry left after its folder went is the first of the six lines.

## Cross-links — "Pour aller plus loin"

**The shell draws it** — `LessonEnd`, from the path, against `relatedPages` (#49). Declaring the
relation is the whole job.

- **Four links maximum**, or it becomes a second menu.
- The pairing is one of three: the lesson a drill practises, the drill that practises a lesson, or
  the sibling a learner reaches for next. Anything else is decoration.
- Chapter landing pages and annexes carry no block — it draws only where `findLesson` resolves.
- Inline links inside a lesson stay; the foot block is where a learner goes *after*.

**The verb sheets' links are derived** from the conjugaison chapter and merged into the exported map
(#56); the audit reads the merged map. Give a chapter that treatment only when all its pages want
the same links.

## What derives automatically — do not hand-maintain

- The sidebar's chapter list and active row, one level deep (#40).
- The sommaire's grid — a mark, a name, a blurb. **Nothing counts a chapter** (§6).
- Every chapter landing page and its rows.
- Breadcrumbs and the document title.
- Progress ticks, the per-chapter tally and `/ma-progression`, off the `id`, settable from the row
  as well as the lesson (#79). **Registering a lesson is all the wiring progress needs.**
- « J'ai terminé » and « Pour aller plus loin » (#49).
- Recency, from `created`.

If you are copying a title into a second place, stop: read it from the manifest.
