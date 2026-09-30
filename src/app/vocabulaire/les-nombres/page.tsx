import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";

const PATH = "/vocabulaire/les-nombres";

export const metadata = lessonMetadata(PATH);

export default function Page() {
  return (
    <article className="prose">
      <PageHeader path={PATH} />

      <section lang="es">
        <h2>
          Hasta el dieciséis, cada número tiene su palabra:{" "}
          <span className="fr" lang="fr">
            de un à seize
          </span>
        </h2>

        <div className="rule">
          De <span className="fr" lang="fr">un</span> (uno) a{" "}
          <span className="fr" lang="fr">seize</span> (dieciséis) los números
          no se adivinan: son dieciséis palabras que hay que aprender. A partir
          de <span className="fr" lang="fr">dix-sept</span> (diecisiete), todo
          se construye sumando.
        </div>

        <div className="table-wrap">
          <table>
            <caption>Los dieciséis números que se aprenden uno por uno</caption>
            <thead>
              <tr>
                <th scope="col">Cifra</th>
                <th scope="col">En francés</th>
                <th scope="col">Cifra</th>
                <th scope="col">En francés</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td className="fr" lang="fr">un</td>
                <th scope="row">9</th>
                <td className="fr" lang="fr">neuf</td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td className="fr" lang="fr">deux</td>
                <th scope="row">10</th>
                <td className="fr" lang="fr">dix</td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td className="fr" lang="fr">trois</td>
                <th scope="row">11</th>
                <td className="fr" lang="fr">onze</td>
              </tr>
              <tr>
                <th scope="row">4</th>
                <td className="fr" lang="fr">quatre</td>
                <th scope="row">12</th>
                <td className="fr" lang="fr">douze</td>
              </tr>
              <tr>
                <th scope="row">5</th>
                <td className="fr" lang="fr">cinq</td>
                <th scope="row">13</th>
                <td className="fr" lang="fr">treize</td>
              </tr>
              <tr>
                <th scope="row">6</th>
                <td className="fr" lang="fr">six</td>
                <th scope="row">14</th>
                <td className="fr" lang="fr">quatorze</td>
              </tr>
              <tr>
                <th scope="row">7</th>
                <td className="fr" lang="fr">sept</td>
                <th scope="row">15</th>
                <td className="fr" lang="fr">quinze</td>
              </tr>
              <tr>
                <th scope="row">8</th>
                <td className="fr" lang="fr">huit</td>
                <th scope="row">16</th>
                <td className="fr" lang="fr">seize</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p>
          <span className="fr" lang="fr">zéro</span> no está en la tabla porque
          no se cuenta con él, pero se dice a menudo: en un precio, en una hora
          y al principio de todos los números de teléfono.
        </p>

        <p>
          Después se suma. <span className="fr" lang="fr">dix-sept</span> es
          diez más siete, y el guion une las dos palabras. Las decenas
          siguientes son palabras nuevas y se usan como base de la misma manera.
        </p>

        <div className="example" lang="fr">
          17 dix-sept · 18 dix-huit · 19 dix-neuf
          <br />
          20 vingt · 30 trente · 40 quarante · 50 cinquante · 60 soixante
          <br />
          22 vingt-deux · 35 trente-cinq · 48 quarante-huit · 56 cinquante-six
        </div>

        <div className="attention">
          delante de <span className="fr" lang="fr">un</span> y de{" "}
          <span className="fr" lang="fr">onze</span>, la decena lleva{" "}
          <span className="fr" lang="fr">et</span> (y), sin guion:{" "}
          <span className="fr" lang="fr">vingt et un</span>,{" "}
          <span className="fr" lang="fr">trente et un</span>,{" "}
          <span className="fr" lang="fr">soixante et onze</span>. En los demás
          números basta el guion: <span className="fr" lang="fr">vingt-deux</span>.
        </div>
      </section>

      <section lang="es">
        <h2>
          <span className="fr" lang="fr">
            Soixante-dix, quatre-vingts, quatre-vingt-dix
          </span>
        </h2>

        <div className="rule">
          El francés no tiene palabra propia para 70, 80 y 90 (setenta, ochenta,
          noventa). 70 se construye sobre 60:{" "}
          <strong>60 + 10</strong>. 80 y 90 se construyen sobre 4 × 20:{" "}
          <strong>4 × 20</strong> y <strong>80 + 10</strong>.
        </div>

        <div className="table-wrap">
          <table>
            <caption>
              Las tres decenas que se dicen sumando, y el cálculo que esconden
            </caption>
            <thead>
              <tr>
                <th scope="col">Cifra</th>
                <th scope="col">En francés</th>
                <th scope="col">El cálculo</th>
                <th scope="col">Ejemplo</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">70</th>
                <td className="fr" lang="fr">soixante-dix</td>
                <td>60 + 10</td>
                <td className="fr" lang="fr">Il a soixante-dix ans.</td>
              </tr>
              <tr>
                <th scope="row">71</th>
                <td className="fr" lang="fr">soixante et onze</td>
                <td>60 + 11</td>
                <td className="fr" lang="fr">J’ai soixante et onze euros.</td>
              </tr>
              <tr>
                <th scope="row">79</th>
                <td className="fr" lang="fr">soixante-dix-neuf</td>
                <td>60 + 19</td>
                <td className="fr" lang="fr">J’ai soixante-dix-neuf euros.</td>
              </tr>
              <tr>
                <th scope="row">80</th>
                <td className="fr" lang="fr">quatre-vingts</td>
                <td>4 × 20</td>
                <td className="fr" lang="fr">J’ai quatre-vingts euros.</td>
              </tr>
              <tr>
                <th scope="row">81</th>
                <td className="fr" lang="fr">quatre-vingt-un</td>
                <td>80 + 1</td>
                <td className="fr" lang="fr">Elle a quatre-vingt-un ans.</td>
              </tr>
              <tr>
                <th scope="row">90</th>
                <td className="fr" lang="fr">quatre-vingt-dix</td>
                <td>80 + 10</td>
                <td className="fr" lang="fr">Il a quatre-vingt-dix ans.</td>
              </tr>
              <tr>
                <th scope="row">91</th>
                <td className="fr" lang="fr">quatre-vingt-onze</td>
                <td>80 + 11</td>
                <td className="fr" lang="fr">J’ai quatre-vingt-onze euros.</td>
              </tr>
              <tr>
                <th scope="row">99</th>
                <td className="fr" lang="fr">quatre-vingt-dix-neuf</td>
                <td>80 + 19</td>
                <td className="fr" lang="fr">Elle a quatre-vingt-dix-neuf ans.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="exception">
          81 y 91 no llevan <span className="fr" lang="fr">et</span>. Se escribe{" "}
          <span className="fr" lang="fr">quatre-vingt-un</span> y{" "}
          <span className="fr" lang="fr">quatre-vingt-onze</span>, aunque 71 sea{" "}
          <span className="fr" lang="fr">soixante et onze</span>.
        </div>

        <div className="attention">
          <span className="fr" lang="fr">quatre-vingts</span> lleva una{" "}
          <span className="fr" lang="fr">s</span> cuando termina el número, y la
          pierde en cuanto otra cifra lo sigue:{" "}
          <span className="fr" lang="fr">quatre-vingts euros</span>, pero{" "}
          <span className="fr" lang="fr">quatre-vingt-deux euros</span>.{" "}
          <span className="fr" lang="fr">cent</span> (cien) sigue la misma
          regla: <span className="fr" lang="fr">deux cents</span> (doscientos),
          pero <span className="fr" lang="fr">deux cent cinq</span>{" "}
          (doscientos cinco). Solo <span className="fr" lang="fr">cent</span>{" "}
          nunca lleva <span className="fr" lang="fr">s</span>.
        </div>

        <div className="astuce">
          <p className="astuce-hook">
            De 60 a 79 se sigue con soixante; de 80 a 99, con quatre-vingt.
          </p>
          <p>
            Solo hay dos bases que recordar para los treinta últimos números.
            En Bélgica y en Suiza oirás{" "}
            <span className="fr" lang="fr">septante</span> (70) y{" "}
            <span className="fr" lang="fr">nonante</span> (90); en Francia,{" "}
            <span className="fr" lang="fr">soixante-dix</span> y{" "}
            <span className="fr" lang="fr">quatre-vingt-dix</span>.
          </p>
        </div>
      </section>

      <section lang="es">
        <h2>
          Un precio, una edad, un número:{" "}
          <span className="fr" lang="fr">
            le prix, l’âge, le numéro
          </span>
        </h2>

        <div className="rule">
          Un precio se dice en dos trozos, primero los euros y luego los
          céntimos, sin nada entre los dos. No hay «con» como en español:{" "}
          <span className="fr" lang="fr">deux euros cinquante</span>.
        </div>

        <div className="example" lang="fr">
          2,50 € → <strong>deux euros cinquante</strong>
          <br />
          13,20 € → <strong>treize euros vingt</strong>
          <br />
          99,99 € →{" "}
          <strong>quatre-vingt-dix-neuf euros quatre-vingt-dix-neuf</strong>
        </div>

        <p>
          La edad se dice con el verbo <span className="fr" lang="fr">avoir</span>{" "}
          (tener), y la palabra <span className="fr" lang="fr">ans</span> (años)
          no se quita nunca.
        </p>

        <div className="example" lang="fr">
          J’<strong>ai</strong> trente ans. · Elle <strong>a</strong>{" "}
          quarante-deux ans. · Il <strong>a</strong> quatre-vingt-un ans.
        </div>

        <div className="attention">
          en español dices «tengo treinta» sin más, pero en francés{" "}
          <span className="fr" lang="fr">ans</span> es obligatorio:{" "}
          <span className="fr" lang="fr">j’ai trente</span> está mal. Y el verbo
          de la edad es siempre <span className="fr" lang="fr">avoir</span>{" "}
          (tener), nunca <span className="fr" lang="fr">être</span>.
        </div>

        <p>
          Un número de teléfono se lee <strong>de dos en dos</strong>: cinco
          grupos de dos cifras.
        </p>

        <div className="example" lang="fr">
          06 24 71 80 93 →{" "}
          <strong>
            zéro six, vingt-quatre, soixante et onze, quatre-vingts,
            quatre-vingt-treize
          </strong>
        </div>
      </section>

      <div className="resume" lang="es">
        <h2>En resumen</h2>
        <ul>
          <li>
            De <span className="fr" lang="fr">un</span> a{" "}
            <span className="fr" lang="fr">seize</span>, dieciséis palabras que
            aprender. Después se suma.
          </li>
          <li>
            <span className="fr" lang="fr">et</span> solo delante de{" "}
            <span className="fr" lang="fr">un</span> y{" "}
            <span className="fr" lang="fr">onze</span>: 21, 31, 41, 51, 61 y 71.
            Nunca en 81 ni en 91.
          </li>
          <li>70 es 60 + 10, 80 es 4 × 20 y 90 es 80 + 10.</li>
          <li>
            <span className="fr" lang="fr">quatre-vingts</span> y{" "}
            <span className="fr" lang="fr">cent</span> pierden la{" "}
            <span className="fr" lang="fr">s</span> en cuanto otra cifra los
            sigue.
          </li>
          <li>
            Un precio se dice en dos trozos, la edad con{" "}
            <span className="fr" lang="fr">avoir</span> y{" "}
            <span className="fr" lang="fr">ans</span>, y un teléfono de dos en
            dos.
          </li>
        </ul>
      </div>
    </article>
  );
}
