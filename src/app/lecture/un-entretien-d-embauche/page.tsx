import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";
import { Quiz } from "./quiz";

const PATH = "/lecture/un-entretien-d-embauche";

export const metadata = lessonMetadata(PATH);

export default function Page() {
  return (
    <article className="prose">
      <PageHeader path={PATH} />

      <section>
        <h2>La scène</h2>

        <p>
          Dialogue écrit pour ce cours · Un entretien d’embauche · Une librairie
          à Bordeaux
        </p>

        <p>
          Madame Léger dirige une librairie et cherche un vendeur. Monsieur
          Morales, qui a travaillé deux ans en Espagne, se présente pour le
          poste. L’entretien dure un quart d’heure et suit toujours le même
          ordre : pourquoi vous, ce que vous avez fait, ce que nous proposons,
          ce que vous voulez savoir.
        </p>

        <div className="example">
          <p>
            <strong>Mme Léger.</strong> Bonjour monsieur Morales, entrez.
            Asseyez-vous, je vous en prie.
          </p>
          <p>
            <strong>M. Morales.</strong> Bonjour madame, merci beaucoup.
          </p>
          <p>
            <strong>Mme Léger.</strong> Vous avez postulé pour le poste de
            vendeur. Pourquoi notre librairie vous intéresse-t-elle ?
          </p>
          <p>
            <strong>M. Morales.</strong> Parce que vous vendez beaucoup de
            livres étrangers, et que j’aime conseiller les clients. Je voudrais
            travailler dans une petite équipe.
          </p>
          <p>
            <strong>Mme Léger.</strong> Très bien. Parlez-moi de votre
            expérience.
          </p>
          <p>
            <strong>M. Morales.</strong> J’ai travaillé deux ans comme vendeur à
            Séville, dans une librairie de quartier. Je m’occupais des commandes
            et de la caisse.
          </p>
          <p>
            <strong>Mme Léger.</strong> Et pourquoi êtes-vous parti ?
          </p>
          <p>
            <strong>M. Morales.</strong> Ma femme a trouvé un travail ici. Nous
            sommes arrivés en juin.
          </p>
          <p>
            <strong>Mme Léger.</strong> D’accord. Quelles langues parlez-vous ?
          </p>
          <p>
            <strong>M. Morales.</strong> Espagnol, français, et un peu
            d’anglais. Je pense que c’est un atout dans une librairie.
          </p>
          <p>
            <strong>Mme Léger.</strong> C’est vrai, nous avons beaucoup de
            touristes l’été. Vous êtes disponible quand ?
          </p>
          <p>
            <strong>M. Morales.</strong> Dès le mois prochain.
          </p>
          <p>
            <strong>Mme Léger.</strong> Parfait. Le poste est à plein temps, du
            mardi au samedi. Le magasin est fermé le lundi.
          </p>
          <p>
            <strong>M. Morales.</strong> Le samedi ne me pose pas de problème.
            Est-ce qu’il y a une période d’essai ?
          </p>
          <p>
            <strong>Mme Léger.</strong> Oui, deux mois. Après, le contrat
            devient définitif. Avez-vous d’autres questions ?
          </p>
          <p>
            <strong>M. Morales.</strong> Une seule : est-ce que je vais suivre
            une formation au logiciel de caisse ?
          </p>
          <p>
            <strong>Mme Léger.</strong> Bien sûr, la première semaine. Nous
            allons vous donner une réponse vendredi. Merci d’être venu.
          </p>
          <p>
            <strong>M. Morales.</strong> Merci à vous, madame. Bonne journée !
          </p>
        </div>

        <div className="attention">
          l’entretien se fait entièrement au{" "}
          <span className="fr">vous</span>, des deux côtés. Même si le poste est
          dans une petite équipe où tout le monde se tutoie ensuite, on ne passe
          jamais au <span className="fr">tu</span> pendant un entretien.
        </div>
      </section>

      <section>
        <h2>Les mots du texte</h2>

        <div className="table-wrap">
          <table>
            <caption>
              Le vocabulaire de l’entretien, dans l’ordre où il apparaît
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
                  un entretien d’embauche
                </th>
                <td>la rencontre qui décide si l’on obtient un travail</td>
                <td className="fr">Mon entretien d’embauche est jeudi.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  postuler
                </th>
                <td>demander officiellement un poste</td>
                <td className="fr">J’ai postulé pour le poste de vendeur.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  un poste
                </th>
                <td>l’emploi précis qu’une entreprise propose</td>
                <td className="fr">Le poste est à plein temps.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  une équipe
                </th>
                <td>l’ensemble des gens qui travaillent ensemble</td>
                <td className="fr">L’équipe compte quatre personnes.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  un atout
                </th>
                <td>un avantage, un point fort</td>
                <td className="fr">Parler trois langues est un atout.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  disponible
                </th>
                <td>libre, qui peut commencer</td>
                <td className="fr">Je suis disponible dès le mois prochain.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  à plein temps
                </th>
                <td>toute la semaine de travail, par opposition à un mi-temps</td>
                <td className="fr">Elle cherche un poste à plein temps.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  une période d’essai
                </th>
                <td>
                  les premières semaines, pendant lesquelles chacun peut encore
                  arrêter
                </td>
                <td className="fr">La période d’essai dure deux mois.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  une formation
                </th>
                <td>un temps d’apprentissage organisé par l’entreprise</td>
                <td className="fr">
                  Je vais suivre une formation la première semaine.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="astuce">
          <p className="astuce-hook">
            Quatre questions reviennent toujours. Préparez quatre réponses.
          </p>
          <p>
            Pourquoi nous, ce que vous avez fait, quand vous êtes disponible, et
            ce que vous voulez savoir. Les trois premières se racontent au passé
            composé et à l’imparfait ; la dernière est une question, et ne pas en
            avoir est le seul vrai mauvais signe.
          </p>
        </div>
      </section>

      <section>
        <h2>Avez-vous compris ?</h2>

        <p>
          Sept questions. Répondez sans relire, puis retournez au texte pour
          celles qui vous manquent.
        </p>

        <Quiz />
      </section>
    </article>
  );
}
