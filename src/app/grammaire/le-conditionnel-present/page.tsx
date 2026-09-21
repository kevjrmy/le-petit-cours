import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";

const PATH = "/grammaire/le-conditionnel-present";

export const metadata = lessonMetadata(PATH);

export default function Page() {
  return (
    <article className="prose">
      <PageHeader path={PATH} />

      <section>
        <h2>L’infinitif, plus les terminaisons de l’imparfait</h2>

        <div className="rule">
          Le conditionnel présent se forme sur l’infinitif, auquel on ajoute{" "}
          <span className="fr">-ais</span>,{" "}
          <span className="fr">-ais</span>, <span className="fr">-ait</span>,{" "}
          <span className="fr">-ions</span>,{" "}
          <span className="fr">-iez</span>,{" "}
          <span className="fr">-aient</span>. Ce sont exactement les
          terminaisons de l’imparfait.
        </div>

        <div className="table-wrap">
          <table>
            <caption>
              Trois verbes au conditionnel présent, un par groupe
            </caption>
            <thead>
              <tr>
                <th scope="col">Personne</th>
                <th scope="col">parler</th>
                <th scope="col">finir</th>
                <th scope="col">prendre</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row" className="fr">
                  je
                </th>
                <td className="fr">parlerais</td>
                <td className="fr">finirais</td>
                <td className="fr">prendrais</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  tu
                </th>
                <td className="fr">parlerais</td>
                <td className="fr">finirais</td>
                <td className="fr">prendrais</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  il / elle
                </th>
                <td className="fr">parlerait</td>
                <td className="fr">finirait</td>
                <td className="fr">prendrait</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  nous
                </th>
                <td className="fr">parlerions</td>
                <td className="fr">finirions</td>
                <td className="fr">prendrions</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  vous
                </th>
                <td className="fr">parleriez</td>
                <td className="fr">finiriez</td>
                <td className="fr">prendriez</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  ils / elles
                </th>
                <td className="fr">parleraient</td>
                <td className="fr">finiraient</td>
                <td className="fr">prendraient</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p>
          Les verbes en <span className="fr">-re</span> perdent leur{" "}
          <span className="fr">e</span> final :{" "}
          <span className="fr">prendre</span> donne{" "}
          <span className="fr">je prendrais</span>. Quelques verbes courants
          ont une base à eux, et c’est la même qu’au futur.
        </p>

        <div className="table-wrap">
          <table>
            <caption>Les huit bases qu’il faut connaître par cœur</caption>
            <thead>
              <tr>
                <th scope="col">Verbe</th>
                <th scope="col">La base</th>
                <th scope="col">Exemple</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row" className="fr">
                  être
                </th>
                <td className="fr">ser-</td>
                <td className="fr">je serais</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  avoir
                </th>
                <td className="fr">aur-</td>
                <td className="fr">j’aurais</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  aller
                </th>
                <td className="fr">ir-</td>
                <td className="fr">j’irais</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  faire
                </th>
                <td className="fr">fer-</td>
                <td className="fr">je ferais</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  pouvoir
                </th>
                <td className="fr">pourr-</td>
                <td className="fr">je pourrais</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  vouloir
                </th>
                <td className="fr">voudr-</td>
                <td className="fr">je voudrais</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  venir
                </th>
                <td className="fr">viendr-</td>
                <td className="fr">je viendrais</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  devoir
                </th>
                <td className="fr">devr-</td>
                <td className="fr">je devrais</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="astuce">
          <p className="astuce-hook">
            Il y a toujours un <span className="fr">r</span> avant la
            terminaison.
          </p>
          <p>
            <span className="fr">je parlais</span> est un imparfait,{" "}
            <span className="fr">je parlerais</span> un conditionnel. Le{" "}
            <span className="fr">r</span> est la seule différence, à l’oral
            comme à l’écrit, et il y est dans toutes les bases irrégulières :{" "}
            <span className="fr">aur-</span>, <span className="fr">ir-</span>,{" "}
            <span className="fr">pourr-</span>,{" "}
            <span className="fr">viendr-</span>.
          </p>
        </div>
      </section>

      <section>
        <h2>Demander sans exiger</h2>

        <div className="rule">
          Le conditionnel transforme une demande en proposition. C’est son
          emploi le plus fréquent, et il ne dit rien d’une condition :{" "}
          <span className="fr">je voudrais</span> est simplement la forme polie
          de <span className="fr">je veux</span>.
        </div>

        <div className="table-wrap">
          <table>
            <caption>
              La même demande, au présent puis au conditionnel
            </caption>
            <thead>
              <tr>
                <th scope="col">Direct</th>
                <th scope="col">Poli</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row" className="fr">
                  Je veux un café.
                </th>
                <td className="fr">Je voudrais un café.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  Pouvez-vous répéter ?
                </th>
                <td className="fr">Pourriez-vous répéter ?</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  Tu dois lui écrire.
                </th>
                <td className="fr">Tu devrais lui écrire.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  Je veux visiter Lyon.
                </th>
                <td className="fr">J’aimerais visiter Lyon.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="attention">
          <span className="fr">tu devrais</span> est un conseil, pas une
          obligation. <span className="fr">tu dois lui écrire</span> ne laisse
          pas le choix ; <span className="fr">tu devrais lui écrire</span> le
          laisse entier. C’est la nuance qui manque le plus souvent dans un
          message écrit en français.
        </div>
      </section>

      <section>
        <h2>Ce qui arriverait, si</h2>

        <div className="rule">
          Pour dire ce qui se passerait dans une situation imaginaire, la
          phrase a deux moitiés :{" "}
          <span className="fr">si</span> plus l’<strong>imparfait</strong> d’un
          côté, le <strong>conditionnel</strong> de l’autre.
        </div>

        <div className="example">
          <strong>Si</strong> j’<strong>avais</strong> le temps, je{" "}
          <strong>viendrais</strong> avec vous.
          <br />
          <strong>Si</strong> nous <strong>habitions</strong> à Paris, nous{" "}
          <strong>irions</strong> au théâtre tous les mois.
          <br />
          Je te le <strong>dirais</strong> <strong>si</strong> je le{" "}
          <strong>savais</strong>.
        </div>

        <p>
          Les deux moitiés peuvent s’échanger, comme dans la troisième phrase.
          Ce qui ne change jamais, c’est le temps de chacune.
        </p>

        <div className="attention">
          on ne met jamais de conditionnel après{" "}
          <span className="fr">si</span>. On écrit{" "}
          <span className="fr">si j’avais</span>, jamais{" "}
          <span className="fr">si j’aurais</span>, et{" "}
          <span className="fr">si je pouvais</span>, jamais{" "}
          <span className="fr">si je pourrais</span>. La faute est fréquente,
          y compris chez des francophones, et elle se voit immédiatement à
          l’écrit.
        </div>

        <div className="exception">
          <span className="fr">si</span> a un autre emploi, où il veut dire{" "}
          <span className="fr">est-ce que</span>. Là, le conditionnel est
          possible : <span className="fr">je me demande s’il viendrait</span>.
          Le test tient en une question : est-ce que{" "}
          <span className="fr">si</span> pose une condition, ou est-ce qu’il
          pose une question ? Ici, il pose une question, et la règle ci-dessus
          ne s’applique pas.
        </div>
      </section>

      <div className="resume">
        <h2>En résumé</h2>
        <ul>
          <li>
            Infinitif plus les terminaisons de l’imparfait, avec un{" "}
            <span className="fr">r</span> toujours devant.
          </li>
          <li>
            Huit verbes courants ont une base à eux, la même qu’au futur.
          </li>
          <li>
            Il rend une demande polie :{" "}
            <span className="fr">je voudrais</span>,{" "}
            <span className="fr">pourriez-vous</span>,{" "}
            <span className="fr">tu devrais</span>.
          </li>
          <li>
            Pour une situation imaginaire :{" "}
            <span className="fr">si</span> plus imparfait d’un côté,
            conditionnel de l’autre.
          </li>
          <li>
            Jamais de conditionnel derrière un{" "}
            <span className="fr">si</span> de condition.
          </li>
        </ul>
      </div>
    </article>
  );
}
