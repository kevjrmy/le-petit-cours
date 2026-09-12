<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# le-petit-cours

A PWA teaching **A2 French to native Spanish speakers**. Next.js 16 (App Router), React 19,
TypeScript, plain CSS, deployed on Vercel; Supabase behind accounts and progress sync only.

**This file is the traps** — the rules a change breaks *silently*, one line each, with the
reasoning cited rather than retold. It is resident in every session, so it stays short. Anything
you only need while doing a particular job lives in the brief for that job; anything about *why* a
rule exists lives in `docs/decisions.md` as a numbered entry, and `#nn` below points at one.

| When you are… | Read |
|---|---|
| writing a prose lesson, a role-play, a reading or a dictée | `.claude/agents/lesson-author.md` |
| writing a drill or a game | `.claude/agents/exercise-author.md` |
| changing tokens, components or the shell's look | `.claude/agents/design-system.md` |
| adding, renaming, moving or removing a page or chapter | `.claude/agents/nav-wiring.md` |
| checking a page for regressions before shipping | `.claude/agents/page-auditor.md` |
| checking the French itself | `.claude/agents/content-proofreader.md` |
| asking *why* a rule is what it is | `docs/decisions.md` (#1–#60, dated, appended) |
| asking what is being built and for whom | `docs/scope.md` |
| arriving from GitHub, or contributing from outside | `README.md`, `CONTRIBUTING.md` |

**Section numbers here are load-bearing.** Source comments and every brief cite `AGENTS.md §n`.
Renumber a section and you break those pointers; change what a section is *about* and you break
them more quietly. Add inside a section instead.

## 0. Status — only what the repo cannot tell you

The manifest (`src/data/navigation.ts`) is the truth about what content exists; count it there
rather than trusting a number written in prose. The shell, the design system, auth and progress
are all built. What no amount of reading the repo will reveal:

- **Deployed on Vercel** at <https://lepetitcours.vercel.app>, building from `main`. Supabase
  project `ephdtigxjccfauzgexpd`, RLS on, legacy JWT keys disabled, two public env vars, no
  integration and no secret at rest (#20, #21).
- **Two settings are outstanding in the Supabase dashboard, and the repo cannot enforce either.**
  Public sign-up must be **off** (`disable_signup` was `false` on 2026-09-06 and the site has no
  sign-up form), and every account must be created with **« Auto Confirm User »** — confirmation is
  on and no mail can reach a `.test` address. Both are readable from the public `/auth/v1/settings`
  endpoint without opening the dashboard.
- **The schema is applied by hand in the dashboard editor**, not by a migration runner. Confirming
  a migration landed means the dashboard, or a signed-in tick that survives on a second device: an
  anonymous caller is refused `select` on both tables with `42501` at the grant level, so column
  names are not checkable from outside. If a probe ever returns rows, someone has run Supabase's
  suggested `GRANT SELECT … TO anon`; do not.

### `.vue/` is a reference shelf, not a codebase

The whole Vue app (119 lessons) sits there, committed to be *read* — chapter ordering, wording,
exercise mechanics that worked, and `.vue/AUDIT.md` for the classes of content bug that actually
shipped.

- **Never port a `.vue` file into TSX and call the lesson done** (#4). Lessons are written fresh.
- **Never import from it, never build it, never run its dev server.** It is outside the TypeScript
  project and its `node_modules` is not installed.
- **`.vue/AGENTS.md` and `.vue/.claude/agents/*.md` are the old briefs — do not follow them.** The
  durable parts were carried into the files at this level.
- Its lesson images were left out of HEAD; they are recoverable from commit `00c44c1`.

## 1. Audience — this drives every content decision

`docs/scope.md` has the full picture. **There are two profiles and they need opposite things.**

- **The learner** — native Spanish speaker acquiring French from zero. Fails at producing a
  sentence.
- **The heritage speaker** — French family, raised in Spain, fluent at home, never schooled in
  French. Needs **literacy**: accents, accord, homophones, the written form of conjugations she
  says correctly without thinking. Fails at writing down a sentence she can say perfectly. She is
  **not a level** — plausibly oral C1 and written A2 at once, so never reason about her with one
  CEFR badge (#13).

`grammaire`, `vocabulaire`, `conversation` lean to the learner; `orthographe`, `dictees`,
`astuces`, `conjugaison` lean to the heritage speaker.

- **Everything is written in French** (#53) — explanations, tables, callouts, drill instructions,
  chrome. No Spanish gloss, no translation column, no bilingual page. **The single exception is a
  `traduction` page's source text** (#55): Spanish may appear as *material to be translated*, never
  as explanation.
- **The reader is still a Spanish speaker, and that shapes the French you write, not the language
  you write it in.** Short sentences, everyday words, a rule stated before it is qualified. Print
  the wrong version beside the right one — « il est trois » is corrected on the page; *son las
  tres* is never printed on it.
- **A false friend is defined, not translated** — `robe`, `sol`, `carte`, `rester` earn a French
  definition and an example that makes the wrong reading impossible.
- **English is never used, for either profile.** No English glosses, no English mnemonics (never
  DR & MRS VANDERTRAMP).
- **A2 only, for now** (#52, superseding #25). `CHOOSABLE_LEVELS` holds `A2` alone; B1–C2 are
  declared, unchoosable, and carry no page. No literary tenses, no metalanguage beyond *verbe,
  sujet, adjectif, accord* — the heritage track is the one place that relaxes.
- **A level is complete when it covers the published DELF syllabus** (#15), not when it feels
  thorough.
- **The content is « le cours », never « le livre »** (#41). **leçon** a page, **chapitre** one of
  fifteen, **sommaire** the contents page, **parcours** an ordered path, **programme** a level's
  syllabus. In English prose, say *the course*.
- **Both profiles type on a Spanish keyboard.** `é è ê` cost a dead-key detour; `œ` and `ç` cannot
  be typed at all. A design constraint, not a footnote — see §9.

## 2. Stack and intended shape

`src/app` (routes), `src/components` (`shell/ account/ sommaire/ search/ nav/ lesson/ progress/
exercice/`), `src/data/navigation.ts` (the manifest), `src/hooks`, `src/lib`, `scripts/`,
`public/`. List the tree rather than trusting a copy of it here.

- **TypeScript everywhere.** React Compiler is on (`reactCompiler: true`) — **do not hand-write
  `useMemo`/`useCallback`** it would add for you.
- **Plain CSS** (#6, *inferred* rather than decided): tokens and shared content patterns in
  `globals.css`, component styles in co-located CSS Modules. No Tailwind, no utility libraries, no
  CSS-in-JS. A request for Tailwind reopens #6; it does not contradict this file.
- **Hosted on Vercel, not a static export** (#7). Lessons prerender; the server exists for auth.
- **Offline stays the point.** Serwist will provide the service worker and precaching —
  `vite-plugin-pwa` has no Next equivalent. **Not installed yet.**
- **Supabase for accounts and progress sync only** (#8). Content lives in git, reviewed in diffs.
  Exactly two env vars: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`. **If a
  `SUPABASE_*` or `POSTGRES_*` variable appears in the project env, an integration reconnected —
  delete it** (#21).

## 3. Next.js 16 — what differs from your training data

Read `node_modules/next/dist/docs/` before writing code. The traps that bite hardest here:

- **`params` and `searchParams` are Promises.** So are `cookies()`, `headers()`, `draftMode()`.
  Synchronous access is gone, not deprecated. `npx next typegen` generates `PageProps<'/route'>`.
- **Middleware is called Proxy** — `proxy.ts` beside `app/`, not `middleware.ts`.
- **`revalidateTag` takes a second argument** (a `cacheLife` profile); the one-argument form is a
  type error. For immediate expiry in a Server Action use `updateTag`.
- **Turbopack is the default bundler** for `next dev` and `next build`.
- **`next build` no longer prints `size` / `First Load JS`** — measure with Lighthouse rather than
  hunting numbers that were removed on purpose.
- **Next no longer overrides `scroll-behavior` during navigation.** With `scroll-behavior: smooth`
  in `globals.css`, `<html>` needs `data-scroll-behavior="smooth"` or every route change animates a
  long scroll to the top.
- **`next/image` changed** — read `01-getting-started/12-images.md` before using it.

## 4. Server and Client Components — where the line falls

**A lesson is a Server Component.** No `'use client'`, no hooks, no state. `'use client'` at the
top of a lesson means something is wrong with it.

**Interactivity is a leaf, not a wrapper.** A drill, a game, the theme toggle, the sidebar, the
tick — each as small as the interaction requires. Never mark a page client to get one button
working; lift the button out.

- **Browser storage does not exist on the server.** Reading it during render throws a hydration
  error. Fixes in order: a lazy `useState` initialiser inside a client leaf; or, only when the
  value must be right *before first paint*, an inline script in `<head>` plus
  `suppressHydrationWarning` on `<html>`. Progress and the level live in **IndexedDB**, which is
  async and so unavailable to a pre-paint script at all. **`localStorage` has exactly two jobs —
  the theme and the collapsed sidebar — and the list is closed** (#24, #42).
- **The theme must not flash.** Inline script, before paint, `data-theme` on `<html>`.
- **`window`, `document`, `speechSynthesis`, `navigator` are undefined during render**, in client
  components too. Touch them in an effect or an event handler.
- **The shell keeps its state across navigation** because it lives in the root layout and layouts
  do not re-render. That is why the sidebar is mounted in `app/layout.tsx`, never per-page.

## 5. Design system

`src/app/globals.css` owns the tokens, the reset, the base typography and every content pattern.
Palette and typography are settled (#27): accent `#0044AA` — the wordmark's own blue — with
**Spectral** and **Inter**. `/design` renders every pattern on one page.

- **A raw colour in a component is a bug.** Every colour comes from a token. The one exception is
  `viewport.themeColor` in `layout.tsx`, a browser API that takes literal colours; keep it in step
  with `--surface-app`.
- **Two layers, not three**: palette (never referenced from a component) and semantic
  (`--surface-*`, `--text-*`, `--border*`, `--accent*`, `--danger*`, `--warn*`, `--success*`). **Do
  not recreate the old `--clr-*` alias layer.**
- **One definition per token.** Both themes in a single `light-dark(light, dark)` value on
  `:root`; the toggle only flips `color-scheme`. **Never add a per-theme block to define a token** —
  that is how a token works in one mode and breaks in the other.
- **The serif carries the French being taught, the sans carries the explanation.** `.fr` and
  `.example` are Spectral; the prose around them is Inter. The split is by *role* (#53).
  `lang="fr"` is inherited from `<html>` — keep it only where an element is pronounced in isolation.
- **Red means "you got it wrong", so red is never decoration.** `--danger` is for a wrong answer
  and for `.exception`. Nothing else.
- **Colour is never the only carrier.** `.attention` prints « À retenir : », `.exception` prints
  « Sauf : », a drill's feedback carries a mark as well as a fill.
- **Dark mode is not optional** — check it every time (§11). Accessibility is part of the system,
  not a later pass: semantic HTML, `focus-visible` rings, `aria-label` on icon-only controls, a
  `<caption>` on every table.
- **The topbar is in the page, not over it** (#43, #44). No border, no blur. Sticky *only* below
  the drawer breakpoint, where it holds the only control that opens the sidebar, and painted in
  **`--surface-app`** so it occludes without reading as a band. **Do not give it a surface of its
  own** and do not pin it above the breakpoint.
- **Brand assets take their colour from the page** (#28). The glyph is always a CSS mask over a
  token, never an inline fill, so it follows the theme — in the sidebar's badge, `--text-on-accent`
  on an `--accent` disc, the app icon's construction at every width. **The wordmark is not drawn in
  the chrome**: it cannot survive the rail, and a head that changes shape at a breakpoint says twice
  what the badge says once. The icons are generated by `node scripts/make-icons.mjs`
  from `logo-mark.svg` — **never hand-edit a generated icon**. An icon must be **opaque**, and only
  the *maskable* pays for the safe zone.
- **Do not set `metadata.icons` in `layout.tsx`** — it replaces the `src/app/` file conventions
  rather than adding to them, and silently drops `icon.svg`.

## 6. Navigation

`src/data/navigation.ts` is the **single source of truth** for chapters, lessons, order, titles and
cross-links. **There is no auto-discovery**: a manifest entry with no `app/` folder is a link to a
404, and a `page.tsx` with no entry is a page nothing links to. `nav-wiring` owns that check.

**Levels and parcours.** Every lesson carries a set of CEFR tags; a **parcours** is an ordered path
through lessons that already exist (#14).

- **A parcours orders lessons, it never owns them.** Duplicating a lesson so two paths can each
  "have" it is the mistake this design prevents.
- **`levels` is required and `[]` means "always visible"** (#23) — an omitted field and a
  deliberate `[]` must not look the same in a diff.
- **The filter is on the listings, never on access** (#35). Signed out, everything shows. **Every**
  listing obeys the level except search (which groups rather than cuts) and `/ma-progression`
  (a record, not an offer). A lesson reached by direct link always renders in full — gating it
  would mean reading the session and would drag every lesson out of prerendering (§8).
- **Nothing in the interface announces a page that is not written** (#51). No `soon` flag, no entry
  without a folder. An empty chapter is dropped by `listedChapters(level)` and returns on its own
  with its first lesson. **Do not reintroduce a "coming soon" row in any form** — dimmed, disabled
  or counted.
- **Chapter landing pages are one route** — `app/[chapitre]/page.tsx` with `generateStaticParams`
  and `dynamicParams = false`, which is also what stops the segment swallowing unmatched paths.
  **The verb sheets are one route too** (#56), which costs the audit an extra line because the
  filesystem walk skips dynamic segments.

**The way in** (#39, #40):

- **`/` is a search field, not the contents**; the sommaire is at `/sommaire`. Arriving at a table
  of contents is arriving at a list of things you have not read.
- **The sidebar is one level deep: a chapter is a link, not a disclosure.** **Do not put the
  lessons back in it** — the answer to "it should show more" is the chapter page, or search.
- **Annexe position is a manifest property** (`where: top | tree | menu | footer`), never a list
  hand-copied into the components that render them. The footer holds pages *about the site*; the
  account popover holds only the account (#47).
- **`featuredChapterSlugs` is the one hand-kept list.** Fails soft; an empty chapter named there
  simply does not draw.
- **Search reads the manifest and nothing else** and **folds accents**, so *passe compose* finds
  « Le passé composé ». Searching lesson *prose* is a different feature.
- **`/recherche` is static** — the query is read by `useSearchParams` in a client leaf inside
  `Suspense`. Reading `searchParams` in the page would make the route dynamic.
- **Results are grouped by level, never cut by it.**
- **A route outside the course goes in `unlistedPages`**, which the audit reads.
- **The topbar never names the page you are on** (#45) — the `<h1>` is directly beneath it, and the
  crumb is now the only place a lesson names its chapter. **A fuller breadcrumb grows upward, never
  by putting the leaf back.**
- **One sidebar control, in the topbar, at every breakpoint.**

**Chapters carry an icon and a missing one does not compile** (#42). `IconName` is a union in the
manifest and `ChapterIcon`'s map is a `Record<IconName, …>`, so both directions are checked.
**There is no `default` entry and there must never be one** — a generic glyph makes a forgotten
chapter look deliberate. The icons are drawn in the repo, inline SVG, so they work offline. The
sommaire card's mark stays the chapter's initial in the serif.

- **A lesson's `id` is permanent; its path is not** (#50). Renaming needs a redirect in
  `next.config.ts`; **the id must not change in that commit or any other**, since changing one
  silently deletes every tick on that lesson. `navigation.ts` throws at import on a duplicate or
  malformed id.
- **Cross-links fail soft**, and so do the pills — a stale entry costs a link silently. **Four
  maximum.** The verb sheets' are derived, not typed (#56). The block is placed by `LessonEnd`, not
  by the lesson (#49).

## 7. Page types

| Chapter | Kind |
|---|---|
| `grammaire`, `orthographe`, `vocabulaire`, `astuces`, `musique`, `culture` | prose lesson |
| `conjugaison`, `prononciation` | **data-driven** — one component renders every page from a data file; never hand-write a table |
| `exercices` | graded drill, walked once, scored on screen and stored nowhere |
| `jeux` | replayable game, redraws every round, records nothing |
| `dictees` | listen, type, compare |
| `conversation` | **guided role-play** — a scene, the steps it follows, ~20 words to play it out of; no model dialogue, graded nowhere (#54, #57) |
| `traduction` | a short source text to write in French, three words uncoverable, then the model version; graded nowhere. The one chapter where Spanish appears (#55) |
| `lecture`, `litterature` | reading + comprehension quiz |

**An exercise is graded; a game is replayable.** That line is what stops `jeux/` becoming a second
`exercices/`: a game has no fixed deck, no lesson to record against, and pulls from the whole
course.

**A conversation page is neither — it needs a second person.** Producing your own turn cannot be
scored by a page (#54), and **the support stops at words** (#57): steps name the moves, a cloud
carries the vocabulary, nothing carries a sentence she could say instead of building her own.

## 8. Accounts, access and progress

**All content is public; an account is required only to keep a learning path** (#18). No auth wall,
no sign-up interstitial. Signing in buys the tick, the chosen level, and a position in a parcours.

### The rule that protects the architecture

**Never read the session in the root layout, or in any layout above a lesson.** Reading cookies
there opts every route underneath out of static prerendering and destroys the offline story — and
**nothing fails loudly**: the pages still render, they just stop being static. Auth lives at the
leaves. `AccountProvider` holds the session once, inside `AppShell`. **Check `next build`: a lesson
that has become dynamic is a regression, not a detail.**

### Auth

- **Sign-in is a route, `/compte`** (#26) — not a modal, so auth UI stays out of the shell every
  lesson renders inside. Entry is the account control at the foot of the sidebar, a popover that
  links to `/compte` and **never holds a form**. Signed out it offers « Se connecter » and never
  reports « Non connecté ». It learns who is signed in from `useAccount`, a **client** hook.
- **Supabase Auth, username and password** (#19, #37). The `@` decides: an address goes straight to
  Supabase, a username resolves through `email_for_username()`. **That function is an enumeration
  oracle**, tolerable only while every address is fake and the site is unlisted; the day a real
  address goes on an account, resolution must move server-side.
- **The username lives in `public.usernames`, unique and mutable** (#38), and **the app builds no
  email address anywhere**. `set_username()` mirrors it into user metadata in the same transaction;
  only those two functions write the mirror. **Never check whether a name is free before writing
  it** — that is both a race and a second oracle.
- Accounts are made by hand in the dashboard, which is why public sign-up must be off (§0).
- **Nothing on the server reads the session, at all** (#33, #37). There is no server Supabase
  client and this project needs **no session-refresh proxy**. **If a server client ever reappears,
  that is a new decision, not a restoration.**
- **RLS is the authorization model** — `auth.uid() = user_id`. Do not scatter permission checks
  through components.
- **The schema lives in `supabase/migrations/`, in git** (#22). Change it by adding a migration,
  never by editing a table in the dashboard. Running a *migration file's* SQL in the editor is
  fine; the file in git is the change.
- **An account holds a username, an email, a password, progress rows, a level and an optional
  display name. Nothing else.** No analytics, no behavioural tracking. The two settings live in
  user metadata (#36), so **no database constraint stands behind either** — the rules are in
  `src/lib/account.ts`, applied on read as well as write. **A setting that grants something, or
  that anyone else can see, belongs in a table with a constraint instead.** The bar for storing
  anything new is that a learner would notice its absence (#31).

### Progress

- **Marking is manual on every page type, drills included** (#2). A drill shows its score and
  stores nothing; finishing it never ticks it. **Do not auto-complete anything.**
- **A tick needs an account** (#48). Signed out the control is still drawn — not hidden, not
  disabled — and links to `/compte?suivant=<path>`, checked against the manifest rather than a
  pattern. **Do not add an anonymous browser-local tick**: storage alone is evicted without
  warning, and losing forty ticks silently is worse than saying what an account is for.
- **Keyed by `Lesson.id`, never by route path** (#50). Only lessons carry an id, so an annexe
  cannot be ticked.
- **Nothing touches storage directly** — every read and write goes through a `load()` / `save()`
  adapter, so the cache and the sync are two implementations of one interface. This seam was the
  best idea in the old app; keep it.
- **The local store is IndexedDB** (#24), keyed by account id so two people on one browser never
  see each other's ticks. **The local copy stays the read path** — the server is a sync target,
  never something a render waits on.
- **Offline is a queue of operations, not a snapshot** (#48) — otherwise an offline unmark is
  indistinguishable from a device that never saw the tick, and replaying it puts back what the
  learner removed.
- **The shell draws the end of a lesson** (#49): `LessonEnd` renders the tick then the cross-links,
  only when the path resolves to a lesson. **A lesson renders its prose and nothing else.**
- **A chapter's listing shows the tick, it never sets it.** `PageRow`'s `done` prop; `undefined`
  draws no circle, because signed out — and before the cache answers — there is nothing to report.
- **Counts use published lessons as the denominator.**
- **`/ma-progression` is the one listing that does not filter by level** (#48): it shows what she
  *did*, and a tick hidden by a level change would read as a lost tick.

## 9. Rules carried over from the Vue app

These cost real bugs in the old codebase. None of them care which framework renders them.

**Content**

- A lesson is **two or three sections**. A topic that needs more is two lessons.
- **A prose lesson closes with « En résumé »** — `.resume`, four or five bullets that restate the
  sections and add nothing, as the last child of the `<article>`. Prose chapters only.
  **A prose lesson gets no quiz of its own**; « Avez-vous compris ? » belongs to `lecture/`, where
  it checks a text. Practice is `exercices/`. `lesson-author.md` carries the page-type list.
- Tables: a `<caption>`, **four columns maximum**, and where a Spanish column once sat, an
  **example sentence** (#53). A table of forms with nothing anchoring them is a paradigm.
- **There is no PDF export and no print stylesheet** (#1). No `window.print()`, no `@media print`,
  no `.no-print`.
- **Lecture quizzes use `<button>` options, not hidden radios** — the click targets overlap and it
  breaks silently.
- **An astuce that has exceptions must state them.** "Pays en -e → en" is wrong for *au Mexique*.
- **Never restate a paradigm table in a second place.** Link to the lesson that owns the rule.

**Images** (only `culture/` has them)

- **Local files, never hotlinked** — a remote photograph is a lesson that goes blank in the métro.
- **Free licences only, credited** (CC0, PD, CC BY, CC BY-SA) with author, link and licence kept in
  the same data entry as the image, so the two cannot separate.
- **Look at what you downloaded.** Of the first thirteen from Commons, one had "Mont Blanc"
  scrawled across it in biro and one was sheep where the filename promised a volcano.

**Exercise data** — the failure mode is a drill that runs perfectly and teaches the wrong thing.
Nothing in the toolchain catches it. Full how-to in `.claude/agents/exercise-author.md`.

- **An `accept` list may hold case and accent variants, never a different number or gender.**
  `answer: 'croissants', accept: ['croissant']` marks *deux croissant* correct. Twenty-one shipped.
- **An item with two defensible answers is broken.** Disambiguate in French, inside the item.
- **Minimal-pair listening sets must contain no homophones** — `cent/sang/sans`, `vert/verre`.
- **Prefer clicking to typing when the answer carries French accents** (§1). Where type-in earns
  its place the field gets **`AccentBar`** — without it the drill marks a learner wrong for her
  keyboard, since `ç` and `œ` cannot be typed on a Spanish one.
- **Never `sort(() => Math.random() - 0.5)`** — biased; it served the already-correct sentence 9.5 %
  of the time. One shuffle implementation, imported.
- **A un/une game takes countable nouns only** — a mass noun has no singular indefinite article, so
  the question has no answer. Twenty shipped.
- **A validation check must count what it matched.** A regex that silently skips rows reports clean
  and grants false confidence.

## 9b. This is a public, open source repository

`github.com/kevjrmy/le-petit-cours` — MIT (code), CC BY-SA 4.0 (content).

- **Everything here is published**, including this file and the commit messages. Never commit a
  key, a token or a connection string. As it stands **no secret exists to commit**: the Supabase URL
  and publishable key are public by design, and the database password is stored nowhere. **No key
  that bypasses RLS belongs in the deployment env either** (#21).
- **You can only license what the project owns.** Anything copied from another course, textbook,
  app or website cannot go in — not as a lesson, not as an exercise item, not as a word list.

| Material | Rule |
|---|---|
| Literary text | Public domain **in its country of origin**; name the work and the year. For a translation the **translator's** death date is what counts (#60). |
| Song lyrics | Short excerpts for commentary only. **Never a full lyric sheet.** |
| Photographs | CC0, PD, CC BY or CC BY-SA only, stored locally, credited per image. |
| Anything else | Ask in an issue first. |

**When a rule here changes, check whether `CONTRIBUTING.md` states it too** — it repeats the
non-negotiable ones on purpose, and a contributor following a stale copy is a review you have twice.

## 10. Keeping the context files in sync

Treat them as part of the deliverable. **If behaviour and docs disagree, the change is not done.**

| File | Carries |
|---|---|
| `AGENTS.md` | the traps — what any change must not break, one line each |
| `.claude/agents/*.md` | the how-to for each recurring job |
| `docs/scope.md` | what is being built and for whom |
| `docs/decisions.md` | why the rules are what they are — dated, appended, never rewritten |
| `README.md` | what the project is, for a stranger |
| `CONTRIBUTING.md` | how an outsider proposes a change |

**This file says what is true now; `decisions.md` says when and why.** If you find yourself writing
"we used to…" here, it belongs there — and a dated sentence here will be wrong within the month.
Keep this file short enough to stay resident: a rule earns its place by being **silently violable**,
not by being interesting.

In the **same change**:

- Added / renamed / moved / removed a page → `navigation.ts`, the cross-links, and the redirect if
  a URL died.
- Changed how a page type is written → the owning brief, not just this file.
- Changed a shared pattern → the prose **and** every snippet demonstrating it, **and `/design`**.
- Closed an open decision → `docs/decisions.md`, with what it was decided against, and drop it
  from §12.
- Hit a bug worth not hitting twice → §9.

## 11. Verifying a change

```bash
npm run dev      # http://localhost:3000
npm run build    # must pass before you call a change done
npm run lint
```

**A dev server is usually already running in the maintainer's terminal.** Check before starting one
(`curl -sf -o /dev/null -w '%{http_code}' http://localhost:3000/`) and **never pattern-kill node**.

Touched navigation? Run the audit in `nav-wiring.md` — **all four lines must read `none`.** Nothing
else detects manifest/filesystem drift, and cross-links fail soft.

Check every visual change in **both themes** and at **all three shells** — open sidebar (≥ 75rem),
icons-only rail (56.25–75rem), mobile drawer (< 56.25rem). Most of this app's bugs live in exactly
one of those six combinations, and **the rail is the one nobody remembers**, because no default
window width lands in it.

```bash
node scripts/shot.mjs http://localhost:3000/<route> out.png --full            # light, sidebar
node scripts/shot.mjs http://localhost:3000/<route> out.png --full --dark     # dark
node scripts/shot.mjs http://localhost:3000/<route> out.png --width=1000      # the rail
node scripts/shot.mjs http://localhost:3000/<route> out.png --full --mobile   # the drawer
```

**Use the script, not Chrome flags** — `--blink-settings=preferredColorScheme=0` is ignored by
current Chrome and hands you a light screenshot in a file named `dark.png`. The script also strips
Next's dev-tools badge, which sits exactly where the sidebar's account control lives.

**A signed-in screenshot needs `--seed`**, which runs an expression on a first visit and reloads;
`--eval` runs too late, after the app has decided nobody is signed in. Without it the account menu,
`/compte`, `/ma-progression` and the done-tick can only be photographed signed out. `--eval` is
still how you force a chosen rail (`--width=1400
--eval="document.documentElement.setAttribute('data-rail','1')"`). `/design` is the specimen page
for a token change.

## 12. Open decisions

Recorded so nobody decides them by writing code. Closed ones are in `docs/decisions.md`.

1. **The authoring format for lessons** (#10). Deferred, but no longer neutral: React Native
   eventually and contributing teachers eventually both push toward **content-as-data**. Build the
   primitives, hand-write a few lessons, decide with evidence. **Do not build a pipeline yet.**
2. **Which chapters ship next.** A2 only is settled (#52); the order is not. `conjugaison` is built
   (#56). **`prononciation` needs a decision before it can be written**, because §7 makes it
   data-driven — a component before it is a lesson.
3. **Whether the heritage parcours gets its own front door.**
4. **Whether `.vue/` gets deleted** once the rewrite has outgrown it.
