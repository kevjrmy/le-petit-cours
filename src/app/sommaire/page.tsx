import type { Metadata } from "next";
import { ChapterGrid } from "@/components/sommaire/ChapterGrid";
import { LevelNotice } from "@/components/sommaire/LevelNotice";
import { SearchBox } from "@/components/search/SearchBox";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Sommaire",
  description:
    "Tous les chapitres du Petit Cours : grammaire, orthographe, conjugaison, vocabulaire, exercices et lectures.",
};

/* The sommaire — the whole course, one card per chapter. It lived at `/` until
   the home page became a search field; the content is unchanged.

   The heading stands alone, and it is the word the rest of the app already
   uses: the manifest entry, the sidebar row, the breadcrumb and the document
   title all say « Sommaire » (`AGENTS.md` §1 — sommaire *is* the contents
   page), so an <h1> reading « Le cours » was the one place naming it twice.
   The sentence that was under it counted the chapters and explained which of
   them draw, which is the manifest describing itself to somebody who came here
   to pick a chapter (#51).

   Every row comes from src/data/navigation.ts — adding a chapter to the
   manifest adds it here, to the sidebar and to the chapter pages at once.
   Nothing is hand-listed.

   The page is a Server Component; the two listings below are client leaves so
   they can read the chosen level. React server-renders them into this page's
   static HTML, so the unfiltered course is what ships and hydration narrows it —
   which is also the right answer for a signed-out visitor (#23). */
export default function Sommaire() {
  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <h1>Sommaire</h1>
      </header>

      {/* The field again, because arriving here and not finding the chapter you
          wanted should not mean going back to the home page for the search. */}
      <SearchBox />

      <h2 className={styles.sectionTitle}>Les chapitres</h2>
      <LevelNotice />
      <ChapterGrid />
    </div>
  );
}
