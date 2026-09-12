"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { annexes } from "@/data/navigation";
import styles from "./Footer.module.css";

/**
 * One line under the home page: the annexes that belong there, and what the
 * licences are.
 *
 * It reads `where: "footer"` from the manifest rather than naming a route, so a
 * page's placement stays a property of the page — the same rule the sidebar and
 * the account popover follow.
 *
 * **It draws on `/` and nowhere else**, decided here rather than by the shell,
 * the way `LessonEnd` decides whether a path is a lesson (`AGENTS.md` §8). The
 * licence is a fact about the site, so it is said once, where somebody arrives —
 * and in full on `/a-propos`, which is the page the line links to and the only
 * copy that states the attribution a reuser owes. Under every lesson it was a
 * signature on a page that is already signed.
 *
 * **No link to the source here.** `/a-propos` links GitHub in its own sentence,
 * so a second copy in the chrome was the same link twice. The wordmark and the
 * tagline went the same way: the home page says both above this line.
 */
export function Footer() {
  const pathname = usePathname();
  if (pathname !== "/") return null;

  const links = annexes.filter((page) => page.where === "footer");

  return (
    <footer className={styles.footer}>
      {/* One paragraph rather than a flex row, so it reflows as a sentence and
          the separator cannot end up leading a wrapped line. */}
      <p>
        {links.map((page) => (
          <span key={page.path}>
            <Link href={page.path}>{page.title}</Link>
            <span className={styles.sep} aria-hidden="true"> · </span>
          </span>
        ))}
        Code MIT, contenu <span className={styles.nowrap}>CC BY-SA 4.0</span>
      </p>
    </footer>
  );
}
