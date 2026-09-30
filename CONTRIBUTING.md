# Contributing to Le Petit Cours

Thank you for considering it. This is teaching material, so an error in it does not just look
bad — it teaches the error. **Corrections to the French are the most valuable contribution you can
make, and they need no code at all.**

## What is most useful

**1. Corrections to the French.** A wrong accent, a broken elision, an agreement error, a form
that is not standard, an example that contradicts the rule above it. If something reads wrong to a
native or advanced speaker, that is worth an issue on its own — you do not have to propose the fix.

**2. Unflagged false friends.** From A2 up the course is written entirely in French, so a word a
Spanish speaker reads wrong has to be defended *in French*, where it appears: *une robe* with no
example making the wrong reading impossible is worth an issue. Corrections to the Spanish of an A1
page are welcome on the same terms.

**3. Facts.** Dates, authors, works, chefs-lieux, historical claims. Cheap to check and
embarrassing to get wrong in a course.

**4. Broken drills.** A wrong answer key, two defensible answers, a correct answer marked wrong.
These are the worst bugs in the project: the app looks like it is working while it confirms a
mistake.

**5. Accessibility and dark-mode problems.** Both are requirements here, not polish.

**6. Code.** New lessons, new exercise mechanics, the shell, the design system.

## Before you open a pull request

- **For anything more than a typo, open an issue first.** Especially for a new lesson or chapter —
  the course is sequenced deliberately, and where a topic sits matters as much as whether it exists.
- **One change per pull request.** A French correction and a refactor are two reviews.
- **A new lesson** says which chapter, which **level**, which **DELF descriptor** it covers, and
  what it follows. A lesson that maps to nothing in the DELF syllabus needs a reason. The authoring
  format is not settled yet ([`AGENTS.md`](AGENTS.md) §12), so large content contributions may be
  premature.
- **« Atelier » (`temp`) is not a chapter to contribute to.** It is scratch space for a class in
  progress, emptied weekly and password-protected on the site (#80, #81); finding it empty is
  normal.

## The constraints that are not negotiable

These come from the audience, and a change that breaks one will be asked to change. The full rules
are in [`AGENTS.md`](AGENTS.md); the `#nn` numbers point into
[`docs/decisions.md`](docs/decisions.md).

- **Two readers, not one** ([`docs/scope.md`](docs/scope.md)): a Spanish speaker learning from
  zero, and a heritage speaker who speaks French and needs to learn to *write* it — not a higher
  level (#13).
- **French only from A2 up** (#53): no Spanish gloss, no translation column, no bilingual page.
  Spanish appears only as a `traduction` page's source text (#55) and as an A1 page's explanation
  (#85); anywhere else it is a bug.
- **The explanation's French is simpler than the French taught**: define false friends rather than
  translate them, and print the common wrong sentence beside the right one.
- **English is never used** — no English glosses, no English mnemonics (no DR & MRS VANDERTRAMP).
- **Scope is A1, A2 and B1**; B2 takes no content yet; **C1 and C2 are out of scope** (#75).
  `docs/levels/` says what each level still needs.
- **No literary tenses, no metalanguage beyond *verbe, sujet, adjectif, accord*** — except on the
  heritage track.
- **Spanish keyboard**: prefer clicking to typing where an answer carries accents; type-in only
  where the spelling is the skill.
- **A lesson is two or three sections.** A topic that needs more is two lessons.
- **Dark mode and mobile are not optional**: check both themes at all three widths — open sidebar,
  icons-only rail (about 1000 px), mobile drawer.
- **No raw colour values in components** — every colour comes from a design token.
- **The serif marks the French taught** (`<span className="fr">`); on an A1 page the section is
  `lang="es"` and every piece of French takes `lang="fr"` back (#85).
- **Every lesson declares one `level`**, or `null` for a page that answers to no rung (#86). A
  lower level gets a new, simpler page, never a second tag (#72).
- **`sets` means one body of work per level**, and its material must match it exactly (#87).
- **Changing `level` is free; adding or removing `sets` is a data migration** (#68).
- **A parcours names lessons by id** (`src/data/parcours/`, #88): a lesson removed or re-id'd
  leaves every parcours first, or the build fails.
- **A lesson's `id` is permanent** (`chapitre-nom`): changing it silently erases everyone's tick on
  it (#50).
- **No copyrighted text.** Public-domain works or original writing; song lyrics as short excerpts
  only; images CC0, public domain, CC BY or CC BY-SA, credited and stored locally (#83 is the one
  linked exception).
- **No exam paper, including the free official DELF sujets** (#78): describe the format, copy
  nothing, and add none to `public/` — anything there is published.

[`docs/scope.md`](docs/scope.md) carries the goals, the profiles and the non-goals — read it
before proposing anything larger than a correction. The briefs in
[`.claude/agents/`](.claude/agents/) carry the how-to for each kind of work; they are written for
AI coding agents, but they are the same instructions a human needs.

## Working on it

```sh
npm install
npm run dev      # http://localhost:3000
npm run build    # must pass before a change is done
npm run lint
```

Before you open the pull request:

1. `npm run build` passes.
2. Any page you touched renders correctly in **light and dark**, at desktop width, at 1000 px (the
   rail) and at 430 px. `node scripts/shot.mjs <url> out.png --full --dark` photographs it; browser
   flags for dark mode no longer work.
3. If you touched navigation, the audit in
   [`.claude/agents/nav-wiring.md`](.claude/agents/nav-wiring.md) reports `none` on all six
   lines.
4. If you touched a drill, you **played it through once**, including the score screen — which is
   the part nobody tests.
5. If you touched a rule rather than just content, the documentation moved with it.

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
course, textbook, website, app or exam paper: we cannot relicense it, and it would have to be
removed later along with anything built on it.

## Conduct

By participating you agree to the [Code of Conduct](CODE_OF_CONDUCT.md).
