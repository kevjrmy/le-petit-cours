/**
 * Single source of truth for the course's structure.
 *
 * The sidebar, the sommaire and every chapter landing page read from this file.
 * Routes are the filesystem now, so there is no route table to keep in step —
 * but an entry with no `page.tsx` is a link to a 404, and a `page.tsx` with no
 * entry here is a page nothing links to. See `.claude/agents/nav-wiring.md` for
 * the audit that catches both.
 *
 * **Every entry is a page that exists** (`docs/decisions.md` #51). There is no
 * flag for an announced-but-unwritten lesson and no row that cannot be clicked:
 * a lesson enters this file in the commit that creates its folder, and a
 * chapter with an empty `lessons` array is simply not offered anywhere until
 * one does.
 *
 * **Every chapter is in that state right now** (#52). The three A1 pages written
 * during the scaffold were deleted on 2026-09-06: the course serves an A2
 * learner, and three A1 lessons were a sample of a level nobody here is at. What
 * is left is the shape — fifteen chapters, their blurbs, their icons — and the
 * first real lesson will be A2.
 *
 * **Chapter order is inherited, not decided.** Which chapters
 * carry the A2 content and in what order is still open (`AGENTS.md` §12) and is
 * meant to be settled by the DELF A2 syllabus, not by whatever this file
 * happened to say first.
 */

/**
 * The rungs this course teaches. **It stops at B2** (#75).
 *
 * C1 and C2 are not deferred, they are out of scope: they serve someone doing
 * academic or professional French, which is neither of the two profiles this
 * course is written for (`docs/scope.md`). Declaring them would say the ladder
 * continues, and a level declared and never written is the "coming soon" #51
 * refuses everywhere else.
 *
 * **This is the course's ladder, not CEFR's**, and the difference is
 * load-bearing. A heritage speaker is described as "orally C1 and written A2"
 * in `AGENTS.md` §1 and in #13 — that is CEFR the framework describing a
 * person, not a value this type could ever hold. **Do not "fix" that prose to
 * say B2**: it would stop being true about the reader in order to agree with a
 * union that is about the syllabus.
 */
export type Level = "A1" | "A2" | "B1" | "B2";

/**
 * A lesson's permanent name, and the key every tick is stored under.
 *
 * **It is not the path.** A path is an editorial choice — it carries the title,
 * the chapter and whatever spelling looked right the day the page was written,
 * and all three are things a course revises. An id is chosen once and never
 * changes again, so renaming a page, moving it to another chapter or resplitting
 * it costs nothing a learner can see.
 *
 * The chapter prefix (`gram-`, `ex-`, `conj-`) is a reading aid for whoever is
 * looking at a diff, **not a lookup key**. Nothing parses it, and a lesson that
 * moves chapters keeps the id it was born with — the alternative is an id that
 * means something, which is an id that can go out of date.
 *
 * Shape: lower case, digits and hyphens, alphanumeric at both ends, 2–64
 * characters. `assertLessonIds()` below enforces it at import time and
 * `progress_lesson_id_shape` enforces it again in Postgres.
 */
export type LessonId = string;

/**
 * What every listable page carries — a lesson, a chapter row, an annexe.
 *
 * Split from `Lesson` for one reason: `id` is required on a lesson and must not
 * exist on anything else. Only a lesson can be ticked, so only a lesson has a
 * key to be ticked under, and an annexe carrying a spare id would be an
 * invitation to store progress against `/compte`.
 */
export interface PageEntry {
  /** Route path. Unique, and what every link is written against. */
  path: string;
  /** Plain text, used for the sidebar, search and accessible names. */
  title: string;
  /** Optional rich label — superscripts and the like. Must say the same thing. */
  titleHtml?: string;
  /** Optional secondary line: a translation, an author, a scenario. */
  subtitle?: string;
  /** Optional short badge: a skill area, a verb group. */
  tag?: string;
  /**
   * The rungs this page is **listed at**. **Required**, and `[]` is how you say
   * "no level, always visible" — the verb sheets and the spelling pages, which
   * answer to literacy rather than to a CEFR rung. An omitted field and a
   * deliberate `[]` must not look the same in a diff, which is what makes
   * forgetting to tag a page a type error (#23).
   *
   * **A page is listed from its floor upward** (#76), because the levels are a
   * ladder and a learner who climbs does not stop needing what they climbed on.
   * `from("A2")` is the normal value: written at A2, still listed at B1 and
   * above, since nothing supersedes it. A tag written out — `["A1"]` on an A1
   * twin — is the exception, and it claims the page is superseded above.
   * **Widening is upward only**: tagging the A2 imparfait `A1` hands a beginner
   * the harder explanation, which is what #72's second page exists to avoid.
   *
   * **This decides listing, never the tick.** A page whose material is the same
   * at every rung it is listed at keeps one tick, shared — which is the whole
   * point of listing it at several. `perLevel` below is what says otherwise.
   */
  levels: Level[];
  /**
   * The DELF descriptor this page answers to, when it answers to one.
   *
   * **A page serving several levels answers to one descriptor per level** (#68)
   * — a claim about what its questions check, and the questions are what the
   * level changes. `delfFor()` resolves it; a plain string is the same claim at
   * every level the page serves.
   */
  delf?: string | Partial<Record<Level, string>>;
  /** ISO date. Drives "récemment ajouté"; a wrong one misplaces the page. */
  created?: string;
}

/**
 * A page of the course, and the only kind of page progress is kept on.
 *
 * **`id` is required, and it is required here rather than on `PageEntry`** so
 * that adding a lesson without one is a type error rather than a page that
 * quietly cannot be ticked. Give it a value once, at creation, and treat it as
 * frozen from that commit on: changing one is deleting every learner's tick on
 * that lesson, silently, with nothing failing anywhere.
 */
export interface Lesson extends PageEntry {
  id: LessonId;
  /**
   * Set when the page holds **one body of work per level** — a `lecture` text
   * with a question set per level, an `exercices` drill with an item bank per
   * level (#68). It is what the tick keys on (#76): `progressKey` returns
   * `id@LEVEL` here and the bare `id` everywhere else, so a learner who read a
   * text at A2 and moved to B1 does not find the B1 questions already ticked.
   *
   * **It is not `levels.length > 1`, and that is the whole point** (#76). Since
   * a page is listed from its floor upward, most multi-level pages are one
   * lesson shown at several rungs — the imparfait is the same page at A2 and at
   * B1 and keeps **one** tick, which is what makes widening a tag free. Only a
   * page that genuinely changes with the level sets this.
   *
   * **A page that sets it lists exactly the levels it has material for**, so
   * `from()` is wrong here: write the levels out. The two lists live in
   * different files — the sets in `questions.ts` / `data.ts` beside the page —
   * and the manifest wins where they differ, so a level tagged with nothing
   * behind it would serve another level's material rather than fail. The
   * `nav-wiring` audit compares them, in both directions.
   *
   * **Adding or removing it is a data migration.** It moves every tick on the
   * page between `id` and `id@LEVEL`, and nothing fails: the circle simply goes
   * empty. Ship the backfill in the same commit (`AGENTS.md` §8).
   */
  perLevel?: true;
}

/**
 * The marks the shell can draw, and the only values `icon` accepts.
 *
 * Declared here rather than in the component because the manifest owns the
 * vocabulary, and because being a union is what makes both directions a
 * compile error: a chapter with no icon does not typecheck, and
 * `ChapterIcon`'s `Record<IconName, …>` cannot be missing one either. That is
 * the repair to #29 — an earlier map ended `?? icons.default`, so a forgotten
 * chapter rendered a generic glyph and nothing failed (#42).
 */
export type IconName =
  | "grammaire"
  | "conjugaison"
  | "orthographe"
  | "vocabulaire"
  | "astuces"
  | "prononciation"
  | "exercices"
  | "jeux"
  | "dictees"
  | "conversation"
  | "traduction"
  | "lecture"
  | "litterature"
  | "musique"
  | "culture"
  | "delf"
  | "sommaire"
  | "progression"
  | "compte";

export interface Chapter {
  slug: string;
  /**
   * The mark shown beside the title in the sidebar, and alone in the rail.
   * **Required**: at the tablet breakpoint the sidebar is icons only, so a
   * chapter with no icon is a row with nothing in it (#42). Sommaire cards
   * still use the chapter's initial in the serif — that is a different mark
   * for a different surface, and #29's reasoning still holds there.
   */
  icon: IconName;
  path: string;
  title: string;
  /** Used where the full title does not fit — the sidebar, a breadcrumb. */
  shortTitle?: string;
  blurb: string;
  lessons: Lesson[];
}

