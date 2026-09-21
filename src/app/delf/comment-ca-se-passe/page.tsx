import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";

const PATH = "/delf/comment-ca-se-passe";

export const metadata = lessonMetadata(PATH);

export default function Page() {
  return (
    <article className="prose">
      <PageHeader path={PATH} />

      <section>
        <h2>Quatre épreuves, vingt-cinq points chacune</h2>

        <div className="rule">
          Le DELF se passe en quatre épreuves qui valent{" "}
          <strong>25 points</strong> chacune, soit <strong>100 points</strong>{" "}
          en tout. Il faut <strong>50 points</strong> pour être reçu, et{" "}
          <strong>au moins 5 points dans chaque épreuve</strong>.
        </div>

        <div className="table-wrap">
          <table>
            <caption>
              Les quatre épreuves, dans l’ordre où elles se présentent
            </caption>
            <thead>
              <tr>
                <th scope="col">Épreuve</th>
                <th scope="col">Ce qu’on vous demande</th>
                <th scope="col">Points</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Compréhension de l’oral</th>
                <td>Écouter des annonces, des messages, de courtes émissions</td>
                <td>25</td>
              </tr>
              <tr>
                <th scope="row">Compréhension des écrits</th>
                <td>Lire des documents courts et y trouver une information</td>
                <td>25</td>
              </tr>
              <tr>
                <th scope="row">Production écrite</th>
                <td>Écrire deux textes courts</td>
                <td>25</td>
              </tr>
              <tr>
                <th scope="row">Production orale</th>
                <td>Parler avec un examinateur, en trois parties</td>
                <td>25</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="attention">
          la règle des 5 points est celle qui fait échouer. Un candidat qui
          obtient 60 points sur 100 mais 4 en production orale n’est pas reçu.
          Une épreuve qu’on n’aime pas ne se compense pas : elle se travaille.
        </div>
      </section>

      <section>
        <h2>Le jour de l’examen</h2>

        <p>
          Les trois premières épreuves se passent à la suite, par écrit, dans la
          même salle et sans pause. L’oral est convoqué séparément, avant ou
          après, parfois un autre jour.
        </p>

        <ol>
          <li>
            La compréhension de l’oral ouvre la séance. Les enregistrements
            sont lancés pour tout le monde en même temps, et on ne peut ni les
            arrêter ni les reprendre.
          </li>
          <li>
            La compréhension des écrits suit, avec un temps annoncé au tableau.
          </li>
          <li>
            La production écrite ferme la partie écrite. C’est la plus longue.
          </li>
          <li>
            La production orale se passe en tête à tête. Vous avez un temps de
            préparation avant d’entrer, avec un papier et un crayon.
          </li>
        </ol>

        <div className="astuce">
          <p className="astuce-hook">
            Le temps de préparation de l’oral ne sert pas à écrire ce que vous
            allez dire.
          </p>
          <p>
            Un texte préparé mot à mot s’entend, et il s’effondre à la première
            question. Ce que vous notez pendant la préparation, ce sont des
            mots : le lieu, le prix, la date, les trois arguments. La phrase se
            fabrique au moment où vous parlez, et c’est exactement ce que
            l’examinateur évalue.
          </p>
        </div>
      </section>

      <section>
        <h2>Ce qui est corrigé, et ce qui ne l’est pas</h2>

        <p>
          Les deux épreuves de compréhension ont des réponses justes et fausses.
          Les deux épreuves de production sont notées avec une grille : on
          regarde d’abord si vous faites ce qui est demandé, ensuite comment
          vous le faites.
        </p>

        <div className="table-wrap">
          <table>
            <caption>
              Ce que regarde la grille, des points les plus faciles aux plus
              difficiles
            </caption>
            <thead>
              <tr>
                <th scope="col">Ce qui est regardé</th>
                <th scope="col">Ce que cela veut dire</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">La consigne</th>
                <td>
                  Vous avez traité le sujet, et écrit le nombre de mots demandé
                </td>
              </tr>
              <tr>
                <th scope="row">Les actes de parole</th>
                <td>
                  Vous savez inviter, remercier, refuser, raconter, décrire
                </td>
              </tr>
              <tr>
                <th scope="row">Le vocabulaire</th>
                <td>
                  Vous avez les mots du sujet, même simples, et vous les
                  employez juste
                </td>
              </tr>
              <tr>
                <th scope="row">La grammaire</th>
                <td>
                  Les formes courantes sont correctes : accords, temps,
                  déterminants
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="attention">
          l’ordre de ce tableau est aussi l’ordre des points. Un texte sans
          faute qui ne répond pas à la consigne est noté plus sévèrement qu’un
          texte maladroit qui y répond. <strong>Lisez la consigne deux fois</strong>{" "}
          et comptez vos mots.
        </div>

        <div className="exception">
          un compte de mots n’est jamais exact au mot près. On attend la
          longueur annoncée à peu près ; c’est très en dessous qui coûte des
          points, pas trois mots de moins.
        </div>
      </section>

      <div className="resume">
        <h2>En résumé</h2>
        <ul>
          <li>
            Quatre épreuves, 25 points chacune, 100 en tout, 50 pour être reçu.
          </li>
          <li>
            Il faut au moins 5 points dans chacune : une épreuve ratée ne se
            compense pas.
          </li>
          <li>
            Les trois épreuves écrites s’enchaînent sans pause ; l’oral est
            convoqué à part, avec un temps de préparation.
          </li>
          <li>
            Pendant la préparation on note des mots, jamais des phrases toutes
            faites.
          </li>
          <li>
            À l’écrit, la consigne passe avant la langue : traitez le sujet, et
            donnez la longueur demandée.
          </li>
        </ul>
      </div>
    </article>
  );
}
