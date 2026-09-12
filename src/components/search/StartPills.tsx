import Link from "next/link";
import { featuredChapters } from "@/data/navigation";
import styles from "./StartPills.module.css";

/**
 * The shortcuts under the search field: a few chapters, then the whole course.
 *
 * The search box answers a learner who knows what they are looking for. These
 * answer the one who does not — the reason the home page is not a bare field.
 *
 * Which chapters is editorial and lives in the manifest
 * (`featuredChapterSlugs`), not here; the last pill is not a chapter and always
 * goes to the sommaire, so there is always a way out of the short list.
 */
export function StartPills() {
  return (
    <nav className={styles.pills} aria-label="Par où commencer">
      {featuredChapters().map((chapter) => (
        <Link key={chapter.slug} href={chapter.path} className={styles.pill}>
          {chapter.shortTitle ?? chapter.title}
        </Link>
      ))}
      <Link href="/sommaire" className={`${styles.pill} ${styles.all}`}>
        Tout le cours
      </Link>
    </nav>
  );
}
