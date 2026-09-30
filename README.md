# Le Petit Cours

**A free, open French course written for Spanish speakers** — a PWA that installs to your home
screen, works offline, and teaches French **in French** from A2 up. Also, for readers who already speak French
at home, a track that teaches them to write it.

[![Licence: MIT](https://img.shields.io/badge/code-MIT-blue.svg)](LICENSE)
[![Content: CC BY-SA 4.0](https://img.shields.io/badge/content-CC%20BY--SA%204.0-lightgrey.svg)](LICENSE-CONTENT)

**Live at [lepetitcours.vercel.app](https://lepetitcours.vercel.app)**, deployed from `main`.

> ### 🚧 Being rewritten
>
> Restarted on Next.js on **2026-09-05**. The design system, the app shell, navigation, search,
> accounts and progress are written; twelve of the sixteen chapters carry lessons —
> [`src/data/navigation.ts`](src/data/navigation.ts) is where to count them. Offline caching is
> not installed yet.

## What it is

Most French courses are written for English speakers. This one is written for **hispanophones** —
which shapes *what gets explained* more than the language it is written in. From A2 up, everything
is explained in French simple enough to read at the level being taught; an A1 page explains in
Spanish and teaches in French, because a beginner cannot use a rule stated in a language they do
not have yet. False friends (`robe`, `sol`, `carte`) are defined where they appear, the mistakes
Spanish pulls a reader towards are printed wrong-then-right, and the drills assume a **Spanish
keyboard** — `œ` and `ç` cannot be typed on one — so they prefer clicking to typing.

It serves **two kinds of reader**:

- **The learner** — a Spanish speaker starting French from zero.
- **The heritage speaker** — someone with French family who grew up in Spain, speaks French
  fluently at home, and never went to a French school. They need to learn to *write* it —
  accents, agreement, homophones, the spelling of forms they already say correctly.

They are not two levels of one thing: a heritage speaker can speak like a C1 and write like an A2.
One library of lessons serves both, ordered differently for each.

**Levels** follow the European framework (CEFR). The course goes **A1 → B2**; A2 was written first,
and A1 and B1 are being written beside it. Each page is written at one level, and signed-in
learners choose which levels are listed; a literary work is one page whose text and questions
follow the learner's level, with the Spanish under each line at A1. A level counts as complete
when it covers the published **DELF** exam syllabus for that level.

Chapters cover grammar, spelling, conjugation, pronunciation, vocabulary, translation, reading,
literature, culture, role-plays, dictations, graded exercises, replayable games, and `delf` — whole practice
exam papers, written for this course rather than copied from a real one.

**Accounts.** Everything is free and public — no account is needed to read a lesson or play a
drill. An account only exists so your ticked lessons follow you across devices, and it holds
nothing but a username, an address nobody can send mail to, your ticks and your settings.

[`docs/scope.md`](docs/scope.md) has the full picture, including what this project deliberately is
not.

## Stack

- **Next.js 16** (App Router) · React 19 · TypeScript · React Compiler
- **Plain CSS** — design tokens in `src/app/globals.css`, component styles in CSS Modules. Both
  themes live in one `light-dark()` value per token.
- **Spectral and Inter**: the serif sets the French being taught, the sans the explanation.
- **Vercel** for hosting · **Supabase** for sign-in and progress sync, against the schema in
  `supabase/migrations/`
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
`NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`. They are not secrets, and the app **runs without them**:
the shell renders signed out and every lesson still works, because every lesson is public and
static.

A third, `FRONTEND_PASSWORD`, is a secret and must never be committed. It guards `/temp`, a scratch
chapter used for a class in progress; without it that chapter is closed to everyone and every other
page works.

## How it is put together

- **`src/data/navigation.ts` is the single source of truth** for chapters, lessons, order and
  cross-links. Nothing auto-discovers pages, so a lesson missing from it is linked from nothing.
- Routes come from the filesystem: `src/app/{chapitre}/{lecon}/page.tsx`. Chapter landing pages
  are one generated route, `src/app/[chapitre]/page.tsx`.
- **Lessons are Server Components** that prerender to static HTML. Interactivity (drills, the
  account menu) lives in small client components, and the session is never read in a layout, so
  every lesson stays static and can work offline.
- **Progress is ticked by hand** and keyed by a permanent lesson id. It is stored locally in
  IndexedDB and synced to Supabase; the local copy is always what the page reads.
- **Signed out, everything is listed; signed in, the learner chooses which levels are**, and may
  follow a parcours, whose next lesson is « La suite ». A filter never blocks access: a lesson at
  another level still opens from a link.

The rules behind each of these, and the traps they guard against, are in [`AGENTS.md`](AGENTS.md).

## Contributing

Contributions are welcome, and **corrections to the French are the most valuable thing you can
send** — this is teaching material, so an error in it teaches the error. You do not
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
| [`docs/levels/`](docs/levels/) | one file per level: its language, its tags, its syllabus and what it still needs |
| [`docs/atelier.md`](docs/atelier.md) | how a page for a class in progress is built |
| [`docs/decisions.md`](docs/decisions.md) | why the project is shaped this way; what is still open is [`AGENTS.md` §12](AGENTS.md) |
| [`CONTRIBUTING.md`](CONTRIBUTING.md) | how to propose a change |

The deployed site also carries `/design`, an unlisted specimen of every shared visual pattern, for
checking a design change in both themes.

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
