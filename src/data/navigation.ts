/**
 * Single source of truth for the book's structure.
 *
 * The sidebar, the sommaire and every chapter landing page read from this file.
 * Routes are the filesystem now, so there is no route table to keep in step —
 * but a `soon: false` entry with no `page.tsx` is a link to a 404, and a
 * `page.tsx` with no entry here is a page nothing links to. See
 * `.claude/agents/nav-wiring.md` for the audit that catches both.
 *
 * **Chapter order is inherited from the Vue app, not decided.** Which chapters
 * carry A1 and in what order is still open (`AGENTS.md` §12) and is meant to be
 * settled by the DELF A1 gap analysis, not by whatever this file happened to
 * say first. The lesson lists below are likewise a plausible starting subset,
 * not a syllabus.
 */

export type Level = "A1" | "A2" | "B1" | "B2" | "C1" | "C2";

/** Which language the page explains *in* — Spanish for the learner track,
 *  French for the heritage track (`AGENTS.md` §1, `docs/decisions.md` #16). */
export type Metalanguage = "es" | "fr";

export interface Lesson {
  /** Route path. Unique, and the key progress is stored under. */
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
  metalanguage?: Metalanguage;
  /** ISO date. Drives "récemment ajouté"; a wrong one misplaces the page. */
  created?: string;
  /** Announced but unwritten. Renders as a disabled « Bientôt » row and has no
   *  folder. Promoting one means creating the page in the same change. */
  soon?: boolean;
}

export interface Chapter {
  slug: string;
  path: string;
  title: string;
  /** Used where the full title does not fit — the sidebar, a breadcrumb. */
  shortTitle?: string;
  /** Singular and plural of what this chapter counts. */
  unit: [string, string];
  blurb: string;
  lessons: Lesson[];
}

/** Every level the book declares. B1 upward are empty on purpose (#12). */
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
 * Offering an empty level would hand someone an empty book, so a level belongs
 * here only once it has content. Opening B1 is now this one line, which is less
 * friction than #22 intended — worth remembering when B1 is written.
 */
export const CHOOSABLE_LEVELS: Level[] = ["A1", "A2"];

const A1: Level[] = ["A1"];
const A1A2: Level[] = ["A1", "A2"];
const ANY: Level[] = [];

