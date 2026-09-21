import Link from "next/link";
import type { Level } from "@/data/navigation";
import styles from "./PageRow.module.css";

export interface PageRowProps {
  path: string;
  title: string;
  titleHtml?: string;
  subtitle?: string;
  tag?: string;
  /** The manifest tag. Only its **floor** is drawn — see the note below. */
  levels: Level[];
  /** Where the page sits in the course. Shown only where the list is not already
   *  one chapter's — a search result needs it, a chapter's own list does not. */
  where?: string;
  /** Ticked, not ticked, or `undefined` — no record to report, so no circle. */
  done?: boolean;
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
 *
 * **The level badge is the tag's floor, one badge** (#76). A page is listed
 * from the rung it was written at upward, so `levels` is three rungs wide on
 * most lessons and a row ending « A2 B1 B2 » would be a column of noise that
 * separates nothing — every row in the list would carry it. The floor is the
 * one thing it says that distinguishes one row from the next.
 */
export function PageRow({ path, title, titleHtml, subtitle, tag, levels, where, done }: PageRowProps) {
  return (
    <li>
      <Link href={path} className={styles.row}>
        <span className={styles.main}>
          <span className={styles.title}>
            {titleHtml ? <span dangerouslySetInnerHTML={{ __html: titleHtml }} /> : title}
          </span>
          {subtitle && <span className={styles.subtitle}>{subtitle}</span>}
        </span>
        <span className={styles.meta}>
          {where && <span className={styles.where}>{where}</span>}
          {tag && <span className={styles.tag}>{tag}</span>}
          {levels[0] && <span className={styles.level}>{levels[0]}</span>}
          {done !== undefined && (
            <>
              {/* A mark as well as a fill (`AGENTS.md` §5). */}
              <span
                className={`${styles.state} ${done ? styles.stateDone : ""}`}
                aria-hidden="true"
              >
                {done && (
                  <svg className={styles.check} viewBox="0 0 24 24">
                    <path d="M6.5 12.5l3.7 3.7 7.3-7.7" />
                  </svg>
                )}
              </span>
              <span className="visually-hidden">
                {done ? ", terminée" : ", pas encore terminée"}
              </span>
            </>
          )}
        </span>
      </Link>
    </li>
  );
}
