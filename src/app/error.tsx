"use client";

import Link from "next/link";

/**
 * The error boundary for everything under the root layout. It has to be a
 * Client Component — React needs `reset` to be callable — but it is a leaf, so
 * no page becomes client-rendered because of it.
 *
 * It does not catch a failure in the root layout itself; that would need
 * `global-error.tsx`, which replaces the shell wholesale and is not worth
 * carrying for a book of static pages.
 */
export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <article className="prose">
      <h1>Quelque chose s&rsquo;est mal passé</h1>
      <section>
        <p>
          La page n&rsquo;a pas pu s&rsquo;afficher. Ce n&rsquo;est pas de votre
          fait.
        </p>
        <p>
          <button type="button" className="button" onClick={reset}>
            Réessayer
          </button>{" "}
          ou <Link href="/">revenir au sommaire</Link>.
        </p>
      </section>
    </article>
  );
}
