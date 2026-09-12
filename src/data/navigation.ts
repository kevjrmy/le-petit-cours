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

export type Level = "A1" | "A2" | "B1" | "B2" | "C1" | "C2";

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
   * CEFR levels this page serves. **Required**, and `[]` is how you say "no
   * level, always visible" — `culture` and `musique` are for whoever wants
   * them. An omitted field and a deliberate `[]` must not look the same in a
   * diff, which is what makes forgetting to tag a page a type error (#23).
   */
  levels: Level[];
  /** The DELF descriptor this page answers to, when it answers to one. */
  delf?: string;
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
  | "sommaire";

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

/** Every level the course declares. B1 upward are empty on purpose (#52). */
export const LEVELS: Level[] = ["A1", "A2", "B1", "B2", "C1", "C2"];

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
 * Offering an empty level would hand someone an empty course, so a level belongs
 * here only once it has content — or, today, once it is the level being written.
 * **A2 alone** (#52): the rewrite's content starts there, so A1 comes back to
 * this line when an A1 page does. Opening a level is now this one edit, which is
 * less friction than #22 intended — worth remembering when B1 is written.
 */
export const CHOOSABLE_LEVELS: Level[] = ["A2"];

/* Shorthands for the `levels` field, so a lesson entry reads as one line. `A2`
   is the level being written (#52); `ANY` is "no level, always visible" — the
   literacy pages, which answer to spelling rather than to a CEFR rung. */
const A2: Level[] = ["A2"];
const ANY: Level[] = [];

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
        levels: A2,
        delf: "Dire ce qu’on ne fait pas, ce qu’on n’a pas",
        created: "2026-09-12",
      },
      {
        id: "gram-passe-compose",
        path: "/grammaire/le-passe-compose",
        title: "Le passé composé",
        levels: A2,
        delf: "Raconter un événement passé",
        created: "2026-09-06",
      },
      {
        id: "gram-imparfait",
        path: "/grammaire/l-imparfait",
        title: "L’imparfait",
        levels: A2,
        delf: "Décrire une situation ou une habitude au passé",
        created: "2026-09-06",
      },
      {
        id: "gram-pc-ou-imparfait",
        path: "/grammaire/passe-compose-ou-imparfait",
        title: "Passé composé ou imparfait ?",
        levels: A2,
        delf: "Choisir le temps du passé dans un récit",
        created: "2026-09-06",
      },
      {
        id: "gram-futur-proche",
        path: "/grammaire/le-futur-proche",
        title: "Le futur proche",
        levels: A2,
        delf: "Dire ce qu’on va faire, projeter une action",
        created: "2026-09-12",
      },
      {
        id: "gram-pronoms-cod-coi",
        path: "/grammaire/les-pronoms-cod-coi",
        title: "Les pronoms COD et COI",
        levels: A2,
        delf: "Reprendre un mot déjà dit sans le répéter",
        created: "2026-09-06",
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
        levels: A2,
        delf: "Présent, imparfait, passé composé, futur simple, impératif.",
        created: "2026-09-06",
      },
      {
        id: "conj-avoir",
        path: "/conjugaison/avoir",
        title: "avoir",
        tag: "Auxiliaire",
        levels: A2,
        delf: "Présent, imparfait, passé composé, futur simple, impératif.",
        created: "2026-09-06",
      },
      {
        id: "conj-parler",
        path: "/conjugaison/parler",
        title: "parler",
        tag: "1er groupe",
        levels: A2,
        delf: "Présent, imparfait, passé composé, futur simple, impératif.",
        created: "2026-09-06",
      },
      {
        id: "conj-finir",
        path: "/conjugaison/finir",
        title: "finir",
        tag: "2e groupe",
        levels: A2,
        delf: "Présent, imparfait, passé composé, futur simple, impératif.",
        created: "2026-09-06",
      },
      {
        id: "conj-manger",
        path: "/conjugaison/manger",
        title: "manger",
        tag: "1er groupe",
        levels: A2,
        delf: "Présent, imparfait, passé composé, futur simple, impératif.",
        created: "2026-09-06",
      },
      {
        id: "conj-commencer",
        path: "/conjugaison/commencer",
        title: "commencer",
        tag: "1er groupe",
        levels: A2,
        delf: "Présent, imparfait, passé composé, futur simple, impératif.",
        created: "2026-09-06",
      },
      {
        id: "conj-aller",
        path: "/conjugaison/aller",
        title: "aller",
        tag: "3e groupe",
        levels: A2,
        delf: "Présent, imparfait, passé composé, futur simple, impératif.",
        created: "2026-09-06",
      },
      {
        id: "conj-faire",
        path: "/conjugaison/faire",
        title: "faire",
        tag: "3e groupe",
        levels: A2,
        delf: "Présent, imparfait, passé composé, futur simple, impératif.",
        created: "2026-09-06",
      },
      {
        id: "conj-prendre",
        path: "/conjugaison/prendre",
        title: "prendre",
        tag: "3e groupe",
        levels: A2,
        delf: "Présent, imparfait, passé composé, futur simple, impératif.",
        created: "2026-09-06",
      },
      {
        id: "conj-venir",
        path: "/conjugaison/venir",
        title: "venir",
        tag: "3e groupe",
        levels: A2,
        delf: "Présent, imparfait, passé composé, futur simple, impératif.",
        created: "2026-09-06",
      },
      {
        id: "conj-partir",
        path: "/conjugaison/partir",
        title: "partir",
        tag: "3e groupe",
        levels: A2,
        delf: "Présent, imparfait, passé composé, futur simple, impératif.",
        created: "2026-09-12",
      },
      {
        id: "conj-pouvoir",
        path: "/conjugaison/pouvoir",
        title: "pouvoir",
        tag: "3e groupe",
        levels: A2,
        delf: "Présent, imparfait, passé composé, futur simple, impératif.",
        created: "2026-09-06",
      },
      {
        id: "conj-vouloir",
        path: "/conjugaison/vouloir",
        title: "vouloir",
        tag: "3e groupe",
        levels: A2,
        delf: "Présent, imparfait, passé composé, futur simple, impératif.",
        created: "2026-09-06",
      },
      {
        id: "conj-devoir",
        path: "/conjugaison/devoir",
        title: "devoir",
        tag: "3e groupe",
        levels: A2,
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
    ],
  },
  {
    slug: "vocabulaire",
    icon: "vocabulaire",
    path: "/vocabulaire",
    title: "Vocabulaire",
    blurb: "Les mots du quotidien, par thème, avec des exemples pour les employer.",
    lessons: [
      {
        id: "voc-heure",
        path: "/vocabulaire/l-heure",
        title: "L’heure",
        levels: A2,
        delf: "Demander et dire l’heure, fixer un rendez-vous",
        created: "2026-09-06",
      },
      {
        id: "voc-jours-et-date",
        path: "/vocabulaire/les-jours-et-la-date",
        title: "Les jours et la date",
        levels: A2,
        delf: "Situer un événement dans la semaine, dans l’année",
        created: "2026-09-12",
      },
      {
        id: "voc-travail",
        path: "/vocabulaire/le-travail",
        title: "Le travail",
        subtitle: "Le métier, le lieu, le contrat",
        levels: A2,
        delf: "Parler de son métier et de ses conditions de travail",
        created: "2026-09-12",
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
        levels: A2,
        delf: "Raconter un événement passé",
        created: "2026-09-12",
      },
      {
        id: "astuce-a-en-au-aux",
        path: "/astuces/a-en-au-aux",
        title: "à, en, au ou aux ?",
        subtitle: "Devant une ville, devant un pays",
        levels: A2,
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
        levels: A2,
        delf: "Choisir l’auxiliaire du passé composé",
        created: "2026-09-12",
      },
      {
        id: "ex-trouve-la-faute",
        path: "/exercices/trouve-la-faute",
        title: "Trouvez la faute",
        tag: "Correction",
        levels: A2,
        delf: "Repérer et corriger un homophone mal écrit",
        created: "2026-09-12",
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
      {
        id: "conv-rendez-vous-medecin",
        path: "/conversation/prendre-rendez-vous",
        title: "Prendre rendez-vous",
        subtitle: "Chez le médecin",
        tag: "Jeu de rôle",
        levels: A2,
        delf: "Demander un rendez-vous, proposer et accepter une heure.",
        created: "2026-09-06",
      },
      {
        id: "conv-demander-son-chemin",
        path: "/conversation/demander-son-chemin",
        title: "Demander son chemin",
        subtitle: "Dans une ville inconnue",
        tag: "Jeu de rôle",
        levels: A2,
        delf: "Demander et suivre un itinéraire simple, faire répéter.",
        created: "2026-09-12",
      },
      {
        id: "conv-au-restaurant",
        path: "/conversation/au-restaurant",
        title: "Au restaurant",
        subtitle: "Commander, et régler l’addition",
        tag: "Jeu de rôle",
        levels: A2,
        delf: "Commander un repas, poser une question sur un plat, payer.",
        created: "2026-09-12",
      },
      {
        id: "conv-parler-espagne",
        path: "/conversation/parler-de-l-espagne",
        title: "Parler de l’Espagne",
        subtitle: "À des enfants de dix ans",
        tag: "Jeu de rôle",
        levels: A2,
        delf: "Décrire son pays et sa vie quotidienne, en réponse à des questions simples.",
        created: "2026-09-06",
      },
      {
        id: "conv-parler-du-travail",
        path: "/conversation/parler-du-travail",
        title: "Parler du travail",
        subtitle: "Avec un collègue français",
        tag: "Jeu de rôle",
        levels: A2,
        delf: "Comparer ses horaires et ses habitudes de travail avec ceux d’un autre pays.",
        created: "2026-09-07",
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
        levels: A2,
        delf: "Écrire un court récit au passé à partir d’un texte source.",
        created: "2026-09-06",
      },
      {
        id: "trad-quand-jetais-petite",
        path: "/traduction/quand-j-etais-petite",
        title: "Quand j’étais petite",
        subtitle: "Un souvenir, tout à l’imparfait",
        tag: "Traduction",
        levels: A2,
        delf: "Décrire des habitudes et un décor passés.",
        created: "2026-09-06",
      },
      {
        id: "trad-week-end-plage",
        path: "/traduction/un-week-end-a-la-plage",
        title: "Un week-end à la plage",
        subtitle: "a / à · et / est · on / ont · son / sont · où / ou",
        tag: "Traduction",
        levels: A2,
        delf: "Écrire des phrases simples sans confondre les homophones.",
        created: "2026-09-06",
      },
      {
        id: "trad-hier-dans-la-rue",
        path: "/traduction/hier-dans-la-rue",
        title: "Hier, dans la rue",
        subtitle: "Les pronoms au passé composé",
        tag: "Traduction",
        levels: A2,
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
        levels: A2,
        delf: "Comprendre un échange professionnel simple et en retenir les faits.",
        created: "2026-09-12",
      },
      {
        id: "lect-chevre-seguin",
        path: "/lecture/la-chevre-de-monsieur-seguin",
        title: "La chèvre de monsieur Seguin",
        subtitle: "Alphonse Daudet, 1869",
        tag: "Compréhension",
        levels: A2,
        delf: "Comprendre un court récit littéraire et répondre à des questions simples.",
        created: "2026-09-07",
      },
      {
        id: "lect-lion-et-rat",
        path: "/lecture/le-lion-et-le-rat",
        title: "Le Lion et le Rat",
        subtitle: "Jean de La Fontaine, 1668",
        tag: "Compréhension",
        levels: A2,
        delf: "Comprendre un récit court en vers et en dégager la morale.",
        created: "2026-09-12",
      },
      {
        id: "lect-phileas-fogg",
        path: "/lecture/phileas-fogg",
        title: "Phileas Fogg",
        subtitle: "Jules Verne, 1873",
        tag: "Compréhension",
        levels: A2,
        delf: "Comprendre la description d’une personne et de ses habitudes, et des heures précises.",
        created: "2026-09-07",
      },
      {
        id: "lect-cosette-bois",
        path: "/lecture/cosette-dans-le-bois",
        title: "Cosette dans le bois",
        subtitle: "Victor Hugo, 1862",
        tag: "Compréhension",
        levels: A2,
        delf: "Suivre un dialogue simple et en tirer qui parle, à qui, et de quoi.",
        created: "2026-09-07",
      },
      {
        id: "lect-cyrano",
        path: "/lecture/cyrano-de-bergerac",
        title: "Cyrano de Bergerac",
        subtitle: "Edmond Rostand, 1897",
        tag: "Compréhension",
        levels: A2,
        delf: "Suivre une scène de théâtre et dire qui fait quoi, dans un lieu public.",
        created: "2026-09-07",
      },
      {
        id: "lect-swann",
        path: "/lecture/du-cote-de-chez-swann",
        title: "Du côté de chez Swann",
        subtitle: "Marcel Proust, 1913",
        tag: "Compréhension",
        levels: A2,
        delf: "Comprendre le récit d’un souvenir et repérer ce qui est concret dans un texte difficile.",
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
        levels: A2,
        delf: "Comprendre le début d’une pièce traduite : le lieu, les personnages, le conflit.",
        created: "2026-09-07",
      },
      {
        id: "lect-monte-cristo",
        path: "/lecture/le-comte-de-monte-cristo",
        title: "Le Comte de Monte-Cristo",
        subtitle: "Alexandre Dumas, 1844",
        tag: "Compréhension",
        levels: A2,
        delf: "Suivre un dialogue et repérer ce qu’un personnage veut vraiment, sans qu’il le dise.",
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
 * It is a union rather than one interface so that **`icon` is required exactly
 * where one is drawn**: the sidebar collapses to icons at the tablet
 * breakpoint, so a row there needs a mark, and the popover is text and never
 * wants one. An optional field would have made both cases look identical in a
 * diff — the mistake #29 removed the icon field over (#42).
 */
export type Annexe = PageEntry &
  ({ where: "top" | "tree"; icon: IconName } | { where: "menu" | "footer" });

/** An annexe the sidebar draws — narrowed so `icon` is there to read. */
export type TreeAnnexe = Extract<Annexe, { icon: IconName }>;

export const annexes: Annexe[] = [
  /* Above the chapters, not below them with the other annexes: the sommaire is
     the way into the course rather than something beside it, and the foot of a
     fifteen-row list is not where you look for the list's own overview. */
  { path: "/sommaire", title: "Sommaire", levels: ANY, where: "top", icon: "sommaire" },
  { path: "/ma-progression", title: "Ma progression", levels: ANY, where: "menu" },
  { path: "/compte", title: "Compte", levels: ANY, where: "menu" },
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

/**
 * The annexes the sidebar draws at one position, narrowed to carry an icon.
 *
 * The narrowing lives here rather than in the component: `.filter()` does not
 * narrow a union on its own, and a type predicate written twice is a predicate
 * that can disagree with itself.
 */
export function treeAnnexes(where: "top" | "tree"): TreeAnnexe[] {
  return annexes.filter((page): page is TreeAnnexe => page.where === where);
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
  ],
  "/grammaire/la-negation": [
    "/grammaire/le-futur-proche",
    "/grammaire/le-passe-compose",
    "/conjugaison/etre",
    "/conjugaison/avoir",
  ],
  "/grammaire/le-futur-proche": [
    "/conjugaison/aller",
    "/grammaire/la-negation",
    "/grammaire/les-pronoms-cod-coi",
    "/lecture/un-entretien-d-embauche",
  ],
  /* Les trois pages d'orthographe se tiennent : les accents expliquent pourquoi
     deux mots diffèrent à l'écrit, les homophones donnent le test, les
     possessifs sont la paire que le test ne tranche pas. */
  "/orthographe/les-accents": [
    "/orthographe/les-homophones",
    "/orthographe/les-determinants-possessifs",
    "/conjugaison/commencer",
  ],
  "/orthographe/les-determinants-possessifs": [
    "/orthographe/les-homophones",
    "/orthographe/les-accents",
  ],
  "/vocabulaire/les-jours-et-la-date": [
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
  ],
  "/conversation/demander-son-chemin": [
    "/astuces/a-en-au-aux",
    "/conversation/au-restaurant",
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
    "/lecture/la-chevre-de-monsieur-seguin",
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
    "/traduction/quand-j-etais-petite",
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
    "/traduction/un-week-end-a-la-plage",
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
    "/conversation/prendre-rendez-vous",
    "/conversation/parler-du-travail",
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
  "/traduction/quand-j-etais-petite": [
    "/grammaire/l-imparfait",
    "/conversation/parler-de-l-espagne",
    "/lecture/la-chevre-de-monsieur-seguin",
  ],
  "/lecture/la-chevre-de-monsieur-seguin": [
    "/grammaire/l-imparfait",
    "/traduction/quand-j-etais-petite",
    "/grammaire/passe-compose-ou-imparfait",
    "/lecture/phileas-fogg",
  ],
  "/lecture/phileas-fogg": [
    "/vocabulaire/l-heure",
    "/grammaire/l-imparfait",
    "/lecture/la-chevre-de-monsieur-seguin",
    "/lecture/cyrano-de-bergerac",
  ],
  "/lecture/cosette-dans-le-bois": [
    "/grammaire/les-pronoms-cod-coi",
    "/lecture/la-chevre-de-monsieur-seguin",
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
    "/lecture/la-chevre-de-monsieur-seguin",
  ],
  "/traduction/un-week-end-a-la-plage": ["/orthographe/les-homophones"],
  "/traduction/hier-dans-la-rue": [
    "/grammaire/les-pronoms-cod-coi",
    "/grammaire/le-passe-compose",
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
