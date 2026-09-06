import { annexes, chapters, type Level, type Lesson } from "@/data/navigation";

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
  titleHtml?: string;
  subtitle?: string;
  tag?: string;
  levels: Level[];
  soon?: boolean;
  /** Where the hit sits in the course — « Grammaire », « Chapitre », « Le site ». */
  where: string;
}

interface Entry extends SearchHit {
  /** The title, folded. Scored on its own: a title match beats a blurb match. */
  title_: string;
  /** Every other searchable field, folded and joined. */
  rest_: string;
}

function entry(page: Lesson, where: string, rest: string[] = []): Entry {
  return {
    path: page.path,
    title: page.title,
    titleHtml: page.titleHtml,
    subtitle: page.subtitle,
    tag: page.tag,
    levels: page.levels,
    soon: page.soon,
    where,
    title_: fold(page.title),
    rest_: fold([page.subtitle, page.tag, page.delf, ...rest].filter(Boolean).join(" ")),
  };
}

/* Built once, at module scope: the manifest is a constant, so rebuilding this
   per keystroke would be work with no possible new answer. Chapters are in it
   as well as lessons — typing « conju » should offer the chapter, not only the
   verbs inside it. Annexes too, so « compte » finds the account page. */
const index: Entry[] = [
  ...chapters.map((chapter) =>
    entry(
      { path: chapter.path, title: chapter.title, subtitle: chapter.blurb, levels: [] },
      "Chapitre",
    ),
  ),
  ...chapters.flatMap((chapter) =>
    chapter.lessons.map((lesson) =>
      entry(lesson, chapter.shortTitle ?? chapter.title, [chapter.title]),
    ),
  ),
  ...annexes.map((page) => entry(page, "Le site")),
];

/**
 * How well one entry answers one query. `0` means "not a result at all".
 *
 * Every term has to appear somewhere, so « articles grammaire » narrows rather
 * than widens — the behaviour a reader expects from a search box, and the one
 * an `.some()` would quietly get backwards.
 */
function score(row: Entry, query: string, terms: string[]): number {
  const all = `${row.title_} ${row.rest_}`;
  if (!terms.every((term) => all.includes(term))) return 0;

  let points = 5; /* matched, but only away from the title */
  if (row.title_ === query) points = 100;
  else if (row.title_.startsWith(query)) points = 60;
  else if (` ${row.title_}`.includes(` ${query}`)) points = 40;
  else if (row.title_.includes(query)) points = 25;
  else if (terms.every((term) => row.title_.includes(term))) points = 15;

  /* A written page outranks an announced one at the same score. It never
     outranks a better match: a « Bientôt » row that is what you typed is still
     the answer, and hiding it would only make you search for it twice. */
  return row.soon ? points - 1 : points;
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

/** Whether a hit is part of what the course offers at `level` (`AGENTS.md` §6). */
export function atLevel(hit: SearchHit, level: Level | null): boolean {
  return !level || hit.levels.length === 0 || hit.levels.includes(level);
}
