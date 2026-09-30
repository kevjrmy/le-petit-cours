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
 * **Four chapters are in that state right now**, and that is the normal resting
 * state of a chapter rather than a gap to be filled: `prononciation`, `jeux`,
 * `dictees` and `culture` each wait on something other than writing
 * (`AGENTS.md` §12). Sixteen chapters of the course are declared and twelve
 * carry pages; `temp` sits beside them and is counted with neither (#80).
 *
 * **Chapter order is inherited, not decided.** Which chapters carry which
 * content and in what order is still open (`AGENTS.md` §12) and is meant to be
 * settled by the DELF syllabus, not by whatever this file happened to say
 * first. `delf` is the exception and sits last on purpose: it is the exam
 * rather than the language, and everything it asks for is taught above it.
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
   * The rung this page is written at, or `null` for a page that answers to no
   * rung — the verb sheets and the spelling pages, which serve literacy rather
   * than a CEFR level (#86). **Required**, and `null` is a statement: an
   * omitted field and a deliberate `null` must not look the same in a diff,
   * which is what makes forgetting to tag a page a type error.
   *
   * **One level, and the learner decides what to do with it.** Signed out,
   * every page is listed; signed in, a page is listed when its level is in the
   * learner's `view` (`inView`), and a `null` page under every view. There is
   * no "listed from here upward" any more: someone at B1 who still wants the
   * A2 pages ticks A2.
   *
   * **This decides listing, never the tick** — `sets` below does.
   */
  level: Level | null;
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
   * The levels this page holds **one body of work** for — a `lecture` text with
   * a question set per level, an `exercices` drill with an item bank per level
   * (#68, #87). Written out, in ladder order, at least two, and `level` is its
   * first: `assertSets()` below checks all three at import.
   *
   * It is what the tick keys on: `progressKey` returns `id@LEVEL` here and the
   * bare `id` everywhere else, so a learner who did the A2 questions and moves
   * to B1 does not find the B1 questions already ticked. It also widens the
   * listing — the page is in view when any of its sets is.
   *
   * **The list must match the module beside the page** — `SETS` in
   * `questions.ts`, `BANKS` in `data.ts` — and the manifest wins where they
   * differ, so a level named here with nothing behind it would serve another
   * level's material. The `nav-wiring` audit compares them.
   *
   * **Adding or removing it is a data migration.** It moves every tick on the
   * page between `id` and `id@LEVEL`, and nothing fails: the circle simply goes
   * empty. Ship the backfill in the same commit (`AGENTS.md` §8).
   */
  sets?: Level[];
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
  | "atelier"
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
  /**
   * Un lien qui sort du cours, dessiné sous les leçons du chapitre.
   *
   * **Il existe pour ce que ce dépôt ne peut pas publier** (#78, `AGENTS.md`
   * §9b) : les exemples de sujets de France Éducation international se
   * téléchargent librement et ne se relicencient pas. Le chapitre renvoie donc
   * vers leur page au lieu d'en servir une copie — un lien n'est pas une
   * rediffusion, un fichier dans `public/` en est une.
   *
   * Ce lien ne marche pas hors ligne, et c'est pour cela qu'il ne porte rien
   * dont une épreuve ait besoin : les trois épreuves sont entières sans lui.
   */
  outbound?: { href: string; label: string; note: string };
  /**
   * Set when the chapter is **scratch space**, emptied and refilled on a
   * schedule rather than written once (#80). `temp` is the only one.
   *
   * It is listed exactly like the others — sidebar row, sommaire card, search
   * results — because the point of it is to be one click away in the middle of
   * a lesson given over a call. What it changes is **progress**, and it changes
   * it in four places, because a page that will be deleted next week cannot be
   * something a learner is working through:
   *
   * 1. `LessonEnd` draws no `DoneTick` under the page.
   * 2. `ChapterLessons` passes no `RowTick` in the listing.
   * 3. `trackedChapters()` drops it, so `/ma-progression` neither counts its
   *    pages in a denominator nor lists them.
   * 4. A parcours may not name one (`assertParcours`, #88) — **this one is not
   *    cosmetic**. « La suite » is the first *unticked* lesson of the parcours,
   *    so a lesson that can never be ticked is a permanent first hole: the home
   *    page and `/ma-progression` would both offer last week's scratch page for
   *    ever and nothing would fail.
   *
   * And one that is not about progress at all: `sitemap.ts` lists the chapter
   * and not its lessons, because a sitemap is a claim that a URL is worth
   * coming back to and these are gone by Monday.
   *
   * That is the whole contract, and **nothing checks that a sixth reader of
   * `chapters` honours it**. Ask what a new one is for: counting or resuming
   * wants `trackedChapters()`, offering wants `listedChapters()`, and the
   * search index wants `chapters` exactly as it stands.
   */
  scratch?: true;
  /**
   * Set when the chapter's pages are **sat, not worked through** (#82): `delf`,
   * whose épreuves are a mock exam taken as often as it is useful. A tick would
   * say « terminé » about something that is never finished, and the score an
   * épreuve gives is already the record that matters, on screen and nowhere else.
   *
   * It takes the four progress readers of `scratch` above and nothing else: no
   * tick under the page or in the listing, out of `/ma-progression`, out of a
   * parcours's étapes — an épreuve ends one as its `exam` instead (#89). The chapter is permanent, so it keeps its sitemap entries.
   * `isTracked()` is the one test; read that, never the two flags.
   */
  untracked?: true;
  lessons: Lesson[];
}

/**
 * The levels a learner can actually choose.
 *
 * **This list is the only gate there is.** It used to mirror a
 * `settings_level_known` check constraint; that table is gone and the level now
 * lives in the account's user metadata, which carries no constraints (#36). So
 * nothing downstream will catch a level that is not here — `saveView` checks
 * against this list before writing and `readView` checks against it on the way
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
 * **Closing a level is not free.** `readView` filters on this list too, so
 * removing an entry drops it from every view that held it, and a view left
 * empty reads as « Tout ». The stored value survives in metadata and is
 * ignored, which is a silent reset rather than data loss — but it is silent.
 */
export const CHOOSABLE_LEVELS: Level[] = ["A1", "A2", "B1"];

/** The rungs in order, low to high. Listings group by it, and sets follow it. */
export const LADDER: readonly Level[] = ["A1", "A2", "B1", "B2"];

/**
 * Which levels a signed-in learner has chosen to see (#86): some of
 * `CHOOSABLE_LEVELS`, never none, or `"all"`.
 *
 * **`"all"` is not the list of today's levels.** A learner on « Tout » sees B2
 * the day it opens; one who ticked A1, A2 and B1 does not. Signed out is
 * `"all"` too — a visitor has nowhere to keep a preference, and the course is
 * public (#18).
 */
export type View = "all" | Level[];

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
      /* Les pages A1 ouvrent le chapitre, et elles s'insèrent avant l'A2
         plutôt que de s'y ajouter (#72) : la liste non filtrée est celle que
         voit un visiteur déconnecté, et « c'est » sous le passé composé s'y
         lirait comme une page cassée.

         L'article vient en premier parce que tout le reste du groupe du nom se
         pose sur lui : le démonstratif le remplace, « c'est » le réclame, et le
         partitif est celui des trois séries qui n'existe pas dans la langue de
         départ de l'apprenante. */
      {
        id: "gram-articles-definis",
        path: "/grammaire/les-articles-definis",
        title: "Les articles définis",
        subtitle: "le · la · l’ · les",
        level: "A1",
        delf: "Nommer une chose connue, et dire où l’on va",
        created: "2026-09-21",
      },
      {
        id: "gram-articles-indefinis",
        path: "/grammaire/les-articles-indefinis",
        title: "Les articles indéfinis",
        subtitle: "un · une · des",
        level: "A1",
        delf: "Présenter une chose nouvelle, et compter ce dont on parle",
        created: "2026-09-21",
      },
      {
        id: "gram-singulier-pluriel",
        path: "/grammaire/le-singulier-et-le-pluriel",
        title: "Le singulier et le pluriel",
        subtitle: "Le -s muet, les, des et la liaison",
        level: "A1",
        created: "2026-09-30",
      },
      {
        id: "gram-c-est-ce-sont",
        path: "/grammaire/c-est-ce-sont",
        title: "C’est, ce sont",
        subtitle: "Nommer, présenter, dire non",
        level: "A1",
        delf: "Nommer une chose, présenter une personne, dire ce que ce n’est pas",
        created: "2026-09-21",
      },
      {
        id: "gram-verbes-er-a1",
        path: "/grammaire/les-verbes-en-er",
        title: "Les verbes en -er",
        subtitle: "Je parle, ils parlent : le même son",
        level: "A1",
        delf: "Dire ce que l’on fait, où l’on habite et ce que l’on aime",
        created: "2026-09-30",
      },
      {
        id: "gram-parler-de-ses-gouts",
        path: "/grammaire/parler-de-ses-gouts",
        title: "Parler de ses goûts",
        subtitle: "Aimer, adorer, détester, préférer",
        level: "A1",
        delf: "Dire ce qu’on aime, ce qu’on adore et ce qu’on déteste",
        created: "2026-09-30",
      },
      {
        id: "gram-poser-une-question",
        path: "/grammaire/poser-une-question",
        title: "Poser une question",
        subtitle: "Intonation, est-ce que, qui, où, quand, quel",
        level: "A1",
        delf: "Poser une question simple : oui ou non, où, quand, combien, pourquoi",
        created: "2026-09-30",
      },
      /* Le partitif est écrit à l'A2 et l'inventaire le donne aussi à l'A1 :
         un jumeau A1 reste donc dû, comme pour les démonstratifs
         (`docs/levels/a1.md`). Cette page-ci porte ce que l'A1 ne demande
         pas : le choix entre les trois séries, et ce que la quantité fait à
         l'article. */
      {
        id: "gram-articles-partitifs",
        path: "/grammaire/les-articles-partitifs",
        title: "Les articles partitifs",
        subtitle: "du · de la · de l’ · des",
        level: "A2",
        delf: "Demander une quantité de ce qui ne se compte pas",
        created: "2026-09-21",
      },
      {
        id: "gram-determinants-demonstratifs",
        path: "/grammaire/les-determinants-demonstratifs",
        title: "Les déterminants démonstratifs",
        subtitle: "ce · cet · cette · ces",
        level: "A2",
        delf: "Montrer une chose et situer un moment dont on parle",
        created: "2026-09-21",
      },
      {
        id: "gram-negation",
        path: "/grammaire/la-negation",
        title: "La négation",
        level: "A2",
        delf: "Dire ce qu’on ne fait pas, ce qu’on n’a pas",
        created: "2026-09-12",
      },
      {
        id: "gram-passe-compose",
        path: "/grammaire/le-passe-compose",
        title: "Le passé composé",
        level: "A2",
        delf: "Raconter un événement passé",
        created: "2026-09-06",
      },
      {
        id: "gram-imparfait",
        path: "/grammaire/l-imparfait",
        title: "L’imparfait",
        level: "A2",
        delf: "Décrire une situation ou une habitude au passé",
        created: "2026-09-06",
      },
      {
        id: "gram-pc-ou-imparfait",
        path: "/grammaire/passe-compose-ou-imparfait",
        title: "Passé composé ou imparfait ?",
        level: "A2",
        delf: "Choisir le temps du passé dans un récit",
        created: "2026-09-06",
      },
      {
        id: "gram-futur-proche",
        path: "/grammaire/le-futur-proche",
        title: "Le futur proche",
        level: "A2",
        delf: "Dire ce qu’on va faire, projeter une action",
        created: "2026-09-12",
      },
      {
        id: "gram-pronoms-cod-coi",
        path: "/grammaire/les-pronoms-cod-coi",
        title: "Les pronoms COD et COI",
        level: "A2",
        delf: "Reprendre un mot déjà dit sans le répéter",
        created: "2026-09-06",
      },
      /* Avec les pronoms, et juste après le COD/COI : c'est le même geste,
         ne pas répéter un nom, et le démonstratif est celui des deux qui
         garde le genre du nom sous les yeux. */
      {
        id: "gram-pronoms-demonstratifs",
        path: "/grammaire/les-pronoms-demonstratifs",
        title: "Les pronoms démonstratifs",
        subtitle: "celui · celle · ceux · celles",
        level: "A2",
        delf: "Choisir un objet parmi d’autres sans répéter son nom",
        created: "2026-09-21",
      },
      /* Les deux premières pages écrites pour le B1. Elles viennent après
         l'A2 parce qu'un chapitre suit l'ordre du cours (#72) : le
         plus-que-parfait se construit sur le passé composé et l'imparfait,
         et le conditionnel sur les terminaisons de l'imparfait. */
      {
        id: "gram-plus-que-parfait",
        path: "/grammaire/le-plus-que-parfait",
        title: "Le plus-que-parfait",
        level: "B1",
        delf: "Raconter en situant une action avant une autre",
        created: "2026-09-21",
      },
      {
        id: "gram-conditionnel-present",
        path: "/grammaire/le-conditionnel-present",
        title: "Le conditionnel présent",
        level: "B1",
        delf: "Demander poliment, et dire ce qui arriverait",
        created: "2026-09-21",
      },
      /* La troisième page B1, et la dernière du chapitre : elle se construit
         sur les pronoms démonstratifs de l'A2, qui eux-mêmes se construisent
         sur les déterminants. L'ordre du chapitre est l'ordre du cours. */
      {
        id: "gram-ce-qui-ce-que",
        path: "/grammaire/ce-qui-ce-que-ce-dont",
        title: "Ce qui, ce que, ce dont",
        subtitle: "Le pronom qui ne reprend aucun nom",
        level: "B1",
        delf: "Reprendre une idée entière, et mettre en avant ce qui compte",
        created: "2026-09-21",
      },
      {
        id: "gram-article-disparait",
        path: "/grammaire/quand-l-article-disparait",
        title: "Quand l’article disparaît",
        subtitle: "sans · en · un cours de français",
        level: "B1",
        delf: "Écrire sans l’article là où le français n’en met pas",
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
        level: null,
        delf: "Présent, imparfait, passé composé, futur simple, impératif.",
        created: "2026-09-06",
      },
      {
        id: "conj-avoir",
        path: "/conjugaison/avoir",
        title: "avoir",
        tag: "Auxiliaire",
        level: null,
        delf: "Présent, imparfait, passé composé, futur simple, impératif.",
        created: "2026-09-06",
      },
      {
        id: "conj-parler",
        path: "/conjugaison/parler",
        title: "parler",
        tag: "1er groupe",
        level: null,
        delf: "Présent, imparfait, passé composé, futur simple, impératif.",
        created: "2026-09-06",
      },
      {
        id: "conj-finir",
        path: "/conjugaison/finir",
        title: "finir",
        tag: "2e groupe",
        level: null,
        delf: "Présent, imparfait, passé composé, futur simple, impératif.",
        created: "2026-09-06",
      },
      {
        id: "conj-manger",
        path: "/conjugaison/manger",
        title: "manger",
        tag: "1er groupe",
        level: null,
        delf: "Présent, imparfait, passé composé, futur simple, impératif.",
        created: "2026-09-06",
      },
      {
        id: "conj-commencer",
        path: "/conjugaison/commencer",
        title: "commencer",
        tag: "1er groupe",
        level: null,
        delf: "Présent, imparfait, passé composé, futur simple, impératif.",
        created: "2026-09-06",
      },
      {
        id: "conj-aller",
        path: "/conjugaison/aller",
        title: "aller",
        tag: "3e groupe",
        level: null,
        delf: "Présent, imparfait, passé composé, futur simple, impératif.",
        created: "2026-09-06",
      },
      {
        id: "conj-faire",
        path: "/conjugaison/faire",
        title: "faire",
        tag: "3e groupe",
        level: null,
        delf: "Présent, imparfait, passé composé, futur simple, impératif.",
        created: "2026-09-06",
      },
      {
        id: "conj-prendre",
        path: "/conjugaison/prendre",
        title: "prendre",
        tag: "3e groupe",
        level: null,
        delf: "Présent, imparfait, passé composé, futur simple, impératif.",
        created: "2026-09-06",
      },
      {
        id: "conj-venir",
        path: "/conjugaison/venir",
        title: "venir",
        tag: "3e groupe",
        level: null,
        delf: "Présent, imparfait, passé composé, futur simple, impératif.",
        created: "2026-09-06",
      },
      {
        id: "conj-partir",
        path: "/conjugaison/partir",
        title: "partir",
        tag: "3e groupe",
        level: null,
        delf: "Présent, imparfait, passé composé, futur simple, impératif.",
        created: "2026-09-12",
      },
      {
        id: "conj-pouvoir",
        path: "/conjugaison/pouvoir",
        title: "pouvoir",
        tag: "3e groupe",
        level: null,
        delf: "Présent, imparfait, passé composé, futur simple, impératif.",
        created: "2026-09-06",
      },
      {
        id: "conj-vouloir",
        path: "/conjugaison/vouloir",
        title: "vouloir",
        tag: "3e groupe",
        level: null,
        delf: "Présent, imparfait, passé composé, futur simple, impératif.",
        created: "2026-09-06",
      },
      {
        id: "conj-devoir",
        path: "/conjugaison/devoir",
        title: "devoir",
        tag: "3e groupe",
        level: null,
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
        level: null,
        delf: "Écrire les signes qui font partie du mot",
        created: "2026-09-12",
      },
      {
        id: "orth-homophones",
        path: "/orthographe/les-homophones",
        title: "Les homophones",
        subtitle: "a / à · et / est · on / ont · son / sont · ou / où",
        level: null,
        delf: "Écrire sans confondre les mots qui se prononcent pareil",
        created: "2026-09-06",
      },
      {
        id: "orth-homophones-demonstratif",
        path: "/orthographe/les-homophones-du-demonstratif",
        title: "Les homophones du démonstratif",
        subtitle: "ce / se · ces / ses · c’est / s’est · ça / sa",
        level: null,
        delf: "Écrire ce qui montre sans le confondre avec ce qui appartient",
        created: "2026-09-21",
      },
      {
        id: "orth-homophones-article",
        path: "/orthographe/les-homophones-de-l-article",
        title: "Les homophones de l’article",
        subtitle: "la / l’a / là · des / dès · du / dû",
        level: null,
        delf: "Écrire l’article sans le confondre avec un verbe ou un adverbe",
        created: "2026-09-21",
      },
      {
        id: "orth-determinants-possessifs",
        path: "/orthographe/les-determinants-possessifs",
        title: "Les déterminants possessifs",
        subtitle: "mon / ma / mes · son / sa / ses · leur / leurs",
        level: null,
        delf: "Écrire à qui la chose appartient, et l’accorder",
        created: "2026-09-12",
      },
      {
        id: "orth-terminaisons-verbales",
        path: "/orthographe/les-terminaisons-verbales",
        title: "Les terminaisons verbales",
        subtitle: "-er · -é · -ez · -ais / -ait",
        level: null,
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
        level: "A1",
        delf: "Compter, dire un prix, un âge et un numéro",
        created: "2026-09-21",
      },
      {
        id: "voc-famille",
        path: "/vocabulaire/la-famille",
        title: "La famille",
        subtitle: "Les liens, et la famille qui arrive après",
        level: "A1",
        delf: "Nommer les membres de sa famille et dire qui ils sont",
        created: "2026-09-21",
      },
      {
        id: "voc-maison",
        path: "/vocabulaire/la-maison",
        title: "La maison",
        subtitle: "Les pièces, les meubles et les faux amis",
        level: "A1",
        delf: "Nommer les pièces et les meubles d’un logement",
        created: "2026-09-30",
      },
      {
        id: "voc-transports",
        path: "/vocabulaire/les-transports",
        title: "Les transports",
        subtitle: "En bus, à pied, et les mots de la gare",
        level: "A1",
        delf: "Dire comment on se déplace et se repérer à la gare",
        created: "2026-09-30",
      },
      {
        id: "voc-pays-nationalites",
        path: "/vocabulaire/les-pays-et-les-nationalites",
        title: "Les pays et les nationalités",
        subtitle: "Je suis espagnol, je viens d’Espagne",
        level: "A1",
        delf: "Dire son pays et sa nationalité pour se présenter",
        created: "2026-09-30",
      },
      {
        id: "voc-jours-mois-a1",
        path: "/vocabulaire/les-jours-et-les-mois",
        title: "Les jours, les mois et la date",
        subtitle: "Lundi, mars, le 3 mars",
        level: "A1",
        delf: "Nommer les jours, les mois et les saisons, et dire la date",
        created: "2026-09-30",
      },
      {
        id: "voc-heure",
        path: "/vocabulaire/l-heure",
        title: "L’heure",
        level: "A2",
        delf: "Demander et dire l’heure, fixer un rendez-vous",
        created: "2026-09-06",
      },
      {
        id: "voc-jours-et-date",
        path: "/vocabulaire/les-jours-et-la-date",
        title: "Les jours et la date",
        level: "A2",
        delf: "Situer un événement dans la semaine, dans l’année",
        created: "2026-09-12",
      },
      {
        id: "voc-travail",
        path: "/vocabulaire/le-travail",
        title: "Le travail",
        subtitle: "Le métier, le lieu, le contrat",
        level: "A2",
        delf: "Parler de son métier et de ses conditions de travail",
        created: "2026-09-12",
      },
      {
        id: "voc-recette-croissants",
        path: "/vocabulaire/la-recette-des-croissants",
        title: "La recette des croissants",
        subtitle: "Les ingrédients, les ustensiles, les gestes",
        level: "A2",
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
        id: "astuce-tu-ou-vous",
        path: "/astuces/tu-ou-vous",
        title: "Tu ou vous ?",
        subtitle: "Saluer, remercier, s’excuser : à qui dire quoi",
        level: "A1",
        delf: "Saluer, prendre congé, remercier, s’excuser",
        created: "2026-09-30",
      },
      {
        id: "astuce-etre-ou-avoir",
        path: "/astuces/etre-ou-avoir",
        title: "Être ou avoir ?",
        subtitle: "Choisir l’auxiliaire du passé composé",
        level: "A2",
        delf: "Raconter un événement passé",
        created: "2026-09-12",
      },
      {
        id: "astuce-a-en-au-aux",
        path: "/astuces/a-en-au-aux",
        title: "à, en, au ou aux ?",
        subtitle: "Devant une ville, devant un pays",
        level: "A2",
        delf: "Dire où l’on habite, où l’on va, d’où l’on vient",
        created: "2026-09-12",
      },
      {
        id: "astuce-pas-de",
        path: "/astuces/pas-de",
        title: "pas de ou pas un ?",
        subtitle: "Ce que la négation et la quantité font à l’article",
        level: "A2",
        delf: "Dire ce qu’on n’a pas, et en quelle quantité",
        created: "2026-09-21",
      },
      /* Sans niveau, contrairement aux trois astuces au-dessus : celle-ci ne
         répond pas à un échelon du CECRL mais à l’orthographe,
         comme les pages du chapitre `orthographe` qu’elle raccourcit. */
      {
        id: "astuce-ces-ou-ses",
        path: "/astuces/ces-ou-ses",
        title: "ces ou ses ?",
        subtitle: "Le test du -là",
        level: null,
        delf: "Choisir entre montrer une chose et dire à qui elle appartient",
        created: "2026-09-21",
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
        level: "A2",
        sets: ["A2", "B1"],
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
        level: "A2",
        sets: ["A2", "B1"],
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
        level: "A2",
        delf: "Écrire les terminaisons du 1er groupe aux cinq temps du programme A2",
        created: "2026-09-15",
      },
      {
        id: "ex-ce-ou-celui",
        path: "/exercices/ce-ou-celui",
        title: "Ce ou celui ?",
        subtitle: "Le déterminant ou le pronom",
        tag: "Pioche",
        level: "A2",
        sets: ["A2", "B1"],
        delf: {
          A2: "Accorder le démonstratif avec le nom, ou avec le nom qu’il remplace",
          B1: "Reprendre une idée qui n’a pas de nom avec ce qui, ce que, ce dont.",
        },
        created: "2026-09-21",
      },
      /* Pas de `sets` : un seul lot, et il est sans niveau comme la leçon
         qu’il fait travailler. Le tick reste l’id nu (#87). */
      {
        id: "ex-homophones-demonstratif",
        path: "/exercices/les-homophones-du-demonstratif",
        title: "Écrivez le bon mot",
        subtitle: "ce · se · ces · ses · c’est · s’est · ça · sa",
        tag: "Saisie",
        level: null,
        delf: "Écrire l’homophone qui convient dans une phrase complète",
        created: "2026-09-21",
      },
      {
        id: "ex-articles-a1",
        path: "/exercices/le-la-ou-un",
        title: "Le, la ou un ?",
        subtitle: "Choisir l’article, avec les mots de la maison et des transports",
        tag: "Choix",
        level: "A1",
        delf: "Choisir l’article qui convient devant un nom connu",
        created: "2026-09-30",
      },
      {
        id: "ex-tu-ou-vous",
        path: "/exercices/tu-ou-vous",
        title: "Tu ou vous ?",
        subtitle: "Choisir la formule qui convient : tutoyer, saluer, remercier, s’excuser",
        tag: "Choix",
        level: "A1",
        delf: "Choisir la formule de politesse adaptée à la situation",
        created: "2026-09-30",
      },
      {
        id: "ex-nationalites-a1",
        path: "/exercices/en-au-ou-aux",
        title: "En, au ou aux ?",
        subtitle: "Les prépositions des pays et les nationalités",
        tag: "Choix",
        level: "A1",
        delf: "Dire où l’on habite et d’où l’on vient, et accorder une nationalité",
        created: "2026-09-30",
      },
      {
        id: "ex-verbes-er-a1",
        path: "/exercices/parle-parles-parlent",
        title: "Parle, parles, parlent",
        subtitle: "La terminaison des verbes en -er, et je ou j’",
        tag: "Choix",
        level: "A1",
        delf: "Écrire la terminaison d’un verbe en -er au présent",
        created: "2026-09-30",
      },
      {
        id: "ex-gouts-a1",
        path: "/exercices/j-aime-le-cafe",
        title: "J’aime le café",
        subtitle: "Le, la, les après aimer ; un, du ou de après je voudrais et je mange",
        tag: "Choix",
        level: "A1",
        delf: "Dire ce qu’on aime ou n’aime pas, avec l’article qui convient",
        created: "2026-09-30",
      },
      {
        id: "ex-questions-a1",
        path: "/exercices/quel-mot-pour-demander",
        title: "Quel mot pour demander ?",
        subtitle: "Qui, où, quand, quel, est-ce que : choisir d’après la réponse",
        tag: "Choix",
        level: "A1",
        delf: "Poser une question simple sur une personne, un lieu, un moment, un prix",
        created: "2026-09-30",
      },
      {
        id: "ex-date-a1",
        path: "/exercices/quel-jour-sommes-nous",
        title: "Quel jour sommes-nous ?",
        subtitle: "Les saisons, les mois, lundi ou le lundi, et la date",
        tag: "Choix",
        level: "A1",
        delf: "Dire quand : la saison, le mois, le jour et la date",
        created: "2026-09-30",
      },
      {
        id: "ex-le-un-ou-du",
        path: "/exercices/le-un-ou-du",
        title: "Le, un ou du ?",
        subtitle: "Un texte à trous, et le tirage des articles",
        tag: "Texte",
        level: "A2",
        sets: ["A2", "B1"],
        delf: {
          A2: "Choisir l’article que le texte impose, d’une phrase à la suivante",
          B1: "Reconnaître aussi les places où l’article ne s’écrit pas.",
        },
        created: "2026-09-21",
      },
      {
        id: "ex-relisez-le-paragraphe",
        path: "/exercices/relisez-le-paragraphe",
        title: "Relisez le paragraphe",
        subtitle: "la / l’a / là · des / dès · du / dû",
        tag: "Relecture",
        level: null,
        delf: "Repérer tous les homophones mal écrits d’un texte, et eux seuls",
        created: "2026-09-21",
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
      /* Les deux scènes A1, avant les scènes A2 (#72). Chaque niveau a la
         sienne : une scène ne se partage pas comme un texte de lecture, parce
         que #57 fait la page de ses étapes et de son nuage de mots, et les
         deux changent entièrement d'un niveau à l'autre. */
      {
        id: "conv-se-presenter",
        path: "/conversation/se-presenter",
        title: "Se présenter",
        subtitle: "À quelqu’un que vous rencontrez",
        tag: "Jeu de rôle",
        level: "A1",
        delf: "Se présenter, s’informer sur l’identité, faire répéter.",
        created: "2026-09-21",
      },
      {
        id: "conv-faire-des-achats",
        path: "/conversation/faire-des-achats",
        title: "Faire des achats",
        subtitle: "À la boulangerie, au marché",
        tag: "Jeu de rôle",
        level: "A1",
        delf: "Demander une quantité, comprendre un prix, payer.",
        created: "2026-09-21",
      },
      {
        id: "conv-parler-de-ses-gouts",
        path: "/conversation/parler-de-ses-gouts",
        title: "Parler de ses goûts",
        subtitle: "Ce que vous aimez, ce que vous n’aimez pas",
        tag: "Jeu de rôle",
        level: "A1",
        delf: "Dire ce qu’on aime et ce qu’on n’aime pas, poser la question en retour",
        created: "2026-09-30",
      },
      {
        id: "conv-rendez-vous-medecin",
        path: "/conversation/prendre-rendez-vous",
        title: "Prendre rendez-vous",
        subtitle: "Chez le médecin",
        tag: "Jeu de rôle",
        level: "A2",
        delf: "Demander un rendez-vous, proposer et accepter une heure.",
        created: "2026-09-06",
      },
      {
        id: "conv-demander-son-chemin",
        path: "/conversation/demander-son-chemin",
        title: "Demander son chemin",
        subtitle: "Dans une ville inconnue",
        tag: "Jeu de rôle",
        level: "A2",
        delf: "Demander et suivre un itinéraire simple, faire répéter.",
        created: "2026-09-12",
      },
      {
        id: "conv-au-restaurant",
        path: "/conversation/au-restaurant",
        title: "Au restaurant",
        subtitle: "Commander, et régler l’addition",
        tag: "Jeu de rôle",
        level: "A2",
        delf: "Commander un repas, poser une question sur un plat, payer.",
        created: "2026-09-12",
      },
      {
        id: "conv-parler-espagne",
        path: "/conversation/parler-de-l-espagne",
        title: "Parler de l’Espagne",
        subtitle: "À des enfants de dix ans",
        tag: "Jeu de rôle",
        level: "A2",
        delf: "Décrire son pays et sa vie quotidienne, en réponse à des questions simples.",
        created: "2026-09-06",
      },
      {
        id: "conv-parler-du-travail",
        path: "/conversation/parler-du-travail",
        title: "Parler du travail",
        subtitle: "Avec un collègue français",
        tag: "Jeu de rôle",
        level: "A2",
        delf: "Comparer ses horaires et ses habitudes de travail avec ceux d’un autre pays.",
        created: "2026-09-07",
      },
      {
        id: "conv-decrire-sa-ville",
        path: "/conversation/decrire-sa-ville",
        title: "Décrire sa ville",
        subtitle: "À une amie qui vient vous voir",
        tag: "Jeu de rôle",
        level: "A2",
        delf: "Décrire son cadre de vie, situer un lieu et conseiller un visiteur.",
        created: "2026-09-15",
      },
      {
        id: "conv-choisir-un-cadeau",
        path: "/conversation/choisir-un-cadeau",
        title: "Choisir un cadeau",
        subtitle: "Dans une boutique",
        tag: "Jeu de rôle",
        level: "A2",
        delf: "Comparer deux objets, en choisir un et l’acheter.",
        created: "2026-09-21",
      },
      {
        id: "conv-preparer-un-repas",
        path: "/conversation/preparer-un-repas",
        title: "Préparer un repas",
        subtitle: "Ce qu’il faut acheter",
        tag: "Jeu de rôle",
        level: "A2",
        delf: "Décider d’un repas, dire ce qu’il faut acheter et en quelle quantité.",
        created: "2026-09-21",
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
        level: "A2",
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
        level: "A2",
        delf: "Écrire un court résumé et dire ce qui ne se passe pas.",
        created: "2026-09-15",
      },
      {
        id: "trad-week-end-plage",
        path: "/traduction/un-week-end-a-la-plage",
        title: "Un week-end à la plage",
        subtitle: "a / à · et / est · on / ont · son / sont · où / ou",
        tag: "Traduction",
        level: "A2",
        delf: "Écrire des phrases simples sans confondre les homophones.",
        created: "2026-09-06",
      },
      {
        id: "trad-hier-dans-la-rue",
        path: "/traduction/hier-dans-la-rue",
        title: "Hier, dans la rue",
        subtitle: "Les pronoms au passé composé",
        tag: "Traduction",
        level: "A2",
        delf: "Raconter un échange en remplaçant les noms par des pronoms.",
        created: "2026-09-06",
      },
      {
        id: "trad-le-frigo-est-vide",
        path: "/traduction/le-frigo-est-vide",
        title: "Le frigo est vide",
        subtitle: "Quatre phrases, et pas un nom sans article",
        tag: "Traduction",
        level: "A2",
        delf: "Écrire une liste de courses et dire ce qu’on ne mange pas.",
        created: "2026-09-21",
      },
      {
        id: "trad-le-village",
        path: "/traduction/le-village",
        title: "Le village",
        subtitle: "Montrer, et ne pas répéter le nom",
        tag: "Traduction",
        level: "A2",
        delf: "Décrire un lieu familier en reprenant les noms sans les répéter.",
        created: "2026-09-21",
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
        level: "A2",
        sets: ["A2", "B1"],
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
        level: "A2",
        sets: ["A2", "B1"],
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
        level: "A2",
        sets: ["A2", "B1"],
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
        level: "A2",
        sets: ["A2", "B1"],
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
        level: "A2",
        sets: ["A2", "B1"],
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
        level: "A2",
        sets: ["A2", "B1"],
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
        level: "A2",
        sets: ["A2", "B1"],
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
        level: "A2",
        sets: ["A2", "B1"],
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
        level: "A2",
        sets: ["A2", "B1"],
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
        level: null,
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
        level: null,
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
  /* L'atelier : le seul chapitre qui se vide (#80).

     Ses pages sont écrites pour une séance en particulier, partagées à l'écran
     pendant le cours, puis retirées — remontées dans un vrai chapitre si elles
     valent mieux que leur semaine, supprimées sinon. C'est ce que `scratch`
     dit au reste de l'application : ici rien ne se coche, rien ne compte dans
     une progression, et « La suite » ne s'y arrête jamais.

     Il est listé comme les autres, et c'est voulu : on y va d'un clic au
     milieu d'un cours donné en visio. Ce qu'un visiteur y trouve est la séance
     de la semaine, pas une page oubliée.

     Trois règles que rien ne vérifie :

     - **Un identifiant porte sa date** — `temp-2026-09-22-terminaisons` — et ne
       ressert jamais. Un identifiant est permanent et une coche est rangée
       dessous (#50) ; réutiliser un slug pour une autre matière ferait
       réapparaître des coches sur la mauvaise page.
     - **Aucune page permanente ne renvoie ici.** Les liens croisés échouent en
       silence (`AGENTS.md` §6) : un lien du cours vers l'atelier disparaîtrait
       à la remise à zéro sans que rien ne le dise. L'inverse est utile — une
       page d'atelier renvoie vers les leçons qu'elle fait travailler.
     - **Les leçons y sont sans niveau** (`level: null`). Le filtre de niveau
       ne doit pas cacher en plein cours la page qu'on est en train de partager.

     Une page retirée d'ici ne laisse pas de redirection : son URL n'a jamais
     été promise à personne, ce qui est exactement ce qui la distingue d'une
     leçon renommée (#50). */
  {
    slug: "temp",
    icon: "atelier",
    path: "/temp",
    title: "Atelier",
    blurb:
      "Les pages d’une séance : écrites pour un cours en particulier, remplacées chaque semaine.",
    scratch: true,
    lessons: [
      /* Un texte rendu cette semaine et la séance construite dessus. Publié
         sans nom et sans rien qui désigne qui l'a écrit (`AGENTS.md` §9b). */
      {
        id: "temp-2026-09-29-les-trois-voeux",
        path: "/temp/les-trois-voeux",
        title: "Les trois vœux",
        subtitle: "Ton texte, son corrigé, et trois trucs pour ce qui suit « avait »",
        level: null,
        delf: "Raconter une histoire au passé, à l'écrit",
        created: "2026-09-29",
      },
      {
        id: "temp-2026-09-29-un-resume-de-roman",
        path: "/temp/un-resume-de-roman",
        title: "Un résumé de roman",
        subtitle: "Ta copie à corriger toi-même, puis tes fautes en quatre familles",
        level: null,
        delf: "Résumer par écrit un récit qu'on a lu",
        created: "2026-09-29",
      },
    ],
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
    untracked: true,
    path: "/delf",
    title: "DELF",
    blurb:
      "La forme de l’examen, et des épreuves entières à faire en conditions réelles.",
    outbound: {
      href: "https://www.france-education-international.fr/diplome/delf-tout-public/niveau-a2/exemples-sujets",
      label: "les exemples de sujets de France Éducation international",
      note: "Les épreuves ci-dessus sont écrites pour ce cours. Pour lire un sujet officiel complet, avec les enregistrements de la compréhension de l’oral, téléchargez",
    },
    lessons: [
      /* L'ordre du jour de l'examen : l'oral collectif d'abord, puis les
         écrits, puis l'oral individuel. */
      {
        id: "delf-a2-comprehension-oral",
        path: "/delf/a2-comprehension-de-l-oral",
        title: "Compréhension de l’oral",
        subtitle: "A2 · 25 points · 25 minutes",
        tag: "Épreuve",
        level: "A2",
        delf: "Comprendre des annonces, des messages et des conversations courtes",
        created: "2026-09-27",
      },
      {
        id: "delf-a2-comprehension-ecrits",
        path: "/delf/a2-comprehension-des-ecrits",
        title: "Compréhension des écrits",
        subtitle: "A2 · 25 points · 30 minutes",
        tag: "Épreuve",
        level: "A2",
        delf: "Lire pour s’orienter et pour s’informer, en temps limité",
        created: "2026-09-21",
      },
      {
        id: "delf-a2-production-ecrite",
        path: "/delf/a2-production-ecrite",
        title: "Production écrite",
        subtitle: "A2 · 25 points · 45 minutes",
        tag: "Épreuve",
        level: "A2",
        delf: "Raconter un événement, et répondre à une lettre amicale",
        created: "2026-09-21",
      },
      {
        id: "delf-a2-production-orale",
        path: "/delf/a2-production-orale",
        title: "Production orale",
        subtitle: "A2 · 25 points · 6 à 8 minutes",
        tag: "Épreuve",
        level: "A2",
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
     long list is not where you look for the list's own overview. */
  { path: "/sommaire", title: "Sommaire", level: null, where: "top", icon: "sommaire" },
  /* The marks are the ones the popover already shows elsewhere: the tick the
     listings record, and the glyph on the account control itself.

     Signed out, « Ma progression » is a page whose whole content is the offer
     to sign in, which the row below it already makes — the same link twice is
     what took « Code source » out of this panel (#47). */
  {
    path: "/ma-progression",
    title: "Ma progression",
    level: null,
    where: "menu",
    icon: "progression",
    signedOut: "hide",
  },
  {
    path: "/compte",
    title: "Compte",
    level: null,
    where: "menu",
    icon: "compte",
    signedOut: { title: "Se connecter" },
  },
  /* In the footer rather than the popover: it is a page about the site, and the
     account menu is about the account. The footer is under every page anyway,
     which is one link instead of two places offering the same one. */
  { path: "/a-propos", title: "À propos", level: null, where: "footer" },
];

/**
 * Real routes that carry no manifest entry.
 *
 * Five pages are not part of the course: the home page, the results page, the
 * token specimen, the atelier's door (#81) — which is a route precisely
 * because it has to sit *outside* `/temp`, where the proxy cannot intercept the
 * Server Function that opens it — and the onboarding a first sign-in passes
 * through (`/bienvenue`). Declaring them is what lets the `nav-wiring`
 * audit report a route that is in neither the manifest nor this list, instead
 * of letting a page exist that nothing links to and nothing notices.
 *
 * It used to map each one to a breadcrumb label. The topbar no longer names the
 * page you are on — the `<h1>` does — so the labels went with that (#45).
 */
export const unlistedPages: string[] = ["/", "/recherche", "/design", "/entrer", "/bienvenue"];

/**
 * The chapters offered as shortcuts under the search field on the home page.
 *
 * A deliberate short list, not everything: a pill per chapter is a second sommaire,
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
 * A page's `sets` are at least two, in ladder order, and start at its `level`.
 *
 * Checked at import like the ids, so a slip fails `next build`: a `level` that
 * is not the first set would badge the page at one rung and open it on
 * another, and nothing on screen would look wrong.
 */
function assertSets(): void {
  for (const chapter of chapters) {
    for (const lesson of chapter.lessons) {
      const { sets } = lesson;
      if (!sets) continue;
      const ordered = [...sets].sort((a, b) => LADDER.indexOf(a) - LADDER.indexOf(b));
      if (
        sets.length < 2 ||
        new Set(sets).size !== sets.length ||
        ordered.join() !== sets.join() ||
        sets[0] !== lesson.level
      ) {
        throw new Error(
          `navigation: ${lesson.path} has sets [${sets}] and level ${lesson.level} — ` +
            "sets are two or more, in ladder order, and the first is the page's level.",
        );
      }
    }
  }
}

assertSets();

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

/**
 * The chapters progress is kept on: everything but the scratch chapters (#80)
 * and the épreuves (#82).
 *
 * **Every reader of `chapters` that is about progress wants this instead.**
 * `/ma-progression` is one, and a parcours may only name lessons in these
 * (#88) — the reason is the same in both: an `Atelier` page is deleted at the end of the week and cannot
 * be ticked, so counting it puts a denominator out of reach, and looking for
 * the first unticked lesson in course order finds it and stops there for ever.
 *
 * It is deliberately not the same list as `listedChapters()`. That one answers
 * "what does the course offer this learner", and the atelier *is* offered — it
 * is in the sidebar and on the sommaire like any other chapter. This one
 * answers "what is the learner working through", which is not the same set.
 */
export function trackedChapters(): Chapter[] {
  return chapters.filter(isTracked);
}

/** Whether a chapter's pages carry a tick: not scratch (#80), not an exam (#82). */
export function isTracked(chapter: Chapter): boolean {
  return !chapter.scratch && !chapter.untracked;
}

/** The rungs a page is listed at: its sets, else its level, else none (#86). */
export function listedAt(page: PageEntry & { sets?: Level[] }): Level[] {
  return page.sets ?? (page.level ? [page.level] : []);
}

/**
 * Whether a page is part of what the learner chose to see (#86).
 *
 * A page with no level is in every view — a verb table is never out of place.
 * **This filters what the course offers, never what it permits**: a lesson
 * reached by direct link renders in full whatever the view.
 */
export function inView(page: PageEntry & { sets?: Level[] }, view: View): boolean {
  if (view === "all") return true;
  const at = listedAt(page);
  return at.length === 0 || at.some((level) => view.includes(level));
}

/** A chapter's lessons in `view`, in manifest order. */
export function visibleLessons(chapter: Chapter, view: View): Lesson[] {
  if (view === "all") return chapter.lessons;
  return chapter.lessons.filter((lesson) => inView(lesson, view));
}

/**
 * The chapters a listing draws: those with at least one lesson to offer.
 *
 * **A chapter with nothing in it is not shown** (`docs/decisions.md` #51). The
 * course's sixteen are all declared here because its shape is decided; what the
 * interface offers is what is written, and a row leading to an empty page is
 * the « Bientôt » badge again with worse manners. A chapter reappears on its
 * own the moment its first lesson lands — there is no second list to update.
 *
 * It takes the view for the same reason `visibleLessons` does: a chapter whose
 * only lessons are A2 has nothing to offer someone viewing A1, and saying
 * « rien à ce niveau » on a card is a card that costs a click to learn nothing.
 * The chapter's own page still renders at its URL and still says what it holds.
 */
export function listedChapters(view: View): Chapter[] {
  return chapters.filter((chapter) => visibleLessons(chapter, view).length > 0);
}

/**
 * The set a page holding several is in, asked at `level` (#87).
 *
 * `level` when the page has that set, else its first — deterministic, so the
 * questions, the line under the title and the tick beneath the page cannot
 * disagree. A page with no sets answers with its own level: it has one body of
 * work, and `progressKey` ignores the answer.
 */
export function variantOf(lesson: Lesson, level: Level | null): Level | null {
  if (!lesson.sets) return lesson.level;
  return level && lesson.sets.includes(level) ? level : lesson.sets[0];
}

/**
 * The descriptor to print for the variant in view.
 *
 * A plain `delf` is returned whatever the level, which is every page but the
 * few that hold sets. A record is read at `variantOf`, like the tick.
 */
export function delfFor(lesson: Lesson, level: Level | null): string | undefined {
  const { delf } = lesson;
  if (delf === undefined || typeof delf === "string") return delf;
  const variant = variantOf(lesson, level);
  return variant ? delf[variant] : undefined;
}

export function findChapter(routePath: string): Chapter | null {
  const slug = routePath.split("/").filter(Boolean)[0];
  return chapters.find((chapter) => chapter.slug === slug) ?? null;
}

/**
 * A lesson by its permanent id — how a parcours names its lessons (#88), since
 * a path is renamed and an id never is (#50).
 */
export function findLessonById(id: LessonId): { chapter: Chapter; lesson: Lesson } | null {
  for (const chapter of chapters) {
    const lesson = chapter.lessons.find((item) => item.id === id);
    if (lesson) return { chapter, lesson };
  }
  return null;
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
  /* Le second bloc A1 : verbes en -er, goûts, questions, tu/vous, pays et
     dates. Chaque page renvoie à son exercice et l'exercice à sa page. */
  "/grammaire/les-verbes-en-er": [
    "/exercices/parle-parles-parlent",
    "/conjugaison/parler",
    "/conjugaison/manger",
    "/grammaire/le-singulier-et-le-pluriel",
  ],
  "/exercices/parle-parles-parlent": [
    "/grammaire/les-verbes-en-er",
    "/conjugaison/parler",
    "/conjugaison/manger",
    "/exercices/le-la-ou-un",
  ],
  "/grammaire/parler-de-ses-gouts": [
    "/exercices/j-aime-le-cafe",
    "/conversation/parler-de-ses-gouts",
    "/grammaire/les-articles-definis",
    "/grammaire/les-articles-partitifs",
  ],
  "/exercices/j-aime-le-cafe": [
    "/grammaire/parler-de-ses-gouts",
    "/grammaire/les-articles-definis",
    "/grammaire/les-articles-partitifs",
  ],
  "/conversation/parler-de-ses-gouts": [
    "/grammaire/parler-de-ses-gouts",
    "/conversation/se-presenter",
    "/grammaire/les-articles-definis",
    "/conversation/faire-des-achats",
  ],
  "/grammaire/poser-une-question": [
    "/exercices/quel-mot-pour-demander",
    "/grammaire/c-est-ce-sont",
    "/conversation/se-presenter",
  ],
  "/exercices/quel-mot-pour-demander": [
    "/grammaire/poser-une-question",
    "/conversation/se-presenter",
  ],
  "/astuces/tu-ou-vous": [
    "/exercices/tu-ou-vous",
    "/conversation/se-presenter",
    "/conversation/faire-des-achats",
  ],
  "/exercices/tu-ou-vous": [
    "/astuces/tu-ou-vous",
    "/conversation/se-presenter",
  ],
  "/vocabulaire/les-pays-et-les-nationalites": [
    "/exercices/en-au-ou-aux",
    "/astuces/a-en-au-aux",
    "/conversation/se-presenter",
    "/grammaire/c-est-ce-sont",
  ],
  "/exercices/en-au-ou-aux": [
    "/vocabulaire/les-pays-et-les-nationalites",
    "/astuces/a-en-au-aux",
  ],
  "/vocabulaire/les-jours-et-les-mois": [
    "/exercices/quel-jour-sommes-nous",
    "/vocabulaire/les-nombres",
    "/vocabulaire/les-jours-et-la-date",
    "/vocabulaire/l-heure",
  ],
  "/exercices/quel-jour-sommes-nous": [
    "/vocabulaire/les-jours-et-les-mois",
    "/vocabulaire/les-nombres",
  ],
  "/astuces/a-en-au-aux": [
    "/exercices/en-au-ou-aux",
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
    "/orthographe/les-homophones-du-demonstratif",
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
  "/vocabulaire/la-maison": [
    "/grammaire/les-articles-definis",
    "/grammaire/les-articles-indefinis",
    "/grammaire/le-singulier-et-le-pluriel",
    "/vocabulaire/la-famille",
  ],
  "/vocabulaire/les-transports": [
    "/vocabulaire/la-maison",
    "/grammaire/les-articles-definis",
    "/conjugaison/aller",
    "/conjugaison/prendre",
  ],
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
  /* L'épreuve lue à voix haute renvoie à l'épreuve suivante, puis à ce
     qu'elle fait entendre le plus : des heures, des prix, un chemin. */
  "/delf/a2-comprehension-de-l-oral": [
    "/delf/a2-comprehension-des-ecrits",
    "/vocabulaire/l-heure",
    "/vocabulaire/les-nombres",
    "/conversation/demander-son-chemin",
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
    "/delf/a2-comprehension-de-l-oral",
    "/conversation/se-presenter",
    "/conversation/parler-du-travail",
    "/conversation/decrire-sa-ville",
  ],
  /* Les trois séries d'articles, et ce qui gravite autour : chacune renvoie
     aux deux autres, à l'exercice qui les fait choisir dans un texte, et au
     raccourci de la négation. C'est le groupe le plus dense du chapitre, parce
     que la difficulté n'est jamais une série mais le passage de l'une à
     l'autre. */
  "/grammaire/les-articles-definis": [
    "/grammaire/les-articles-indefinis",
    "/grammaire/les-articles-partitifs",
    "/exercices/le-la-ou-un",
    "/astuces/a-en-au-aux",
  ],
  "/grammaire/les-articles-indefinis": [
    "/grammaire/les-articles-definis",
    "/grammaire/le-singulier-et-le-pluriel",
    "/grammaire/les-articles-partitifs",
    "/exercices/le-la-ou-un",
  ],
  "/grammaire/le-singulier-et-le-pluriel": [
    "/grammaire/les-articles-definis",
    "/grammaire/les-articles-indefinis",
  ],
  "/grammaire/les-articles-partitifs": [
    "/exercices/le-un-ou-du",
    "/astuces/pas-de",
    "/grammaire/les-articles-indefinis",
    "/vocabulaire/la-recette-des-croissants",
  ],
  "/grammaire/quand-l-article-disparait": [
    "/grammaire/les-articles-partitifs",
    "/exercices/le-un-ou-du",
    "/grammaire/c-est-ce-sont",
    "/grammaire/les-articles-definis",
  ],
  "/orthographe/les-homophones-de-l-article": [
    "/exercices/relisez-le-paragraphe",
    "/orthographe/les-homophones",
    "/orthographe/les-homophones-du-demonstratif",
    "/grammaire/les-articles-definis",
  ],
  /* L'astuce renvoie d'abord à la leçon qui possède la règle, la négation, et
     non au partitif : c'est là qu'est le tableau, et un raccourci qui ne
     pointe pas vers son propriétaire finit par le contredire. */
  "/astuces/pas-de": [
    "/grammaire/la-negation",
    "/grammaire/les-articles-partitifs",
    "/exercices/le-un-ou-du",
    "/conversation/preparer-un-repas",
  ],
  "/exercices/le-la-ou-un": [
    "/grammaire/les-articles-definis",
    "/grammaire/les-articles-indefinis",
    "/vocabulaire/la-maison",
    "/vocabulaire/les-transports",
  ],
  "/exercices/le-un-ou-du": [
    "/grammaire/les-articles-definis",
    "/grammaire/les-articles-indefinis",
    "/grammaire/les-articles-partitifs",
    "/astuces/pas-de",
  ],
  "/exercices/relisez-le-paragraphe": [
    "/orthographe/les-homophones-de-l-article",
    "/exercices/trouve-la-faute",
    "/exercices/les-homophones-du-demonstratif",
    "/orthographe/les-homophones",
  ],
  "/conversation/preparer-un-repas": [
    "/grammaire/les-articles-partitifs",
    "/vocabulaire/la-recette-des-croissants",
    "/astuces/pas-de",
    "/conversation/faire-des-achats",
  ],
  "/traduction/le-frigo-est-vide": [
    "/grammaire/les-articles-partitifs",
    "/astuces/pas-de",
    "/conversation/preparer-un-repas",
    "/grammaire/la-negation",
  ],
  /* Les pages du démonstratif se tiennent en escalier : la page A1 présente,
     le déterminant montre, le pronom remplace le nom, et le B1 reprend ce qui
     n'a pas de nom. Chacune renvoie à la suivante, à l'exercice qui la fait
     travailler, et à la page d'orthographe pour qui écrit ces mots plutôt que
     de les choisir. */
  "/grammaire/c-est-ce-sont": [
    "/grammaire/les-determinants-demonstratifs",
    "/orthographe/les-homophones-du-demonstratif",
    "/conversation/se-presenter",
    "/grammaire/la-negation",
  ],
  "/grammaire/les-determinants-demonstratifs": [
    "/grammaire/les-pronoms-demonstratifs",
    "/exercices/ce-ou-celui",
    "/orthographe/les-homophones-du-demonstratif",
    "/traduction/le-village",
  ],
  "/grammaire/les-pronoms-demonstratifs": [
    "/exercices/ce-ou-celui",
    "/grammaire/les-determinants-demonstratifs",
    "/conversation/choisir-un-cadeau",
    "/grammaire/ce-qui-ce-que-ce-dont",
  ],
  "/grammaire/ce-qui-ce-que-ce-dont": [
    "/grammaire/les-pronoms-demonstratifs",
    "/exercices/ce-ou-celui",
    "/grammaire/les-pronoms-cod-coi",
    "/grammaire/c-est-ce-sont",
  ],
  /* La leçon d'orthographe, son astuce et son exercice : trois pages sur les
     mêmes huit mots, qui doivent se trouver l'une l'autre sans passer par le
     sommaire. La page des possessifs vient en quatrième, parce que c'est elle
     qui possède les formes que « ses » met en jeu. */
  "/orthographe/les-homophones-du-demonstratif": [
    "/exercices/les-homophones-du-demonstratif",
    "/astuces/ces-ou-ses",
    "/orthographe/les-homophones",
    "/orthographe/les-determinants-possessifs",
  ],
  "/astuces/ces-ou-ses": [
    "/orthographe/les-homophones-du-demonstratif",
    "/exercices/les-homophones-du-demonstratif",
    "/orthographe/les-determinants-possessifs",
    "/grammaire/les-determinants-demonstratifs",
  ],
  "/exercices/ce-ou-celui": [
    "/grammaire/les-determinants-demonstratifs",
    "/grammaire/les-pronoms-demonstratifs",
    "/grammaire/ce-qui-ce-que-ce-dont",
    "/traduction/le-village",
  ],
  "/exercices/les-homophones-du-demonstratif": [
    "/orthographe/les-homophones-du-demonstratif",
    "/astuces/ces-ou-ses",
    "/orthographe/les-homophones",
    "/exercices/trouve-la-faute",
  ],
  "/conversation/choisir-un-cadeau": [
    "/grammaire/les-pronoms-demonstratifs",
    "/conversation/faire-des-achats",
    "/vocabulaire/les-nombres",
    "/exercices/ce-ou-celui",
  ],
  "/traduction/le-village": [
    "/grammaire/les-determinants-demonstratifs",
    "/grammaire/les-pronoms-demonstratifs",
    "/conversation/parler-de-l-espagne",
    "/vocabulaire/la-famille",
  ],
  "/grammaire/le-conditionnel-present": [
    "/grammaire/l-imparfait",
    "/grammaire/le-plus-que-parfait",
    "/conjugaison/vouloir",
    "/conversation/au-restaurant",
  ],
  /* Une page d'atelier renvoie vers les leçons qu'elle fait travailler, et
     jamais l'inverse (#80) : ce sens-ci disparaît avec la page à la remise à
     zéro, l'autre laisserait un lien mort dans une leçon permanente.

     **Cette clé part avec la page.** Une clé dont la source n'existe plus est
     la première chose que l'audit signale, ce qui est exactement le filet
     qu'on veut ici. */
  "/temp/les-trois-voeux": [
    "/grammaire/le-passe-compose",
    "/astuces/etre-ou-avoir",
    "/orthographe/les-terminaisons-verbales",
    "/exercices/etre-ou-avoir",
  ],
  "/temp/un-resume-de-roman": [
    "/grammaire/les-pronoms-cod-coi",
    "/orthographe/les-homophones-du-demonstratif",
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
