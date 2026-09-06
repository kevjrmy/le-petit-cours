import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";

const PATH = "/grammaire/l-imparfait";

export const metadata = lessonMetadata(PATH);

export default function Page() {
  return (
    <article className="prose">
      <PageHeader path={PATH} />

      <section>
        <h2>Former l’imparfait</h2>

        <div className="rule">
          On part du verbe conjugué avec <span className="fr">nous</span> au
          présent, on enlève <span className="fr">-ons</span>, et on ajoute les
          terminaisons de l’imparfait.
        </div>

        <div className="example">
          nous parl<strong>ons</strong> → parl- → je parl<strong>ais</strong>
          <br />
          nous finiss<strong>ons</strong> → finiss- → je finiss
          <strong>ais</strong>
          <br />
          nous pren<strong>ons</strong> → pren- → je pren<strong>ais</strong>
        </div>

        <div className="table-wrap">
          <table>
            <caption>Les terminaisons de l’imparfait, sur trois verbes</caption>
            <thead>
              <tr>
                <th scope="col">Sujet</th>
                <th scope="col" className="fr">
                  parler
                </th>
                <th scope="col" className="fr">
                  finir
                </th>
                <th scope="col" className="fr">
                  prendre
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">je</th>
                <td className="fr">parlais</td>
                <td className="fr">finissais</td>
                <td className="fr">prenais</td>
              </tr>
              <tr>
                <th scope="row">tu</th>
                <td className="fr">parlais</td>
                <td className="fr">finissais</td>
                <td className="fr">prenais</td>
              </tr>
              <tr>
                <th scope="row">il / elle / on</th>
                <td className="fr">parlait</td>
                <td className="fr">finissait</td>
                <td className="fr">prenait</td>
              </tr>
              <tr>
                <th scope="row">nous</th>
                <td className="fr">parlions</td>
                <td className="fr">finissions</td>
                <td className="fr">prenions</td>
              </tr>
              <tr>
                <th scope="row">vous</th>
                <td className="fr">parliez</td>
                <td className="fr">finissiez</td>
                <td className="fr">preniez</td>
              </tr>
              <tr>
                <th scope="row">ils / elles</th>
                <td className="fr">parlaient</td>
                <td className="fr">finissaient</td>
                <td className="fr">prenaient</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="attention">
          les terminaisons sont les mêmes pour <strong>tous</strong> les verbes
          du français. Quatre d’entre elles se prononcent de façon identique :{" "}
          <span className="fr">
            je parlais, tu parlais, il parlait, ils parlaient
          </span>
          . Seule l’orthographe les sépare, et elle dépend du sujet.
        </div>

        <div className="exception">
          <span className="fr">être</span>. Son radical ne vient pas du{" "}
          <span className="fr">nous</span> du présent :{" "}
          <span className="fr">
            j’étais, tu étais, il était, nous étions, vous étiez, ils étaient
          </span>
          . C’est le seul verbe irrégulier à ce temps.
        </div>
      </section>

      <section>
        <h2>Quand l’employer</h2>

        <p>
          L’imparfait ne dit pas <em>quand</em> une action a commencé ni{" "}
          <em>quand</em> elle a fini. Il installe une situation, une habitude,
          une description. Trois emplois couvrent presque tout.
        </p>

        <div className="table-wrap">
          <table>
            <caption>Les trois emplois courants de l’imparfait</caption>
            <thead>
              <tr>
                <th scope="col">Emploi</th>
                <th scope="col">Exemple</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">une description</th>
                <td className="fr">
                  Il faisait froid et la maison était vide.
                </td>
              </tr>
              <tr>
                <th scope="row">une habitude</th>
                <td className="fr">
                  Tous les étés, nous allions chez ma grand-mère.
                </td>
              </tr>
              <tr>
                <th scope="row">une action qui durait</th>
                <td className="fr">Je dormais quand tu as appelé.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="astuce">
          <p className="astuce-hook">Trois phrases à garder toutes faites</p>
          <p>
            <span className="fr">c’était</span>,{" "}
            <span className="fr">il y avait</span>,{" "}
            <span className="fr">il faisait</span> ouvrent la plupart des
            descriptions au passé : <span className="fr">C’était en 2019</span>{" "}
            · <span className="fr">Il y avait beaucoup de monde</span> ·{" "}
            <span className="fr">Il faisait très chaud</span>. Trois formes
            apprises, et le décor est planté.
          </p>
        </div>
      </section>
    </article>
  );
}
