import Link from "next/link";
import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";

const PATH = "/grammaire/quand-l-article-disparait";

export const metadata = lessonMetadata(PATH);

export default function Page() {
  return (
    <article className="prose">
      <PageHeader path={PATH} />

      <section>
        <h2>Le nom qui en qualifie un autre</h2>

        <div className="rule">
          Dans un groupe <span className="fr">nom + de + nom</span>, le second
          nom n’a pas d’article quand il dit l’espèce, la matière, le contenu ou
          l’usage du premier. Il ne désigne alors personne et rien en
          particulier : il classe.
        </div>

        <div className="example">
          un cours <strong>de</strong> français · une salle{" "}
          <strong>de</strong> bains · un billet <strong>de</strong> train · une
          tasse <strong>de</strong> thé · un professeur{" "}
          <strong>de</strong> mathématiques
        </div>

        <p>
          L’article revient dès que le second nom désigne quelque chose de
          précis. C’est la seule question à se poser : est-ce que je pourrais
          dire lequel ?
        </p>

        <div className="table-wrap">
          <table>
            <caption>Le même tour, avec et sans article</caption>
            <thead>
              <tr>
                <th scope="col">Sans article</th>
                <th scope="col">Avec article</th>
                <th scope="col">Ce qui a changé</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="fr">un cours de français</td>
                <td className="fr">le cours du professeur</td>
                <td>une matière, puis une personne précise</td>
              </tr>
              <tr>
                <td className="fr">une tasse de thé</td>
                <td className="fr">la tasse de ma grand-mère</td>
                <td>ce qu’il y a dedans, puis à qui elle est</td>
              </tr>
              <tr>
                <td className="fr">une carte de France</td>
                <td className="fr">la carte de la région</td>
                <td>le sujet de la carte, puis une région connue</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="attention">
          <span className="fr">en</span> introduit la matière de la même façon,
          et jamais avec un article : <span className="fr">une table en
          bois</span>, <span className="fr">une bague en or</span>.
        </div>
      </section>

      <section>
        <h2>Après « sans », après « en », devant un métier</h2>

        <div className="rule">
          Quelques mots font tomber l’article à eux seuls.{" "}
          <span className="fr">sans</span> et <span className="fr">en</span>{" "}
          sont les deux plus fréquents, et le verbe{" "}
          <span className="fr">être</span> le fait aussi devant un nom de
          métier.
        </div>

        <div className="table-wrap">
          <table>
            <caption>Les trois endroits où l’article ne s’écrit pas</caption>
            <thead>
              <tr>
                <th scope="col">Le mot</th>
                <th scope="col">Exemple</th>
                <th scope="col">Ce qu’il dit</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row" className="fr">
                  sans
                </th>
                <td className="fr">un café sans sucre, sans difficulté</td>
                <td>l’absence de la chose</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  en
                </th>
                <td className="fr">en voiture, en été, en classe</td>
                <td>le moyen, le moment, le lieu</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  être
                </th>
                <td className="fr">Il est médecin. Elle est avocate.</td>
                <td>le métier, sans rien devant</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p>
          Le cas du métier a une contrepartie qu’il faut connaître avec lui :
          dès qu’un article apparaît, la phrase change de forme et commence par{" "}
          <span className="fr">c’est</span>. Les deux sont dans{" "}
          <Link href="/grammaire/c-est-ce-sont">C’est, ce sont</Link>.
        </p>

        <div className="attention">
          l’article revient derrière <span className="fr">sans</span> dès que le
          nom est qualifié ou désigné :{" "}
          <span className="fr">sans une minute de retard</span>,{" "}
          <span className="fr">sans l’aide de personne</span>. Le nom nu est le
          cas général, pas une interdiction.
        </div>

        <div className="astuce">
          <p className="astuce-hook">
            Un nom nu n’est plus un objet : c’est une qualité.
          </p>
          <p>
            <span className="fr">avec plaisir</span>,{" "}
            <span className="fr">avec attention</span>,{" "}
            <span className="fr">sans difficulté</span> ne parlent d’aucun
            plaisir, d’aucune attention et d’aucune difficulté en particulier :
            ils disent comment la chose se fait. C’est pour cela qu’il n’y a
            rien à déterminer, et donc rien à mettre devant.
          </p>
        </div>
      </section>

      <section>
        <h2>« des » devient « de » devant un adjectif</h2>

        <div className="rule">
          Au pluriel, quand un adjectif se place <strong>avant</strong> le nom,{" "}
          <span className="fr">des</span> se réduit à{" "}
          <span className="fr">de</span>.
        </div>

        <div className="example">
          des maisons → <strong>de</strong> grandes maisons
          <br />
          des amis → <strong>de</strong> bons amis
          <br />
          des enfants → <strong>de</strong> jeunes enfants
        </div>

        <p>
          L’adjectif placé après le nom ne change rien :{" "}
          <span className="fr">des maisons anciennes</span>,{" "}
          <span className="fr">des amis fidèles</span>. Seule la position
          compte, et seuls quelques adjectifs courants se mettent devant :{" "}
          <span className="fr">grand</span>, <span className="fr">petit</span>,{" "}
          <span className="fr">bon</span>, <span className="fr">beau</span>,{" "}
          <span className="fr">jeune</span>, <span className="fr">vieux</span>,{" "}
          <span className="fr">gros</span>, <span className="fr">joli</span>.
        </p>

        <div className="attention">
          c’est une règle de l’écrit soigné. À l’oral, on entend partout{" "}
          <span className="fr">des grandes maisons</span>, et personne ne
          reprend celui qui le dit. À l’écrit, et dans une copie d’examen, la
          forme attendue reste <span className="fr">de</span>.
        </div>

        <div className="exception">
          quand l’adjectif et le nom forment un seul mot de la langue,{" "}
          <span className="fr">des</span> reste :{" "}
          <span className="fr">des jeunes gens</span>,{" "}
          <span className="fr">des petits pois</span>,{" "}
          <span className="fr">des grands-parents</span>. Ce ne sont plus un
          adjectif et un nom, c’est un nom en deux morceaux.
        </div>
      </section>

      <div className="resume">
        <h2>En résumé</h2>
        <ul>
          <li>
            Dans <span className="fr">nom + de + nom</span>, le second n’a pas
            d’article quand il classe le premier :{" "}
            <span className="fr">un cours de français</span>.
          </li>
          <li>
            L’article revient dès que ce second nom désigne quelqu’un ou quelque
            chose de précis : <span className="fr">le cours du professeur</span>
            .
          </li>
          <li>
            <span className="fr">sans</span> et <span className="fr">en</span>{" "}
            font tomber l’article, et{" "}
            <span className="fr">être</span> aussi devant un métier.
          </li>
          <li>
            Un nom nu ne désigne plus un objet : il dit une qualité ou une
            manière.
          </li>
          <li>
            Devant un adjectif placé avant le nom,{" "}
            <span className="fr">des</span> devient{" "}
            <span className="fr">de</span> :{" "}
            <span className="fr">de bons amis</span>.
          </li>
        </ul>
      </div>
    </article>
  );
}
