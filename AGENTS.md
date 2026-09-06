<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# le-petit-cours

A PWA teaching **A2 French to native Spanish speakers**. Next.js 16 (App Router), React 19,
TypeScript, deployed on Vercel; Supabase behind accounts and progress sync.

Read this file before touching anything. The briefs in `.claude/agents/` carry the how-to for
each recurring job: **design-system** (tokens and component look), **lesson-author** (prose
lessons), **exercise-author** (interactive drills and their answer data), **nav-wiring** (the
manifest, the route folders, the cross-links), **page-auditor** (technical regressions) and
**content-proofreader** (the French and the Spanish themselves).

## 0. Status — the app is being rewritten

Between 2026-08 and 2026-09 this was a Vue 3 + Vite PWA of 119 lessons across 14 chapters. On
**2026-09-05** it was restarted on Next.js. Right now the repo holds the framework scaffold, these
context files and one migration; the shell, the design system and the lessons are all still to be
written.

What exists off the repo, as of 2026-09-06:

- **Deployed on Vercel** at <https://lepetitcours.vercel.app>, building from `main`.
- **Supabase provisioned** (`ephdtigxjccfauzgexpd`) with automatic RLS on and the legacy JWT keys
  disabled. Two public env vars, no integration, no secret at rest (#20, #21).
- **Supabase Auth is configured, with two things outstanding in the dashboard.** Sign-in is by
  username and password (#37), so the redirect allowlist no longer matters — nothing redirects.
  What does matter, and what the repo cannot enforce: **public sign-up must be turned off**
  (`disable_signup` was `false` on 2026-09-06, and the site has no sign-up form), and **every
  account must be created with « Auto Confirm User »** — confirmation is on and no mail can reach
  a `.test` address. Both are readable without the dashboard from the public
  `/auth/v1/settings` endpoint.
- **The schema is applied.** One migration, two tables: `public.progress` and `public.usernames`,
  with three functions, the trigger and the backfill (#38, 2026-09-06). Verified from outside — both
  accounts resolve (`email_for_username('kevin')` → `kevin@lepetitcours.test`), an unknown name
  returns `null`, a mixed-case one folds, and `set_username` refuses an anonymous caller with
  `28000`. An anonymous caller is refused `select` on **both** tables with `42501`, at the grant
  level, before RLS is even consulted. If a probe ever comes back with rows instead, someone has
  taken Supabase's helpful hint to `GRANT SELECT ON public.progress TO anon`; do not.
- **Auth works end to end**: the username-and-password form, the session provider, sign-out, the
  change-password field, the level chooser, the display-name field and the level filter. The
  database is done; the two dashboard settings above are not.

**Progress is written too** (#48): `src/lib/progress/` (the IndexedDB cache, the Supabase store and
the seam between them), `useProgress` inside the shell, the « J'ai terminé » control at the foot of
every lesson, and `/ma-progression`. Ticking needs an account; nothing else does.

The design system, the icons and the shell are written — `globals.css`, `src/data/navigation.ts`,
the sidebar in its three shells, the topbar and the chapter icons (§5, §6). **The way in is written
too**: `/` is a search field over the manifest, `/recherche` answers it, and the sommaire is at
`/sommaire`. The manifest declares fourteen chapters and three lessons are real; everything else is
`soon`. The lessons themselves are what is left.

`/a-propos` is deliberately down to a sentence and the licence (#46); its prose is owed a pass. It
is reached from the footer, not from the account popover, which holds only the account (#47).

**So most of this document describes intent, not code that exists.** Where a rule below names a
file, check whether that file is there yet. When you build the thing, make it match — and when
you decide it should work differently, change this file in the same commit.

### `.vue/` is a reference shelf, not a codebase

The whole Vue app sits in `.vue/`. It is committed so it is readable on GitHub, and it is there
to be *read*:

- **Read it for**: the shape of the course, chapter ordering, the wording of lessons, exercise
  mechanics that worked, `.vue/AUDIT.md` for the classes of content bug that actually shipped.
- **Never** translate a `.vue` file into TSX and call the lesson done. The lessons are written
  fresh — a deliberate decision, recorded as `docs/decisions.md` #4. A ported page inherits the old page's compromises and none of the
  new system's advantages.
- **Never import from it, never build it, never run its dev server.** It is not in the
  TypeScript project and its `node_modules` is not installed.
- Its lesson images (region photographs, dictée scans) were left out of HEAD. They are on disk
  and recoverable from commit `00c44c1` if a rewritten lesson wants one.

`.vue/AGENTS.md` and `.vue/.claude/agents/*.md` are the *old* briefs. They describe Vue
mechanics that no longer apply. The durable parts — the pedagogy, the data traps, the game
contract — have been carried into the files at this level. Do not follow the old ones.

## 1. Audience — this drives every content decision

Read `docs/scope.md` for the full picture. The short version, because it decides every sentence
you write: **there are two profiles, not one**, and they need opposite things.

**The learner** — a native Spanish speaker acquiring French from zero. Has Spanish and the
transfer it gives; lacks the language. Fails at producing a sentence.

**The heritage speaker** — French family, raised in Spain, fluent at home, never schooled in
French. Has the spoken language and native intuition; lacks **literacy** — spelling, accents,
accord, homophones, the written form of conjugations she says correctly without thinking. Fails at
writing down a sentence she can say perfectly.

She is not a level. A heritage speaker is plausibly oral C1 and written A2 simultaneously, so
never reason about her with a single CEFR badge. The chapters serve both: `grammaire`,
`vocabulaire` and `conversation` lean to the learner; `orthographe`, `dictees`, `astuces` and
`conjugaison` lean to the heritage speaker.

The rules that follow from this:

- **Language of instruction: Spanish for the learner track, French for the heritage track.**
  Explaining French spelling in Spanish to someone who already speaks French is a detour. Which a
  given page uses is a property of the page — see §12, it is not fully settled for pages both
  profiles read.
- **The interface itself is in French** — « J'ai terminé », « Bientôt », « Parcours », « Compte ».
  The *instruction* language varies by track; the chrome does not.
- **The whole content is « le cours », never « le livre »** (`docs/decisions.md` #41). It is a course
  with drills and games, not a printed thing — there is no PDF and no print stylesheet (#1) — and
  « le livre » is an A1 vocabulary word this course teaches on `/grammaire/les-articles`, so using it
  as chrome puts the word on screen meaning two things at once. The parts keep their own names and
  they are all taken: **leçon** a page, **chapitre** one of fourteen, **sommaire** the contents page,
  **parcours** an ordered path, **programme** a level's syllabus. In English prose — this file, the
  briefs, commit messages — say *the course*.
- **English is never used, for either profile.** No English glosses, no English mnemonics (never
  DR & MRS VANDERTRAMP). Never assume the reader knows English.
- **Lean on Spanish, and flag false friends** — `une robe` ≠ *la ropa*, `le sol` ≠ *el sol*. Where
  a structure already exists in Spanish (gendered articles, reflexives, verb families), say so:
  `se lever` ↔ *levantarse* teaches more than an abstract rule.
- **A1 first; A2 next.** The rewrite starts with A1 alone, sized to the DELF A1 syllabus rather
  than to parity with the old one (`docs/decisions.md` #25). A2 is in scope and unwritten; B1–C2
  are `soon` in the interface and have no content. Short
  sentences, everyday vocabulary, no literary tenses, no metalanguage beyond *verbe, sujet,
  adjectif, accord*. The heritage track may use school grammar vocabulary the learner track cannot
  — that is the one place this relaxes.
- **A level is complete when it covers the published DELF syllabus for that level.** Not when it
  feels thorough.
- **Both profiles type on a Spanish keyboard.** `é`, `è`, `ê` cost a dead-key detour, and `œ` and
  `ç` cannot be typed at all. A design constraint, not a footnote: see §9.

## 2. Stack and intended shape

```
src/
  app/
    layout.tsx            root layout: <html>, fonts, the theme script, the shell
    page.tsx              the home page: the search field and its pills
    globals.css           tokens, base, and the shared content patterns
    manifest.ts           the PWA manifest (Next file convention, not a static JSON)
    sommaire/page.tsx             the course, one card per chapter
    recherche/page.tsx            search results, static — see §6
    [chapitre]/page.tsx           every chapter landing page, one generated route
    {chapitre}/{lecon}/page.tsx   a lesson
    design/page.tsx               the design system specimen, in no manifest
    not-found.tsx, error.tsx      404 and the error boundary, both inside the shell
    ma-progression/page.tsx       the learner's record, one row per chapter
    sitemap.ts, robots.ts         derived from the manifest
    opengraph-image.png           the link-share card, generated by make-icons.mjs
  components/
    shell/                AppShell, AppSidebar, AppTopbar, AccountMenu, Footer, PanelIcon
    account/              SignInForm, AccountSettings, LevelChooser, ReturnTo — /compte's client half
    sommaire/             ChapterGrid, ChapterLessons, LevelNotice — the level-aware listings
    search/               SearchBox, StartPills, SearchResults
    nav/                  PageRow, ChapterIcon — shared by the listings
    lesson/               PageHeader, lessonMetadata, and LessonEnd — which draws the end of
                          every lesson (the tick, then RelatedLinks). The lesson patterns
                          themselves are CSS classes, not components.
    progress/             DoneTick, Progression — the client half of the tick and its page
    exercice/             the drill primitives
  data/
    navigation.ts         SINGLE SOURCE OF TRUTH for chapters, lessons, cross-links
  hooks/                  useAccount (+ AccountProvider), useProgress (+ ProgressProvider),
                          useShellMode  ('use client')
  lib/                    site.ts, account.ts, search.ts, supabase/client.ts,
                          progress/{store,local,remote}.ts — the seam and its two ends
scripts/                  shot.mjs (themed screenshots, --seed for signed-in), make-icons.mjs
public/                   brand assets (logo, logo-mark, PWA icons) and lesson images
```

Settled decisions:

- **TypeScript everywhere.** React Compiler is on (`reactCompiler: true` in `next.config.ts`) —
  do not hand-write `useMemo`/`useCallback` it would add for you.
- **Plain CSS.** Design tokens and shared content patterns in `globals.css`; component styles in
  co-located CSS Modules. No Tailwind, no utility libraries, no CSS-in-JS. (This follows from
  "fresh design system"; if Tailwind is ever wanted, that is a decision to take explicitly and
  record here, not to drift into.)
- **Hosted on Vercel**, not a static export. Lessons are static (prerendered); the server exists
  for auth and progress sync.
- **Offline stays the point.** This is a PWA a learner opens in the métro. Serwist will provide
  the service worker and precaching — `vite-plugin-pwa` has no Next equivalent and is not coming
  back. Not installed yet.
- **Supabase for accounts and progress sync only.** Content lives in the repo, in git, reviewed
  in diffs. The project is `ephdtigxjccfauzgexpd`, created in the Supabase dashboard, with no
  Vercel integration connecting the two (`docs/decisions.md` #20) — the env vars are set by hand
  and are exactly two: `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`, in
  `.env` and in all three Vercel environments. If a `SUPABASE_*` or `POSTGRES_*` variable ever
  appears in the project env, something reconnected an integration; delete it (#21).

## 3. Next.js 16 — what differs from your training data

Read `node_modules/next/dist/docs/` before writing code. The traps that bite hardest here:

- **`params` and `searchParams` are Promises.** So are `cookies()`, `headers()` and `draftMode()`.
  Synchronous access was removed in 16 — it is not deprecated, it is gone.
  `npx next typegen` generates `PageProps<'/route'>` / `LayoutProps<'/route'>` helpers.
- **Middleware is called Proxy.** `proxy.ts` at the same level as `app/`, not `middleware.ts`.
- **`revalidateTag` takes a second argument** (a `cacheLife` profile). The one-argument form is a
  type error. For immediate expiry in a Server Action, use `updateTag`.
- **Turbopack is the default bundler** for `next dev` and `next build`.
- **`next build` no longer prints `size` / `First Load JS`.** Measure with Lighthouse instead;
  do not go looking for numbers that were removed on purpose.
- **Next no longer overrides `scroll-behavior` during navigation.** If `globals.css` sets
  `scroll-behavior: smooth`, add `data-scroll-behavior="smooth"` to `<html>` or every route
  change animates a long smooth scroll to the top. The Vue app solved this in the router's
  `scrollBehavior`; there is no router file to solve it in any more.
- `next/image` changed in 16 — read `01-getting-started/12-images.md` before using it.

## 4. Server and Client Components — where the line falls

This is the biggest change from Vue, and the one that decides where every file goes. In the Vue
app every component was interactive by default. Here the default is the opposite, and that is
worth keeping.

**A lesson is a Server Component.** Prose, tables, examples, callouts — no `'use client'`, no
hooks, no state. It prerenders to HTML, ships no JavaScript, caches well and works offline
trivially. If a lesson file has `'use client'` at the top, something is wrong with it.

**Interactivity is a leaf, not a wrapper.** A drill, a game, the audio button, the theme toggle,
the sidebar, the « J'ai terminé » tick — those are Client Components, and they should be as small
as the interaction requires. Never mark a page client just to get one button working: lift the
button into its own client component and leave the page on the server.

Consequences to plan for, none of which existed in the Vue app:

- **Browser storage does not exist on the server.** Anything reading it — the theme, progress
  ticks, a drill's saved state — renders one thing on the server and another on the client, and
  React throws a hydration error. The fixes, in order of preference: read it in a lazy
  `useState` initialiser inside a client leaf; or, when it must be correct *before first paint*
  (the theme is the case that matters), set it from an inline script in `<head>` and put
  `suppressHydrationWarning` on `<html>`. Note that progress and the chosen level live in
  **IndexedDB**, which is async and therefore unavailable to a pre-paint script at all — only the
  theme and the collapsed sidebar can use that escape hatch, and only because they are in
  `localStorage` — **two jobs, and the list is closed** (`docs/decisions.md` #24, #42). The test is
  not the count: it is that a value must be right before first paint and is one short string nobody
  would mourn. See
  `node_modules/next/dist/docs/01-app/02-guides/preventing-flash-before-hydration.md`.
- **The theme must not flash.** A dark-mode learner seeing a white page for 200 ms on every cold
  load is a real regression against the Vue app, which never had one. Inline script, before
  paint, `data-theme` on `<html>`.
- **`window`, `document`, `speechSynthesis` and `navigator` are undefined during render**, in
  client components too. Touch them in an effect or an event handler.
- **The shell keeps its state across navigation** — sidebar scroll position, the open drawer, the
  collapsed rail — because it lives in the root layout and layouts do not re-render on navigation. That is the
  Next equivalent of the old "the shell lives in `App.vue`, not in a layout" rule, and it is why
  the sidebar must be mounted in `app/layout.tsx` rather than per-page.

## 5. Design system

**Written from scratch, and now written.** `src/app/globals.css` holds the two token layers, the
reset, the base typography and the content patterns every lesson uses; component styles go in
co-located CSS Modules. `.vue/src/style.css` was not ported — not its components, not its tokens.
Read it only for the list of problems a system like this has to solve (theme-aware surfaces, table
chrome, exercise feedback states, a readable column width); the answers here are new ones.

The palette and typography are settled — `docs/decisions.md` #27. The accent is `#0044AA`, the blue
the wordmark in `public/logo.svg` is already drawn in, so the brand colour and `--accent` are the
same colour by construction. The two faces are **Spectral** (Production Type, Paris) and **Inter**.

The rules:

- **A raw colour in a component is a bug.** `#4CAF50`, `white`, `rgba(0,0,0,.5)` — each one
  freezes that component in light mode. Every colour comes from a token. The one exception is
  `viewport.themeColor` in `layout.tsx`, which is a browser API that takes literal colours; keep
  those two values in step with `--surface-app`.
- **Two layers, not three.** Palette (raw scales, never referenced from a component) and semantic
  (`--surface-*`, `--text-*`, `--border*`, `--accent*`, `--danger*`, `--warn*`, `--success*`).
  The old system had a third layer of `--clr-*` aliases kept for compatibility with views written
  before the tokens existed. **Do not recreate it.** There is no legacy to be compatible with.
- **One definition per token, not three.** Both themes live in a single `light-dark(light, dark)`
  value on `:root`, and the explicit toggle only flips `color-scheme`. This is deliberate: the old
  arrangement — `:root`, a `prefers-color-scheme` block and a `[data-theme="dark"]` block — meant a
  token could be defined in two of the three places, work in whichever mode you happened to be
  testing, and break in the other. That bug class no longer has anywhere to live. **Never
  reintroduce a per-theme block to add a token.**
- **The serif carries the French, the sans carries the instruction.** `.fr` (always with
  `lang="fr"`) and `.example` set French example material in Spectral; everything explaining it is
  Inter. The split is by role, not by track — an orthographe page written in French for the
  heritage speaker still sets its explanation in sans and its example words in serif. The `lang`
  attribute is not decoration: it picks the voice for `useSpeech` and stops a screen reader reading
  French with a Spanish accent.
- **Red means "you got it wrong", so red is never decoration.** In a course of graded drills, an
  ornamental red teaches the learner to distrust the one signal that has to be trusted. `--danger`
  is for a wrong answer and for `.exception`, and nothing else.
- **Dark mode is not optional.** Check it, every time — see §11.
- **Colour is never the only carrier** of meaning. A state that is red also says something:
  `.attention` prints « À retenir — », `.exception` prints « Sauf — », a drill's feedback carries a
  mark as well as a fill.
- Accessibility is part of the design system, not a later pass: semantic HTML, `focus-visible`
  rings, `aria-label` on icon-only controls, a `<caption>` on every table.

**The topbar is in the page, not over it — and it is sticky only where it has a job.** No border, no
blur, no surface of its own. Above the drawer breakpoint it is in normal flow and scrolls away.
Below the breakpoint it is `sticky`, because down there it holds the only control that opens the
sidebar (`docs/decisions.md` #43, #44).

Sticky and transparent cannot be had together — page text sliding under a breadcrumb leaves neither
readable — so the sticky half is painted in **`--surface-app`**, the page's own ground. It occludes
what passes beneath it and is invisible as a band, which is the whole point. **Do not give it a
surface of its own**: `--surface-bar` was translucent and blurred, and it is gone. Do not pin it
above the breakpoint either; there is no opener up there to keep within reach.

**The mark is one letter of the wordmark.** `public/logo-mark.svg` is the cursive **P** lifted from
the "Petit" of `public/logo.svg` — the same Playwrite FR Trad outlines, so the icon and the logo are
literally the same hand. It exists because a wordmark cannot be an icon: eleven letters of hairline
script do not survive 48 px, and Android's circle leaves no room for them. One letterform does.

Both brand assets take their colour from the page rather than carrying it:

- **The wordmark** is painted as a CSS mask (`mask: url(/logo.svg)` over `background-color:
  currentColor`), so it follows the theme. An `<img>` would stay `#0044AA` and go muddy on the dark
  surface.
- **The icons** are generated — white P on an opaque `#0044AA` ground, by
  `node scripts/make-icons.mjs` from `logo-mark.svg`. **Never hand-edit a generated icon**; change
  the SVG or the script and rerun. The script writes `public/pwa-*.png`, the maskable, and the three
  `src/app/` file conventions (`favicon.ico`, `icon.svg`, `apple-icon.png`).

Two traps it already pays for: an icon must be **opaque** — the previous `pwa-192x192.png` was
transparent and vanished into a dark home screen — and only the **maskable** pays for the safe zone,
because a glyph shrunk to survive Android's circle is a glyph too small everywhere else.

**Do not set `metadata.icons` in `layout.tsx`.** It replaces the `src/app/` file conventions rather
than adding to them, and silently drops `icon.svg` from the head.

## 6. Navigation

`src/data/navigation.ts` is the **single source of truth** for chapters, lessons, order, titles
and the cross-link map. The sidebar, the sommaire and every chapter landing page read from it.
There is no auto-discovery: a lesson that is not in the manifest exists at its URL and is
reachable from nothing.

The App Router changes this job in one specific way, and it is worth being precise about it,
because it removes the single most common bug in the old app and introduces a new one.

- **Gone**: the explicit route table. `.vue/src/router/index.js` listed all 164 routes by hand
  and had to agree with the manifest; nothing checked it, and a missing line meant a dead sidebar
  link. Routes are now the filesystem — a folder with a `page.tsx` *is* the route.
- **New**: a manifest entry with no matching `app/` folder is a link to a 404, and a `page.tsx`
  with no manifest entry is a page nothing links to. The check is now manifest ↔ filesystem
  rather than manifest ↔ router, and `nav-wiring` owns it.

### Levels and parcours

The manifest carries a second axis. Every lesson carries **a set of CEFR level tags** — a page that
serves both A1 and A2 is tagged with both rather than duplicated — and a **parcours** is
an ordered path through lessons that already exist:

- `Parcours A1` and `Parcours A2` follow the DELF syllabus.
- A heritage parcours (« Écrire le français ») walks the orthography and conjugation pages in
  remediation order.

**A parcours orders lessons; it never owns them.** A lesson belongs to its chapter, appears in the
course, and is referenced by however many parcours want it — including none. Duplicating a lesson so
two paths can each "have" it is the mistake this design exists to prevent.

**An empty set means always visible.** `culture` and `musique` are not A1 or A2 material; they are
for whoever wants to read them. So `levels` is a **required field** on every entry and `[]` is the
way to say "no level" — never an omitted field. Forgetting to tag a page and deciding it needs no
tag must not look identical in a diff, and a required field makes the first one a type error.

**The filter is on the listings, never on access.** Signed in, a listing shows a lesson when its
`levels` is empty or contains the learner's level. Signed out, it shows everything. **Every**
listing obeys it — the sommaire's counts, the chapter pages and the sidebar; the two exceptions are
search, which groups by level rather than cutting, and `/ma-progression`, which is a record of what
the learner did rather than an offer (#48) — because a sidebar
saying seven beside a card saying one reads as a bug rather than as a filter. Either way a
lesson reached by direct link — a cross-link, a bookmark, a search result — renders in full: an A1
learner following "pour aller plus loin" into an A2 page gets the page. Gating it would mean reading
the session to decide whether a page renders, which §8 forbids precisely because it would drag every
lesson out of static prerendering. The level decides what the course **offers**, not what it permits.

B1–C2 are declared and empty. They render as *bientôt* and are filtered out, the same mechanism as
a `soon` lesson — **not** a separate code path, and not an excuse to write B1 content early.

**Chapter landing pages are one route, not fourteen.** `app/[chapitre]/page.tsx` renders every
chapter from the manifest via `generateStaticParams`, with `dynamicParams = false` so an unknown
slug 404s rather than being rendered on demand — which is also what stops the segment swallowing
every unmatched top-level path. Adding a chapter to the manifest gives it a landing page; there is
nothing to write.

### The home page, the sommaire and search

**`/` is a search field, not the contents.** The home page is the wordmark, one large field and a short
row of pills; the sommaire — the fourteen chapter cards — lives at **`/sommaire`**
(`docs/decisions.md` #39). Arriving at a table of contents is arriving at a list of things you have
not read; arriving at a field is arriving at the one you came for.

- **The sommaire is an annexe with `where: "top"`**, so the sidebar puts it *above* the chapters
  rather than at the foot with « Nouveautés ». `Annexe.where` is `top | tree | menu | footer` — the
  position is a property of the page in the manifest, never a list hand-copied into the four
  components that render them. The footer is where a page *about the site* goes: « À propos » is
  there, not in the account popover, which holds what belongs to the account.
- **The sidebar is one level deep: a chapter is a link, not a disclosure.** It lists the fourteen
  chapters and nothing else; the lessons live on the chapter's own landing page, one click away
  (`docs/decisions.md` #40). A tree that opened was fine at three lessons and unusable at the
  hundred and nineteen this course is heading for. **Do not put the lessons back in it** — the answer
  to "the sidebar should show more" is the chapter page, or search.

- **The pills are the one hand-kept list in the manifest.** `featuredChapterSlugs` — a few chapters,
  then « Tout le cours » to the sommaire, which is what keeps the short list from being a ceiling.
  They fail soft like cross-links, so the `nav-wiring` audit has a fourth line for them.
- **Search reads the manifest and nothing else** (`src/lib/search.ts`): titles, subtitles, tags,
  blurbs and DELF descriptors, for lessons, chapters and annexes alike. No index to build, no fetch,
  and it works offline — which is the point. **It folds accents**, because both profiles type on a
  Spanish keyboard and *passe compose* has to find « Le passé composé » (§1). Searching lesson
  *prose* is a different feature and is not this one.
- **`/recherche` is static.** The query lives in the URL and is read by `useSearchParams` in a client
  leaf inside a `Suspense` boundary. Reading `searchParams` in the page instead would make the route
  dynamic, and §8's rule is not only about lessons.
- **Results are grouped by level, never cut by it.** Every other listing filters (below); a page
  someone typed the name of is not an offer, so out-of-level matches keep a labelled group of their
  own. Cutting them would answer « ça n'existe pas » about a page that exists.
- **A route outside the course goes in `unlistedPages`** — `/`, `/recherche` and `/design`. Nothing
  renders it; the `nav-wiring` audit reads it, so a page that is in neither the manifest nor that
  list is reported rather than existing unlinked and unnoticed.
- **The topbar never names the page you are on.** The `<h1>` is directly beneath it and every lesson
  header already prints its own chapter, so a crumb ending in the page's own title is the title
  twice — and « Accueil » over the home page is the reductio. What it shows is the trail *above* the
  current page, which today is one link: a lesson's chapter. Top-level pages show nothing, which is
  correct rather than empty. **A fuller breadcrumb grows upward, from the ancestors — never by
  putting the leaf back** (`docs/decisions.md` #45).
- **One sidebar control, in the topbar, at every breakpoint.** It opens the drawer below the
  breakpoint and collapses the panel above it, and it sits against the edge the panel is on. There
  is no second control at the foot of the sidebar — that was two buttons in two places for one idea.

**Chapters carry an icon, and a missing one does not compile.** `icon: IconName` is required on
every chapter and on every annexe the sidebar draws, because at the tablet breakpoint the sidebar is
icons only and a row with no mark is a row with nothing in it. `IconName` is a union declared in the
manifest and `ChapterIcon`'s map is a `Record<IconName, …>`, so **both** directions are checked: a
chapter with no icon is a type error, and an icon nothing names is a visibly dead key. There is no
`default` entry and there must never be one — that fallback is exactly what #29 removed the field
over, because a forgotten chapter rendered a generic glyph and looked deliberate (#42).

**The icons are drawn in the repo, not installed.** One file of stroke paths on the same 24-grid as
the rest of the chrome. They are inline SVG in the bundle, so they work offline — the property that
mattered about the Vue app's `unplugin-icons` setup, kept without the dependency or the third-party
licence.

**The sommaire card mark is still the chapter's initial in the serif.** Different surface, different
mark: a card has room for lettering and the identity of this project is lettering. #29's reasoning
holds there and only there.

Two things still need deliberate care:

- **Renaming a lesson's path orphans every progress tick on it** (§8). A rename adds the old path
  to `pathAliases` in the same commit, and a redirect in `next.config.ts` so bookmarks survive.
- **Cross-links fail soft**, and so do the home page's pills. Both drop a target they cannot resolve
  rather than erroring, so a stale entry costs a link silently. Four cross-links maximum; more is a
  second nav menu. The block itself is placed by `LessonEnd`, not by the lesson (#49), so a page
  cannot lose its cross-links by forgetting to render it — only `relatedPages` can be wrong, and
  that is what the audit's third line reads.

## 7. Page types

Carried over from the Vue app, because the taxonomy was sound and the content will be too:

| Chapter | Kind |
|---|---|
| `grammaire`, `orthographe`, `vocabulaire`, `astuces`, `musique`, `culture` | prose lesson |
| `conjugaison`, `prononciation` | **data-driven** — one component renders every page from a data file; never hand-write a table |
| `exercices` | graded drill, walked once, scored on screen and stored nowhere |
| `jeux` | replayable game, redraws every round, records nothing |
| `dictees` | listen, type, compare |
| `conversation` | gap-fill dialogue |
| `lecture`, `litterature` | reading + comprehension quiz + hidden Spanish translation |

**An exercise is graded; a game is replayable.** That one line is what stops `jeux/` becoming a
second `exercices/`, and it drives everything else: a game has no fixed deck to score out of, no
lesson to record against, and pulls from the whole course rather than practising one page.

Which of these chapters the rewrite ships, and in what order, is not decided. The taxonomy is
here so that when a chapter does land it lands in the right shape.

## 8. Accounts, access and progress

### The access model, in one line

**All content is public; an account is required only to keep a learning path.** Every lesson,
drill and game is readable and playable with no account — no auth wall, no sign-up interstitial,
nothing gated. Signing in buys you the tick, the level you chose, and your position in a parcours,
kept across devices.

### The rule that protects the architecture

**Never read the session in the root layout, or in any layout above a lesson.** Reading cookies
there opts every route underneath out of static prerendering, which would make the whole course
dynamic and destroy the offline story. Public content is what lets lessons prerender; a stray
`await createClient().auth.getUser()` in `layout.tsx` throws that away in one line, and nothing
will fail loudly when it happens — the pages still render, they just stop being static.

Auth lives at the leaves, exactly like the account menu (§4). The « J'ai terminé » control knows
whether you are signed in. The lesson wrapping it does not, and stays static HTML.

**`AccountProvider` holds the session, once, inside `AppShell`.** One subscription and one answer:
two components each keeping their own copy would disagree the moment one saved a new name, and the
sidebar would show the old one until a reload. It sits inside the shell's existing client boundary,
so nothing above it reads the session and every route stays static — check it in `next build`.

Check it in the `next build` output: a lesson that has become dynamic is a regression, not a
detail.

### Auth

**Sign-in is a route: `/compte`** — not a modal, so it is linkable and auth UI stays out of the
shell every lesson renders inside (`docs/decisions.md` #26). **The entry point is the account
control at the foot of the sidebar**, which opens a popover holding the link, « Ma progression »
and the theme — and nothing about the site itself; it links to `/compte` and never holds a form.
Signed in it shows the learner's display name if they set one and their username otherwise — never a bare "no name",
because an account holds no other identity (#22, #31) — with the **address** on the line beneath.
Not the username again: once a display name is set, repeating the username twice tells the learner
nothing, and the address is the one field that still distinguishes two accounts. Signed out it
offers « Se connecter » and never reports « Non connecté »: reading without an account is the
intended way to use the site, not a fault to name. It learns who is signed in from `useAccount`, a **client** hook, so the layout above it never
reads the session. `/compte` is also where a learner chooses their level (#23) — asked once,
immediately after the first sign-in — and where they set their display name (#31). Everything on
that page that needs the session lives in a client leaf, so the route itself never reads it.

**Supabase Auth, username and password.** Chosen over Clerk because progress rows live in Supabase
Postgres, so `auth.uid()` in a row-level-security policy ties a row to its owner with no glue code
— see `docs/decisions.md` #19 for the full reasoning.

**Sign-in takes either a username or an email address** (#38). The `@` decides: an address goes
straight to Supabase, a username is resolved first through `email_for_username()` — a
`security definer` function granted to `anon`, because sign-in happens with no session and cannot
read a table. **That function is an enumeration oracle**, accepted only while every address is a
fake one and the site is unlisted; the day a real address goes on an account it leaks it, and
resolution must move server-side.

**The username lives in `public.usernames`, unique and mutable** — it is not derived from the email
any more, and **the app builds no email address anywhere**. `@lepetitcours.test` is now only a
string typed into the dashboard when an account is made. The table is the authority for uniqueness;
`set_username()` mirrors the name into user metadata in the same transaction so it can be read
offline, and **only those two functions write the mirror**. Uniqueness is enforced by the
constraint — never check whether a name is free before writing it, which would be both a race and a
second oracle.

Accounts are still made by hand in the dashboard and handed over, which is why public sign-up has to
be off there; a trigger claims a username from the email's local part, since that form has no
username field. A forgotten password is reset the same way — there is no address to mail a link to,
and that is what the change-password field on `/compte` exists to soften.

**Nothing on the server reads the session, at all.** `signInWithPassword` returns a session in the
browser, so there is no code to exchange and no server client in the app — `/auth/callback` and
`src/lib/supabase/server.ts` were deleted with the magic link (#37). §8 is therefore a property of
the codebase rather than a discipline: every route is static in `next build`, and this project needs
**no session-refresh proxy** — the `proxy.ts` a Supabase + Next app normally carries exists to keep
server renders' tokens fresh, and no server render here reads a token. **If a server Supabase client
ever reappears, that is a new decision, not a restoration.**

**RLS is the authorization model.** `auth.uid() = user_id` on the progress table. Do not scatter
permission checks through components; if a rule needs to change, it changes in the policy.

**The schema lives in `supabase/migrations/`** — two tables now, `progress` and `usernames` (#38) —
in git, reviewed in a diff like everything else (`docs/decisions.md` #22). Change it by adding a
migration, never by editing a table in the dashboard — a dashboard edit is a change nobody can
review and nobody can replay. Running a *migration file's* SQL in the dashboard editor is fine; it
is the file in git that is the change.

An account holds a username, an email, a password, progress rows and settings — the settings are a
chosen CEFR level and an optional display name. **Nothing else.** The email is real storage but a
fake value: every account has an `@lepetitcours.test` address nobody can receive mail at (#37). No
analytics on learners, no behavioural tracking — that is a principle in `docs/scope.md`, not an
oversight to correct.

**The two settings are not in a table of ours.** The level and the display name live in the
account's user metadata on `auth.users`, and arrive with the session (#36) — unlike the username,
which earned a table by needing uniqueness (#38). That means **no database constraint stands behind either value** — the rules live in
`src/lib/account.ts` and are applied on read as well as on write, so a value written by some other
route cannot reach the interface malformed. It is an acceptable trade only because neither value is
an identifier, neither grants anything, and both are visible to their owner alone. **A setting that
ever grants something, or that anyone else can see, belongs in a table with a constraint instead.**
The bar for storing anything new at all is that a learner would notice its absence; "it might be
useful later" is not a reason (#31).

### Progress

**Written, as of 2026-09-06** — `src/lib/progress/`, `useProgress`, the « J'ai terminé » control and
`/ma-progression` (#48).

**Marking is manual on every page type, drills included.** A drill shows its score at the end and
stores nothing; finishing it never ticks it done. That is the learner's call, and a half-remembered
pass at 50 % is not a finished lesson. Do not "helpfully" auto-complete anything. Returning from
sign-in does not tick the lesson either.

**A tick needs an account** (#48). Signed out the control is still drawn — not hidden and not
disabled — and links to `/compte?suivant=<path>`, which brings the learner back afterwards. This is
the one thing on the site an account is needed for; no *content* moved behind it. **Do not add an
anonymous browser-local tick**: storage alone is evicted without warning, and losing forty ticks
silently is worse than saying plainly what an account is for. `?suivant=` is checked against the
manifest rather than against a pattern — `//ailleurs.example` starts with a slash and leaves the
site.

- **Keyed by route path**, which the manifest guarantees unique.
- **Nothing touches storage directly.** Every read and write goes through an adapter with a
  `load()` / `save(state)` pair, so the local cache and the Supabase sync are two implementations
  of one interface and no component knows which is in play. This seam was the best idea in the old
  app; keep it.
- **The local store is IndexedDB**, not `localStorage` — chosen for durability, since a browser
  evicting a learner's progress is a real loss and `localStorage` is the first thing to go
  (`docs/decisions.md` #24). The adapter is therefore async on both sides, which is what the seam
  was for. `localStorage` keeps exactly one job: the theme, which must be read before first paint.
  The cache is **keyed by account id**, so two people on one browser never see each other's ticks.
- **Offline is a queue of operations, not a snapshot.** A tick made with no connection is stored as
  *mark* or *unmark* and replayed onto whatever the server holds when it returns. A snapshot instead
  would make an offline unmark indistinguishable from a device that never saw the tick, and
  replaying it would put back what the learner removed (#48).
- **The local copy stays the read path.** This is an offline PWA: a signed-in learner ticking a
  lesson underground writes locally and syncs on reconnect. The server is a sync target, never
  the thing a render waits on.
- **The done-tick is rendered by the shell, not by pages** — and so is « Pour aller plus loin ».
  `LessonEnd` draws both, in that order, and only when the current path resolves to a lesson in the
  manifest, which is what keeps them off chapter landing pages and annexes with no allowlist to
  maintain. **A lesson renders its prose and nothing else** (#49): adding one needs no progress work
  and cannot forget its own cross-links.
- Counts use published lessons as the denominator, so announced-but-unwritten entries never make
  a finished chapter look unfinished.
- **Renaming a lesson path orphans every tick on it** — see §6 for the `pathAliases` discipline
  that goes with a rename. `canonicalPath()` applies an alias on **read as well as write**, so a
  tick stored under the old path before the alias existed still finds its lesson.
- **`/ma-progression` is the one listing that does not filter by level** (#48). Every other listing
  shows what the course *offers* at the learner's level; this one shows what they *did*, and a tick
  hidden because they moved from A2 to A1 would read as a lost tick.

## 9. Rules carried over from the Vue app

These cost real bugs in the old codebase. They are about French, learners and data — none of
them care which framework renders them, and every one of them will bite again.

**Content**

- A lesson is **two or three sections**. A topic that needs more is two lessons.
- Tables: a `<caption>` for screen readers, **four columns maximum**, translation column in
  Spanish.
- **There is no PDF export and no print stylesheet.** Removed 2026-08-26. Do not add a
  `window.print()` button, an `@media print` block or a `.no-print` class.
- **Lecture quizzes use `<button>` options, not hidden radios** — the click targets overlap and
  it silently breaks.
- **An astuce that has exceptions must state them.** "Pays en -e → en" is wrong for *au Mexique*.
  A shortcut presented as absolute teaches a mistake.
- **Never restate a paradigm table in a second place.** Link to the lesson that owns the rule, so
  the two cannot drift apart.

**Images** (only `culture/` had them)

- **Local files, never hotlinked.** A remote photograph is a lesson that goes blank in the métro.
  Whatever precaching Serwist is configured with must cover the format used.
- **Free licences only, and credit them** — CC0, public domain, CC BY, CC BY-SA — with author,
  link and licence, kept in the same data entry as the image so the two cannot separate.
- **Look at what you downloaded.** Of the first thirteen sourced from Commons, one had "Mont
  Blanc" scrawled across it in biro and one was sheep in a field where the filename promised a
  volcano. An API reports a licence, not whether a picture is any good.

**Exercise data** — the failure mode of this chapter is a drill that runs perfectly and teaches
the wrong thing. Nothing in the toolchain catches it.

- **An `accept` list may hold case and accent variants, never a different number or gender.**
  `answer: 'croissants', accept: ['croissant']` marks *deux croissant* correct. Twenty-one of
  these shipped before an audit caught them.
- **An item with two defensible answers is broken.** Disambiguate with a Spanish cue.
- **Minimal-pair listening sets must contain no homophones** — `cent/sang/sans`, `vert/verre`.
- **Prefer clicking to typing when the answer carries French accents** (§1). Type-in earns its
  place where the *spelling* is the skill, never as the only way to express something a click
  could.
- **Never `sort(() => Math.random() - 0.5)`** — it is biased, and in the word-order drill it
  served the sentence already correct 9.5 % of the time. One shuffle implementation, imported.
- **A un/une game takes countable nouns only.** *du poivre*, *de la farine* — a mass noun has no
  singular indefinite article, so the question has no answer. Twenty shipped before this was
  caught.
- **A validation check must count what it matched.** A regex that silently skips rows reports
  clean and grants false confidence; compare the hit count against the number of data rows.

The full how-to for each of these lives in `.claude/agents/exercise-author.md`.

## 9b. This is a public, open source repository

`github.com/kevjrmy/le-petit-cours` is public, MIT (code) and CC BY-SA 4.0 (content). Two
consequences bind every change:

- **Everything you write here is published**, including this file, the briefs and the commit
  messages. Never commit a key, a token or a connection string — `.env*` is gitignored and that
  is the only place secrets go. As it stands **no secret exists to go there**: the Supabase URL and
  publishable key are public by design, and they are all `.env` and the Vercel project env hold.
  The database password is stored nowhere — `psql`, `supabase link` and migrations prompt for it.
  Nothing Supabase-shaped belongs in a tracked file, and **no key that bypasses RLS belongs in the
  deployment env either** — the service role key, the secret key and the `POSTGRES_*` set were
  deleted on purpose, and the legacy `anon` / `service_role` keys are disabled at the Supabase end
  so they cannot come back (`docs/decisions.md` #21).
- **You can only license what the project owns.** Content contributed here is CC BY-SA 4.0, so
  anything copied from another course, textbook, app or website cannot go in — not as a lesson,
  not as an exercise item, not as a vocabulary list. Write it, or cite it as a quotation under
  the rules below.

What may be quoted, and how (see `LICENSE-CONTENT` for the full carve-out):

| Material | Rule |
|---|---|
| Literary text | Public domain **in its country of origin**, and say which work and which year. |
| Song lyrics | Short excerpts for commentary only. **Never a full lyric sheet** — the twentieth-century repertoire is still in copyright. |
| Photographs | CC0, public domain, CC BY or CC BY-SA only, stored locally, credited per image with author, link and licence. |
| Anything else | Ask in an issue before writing it in. |

Outside contributions arrive through `CONTRIBUTING.md`, which carries the same audience
constraints in a form aimed at a human who has not read this file. **When a rule here changes,
check whether `CONTRIBUTING.md` states it too** — it repeats the non-negotiable ones on purpose,
and a contributor following a stale copy is a review you have to have twice.

## 10. Keeping the context files in sync

Treat them as part of the deliverable. If behaviour and docs disagree, the change is not done.

| File | Carries |
|---|---|
| `AGENTS.md` | the rules and the traps — what any change must not break |
| `.claude/agents/*.md` | the how-to for each recurring job, one brief per job |
| `docs/scope.md` | what is being built and for whom — the profiles, the levels, the non-goals |
| `docs/decisions.md` | why the rules are what they are — the dated log, and what each was chosen against |
| `README.md` | what the project is, for a stranger arriving from GitHub |
| `CONTRIBUTING.md` | how an outside contributor proposes a change, and the constraints they must respect |

The split between the first and the third matters: this file says what is true **now**, so it
gets edited in place and never accumulates history. `docs/decisions.md` says when and why, so its
entries are appended and superseded, never rewritten. If you find yourself writing "we used
to…" here, it belongs there.

In the **same change**:

- Added / renamed / moved / removed a page or chapter → update `navigation.ts`, the cross-links,
  and the redirect if a URL died.
- Changed how a page type is written → update the owning brief, not just this file.
- Changed a shared pattern (a token, the reading width, the lesson skeleton) → update the prose
  **and** every snippet demonstrating it.
- Made a decision that was open → close it in `docs/decisions.md` with what was decided and
  what it was decided against, and drop it from §12.
- Hit a bug worth not hitting twice → write it down here. That is what §9 is.

An `AUDIT.md` at this level is for when there is content to audit; the closed Vue-era one is at
`.vue/AUDIT.md` and its re-run commands target files that no longer exist.

## 11. Verifying a change

```bash
npm run dev      # http://localhost:3000
npm run build    # must pass before you call a change done
npm run lint
```

A dev server may already be running in the maintainer's terminal. **Check before starting one**
(`curl -sf -o /dev/null -w '%{http_code}' http://localhost:3000/`) and never pattern-kill node.

Touched navigation? Run the audit in `.claude/agents/nav-wiring.md`; all four lines must read
`none`. Nothing else detects manifest/filesystem drift, and cross-links fail soft.

Check every visual change in **both themes** and at **all three shells** — the open sidebar
(≥ 75rem), the icons-only rail (56.25–75rem) and the mobile drawer (< 56.25rem). Every time: most of
this app's bugs exist in exactly one of those six combinations, and the rail is the one nobody
remembers because no default window width lands in it.

```bash
node scripts/shot.mjs http://localhost:3000/<route> out.png --full                # light, sidebar
node scripts/shot.mjs http://localhost:3000/<route> out.png --full --dark         # dark, sidebar
node scripts/shot.mjs http://localhost:3000/<route> out.png --width=1000          # the rail
node scripts/shot.mjs http://localhost:3000/<route> out.png --full --mobile       # the drawer
```

The rail has no flag of its own because it is only a width — that is the point of driving it from a
container query rather than a third breakpoint. To photograph a *chosen* collapse rather than the
tablet default, set the attribute the same way the control does:

```bash
node scripts/shot.mjs http://localhost:3000/<route> out.png --width=1400 \
  --eval="document.documentElement.setAttribute('data-rail','1')"
```

**A signed-in screenshot needs `--seed`.** Every run of the script starts from an empty Chrome
profile, so no session exists in it and `--eval` runs too late — the app has already booted and
decided nobody is signed in. `--seed` runs an expression on a first visit and then loads the page
again, which is where the Supabase session cookie and the IndexedDB progress cache go:

```bash
node scripts/shot.mjs http://localhost:3000/ma-progression out.png --seed="$(cat seed.js)"
```

Without it, the account menu, `/compte`, `/ma-progression` and the done-tick can only ever be
photographed signed out.

Use the script rather than Chrome flags: `--blink-settings=preferredColorScheme=0` is ignored by
current Chrome and hands you a light screenshot in a file named `dark.png`, which is worse than
not checking. The script also **strips Next's dev-tools badge** before the shutter — it is pinned
to the bottom-left corner, which is where the sidebar's account control lives, so a screenshot that
keeps it looks exactly like the closed drawer leaking over the page. It is `next dev` furniture and
is not in the deployed app; do not go fixing it. `/design` is the specimen page to check a token change against.

## 12. Open decisions

Recorded so nobody quietly decides them by writing code. The closed ones, with their reasoning,
are in `docs/decisions.md` — read it before reopening any of them:

1. **The authoring format for lessons.** Deliberately deferred — but no longer neutral. Two
   later goals both push toward **content-as-data**: React Native eventually (data renders on any
   target; MDX and TSX render to DOM), and contributing teachers eventually (a non-developer can
   fill in a structured file, not TSX). Still: build the primitives, hand-write two or three
   lessons, decide with evidence. Do not build a pipeline before then.
2. **The metalanguage of shared pages.** Spanish for the learner track and French for the heritage
   track collide on the orthography and conjugation pages both read. Working resolution: each
   lesson declares its language, and a topic that genuinely needs both becomes two lessons — but
   only once a real page shows the need. Do not build a translation layer speculatively.
3. **Which chapters ship first.** The level half is settled — **A1 only** to begin with, written
   from scratch, aiming at the DELF A1 syllabus rather than at parity with the 119 Vue lessons
   (`docs/decisions.md` #25). Which chapters carry it, and in what order, is still open.
4. **Whether the heritage parcours gets its own front door** or stays one path among several.
5. **Whether `.vue/` gets deleted** once the rewrite has outgrown it.

One decision is recorded as *inferred* rather than settled — plain CSS over Tailwind
(`docs/decisions.md` #6). It is the working assumption, not a choice that was ever made
explicitly. Treat a request to use Tailwind as reopening it, not as contradicting this file.
