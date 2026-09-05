# Le Petit Cours

**A free, open French course for Spanish speakers** — a PWA that installs to your home screen,
works offline, and explains French in Spanish. Also, for readers who already speak French at home,
a track that teaches them to write it.

[![Licence: MIT](https://img.shields.io/badge/code-MIT-blue.svg)](LICENSE)
[![Content: CC BY-SA 4.0](https://img.shields.io/badge/content-CC%20BY--SA%204.0-lightgrey.svg)](LICENSE-CONTENT)

**Live at [lepetitcours.vercel.app](https://lepetitcours.vercel.app)**, deployed from `main`.

> ### 🚧 Being rewritten
>
> From August 2026 this was a Vue 3 + Vite app with 119 lessons across 14 chapters. On
> **2026-09-05** it was restarted on Next.js. The design system, the app shell and the navigation
> manifest are written; the fourteen chapters are declared and **three lessons exist**, so most of
> the book still shows as *Bientôt*. Accounts and offline caching are not wired up yet.
>
> The Vue implementation is kept in [`.vue/`](.vue/) as a reference. It is not built, not
> imported, and not being ported file-for-file; it is there to be read. See
> [`docs/decisions.md`](docs/decisions.md) for why.

## What it is

Most French courses are written for English speakers. This one is written for **hispanophones**,
which changes the material rather than just the interface language: it leans on what a Spanish
speaker already owns — gendered articles, verb families, reflexives (`se lever` ↔ *levantarse*) —
and flags the false friends that trip them (`une robe` ≠ *la ropa*). It also assumes a **Spanish
keyboard**, where `é`/`è`/`ê` cost a dead-key detour and `œ`/`ç` cannot be typed at all, so drills
prefer clicking to typing wherever accents are involved.

It serves **two kinds of reader**:

- **The learner** — a Spanish speaker starting French from zero. Explanations in Spanish.
- **The heritage speaker** — someone with French family who grew up in Spain, speaks French
  fluently at home, and never went to a French school. She does not need to learn French; she
  needs to learn to *write* it — accents, accord, homophones, the spelling of forms she already
  says correctly. Explanations in French.

They are not two levels of one thing. A heritage speaker can be orally C1 and written A2 at the
same time. One library of lessons serves both, ordered differently for each.

**Levels.** The goal is A1 → C2. The scope is **A1 and A2**, and the rewrite is writing
**A1 alone** first; B1–C2 appear as *bientôt*.
A level counts as complete when it covers the published **DELF** syllabus for that level.

Chapters cover grammar, spelling, conjugation, pronunciation, vocabulary, reading, culture,
dialogues, dictations, graded exercises and replayable games. You can browse them as a book, or
follow a *parcours* — an ordered path through the same lessons for a given level or profile.

**Accounts.** Everything is free and public — no account is needed to read a lesson or play a
drill. An account only exists so your progress follows you across devices, and it holds nothing
but an email, your ticked lessons and your settings.

Full detail in [`docs/scope.md`](docs/scope.md), including what this project deliberately is not.

## Stack

- **Next.js 16** (App Router) · React 19 · TypeScript · React Compiler
- **Plain CSS** — design tokens and shared content patterns in `src/app/globals.css`, component
  styles in co-located CSS Modules. No Tailwind, no CSS-in-JS. Both themes live in one
  `light-dark()` value per token, so a colour cannot be defined for one theme and forgotten in the
  other.
- **Spectral and Inter**, on a palette anchored to the blue the logo is drawn in. The serif sets
  the French being taught, the sans sets the instruction around it — a split by role, so it works
  on both tracks at once.
- **Vercel** for hosting · **Supabase** for auth (magic link) and progress sync — the browser
  client and the session hook are wired; sign-in itself and the schema are not applied yet
- **Serwist** for the service worker and offline precaching (not yet installed)

## Running it

```sh
git clone https://github.com/kevjrmy/le-petit-cours.git
cd le-petit-cours
npm install
npm run dev      # http://localhost:3000
```

```sh
npm run build    # must pass before a change is done
npm run lint
```

Two scripts, both dependency-free and both needing Node 22+ and `google-chrome` on PATH:

```sh
node scripts/shot.mjs http://localhost:3000/ shot.png --full --dark   # themed screenshots
node scripts/make-icons.mjs                                           # every icon, from one SVG
```

Two environment variables — `NEXT_PUBLIC_SUPABASE_URL` and
`NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`. The app **runs without them**: the client returns `null`,
the shell renders signed out, and the whole course still works, because every lesson is public and
static. They are not secrets — the publishable key is public by design and row-level security is
what protects a learner's data.

## How it is put together

- **`src/data/navigation.ts` is the single source of truth** for chapters, lessons, order and
  cross-links. The sidebar, the home page and every chapter page read from it. Nothing
  auto-discovers pages, so a lesson missing from the manifest is reachable from nothing.
- Routes come from the filesystem: `src/app/{chapitre}/{lecon}/page.tsx`. **Chapter landing pages
  are one generated route** — `src/app/[chapitre]/page.tsx` renders all fourteen from the
  manifest, so adding a chapter means adding an entry and nothing else.
- **The shell lives in `src/app/layout.tsx`**, so the sidebar keeps its scroll position and
  expanded chapters across navigation.
- **Lessons are Server Components** — no `'use client'`, no hooks, no state. They prerender to
  HTML and ship no JavaScript. Interactivity (drills, games, audio, the account menu) lives in
  small client leaves, never in the page wrapping them.
- Progress is keyed by route path, ticked **manually** by the learner, and stored behind a
  swappable adapter. It requires an account; the content around it does not. The local copy stays
  the read path even when signed in — this is an offline app, so the server is a sync target and
  never something a render waits on.
- **The session is never read in a layout.** Doing so would opt every lesson underneath out of
  static prerendering and break offline. Only the leaf controls that write progress know who is
  signed in.
- **An exercise is graded; a game is replayable.** An exercise walks a fixed deck once, scores
  out of N on screen and practises one named lesson; a game redraws every round, keeps no tally,
  and pulls from the whole book. Neither stores a score.

## Contributing

Contributions are welcome, and **corrections to the French or the Spanish are the most valuable
thing you can send** — this is teaching material, so an error in it teaches the error. You do not
need to write code to help.

Start with [`CONTRIBUTING.md`](CONTRIBUTING.md). If you are writing lessons or drills, read
[`AGENTS.md`](AGENTS.md) too — it carries the rules and the traps that previous bugs have paid
for.

## Documentation

| File | Carries |
|---|---|
| [`docs/scope.md`](docs/scope.md) | what is being built and for whom — the profiles, the levels, the non-goals |
| [`AGENTS.md`](AGENTS.md) | the conventions and the traps — read before changing anything |
| [`.claude/agents/*.md`](.claude/agents/) | the how-to for each recurring job (design, lessons, drills, wiring, auditing, proofreading) |
| [`docs/decisions.md`](docs/decisions.md) | why the project is shaped this way, and what is still open |
| [`CONTRIBUTING.md`](CONTRIBUTING.md) | how to propose a change |
| [`.vue/AUDIT.md`](.vue/AUDIT.md) | the closed 2026-08 content audit — a record of the bug classes worth checking for |

The deployed site also carries `/design`, a specimen of every shared visual pattern on one page.
It is in no menu and indexed by nothing; it exists so a change to a token can be checked in both
themes before there are enough lessons to check it on.

## Licence

Two licences, because the code and the teaching material want different things:

- **Code** (`src/`, configuration, tooling) — [MIT](LICENSE).
- **Course content** (lessons, exercises, vocabulary, translations) —
  [CC BY-SA 4.0](LICENSE-CONTENT). Reuse and adapt with credit, keeping derivatives under the
  same licence.

**Some included material is under neither and is not ours to relicense** — quoted song lyrics
still in copyright, literary text whose public domain status is jurisdictional, and photographs
under their own individual free licences. Read the "Third-party material" section of
[`LICENSE-CONTENT`](LICENSE-CONTENT) before reusing anything.
