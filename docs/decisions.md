# Decisions

Why the project is the way it is. `AGENTS.md` says what the rules **are**; this file says what they
were chosen *against*, which is the part that stops a settled question being reopened by accident.

**Every entry earns its place by still constraining something.** An entry is kept while a rule, a
file or a future change still depends on it; when it stops, it goes. That is a change from how this
file used to work — it was append-only, and by seventy-one entries a third of it was the history of
decisions that had already been replaced by later ones. History belongs in `git log`, which has it.

**The numbers are permanent and are never reused.** `AGENTS.md`, the briefs and source comments all
cite `#nn`, so a number means one thing forever. **Gaps in the sequence are deliberate** — the entry
was removed because it no longer bound anything, and nothing should be renumbered to close the gap.

When you add one: append it with the next free number, say what it was chosen against, and if it
replaces an earlier entry, fold what still matters into your own text and delete the old one rather
than marking it superseded.

| # | Date | Decision | Status |
|---|---|---|---|
| 1 | 2026-08-26 | No PDF export, no print stylesheet | Binding |
| 2 | 2026-08-26 | Progress is ticked manually, never automatically | Binding |
| 4 | 2026-09-05 | Lessons are written from scratch, never adapted from an older page | Binding |
| 5 | 2026-09-05 | The design system starts from nothing — no inherited tokens | Binding |
| 6 | 2026-09-05 | Plain CSS (global tokens + CSS Modules), not Tailwind | Inferred |
| 7 | 2026-09-05 | Vercel hosting, still an offline PWA — not a static export | Binding |
| 8 | 2026-09-05 | Supabase, scoped to accounts and progress sync only | Binding |
| 10 | 2026-09-05 | The lesson authoring format is deferred until the primitives exist | **Open** |
| 11 | 2026-09-05 | MIT for the code, CC BY-SA 4.0 for the content, with a carve-out | Binding |
| 13 | 2026-09-05 | Two learner profiles, and the heritage speaker is not a level | Binding |
| 14 | 2026-09-05 | A parcours orders lessons without owning them | Binding |
| 15 | 2026-09-05 | A level is complete when it covers the DELF syllabus for that level | Binding |
| 17 | 2026-09-05 | Collaboration means curated content contribution, later — never student management | Directional |
| 18 | 2026-09-05 | All content is public; an account buys only the learning path | Binding |
| 20 | 2026-09-05 | Supabase is provisioned by hand; there is no Vercel integration | Binding |
| 21 | 2026-09-05 | No key that bypasses RLS lives anywhere, and RLS is the authorization model | Binding |
| 22 | 2026-09-05 | A progress row *is* the tick; the level never keys progress | Binding |
| 23 | 2026-09-05 | A lesson carries a set of levels; `[]` means "always visible" | Binding |
| 24 | 2026-09-05 | IndexedDB is the local store; `localStorage` is for pre-paint values only | Binding |
| 26 | 2026-09-05 | Sign-in is a route, `/compte`, never a modal | Binding |
| 27 | 2026-09-05 | The accent is the wordmark's blue; the serif carries the French | Binding |
| 28 | 2026-09-05 | The app icon is one letter of the wordmark, generated, never hand-drawn | Binding |
| 29 | 2026-09-05 | Chapter landing pages are one generated route, not fourteen files | Binding |
| 30 | 2026-09-05 | The account sits at the foot of the sidebar, behind a popover; the theme is three-way | Binding |
| 31 | 2026-09-05 | An account may hold an optional display name | Binding |
| 35 | 2026-09-05 | The level filters every listing, and never access | Binding |
| 36 | 2026-09-06 | The learner's settings live in user metadata, not in a table of ours | Binding |
| 37 | 2026-09-06 | Username and password; nothing on the server reads the session | Binding |
| 38 | 2026-09-06 | The username is its own table — unique, mutable, mirrored | Binding |
| 39 | 2026-09-06 | The home page is a search field; the sommaire is at `/sommaire` | Binding |
| 40 | 2026-09-06 | The sidebar is one level deep: a chapter is a link, not a disclosure | Binding |
| 41 | 2026-09-06 | The whole content is « le cours », never « le livre » | Binding |
| 42 | 2026-09-06 | Three shells; chapter icons are required and compiler-checked | Binding |
| 43 | 2026-09-06 | The topbar is part of the page: no band, no blur | Binding |
| 44 | 2026-09-06 | The topbar is sticky on mobile only, painted in the page's own ground | Binding |
| 45 | 2026-09-06 | One sidebar control; the trail never names the page you are on | Binding |
| 46 | 2026-09-06 | No copyright notice in the chrome; the reuse terms live on `/a-propos` | Binding |
| 47 | 2026-09-06 | The account popover holds the account, and nothing else | Binding |
| 48 | 2026-09-06 | A tick needs an account; offline is a queue of operations | Binding |
| 49 | 2026-09-06 | The shell draws the end of a lesson: the tick, then the links | Binding |
| 50 | 2026-09-06 | Progress is keyed by a permanent lesson id, never by the route path | Binding |
| 51 | 2026-09-06 | The course announces nothing it has not written | Binding |
| 52 | 2026-09-06 | The content is A2 only, for now | Binding |
| 53 | 2026-09-06 | One language of instruction, and it is French | Binding |
| 54 | 2026-09-06 | A conversation page is a guided role-play, graded nowhere | Binding |
| 55 | 2026-09-06 | A `traduction` chapter — the one place Spanish is allowed back | Binding |
| 56 | 2026-09-06 | The conjugation sheets: one data file, one route, the imparfait included | Binding |
| 57 | 2026-09-07 | A role-play offers words, never a model dialogue | Binding |
| 58 | 2026-09-07 | What a `lecture` text has to be, and how the public domain is tested | Binding |
| 59 | 2026-09-07 | How hard a `lecture` text may be, and what to do when it is too hard | Binding |
| 60 | 2026-09-07 | World literature in `lecture`; the translator's death date is the test | Binding |
| 61 | 2026-09-12 | The badge is the chrome's brand; the wordmark is the home page's `<h1>` | Binding |
| 62 | 2026-09-12 | Nothing counts what is in a chapter | Binding |
| 63 | 2026-09-12 | The footer belongs to the home page; the shell's foot is one shared row | Binding |
| 64 | 2026-09-12 | The crumb is aligned on the reading column, not on the button beside it | Binding |
| 65 | 2026-09-12 | The lesson's level rides in the trail, in front of the chapter | Binding |
| 66 | 2026-09-12 | Sections are marked, not merely spaced; the in-page index is read from the page | Binding |
| 67 | 2026-09-12 | « En résumé » is a titled block, and one line closes a lesson | Binding |

## 1 · No PDF export, no print stylesheet
**2026-08-26 · Binding**

Every lesson used to print to A4, which pinned the reading column to 794 px and required
`@media print` blocks and `.no-print` / `.print-only` flags throughout. The feature was removed and
the column became a measure in `rem`.

**Why it still binds:** the constraint shaped a lot of CSS, so "restore a print view" recurs as a
suggestion. It would bring back a parallel stylesheet to maintain for a feature nobody used.

## 2 · Progress is ticked manually, never automatically
**2026-08-26 · Binding**

A lesson or a drill counts as done only when the learner presses « J'ai terminé ». A drill shows its
score and stores nothing; finishing one never ticks it.

**Why:** a half-remembered pass at 50 % is not a finished lesson, and the learner is the only one
who knows the difference. Auto-completion turns the progress page into a record of pages visited,
which is worth nothing to them.

## 4 · Lessons are written from scratch, never adapted from an older page
**2026-09-05 · Binding**

No page is ported, translated or reshaped from an earlier version of this course or from anywhere
else. A lesson is written against the current primitives or it is not written.

**Why:** a carried-across page inherits the old page's compromises and gains none of the new
system's advantages — it was written under a different layout budget, against a stylesheet that no
longer exists, in a component model that has since inverted. It also carries the old page's
mistakes invisibly: the last text adapted rather than re-sourced arrived with four misquotes of a
public-domain poem, none of which any check could have caught.

## 5 · The design system starts from nothing
**2026-09-05 · Binding**

