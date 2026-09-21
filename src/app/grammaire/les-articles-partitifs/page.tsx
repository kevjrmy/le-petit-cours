import Link from "next/link";
import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";

const PATH = "/grammaire/les-articles-partitifs";

export const metadata = lessonMetadata(PATH);

export default function Page() {
  return (
    <article className="prose">
      <PageHeader path={PATH} />

      <section>
        <h2>Une partie, pas un nombre</h2>

        <div className="rule">
          Devant un nom qu’on ne compte pas, le français emploie un article à
          lui : <span className="fr">du</span>,{" "}
          <span className="fr">de la</span>, <span className="fr">de l’</span>,
          et <span className="fr">des</span> au pluriel. Il dit qu’on prend une
          certaine quantité de la chose, sans dire laquelle.
        </div>

        <div className="table-wrap">
          <table>
            <caption>Les formes, et le nom qui décide de chacune</caption>
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
                <td className="fr">du</td>
                <td className="fr">Je mange du pain.</td>
              </tr>
              <tr>
                <th scope="row">féminin</th>
                <td className="fr">de la</td>
                <td className="fr">Elle boit de la limonade.</td>
              </tr>
              <tr>
                <th scope="row">
                  devant une voyelle ou un <span className="fr">h</span> muet
                </th>
                <td className="fr">de l’</td>
                <td className="fr">Il faut de l’eau.</td>
              </tr>
              <tr>
                <th scope="row">pluriel</th>
                <td className="fr">des</td>
                <td className="fr">On achète des épinards.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p>
          Au pluriel, il n’y a rien à choisir :{" "}
          <span className="fr">des</span> sert à la fois de pluriel à{" "}
          <span className="fr">un</span> et de pluriel à{" "}
          <span className="fr">du</span>. La question ne se pose donc qu’au
          singulier.
        </p>

        <div className="attention">
          ce qui ne se compte pas ne prend jamais{" "}
          <span className="fr">un</span> ni <span className="fr">une</span>. On
          ne dit pas <span className="fr">un lait</span>, on dit{" "}
          <span className="fr">du lait</span>, ou bien{" "}
          <span className="fr">un verre de lait</span> quand on veut compter :
          alors c’est le verre qu’on compte, pas le lait.
        </div>

        <p>
          L’article partitif ne sert pas qu’à la nourriture. Tout ce qui se
          prend par quantité le demande, y compris ce qui ne se touche pas :{" "}
          <span className="fr">du courage</span>,{" "}
          <span className="fr">de la chance</span>,{" "}
          <span className="fr">de la patience</span>,{" "}
          <span className="fr">du bruit</span>. Appliqué aux ingrédients, il est
          aussi dans{" "}
          <Link href="/vocabulaire/la-recette-des-croissants">
            La recette des croissants
          </Link>
          .
        </p>
      </section>

      <section>
        <h2>le, un ou du ?</h2>

        <div className="rule">
          Trois articles pour le même nom, et trois sens différents.{" "}
          <span className="fr">le</span> désigne la chose entière ou connue,{" "}
          <span className="fr">un</span> en compte un exemplaire,{" "}
          <span className="fr">du</span> en prélève une partie.
        </div>

        <div className="table-wrap">
          <table>
            <caption>Le même nom, trois articles, trois sens</caption>
            <thead>
              <tr>
                <th scope="col">L’article</th>
                <th scope="col">La phrase</th>
                <th scope="col">Ce qu’elle dit</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row" className="fr">
                  le
                </th>
                <td className="fr">J’aime le gâteau.</td>
                <td>le gâteau en général, tous les gâteaux</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  un
                </th>
                <td className="fr">Je prends un gâteau.</td>
                <td>un gâteau entier, qu’on peut compter</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  du
                </th>
                <td className="fr">Je prends du gâteau.</td>
                <td>une part, prise dans le gâteau</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="attention">
          les verbes qui disent un goût gardent toujours l’article défini :{" "}
          <span className="fr">j’aime le café</span>,{" "}
          <span className="fr">elle adore les gâteaux</span>,{" "}
          <span className="fr">je déteste le bruit</span>. On n’écrit jamais{" "}
          <span className="fr">j’aime du café</span> : aimer ne prend pas une
          part, il prend la chose entière.
        </div>

        <div className="astuce">
          <p className="astuce-hook">
            Posez la question au verbe : est-ce qu’on en prend, ou est-ce qu’on
            en parle ?
          </p>
          <p>
            Avec <span className="fr">manger</span>,{" "}
            <span className="fr">boire</span>,{" "}
            <span className="fr">acheter</span>,{" "}
            <span className="fr">prendre</span> et{" "}
            <span className="fr">il faut</span>, on prend une quantité, donc{" "}
            <span className="fr">du</span>. Avec{" "}
            <span className="fr">aimer</span>,{" "}
            <span className="fr">adorer</span>,{" "}
            <span className="fr">détester</span> et{" "}
            <span className="fr">préférer</span>, on parle de la chose entière,
            donc <span className="fr">le</span>. La même phrase peut contenir
            les deux : <span className="fr">j’aime le thé, alors je bois du thé
            tous les matins</span>.
          </p>
        </div>
      </section>

      <section>
        <h2>Après une quantité, il ne reste que « de »</h2>

        <div className="rule">
          Dès qu’un mot dit la quantité, l’article disparaît et il ne reste
          que <strong>de</strong>. La quantité a pris sa place.
        </div>

        <div className="table-wrap">
          <table>
            <caption>Ce que devient l’article derrière un mot de quantité</caption>
            <thead>
              <tr>
                <th scope="col">Sans quantité</th>
                <th scope="col">Avec quantité</th>
                <th scope="col">Le mot qui l’a chassé</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="fr">du pain</td>
                <td className="fr">beaucoup de pain</td>
                <td className="fr">beaucoup</td>
              </tr>
              <tr>
                <td className="fr">du sel</td>
                <td className="fr">un peu de sel</td>
                <td className="fr">un peu</td>
              </tr>
              <tr>
                <td className="fr">des tomates</td>
                <td className="fr">un kilo de tomates</td>
                <td className="fr">un kilo</td>
              </tr>
              <tr>
                <td className="fr">de l’eau</td>
                <td className="fr">une bouteille d’eau</td>
                <td className="fr">une bouteille</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="attention">
          <span className="fr">de</span> reste seul :{" "}
          <span className="fr">beaucoup du pain</span> et{" "}
          <span className="fr">assez de la patience</span> ne s’écrivent pas.
          Et devant une voyelle, <span className="fr">de</span> s’élide :{" "}
          <span className="fr">un peu d’eau</span>,{" "}
          <span className="fr">trop d’huile</span>.
        </div>

        <p>
          La négation produit exactement le même effet :{" "}
          <span className="fr">je ne bois pas de café</span>. Ce qu’elle change
          et ce qu’elle épargne est dans{" "}
          <Link href="/grammaire/la-negation">La négation</Link>.
        </p>

        <div className="exception">
          deux expressions gardent l’article entier :{" "}
          <span className="fr">bien des gens</span> et{" "}
          <span className="fr">la plupart des élèves</span>. Ce sont des
          tournures figées ; apprenez-les telles quelles plutôt que d’y chercher
          la règle.
        </div>
      </section>

      <div className="resume">
        <h2>En résumé</h2>
        <ul>
          <li>
            Devant ce qui ne se compte pas :{" "}
            <span className="fr">du</span>, <span className="fr">de la</span>,{" "}
            <span className="fr">de l’</span>, et{" "}
            <span className="fr">des</span> au pluriel.
          </li>
          <li>
            Ce qui ne se compte pas ne prend jamais{" "}
            <span className="fr">un</span> :{" "}
            <span className="fr">du lait</span>, ou{" "}
            <span className="fr">un verre de lait</span>.
          </li>
          <li>
            <span className="fr">le</span> pour la chose entière,{" "}
            <span className="fr">un</span> pour un exemplaire,{" "}
            <span className="fr">du</span> pour une partie.
          </li>
          <li>
            <span className="fr">aimer</span>,{" "}
            <span className="fr">adorer</span>,{" "}
            <span className="fr">détester</span> gardent toujours{" "}
            <span className="fr">le</span>.
          </li>
          <li>
            Après une quantité comme après une négation, il ne reste que{" "}
            <span className="fr">de</span> :{" "}
            <span className="fr">beaucoup de pain</span>,{" "}
            <span className="fr">pas de café</span>.
          </li>
        </ul>
      </div>
    </article>
  );
}