/**
 * The levels a learner can actually choose.
 *
 * **This list is the only gate there is.** It used to mirror a
 * `settings_level_known` check constraint; that table is gone and the level now
 * lives in the account's user metadata, which carries no constraints (#36). So
 * nothing downstream will catch a level that is not here — `saveLevel` checks
 * against this list before writing and `readLevel` checks against it on the way
 * back, and there is no third line of defence.
 *
 * **A level is offered while it is being written, not once it is finished**
 * (#74). That reverses the older test — a level joined when choosing it handed
 * someone a course. #74 paid for it with a « en cours » badge in the chooser
 * and a second list, `COURSE_LEVELS`, saying which levels had earned none;
 * **#77 deleted both**, because they were addressed to a stranger and this
 * course has none. **So this list is now the only one**, and an entry here is
 * an offer with nothing qualifying it — which is why a level joins it when it
 * has pages someone can work through, not when it looks ready.
 *
 * **Closing a level is not free.** `readLevel` filters on this list too, so
 * removing an entry makes anyone sitting on it read back as "no level chosen".
 * Their stored value survives in metadata and is ignored, which is a silent
 * reset rather than data loss — but it is silent.
 */
export const CHOOSABLE_LEVELS: Level[] = ["A1", "A2", "B1"];

/**
 * The rungs in order, low to high. **The ladder, not a set** — `from()` slices
 * it, so adding a rung to `Level` and to this list is all it takes for every
 * page already written to be listed at it.
 */
export const LADDER: readonly Level[] = ["A1", "A2", "B1", "B2"];

/* Shorthands for the `levels` field, so a lesson entry reads as one line.

   **A page is listed from its floor upward** (#76). The levels are a ladder and
   a learner who climbs does not stop needing what they climbed on: a B1 who
   never sees the imparfait because it was written at A2 is looking at a filter
   that hides the course from the people it was written for. So `from("A2")` is
   the normal value — written at A2, listed at every rung above it — and it
   costs nothing, because the tick follows the *material* (`perLevel`) and not
   the tag.

   **Widening is upward only.** `from` has no downward twin on purpose: tagging
   the A2 imparfait `A1` would hand a beginner the harder explanation, and the
   answer to "A1 needs this too" is the simpler A1 page #72 asks for.

   **The exception is a page something higher up supersedes**, and it writes its
   levels out — `["A1"]` on an A1 twin, which stops at A1 because the A2 page
   takes over there. A written-out tag is a claim that something above replaces
   this page, never just "this is the level it teaches at".

   `ANY` is "no level at all, always visible": the literacy pages, which answer
   to spelling rather than to a CEFR rung, and the verb sheets, which #68 names
   as the case a level cannot describe — a conjugation table is the same table
   at every level. It is not the same claim as `from("A1")`, which says a page
   is written at the bottom rung and climbs. */
const from = (level: Level): Level[] => LADDER.slice(LADDER.indexOf(level));
const ANY: Level[] = [];

/* The levels a `perLevel` page has material for, written out rather than sliced
   from the ladder: here the tag *is* the list of sets, so it stops where they
   do (#76). A B2 face for these nine readings and two drills would be a B2
   question set, not a wider tag. */
const A2B1: Level[] = ["A2", "B1"];

