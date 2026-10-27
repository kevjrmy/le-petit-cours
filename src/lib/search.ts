import {
  annexes,
  chapters,
  inView,
  listedAt,
  tagEs,
  type Level,
  type PageEntry,
  type View,
} from "@/data/navigation";

/**
 * Searching the course, over the manifest and nothing else.
 *
 * `src/data/navigation.ts` already holds every title, subtitle, tag, blurb and
 * DELF descriptor in the course, so the index is the manifest read a second way —
 * there is nothing to build, nothing to keep in step and nothing to ship. It is
 * a few kilobytes of data the shell already imports, which is also what makes
 * search work offline: a learner underground gets the same results as one on
 * wifi, because there was never a server in the loop.
 *
 * Full-text search over lesson *prose* is a different problem — it needs an
 * index built at compile time and a fetch to load it — and it is not this. When
 * the course is big enough that titles stop being enough, that is a decision to
 * take, not a thing to grow into.
 */

/**
 * Fold a string to what a search should compare.
 *
 * **Accents come off.** Both profiles type on a Spanish keyboard, where `é`,
 * `è` and `ê` cost a dead-key detour (`AGENTS.md` §1) — a learner hunting for
 * « Le passé composé » types *passe compose*, and a search that misses it is a
 * search that says the lesson does not exist. Apostrophes and hyphens become
 * spaces for the same reason: « l'interrogation » has to answer to
 * *interrogation*.
 */
export function fold(value: string): string {
  return value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .replace(/[’'\-–—]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export interface SearchHit {
  path: string;
  title: string;
  /** A chapter's or an annexe's title in the Spanish interface (#102). A
   *  lesson has none: its title names the French it teaches. */
  titleEs?: string;
  titleHtml?: string;
  subtitle?: string;
  /** A chapter's blurb in the Spanish interface. */
  subtitleEs?: string;
  tag?: string;
  /** The page's own rung, drawn as its badge; `null` for none. */
  level: Level | null;
  /** The rungs it is listed at — its sets, else its level (#86). */
  listedAt: Level[];
  /** Where the hit sits in the course — « Grammaire », « Chapitre », « Le site ». */
  where: string;
  /** The same in the Spanish interface — « Gramática », « Capítulo », « El sitio ». */
  whereEs: string;
}

interface Entry extends SearchHit {
  /** The titles, folded — French, and Spanish where there is one, so a
   *  Spanish speaker typing « conjugación » finds the chapter (#102). Scored
   *  on their own: a title match beats a blurb match. */
  titles_: string[];
  /** Every other searchable field, folded and joined. */
  rest_: string;
}

function entry(
  page: PageEntry & { sets?: Level[]; titleEs?: string; subtitleEs?: string },
  where: { fr: string; es: string },
  rest: string[] = [],
): Entry {
  return {
    path: page.path,
    title: page.title,
    titleEs: page.titleEs,
    titleHtml: page.titleHtml,
    subtitle: page.subtitle,
    subtitleEs: page.subtitleEs,
    tag: page.tag,
    level: page.level,
    listedAt: listedAt(page),
    where: where.fr,
    whereEs: where.es,
    titles_: [page.title, page.titleEs].filter((title) => title !== undefined).map(fold),
    rest_: fold(
      [page.subtitle, page.subtitleEs, page.tag, page.tag && tagEs(page.tag), page.delf, ...rest]
        .filter(Boolean)
        .join(" "),
    ),
  };
}

/* Built once, at module scope: the manifest is a constant, so rebuilding this
   per keystroke would be work with no possible new answer. Chapters are in it
   as well as lessons — typing « conju » should offer the chapter, not only the
   verbs inside it. Annexes too, so « compte » finds the account page.

   An **empty** chapter is left out (#51), and it is the one place search hides
   something rather than grouping it. The level rule groups because those pages
   exist and open in full; a chapter with no lesson has nothing to show, so a
   row leading to « pas encore de leçon » would be the « Bientôt » badge back
   under another name. It reappears with its first lesson. */
const listed = chapters.filter((chapter) => chapter.lessons.length > 0);

const index: Entry[] = [
  ...listed.map((chapter) =>
    entry(
      {
        path: chapter.path,
        title: chapter.title,
        titleEs: chapter.es.title,
        subtitle: chapter.blurb,
        subtitleEs: chapter.es.blurb,
        level: null,
      },
      { fr: "Chapitre", es: "Capítulo" },
    ),
  ),
  ...listed.flatMap((chapter) =>
    chapter.lessons.map((lesson) =>
      entry(
        lesson,
        { fr: chapter.shortTitle ?? chapter.title, es: chapter.es.title },
        [chapter.title, chapter.es.title],
      ),
    ),
  ),
  ...annexes.map((page) => entry(page, { fr: "Le site", es: "El sitio" })),
];

/**
 * How well one entry answers one query. `0` means "not a result at all".
 *
 * Every term has to appear somewhere, so « articles grammaire » narrows rather
 * than widens — the behaviour a reader expects from a search box, and the one
 * an `.some()` would quietly get backwards.
 */
function score(row: Entry, query: string, terms: string[]): number {
  const all = `${row.titles_.join(" ")} ${row.rest_}`;
  if (!terms.every((term) => all.includes(term))) return 0;

  /* matched, but only away from the title */
  return Math.max(5, ...row.titles_.map((title) => titleScore(title, query, terms)));
}

/** How well one folded title answers the query; `0` when it does not. */
function titleScore(title: string, query: string, terms: string[]): number {
  if (title === query) return 100;
  if (title.startsWith(query)) return 60;
  if (` ${title}`.includes(` ${query}`)) return 40;
  if (title.includes(query)) return 25;
  if (terms.every((term) => title.includes(term))) return 15;
  return 0;
}

/**
 * The course's answer to `query`, best first.
 *
 * Unfiltered by level on purpose — the caller partitions. `AGENTS.md` §6 filters
 * what the course *offers*, and a result someone typed the name of is not an
 * offer; see `docs/decisions.md` #39 for why they are grouped rather than cut.
 */
export function searchCourse(query: string): SearchHit[] {
  const folded = fold(query);
  if (folded.length < 2) return [];
  const terms = folded.split(" ");

  return index
    .map((row) => ({ row, points: score(row, folded, terms) }))
    .filter(({ points }) => points > 0)
    /* Ties keep manifest order — which is reading order — because `sort` is
       stable and `index` was built in it. */
    .sort((a, b) => b.points - a.points)
    .map(({ row }) => row);
}

/** Whether a hit is part of what the learner chose to see (#86). */
export function atView(hit: SearchHit, view: View): boolean {
  return inView({ ...hit, level: hit.level, sets: hit.listedAt }, view);
}
