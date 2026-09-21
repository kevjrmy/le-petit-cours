import Link from "next/link";
import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";

const PATH = "/grammaire/les-articles-definis";

export const metadata = lessonMetadata(PATH);

export default function Page() {
  return (
    <article className="prose">
      <PageHeader path={PATH} />

      <section>
        <h2>Quatre formes, décidées par le nom</h2>

        <div className="rule">
          L’article défini est le petit mot placé devant un nom. Il annonce une
          chose déjà connue, ou une chose unique. Quatre formes :{" "}
          <span className="fr">le</span>, <span className="fr">la</span>,{" "}
          <span className="fr">l’</span>, <span className="fr">les</span>.
        </div>

        <div className="table-wrap">
          <table>
            <caption>Les quatre formes, et le nom qui décide de chacune</caption>
            <thead>
              <tr>
                <th scope="col">Le nom</th>
                <th scope="col">La forme</th>
                <th scope="col">Exemple</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">masculin</th>
                <td className="fr">le</td>
                <td className="fr">Le train part à huit heures.</td>
              </tr>
              <tr>
                <th scope="row">féminin</th>
                <td className="fr">la</td>
                <td className="fr">La porte est fermée.</td>
              </tr>
              <tr>
                <th scope="row">
                  devant une voyelle ou un <span className="fr">h</span> muet
                </th>
                <td className="fr">l’</td>
                <td className="fr">L’école ouvre à neuf heures.</td>
              </tr>
              <tr>
                <th scope="row">pluriel</th>
                <td className="fr">les</td>
                <td className="fr">Les enfants jouent dehors.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="attention">
          <span className="fr">l’</span> cache le genre du nom.{" "}
          <span className="fr">l’école</span> est féminin,{" "}
          <span className="fr">l’hôtel</span> est masculin, et l’article ne le
          dit pas. Apprenez le nom avec son article complet, comme{" "}
          <span className="fr">une école</span> ou{" "}
          <span className="fr">un hôtel</span> : c’est la seule façon de
          retrouver le genre quand l’apostrophe l’efface.
        </div>

        <div className="exception">
          devant un <span className="fr">h</span> aspiré, il n’y a pas
          d’apostrophe : <span className="fr">le héros</span>,{" "}
          <span className="fr">la hauteur</span>,{" "}
          <span className="fr">le haricot</span>. Ces mots sont peu nombreux et
          s’apprennent un par un.
        </div>
      </section>

      <section>
        <h2>Après « à » et « de », l’article se soude</h2>

        <div className="rule">
          Devant <span className="fr">le</span> et{" "}
          <span className="fr">les</span>, les deux prépositions{" "}
          <span className="fr">à</span> et <span className="fr">de</span> se
          collent à l’article et donnent un seul mot :{" "}
          <strong>au</strong>, <strong>aux</strong>, <strong>du</strong>,{" "}
          <strong>des</strong>. Devant <span className="fr">la</span> et{" "}
          <span className="fr">l’</span>, rien ne bouge.
        </div>

        <div className="table-wrap">
          <table>
            <caption>
              Ce que « à » et « de » deviennent devant chaque article
            </caption>
            <thead>
              <tr>
                <th scope="col">L’article</th>
                <th scope="col">Avec « à »</th>
                <th scope="col">Avec « de »</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row" className="fr">
                  le
                </th>
                <td className="fr">au cinéma</td>
                <td className="fr">du cinéma</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  la
                </th>
                <td className="fr">à la gare</td>
                <td className="fr">de la gare</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  l’
                </th>
                <td className="fr">à l’école</td>
                <td className="fr">de l’école</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  les
                </th>
                <td className="fr">aux enfants</td>
                <td className="fr">des enfants</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="attention">
          devant un nom, <span className="fr">à le</span> et{" "}
          <span className="fr">de le</span> ne s’écrivent jamais. La forme
          soudée est obligatoire : <span className="fr">je vais au marché</span>
          , <span className="fr">la voiture du voisin</span>.
        </div>

        <p>
          Les prépositions elles-mêmes, et le cas particulier des villes et des
          pays, sont dans{" "}
          <Link href="/astuces/a-en-au-aux">à, en, au ou aux ?</Link>.
        </p>

        <div className="astuce">
          <p className="astuce-hook">
            <strong>du</strong> et <strong>des</strong> ont chacun deux vies.
          </p>
          <p>
            <span className="fr">la porte du garage</span>, c’est{" "}
            <span className="fr">de</span> plus{" "}
            <span className="fr">le</span>. <span className="fr">je bois du
            café</span>, c’est autre chose : un article à part entière, expliqué
            dans{" "}
            <Link href="/grammaire/les-articles-partitifs">
              Les articles partitifs
            </Link>
            . Les deux s’écrivent pareil, et rien ne les sépare que la phrase
            autour.
          </p>
        </div>
      </section>

      <section>
        <h2>Le français met l’article là où on l’oublie</h2>

        <div className="rule">
          Un nom tout seul, sans rien devant, ne se dit presque jamais en
          français. L’article défini est obligatoire devant une chose prise en
          général, devant un nom de pays, et devant un jour qui revient toutes
          les semaines.
        </div>

        <div className="table-wrap">
          <table>
            <caption>Trois emplois où l’article ne se devine pas</caption>
            <thead>
              <tr>
                <th scope="col">Le cas</th>
                <th scope="col">Exemple</th>
                <th scope="col">Ce que ça dit</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">une chose en général</th>
                <td className="fr">J’aime le chocolat.</td>
                <td>le chocolat tout entier, pas un morceau</td>
              </tr>
              <tr>
                <th scope="row">un pays</th>
                <td className="fr">La France est grande.</td>
                <td>le nom du pays porte son article</td>
              </tr>
              <tr>
                <th scope="row">un jour qui revient</th>
                <td className="fr">Le lundi, je travaille chez moi.</td>
                <td>tous les lundis, pas un seul</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="attention">
          <span className="fr">j’aime chocolat</span> n’existe pas. Devant un
          nom, il faut un article. Dans le doute, mettez-en un plutôt que
          rien.
        </div>

        <div className="exception">
          <span className="fr">lundi</span> sans article désigne un seul jour,
          celui qui arrive : <span className="fr">lundi, je pars à Paris</span>{" "}
          parle du lundi prochain, <span className="fr">le lundi, je pars à
          Paris</span> parle de toutes les semaines. Et après{" "}
          <span className="fr">en</span>, le pays perd son article :{" "}
          <span className="fr">en France</span>,{" "}
          <span className="fr">au Japon</span>.
        </div>
      </section>

      <div className="resume">
        <h2>En résumé</h2>
        <ul>
          <li>
            Quatre formes : <span className="fr">le</span>,{" "}
            <span className="fr">la</span>, <span className="fr">l’</span>{" "}
            devant une voyelle, <span className="fr">les</span> au pluriel.
          </li>
          <li>
            <span className="fr">l’</span> cache le genre : apprenez le nom avec{" "}
            <span className="fr">un</span> ou <span className="fr">une</span>.
          </li>
          <li>
            <span className="fr">à</span> et <span className="fr">de</span> se
            soudent à <span className="fr">le</span> et{" "}
            <span className="fr">les</span> :{" "}
            <span className="fr">au</span>, <span className="fr">aux</span>,{" "}
            <span className="fr">du</span>, <span className="fr">des</span>.
          </li>
          <li>
            Devant <span className="fr">la</span> et{" "}
            <span className="fr">l’</span>, rien ne se soude :{" "}
            <span className="fr">à la gare</span>,{" "}
            <span className="fr">de l’école</span>.
          </li>
          <li>
            Une chose en général, un pays, un jour qui revient : l’article est
            obligatoire, et un nom seul ne se dit presque jamais.
          </li>
        </ul>
      </div>
    </article>
  );
}
