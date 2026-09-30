# The atelier

Writing an atelier page: the `temp` chapter, « Atelier » on screen — pages for one class in
progress, shared during the call, then promoted or deleted (#80). Its pages are `ANY`. **Adding and
clearing pages is `nav-wiring.md`** (« The atelier »).

## Who reads it

**The learner in front of the tutor**, not a profile (#80). So the page may say « tu » and restyle
a shared pattern through `_texte/Page.module.css`, scoped to the atelier. **The course's own
patterns never change for it.** The language follows the course's: Spanish explanation only at A1
(#85).

## Building a class

**One page is one class**, built in steps, each agreed before the next:

1. **The learner's text as written**, then corrected — the raw material stays in `.private/<date>/`.
2. **A plan**: which recurring mistakes, in what order, with which exercises.
3. **The page, section by section.** Stop where the class will go on orally.

The furniture exists, in folders that leave with the chapter: `_texte/` (`Copie`, `Corrige`) for
the text and its correction, `_exercice/` (`Choix`, `Faute`, `Trous`, and the « tu » `Bilan`) for
the practice. **Clicks, never typing** — the answers carry accents a Spanish keyboard cannot type
(§1) — and **no shuffle**: the items follow the text, and the page stays prerendered. A trick for a
heritage speaker leans on the ear, not on a list to memorise.

## A learner's own text (#80, AGENTS.md §9b)

- **Anonymous, and only here.** No name, age, school, town, class or date of birth — in the page,
  the manifest, a comment or a **commit message**. Characters from a book summarised stay.
- **The photo, the transcript and the notes stay in `.private/`**, gitignored. Only the anonymous
  copy reaches `src/app/temp/`.
- A page that cannot be written without saying whose it is stays out: a name can be reverted out
  of the tree, never out of anyone's clone. **If a local hook refuses a commit, fix the content;
  never `--no-verify`.**

## What the chapter is not

- **Not tracked.** No tick under the page or in its listing; `scratch: true` keeps it out of
  `nextUp` and `/ma-progression`.
- **Not linked into** — the link would vanish at the reset. An atelier page may point out at
  lessons.
- **Not promised.** Ids carry the date and are never reused (`temp-2026-09-29-…`); a removed page gets
  no redirect; the sitemap lists none of its pages.
- **Not open.** The chapter sits behind `FRONTEND_PASSWORD` (#81), checked by `src/proxy.ts`, which
  matches `/temp` alone and reads no session. **Do not widen the matcher, and never write the
  password anywhere** but `.env` and Vercel.
- **Not a place to keep things.** A page worth keeping is rewritten into its chapter as **a new page
  with a new id** and a real `levels` tag. Pages piling up for months mean the chapter is misfiled
  (#80).
