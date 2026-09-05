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

What exists off the repo, as of 2026-09-05:

- **Deployed on Vercel** at <https://lepetitcours.vercel.app>, building from `main`.
- **Supabase provisioned** (`ephdtigxjccfauzgexpd`) with automatic RLS on and the legacy JWT keys
  disabled. Two public env vars, no integration, no secret at rest (#20, #21).
- **Supabase Auth is configured.** Email sign-in is on, and the redirect allowlist covers
  localhost, production and the preview wildcard — verified against the `verify` endpoint, which
  honours all three and rejects anything else. Nothing else needs doing in the dashboard.
- **The schema is applied.** One migration, one table: `public.progress` (2026-09-06). Verified
  from outside — an anonymous caller is refused `select` *and* `insert` with `42501`, at the grant
  level, before RLS is even consulted. If a probe ever comes back with rows instead, someone has
  taken Supabase's helpful hint to `GRANT SELECT ON public.progress TO anon`; do not.
- **Auth works end to end**: the magic-link form, `/auth/callback`, the session provider, sign-out,
  the level chooser, the display-name field and the level filter. Nothing in the dashboard or the
  database is outstanding.

The design system, the icons and the shell are written — `globals.css`, `src/data/navigation.ts`,
the sidebar, the topbar and the sommaire (§5, §6). The manifest declares fourteen chapters and
three lessons are real; everything else is `soon`. The lessons themselves are what is left.

**So most of this document describes intent, not code that exists.** Where a rule below names a
file, check whether that file is there yet. When you build the thing, make it match — and when
you decide it should work differently, change this file in the same commit.

### `.vue/` is a reference shelf, not a codebase

The whole Vue app sits in `.vue/`. It is committed so it is readable on GitHub, and it is there
to be *read*:

- **Read it for**: the shape of the book, chapter ordering, the wording of lessons, exercise
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
- **English is never used, for either profile.** No English glosses, no English mnemonics (never
  DR & MRS VANDERTRAMP). Never assume the reader knows English.
- **Lean on Spanish, and flag false friends** — `une robe` ≠ *la ropa*, `le sol` ≠ *el sol*. Where
  a structure already exists in Spanish (gendered articles, reflexives, verb families), say so:
  `se lever` ↔ *levantarse* teaches more than an abstract rule.
- **A1 first; A2 next.** The rewrite starts with A1 alone, sized to the DELF A1 syllabus rather
  than to parity with the old book (`docs/decisions.md` #25). A2 is in scope and unwritten; B1–C2
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
    page.tsx              the sommaire
    globals.css           tokens, base, and the shared content patterns
    manifest.ts           the PWA manifest (Next file convention, not a static JSON)
    [chapitre]/page.tsx           every chapter landing page, one generated route
    {chapitre}/{lecon}/page.tsx   a lesson
    design/page.tsx               the design system specimen, in no manifest
    auth/callback/route.ts        exchanges the magic link's code for a session
    not-found.tsx, error.tsx      404 and the error boundary, both inside the shell
    sitemap.ts, robots.ts         derived from the manifest
    opengraph-image.png           the link-share card, generated by make-icons.mjs
  components/
    shell/                AppShell, AppSidebar, AppTopbar, AccountMenu, Footer
    account/              SignInForm, AccountSettings, LevelChooser — /compte's client half
    sommaire/             ChapterGrid, ChapterLessons, LevelNotice — the level-aware listings
    lesson/               PageHeader, RelatedLinks, lessonMetadata — the rest are CSS classes
    exercice/             the drill primitives
  data/
    navigation.ts         SINGLE SOURCE OF TRUTH for chapters, lessons, cross-links
  hooks/                  useAccount (+ AccountProvider), useShellMode  ('use client')
  lib/                    site.ts, account.ts, supabase/{client,server}.ts — shuffle, adapter…
scripts/                  shot.mjs (themed screenshots), make-icons.mjs
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
  theme can use that escape hatch, and only because it is in `localStorage` (`docs/decisions.md`
  #24). See
  `node_modules/next/dist/docs/01-app/02-guides/preventing-flash-before-hydration.md`.
- **The theme must not flash.** A dark-mode learner seeing a white page for 200 ms on every cold
  load is a real regression against the Vue app, which never had one. Inline script, before
  paint, `data-theme` on `<html>`.
- **`window`, `document`, `speechSynthesis` and `navigator` are undefined during render**, in
  client components too. Touch them in an effect or an event handler.
- **The shell keeps its state across navigation** — sidebar scroll position, expanded chapters —
  because it lives in the root layout and layouts do not re-render on navigation. That is the
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
- **Red means "you got it wrong", so red is never decoration.** In a book of graded drills, an
  ornamental red teaches the learner to distrust the one signal that has to be trusted. `--danger`
  is for a wrong answer and for `.exception`, and nothing else.
- **Dark mode is not optional.** Check it, every time — see §11.
- **Colour is never the only carrier** of meaning. A state that is red also says something:
  `.attention` prints « À retenir — », `.exception` prints « Sauf — », a drill's feedback carries a
  mark as well as a fill.
- Accessibility is part of the design system, not a later pass: semantic HTML, `focus-visible`
  rings, `aria-label` on icon-only controls, a `<caption>` on every table.

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
book, and is referenced by however many parcours want it — including none. Duplicating a lesson so
two paths can each "have" it is the mistake this design exists to prevent.

**An empty set means always visible.** `culture` and `musique` are not A1 or A2 material; they are
for whoever wants to read them. So `levels` is a **required field** on every entry and `[]` is the
way to say "no level" — never an omitted field. Forgetting to tag a page and deciding it needs no
tag must not look identical in a diff, and a required field makes the first one a type error.

**The filter is on the listings, never on access.** Signed in, a listing shows a lesson when its
`levels` is empty or contains the learner's level. Signed out, it shows everything. **Every**
listing obeys it — the sommaire's counts, the chapter pages and the sidebar — because a sidebar
saying seven beside a card saying one reads as a bug rather than as a filter. Either way a
lesson reached by direct link — a cross-link, a bookmark, a search result — renders in full: an A1
learner following "pour aller plus loin" into an A2 page gets the page. Gating it would mean reading
the session to decide whether a page renders, which §8 forbids precisely because it would drag every
lesson out of static prerendering. The level decides what the book **offers**, not what it permits.

B1–C2 are declared and empty. They render as *bientôt* and are filtered out, the same mechanism as
a `soon` lesson — **not** a separate code path, and not an excuse to write B1 content early.

**Chapter landing pages are one route, not fourteen.** `app/[chapitre]/page.tsx` renders every
chapter from the manifest via `generateStaticParams`, with `dynamicParams = false` so an unknown
slug 404s rather than being rendered on demand — which is also what stops the segment swallowing
every unmatched top-level path. Adding a chapter to the manifest gives it a landing page; there is
nothing to write.

**Chapters carry no icon.** The card mark on the sommaire is the chapter's initial set in the
serif, because the identity is lettering and a letter cannot fall out of step with the manifest.
The Vue app's icon mapping was a field you could forget with no failure — the chapter rendered a
fallback glyph and looked like a design choice. There is nothing to forget now.

Two things still need deliberate care:

- **Renaming a lesson's path orphans every progress tick on it** (§8). A rename adds the old path
  to `pathAliases` in the same commit, and a redirect in `next.config.ts` so bookmarks survive.
- **Cross-links fail soft.** "Pour aller plus loin" drops a target it cannot resolve rather than
  erroring, so a stale entry costs a link silently. Four links maximum; more is a second nav menu.

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
lesson to record against, and pulls from the whole book rather than practising one page.

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
there opts every route underneath out of static prerendering, which would make the whole book
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

**Sign-in is a route: `/compte`** — not a modal, so it is linkable and a magic link can return to
it (`docs/decisions.md` #26). It needs a companion route handler at `/auth/callback` to exchange the
PKCE code for a session. **The entry point is the account control at the foot of the sidebar**,
which opens a popover holding the link, « Ma progression », « À propos » and the theme; it links to
`/compte` and never holds a form. Signed in it shows the learner's display name if they set one and
the local part of their email otherwise — never a bare "no name", because an
account holds no other identity (#22, #31). Signed out it offers « Se connecter » and never reports
« Non connecté »: reading without an account is the intended way to use the site, not a fault to
name. It learns who is signed in from `useAccount`, a **client** hook, so the layout above it never
reads the session. `/compte` is also where a learner chooses their level (#23) — asked once,
immediately after the first sign-in — and where they set their display name (#31). Everything on
that page that needs the session lives in a client leaf, so the route itself never reads it.

**Supabase Auth, email magic link.** Chosen over Clerk because progress rows live in Supabase
Postgres, so `auth.uid()` in a row-level-security policy ties a row to its owner with no glue code
— see `docs/decisions.md` #19 for the full reasoning.

**Nothing on the server reads the session except `/auth/callback`.** That route has to: the code in
a magic link is single-use and must be exchanged server-side. It is the only server client in the
app, and a pleasant consequence of §8 is that this project needs **no session-refresh proxy** — the
`proxy.ts` a Supabase + Next app normally carries exists to keep server renders' tokens fresh, and
no server render here reads a token.

**RLS is the authorization model.** `auth.uid() = user_id` on the progress table. Do not scatter
permission checks through components; if a rule needs to change, it changes in the policy.

**The schema lives in `supabase/migrations/`**, in git, reviewed in a diff like everything else
(`docs/decisions.md` #22). Change it by adding a migration, never by editing a table in the
dashboard — a dashboard edit is a change nobody can review and nobody can replay.

An account holds an email, progress rows and settings — the settings are a chosen CEFR level and
an optional display name. **Nothing else.** No analytics on learners, no behavioural tracking —
that is a principle in `docs/scope.md`, not an oversight to correct.

**The two settings are not in a table of ours.** They live in the account's user metadata on
`auth.users`, and arrive with the session (#36). `public.progress` is the only table this project
owns. That means **no database constraint stands behind either value** — the rules live in
`src/lib/account.ts` and are applied on read as well as on write, so a value written by some other
route cannot reach the interface malformed. It is an acceptable trade only because neither value is
an identifier, neither grants anything, and both are visible to their owner alone. **A setting that
ever grants something, or that anyone else can see, belongs in a table with a constraint instead.**
The bar for storing anything new at all is that a learner would notice its absence; "it might be
useful later" is not a reason (#31).

### Progress

**Marking is manual on every page type, drills included.** A drill shows its score at the end and
stores nothing; finishing it never ticks it done. That is the learner's call, and a half-remembered
pass at 50 % is not a finished lesson. Do not "helpfully" auto-complete anything.

- **Keyed by route path**, which the manifest guarantees unique.
- **Nothing touches storage directly.** Every read and write goes through an adapter with a
  `load()` / `save(state)` pair, so the local cache and the Supabase sync are two implementations
  of one interface and no component knows which is in play. This seam was the best idea in the old
  app; keep it.
- **The local store is IndexedDB**, not `localStorage` — chosen for durability, since a browser
  evicting a learner's progress is a real loss and `localStorage` is the first thing to go
  (`docs/decisions.md` #24). The adapter is therefore async on both sides, which is what the seam
  was for. `localStorage` keeps exactly one job: the theme, which must be read before first paint.
- **The local copy stays the read path.** This is an offline PWA: a signed-in learner ticking a
  lesson underground writes locally and syncs on reconnect. The server is a sync target, never
  the thing a render waits on.
- **The done-tick is rendered by the layout, not by pages.** It renders only when the current
  path resolves to a lesson in the manifest, which is what keeps it off chapter landing pages and
  annexes with no allowlist to maintain. Adding a lesson therefore needs no progress work at all.
- Counts use published lessons as the denominator, so announced-but-unwritten entries never make
  a finished chapter look unfinished.
- **Renaming a lesson path orphans every tick on it** — see §6 for the `pathAliases` discipline
  that goes with a rename.

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

Touched navigation? Run the audit in `.claude/agents/nav-wiring.md`; all three lines must read
`none`. Nothing else detects manifest/filesystem drift, and cross-links fail soft.

Check every visual change in **both themes** and at **both breakpoints** (desktop shell, mobile
drawer). Both, every time — half this app's bugs only exist in one of the four combinations.

```bash
node scripts/shot.mjs http://localhost:3000/<route> out.png --full          # light
node scripts/shot.mjs http://localhost:3000/<route> out.png --full --dark   # dark
node scripts/shot.mjs http://localhost:3000/<route> out.png --full --mobile
```

Use the script rather than Chrome flags: `--blink-settings=preferredColorScheme=0` is ignored by
current Chrome and hands you a light screenshot in a file named `dark.png`, which is worse than
not checking. `/design` is the specimen page to check a token change against.

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
