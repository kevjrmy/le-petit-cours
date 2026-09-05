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
**2026-09-05** it was restarted on Next.js. Right now the repo holds the framework scaffold and
these context files; the shell, the design system and the lessons are all still to be written.

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
- **English is never used, for either profile.** No English glosses, no English mnemonics (never
  DR & MRS VANDERTRAMP). Never assume the reader knows English.
- **Lean on Spanish, and flag false friends** — `une robe` ≠ *la ropa*, `le sol` ≠ *el sol*. Where
  a structure already exists in Spanish (gendered articles, reflexives, verb families), say so:
  `se lever` ↔ *levantarse* teaches more than an abstract rule.
- **Current levels: A1 and A2 only.** B1–C2 are `soon` in the interface and have no content. Short
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
    {chapitre}/page.tsx           chapter landing page
    {chapitre}/{lecon}/page.tsx   a lesson
  components/
    shell/                AppSidebar, AppTopbar, ThemeToggle, Footer
    lesson/               Rule, Example, Attention, Exception, Astuce, Table, PageHeader…
    exercice/             the drill primitives
  data/
    navigation.ts         SINGLE SOURCE OF TRUTH for chapters, lessons, cross-links
  hooks/                  useTheme, useSidebar, useSpeech, useProgress  ('use client')
  lib/                    shuffle, progress adapter, view metadata
public/                   brand assets (logo, favicons, PWA icons) and lesson images
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
  in diffs. The project exists — `ephdtigxjccfauzgexpd`, created directly in the Supabase
  dashboard rather than through the Vercel Marketplace integration, so nothing injects its env
  vars for you and there is no Vercel-side billing link (`docs/decisions.md` #20).

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

- **`localStorage` does not exist on the server.** Anything reading it — the theme, progress
  ticks, a drill's saved state — renders one thing on the server and another on the client, and
  React throws a hydration error. The fixes, in order of preference: read it in a lazy
  `useState` initialiser inside a client leaf; or, when it must be correct *before first paint*
  (the theme is the case that matters), set it from an inline script in `<head>` and put
  `suppressHydrationWarning` on `<html>`. See
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

**Written from scratch.** `.vue/src/style.css` is not being ported — not its components, not its
tokens. Read it for what problems a system like this has to solve (theme-aware surfaces, table
chrome, exercise feedback states, a readable column width), then solve them again.

The rules that survive the rewrite because they were right:

- **A raw colour in a component is a bug.** `#4CAF50`, `white`, `rgba(0,0,0,.5)` — each one
  freezes that component in light mode. Every colour comes from a token.
- **Two layers, not three.** Palette (raw scales, never referenced from a component) and semantic
  (`--surface-*`, `--text-*`, `--border*`, `--accent*`, `--danger*`, `--warn*`, `--success*`).
  The old system had a third layer of `--clr-*` aliases kept for compatibility with views written
  before the tokens existed. **Do not recreate it.** There is no legacy to be compatible with.
- **Dark mode is not optional**, and a token defined in only one of the three places
  (`:root`, the `prefers-color-scheme` block, the `[data-theme="dark"]` block) breaks for either
  "système" or the explicit toggle — and only one of them, so it looks fine while you test.
- **Colour is never the only carrier** of meaning. A state that is red also says something.
- Accessibility is part of the design system, not a later pass: semantic HTML, `focus-visible`
  rings, `aria-label` on icon-only controls, a `<caption>` on every table.

Open: the palette itself. The Vue app used the tricolore (blue primary, red accents, amber
callouts, green for correct) with Georgia headings on Inter body. Whether the rewrite keeps that
look has not been decided — do not assume it either way.

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

The manifest carries a second axis. Every lesson has a **CEFR level tag**, and a **parcours** is
an ordered path through lessons that already exist:

- `Parcours A1` and `Parcours A2` follow the DELF syllabus.
- A heritage parcours (« Écrire le français ») walks the orthography and conjugation pages in
  remediation order.

**A parcours orders lessons; it never owns them.** A lesson belongs to its chapter, appears in the
book, and is referenced by however many parcours want it — including none. Duplicating a lesson so
two paths can each "have" it is the mistake this design exists to prevent.

B1–C2 are declared and empty. They render as *bientôt* and are filtered out, the same mechanism as
a `soon` lesson — **not** a separate code path, and not an excuse to write B1 content early.

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
| `exercices` | graded drill, walked once, records a score |
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
nothing gated. Signing in buys you the tick, your scores and your position in a parcours, kept
across devices.

### The rule that protects the architecture

**Never read the session in the root layout, or in any layout above a lesson.** Reading cookies
there opts every route underneath out of static prerendering, which would make the whole book
dynamic and destroy the offline story. Public content is what lets lessons prerender; a stray
`await createClient().auth.getUser()` in `layout.tsx` throws that away in one line, and nothing
will fail loudly when it happens — the pages still render, they just stop being static.

Auth lives at the leaves, exactly like the theme toggle (§4). The « J'ai terminé » control knows
whether you are signed in. The lesson wrapping it does not, and stays static HTML.

Check it in the `next build` output: a lesson that has become dynamic is a regression, not a
detail.

### Auth

**Supabase Auth, email magic link.** Chosen over Clerk because progress rows live in Supabase
Postgres, so `auth.uid()` in a row-level-security policy ties a row to its owner with no glue code
— see `docs/decisions.md` #19 for the full reasoning.

**RLS is the authorization model.** `auth.uid() = user_id` on the progress table. Do not scatter
permission checks through components; if a rule needs to change, it changes in the policy.

An account holds an email, progress rows and settings. **Nothing else.** No analytics on learners,
no behavioural tracking — that is a principle in `docs/scope.md`, not an oversight to correct.

### Progress

**Marking is manual on every page type, drills included.** An exercise records the score of its
last run; finishing it never ticks it done. That is the learner's call, and a half-remembered
pass at 50 % is not a finished lesson. Do not "helpfully" auto-complete anything.

- **Keyed by route path**, which the manifest guarantees unique.
- **Nothing touches storage directly.** Every read and write goes through an adapter with a
  `load()` / `save(state)` pair, so the local cache and the Supabase sync are two implementations
  of one interface and no component knows which is in play. This seam was the best idea in the old
  app; keep it.
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
  is the only place secrets go. The Supabase URL and publishable key live in a gitignored `.env`
  and in the Vercel project env (`vercel env add`, all three environments); the database password
  stays local and is never pushed. Nothing Supabase-shaped belongs in a tracked file.
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

Check every visual change in **both themes** and at **both breakpoints** (desktop shell, mobile
drawer). Both, every time — half this app's bugs only exist in one of the four combinations.

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
3. **The palette and typography** of the fresh design system (§5).
4. **Which chapters ship first**, and whether A1+A2 aims at parity with the 119 Vue lessons or at
   a smaller book that actually covers the DELF syllabus.
5. **Whether the heritage parcours gets its own front door** or stays one path among several.
6. **Whether `.vue/` gets deleted** once the rewrite has outgrown it.

One decision is recorded as *inferred* rather than settled — plain CSS over Tailwind
(`docs/decisions.md` #6). It is the working assumption, not a choice that was ever made
explicitly. Treat a request to use Tailwind as reopening it, not as contradicting this file.