export const chapters: Chapter[] = [
  {
    slug: "grammaire",
    icon: "grammaire",
    path: "/grammaire",
    title: "Grammaire",
    blurb:
      "Les règles essentielles : les mots, leur accord et la construction de la phrase.",
    /* Ordered as a course, not alphabetically: word classes first, then the
       tenses in teaching order, then pronouns. */
    lessons: [
      {
        id: "gram-negation",
        path: "/grammaire/la-negation",
        title: "La négation",
        levels: from("A2"),
        delf: "Dire ce qu’on ne fait pas, ce qu’on n’a pas",
        created: "2026-09-12",
      },
      {
        id: "gram-passe-compose",
        path: "/grammaire/le-passe-compose",
        title: "Le passé composé",
        levels: from("A2"),
        delf: "Raconter un événement passé",
        created: "2026-09-06",
      },
      {
        id: "gram-imparfait",
        path: "/grammaire/l-imparfait",
        title: "L’imparfait",
        levels: from("A2"),
        delf: "Décrire une situation ou une habitude au passé",
        created: "2026-09-06",
      },
      {
        id: "gram-pc-ou-imparfait",
        path: "/grammaire/passe-compose-ou-imparfait",
        title: "Passé composé ou imparfait ?",
        levels: from("A2"),
        delf: "Choisir le temps du passé dans un récit",
        created: "2026-09-06",
      },
      {
        id: "gram-futur-proche",
        path: "/grammaire/le-futur-proche",
        title: "Le futur proche",
        levels: from("A2"),
        delf: "Dire ce qu’on va faire, projeter une action",
        created: "2026-09-12",
      },
      {
        id: "gram-pronoms-cod-coi",
        path: "/grammaire/les-pronoms-cod-coi",
        title: "Les pronoms COD et COI",
        levels: from("A2"),
        delf: "Reprendre un mot déjà dit sans le répéter",
        created: "2026-09-06",
      },
      /* Les deux premières pages écrites pour le B1. Elles viennent après
         l'A2 parce qu'un chapitre suit l'ordre du cours (#72) : le
         plus-que-parfait se construit sur le passé composé et l'imparfait,
         et le conditionnel sur les terminaisons de l'imparfait. */
      {
        id: "gram-plus-que-parfait",
        path: "/grammaire/le-plus-que-parfait",
        title: "Le plus-que-parfait",
        levels: from("B1"),
        delf: "Raconter en situant une action avant une autre",
        created: "2026-09-21",
      },
      {
        id: "gram-conditionnel-present",
        path: "/grammaire/le-conditionnel-present",
        title: "Le conditionnel présent",
        levels: from("B1"),
        delf: "Demander poliment, et dire ce qui arriverait",
        created: "2026-09-21",
      },
    ],
  },
  {
    slug: "conjugaison",
    icon: "conjugaison",
    path: "/conjugaison",
    title: "Conjugaison",
    blurb:
      "Les tableaux des verbes les plus utiles, du présent au futur, à l’affirmatif comme au négatif.",
    lessons: [
      {
        id: "conj-etre",
        path: "/conjugaison/etre",
        title: "être",
        tag: "Auxiliaire",
        levels: ANY,
        delf: "Présent, imparfait, passé composé, futur simple, impératif.",
        created: "2026-09-06",
      },
      {
        id: "conj-avoir",
        path: "/conjugaison/avoir",
        title: "avoir",
        tag: "Auxiliaire",
        levels: ANY,
        delf: "Présent, imparfait, passé composé, futur simple, impératif.",
        created: "2026-09-06",
      },
      {
        id: "conj-parler",
        path: "/conjugaison/parler",
        title: "parler",
        tag: "1er groupe",
        levels: ANY,
        delf: "Présent, imparfait, passé composé, futur simple, impératif.",
        created: "2026-09-06",
      },
      {
        id: "conj-finir",
        path: "/conjugaison/finir",
        title: "finir",
        tag: "2e groupe",
        levels: ANY,
        delf: "Présent, imparfait, passé composé, futur simple, impératif.",
        created: "2026-09-06",
      },
      {
        id: "conj-manger",
        path: "/conjugaison/manger",
        title: "manger",
        tag: "1er groupe",
        levels: ANY,
        delf: "Présent, imparfait, passé composé, futur simple, impératif.",
        created: "2026-09-06",
      },
      {
        id: "conj-commencer",
        path: "/conjugaison/commencer",
        title: "commencer",
        tag: "1er groupe",
        levels: ANY,
        delf: "Présent, imparfait, passé composé, futur simple, impératif.",
        created: "2026-09-06",
      },
      {
        id: "conj-aller",
        path: "/conjugaison/aller",
        title: "aller",
        tag: "3e groupe",
        levels: ANY,
        delf: "Présent, imparfait, passé composé, futur simple, impératif.",
        created: "2026-09-06",
      },
      {
        id: "conj-faire",
        path: "/conjugaison/faire",
        title: "faire",
        tag: "3e groupe",
        levels: ANY,
        delf: "Présent, imparfait, passé composé, futur simple, impératif.",
        created: "2026-09-06",
      },
      {
        id: "conj-prendre",
        path: "/conjugaison/prendre",
        title: "prendre",
        tag: "3e groupe",
        levels: ANY,
        delf: "Présent, imparfait, passé composé, futur simple, impératif.",
        created: "2026-09-06",
      },
      {
        id: "conj-venir",
        path: "/conjugaison/venir",
        title: "venir",
        tag: "3e groupe",
        levels: ANY,
        delf: "Présent, imparfait, passé composé, futur simple, impératif.",
        created: "2026-09-06",
      },
      {
        id: "conj-partir",
        path: "/conjugaison/partir",
        title: "partir",
        tag: "3e groupe",
        levels: ANY,
        delf: "Présent, imparfait, passé composé, futur simple, impératif.",
        created: "2026-09-12",
      },
      {
        id: "conj-pouvoir",
        path: "/conjugaison/pouvoir",
        title: "pouvoir",
        tag: "3e groupe",
        levels: ANY,
        delf: "Présent, imparfait, passé composé, futur simple, impératif.",
        created: "2026-09-06",
      },
      {
        id: "conj-vouloir",
        path: "/conjugaison/vouloir",
        title: "vouloir",
        tag: "3e groupe",
        levels: ANY,
        delf: "Présent, imparfait, passé composé, futur simple, impératif.",
        created: "2026-09-06",
      },
      {
        id: "conj-devoir",
        path: "/conjugaison/devoir",
        title: "devoir",
        tag: "3e groupe",
        levels: ANY,
        delf: "Présent, imparfait, passé composé, futur simple, impératif.",
        created: "2026-09-12",
      },
    ],
  },
  {
    slug: "orthographe",
    icon: "orthographe",
    path: "/orthographe",
    title: "Orthographe",
    blurb:
      "Accorder en genre et en nombre, choisir le bon déterminant, ne plus confondre les homophones.",
    /* The literacy chapter: what a reader who already speaks French gets wrong
       in writing, and what a learner gets wrong for the same reason — the
       forms sound identical. */
    lessons: [
      {
        id: "orth-accents",
        path: "/orthographe/les-accents",
        title: "Les accents et la cédille",
        subtitle: "é · è · ê · ë · ç",
        levels: ANY,
        delf: "Écrire les signes qui font partie du mot",
        created: "2026-09-12",
      },
      {
        id: "orth-homophones",
        path: "/orthographe/les-homophones",
        title: "Les homophones",
        subtitle: "a / à · et / est · on / ont · son / sont · ou / où",
        levels: ANY,
        delf: "Écrire sans confondre les mots qui se prononcent pareil",
        created: "2026-09-06",
      },
      {
        id: "orth-determinants-possessifs",
        path: "/orthographe/les-determinants-possessifs",
        title: "Les déterminants possessifs",
        subtitle: "mon / ma / mes · son / sa / ses · leur / leurs",
        levels: ANY,
        delf: "Écrire à qui la chose appartient, et l’accorder",
        created: "2026-09-12",
      },
      {
        id: "orth-terminaisons-verbales",
        path: "/orthographe/les-terminaisons-verbales",
        title: "Les terminaisons verbales",
        subtitle: "-er · -é · -ez · -ais / -ait",
        levels: ANY,
        delf: "Écrire la terminaison du verbe sans se fier à l’oreille",
        created: "2026-09-17",
      },
    ],
  },
  {
    slug: "vocabulaire",
    icon: "vocabulaire",
    path: "/vocabulaire",
    title: "Vocabulaire",
    blurb: "Les mots du quotidien, par thème, avec des exemples pour les employer.",
    lessons: [
      /* L'A1 s'insère avant l'A2, jamais à la suite (#72) : la liste non
         filtrée est celle que voit un visiteur déconnecté, et « l'heure »
         au-dessus des nombres s'y lirait comme une page cassée. */
      {
        id: "voc-nombres",
        path: "/vocabulaire/les-nombres",
        title: "Les nombres",
        subtitle: "Compter, un prix, un âge, un numéro",
        levels: from("A1"),
        delf: "Compter, dire un prix, un âge et un numéro",
        created: "2026-09-21",
      },
      {
        id: "voc-famille",
        path: "/vocabulaire/la-famille",
        title: "La famille",
        subtitle: "Les liens, et la famille qui arrive après",
        levels: from("A1"),
        delf: "Nommer les membres de sa famille et dire qui ils sont",
        created: "2026-09-21",
      },
      {
        id: "voc-heure",
        path: "/vocabulaire/l-heure",
        title: "L’heure",
        levels: from("A2"),
        delf: "Demander et dire l’heure, fixer un rendez-vous",
        created: "2026-09-06",
      },
      {
        id: "voc-jours-et-date",
        path: "/vocabulaire/les-jours-et-la-date",
        title: "Les jours et la date",
        levels: from("A2"),
        delf: "Situer un événement dans la semaine, dans l’année",
        created: "2026-09-12",
      },
      {
        id: "voc-travail",
        path: "/vocabulaire/le-travail",
        title: "Le travail",
        subtitle: "Le métier, le lieu, le contrat",
        levels: from("A2"),
        delf: "Parler de son métier et de ses conditions de travail",
        created: "2026-09-12",
      },
      {
        id: "voc-recette-croissants",
        path: "/vocabulaire/la-recette-des-croissants",
        title: "La recette des croissants",
        subtitle: "Les ingrédients, les ustensiles, les gestes",
        levels: from("A2"),
        delf: "Suivre une recette écrite et nommer ce qu’elle demande",
        created: "2026-09-15",
      },
    ],
  },
  {
    slug: "astuces",
    icon: "astuces",
    path: "/astuces",
    title: "Astuces",
    blurb:
      "Un truc à retenir, ses exceptions, et un lien vers la leçon qui l'explique en entier.",
    lessons: [
      {
        id: "astuce-etre-ou-avoir",
        path: "/astuces/etre-ou-avoir",
        title: "Être ou avoir ?",
        subtitle: "Choisir l’auxiliaire du passé composé",
        levels: from("A2"),
        delf: "Raconter un événement passé",
        created: "2026-09-12",
      },
      {
        id: "astuce-a-en-au-aux",
        path: "/astuces/a-en-au-aux",
        title: "à, en, au ou aux ?",
        subtitle: "Devant une ville, devant un pays",
        levels: from("A2"),
        delf: "Dire où l’on habite, où l’on va, d’où l’on vient",
        created: "2026-09-12",
      },
    ],
  },
  {
    slug: "prononciation",
    icon: "prononciation",
    path: "/prononciation",
    title: "Prononciation",
    blurb: "Lire le français à voix haute : les groupes de lettres et leurs sons.",
    lessons: [],
  },
  {
    slug: "exercices",
    icon: "exercices",
    path: "/exercices",
    title: "Exercices",
    blurb: "Mettre la théorie en pratique. Chaque exercice se corrige tout seul.",
    /* Un exercice par mécanique, pas par leçon : le tri montre la famille des
       verbes en être d'un coup d'œil, la correction fait chercher la faute. */
    lessons: [
      {
        id: "ex-etre-ou-avoir",
        path: "/exercices/etre-ou-avoir",
        title: "Être ou avoir ?",
        tag: "Tri",
        levels: A2B1,
        perLevel: true,
        delf: {
          A2: "Choisir l’auxiliaire du passé composé",
          B1: "Choisir l’auxiliaire quand le verbe en change selon qu’il a un complément d’objet.",
        },
        created: "2026-09-12",
      },
      {
        id: "ex-trouve-la-faute",
        path: "/exercices/trouve-la-faute",
        title: "Trouvez la faute",
        tag: "Correction",
        levels: A2B1,
        perLevel: true,
        delf: {
          A2: "Repérer et corriger un homophone mal écrit",
          B1: "Appliquer le test de remplacement à des homophones que rien ne sépare à l’oreille.",
        },
        created: "2026-09-12",
      },
      {
        id: "ex-terminaisons",
        path: "/exercices/les-terminaisons",
        title: "Les terminaisons",
        subtitle: "Le verbe parler, aux cinq temps de la fiche",
        tag: "Tableau",
        levels: from("A2"),
        delf: "Écrire les terminaisons du 1er groupe aux cinq temps du programme A2",
        created: "2026-09-15",
      },
    ],
  },
  {
    slug: "jeux",
    icon: "jeux",
    path: "/jeux",
    title: "Jeux",
    blurb:
      "Des parties courtes qui rebrassent le vocabulaire du cours. Rien n'est noté, tout se rejoue.",
    lessons: [],
  },
  {
    slug: "dictees",
    icon: "dictees",
    path: "/dictees",
    title: "Dictées",
    blurb: "Écouter, écrire, comparer. Avec le texte et ses points de vigilance.",
    lessons: [],
  },
  {
    slug: "conversation",
    icon: "conversation",
    path: "/conversation",
    title: "Conversation",
    blurb:
      "Des situations de la vie quotidienne à jouer à deux, avec des aides à regarder ou à ignorer.",
    lessons: [
      /* Les deux scènes A1, avant les six scènes A2 (#72). Chaque niveau a la
         sienne : une scène ne se partage pas comme un texte de lecture, parce
         que #57 fait la page de ses étapes et de son nuage de mots, et les
         deux changent entièrement d'un niveau à l'autre. */
      {
        id: "conv-se-presenter",
        path: "/conversation/se-presenter",
        title: "Se présenter",
        subtitle: "À quelqu’un que vous rencontrez",
        tag: "Jeu de rôle",
        levels: from("A1"),
        delf: "Se présenter, s’informer sur l’identité, faire répéter.",
        created: "2026-09-21",
      },
      {
        id: "conv-faire-des-achats",
        path: "/conversation/faire-des-achats",
        title: "Faire des achats",
        subtitle: "À la boulangerie, au marché",
        tag: "Jeu de rôle",
        levels: from("A1"),
        delf: "Demander une quantité, comprendre un prix, payer.",
        created: "2026-09-21",
      },
      {
        id: "conv-rendez-vous-medecin",
        path: "/conversation/prendre-rendez-vous",
        title: "Prendre rendez-vous",
        subtitle: "Chez le médecin",
        tag: "Jeu de rôle",
        levels: from("A2"),
        delf: "Demander un rendez-vous, proposer et accepter une heure.",
        created: "2026-09-06",
      },
      {
        id: "conv-demander-son-chemin",
        path: "/conversation/demander-son-chemin",
        title: "Demander son chemin",
        subtitle: "Dans une ville inconnue",
        tag: "Jeu de rôle",
        levels: from("A2"),
        delf: "Demander et suivre un itinéraire simple, faire répéter.",
        created: "2026-09-12",
      },
      {
        id: "conv-au-restaurant",
        path: "/conversation/au-restaurant",
        title: "Au restaurant",
        subtitle: "Commander, et régler l’addition",
        tag: "Jeu de rôle",
        levels: from("A2"),
        delf: "Commander un repas, poser une question sur un plat, payer.",
        created: "2026-09-12",
      },
      {
        id: "conv-parler-espagne",
        path: "/conversation/parler-de-l-espagne",
        title: "Parler de l’Espagne",
        subtitle: "À des enfants de dix ans",
        tag: "Jeu de rôle",
        levels: from("A2"),
        delf: "Décrire son pays et sa vie quotidienne, en réponse à des questions simples.",
        created: "2026-09-06",
      },
      {
        id: "conv-parler-du-travail",
        path: "/conversation/parler-du-travail",
        title: "Parler du travail",
        subtitle: "Avec un collègue français",
        tag: "Jeu de rôle",
        levels: from("A2"),
        delf: "Comparer ses horaires et ses habitudes de travail avec ceux d’un autre pays.",
        created: "2026-09-07",
      },
      {
        id: "conv-decrire-sa-ville",
        path: "/conversation/decrire-sa-ville",
        title: "Décrire sa ville",
        subtitle: "À une amie qui vient vous voir",
        tag: "Jeu de rôle",
        levels: from("A2"),
        delf: "Décrire son cadre de vie, situer un lieu et conseiller un visiteur.",
        created: "2026-09-15",
      },
    ],
  },
  {
    slug: "traduction",
    icon: "traduction",
    path: "/traduction",
    title: "Traduction",
    blurb:
      "De courts textes à écrire en français, avec trois indices quand vous bloquez.",
    lessons: [
      {
        id: "trad-une-journee",
        path: "/traduction/une-journee",
        title: "Une journée",
        subtitle: "Quatre phrases au passé",
        tag: "Traduction",
        levels: from("A2"),
        delf: "Écrire un court récit au passé à partir d’un texte source.",
        created: "2026-09-06",
      },
      {
        /* The id predates the text: this slot held « Quand j’étais petite »
           until the résumé replaced it, and an id never changes (#50). */
        id: "trad-quand-jetais-petite",
        path: "/traduction/le-resume-d-un-film",
        title: "Le résumé d’un film",
        subtitle: "Ratatouille, en quatre négations",
        tag: "Traduction",
        levels: from("A2"),
        delf: "Écrire un court résumé et dire ce qui ne se passe pas.",
        created: "2026-09-15",
      },
      {
        id: "trad-week-end-plage",
        path: "/traduction/un-week-end-a-la-plage",
        title: "Un week-end à la plage",
        subtitle: "a / à · et / est · on / ont · son / sont · où / ou",
        tag: "Traduction",
        levels: from("A2"),
        delf: "Écrire des phrases simples sans confondre les homophones.",
        created: "2026-09-06",
      },
      {
        id: "trad-hier-dans-la-rue",
        path: "/traduction/hier-dans-la-rue",
        title: "Hier, dans la rue",
        subtitle: "Les pronoms au passé composé",
        tag: "Traduction",
        levels: from("A2"),
        delf: "Raconter un échange en remplaçant les noms par des pronoms.",
        created: "2026-09-06",
      },
    ],
  },
  {
    slug: "lecture",
    icon: "lecture",
    path: "/lecture",
    title: "Lecture",
    blurb:
      "De courts textes à lire, avec des questions pour vérifier ce que vous avez compris.",
    lessons: [
      {
        id: "lect-entretien-embauche",
        path: "/lecture/un-entretien-d-embauche",
        title: "Un entretien d’embauche",
        subtitle: "Dialogue écrit pour ce cours",
        tag: "Compréhension",
        levels: A2B1,
        perLevel: true,
        delf: {
          A2: "Comprendre un échange professionnel simple et en retenir les faits.",
          B1: "Lire un entretien comme un genre : une réponse qui n’accuse personne, un fait transformé en argument, une objection devancée.",
        },
        created: "2026-09-12",
      },
      {
        id: "lect-lion-et-rat",
        path: "/lecture/le-lion-et-le-rat",
        title: "Le Lion et le Rat",
        subtitle: "Jean de La Fontaine, 1668",
        tag: "Compréhension",
        levels: A2B1,
        perLevel: true,
        delf: {
          A2: "Comprendre un récit court en vers et en dégager la morale.",
          B1: "Lire une fable comme une forme : deux morales qui n’en font pas une, une question qui n’en est pas une, un titre déplacé.",
        },
        created: "2026-09-12",
      },
      {
        id: "lect-invitation-voyage",
        path: "/lecture/l-invitation-au-voyage",
        title: "L’Invitation au voyage",
        subtitle: "Charles Baudelaire, 1857",
        tag: "Compréhension",
        levels: A2B1,
        perLevel: true,
        delf: {
          A2: "Lire un poème et retrouver ce qu’il nomme : à qui il parle, ce qu’il propose, ce que le refrain décrit.",
          B1: "Lire ce qu’un temps verbal engage : un conditionnel qui retire la chambre au réel, un « ne… que » pris pour un éloge, un compliment qui garde un mot de méfiance.",
        },
        created: "2026-09-15",
      },
      {
        id: "lect-phileas-fogg",
        path: "/lecture/phileas-fogg",
        title: "Phileas Fogg",
        subtitle: "Jules Verne, 1873",
        tag: "Compréhension",
        levels: A2B1,
        perLevel: true,
        delf: {
          A2: "Comprendre la description d’une personne et de ses habitudes, et des heures précises.",
          B1: "Lire un portrait construit par soustraction, et le vocabulaire d’un tribunal posé sur une faute de deux degrés.",
        },
        created: "2026-09-07",
      },
      {
        id: "lect-cosette-bois",
        path: "/lecture/cosette-dans-le-bois",
        title: "Cosette dans le bois",
        subtitle: "Victor Hugo, 1862",
        tag: "Compréhension",
        levels: A2B1,
        perLevel: true,
        delf: {
          A2: "Suivre un dialogue simple et en tirer qui parle, à qui, et de quoi.",
          B1: "Lire ce qu’un silence et un « donc » laissent entendre, et ce qu’un seul mot dit de la place d’une enfant.",
        },
        created: "2026-09-07",
      },
      {
        id: "lect-cyrano",
        path: "/lecture/cyrano-de-bergerac",
        title: "Cyrano de Bergerac",
        subtitle: "Edmond Rostand, 1897",
        tag: "Compréhension",
        levels: A2B1,
        perLevel: true,
        delf: {
          A2: "Suivre une scène de théâtre et dire qui fait quoi, dans un lieu public.",
          B1: "Lire une scène de foule : deux registres dans une salle, un jeu de mots sur le nom du théâtre, un vers partagé entre deux voix.",
        },
        created: "2026-09-07",
      },
      {
        id: "lect-swann",
        path: "/lecture/du-cote-de-chez-swann",
        title: "Du côté de chez Swann",
        subtitle: "Marcel Proust, 1913",
        tag: "Compréhension",
        levels: A2B1,
        perLevel: true,
        delf: {
          A2: "Comprendre le récit d’un souvenir et repérer ce qui est concret dans un texte difficile.",
          B1: "Suivre un texte difficile : un verbe qui avoue une erreur, une comparaison qui mesure l’espace, un dormeur qui se croit éveillé.",
        },
        created: "2026-09-07",
      },
      {
        id: "lect-romeo-juliette",
        /* The one text in the chapter that was not written in French. The
           subtitle names the translator rather than only the author, because
           that is the labelling: what she reads is F.-V. Hugo's French, and a
           translation is somebody's work (#60). */
        path: "/lecture/romeo-et-juliette",
        title: "Roméo et Juliette",
        subtitle: "Shakespeare, traduit par François-Victor Hugo",
        tag: "Compréhension",
        levels: A2B1,
        perLevel: true,
        delf: {
          A2: "Comprendre le début d’une pièce traduite : le lieu, les personnages, le conflit.",
          B1: "Lire un prologue qui annonce le prix de la paix, une métaphore du destin, et un tutoiement qui sert d’arme.",
        },
        created: "2026-09-07",
      },
      {
        id: "lect-monte-cristo",
        path: "/lecture/le-comte-de-monte-cristo",
        title: "Le Comte de Monte-Cristo",
        subtitle: "Alexandre Dumas, 1844",
        tag: "Compréhension",
        /* The first page to carry a question set per level (#68). The extract
           was chosen for it: Morrel asking after his cargo before his dead
           captain, and Danglars giving a compliment back as an insult, are
           there to be read at either level — what changes is how much of it the
           question asks her to see. `questions.ts` holds both sets and its keys
           must stay in step with this line. */
        levels: A2B1,
        perLevel: true,
        delf: {
          A2: "Suivre un dialogue et repérer ce qu’un personnage veut vraiment, sans qu’il le dise.",
          B1: "Lire entre les lignes d’un dialogue : ce qu’un adverbe juge, ce qu’une phrase coupée laisse deviner.",
        },
        created: "2026-09-08",
      },
    ],
  },
  {
    slug: "litterature",
    icon: "litterature",
    path: "/litterature",
    title: "Littérature",
    blurb:
      "Les classiques français : par où commencer, et ce qu’on trouve dans chacun.",
    lessons: [
      {
        id: "litt-par-ou-commencer",
        path: "/litterature/par-ou-commencer",
        title: "Par où commencer",
        subtitle: "Quatorze classiques, et lequel ouvrir en premier",
        levels: ANY,
        created: "2026-09-12",
      },
    ],
  },
  {
    slug: "musique",
    icon: "musique",
    path: "/musique",
    title: "Musique",
    blurb: "Apprendre en chantant : vocabulaire et contexte, extrait par extrait.",
    lessons: [
      {
        id: "mus-vie-en-rose",
        path: "/musique/la-vie-en-rose",
        title: "La vie en rose",
        subtitle: "Édith Piaf, 1945",
        levels: ANY,
        delf: "Comprendre une chanson simple et l’expression qui lui donne son titre",
        created: "2026-09-12",
      },
    ],
  },
  {
    slug: "culture",
    icon: "culture",
    path: "/culture",
    title: "Culture",
    blurb: "Le pays derrière la langue : ses régions, ses villes, ses habitudes.",
    lessons: [],
  },
  /* Le DELF, et pourquoi il est le dernier chapitre : il ne s'apprend pas, il
     se passe. Tout ce qu'il demande est écrit ailleurs dans le cours ; ici on
     ne montre que la forme de l'examen et des épreuves entières à faire en
     conditions réelles (#78).

     **Rien de ce chapitre ne vient d'un sujet officiel ni d'un livre de
     préparation** (`AGENTS.md` §9b) : le format d'un examen public est un fait,
     les textes et les consignes d'une épreuve sont l'œuvre de quelqu'un. Tout
     ce qui est imprimé ici est écrit pour ce cours. */
  {
    slug: "delf",
    icon: "delf",
    path: "/delf",
    title: "DELF",
    blurb:
      "La forme de l’examen, et des épreuves entières à faire en conditions réelles.",
    lessons: [
      /* Les épreuves portent un niveau écrit en toutes lettres, jamais `from()`
         (#76) : une épreuve de DELF A2 est *remplacée* au-dessus par l'épreuve
         de DELF B1, pas prolongée par elle. Un candidat au B1 ne passe pas le
         papier A2. C'est le premier usage dans le cours de l'exception que #76
         garde ouverte, et la forme pour laquelle elle a été gardée. */
      {
        id: "delf-a2-comprehension-ecrits",
        path: "/delf/a2-comprehension-des-ecrits",
        title: "Compréhension des écrits",
        subtitle: "A2 · 25 points · 30 minutes",
        tag: "Épreuve",
        levels: ["A2"],
        delf: "Lire pour s’orienter et pour s’informer, en temps limité",
        created: "2026-09-21",
      },
      {
        id: "delf-a2-production-ecrite",
        path: "/delf/a2-production-ecrite",
        title: "Production écrite",
        subtitle: "A2 · 25 points · 45 minutes",
        tag: "Épreuve",
        levels: ["A2"],
        delf: "Raconter un événement, et répondre à une lettre amicale",
        created: "2026-09-21",
      },
      {
        id: "delf-a2-production-orale",
        path: "/delf/a2-production-orale",
        title: "Production orale",
        subtitle: "A2 · 25 points · 6 à 8 minutes",
        tag: "Épreuve",
        levels: ["A2"],
        delf: "Se présenter, tenir un monologue, et obtenir quelque chose",
        created: "2026-09-21",
      },
    ],
  },
];

