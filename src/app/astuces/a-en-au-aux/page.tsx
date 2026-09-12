import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";

const PATH = "/astuces/a-en-au-aux";

export const metadata = lessonMetadata(PATH);

export default function Page() {
  return (
    <article className="prose">
      <PageHeader path={PATH} />

      <section>
        <h2>Une ville : toujours « à »</h2>

        <div className="astuce">
          <p className="astuce-hook">
            Devant un nom de ville, c’est <strong>à</strong>. Sans exception à
            décider, sans genre à connaître.
          </p>
          <p>
            Les villes n’ont pas de genre en français, donc il n’y a rien à
            choisir. La même préposition sert pour dire où l’on est et où l’on
            va.
          </p>
        </div>

        <div className="example">
          J’habite <strong>à</strong> Séville. · Je vais <strong>à</strong>{" "}
          Lyon. · Elle travaille <strong>à</strong> Bruxelles.
        </div>

        <div className="exception">
          quelques villes portent un article dans leur nom, et cet article
          change la préposition : <span className="fr">Le Havre</span> donne{" "}
          <span className="fr">au Havre</span>,{" "}
          <span className="fr">La Haye</span> donne{" "}
          <span className="fr">à La Haye</span>,{" "}
          <span className="fr">Le Caire</span> donne{" "}
          <span className="fr">au Caire</span>. Elles sont rares : apprenez-les
          au cas par cas plutôt que d’en faire une règle.
        </div>
      </section>

      <section>
        <h2>Un pays : regardez la dernière lettre</h2>

        <div className="astuce">
          <p className="astuce-hook">
            Le pays finit par <strong>-e</strong> ? C’est{" "}
            <strong>en</strong>. Sinon, <strong>au</strong>. Nom pluriel,{" "}
            <strong>aux</strong>.
          </p>
          <p>
            La terminaison <span className="fr">-e</span> signale presque
            toujours un pays féminin, et le féminin appelle{" "}
            <span className="fr">en</span>. Il n’y a donc qu’une chose à faire :
            regarder la fin du mot.
          </p>
        </div>

        <div className="table-wrap">
          <table>
            <caption>
              Ce que la fin du nom de pays dit de la préposition à employer
            </caption>
            <thead>
              <tr>
                <th scope="col">La fin du mot</th>
                <th scope="col">Préposition</th>
                <th scope="col">Exemple</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">
                  finit par <span className="fr">-e</span>
                </th>
                <td className="fr">en</td>
                <td className="fr">Je vais en France.</td>
              </tr>
              <tr>
                <th scope="row">finit par une autre lettre</th>
                <td className="fr">au</td>
                <td className="fr">Je vais au Japon.</td>
              </tr>
              <tr>
                <th scope="row">nom au pluriel</th>
                <td className="fr">aux</td>
                <td className="fr">Je vais aux Pays-Bas.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="example">
          <strong>en</strong> Espagne · <strong>en</strong> Italie ·{" "}
          <strong>en</strong> Belgique · <strong>en</strong> Chine
          <br />
          <strong>au</strong> Portugal · <strong>au</strong> Maroc ·{" "}
          <strong>au</strong> Canada · <strong>au</strong> Brésil
          <br />
          <strong>aux</strong> États-Unis · <strong>aux</strong> Philippines
        </div>

        <div className="attention">
          pour dire d’où l’on vient, le même raisonnement sert avec{" "}
          <span className="fr">de</span> :{" "}
          <span className="fr">je viens de France</span>,{" "}
          <span className="fr">je viens du Japon</span>,{" "}
          <span className="fr">je viens des Pays-Bas</span>. Le féminin ne
          prend pas d’article, le masculin et le pluriel en prennent un.
        </div>
      </section>

      <section>
        <h2>Les trois cas où l’astuce se trompe</h2>

        <p>
          Un raccourci qui tait ses exceptions fait apprendre des fautes. Voici
          les seules que vous rencontrerez vraiment.
        </p>

        <div className="exception">
          <strong>Des pays en -e qui sont masculins.</strong> Ils prennent{" "}
          <span className="fr">au</span> malgré leur terminaison :{" "}
          <span className="fr">au Mexique</span>,{" "}
          <span className="fr">au Cambodge</span>,{" "}
          <span className="fr">au Mozambique</span>,{" "}
          <span className="fr">au Zimbabwe</span>. Le Mexique est de loin le
          plus utile à retenir.
        </div>

        <div className="exception">
          <strong>Les pays qui commencent par une voyelle.</strong> Même
          masculins, ils prennent <span className="fr">en</span>, parce que deux
          voyelles se heurteraient :{" "}
          <span className="fr">en Iran</span>,{" "}
          <span className="fr">en Irak</span>,{" "}
          <span className="fr">en Israël</span>,{" "}
          <span className="fr">en Angola</span>.
        </div>

        <div className="exception">
          <strong>Les îles.</strong> Elles suivent leur propre usage :{" "}
          <span className="fr">à Cuba</span>,{" "}
          <span className="fr">à Madagascar</span>,{" "}
          <span className="fr">en Corse</span>,{" "}
          <span className="fr">aux Canaries</span>. Traitez-les comme du
          vocabulaire, pas comme une règle.
        </div>

        <div className="attention">
          cette page est un raccourci, pas une leçon. Elle ne dit rien de{" "}
          <span className="fr">chez</span>, ni des prépositions de lieu à
          l’intérieur d’une ville. Elle sert à décider vite entre quatre mots,
          et à savoir quand ne pas lui faire confiance.
        </div>
      </section>

      <div className="resume">
        <h2>En résumé</h2>
        <ul>
          <li>
            Une ville : <span className="fr">à</span>, toujours, sauf si
            l’article fait partie du nom.
          </li>
          <li>
            Un pays en <span className="fr">-e</span> :{" "}
            <span className="fr">en</span>. Une autre lettre :{" "}
            <span className="fr">au</span>. Un pluriel :{" "}
            <span className="fr">aux</span>.
          </li>
          <li>
            Pour la provenance : <span className="fr">de</span>,{" "}
            <span className="fr">du</span>, <span className="fr">des</span>,
            selon le même partage.
          </li>
          <li>
            <span className="fr">au Mexique</span> et les pays en{" "}
            <span className="fr">-e</span> masculins échappent au raccourci.
          </li>
          <li>
            Un pays qui commence par une voyelle prend{" "}
            <span className="fr">en</span> ; les îles ne suivent aucune règle.
          </li>
        </ul>
      </div>
    </article>
  );
}
