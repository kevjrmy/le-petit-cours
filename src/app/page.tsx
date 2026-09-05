import Link from "next/link";
import { chapterCount, chapters } from "@/data/navigation";
import styles from "./page.module.css";

/* The sommaire. Every row here comes from src/data/navigation.ts — adding a
   chapter to the manifest adds it to this page, the sidebar and the chapter
   landing pages at once. Nothing is hand-listed. */
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
      <ul className={styles.grid}>
        {chapters.map((chapter) => {
          const { count, label } = chapterCount(chapter);
          return (
            <li key={chapter.slug}>
              <Link href={chapter.path} className={styles.card}>
                {/* The mark is a letter, not a pictogram: the identity is
                    lettering, so the chapter initial in the serif does the job
                    an icon set would — and cannot drift out of step with the
                    manifest the way an icon mapping does. */}
                <span className={styles.initial} aria-hidden="true">
                  {chapter.title.charAt(0)}
                </span>
                <span className={styles.body}>
                  <span className={styles.cardTitle}>{chapter.title}</span>
                  <span className={styles.blurb}>{chapter.blurb}</span>
                  <span className={styles.count}>
                    {count > 0
                      ? `${count} ${label}`
                      : `${chapter.lessons.length} à venir`}
                  </span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
