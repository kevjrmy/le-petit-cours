"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { annexes, chapters, visibleLessons } from "@/data/navigation";
import { useAccount } from "@/hooks/useAccount";
import { AccountMenu } from "./AccountMenu";
import styles from "./AppSidebar.module.css";

/**
 * The book's tree. Mounted in the root layout, not in a page, so it keeps its
 * scroll position and its expanded chapters across navigation (`AGENTS.md` §4).
 *
 * Everything here derives from `src/data/navigation.ts`. Nothing is hand-listed.
 */
export function AppSidebar({ open, onNavigate }: { open: boolean; onNavigate: () => void }) {
  const pathname = usePathname();
  const account = useAccount();
  const level = account?.level ?? null;
  const [toggled, setToggled] = useState<Record<string, boolean>>({});

  return (
    <div
      id="sidebar"
      /* Closed, the panel is `visibility: hidden`, which takes it out of the
         tab order and the accessibility tree without any JS timing to get
         wrong. Above the breakpoint the media query pins it open regardless. */
      className={`${styles.sidebar} ${open ? styles.open : ""}`}
    >
      <div className={styles.head}>
        <Link href="/" className={styles.brand} onClick={onNavigate}>
          <span className={styles.wordmark} aria-hidden="true" />
          <span className="visually-hidden">Le Petit Cours — accueil</span>
        </Link>
      </div>

      <nav className={styles.tree} aria-label="Sommaire du livre">
        <ul className={styles.chapters}>
          {chapters.map((chapter) => {
            const active =
              pathname === chapter.path || pathname.startsWith(`${chapter.path}/`);
            /* The current chapter opens itself; an explicit click wins. */
            const expanded = toggled[chapter.slug] ?? active;
            /* Filtered on the same rule as the sommaire and the chapter pages
               — the sidebar is the book's table of contents, and a count here
               that disagreed with the card on the sommaire would just look
               broken. Hiding is never gating: every path still resolves. */
            const lessons = visibleLessons(chapter, level);
            /* The number of rows this chapter opens to, not the published
               tally: most of the book is unwritten, and a column of zeroes
               reads as a bug. Each row says « Bientôt » for itself. */
            const total = lessons.length;

            return (
              <li key={chapter.slug}>
                <button
                  type="button"
                  className={`${styles.chapter} ${active ? styles.activeChapter : ""}`}
                  aria-expanded={expanded}
                  onClick={() =>
                    setToggled((previous) => ({ ...previous, [chapter.slug]: !expanded }))
                  }
                >
                  <svg className={styles.chevron} viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M9 5l7 7-7 7" />
                  </svg>
                  <span className={styles.chapterTitle}>
                    {chapter.shortTitle ?? chapter.title}
                  </span>
                  <span className={styles.count}>
                    {total}
                    <span className="visually-hidden">
                      {" "}
                      {chapter.unit[total === 1 ? 0 : 1]}
                    </span>
                  </span>
                </button>

                {expanded && (
                  <ul className={styles.lessons}>
                    <li>
                      <Link
                        href={chapter.path}
                        className={`${styles.lesson} ${styles.overview} ${
                          pathname === chapter.path ? styles.activeLesson : ""
                        }`}
                        aria-current={pathname === chapter.path ? "page" : undefined}
                        onClick={onNavigate}
                      >
                        Tout le chapitre
                      </Link>
                    </li>
                    {lessons.map((lesson) =>
                      lesson.soon ? (
                        <li key={lesson.path}>
                          <span className={`${styles.lesson} ${styles.soon}`}>
                            {lesson.title}
                            <em>Bientôt</em>
                          </span>
                        </li>
                      ) : (
                        <li key={lesson.path}>
                          <Link
                            href={lesson.path}
                            className={`${styles.lesson} ${
                              pathname === lesson.path ? styles.activeLesson : ""
                            }`}
                            aria-current={pathname === lesson.path ? "page" : undefined}
                            onClick={onNavigate}
                          >
                            {lesson.title}
                          </Link>
                        </li>
                      ),
                    )}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>

        <ul className={styles.annexes}>
          {annexes
            .filter((page) => page.where === "tree")
            .map((page) => (
              <li key={page.path}>
                {page.soon ? (
                  <span className={`${styles.lesson} ${styles.soon}`}>
                    {page.title}
                    <em>Bientôt</em>
                  </span>
                ) : (
                  <Link href={page.path} className={styles.lesson} onClick={onNavigate}>
                    {page.title}
                  </Link>
                )}
              </li>
            ))}
        </ul>
      </nav>

      <AccountMenu onNavigate={onNavigate} />
    </div>
  );
}
