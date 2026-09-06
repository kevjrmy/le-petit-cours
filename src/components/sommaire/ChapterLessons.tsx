"use client";

import { visibleLessons, type Chapter } from "@/data/navigation";
import { PageRow } from "@/components/nav/PageRow";
import { useAccount } from "@/hooks/useAccount";
import styles from "./ChapterLessons.module.css";

/**
 * A chapter's lessons, filtered to the learner's level.
 *
 * Server-rendered into the page's static HTML with everything visible, then
 * narrowed on hydration — the same reasoning as `ChapterGrid`. A lesson hidden
 * here is still reachable by its URL, which is the whole of #23: the level
 * decides what the course offers, never what it permits.
 *
 * The rows themselves are `PageRow`, shared with the search results — one row,
 * one stylesheet, so the two listings cannot present the same lesson two ways.
 * No `where` label here: every row in this list is in the same chapter.
 */
export function ChapterLessons({ chapter }: { chapter: Chapter }) {
  const account = useAccount();
  const lessons = visibleLessons(chapter, account?.level ?? null);

  const published = lessons.filter((lesson) => !lesson.soon).length;
  const label = chapter.unit[published === 1 ? 0 : 1];

  if (lessons.length === 0) {
    return (
      <p className="message">
        Rien dans ce chapitre à votre niveau pour l’instant. Les leçons des
        autres niveaux restent lisibles, elles ne sont simplement pas proposées
        ici.
      </p>
    );
  }

  return (
    <>
      {/* The tally sits with the list because both depend on the level; a
          count in the server-rendered header would keep saying seven while the
          list showed four. */}
      <p className={styles.count}>
        {published > 0
          ? `${published} ${label} · ${lessons.length - published} à venir`
          : `${lessons.length} ${chapter.unit[lessons.length === 1 ? 0 : 1]} à venir`}
      </p>
      <ul className={styles.list}>
        {lessons.map((lesson) => (
          <PageRow key={lesson.path} {...lesson} />
        ))}
      </ul>
    </>
  );
}