/**
 * Pages that are not lessons and belong to no chapter.
 *
 * `where` says which surface offers it: `top` above the chapter list, `tree`
 * the foot of the sidebar with the chapters, `menu` the account popover,
 * `footer` the line under every page. The split is a property of the page
 * rather than a list hand-copied into four components, which is how they would
 * drift.
 *
 * It is a union rather than one interface so that **a field is required exactly
 * where it is read**: the sidebar and the account popover both draw a row with
 * a mark, the footer is a line of text. An optional field would have made the
 * cases look identical in a diff — the mistake #29 removed the icon field over
 * (#42).
 *
 * **A popover row also says what it is signed out** (#47), because signed out
 * the panel is not the same list with a row missing: `hide` drops it, and a
 * title replaces the signed-in one where the page is a different offer without
 * an account — `/compte` is the settings when you have one and the way in when
 * you do not. Required, so a row added later cannot quietly inherit either.
 */
export type Annexe = PageEntry &
  (
    | { where: "top" | "tree"; icon: IconName }
    | { where: "menu"; icon: IconName; signedOut: "hide" | { title: string } }
    | { where: "footer" }
  );

/** An annexe drawn as a row with a mark — narrowed so `icon` is there to read. */
export type IconAnnexe = Extract<Annexe, { icon: IconName }>;

