import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";

const PATH = "/grammaire/le-plus-que-parfait";

export const metadata = lessonMetadata(PATH);

export default function Page() {
  return (
    <article className="prose">
      <PageHeader path={PATH} />

      <section>
        <h2>Un passé avant le passé</h2>

        <div className="rule">
          Le plus-que-parfait se forme avec{" "}
          <span className="fr">avoir</span> ou{" "}
          <span className="fr">être</span> <strong>à l’imparfait</strong>,
          suivi du participe passé. C’est le passé composé, avec l’auxiliaire à
          l’imparfait au lieu du présent.
        </div>

        <div className="table-wrap">
          <table>
            <caption>
              Le même verbe au passé composé, puis au plus-que-parfait
            </caption>
            <thead>
              <tr>
                <th scope="col">Passé composé</th>
                <th scope="col">Plus-que-parfait</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row" className="fr">
                  j’ai mangé
                </th>
                <td className="fr">j’avais mangé</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  tu as compris
                </th>
                <td className="fr">tu avais compris</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  elle est partie
                </th>
                <td className="fr">elle était partie</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  nous sommes venus
                </th>
                <td className="fr">nous étions venus</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  ils se sont levés
                </th>
                <td className="fr">ils s’étaient levés</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="attention">
          l’auxiliaire ne change pas. Un verbe qui prend{" "}
          <span className="fr">être</span> au passé composé prend{" "}
          <span className="fr">être</span> ici aussi, et l’accord du participe
          se fait de la même façon :{" "}
          <span className="fr">elle était partie</span>,{" "}
          <span className="fr">elles étaient parties</span>. Si vous savez
          construire le passé composé d’un verbe, vous savez construire son
          plus-que-parfait.
        </div>
      </section>

      <section>
        <h2>Quand on l’emploie</h2>

        <div className="rule">
          Il sert quand la phrase parle de deux moments passés et que l’un des
          deux est <strong>plus ancien</strong> que l’autre. Le plus ancien
          prend le plus-que-parfait, l’autre reste au passé composé ou à
          l’imparfait.
        </div>

        <div className="example">
          Quand je suis arrivé, le film <strong>avait</strong> déjà{" "}
          <strong>commencé</strong>.
          <br />
          Elle a retrouvé le livre qu’elle <strong>avait perdu</strong> en
          juin.
          <br />
          Nous étions fatigués parce que nous <strong>avions marché</strong>{" "}
          toute la journée.
        </div>

        <p>
          Il sert aussi à dire ce qui n’était pas encore arrivé à ce
          moment-là, avec <span className="fr">jamais</span> ou{" "}
          <span className="fr">déjà</span>.
        </p>

        <div className="example">
          Je n’<strong>avais</strong> jamais <strong>vu</strong> la mer avant
          ce voyage.
          <br />
          À dix ans, il <strong>avait</strong> déjà <strong>lu</strong> tout
          Jules Verne.
        </div>

        <div className="astuce">
          <p className="astuce-hook">
            Si vous pouvez ajouter <span className="fr">avant</span> sans
            changer le sens, c’est un plus-que-parfait.
          </p>
          <p>
            <span className="fr">le film avait commencé</span> veut dire{" "}
            <span className="fr">le film avait commencé avant</span>. C’est le
            seul test dont vous avez besoin : si l’action est antérieure à
            l’autre, elle recule d’un temps. Sinon, le passé composé suffit.
          </p>
        </div>
      </section>

      <section>
        <h2>Dans un récit</h2>

        <p>
          Les trois temps du passé se partagent le travail, et chacun répond à
          une question différente.
        </p>

        <div className="table-wrap">
          <table>
            <caption>
              Ce que chaque temps raconte dans une histoire au passé
            </caption>
            <thead>
              <tr>
                <th scope="col">Temps</th>
                <th scope="col">Ce qu’il dit</th>
                <th scope="col">Exemple</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row" className="fr">
                  l’imparfait
                </th>
                <td>le décor, la situation</td>
                <td className="fr">Il pleuvait.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  le passé composé
                </th>
                <td>ce qui arrive, l’événement</td>
                <td className="fr">Le train est parti.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  le plus-que-parfait
                </th>
                <td>ce qui était arrivé avant</td>
                <td className="fr">J’avais oublié mon billet.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="example">
          Il pleuvait sur le quai. Le train <strong>est parti</strong> à
          l’heure, sans moi : j’<strong>avais oublié</strong> mon billet à la
          maison, et j’<strong>étais retourné</strong> le chercher.
        </div>

        <div className="exception">
          le plus-que-parfait ne raconte pas la suite de l’histoire, il
          l’explique. Trois phrases de suite au plus-que-parfait veulent
          presque toujours dire que le récit a commencé au mauvais endroit.
        </div>
      </section>

      <div className="resume">
        <h2>En résumé</h2>
        <ul>
          <li>
            <span className="fr">avoir</span> ou{" "}
            <span className="fr">être</span> à l’imparfait, plus le participe
            passé.
          </li>
          <li>
            L’auxiliaire et l’accord sont ceux du passé composé du même verbe.
          </li>
          <li>
            Il marque l’action la plus ancienne quand la phrase en contient
            deux.
          </li>
          <li>
            Avec <span className="fr">jamais</span> et{" "}
            <span className="fr">déjà</span>, il dit où on en était à ce
            moment-là.
          </li>
          <li>
            Dans un récit : l’imparfait pose le décor, le passé composé fait
            avancer, le plus-que-parfait revient en arrière.
          </li>
        </ul>
      </div>
    </article>
  );
}
