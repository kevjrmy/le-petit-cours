import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";

const PATH = "/vocabulaire/les-nombres";

export const metadata = lessonMetadata(PATH);

export default function Page() {
  return (
    <article className="prose">
      <PageHeader path={PATH} />

      <section>
        <h2>Jusqu’à seize, chaque nombre a son mot</h2>

        <div className="rule">
          De <span className="fr">un</span> à{" "}
          <span className="fr">seize</span>, les nombres ne se devinent pas :
          ce sont seize mots à connaître. À partir de{" "}
          <span className="fr">dix-sept</span>, tout se construit.
        </div>

        <div className="table-wrap">
          <table>
            <caption>Les seize nombres qui s’apprennent un par un</caption>
            <thead>
              <tr>
                <th scope="col">Chiffre</th>
                <th scope="col">En lettres</th>
                <th scope="col">Chiffre</th>
                <th scope="col">En lettres</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td className="fr">un</td>
                <th scope="row">9</th>
                <td className="fr">neuf</td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td className="fr">deux</td>
                <th scope="row">10</th>
                <td className="fr">dix</td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td className="fr">trois</td>
                <th scope="row">11</th>
                <td className="fr">onze</td>
              </tr>
              <tr>
                <th scope="row">4</th>
                <td className="fr">quatre</td>
                <th scope="row">12</th>
                <td className="fr">douze</td>
              </tr>
              <tr>
                <th scope="row">5</th>
                <td className="fr">cinq</td>
                <th scope="row">13</th>
                <td className="fr">treize</td>
              </tr>
              <tr>
                <th scope="row">6</th>
                <td className="fr">six</td>
                <th scope="row">14</th>
                <td className="fr">quatorze</td>
              </tr>
              <tr>
                <th scope="row">7</th>
                <td className="fr">sept</td>
                <th scope="row">15</th>
                <td className="fr">quinze</td>
              </tr>
              <tr>
                <th scope="row">8</th>
                <td className="fr">huit</td>
                <th scope="row">16</th>
                <td className="fr">seize</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p>
          <span className="fr">zéro</span> n’est pas dans ce tableau parce
          qu’on ne compte pas avec lui, mais on le dit souvent : dans un prix,
          dans une heure, et au début de tous les numéros de téléphone.
        </p>

        <p>
          Ensuite, on additionne. <span className="fr">dix-sept</span>, c’est
          dix plus sept, et le trait d’union suffit à coller les deux mots. Les
          dizaines suivantes servent de base de la même façon.
        </p>

        <div className="example">
          17 dix-sept · 18 dix-huit · 19 dix-neuf
          <br />
          20 vingt · 30 trente · 40 quarante · 50 cinquante · 60 soixante
          <br />
          22 vingt-deux · 35 trente-cinq · 48 quarante-huit · 56
          cinquante-six
        </div>

        <div className="attention">
          devant <span className="fr">un</span> et{" "}
          <span className="fr">onze</span>, la dizaine prend{" "}
          <span className="fr">et</span>, sans trait d’union :{" "}
          <span className="fr">vingt et un</span>,{" "}
          <span className="fr">trente et un</span>,{" "}
          <span className="fr">soixante et onze</span>. Partout ailleurs, le
          trait d’union suffit : <span className="fr">vingt-deux</span>.
        </div>
      </section>

      <section>
        <h2>Soixante-dix, quatre-vingts, quatre-vingt-dix</h2>

        <div className="rule">
          Le français n’a pas de mot pour 70, 80 et 90. Il compte par vingt :
          70 est <strong>60 + 10</strong>, 80 est{" "}
          <strong>4 × 20</strong>, 90 est <strong>80 + 10</strong>.
        </div>

        <div className="table-wrap">
          <table>
            <caption>
              Les trois dizaines qui se disent par addition, et ce qu’elles
              cachent
            </caption>
            <thead>
              <tr>
                <th scope="col">Chiffre</th>
                <th scope="col">En lettres</th>
                <th scope="col">Le calcul</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">70</th>
                <td className="fr">soixante-dix</td>
                <td>60 + 10</td>
              </tr>
              <tr>
                <th scope="row">71</th>
                <td className="fr">soixante et onze</td>
                <td>60 + 11</td>
              </tr>
              <tr>
                <th scope="row">79</th>
                <td className="fr">soixante-dix-neuf</td>
                <td>60 + 19</td>
              </tr>
              <tr>
                <th scope="row">80</th>
                <td className="fr">quatre-vingts</td>
                <td>4 × 20</td>
              </tr>
              <tr>
                <th scope="row">81</th>
                <td className="fr">quatre-vingt-un</td>
                <td>80 + 1</td>
              </tr>
              <tr>
                <th scope="row">90</th>
                <td className="fr">quatre-vingt-dix</td>
                <td>80 + 10</td>
              </tr>
              <tr>
                <th scope="row">91</th>
                <td className="fr">quatre-vingt-onze</td>
                <td>80 + 11</td>
              </tr>
              <tr>
                <th scope="row">99</th>
                <td className="fr">quatre-vingt-dix-neuf</td>
                <td>80 + 19</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="exception">
          81 et 91 ne prennent pas <span className="fr">et</span>. On écrit{" "}
          <span className="fr">quatre-vingt-un</span> et{" "}
          <span className="fr">quatre-vingt-onze</span>, alors que 71 donne{" "}
          <span className="fr">soixante et onze</span>.
        </div>

        <div className="attention">
          <span className="fr">quatre-vingts</span> prend un{" "}
          <span className="fr">s</span> quand il termine le nombre, et le perd
          dès qu’un chiffre le suit :{" "}
          <span className="fr">quatre-vingts euros</span>, mais{" "}
          <span className="fr">quatre-vingt-deux euros</span>.{" "}
          <span className="fr">cent</span> suit la même règle :{" "}
          <span className="fr">deux cents</span>, mais{" "}
          <span className="fr">deux cent cinq</span>.
        </div>

        <div className="astuce">
          <p className="astuce-hook">
            Comptez par vingt et les trois dizaines difficiles tombent
            ensemble.
          </p>
          <p>
            Après <span className="fr">soixante</span>, le français ne change
            plus de dizaine avant 100 : il continue avec{" "}
            <span className="fr">soixante</span> jusqu’à 79, puis avec{" "}
            <span className="fr">quatre-vingt</span> jusqu’à 99. Il n’y a donc
            que deux bases à retenir pour les trente derniers nombres, pas
            trois.
          </p>
        </div>
      </section>

      <section>
        <h2>Un prix, un âge, un numéro</h2>

        <div className="rule">
          Un prix se dit en deux morceaux, les euros puis les centimes, sans
          rien entre les deux : <span className="fr">deux euros cinquante</span>.
        </div>

        <div className="example">
          2,50 € → <strong>deux euros cinquante</strong>
          <br />
          13,20 € → <strong>treize euros vingt</strong>
          <br />
          99,99 € → <strong>quatre-vingt-dix-neuf euros quatre-vingt-dix-neuf</strong>
        </div>

        <p>
          L’âge se dit avec le verbe <span className="fr">avoir</span>, et le
          mot <span className="fr">ans</span> reste toujours.
        </p>

        <div className="example">
          J’<strong>ai</strong> trente ans. · Elle <strong>a</strong>{" "}
          quarante-deux ans. · Il <strong>a</strong> quatre-vingt-un ans.
        </div>

        <div className="attention">
          on ne dit jamais <span className="fr">je suis trente</span> ni{" "}
          <span className="fr">j’ai trente</span>. Le verbe est{" "}
          <span className="fr">avoir</span>, et{" "}
          <span className="fr">ans</span> ne se supprime pas.
        </div>

        <p>
          Un numéro de téléphone se lit <strong>par paires</strong>, cinq
          groupes de deux chiffres.
        </p>

        <div className="example">
          06 24 71 80 93 →{" "}
          <strong>
            zéro six, vingt-quatre, soixante et onze, quatre-vingts,
            quatre-vingt-treize
          </strong>
        </div>
      </section>

      <div className="resume">
        <h2>En résumé</h2>
        <ul>
          <li>
            De <span className="fr">un</span> à{" "}
            <span className="fr">seize</span>, seize mots à apprendre. Après, on
            additionne.
          </li>
          <li>
            <span className="fr">et</span> devant{" "}
            <span className="fr">un</span> et{" "}
            <span className="fr">onze</span> : 21, 31, 41, 51, 61, 71. Mais pas
            81 ni 91.
          </li>
          <li>
            70 est 60 + 10, 80 est 4 × 20, 90 est 80 + 10.
          </li>
          <li>
            <span className="fr">quatre-vingts</span> et{" "}
            <span className="fr">cent</span> perdent leur{" "}
            <span className="fr">s</span> dès qu’un chiffre les suit.
          </li>
          <li>
            Un prix se dit en deux morceaux, un âge avec{" "}
            <span className="fr">avoir</span> et{" "}
            <span className="fr">ans</span>, un numéro par paires.
          </li>
        </ul>
      </div>
    </article>
  );
}
