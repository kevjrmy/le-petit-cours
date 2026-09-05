import Link from "next/link";
import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <p>
        Le Petit Cours — cours de français pour hispanophones. Code sous licence
        MIT, contenu sous <span className={styles.nowrap}>CC BY-SA 4.0</span>.
      </p>
      <p className={styles.links}>
        <Link href="/a-propos">À propos</Link>
        <a href="https://github.com/kevjrmy/le-petit-cours">Code source</a>
      </p>
    </footer>
  );
}
