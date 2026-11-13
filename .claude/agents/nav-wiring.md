---
name: nav-wiring
description: Use to register, rename, move, split or remove pages and chapters in le-petit-cours — keeping src/data/navigation.ts, the app/ route folders, the cross-link map and the redirects in agreement — or to audit that they still agree.
tools: Read, Edit, Write, Grep, Glob, Bash
model: sonnet
---

# Navigation wiring

You keep three things in agreement. Nothing detects drift between them at build time (`AGENTS.md`
§6).

| Source                   | Owns                               | Symptom when it drifts                                            |
| ------------------------ | ---------------------------------- | ----------------------------------------------------------------- |
| `src/data/navigation.ts` | titles, order, blurbs, tags, dates | the page exists but is unreachable from the UI                    |
| `src/app/**/page.tsx`    | the URL and the page itself        | a sidebar link 404s                                               |
| the cross-link map       | "Pour aller plus loin"             | a page silently loses a link, or keeps one to a page that is gone |

## There is no route table

**Routes are the filesystem**: a folder holding `page.tsx` *is* the route. So the filesystem is what
can disagree with the manifest — an entry with no folder is a 404, a `page.tsx` with no entry is a
page nothing links to, and neither fails a build.

**`id` is not a route name.** It is what progress is keyed by, addresses no route, and never changes
(#50).

## The audit

Run it whenever you touch navigation, and before reporting done:

```bash
node scripts/nav-audit.mjs
```

It prints six lines — manifest entries with no `page.tsx`, `page.tsx` with no entry, stale
cross-links, stale home pills, per-level material (`SETS`, `BANKS`, `a1.tsx`…) disagreeing with the
manifest's `sets`, and inline `href`s that resolve to nothing — and exits 1 unless each says `none`.
A chapter generated from a data file (like the verb sheets) needs a line in the script, or its
lessons read as missing.

All six lines must read `none`.

The last four **fail soft or worse**: a stale cross-link or home pill is dropped rather than
rendered, and a level with no set behind it shows another level's material. The inline link does
not fail soft — it renders and lands on a 404.

**A chapter's `outbound` link is checked by none of the six** — it leaves the site, and it is the one
link that does nothing offline. Curl it when you touch it, and hang nothing a page needs on it
(`delf`'s exists because #78 forbids hosting the file it points at).

Then §11's checks; a moved or removed page is one of the changes only the build settles, so say
that it is owed.

## Adding a lesson

1. `src/app/{chapitre}/{lecon}/page.tsx`.
2. The manifest entry, **inside the chapter's `lessons` array, in teaching order** — the array order
   *is* the display order (§6, #72). Carry its `created` date: recency reads it, so a wrong date puts
   the page in the wrong place or nowhere.
3. Its cross-links, and a link back from whatever relates to it.
4. Its place in the parcours of its level, and of each of its `sets` (`src/data/parcours/`, #88),
   in teaching order; an épreuve goes in its level's `exam`. **A level's parcours is the whole
   level**: a page written at a level and left off its path fails the import, and so does a path
   naming a page written at another rung.

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
DELF descriptor, `created`. A `grammaire` or `orthographe` title and subtitle follow
`lesson-author.md` « The title » (#104). **Title, subtitle and DELF descriptor stay French in both interfaces**
(#102). **A new badge needs its Spanish in `TAG_ES`**, or the manifest throws at import.

**No entry before its `page.tsx`** (#51). An empty chapter is normal: `listedChapters()` hides it
everywhere until its first lesson lands. **No placeholder entry, dimmed row or "planned" count.**

## Adding a chapter

1. The `chapters` entry: slug, path, title, optional short title for the sidebar, blurb, lessons,
   **`es: { title, blurb }`** (the Spanish interface's, #102 — required) **and `icon`** — add the glyph to `src/components/nav/ChapterIcon.tsx` in the same change, and
   **never give that map a `default` entry** (#42). Three optional keys: `untracked` for pages sat,
   not ticked (`delf`, #82), `scratch` for the atelier alone (#80), `outbound` for its one link off
   the site. Test tracking with `isTracked()`, never either flag. The sommaire card draws the same
   icon; nothing else to keep in step.
2. **Nothing else.** `src/app/[chapitre]/page.tsx` renders every landing page from the manifest
   (#29); never add a `src/app/{chapitre}/page.tsx` beside it — **save a chapter that is its own
   page** (`prononciation`, #94): one lesson whose `path` is the chapter's, written in that folder.
   `isChapterPage` keeps it out of `[chapitre]`, search and the audit's generated routes, and
   `assertChapterPages` throws if it gains a second page. To add one, give the first an address of
   its own (redirect, same id) and the chapter is generated again. A chapter with no lessons is invisible
   until its first page exists (#51) — expected, not a fault.
3. `AGENTS.md` §7 if the page type is new.

A chapter that ships images needs its files under `public/`, and — once Serwist is installed (§2) —
the format in the precache, or the images vanish offline without a build error.

## Adding an annexe — a page that belongs to no chapter

`where` says which surface offers it; a position without its fields does not compile.

| `where`  | Drawn                                          | Also required           |
| -------- | ---------------------------------------------- | ----------------------- |
| `top`    | above the chapter list                         | `icon`                  |
| `tree`   | the foot of the sidebar, with the chapters     | `icon`                  |
| `menu`   | the account popover                            | `icon`, **`signedOut`** |
| `footer` | the line under the home page and its own pages | nothing — it is text    |

**Every annexe carries `titleEs`** (#102), and a `signedOut` title its `titleEs` too.
`signedOut` is `"hide"` or `{ title, titleEs }` (#47, #70). A title replaces the signed-in one where the page
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

**Removing a page** means the folder, the manifest entry, every parcours naming its id, **every
cross-link array that named it** — its own key and the ones pointing at it — and any doc that cites
it (`grep -rn "<id>\|<slug>" docs .claude`). Then `npx next typegen` before `tsc` (§11). Removing a
chapter is just its manifest entry.

## The atelier — adding and clearing scratch pages

`atelier` is emptied on purpose (#80); why, and what it is not, is `docs/atelier.md`. It carries
`scratch: true`, so the weekly reset is a manifest edit and a folder, with no migration.

**Adding a page** is « Adding a lesson », with four differences:

- **The id carries the date**: `atelier-2026-09-22-terminaisons`.
- **`level: null`**, and never in a parcours (it cannot be ticked, #88).
- **No `relatedPages` entry pointing *at* it.** It may have a key of its **own**, linking out —
  delete that key with the page (the audit's third line reports a source that no longer resolves).
- **Nothing in `featuredChapterSlugs`.**

**Clearing it** is the manifest entries and the folders:

```bash
git rm -r src/app/atelier/<slug>          # for each page being cleared
git rm -r public/atelier/<slug>           # its images, if it had any
# then delete its entry from the `atelier` chapter's `lessons` array
```

… and its `relatedPages` key, if any. The `_`-prefixed folders — `_exercice/` (`Choix`, `Faute`,
`Trous`, `Quiz`, `Partie`, `Ordre`, the « tu » `Bilan`) and `_texte/` (`Copie`, `Corrige`, the scoped styles) — go once the
last page using them is gone; the underscore hides them from the router **and** the audit, so left
behind they are dead code. No redirect. `grep -rn "/atelier/" src/` checks nothing permanent linked in;
a link from another atelier page is cleared with it. Then `npx next typegen`, or `tsc` still finds
the deleted page in `.next/types` (`AGENTS.md` §11).
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
