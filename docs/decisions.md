# Decisions

Why the project is the way it is. `AGENTS.md` says what the rules **are**; this file says what they
were chosen *against*, which is the part that stops a settled question being reopened by accident.

**Every entry earns its place by still constraining something**; when nothing depends on it, it
goes. History belongs in `git log`.

**The numbers are permanent and are never reused.** `AGENTS.md`, the briefs and source comments all
cite `#nn`, so a number means one thing forever. **Gaps in the sequence are deliberate** — the entry
was removed because it no longer bound anything, and nothing should be renumbered to close the gap.

When you add one: append it with the next free number, say what it was chosen against, and if it
replaces an earlier entry, fold what still matters into your own text and delete the old one rather
than marking it superseded.

| #   | Date       | Decision                                                                                         | Status                                                 |
| --- | ---------- | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------ |
| 1   | 2026-08-26 | No PDF export, no print stylesheet                                                               | Binding                                                |
| 2   | 2026-08-26 | Progress is ticked manually, never automatically                                                 | Binding                                                |
| 4   | 2026-09-05 | Lessons are written from scratch, never adapted from an older page                               | Binding                                                |
| 6   | 2026-09-05 | Plain CSS (global tokens + CSS Modules), not Tailwind                                            | Inferred                                               |
| 7   | 2026-09-05 | Vercel hosting, still an offline PWA — not a static export                                       | Binding                                                |
| 8   | 2026-09-05 | Supabase, scoped to accounts and progress sync only                                              | Binding                                                |
| 10  | 2026-09-05 | The lesson authoring format is deferred until the primitives exist                               | **Open**                                               |
| 11  | 2026-09-05 | MIT for the code, CC BY-SA 4.0 for the content, with a carve-out                                 | Binding                                                |
| 13  | 2026-09-05 | Two learner profiles, and the heritage speaker is not a level                                    | Binding                                                |
| 14  | 2026-09-05 | A parcours orders lessons without owning them                                                    | Binding                                                |
| 15  | 2026-09-05 | A level is complete when it covers the DELF syllabus for that level                              | Binding                                                |
| 18  | 2026-09-05 | All content is public; an account buys only the learning path                                    | Binding                                                |
| 21  | 2026-09-05 | No key that bypasses RLS lives anywhere, and RLS is the authorization model                      | Binding                                                |
| 22  | 2026-09-05 | A progress row *is* the tick; the level never keys progress                                      | Binding · narrowed by #68                              |
| 24  | 2026-09-05 | IndexedDB is the local store; `localStorage` is for pre-paint values only                        | Binding · amended by #102                              |
| 26  | 2026-09-05 | Sign-in is a route, `/compte`, never a modal                                                     | Binding                                                |
| 27  | 2026-09-05 | The accent is the wordmark's blue; the serif carries the French                                  | Binding                                                |
| 29  | 2026-09-05 | Chapter landing pages are one generated route, not one file per chapter                          | Binding                                                |
| 31  | 2026-09-05 | An account may hold an optional display name                                                     | Binding                                                |
| 36  | 2026-09-06 | The learner's settings live in user metadata, not in a table of ours                             | Binding                                                |
| 37  | 2026-09-06 | Username and password; nothing on the server reads the session                                   | Binding                                                |
| 38  | 2026-09-06 | The username is its own table — unique, mutable, mirrored                                        | Binding                                                |
| 39  | 2026-09-06 | The home page is a search field; the sommaire is at `/sommaire`                                  | Binding · narrowed by #71                              |
| 40  | 2026-09-06 | The sidebar is one level deep: a chapter is a link, not a disclosure                             | Binding                                                |
| 42  | 2026-09-06 | Three shells; chapter icons are required and compiler-checked                                    | Binding                                                |
| 43  | 2026-09-06 | The topbar is part of the page: no band, no blur                                                 | Binding                                                |
| 44  | 2026-09-06 | The topbar is sticky on mobile only, painted in the page's own ground                            | Binding                                                |
| 45  | 2026-09-06 | One sidebar control; the trail never names the page you are on                                   | Binding                                                |
| 47  | 2026-09-06 | The account popover holds the account, and nothing else                                          | Binding                                                |
| 48  | 2026-09-06 | A tick needs an account; offline is a queue of operations                                        | Binding                                                |
| 49  | 2026-09-06 | The shell draws the end of a lesson: the tick, then the links                                    | Binding                                                |
| 50  | 2026-09-06 | Progress is keyed by a permanent lesson id, never by the route path                              | Binding                                                |
| 51  | 2026-09-06 | The course announces nothing it has not written                                                  | Binding                                                |
| 54  | 2026-09-06 | A conversation page is a guided role-play, graded nowhere                                        | Binding                                                |
| 55  | 2026-09-06 | A `traduction` chapter — Spanish as material, never as explanation                               | Binding                                                |
| 56  | 2026-09-06 | The conjugation sheets: one data file, one route, the imparfait included                         | Binding                                                |
| 57  | 2026-09-07 | A role-play offers words, never a model dialogue                                                 | Binding                                                |
| 58  | 2026-09-07 | What a reading text has to be, and how the public domain is tested                               | Binding · amended 2026-09-30                           |
| 59  | 2026-09-07 | How hard a reading text may be, and what to do when it is too hard                               | Binding                                                |
| 60  | 2026-09-07 | World literature in `litterature`; the translator's death date is the test                       | Binding                                                |
| 63  | 2026-09-12 | The footer belongs to the home page; the shell's foot is one shared row                          | Binding                                                |
| 65  | 2026-09-12 | No level in the trail; a lesson's level is shown on its listing row                              | Binding · amended 2026-09-30                           |
| 66  | 2026-09-12 | Sections are marked, not merely spaced; the in-page index is read from the page                  | Binding                                                |
| 67  | 2026-09-12 | « En résumé » is a titled block, and one line closes a lesson                                    | Binding                                                |
| 68  | 2026-09-12 | A tick names its level only when the page holds a body of work per level                         | Binding · narrowed by #86, #87                         |
| 69  | 2026-09-17 | A recurring mistake steers the course, and nobody gets a programme of their own                  | Binding · extends #13                                  |
| 70  | 2026-09-21 | « La suite » is the dashboard; signing in returns you where you were                             | Binding                                                |
| 71  | 2026-09-21 | Signed out, `/` is a welcome; the search field is the signed-in home                             | Binding                                                |
| 72  | 2026-09-21 | A1 joins the course as pages, not as tags                                                        | Binding · narrowed by #74, #86                         |
| 74  | 2026-09-21 | A level is offered while it is being written, not once it is finished                            | Binding · narrowed by #77, #86                         |
| 75  | 2026-09-21 | The ladder stops at B2; C1 and C2 are out of scope                                               | Binding                                                |
| 77  | 2026-09-21 | The chooser offers the levels and rates none of them                                             | Binding · narrows #74                                  |
| 78  | 2026-09-21 | A `delf` chapter describes the exam and prints none of it                                        | Binding · amended by #82                               |
| 79  | 2026-09-21 | The tick is settable from a chapter's listing, beside the row's link                             | Binding · extends #2, #48                              |
| 80  | 2026-09-22 | A scratch chapter: listed like the others, counted like nothing                                  | Binding · extends #18, #48, #51                        |
| 81  | 2026-09-22 | The atelier sits behind one shared password, in a proxy that knows nothing else                  | Binding · extends #37, #80 · lifted 2026-10-06         |
| 82  | 2026-09-27 | An épreuve is marked once, at the end, and a person reads the listening one aloud                | Binding · amends #78                                   |
| 83  | 2026-09-27 | An épreuve may link a Commons photo as illustration, never as the answer                         | Binding · narrows §9                                   |
| 84  | 2026-09-27 | A written copy is handed in by downloading it, never by storing it                               | Binding · extends #31, #82                             |
| 85  | 2026-09-30 | An A1 page explains in Spanish; the French it teaches stays French                               | Binding · amended by #102                              |
| 86  | 2026-09-30 | A page has one level, and the learner chooses which levels they see                              | Binding · narrows #72, #85                             |
| 87  | 2026-09-30 | A page holding sets shows the learner's default one, with no tabs                                | Binding · amended 2026-09-30 · narrows #68             |
| 88  | 2026-09-30 | A parcours is a file of étapes, chosen in the account; « La suite » walks it                     | Binding · builds #14, amends #70                       |
| 89  | 2026-09-30 | The syllabus is data, and a parcours ends on its épreuves                                        | Binding · syllabus not built · builds #15, extends #88 |
| 90  | 2026-09-30 | A first sign-in passes through `/bienvenue`, in French or Spanish                                | Binding · amends #88, amended by #91                   |
| 91  | 2026-09-30 | The account screens speak the account's language, French or Spanish                              | Binding · amends #90, #31 · amended by #102            |
| 92  | 2026-09-30 | A literary work is one page whose body follows the level; at A1 the Spanish sits under each line | Binding · narrows #72, #86, #87                        |
| 93  | 2026-10-05 | A cited form is marked by weight, a wrong one by a line                                          | Binding · builds #27, #102                             |
| 94  | 2026-10-07 | The course speaks with the device's French voice, or not at all                                  | Binding · a trial · builds #51, #82                    |
| 95  | 2026-10-11 | The site is public and asks not to be indexed, or translated                                     | Binding · extends #18, #77                             |
| 96  | 2026-10-11 | Every size, space, radius, layer and shadow is a token; the page is flat                         | Binding · builds #6, #27 · the one shadow inferred     |
| 97  | 2026-10-11 | One paper, one field, one label, one board; the answer in hand is one state                      | Binding · builds #96                                   |
| 98  | 2026-10-11 | An agent checks with lint and types; the build and the screenshot are asked for                  | Binding                                                |
| 99  | 2026-10-12 | Contrast, focus and target size have numbers: WCAG 2.2 AA, checked                               | Binding · builds #96, #27                              |
| 100 | 2026-10-15 | The look follows *Le Petit Prince*: paper by day, night blue, gold stars as the one ornament     | A first iteration · builds #27, #96, #99               |
| 101 | 2026-10-27 | Installing has its page, French and Spanish: the browser's offer as one button, iOS steps        | Binding                                                |
| 102 | 2026-10-27 | The interface and the explanations follow the learner: French or Spanish                         | Binding · replaces #53 · amends #24, #85, #91          |

## 1 · No PDF export, no print stylesheet
**2026-08-26 · Binding**

Printing to A4 pinned the column to 794 px and spread `@media print`, `.no-print` and `.print-only`
through the CSS; the column is now a measure in `rem`. **Restoring print recurs as a suggestion**: a
parallel stylesheet for a feature nobody used.

