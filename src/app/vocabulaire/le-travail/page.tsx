import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";

const PATH = "/vocabulaire/le-travail";

export const metadata = lessonMetadata(PATH);

export default function Page() {
  return (
    <article className="prose">
      <PageHeader path={PATH} />

      <section>
        <h2>Dire son métier</h2>

        <div className="rule">
          Après le verbe <span className="fr">être</span>, le nom du métier
          s’emploie <strong>sans article</strong> :{" "}
          <span className="fr">je suis professeur</span>,{" "}
          <span className="fr">elle est infirmière</span>.
        </div>

        <div className="attention">
          l’article revient dès qu’un adjectif s’ajoute :{" "}
          <span className="fr">je suis un bon professeur</span>. C’est
          l’adjectif qui l’appelle, pas le métier.
        </div>

        <div className="table-wrap">
          <table>
            <caption>
              Les métiers changent de forme au féminin, comme les adjectifs
            </caption>
            <thead>
              <tr>
                <th scope="col">Masculin</th>
                <th scope="col">Féminin</th>
                <th scope="col">La terminaison qui bouge</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row" className="fr">
                  un boulanger
                </th>
                <td className="fr">une boulangère</td>
                <td className="fr">-er → -ère</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  un infirmier
                </th>
                <td className="fr">une infirmière</td>
                <td className="fr">-er → -ère</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  un vendeur
                </th>
                <td className="fr">une vendeuse</td>
                <td className="fr">-eur → -euse</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  un serveur
                </th>
                <td className="fr">une serveuse</td>
                <td className="fr">-eur → -euse</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  un informaticien
                </th>
                <td className="fr">une informaticienne</td>
                <td className="fr">-ien → -ienne</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  un avocat
                </th>
                <td className="fr">une avocate</td>
                <td className="fr">-t → -te</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  un ingénieur
                </th>
                <td className="fr">une ingénieure</td>
                <td className="fr">-eur → -eure</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  un médecin
                </th>
                <td className="fr">une médecin</td>
                <td>forme unique</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="exception">
          les deux dernières lignes sortent de la règle. Tous les métiers en{" "}
          <span className="fr">-eur</span> ne font pas{" "}
          <span className="fr">-euse</span> :{" "}
          <span className="fr">ingénieur</span> donne{" "}
          <span className="fr">ingénieure</span> et{" "}
          <span className="fr">professeur</span> donne{" "}
          <span className="fr">professeure</span>, parce que ces deux-là ne
          viennent pas d’un verbe. Et{" "}
          <span className="fr">médecin</span> ne change pas du tout : on dit{" "}
          <span className="fr">une médecin</span>.
        </div>

        <div className="example">
          Je suis <strong>ingénieure</strong>. · Qu’est-ce que vous faites{" "}
          <strong>dans la vie</strong> ? · Je travaille{" "}
          <strong>comme</strong> vendeuse.
        </div>
      </section>

      <section>
        <h2>Le lieu, les gens, le contrat</h2>

        <div className="table-wrap">
          <table>
            <caption>
              Les mots qu’on emploie tous les jours au bureau ou à l’atelier
            </caption>
            <thead>
              <tr>
                <th scope="col">Mot</th>
                <th scope="col">Définition</th>
                <th scope="col">Exemple</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row" className="fr">
                  une entreprise
                </th>
                <td>une société, l’endroit qui emploie des gens</td>
                <td className="fr">Elle travaille dans une grande entreprise.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  un bureau
                </th>
                <td>la pièce où l’on travaille, et aussi la table</td>
                <td className="fr">Mon bureau est au troisième étage.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  un collègue
                </th>
                <td>une personne qui travaille au même endroit que vous</td>
                <td className="fr">Je déjeune avec un collègue.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  le patron
                </th>
                <td>la personne qui dirige l’entreprise</td>
                <td className="fr">Le patron arrive à sept heures.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  un contrat
                </th>
                <td>le papier signé qui fixe les conditions du travail</td>
                <td className="fr">J’ai signé mon contrat lundi.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  un salaire
                </th>
                <td>l’argent reçu chaque mois pour son travail</td>
                <td className="fr">Le salaire est payé le 30 du mois.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  les congés
                </th>
                <td>les jours où l’on ne travaille pas et où l’on est payé</td>
                <td className="fr">Je prends mes congés en août.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  une réunion
                </th>
                <td>un moment où plusieurs collègues parlent d’un sujet</td>
                <td className="fr">La réunion dure une heure.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="attention">
          <span className="fr">les congés</span> est un pluriel : on ne dit pas{" "}
          <span className="fr">un congé</span> pour parler de ses vacances
          annuelles. On dit <span className="fr">je suis en congés</span> ou{" "}
          <span className="fr">je prends mes congés</span>.
        </div>
      </section>

      <section>
        <h2>Quatre mots qui trompent</h2>

        <p>
          Ces quatre-là ressemblent à des mots que vous connaissez déjà, et ne
          veulent pas dire la même chose. Ils reviennent sans arrêt dans la vie
          professionnelle.
        </p>

        <div className="table-wrap">
          <table>
            <caption>
              Quatre mots du travail dont le sens ne se devine pas
            </caption>
            <thead>
              <tr>
                <th scope="col">Mot</th>
                <th scope="col">Définition</th>
                <th scope="col">Exemple</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row" className="fr">
                  un stage
                </th>
                <td>
                  une période courte de travail pour apprendre un métier, souvent
                  pendant les études
                </td>
                <td className="fr">
                  Elle a fait un stage de trois mois dans une école.
                </td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  une réunion
                </th>
                <td>
                  un rendez-vous de travail entre collègues, pas des retrouvailles
                </td>
                <td className="fr">
                  J’ai une réunion avec le service commercial à quatorze heures.
                </td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  rester
                </th>
                <td>ne pas partir, demeurer à un endroit</td>
                <td className="fr">
                  Je suis resté au bureau jusqu’à vingt heures.
                </td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  demander
                </th>
                <td>poser une question, ou réclamer quelque chose</td>
                <td className="fr">
                  J’ai demandé une augmentation à mon patron.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="astuce">
          <p className="astuce-hook">
            Un métier s’apprend avec son article, comme n’importe quel nom.
          </p>
          <p>
            Notez <span className="fr">une entreprise</span>,{" "}
            <span className="fr">un bureau</span>,{" "}
            <span className="fr">une réunion</span>, jamais le mot seul. Le
            genre fait partie du mot, et un nom noté sans lui devra être
            réappris à chaque fois que vous l’emploierez.
          </p>
        </div>
      </section>

      <div className="resume">
        <h2>En résumé</h2>
        <ul>
          <li>
            Après <span className="fr">être</span>, le métier se dit sans
            article ; l’adjectif le fait revenir.
          </li>
          <li>
            Le féminin suit les terminaisons de l’adjectif :{" "}
            <span className="fr">-er → -ère</span>,{" "}
            <span className="fr">-eur → -euse</span>,{" "}
            <span className="fr">-ien → -ienne</span>.
          </li>
          <li>
            <span className="fr">ingénieure</span> et{" "}
            <span className="fr">professeure</span> font exception ;{" "}
            <span className="fr">médecin</span> ne change pas.
          </li>
          <li>
            <span className="fr">les congés</span> s’emploie au pluriel.
          </li>
          <li>
            <span className="fr">un stage</span>,{" "}
            <span className="fr">une réunion</span>,{" "}
            <span className="fr">rester</span> et{" "}
            <span className="fr">demander</span> ne veulent pas dire ce qu’ils
            semblent dire : relisez leur définition.
          </li>
        </ul>
      </div>
    </article>
  );
}