export const annexes: Annexe[] = [
  /* Above the chapters, not below them with the other annexes: the sommaire is
     the way into the course rather than something beside it, and the foot of a
     fifteen-row list is not where you look for the list's own overview. */
  { path: "/sommaire", title: "Sommaire", levels: ANY, where: "top", icon: "sommaire" },
  /* The marks are the ones the popover already shows elsewhere: the tick the
     listings record, and the glyph on the account control itself.

     Signed out, « Ma progression » is a page whose whole content is the offer
     to sign in, which the row below it already makes — the same link twice is
     what took « Code source » out of this panel (#47). */
  {
    path: "/ma-progression",
    title: "Ma progression",
    levels: ANY,
    where: "menu",
    icon: "progression",
    signedOut: "hide",
  },
  {
    path: "/compte",
    title: "Compte",
    levels: ANY,
    where: "menu",
    icon: "compte",
    signedOut: { title: "Se connecter" },
  },
  /* In the footer rather than the popover: it is a page about the site, and the
     account menu is about the account. The footer is under every page anyway,
     which is one link instead of two places offering the same one. */
  { path: "/a-propos", title: "À propos", levels: ANY, where: "footer" },
];

/**
 * Real routes that carry no manifest entry.
 *
 * Three pages are not part of the course: the home page, the results page and
 * the token specimen. Declaring them is what lets the `nav-wiring` audit report
 * a route that is in neither the manifest nor this list, instead of letting a
 * page exist that nothing links to and nothing notices.
 *
 * It used to map each one to a breadcrumb label. The topbar no longer names the
 * page you are on — the `<h1>` does — so the labels went with that (#45).
 */
