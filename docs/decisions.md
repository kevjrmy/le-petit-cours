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
| 6 | 2026-09-05 | Plain CSS (global tokens + CSS Modules), not Tailwind | Inferred |
| 7 | 2026-09-05 | Vercel hosting, still an offline PWA — not a static export | Binding |
| 8 | 2026-09-05 | Supabase, scoped to accounts and progress sync only | Binding |
| 10 | 2026-09-05 | The lesson authoring format is deferred until the primitives exist | **Open** |
| 11 | 2026-09-05 | MIT for the code, CC BY-SA 4.0 for the content, with a carve-out | Binding |
| 13 | 2026-09-05 | Two learner profiles, and the heritage speaker is not a level | Binding |
| 14 | 2026-09-05 | A parcours orders lessons without owning them | Binding |
| 15 | 2026-09-05 | A level is complete when it covers the DELF syllabus for that level | Binding |
| 18 | 2026-09-05 | All content is public; an account buys only the learning path | Binding |
| 21 | 2026-09-05 | No key that bypasses RLS lives anywhere, and RLS is the authorization model | Binding |
| 22 | 2026-09-05 | A progress row *is* the tick; the level never keys progress | Binding |
| 23 | 2026-09-05 | A lesson carries a set of levels; `[]` means "always visible" | Binding |
| 24 | 2026-09-05 | IndexedDB is the local store; `localStorage` is for pre-paint values only | Binding |
| 26 | 2026-09-05 | Sign-in is a route, `/compte`, never a modal | Binding |
| 27 | 2026-09-05 | The accent is the wordmark's blue; the serif carries the French | Binding |
| 29 | 2026-09-05 | Chapter landing pages are one generated route, not fourteen files | Binding |
| 31 | 2026-09-05 | An account may hold an optional display name | Binding |
| 35 | 2026-09-05 | The level filters every listing, and never access | Binding |
| 36 | 2026-09-06 | The learner's settings live in user metadata, not in a table of ours | Binding |
| 37 | 2026-09-06 | Username and password; nothing on the server reads the session | Binding |
| 38 | 2026-09-06 | The username is its own table — unique, mutable, mirrored | Binding |
| 39 | 2026-09-06 | The home page is a search field; the sommaire is at `/sommaire` | Binding · narrowed by #71 |
| 40 | 2026-09-06 | The sidebar is one level deep: a chapter is a link, not a disclosure | Binding |
| 42 | 2026-09-06 | Three shells; chapter icons are required and compiler-checked | Binding |
| 43 | 2026-09-06 | The topbar is part of the page: no band, no blur | Binding |
| 44 | 2026-09-06 | The topbar is sticky on mobile only, painted in the page's own ground | Binding |
| 45 | 2026-09-06 | One sidebar control; the trail never names the page you are on | Binding |
| 47 | 2026-09-06 | The account popover holds the account, and nothing else | Binding |
| 48 | 2026-09-06 | A tick needs an account; offline is a queue of operations | Binding |
| 49 | 2026-09-06 | The shell draws the end of a lesson: the tick, then the links | Binding |
| 50 | 2026-09-06 | Progress is keyed by a permanent lesson id, never by the route path | Binding |
| 51 | 2026-09-06 | The course announces nothing it has not written | Binding |
| 53 | 2026-09-06 | One language of instruction, and it is French | Binding |
| 54 | 2026-09-06 | A conversation page is a guided role-play, graded nowhere | Binding |
| 55 | 2026-09-06 | A `traduction` chapter — the one place Spanish is allowed back | Binding |
| 56 | 2026-09-06 | The conjugation sheets: one data file, one route, the imparfait included | Binding |
| 57 | 2026-09-07 | A role-play offers words, never a model dialogue | Binding |
| 58 | 2026-09-07 | What a `lecture` text has to be, and how the public domain is tested | Binding |
| 59 | 2026-09-07 | How hard a `lecture` text may be, and what to do when it is too hard | Binding |
| 60 | 2026-09-07 | World literature in `lecture`; the translator's death date is the test | Binding |
| 63 | 2026-09-12 | The footer belongs to the home page; the shell's foot is one shared row | Binding |
| 65 | 2026-09-12 | The lesson's level rides in the trail, in front of the chapter | Binding |
| 66 | 2026-09-12 | Sections are marked, not merely spaced; the in-page index is read from the page | Binding |
| 67 | 2026-09-12 | « En résumé » is a titled block, and one line closes a lesson | Binding |
| 68 | 2026-09-12 | A tick names its level only when the page holds a body of work per level | Binding · narrowed by #73, #76 |
| 69 | 2026-09-17 | A recurring mistake steers the course, and nobody gets a programme of their own | Binding |
| 70 | 2026-09-21 | « La suite » is the dashboard; signing in returns you where you were | Binding |
| 71 | 2026-09-21 | Signed out, `/` is a welcome; the search field is the signed-in home | Binding |
| 72 | 2026-09-21 | A1 joins the course as pages, not as tags | Binding · narrowed by #74, #76 |
| 73 | 2026-09-21 | The level is chosen in the account, never on the page | Binding |
| 74 | 2026-09-21 | A level is offered while it is being written, not once it is finished | Binding · narrowed by #76, #77 |
| 77 | 2026-09-21 | The chooser offers the levels and rates none of them | Binding · narrows #74 |
| 78 | 2026-09-21 | A `delf` chapter describes the exam and prints none of it | Binding |
| 75 | 2026-09-21 | The ladder stops at B2; C1 and C2 are out of scope | Binding |
| 76 | 2026-09-21 | A page is listed from its floor upward; the tick follows the material | Binding · narrows #68, #72 |
| 79 | 2026-09-21 | The tick is settable from a chapter's listing, beside the row's link | Binding · extends #2, #48 |
| 80 | 2026-09-22 | A scratch chapter: listed like the others, counted like nothing | Binding · extends #18, #48, #51 |
| 81 | 2026-09-22 | The atelier sits behind one shared password, in a proxy that knows nothing else | Binding · extends #37, #80 |
| 82 | 2026-09-27 | An épreuve is marked once, at the end, and a person reads the listening one aloud | Binding · amends #78 |
| 83 | 2026-09-27 | An épreuve may link a Commons photo as illustration, never as the answer | Binding · narrows §9 |
| 84 | 2026-09-27 | A written copy is handed in by downloading it, never by storing it | Binding · extends #31, #82 |

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
adapted page inherits the old compromises and, invisibly, the old mistakes — the last one arrived
with four misquotes of a public-domain poem no check could catch.

## 6 · Plain CSS, not Tailwind
**2026-09-05 · Inferred, not explicitly confirmed**

Tokens and shared patterns in `globals.css`; component styles in co-located CSS Modules. Tailwind
was offered and not taken rather than rejected. **Wanting Tailwind means a new entry replacing this
one**, not one utility class at a time.

## 7 · Vercel hosting, still an offline PWA
**2026-09-05 · Binding**

A normal Next.js app, not `output: 'export'`, still precached and installable. Project
`kevjrmy-projects/lepetitcours`, building from `main`, at <https://lepetitcours.vercel.app>. **Not a
static export** because #8 needs a server for auth; it is the fallback if that is dropped.
`vite-plugin-pwa` has no Next equivalent, so Serwist supplies the service worker — **not installed
yet**, so offline is not yet kept.

## 8 · Supabase, for accounts and progress sync only
**2026-09-05 · Binding**

**The scope is the point.** Content stays in git; the database holds accounts and progress only, as
a sync target — the local copy is the read path, and no render waits on the server. **Chosen over
Firebase** because progress is row-shaped and Supabase Auth fits the existing `load()` / `save()`
seam. **Two env vars, both public by design:** `NEXT_PUBLIC_SUPABASE_URL`,
`NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`; #21 says what must never join them.

## 10 · The lesson authoring format is deferred
**2026-09-05 · OPEN**

MDX, typed blocks or hand-written TSX: **not decided**; the interim is TSX. Choosing before the
primitives settled would build a pipeline around guesses; **it closes on evidence from real lessons,
which now exists.** What has fought the writer: a table row costs twelve lines of TSX; a
`traduction` page's source, model and JSX `note` live in the page file, out of a teacher's reach.

**Do not** set up an MDX pipeline or block schema on your own initiative. Teachers and a
possible React Native client point at content-as-data; it still needs deciding, not drifting.

## 11 · MIT for the code, CC BY-SA 4.0 for the content
**2026-09-05 · Binding**

MIT for `src/`, config and tooling; CC BY-SA 4.0 for lessons, exercises, vocabulary and translations
— neither licence family suits the other half. **Share-alike** because `culture` photographs come
from Commons under CC BY-SA anyway, and it keeps a derivative course open. **MIT** because the
course is the valuable part, and permissive code helps a port to another language pair.

**The carve-out is load-bearing.** The repo quotes material it does not own — songs in copyright,
literary text whose public domain is jurisdictional, photographs under their own licences.
`LICENSE-CONTENT` says so, `AGENTS.md` §9b says what may be quoted, `CONTRIBUTING.md` requires
contributors to hold the rights. **A blanket licence over material the project cannot license is
worse than none** — a false grant reusers rely on.

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
coverage checkable and gives learners a target and teachers something besides taste. A count of
published pages is an inventory, never evidence of coverage. **Not a decision to certify anyone:**
the app does not examine.