## 2 · Progress is ticked manually, never automatically
**2026-08-26 · Binding**

Done means the learner pressed « J'ai terminé ». A drill shows its score, stores nothing, never
ticks itself. **Why:** a half-remembered pass at 50 % is not a finished lesson, and only the learner
knows; auto-completion records pages visited.

## 4 · Lessons are written from scratch, never adapted from an older page
**2026-09-05 · Binding**

Nothing is ported, translated or reshaped from an earlier version or from elsewhere. **Why:** an
adapted page inherits the old compromises and, invisibly, the old mistakes — misquotes no check can
catch.

## 6 · Plain CSS, not Tailwind
**2026-09-05 · Inferred, not explicitly confirmed**

Tokens and shared patterns in `globals.css`; component styles in co-located CSS Modules. Tailwind
was offered and not taken rather than rejected. **Wanting Tailwind means a new entry replacing this
one**, not one utility class at a time.

## 7 · Vercel hosting, still an offline PWA
**2026-09-05 · Binding**

A normal Next.js app, not `output: 'export'`, still precached and installable; Vercel project
`kevjrmy-projects/lepetitcours`. **Not a static export** because #8 needs a server for auth; it is
the fallback if that is dropped. Serwist (**not installed yet**) will supply the service worker.

## 8 · Supabase, for accounts and progress sync only
**2026-09-05 · Binding**

**The scope is the point.** Content stays in git; the database holds accounts and progress only, as
a sync target — the local copy is the read path. **Chosen over Firebase** because progress is
row-shaped. **Two env vars, both public by
design**; #21 says what must never join them.

## 10 · The lesson authoring format is deferred
**2026-09-05 · OPEN**

MDX, typed blocks or hand-written TSX: **not decided**; the interim is TSX. **It closes on evidence
from real lessons, which now exists**: a table row costs twelve lines of TSX, and a `traduction`
page's text lives in the page file, out of a teacher's reach. **Do not** set up an MDX pipeline or
block schema on your own initiative; content-as-data still needs deciding, not drifting.

## 11 · MIT for the code, CC BY-SA 4.0 for the content
**2026-09-05 · Binding**

MIT for code, CC BY-SA 4.0 for content. **Share-alike** because `culture` photographs come from
Commons under CC BY-SA anyway, and it keeps a derivative course open. **MIT** because the course is
the valuable part, and permissive code helps a port to another language pair.

**The carve-out is load-bearing**: the repo quotes material it does not own (songs, literary text
whose public domain is jurisdictional, photographs), and `LICENSE-CONTENT` says so. **A blanket
licence over material the project cannot license is worse than none** — a false grant reusers rely
on.

## 13 · Two learner profiles, and the heritage speaker is not a level
**2026-09-05 · Binding**

**The learner** (French from zero) and **the heritage speaker** (fluent at home, never schooled in
French) need opposite things: the language, or literacy in one already spoken. The heritage speaker
can be orally C1 and written A2 at once, so **no CEFR badge represents them**. **Not two apps or two
libraries:** one pool of lessons, different orderings and entry points.

## 14 · A parcours orders lessons without owning them
**2026-09-05 · Binding**

A **parcours** is an ordered path through existing lessons; a lesson belongs to its chapter,
referenced by any number of parcours. **Chosen over level as the top navigation axis**, which
duplicates chapters per level and leaves the heritage speaker nowhere. **"Without owning them" is
the load-bearing half:** copying a lesson per path makes two libraries that drift.

## 15 · DELF as the definition of done
**2026-09-05 · Binding**

A level is complete when it covers its published DELF syllabus. **An external anchor** makes
coverage checkable and gives teachers something besides taste. A count of published pages is an
inventory, never evidence of coverage. **Not a decision to certify anyone:** the app does not
examine.

## 18 · All content is public; an account buys only the learning path
**2026-09-05 · Binding**

Everything is readable with **no account**; an account buys the tick, the level and a position in a
parcours.