export const unlistedPages: string[] = ["/", "/recherche", "/design"];

/**
 * The chapters offered as shortcuts under the search field on the home page.
 *
 * A deliberate short list, not everything: fifteen pills is a second sommaire,
 * and the sommaire is one click away in the last pill. It is the one hand-kept
 * list in this file — which is why the `nav-wiring` audit checks it, so a slug
 * renamed or a chapter dropped is caught rather than silently costing a pill.
 *
 * The choice is editorial: where a learner most often starts, plus the drills.
 * `exercices` is named here before it has content — the home page is where we
 * say what the course is for, and practice is half of it — and it simply does
 * not draw until it does (#51). Naming a chapter here is a statement of intent
 * in a file only maintainers read, which is a different thing from a pill a
 * learner can press.
 */
export const featuredChapterSlugs: string[] = [
  "grammaire",
  "orthographe",
  "vocabulaire",
  "exercices",
];

/**
 * Those slugs resolved to chapters, in order. Fails soft, like `relatedFor` —
 * and **an empty chapter is dropped too**, so a pill can never lead to a page
 * with nothing on it (`docs/decisions.md` #51). The list may therefore be
 * shorter than `featuredChapterSlugs`; « Tout le cours » is always the last
 * pill, so it is never a dead end.
 */
export function featuredChapters(): Chapter[] {
  return featuredChapterSlugs
    .map((slug) => chapters.find((chapter) => chapter.slug === slug))
    .filter((chapter): chapter is Chapter => chapter !== undefined)
    .filter((chapter) => chapter.lessons.length > 0);
}

/**
 * Every lesson id is well-formed, and no two lessons share one.
 *
 * Checked at module scope, which means **at import time**, which means a clash
 * fails `next build` rather than shipping. That matters more than an audit line
 * would: two lessons sharing an id do not look broken, they look like one
 * lesson two learners tick for each other.
 *
 * There is no id → lesson index beside it, because nothing needs one yet:
 * `LessonEnd` resolves the lesson from the path it is already rendering, and
 * `/ma-progression` walks the manifest and asks whether each id is in the
 * learner's record. A tick whose lesson has since been removed simply shows
 * nowhere, which is what it should do.
 */
const LESSON_ID_SHAPE = /^[a-z0-9][a-z0-9-]{0,62}[a-z0-9]$/;

function assertLessonIds(): void {
  const seen = new Map<LessonId, string>();
  for (const chapter of chapters) {
    for (const lesson of chapter.lessons) {
      if (!LESSON_ID_SHAPE.test(lesson.id)) {
        throw new Error(
          `navigation: « ${lesson.id} » (${lesson.path}) is not a usable lesson id — ` +
            "lower case, digits and hyphens, alphanumeric at both ends, 2–64 characters.",
        );
      }
      const clash = seen.get(lesson.id);
      if (clash) {
        throw new Error(
          `navigation: two lessons share the id « ${lesson.id} » — ` +
            `${clash} and ${lesson.path}. An id is one lesson's, for good.`,
        );
      }
      seen.set(lesson.id, lesson.path);
    }
  }
}

assertLessonIds();

/** A row the account popover draws, with the title that state earns it. */
export interface MenuRow {
  path: string;
  title: string;
  icon: IconName;
  /**
   * Whether this row is the way in — a page offered *because* there is no
   * account, so coming back afterwards is the point. It is what earns the
   * `?suivant=` the popover appends (#70); the flag rather than a path test in
   * the component, which would quietly cover a second such row or miss it.
   */
  wayIn: boolean;
}

/**
 * What the account popover offers, which is not the same list twice (#47).
 *
 * The resolution lives here rather than in the component so that the panel maps
 * rows and decides nothing: a component asking « is this `/compte`? » is the
 * hand-copied path this manifest exists to prevent.
 */
export function menuAnnexes(signedIn: boolean): MenuRow[] {
  return annexes.flatMap((page): MenuRow[] => {
    if (page.where !== "menu") return [];
    if (signedIn) {
      return [{ path: page.path, title: page.title, icon: page.icon, wayIn: false }];
    }
    if (page.signedOut === "hide") return [];
    return [{ path: page.path, title: page.signedOut.title, icon: page.icon, wayIn: true }];
  });
}

/**
 * The annexes drawn as a row with a mark, at one position.
 *
 * The narrowing lives here rather than in the component: `.filter()` does not
 * narrow a union on its own, and a type predicate written twice is a predicate
 * that can disagree with itself.
 */
export function iconAnnexes(where: "top" | "tree"): IconAnnexe[] {
  return annexes.filter((page): page is IconAnnexe => page.where === where);
}

/** The lesson a learner has not ticked yet, and the chapter it sits in. */
export interface NextStep {
  chapter: Chapter;
  lesson: Lesson;
  /** Whether anything at all is ticked — « Commencer » rather than « Reprendre ». */
  started: boolean;
}

/**
 * « La suite »: the first lesson at `level` that is not ticked.
 *
 * **Both surfaces that offer a next step read it from here** — the home page
 * and the head of `/ma-progression` — because two definitions of "next" would
 * eventually disagree in front of the same learner, and the one they would
 * trust is whichever they saw last.
 *
 * It is *the first hole in course order*, not the furthest point reached:
 * chapters in manifest order, lessons in theirs, filtered by level exactly as a
 * listing is (#35). Predictable, needs nothing stored, and honest about what an
 * account holds — a true "where you left off" would mean recording the last
 * page visited, which is behavioural tracking and is not what an account is
 * for (#31). This is also the seam a parcours would feed when there is one
 * (#14).
 *
 * `isDone` is passed in rather than imported: the tick lives behind a hook, and
 * the manifest is not allowed to know about storage.
 */
export function nextUp(
  level: Level | null,
  isDone: (lesson: Lesson, level: Level | null) => boolean,
): NextStep | null {
  let first: { chapter: Chapter; lesson: Lesson } | null = null;
  let started = false;

  /* The whole course, not an early return: a learner who ticked lesson five and
     skipped lesson one is still a learner who has started. */
  for (const chapter of chapters) {
    for (const lesson of visibleLessons(chapter, level)) {
      if (isDone(lesson, level)) started = true;
      else if (!first) first = { chapter, lesson };
    }
  }

  return first ? { ...first, started } : null;
}

/**
 * What the sommaire offers a learner at `level`.
 *
 * `null` means "no level chosen", which is also what a signed-out visitor
 * gets: everything. A lesson with no levels is always offered. **This filters
 * what the course offers, never what it permits** — a lesson reached by direct
 * link renders in full whatever the level (#23).
 */
export function visibleLessons(chapter: Chapter, level: Level | null): Lesson[] {
  if (!level) return chapter.lessons;
  return chapter.lessons.filter(
    (lesson) => lesson.levels.length === 0 || lesson.levels.includes(level),
  );
}

/**
 * The chapters a listing draws: those with at least one lesson to offer.
 *
 * **A chapter with nothing in it is not shown** (`docs/decisions.md` #51). The
 * fifteen are declared here because the course's shape is decided; what the
 * interface offers is what is written, and a row leading to an empty page is
 * the « Bientôt » badge again with worse manners. A chapter reappears on its
 * own the moment its first lesson lands — there is no second list to update.
 *
 * It takes the level for the same reason `visibleLessons` does: a chapter whose
 * only lessons are A2 has nothing to offer an A1 learner this week, and saying
 * « rien à ce niveau » on a card is a card that costs a click to learn nothing.
 * The chapter's own page still renders at its URL and still says what it holds
 * — the filter is on the offer, never on access (#23).
 */
