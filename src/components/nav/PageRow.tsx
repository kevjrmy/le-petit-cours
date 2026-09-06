import Link from "next/link";
import type { Level } from "@/data/navigation";
import styles from "./PageRow.module.css";

export interface PageRowProps {
  path: string;
  title: string;
  titleHtml?: string;
  subtitle?: string;
  tag?: string;
  levels: Level[];
  soon?: boolean;
  /** Where the page sits in the course. Shown only where the list is not already
   *  one chapter's — a search result needs it, a chapter's own list does not. */
  where?: string;
}

/**
 * One page as a row in a list: a chapter's lessons, a page of search results.
 *
 * Shared rather than copied, because the two lists are the same object seen
 * twice — the moment a manifest field changes how a lesson presents itself,
 * both have to agree, and two stylesheets is how they stop agreeing.
 *
 * No hooks: it renders from the props it is handed, so it costs nothing when a
 * Client Component maps over it and stays usable from a Server one.
 */
export function PageRow({ path, title, titleHtml, subtitle, tag, levels, soon, where }: PageRowProps) {
  const body = (
    <>
      <span className={styles.main}>
        <span className={styles.title}>
          {titleHtml ? <span dangerouslySetInnerHTML={{ __html: titleHtml }} /> : title}
        </span>
        {subtitle && <span className={styles.subtitle}>{subtitle}</span>}
      </span>
      <span className={styles.meta}>
        {where && <span className={styles.where}>{where}</span>}
        {tag && <span className={styles.tag}>{tag}</span>}
        {levels.map((level) => (
          <span key={level} className={styles.level}>
            {level}
          </span>
        ))}
        {soon && <span className={styles.soon}>Bientôt</span>}
      </span>
    </>
  );

  return (
    <li>
      {soon ? (
        /* Not a link, and not a disabled one either: there is nothing at the
           other end yet. The badge is what says so — never the colour alone. */
        <span className={`${styles.row} ${styles.rowSoon}`}>{body}</span>
      ) : (
        <Link href={path} className={styles.row}>
          {body}
        </Link>
      )}
    </li>
  );
}
