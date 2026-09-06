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
 * is left is the shape — fourteen chapters, their blurbs, their icons — and the
 * first real lesson will be A2.
 *
 * **Chapter order is inherited from the Vue app, not decided.** Which chapters
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
 * the repair to #29 — the Vue map ended `?? icons.default`, so a forgotten
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
  /** Singular and plural of what this chapter counts. */
  unit: [string, string];
  blurb: string;
  lessons: Lesson[];
}

/** Every level the course declares. B1 upward are empty on purpose (#12). */
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
    unit: ["leçon", "leçons"],
    blurb:
      "Les règles essentielles : les mots, leur accord et la construction de la phrase.",
    /* Ordered as a course, not alphabetically: word classes first, then the
       tenses in teaching order, then pronouns. */
    lessons: [
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
    unit: ["verbe", "verbes"],
    blurb:
      "Les tableaux des verbes les plus utiles, au présent, au passé composé et au futur.",
    lessons: [],
  },
  {
    slug: "orthographe",
    icon: "orthographe",
    path: "/orthographe",
    title: "Orthographe",
    unit: ["leçon", "leçons"],
    blurb:
      "Accorder en genre et en nombre, choisir le bon déterminant, ne plus confondre les homophones.",
    /* The literacy chapter: what a reader who already speaks French gets wrong
       in writing, and what a learner gets wrong for the same reason — the
       forms sound identical. */
    lessons: [
      {
        id: "orth-homophones",
        path: "/orthographe/les-homophones",
        title: "Les homophones",
        subtitle: "a / à · et / est · on / ont · son / sont · ou / où",
        levels: ANY,
        delf: "Écrire sans confondre les mots qui se prononcent pareil",
        created: "2026-09-06",
      },
    ],
  },
  {
    slug: "vocabulaire",
    icon: "vocabulaire",
    path: "/vocabulaire",
    title: "Vocabulaire",
    unit: ["fiche", "fiches"],
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
    ],
  },
  {
    slug: "astuces",
    icon: "astuces",
    path: "/astuces",
    title: "Astuces",
    unit: ["astuce", "astuces"],
    blurb:
      "Un truc à retenir, ses exceptions, et un lien vers la leçon qui l'explique en entier.",
    lessons: [],
  },
  {
    slug: "prononciation",
    icon: "prononciation",
    path: "/prononciation",
    title: "Prononciation",
    unit: ["leçon", "leçons"],
    blurb: "Lire le français à voix haute : les groupes de lettres et leurs sons.",
    lessons: [],
  },
  {
    slug: "exercices",
    icon: "exercices",
    path: "/exercices",
    title: "Exercices",
    unit: ["exercice", "exercices"],
    blurb: "Mettre la théorie en pratique. Chaque exercice se corrige tout seul.",
    lessons: [],
  },
  {
    slug: "jeux",
    icon: "jeux",
    path: "/jeux",
    title: "Jeux",
    unit: ["jeu", "jeux"],
    blurb:
      "Des parties courtes qui rebrassent le vocabulaire du cours. Rien n'est noté, tout se rejoue.",
    lessons: [],
  },
  {
    slug: "dictees",
    icon: "dictees",
    path: "/dictees",
    title: "Dictées",
    unit: ["dictée", "dictées"],
    blurb: "Écouter, écrire, comparer. Avec le texte et ses points de vigilance.",
    lessons: [],
  },
  {
    slug: "conversation",
    icon: "conversation",
    path: "/conversation",
    title: "Conversation",
    unit: ["dialogue", "dialogues"],
    blurb: "Des situations de la vie quotidienne, à compléter puis à dire à voix haute.",
    lessons: [],
  },
  {
    slug: "lecture",
    icon: "lecture",
    path: "/lecture",
    title: "Lecture",
    unit: ["texte", "textes"],
    blurb:
      "De courts textes à lire, avec des questions et la traduction espagnole cachée dessous.",
    lessons: [],
  },
  {
    slug: "litterature",
    icon: "litterature",
    path: "/litterature",
    title: "Littérature",
    unit: ["page", "pages"],
    blurb: "Les classiques français, en extraits courts et commentés.",
    lessons: [],
  },
  {
    slug: "musique",
    icon: "musique",
    path: "/musique",
    title: "Musique",
    unit: ["chanson", "chansons"],
    blurb: "Apprendre en chantant : vocabulaire et contexte, extrait par extrait.",
    lessons: [],
  },
  {
    slug: "culture",
    icon: "culture",
    path: "/culture",
    title: "Culture",
    unit: ["page", "pages"],
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
     fourteen-row list is not where you look for the list's own overview. */
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
 * A deliberate short list, not everything: fourteen pills is a second sommaire,
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
 * fourteen are declared here because the course's shape is decided; what the
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
export const relatedPages: Record<string, string[]> = {
  "/grammaire/le-passe-compose": [
    "/grammaire/l-imparfait",
    "/grammaire/passe-compose-ou-imparfait",
    "/grammaire/les-pronoms-cod-coi",
  ],
  "/grammaire/l-imparfait": [
    "/grammaire/le-passe-compose",
    "/grammaire/passe-compose-ou-imparfait",
  ],
  "/grammaire/passe-compose-ou-imparfait": [
    "/grammaire/le-passe-compose",
    "/grammaire/l-imparfait",
  ],
  "/grammaire/les-pronoms-cod-coi": ["/grammaire/le-passe-compose"],
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