export function listedChapters(level: Level | null): Chapter[] {
  return chapters.filter((chapter) => visibleLessons(chapter, level).length > 0);
}

/**
 * The descriptor to print for the variant in view.
 *
 * A plain `delf` is returned whatever the level, which is every page but the
 * few that serve several. A record with no entry for `level` falls back to the
 * lesson's first level, matching `progressKey`'s own fallback so the line under
 * the title and the tick beneath the page cannot disagree about which variant
 * this is.
 */
export function delfFor(lesson: Lesson, level: Level | null): string | undefined {
  const { delf } = lesson;
  if (delf === undefined || typeof delf === "string") return delf;
  const variant = level && lesson.levels.includes(level) ? level : lesson.levels[0];
  return variant ? delf[variant] : undefined;
}

export function findChapter(routePath: string): Chapter | null {
  const slug = routePath.split("/").filter(Boolean)[0];
  return chapters.find((chapter) => chapter.slug === slug) ?? null;
}

export function findLesson(
  routePath: string,
): { chapter: Chapter; lesson: Lesson } | null {
  for (const chapter of chapters) {
    const lesson = chapter.lessons.find((item) => item.path === routePath);
    if (lesson) return { chapter, lesson };
  }
  return null;
}

/** A page shows at most four related links — past that it is a second menu. */
export const MAX_RELATED = 4;

/** « Pour aller plus loin », keyed by route. Fails soft: see `relatedFor`. */
/**
 * The two lessons every verb sheet is worth leaving for: the sheet shows the
 * passé composé and the imparfait, and those are the two tenses on it that have
 * a page explaining themselves. The futur has none yet.
 */
const FROM_A_VERB_SHEET = [
  "/grammaire/le-passe-compose",
  "/grammaire/l-imparfait",
];

/**
 * The verb sheets' cross-links, built rather than typed out twelve times.
 *
 * Hand-writing them would make adding a verb two edits instead of one, which is
 * exactly what one route and one data file bought (#56) — and eleven of the
 * twelve entries would be the same two paths, so the twelfth being different by
 * accident is the failure this avoids. The auxiliaries additionally point at
 * each other: they are the pair you check together.
 *
 * These are audited like any other cross-link — `relatedFor()` resolves them
 * against the manifest and `nav-wiring`'s third line reads the merged map.
 */
const verbSheetLinks: Record<string, string[]> = Object.fromEntries(
  (chapters.find((chapter) => chapter.slug === "conjugaison")?.lessons ?? []).map(
    (lesson) => {
      const auxiliaryPair =
        lesson.path === "/conjugaison/etre"
          ? ["/conjugaison/avoir"]
          : lesson.path === "/conjugaison/avoir"
            ? ["/conjugaison/etre"]
            : [];
      return [lesson.path, [...auxiliaryPair, ...FROM_A_VERB_SHEET]];
    },
  ),
);

