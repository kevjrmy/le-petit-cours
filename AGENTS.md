<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# le-petit-cours

A PWA teaching **French to native Spanish speakers**, A2 first. Next.js 16 (App Router), React 19,
TypeScript, plain CSS, Vercel; Supabase for accounts and progress sync only.

**This file is the traps**: rules a change breaks *silently*, one line each. The *why* is
`docs/decisions.md` (`#nn`); the how-to is the file for the job:

| When you are…                                                              | Read                                           |
| -------------------------------------------------------------------------- | ---------------------------------------------- |
| writing a prose lesson, a role-play, a reading, a dictée or a DELF épreuve | `.claude/agents/lesson-author.md`              |
| writing a drill or a game                                                  | `.claude/agents/exercise-author.md`            |
| turning a mistake learners keep making into a page                         | `.claude/agents/mistake-triage.md`             |
| changing tokens, components or the shell's look                            | `.claude/agents/design-system.md`              |
| adding, renaming, moving or removing a page or chapter                     | `.claude/agents/nav-wiring.md`                 |
| checking a page for regressions before shipping                            | `.claude/agents/page-auditor.md`               |
| checking the French itself                                                 | `.claude/agents/content-proofreader.md`        |
| writing at a level, or asking what it still needs                          | `docs/levels/a1.md`, `a2.md`, `b1.md`, `b2.md` |
| building a class in the atelier                                            | `docs/atelier.md`                              |
| touching auth, the schema, an env var or the atelier's lock                | `docs/operations.md`                           |
| asking *why* a rule is what it is                                          | `docs/decisions.md`                            |
| asking what is being built and for whom                                    | `docs/scope.md`                                |
| arriving from GitHub, or contributing from outside                         | `README.md`, `CONTRIBUTING.md`                 |

**Section numbers are load-bearing** — source comments and briefs cite `AGENTS.md §n`. Never
renumber; add inside a section.

## 0. Status — only what the repo cannot tell you

Count content in `src/data/navigation.ts`, never in prose.

- **Decided, not built**: #89's syllabus as data (its épreuves are built); #86's manifest split,
  one file per chapter. Until they land, nothing measures coverage.
- **#102 is built for every page.** `grep -L 'data-ui' src/app/*/*/page.tsx` lists the rest, on
  purpose: `litterature` (its A1 body is twinned in `a1.tsx`), `delf`, `atelier`, the verb sheets
  (their notes are data) and a drill with no prose; these show their French in both interfaces.
- **The four parcours are first drafts** (2026-09-30); the teaching order awaits the maintainer.
- **Deployed on Vercel from `main`; Supabase holds accounts.** Its auth settings and schema are set
  by hand, outside the repo — `docs/operations.md` says what they must be and how to probe them.
