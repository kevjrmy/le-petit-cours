import { SearchBox } from "@/components/search/SearchBox";
import { StartPills } from "@/components/search/StartPills";
import styles from "./page.module.css";

/* The home page: what you came to look for, and where to start if you did not
   come to look for anything.

   It is a Server Component with no client leaf of its own — `<Form>` is the
   only interactive part and it lives inside `SearchBox`. The page ships as
   static HTML and works offline with the service worker, which is the whole
   reason search reads the manifest rather than a server (`src/lib/search.ts`).

   The course itself is at /sommaire. Putting it here made the first screen a
   fifteen-card grid: a table of contents is what you consult, not what you
   arrive at. */
export default function Home() {
  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        {/* The name is drawn, not set: the wordmark is the heading. The text
            stays inside it, visually hidden, so the document still has an <h1>
            with a name for a screen reader and for search. */}
        <h1 className={styles.wordmark}>
          <span className="visually-hidden">Le Petit Cours</span>
        </h1>
        <p className={styles.tagline}>
          Apprendre le français quand on parle espagnol, et apprendre à
          l&rsquo;écrire quand on le parle déjà.
        </p>
      </header>

      <SearchBox hero />
      <StartPills />

      <p className={styles.note}>
        Tout est en accès libre. Un compte sert seulement à garder votre
        progression d&rsquo;un appareil à l&rsquo;autre.
      </p>
    </div>
  );
}