const handWrittenLinks: Record<string, string[]> = {
  /* Une astuce renvoie à la leçon qui possède la règle et à l'exercice qui la
     fait travailler (`.claude/agents/lesson-author.md`) : sans ces deux liens,
     le raccourci vit seul et finit par contredire la leçon. */
  "/astuces/etre-ou-avoir": [
    "/grammaire/le-passe-compose",
    "/exercices/etre-ou-avoir",
    "/conjugaison/etre",
    "/conjugaison/avoir",
  ],
  "/astuces/a-en-au-aux": [
    "/conversation/demander-son-chemin",
    "/conversation/parler-de-l-espagne",
    "/conversation/decrire-sa-ville",
  ],
  "/grammaire/la-negation": [
    "/traduction/le-resume-d-un-film",
    "/grammaire/le-futur-proche",
    "/grammaire/le-passe-compose",
    "/conjugaison/etre",
  ],
  "/grammaire/le-futur-proche": [
    "/conjugaison/aller",
    "/grammaire/la-negation",
    "/grammaire/les-pronoms-cod-coi",
    "/lecture/un-entretien-d-embauche",
  ],
  /* Les pages d'orthographe se tiennent : les accents expliquent pourquoi
     deux mots diffèrent à l'écrit, les homophones donnent le test, les
     possessifs sont la paire que le test ne tranche pas, et les terminaisons
     verbales appliquent le même remplacement à la fin du verbe. */
  "/orthographe/les-accents": [
    "/orthographe/les-homophones",
    "/orthographe/les-determinants-possessifs",
    "/conjugaison/commencer",
  ],
  "/orthographe/les-determinants-possessifs": [
    "/orthographe/les-homophones",
    "/orthographe/les-accents",
    "/vocabulaire/la-famille",
  ],
  "/orthographe/les-terminaisons-verbales": [
    "/orthographe/les-homophones",
    "/exercices/les-terminaisons",
    "/conjugaison/parler",
    "/grammaire/le-passe-compose",
  ],
  "/vocabulaire/les-jours-et-la-date": [
    "/vocabulaire/les-nombres",
    "/vocabulaire/l-heure",
    "/conversation/prendre-rendez-vous",
    "/lecture/un-entretien-d-embauche",
  ],
  "/vocabulaire/le-travail": [
    "/lecture/un-entretien-d-embauche",
    "/conversation/parler-du-travail",
    "/vocabulaire/les-jours-et-la-date",
  ],
  "/conversation/au-restaurant": [
    "/grammaire/la-negation",
    "/grammaire/le-futur-proche",
    "/conversation/demander-son-chemin",
    "/vocabulaire/la-recette-des-croissants",
  ],
  "/conversation/demander-son-chemin": [
    "/astuces/a-en-au-aux",
    "/conversation/au-restaurant",
    "/conversation/decrire-sa-ville",
    "/conjugaison/prendre",
  ],
  "/lecture/un-entretien-d-embauche": [
    "/vocabulaire/le-travail",
    "/conversation/parler-du-travail",
    "/grammaire/le-futur-proche",
    "/grammaire/le-passe-compose",
  ],
  "/lecture/le-lion-et-le-rat": [
    "/litterature/par-ou-commencer",
    "/lecture/l-invitation-au-voyage",
    "/grammaire/le-passe-compose",
  ],
  "/musique/la-vie-en-rose": [
    "/grammaire/les-pronoms-cod-coi",
    "/litterature/par-ou-commencer",
  ],
  /* La liste de lectures pointe vers les textes du cours qui en sont tirés :
     c'est ce qui empêche la page de rester une bibliographie. */
  "/litterature/par-ou-commencer": [
    "/lecture/le-lion-et-le-rat",
    "/lecture/le-comte-de-monte-cristo",
    "/lecture/cyrano-de-bergerac",
    "/lecture/du-cote-de-chez-swann",
  ],
  /* The auxiliaries come first: a learner stuck mid-lesson wants the forms, and
     `les-pronoms-cod-coi` still links back the other way. Four is the cap. */
  "/grammaire/le-passe-compose": [
    "/exercices/etre-ou-avoir",
    "/conjugaison/avoir",
    "/conjugaison/etre",
    "/grammaire/passe-compose-ou-imparfait",
  ],
  "/grammaire/l-imparfait": [
    "/grammaire/le-passe-compose",
    "/grammaire/passe-compose-ou-imparfait",
    "/grammaire/le-plus-que-parfait",
    "/conversation/parler-de-l-espagne",
  ],
  "/grammaire/passe-compose-ou-imparfait": [
    "/grammaire/le-passe-compose",
    "/grammaire/l-imparfait",
    "/conjugaison/etre",
    "/conjugaison/avoir",
  ],
  /* Chaque exercice renvoie à la leçon qu'il fait travailler, et la leçon
     renvoie vers lui : un exercice qu'aucune leçon ne cite n'est jamais
     rencontré au moment où il sert. */
  "/exercices/etre-ou-avoir": [
    "/grammaire/le-passe-compose",
    "/astuces/etre-ou-avoir",
    "/conjugaison/etre",
    "/conjugaison/avoir",
  ],
  "/exercices/trouve-la-faute": [
    "/orthographe/les-homophones",
    "/conjugaison/avoir",
    "/conjugaison/etre",
    "/traduction/hier-dans-la-rue",
  ],
  "/grammaire/les-pronoms-cod-coi": [
    "/grammaire/le-passe-compose",
    "/traduction/hier-dans-la-rue",
    "/lecture/cosette-dans-le-bois",
    "/musique/la-vie-en-rose",
  ],
  "/orthographe/les-homophones": [
    "/exercices/trouve-la-faute",
    "/orthographe/les-accents",
    "/orthographe/les-determinants-possessifs",
    "/orthographe/les-terminaisons-verbales",
  ],
  "/vocabulaire/l-heure": [
    "/vocabulaire/les-jours-et-la-date",
    "/conversation/prendre-rendez-vous",
    "/conversation/parler-du-travail",
    "/lecture/phileas-fogg",
  ],
  "/conversation/prendre-rendez-vous": [
    "/vocabulaire/l-heure",
    "/vocabulaire/les-jours-et-la-date",
    "/conversation/demander-son-chemin",
    "/grammaire/passe-compose-ou-imparfait",
  ],
  "/conversation/parler-de-l-espagne": [
    "/grammaire/l-imparfait",
    "/conversation/decrire-sa-ville",
    "/conversation/prendre-rendez-vous",
    "/conversation/parler-du-travail",
  ],
  "/conversation/decrire-sa-ville": [
    "/astuces/a-en-au-aux",
    "/conversation/demander-son-chemin",
    "/conversation/parler-de-l-espagne",
  ],
  "/conversation/parler-du-travail": [
    "/vocabulaire/le-travail",
    "/lecture/un-entretien-d-embauche",
    "/vocabulaire/l-heure",
    "/grammaire/l-imparfait",
  ],
  "/traduction/une-journee": [
    "/grammaire/passe-compose-ou-imparfait",
    "/vocabulaire/l-heure",
    "/conversation/prendre-rendez-vous",
  ],
  "/traduction/le-resume-d-un-film": [
    "/grammaire/la-negation",
    "/grammaire/le-futur-proche",
    "/vocabulaire/la-recette-des-croissants",
  ],
  /* The refrain's « ne… que » is the one piece of grammar the poem teaches by
     itself, so « la négation » leads rather than another reading. */
  /* The one page in the course where « du » and « de la » are unavoidable, so
     the restaurant scene that spends them leads, and « l’heure » follows for
     the durations the steps are full of. */
  /* The sheet first: this drill takes its forms from that verb's entry, so the
     page that prints them whole is the place to go when a blank will not come. */
  "/exercices/les-terminaisons": [
    "/conjugaison/parler",
    "/conjugaison/finir",
    "/grammaire/l-imparfait",
    "/exercices/etre-ou-avoir",
  ],
  "/vocabulaire/la-recette-des-croissants": [
    "/conversation/faire-des-achats",
    "/conversation/au-restaurant",
    "/traduction/le-resume-d-un-film",
    "/vocabulaire/l-heure",
  ],
  "/lecture/l-invitation-au-voyage": [
    "/grammaire/la-negation",
    "/lecture/le-lion-et-le-rat",
    "/lecture/cyrano-de-bergerac",
    "/litterature/par-ou-commencer",
  ],
  "/lecture/phileas-fogg": [
    "/vocabulaire/l-heure",
    "/grammaire/l-imparfait",
    "/lecture/le-lion-et-le-rat",
    "/lecture/cyrano-de-bergerac",
  ],
  "/lecture/cosette-dans-le-bois": [
    "/grammaire/les-pronoms-cod-coi",
    "/lecture/phileas-fogg",
    "/conversation/parler-du-travail",
    "/lecture/du-cote-de-chez-swann",
  ],
  /* The two theatre texts are harder than the rest of the chapter, so they
     point at the reading that prepares them rather than at four more places to
     go. Cyrano keeps a fourth, to Monte-Cristo: it is the other crowded scene
     where the interest is who says what to whom. */
  "/lecture/cyrano-de-bergerac": [
    "/lecture/cosette-dans-le-bois",
    "/lecture/phileas-fogg",
    "/lecture/romeo-et-juliette",
    "/lecture/le-comte-de-monte-cristo",
  ],
  "/lecture/romeo-et-juliette": [
    "/lecture/cyrano-de-bergerac",
    "/lecture/cosette-dans-le-bois",
  ],
  /* The one lecture text that carries both passé composé auxiliaries in the
     same speech, which is why the grammar page leads. */
  "/lecture/le-comte-de-monte-cristo": [
    "/grammaire/le-passe-compose",
    "/grammaire/passe-compose-ou-imparfait",
    "/lecture/cosette-dans-le-bois",
    "/lecture/cyrano-de-bergerac",
  ],
  "/lecture/du-cote-de-chez-swann": [
    "/grammaire/passe-compose-ou-imparfait",
    "/lecture/cosette-dans-le-bois",
  ],
  "/traduction/un-week-end-a-la-plage": ["/orthographe/les-homophones"],
  "/traduction/hier-dans-la-rue": [
    "/grammaire/les-pronoms-cod-coi",
    "/grammaire/le-passe-compose",
  ],
  /* Les deux scènes A1. Elles renvoient d'abord aux pages A1 qui les
     alimentent en mots, puis à la scène A2 du même geste : un apprenant qui
     tient la scène facile doit trouver la suivante sans passer par le
     sommaire. */
  "/conversation/se-presenter": [
    "/vocabulaire/les-nombres",
    "/vocabulaire/la-famille",
    "/conversation/faire-des-achats",
    "/conjugaison/etre",
  ],
  "/conversation/faire-des-achats": [
    "/vocabulaire/les-nombres",
    "/grammaire/le-conditionnel-present",
    "/conversation/au-restaurant",
    "/vocabulaire/la-recette-des-croissants",
  ],
  "/vocabulaire/les-nombres": [
    "/vocabulaire/l-heure",
    "/vocabulaire/les-jours-et-la-date",
    "/conversation/faire-des-achats",
    "/conversation/se-presenter",
  ],
  /* Les formes complètes des possessifs sont sur la page d'orthographe, qui
     les possède : celle-ci n'en donne que l'emploi, et pointe. */
  "/vocabulaire/la-famille": [
    "/orthographe/les-determinants-possessifs",
    "/conversation/se-presenter",
    "/vocabulaire/les-nombres",
    "/vocabulaire/le-travail",
  ],
  /* Les deux pages B1 : elles renvoient à l'A2 sur lequel elles se
     construisent, et l'une à l'autre, parce qu'elles partagent leurs
     terminaisons et sont pour l'instant tout ce que le B1 a en propre. */
  "/grammaire/le-plus-que-parfait": [
    "/grammaire/passe-compose-ou-imparfait",
    "/grammaire/l-imparfait",
    "/grammaire/le-passe-compose",
    "/grammaire/le-conditionnel-present",
  ],
  /* L'épreuve renvoie au barème, puis aux pages qui entraînent exactement ce
     qu'elle demande : lire un texte de presse et en tirer une information. */
  "/delf/a2-comprehension-des-ecrits": [
    "/delf/a2-production-ecrite",
    "/delf/a2-production-orale",
    "/lecture/un-entretien-d-embauche",
    "/vocabulaire/les-nombres",
  ],
  /* Les deux épreuves de production se suivent, puis les pages qui entraînent
     exactement ce qu'elles demandent : raconter au passé, et refuser poliment
     en proposant autre chose. */
  "/delf/a2-production-ecrite": [
    "/delf/a2-production-orale",
    "/grammaire/passe-compose-ou-imparfait",
    "/traduction/une-journee",
    "/grammaire/le-conditionnel-present",
  ],
  "/delf/a2-production-orale": [
    "/delf/a2-comprehension-des-ecrits",
    "/conversation/se-presenter",
    "/conversation/parler-du-travail",
    "/conversation/decrire-sa-ville",
  ],
  "/grammaire/le-conditionnel-present": [
    "/grammaire/l-imparfait",
    "/grammaire/le-plus-que-parfait",
    "/conjugaison/vouloir",
    "/conversation/au-restaurant",
  ],
};

export const relatedPages: Record<string, string[]> = {
  ...handWrittenLinks,
  ...verbSheetLinks,
};

export interface RelatedLink {
  path: string;
  title: string;
  chapter: string;
}

/**
 * Resolve a page's related links into renderable rows. A path with no matching
 * lesson is dropped, so a stale entry costs one link instead of rendering a
 * dead anchor.
 */
export function relatedFor(routePath: string): RelatedLink[] {
  return (relatedPages[routePath] ?? [])
    .slice(0, MAX_RELATED)
    .map((path) => {
      const found = findLesson(path);
      if (!found) return null;
      return {
        path,
        title: found.lesson.title,
        chapter: found.chapter.shortTitle ?? found.chapter.title,
      };
    })
    .filter((row): row is RelatedLink => row !== null);
}
