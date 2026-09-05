import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Page introuvable" };

/* Renders inside the shell, so a learner who mistypes a URL still has the
   sommaire beside them rather than a bare browser error. */
export default function NotFound() {
  return (
    <article className="prose">
      <h1>Page introuvable</h1>
      <section>
        <p>
          Cette page n&rsquo;existe pas — ou pas encore : le site est en cours
          de réécriture, et les leçons marquées <em>Bientôt</em> dans le
          sommaire n&rsquo;ont pas encore d&rsquo;adresse.
        </p>
        <p>
          <Link href="/">Retour au sommaire</Link>
        </p>
      </section>
    </article>
  );
}
