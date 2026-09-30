# Goals and scope

What this project is for, who it serves, and — as importantly — what it is not. `AGENTS.md` says
how to build it; `docs/decisions.md` records why; this file says what is being built and for whom.

## Purpose

**Help Spanish speakers reach French, from A1 to B2, for free.**

**The ladder stops at B2** (#75) — C1 and C2 serve academic or professional French, which is
neither profile below. A2 was written first (#74); A1 and B1 are written into the same chapters and
all three are choosable while being written, with nothing in the interface rating them (#77). B2 is
declared and cannot be chosen. A page has one level; a visitor sees them all, and a learner chooses
which to see (#86). The mechanics are in `AGENTS.md` §1; each rung's syllabus and gap is in
`docs/levels/`. That limit is deliberate: an unbounded project never finishes a level.

Nothing announces what is unwritten: a chapter is offered in the commit that gives it a page (#51).

## Who it is for

Two learner profiles are served today. **The course is written for profiles, not for people**:
learners come and go, while what a profile needs stays. More profiles are expected. **Nobody gets
a programme of their own**: a mistake learners keep making only decides which page the profile gets
next (#69).

### 1. The learner — *el aprendiz*

A native Spanish speaker acquiring French from zero.

- Has: Spanish, and the transfer it gives — gendered nouns, verb families, reflexives.
- Lacks: the language.
- Needs: FLE progression. Vocabulary, structures, listening, speaking situations, and the grammar
  that makes them work.
- Fails at: producing a sentence at all.

### 2. The heritage speaker — *el francófono de origen*

Someone with French family — typically one French parent — who grew up in Spain, speaks French
fluently at home, and never attended a French school. They may be an adult or a teenager at a
Spanish school, where every page they write is in Spanish, so their written French declines. Such
families across Spain are an explicit audience, not a side effect.

- Has: the spoken language, an ear, native intuition.
- Lacks: **literacy**. Spelling, accents, accord, homophones (`a`/`à`, `et`/`est`,
  `ses`/`ces`/`c'est`), the written forms of conjugations they pronounce correctly without
  thinking.
- Brings: **Spanish writing habits**, learnt at school. One written accent where French has
  three, Spanish spellings of shared words (*comisión* behind « comission »), no space before
  `? ! : ;`.
- Needs: remediation — in substance, French primary- and middle-school orthography, and a page
  that names the Spanish habit behind the mistake.
- Fails at: writing down a sentence they can say perfectly.

**Written for a teenager and an adult at once**: no childish register, and no example that only
makes sense at work.

**Two pedagogies, not two levels** (#13): orally C1 and written A2 at once, so one CEFR badge
mislabels them either way. The library serves both; what differs is the **ordering and the entry
point** — the chapter lean is in `AGENTS.md` §1.

### 3. The child — planned, not yet written

A child learning French, **served through a Kids mode** — « Espace enfants » on screen — that is
neither a level nor a chapter. **Game first**, and **watched by a parent**. Nothing is written for
it; how it works is open (`AGENTS.md` §12.5), and the monitoring has to be squared with « not a
student-management system » below and with an account that holds nothing about its behaviour
(#18, #31).

## Two ways in: the chapters and the parcours

- **The chapters.** Browse by chapter — grammaire, orthographe, conjugaison, vocabulaire… The
  reference view, filtered by the levels a learner chose (#86).
- **The exam.** `delf` holds whole épreuves to sit in real conditions, written for this course
  (#78). It is the last chapter because it teaches nothing: it asks for everything above it at
  once, in the exam's own time.
- **A parcours** — an ordered path through the same lessons, in étapes (#14, #88), chosen at
  first sign-in (`/bienvenue`, #90) and changed in the account; « La suite » walks it. `Parcours A1`, `A2` and `B1` follow the DELF syllabus, A2 ending
  on its épreuves (#89); « Écrire le français » walks the orthography and conjugation pages in
  remediation order — the heritage speaker's door, with no level.

One library, several orderings: a level is a filter the learner sets, not a fork in the codebase,
and a new profile means a new parcours rather than a new app.

## What "done" means

**A level is complete when it covers the published DELF syllabus for that level** (#15) — an
external anchor that makes coverage checkable, exposes gaps, and gives contributors a shared
reference rather than taste. A count of published pages is an inventory, never a claim of coverage.

The syllabus is the *Inventaire linguistique des contenus clés des niveaux du CECRL* (CIEP /
Eaquals, 2015), Annexe E; no official DELF grammar programme exists. **Coverage is measured on the
fonctions**, mapped against the lessons in each level's file in `docs/levels/`.

## Language of instruction

**From A2 up, everything is written in French** (#53); **an A1 page explains in Spanish** and
teaches in French (#85); a `traduction` page's source text is Spanish as material (#55). The
interface stays French at every level. **English is never used.** The rules are in `AGENTS.md` §1.

The reader being a Spanish speaker decides *what gets explained and how plainly* — false friends
defined, interference errors printed wrong-then-right — not which language explains. One language
from A2 also keeps the course usable by a Brazilian, Italian or Moroccan reader.

## Accounts and access

**Everything is public** (#18): no auth wall, nothing gated behind an email address. That is also
what keeps lessons prerendered and precacheable, so the app works offline.

**One chapter is the exception, and it is not part of the course.** « Atelier » holds the pages of
a class in progress and is emptied every week (#80), behind a single shared password (#81). It
buys no secrecy — the pages are in this public repository, anonymous — only keeps one-class
material out of the way of someone expecting a course. See `docs/atelier.md`.

**An account is required to keep a learning path** — the « J'ai terminé » tick, the level you work
at, and a position in a parcours, across devices. There is no anonymous progress (#48).

An account holds a **username, an email, a password, progress rows and settings** (a level and an
optional display name), **and nothing else**. The address is fake (`@lepetitcours.test`), so
accounts are made by hand (#37). No analytics on learners, no behavioural tracking.

## Platform

- **Today: a PWA.** Installable, offline, one codebase — sufficient for a long time.
- **Eventually: React Native.** Not scheduled, but the reason to keep content and logic free of
  DOM assumptions, and a weight toward content-as-data (#10).

## Contribution model

- **Today: a single contributor.** The repository is public and openly licensed (MIT / CC BY-SA
  4.0) and outside corrections are welcome through GitHub, but there is no contributor programme.
- **Later: a curated group of recognised teachers.** Curated, not open-slather: teaching material
  is only as good as its review. GitHub already is a curated contribution system; an in-app
  authoring flow is worth building only for teachers who will not touch git, a question for real
  teachers rather than for now.

## Principles

- **Free, and open.** No paywall, no premium tier, no ads.
- **Works offline.** A learner on the métro is a first-class case, not a degraded one.
- **No engagement mechanics.** No streaks, no guilt notifications, no daily-goal nagging. Progress
  is ticked by hand so the app never pretends to know what someone has learned.
- **Correct before complete.** A wrong page teaches the error. Fewer, right lessons beat broad
  coverage that has to be trusted.
- **Spanish speakers specifically.** The value is in the contrast with Spanish — cognates, false
  friends, structures the learner already owns.

## Non-goals

Stated so a "no" is about scope rather than about the person asking:

- **Not a chat or social app.** No feeds, no follower counts, no public profiles.
- **Not a tutor marketplace.** No booking, no payments, no lesson scheduling.
- **Not speech-recognition pronunciation grading.** The app speaks; it does not score how you
  sound. That technology is unreliable enough to actively mislead a learner.
- **Not a general language platform.** French for Spanish speakers. Not French for everyone, not
  every language for everyone.
- **Not a student-management system.** No classes, no assignments, no grade books — the
  collaborative ambition is about contributing *content*, not administering learners.
- **Not certification.** DELF is the yardstick for coverage; the app does not examine or certify.

## Open

Tracked here, decided in `docs/decisions.md` when they close:

- When B2 opens (`docs/levels/b2.md`).
- The Kids mode (`AGENTS.md` §12.5): what a parent sees, what a game is, where the mode lives.
