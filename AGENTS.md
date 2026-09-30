<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# le-petit-cours

A PWA teaching **French to native Spanish speakers**, A2 first. Next.js 16 (App Router), React 19,
TypeScript, plain CSS, Vercel; Supabase for accounts and progress sync only.

**This file is the traps**: the rules a change breaks *silently*, one line each. The *why* is in
`docs/decisions.md` (`#nn`); the how-to is in the file for the job:

| When you are… | Read |
|---|---|
| writing a prose lesson, a role-play, a reading, a dictée or a DELF épreuve | `.claude/agents/lesson-author.md` |
| writing a drill or a game | `.claude/agents/exercise-author.md` |
| turning a mistake learners keep making into a page | `.claude/agents/mistake-triage.md` |
| changing tokens, components or the shell's look | `.claude/agents/design-system.md` |
| adding, renaming, moving or removing a page or chapter | `.claude/agents/nav-wiring.md` |
| checking a page for regressions before shipping | `.claude/agents/page-auditor.md` |
| checking the French itself | `.claude/agents/content-proofreader.md` |
| writing at a level, or asking what it still needs | `docs/levels/a1.md`, `a2.md`, `b1.md`, `b2.md` |
| building a class in the atelier | `docs/atelier.md` |
| asking *why* a rule is what it is | `docs/decisions.md` |
| asking what is being built and for whom | `docs/scope.md` |
| arriving from GitHub, or contributing from outside | `README.md`, `CONTRIBUTING.md` |

**Section numbers are load-bearing** — source comments and briefs cite `AGENTS.md §n`. Never
renumber; add inside a section.

## 0. Status — only what the repo cannot tell you

Count content in `src/data/navigation.ts`, never in prose.

- **Decided, not built**: #87's tabs on a page holding sets (the default set is built); #89's
  syllabus as data (its épreuves are built). Until they land, a page with sets opens on the
  parcours's level and nothing measures coverage.