No stylesheet, and deliberately no token layer, is inherited. **What is kept is the discipline, not
the values:** two token layers, no raw colours in components, every token defined for both themes,
colour never the only carrier.

**Why the tokens too.** The system this replaced had a third layer of `--clr-*` aliases, kept alive
for pages written before the tokens existed. That layer was its own bug class — `--clr-page` read
like a text colour and was in fact a *surface* token, so everything using it for text inverted in
dark mode. Carrying tokens over carries the compatibility layer's shape with them.

## 6 · Plain CSS, not Tailwind
**2026-09-05 · Inferred, not explicitly confirmed**

Design tokens and shared content patterns in one `globals.css` imported once in the root layout;
component styles in co-located CSS Modules.

**Standing:** this follows from #5 as it was framed, but Tailwind was never explicitly rejected — it
was offered as an option and not taken. Treat it as the working assumption. **If Tailwind is
wanted, that is a decision to take deliberately and record here as a new entry replacing this one**,
not something to drift into one utility class at a time.

## 7 · Vercel hosting, still an offline PWA
**2026-09-05 · Binding**

Deployed on Vercel as a normal Next.js app — not `output: 'export'` — while keeping the service
worker, the precached lessons and installability. Project `kevjrmy-projects/lepetitcours`, building
from `main`, live at <https://lepetitcours.vercel.app>.

**Why not a static export:** #8 needs a server for auth. A static export is the thing to fall back
to if the server side is ever dropped.

**Consequence:** `vite-plugin-pwa` has no Next equivalent, so Serwist supplies the service worker.
**Not installed yet**, which means the app does not currently keep the offline promise it makes.

## 8 · Supabase, for accounts and progress sync only
**2026-09-05 · Binding**

**The scope is the whole point.** Lesson content stays in the repo — in git, in diffs, reviewable,
precacheable. The database holds accounts and progress and nothing else. The local copy stays the
read path: this is an offline app, so a server can only ever be a sync target, never something a
render waits on.

**Chosen over Firebase** because progress is row-shaped data rather than documents, and because
Supabase Auth drops straight into the `load()` / `save()` adapter seam the app already had.

**Two env vars, both public by design:** `NEXT_PUBLIC_SUPABASE_URL` and
`NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`. See #21 for what must never join them.

## 10 · The lesson authoring format is deferred
**2026-09-05 · OPEN**

Whether lessons are MDX, typed content blocks, or hand-written TSX is **not decided**. The interim
is hand-written TSX against the lesson primitives.

**Why deferred rather than chosen:** all three are defensible on paper, and the choice depends on
what the primitives turn out to look like. Choosing early means building a content pipeline around
guessed requirements.

**How it gets closed:** hand-write real lessons and decide with the evidence. Fifty exist now, so
the evidence is in. What has fought the writer so far: a table row costs twelve lines of TSX, which
makes a vocabulary page expensive to write and to review; a `traduction` page's source text and
model live in the page file rather than in something a non-developer could edit; and its `note` is
JSX, so a teacher cannot write one.

