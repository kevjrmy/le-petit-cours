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
          Cette adresse ne correspond à aucune page du cours. Le sommaire
          n&rsquo;annonce que des leçons qui existent : si vous suivez un lien
          d&rsquo;ici, il vous mènera quelque part.
        </p>
        <p>
          <Link href="/sommaire">Voir le sommaire</Link> ·{" "}
          <Link href="/">Chercher une leçon</Link>
        </p>
      </section>
    </article>
  );
}
