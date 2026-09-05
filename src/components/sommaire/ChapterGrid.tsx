"use client";

import Link from "next/link";
import { chapters, visibleLessons } from "@/data/navigation";
import { useAccount } from "@/hooks/useAccount";
import styles from "./ChapterGrid.module.css";

/**
 * The chapter cards, with counts that respect the learner's chosen level.
 *
 * A Client Component, but the page holding it is not: React server-renders this
 * into the static HTML, so a visitor with no JavaScript — or the service worker
 * serving a cold page offline — still gets the whole grid. Hydration then
 * narrows the counts. The unfiltered book is the correct thing to serve when
 * nobody has said otherwise, which is exactly what signed-out means (#23).
 */
export function ChapterGrid() {
  const account = useAccount();
  const level = account?.level ?? null;

  return (
    <ul className={styles.grid}>
      {chapters.map((chapter) => {
        const shown = visibleLessons(chapter, level);
        const published = shown.filter((lesson) => !lesson.soon).length;
        const label = chapter.unit[published === 1 ? 0 : 1];

        return (
          <li key={chapter.slug}>
            <Link href={chapter.path} className={styles.card}>
              {/* The mark is a letter, not a pictogram: the identity of this
                  project is lettering, so the chapter initial in the serif does
                  the job an icon set would — and cannot drift out of step with
                  the manifest the way an icon mapping does. */}
              <span className={styles.initial} aria-hidden="true">
                {chapter.title.charAt(0)}
              </span>
              <span className={styles.body}>
                <span className={styles.cardTitle}>{chapter.title}</span>
                <span className={styles.blurb}>{chapter.blurb}</span>
                <span className={styles.count}>
                  {published > 0
                    ? `${published} ${label}`
                    : shown.length > 0
                      ? `${shown.length} à venir`
                      : "rien à ce niveau"}
                </span>
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
