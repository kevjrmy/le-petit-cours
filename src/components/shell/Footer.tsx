import Link from "next/link";
import { annexes } from "@/data/navigation";
import styles from "./Footer.module.css";

/**
 * One line: the annexes that belong under every page, and what the licences are.
 *
 * It reads `where: "footer"` from the manifest rather than naming a route, so a
 * page's placement stays a property of the page — the same rule the sidebar and
 * the account popover follow.
 *
 * **No link to the source here.** `/a-propos` links GitHub in its own sentence,
 * so a second copy in the chrome of every page was the same link twice.
 *
 * The wordmark and the tagline went too: the sidebar shows the one and the home
 * page says the other, and a footer repeating both under every lesson is a
 * signature on a page that is already signed.
 */
export function Footer() {
  const links = annexes.filter((page) => page.where === "footer" && !page.soon);

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
