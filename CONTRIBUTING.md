# Contributing to Le Petit Cours

Thank you for considering it. This is teaching material, so an error in it does not just look
bad — it teaches the error. **Corrections to the French or the Spanish are the most valuable
contribution you can make, and they need no code at all.**

## What is most useful

**1. Corrections to the French.** A wrong accent, a broken elision, an agreement error, a form
that is not standard, an example that contradicts the rule above it. If you are a native or
advanced speaker reading a page and something is off, that is worth an issue on its own — you do
not have to propose the fix.

**2. Corrections to the Spanish.** Every gloss and translation column is Spanish. A gloss that is
*wrong* (as opposed to merely loose — loose is fine at A2) is a bug. So is an unflagged false
friend: a page that introduces *une robe* without warning it is not *la ropa* is missing
something the learner will get wrong.

**3. Facts.** Dates, authors, works, chefs-lieux, historical claims. Cheap to check and
embarrassing to get wrong in a course.

**4. Broken drills.** An exercise whose answer key is wrong, or that has two defensible answers,
or that marks a correct answer wrong. These are the worst bugs in the project because the app
looks like it is working while it confirms a mistake.

**5. Accessibility and dark-mode problems.** Both are requirements here, not polish.

**6. Code.** New lessons, new exercise mechanics, the shell, the design system.

## Before you open a pull request

- **For anything more than a typo, open an issue first.** Especially for a new lesson or chapter —
  the book is sequenced deliberately, and where a topic sits matters as much as whether it exists.
- **One change per pull request.** A French correction and a refactor in the same branch are two
  reviews wearing one hat.
- If you are proposing a *new* lesson, say which chapter it belongs to, which **level** it is,
  which **DELF descriptor** it covers, and what it displaces or follows. A level is considered
  complete when it covers the DELF syllabus for that level, so a lesson that maps to nothing in it
  needs a reason. See the open questions in [`docs/decisions.md`](docs/decisions.md) — the authoring
  format for lessons is not settled yet, so large content contributions may be premature.

## The constraints that are not negotiable

These come from the audience, and a change that breaks one will be asked to change:

- **There are two readers, not one** (see [`docs/scope.md`](docs/scope.md)): a native Spanish
  speaker learning French from zero, and a heritage speaker who grew up with spoken French in
  Spain and needs to learn to *write* it. They need opposite things, and the second one is not
  simply a higher level — she can be orally C1 and written A2 at the same time.
- **Instruction is in Spanish for the learner track and in French for the heritage track.**
  **English is never used for either** — no English glosses, no English mnemonics (no DR & MRS
  VANDERTRAMP). Never assume the reader knows English.
- **Current scope is A1 and A2.** B1–C2 are shown as *bientôt* and take no content yet. Short
  sentences, everyday vocabulary, no literary tenses, no metalanguage beyond *verbe, sujet,
  adjectif, accord* — the heritage track is the one place school grammar vocabulary is allowed.
- **They type on a Spanish keyboard.** Prefer clicking to typing wherever an answer carries French
  accents. Type-in earns its place only where the *spelling* is the skill.
- **A lesson is two or three sections.** A topic that needs more is two lessons.
- **Dark mode is not optional**, and neither is the mobile layout. Every visual change is checked
  in both themes at both breakpoints.
- **No raw colour values in components** — everything comes from a design token, or it freezes in
  light mode.
- **No copyrighted text.** Reading pages use public-domain works or original writing. Song pages
  quote short excerpts for commentary and never a full lyric sheet. Images must be CC0, public
  domain, CC BY or CC BY-SA, credited individually with author, link and licence, and stored
  locally rather than hotlinked — the app has to work offline.

[`docs/scope.md`](docs/scope.md) carries the goals, the profiles and the non-goals — read it
before proposing anything larger than a correction. [`AGENTS.md`](AGENTS.md) carries the full
rules and, more usefully, the traps that previous bugs
have already paid for. The briefs in [`.claude/agents/`](.claude/agents/) carry the how-to for
each kind of work — writing a lesson, writing a drill, wiring navigation, styling, auditing,
proofreading. They are written for AI coding agents but they are the same instructions a human
needs.

## Working on it

```sh
npm install
npm run dev      # http://localhost:3000
npm run build    # must pass before a change is done
npm run lint
```

Before you open the pull request:

1. `npm run build` passes.
2. Any page you touched renders correctly in **light and dark**, at desktop width and at 430 px.
3. If you touched navigation, the manifest/filesystem audit in
   [`.claude/agents/nav-wiring.md`](.claude/agents/nav-wiring.md) reports `none` on both lines.
4. If you touched a drill, you **played it through once**, including the score screen — which is
   the part nobody tests.
5. If you touched a rule rather than just content, the documentation moved with it. Docs and
   behaviour disagreeing means the change is not finished.

## Writing style for issues and reviews

Say what is wrong, where, and what it should say instead. If you are not certain a form is
standard, **say you are not certain** — a confident wrong correction in teaching material is worse
than the original error, and it is much harder to catch later.

## Licensing your contribution

By contributing, you agree that your contribution is licensed under the same terms as the rest of
the project:

- **code** under the [MIT licence](LICENSE);
- **course content** (lessons, exercises, vocabulary, translations, prose) under
  [CC BY-SA 4.0](LICENSE-CONTENT).

You must have the right to contribute what you submit. Do not paste in material from another
course, textbook, website or app: quoted lyrics, copyrighted literary text and third-party
photographs cannot be relicensed by us, and content contributed without the right to license it
has to be removed later, along with anything built on it.

## Conduct

By participating you agree to the [Code of Conduct](CODE_OF_CONDUCT.md).
