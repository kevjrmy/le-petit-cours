import { ChapterGrid } from "@/components/sommaire/ChapterGrid";
import { LevelNotice } from "@/components/sommaire/LevelNotice";
import styles from "./page.module.css";

/* The sommaire. Every row comes from src/data/navigation.ts — adding a chapter
   to the manifest adds it here, to the sidebar and to the chapter pages at
   once. Nothing is hand-listed.

   The page is a Server Component; the two listings below are client leaves so
   they can read the chosen level. React server-renders them into this page's
   static HTML, so the unfiltered book is what ships and hydration narrows it —
   which is also the right answer for a signed-out visitor (#23). */
export default function Sommaire() {
  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <h1>Le Petit Cours</h1>
        <p className={styles.tagline}>
          Apprendre le français quand on parle espagnol — et apprendre à
          l&rsquo;écrire quand on le parle déjà.
        </p>
        <p className={styles.note}>
          Tout est en accès libre. Un compte sert seulement à garder votre
          progression d&rsquo;un appareil à l&rsquo;autre.
        </p>
      </header>

      <h2 className={styles.sectionTitle}>Le livre</h2>
      <LevelNotice />
      <ChapterGrid />
    </div>
  );
}