**Do not** set up an MDX pipeline or a block schema on your own initiative before then. Two
independent forces point at content-as-data — contributing teachers (#17) and a possible React
Native client — so the likely answer is not neutral; it still needs deciding rather than drifting.

## 11 · MIT for the code, CC BY-SA 4.0 for the content
**2026-09-05 · Binding**

Two licences, because the halves want different things: software licences do nothing sensible to
French prose, and Creative Commons licences do nothing sensible to TypeScript. MIT for `src/`,
config and tooling; CC BY-SA 4.0 for lessons, exercises, vocabulary and translations.

**Why share-alike on the content:** adaptations of CC BY-SA material must stay share-alike anyway,
and `culture` photographs come from Commons under exactly that. It is the compatible choice rather
than an extra restriction, and it keeps a derivative course open.

**Why MIT on the code:** the shell and the drills are not the valuable part; the course is.
Permissive code lowers the bar for someone building the same thing for a different language pair.

**The carve-out is load-bearing.** Teaching a language means quoting it, so this repository contains
material the project does not own: song excerpts still in copyright, literary text whose public
domain status is jurisdictional, photographs under their own licences. `LICENSE-CONTENT` says so,
`AGENTS.md` §9b says what may be quoted, `CONTRIBUTING.md` tells contributors they must hold the
rights to what they submit. **A blanket licence over material the project cannot license would be
worse than no licence** — it is a false grant that reusers rely on.

## 13 · Two learner profiles, and the heritage speaker is not a level
**2026-09-05 · Binding**

The course serves **the learner** (native Spanish speaker acquiring French from zero) and **the
heritage speaker** (French family, raised in Spain, fluent at home, never schooled in French).

**Why it is a decision and not an observation:** the two need opposite things. The learner lacks the
language; the heritage speaker has the language and lacks literacy — spelling, accord, homophones,
the written form of what she already says correctly. She can be orally C1 and written A2 at once,
so **she cannot be represented by a CEFR badge**, and any design that reduces the audience to one
will mis-serve her.

**What it does not mean:** two apps, or two content libraries. One pool of lessons, different
orderings and different entry points.

## 14 · A parcours orders lessons without owning them
**2026-09-05 · Binding**

A **parcours** is an ordered path through lessons that already exist. A lesson belongs to its
chapter and is referenced by however many parcours want it, including none.

**Chosen over making level the top navigation axis**, which would duplicate chapters across six
levels and leave the heritage speaker nowhere to stand.

**The load-bearing half is "without owning them".** Copying a lesson so two paths can each have one
is how a content library becomes two libraries that drift, and the learner meets whichever copy is
stale.

## 15 · DELF as the definition of done
**2026-09-05 · Binding**

A level is complete when it covers the published DELF syllabus for that level.

**Why an external anchor:** it makes coverage checkable, exposes gaps rather than hiding them, gives
learners a target they could actually sit, and gives future contributing teachers something to argue
from instead of taste. "It feels thorough" is not a definition, and with six levels ahead that
vagueness compounds. A count of published pages is an inventory, never evidence of coverage.

**Not a decision to certify anyone.** DELF is the yardstick; the app does not examine.

## 17 · Collaboration means curated content contribution, later
**2026-09-05 · Directional**

"Collaborative" means a curated group of recognised teachers able to contribute content. It does
**not** mean student management: no classes, no assignments, no grade books, no teacher dashboards
over learner progress.

**Out of scope for now**, with two consequences worth holding: it is a second argument for
content-as-data (#10), since a teacher who is not a developer cannot write TSX; and it leaves #8
unchanged, so no schema work is owed to it.

**When the time comes, question the premise first.** GitHub is already a curated contribution
system. An in-app authoring flow is only worth building for teachers who will not touch git, and
that is a question for real teachers rather than one to answer in advance.

## 18 · All content is public; an account buys only the learning path
**2026-09-05 · Binding**

Every lesson, drill and game is readable with **no account** — no auth wall, no sign-up
interstitial, nothing behind an email address. An account buys the tick, the chosen level and a
position in a parcours.

**Chosen over anonymous local progress that an account later claims.** That is friendlier, and it
means two storage paths, a claim-on-signup migration to get right, and a class of bug where
someone's progress silently belongs to nobody.

**The architectural consequence is the important part.** Because content is public, lessons stay
statically prerendered and precacheable, which is what makes the offline PWA work at all. That only
holds while the session is never read where it would make a lesson dynamic (#37, `AGENTS.md` §8).

**Minimal data by design:** no analytics on learners, no behavioural tracking. That keeps the breach
surface near zero and follows the no-engagement-mechanics principle in `docs/scope.md`.

## 20 · Supabase is provisioned by hand; there is no Vercel integration
**2026-09-05 · Binding**

Project `ephdtigxjccfauzgexpd` (EU), created in the Supabase dashboard rather than through the
Marketplace. Automatic RLS is on: an event trigger enables row-level security for every new table in
`public`, which makes #21's authorization model the default rather than something to remember.

**The cost, accepted deliberately:** nothing injects the env vars, so the two `NEXT_PUBLIC_*` keys
are set by hand in `.env` and in all three Vercel environments. Adding an environment or rotating a
key means doing both places.

**The Vercel connection was tried and deleted.** It re-pushed its whole bundle — the database
password included — on every change made at the Supabase end, three times in half an hour, while
injecting nothing the project needed. **If `SUPABASE_*` or `POSTGRES_*` variables reappear in the
project env, someone reconnected it; delete them** (#21).

**The database password reaches nothing.** No application code reads it; it exists for `psql`,
`supabase link` and migrations, which prompt for it. SSL is enforced, so a refused `psql` is
`sslmode`, not a bad password.

## 21 · No key that bypasses RLS lives anywhere, and RLS is the authorization model
**2026-09-05 · Binding**

`auth.uid() = user_id` in a policy, on every verb, with permission checks nowhere else in the
codebase. Policies are **per verb and `authenticated` only** — four narrow policies per table rather
than one `for all`, so widening one verb cannot silently widen the rest, and `anon` is revoked
outright. That is the line between "all content is public" (#18) and "progress needs an account".

**Why an unused key is not harmless.** The service-role and secret keys bypass RLS completely. Ten
such variables were injected by the Vercel connection and all ten were deleted, then the legacy
`anon` / `service_role` keys were disabled at the source, because deleting them from Vercel alone
was not enough. Leaving one in the environment leaves the shortcut lying around, one `process.env`
away, in a codebase whose entire server-side job is saving a tick.

**Nothing secret exists to leak.** The publishable key and the project URL are public by design; the
database password was rotated and then dropped from `.env` rather than re-pasted. That is a property
to keep, not a coincidence — **a feature that genuinely needs a real secret is a decision to take
here first**, not one to acquire by accident.

## 22 · A progress row *is* the tick; the level never keys progress
**2026-09-05 · Binding**

`(user_id, lesson_id)` and a `marked_at`, nothing else. Marking inserts a row; unmarking deletes it.
**No `done` column**, because a row's existence already says it, and **no score column**, because
nothing about a drill run is stored at all.

**The level is a setting, never part of a progress key.** This is the whole design. A learner must
be able to drop a level and climb back without losing anything, so progress knows nothing about the
level in force when it was ticked. Putting the level in the key — or even on the row — fragments one
learner's history into per-level piles.

**Scores are not stored, anywhere.** A drill grades itself and shows a score; the number never
leaves the session. A per-run score records how a learner *performed* rather than what they have
decided is done, which is closer to behavioural tracking than to progress.

**The database knows nothing about the course.** No lessons table, no foreign key, no titles.
`src/data/navigation.ts` stays the single source of truth; mirroring it into Postgres would buy
referential integrity for content already checked at build time, and create a second place for the
course to disagree with itself.

**`marked_at` is client-supplied, with no trigger forcing `now()`.** In an offline PWA the moment
that matters is when the learner ticked, not when the row reached the server. A client can only lie
about its own rows.

## 23 · A lesson carries a set of levels; `[]` means "always visible"
**2026-09-05 · Binding**

A page on *les articles* can be tagged `['A1', 'A2']` and appear for both. The alternative —
duplicating a page so each level has its own copy — is the failure #14 already rejects for parcours.
A lesson tagged for two levels keeps **one** tick, not one per level, which is the reason a set
beats duplication rather than merely being tidier.

**`levels` is required on every entry, and `[]` is a statement rather than an oversight.** `culture`
and `musique` are the cases that prompted it: they are not A1 or A2 material and belong to whoever
wants them. Making the field optional would make "forgot to tag it" and "decided it needs no tag"
identical in a diff, and only one of those is a bug.

**Filtering is `learner level ∈ lesson levels`**, evaluated against the manifest at render time. The
database holds no opinion about which content belongs to which level, so a retagging is a diff
rather than a data migration.

## 24 · IndexedDB is the local store; `localStorage` is for pre-paint values only
**2026-09-05 · Binding**

Progress and the chosen level live in **IndexedDB**, keyed by account id so two people on one
browser never see each other's ticks.

**Chosen over `localStorage` on durability.** `localStorage` is pleasanter to write against, and it
is also the first storage a browser clears under pressure, blocked outright in some privacy modes,
and capped at 5 MB shared with everything on the origin. Months of accumulated progress is exactly
what must not evaporate because a phone was low on space.

**The cost is that the adapter is async**, which is what the `load()` / `save()` seam already was
for — no component learns about this.

**`localStorage` has exactly two jobs: the theme and the collapsed sidebar.** The rule is not the
count, it is the test: a value belongs there when it must be correct **before first paint** and is a
short string nobody would mourn. Both must be applied by an inline script or the page visibly
changes under the reader — a theme flash, or a sidebar that renders open and snaps shut. Progress
and the level fail the first clause outright, because IndexedDB is async and cannot be read there.

## 26 · Sign-in is a route, `/compte`
**2026-09-05 · Binding**

A route, not a dialog. `/compte` is where a learner signs in, sees they are signed in, chooses their
level and signs out.

**Chosen over a modal from the topbar** because it is linkable, and because it keeps auth UI out of
the shell that every lesson renders inside. The entry point is the account control at the foot of
the sidebar, which links there and **never holds a form** (#47).

**There is no custom domain**, deliberately at this scope: a domain means setting the redirect URLs
twice.

## 27 · The accent is the wordmark's blue; the serif carries the French
**2026-09-05 · Binding**

**`#0044AA`** — the colour `public/logo.svg` is already drawn in — so `--accent` and the brand are
the same colour by construction. It clears 8.7:1 on white.

**Chosen over keeping the old `#12539F`.** Both are defensible blues; what is not defensible is
having both, which is what shipping the old primary beside the existing wordmark would have meant.

**Red means "you got it wrong", so red is never decoration.** The semantic layer is the conventional
four roles — accent, danger, warn, success. In a course of graded drills, a red used ornamentally
teaches the learner to distrust the one signal that has to be trusted.

**Typography: Spectral for the French being taught, Inter for the instruction around it.** The
pairing is semantic, not decorative. Every page mixes the language being taught with the language
explaining it, and that distinction had no visual carrier; colour cannot be it, because the state
colours are spoken for. The split is keyed on *example vs. explanation*, not on which language the
page is written in.

**Chosen over Georgia headings on Inter body**, where the serif was heading decoration and carried
no meaning. Georgia is also wrong for the job: its oldstyle figures hang below the baseline, which
reads as a typo in a conjugation table. Spectral has lining figures and draws `œ`, `ç` and the
`é`/`è`/`ê` trio as first-class glyphs rather than composites.

**Consequence for `next/font`:** `subsets: ['latin']` covers every accented character, `ç`, `ñ`, `¿`
and the `œ` ligature. `latin-ext` would ship glyphs no lesson can contain. Real italics are loaded
for the serif, because a synthesised italic slants French accents wrongly.

## 28 · The app icon is one letter of the wordmark
**2026-09-05 · Binding**

The cursive **P** from "Petit", extracted to `public/logo-mark.svg`, white on an opaque `#0044AA`
ground. **A wordmark is the wrong *format* for an icon**, so the fix is a crop, not a redraw:
hairline script is a smudge at 192 px and a smear at 48 px.

**Generated, never hand-drawn.** `scripts/make-icons.mjs` renders every size from the one SVG, so
the set cannot drift. **Never hand-edit a generated icon.**

**The details that are load-bearing, because each was a bug first:**

- **Every icon is opaque.** A transparent one disappears into a dark home screen.
- **Only the maskable pays for the safe zone.** A glyph shrunk to survive Android's circle is a
  glyph too small everywhere else — the old maskable landed as a white disc.
- **The favicon tiles are optically sized**, larger at 16 and 32 px: a browser tab has no mask to
  respect, and hairline script needs the width to read at all.
- **`favicon.ico` must embed RGBA PNGs.** Next's ICO decoder rejects RGB outright, and Chrome drops
  the alpha channel when a capture is fully opaque, so the script re-encodes the tiles.
- **Do not set `metadata.icons` in `layout.tsx`.** It *replaces* the `src/app/` file conventions
  rather than adding to them, and silently drops `icon.svg`.

**Brand assets take their colour from the page.** The glyph is a CSS mask over a token, never an
inline fill, so it follows the theme; an `<img>` would stay `#0044AA` and go muddy on dark.

## 29 · Chapter landing pages are one generated route
**2026-09-05 · Binding**

`app/[chapitre]/page.tsx` renders them all through `generateStaticParams`, with
`dynamicParams = false` so an unknown slug 404s rather than being rendered on demand — which is also
what stops the dynamic segment swallowing every unmatched top-level path. The verb sheets are one
route for the same reason (#56).

**Chosen over fourteen near-identical files.** It costs the nav audit one line per generated
chapter, because a filesystem walk skips dynamic segments; the alternative is fourteen files that
can each drift.

**Never hand-write a chapter landing page.**

## 30 · The account sits at the foot of the sidebar, behind a popover
**2026-09-05 · Binding**

The shell takes its shape from claude.ai: a persistent left rail holding the navigable tree, a
near-empty top bar, and the account pinned to the bottom of the rail.

**A popover, not a modal.** The content is a short list of links; a modal blocks the page to show
one, and on a phone the sidebar is *already* a drawer, so a modal inside it is two focus traps for
one menu. It light-dismisses on Escape, on an outside pointer, and on navigation.

**The theme is a submenu that replaces the panel rather than flying out.** The panel is as wide as
the sidebar and anchored to its bottom corner, so a flyout would need collision handling at the
viewport edge and would have ~166 px to live in inside the mobile drawer. Swapping contents behaves
identically at both breakpoints. The current choice is printed on the row, so the theme is legible
without opening anything.

**The theme control is three-way** — clair, sombre, système — because a two-way toggle cannot
express "follow the OS", which is the default a first visit gets.

**The theme toggle holds no React state.** `data-theme` on the root element is already the single
source of truth: the inline script sets it before first paint and CSS picks the icon from it.
Mirroring it into state means either a lazy initialiser reading `localStorage` during render, which
the server cannot do, or a `setState` in an effect, which the React Compiler's lint rejects.
**Do not add state to it.**

## 31 · An account may hold an optional display name
**2026-09-05 · Binding**

The one thing added to what an account stores. It is optional, it is shown back to the learner, and
nothing depends on it.

**The bar for anything further:** a learner would notice its absence. An account holds a username,
an email, a password, progress rows, a level and an optional display name. Nothing else.

## 35 · The level filters every listing, and never access
**2026-09-05 · Binding**

The chosen level filters the sommaire, the chapter pages and the sidebar. **All three**: a sidebar
saying seven lessons beside a card saying one does not read as a filter, it reads as a bug.

**The unfiltered course is what ships; hydration narrows it.** The listings are client leaves inside
Server Component pages, so the static HTML contains everything and the filter applies once
`useAccount` resolves. That ordering is correct twice over — it is what a signed-out visitor should
see, and it is what a cold page from the service worker should contain. A page that rendered empty
until JavaScript decided otherwise would break the offline story.

**Hiding is never gating.** Every path still resolves, and a lesson at another level opens normally
from a cross-link, a bookmark or a search result. Nothing reads the session to decide whether a page
renders — that is what would drag lessons out of prerendering.

**A filter has to be visible or it is indistinguishable from an unwritten course.** The sommaire
names the programme it is showing and offers a way to change it.

**Two listings are deliberate exceptions.** Search groups by level rather than cutting by it (#39),
and `/ma-progression` does not filter at all (#48).

## 36 · The learner's settings live in user metadata, not in a table of ours
**2026-09-06 · Binding**

`public.progress` and `public.usernames` are the only tables this project owns. The chosen level and
the display name live in `auth.users.raw_user_meta_data`, which Supabase already stores and which
arrives with the session — no second round trip, nothing to invalidate.

**What it deleted, which is the real argument.** A `settings` table with a `NOT NULL` level made the
row impossible to create without one, and every workaround existed to paper over that: a flag
telling "has not chosen" from "we have not looked yet"; an upsert on one side and an update on the
other; a rule that the name could not be offered until a level existed; a `reload()` to tell other
consumers to re-read. `updateUser` emits `USER_UPDATED` through the subscription the provider
already has.

**The cost, stated plainly: there is no database constraint behind either value.** So:

- **The rules moved into `src/lib/account.ts`, applied on read as well as on write.** `readLevel`
  returns `null` for anything outside `CHOOSABLE_LEVELS`. A malformed value cannot reach the
  interface, whatever put it there.
- **The blast radius is the account holder's own view.** Neither value is an identifier, neither
  grants anything, and re-choosing fixes either. **That is what makes the trade acceptable, and it
  is also the boundary: a setting that grants something, or that anyone else can see, belongs in a
  table with a constraint.** #38 is that case, and it is why `usernames` is a table.
- **`CHOOSABLE_LEVELS` is now the only gate on which levels exist.** Opening a level is a one-line
  change in `navigation.ts` with nothing downstream to catch a mistake — less friction than a check
  constraint gave, and worth remembering when B1 is written.

## 37 · Username and password; nothing on the server reads the session
**2026-09-06 · Binding**

Sign-in is a **username and a password**. No magic link, no mail, no sign-up form, no
`/auth/callback`, and no server Supabase client.

**Why not email.** Two accounts, credentials handed over in person: everything a magic link buys is
worth nothing, while it cost a round trip through an inbox on every sign-in. **Email comes back
when the app grows past the people its author knows** — the account is still a Supabase Auth user,
so adding an address is a field, not a migration. Holding no address is also why a forgotten
password is reset by hand, and why `/compte` carries a change-password field.

**A username is carried as `<name>@lepetitcours.test`.** Supabase Auth has no username provider, so
the username is the local part of an address that can never exist. **`.test` is reserved by RFC
2606** — nobody can register it and it never resolves — so no message can reach one by accident. A
registrable domain was asked for first and rejected on a fact: `lepetitcours.com` belongs to a
stranger **and publishes an MX record**, so a confirmation link would have landed in someone else's
inbox. **Run `dig MX` before choosing any fake domain**; a reserved TLD is the only kind that
cannot become someone's property later. Usernames are case-folded ASCII: an accent in a local part
risks not round-tripping through normalisation.

**Public sign-up must be off at the Supabase end, and the repo cannot enforce it.** The publishable
key ships in the bundle by design (#21), so `POST /auth/v1/signup` is reachable by anyone: a site
with no sign-up UI and sign-up enabled is an open registration nobody is watching. Accounts are
made in the dashboard instead, and `/compte` says so out loud rather than hiding it. That setting
and « Auto Confirm User » are the two the dashboard owns; `AGENTS.md` §0 carries them, because they
need checking rather than explaining.

**There is no admin role and no privileged account.** Every account holds the same things, so the
author's is an ordinary one and his ticks are isolated by the same policy as hers. **Do not add a
flag that makes one account different**: the day something needs privilege it needs a table with a
constraint (#36), not a boolean the account holder can write to themselves.

**Nothing in this app reads the session on the server, at all.** `/auth/callback` and the server
client were deleted rather than kept for later — `signInWithPassword` returns a session in the
browser, so no code is ever exchanged. `AGENTS.md` §8 stopped being a discipline and became a
property of the codebase, and `next build` shows every route static. **If a server client ever
reappears, that is a new decision, not a restoration.**

## 38 · The username is its own table — unique, mutable, mirrored
**2026-09-06 · Binding**

A learner signs in with **either their username or their email**, GitHub-style. The username is
unique, changeable, and falls back to being the display name when none is set.

**This is the case #36 described.** A username you sign in with grants something, and uniqueness is
a constraint — user metadata has neither, so it cannot hold this. `public.usernames` clears a bar
that was already written down rather than a new one.

**What the coupling cost.** Until now the username *was* the email's local part, computed by
arithmetic. That made sign-in possible with no database read, which is elegant — and it meant the
two could never disagree, so a username could not change without changing the address. Decoupling
buys a mutable name and costs a lookup.

**The lookup is `email_for_username()`, `security definer`, granted to `anon`.** It has to be: there
is no session at sign-in, so the browser cannot read a table. Definer rights let it answer without
granting anyone `select` on `auth.users`.

**It is an enumeration oracle, accepted rather than overlooked.** Anyone may ask whether a username
exists and learn the address behind it. Tolerable **only** while every address is a fake `.test` one
and the site is unlisted. **The day a real address goes on an account, this leaks it**, and
resolution must move server-side behind a rate limit. Written into the migration beside the
function, not left to memory.

**Uniqueness is enforced by the constraint and nowhere else.** The interface never asks "is this
name free?" before writing — that is both a race *and* a second oracle. It writes, and turns `23505`
into « déjà pris ».

**The name is mirrored into user metadata, and the table stays the authority.** This is an offline
PWA: a signed-in learner in the métro must still know what she is called, and metadata rides in the
cached JWT while a table needs the network. `set_username()` writes both in one transaction.
**Only that function and the account trigger write the mirror**; a client writing it directly could
make the two disagree.

**Accounts get a username without anyone typing one.** They are made by hand in the dashboard, where
there is no username field, so a trigger claims one from the email's local part and suffixes it on
collision.

## 39 · The home page is a search field; the sommaire is at `/sommaire`
**2026-09-06 · Binding**

`/` is the wordmark, one large search field and a short row of chapter pills. The chapter cards live
at `/sommaire`.

**A table of contents is what you consult, not what you arrive at.** The sommaire answers *what is
in this course?* — a question a returning learner has already answered. Arriving there means
scanning fifteen cards to reach the one page you wanted.

**Decided against a search that filters in place.** Instant results would be faster by one
navigation, and the query would live in component state instead of the URL: not linkable, not in the
back button, and gone when the service worker serves the page cold.

**The index is the manifest, read a second way.** `src/lib/search.ts` searches titles, subtitles,
tags, blurbs and DELF descriptors. No build step, no fetch, no server — the shell already imports
the data, so search works offline, which is the only version of search this project can honestly
ship. **It folds accents**, because both profiles type on a Spanish keyboard: *passe compose* has to
find « Le passé composé ». Full-text search over lesson prose needs a compile-time index and a
fetch; that is a different decision.

**Results are grouped by level, never cut by it — a deliberate exception to #35.** A results page
has no counterpart to disagree with, and it answers a question someone asked *in words*. Hiding a
page whose name was typed would say « ça n'existe pas » about a page that exists and opens normally.
Out-of-level matches appear under « À d'autres niveaux ».

**`featuredChapterSlugs` is the one hand-kept list**, and the `nav-wiring` audit has a line for it
because it fails soft the way cross-links do. It is editorial and short on purpose — fifteen pills
is the sommaire again — and an empty chapter named there simply does not draw.

**`/recherche` is static.** The query is read by `useSearchParams` in a client leaf inside
`Suspense`; reading `searchParams` in the page would make the route dynamic.

## 40 · The sidebar is one level deep
**2026-09-06 · Binding**

A chapter row is a link to its landing page, not a disclosure. The lessons are listed there.

**It was sized for a course that does not exist yet.** The A2 syllabus alone will be dozens of
lessons. Expand two chapters and the sidebar stops being the thing you navigate with and becomes the
thing you scroll — a tree that works at three lessons quietly stops working around thirty, and
nobody notices the day it does.

**The chapter page was already the right place**, with levels, tags and ticks the sidebar never had
room for. Keeping both meant two lists that had to agree.

**Decided against showing only the current chapter's lessons**, which is worse than either option:
the sidebar would change shape as you move, so the row you were reaching for is not where it was.

**Do not put the lessons back.** The answer to "the sidebar should show more" is the chapter page or
search. If it ever needs to open again, the reason has to be something other than "there is room".

## 41 · The whole content is « le cours », not « le livre »
**2026-09-06 · Binding**

**« le livre » is a word this course teaches.** It sits in a vocabulary table as A1 vocabulary while
« Le livre » sat in the chrome meaning the whole site — and the reader who cannot tell the two
senses apart is exactly the beginner meeting the word for the first time.

**It was never a book.** There is no PDF export and no print stylesheet (#1), so the one thing the
metaphor promises is the one thing deliberately removed.

**« le cours » because the brand already says it.** The site is *Le Petit Cours*, so the collective
noun and the name are the same word by construction — the same trick as the accent being the
wordmark's own blue (#27). It is also a direct cognate of *el curso*.

**Decided against « la méthode »**, the correct French publishing term, which reads as institutional
jargon to a beginner. **Decided against « le programme »**, which was already taken: the level filter
says « le programme A2 », and one word for both a level's syllabus and the whole content is the
collision this entry removes.

**The parts are all named and all taken**, so a new one has to earn its word: **leçon** a page,
**chapitre** one of fifteen, **sommaire** the contents page, **parcours** an ordered path,
**programme** a level's syllabus. In English prose, *the course*.

## 42 · Three shells; chapter icons are required and compiler-checked
**2026-09-06 · Binding**

A **drawer** below 56.25rem, an **icons-only rail** between 56.25rem and 75rem, the **open panel**
above. Either wider shape can be collapsed, and the choice is remembered.

**The rail exists because 16.5rem is a quarter of a 900px tablet.** The panel was already open at
that width and the reading column paid for it.

**One preference, not one per breakpoint.** `data-rail` on `<html>` is `1`, `0`, or absent — absent
meaning "follow the width". CSS resolves it into `--shell-mode` and `--sidebar-now`, and
`useShellMode` reads the result, so the hook knows neither the breakpoints nor the preference.

**The rail's styling is a container query on the panel, not a third breakpoint.** The panel asks its
own width whether there is room for words, so there is no number to keep in step.

**Chapters carry icons, and a missing one does not compile.** `IconName` is a union in the manifest
and `ChapterIcon`'s map is a `Record<IconName, …>`, so both directions are compile errors: a chapter
with no icon, and an icon nothing names. **There is no `default` entry and there must never be
one** — a generic fallback glyph makes a forgotten chapter look deliberate and fails nowhere, which
is the bug this replaced. Verified by breaking it on purpose before relying on it.

**The icons are drawn in the repo, inline SVG.** This is a PWA someone opens in the métro: an icon
that arrives over the network is missing exactly when the app is supposed to still work. Drawing
them also drops the third-party attribution obligation (§9b).

**The sommaire card keeps the serif initial.** A card has room for lettering; a 3.75rem rail does
not, and an initial derived from the title cannot fall out of step at all.

## 43 · The topbar is part of the page, not a band over it
**2026-09-06 · Binding**

No border, no surface of its own, no backdrop blur.

**Sticky and transparent are one decision, not two.** A bar pinned to the top with nothing behind it
is page text sliding under a breadcrumb, with neither readable. **That is the rule to remember,
because the two will be proposed back separately:** a change that restores the surface is also
asking to pin it, and a change that pins it is asking for the surface back. See #44 for the one
breakpoint where pinning won, and what it had to bring with it.

**Decided against removing the bar entirely.** Below 56.25rem it holds the only control that opens
the drawer, so deleting it strands the sidebar on a phone.

**Decided against keeping it on mobile and dropping it on desktop**, the tidier answer on paper: one
shell having a header and another not is a difference a reader has to learn, and the duplication is
cheap once the band paying for it is gone.

## 44 · The topbar is sticky on mobile only, in the page's own ground
**2026-09-06 · Binding**

Below 56.25rem the topbar is `position: sticky`, painted in **`--surface-app`**. Above, it stays
exactly as #43 left it.

**#43 priced this and got it wrong.** It noted that unsticking meant the drawer opener scrolls off,
and accepted that. It is not acceptable: below the breakpoint that button is the *only* way to open
the sidebar, so from halfway down a lesson there was no navigation at all. **A control that is
sometimes absent is worse than a band.**

**The fix is not a rollback.** The band was never the point of being sticky — occlusion was.
`--surface-app` is what `body` is painted in, so a bar filled with it hides what scrolls under it
and is invisible against the page. **Do not give it a surface of its own**: the translucent
`--surface-bar` is exactly what could not work, and it stays deleted.

**`--z-bar` is scoped to that breakpoint.** A sticky bar genuinely floats, so a positioned element
inside a lesson would otherwise paint through it.

## 45 · One sidebar control; the trail never names the page you are on
**2026-09-06 · Binding**

**One button, at every breakpoint.** It opens the drawer below the breakpoint and collapses the
panel above it, and sits at the left edge of the content, against the panel it acts on. There were
two controls for one idea — one in the topbar, one at the foot of the panel — and neither was
present at all widths. Nothing about the sidebar is operated from inside the sidebar any more.

**One button, two verbs.** A drawer is *ouvert* and *fermé*; a panel is *réduit* and *développé*.
The label follows the mode, because the label is what the one user who depends on it gets.

**The trail does not name the current page.** It showed « Grammaire › Les articles » above an `<h1>`
already reading *Les articles*. What is left is the one thing a page cannot say about itself: **the
chapter, as a link back up** — and since `PageHeader` no longer prints the chapter either, the crumb
is now the only place a lesson names it. Top-level pages show nothing, which is correct rather than
empty.

**This is the breadcrumb, not a placeholder for one. When it grows it grows *upward*** — a parcours
step, a level (#65). **Putting the leaf back is not growth**; it is the duplication this removed.

## 46 · No copyright notice; the reuse terms live on `/a-propos`
**2026-09-06 · Binding**

The footer is one line with **no © symbol, no year and no name**.

**A notice would add nothing this project has.** Copyright arises on creation under the Berne
Convention. The one thing a notice still buys is narrow and foreign — it forecloses an "innocent
infringement" plea in mitigation of damages under US law — and it does not affect whether the rights
exist.

**And it would say less than what is already there.** © asserts that rights are reserved; `LICENSE`
and `LICENSE-CONTENT` grant them, which is both more useful and the thing only the holder can do.
Leading a repository that exists to be reused with a reservation notice is arguing against itself.

**A year is a liability with no upside.** Hardcoded it goes stale; `new Date().getFullYear()` on a
statically prerendered page freezes at *build* time and quietly shows the year of the last deploy.

**What was actually missing was the attribution.** CC BY-SA obliges *reusers* to credit, and
`LICENSE-CONTENT` fixes the form. `/a-propos` now carries it, copied rather than reworded — two
documents describing one obligation differently is worse than one describing it nowhere.
**Change both in the same commit.**

## 47 · The account popover holds the account, and nothing else
**2026-09-06 · Binding**

« Ma progression », « Compte » and the theme. A page *about the site* is not one of them, so
« À propos » and « Code source » left it — the source link was the same link three times, and
`/a-propos` links the repository in its own sentence.

**A popover anchored to its own trigger does not restate it.** It carried the learner's name a few
pixels above the control that already shows it.

**`Annexe.where` gained `footer`**, so `/a-propos` keeps its manifest entry — searchable, and visible
to the audit — while moving surfaces. **The position of a page stays a property of the page**, never
a list hand-copied into the components that render it.

## 48 · A tick needs an account; offline is a queue of operations
**2026-09-06 · Binding**

**Marking requires being signed in.** Signed out the control is still drawn — not hidden, not
disabled — and links to `/compte?suivant=<the lesson>`.

**Decided against a browser-local tick for anonymous visitors.** Storage alone is evicted without
warning, and a course that quietly loses forty ticks has made a promise it could not keep. Better to
say what an account is for than to remember unreliably.

**`?suivant=` is checked against the manifest, not against a pattern.** "Starts with a slash" is not
a safe test — `//ailleurs.example` starts with a slash and leaves the site.

**Coming back does not tick the lesson.** Marking is manual on every page type, drills included:
reaching the foot of a page is not reading it.

**Offline is an operation queue, not a snapshot.** A tick made with no connection is stored as
*mark* or *unmark* and replayed onto whatever the server holds. Held as a snapshot, an offline
unmark is indistinguishable from a device that never saw the tick, and replaying it resurrects what
the learner removed.

**Nothing touches storage directly.** Every read and write goes through the `load()` / `save()`
adapter, so the cache and the sync are two implementations of one interface.

**`/ma-progression` is the one listing that does not filter by level.** Every other listing shows
what the course offers; this one shows what she *did*. A tick hidden because she moved level would
read as a lost tick.

## 49 · The shell draws the end of a lesson: the tick, then the links
**2026-09-06 · Binding**

`LessonEnd` renders the done-tick and « Pour aller plus loin », in that order, for any path that
resolves to a lesson. **A lesson page renders its header and its prose, and nothing else.**

**The omission is the gain.** A lesson that forgot `<RelatedLinks />` lost its cross-links with
nothing failing anywhere — the audit checks that `relatedPages` resolves, not that a page bothered
to render it. That failure mode no longer exists.

**What it costs:** the links are inside the shell's client boundary rather than a Server Component's
output. Nothing measurable — the manifest is already in the client bundle for the sidebar, and the
markup is still prerendered.

## 50 · Progress is keyed by a permanent lesson id, never by the route path
**2026-09-06 · Binding**

Every lesson carries a required `id` — `gram-passe-compose`, `orth-accents` — and that is what a
tick is stored under, in IndexedDB and in Postgres alike.

**The path was never the lesson.** It carries the title, the chapter and whatever spelling looked
right the day the page was written, and a course revises all three. Each of those was, until now, a
silent deletion of every learner's history on that page.

**What it replaces is a discipline nobody could see failing.** The old scheme keyed by path and
mitigated renames with a `pathAliases` map: rename a lesson, remember to add the old path in the
same commit. The mitigation was sound and the failure mode was not — forgetting the entry looked
exactly like remembering it, in the diff, in the build and on screen. A required field that is never
edited cannot be forgotten that way.

**Chosen against three alternatives.** A *uuid* is unreadable in a diff, and this manifest is
reviewed by eye. *Chapter + slug* is the path again with a different separator. *Keeping the path
and enforcing aliases in the audit* was the closest call — it would have caught the forgotten
entry — but it defends a rename with a check that has to be run, where this removes the danger from
the operation altogether.

**The id is frozen from the commit that adds it.** Changing one deletes every tick on that lesson,
silently. That is now the only way to lose progress, and it is a thing you have to go and do rather
than neglect. **Renaming a path needs a redirect in `next.config.ts`; the id must not change in that
commit or any other.**

**Two checks, at the two ends.** `navigation.ts` validates shape and uniqueness *at import*, so a
duplicate fails `next build` rather than shipping a pair of lessons that tick each other;
`progress_lesson_id_shape` re-checks in Postgres.

**Only lessons carry an id.** `Lesson` extends a `PageEntry` base that chapters and annexes use, so
the field is required exactly where a tick is possible — an annexe with a spare id is an invitation
to store progress against `/compte`.

## 51 · The course announces nothing it has not written
**2026-09-06 · Binding**

There is no `soon` flag, no placeholder entry, no dimmed row and no « Bientôt » card. **A manifest
entry goes in the same commit as its `page.tsx`.** A chapter with no lesson is dropped by
`listedChapters(level)` and returns on its own the moment its first lesson lands.

**The placeholders were a promise the repo kept making and could not date.** They were written when
the manifest was the plan — the shape of the course visible in one file. That job is done. From
here, a « Bientôt » row is a learner clicking something that turns out not to exist, and a
maintainer reading counts that describe intentions rather than pages.

**Chosen against keeping every chapter visible with an honest empty state.** That is the same
experience under better manners: rows that lead to a page with nothing on it.

**The chapters themselves stay declared.** All fifteen keep their slug, icon and blurb, every
landing page still builds, and every URL still answers. The structure is decided; only the offer is
filtered.

**Search hides an empty chapter rather than grouping it** — the one place search does not follow
"answer what was typed". A page filtered out by level still opens and reads in full, so grouping it
is honest; an empty chapter has nothing behind it.

**Do not reintroduce a "coming soon" row in any form** — dimmed, disabled or counted.

## 52 · The content is A2 only, for now
**2026-09-06 · Binding**

`CHOOSABLE_LEVELS` holds `A2` alone. B1–C2 are declared, unchoosable and carry no page.

**The reason is the learner, not the content.** The course has one student and she is at A2. An
earlier plan started at A1, sized to the DELF A1 syllabus — a defensible order for a course with an
audience, and the wrong one for a course with a reader. The three A1 pages written during the
scaffold were a sample of a level nobody here is at, and were deleted.

**Offering an empty level would hand someone an empty course**, which is why the list is the only
gate and why a level joins it once it has content.

## 53 · One language of instruction, and it is French
**2026-09-06 · Binding**

Every page is written in French: explanations, tables, callouts, drill instructions, chrome. No
Spanish gloss, no translation column, no bilingual page. **The single exception is a `traduction`
page's source text** (#55).

**The rule this replaced split the course by reader** — Spanish for the learner, French for the
heritage speaker. It was sound, with a nationality baked into it. The course is public, and a
Spanish gloss is dead weight for a Brazilian, an Italian or a Moroccan reader who is otherwise
squarely in the audience, while the heritage speaker was already being served in French. **Choosing
French for everyone widens the door without moving it.**

**It also removed a question that had been open since 2026-08:** pages both profiles read cannot be
Spanish-first and French-first at once. That problem is gone rather than resolved.

**The audience did not change; it moved from the language to the content.** It now decides *what* is
explained and how plainly, never which language explains it:

- a false friend gets a French definition and an example that makes the wrong reading impossible,
  where it used to get a gloss — *« Elle porte une robe bleue »* settles what a `robe` is;
- an interference error is printed wrong-then-right — *on ne dit pas « il est trois »*;
- **the French of the explanation stays easier than the French being taught.** That is the failure
  mode of this decision, and `content-proofreader` hunts for it first.

**What it costs.** A beginner reading a rule in a language they do not yet have is genuinely harder,
which is survivable precisely because the content starts at A2 (#52). Drills lose the disambiguating
gloss and must lengthen the sentence instead. And the fourth table column, which held the
translation, now holds an example sentence: a paradigm with nothing anchoring it is not a lesson.

**English remains forbidden, for both profiles.**

**The typographic split survives and means one thing now.** Serif is the French under study, sans is
the sentence explaining it. With no second language on the page, `lang="fr"` no longer needs
repeating on every span — `<html lang="fr">` covers it, and the attribute is kept only where an
element is pronounced on its own.

## 54 · A conversation page is a guided role-play, graded nowhere
**2026-09-06 · Binding**

A page in `conversation/` sets a scene, gives the steps the exchange follows, and offers the words
to play it. It grades nothing and stores nothing, because **it needs a second person**.

**It was going to be a gap-fill.** The mechanic is sound, and a gap-fill grades a script someone
else wrote. What an A2 learner cannot do is produce her own turn in a conversation whose next line
she does not control; filling the seventh blank correctly is not evidence of that. The drill would
run perfectly while teaching recognition.

**Two callouts is the ceiling for the whole page.** A role-play that grows a paradigm table has
become a lesson with a dialogue stapled to it.

**The one client leaf is the constraint card**, which cycles through variations of the same scene:
only the morning is free, the cabinet has nothing before Thursday, she is calling for her son. It
exists because a role-play played twice is a script being memorised. **It cycles in order, never at
random** — a random pick renders one thing on the server and another on the client, and in a class
you want to walk the whole list anyway.

**Write the scene so the grammar just learnt is unavoidable**, not so it is mentioned.

## 55 · A `traduction` chapter — the one place Spanish is allowed back
**2026-09-06 · Binding**

A short Spanish source text, a place to write the French, and the model version. Spanish appears as
**material to be translated**, never as explanation — which is what keeps #53 intact rather than
bending it.

`src/components/exercice/Traduction.tsx` renders all of it, so a page is data: `lines`, `model`, a
`note`. **One component, not one per page** — the first text had its own copy and the second would
have been a fork, which is how a chapter ends up with bespoke CSS on every page.

- **Four sentences that hang together.** Four unrelated sentences is a grammar exercise wearing a
  text; a small scene gives every choice a context to be right in.
- **Choose the text against a lesson, never against a topic.** Ask which lesson is still
  unpractised.
- **Three hints, on the words Spanish does not give away**, and **never on a word the text exists to
  test**. A hint gives the base form: vocabulary is what stops a learner mid-sentence, while tense,
  auxiliary and agreement are the exercise.
- **The note under the model says what does not count.** Name the accepted variants, then name the
  one thing you do not. Without it she reads every difference as a mistake.
- **Check the Spanish as carefully as the French.** A French word or French punctuation left in the
  source is invisible to the build and obvious to the reader.

## 56 · The conjugation sheets: one data file, one route
**2026-09-06 · Binding**

`src/data/conjugaisons.ts` holds the verbs, `ConjugationSheet` draws them, and
`app/conjugaison/[verbe]/page.tsx` renders every one. **Adding a verb is one data entry plus one
manifest entry; there is no page to write.**

**Chosen against one wrapper file per verb** — thirty one-line files that can each drift.

**A form is stored `radical|terminaison`.** The mark is what lets the sheet colour the ending, so
the colour cannot drift from the form. A form with no mark is all stem, which is a fact about the
verb rather than a missing split.

**The futur and the imparfait are generated from a stem**, because every French verb shares those
endings and storing them twelve times invites a typo into one. `assertVerbs()` refuses a futur stem
not ending in `r`, or an imparfait stem ending in `e`, `g` or `ç` — that last one is the
`-ger`/`-cer` trap, where one stem cannot give both *je mangeais* and *nous mangions*. Such a verb
stores two, both written out rather than derived: a rule that inserts an `e` is a rule that will one
day insert it into the wrong verb.

**The imparfait is on the sheet**, which it was not in the version before. It lived only in
`grammaire/l-imparfait`, so the one tense whose forms are perfectly regular was the one tense you
could not look up.

**The two toggles are why the sheet is a client component.** Négatif shows where *ne … pas* lands —
around the verb in a simple tense, around the **auxiliary** in the passé composé, which is the
mistake a Spanish speaker makes for months. Féminin shows the participle agreeing, and only on an
`être` verb.

**The cross-links are derived, not typed.** Eleven of twelve would be the same two paths, so the
twelfth being different by accident is the failure this avoids.

## 57 · A role-play offers words, never a model dialogue
**2026-09-07 · Binding**

The steps name the moves, a cloud carries about twenty words, and **nothing carries a sentence she
could say instead of building her own.**

**The model dialogue is gone and does not come back.** A page that prints a finished conversation
teaches the learner to read one; hiding it behind a `<details>` only delayed that by a click.

**One aid, in one place.** The first draft hung a phrase list off every step *and* closed with a
full dialogue, so every phrase existed twice. **Two aids for one difficulty is not twice the help:**
it is a page the learner reads instead of playing.

**Writing the cloud:** roughly twenty entries, walked against the constraint card so every situation
on it is answerable out of them — that is the test, not the count. **An entry is a word or a small
fixed piece**, never a full sentence about the scene, which is a model dialogue smuggled back one
chip at a time. Ordered the way the conversation runs, not alphabetically. **No glosses**: a word
that needs explaining belongs in the lesson the page links to.

## 58 · What a `lecture` text has to be
**2026-09-07 · Binding**

Real **public-domain** French text, or an original A2 dialogue for a practical scenario. Never
machine-generated filler, never in-copyright text. Structure: source stamp, the text in `.example`
blocks, a vocabulary table (mot | définition en français | exemple), and an « Avez-vous compris ? »
quiz that grades on screen and stores nothing.

**`lecture`, not `litterature`, and the blurbs decide it.** `lecture` promises questions;
`litterature` promises commentary. A classic can carry either page; what the page *does* with it
settles which chapter it belongs to.

**Choose the text for its tenses, not for its fame.** Nineteenth-century narrative is written in the
passé simple, which this course does not teach, so most of the canon is unusable at A2 whatever its
vocabulary. Where a few passé simple verbs survive in a quotation, leave them — it is a
quotation — and add one `.attention`: in a book you read *il cria*, in life you say *il a crié*, and
you will never write the first. That is a reading skill, and reading is what the chapter is for.

**Public domain means in the country of origin, and a death date is not enough.** The working test
is an author who died before ~1955. **Saint-Exupéry is not public domain in France**: *mort pour la
France* adds thirty years to the seventy, so *Le Petit Prince* is protected there into the 2030s
while being free almost everywhere else. An earlier brief listed him as a safe example; it was
wrong, which is why the test is written down rather than left to intuition.

**Quote exactly, and verify against the scan.** Nineteenth-century punctuation looks like an error
and is not. Bridging sentences are the page's own and sit outside the quoted blocks, in the sans
face.

**The quiz is a client leaf**, not a reason to mark the lesson client. `Comprehension.tsx` renders
every quiz from `{ question, options, answer, because }` data. Its options are `<button>` elements,
**never hidden radios** — the click targets overlap and it breaks silently. Every answer is in the
text and every distractor is wrong *on the page*, not merely unlikely; `because` quotes the phrase
that settles it, because that is what the learner reads when she is wrong.

## 59 · How hard a `lecture` text may be, and what to do when it is too hard
**2026-09-07 · Binding · narrows #58**

**A text is chosen for what the learner can answer about it, not for what she can construe of it.**

**Difficulty is a property of the questions, not only of the prose.** Rostand's crowd scene is in
alexandrins and full of 1640 vocabulary — and it is also twenty people arriving at a theatre, so who
pays, who refuses and who plays cards are all answerable at A2. Proust's opening sentence is A2 and
the paragraph around it is not; the page asks about the candle, the book and the train, and nothing
about the métempsycose.

**Where the page cannot make the text easy, it says so and gives a way in.** A note explaining that
one line of verse is shared between two speakers is what makes the layout readable at all. **Neither
pretends.** A page that quietly presents C1 prose as A2 teaches a learner that she cannot read,
which is the opposite of the chapter's job.

**A page at the edge of the level gets two cross-links rather than four**, pointing back at the
reading that prepares it rather than sideways at four more places to go.

**One trap the verse cost.** Wikisource reprints the previous half-line in front of a split
alexandrin, so copying it as it comes prints a nonsense duplicate in every exchange. Strip the
prefixes by hand against the scan.

## 60 · World literature in `lecture`; the translator's death date is the test
**2026-09-07 · Binding · widens #58**

A translated text is allowed, and **it is labelled**. The chapter's job is reading French, not
reading French authors.

**The copyright test is the translator, not the author.** Shakespeare has been in the public domain
for four centuries and that settles nothing: a translation is a work and its translator holds rights
in it. François-Victor Hugo died in 1873, so his is free; a modern edition is not. This is the same
shape as the Saint-Exupéry trap in #58 and it will catch anyone reasoning from the author's dates
alone.

**The label rides in the manifest.** The subtitle names the translator, so it reaches the sommaire,
the chapter page, search and the cross-links; the source stamp gives both names and both dates; and
the page says in French that what she is reading is a translation.

**No English appears on the page, in any form** — no facing original, no title in English. §1
forbids English for both profiles and makes no exception for quotation; a bilingual layout would
also hand a Spanish speaker the wrong crutch, since English is not her language either.

## 61 · The badge is the chrome's brand; the wordmark is the home page's `<h1>`
**2026-09-12 · Binding**

**The badge is the brand in the chrome.** The sidebar's head draws the cursive P reversed out of a
filled `--accent` disc at every width — the construction `icon.svg` already used. Its ink is
`--text-on-accent`, never white, because `--accent` lightens in dark mode.

**The wordmark is not drawn in the chrome.** It cannot survive the rail, and a head that changes
shape at a breakpoint says twice what the badge says once. It is the home page's `<h1>`, and that is
the only place it belongs.

## 62 · Nothing counts what is in a chapter
**2026-09-12 · Binding**

No tally on the sidebar row, the sommaire card, or above the chapter page's own rows.

**None of them was answering a question.** A learner picking a chapter is choosing a subject, not a
workload — and on the chapter page the rows *are* the count, sitting directly underneath the number
that counted them.

**They were also three chances to disagree.** Each had to filter by the chosen level to avoid saying
seven over a list of four: real logic in three components to keep one number honest.

**`Chapter.unit` goes with them.** It existed only to name what the tallies counted, so a required
field nothing reads would have made every new chapter invent a noun.

**The progress tallies stay.** `/ma-progression` counts *what she did* against published lessons,
which is a different claim from how big a chapter is.

## 63 · The footer belongs to the home page; the shell's foot is one row
**2026-09-12 · Binding**

**The footer draws on `/` and on the pages it points to, nowhere else**, and `Footer` decides that
itself rather than the shell — the same shape as `LessonEnd` deciding whether a path is a lesson
(#49), so there is no allowlist to keep in step. It never links to the page you are reading: on `/`
it points out, on a footer annexe it points back to « Accueil ».

**The consequence is easy to walk into:** a `where: "footer"` annexe is reachable from the home page
only. **Put a page anywhere else in the manifest if it has to be reachable from a lesson.**

**The foot of the shell is one row across the sidebar's edge.** The account control and the footer
share **`--shell-foot-h`**, so the rule over them is one line and the type sits on one baseline.
**Change the account control's height and that token follows** — two numbers drift, and the rail is
where it shows, because there the label is hidden and the avatar alone comes up short.

## 64 · The crumb is aligned on the reading column, not on the button beside it
**2026-09-12 · Binding**

A 2.25rem button and 0.85rem of text 0.6rem apart do not read as a group; they read as a link
crowded against a button, while the `<h1>` the crumb names the parent of starts a hundred pixels to
the right. The crumb is on the reading column above the drawer breakpoint; the control keeps its
place against the panel it collapses.

The offset is computed from the tokens the content uses — `(100% - var(--measure)) / 2 - 2.25rem` —
so it follows `--measure` and `--shell-gutter`. **`max()` is load-bearing**: in the rail the column
is barely wider than the measure, the computed offset falls to zero, and the crumb would land on the
button.

## 65 · The lesson's level rides in the trail, in front of the chapter
**2026-09-12 · Binding**

**A2 · Grammaire**, over a title that is only the title.

**It is the lesson's tag, never the learner's chosen level.** `Lesson.levels` is manifest data, so
the bar reads no session and nothing flashes. The chosen level is a filter on listings, never on
access (#35): putting *it* there would claim the page belongs to a level the learner picked, on a
page that renders in full whatever they picked, and would drag an async session read into the chrome
above every lesson. **Do not.**

It sits outside the `<nav>` — a level is not a step of the trail — and `levels: []` draws nothing.

## 66 · Sections are marked, and the margin carries an index
**2026-09-12 · Binding · the mobile placement is open, see `AGENTS.md` §12**

**A short accent bar over every section heading.** Two or three sections *is* the lesson, so each
break is a change of subject, and space alone never read as one. Decided against a full-width
divider: the page already rules the title block and the cross-links, and a third line at every break
makes a lesson a stack of bands. **A bar marks a beginning; a rule cuts.**

**A `<section>` inside a lesson is a section** — it takes the bar, the break and a line in the index.
Column heads, cards and boards are `div` + `h3`.

**« Index » lists the lesson's own headings, read from the rendered page.** The manifest owns
lessons, not the headings inside them, and a second list would drift the first time a section was
renamed. `LessonToc` walks every `h2` after paint and assigns the ids, so a lesson declares no
outline — and **the anchors are therefore not permanent**: rename a section and its fragment
changes. The path is the address that is promised (#50).

**It does not draw when the margin cannot hold it, and the reading column never shrinks for it** —
93.75rem beside the full panel, 81.25rem beside the rail. Shifting the column left to fit one on
narrower screens would move every lesson off the axis the crumb is aligned on (#64), on every page,
for something only wide screens see.

**The scroll-spy reads rects on scroll, not an IntersectionObserver.** Found by screenshot: an
observer watching a zero-height band never fires when the page jumps past every heading at once,
which is exactly what following a link *in this index* does.

## 67 · « En résumé » is a titled block, and one line closes a lesson
**2026-09-12 · Binding**

**« En résumé » carries a written `<h2>` and is not a box.** It printed its own label from a
`::before` inside a bordered, tinted card — the callouts' own clothes — so the lesson's conclusion
read as one more of them. A `::before` is also unpointable, and #66's index links to headings, which
is exactly the part a reader comes back for.

**It restates and never adds.** A bullet carrying something the sections did not cover is a section
missing higher up. **Never echo the block directly above it**: a lesson usually ends on an `.astuce`
or an `.attention`, and a final bullet repeating it in the same words reads as duplication. Two
lessons shipped that way and were caught in a screenshot, not in review.

**One line closes the lesson.** The tick drew a rule and the cross-links drew another, centimetres
apart with a button between them. It is on `LessonEnd` now, once, above the tick: the lesson ends
where the shell's furniture begins (#49).
