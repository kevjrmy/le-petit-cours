import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";

const PATH = "/orthographe/les-determinants-possessifs";

export const metadata = lessonMetadata(PATH);

export default function Page() {
  return (
    <article className="prose">
      <PageHeader path={PATH} />

      <section>
        <h2>Il s’accorde avec l’objet, pas avec la personne</h2>

        <div className="rule">
          Le déterminant possessif se met devant un nom et dit à qui la chose
          appartient. Il s’accorde en genre et en nombre avec{" "}
          <strong>le nom qu’il accompagne</strong>, jamais avec la personne qui
          possède.
        </div>

        <div className="example">
          Paul lit <strong>sa</strong> lettre. · Marie lit{" "}
          <strong>sa</strong> lettre.
          <br />
          Paul range <strong>son</strong> sac. · Marie range{" "}
          <strong>son</strong> sac.
        </div>

        <p>
          <span className="fr">sa</span> ne dit rien de Paul ni de Marie : il dit
          seulement que <span className="fr">lettre</span> est un nom féminin
          singulier. Le possesseur est déjà dans le mot, dans le{" "}
          <span className="fr">s</span> de départ.
        </p>

        <div className="table-wrap">
          <table>
            <caption>
              Les formes, lues de gauche à droite selon le nom qui suit
            </caption>
            <thead>
              <tr>
                <th scope="col">Le possesseur</th>
                <th scope="col">Nom masculin</th>
                <th scope="col">Nom féminin</th>
                <th scope="col">Nom pluriel</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row" className="fr">
                  je
                </th>
                <td className="fr">mon livre</td>
                <td className="fr">ma clé</td>
                <td className="fr">mes chaussures</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  tu
                </th>
                <td className="fr">ton livre</td>
                <td className="fr">ta clé</td>
                <td className="fr">tes chaussures</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  il / elle
                </th>
                <td className="fr">son livre</td>
                <td className="fr">sa clé</td>
                <td className="fr">ses chaussures</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  nous
                </th>
                <td className="fr">notre livre</td>
                <td className="fr">notre clé</td>
                <td className="fr">nos chaussures</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  vous
                </th>
                <td className="fr">votre livre</td>
                <td className="fr">votre clé</td>
                <td className="fr">vos chaussures</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  ils / elles
                </th>
                <td className="fr">leur livre</td>
                <td className="fr">leur clé</td>
                <td className="fr">leurs chaussures</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="attention">
          les trois dernières lignes n’ont que deux formes au lieu de trois :{" "}
          <span className="fr">notre</span>,{" "}
          <span className="fr">votre</span> et{" "}
          <span className="fr">leur</span> ne changent pas au féminin. Seul le
          pluriel les fait bouger.
        </div>
      </section>

      <section>
        <h2>Devant une voyelle, le féminin prend la forme du masculin</h2>

        <div className="rule">
          Devant un nom féminin qui commence par une voyelle ou un{" "}
          <span className="fr">h</span> muet, on écrit{" "}
          <span className="fr">mon</span>, <span className="fr">ton</span>,{" "}
          <span className="fr">son</span>, et non{" "}
          <span className="fr">ma</span>, <span className="fr">ta</span>,{" "}
          <span className="fr">sa</span>.
        </div>

        <div className="example">
          <strong>mon</strong> amie · <strong>ton</strong> école ·{" "}
          <strong>son</strong> histoire · <strong>mon</strong> adresse
        </div>

        <p>
          Le nom reste féminin : on écrit{" "}
          <span className="fr">mon amie est partie</span>, avec le{" "}
          <span className="fr">e</span> de l’accord. Seul le déterminant a
          changé de forme, et seulement pour éviter deux voyelles qui se
          heurtent.
        </p>

        <div className="exception">
          devant un <span className="fr">h</span> aspiré, la règle ne s’applique
          pas, parce que le heurt n’a pas lieu : on écrit{" "}
          <span className="fr">sa hauteur</span>,{" "}
          <span className="fr">ma honte</span>. Ces mots sont peu nombreux et
          s’apprennent un par un.
        </div>
      </section>

      <section>
        <h2>Les trois confusions à l’écrit</h2>

        <p>
          Ces formes se prononcent comme d’autres mots. À l’oral personne ne le
          remarque ; à l’écrit, il faut décider.
        </p>

        <div className="table-wrap">
          <table>
            <caption>
              Trois paires qui se disent pareil, et le test qui les sépare
            </caption>
            <thead>
              <tr>
                <th scope="col">Paire</th>
                <th scope="col">Le test</th>
                <th scope="col">Exemple</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row" className="fr">
                  ses / ces
                </th>
                <td>
                  ajoutez <span className="fr">-là</span> après le nom : si la
                  phrase tient, c’est <span className="fr">ces</span>
                </td>
                <td className="fr">
                  Ces clés-là sont à moi. · Il cherche ses clés.
                </td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  son / sont
                </th>
                <td>
                  remplacez par <span className="fr">étaient</span> : si ça
                  marche, c’est <span className="fr">sont</span>
                </td>
                <td className="fr">
                  Son frère travaille ici. · Les enfants sont partis.
                </td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  leur / leurs
                </th>
                <td>
                  comptez le nom qui suit : un seul objet,{" "}
                  <span className="fr">leur</span>
                </td>
                <td className="fr">
                  leur maison · leurs enfants
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="attention">
          <span className="fr">leur</span> devant un verbe est un autre mot, et
          celui-là ne prend jamais de <span className="fr">s</span> :{" "}
          <span className="fr">je leur ai parlé</span>,{" "}
          <span className="fr">elle leur donne un livre</span>. Le{" "}
          <span className="fr">s</span> n’apparaît que devant un nom pluriel.
        </div>

        <div className="astuce">
          <p className="astuce-hook">
            Devant un nom, un possessif. Devant un verbe, autre chose.
          </p>
          <p>
            Les trois paires se règlent avec la même question : qu’est-ce qui
            vient juste après ? <span className="fr">ses clés</span>,{" "}
            <span className="fr">leur maison</span>,{" "}
            <span className="fr">son frère</span> sont suivis d’un nom.{" "}
            <span className="fr">sont partis</span> et{" "}
            <span className="fr">leur ai parlé</span> sont suivis d’un verbe, et
            ne sont donc pas des possessifs.
          </p>
        </div>
      </section>

      <div className="resume">
        <h2>En résumé</h2>
        <ul>
          <li>
            Le possessif s’accorde avec le nom qui suit, jamais avec la personne
            qui possède : <span className="fr">sa lettre</span> pour Paul comme
            pour Marie.
          </li>
          <li>
            <span className="fr">notre</span>,{" "}
            <span className="fr">votre</span> et{" "}
            <span className="fr">leur</span> n’ont pas de forme féminine ; seul
            le pluriel les change.
          </li>
          <li>
            Devant un nom féminin commençant par une voyelle :{" "}
            <span className="fr">mon amie</span>,{" "}
            <span className="fr">ton école</span>. Le nom, lui, reste féminin.
          </li>
          <li>
            Trois tests : <span className="fr">ces</span> accepte{" "}
            <span className="fr">-là</span> après le nom,{" "}
            <span className="fr">sont</span> se remplace par{" "}
            <span className="fr">étaient</span>, et{" "}
            <span className="fr">leurs</span> se compte sur le nom qui suit.
          </li>
          <li>
            Devant un verbe, <span className="fr">leur</span> ne prend jamais de{" "}
            <span className="fr">s</span>.
          </li>
        </ul>
      </div>
    </article>
  );
}
