"use client";

import Link from "next/link";
import { visibleLessons, type Chapter } from "@/data/navigation";
import { useAccount } from "@/hooks/useAccount";
import styles from "./ChapterLessons.module.css";

/**
 * A chapter's lessons, filtered to the learner's level.
 *
 * Server-rendered into the page's static HTML with everything visible, then
 * narrowed on hydration — the same reasoning as `ChapterGrid`. A lesson hidden
 * here is still reachable by its URL, which is the whole of #23: the level
 * decides what the book offers, never what it permits.
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
      {lessons.map((lesson) => {
        const row = (
          <>
            <span className={styles.rowMain}>
              <span className={styles.title}>
                {lesson.titleHtml ? (
                  <span dangerouslySetInnerHTML={{ __html: lesson.titleHtml }} />
                ) : (
                  lesson.title
                )}
              </span>
              {lesson.subtitle && (
                <span className={styles.subtitle}>{lesson.subtitle}</span>
              )}
            </span>
            <span className={styles.meta}>
              {lesson.tag && <span className={styles.tag}>{lesson.tag}</span>}
              {lesson.levels.map((level) => (
                <span key={level} className={styles.level}>
                  {level}
                </span>
              ))}
              {lesson.soon && <span className={styles.soon}>Bientôt</span>}
            </span>
          </>
        );

        return (
          <li key={lesson.path}>
            {lesson.soon ? (
              <span className={`${styles.row} ${styles.rowSoon}`}>{row}</span>
            ) : (
              <Link href={lesson.path} className={styles.row}>
                {row}
              </Link>
            )}
          </li>
          );
        })}
      </ul>
    </>
  );
}
