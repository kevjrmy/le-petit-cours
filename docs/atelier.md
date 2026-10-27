# The atelier

Writing an atelier page: the `atelier` chapter, « Atelier » on screen — pages for one class in
progress, shared during the call, then promoted or deleted (#80). Its pages have `level: null`. **Adding and
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
the text and its correction, `_exercice/` (`Choix`, `Faute`, `Trous`, `Quiz`, `Partie`, `Ordre`,
and the « tu » `Bilan`) for the practice. **Clicks, never typing** — the answers carry accents a Spanish keyboard
cannot type (§1) — and **no shuffle**: the items follow the text, and the page stays prerendered. A
trick for a heritage speaker leans on the ear, not on a list to memorise.

Three shapes have served. **A page of trucs**: the copy, a hunt aloud, the copy again with gaps
(`Trous`), the hidden corrigé, then one truc at a time, each with its own board (`Choix`), a défi
(`Faute`) and « En résumé ». **A page of families**: the gaps first, the copy hidden under them
(`Corrige` with `voir`), a table sorting the corrections into families, and a quiz. **A page on
how a text is built**, from the learner's last copy: its parts in a table, then easy to hard — the
copy's own paragraphs back in order (`Ordre`), sentences sorted into their part (`Partie`), a short
literary text from the course back in order — and the two texts side by side.

- **A gap or a board never offers a second right answer** (§9): no well-formed passé simple beside
  a passé composé, no trap that differs from the right form by an agreement the page does not teach.
- **`Ordre` and `Partie` need one defensible place per piece**: each carries its clue (« En
  conclusion », « Ce lion », a minute). The scramble is written in the data, no piece already in
  its place.
- **`Quiz` is two clicks**: the well-written question among four, then the answer; the point needs
  both. A wrong writing is the question with **one** piece replaced (`juste` → `faux`), never retyped.
- **A fact in a quiz is dated and checked against a source** (« en 2010 », « à l'Euro 2024 »): a
  total or a record changes at the next competition, a dated result does not.

## A learner's own text (#80, AGENTS.md §9b)

- **Anonymous, and only here.** No name, age, school, town, class or date of birth — in the page,
  the manifest, a comment or a **commit message**. Characters from a book summarised stay.
- **The photo, the transcript and the notes stay in `.private/`**, gitignored. Only the anonymous
  copy reaches `src/app/atelier/`.
- A page that cannot be written without saying whose it is stays out: a name can be reverted out
  of the tree, never out of anyone's clone. **If a local hook refuses a commit, fix the content;
  never `--no-verify`.**

## What the chapter is not

- **Not tracked.** No tick under the page or in its listing; `scratch: true` keeps it out of
  every parcours and `/ma-progression`.
- **Not linked into** — the link would vanish at the reset. An atelier page may point out at
  lessons.
- **Not promised.** Ids carry the date and are never reused (`atelier-2026-09-29-…`); a removed page gets
  no redirect; each page carries `noindex` of its own, whatever the site asks for itself (#95).
- **Not listed, and lockable.** The chapter has a lock: `FRONTEND_PASSWORD` (#81), checked by
  `src/proxy.ts`, which matches `/atelier` alone and reads no session. **It is lifted since
  2026-10-06** (`ATELIER_VERROUILLE` in `src/lib/atelier.ts`), so anyone with a link reads a page.
  **Do not widen the matcher, and never write the password anywhere** but `.env` and Vercel.
- **Not a place to keep things.** A page worth keeping is rewritten into its chapter as **a new page
  with a new id** and a real `level`. Pages piling up for months mean the chapter is misfiled
  (#80).
