"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { findChapter, findLesson } from "@/data/navigation";
import { ThemeToggle } from "./ThemeToggle";
import styles from "./AppTopbar.module.css";

/**
 * Breadcrumbs derive from the manifest, so a renamed page renames here too.
 * The bar links to /compte and never holds a sign-in form (`decisions.md` #26).
 */
export function AppTopbar({ open, onToggle }: { open: boolean; onToggle: () => void }) {
  const pathname = usePathname();
  const chapter = findChapter(pathname);
  const lesson = findLesson(pathname)?.lesson ?? null;

  return (
    <header className={styles.topbar}>
      <button
        type="button"
        className={styles.menu}
        aria-expanded={open}
        aria-controls="sidebar"
        onClick={onToggle}
      >
        <span className="visually-hidden">
          {open ? "Fermer le sommaire" : "Ouvrir le sommaire"}
        </span>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          {open ? (
            <path d="M6 6l12 12M18 6L6 18" />
          ) : (
            <path d="M4 7h16M4 12h16M4 17h16" />
          )}
        </svg>
      </button>

      <nav className={styles.crumbs} aria-label="Fil d'Ariane">
        {chapter ? (
          <>
            <Link href={chapter.path}>{chapter.shortTitle ?? chapter.title}</Link>
            {lesson && (
              <>
                <span className={styles.sep} aria-hidden="true">
                  ›
                </span>
                <span className={styles.current} aria-current="page">
                  {lesson.title}
                </span>
              </>
            )}
          </>
        ) : (
          <span className={styles.current}>Sommaire</span>
        )}
      </nav>

      <div className={styles.actions}>
        <ThemeToggle />
        <Link href="/compte" className={styles.compte}>
          Compte
        </Link>
      </div>
    </header>
  );
}