**Chosen over anonymous local progress claimed at sign-up:** two storage paths, a claim migration,
and progress that silently belongs to nobody. **Public content keeps lessons prerendered**, as long
as the session is never read above them (#37). **No analytics, no behavioural tracking.**

## 21 · No key that bypasses RLS lives anywhere, and RLS is the authorization model
**2026-09-05 · Binding**

`auth.uid() = user_id` in a policy, with permission checks nowhere else. **Per verb and
`authenticated` only** — four narrow policies per table, not one `for all`, so widening one verb
cannot widen the rest — and `anon` revoked outright.

**An unused key is not harmless:** service-role and secret keys bypass RLS, so the legacy keys are
disabled at the source — deleting them from Vercel was not enough. **Nothing Supabase-secret is
stored**: the database password was rotated and dropped from `.env`. **A feature needing a real
secret is a decision to take here first** (#81 is the one taken).

## 22 · A progress row *is* the tick; the level never keys progress
**2026-09-05 · Binding · narrowed by #68**

`(user_id, lesson_id, level)` and a `marked_at`, `level` being `''` except on a page with `sets`
(#68). Marking inserts; unmarking deletes. **No `done` column** (the row says it) and **no score
column**.

**The learner's chosen level is never part of a progress key** — #68's column names the variant a
page holds, not the setting — so a learner can drop a level and climb back losing nothing. **Scores
are stored nowhere**: a per-run score records performance, not what the learner decided is done.

**The database knows nothing about the course** — no lessons table or foreign key, which would be a
second place for the course to disagree with itself. **`marked_at` is client-supplied**: offline,
what matters is when the learner ticked, and a client can only lie about its own rows.

## 24 · IndexedDB is the local store; `localStorage` is for pre-paint values only
**2026-09-05 · Binding**

Progress and the level live in **IndexedDB**, keyed by account id. **Chosen over `localStorage` on
durability:** that is the first storage cleared under pressure, blocked in some privacy modes, capped
at 5 MB for the origin. The async cost is absorbed by the `load()` / `save()` seam.

**`localStorage` has exactly three jobs: the theme, the collapsed sidebar and the interface language
(#102).** The test: a value that must be correct **before first paint**, applied by an inline script,
and a short string nobody would mourn. Progress and the level fail the first clause.

## 26 · Sign-in is a route, `/compte`
**2026-09-05 · Binding**

`/compte` signs in and out and sets the level. **Chosen over a topbar modal** because a route is
linkable and keeps auth UI out of the shell. The account control links there and **never holds a
form** (#47). **No custom domain** at this scope: it means setting the redirect URLs twice.

**Decided against a separate `/connexion` form route**, which only reads better in the address bar:
with no server session read both routes would render both states, and the manifest switches an
annexe's *title* by state, not its *path* (#47). **`/connexion` is a redirect**, matched before the
filesystem, so a `page.tsx` there would never render.

**One heading, drawn by the leaf that knows who is asking** — « Se connecter » or « Compte »; the
prerendered HTML carries the first (#71).

## 27 · The accent is the wordmark's blue; the serif carries the French
**2026-09-05 · Binding**

**`#0044AA`**, the colour of `public/logo.svg`, so accent and brand match by construction; 8.7:1 on
white. **Chosen over the old `#12539F`**: two blues beside the wordmark are not defensible. **Red is
never decoration**: ornamental red teaches distrust of the one signal a graded drill needs trusted.

**Spectral for the French being taught, Inter for the instruction.** Colour is spoken for, so the
split needed another carrier, keyed on *example vs. explanation*. **Chosen over Georgia headings**:
Georgia's oldstyle figures hang below the baseline, a typo in a conjugation table. Spectral has
lining figures and draws `œ`, `ç`, `é`/`è`/`ê` as glyphs, not composites.

**`subsets: ['latin']`** covers every accent, `ç`, `ñ`, `¿` and `œ`; `latin-ext` is dead weight.
Real serif italics are loaded: a synthesised italic slants accents wrongly.

## 29 · Chapter landing pages are one generated route
**2026-09-05 · Binding**

`app/[chapitre]/page.tsx` with `generateStaticParams` and `dynamicParams = false`, so an unknown
slug 404s — which also stops the segment swallowing every unmatched top-level path. The verb sheets
likewise (#56). **Chosen over one near-identical file per chapter**, which drift; the cost is a
nav-audit line, since a filesystem walk skips dynamic segments. **Never hand-write a chapter landing
page.**

## 31 · An account may hold an optional display name
**2026-09-05 · Binding**

Optional; nothing depends on it. **The bar for anything further:** a learner would notice its
absence. An account holds a username, an email, a password, progress rows, a view, a parcours, a
language (#91) and an optional display name. Nothing else.

## 36 · The learner's settings live in user metadata, not in a table of ours
**2026-09-06 · Binding**

`public.progress` and `public.usernames` are the only tables the project owns. Level and display
name live in user metadata, which arrives with the session. **Decided against a `settings` table**:
a `NOT NULL` level needed a "not chosen" vs "not looked yet" flag, upsert vs update and a `reload()`,
all of which metadata deletes.

**The cost: no database constraint behind either value.**

The rules live in `src/lib/account.ts`, on read as well as write, and the blast radius is the
holder's own view. **A setting that grants something, or that others see, belongs in a table with a
constraint** — hence `usernames` (#38).

## 37 · Username and password; nothing on the server reads the session
**2026-09-06 · Binding**

A **username and password**; no magic link, mail or sign-up form. **Not email:** with accounts
handed over in person, a magic link is only an inbox round trip. **Email returns when the app
outgrows the people its author knows** — an address is a field, not a migration. Until then a
forgotten password is reset by hand.

**A username is carried as `<name>@lepetitcours.test`**, Supabase Auth having no username provider.
**`.test` is reserved by RFC 2606**, so no message can reach it. `lepetitcours.com` was rejected: it
belongs to a stranger **and publishes an MX record**. **Run `dig MX` before choosing any fake
domain.** Usernames are case-folded ASCII, since an accented local part may not survive
normalisation.

**Public sign-up must be off at the Supabase end; the repo cannot enforce it** — the publishable key
is in the bundle (§0). **No admin role**: privilege needs a table with a constraint (#36), not a
self-writable flag.

**Nothing reads the session on the server** — `signInWithPassword` returns it in the browser — so
§8 is a property of the code. **A server client reappearing is a new decision, not a restoration.**

## 38 · The username is its own table — unique, mutable, mirrored
**2026-09-06 · Binding**

Sign in with **username or email**; the username is unique, changeable, and the fallback display
name. **This is #36's case:** it needs uniqueness, which metadata cannot hold. **Decided against the
username being the email's local part**: no lookup, but unchangeable without changing the address.

**The lookup is `email_for_username()`, `security definer`, granted to `anon`**: there is no session
at sign-in. **It is an enumeration oracle, accepted** only while every address is a fake `.test` one
and the site is unlisted. **The day a real address goes on an account, resolution must move
server-side behind a rate limit** — noted in the migration beside the function.

**Uniqueness is the constraint's alone.** Never ask "is this name free?" first — a race *and* a
second oracle. Write, and turn `23505` into « déjà pris ».

**Mirrored into user metadata** so the name survives offline; the table is the authority. **Only
`set_username()` and the account trigger write the mirror**.

## 39 · The home page is a search field; the sommaire is at `/sommaire`
**2026-09-06 · Binding · narrowed by #71**

Signed in, `/` is the wordmark, one search field and a row of chapter pills; signed out, a welcome
(#71). Chapter cards are at `/sommaire` either way. **A table of contents is consulted, not arrived
at.**

**Decided against filtering in place:** a query in component state is not linkable, not in history,
and gone on a cold service-worker load.

**The index is the manifest**, with no fetch, so it works offline. Full-text search over prose
needs a compile-time index and a fetch: a different decision.

**Grouped by level, never cut — a deliberate exception to #86:** hiding a page whose name was typed
says « ça n'existe pas » about one that opens.

**`featuredChapterSlugs` is the one hand-kept list** — short, or it is the sommaire again.

## 40 · The sidebar is one level deep
**2026-09-06 · Binding**

A chapter row links to its landing page, which lists the lessons; it is not a disclosure.

**A tree that works at three lessons stops working around thirty**, and two lists would have to
agree. **Decided against
showing only the current chapter's lessons**: the sidebar would change shape as you move.
**Reopening needs a reason other than "there is room".**

## 42 · Three shells; chapter icons are required and compiler-checked
**2026-09-06 · Binding**

A **drawer** below 56.25rem, an **icons-only rail** to 75rem, the **open panel** above; either wider
shape collapses, and the choice is remembered. **The rail exists because 16.5rem is a quarter of a
900px tablet.** **One preference, not one per breakpoint**, and the rail's styling is a container
query on the panel, not a third breakpoint to keep in step.

**A missing chapter icon does not compile** (`IconName` union, `Record<IconName, …>` map). **No
`default` entry, ever** — a generic glyph makes a forgotten chapter look deliberate. **Icons are
inline SVG in the repo**, so they work offline and carry no attribution duty. **The sommaire card
draws the same icon** as the sidebar, so a chapter looks the same wherever it is listed; it once
held the serif initial.

## 43 · The topbar is part of the page, not a band over it
**2026-09-06 · Binding**

No border, no surface of its own, no backdrop blur.

**Sticky and transparent are one decision**: a pinned bar with nothing behind it is text sliding
under a breadcrumb, so **they will be proposed back separately**. #44 is where pinning won.

**Decided against removing the bar**: below 56.25rem it holds the only drawer control. **Decided
against keeping it on mobile only**: a header in one shell and not another is a difference to learn.

## 44 · The topbar is sticky on mobile only, in the page's own ground
**2026-09-06 · Binding**

Below 56.25rem the topbar is `position: sticky` in **`--surface-app`**; above, #43 stands.

**A control that is sometimes absent is worse than a band**: the drawer opener is the only way to
open the sidebar there. Occlusion was the need, not a band: `body`'s own paint hides what scrolls
under the bar and vanishes against the page. **The translucent `--surface-bar` stays deleted.**

## 45 · One sidebar control; the trail never names the page you are on
**2026-09-06 · Binding**

**One button, every breakpoint**, at the content's left edge: it opens the drawer or collapses the
panel. **Its label follows the mode** — *ouvert* / *fermé* for a drawer, *réduit* / *développé* for
a panel.

**The trail does not name the current page** — the `<h1>` is right beneath it. It keeps **the
chapter, as a link up**, the only place a lesson names it. **It grows *upward*** (a parcours step;
not a level, #65); **putting the leaf back is not growth.**

## 47 · The account popover holds the account, and nothing else
**2026-09-06 · Binding**

Pages *about the site* go to the footer. **The popover does not restate its trigger.** **Signed
out: « Se connecter » and the theme**, not the signed-in list greyed.

**Signed-out behaviour is in the manifest** — `signedOut: "hide" | { title }`, required on
`where: "menu"`: a component asking « is this `/compte`? » is a hand-copied list, and an optional
field lets a later row inherit a behaviour nobody chose. **`where: "menu"` requires `icon`**, or a
row draws a blank column and fails nowhere. **Position is a property of the page**, never a list in
components.

## 48 · A tick needs an account; offline is a queue of operations
**2026-09-06 · Binding**

Signed out, the control links to `/compte?suivant=<the lesson>`. **Decided against a
browser-local anonymous tick**: storage is evicted without warning, and quietly losing forty ticks is
worse than saying what an account is for. **`?suivant=` is checked against the manifest, not a
pattern** — `//ailleurs.example` starts with a slash. Coming back does not tick.

**Operation queue, not snapshot**: a snapshot cannot tell an offline unmark from a device that never
saw the tick, and resurrects it. **Storage only through `load()` / `save()`**, so cache and sync
share one interface. **`/ma-progression` does not filter by level**: a tick hidden by a level change
reads as lost.

## 49 · The shell draws the end of a lesson: the tick, then the links
**2026-09-06 · Binding**

`LessonEnd` renders the done-tick then « Pour aller plus loin » for any path resolving to a lesson;
**a lesson renders its header and prose only.** A lesson that forgot its links lost them silently,
since the audit checks the entry, not the render. **Cost:** negligible — the manifest is already in
the client bundle and the markup still prerenders.

## 50 · Progress is keyed by a permanent lesson id, never by the route path
**2026-09-06 · Binding**

Every lesson has a required `id` (`gram-passe-compose`); ticks are stored under it. **The path
carries title, chapter and spelling, all revisable**, and each revision silently deleted history.

**Chosen against:** a `pathAliases` map, where a forgotten entry looks like a remembered one; a
*uuid* (unreadable in a diff); *chapter + slug* (the path again); *audit-enforced aliases*, the
closest call, a check someone must run where an id removes the danger.

**The id is frozen from the commit that adds it**; a path rename needs a redirect.
`progress_lesson_id_shape` re-checks the shape in Postgres. **Only lessons carry an id**: an annexe
id invites progress stored against `/compte`.

## 51 · The course announces nothing it has not written
**2026-09-06 · Binding**

No `soon` flag, placeholder, dimmed row or « Bientôt » card; **a manifest entry lands with its
`page.tsx`**, and `listedChapters(level)` drops an empty chapter. **Chosen against an honest empty
state** — the same experience, better mannered.

**Every chapter stays declared** and every URL answers; only the offer is filtered. **Search hides
an empty chapter rather than grouping it**: it has nothing behind it.

## 54 · A conversation page is a guided role-play, graded nowhere
**2026-09-06 · Binding**

A scene, its steps, the words to play it; nothing graded or stored, because **it needs a second
person**. **Decided against a gap-fill**: it grades someone else's script, while the A2 difficulty
is producing your own turn when you do not control the next line — it would run perfectly and teach
recognition.

**Two callouts per page, maximum**; a paradigm table makes it a lesson with a dialogue stapled on.
**The constraint card cycles variations**, because a role-play replayed is a script memorised — **in
order, never random**, which differs between server and client.

## 55 · A `traduction` chapter — Spanish as material, never as explanation
**2026-09-06 · Binding**

A short Spanish source, a place to write the French, the model version. Spanish is **material, never
explanation**, so the French-only rule of the day held (now #102). **One component, `Traduction.tsx`, not one per page**, or every page
forks with bespoke CSS. How a page is written is `lesson-author.md`'s.

## 56 · The conjugation sheets: one data file, one route
**2026-09-06 · Binding**

`src/data/conjugaisons.ts` holds the verbs, `app/conjugaison/[verbe]/page.tsx` renders all. **A verb
is one data entry plus one manifest entry.** **Chosen against one wrapper per verb** — thirty files
that can each drift.

**Futur and imparfait are generated from a stem**, and a `-ger`/`-cer` verb stores both stems
written out: an `e`-inserting rule will one day hit the wrong verb. Négatif puts *ne … pas* around
the **auxiliary**, a Spanish speaker's long-running mistake. **Cross-links are derived.**

## 57 · A role-play offers words, never a model dialogue
**2026-09-07 · Binding**

Steps name the moves, a cloud of about twenty words, and **no sentence they could say instead of
building their own.** **The model dialogue does not come back** — it teaches reading a conversation,
and a `<details>` only delays that. **One aid, in one place**: a phrase list per step plus a closing
dialogue put everything on the page twice, to be read instead of played.

**The cloud** is tested against the constraint card, not by count. **Entries are words or small
fixed pieces**, never sentences (the dialogue returning a chip at a time), **with no glosses** (an A1
chip may carry a short Spanish one, #85).

## 58 · What a reading text has to be
**2026-09-07 · Binding · amended 2026-09-30**

Real **public-domain** French text or an original A2 dialogue or récit; never generated filler or copyrighted
text; an « Avez-vous compris ? » quiz graded on screen, stored nowhere. **What the text is picks its
chapter** (amended 2026-09-30): a text written for this course is `lecture`, a literary work is
`litterature`; both carry the quiz, and the rules on this page apply to both.

**Choose for tenses, not fame**: nineteenth-century narrative is in the passé simple, not taught
here. Surviving passé simple in a quotation stays, with one `.attention`.

**Public domain in the country of origin, not by death date alone.** **Saint-Exupéry is not public
domain in France** — *mort pour la France* adds thirty years, so *Le Petit Prince* is protected there
into the 2030s.

**Quote exactly, against the scan.** Every distractor is wrong *on the page*.

## 59 · How hard a reading text may be, and what to do when it is too hard
**2026-09-07 · Binding · narrows #58**

**A text is chosen for what the learner can answer, not what they can construe.** Rostand's crowd
scene is alexandrins and 1640 vocabulary, yet who pays, refuses or plays cards is answerable at A2.

**Where the text cannot be made easy, the page says so and gives a way in**: C1 prose passed off as
A2 teaches a learner they cannot read. **An edge-of-level page gets two cross-links, not four**, back
to the reading that prepares it.

## 60 · World literature in `litterature`; the translator's death date is the test
**2026-09-07 · Binding · widens #58**

Translations are allowed and **labelled**: the job is reading French, not French authors. **The
translator's rights are the test**, not the author's: François-Victor Hugo died in 1873, so his
Shakespeare is free; a modern edition is not. **The subtitle names the translator** wherever the
page is listed. **No English, in any form** — §1 has no quotation exception.

## 63 · The footer belongs to the home page; the shell's foot is one row
**2026-09-12 · Binding**

**The footer draws on `/` and the pages it points to**, decided by `Footer` itself as `LessonEnd`
decides lessons (#49), so no allowlist; it never links to the current page. **So a `where: "footer"`
annexe is reachable from `/` only.**

**The account control and the footer share `--shell-foot-h`**: one rule, one baseline. **Change the
control's height and the token follows**; drift shows on the rail.

## 65 · No level in the trail; a lesson's level is shown on its listing row
**2026-09-12 · Binding · amended 2026-09-30**

**The trail is the chapter, and only the chapter.** From 2026-09-12 it carried the lesson's level in
front of it (« A2 · Grammaire »); the maintainer removed it on 2026-09-30. A literary work now
shows a body per level (#92), so a floor printed above the page named a level the reader was not
reading, and on every other page it repeated the row's badge.

**Still true from the first version**: the learner's chosen level never goes in the topbar, which
would put an async session read above every lesson (#86). No badge returns beside the `<h1>`.

## 66 · Sections are marked, and the margin carries an index
**2026-09-12 · Binding · the mobile placement is open, see `AGENTS.md` §12**

**A short accent bar over every section heading.** Two or three sections *is* the lesson, so each
break is a change of subject, and space alone never read as one. **Decided against a full-width
divider**: a third line at every break makes a lesson a stack of bands. **A bar marks a beginning; a
rule cuts.**

**« Index » is read from the rendered page**: the manifest owns lessons, not their headings, and a
second list would drift at the first renamed section. So **the anchors are not permanent**; the
path is the promised address (#50).

**The reading column never shrinks for it**: that would move every lesson off the crumb's axis for
something only wide screens see.

**The scroll-spy reads rects, not an IntersectionObserver**, which misses a jump past every heading
at once — what following an index link does.

## 67 · « En résumé » is a titled block, and one line closes a lesson
**2026-09-12 · Binding**

**« En résumé » carries a written `<h2>` and is not a box.** As a `::before` label in a tinted card
it read as one more callout, and a `::before` cannot be pointed at by #66's index.

**It restates and never adds** — a new bullet is a section missing higher up. **Never echo the block
directly above it**: a lesson usually ends on an `.astuce` or `.attention`, and a bullet repeating it
reads as duplication.

**One line closes the lesson**, on `LessonEnd` above the tick, not a rule each for the tick and the
links.

## 68 · A tick names its level only when the page holds a body of work per level
**2026-09-12 · Binding · narrows #22 · narrowed by #86, #87**

`public.progress` has a `level` column, and a tick is stored under `progressKey(lesson, level)`: the
bare `Lesson.id`, or `id@LEVEL` on a page holding one body of work per level. **The test is
`sets` in the manifest** (#87), never the page's `level`.

**#22 is narrowed, not overturned**: the column names **which variant of the page was finished**, a
property of the work like `lesson_id`, not the learner's setting. One tick cannot report two bodies
of work, while a `[]` page belongs to no level on purpose.

**Chosen against a second route per level** (`…/le-lion-et-le-rat/b1`): it duplicates the text, the
id and the tick (#14, #86). The variant belongs in the key, not the URL.

**Moving a page between one key and the other is a data migration, not a tag edit**: rows keep
`level = ''`, so a key that grows an `@` stops reading them. Ship a backfill in the same commit,
guarded by the `(user_id, lesson_id, level)` primary key; the cache rebuilds itself.

**The ticks are off `ProgressApi`, and that is the load-bearing half**: a plain record indexed by
`lesson.id` compiles and reads the wrong variant, so every question takes the lesson **and a required
level**. **The unmark filters on both columns**: deleting on `lesson_id` alone takes every variant,
in a background sync, with no error.

**Two columns, not a composite id**: the `@` never reaches Postgres, where `progress_lesson_id_shape`
would reject it. `level`'s check is a shape — `'' or ^[ABC][12]$` — not this course's list.

**`?niveau=` stays closed**: `useSearchParams` would ship every lesson's Suspense fallback as its
prerendered HTML.

**In a drill, the remount is the reset**: the board is keyed on the level, so deck, placements, score
and « vérifié » go together; a reset threaded through four setters loses one.

**A page's sets and its manifest `sets` must agree**, and the manifest wins, so the sets sit in a
type-only-import module (`questions.ts`, `data.ts`) that the `nav-wiring` audit reads. **A set per
level is worth building only where the stimulus is level-independent and the *task* scales.**

## 69 · A recurring mistake steers the course, and nobody gets a programme of their own
**2026-09-17 · Binding · extends #13**

**A learner has an ordinary account, and nothing in the app is built for them** — no programme, no
teacher view. A recurring mistake only decides
**which page the profile gets next**, written for everyone with the profile, with invented examples.

**Decided against a bespoke programme**: it would be a student-management system under another name
(`docs/scope.md`, non-goals), a page built on one person's sentences serves nobody else, and it
would put their writing in a public repository. **Nothing about who made a mistake goes in a page, a
commit or a doc** (the atelier's anonymous copy aside, #80).

**The heritage profile widened** (#13) to a teenager at a Spanish school with Spanish writing
habits; a page names the habit in French without printing the Spanish word (#102: the French taught is never glossed; an A1 page's gloss aside,
#85). **A lesson may ship without a drill**; the drill comes when practice earns its place.

## 70 · « La suite » is the dashboard; signing in returns you where you were
**2026-09-21 · Binding · extends #48**

**A dashboard can only use the manifest, the progress rows and the chosen level** — all an account
holds (#31). Streaks, time spent and weak areas need events this app does not keep. What remains is
**one derived fact: the first lesson at your level that you have not ticked.** `nextUp` is its only
definition; a second would disagree in front of the same learner.

**Decided against a `/tableau-de-bord` page**: it would duplicate the record and hold nothing new.

**Decided against storing a position**: true resume records the last page visited — behavioural
tracking and a new account field. The first hole in course order needs nothing stored and is the
seam a parcours would feed (#14).

**Signing in returns them to the page they were on, and `/` is the fallback.** **One writer,
`signInHref`, and one reader, `safePath`, in the same file** — a param written in one place and
parsed in another gets encoded twice. **No `?suivant=` from `/` or `/compte`**: a stale `?suivant=%2F`
would bounce someone already signed in out of the settings.

**Decided against landing on `/ma-progression`**: a record is not what someone reading a lesson
asked for. **The redirect fires only when the session was first read as empty**, so the settings
stay reachable from the popover.

## 71 · Signed out, the home page is a welcome; the field is the signed-in home
**2026-09-21 · Binding**

`/` is two pages and the session picks. Signed in: the search field, « La suite », the chapter pills.
Signed out: a sentence saying what the course is, then « Tout le cours », « Rechercher », « Se
connecter ». **The field is the weakest thing for a newcomer**: you cannot search a course you lack
the words for.

**« Tout le cours » is the primary action, not « Se connecter »**: with no sign-up form, the account
is a door a first visitor cannot open (#18). **« Rechercher » is in the row because the field is
not.** The sentence names no chapter and no count, which would drift (#51).

**The cost, accepted: the prerendered `/` is the welcome**; the signed-in learner sees it for one
hydration.

**Decided against three cheaper-looking answers.** Keeping the field in both states leaves a first
visitor a control they cannot use. Drawing neither view until the session is read gives most people a
blank first screen. Reading a cookie on the server makes `/` dynamic and drops `start_url` from the
precache (§8).

## 72 · A1 joins the course as pages, not as tags
**2026-09-21 · Binding · extends #68 · narrowed by #74, #86**

A1 is written into the existing chapters, inserted before the A2 material in teaching order.

**One course that the level filters, not a second course beside A2**, which would duplicate the
chapters (#14, #86). A level as a *section* of one ordered path is what `parcours` is for.

**A lower level is a new page, never a wider tag** (#86): an A1 learner handed the A2 imparfait is the failure a second page
exists to prevent. **The conjugation sheets have no level**: a table is the same at every level.

**A second level is a new page, except where the stimulus has no floor.** An A1 cannot read Cosette
at all, and a drill whose mechanic *is* the level hides no A1 task. **`conversation` is not an
exception**: a role-play is its steps and its cloud (#57), and both change completely, so each level
gets its own.

**The syllabus is the Inventaire, and coverage is measured on the functions.** There is no official
DELF A1 grammar programme; the *Inventaire linguistique des contenus clés des niveaux du CECRL*
(CIEP/Eaquals, 2015), Annexe E, gives per level the fonctions, grammaire, socio-culturel and thèmes;
`docs/levels/a1.md` maps it. **#15's finish line for A1 is the FONCTIONS list**, not GRAMMAIRE.

**The inventory is spiral, so a shared topic is still two pages.** A1 and A2 both list *le présent*,
*le passé composé*, *les modaux* and more, differing by exponent — A1 negates with `ne… pas /
jamais`, A2 with `ne… plus / rien / personne`. The six points that first appear at A2 —
l'imparfait, l'alternance avec le passé composé, COD/COI, la comparaison, EN et Y, les relatifs —
have **A2 as their floor** and no A1 twin.

## 74 · A level is offered while it is being written, not once it is finished
**2026-09-21 · Binding · reverses the A2-only gate, narrows #72 · narrowed by #77, #86**

`CHOOSABLE_LEVELS` holds `A1, A2, B1`, and a level joins it while it is being written. **A2 was
written first, and that order stands**: the learners the course was started for are at A2.

**The A2-only gate answered the wrong question**: an unfinished level is dishonest only if something
claims it is finished, and offering a level announces nothing false (#51). **#15 defines when a
level is *done*, not when it may be *chosen*.**

**Closing a level is a silent reset**: `readLevel` filters on `CHOOSABLE_LEVELS`, so anyone on a
removed level reads back as having chosen none. Remember that before offering B2 to see what it
looks like.

**Chosen against two alternatives.** Keeping the gate left the maintainer unable to see the level he
is writing. A separate preview control would be a second writer of one value (#70).

## 75 · The ladder stops at B2; C1 and C2 are out of scope
**2026-09-21 · Binding**

`Level` is `A1 | A2 | B1 | B2`. **Out of scope, not deferred**: a declared, never-written level is the
"coming soon" #51 refuses, and neither profile (#13) needs academic or professional French.
**Removing them from the type makes it stick** — a C1 page is a compile error.

**`Level` is this course's ladder, not CEFR's, and the prose must not be "corrected" to match.** The
heritage speaker's **oral C1 and written A2** (#13) is CEFR describing a person.

**`progress_level_shape` still admits `C1`, deliberately**: the table holds what a rung *looks like*,
not which are taught (#22, #68). **Do not tighten it**, or a syllabus change becomes a migration.

## 77 · The chooser offers the levels and rates none of them
**2026-09-21 · Binding · narrows #74**

`COURSE_LEVELS`, the « en cours » chip and its line are deleted; `LevelChooser` offers three levels,
a blurb each. **They were written for a stranger, and this course has none**: unlisted, no sign-up,
every account made by hand for someone told what the course is.

**#51 is not reopened**: every choosable level has pages. What went is a **rating** — a second copy of
what #15 and `docs/levels/` hold.

**Chosen against two alternatives.** *Declare A1 and B1 finished*: a field that lies is worse than a
field that is gone. *Keep the note, drop the badge*: `COURSE_LEVELS` would become a list nothing
reads, looking load-bearing.

**The cost**: someone choosing A1 sees a thin listing, and nothing says so. **This is the first thing
to put back if the site is ever listed or opens sign-up.** A comment on `LevelChooser` says so.

## 78 · A `delf` chapter describes the exam and prints none of it
**2026-09-21 · Binding · extends #15, #51, §9b's licence rule · amended by #82**

`delf` holds **whole épreuves to sit in real conditions** and nothing else. **Decided against a page
explaining the format**: true, and standing between the learner and the exam. The barème lives on
its épreuve. `delf-comment-ca-se-passe` is a retired id, never reused (#50).

**The licence line is why the entry exists.** A prep book's material cannot go in, and neither can
France Éducation international's free sample sujets — free to download, not free to relicense (§9b).
**Format is a fact; a sujet is someone's writing**: four épreuves, twenty-five points each, fifty to
pass, five minimum per épreuve, the order on the day — stated; texts, items, consignes and corrigés —
never, however reformatted (#4).

**An official sujet may be read to calibrate difficulty, and leaves no trace.** `public/PDF/` is
gitignored: anything under `public/` is served, and serving is redistribution. **The chapter links to
the sujets instead** (`Chapter.outbound`); **attribution is not the fix**, since the repo still could
not license the copy. Nothing an épreuve needs hangs off that link, which fails offline.

**An épreuve's `level` is its paper's** (#86): a B1 candidate sits the B1 exam.

## 79 · The tick is settable from a chapter's listing, beside the row's link
**2026-09-21 · Binding · extends #2, #48**

A chapter's listing sets each lesson's tick — `RowTick`, in `PageRow`'s slot. **Decided against a
read-only row**: the lesson's control serves whoever just finished reading; the listing serves whoever
did four lessons this afternoon. **Marking is still manual (#2).**

**The card is the `<li>`**: a `<button>` in an `<a>` is invalid and one press would toggle and
navigate. Rejected: *the row a button with the title a link inside* (same nesting, reversed); *the
tick positioned over the link's padding* (target depends on paint order, a long title slides under
it).

**A finished row tints** in « Leçon terminée »'s pair — **one claim, one colour**; the circle alone
was invisible down a chapter. **The state is read once and handed to both halves**: two reads are one
refactor from two different claims (#68).

**Signed out, or before the cache answers, the listing draws no tick** — one invitation under the
lesson (#48), not forty; an empty circle claims « rien de terminé ». **Not extended to search
results**: a tick there would key at the learner's level for a variant they were not looking at.

## 80 · A scratch chapter: listed like the others, counted like nothing
**2026-09-22 · Binding · extends #18, #48, #51**

`atelier` — « Atelier » — holds the pages of a class in progress, shared on screen during a call,
then promoted or deleted: the only chapter **emptied on purpose**. Readers test `isTracked()` (#82);
how a page is written is `docs/atelier.md`'s. **The slug was `temp` until 2026-10-06**; renamed with
no redirect, since nothing under it was ever promised.

**Decided against keeping it out of the repo, or unlisted**: the class is given by sharing the app,
and its value is being **one click away in the middle of a lesson**.

**Decided against letting it carry ticks**, the substance of the entry. An untickable lesson is a
permanent first hole for `nextUp`, offered for ever with nothing failing; the denominator would
shrink; the row would outlive the page. So every counting or resuming reader walks
`trackedChapters()`, and **nothing checks a new reader of `chapters`**.

**Ids carry a date and never come back** (a reused slug resurrects ticks, #50); **nothing permanent
links in** (the link vanishes at the next reset); **a removed page gets no redirect** and carries
`noindex` of its own (#95 aside) — its URL was never promised. **Promotion is a new page with a new id. Lessons are
`level: null`**, so no filter hides the page being shared.

**A learner's own text may be reproduced here, anonymous**: invented errors teach a different lesson.
The line is **personal information, not authorship** — a commit that lands a name can be reverted out
of the tree but not out of anyone's clone. **A page may say « tu » and restyle a shared pattern**,
scoped to the atelier.

**What would reopen this**: pages piling up for months, or someone outside the class working through
them. A scratch chapter that is never reset is misfiled.

## 81 · The atelier sits behind one shared password, in a proxy that knows nothing else
**2026-09-22 · Binding · extends #37, #80**

`src/proxy.ts` matches `/atelier` alone and sends anyone without the cookie to `/entrer`. **It is not
secrecy**: the texts are public in the repo; nothing stronger should be built on it.

**Decided against an account**: an account is a learning path (#18), and gating on it means the
server reading a session (#37). **Decided against a layout that reads cookies**: it silently opts every
page under it out of prerendering (§8); a proxy runs before the cache.

**`/entrer` sits outside the matcher and re-does the check itself**: a Server Function under `/atelier`
would be intercepted before it could run. **It fails closed**: no `FRONTEND_PASSWORD`, nobody enters,
rather than the atelier open to everyone with nothing complaining. **The closed door says only that
it is closed**: the variable's name is printed in development alone, never to a visitor.

**The cookie carries a digest, never the password.** **`atelierToken()` is what the cookie holds;
`atelierPasswordOk()` checks what a visitor types** — comparing the typed password to the token
builds and refuses everybody.

**`?vers=`, not `?suivant=`**, which `signInHref` owns (#70); validated against the `/atelier` prefix,
`//` included. **The chapter's row still shows**: hiding it needs a readable cookie and a hydration
flash, for titles public anyway.

**Lifted on 2026-10-06, kept in the code.** The maintainer opened the atelier to everyone: a learner
reaches a page from a link, with nothing to type. `ATELIER_VERROUILLE` in `src/lib/atelier.ts` is
`false`; the proxy passes everyone and `/entrer` redirects in. **Decided against deleting the lock**:
putting it back is that one line, while the variable is still set. Unlocked, a scratch page carries
`noindex` itself, since the door no longer stops a crawler.

**What would reopen this**: a second path, a second password, or anyone needing their own — that is
an account and RLS (#37), not a growing proxy.

## 82 · An épreuve is marked once, at the end, and a person reads the listening one aloud
**2026-09-27 · Binding · amends #78**

**A compréhension is clicked, and marked once, at the end** — typing costs the candidate time on a
Spanish keyboard (§1), and marking by hand costs the tutor the hour. A *vrai ou faux* is justified by
choosing among three sentences **all taken from the document**. **Decided against marking as the
candidate goes**: a ✓ on question one says something about question two. Stored nowhere (#2). A barème
split that does not add up fails the build.

**A production has no corrigé on the page**: the tutor marks with a pen or by ear, and a model a click
away is what gets copied. The écrite counts words as the exam does (whatever sits between two
spaces). **The time is stated, never counted down**: the tutor keeps time.

**The listening épreuve is read aloud by a person**, rather than waiting for the voice `dictees`
waits for; the texts sit hidden like a corrigé. **The split 6 + 6 + 6 + 7 is the course's**: no
citable source gives it per exercise. A recording, if one arrives, is added, not substituted.

**The chapter is `untracked`** — « J'ai terminé » under a mock exam taken again next month says
something false. It takes `scratch`'s progress behaviour (#80) but not its own `noindex`, since
the chapter is permanent; hence a second flag, and `isTracked()` answers for both.

## 83 · An épreuve may link a Commons photo as illustration, never as the answer
**2026-09-27 · Binding · narrows §9's image rule**

An épreuve's illustrations may be **linked from Wikimedia Commons, not copied into the repo**. §9's
« local files » rule exists because a remote photograph is a lesson that goes blank in the métro;
here every item is answerable with the images gone, and linking keeps binary files out of the repo.
**The condition is the whole exception**: an image an item needs is content, and content is local.

**Decided against `next/image`**: it serves the file from the deployment — hosting with extra steps.
**Free licences and the credit beside the image still apply.**

## 84 · A written copy is handed in by downloading it, never by storing it
**2026-09-27 · Binding · extends #31, #82**

« Rendre ma copie » locks the production écrite and writes a `.txt` file the candidate sends on.
Nothing leaves the device; it works offline and signed out.

**Decided against a Supabase table**: a new thing stored about an account (#31) and a hand-run
migration for one class. It is the answer if copies must ever arrive unsent — as a new decision.
**Decided against a file on the server**: a function's `/tmp` dies with its instance, and Vercel Blob
costs a public write route, a second secret (#81) and a second storage service (#8).

## 85 · An A1 page explains in Spanish; the French it teaches stays French
**2026-09-30 · Binding · amended by #102**

**Amended by #102**: an A1 page now has a French twin too, and the interface language shows one.
The Spanish is still written first — it is the one an A1 learner reads — and what follows is its
how. Glosses and Spanish comparisons are A1 material, in both bodies.

On a page whose floor is A1, **the explanation, the glosses and the instructions are in Spanish**;
the French being taught — `.fr`, `.example`, a table's French column, a drill's items, a role-play's
cloud — stays French. From A2 up the explanation is in the interface language (#102). The how-to is `docs/levels/a1.md`'s.

**Why**: #74 made A1 choosable, and a rule stated in a language the reader does not have yet is a rule
they cannot use. The monolingual FLE textbook assumes a teacher in the room; this course is read
alone.

**Decided against Spanish by reader or by chosen level**: a lesson never reads the session (§8), so
the language follows **the page's floor**, and an A1 page reaches whoever keeps A1 in view (#86) —
which costs less than a second language setting. **Decided against Spanish in the chrome**: an
interface that changes language with the level has to read it above a lesson, and search reads the
titles.

**Still forbidden at A1:** English; Spanish replacing the French taught; a Spanish-only table. The
four-column limit stands. **The Spanish is peninsular and says `tú`**: the learners are in Spain.

**Every piece of French inside `lang="es"` takes `lang="fr"` back** — forgetting one has a screen
reader read French with a Spanish voice, and fails nothing. **The A1 pages written in French before
this are to be retrofitted.**

## 86 · A page has one level, and the learner chooses which levels they see
**2026-09-30 · Binding · narrows #72, #85**

`levels: Level[]` becomes **`level: Level | null`**: the rung the page is written at, or none. It
stays **required, and `null` is a statement** — forgetting to tag a page and a page that needs no tag
must not look the same in a diff. `from()`, `ANY`, `A2B1` and the written-out "superseded above" tag
go. **Changing a page's `level` is a diff, never a data migration**: the database has no opinion on
levels (#22). **Still to do**: split the manifest one file per chapter, `navigation.ts` assembling
them and keeping the helpers.

**Who decides what is listed:**

- **Signed out, everything**, each row with its level badge. The course is public (#18) and a visitor
  has nowhere to store a preference.
- **Signed in, the learner**: `view` in the account's metadata (#36) is a non-empty subset of
  `CHOOSABLE_LEVELS`, or `"all"`. **`"all"` is not the list of today's levels**: a learner on « Tout »
  sees B2 the day it opens.
- **A page is listed when its level is in the view.** **A page with no level is listed under every
  view.** A page holding sets (#87) is listed when any of its sets is.

**The filter never gates**: every path resolves, the unfiltered course
prerenders and hydration narrows it, and the sommaire, chapter pages and sidebar filter together — a
chapter with nothing in view drops out. Search still groups rather than cuts; `/ma-progression`
still does not filter. **A filter must be visible**, or it reads as an unwritten course: the
sommaire names the levels in view and links to change them.

**A listing holding more than one level groups its rows**, a `<details>` per level in ladder order,
then « Tous niveaux » for the unlevelled rows when the chapter mixes both. **One level in the
listing, no groups.** Rows keep manifest order inside a group.

- **The group head counts its rows** (« A2 · 9 leçons »): **the one exception to "nothing counts a
  chapter's lessons"** (AGENTS.md §6), because a closed group's count is all that says what it holds.
- **One group opens by default**: the parcours's level (#88) when it is in the listing, else the
  lowest. All closed makes a visitor's first chapter a page of shut boxes.
- **The open state is not remembered**: `localStorage` stays the theme and the sidebar (#24, #42).

**Why**: a page used to be listed from its floor upward, because the course chose for the learner, so a B1
saw everything and the level organised nothing above A1. **The learner who chose A2 wants the pages
written at A2**, and one who still wants A1 ticks A1. It also settles #85's cost: the Spanish of an
A1 page reaches only someone who asked for A1, or a visitor who sees everything.

**Ticks do not move**: `progressKey` still returns `id` or `id@LEVEL`, keyed on the page's sets, never
its listing (#68). **Chosen against keeping `from()` beside a view**: two filters stacked, and a B1
view showing A1 pages would be the course overruling the learner again. **Chosen against a B1 twin of every
A2 page**: a copy, when the A2 page is one tick of the view away.

## 87 · A page holding sets shows the learner's default one, with no tabs
**2026-09-30 · Binding · amended 2026-09-30 (tabs dropped) · narrows #68**

**Amended the same day: no tabs.** Built, then removed at the maintainer's word: a « A2 | B1 » pill
above the questions put a level choice on the page, when the page should simply show its level's
work. A page with sets shows **the learner's default set** and nothing to switch it; a learner
reaches another set through their parcours. The original text follows; read « tab » as « set ».

`perLevel: true` becomes **`sets: Level[]`**, the question sets or item banks the page holds, written
out; its `level` is `sets[0]`, checked at import. **The sets are drawn as tabs above the work**
(« A2 | B1 »), each with its own tick under `id@LEVEL`.

**Which tab opens: the learner's default set** — the parcours's level (#88) if the page has it, else
the lowest set. **One rule, three readers**: the tab the page opens on, the row's `RowTick` in a
listing, and the set « La suite » means. `LessonEnd` ticks the tab in view.

**Why the account's level no longer picks the set**: that assumed one level per learner. With a view of several levels and a visitor who
sees everything, there is no single level to follow, and a B1 set reachable only through a settings
change hid the page's best half from everyone signed out.

**Still closed**: `?niveau=` (#68) — the tab is component state, not a URL, and is not remembered.
**The remount is still the reset**: the board is keyed on the tab.

## 88 · A parcours is a file of étapes, chosen in the account; « La suite » walks it
**2026-09-30 · Binding · builds #14 · amends #70**

A parcours is **`src/data/parcours/<slug>.ts`**: a permanent `id`, a title, a `level` (`null` for a
path that answers to no rung) and an ordered list of **étapes**, each a title and the lessons it
walks, **by id** — a path is renamed (#50), an id never is. **It orders lessons and owns none**
(#14): a lesson in two parcours has one tick, done in both.

- **Only tracked lessons**: nothing from `atelier` or `delf`, which can never be ticked and would be a
  permanent first hole (#80, #82). The `nav-wiring` audit checks every id resolves.
- **Chosen in `/compte`, one at a time, or none**: `parcours` in metadata beside `view`. **Unknown
  ids read back as none**, so removing a parcours is the same silent reset as closing a level (#74).
  **Choosing one does not touch the view**: two settings, one writer each.
- **« La suite » is the first unticked lesson of the chosen parcours**, a `sets` page counting its
  default set (#87). **No parcours, no « La suite »**: a line offering one takes its place. #70 is
  otherwise unchanged — still one derived fact, nothing stored.
- **The heritage speaker gets a door without becoming a level** (#13): « Écrire le français » is a
  parcours with `level: null`, beside A1, A2 and B1.

**Chosen against ordering chapters**: `nextUp` walked the manifest chapter by chapter, so A2 meant
sixteen grammaire pages, then fourteen verb sheets, before a first role-play. **A chapter's order is
now for browsing**; teaching order is the parcours's.

**An account from before carries `level`**, and reads as `view: [level]` with no parcours; saving a
view clears the old key.

## 89 · The syllabus is data, and a parcours ends on its épreuves
**2026-09-30 · Binding · syllabus not built yet · builds #15 · extends #88**

**The syllabus** is `src/data/syllabus/<level>.ts`, one file per rung, from the *Inventaire
linguistique des contenus clés* (CIEP / Eaquals, 2015), Annexe E: its **fonctions**, **grammaire**
and **thèmes** as items, each with a **permanent id** (`a2-raconter-au-passe`) and a short label.
**The labels are ours** — the document is cited as the source, never copied as text (§9b).

- **A page names the items it covers**: `covers: SyllabusId[]` in the manifest, replacing the
  free-text `delf` string; a page holding sets (#87) names them per set. **An étape names its
  items too** (#88).
- **An id that resolves to nothing fails the build**, like a lesson id (`assertLessonIds`).
- **Coverage is an audit, not a gate**: a script prints, per level, the items counted, the ones
  covered and the ones not, **FONCTIONS first** — they are the finish line (#15, #72). It never
  fails a build, because an unfinished level is the normal state (#74).
- **`docs/levels/*.md` keep the how-to and lose the map**: a list in prose went stale on every page
  that landed, and A2 and B1 never had one.

**A parcours may end on épreuves**: `exam: LessonId[]`, pages of `delf` at the parcours's level,
drawn after the last étape as « L'examen blanc ». **Offered, never counted**: no tick (#82), out of
the parcours's tally, never « La suite ». **When every étape is ticked, « La suite » offers the
épreuves** instead of nothing. A parcours with `level: null` has none.

**Why**: #15 made DELF coverage the definition of done and nothing could measure it; a count of
pages is an inventory (#15). And nothing led from a path to the exam it prepares for — `delf` was
only the last chapter. **Chosen against a coverage gate in the build**, which would fail every
commit of a level being written.

## 90 · A first sign-in passes through `/bienvenue`, in French or Spanish
**2026-09-30 · Binding · amends #88**

An account that never answered is sent, **at sign-in only**, to `/bienvenue`: four slides — what
the course is, how it works, the parcours, the view — then on to `?suivant=` or `/`.

- **"Never answered" is absent keys**: no `view`, no `parcours`, no legacy `level` (`readChosen`).
  No flag is stored (#31). Supabase deletes a key written `null`, so « Aucun parcours » alone would
  not count — **the onboarding always writes the view**.
- **Only a sign-in on `/compte` redirects** (`ReturnTo`), never a lesson link or an open session: a
  direct link always renders its page (#86). « Plus tard » saves nothing, so the next sign-in asks
  again.
- **The parcours pre-selects the view** until the learner presses a level, and both are saved in
  one write (`saveChoices`). **This is the one place they are written together** (#88); `/compte`
  keeps one writer each.
- **French or Spanish, asked on the first slide** (#91), because the level is not known yet and
  an A1 learner cannot read the French (#85). Saved with the other answers, as the account's
  language. **Names stay French** — parcours, levels, « La suite », « Compte » — as the rest of
  the site calls them.

**Chosen against** a gate in the shell, which would interrupt direct links and open sessions, and
against a stored `onboarded` flag, a new thing an account holds for no gain over absent keys.

## 91 · The account screens speak the account's language, French or Spanish
**2026-09-30 · Binding · amends #90, #31 · amended by #102**

**Amended by #102**: the account's `lang` is now the whole interface's language, lessons included,
and `null` until chosen, when the device decides. What follows is the screens' own behaviour.

An account holds a **language**, `fr` or `es`, in user metadata (`lang`, #36). **French is the
default and the fallback**: anything but `"es"` reads as French (`readLang`).

- **It reaches the account screens only**: `/bienvenue`, `/compte` signed in, and the account
  menu's own words. Lessons, the sidebar, the topbar, ticks, search and every manifest title stay
  French for everyone (then; #102 now switches them all). Signed out there is no account to ask, so the sign-in form is French.
- **Asked first in `/bienvenue`**, before anything else, as two cards with their flags, each
  language named in itself; saved with the view and the parcours at « Terminer » (#90). In
  `/compte` it is the first section, and in the account menu a « Langue » submenu beside the
  theme, signed in only; both share one writer (`saveLang`), saved on the press.
- **Names follow the interface** (#102): the Spanish screens say *recorrido*, *Lo siguiente*,
  *Índice*, « Mi progresión », « Cuenta », as the Spanish menus do. (They were French, marked
  `lang="fr"`, while the chrome was French.) A Spanish screen carries `lang="es"` on each
  `<section>`.
- **It does not count as having answered** (`readChosen`): it can be set in `/compte` alone.

**Chosen against** translating the chrome: the lessons prerender in French, so a Spanish shell
would flip on every page load unless the language were cached before paint — a third
`localStorage` key (#24) for a site whose chrome a learner meets in French from the first lesson
on.

## 92 · A literary work is one page whose body follows the level; at A1 the Spanish sits under each line
**2026-09-30 · Binding · narrows #72, #86, #87**

**One page per work, a body per level.** A `litterature` page holds `sets` (A1, A2, B1 where
written), and each set is a whole body: its own text, its own word table, its own questions, in
`a1.tsx`, `a2.tsx`, `b1.tsx` beside `page.tsx`. `ByLevel` shows the body for the learner's default
set (#87), the same one the quiz, the DELF line and the tick read. **Nothing on the page switches
it.** A page with no parcours shows A2 when it has it (#74), so a visitor reads French first.

- **A2** quotes the extract; **B1** the same passage without cuts, roughly 600 to 900 words, or the
  companion text when the A2 one is whole (the second fable La Fontaine announces, Baudelaire's
  prose version).
- **A1 reads the same work with the Spanish under each French line** (`.bilingue`): the course's own
  translation, one pair per verse or sentence, the explanation in Spanish (#85). This narrowed the French-only rule's
  "no translation column" for A1 literary texts only, and #72's "a text has a floor": the
  translation is the floor.

**Why**: the maintainer wants one address per work, not `…` and `…-b1` side by side, and the tabs
of #87 put a level choice on the page. A set of harder questions on the same cut text asked more of
less text; a body per level lets B1 read more and A1 read at all.

**Chosen against a page per level** (built, then folded back the same day, never shipped): two
rows and two ticks for one work, and a B1 page a learner must find. **Ticks did not move**: the keys
stay `id@A2` and `id@B1`, and A1 adds `id@A1` (#68).

## 93 · A cited form is marked by weight, a wrong one by a line
**2026-10-05 · Binding · builds #27, #102**

**A French form cited inside a sentence of explanation is semi-bold** (`span.fr`, Spectral 600), the
weight a table's row head and a `<strong>` in an `.example` already had. The serif alone (#27, #102)
did not detach it at reading size: « puis se place avant l'action » read as one run of text. Inside
`.example` and `ul.mots`, where everything is French, the span keeps the block's weight.

**A form cited to say it is wrong is `<s className="fr">`**: the text's own weight, italic (since
2026-10-11), struck through in `--danger`. Left in a span it became the boldest word in the sentence that rejects it. The line is
the mark, so the meaning does not rest on the red. **Only a form wrong as written** (*je sors puis*,
*mèr*), never a correct word that is the wrong choice here, and never a spoken form the page allows.
Sixty forms were converted in the lessons that existed.

**Chosen against a colour** (the accent reads as a link), **a tinted pill** (a new shape, up to eight
times a paragraph, clashing with the amber and red callouts) **and the italic** (the caption's voice,
and too quiet). All three were tried on real pages before the weight was kept. The italic went to the
wrong form instead on 2026-10-11, after a semi-bold struck form inside the callouts was tried and
dropped the same day: a wrong form is never bold.

## 94 · The course speaks with the device's French voice, or not at all
**2026-10-07 · Binding · a trial · builds #51, #82**

**`/prononciation/ecouter` reads aloud what the learner types**, through the browser's own speech
(`speechSynthesis`): no server, no recording, no cost, any word or sentence. It is the first page of
`prononciation` and the first thing in the course that makes a sound. **A trial**: the voice is the
device's, so its quality is not the course's to promise, and the page is kept or dropped on what it
sounds like on learners' phones.

**A French voice, or silence.** `useSpeech` (`src/hooks/useSpeech.ts`) picks a voice whose language
is French, `fr-FR` first, and sets it on the utterance. With none it says nothing and the page says
why. An utterance carrying only `lang` falls back to the device's default voice, so a browser set to
Spanish would read French with Spanish sounds: the one outcome worse than no tool. **Every later
sound goes through this hook** (a dictée, a listening drill).

**The chapter is `untracked`** (#82) while its one page is a tool: nothing there is ever finished.
**Revisit when a sound sheet lands**: the flag is the chapter's, and a sheet wants its tick. The
chapter moved below `musique` at the maintainer's word.

**Chosen against a written pronunciation.** A rule engine is confidently wrong on *femme*,
*monsieur*, *ils parlent*; a dictionary is megabytes and still blind to liaison; IPA is metalanguage
(§1), and a Spanish respelling cannot write the sounds Spanish lacks, which are the ones to learn.
**Against a speech service, for now**: a key, a cost and a server the course does not have (#8,
#21). The maintainer wants one later, speech-to-text included, tied to an LLM: `AGENTS.md` §12.6
holds what that reopens. **This does not settle the sound sheets' data shape** (§12.2).

**Seen on the first try** (desktop Linux): Chrome reads well, and every voice it lists is one of
Google's online ones, its default German; Brave lists none at all, so there is nothing to fall back
to inside the browser. A fallback voice is one the course brings (`AGENTS.md` §12.6).

## 95 · The site is public and asks not to be indexed, or translated
**2026-10-11 · Binding · extends #18, #77**

The course is open to anyone holding the link (#18) and is used by a handful of learners the
maintainer gives it to. **It wants no search traffic**: every response carries
`X-Robots-Tag: noindex, nofollow` (`next.config.ts`), the root layout says the same in `robots`,
and there is no sitemap.

**The header is the rule, the meta its echo.** A page's own `metadata.robots` replaces the root's,
silently; the header is out of a page's reach and covers what is not a page.

**Chosen against `Disallow: /` in `robots.txt`**, the obvious way and the wrong one: a crawler that
may not fetch a page never reads its `noindex`, and a URL linked from elsewhere (the repository's
README) is then listed bare. So `robots.txt` lets search engines in. **Against a password on the
whole site**: content stays public (#18), and a learner opens a link with nothing to type.

**The crawlers that feed a model are disallowed by name** in `robots.txt`: they keep no index, so
`noindex` says nothing to them. The list is kept by hand and is always behind; the content is
CC BY-SA and on GitHub anyway, so a missed name costs nothing. **Not on it**: an assistant fetching
one page because a person asked it to, which is a reader.

**The Open Graph image stays**, and the agents that fetch it are never disallowed: it is the preview
of a link sent in a chat, which is how the course is handed out, not a search feature.

**The browser does not offer to translate either**: `translate="no"` on `<html>` and the `google`
`notranslate` meta. A translated page teaches nothing, and the offer appears on every page for a
Spanish-language browser.

**What would reopen this**: listing the site or opening sign-up. Then the header, the root `robots`
and the sitemap come back together with the chooser's notes (#77), and the pages that refuse
indexing on their own account keep doing so: the atelier (#80), `/entrer`, `/design`, `/recherche`,
`/bienvenue`.

## 96 · Every size, space, radius, layer and shadow is a token; the page is flat
**2026-10-11 · Binding · builds #6, #27 · the one shadow inferred**

Colour had tokens from the first day and nothing else did. The component sheets held 34 font sizes,
51 margins, paddings and gaps, three shadows of which one was used, and raw `z-index` numbers: a
drill's menu sat on the sticky topbar's rung. **Now a raw value in a component is a bug, whatever
it measures**, and four greps say so by printing nothing (`design-system.md`).

**The steps are the values the pages already had, merged; not a ratio, and not fluid.** Each old
value went to its nearest step: twelve sizes (`--type-66` … `--type-210`), seventeen spaces
(`--space-2` … `--space-88`). Most things moved by under a pixel. A computed scale would have moved
every page to buy a regularity nobody reads.

**A step is named by its value, not by a role**: `--type-80` is 80 % of the body's size,
`--space-12` twelve pixels at the default one. A role name (`sm`, `md`) hides the number and invites
one more role; with the value in the name, a step is picked by looking at what the neighbours wear.

**A measured alignment is not on the scale.** Four numbers exist so that two things meet (the
footer's baseline, the shell's foot); each keeps its value and says « measured » on its line, which
is what the grep lets through. Rounded to a step, the alignment breaks and nothing fails.

**One shadow, because the page is flat**: what rests on the page has a border, and only what floats
over it and leaves again is lifted. Three levels were defined and two never used; they went.
**Inferred**: the maintainer was told, not asked.

**What would reopen this**: a thirteenth size or an eighteenth space. It means two steps are too far
apart everywhere, so the scale moves, not one module.

## 97 · One paper, one field, one label, one board; the answer in hand is one state
**2026-10-11 · Binding · builds #96**

Each drill was written with a stylesheet of its own, as its brief then asked, and the copies
drifted: about sixteen boards, seven text fields, fourteen small uppercase labels, three identical
papers, five definitions of a chosen answer. **Now there is one of each**: `.card`, `.input`,
`.label` and the answer's states in `globals.css`, a drill's board in
`src/components/exercice/Board.module.css`. Where the copies disagreed, the most common one won.

**A module places a shared pattern and never redraws it.** A drill keeps a stylesheet only for what
its mechanic adds, and five drills have none. **The board is a stylesheet, not a component**: the
drills differ in mechanic and markup and agree only in look. It is a module rather than a part of
`globals.css`, which holds what every page uses.

**The price is the tie**: two sheets, equal weight, and an order that differs between `next dev`
and production. A local class that resizes a shared one is doubled, never `!important`.

**`.is-chosen` is the answer in hand, before the verdict**, and it beats `:hover`: the pointer is
still on the thing just clicked, and on a phone the hover sticks, so the chip just picked wore the
paler look of one merely pointed at. **Nothing that carries an answer or a verdict is faded.** After
the check a pool fades the chips not picked; the chosen one used to dim with them, behind an
`opacity: 1` that never applied.

**Left apart on purpose**: a card that is itself a link or a choice (a chapter's card, « La suite »,
a settings choice) is sized by its content and keeps its own padding.

## 98 · An agent checks with lint and types; the build and the screenshot are asked for
**2026-10-11 · Binding**

`npm run build` closed every brief, and a visual change ended on photographs of both themes in
three shells. **Now an agent runs `npm run lint` and `npx tsc --noEmit`, and asks the maintainer's
dev server for each route it touched** (`AGENTS.md` §11). The build is the maintainer's to run; a
screenshot is offered, not taken.

**Against the build as an agent's gate**: the maintainer's dev server is usually up, from their
IDE; a build beside it takes minutes, and an agent that starts or kills a server takes theirs with
it. **Against the screenshot by default**: the maintainer looks at the page anyway, and a list of
what to look at (the page, the theme, the shell) is worth more than pictures nobody asked for.

**The build still decides.** A lesson gone dynamic (§8) and two CSS rules that tie (#97) show
nowhere else, so a change is reported as not built, with what only the build can show.

**Kept**: a shot unasked for what the maintainer cannot see by looking (signed in, a measurement) or
what the agent cannot judge blind; and `page-auditor`, whose job is to photograph.

**`README.md` and `CONTRIBUTING.md` still say the build must pass**: a contributor works on their
own machine, beside nobody's server.

## 99 · Contrast, focus and target size have numbers: WCAG 2.2 AA, checked
**2026-10-12 · Binding · builds #96, #27**

« Dark mode and accessibility every time » had no number in it, so nothing could fail it. Three
now can.

**Text is 4.5:1 on every ground it may sit on**, and `scripts/contrast.mjs` reads the tokens and
says so: 196 pairs in two themes. The pairs are written out there because the list *is* the rule
— which token may sit on which ground. One token failed: `--text-3`, the muted grey of every small
label, was 4.35 on the page in light mode, 4.05 on a hovered row, under 4 on a tint. It went darker
(lighter in dark mode) until it cleared every surface and every soft tint, so muted text needs no
care about where it lands. **Chosen against 7:1** (AAA): `--text-2` is at 7.3, and a third level
of text would have no room left to be a level.

**The edge of what is known by its edge alone is 3:1**: a field, a blank in a sentence, an empty
tick. They wore `--border` or `--border-strong`, 1.2 to 1.7 against the page. **A new token,
`--border-control`, rather than darker borders everywhere**: a card or a chip carries words and is
read without its line, and the page would have gone heavy to fix six controls. The search field
keeps its quiet edge; its glyph and its filled button say what it is.

**Focus is two pixels of accent, always.** The global ring is that. A blank typed into, in a row
of its kind, may put the two pixels on its own edge instead; before, two drills replaced the ring
with one pixel of border colour, which is a change of state nobody tabbing can see. A ring is
never clipped by a parent's `overflow` (the topbar's crumb was).

**A target is 24px both ways**, by its own size, a link in a sentence excepted. Measured on the
deployed site, not read off the CSS: 1,311 targets on 22 pages at two widths, and three kinds were
under it — the tense arrows of « Les terminaisons » (22px), a one-letter word to click (19px wide:
« a », « à », the very words a heritage speaker is asked to find), and a link alone on its line
(the footer's, the topbar's crumb, 15 and 16px tall).

**Chosen against 44px** (AAA, and what a phone's own guidelines ask): a chip is 37px tall, a button
38, an accent key 30, and a blank in a sentence is held by its line. Reaching 44 is a redesign of
every drill for the thumb, which may be worth doing and is not decided here. **24 is the floor
under the exceptions, not the size to aim at.**

## 100 · The look follows *Le Petit Prince*: paper by day, night blue, gold stars as the one ornament
**2026-10-15 · A first iteration · builds #27, #96, #99**

The maintainer chose the covers of Saint-Exupéry's book as the pillar of the course's look: the
cream of the pop-up edition, the night blue and gold stars of the Folio Junior collector. A
French book a learner may already know, read by fifteen-year-olds and adults alike (#69).
**This first pass changes grounds and adds one ornament**; more will follow.

**The grounds, not the inks.** Light mode is `--paper-*`, a warm cream; dark mode is `--night-*`, a
blue dark enough to read on. The text greys and the accent stay: blue ink on cream is a
schoolbook page, and **`#0044AA` stays the accent** (#27), the wordmark's blue. **Text is never
gold**: the first pass gave dark-mode headings the cover title's gold, and the maintainer took it
back the same day; gold is for the interface's marks, and a heading keeps its pale blue.
`scripts/contrast.mjs`
passed on every pair (#99); the sheet and the hover had to stay light enough for `--text-3` and
`--border-control`.

**Gold is ornament, for the interface and nothing else.** `--star` colours `.ciel`, a few stars and a planet round a
block's edges: the home page's title, and `/design`. It marks no state, so it has no contrast
floor and never enters a lesson, where a gold mark would be read as a signal next to amber's
« à retenir ». **Chosen against stars across the page background**: they would sit under text.
**And never on it**: the first sky placed two of its marks in `%` of the home page's header, which
grows with the tagline, and on a phone they landed on « petit ». They are placed in `rem` now,
above the title and beside it.

**The course has its own motif** (second pass, same day): an open book on a little planet under a
few stars, `Planete.tsx`, in `--accent`, `--planet` and `--star`. It goes where a page has nothing
to show (a chapter or a search with nothing in it, the 404, through `Vide`) and over the sign-in
form. **Not over a lesson or a listing that has rows**: there it would compete with the content it
decorates.

**The wordmark is written with a pen** (third pass, same day). The same Playwrite FR Trad outlines,
swept along a short segment at 40°, as a broad nib draws: thick across the pen, thin along it, the
weight the cover's title has. **One merged outline, not stacked copies**: the first version drew the
outline ten times a hair apart, and ten half-transparent edges add up to an opaque one, so every
curve came out stepped on a phone. The dot of the « i » is a gold star, a second mask layer over
`--star` (`.logo`). **Chosen against the cover's lettering**, which the maintainer asked about:
the title is Gallimard's logotype and « Le Petit Prince » the estate's trademark, and with a name
that already echoes it, the same letters would read as a licensed product. The P of the badge and
every icon (`logo-mark.svg`) takes the same pen at its own scale, and `make-icons.mjs` adds the
gold star to the share card, the one place the logo is drawn outside the page.

**The mood, never the drawings.** Saint-Exupéry is not public domain in France (#60), and the
lettering and the covers are Gallimard's. The star and the planet are drawn for the course
(`public/etoile.svg`, `public/planete.svg`); no prince, no fox, no rose, no script wordmark. The
reference photographs stay out of git, in `.private/design/`.

## 101 · Installing has its page, French and Spanish: the browser's offer as one button, iOS steps
**2026-10-27 · Binding**

`/installer` (a `footer` annexe, beside « À propos ») shows **one button where the browser offers
an install** — Chrome and Edge fire `beforeinstallprompt`, on Android and on a computer — **the
share sheet's three steps on an iPhone or an iPad**, where no browser fires it, and the browser
menu's steps everywhere else (Firefox, Samsung Internet, Chrome before the first tap it waits for,
or after a « non »). Installed already, it says so.

**Two pages, French and Spanish**: `/installer` and `/instalar`, one component
(`src/components/install/InstallApp.tsx`) holding both texts, and a link from each to the other.
Installing comes before any lesson, so it is said in the language the visitor reads, and each names
the buttons a phone in that language prints. **The Spanish page is in `unlistedPages`**, reached
from the French one: a manifest title is French (#102: lesson titles stay French). The course's name stays French in it (#91).
**Chosen against** following the account's language (#91): the page is for visitors before they
have an account, and it prerenders.

**The event is caught by the shell, not the page.** Chrome fires it once per page load, on whatever
page the visitor landed on; a listener in `/installer`'s leaf would almost never hear it. So
`src/lib/install.ts` listens at import, `AppShell` imports it, and the page reads the stored offer.

**`preventDefault()` on every page** (the maintainer's call, the same day): Chrome's own pop-up, the
mini-infobar, never shows, and our button is the one offer. It was first left alone, so as not to
take the browser's offer away; it is taken away on purpose, because a pop-up over a lesson is
the interruption the next paragraph rules out. The browser's menu keeps « Installer
l'application », which no page can remove, and the fallback steps point to it.

**Against a banner or a popover offering the install**: it would interrupt a lesson to sell the
container, and the course asks nothing of a visitor it does not need.

**No service worker is needed for the button**: Chrome's install criteria (web.dev, 2024) are
HTTPS, the manifest's name, 192 and 512 icons and `display`, and one tap on the page. Offline is
still Serwist's (§2), not this page's.

**Platform detection happens on the client only** (`useSyncExternalStore`, a `pending` server
snapshot), so the page stays prerendered (§8). An iPad says it is a Mac; a touch screen gives it
away.

## 102 · The interface and the explanations follow the learner: French or Spanish
**2026-10-27 · Binding · replaces #53 · amends #24, #85, #91**

**The maintainer dropped « French only »**: some learners want the course in Spanish. The interface
and every explanation now exist in **French and Spanish**, and the learner's language picks one.
The old rule (#53, folded here) had chosen one language of instruction, French, against splitting
by reader; that is reversed for the explanation, not for the French taught.

**Which language.** The account's `lang` when it chose one (#91); else the choice saved on this
device (`localStorage` `lang`, the third pre-paint key, #24); else the first of the browser's
languages that is French or Spanish; else French. The head script sets `<html data-lang>` before
paint (`src/lib/lang.ts`). The switch is in the account menu for everyone, and in `/compte` and
`/bienvenue`; signed in, it is saved on the account too, so other devices follow.

**Every page prints both languages** and `globals.css` hides the one not chosen (`[data-ui]`).
Short text is `<T fr es>`; a block is a pair of elements, `data-ui="fr"` and `data-ui="es"
lang="es"`; **a lesson pairs each `<section>` and its `.resume`**, and writes the French it teaches
once, shared by both (a table's rows, an example). `useLang()` is for attributes and strings built
in code; for visible text at first paint it would flash French, since it reads « fr » during
hydration. `html lang` stays `fr`; a Spanish element says `lang="es"` itself.

**Stays French in both:** the French taught — examples, forms, a table's French cells, drill items,
answers — and, from A2, **no gloss or translation column on it** (the old rule's reasoning still holds there:
a translation beside each example is dead weight, and it turns reading into decoding); lesson
titles, subtitles and DELF descriptors, which name the French taught; a DELF épreuve's content and
consignes (a DELF is sat in French); the atelier (#80, a class taught in French); the tab title and
`<meta>` (switching them needs a server read, §8); the PWA manifest. **An A1 page has both too**
(amended the same day, at the maintainer's request): its Spanish is written first (#85), its French
twin is as simple as French explanation can be, and its glosses and Spanish comparisons are shared
by both bodies.

**Kept from the old rule**: the serif is the French taught and the sans the explanation, in either language;
the audience shapes what is explained, not the language; the French explanation stays easier than
the French it teaches; **English, never**. The Spanish is Peninsular, `tú`, as short as the French.

**Chosen against:** language routes (`/es/…`), which double every URL, need redirects and a proxy
reading every request (§8, #81); a client-side swap after hydration, which shows French first on
every load — #91's reason for keeping the chrome French; and dropping the French explanation, which
a French device, and every visitor whose browser is neither, still reads first.

**The cost:** every page ships both languages, and **every explanation has two copies that must
change together** — a page edited in one language only is the new silent failure, which
`content-proofreader` checks. A lesson not yet converted has French sections only and shows them
in both interfaces (`AGENTS.md` §0).
