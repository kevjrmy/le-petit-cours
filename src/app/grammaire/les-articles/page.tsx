import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";
import { RelatedLinks } from "@/components/lesson/RelatedLinks";

const PATH = "/grammaire/les-articles";

export const metadata = lessonMetadata(PATH);

/* Learner track: explained in Spanish (docs/decisions.md #16), so the prose
   carries lang="es" and every French word its own lang="fr". A Server
   Component — no 'use client', no hooks, no state. */
export default function Page() {
  return (
    <article className="prose">
      <PageHeader path={PATH} />

      <div lang="es">
        <section>
          <h2>Los artículos definidos</h2>
          <p>
            En francés, el sustantivo casi nunca va solo: lleva un artículo. Los
            definidos son tres, y el plural es el mismo para los dos géneros.
          </p>

          <div className="table-wrap">
            <table>
              <caption lang="es">le, la, les — con su traducción</caption>
              <thead>
                <tr>
                  <th scope="col">Género</th>
                  <th scope="col" lang="fr">Français</th>
                  <th scope="col">Español</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">masculino</th>
                  <td className="fr" lang="fr">le livre</td>
                  <td>el libro</td>
                </tr>
                <tr>
                  <th scope="row">femenino</th>
                  <td className="fr" lang="fr">la table</td>
                  <td>la mesa</td>
                </tr>
                <tr>
                  <th scope="row">plural</th>
                  <td className="fr" lang="fr">les livres, les tables</td>
                  <td>los libros, las mesas</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="rule">
            Delante de vocal o de <span className="fr" lang="fr">h</span> muda,{" "}
            <span className="fr" lang="fr">le</span> y{" "}
            <span className="fr" lang="fr">la</span> se convierten en{" "}
            <span className="fr" lang="fr">l&rsquo;</span>.
          </div>

          <div className="example" lang="fr">
            l&rsquo;école · l&rsquo;homme · l&rsquo;ami · l&rsquo;heure
          </div>

          <div className="attention">
            el género no siempre coincide con el español.{" "}
            <span className="fr" lang="fr">la robe</span> no es «la ropa», es{" "}
            <em>el vestido</em>; <span className="fr" lang="fr">le sol</span> no
            es «el sol», es <em>el suelo</em>. Aprenda cada sustantivo con su
            artículo, como una sola palabra.
          </div>
        </section>

        <section>
          <h2>Los artículos indefinidos</h2>
          <p>
            Tres también, y otra vez un solo plural para los dos géneros.
          </p>

          <div className="table-wrap">
            <table>
              <caption lang="es">un, une, des — con su traducción</caption>
              <thead>
                <tr>
                  <th scope="col">Género</th>
                  <th scope="col" lang="fr">Français</th>
                  <th scope="col">Español</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">masculino</th>
                  <td className="fr" lang="fr">un livre</td>
                  <td>un libro</td>
                </tr>
                <tr>
                  <th scope="row">femenino</th>
                  <td className="fr" lang="fr">une table</td>
                  <td>una mesa</td>
                </tr>
                <tr>
                  <th scope="row">plural</th>
                  <td className="fr" lang="fr">des livres, des tables</td>
                  <td>unos libros, unas mesas</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="astuce">
            <p className="astuce-hook" lang="es">
              El plural <span className="fr" lang="fr">des</span> no se puede
              callar
            </p>
            <p>
              En español decimos «Compro libros» sin artículo. En francés hay que
              ponerlo:{" "}
              <span className="fr" lang="fr">J&rsquo;achète des livres.</span> Es
              el olvido más frecuente al empezar.
            </p>
          </div>
        </section>
      </div>

      <RelatedLinks path={PATH} />
    </article>
  );
}