export const chapters: Chapter[] = [
  {
    slug: "grammaire",
    path: "/grammaire",
    title: "Grammaire",
    unit: ["leçon", "leçons"],
    blurb:
      "Les règles essentielles : les mots, leur accord et la construction de la phrase.",
    /* Ordered as a course, not alphabetically: word classes first, then the
       tenses in teaching order, then pronouns. */
    lessons: [
      {
        path: "/grammaire/les-articles",
        title: "Les articles",
        levels: A1,
        delf: "Désigner une chose et dire si elle est connue ou non",
        metalanguage: "es",
        created: "2026-09-05",
      },
      { path: "/grammaire/les-adjectifs", title: "Les adjectifs qualificatifs", levels: A1, metalanguage: "es", soon: true },
      { path: "/grammaire/la-negation", title: "La négation", levels: A1, metalanguage: "es", soon: true },
      { path: "/grammaire/l-interrogation", title: "Poser une question", levels: A1, metalanguage: "es", soon: true },
      { path: "/grammaire/verbe-1er-groupe", title: "Les verbes du 1er groupe", titleHtml: "Les verbes du 1<sup>er</sup> groupe", levels: A1, metalanguage: "es", soon: true },
      { path: "/grammaire/le-passe-compose", title: "Le passé composé", levels: A1A2, metalanguage: "es", soon: true },
      { path: "/grammaire/les-prepositions-de-lieu", title: "Les prépositions de lieu", levels: A1, metalanguage: "es", soon: true },
    ],
  },
  {
    slug: "conjugaison",
    path: "/conjugaison",
    title: "Conjugaison",
    unit: ["verbe", "verbes"],
    blurb:
      "Les tableaux des verbes les plus utiles, au présent, au passé composé et au futur.",
    lessons: [
      { path: "/conjugaison/etre", title: "être", subtitle: "ser / estar", tag: "Auxiliaire", levels: A1, metalanguage: "fr", soon: true },
      { path: "/conjugaison/avoir", title: "avoir", subtitle: "haber / tener", tag: "Auxiliaire", levels: A1, metalanguage: "fr", soon: true },
      { path: "/conjugaison/parler", title: "parler", subtitle: "hablar", tag: "1er groupe", levels: A1, metalanguage: "fr", soon: true },
      { path: "/conjugaison/finir", title: "finir", subtitle: "terminar", tag: "2e groupe", levels: A1, metalanguage: "fr", soon: true },
      { path: "/conjugaison/aller", title: "aller", subtitle: "ir", tag: "Irrégulier", levels: A1, metalanguage: "fr", soon: true },
    ],
  },
  {
    slug: "orthographe",
    path: "/orthographe",
    title: "Orthographe",
    unit: ["leçon", "leçons"],
    blurb:
      "Accorder en genre et en nombre, choisir le bon déterminant, ne plus confondre les homophones.",
    /* The heritage track's home chapter: written in French, for a reader who
       already speaks it (`docs/decisions.md` #16). */
    lessons: [
      {
        path: "/orthographe/le-pluriel-des-noms",
        title: "Le pluriel des noms",
        levels: ANY,
        metalanguage: "fr",
        created: "2026-09-05",
      },
      { path: "/orthographe/a-ou-a", title: "a ou à", levels: ANY, metalanguage: "fr", soon: true },
      { path: "/orthographe/et-ou-est", title: "et ou est", levels: ANY, metalanguage: "fr", soon: true },
      { path: "/orthographe/les-accents", title: "Les accents", levels: ANY, metalanguage: "fr", soon: true },
    ],
  },
  {
    slug: "vocabulaire",
    path: "/vocabulaire",
    title: "Vocabulaire",
    unit: ["fiche", "fiches"],
    blurb: "Les mots du quotidien, par thème, avec leur traduction en espagnol.",
    lessons: [
      {
        path: "/vocabulaire/les-nombres",
        title: "Les nombres",
        levels: A1,
        delf: "Compter, dire un prix, donner son numéro",
        metalanguage: "es",
        created: "2026-09-05",
      },
      { path: "/vocabulaire/les-salutations", title: "Se saluer et se présenter", levels: A1, metalanguage: "es", soon: true },
      { path: "/vocabulaire/la-famille", title: "La famille", levels: A1, metalanguage: "es", soon: true },
      { path: "/vocabulaire/la-nourriture", title: "La nourriture", levels: A1, metalanguage: "es", soon: true },
      { path: "/vocabulaire/les-couleurs", title: "Les couleurs", levels: A1, metalanguage: "es", soon: true },
      { path: "/vocabulaire/la-ville", title: "La ville", levels: A1A2, metalanguage: "es", soon: true },
    ],
  },
  {
    slug: "astuces",
    path: "/astuces",
    title: "Astuces",
    unit: ["astuce", "astuces"],
    blurb:
      "Un truc à retenir, ses exceptions, et un lien vers la leçon qui l'explique en entier.",
    lessons: [
      { path: "/astuces/a-en-au-aux", title: "à, en, au, aux", levels: A1, metalanguage: "es", soon: true },
      { path: "/astuces/masculin-ou-feminin", title: "Masculin ou féminin ?", levels: A1, metalanguage: "es", soon: true },
    ],
  },
  {
    slug: "prononciation",
    path: "/prononciation",
    title: "Prononciation",
    unit: ["leçon", "leçons"],
    blurb: "Lire le français à voix haute : les groupes de lettres et leurs sons.",
    lessons: [
      { path: "/prononciation/les-voyelles", title: "Les voyelles", levels: A1, metalanguage: "es", soon: true },
      { path: "/prononciation/les-lettres-muettes", title: "Les lettres muettes", levels: A1, metalanguage: "es", soon: true },
      { path: "/prononciation/la-liaison", title: "La liaison", levels: A1A2, metalanguage: "es", soon: true },
    ],
  },
  {
    slug: "exercices",
    path: "/exercices",
    title: "Exercices",
    unit: ["exercice", "exercices"],
    blurb: "Mettre la théorie en pratique. Chaque exercice se corrige tout seul.",
    lessons: [
      { path: "/exercices/les-articles", title: "Les articles", levels: A1, metalanguage: "es", soon: true },
      { path: "/exercices/etre-ou-avoir", title: "être ou avoir", levels: A1, metalanguage: "es", soon: true },
      { path: "/exercices/le-pluriel", title: "Le pluriel", levels: ANY, metalanguage: "fr", soon: true },
    ],
  },
  {
    slug: "jeux",
    path: "/jeux",
    title: "Jeux",
    unit: ["jeu", "jeux"],
    blurb:
      "Des parties courtes qui rebrassent le vocabulaire du livre. Rien n'est noté, tout se rejoue.",
    lessons: [
      { path: "/jeux/un-ou-une", title: "Un ou une ?", levels: ANY, metalanguage: "es", soon: true },
      { path: "/jeux/le-mot-mystere", title: "Le mot mystère", levels: ANY, metalanguage: "es", soon: true },
    ],
  },
  {
    slug: "dictees",
    path: "/dictees",
    title: "Dictées",
    unit: ["dictée", "dictées"],
    blurb: "Écouter, écrire, comparer. Avec le texte et ses points de vigilance.",
    lessons: [
      { path: "/dictees/la-rentree", title: "La rentrée", levels: ANY, metalanguage: "fr", soon: true },
      { path: "/dictees/au-marche", title: "Au marché", levels: ANY, metalanguage: "fr", soon: true },
    ],
  },
  {
    slug: "conversation",
    path: "/conversation",
    title: "Conversation",
    unit: ["dialogue", "dialogues"],
    blurb: "Des situations de la vie quotidienne, à compléter puis à dire à voix haute.",
    lessons: [
      { path: "/conversation/a-la-boulangerie", title: "À la boulangerie", levels: A1, metalanguage: "es", soon: true },
      { path: "/conversation/demander-son-chemin", title: "Demander son chemin", levels: A1, metalanguage: "es", soon: true },
      { path: "/conversation/au-restaurant", title: "Au restaurant", levels: A1A2, metalanguage: "es", soon: true },
    ],
  },
  {
    slug: "lecture",
    path: "/lecture",
    title: "Lecture",
    unit: ["texte", "textes"],
    blurb:
      "De courts textes à lire, avec des questions et la traduction espagnole cachée dessous.",
    lessons: [
      { path: "/lecture/une-journee-a-paris", title: "Une journée à Paris", levels: A1A2, metalanguage: "es", soon: true },
    ],
  },
  {
    slug: "litterature",
    path: "/litterature",
    title: "Littérature",
    unit: ["page", "pages"],
    blurb: "Les classiques français, en extraits courts et commentés.",
    lessons: [
      { path: "/litterature/le-petit-prince", title: "Le Petit Prince", subtitle: "Saint-Exupéry, 1943", levels: ANY, metalanguage: "fr", soon: true },
    ],
  },
  {
    slug: "musique",
    path: "/musique",
    title: "Musique",
    unit: ["chanson", "chansons"],
    blurb: "Apprendre en chantant : vocabulaire et contexte, extrait par extrait.",
    lessons: [
      { path: "/musique/la-vie-en-rose", title: "La Vie en rose", subtitle: "Édith Piaf, 1947", levels: ANY, metalanguage: "es", soon: true },
    ],
  },
  {
    slug: "culture",
    path: "/culture",
    title: "Culture",
    unit: ["page", "pages"],
    blurb: "Le pays derrière la langue : ses régions, ses villes, ses habitudes.",
    lessons: [
      { path: "/culture/les-regions", title: "Les régions", levels: ANY, metalanguage: "es", soon: true },
      { path: "/culture/la-galette-des-rois", title: "La galette des rois", levels: ANY, metalanguage: "es", soon: true },
    ],
  },
];

