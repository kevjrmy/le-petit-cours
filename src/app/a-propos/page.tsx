import type { Metadata } from "next";
import { T } from "@/components/lang/T";

export const metadata: Metadata = {
  title: "À propos",
  description: "Ce qu’est Le Petit Cours, et sous quelle licence le réutiliser.",
};

/* Deliberately bare. The audience, the principles and the state of the rewrite
   were all described here and are all better said elsewhere — or not yet worth
   saying. What is left is the one thing that has to live on the site rather
   than in the repository: the licence, and the attribution a reuser owes. The
   prose is due a pass; this is the floor, not the intent.

   Each piece is `<T>`, French and its Spanish twin inside the same element, so
   the page keeps one paragraph per paragraph and `.prose`'s spacing (#102). */
export default function AProposPage() {
  return (
    <article className="prose">
      <h1>
        <T fr="À propos" es="Acerca de" />
      </h1>

      <p>
        <T
          fr={
            <>
              <strong>Le Petit Cours</strong> est un cours de français gratuit et
              hors ligne, en cours d&rsquo;écriture.
            </>
          }
          es={
            <>
              <strong lang="fr">Le Petit Cours</strong> es un curso de francés
              gratuito, que funciona sin conexión y que todavía se está escribiendo.
            </>
          }
        />
      </p>

      <section>
        <h2>
          <T fr="Licence" es="Licencia" />
        </h2>
        <p>
          <T
            fr={
              <>
                Le code est sous licence MIT, le contenu sous CC BY-SA 4.0, et tout
                est public sur{" "}
                <a href="https://github.com/kevjrmy/le-petit-cours">GitHub</a>.
              </>
            }
            es={
              <>
                El código tiene licencia MIT, el contenido CC BY-SA 4.0, y todo es
                público en{" "}
                <a href="https://github.com/kevjrmy/le-petit-cours">GitHub</a>.
              </>
            }
          />
        </p>
        {/* The attribution a reuser owes, in the exact form `LICENSE-CONTENT`
            asks for — credit the project, link the repository. Copied rather
            than reworded on purpose: two documents describing the same
            obligation differently is worse than one describing it nowhere, and
            this is the copy a reader will actually find. If LICENSE-CONTENT's
            attribution clause changes, change this in the same commit.

            It credits « Le Petit Cours » and not a person, which is why the
            open question of a legal name in the MIT copyright line does not
            reach this page. */}
        {/* The Spanish is a translation of that clause, not a second
            statement of it: change both with LICENSE-CONTENT. */}
        <p>
          <T
            fr={
              <>
                Pour réutiliser une page&nbsp;: créditez «&nbsp;Le Petit Cours&nbsp;»
                avec un lien vers{" "}
                <a href="https://github.com/kevjrmy/le-petit-cours">le dépôt</a>,
                signalez vos modifications, et publiez votre version sous la même
                licence. Les citations et les images empruntées ne sont pas
                concernées&nbsp;: elles restent à leurs auteurs, et la page qui les
                emploie indique sa source.
              </>
            }
            es={
              <>
                Para reutilizar una página: cita «<span lang="fr">Le Petit Cours</span>»
                con un enlace al{" "}
                <a href="https://github.com/kevjrmy/le-petit-cours">repositorio</a>,
                indica tus cambios y publica tu versión con la misma licencia. Las
                citas y las imágenes tomadas de otros no entran: siguen siendo de sus
                autores, y la página que las usa indica su fuente.
              </>
            }
          />
        </p>
      </section>
    </article>
  );
}
