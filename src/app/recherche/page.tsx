import type { Metadata } from "next";
import { Suspense } from "react";
import { SearchBox } from "@/components/search/SearchBox";
import { SearchResults } from "@/components/search/SearchResults";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Recherche",
  /* A results page has nothing of its own to index, and every page it can
     reach is already in the sitemap. `robots.ts` disallows the path too. */
  robots: { index: false, follow: true },
};

/**
 * The results page.
 *
 * The query lives in the URL, so this route is a Server Component that reads
 * nothing: `useSearchParams` sits in `SearchResults` below, inside a `Suspense`
 * boundary, which is what keeps the route **prerendered** rather than dragged
 * into dynamic rendering (`AGENTS.md` §8 — check it in `next build`). Reading
 * `searchParams` here instead would make the page dynamic, and a search that
 * needs a server is a search that stops working in the métro.
 *
 * The fallback is the real field, empty: the shell of the page is in the static
 * HTML and only the answer waits.
 */
export default function RecherchePage() {
  return (
    <div className={styles.page}>
      <Suspense
        fallback={
          <>
            <h1 className={styles.title}>Recherche</h1>
            <SearchBox />
          </>
        }
      >
        <SearchResults />
      </Suspense>
    </div>
  );
}
