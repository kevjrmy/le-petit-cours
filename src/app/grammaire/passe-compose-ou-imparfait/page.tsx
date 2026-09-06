import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";

const PATH = "/grammaire/passe-compose-ou-imparfait";

export const metadata = lessonMetadata(PATH);

export default function Page() {
  return (
    <article className="prose">
      <PageHeader path={PATH} />

      <section>
        <h2>L’action ou le décor</h2>

        <div className="rule">
          Les deux temps parlent du passé, mais ils ne racontent pas la même
          chose. Le <strong>passé composé</strong> dit ce qui est{" "}
          <strong>arrivé</strong> ; l’<strong>imparfait</strong> décrit le{" "}
          <strong>décor</strong> autour.
        </div>

        <div className="table-wrap">
          <table>
            <caption>Ce que chaque temps apporte à un récit</caption>
            <thead>
              <tr>
                <th scope="col">Question</th>
                <th scope="col">Passé composé</th>
                <th scope="col">Imparfait</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Il répond à</th>
                <td>Qu’est-ce qui s’est passé ?</td>
                <td>Comment c’était ?</td>
              </tr>
              <tr>
                <th scope="row">L’action est</th>
                <td>terminée, limitée</td>
                <td>en cours, sans limite</td>
              </tr>
              <tr>
                <th scope="row">Combien de fois</th>
                <td>une fois, un nombre précis</td>
                <td>souvent, chaque jour</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="example">
          Il <strong>faisait</strong> nuit et je <strong>dormais</strong> quand
          le téléphone <strong>a sonné</strong>.
        </div>

        <p>
          Le décor est à l’imparfait — <span className="fr">il faisait</span>,{" "}
          <span className="fr">je dormais</span>. L’événement qui arrive et qui
          coupe ce décor est au passé composé —{" "}
          <span className="fr">a sonné</span>. Changez les temps de place et
          l’histoire change : <span className="fr">Il a fait nuit</span>{" "}
          raconterait la tombée de la nuit comme un événement.
        </p>
      </section>

      <section>
        <h2>Les mots qui vous mettent sur la piste</h2>

        <p>
          Certaines expressions de temps annoncent presque toujours le même
          temps. Elles ne décident pas à votre place, mais elles indiquent la
          direction.
        </p>

        <div className="table-wrap">
          <table>
            <caption>
              Expressions de temps et temps du passé qu’elles appellent
            </caption>
            <thead>
              <tr>
                <th scope="col">Plutôt passé composé</th>
                <th scope="col">Plutôt imparfait</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="fr">soudain, tout à coup</td>
                <td className="fr">souvent, d’habitude</td>
              </tr>
              <tr>
                <td className="fr">un jour, ce matin-là</td>
                <td className="fr">tous les jours, le lundi</td>
              </tr>
              <tr>
                <td className="fr">hier, la semaine dernière</td>
                <td className="fr">à cette époque, quand j’étais petit</td>
              </tr>
              <tr>
                <td className="fr">deux fois, trois heures</td>
                <td className="fr">pendant que, toujours</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="attention">
          une durée précise ferme l’action, donc elle appelle le passé composé :{" "}
          <span className="fr">J’ai vécu dix ans à Lyon</span> — dix ans, c’est
          fini. Avec <span className="fr">Je vivais à Lyon</span>, on ne dit pas
          combien de temps, on plante le décor.
        </div>
      </section>

      <section>
        <h2>Les deux ensemble</h2>

        <p>
          Dans un vrai récit, les deux temps travaillent côte à côte. L’imparfait
          tient la scène, le passé composé fait avancer l’histoire.
        </p>

        <div className="example">
          Samedi, il <strong>pleuvait</strong> et il n’y{" "}
          <strong>avait</strong> personne dans la rue. Je{" "}
          <strong>suis sortie</strong> quand même. J’<strong>ai marché</strong>{" "}
          jusqu’à la gare, puis j’<strong>ai pris</strong> un café dans un bar
          qui <strong>venait</strong> d’ouvrir.
        </div>

        <div className="astuce">
          <p className="astuce-hook">Le test du film</p>
          <p>
            Demandez-vous si la phrase serait une <strong>photo</strong> ou une{" "}
            <strong>scène qui bouge</strong>. Une photo — le temps qu’il fait,
            l’âge de quelqu’un, ce qu’il y avait autour — c’est l’imparfait. Une
            scène où quelque chose se produit et se termine, c’est le passé
            composé. Le test se trompe surtout sur les verbes d’état comme{" "}
            <span className="fr">savoir</span> ou{" "}
            <span className="fr">vouloir</span> : au passé composé, ils
            signalent le moment précis où l’état a changé —{" "}
            <span className="fr">j’ai su</span>, c’est « à cet instant, j’ai
            appris ».
          </p>
        </div>
      </section>
    </article>
  );
}
