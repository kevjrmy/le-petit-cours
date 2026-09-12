"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { annexes } from "@/data/navigation";
import styles from "./Footer.module.css";

/**
 * One line: a way across, and what the licences are.
 *
 * It reads `where: "footer"` from the manifest rather than naming a route, so a
 * page's placement stays a property of the page — the same rule the sidebar and
 * the account popover follow.
 *
 * **It draws on `/` and on the pages the line itself points to, nowhere else**,
 * decided here rather than by the shell, the way `LessonEnd` decides whether a
 * path is a lesson (`AGENTS.md` §8). The licence is a fact about the site, so
 * it is said where somebody arrives and beside the page that states it in full;
 * under every lesson it was a signature on a page that is already signed.
 *
 * **The line never links to the page you are reading.** On `/` it points out to
 * `/a-propos`; standing on `/a-propos` it points back to « Accueil », which is
 * the one title written here rather than read from the manifest — `/` lives in
 * `unlistedPages`, a list of paths with no titles to read.
 *
 * **No link to the source here.** `/a-propos` links GitHub in its own sentence,
 * so a second copy in the chrome was the same link twice. The wordmark and the
 * tagline went the same way: the home page says both above this line.
 */
export function Footer() {
  const pathname = usePathname();
  const footerAnnexes = annexes.filter((page) => page.where === "footer");
  const onFooterAnnexe = footerAnnexes.some((page) => page.path === pathname);

  if (pathname !== "/" && !onFooterAnnexe) return null;

  const links = [
    ...(onFooterAnnexe ? [{ path: "/", title: "Accueil" }] : []),
    ...footerAnnexes.filter((page) => page.path !== pathname),
  ];

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
