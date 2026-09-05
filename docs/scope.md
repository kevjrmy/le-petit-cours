# Goals and scope

What this project is for, who it serves, and — as importantly — what it is not. `AGENTS.md` says
how to build it; `docs/decisions.md` records why each choice was made; this file says what is
being built and for whom.

## Purpose

**Help Spanish speakers reach French, from A1 to C2, for free.**

The long-term ambition is the full CEFR ladder. The **current scope is A1 and A2**; B1 through C2
appear in the interface as *bientôt* and have no content. That is a deliberate limit, not a gap
to be quietly filled — an unbounded A1→C2 project never finishes A1.

## Who it is for

Two learner profiles are served today, both real people currently testing the app. More are
expected; these are the starting points, not the ceiling.

### 1. The learner — *el aprendiz*

A native Spanish speaker acquiring French from zero. Currently one A2 student.

- Has: Spanish, and the transfer it gives — gendered nouns, verb families, reflexives.
- Lacks: the language.
- Needs: FLE progression. Vocabulary, structures, listening, speaking situations, and the grammar
  that makes them work.
- Fails at: producing a sentence at all.

### 2. The heritage speaker — *el francófono de origen*

Someone with French family — typically one French parent — who grew up in Spain, speaks French
fluently at home, and never attended a French school. Currently one student, French on her
mother's side. There are families like this across Spain who want to keep the link to the
language, and they are an explicit audience, not a side effect.

- Has: the spoken language, an ear, native intuition.
- Lacks: **literacy**. Spelling, accents, accord, homophones (`a`/`à`, `et`/`est`,
  `ses`/`ces`/`c'est`), the written forms of conjugations she pronounces correctly without
  thinking.
- Needs: remediation — in substance, French primary-school orthography.
- Fails at: writing down a sentence she can say perfectly.

**These are two pedagogies, not two levels.** A heritage speaker can be orally C1 and
written A2 at the same time, so a single CEFR badge mislabels her in both directions: call her A2
and it insults her French, call her C1 and it hides the pages she actually needs.

The content library serves both — the Vue app was already half-built for the second profile,
since its "Bled content patterns" come from a textbook written for native French schoolchildren.
What differs between the profiles is the **ordering and the entry point**, not the pool of
lessons.

## Two ways in: the book and the parcours

- **The book.** Browse by chapter — grammaire, orthographe, conjugaison, vocabulaire… This is the
  reference view, and it is what exists today. A learner who wants *les articles* goes and reads
  *les articles*.
- **A parcours.** An ordered path through the same lessons, with a position in it. `Parcours A1`
  and `Parcours A2` follow the DELF syllabus; a heritage parcours (« Écrire le français ») walks
  the orthography and conjugation pages in remediation order.

One library, several orderings. Every lesson carries one or more CEFR **level tags** — a page can
serve A1 and A2 at once — so greying out B1–C2 is
a filter rather than a fork in the codebase, and adding a profile later means adding a parcours
rather than an app.

## What "done" means

**A level is complete when it covers the published DELF syllabus for that level.**

An external anchor rather than judgement, because it makes coverage checkable, exposes gaps in the
existing content instead of hiding them, gives learners a target they could actually sit, and —
once teachers are contributing — gives everyone a shared reference to argue from rather than
taste.

Concretely: map lessons to DELF A1 and A2 descriptors, and track which descriptors have no lesson.
The 119 Vue lessons are a starting inventory to map against, not a claim of coverage.

## Language of instruction

Explanations are in **Spanish** for the learner track, and in **French** for the heritage track —
she already speaks French, so routing an explanation of French spelling through Spanish is a
detour, and the Bled teaches in French for the same reason.

**English is never used anywhere, for either profile.** No English glosses, no English mnemonics
(never DR & MRS VANDERTRAMP). Never assume the learner reads English.

> ### Known tension: shared pages have one language
>
> The two rules collide on the pages both profiles use — the orthography and conjugation
> chapters serve the learner *and* the heritage speaker, and a page cannot be Spanish-first and
> French-first at once.
>
> The working resolution: **each lesson declares its metalanguage**, and lessons written for the
> heritage track are French-first. Where a topic genuinely needs both, that becomes two lessons
> rather than one bilingual page — but only when a real page demonstrates the need, not in
> anticipation. This is recorded as open in `AGENTS.md` §12; do not build a translation layer to
> solve it speculatively.

## Accounts and access

**Everything is public.** Every lesson, drill and game is readable and playable with no account:
no auth wall, no sign-up interstitial, nothing gated behind an email address. That is a principle,
and it is also what keeps the lessons statically prerendered and precacheable — which is what makes
the app work offline at all.

**An account is required to keep a learning path** — the « J'ai terminé » tick, the level you are
working at, and the position in a parcours those imply, across devices. There is no anonymous progress: one storage path, one
owner.

An account holds an **email, progress rows and settings, and nothing else**. No analytics on
learners, no behavioural tracking. Sign-in is a magic link, so there is no password to forget and
none for this project to be responsible for.

## Platform

- **Today: a PWA.** Installable, offline, one codebase. This is sufficient and will remain so for
  a long time.
- **Eventually: React Native.** Not scheduled, not started, and nothing should be delayed for it —
  but it is the reason to keep content and logic free of DOM assumptions. See `docs/decisions.md`
  #10: this weighs heavily toward content-as-data over MDX or per-lesson TSX, since a lesson
  written as data survives the move and a lesson written as markup does not.

## Contribution model

- **Today: a single contributor.** The repository is public and openly licensed (MIT / CC BY-SA
  4.0) and outside corrections are welcome through GitHub, but there is no contributor programme.
- **Later: a curated group of recognised teachers** able to suggest and contribute content.
  Curated, not open-slather: teaching material is only as good as its review.
- Worth remembering when that time comes: **GitHub is already a curated contribution system** —
  invited reviewers, restricted merge rights. An in-app authoring flow is only worth building for
  teachers who will not touch git, and that is a question to answer with real teachers rather than
  in advance. Keeping lessons in files a non-developer can read keeps the door open cheaply.

## Principles

- **Free, and open.** No paywall, no premium tier, no ads.
- **Works offline.** A learner on the métro is a first-class case, not a degraded one.
- **No engagement mechanics.** No streaks, no guilt notifications, no daily-goal nagging. A family
  keeping a language link across generations is not a retention funnel, and progress here is
  ticked by hand precisely so the app never pretends to know what someone has learned.
- **Correct before complete.** This is teaching material: a wrong page teaches the error. Shipping
  fewer, right lessons beats broad coverage that has to be trusted.
- **Spanish speakers specifically.** The whole value is in the contrast with Spanish — cognates,
  false friends, structures the learner already owns. A generic multi-language course would lose
  exactly what makes this one worth writing.

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

- The metalanguage of shared pages (above).
- Whether the heritage parcours gets its own front door or stays one path among several.
- When B1 opens, and whether the same two profiles still describe the audience by then.
- What a third learner profile looks like — expected, but not yet met.
