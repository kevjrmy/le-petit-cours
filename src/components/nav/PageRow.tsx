import Link from "next/link";
import type { ReactNode } from "react";
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
  /**
   * Ticked, not ticked, or `undefined` — no record to report, so no tint and no
   * control. It is the *row's* half of the state: the ground, the border and the
   * separator. The control that changes it is `tick`, and the listing computes
   * the state once for both so they cannot disagree.
   */
  done?: boolean;
  /**
   * The trailing control, drawn beside the link rather than inside it — today
   * `RowTick`, which marks the lesson done from the listing (#79). Omitted where
   * there is nothing to report: signed out, or a list that is not the course's.
   */
  tick?: ReactNode;
}

/**
 * One page as a row in a list: a chapter's lessons, a page of search results.
 *
 * Shared rather than copied, because the two lists are the same object seen
 * twice — the moment a manifest field changes how a lesson presents itself,
 * both have to agree, and two stylesheets is how they stop agreeing.
 *
 * No hooks: it renders from the props it is handed, so it costs nothing when a
 * Client Component maps over it and stays usable from a Server one. **That is
 * why the tick arrives as a slot** rather than as a `done` boolean this row
 * knows how to toggle — the control that writes needs the progress context, and
 * this row must not.
 *
 * **The `<li>` is the card, not the link.** The tick is a `<button>` and cannot
 * live inside an anchor, so the border, the ground and the hover moved out to
 * the list item and the link became one of its two children (#79). Which is also
 * what lets a finished lesson tint the whole row rather than one circle at the
 * end of it, and lets the hairline between the two controls take the row's
 * colour.
 *
 * **The level badge is the tag's floor, one badge** (#76). A page is listed
 * from the rung it was written at upward, so `levels` is three rungs wide on
 * most lessons and a row ending « A2 B1 B2 » would be a column of noise that
 * separates nothing — every row in the list would carry it. The floor is the
 * one thing it says that distinguishes one row from the next.
 */
export function PageRow({
  path,
  title,
  titleHtml,
  subtitle,
  tag,
  levels,
  where,
  done,
  tick,
}: PageRowProps) {
  /* Built rather than interpolated: three slots, two of them usually empty, and
     the prerendered HTML of every listing in the course carries the gaps. */
  const classes = [styles.item];
  if (done) classes.push(styles.itemDone);
  if (tick) classes.push(styles.withTick);

  return (
    <li className={classes.join(" ")}>
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
        </span>
      </Link>
      {tick}
    </li>
  );
}
