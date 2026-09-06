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
Nothing routes by name any more — but the manifest does carry a required `id` per lesson, which
looks like the old name field and is not one: it is what progress is keyed by, it addresses no
route, and it never changes (`docs/decisions.md` #50).

## The audit

Run this whenever you touch navigation, and before reporting done:

```bash
node --experimental-strip-types --input-type=module -e "
import { readdirSync, existsSync } from 'node:fs'
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

console.log('in the manifest, no page.tsx:', missing.length ? missing : 'none')
console.log('page.tsx, not in the manifest:', orphan.length ? orphan : 'none')
console.log('cross-links that resolve to nothing:', stale.length ? stale : 'none')
console.log('home pills that resolve to nothing:', pills.length ? pills : 'none')
"
```

All four lines must read `none`. (`npx tsx` works too if the manifest ever grows syntax that type
stripping cannot handle.)

The last two matter most, because both lists **fail soft**: an unresolvable cross-link or home pill
is dropped rather than rendered, so a stale entry costs a link and raises no error anywhere else.

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

1. The `chapters` entry: slug, path, title, optional short title for the sidebar, the
   singular/plural unit for its count, blurb, lessons, **and `icon`**. The icon is required and its
   type is a union, so a chapter without one does not compile and a name with no drawing does not
   either — add the glyph to `src/components/nav/ChapterIcon.tsx` in the same change. **Never give
   that map a `default` entry**: the Vue app's ended `?? icons.default`, so a forgotten chapter
   rendered a generic glyph, looked like a design choice and failed nowhere (#29, repaired by #42).
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

- The sidebar's chapter list, its counts and its active row. It is one level deep on purpose (#40):
  a chapter links to its landing page and never opens a list of lessons.
- The sommaire's chapter grid, and every chapter landing page.
- Breadcrumbs and the document title.
- Progress ticks, the per-chapter tally and `/ma-progression` — driven off the entry's `id`.
  **Registering a lesson is all the wiring progress needs**; there is nothing to add to the page.
- The « J'ai terminé » control and the « Pour aller plus loin » block, both drawn by the shell for
  any path that resolves to a lesson (#49).
- Recency, from `created` dates in the manifest. (`/nouveautes` was a placeholder annexe with no
  page and was deleted with the rest of them, #51; the dates stay, ready for whatever reads them.)

If you find yourself copying a title into a second place, stop: it belongs in the manifest and
should be read from there.