## 18 · All content is public; an account buys only the learning path
**2026-09-05 · Binding**

Everything is readable with **no account**; an account buys the tick, the level and a position in a
parcours.

**Chosen over anonymous local progress claimed at sign-up:** two storage paths, a claim migration,
and progress that silently belongs to nobody. **Public content is what keeps lessons prerendered and
precacheable** — hence offline — only while the session is never read where it would make a lesson
dynamic (#37, `AGENTS.md` §8). **No analytics, no behavioural tracking:** near-zero breach surface,
per `docs/scope.md`.

## 21 · No key that bypasses RLS lives anywhere, and RLS is the authorization model
**2026-09-05 · Binding**

`auth.uid() = user_id` in a policy, with permission checks nowhere else. **Per verb and
`authenticated` only** — four narrow policies per table, not one `for all`, so widening one verb
cannot widen the rest — and `anon` revoked outright. That is the line between public content (#18)
and progress.

**An unused key is not harmless:** service-role and secret keys bypass RLS. The ten the Vercel
connection injected were deleted and the legacy `anon` / `service_role` keys disabled at the source,
since deleting from Vercel was not enough. A leftover is a shortcut one `process.env` away.

**Nothing secret exists to leak:** the publishable key and URL are public; the database password was
rotated and dropped from `.env`. **A feature needing a real secret is a decision to take here
first**, not one acquired by accident.

## 22 · A progress row *is* the tick; the level never keys progress
**2026-09-05 · Binding · narrowed by #68**

`(user_id, lesson_id)` and a `marked_at`. Marking inserts; unmarking deletes. **No `done` column**
(the row says it) and **no score column**.

**The level is a setting, never part of a progress key**, so a learner can drop a level and climb
back losing nothing; on the key or even the row it fragments one history into per-level piles.
**Scores are stored nowhere**: a per-run score records performance, not what the learner decided is
done — closer to behavioural tracking than progress.

**The database knows nothing about the course** — no lessons table, foreign key or titles. Mirroring
`src/data/navigation.ts` would buy integrity already checked at build time, and a second place for
the course to disagree with itself. **`marked_at` is client-supplied, no trigger forcing `now()`:**
offline, what matters is when the learner ticked; a client can only lie about its own rows.

## 23 · A lesson carries a set of levels; `[]` means "always visible"
**2026-09-05 · Binding**

A page on *les articles* can be tagged `['A1', 'A2']` and appear for both, keeping **one** tick.
Duplication is what #14 rejects. **`levels` is required, and `[]` is a statement:** `culture` and
`musique` prompted it, belonging to whoever wants them. An optional field would make "forgot to tag"
and "needs no tag" identical in a diff. **Filtering is `learner level ∈ lesson levels`** against the
manifest at render time; the database has no opinion on levels, so retagging is a diff, not a data
migration.

## 24 · IndexedDB is the local store; `localStorage` is for pre-paint values only
**2026-09-05 · Binding**

Progress and the level live in **IndexedDB**, keyed by account id so two people on one browser never
see each other's ticks. **Chosen over `localStorage` on durability:** that is the first storage
cleared under pressure, blocked in some privacy modes, capped at 5 MB for the whole origin. The cost
is an async adapter, which the `load()` / `save()` seam absorbs.

**`localStorage` has exactly two jobs: the theme and the collapsed sidebar.** The test is the rule:
a value that must be correct **before first paint**, applied by an inline script, and is a short
string nobody would mourn. Progress and the level fail the first clause — IndexedDB is async.

## 26 · Sign-in is a route, `/compte`
**2026-09-05 · Binding**

`/compte` signs in and out and sets the level. **Chosen over a topbar modal** because a route is
linkable and keeps auth UI out of the shell. The sidebar's account control links there and **never
holds a form** (#47). **No custom domain** at this scope: it means setting the redirect URLs twice.

**Decided against a separate `/connexion` form route**, which only reads better in the address bar.
With no server session read (`AGENTS.md` §8) both routes would render both states — `ReturnTo`'s
`useAccountReady` twice; every `/compte?suivant=` link (#48, #70) would move or pay a hop; and the
manifest switches an annexe's *title* by state (`signedOut: { title: "Se connecter" }`), not its
*path*, so one row would become two (#47). One route only loses a per-state `<title>`.

**One heading, drawn by the leaf that knows who is asking:** « Se connecter » signed out, « Compte »
signed in; the prerendered HTML carries the first, as on `/` (#71). The form is not a `<section>` —
the accent bar is for one section among several. **No sentence restates what a field on screen
already holds.**

**`/connexion` redirects to it**, in `next.config.ts` — an alias. A redirect is matched before the
filesystem, so a `page.tsx` at `app/connexion/` would never render.

## 27 · The accent is the wordmark's blue; the serif carries the French
**2026-09-05 · Binding**

**`#0044AA`**, the colour of `public/logo.svg`, so accent and brand match by construction; 8.7:1 on
white. **Chosen over the old `#12539F`:** having both beside the wordmark is not defensible. **Red
is never decoration** among accent, danger, warn, success: ornamental red teaches distrust of the
one signal a graded drill needs trusted.

**Spectral for the French being taught, Inter for the instruction.** The split needed a carrier, and
colour is spoken for; it is keyed on *example vs. explanation*, not the page's language. **Chosen
over Georgia headings**, where the serif was decoration: Georgia's oldstyle figures hang below the
baseline, a typo in a conjugation table. Spectral has lining figures and draws `œ`, `ç`, `é`/`è`/`ê`
as glyphs, not composites.

**`next/font`:** `subsets: ['latin']` covers every accent, `ç`, `ñ`, `¿` and `œ`; `latin-ext` ships
glyphs no lesson can contain. Real serif italics are loaded, since a synthesised italic slants
accents wrongly.

## 29 · Chapter landing pages are one generated route
**2026-09-05 · Binding**

`app/[chapitre]/page.tsx` with `generateStaticParams` and `dynamicParams = false`, so an unknown
slug 404s — which also stops the segment swallowing every unmatched top-level path. The verb sheets
likewise (#56). **Chosen over fourteen near-identical files** that drift; the cost is a nav-audit
line per chapter, since a filesystem walk skips dynamic segments. **Never hand-write a chapter
landing page.**

## 31 · An account may hold an optional display name
**2026-09-05 · Binding**

Optional; nothing depends on it. **The bar for anything further:** a learner would notice its
absence. An account holds a username, an email, a password, progress rows, a level and an optional
display name. Nothing else.

## 35 · The level filters every listing, and never access
**2026-09-05 · Binding**

The level filters the sommaire, the chapter pages and the sidebar — **all three**, or seven lessons
beside one reads as a bug. **The unfiltered course ships; hydration narrows it** once `useAccount`
resolves — right signed out and on a cold service-worker load, where empty would break offline.

**Hiding is never gating:** every path resolves, and reading the session to decide rendering would
drag lessons out of prerendering. **A filter must be visible** or it looks like an unwritten course:
the sommaire names its programme and offers a change. **Exceptions:** search groups by level (#39),
and `/ma-progression` does not filter (#48).

## 36 · The learner's settings live in user metadata, not in a table of ours
**2026-09-06 · Binding**

`public.progress` and `public.usernames` are the only tables the project owns. Level and display
name live in `auth.users.raw_user_meta_data`, which arrives with the session — no round trip,
nothing to invalidate.

**What it deleted is the argument.** A `settings` table with a `NOT NULL` level needed workarounds —
a "not chosen" vs "not looked yet" flag, upsert vs update, no name before a level, a `reload()` for
consumers. `updateUser` emits `USER_UPDATED` through the existing subscription.

**The cost: no database constraint behind either value.**

- **The rules live in `src/lib/account.ts`, on read as well as write.** `readLevel` returns `null`
  outside `CHOOSABLE_LEVELS`, so a malformed value never reaches the interface.
- **The blast radius is the holder's own view:** neither value identifies or grants anything, and
  re-choosing fixes it. **A setting that grants something, or that others see, belongs in a table
  with a constraint** — #38, hence `usernames`.
- **`CHOOSABLE_LEVELS` is the only gate on which levels exist:** opening one is a one-line change in
  `navigation.ts`, with nothing downstream to catch a mistake.

## 37 · Username and password; nothing on the server reads the session
**2026-09-06 · Binding**

A **username and password**. No magic link, mail, sign-up form, `/auth/callback` or server Supabase
client. **Not email:** with two accounts and credentials handed over in person, a magic link is only
an inbox round trip. **Email returns when the app outgrows the people its author knows** — accounts
are Supabase Auth users, so an address is a field, not a migration. No address is why a forgotten
password is reset by hand and `/compte` has a change-password field.

**A username is carried as `<name>@lepetitcours.test`**, Supabase Auth having no username provider.
**`.test` is reserved by RFC 2606**, so no message can reach it. `lepetitcours.com` was rejected: it
belongs to a stranger **and publishes an MX record**. **Run `dig MX` before choosing any fake
domain**; only a reserved TLD cannot become someone's property. Usernames are case-folded ASCII,
since an accented local part may not survive normalisation.

**Public sign-up must be off at the Supabase end; the repo cannot enforce it**: the publishable key
is in the bundle (#21), so `POST /auth/v1/signup` is open to anyone. Accounts are made in the
dashboard, and `/compte` says so. Checked per `AGENTS.md` §0, with « Auto Confirm User ».

**No admin role.** **Do not add a flag that makes one account different**: privilege needs a table
with a constraint (#36), not a self-writable boolean.

**Nothing reads the session on the server.** `/auth/callback` and the server client were deleted —
`signInWithPassword` returns the session in the browser — so `AGENTS.md` §8 is a property of the
code and `next build` shows every route static. **A server client reappearing is a new decision, not
a restoration.**

## 38 · The username is its own table — unique, mutable, mirrored
**2026-09-06 · Binding**

Sign in with **username or email**; the username is unique, changeable, and the fallback display
name. **This is #36's case:** it grants something and needs uniqueness, which metadata cannot hold.
It used to *be* the email's local part — no lookup, but unchangeable without changing the address;
decoupling trades a lookup for a mutable name.

**The lookup is `email_for_username()`, `security definer`, granted to `anon`**: there is no session
at sign-in, and definer rights answer without granting `select` on `auth.users`. **It is an
enumeration oracle, accepted:** anyone can learn a username's address. Tolerable **only** while
every address is a fake `.test` one and the site is unlisted. **The day a real address goes on an
account, resolution must move server-side behind a rate limit** — noted in the migration beside the
function.

**Uniqueness is the constraint's alone.** Never ask "is this name free?" first — a race *and* a
second oracle. Write, and turn `23505` into « déjà pris ».

**Mirrored into user metadata; the table is the authority.** Metadata rides in the cached JWT, so
the name survives offline. `set_username()` writes both in one transaction; **only it and the
account trigger write the mirror**. That trigger gives dashboard-made accounts a username from the
email's local part, suffixed on collision.

## 39 · The home page is a search field; the sommaire is at `/sommaire`
**2026-09-06 · Binding · narrowed by #71**

`/` is the wordmark, one large search field and a row of chapter pills **for a signed-in learner**
(#71); signed out, a welcome replaces the field. Chapter cards are at `/sommaire` either way. **A
table of contents is consulted, not arrived at.**

**Decided against filtering in place:** a query in component state is not linkable, not in history,
and gone on a cold service-worker load.

**The index is the manifest:** `src/lib/search.ts` searches titles, subtitles, tags, blurbs and DELF
descriptors with no fetch, so it works offline. **It folds accents** for Spanish keyboards.
Full-text search over prose needs a compile-time index and a fetch: a different decision.

**Grouped by level, never cut — a deliberate exception to #35:** hiding a page whose name was typed
says « ça n'existe pas » about one that opens. Out-of-level matches go under « À d'autres niveaux ».

**`featuredChapterSlugs` is the one hand-kept list**, audited by `nav-wiring` because it fails soft;
short, or it is the sommaire again. An empty chapter named there does not draw. **`/recherche` is
static:** `useSearchParams` in a client leaf inside `Suspense`, since `searchParams` in the page
would make it dynamic.

## 40 · The sidebar is one level deep
**2026-09-06 · Binding**

A chapter row links to its landing page, which lists the lessons; it is not a disclosure.

**A tree that works at three lessons stops working around thirty**, and A2 alone is dozens. The
chapter page already had levels, tags and ticks the sidebar had no room for, and two lists would
have to agree. **Decided against showing only the current chapter's lessons**: the sidebar would
change shape as you move. **Reopening needs a reason other than "there is room".**

## 42 · Three shells; chapter icons are required and compiler-checked
**2026-09-06 · Binding**

A **drawer** below 56.25rem, an **icons-only rail** to 75rem, the **open panel** above; either wider
shape collapses, and the choice is remembered. **The rail exists because 16.5rem is a quarter of a
900px tablet.**

**One preference, not one per breakpoint.** `data-rail` on `<html>` is `1`, `0`, or absent (follow
the width); CSS resolves it into `--shell-mode` and `--sidebar-now`, which `useShellMode` reads, so
the hook knows neither breakpoints nor preference. **The rail's styling is a container query on the
panel**, not a third breakpoint to keep in step.

**A missing chapter icon does not compile**: `IconName` is a manifest union and `ChapterIcon`'s map
a `Record<IconName, …>`, so both directions fail (verified by breaking it). **No `default` entry,
ever** — a generic glyph makes a forgotten chapter look deliberate, the bug this replaced. **Icons are
inline SVG in the repo**, so they work offline and carry no attribution duty (§9b). **The sommaire
card keeps the serif initial**: a card has room for lettering, a 3.75rem rail does not.

## 43 · The topbar is part of the page, not a band over it
**2026-09-06 · Binding**

No border, no surface of its own, no backdrop blur.

**Sticky and transparent are one decision**: a pinned bar with nothing behind it is text sliding
under a breadcrumb. **They will be proposed back separately** — restoring the surface asks to pin
it, pinning asks for the surface. #44 is where pinning won.

**Decided against removing the bar**: below 56.25rem it holds the only drawer control. **Decided
against keeping it on mobile only**: a header in one shell and not another is a difference to learn.

## 44 · The topbar is sticky on mobile only, in the page's own ground
**2026-09-06 · Binding**

Below 56.25rem the topbar is `position: sticky` in **`--surface-app`**; above, #43 stands.

**#43 accepted the drawer opener scrolling off, and was wrong**: it is the only way to open the
sidebar there. **A control that is sometimes absent is worse than a band.** Occlusion was the need,
not a band: `--surface-app` is `body`'s paint, so the bar hides what scrolls under it and vanishes
against the page. **The translucent `--surface-bar` stays deleted.** **`--z-bar` is scoped to that
breakpoint**, so positioned lesson content does not paint through.

## 45 · One sidebar control; the trail never names the page you are on
**2026-09-06 · Binding**

**One button, every breakpoint**, at the content's left edge against the panel: it opens the drawer
or collapses the panel. It replaced two controls, neither present at all widths. **Its label
follows the mode** — *ouvert* / *fermé* for a drawer, *réduit* / *développé* for a panel.

**The trail does not name the current page** — « Grammaire › Les articles » sat over an `<h1>`
reading *Les articles*. It keeps **the chapter, as a link up**, the only place a lesson names it now
that `PageHeader` does not; top-level pages show nothing. **It grows *upward*** (a parcours step, a
level, #65); **putting the leaf back is not growth.**

## 47 · The account popover holds the account, and nothing else
**2026-09-06 · Binding**

Signed in: « Ma progression », « Compte », the theme, « Se déconnecter » (needs no page, so it is a
row here as well as in `/compte`). Pages *about the site* left: « À propos » and « Code source »
(the same link three times; `/a-propos` links the repository). **The popover does not restate its
trigger** — no name above the control that shows it.

**Signed out: two rows, « Se connecter » and the theme**, not the signed-in list greyed. « Ma
progression » goes, being itself the offer to sign in; `/compte`'s row takes the title « Se
connecter ».

**Signed-out behaviour is in the manifest** — `signedOut: "hide" | { title }`, required on
`where: "menu"`: a component asking « is this `/compte`? » is a hand-copied list, and an optional
field lets a later row inherit a behaviour nobody chose. **`where: "menu"` requires `icon`**, or a
row draws a blank column and fails nowhere (#29's bug); the theme and sign-out are not pages and are
drawn in the component. **`Annexe.where` gained `footer`**, so `/a-propos` stays in the manifest,
searchable and audited. **Position is a property of the page**, never a list in components.

## 48 · A tick needs an account; offline is a queue of operations
**2026-09-06 · Binding**

Signed out, the control is drawn and links to `/compte?suivant=<the lesson>`. **Decided against a
browser-local anonymous tick**: storage is evicted without warning, and quietly losing forty ticks is
worse than saying what an account is for. **`?suivant=` is checked against the manifest, not a
pattern** — `//ailleurs.example` starts with a slash. Coming back does not tick: marking is manual.

**Operation queue, not snapshot**: offline *mark* / *unmark* replays onto the server's state; a
snapshot cannot tell an offline unmark from a device that never saw the tick, and resurrects it.
**Storage only through `load()` / `save()`**, so cache and sync share one interface.
**`/ma-progression` does not filter by level**: a tick hidden by a level change reads as lost.

## 49 · The shell draws the end of a lesson: the tick, then the links
**2026-09-06 · Binding**

`LessonEnd` renders the done-tick then « Pour aller plus loin » for any path resolving to a lesson;
**a lesson renders its header and prose only.** A lesson that forgot `<RelatedLinks />` lost its
links silently — the audit checks `relatedPages` resolves, not that it renders. **Cost:** the links
sit inside the shell's client boundary, which is negligible — the manifest is already in the client
bundle and the markup still prerenders.

## 50 · Progress is keyed by a permanent lesson id, never by the route path
**2026-09-06 · Binding**

Every lesson has a required `id` (`gram-passe-compose`, `orth-accents`); ticks are stored under it in
IndexedDB and Postgres. **The path carries title, chapter and spelling, all revisable**, and each
revision silently deleted learners' history.

**It replaces a `pathAliases` map** updated with each rename, where a forgotten entry looked exactly
like a remembered one. **Chosen against:** a *uuid* (unreadable in a diff reviewed by eye); *chapter +
slug* (the path again); *path plus audit-enforced aliases*, the closest call, which defends a rename
with a check someone must run where an id removes the danger.

**The id is frozen from the commit that adds it**; changing it silently deletes every tick. **A path
rename needs a redirect in `next.config.ts`; the id never changes.** `navigation.ts` checks shape and
uniqueness at import, so a duplicate fails `next build`; `progress_lesson_id_shape` re-checks in
Postgres. **Only lessons carry an id** (`Lesson` extends `PageEntry`): an annexe id invites progress
stored against `/compte`.

## 51 · The course announces nothing it has not written
**2026-09-06 · Binding**

No `soon` flag, placeholder, dimmed row or « Bientôt » card; **a manifest entry lands with its
`page.tsx`**. `listedChapters(level)` drops an empty chapter until its first lesson. Placeholders
served while the manifest was the plan; now they are clicks into nothing and counts of intentions.
**Chosen against an honest empty state** — the same experience, better mannered.

**The sixteen chapters stay declared** (slug, icon, blurb; every landing page builds, every URL
answers); only the offer is filtered. **Search hides an empty chapter rather than grouping it**: a
level-filtered page still opens in full, an empty chapter has nothing behind it. **No "coming soon"
row in any form** — dimmed, disabled or counted.

## 53 · One language of instruction, and it is French
**2026-09-06 · Binding**

Everything is French (AGENTS.md §1), **except a `traduction` page's source text** (#55).

**Decided against splitting by reader** (Spanish for the learner, French for the heritage speaker):
the course is public, a Spanish gloss is dead weight for a Brazilian, Italian or Moroccan reader,
and the heritage speaker was served in French already. **French widens the door without moving
it**, and dissolves a question open since 2026-08: shared pages cannot be Spanish-first and
French-first at once.

**The audience now shapes what is explained, not the language**: a false friend gets a definition
and an example (*« Elle porte une robe bleue »*); an interference error is printed wrong-then-right
(*on ne dit pas « il est trois »*); **the explanation's French stays easier than the French taught**
— this decision's failure mode, which `content-proofreader` hunts first.

**The cost:** a rule in a language not yet had is harder, survivable because content starts at A2
(#74). Drills lengthen the sentence instead of glossing. The fourth table column holds an example
sentence. **English stays forbidden.** Serif is the French studied, sans the explanation;
`<html lang="fr">` covers spans, and `lang="fr"` stays only where an element is pronounced alone.

## 54 · A conversation page is a guided role-play, graded nowhere
**2026-09-06 · Binding**

A scene, its steps, the words to play it; nothing graded or stored, because **it needs a second
person**. **Decided against a gap-fill**: it grades someone else's script, while the A2 difficulty
is producing your own turn when you do not control the next line — it would run perfectly and teach
recognition.

**Two callouts per page, maximum**; a paradigm table makes it a lesson with a dialogue stapled on.
**The one client leaf is the constraint card**, cycling variations (only the morning free, nothing
before Thursday, calling for her son), because a role-play replayed is a script memorised. **In
order, never random** — random differs between server and client, and a class walks the list anyway.
**Write the scene so the grammar just learnt is unavoidable.**

## 55 · A `traduction` chapter — the one place Spanish is allowed back
**2026-09-06 · Binding**

A short Spanish source, a place to write the French, the model version. Spanish is **material, never
explanation**, so #53 holds. `src/components/exercice/Traduction.tsx` renders it from `lines`,
`model`, `note`; **one component, not one per page**, or every page forks with bespoke CSS.

- **Four sentences that hang together** — unrelated ones are a grammar exercise wearing a text.
- **Choose against a lesson, not a topic**: which lesson is still unpractised?
- **Three hints, on words Spanish does not give away, never on a word the text tests.** A hint
  gives the base form; tense, auxiliary and agreement are the exercise.
- **The note says what does not count**: accepted variants, then the one thing that is not.
- **Check the Spanish as closely as the French** — a stray French word or punctuation mark passes
  the build.

## 56 · The conjugation sheets: one data file, one route
**2026-09-06 · Binding**

`src/data/conjugaisons.ts` holds the verbs, `ConjugationSheet` draws them,
`app/conjugaison/[verbe]/page.tsx` renders all. **A verb is one data entry plus one manifest entry.**
**Chosen against one wrapper per verb** — thirty files that can each drift.

**Forms are stored `radical|terminaison`**, so the ending's colour cannot drift; no mark means all
stem. **Futur and imparfait are generated from a stem.** `assertVerbs()` refuses a futur stem not
ending in `r`, or an imparfait stem ending in `e`, `g` or `ç` — the `-ger`/`-cer` trap (*je
mangeais* / *nous mangions*); such a verb stores both stems written out, since an `e`-inserting rule
will one day hit the wrong verb. **The imparfait is on the sheet**, no longer only in
`grammaire/l-imparfait`.

**Two toggles make it a client component**: Négatif shows *ne … pas* around the **auxiliary** in the
passé composé, a Spanish speaker's long-running mistake; Féminin shows agreement on `être` verbs.
**Cross-links are derived**: eleven of twelve are the same two paths.

## 57 · A role-play offers words, never a model dialogue
**2026-09-07 · Binding**

Steps name the moves, a cloud of about twenty words, and **no sentence they could say instead of
building their own.** **The model dialogue does not come back** — it teaches reading a conversation,
and a `<details>` only delays that. **One aid, in one place**: a phrase list per step plus a closing
dialogue put everything on the page twice, to be read instead of played.

**The cloud** is tested against the constraint card — every situation answerable from it — not by
count. **Entries are words or small fixed pieces**, never sentences (the dialogue returning a chip at
a time), in conversation order, **with no glosses**: a word needing one belongs in the linked lesson.

## 58 · What a `lecture` text has to be
**2026-09-07 · Binding**

Real **public-domain** French text or an original A2 dialogue; never generated filler or copyrighted
text. Source stamp, text in `.example` blocks, vocabulary table (mot | définition en français |
exemple), and an « Avez-vous compris ? » quiz graded on screen, stored nowhere. **`lecture` promises
questions, `litterature` commentary**: what the page does with a classic picks its chapter.

**Choose for tenses, not fame**: nineteenth-century narrative is in the passé simple, not taught
here. Surviving passé simple in a quotation stays, with one `.attention`: you read *il cria*, you say
*il a crié*.

**Public domain in the country of origin, not by death date alone.** Working test: author died
before ~1955. **Saint-Exupéry is not public domain in France** — *mort pour la France* adds thirty
years, so *Le Petit Prince* is protected there into the 2030s. A brief once listed him as safe.

**Quote exactly, against the scan**; period punctuation is not an error. Bridging sentences sit
outside the quoted blocks, in the sans. `Comprehension.tsx` renders every quiz from `{ question,
options, answer, because }`, with `<button>` options, **never hidden radios** (§9). Every distractor
is wrong *on the page*, and `because` quotes the settling phrase.

## 59 · How hard a `lecture` text may be, and what to do when it is too hard
**2026-09-07 · Binding · narrows #58**

**A text is chosen for what the learner can answer, not what they can construe.** Rostand's crowd
scene is alexandrins and 1640 vocabulary, yet who pays, refuses or plays cards is answerable at A2;
the Proust page asks about the candle, book and train, not the métempsycose.

**Where the text cannot be made easy, the page says so and gives a way in** (e.g. a note that a line
of verse is shared between speakers). **Neither pretends**: C1 prose passed off as A2 teaches a
learner they cannot read. **An edge-of-level page gets two cross-links, not four**, back to the
reading that prepares it. **Wikisource prefixes a split alexandrin with the previous half-line**;
strip it by hand against the scan.

## 60 · World literature in `lecture`; the translator's death date is the test
**2026-09-07 · Binding · widens #58**

Translations are allowed and **labelled**: the job is reading French, not French authors. **The
translator's rights are the test**, not the author's: François-Victor Hugo died in 1873, so his
Shakespeare is free; a modern edition is not (the #58 trap again). **The label rides in the
manifest** — the subtitle names the translator for the sommaire, chapter page, search and
cross-links; the stamp gives both names and dates; the page says it is a translation. **No English,
in any form** — no facing original or English title; §1 has no quotation exception.

## 63 · The footer belongs to the home page; the shell's foot is one row
**2026-09-12 · Binding**

**The footer draws on `/` and the pages it points to**, decided by `Footer` itself as `LessonEnd`
decides lessons (#49), so no allowlist; it never links to the current page. **So a `where: "footer"`
annexe is reachable from `/` only** — put a page elsewhere if a lesson must reach it.

**The account control and the footer share `--shell-foot-h`**: one rule, one baseline. **Change the
control's height and the token follows**; drift shows on the rail, where the avatar alone comes up
short.

## 65 · The lesson's level rides in the trail, in front of the chapter
**2026-09-12 · Binding**

**A2 · Grammaire**, over a title that is only the title.

**It is the lesson's tag, never the learner's chosen level.** `Lesson.levels` is manifest data, so
the bar reads no session and nothing flashes. The chosen level filters listings, not access (#35):
showing *it* would claim the page belongs to a level the learner picked, on a page that renders in
full whatever they picked, and would put an async session read in the chrome above every lesson.

It sits outside the `<nav>` — a level is not a step of the trail — and `levels: []` draws nothing.

## 66 · Sections are marked, and the margin carries an index
**2026-09-12 · Binding · the mobile placement is open, see `AGENTS.md` §12**

**A short accent bar over every section heading.** Two or three sections *is* the lesson, so each
break is a change of subject, and space alone never read as one. Decided against a full-width
divider: the page already rules the title block and the cross-links, and a third line at every break
makes a lesson a stack of bands. **A bar marks a beginning; a rule cuts.** What counts as a section
is `AGENTS.md` §5.

**« Index » lists the lesson's own headings, read from the rendered page.** The manifest owns
lessons, not their headings, and a second list would drift at the first renamed section. `LessonToc`
walks every `h2` after paint and assigns the ids, so **the anchors are not permanent**; the path is
the promised address (#50).

**It draws only where the margin holds it, and the reading column never shrinks for it** (93.75rem
beside the full panel, 81.25rem beside the rail): shifting the column would move every lesson off
the crumb's axis for something only wide screens see.

**The scroll-spy reads rects on scroll, not an IntersectionObserver.** An observer watching a
zero-height band never fires when the page jumps past every heading at once, which is exactly what
following a link *in this index* does.

## 67 · « En résumé » is a titled block, and one line closes a lesson
**2026-09-12 · Binding**

**« En résumé » carries a written `<h2>` and is not a box.** As a `::before` label inside a
bordered, tinted card it wore the callouts' clothes and read as one more of them; and a `::before`
cannot be pointed at, while #66's index links to headings.

**It restates and never adds** — a new bullet is a section missing higher up. **Never echo the block
directly above it**: a lesson usually ends on an `.astuce` or `.attention`, and a final bullet
repeating it reads as duplication. Two lessons shipped that way, caught by screenshot, not review.

**One line closes the lesson.** The tick and the cross-links each drew a rule, centimetres apart. It
is on `LessonEnd` now, once, above the tick: the lesson ends where the shell's furniture begins
(#49).

## 68 · A tick names its level only when the page holds a body of work per level
**2026-09-12 · Binding · narrows #22 · narrowed by #73, #76**

`public.progress` has a `level` column, and a tick is stored under `progressKey(lesson, level)` in
`src/lib/progress/store.ts`: the bare `Lesson.id` for a page with one body of work, `id@LEVEL` for a
page holding one per level. **The test is `perLevel` in the manifest**, not `levels.length > 1`
(#76): being *listed* at several rungs is not evidence of a page that changes with the rung.

**#22 is narrowed, not overturned**: a learner can still drop a level and climb back without losing
anything. #22 rejects recording the learner's *ambient setting*; this column names **which variant
of the page was finished**, from the lesson's own `levels` — a property of the work, like
`lesson_id`. One tick cannot report two bodies of work (the B1 questions would show ticked after the
A2 ones), while a `[]` page — a verb sheet, a culture page — belongs to no level on purpose, and a
per-level tick there would invent a distinction.

**Chosen against a second route per level.** `/lecture/le-lion-et-le-rat/b1` would duplicate the
text, the id and the tick, the failure #14 rejects for parcours and #23 for levels. The variant
belongs in the key, not the URL.

**The global key is unchanged**: existing rows take the column's `''` default, the IndexedDB cache
and queued offline operations stay readable, and `CACHE_VERSION` did not move. **But eleven pages
were retagged in the same commit** — nine `lecture` texts and two `exercices` drills, `A2` to
`["A2", "B1"]` — so `progressKey` returned `lect-romeo-juliette@A2` against rows holding the
default, and their ticks silently stopped being read. `20260921140000_progress_level_backfill.sql`
moves them to `A2` (the variant actually finished) and skips anyone who has since re-ticked at A2,
since `(user_id, lesson_id, level)` is the primary key. **A page crossing from one level to two is a
data migration, not a tag edit.** The cache needs nothing: `useProgress` rebuilds it from
`applyPending(fetched, pending)` and `local.save` replaces it wholesale.

**The ticks left `ProgressApi` in the same change, and that is the load-bearing half.** `state` was
a plain `Record<string, string>`, and two of three consumers indexed it by hand (`lesson.id in
state` in `Progression`, `lesson.id in ticks` in `ChapterLessons`) — correct only while the key was
the bare id, and still compiling after. The record is private; every question takes the lesson **and
a required level**.

**Two columns, not a composite id.** The `@` is a JavaScript map-key separator and never reaches
Postgres: `progress_lesson_id_shape` would reject it, and a separate column keeps the table as
ignorant of the course as #22 wants. `level`'s check is a shape — `'' or ^[ABC][12]$` — not this
course's list of levels.

**The unmark filters on both columns.** Deleting on `lesson_id` alone would take every variant,
inside a background sync, with no error. `remote.ts` groups removals by level.

**`?niveau=b1` stays closed**: `useSearchParams` renders the nearest Suspense fallback into the
**prerendered** HTML, so every lesson would ship a placeholder as its static page. The level now
comes from the account (#73).

**`exercices` proved the rule is about the mechanic.** A sorting board is the same board whether the
chips read *aller* or *monter dans le train*, so both drills took a second bank, not a second page:
`data.ts` exports `BANKS` and `drill.tsx` keys the board on the level, so **the remount is the
reset** — a deck, its placements, its score and its « vérifié » flag go together, and a reset
threaded through four setters loses one, scoring a board against the other level's answers.

**The two lists that must agree are checked.** A `perLevel` page's sets and its manifest `levels`
live in different files and the manifest wins, so a level with no set would serve another level's
questions. The sets live in a type-only-import module beside the page — `questions.ts` for a quiz,
`data.ts` for a drill — readable by plain `node`, and the `nav-wiring` audit's fifth line compares
both directions: keys that disagree, and a multi-level lesson with no such module. Both were broken
on purpose and seen to fail.

**All nine `lecture` texts carry both sets**: a set per level is worth building only where the
stimulus is level-independent and the *task* scales; a B1 question that merely restates an A2 one
teaches nothing. **`delf` got a descriptor per level**, since it claims what the questions check,
and `PageHeader` handed the line to a client leaf rather than becoming a client component. The sets
are reached only by choosing B1 in the account (#74); removing them would move each key from `id@A2`
to `id`, the migration above.

## 69 · A recurring mistake steers the course, and nobody gets a programme of their own
**2026-09-17 · Binding · extends #13**

**A learner has an ordinary account, and nothing in the app is built for them** — no programme, no
parcours in their name, no teacher view, no place to hand in work. Their writing and its correction
happen outside the app. A recurring mistake only decides **which page the profile gets next**,
written for everyone with the profile, with invented examples.

**Decided against a bespoke programme**: it would be a student-management system under another name
(`docs/scope.md`, non-goals), a page built on one person's sentences serves nobody else, and it
would put their writing in a public repository. **Nothing about who made a mistake goes in a page, a
commit or a doc.**

**The heritage profile widened** (#13) to a teenager at a Spanish school with Spanish writing
habits; a page names the habit in French without printing the Spanish word (#53). **A lesson may
ship without a drill**; the drill comes when practice earns its place.

## 70 · « La suite » is the dashboard; signing in returns you where you were
**2026-09-21 · Binding · extends #48**

**A dashboard can only use the manifest, the progress rows and the chosen level** — all an account
holds (#31), and drills record nothing (#2). Streaks, time spent, weak areas and "continue where you
left off" need events this app does not keep. What remains is **one derived fact: the first lesson
at your level that you have not ticked.** `nextUp` in the manifest is its only definition; two
surfaces offer it, and a second definition would disagree in front of the same learner.

**Decided against a `/tableau-de-bord` page**: it would duplicate the record, need a redirect and a
manifest entry, and hold nothing new. It is a head on `/ma-progression` and a line on `/`.

**Decided against storing a position**: true resume records the last page visited — behavioural
tracking and a new account field. The first hole in course order needs nothing stored and is the
seam a parcours would feed (#14).

**The home page carries it** because `/` is the PWA's `start_url`: an empty field there wastes the
one screen that knows where the learner stopped. Signed out the line draws nothing (#71).

**Signing in returns them to the page they were on, and `/` is the fallback.** Every way into
`/compte` carries `?suivant=`: the lesson's tick (#48), the signed-out block on `/ma-progression`,
and the popover's « Se connecter », which reads the current path. A row earns that return by being
the way in, which the manifest says (`signedOut` carrying a title) rather than the component
guessing from a path.

**One writer, `signInHref`, and one reader, `safePath`, in the same file** — a param written in one
place and parsed in another gets encoded twice. It happened: there were three writers, correct by
coincidence.

**No `?suivant=` where it would only spell out the fallback** — from `/` and `/compte` the link is
bare. The return is honoured whether or not the learner signed in on this visit, so a stale
`?suivant=%2F` in a bookmark would bounce someone already signed in out of the settings.

**Decided against landing on `/ma-progression`.** A record is not what someone reading a lesson
asked for; the fallback only catches people with no context, and for them the home page is honest.

**Landing is a consequence of signing in, not of arriving.** Bouncing every signed-in visitor would
put the settings out of reach of the popover, so the redirect fires only when the session was first
read as empty — what `useAccountReady` exists for.

## 71 · Signed out, the home page is a welcome; the field is the signed-in home
**2026-09-21 · Binding**

`/` is two pages and the session picks. Signed in: the search field, « La suite », the chapter
pills, the learner's name where the tagline was. Signed out: a sentence saying what the course is,
then « Tout le cours », « Rechercher », « Se connecter ». The wordmark, its line and the footer are
shared.

**The field is the weakest thing here for a newcomer**: you cannot search a course you lack the
words for.

**« Tout le cours » is the primary action, not « Se connecter ».** Public sign-up is off and there
is no sign-up form (`AGENTS.md` §0), so for a first visitor the account is a door they cannot open.
**Nor is there a call to create one** (#18).

**« Rechercher » is in the row because the field is not.** `annexes` holds no search row at any
breakpoint, so without it search would vanish for anyone without a session. `/recherche` with no
query is the empty field, a real destination.

**The sentence is a paragraph, not an `<h1>`.** The wordmark is this page's `<h1>` and belongs
nowhere else. It names no chapter and no count: a prose chapter list drifts silently, and
a number is a tally that disagrees with what exists (#51).

**The cost, accepted: the prerendered `/` is the welcome.** `useAccount()` is `null` on the server
and until the session is read, and the welcome is what most arrivals, search engines and the offline
cache need. The signed-in learner sees it for one hydration on every cold launch; `HomeStart`'s slot
reserves the taller view's measured height, so the swap never moves the footer (#63).

**Decided against three cheaper-looking answers.** Keeping the field in both states and swapping
only the pills leaves a first visitor a control they cannot use. Drawing neither view until
`useAccountReady()` gives everyone signed out — most people — a blank first screen. Reading a cookie
to pick on the server makes `/` dynamic and drops `start_url` from the precache (`AGENTS.md` §8).

## 72 · A1 joins the course as pages, not as tags
**2026-09-21 · Binding · extends #23, #68 · narrowed by #74, #76**

A1 is written into the existing chapters, ordered before the A2 material.

**One course that the level filters, not a second course beside A2.** Babbel and Busuu write each
level as its own course, duplicating the chapters — what #14 and #23 reject. Duolingo makes the
level a *section* of one ordered path, which is what `parcours` (#14) is for and nothing yet
implements; until then a chapter is one ordered list that #35's filter narrows.

**#15 governs when A1 is *done*, not when it is *offered*** — #74 moved the offering.

**A page is listed from its floor upward, never widened downward** (#76): an A1 learner handed the
A2 imparfait is the failure a second page exists to prevent. **The fourteen conjugation sheets are
`ANY`**: a conjugation table is the same at every level, and at `A2` they would have left A1 with no
verb sheet while *le présent des verbes réguliers* is A1's central point.

**A second level is a new page, except where the stimulus has no floor.** #68's one-page,
set-per-level shape does not reach downward: a B1 reads Cosette with harder questions, an A1 cannot
read Cosette at all, and a drill whose mechanic *is* the level (auxiliary choice in the passé
composé) hides no A1 task. So prose, readings, dictées and most drills get a new A1 page reusing the
components; only a floorless stimulus — a translation source, a level-free mechanic — takes a second
set.

**`conversation` looks like an exception and is not.** « Prendre rendez-vous » is the same scene at
A1 and A2, but a `lecture` text shares seven hundred words while a role-play shares a title: #57
makes the page its steps and its word cloud, and both change completely — the A1 learner asks for an
appointment and names a day; the A2 learner reschedules and explains a symptom. **Each level gets
its own role-play**, which also leaves the six existing ones their ticks where a retag would have
migrated all six (§8).

**A level's lessons are inserted in teaching order, never appended** — the signed-out listing is
unfiltered, and A1's *présent* below A2's *passé composé* reads as a broken page.

**The syllabus is the Inventaire, and coverage is measured on the functions.** There is no official
DELF A1 grammar programme; the exam tests communication. France Éducation international distributes
the *Inventaire linguistique des contenus clés des niveaux du CECRL* (CIEP/Eaquals, 2015), whose
Annexe E gives per level the fonctions, grammaire, socio-culturel and thèmes de vocabulaire;
`docs/programme-a1.md` maps it against the manifest. **#15's finish line for A1 is the FONCTIONS
list**, not GRAMMAIRE — weighting `conversation` and `vocabulaire` over `grammaire`, which suits
learners who already have a Romance verb system.

**The inventory is spiral, so a shared topic is still two pages.** A1 and A2 both list *le présent*,
*le futur proche*, *le passé composé*, *les modaux*, *l'impératif*, *je voudrais* and *les
pronominaux*; they differ by exponent — A1 negates with `ne… pas / jamais`, A2 with `ne… plus / rien
/ personne`. Revisiting means *new material* (Bruner's spiral curriculum), so a topic on both lists
earns a second page, not an `["A1", "A2"]` tag. The six points that first appear at A2 —
l'imparfait, l'alternance avec le passé composé, les pronoms COD/COI, la comparaison, EN et Y, les
relatifs — have **A2 as their floor** and no A1 twin, and #76 lists them at B1 and B2 too.

## 73 · The level is chosen in the account, never on the page
**2026-09-21 · Binding · narrows #68**

`LevelPicker` is deleted, with `LessonVariantProvider`, its context and its per-path state.
`useLessonVariant` is a plain hook: the learner's level, else the lesson's first, with the lesson's
own `levels` as the authority at both steps. Only `LevelChooser` in `/compte` changes level.

**A level is the course someone is following, not a view option like a theme.** It decides what
the sommaire offers, what the sidebar lists, what « La suite » proposes and which body of work the
tick records; a control that repointed the last from inside the page, while the other three answered
to the account, gave two answers to one question.

**Progress is untouched**: `progressKey`, the `level` column and the per-variant unmark stand, and
dropping a level and climbing back still loses nothing (#22) — which is what makes this cheap.

**It narrows #72's shape further**: a two-level page now hides one level behind a settings change,
so it earns its place only where the *stimulus* carries both.

**Chosen against two cheaper-looking answers.** A read-only picker previewing the harder set still
puts a level control on the page and leaves the tick asking which level it means. `?niveau=` stays
closed for #68's reason: every lesson would ship a Suspense placeholder as its prerendered HTML.

**Discoverability needed nothing new**: `LevelNotice` on the sommaire names the programme shown and
links to `/compte` (#35).

## 74 · A level is offered while it is being written, not once it is finished
**2026-09-21 · Binding · reverses the A2-only gate, narrows #72 · narrowed by #76, #77**

`CHOOSABLE_LEVELS` holds `A1, A2, B1`, and a level joins it while it is being written rather than
once it is done. (The « en cours » badge and `COURSE_LEVELS` this entry added were deleted by #77;
the reasoning below still binds.) **A2 was written first, and that order stands**: the learners the
course was started for are at A2.

**The old gate answered the wrong question.** The A2-only gate was right about the risk and wrong
about the remedy: an unfinished level is dishonest not because it can be chosen but because nothing
says it is unfinished. #51 forbids *announcing* what is not written; offering a level announces
nothing false.

**The deciding fact was that leaving A2 showed *fewer* lessons** — picking B1 lost `grammaire`,
`vocabulaire`, `astuces`, `conversation` and `traduction` and bought only eleven harder question
sets (#68). #76 removed that fact: B1 is now offered everything A2 is. **A1 stays the thin rung**,
because no page is widened downward.

**#15 still defines when a level is *done*; it no longer decides when it may be *chosen*.**
Completeness is an editorial fact, tracked in `docs/programme-a1.md`; since #77 the interface says
nothing about it.

**Closing a level is a silent reset.** `readLevel` filters against `CHOOSABLE_LEVELS` as well as
`saveLevel`, so removing an entry makes anyone on it read back as having chosen no level. The stored
value survives in metadata, ignored, and nothing says so — remember that before offering B2 to see
what it looks like.

**Chosen against two alternatives.** Keeping the gate left the maintainer unable to see the level he
is writing, and #73's B1 sets written, paid for and unreachable. A separate preview control would
have been a second writer of one value, the shape #70 rejected for `?suivant=` and #73 for the
level: one writer, or two that agree by luck.

## 75 · The ladder stops at B2; C1 and C2 are out of scope
**2026-09-21 · Binding**

`Level` is `A1 | A2 | B1 | B2`. C1, C2 and the unused `LEVELS` array are gone.

**Out of scope, not deferred.** A declared, never-written level is the "coming soon" #51 refuses: it
promises something the course does not intend. C1 and C2 serve academic or professional French,
which neither profile (#13) needs.

**Removing them from the type makes it stick.** The union is the vocabulary (#42's pattern), so a C1
page is a compile error, not a review judgement. `LEVELS` had no consumer; `CHOOSABLE_LEVELS` is the
only level list, and `LADDER` (#76) is derived from the union.

**`Level` is this course's ladder, not CEFR's, and the prose must not be "corrected" to match.** The
heritage speaker of #13, plausibly **oral C1 and written A2 at once**, is CEFR describing a person;
rewriting it to B2 would make it false about the reader. Likewise the proofreader brief's "no C1
grammar vocabulary" is about register, not a rung.

**The database is untouched.** `progress_level_shape` allows `'' or ^[ABC][12]$`, still admitting
`C1`, deliberately: #22 and #68 keep the table holding what a CEFR rung *looks like*, not which ones
are taught — as `progress_lesson_id_shape` holds an id's shape. **Do not tighten it**; narrowing it
would make a future syllabus change a migration.

## 76 · A page is listed from its floor upward; the tick follows the material
**2026-09-21 · Binding · narrows #68, #72**

`levels` is the set of rungs a page is **listed at**, from the rung it was written at to the top of
the ladder unless something higher supersedes it — `from("A2")`, which slices `LADDER`. A separate
`perLevel: true` says the page holds one body of work per level, and **that** is what `progressKey`
branches on.

**The failure it repairs.** #72 made `levels` mean "who the page is written for": choosing B1 hid
every A2 lesson and showed eleven pages of harder questions, and the chooser had to apologise for it
in prose. **A learner who climbs does not stop needing what they climbed on.**

**Two claims had been sharing one bit.** `levels.length > 1` meant both "listed at several rungs"
and "holds a body of work per rung", so widening a tag silently repointed the tick from `id` to
`id@LEVEL` — the migration #68 is about, which had stranded eleven pages' ticks nine days earlier.
Now `levels` decides listing, `perLevel` decides the key, and neither is inferred from the other.

**Zero rows moved**: the eleven per-level pages are the eleven carrying `perLevel`, and twenty-three
pages widened to A2–B2 with no tick shifted. **If widening a tag ever costs a migration again, the
two claims have been merged back.**

**Chosen against three alternatives.**

*Keep #72 and write a B1 twin of every A2 page.* The spiral argument holds downward, not up: A1 and
A2 negate differently, so an A1 négation page has new material, while a B1 imparfait page would be
a copy — the duplication #14 and #23 reject, a fourth time.

*A second field for the rungs a page is "still useful at".* Two editorial lists to keep in step;
the floor plus a ladder answers it once.

*Widen the tags and keep per-level ticks.* A learner who moves up finds the imparfait unticked and
concludes the course lost it. The same page is the same work at any rung.

**Downward, #72 survives.** `from()` has no downward twin: an A1 learner gets the simpler A1 page,
not the A2 one's tag. A written-out tag — `["A1"]` — claims something above supersedes the page.

**`ANY` is not `from("A1")`.** `[]` says the page belongs to no rung — the verb sheets, the spelling
pages, which answer to literacy rather than CEFR (#23, #68). `from("A1")` is a syllabus claim.

**`from("A2")` includes B2, which nobody can choose** (#74, #75), deliberately: the day B2 opens
needs no twenty-three edits, and an unselectable level shows nothing wrong meanwhile.

**A `perLevel` page writes its levels out, never `from()`.** The tag *is* the list of sets and must
equal it; the manifest wins, so a rung with no set behind it would serve another rung's material
rather than fail. The nine `lecture` texts and two `exercices` drills stay `["A2", "B1"]`: a B2
face is a B2 question set, not a wider tag. The `nav-wiring` audit checks both directions,
plus a third: several sets with no `perLevel` is two bodies of work behind one circle.

**The interface prints the floor, one badge**, in `AppTopbar`'s trail and `PageRow` — « A2 B1 B2 »
on every row separates nothing. Read from the manifest, so the chrome reads no session (#35, #65).


## 77 · The chooser offers the levels and rates none of them
**2026-09-21 · Binding · narrows #74**

`COURSE_LEVELS` and `IN_PROGRESS` are deleted, with the « en cours » chip and the line saying what
a level held. `LevelChooser` offers three levels, a blurb each, and one note about the ladder.
`CHOOSABLE_LEVELS` is the only level list left.

**Both were written for a stranger, and this course has none.** #74's bargain — offer an unfinished
level if the chooser says so — suits a course someone can find. This one is unlisted, with no
sign-up form and every account made by hand for someone told what the course is.

**#51 is not reopened.** #51 forbids *announcing a page that is not written*. Every level in
`CHOOSABLE_LEVELS` has pages, a level with none would draw an empty sommaire rather than a promise,
and `listedChapters` still drops empty chapters. What went is a **rating** of the levels — a claim
about how finished the course is, which #15 and `docs/programme-a1.md` already hold; the chooser was
a second copy.

**Chosen against two alternatives.**

*Declare A1 and B1 finished* by moving them into `COURSE_LEVELS`. It keeps the mechanism for B2, and
records A1 as complete while nine of twenty-four functions are covered. A field that lies is worse
than a field that is gone.

*Keep the note, drop only the badge.* `COURSE_LEVELS` would lose its only reader and become a
hand-kept list nothing reads — what #75 deleted `LEVELS` for — sitting beside `CHOOSABLE_LEVELS`
looking load-bearing.

**The cost.** Someone choosing A1 sees twenty-four lessons, twenty tagged `[]`, and nothing says A1
is thin. Acceptable only while the audience is known. **This is the first thing to put back if the
site is ever listed or opens sign-up** — badge and note before the door. A comment on
`LevelChooser` says so.


## 78 · A `delf` chapter describes the exam and prints none of it
**2026-09-21 · Binding · extends #15, #51, #9b's licence rule**

A sixteenth chapter, `delf`, last in the manifest, holding **whole épreuves to sit in real
conditions** and nothing else. How they are marked and sat is #82's.

**Decided against a page explaining the format.** One was written and deleted the same day: true,
useful, and standing between the learner and the exam. The barème lives on the épreuve it applies
to. `/delf/comment-ca-se-passe` redirects to the chapter; `delf-comment-ca-se-passe` is a retired id,
never reused (#50).

**The licence line is why the entry exists.** The request arrived with the *Transcriptions et
corrigés* booklet of a Hachette DELF A2 prep book (ISBN 978-2-01-719952-6). It cannot go in, and
neither can France Éducation international's free sample sujets — free to download, not free to
relicense. Content here is CC BY-SA 4.0, and #9b allows licensing only what the project owns.

**Format is a fact; a sujet is someone's writing.** Four épreuves, twenty-five points each, fifty to
pass, five minimum per épreuve, the order on the day, what each asks — stated here. The *texts,
items, consignes and corrigés* are not, however reformatted. **Everything printed in `delf/` is
written for this course** (#4).

**An official sujet may be read to calibrate difficulty, and leaves no trace on a page.**
`public/PDF/` is gitignored so a copy kept on disk cannot be committed — anything under `public/`
is served, and serving is redistribution.

**The chapter links to the sujets instead** via `Chapter.outbound`, a manifest property rather than
a line in the route (#42's reasoning). **Attribution is not the fix**: the objection is that this
repo cannot license someone else's work, and a credit beside a hosted copy changes nothing. The link
is the one thing that fails offline, so nothing an épreuve needs hangs off it.

**The épreuves carry a written-out level, not `from()`** (#76). A DELF A2 épreuve is *superseded*
above: a B1 candidate sits the B1 exam. The first use of #76's exception.

## 79 · The tick is settable from a chapter's listing, beside the row's link
**2026-09-21 · Binding · extends #2, #48**

A chapter's listing now sets each lesson's tick, not just shows it — `RowTick`, one `<button>` per
row, handed to `PageRow` as a slot.

**Decided against a read-only row.** « J'ai terminé » under the prose serves whoever just finished
reading, and stays. The listing serves whoever did four lessons this afternoon, or offline: four
navigations and four scrolls, past a circle already showing the state. **Marking is still manual
(#2)** — a second place to press, never a way for the app to decide.

**The tick left the link, so the card is the `<li>`.** A `<button>` in an `<a>` is invalid, and one
press would toggle and navigate. Rejected: *the row a button with the title a link inside* (same
nesting, reversed); *the tick absolutely positioned over the link's padding* (target depends on
paint order, and a magic reserved width lets a long title slide under the circle). Chosen: *a
sibling in a flex `<li>`*, with border, ground and hover moved to the list item. The target is the
whole column past the hairline, a thumb wide and the row's height on a phone.

**Hovering the tick lights the whole row**, since the ground is the `<li>`'s and the project's CSS
has no `:has()`. Accepted: the row is one object. The tick's own hover fills toward the accent, and
a ticked one darkens rather than emptying, which would read as *already unticked*.

**A finished row tints**: `--success-soft` with `--success-line`, what « Leçon terminée » wears —
the circle alone was invisible down a chapter of fourteen. **One claim, one colour** (§5's `--danger`
rule cuts the same way for `--success`). Hover firms the border to `--success` and holds the ground,
rather than the accent taking over a done row.

**The two controls look like two**: a bare circle in the link's ground invited a press that would
navigate. The hairline is the link's so it can follow the row's state (`--success-line` when done),
which the tick's stylesheet cannot see.

**The state is read once, in the listing, and handed to both halves.** `PageRow`'s `done` tints;
`RowTick`'s `done` and `toggle` draw and change it. Two `isDone` reads would agree today and are the
arrangement #68 warns about: one refactor from two *different* claims.

**Signed out the listing draws no tick**, unlike #48's lesson control: one invitation under the
lesson, not forty down a chapter. Before the cache answers, the same silence, since an empty circle
claims « rien de terminé ». **The gate is the listing's**, because the row lays itself out around a
tick and a `RowTick` returning `null` would leave the space.

**Not extended to search results** (#76). Rows under « À d'autres niveaux » show material at a rung
the learner has not chosen; ticking there would key at their own level and record work on a variant
they were not looking at.

**`/ma-progression` is unchanged**; unticking from the record is a separate question.


## 80 · A scratch chapter: listed like the others, counted like nothing
**2026-09-22 · Binding · extends #18, #48, #51**

`temp` — « Atelier » on screen — holds the pages of a class in progress: written for one session,
shared on screen during a call, then promoted or deleted. It is the only chapter **emptied on
purpose**, and `Chapter.scratch` is what the app reads to know it.

**Decided against keeping it out of the repo** (a local folder, a branch, an outside document):
the class is given by sharing the app itself, and a page built elsewhere looks like something else.

**Decided against making it unlisted.** A `where`-style flag would teach `listedChapters()`, the
sommaire grid and search a new idea — readers that can drift — for a chapter whose value is being
**one click away in the middle of a lesson**. And nothing needs hiding: content is public (#18),
and the filter is on listings, not access (#35).

**Decided against letting it carry ticks**, the substance of the entry. A tick outlives the sitting
(#48); a page deleted on Sunday cannot hold one:

- **« La suite » jams.** `nextUp` returns the first unticked lesson, so an untickable one is a
  permanent first hole: the home page and `/ma-progression` would offer last week's page for ever,
  and nothing would fail. This is the one that would have shipped silently.
- **The denominator moves**, and a record that should only grow shrinks on a Monday.
- **The row outlives the page** — a tick recording that somebody finished something that no longer
  exists.

So `trackedChapters()` is what every counting or resuming reader walks, `LessonEnd` draws no
`DoneTick` and `ChapterLessons` passes no `RowTick`. Five readers of `chapters` behave differently,
and **nothing checks a sixth** — the field's comment in the manifest is the contract.

**Three conventions nothing enforces:**

- **An id carries its date and never comes back** (`temp-2026-09-22-terminaisons`). Ticks are filed
  under ids (#50), and a weekly chapter is where one slug plausibly means different material twice;
  reuse would resurrect ticks onto the wrong page.
- **Nothing permanent links in.** Cross-links fail soft (`AGENTS.md` §6), so the link would vanish
  at the next reset. Atelier pages may point out at lessons.
- **A removed page gets no redirect.** #50's redirect honours a promised URL; these were never
  promised, which is also why `sitemap.ts` lists the chapter and not its pages.

**Promotion is a new page, not a move**, with a fresh id and a real `levels` tag; no tick to carry
is what makes the reset free.

**Lessons here are tagged `ANY`**, never `from()`, so no filter hides the page being shared.

**A learner's own text may be reproduced here, anonymous.** Correcting what somebody actually wrote
is the point; invented errors teach a different lesson. The line is **personal information, not
authorship**: no name, age, school, town, class or date of birth in the page, the manifest, the file
comments or the commit message. Characters from the book or film summarised stay. A page that cannot
be written without saying whose it is stays out — a commit that lands a name can be reverted out of
the tree but not out of anyone's clone.

**What would reopen this.** Pages piling up for months, or someone outside the class working through
them: then it is an ordinary chapter wanting ticks, a syllabus position and a place in
`docs/programme-a1.md`. A scratch chapter that is never reset is misfiled.


## 81 · The atelier sits behind one shared password, in a proxy that knows nothing else
**2026-09-22 · Binding · extends #37, #80**

`src/proxy.ts` matches `/temp` alone, compares a cookie against a digest of `FRONTEND_PASSWORD`, and
sends anyone without it to `/entrer`, a door outside the course that sets the cookie and returns
them where they were going.

**It is not secrecy.** The atelier's texts are anonymous and public in the repo (#80); the password
keeps one class's chapter out of the way of passers-by, and nothing stronger should be built on it.

**Decided against an account.** Free to add, but an account is a learning path (#18), not a door,
and gating on it means the server reading a session — what #37 threw out. A shared password knows
no user.

**Decided against a layout that reads cookies.** `app/temp/layout.tsx` calling `cookies()` is five
lines, and silently opts every page under it out of prerendering (`AGENTS.md` §8). A proxy runs
*before* the cache, so the pages stay `○` in the build output and the gate costs one redirect.

**The door is outside the matcher.** Server Functions are POSTs to their containing route, so an
action under `/temp` would be intercepted before it could check anything. `/entrer` sits outside
and **re-does the check itself** rather than trusting the proxy — Next's own advice, and here the
only way it works.

**It fails closed.** No `FRONTEND_PASSWORD` means nobody enters, and `/entrer` says so. Open when
unconfigured would serve the atelier to everyone with nothing complaining.

**The cookie carries a digest, never the shared password**, which the inspector would otherwise
hand out. Comparisons are constant-time on both sides.

**Two functions, and conflating them already happened.** `atelierToken()` is what the *cookie*
holds; `atelierPasswordOk()` checks what a *visitor types*. Comparing the typed password to the
token type-checks, builds, lints and refuses everybody; only an end-to-end request caught it. Both
doc comments warn.

**`?vers=`, not `?suivant=`.** #70 gives `signInHref` sole ownership of `suivant`; two doors sharing
a parameter go wrong the day someone brings one's link to the other. The value is validated against
the `/temp` prefix, `//` included, so it is no open redirect.

**The chapter's row still shows to everyone.** Hiding it would need the client to know whether you
are in — a readable cookie and a hydration flash — for titles public in the repo anyway.

**What would reopen this.** A second thing needing a gate. A second path, a second password, or
anyone needing their own means authorization, and that is an account and RLS (#37), not a growing
proxy.

## 82 · An épreuve is marked once, at the end, and a person reads the listening one aloud
**2026-09-27 · Binding · amends #78**

#78's épreuves were static HTML: fields nobody read and a corrigé to compare by eye. Used to sit a
mock exam in class, that cost the candidate time on a Spanish keyboard (§1) and the tutor the hour
on arithmetic, and the fourth épreuve did not exist.

**A compréhension is clicked, and marked once, at the end.** Where the paper asks for a letter or a
justification copied out, the page offers options; a *vrai ou faux* is justified by choosing, among
three sentences **all taken from the document**, the one that proves it. « Corriger ma copie » marks
everything at once with the three shared states (§5) and gives the score per exercise and out of 25.
**Decided against marking as the candidate goes**, as a drill does: a ✓ on question one says
something about question two. Stored nowhere and never a tick (#2). The barème is data (`copie.ts`),
and `verifierCopie` throws at build if a split does not add up.

**A production has no corrigé on the page.** A grille that added itself up, and model texts, were
tried and removed: the tutor marks a written copy with a pen and a spoken one by ear, and a model a
click away is what gets copied. The écrite counts words as the exam does (whatever sits between two
spaces); the orale draws its subjects at random.

**The time is stated, never counted down.** The duration is in each épreuve's banner. The tutor keeps
time; a clock on screen is one more thing to watch instead of the text.

**The listening épreuve is read aloud by a person**, rather than waiting for the voice `dictees`
waits for: in the class it is for, the tutor *is* the recording. The texts sit behind their own
button, hidden like a corrigé because on the candidate's screen they are the answers, and are
written to be said. **The split 6 + 6 + 6 + 7 is the course's**: the published facts are four
exercises, fourteen short documents heard twice, three-option questions and 25 points, and no
citable source gives the split per exercise. A recording, if one arrives, is added, not substituted.

**The chapter is `untracked`: an épreuve carries no tick.** « J'ai terminé » under a mock exam taken
again next month says something false. `delf` takes the four progress readers of `scratch` (#80) —
no tick under the page or in the listing, out of `/ma-progression` and « La suite » — but not the
sitemap exclusion, since the chapter is permanent; that is why it is a second flag and not
`scratch`. `isTracked()` answers for both. Ticks stored before this are kept and no longer read.

## 83 · An épreuve may link a Commons photo as illustration, never as the answer
**2026-09-27 · Binding · narrows §9's image rule**

Seven signs of the écrits épreuve's first exercise carry a photograph **linked from Wikimedia
Commons, not copied into the repo**; the eighth, with no usable photo, is drawn inline.

**Why linked, against §9's « local files, never hotlinked ».** That rule exists because a remote
photograph is a lesson that goes blank in the métro. Here it is not the lesson: every sign keeps its
text under its picture and every question is answerable with the images gone, so offline a card
shows an empty frame and the épreuve still works. Linking was the maintainer's call, to keep binary
files out of the repo for illustration. **The condition is the whole exception**: an image an item
needs to be answered is content, and content is local.

**Decided against `next/image`**, which serves the file from the deployment — hosting it with extra
steps. A plain `<img>` with its size written out and a background on the frame.

**What did not change:** free licences only, and the credit (author, licence, link) lives in the
same data entry as the image and is printed under the grid — linking does not lift attribution.

## 84 · A written copy is handed in by downloading it, never by storing it
**2026-09-27 · Binding · extends #31, #82**

« Rendre ma copie » locks the production écrite and has the browser write a `.txt` file: the date
and time, then each exercise with its word count, in the subject's order, blank ones included. The
candidate sends it on; the tutor deletes it once corrected. Nothing leaves the device, it works
offline and signed out, and a reload gives a blank copy.

**Decided against a Supabase table.** It would reach the tutor with no step from the candidate, and
RLS already fits it. It lost because it is a new thing stored about an account, which #31 closes
by default, and a hand-run migration for one class. It is the answer if copies must ever arrive
unsent — as a new decision.

**Decided against a file on the server.** A Vercel function's `/tmp` belongs to one instance and
dies with it. Vercel Blob would work, at the cost of a public write route, a second secret beside
`FRONTEND_PASSWORD` (#81) and a second storage service beside Supabase (#8).
