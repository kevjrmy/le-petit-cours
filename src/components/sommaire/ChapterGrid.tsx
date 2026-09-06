"use client";

import Link from "next/link";
import { listedChapters, visibleLessons } from "@/data/navigation";
import { useAccount } from "@/hooks/useAccount";
import styles from "./ChapterGrid.module.css";

/**
 * The chapter cards, with counts that respect the learner's chosen level.
 *
 * A Client Component, but the page holding it is not: React server-renders this
 * into the static HTML, so a visitor with no JavaScript — or the service worker
 * serving a cold page offline — still gets the whole grid. Hydration then
 * narrows it. The unfiltered course is the correct thing to serve when nobody
 * has said otherwise, which is exactly what signed-out means (#23).
 *
 * **A chapter with nothing to offer is not a card** (#51). It used to be one
 * reading « 3 à venir » or « rien à ce niveau », which is a card that costs a
 * click to learn nothing.
 */
export function ChapterGrid() {
  const account = useAccount();
  const level = account?.level ?? null;
  const listed = listedChapters(level);

  /* The course is being written and nothing is published yet (#52). Said here,
     once, rather than by fourteen cards each announcing their own emptiness —
     which is the thing #51 removed. */
  if (listed.length === 0) {
    return (
      <p className="message">
        Aucune leçon n&rsquo;est encore publiée. Le cours s&rsquo;écrit en ce
        moment, en commençant par le niveau A2 : les chapitres apparaîtront ici
        au fur et à mesure, avec leurs leçons.
      </p>
    );
  }

  return (
    <ul className={styles.grid}>
      {listed.map((chapter) => {
        const count = visibleLessons(chapter, level).length;
        const label = chapter.unit[count === 1 ? 0 : 1];

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
                  {count} {label}
                </span>
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
