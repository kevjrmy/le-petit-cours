import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";

const PATH = "/vocabulaire/les-jours-et-la-date";

export const metadata = lessonMetadata(PATH);

export default function Page() {
  return (
    <article className="prose">
      <PageHeader path={PATH} />

      <section>
        <h2>Les jours et les mois</h2>

        <div className="rule">
          Les jours de la semaine et les mois de l’année s’écrivent en{" "}
          <strong>minuscule</strong>, même au milieu d’une date. Ils ne
          prennent une majuscule qu’en début de phrase, comme n’importe quel
          mot.
        </div>

        <div className="example">
          lundi · mardi · mercredi · jeudi · vendredi · samedi · dimanche
        </div>

        <div className="example">
          janvier · février · mars · avril · mai · juin
          <br />
          juillet · août · septembre · octobre · novembre · décembre
        </div>

        <p>
          Tous les jours sont masculins :{" "}
          <span className="fr">un lundi de janvier</span>,{" "}
          <span className="fr">le dernier dimanche du mois</span>. Les mois le
          sont aussi, mais on les emploie rarement avec un article.
        </p>

        <div className="attention">
          <span className="fr" lang="fr">
            août
          </span>{" "}
          ne se prononce pas comme il s’écrit : le{" "}
          <span className="fr">a</span> ne s’entend pas. C’est le seul mois de
          la liste qui pose un problème à voix haute, et il est aussi le seul à
          porter un accent circonflexe.
        </div>
      </section>

      <section>
        <h2>Une fois, ou toutes les semaines</h2>

        <div className="rule">
          <span className="fr">lundi</span> tout seul désigne{" "}
          <strong>un jour précis</strong>, celui qui arrive.{" "}
          <span className="fr">le lundi</span>, avec l’article, désigne{" "}
          <strong>tous les lundis</strong>, une habitude.
        </div>

        <div className="table-wrap">
          <table>
            <caption>
              L’article seul fait toute la différence entre un rendez-vous et
              une habitude
            </caption>
            <thead>
              <tr>
                <th scope="col">Forme</th>
                <th scope="col">Ce que ça veut dire</th>
                <th scope="col">Exemple</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row" className="fr">
                  lundi
                </th>
                <td>le prochain lundi, une seule fois</td>
                <td className="fr">Lundi, je vais chez le médecin.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  le lundi
                </th>
                <td>chaque lundi, une habitude</td>
                <td className="fr">Le lundi, je fais du sport.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  tous les lundis
                </th>
                <td>la même habitude, dite plus clairement</td>
                <td className="fr">Tous les lundis, la boulangerie est fermée.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="example">
          Je pars <strong>samedi</strong>. · <strong>Le samedi</strong>, je ne
          travaille pas.
        </div>

        <div className="astuce">
          <p className="astuce-hook">
            L’article, c’est la répétition. Sans article, c’est une date.
          </p>
          <p>
            Cela vaut aussi pour <span className="fr">le matin</span>,{" "}
            <span className="fr">le soir</span>,{" "}
            <span className="fr">le week-end</span> :{" "}
            <span className="fr">le soir, je lis</span> parle de tous les soirs,
            alors que <span className="fr">ce soir, je lis</span> parle
            d’aujourd’hui.
          </p>
        </div>
      </section>

      <section>
        <h2>Dire et écrire la date</h2>

        <div className="rule">
          Une date française commence par{" "}
          <span className="fr">le</span>, puis le nombre, puis le mois, puis
          l’année. Rien ne s’intercale entre le nombre et le mois.
        </div>

        <div className="example">
          Nous sommes <strong>le</strong> 14 juillet 2026.
          <br />
          Je pars <strong>le</strong> 1<sup>er</sup> août.
          <br />
          La réunion a lieu <strong>le</strong> 5 mai, à dix heures.
        </div>

        <div className="exception">
          on écrit <span className="fr">le 5 mai</span>, jamais{" "}
          <span className="fr">le 5 de mai</span>. Et le premier jour du mois
          est le seul qui se compte autrement :{" "}
          <span className="fr">
            le 1<sup>er</sup> août
          </span>
          , qui se lit <span className="fr">le premier août</span>. Pour tous
          les autres, le nombre ordinaire suffit :{" "}
          <span className="fr">le 2 août</span>,{" "}
          <span className="fr">le 3 août</span>.
        </div>

        <div className="attention">
          pour demander la date, deux questions coexistent :{" "}
          <span className="fr">quel jour sommes-nous ?</span> et{" "}
          <span className="fr">on est le combien ?</span>. La première est plus
          soignée, la seconde très courante. Les deux se répondent par{" "}
          <span className="fr">nous sommes le…</span> ou{" "}
          <span className="fr">on est le…</span>.
        </div>
      </section>

      <div className="resume">
        <h2>En résumé</h2>
        <ul>
          <li>
            Jours et mois s’écrivent en minuscule, et tous les jours sont
            masculins.
          </li>
          <li>
            <span className="fr">août</span> se prononce sans le{" "}
            <span className="fr">a</span>.
          </li>
          <li>
            <span className="fr">lundi</span> désigne un jour précis,{" "}
            <span className="fr">le lundi</span> une habitude.
          </li>
          <li>
            La date se construit <span className="fr">le</span> + nombre + mois
            + année, sans rien entre le nombre et le mois.
          </li>
          <li>
            Seul le premier du mois s’écrit{" "}
            <span className="fr">
              1<sup>er</sup>
            </span>
            .
          </li>
        </ul>
      </div>
    </article>
  );
}