- **The atelier's lock is lifted** (2026-10-06, `ATELIER_VERROUILLE` in `src/lib/atelier.ts`).
  **`FRONTEND_PASSWORD` lives in `.env` and on Vercel only — never write it anywhere else** (#81).

## 1. Audience — this drives every content decision

Two profiles needing opposite things (`docs/scope.md`, #13):

- **The learner** — Spanish speaker starting from zero; fails at *producing* a sentence.
  `grammaire`, `vocabulaire`, `conversation`, `delf` lean here.
- **The heritage speaker** — fluent at home, never schooled in French; needs **literacy**, fails at
  *writing* a sentence they can say. **Not a level** (oral C1, written A2). May be a teenager: a
  page suits fifteen and adult alike (#69). `orthographe`, `dictees`, `astuces`, `conjugaison`.

Language (#102):

- **Every explanation and the interface exist in French and Spanish; every page prints both, CSS
  hides one** (`[data-ui]`). `<html data-lang>` is set before paint: account, else device, else
  browser, else French.
- **Visible two-language text is `<T fr es>` or a `data-ui` pair, never `useLang()`** — it reads
  « fr » during hydration, so text flashes French. `useLang()` is for attributes and strings built
  in code. A lesson pairs each `<section>` and its `.resume`; the French it teaches is written once.
- **Two copies, one change**: an explanation edited in one language only is the silent failure.
- **French in both interfaces**: the French taught (no gloss or translation from A2), titles,
  subtitles, DELF descriptors, a DELF épreuve, the atelier, tab title and `<meta>`, the PWA
  manifest — **save a tool's name** (`/prononciation`'s `titleEs`, #94), which teaches no French.
  **Spanish in both**: a `traduction` source (#55), an A1 page's glosses and a literary
  A1 body's Spanish lines (#85, #92), `/instalar` (#101). Chapter/annexe titles and badges need
  their Spanish twins in the manifest (`es`, `titleEs`, `tagEs`).
- **`lang` is not optional**: `lang="es"` on each Spanish `<section>`, `.resume` and
  `data-ui="es"` element (never `<article>`), `lang="fr"` back on every piece of French inside.
  Peninsular Spanish, `tú`; the French says `vous`.
- **The explanation is easier than the French it teaches**, in both languages: short sentences,
  wrong-then-right, no literary tenses, no metalanguage beyond *verbe, sujet, adjectif, accord*
  except on heritage pages. Printing the Spanish that causes a mistake (*son las tres*) is A1 only.
- **A false friend gets a definition and an example**, never just a translation.
- **English, never** — no gloss, no mnemonic (never DR & MRS VANDERTRAMP).
- **Both profiles type on a Spanish keyboard**: `é è ê` cost a detour, `œ ç` cannot be typed (§9).
- **Words**: « le cours » (never « le livre »), **leçon**, **chapitre**, **sommaire**, **parcours**
  (an ordered path), **programme** (a level's syllabus). Spanish: *curso, lección, capítulo,
  Índice, recorrido, Lo siguiente* (« La suite »).

Levels (per level: `docs/levels/`):

- **`CHOOSABLE_LEVELS` is `A1, A2, B1`**, offered while being written (#74); B2 declared,
  unchoosable; C1/C2 out of scope (#75). **Removing a level silently drops it from every view.**
- **The chooser rates nothing** (#77): no « en cours », no `COURSE_LEVELS`. **Put them back before
  the site is listed or sign-up opens.** "Done" is DELF coverage (#15).
- **`level` = the one rung a page is written at, or `null`** (#86). A lower level gets a new,
  simpler page (#72), never a second tag.
- **The learner chooses what is listed** (#86): signed out, everything; signed in, the `view` —
  some levels or `"all"`. A `null` page is in every view.
- **`sets` is a separate claim** (#87): one body of work per level, ladder order, first = `level`
  (checked at import); it alone keys the tick and widens the listing.

## 2. Stack

`src/app`, `src/components/*`, `src/data/navigation.ts` (the manifest), `src/hooks`, `src/lib`,
`scripts/`, `public/` — list the tree rather than trust a copy.

- **React Compiler is on** — never hand-write `useMemo`/`useCallback`.
- **Plain CSS** (#6): tokens and patterns in `globals.css`, CSS Modules per component. No Tailwind,
  utility library or CSS-in-JS.
- **Vercel, not a static export** (#7); lessons prerender. **Offline will be Serwist — not
  installed yet.**
- **Supabase for accounts and progress only** (#8); content is in git. Env: `docs/operations.md`.
- **`FRONTEND_PASSWORD` is never `NEXT_PUBLIC_`.** Only `src/lib/atelier.ts` reads it; its
  `node:crypto` import breaks a client import at build.

## 3. Next.js 16 — what differs from your training data

Read `node_modules/next/dist/docs/` first. The traps:

- **`params`, `searchParams`, `cookies()`, `headers()`, `draftMode()` are Promises.**
  `npx next typegen` gives `PageProps<'/route'>`.
- **Middleware is Proxy** — `proxy.ts`, not `middleware.ts`.
- **`revalidateTag(tag, profile)`** takes two arguments; `updateTag` for immediate expiry.
- **Turbopack** is the default bundler. **`next build` prints no sizes** — use Lighthouse.
- **`scroll-behavior: smooth` needs `data-scroll-behavior="smooth"` on `<html>`**, or every route
  change scrolls visibly to the top.
- **`next/image` changed** — read `01-getting-started/12-images.md`.

## 4. Server and Client Components

- **A lesson is a Server Component**: no `'use client'`, hooks or state. **Interactivity is a
  leaf**; never mark a page client for one button.
- **No browser storage during render** (hydration error): a lazy `useState` in a leaf, or, for a
  pre-paint value only, an inline `<head>` script + `suppressHydrationWarning`. Progress and level
  are in IndexedDB; **`localStorage` holds the theme, the collapsed sidebar and the interface
  language, nothing else** (#24, #42, #102).
- **The theme must not flash**: an inline script sets `data-theme` before paint.
- **`window`, `document`, `navigator`, `speechSynthesis`** exist only in effects and handlers.
- **Speech is `useSpeech` alone** (#94): a French voice set on the utterance, or silence and a
  message (`SpeechProblemMessage`, never a copy). `lang` without a `voice` is read in the device's
  default language.
- **The shell lives in the root layout** so its state survives navigation; never mount it per page.
- **`beforeinstallprompt` is caught by `src/lib/install.ts`, imported by the shell** (#101): it
  fires once per load, on the landing page, so a listener in `/installer` would miss it. Its
  `preventDefault()` keeps the browser's own pop-up away: our button is the one offer.
- **`html lang` stays `fr`** (#102); a Spanish element carries `lang="es"` itself.

## 5. Design system

Detail: `.claude/agents/design-system.md`; `/design` renders every pattern. Accent `#0044AA`,
**Spectral** + **Inter** (#27); the look follows *Le Petit Prince* (#100).

- **A raw colour, `font-size`, margin, padding, gap, radius, z-index, transition or shadow in a
  component is a bug** (#96; `node scripts/check-tokens.mjs`): twelve `--type-*`, seventeen
  `--space-*`. A measured alignment keeps its number and says « measured » on its line.
  Exceptions: `viewport.themeColor` (`layout.tsx`) and the manifest's two colours, kept equal to
  `--surface-app`.
- **One definition per token**: `light-dark(light, dark)` on `:root`; never a per-theme block,
  never a `--clr-*` alias layer.
- **Spectral is loaded at 400 and 600 only** — serif `700` silently renders 600.
- **Serif = the French taught, sans = the explanation**, in either language. **A cited form is
  `span.fr` (semi-bold); a wrong one `<s className="fr">`, never bold** (#93). Inside `.rule`,
  `.attention`, `.exception`, `.astuce` both take the box's sans.
- **Gold (`--star`, `--planet`) is for the interface, never text or a lesson. Red (`--danger`)
  means wrong, nothing else. Colour is never the only carrier** — every box prints its label.
- **One paper, one field, one label, one board** (#97): `.card`, `.input`, `.label`,
  `Board.module.css`. A module places them, never redraws them; a local class resizing one is
  doubled, or production's CSS order decides.
- **Answer states are shared and doubled**: `.is-correct`, `.is-wrong`, `.is-missed` (the third),
  `.is-chosen` (before the verdict, beats `:hover`). A drill never grows its own; **nothing that
  carries an answer or a verdict is faded.**
- **A `<section>` in a lesson is a section** (accent bar, Index line, #66); cards are `div` + `h3`.
- **WCAG 2.2 AA, checked** (#99): a colour token changed means `node scripts/contrast.mjs` still
  prints « 0 under their floor »; a field's edge is `--border-control`; targets ≥ 24px;
  `outline: none` only with two pixels of `--accent` in its place. Semantic HTML, `aria-label` on
  icon buttons, `<caption>` on every table.
- **The page is flat**: one `--shadow`, for what floats. A menu a lesson opens is `--z-content`.
- **The topbar is in the page** (#43, #44): no border, blur or surface; sticky only below the
  drawer breakpoint. **The shell's foot is one row** (#63).
- **Icons come from `node scripts/make-icons.mjs`, never hand-edited. Never set
  `metadata.icons`** — it drops `icon.svg`.
- **The book's mood, never its drawings** — Saint-Exupéry is not public domain in France (#60).

## 6. Navigation

`src/data/navigation.ts` is the single source of truth. **No auto-discovery**: an entry without a
folder is a 404, a folder without an entry is unreachable — `node scripts/nav-audit.mjs` finds both.

- **A parcours orders lessons, never owns them** (#14, #88): `src/data/parcours/`, étapes of
  tracked lesson **ids**, checked at import. **A level's parcours is the whole level**: every
  tracked page written at it (`level` or a `sets` entry), its épreuves as `exam`, nothing from
  another rung. A page left off fails the import; so does a choosable level with no parcours.
- **`level` is required; `null` is deliberate** (#86). A row draws its level, one badge.
- **The view filters listings, never access** (#86): sommaire, chapters, sidebar. Search groups
  rather than cuts; `/ma-progression` is a record; a direct link always renders.
- **A listing holding several levels groups them** (#86): a `<details>` per level, « Tous
  niveaux » last; the parcours's level opens, else the lowest; not remembered. A page with sets
  goes under the set it opens on (`shownAt`, #92).
- **Nothing counts a chapter's lessons** except a level group's head (#86). **Nothing announces an
  unwritten page** (#51); an empty chapter drops out (`listedChapters`).
- **`atelier` is scratch** (#80, `docs/atelier.md`): dated ids never reused, nothing permanent
  links in, no redirect on removal, `level: null`, its own `noindex`; its row still draws
  everywhere.
- **Chapter landing pages and verb sheets are one dynamic route each** (#29, #56),
  `dynamicParams = false`. **Save a chapter that is its own page** (`prononciation`, #94): a lesson
  whose `path` is the chapter's, alone in it — a second page throws at import.
- **`/` is a search field** (#39); the sommaire is `/sommaire`. Signed out, the prerendered `/` is
  the welcome (#71): `HomeStart`'s slot has a **measured floor — re-measure when its content
  changes height**. **Never choose the half on the server.**
- **The sidebar is one level deep** (#40); **one sidebar control, in the topbar, at every
  breakpoint**, its label and glyph following the mode (#45). The topbar never names the current
  page (#45); its trail is the chapter alone (#65), and nothing on a chapter that is its own page.
- **Annexe position is a manifest field** (`where`, #47); the footer draws only on `/` and its own
  pages (#63). **`featuredChapterSlugs` is the one hand-kept list**, and fails soft. A route
  outside the course goes in `unlistedPages`.
- **Search reads the manifest only**, folds accents, groups by level, matches the Spanish twins.
  `/recherche` stays static: `useSearchParams` in a leaf inside `Suspense`.
- **The site asks not to be indexed** (#95): `X-Robots-Tag: noindex` (`next.config.ts`), `robots`
  metadata, no sitemap. **`robots.txt` allows crawling on purpose** (a `Disallow` hides the
  `noindex`); it disallows AI crawlers by name, never a chat's link-preview agent.
- **« Index » is read from the page's `h2`s after paint** (#66); the column never shrinks for it.
- **Every chapter and row-drawn annexe has an icon, compiler-checked — no `default` icon** (#42).
- **`/connexion` redirects to `/compte`** (#26).
- **A lesson's `id` is permanent; its path is not** (#50): rename = redirect in `next.config.ts`,
  same id. A changed id silently deletes its ticks.
- **Cross-links and pills fail soft** — a stale one vanishes silently. Four cross-links maximum;
  `LessonEnd` draws them (#49); verb sheets' are derived (#56).

## 7. Page types

| Chapter                                                                    | Kind                                                                                                     |
| -------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| `grammaire`, `orthographe`, `vocabulaire`, `astuces`, `musique`, `culture` | prose lesson                                                                                             |
| `conjugaison`, `prononciation`                                             | **data-driven** — one component, one data file; never a hand-written table                               |
| `/prononciation`                                                           | a **tool**, the chapter's own page: type, hear the device's French voice; no tick, no score (#94)        |
| `exercices`                                                                | graded drill, scored on screen, stored nowhere                                                           |
| `jeux`                                                                     | replayable game, records nothing; not a second `exercices/`                                              |
| `dictees`                                                                  | listen, type, compare                                                                                    |
| `conversation`                                                             | **role-play** for two: scene, steps, ~20 words; no model dialogue, graded nowhere (#54, #57)             |
| `traduction`                                                               | a Spanish source to write in French, three hints, then the model (#55)                                   |
| `lecture`                                                                  | a text written for the course + comprehension quiz                                                       |
| `litterature`                                                              | a literary work (public domain, #58, #60) + comprehension quiz; what the text is picks the chapter       |
| `delf`                                                                     | a whole **épreuve**, marked once at the end; a production has no corrigé; nothing stored (#78, #82, #84) |
| `atelier`                                                                  | scratch for a class in progress, any form above, ticked nowhere (#80)                                    |

- **Another level of a page**: lower = a new page (#72); higher = usually nothing (#86). **`sets`
  is only for a stimulus with no floor** (a reading, a level-free drill), and scales up only.
  **Each level gets its own role-play.**
- **A `litterature` page is one work with a body per level** (#92): `a1.tsx`, `a2.tsx`, `b1.tsx`,
  chosen by `ByLevel`, keys matching `sets` and `SETS`. At A1 the text is `.bilingue`.

## 8. Accounts, access and progress

**All content is public; an account buys the tick, the view and a parcours** (#18).

**Never read the session in the root layout or any layout above a lesson** — it turns every page
underneath dynamic and breaks offline. `AccountProvider` holds it once, inside `AppShell`. **A
dynamic lesson in `next build` is a regression** (only `/entrer` is dynamic).

### Auth

- **`?suivant=` is written by `signInHref` alone** (#70); no suivant from `/` or `/compte`.
- **Sign-in is the route `/compte`**, never a modal; it never bounces a signed-in visitor, and its
  `<h1>` is the client leaf's (#26). The account popover links there; it never holds a form or
  says « Non connecté ».
- **A first sign-in passes through `/bienvenue`** (#90): only when `readChosen` is false, only from
  `ReturnTo`; it always writes the view, since a `null` key is deleted.
- **Username or email, one field** (#37): `@` goes to Supabase, else `email_for_username()` — **an
  enumeration oracle**, tolerable only while addresses are fake and the site unlisted.
- **Usernames live in `public.usernames`** (#38), mirrored to metadata. **Never pre-check
  availability.** The app builds no email address.
- **Nothing on the server reads the session** (#37); a server Supabase client is a new decision.
  **`src/proxy.ts` matches `/atelier` alone and reads one cookie** (#81) — never widen it.
- **RLS (`auth.uid() = user_id`) is the authorization model**; no permission checks in components.
- **Schema changes are migration files in `supabase/migrations/`**, applied by hand
  (`docs/operations.md`).
- **An account holds username, email, password, progress, a view, a parcours, a language and an
  optional display name — nothing else** (#31). Settings are metadata, rules in
  `src/lib/account.ts` (#36); **a setting that grants something or that others see needs a table
  with a constraint.**

### Progress

- **Ticking is manual everywhere** (#2); a drill's score is never stored and never ticks.
- **A tick needs an account** (#48). Signed out, the control links to `/compte?suivant=…`; a
  listing shows no tick (#79). **No anonymous local tick.**
- **No tick in `atelier` or `delf`** (#80, #82): test `isTracked()`, never `scratch`.
- **Keys come from `progressKey(lesson, level)` only** (#50, #68): the bare id, or `id@LEVEL` on a
  page with `sets`. **Adding or removing `sets` is a data migration**: ship the guarded backfill in
  the same commit. **Changing `level` or the view must never become one.**
- **Ticks stay off `ProgressApi`**; `isDone`/`doneAt`/`toggle` take a required level. **An unmark
  filters on the level too.**
- **The set in view is the learner's default set** (#87, #92): the parcours's level if the page
  has it, else A2, else the first — one rule for the body, the quiz, the row's tick and « La
  suite ». Read it through `useLessonVariant`/`variantOf`, never `sets[0]`. No `?niveau=`, no tabs.
- **Per-level material matches the manifest's `sets`**: `questions.ts` (`SETS`) or `data.ts`
  (`BANKS`), type-only imports, **export names kept** — `scripts/nav-audit.mjs` reads them.
- **Storage goes through `load()`/`save()`**; IndexedDB keyed by account (#24) is the read path;
  offline is a queue of operations (#48).
- **`LessonEnd` draws the tick and cross-links** (#49), and nothing, rule included, when it has
  neither; a lesson renders its prose only.
- **A listing's `RowTick` sits beside the row's link, never inside it** (#79). Read the state once
  and hand it to both halves; omit the slot when there is nothing to report.
- **`/ma-progression` does not filter by view** (#48): it walks `trackedChapters()`, the parcours
  étape by étape, then the record. The record divides by published lessons, the parcours by its
  étapes; its épreuves are offered, never counted (#89).
- **« La suite » is `nextUp(parcours)` alone** (#70, #88): first unticked lesson, then the
  épreuves; no parcours, no « La suite ». **Never "where you left off."**
- **The view and the parcours are two settings, one writer each** (#88).

## 9. Traps that have actually shipped

None of these fail a build; each reached a published page.

**Content**

- **Two or three sections** per lesson; more is two lessons.
- **A prose lesson ends with `.resume`** (« En résumé » / « En resumen »), four or five restating
  bullets, last in the `<article>` (#67). **No quiz on a prose lesson.**
- **Tables**: `<caption>`, **four columns max**, an example-sentence column; at A1 a gloss column
  may take one of the four.
- **No PDF export, no print stylesheet** (#1).
- **Lecture quizzes use `<button>` options**, never hidden radios.
- **An astuce states its exceptions** (*au Mexique*). **A mnemonic never invents structure**
  (*rester*/*tomber* are not opposites).
- **Every count matches the rows under it**, and two pages stating one count change together.
- **Never restate a paradigm table** — link to its lesson.
- **Write real characters**: `sœur`, `français`, never the keyboard's substitutes.
- **An ornament never touches text** (#100): `.ciel` places its stars in `rem`, never in `%` of a
  box that text can grow.

**Styles**

- **A module's list inside `.prose` doubles its class and zeroes its items**, or `.prose ul` and
  `li + li` add 20px and 6px it never asked for (`design-system.md`, « Two rules that tie »).
- **A global class in a module's selector is hashed** — `.actions > .button` matches nothing; write
  the element or `:global()` (`design-system.md`).

**Images** (a DELF épreuve, the atelier, `culture/` later)

- **Local, never hotlinked** — except an épreuve's illustration, where the item is answerable
  without it (#83). **Free licences only** (CC0, PD, CC BY, CC BY-SA), credited in the same data
  entry. **Look at what you downloaded.**
- **A drawn shape is one outline, never stacked copies** (#100).

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

- **No key, token or connection string.** The one secret is `FRONTEND_PASSWORD` (#81). No
  RLS-bypassing key in the deployment env (#21).
- **License only what the project owns.**

| Material                            | Rule                                                                                                               |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| A DELF sujet or prep book           | **Never**, free samples included (#78); the format may be described.                                               |
| Literary text                       | Public domain in its country of origin; for a translation, the translator's death date (#60).                      |
| Song lyrics                         | Short excerpts for commentary; never a full lyric.                                                                 |
| Photographs                         | CC0, PD, CC BY, CC BY-SA; local; credited per image.                                                               |
| A learner's own text                | **Anonymous, atelier only** (#80): no name, age, school, town or class anywhere; originals stay in `.private/`.    |
| A press article or a company's page | **Never copied** (#103): a text written from its facts, short quotes credited, the link; original in `.private/`. |
| Anything else                       | Ask in an issue first.                                                                                             |

**`CONTRIBUTING.md` repeats these rules on purpose** — change both together.

## 10. Keeping the context files in sync

**If behaviour and docs disagree, the change is not done.**

| File                                  | Carries                                          |
| ------------------------------------- | ------------------------------------------------ |
| `AGENTS.md`                           | the traps, one line each                         |
| `.claude/agents/*.md`                 | the how-to per job                               |
| `docs/levels/*.md`, `docs/atelier.md` | per-level context and syllabus; the atelier      |
| `docs/operations.md`                  | what lives outside the repo, and how to probe it |
| `docs/scope.md`                       | what is built and for whom                       |
| `docs/decisions.md`                   | what each rule was chosen *against*              |
| `README.md`, `CONTRIBUTING.md`        | for strangers and contributors                   |

- **One fact, one home.** A rule lives in one file; the others cite it (`§n`, `#nn`, a brief's
  heading) rather than restate it. A copy is the next contradiction.
- **Here: what is true now, one line, cited.** A rule earns a line by being **silently
  violable** and by binding more than one job; a rule for one job goes in its brief.
- **`decisions.md` is curated**: a replaced entry is folded into its successor and deleted.
  **Numbers are permanent, gaps deliberate**; deleting one means repointing every `#nn` first.
- **In the same change**: a page moved → manifest, cross-links, redirect · a page type's shape →
  its brief · a shared pattern → every snippet and `/design` · an open decision closed →
  `decisions.md` and out of §12 · a bug worth not repeating → §9.

## 11. Verifying a change

```bash
npm run lint
npx tsc --noEmit
curl -s -o /dev/null -w '%{http_code}\n' http://localhost:3000/<route>   # each route touched
node scripts/nav-audit.mjs       # navigation touched: six lines, all `none`
node scripts/check-tokens.mjs    # CSS or a component touched
node scripts/check-quizzes.mjs   # a reading quiz touched
node scripts/contrast.mjs        # a colour token touched
```

- **A route removed → `npx next typegen` before `tsc`**, or `.next/types` still imports it.
- **The dev server is the maintainer's.** Check it (the `curl` on `/`) and use it. **Never start
  one, never pattern-kill node**; if nothing answers, ask.
- **`npm run build` is the maintainer's — never on your own, never while their dev server is up**
  (#98). Say it has not run, and what only it can show (a lesson gone dynamic, §8; two CSS rules
  that tie, whose order differs in production).
- **Visual change → both themes × three shells**, named for the maintainer: sidebar (≥ 75rem),
  **rail (56.25–75rem, the one forgotten)**, drawer (< 56.25rem). « Index » adds ≥ 93.75rem
  (sidebar) and ≥ 81.25rem (rail).
- **No screenshot by default.** Say what to look at, where, in which theme and shell, and offer the
  shot. Take one unasked only for what the maintainer cannot see by looking (signed in, a
  measurement) or what you cannot judge blind (a shape you drew).
- **A screenshot is `node scripts/shot.mjs <url> out.png`** (Chrome flags lie about dark mode):
  `--full`, `--dark`, `--width=1000` (the rail), `--mobile` (the drawer), `--eval="…"` (runs before
  the shutter and prints its result; rail + Index is `--width=1400` with
  `document.documentElement.setAttribute('data-rail','1')`), `--seed` (signed in; `--eval` is too
  late for that). Read the PNG back.

## 12. Open decisions

Recorded so nobody decides them by writing code.

1. **The lesson authoring format** (#10). Leaning content-as-data; **do not build a pipeline yet.**
2. **Which chapters ship next.** Order comes from the DELF syllabus (`docs/levels/`; B2 unmapped).
   **Four chapters are blocked**: `prononciation`'s sound sheets (their data shape, §7; the
   listening tool is built, #94), `dictees` (a comparator), `jeux` (a game that is not a drill),
   `culture` (sourced photographs, §9).
3. **Where « Index » goes on a phone** (#66). Decide before building one.
5. **Kids mode** (`docs/scope.md`). **A mode beside the level — never an entry in `Level`.** Open:
   what a parent may see (RLS is own-rows only, #18, #36; consent), what a game is (point 2, #85),
   where it lives (a client-side filter, or prerendered `/enfants/…` routes — never a session read).
6. **Speech through a hosted model** (#94): speech-to-text and a better voice. Open: the provider;
   where its key lives (no server secret but #81's, #21); who pays for an open endpoint; a
   learner's voice leaving the device, a teenager's included (#69); offline; what listening is
   *for* (`docs/scope.md` rules out grading how a learner sounds). **`useSpeech` is the seam.**
