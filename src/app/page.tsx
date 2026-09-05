import styles from "./page.module.css";

/* A holding page until the sommaire exists. A Server Component with no
   client JavaScript, like every page that is not a drill. */
export default function Home() {
  return (
    <main className={styles.page}>
      <h1 className="visually-hidden">Le Petit Cours</h1>
      <div className={styles.wordmark} aria-hidden="true" />
      <p className={styles.tagline}>
        Apprendre le français quand on parle espagnol.
      </p>
      <p className={styles.note}>
        Le site est en cours de réécriture. Les leçons arrivent bientôt.
      </p>
    </main>
  );
}
