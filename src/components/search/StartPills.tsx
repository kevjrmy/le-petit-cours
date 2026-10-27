import Link from "next/link";
import { featuredChapters } from "@/data/navigation";
import { ChapterIcon } from "@/components/nav/ChapterIcon";
import { T } from "@/components/lang/T";
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
 *
 * **Named by a hidden heading, not `aria-label`** (#102): the name has to
 * follow the interface language, an attribute cannot without a client hook,
 * and the name computed through `aria-labelledby` skips the hidden language.
 * So this stays a Server Component, as `HomeStart` expects.
 */
export function StartPills() {
  return (
    <nav className={styles.pills} aria-labelledby="par-ou-commencer">
      <span id="par-ou-commencer" className="visually-hidden">
        <T fr="Par où commencer" es="Por dónde empezar" />
      </span>
      {featuredChapters().map((chapter) => (
        <Link key={chapter.slug} href={chapter.path} className={styles.pill}>
          <ChapterIcon name={chapter.icon} />
          <T fr={chapter.shortTitle ?? chapter.title} es={chapter.es.title} />
        </Link>
      ))}
      {/* The sommaire's own mark, the one the sidebar gives it — the last pill
          is a destination like the others, not a button. */}
      <Link href="/sommaire" className={`${styles.pill} ${styles.all}`}>
        <ChapterIcon name="sommaire" />
        <T fr="Tout le cours" es="Todo el curso" />
      </Link>
    </nav>
  );
}
