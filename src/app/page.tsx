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
   fourteen-card grid: a table of contents is what you consult, not what you
   arrive at. */
export default function Home() {
  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <h1>Le Petit Cours</h1>
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
