# Goals and scope

What this project is for, who it serves, and — as importantly — what it is not. `AGENTS.md` says
how to build it; `docs/decisions.md` records why each choice was made; this file says what is
being built and for whom.

## Purpose

**Help Spanish speakers reach French, from A1 to B2, for free.**

**The ladder stops at B2** (#75) — C1 and C2 are out of scope, not deferred: they serve someone
doing academic or professional French, which is neither profile below. The scope being written is
**A1 and A2**. The course started
with **A2 alone** — sized to the DELF A2 syllabus rather than to however many lessons exist —
because the learners it was started for are at A2 (below). **A1 is now being written** into the same
chapters, ahead of the A2 material. **A1 and B1 are both choosable while they are being written**
(#74) and are marked « en cours » in the account, with a line saying what each actually holds —
switching away from A2 today shows *fewer* lessons, not more, since no page belongs to A1 or B1
alone. DELF coverage is still what "done" means (#15); it decides when a level stops being marked
« en cours », not when it may be chosen. `docs/programme-a1.md` is the syllabus and the gap.

B1's first content is the nine `lecture` texts and two `exercices` drills, which each carry a
harder question set, reached by working at B1 — the level is set in the account and never on the
page (#68, #73). B2 is declared and empty. That is a deliberate limit, not a gap to be quietly
filled: an unbounded project never finishes a level.

Nothing announces what is unwritten: a lesson appears in the interface in the commit that creates
it, and until then its chapter is simply not offered (`docs/decisions.md` #51, #52).

## Who it is for

Two learner profiles are served today. **The course is written for profiles, not for people**:
real learners suggested both, and learners come and go, while what a profile needs stays. More
profiles are expected; these are the starting points, not the ceiling. **Nobody gets a programme of
their own**: a learner has an ordinary account, and a mistake learners keep making only decides
which page the profile gets next (`docs/decisions.md` #69).

### 1. The learner — *el aprendiz*

A native Spanish speaker acquiring French from zero.

- Has: Spanish, and the transfer it gives — gendered nouns, verb families, reflexives.
- Lacks: the language.
- Needs: FLE progression. Vocabulary, structures, listening, speaking situations, and the grammar
  that makes them work.
- Fails at: producing a sentence at all.

### 2. The heritage speaker — *el francófono de origen*

Someone with French family — typically one French parent — who grew up in Spain, speaks French
fluently at home, and never attended a French school. They may be an adult or a teenager still at
a Spanish school, where every page they write is in Spanish, so their written French does not
stand still, it declines. There are families like this across Spain who want to keep the link to
the language, and they are an explicit audience, not a side effect.

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

**Written for a teenager and an adult at once.** A page for this profile works for both: no
childish register, and no example that only makes sense at work.

**These are two pedagogies, not two levels.** A heritage speaker can be orally C1 and
written A2 at the same time, so a single CEFR badge mislabels them in both directions: call them A2
and it insults their French, call them C1 and it hides the pages they actually need.

The content library serves both. What differs between the profiles is the **ordering and the entry
point**, not the pool of lessons: `orthographe`, `dictees`, `astuces` and `conjugaison` lean to the
heritage speaker, `grammaire`, `vocabulaire` and `conversation` to the learner, and both read the
same pages when the page suits them.

## Two ways in: the chapters and the parcours

- **The chapters.** Browse by chapter — grammaire, orthographe, conjugaison, vocabulaire… This is the
  reference view, and it is what exists today. A learner who wants *les articles* goes and reads
  *les articles*.
- **A parcours.** An ordered path through the same lessons, with a position in it. `Parcours A1`
  and `Parcours A2` follow the DELF syllabus; a heritage parcours (« Écrire le français ») walks
  the orthography and conjugation pages in remediation order.

One library, several orderings. Every lesson carries a set of CEFR **level tags**, so a level that
is not being offered is a filter rather than a fork in the codebase, and adding a profile later
means adding a parcours rather than an app.

**A tag says who a page is written for, not who still needs it** (#72). A page serving two levels at
once is the exception and not the shape to reach for: where a topic appears at two levels it
normally appears with different exponents — A1 negates with `ne… pas`, A2 with `ne… plus / rien` —
and that is a second, simpler page, not a second tag on the first. One page serves two levels only
where the *stimulus* has no floor and the task scales, which is a reading's question set or a
drill's item bank, never a prose explanation.

## What "done" means

**A level is complete when it covers the published DELF syllabus for that level.**

An external anchor rather than judgement, because it makes coverage checkable, exposes gaps in the
existing content instead of hiding them, gives learners a target they could actually sit, and —
once teachers are contributing — gives everyone a shared reference to argue from rather than
taste.

Concretely: map lessons to DELF A2 descriptors first, then A1, and track which descriptors have no
lesson. A count of published pages is an inventory, never a claim of coverage.

**The published syllabus is the *Inventaire linguistique des contenus clés des niveaux du CECRL***
(CIEP / Eaquals, 2015), which France Éducation international distributes because no official DELF
grammar programme exists. Its Annexe E lists fonctions, grammaire, socio-culturel and thèmes per
level. **Coverage is measured on the fonctions**: the DELF tests communication, not grammar.

## Language of instruction

**Everything is written in French.** The explanations, the tables, the callouts, the drill
instructions and the interface — one language, on every page, for both profiles
(`docs/decisions.md` #53).

**One exception, and it is exact**: the source text of a `traduction/` page is in Spanish, because
a translation exercise cannot exist without one (#55). Spanish is *material to be translated*
there, never explanation — the instructions, the hints and the model version on those pages are
French like everywhere else.

The reader is still, in the main, a Spanish speaker. That fact did not go away; it moved. It no
longer decides *which language explains*, it decides *what gets explained and how plainly*: the
false friends get a French definition instead of a gloss, the interference errors are printed
wrong-then-right, and the French of the explanation stays easier than the French being taught. A
page that needs a translation to be understood is a page written at the wrong level.

**Why one language.** The old rule — Spanish for the learner, French for the heritage speaker —
had a reader in mind and a nationality attached to them. The course is public, and a Spanish gloss
is dead weight for a Brazilian, an Italian or a Moroccan reader who is otherwise squarely in the
audience. Immersion is also how French is taught to adults everywhere; the monolingual FLE
textbook is not an accident.

**English is never used anywhere, for either profile.** No English glosses, no English mnemonics
(never DR & MRS VANDERTRAMP). Never assume the reader knows English.

## Accounts and access

**Everything is public.** Every lesson, drill and game is readable and playable with no account:
no auth wall, no sign-up interstitial, nothing gated behind an email address. That is a principle,
and it is also what keeps the lessons statically prerendered and precacheable — which is what makes
the app work offline at all.

**An account is required to keep a learning path** — the « J'ai terminé » tick, the level you are
working at, and the position in a parcours those imply, across devices. There is no anonymous
progress: one storage path, one owner. Signed out the tick is still drawn at the foot of every
lesson and offers the way in, returning to the lesson afterwards — the site says what an account is
for rather than pretending to remember (`decisions.md` #48).

An account holds a **username, an email, a password, progress rows and settings, and nothing else**
— the settings being a chosen CEFR level and an optional display name, which is shown to its owner
and to nobody else, because there is nobody else to show it to. The address is real storage but a
fake value: every account has an `@lepetitcours.test` one nobody can receive mail at, which is why
accounts are created by hand rather than registered for (`decisions.md` #37). Sign-in takes the
username or the address (#38). No analytics on learners, no behavioural tracking.

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

- Whether the heritage parcours gets its own front door or stays one path among several.
- When B1 opens, and whether the same two profiles still describe the audience by then.
- What a third learner profile looks like — expected, but not yet met.