- **Vercel** at <https://lepetitcours.vercel.app>, from `main`. Supabase project
  `ephdtigxjccfauzgexpd`: RLS on, legacy JWT keys off, two public env vars, no integration, no
  Supabase secret at rest (#21).
- **`FRONTEND_PASSWORD`** (#81) is in the gitignored `.env` and set on Vercel by hand
  (`vercel env add`). **Without it nobody enters `/temp`, you included** — on purpose. Never write
  it anywhere else.
- **Supabase Email provider, three settings the repo cannot enforce**, readable at the public
  `/auth/v1/settings`: provider **enabled** (`external.email` — the master toggle; off takes the
  whole site down, and it has happened once), sign-up **off** (`disable_signup`), confirmation
  **on** (`mailer_autoconfirm` false; tick « Auto Confirm User » on every hand-made account).
  **Probe, don't just read**: `POST /auth/v1/signup` must answer `signup_disabled`;
  `POST /auth/v1/token?grant_type=password` with a fake account must answer `invalid_credentials`.
- **The schema is applied by hand in the dashboard editor.** A column is checkable from outside:
  `select=<column>` on `progress` answers `42501` (exists) or `42703` (missing), never rows. Keys,
  constraints and backfills are not — check the dashboard or a tick on a second device. If a probe
  returns rows, someone ran `GRANT SELECT … TO anon`; undo it.

## 1. Audience — this drives every content decision

Two profiles needing opposite things (`docs/scope.md`, #13):

- **The learner** — Spanish speaker starting from zero. Fails at producing a sentence.
  `grammaire`, `vocabulaire`, `conversation`, `delf` lean here.
- **The heritage speaker** — fluent at home, never schooled in French; needs **literacy**. Fails at
  writing a sentence they can say. **Not a level** (oral C1 and written A2 at once); may be a
  teenager, so a page suits fifteen and adult alike (#69). `orthographe`, `dictees`, `astuces`,
  `conjugaison` lean here.

Language:

- **French only, from A2 up** (#53): explanations, tables, callouts, instructions, chrome. No gloss,
  no translation column. **Exceptions**: a `traduction` source text (#55), and **a page whose floor
  is A1, which explains in Spanish and teaches in French** (#85, `docs/levels/a1.md`). Chrome and
  manifest titles are French at every level.
- **On an A1 page `lang` is not optional**: `lang="es"` on each `<section>` and `.resume` (never
  `<article>`), `lang="fr"` back on every piece of French. Peninsular Spanish, `tú`.
- **The explanation is easier than the French it teaches.** Short sentences; wrong-then-right
  (« il est trois » is corrected; *son las tres* is printed only at A1). No literary tenses; no
  metalanguage beyond *verbe, sujet, adjectif, accord* except on heritage pages.
- **A false friend gets a definition and an example**, never just a translation.
- **English, never** — no gloss, no mnemonic (never DR & MRS VANDERTRAMP).
- **Both profiles type on a Spanish keyboard**: `é è ê` cost a detour, `œ ç` cannot be typed (§9).
- **Words**: « le cours », never « le livre »; **leçon** a page, **chapitre**, **sommaire**,
  **parcours** an ordered path, **programme** a level's syllabus. In English, *the course*.

Levels (per-level detail: `docs/levels/`):

- **`CHOOSABLE_LEVELS` is `A1, A2, B1`**, offered in the view while being written (#74); B2
  declared, unchoosable; C1/C2 out of scope (#75). **Removing a level silently drops it from every
  view** that held it.
- **The chooser rates nothing** (#77) — no « en cours », no `COURSE_LEVELS`. **Put them back
  before the site is listed or sign-up opens.** "Done" is DELF coverage (#15), tracked in
  `docs/levels/`.
- **`level` = the one rung a page is written at, or `null`** (#86). A lower level gets a new,
  simpler page (#72), never a second tag.
- **The learner chooses what is listed** (#86): signed out, everything; signed in, the `view` —
  some levels, or `"all"` (never frozen to today's levels). A `null` page is in every view.
- **`sets` is a separate claim** (#87): one body of work per level, written out, ladder order,
  first = `level` (checked at import); it alone keys the tick and widens the listing.

## 2. Stack and intended shape

`src/app`, `src/components/*`, `src/data/navigation.ts` (the manifest), `src/hooks`, `src/lib`,
`scripts/`, `public/` — list the tree rather than trust a copy.

- **React Compiler is on** — never hand-write `useMemo`/`useCallback`.
- **Plain CSS** (#6): tokens and patterns in `globals.css`, CSS Modules per component. No Tailwind,
  utility library or CSS-in-JS; asking for Tailwind reopens #6.
- **Vercel, not a static export** (#7); lessons prerender. **Offline** will be Serwist — **not
  installed yet**.
- **Supabase for accounts and progress only** (#8); content is in git. Env: exactly
  `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`. **A `SUPABASE_*` or
  `POSTGRES_*` var means an integration reconnected — delete it** (#21).
- **`FRONTEND_PASSWORD`** (#81): **never `NEXT_PUBLIC_`** (it would ship to the browser). Read only
  by `src/lib/atelier.ts`, whose `node:crypto` import breaks a client import at build.

## 3. Next.js 16 — what differs from your training data

Read `node_modules/next/dist/docs/` first. The traps:

- **`params`, `searchParams`, `cookies()`, `headers()`, `draftMode()` are Promises**; sync access is
  gone. `npx next typegen` gives `PageProps<'/route'>`.
- **Middleware is Proxy** — `proxy.ts`, not `middleware.ts`.
- **`revalidateTag(tag, profile)`** takes two arguments; `updateTag` for immediate expiry.
- **Turbopack** is the default bundler. **`next build` prints no sizes** — use Lighthouse.
- **`scroll-behavior: smooth` needs `data-scroll-behavior="smooth"` on `<html>`**, or every route
  change scrolls visibly to the top.
- **`next/image` changed** — read `01-getting-started/12-images.md`.

## 4. Server and Client Components — where the line falls

- **A lesson is a Server Component**: no `'use client'`, hooks or state.
- **Interactivity is a leaf** — a drill, the toggle, the tick. Never mark a page client for one
  button.
- **No browser storage during render** (hydration error). Use a lazy `useState` in a leaf, or — only
  for a pre-paint value — an inline `<head>` script + `suppressHydrationWarning`. Progress and level
  are in IndexedDB. **`localStorage` holds the theme and the collapsed sidebar, and nothing else**
  (#24, #42).
- **The theme must not flash**: inline script sets `data-theme` before paint.
- **`window`, `document`, `navigator`, `speechSynthesis`** exist only in effects and handlers.
- **The shell lives in the root layout** so its state survives navigation; never mount it per page.

## 5. Design system

`globals.css` owns tokens, reset, typography and every content pattern; `/design` renders them all.
Accent `#0044AA`, **Spectral** + **Inter** (#27).

- **A raw colour in a component is a bug.** Exceptions: `viewport.themeColor` (`layout.tsx`) and
  `theme_color`/`background_color` (`manifest.ts`) — keep them equal to `--surface-app`.
- **Two token layers**, palette and semantic (`--surface-*`, `--text-*`, `--border*`, `--accent*`,
  `--danger*`, `--warn*`, `--success*`). No `--clr-*` alias layer.
- **One definition per token**: `light-dark(light, dark)` on `:root`. **Never a per-theme block.**
- **Spectral is loaded at 400 and 600 only** — serif `700` silently renders 600.
- **Serif = the French taught** (`.fr`, `.example`), **sans = the explanation** (#53). `lang="fr"`
  is inherited — repeat it only for an element pronounced alone, and on A1 pages (§1).
- **Red means wrong**: `--danger` is for a wrong answer and `.exception`, nothing else.
- **Colour is never the only carrier**: `.attention` prints « À retenir : », `.exception`
  « Sauf : » (Spanish under `:lang(es)`), feedback carries a mark.
- **`.is-correct` / `.is-wrong` / `.is-missed` are doubled selectors** so they beat `.chip`/`.word`.
  **`.is-missed` (amber, dashed, `+`)** is the third state — a drill never grows its own.
- **A `<section>` inside a lesson is a section** (accent bar, Index line, #66); cards and column
  heads are `div` + `h3`.
- **Dark mode and accessibility every time**: semantic HTML, `focus-visible`, `aria-label` on icon
  buttons, `<caption>` on every table.
- **The topbar is in the page** (#43, #44): no border, no blur, no surface of its own; sticky only
  below the drawer breakpoint, in `--surface-app`.
- **Brand glyph = CSS mask over a token.** The wordmark is the home page's `<h1>` only. Icons come
  from `node scripts/make-icons.mjs` — never hand-edit; opaque; only the maskable pays the safe zone.
- **The shell's foot is one row** (#63): account control and footer share `--shell-foot-h`.
- **Never set `metadata.icons`** — it drops `icon.svg`.

## 6. Navigation

`src/data/navigation.ts` is the single source of truth. **No auto-discovery**: an entry without a
folder is a 404, a folder without an entry is unreachable — `nav-wiring` audits both.

- **A parcours orders lessons, never owns them** (#14, #88): `src/data/parcours/`, étapes of
  lesson **ids**, tracked lessons only, checked at import. **Teaching order is the parcours's**; a
  chapter's order is for browsing.
- **`level` is required; `null` is deliberate** (#86). A row draws its level, one badge.
- **The view filters listings, never access** (#86): sommaire, chapters and sidebar together.
  Exceptions: search groups rather than cuts; `/ma-progression` is a record. A direct link always
  renders the lesson.
- **A listing holding several levels groups them** (#86): a `<details>` per level, « Tous niveaux »
  last; the parcours's level opens, else the lowest; not remembered.
- **Nothing counts a chapter's lessons**; the rows are the count — **except a level group's head**
  (#86).
- **Nothing announces an unwritten page** (#51) — no « bientôt » row in any form; an empty chapter
  simply drops out (`listedChapters`).
- **`temp` (« Atelier ») is scratch** (#80, `docs/atelier.md`): ids carry the date and never return;
  nothing permanent links in; no redirect on removal; lessons `level: null`; out of the sitemap; promotion is
  a new page with a new id. **Behind a shared password** (#81) via `src/proxy.ts` → `/entrer`; its
  row still draws everywhere.
- **Chapter landing pages and verb sheets are one dynamic route each** (#29, #56), with
  `dynamicParams = false`.
- **`/` is a search field** (#39); the sommaire is `/sommaire`. **Signed out, the prerendered `/` is
  the welcome** (#71): `HomeStart`'s slot has a **measured floor — re-measure when its content
  changes height**. **Never choose the half on the server.**
- **The sidebar is one level deep** (#40): a chapter is a link. Never put the lessons back.
- **Annexe position is a manifest field** (`where: top | tree | menu | footer`, #47). The footer
  draws only on `/` and on its own pages (#63), so a `footer` annexe is unreachable from a lesson.
- **`featuredChapterSlugs` is the one hand-kept list**; fails soft.
- **Search reads the manifest only, folds accents, groups by level.** `/recherche` stays static:
  `useSearchParams` in a leaf inside `Suspense`.
- **A route outside the course goes in `unlistedPages`** (the audit reads it).
- **The topbar never names the current page** (#45); **its trail carries the lesson's floor level
  from the manifest, never the learner's level** (#65).
- **One sidebar control, in the topbar, at every breakpoint.**
- **« Index » is read from the page's `h2`s after paint** (#66) — anchors are not permanent; the
  reading column never shrinks for it.
- **Every chapter and row-drawn annexe has an icon, compiler-checked** (#42) — **no `default`
  icon, ever.**
- **`/connexion` is a redirect to `/compte`** (#26); a page there never renders.
- **A lesson's `id` is permanent; its path is not** (#50): rename = redirect in `next.config.ts`,
  same id. A changed id silently deletes its ticks.
- **Cross-links and pills fail soft; four maximum**; verb sheets' are derived (#56); `LessonEnd`
  places them (#49).

## 7. Page types

| Chapter | Kind |
|---|---|
| `grammaire`, `orthographe`, `vocabulaire`, `astuces`, `musique`, `culture` | prose lesson |
| `conjugaison`, `prononciation` | **data-driven** — one component, one data file; never a hand-written table |
| `exercices` | graded drill, scored on screen, stored nowhere |
| `jeux` | replayable game, records nothing; not a second `exercices/` |
| `dictees` | listen, type, compare |
| `conversation` | **role-play** for two: scene, steps, ~20 words; no model dialogue, graded nowhere (#54, #57) |
| `traduction` | a Spanish source to write in French, three hints, then the model (#55) |
| `lecture`, `litterature` | reading + comprehension quiz |
| `delf` | a whole **épreuve**, marked once at the end; a production has no corrigé; nothing stored (#78, #82, #84) |
| `temp` | scratch for a class in progress, any form above, ticked nowhere (#80) |

- **Another level of a page**: lower = a new page (#72); higher = usually nothing — a learner
  who wants it keeps its level in view (#86). **`sets` is only for a stimulus with no floor** (a
  reading, a level-free drill), and scales up only. **Each level gets its own role-play.**

## 8. Accounts, access and progress

**All content is public; an account buys the tick, the view and a parcours** (#18).

**Never read the session in the root layout or any layout above a lesson.** It silently turns every
page underneath dynamic and breaks offline. `AccountProvider` holds it once, inside `AppShell`.
**Check `next build`: a dynamic lesson is a regression.** (Only `/entrer` is dynamic.)

### Auth

- **`?suivant=` is written by `signInHref` alone** (#70); no suivant from `/` or `/compte`.
- **`/compte` never bounces a signed-in visitor**, and **its `<h1>` is the client leaf's** (#26).
- **Sign-in is the route `/compte`**, never a modal; the account popover links there and never holds
  a form or says « Non connecté ».
- **Username or email, one field** (#37): `@` goes straight to Supabase, otherwise
  `email_for_username()` — **an enumeration oracle**, tolerable only while addresses are fake and
  the site unlisted.
- **Usernames live in `public.usernames`** (#38); `set_username()` mirrors them to metadata. **Never
  pre-check availability.** The app builds no email address.
- **Nothing on the server reads the session** (#37); a server Supabase client would be a new
  decision. **`src/proxy.ts` matches `/temp` alone and reads one cookie** (#81) — never widen it or
  teach it the session.
- **RLS (`auth.uid() = user_id`) is the authorization model.** No permission checks in components.
- **Schema changes are migration files in `supabase/migrations/`**, never dashboard edits.
- **An account holds username, email, password, progress, a level and an optional display name —
  nothing else** (#31). Settings are in metadata with rules in `src/lib/account.ts` (#36); **a
  setting that grants something or that others see needs a table with a constraint.**

### Progress

- **Ticking is manual everywhere** (#2); a drill's score is never stored and never ticks.
- **A tick needs an account** (#48). Signed out, the lesson's control is still drawn and links to
  `/compte?suivant=…`; a listing shows no tick (#79). **No anonymous local tick.**
- **No tick in `temp` or `delf`** (#80, #82): test `isTracked()`, never `scratch`.
  `/ma-progression` walks **`trackedChapters()`**; a parcours may name tracked lessons only, and
  ends on épreuves as its `exam` — offered, never counted (#89).
- **Keys come from `progressKey(lesson, level)` only** (#50, #68): the bare id, or `id@LEVEL` on a
  page with `sets` (#87).
- **Adding or removing `sets` is a data migration**: ship the guarded backfill in the same commit
  (#68). **Changing `level` or the view must never become one.**
- **Ticks stay off `ProgressApi`**; `isDone`/`doneAt`/`toggle` take a required level (#68). **An
  unmark filters on the level too.**
- **The set in view is the learner's default set** (#87): the parcours's level if the page has it,
  else the first — one rule for the page, the row's tick and « La suite ». No `?niveau=`.
- **Per-level material matches the manifest's `sets`**; it lives in `questions.ts` (`SETS`) or
  `data.ts` (`BANKS`), type-only imports, **export names kept** — the audit reads them.
- **Storage goes through `load()`/`save()`**; IndexedDB keyed by account (#24) is the read path;
  offline is **a queue of operations** (#48).
- **`LessonEnd` draws the tick and cross-links** (#49); a lesson renders its prose only.
- **A listing's `RowTick` sits beside the row's link, never inside it**; the card is the `<li>`
  (#79). **Read the state once and hand it to both halves**; omit the slot when there is nothing to
  report. A done row wears `--success-soft`/`--success-line`.
- **`/ma-progression` does not filter by view** (#48): the parcours first, étape by étape, then
  the record. The record's counts divide by published lessons; the parcours's by its étapes.
- **« La suite » is `nextUp(parcours)` alone** (#70, #88): first unticked lesson of the parcours,
  then its épreuves; **no parcours, no « La suite »**. **Never "where you left off."**
- **The view and the parcours are two settings, one writer each** (#88): choosing one never sets the
  other.

## 9. Traps that have actually shipped

None of these fail a build; each reached a published page.

**Content**

- **Two or three sections** per lesson; more is two lessons.
- **A prose lesson ends with `.resume`**: a written `<h2>En résumé</h2>` (« En resumen » at A1) and
  four or five restating bullets, last in the `<article>` (#67). **No quiz on a prose lesson.**
- **Tables**: `<caption>`, **four columns max**, an example-sentence column (#53); at A1 a gloss
  column may be added within the four.
- **No PDF export, no print stylesheet** (#1).
- **Lecture quizzes use `<button>` options**, never hidden radios.
- **An astuce states its exceptions** (*au Mexique*).
- **A mnemonic never invents structure** (*rester*/*tomber* are not opposites).
- **Every count matches the rows under it**, and two pages stating one count change together.
- **Never restate a paradigm table** — link to its lesson.
- **Write real characters**: `sœur`, `français`, never the keyboard's substitutes.

**Images** (a DELF épreuve now; `culture/` later)

- **Local, never hotlinked** — except an épreuve's illustration, only where the item is answerable
  without it (#83).
- **Free licences only** (CC0, PD, CC BY, CC BY-SA), credit in the same data entry.
- **Look at what you downloaded.**

**Exercise data** — a drill can run perfectly and teach the wrong thing (`exercise-author.md`).

- **`accept` holds case/accent variants, never another number or gender.** Twenty-one shipped.
- **Two defensible answers = a broken item**; disambiguate in French inside it.
- **No homophones in minimal-pair sets** (`cent/sang/sans`).
- **Click rather than type where accents are involved**; a type-in field gets **`AccentBar`**.
- **Never `sort(() => Math.random() - 0.5)`** — use the one `shuffle()`.
- **No indefinite article on a mass noun**, anywhere (*un lait*).
- **A validation check prints what it counted.**

## 9b. This is a public, open source repository

`github.com/kevjrmy/le-petit-cours` — MIT (code), CC BY-SA 4.0 (content). Everything is published,
commit messages included.

- **No key, token or connection string.** The one secret is `FRONTEND_PASSWORD` (#81) — `.env` and
  Vercel only. No RLS-bypassing key in the deployment env (#21).
- **License only what the project owns.**

| Material | Rule |
|---|---|
| A DELF sujet or prep book | **Never**, free samples included (#78); the format may be described. |
| Literary text | Public domain in its country of origin; for a translation, the translator's death date (#60). |
| Song lyrics | Short excerpts for commentary; never a full lyric. |
| Photographs | CC0, PD, CC BY, CC BY-SA; local; credited per image. |
| A learner's own text | **Anonymous, atelier only** (#80): no name, age, school, town or class anywhere, commit messages included; originals stay in `.private/`. |
| Anything else | Ask in an issue first. |

**`CONTRIBUTING.md` repeats these rules on purpose** — change both together.

## 10. Keeping the context files in sync

**If behaviour and docs disagree, the change is not done.**

| File | Carries |
|---|---|
| `AGENTS.md` | the traps, one line each |
| `.claude/agents/*.md` | the how-to per job |
| `docs/levels/*.md`, `docs/atelier.md` | per-level context and syllabus; the atelier |
| `docs/scope.md` | what is built and for whom |
| `docs/decisions.md` | what each rule was chosen *against* |
| `README.md`, `CONTRIBUTING.md` | for strangers and contributors |

- **Here: what is true now, one line, cited.** History and reasons go to `decisions.md`; how-to to
  the brief. A rule earns a line by being **silently violable**.
- **`decisions.md` is curated**: a replaced entry is folded into its successor and deleted. **Numbers
  are permanent, gaps deliberate**; deleting one means repointing every `#nn` first.
- **In the same change**: a page moved → manifest, cross-links, redirect · a page type's shape → its
  brief · a shared pattern → every snippet and `/design` · an open decision closed → `decisions.md`
  and out of §12 · a bug worth not repeating → §9.

## 11. Verifying a change

```bash
npm run build    # must pass
npm run lint
```

- **The maintainer's dev server is usually running** — check
  (`curl -sf -o /dev/null -w '%{http_code}' http://localhost:3000/`); **never pattern-kill node.**
- **Navigation touched → the `nav-wiring.md` audit, all six lines `none`.**
- **Visual change → both themes × three shells**: sidebar (≥ 75rem), **rail (56.25–75rem, the one
  forgotten)**, drawer (< 56.25rem). « Index » adds ≥ 93.75rem (sidebar) and ≥ 81.25rem (rail).
- **Screenshots with `scripts/shot.mjs` only** (Chrome flags lie about dark mode):

```bash
node scripts/shot.mjs http://localhost:3000/<route> out.png --full            # light, sidebar
node scripts/shot.mjs http://localhost:3000/<route> out.png --full --dark     # dark
node scripts/shot.mjs http://localhost:3000/<route> out.png --width=1000      # the rail
node scripts/shot.mjs http://localhost:3000/<route> out.png --full --mobile   # the drawer
# rail + Index: --width=1400 --eval="document.documentElement.setAttribute('data-rail','1')"
# signed in: --seed (runs before the app decides nobody is signed in; --eval is too late)
```

## 12. Open decisions

Recorded so nobody decides them by writing code.

1. **The lesson authoring format** (#10). Leaning content-as-data; **do not build a pipeline yet.**
2. **Which chapters ship next.** A2 first (#74); A1 is mapped (`docs/levels/a1.md`), **B1 is not**.
   Order should come from the DELF syllabus. **Four chapters are blocked**: `prononciation` (its
   data shape, §7), `dictees` (the speech hook and a comparator), `jeux` (a game that is not a drill),
   `culture` (sourced photographs, §9).
3. **Where « Index » goes on a phone** (#66). Decide before building one.
5. **Kids mode** (`docs/scope.md`). **A mode beside the level — never an entry in `Level`.** Open:
   what a parent may see (RLS is own-rows only; #18, #36; parental consent), what a game is (point 2,
   the speech hook, the language rule of #85), and where it lives (a client-side filter like the
   level, or its own prerendered `/enfants/…` routes — never a session read, §8).
