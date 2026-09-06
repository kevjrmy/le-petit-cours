import Link from "next/link";
import styles from "./Footer.module.css";

/**
 * One line: the way to « À propos », and what the licences are.
 *
 * **No link to the source here.** The account popover carries « Code source »
 * and `/a-propos` links GitHub in its own sentence, so a third copy in the
 * chrome of every page was the same link three times.
 *
 * The wordmark and the tagline went too: the sidebar shows the one and the home
 * page says the other, and a footer repeating both under every lesson is a
 * signature on a page that is already signed.
 */
export function Footer() {
  return (
    <footer className={styles.footer}>
      {/* One paragraph rather than a flex row, so it reflows as a sentence and
          the separator cannot end up leading a wrapped line. */}
      <p>
        <Link href="/a-propos">À propos</Link>
        <span className={styles.sep} aria-hidden="true"> · </span>
        Code MIT, contenu <span className={styles.nowrap}>CC BY-SA 4.0</span>
      </p>
    </footer>
  );
}
