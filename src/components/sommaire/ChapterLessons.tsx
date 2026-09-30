"use client";

import {
  isTracked,
  LADDER,
  shownAt,
  visibleLessons,
  type Chapter,
  type Lesson,
  type Level,
  type View,
} from "@/data/navigation";
import { PageRow } from "@/components/nav/PageRow";
import { RowTick } from "@/components/progress/RowTick";
import { useAccount } from "@/hooks/useAccount";
import { useProgress } from "@/hooks/useProgress";
import styles from "./ChapterLessons.module.css";

/**
 * A chapter's lessons, filtered to the levels the learner chose to see (#86).
 *
 * Server-rendered into the page's static HTML with everything visible, then
 * narrowed on hydration — the same reasoning as `ChapterGrid`. A lesson hidden
 * here is still reachable by its URL: the view decides what the course offers,
 * never what it permits.
 *
 * **More than one level in the list, and the rows are grouped** — a
 * `<details>` per level, then « Tous niveaux » for the pages with none. One
 * group opens: the parcours's level if it is there, else the lowest. The open
 * state is not remembered (#24, #42). One level, and the list is flat.
 *
 * The rows themselves are `PageRow`, shared with the search results — one row,
 * one stylesheet, so the two listings cannot present the same lesson two ways.
 * No `where` label here: every row in this list is in the same chapter.
 *
 * Signed in, each row ends in the lesson's tick, and **the tick is the control**
 * (#79): ticking eight lessons used to be eight visits to the foot of eight
 * pages. Marking is still manual — a second place to press, not a second way to
 * be ticked by the app (`AGENTS.md` §8).
 *
 * **No tally above the rows** — except in a group's head, where the rows are
 * closed and the count is all that says what the group holds (#86).
 */
export function ChapterLessons({ chapter }: { chapter: Chapter }) {
  const account = useAccount();
  const { ready, signedIn, isDone } = useProgress();
  const view: View = account?.view ?? "all";
  /* The set a row's tick is asked about: the parcours's level (#87). */
  const level = account?.parcours?.level ?? null;
  const lessons = visibleLessons(chapter, view);

  /* False until there are ticks to draw: an empty circle is a claim. And never
     in a scratch chapter (#80) — its pages carry no tick under them either, and
     a row offering one here would be the only place in the app where a page can
     be marked done and then deleted. Nor on an épreuve (#82). */
  const drawTicks = signedIn && ready && isTracked(chapter);

  /* Two different silences, and they must not be told the same way. The
     chapter is declared and empty — nothing is written yet, and no level would
     change that — or it holds pages that this level is not offered. Neither
     page is reachable from a listing (#51); both are reachable by URL, which is
     why they still answer. */
  if (chapter.lessons.length === 0) {
    /* Empty is this chapter's resting state rather than a chapter waiting to be
       written (#80), so it cannot borrow the sentence below: « il en aura »
       promises a course page, and what lands here is next week's séance. */
    if (chapter.scratch) {
      return (
        <p className="message">
          Rien ici pour l’instant. Les pages d’une séance arrivent dans ce
          chapitre le jour du cours, et en repartent après.
        </p>
      );
    }

    return (
      <p className="message">
        Ce chapitre n’a pas encore de leçon. Il en aura : c’est un chapitre du
        cours, pas une page en attente.
      </p>
    );
  }

  if (lessons.length === 0) {
    return (
      <p className="message">
        Rien dans ce chapitre aux niveaux que vous avez choisis. Les autres
        leçons restent lisibles, elles ne sont simplement pas proposées ici.
      </p>
    );
  }

  const row = (lesson: Lesson, badge: boolean) => {
    /* Asked at the parcours's level, which is the whole point of passing it: a
       B1 learner on a text that also serves A2 must see the B1 tick, not the
       one left at A2.

       Asked **once**, and handed to both halves of the row — the tint the
       lesson wears and the button that changes it. Two reads would compile and
       could not disagree today, but the row would then hold two claims about
       one lesson, which is the shape #68 was written about.

       The gate is here rather than inside `RowTick`, so an absent tick is an
       absent element: the row lays itself out differently around one, and a
       control that renders nothing would leave the space for it. */
    const done = drawTicks ? isDone(lesson, level) : undefined;

    return (
      <PageRow
        key={lesson.path}
        {...lesson}
        level={badge ? shownAt(lesson, view, level) : null}
        done={done}
        tick={
          done === undefined ? undefined : (
            <RowTick lesson={lesson} level={level} done={done} />
          )
        }
      />
    );
  };

  const groups = groupByLevel(lessons, view, level);

  if (groups.length < 2) {
    return <ul className={styles.list}>{lessons.map((lesson) => row(lesson, true))}</ul>;
  }

  const open = groups.some((group) => group.level === level && level !== null)
    ? level
    : groups[0].level;

  return (
    <div className={styles.groups}>
      {groups.map((group) => (
        <details
          key={group.level ?? "none"}
          className={styles.group}
          open={group.level === open}
        >
          <summary className={styles.head}>
            <svg className={styles.chevron} viewBox="0 0 24 24" aria-hidden="true">
              <path d="M9 5l7 7-7 7" />
            </svg>
            <span className={styles.label}>{group.level ?? "Tous niveaux"}</span>
            <span className={styles.count}>
              {group.lessons.length} {group.lessons.length === 1 ? "leçon" : "leçons"}
            </span>
          </summary>
          <ul className={styles.list}>{group.lessons.map((lesson) => row(lesson, false))}</ul>
        </details>
      ))}
    </div>
  );
}

/**
 * The rows by level, in ladder order, the unlevelled last.
 *
 * A page holding sets goes under the set it opens on, when that set is in view,
 * else its first in view (`shownAt`) — under B1 for someone who sees B1 only,
 * and under A2 for a visitor on a work that also has an A1 body (#92).
 */
function groupByLevel(
  lessons: Lesson[],
  view: View,
  parcoursLevel: Level | null,
): { level: Level | null; lessons: Lesson[] }[] {
  const byLevel = new Map<Level | null, Lesson[]>();
  for (const lesson of lessons) {
    const level = shownAt(lesson, view, parcoursLevel);
    byLevel.set(level, [...(byLevel.get(level) ?? []), lesson]);
  }
  return [...LADDER, null]
    .filter((level) => byLevel.has(level))
    .map((level) => ({ level, lessons: byLevel.get(level)! }));
}
