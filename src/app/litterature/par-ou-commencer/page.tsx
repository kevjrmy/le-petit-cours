import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";

const PATH = "/litterature/par-ou-commencer";

export const metadata = lessonMetadata(PATH);

export default function Page() {
  return (
    <article className="prose">
      <PageHeader path={PATH} />

      <section>
        <h2>Les romans</h2>

        <div className="rule">
          Quatorze titres, du XVI<sup>e</sup> siècle au XX<sup>e</sup>, avec ce
          qu’on y trouve et rien qui gâche la lecture. Ce n’est pas une liste à
          lire dans l’ordre : c’est une liste où choisir.
        </div>

        <div className="table-wrap">
          <table>
            <caption>
              Six romans, du plus facile à lire au plus exigeant
            </caption>
            <thead>
              <tr>
                <th scope="col">Titre</th>
                <th scope="col">Auteur, année</th>
                <th scope="col">Ce qu’on y trouve</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row" className="fr">
                  Le Comte de Monte-Cristo
                </th>
                <td>Alexandre Dumas, 1844</td>
                <td>
                  Un marin trahi, emprisonné, qui revient. De l’aventure et une
                  vengeance qu’on suit sur mille pages sans s’arrêter.
                </td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  Les Trois Mousquetaires
                </th>
                <td>Alexandre Dumas, 1844</td>
                <td>
                  Un jeune homme monte à Paris pour servir le roi. Amitié,
                  duels, intrigues de cour.
                </td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  Les Misérables
                </th>
                <td>Victor Hugo, 1862</td>
                <td>
                  Un ancien prisonnier cherche à devenir un autre homme,
                  poursuivi par un policier qui ne lâche rien.
                </td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  Madame Bovary
                </th>
                <td>Gustave Flaubert, 1857</td>
                <td>
                  Une femme mariée à un médecin de province rêve d’une autre
                  vie. La phrase française y est travaillée mot par mot.
                </td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  Germinal
                </th>
                <td>Émile Zola, 1885</td>
                <td>
                  La vie des mineurs de charbon dans le nord, le travail, la
                  faim et la grève.
                </td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  L’Étranger
                </th>
                <td>Albert Camus, 1942</td>
                <td>
                  Un homme raconte sa vie à Alger sans rien montrer de ce qu’il
                  ressent. Des phrases courtes, un livre très bref.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="astuce">
          <p className="astuce-hook">
            Commencez par <span className="fr">L’Étranger</span>, et gardez{" "}
            <span className="fr">Madame Bovary</span> pour plus tard.
          </p>
          <p>
            Ce n’est pas une question de longueur mais de phrase. Camus écrit
            court et simple, Dumas écrit long et simple, Flaubert et Proust
            écrivent des phrases qui tiennent une page. Un roman d’aventure de
            mille pages se lit mieux, à ce niveau, qu’un roman ciselé de deux
            cents.
          </p>
        </div>
      </section>

      <section>
        <h2>Le théâtre</h2>

        <div className="table-wrap">
          <table>
            <caption>
              Trois pièces qu’on cite encore dans la conversation courante
            </caption>
            <thead>
              <tr>
                <th scope="col">Titre</th>
                <th scope="col">Auteur, année</th>
                <th scope="col">Ce qu’on y trouve</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row" className="fr">
                  Le Tartuffe
                </th>
                <td>Molière, 1664</td>
                <td>
                  Un faux dévot s’installe dans une famille pour la ruiner. Une
                  comédie sur l’hypocrisie, et le mot{" "}
                  <span className="fr">tartuffe</span> est resté dans la langue.
                </td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  Phèdre
                </th>
                <td>Jean Racine, 1677</td>
                <td>
                  Une tragédie en vers : une femme aime celui qu’elle ne devrait
                  pas, et le sait.
                </td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  Cyrano de Bergerac
                </th>
                <td>Edmond Rostand, 1897</td>
                <td>
                  Un homme au grand nez et à l’esprit plus grand encore aime en
                  secret. Drôle, puis déchirant.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="attention">
          le théâtre classique est écrit en vers, avec un ordre des mots que
          personne n’emploie plus. On le lit à voix haute ou on le voit joué :
          lu en silence, il paraît beaucoup plus difficile qu’il ne l’est.
        </div>
      </section>

      <section>
        <h2>La poésie, le conte et l’essai</h2>

        <div className="table-wrap">
          <table>
            <caption>
              Cinq livres courts, dont trois se lisent par petits morceaux
            </caption>
            <thead>
              <tr>
                <th scope="col">Titre</th>
                <th scope="col">Auteur, année</th>
                <th scope="col">Ce qu’on y trouve</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row" className="fr">
                  Fables
                </th>
                <td>Jean de La Fontaine, 1668 à 1694</td>
                <td>
                  De courtes histoires d’animaux qui finissent par une leçon.
                  Tous les enfants de France en apprennent par cœur.
                </td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  Candide
                </th>
                <td>Voltaire, 1759</td>
                <td>
                  Un jeune homme trop confiant fait le tour du monde et découvre
                  que tout ne va pas pour le mieux. Court, rapide, ironique.
                </td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  Les Fleurs du mal
                </th>
                <td>Charles Baudelaire, 1857</td>
                <td>
                  Des poèmes sur la beauté, l’ennui et la ville moderne. Se lit
                  un poème à la fois.
                </td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  Les Essais
                </th>
                <td>Michel de Montaigne, 1580</td>
                <td>
                  Un homme réfléchit à voix haute sur lui-même et sur tout le
                  reste. Le livre qui a inventé le genre.
                </td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  Le Deuxième Sexe
                </th>
                <td>Simone de Beauvoir, 1949</td>
                <td>
                  Un essai sur la condition des femmes, dont la phrase la plus
                  citée est devenue un lieu commun.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="astuce">
          <p className="astuce-hook">
            Une fable par semaine coûte cinq minutes et rapporte un texte
            entier.
          </p>
          <p>
            Une fable de La Fontaine tient en vingt vers, se trouve gratuitement
            partout, et se relit assez souvent pour qu’on finisse par la savoir.
            C’est la seule façon de lire un classique complet dès maintenant,
            sans rien abandonner en route. Le chapitre{" "}
            <span className="fr">Lecture</span> en donne une, annotée.
          </p>
        </div>
      </section>
    </article>
  );
}
