import Link from "next/link";
import type { Metadata } from "next";
import { T } from "@/components/lang/T";
import { Planete } from "@/components/ornement/Planete";

export const metadata: Metadata = { title: "Page introuvable" };

/* Renders inside the shell, so a learner who mistypes a URL still has the
   sommaire beside them rather than a bare browser error. */
export default function NotFound() {
  return (
    <article className="prose">
      <Planete />
      <h1>
        <T fr="Page introuvable" es="Página no encontrada" />
      </h1>
      <section>
        <p>
          <T
            fr={
              <>
                Cette adresse ne correspond à aucune page du cours. Le sommaire
                n&rsquo;annonce que des leçons qui existent&nbsp;: si vous suivez un
                lien d&rsquo;ici, il vous mènera quelque part.
              </>
            }
            es="Esta dirección no corresponde a ninguna página del curso. El índice solo anuncia lecciones que existen: si sigues un enlace desde ahí, te llevará a algún sitio."
          />
        </p>
        <p>
          <Link href="/sommaire">
            <T fr="Voir le sommaire" es="Ver el índice" />
          </Link>{" "}
          ·{" "}
          <Link href="/">
            <T fr="Chercher une leçon" es="Buscar una lección" />
          </Link>
        </p>
      </section>
    </article>
  );
}
