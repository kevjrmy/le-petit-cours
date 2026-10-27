import Link from "next/link";
import { findLesson, relatedFor } from "@/data/navigation";
import { T } from "@/components/lang/T";
import styles from "./RelatedLinks.module.css";

/**
 * « Pour aller plus loin ». Four links maximum, and it **fails soft**: a target
 * that no longer resolves is dropped rather than rendered as a dead anchor, so
 * a stale entry costs one link and raises nothing. Only an audit surfaces it.
 *
 * **Placed by `LessonEnd`, not by the lesson.** It is manifest-driven furniture
 * like the done-tick above it, and a page that forgot to render it lost its
 * cross-links with nothing failing.
 */
export function RelatedLinks({ path }: { path: string }) {
  const links = relatedFor(path);
  if (links.length === 0) return null;

  return (
    <nav className={styles.related} aria-labelledby="pour-aller-plus-loin">
      <h2 id="pour-aller-plus-loin" className={styles.heading}>
        <T fr="Pour aller plus loin" es="Para ir más allá" />
      </h2>
      <ul>
        {links.map((link) => (
          <li key={link.path}>
            <Link href={link.path}>
              <span className={styles.chapter}>
                {/* The chapter is interface text; the lesson's title names the
                    French taught and stays French (#102). */}
                <T fr={link.chapter} es={findLesson(link.path)?.chapter.es.title ?? link.chapter} />
              </span>
              <span className={styles.title}>{link.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