/** Pages that are not lessons and belong to no chapter. */
export interface Annexe extends Lesson {
  /**
   * Where the shell offers it. `tree` is the foot of the sidebar, with the
   * book; `menu` is the account popover. The split is a property of the page
   * rather than a list hand-copied into two components, which is how the two
   * would drift.
   */
  where: "tree" | "menu";
}

export const annexes: Annexe[] = [
  { path: "/nouveautes", title: "Nouveautés", levels: ANY, where: "tree", soon: true },
  { path: "/ma-progression", title: "Ma progression", levels: ANY, where: "menu", soon: true },
  { path: "/compte", title: "Compte", levels: ANY, where: "menu" },
  { path: "/a-propos", title: "À propos", levels: ANY, where: "menu" },
];

/**
 * Renamed lesson paths — old path → current path.
 *
 * Progress is keyed by route path, so moving a lesson would otherwise orphan
 * every tick a learner has on it. Add the old path here in the same commit as
 * the rename. Entries are cheap and never expire: keep them.
 */
export const pathAliases: Record<string, string> = {
  // '/grammaire/ancien-slug': '/grammaire/nouveau-slug',
};

/** Lessons that actually have a route. */
export function publishedLessons(chapter: Chapter): Lesson[] {
  return chapter.lessons.filter((lesson) => !lesson.soon);
}

/** « 7 leçons » / « 1 dictée » — pluralised with the chapter's own unit noun. */
export function chapterCount(chapter: Chapter): { count: number; label: string } {
  const count = publishedLessons(chapter).length;
  return { count, label: chapter.unit[count === 1 ? 0 : 1] };
}

/**
 * What the sommaire offers a learner at `level`.
 *
 * `null` means "no level chosen", which is also what a signed-out visitor
 * gets: everything. A lesson with no levels is always offered. **This filters
 * what the book offers, never what it permits** — a lesson reached by direct
 * link renders in full whatever the level (#23).
 */
export function visibleLessons(chapter: Chapter, level: Level | null): Lesson[] {
  if (!level) return chapter.lessons;
  return chapter.lessons.filter(
    (lesson) => lesson.levels.length === 0 || lesson.levels.includes(level),
  );
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
  "/grammaire/les-articles": ["/vocabulaire/les-nombres", "/orthographe/le-pluriel-des-noms"],
  "/orthographe/le-pluriel-des-noms": ["/grammaire/les-articles"],
  "/vocabulaire/les-nombres": ["/grammaire/les-articles"],
};

export interface RelatedLink {
  path: string;
  title: string;
  chapter: string;
}

/**
 * Resolve a page's related links into renderable rows. A path with no matching
 * lesson — or one still `soon` — is dropped, so a stale entry costs one link
 * instead of rendering a dead anchor.
 */
export function relatedFor(routePath: string): RelatedLink[] {
  return (relatedPages[routePath] ?? [])
    .slice(0, MAX_RELATED)
    .map((path) => {
      const found = findLesson(path);
      if (!found || found.lesson.soon) return null;
      return {
        path,
        title: found.lesson.title,
        chapter: found.chapter.shortTitle ?? found.chapter.title,
      };
    })
    .filter((row): row is RelatedLink => row !== null);
}
