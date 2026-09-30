import Link from "next/link";
import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";

const PATH = "/grammaire/parler-de-ses-gouts";

export const metadata = lessonMetadata(PATH);

export default function Page() {
  return (
    <article className="prose">
      <PageHeader path={PATH} />

      <section lang="es">
        <h2>En francés, la persona es el sujeto</h2>

        <div className="rule">
          En español, la cosa es el sujeto: <em>me gusta el café</em>. En
          francés, el sujeto es la persona y el verbo es{" "}
          <span className="fr" lang="fr">aimer</span>:{" "}
          <span className="fr" lang="fr">j’aime le café</span>. La frase se
          construye al revés que en español.
        </div>

        <div className="table-wrap">
          <table>
            <caption>
              Los verbos de los gustos, de lo que no te gusta a lo que te encanta
            </caption>
            <thead>
              <tr>
                <th scope="col">La expresión</th>
                <th scope="col">Ejemplo</th>
                <th scope="col">En español</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row" className="fr" lang="fr">détester</th>
                <td className="fr" lang="fr">Je déteste le bruit.</td>
                <td>Odio el ruido.</td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">ne pas aimer</th>
                <td className="fr" lang="fr">Je n’aime pas la pluie.</td>
                <td>No me gusta la lluvia.</td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">aimer bien</th>
                <td className="fr" lang="fr">J’aime bien le thé.</td>
                <td>Me gusta (bastante) el té.</td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">aimer</th>
                <td className="fr" lang="fr">Tu aimes la musique.</td>
                <td>Te gusta la música.</td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">aimer beaucoup</th>
                <td className="fr" lang="fr">Elle aime beaucoup le chocolat.</td>
                <td>Le gusta mucho el chocolate.</td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">adorer</th>
                <td className="fr" lang="fr">J’adore la mer.</td>
                <td>Me encanta el mar.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p>
          Para comparar, <span className="fr" lang="fr">préférer</span>:{" "}
          <span className="fr" lang="fr">je préfère le thé</span> (prefiero el
          té). Con dos cosas, la segunda va con <span className="fr" lang="fr">à</span>:{" "}
          <span className="fr" lang="fr">je préfère le thé au café</span>{" "}
          (prefiero el té al café). Los cuatro verbos se conjugan como{" "}
          <Link href="/conjugaison/parler" lang="fr">parler</Link>; en{" "}
          <span className="fr" lang="fr">préférer</span> cambia un acento:{" "}
          <span className="fr" lang="fr">je préfère</span>.
        </p>

        <div className="attention">
          <span className="fr" lang="fr">beaucoup</span> y{" "}
          <span className="fr" lang="fr">bien</span> van después del verbo:{" "}
          <span className="fr" lang="fr">j’aime beaucoup le café</span>,{" "}
          <span className="fr" lang="fr">j’aime bien le café</span>. No dices{" "}
          <span className="fr" lang="fr">j’aime très le café</span>, aunque en
          español digas <em>me gusta muchísimo</em>. Y{" "}
          <span className="fr" lang="fr">aimer bien</span> es más flojo que{" "}
          <span className="fr" lang="fr">aimer</span>: no es «querer bien».
        </div>

        <div className="exception">
          con una persona, <span className="fr" lang="fr">j’aime Paul</span>{" "}
          suena a amor. Para decir que alguien te cae bien, usa{" "}
          <span className="fr" lang="fr">j’aime bien Paul</span>.
        </div>
      </section>

      <section lang="es">
        <h2>Después de <span className="fr" lang="fr">aimer</span>, el artículo definido</h2>

        <div className="rule">
          Hablar de gustos es hablar de una cosa en general. Por eso, después de{" "}
          <span className="fr" lang="fr">aimer</span>,{" "}
          <span className="fr" lang="fr">adorer</span>,{" "}
          <span className="fr" lang="fr">détester</span> y{" "}
          <span className="fr" lang="fr">préférer</span> va{" "}
          <span className="fr" lang="fr">le</span>,{" "}
          <span className="fr" lang="fr">la</span> o{" "}
          <span className="fr" lang="fr">les</span>. Nunca{" "}
          <span className="fr" lang="fr">un</span>,{" "}
          <span className="fr" lang="fr">une</span>,{" "}
          <span className="fr" lang="fr">du</span> ni{" "}
          <span className="fr" lang="fr">des</span>. Las formas están en{" "}
          <Link href="/grammaire/les-articles-definis" lang="fr">
            Les articles définis
          </Link>
          .
        </div>

        <div className="table-wrap">
          <table>
            <caption>
              El mismo nombre con los gustos y con «<span className="fr" lang="fr">je voudrais</span>» o «<span className="fr" lang="fr">je mange</span>»
            </caption>
            <thead>
              <tr>
                <th scope="col">Qué dices</th>
                <th scope="col">Ejemplo</th>
                <th scope="col">En español</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">un gusto</th>
                <td className="fr" lang="fr">J’aime le chocolat.</td>
                <td>Me gusta el chocolate.</td>
              </tr>
              <tr>
                <th scope="row">un gusto, femenino</th>
                <td className="fr" lang="fr">J’adore la musique.</td>
                <td>Me encanta la música.</td>
              </tr>
              <tr>
                <th scope="row">un gusto, plural</th>
                <td className="fr" lang="fr">Elle aime les chats.</td>
                <td>Le gustan los gatos.</td>
              </tr>
              <tr>
                <th scope="row">algo que pides</th>
                <td className="fr" lang="fr">Je voudrais un café.</td>
                <td>Quisiera un café.</td>
              </tr>
              <tr>
                <th scope="row">algo que comes</th>
                <td className="fr" lang="fr">Je mange du chocolat.</td>
                <td>Como chocolate.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="attention">
          <span className="fr" lang="fr">j’aime du chocolat</span> y{" "}
          <span className="fr" lang="fr">j’aime chocolat</span> no existen.
          Cuando dices lo que te gusta, piensas en el chocolate en general:{" "}
          <span className="fr" lang="fr">j’aime le chocolat</span>. Cuando
          pides o comes una parte, es otro caso: mira{" "}
          <Link href="/grammaire/les-articles-partitifs" lang="fr">
            Les articles partitifs
          </Link>
          .
        </div>

        <p>
          Con la negación, el artículo se queda:{" "}
          <span className="fr" lang="fr">je n’aime pas le café</span> (no me
          gusta el café). <span className="fr" lang="fr">je n’aime pas de café</span>{" "}
          es un error. El cambio a <span className="fr" lang="fr">de</span> (
          <span className="fr" lang="fr">je ne mange pas de chocolat</span>) es
          para lo que comes o tienes, no para lo que te gusta. Mira{" "}
          <Link href="/grammaire/la-negation" lang="fr">La négation</Link>.
        </p>

        <div className="exception">
          <span className="fr" lang="fr">l’</span> delante de vocal:{" "}
          <span className="fr" lang="fr">j’aime l’été</span> (me gusta el
          verano). Y en plural, <span className="fr" lang="fr">les</span> se
          queda igual: <span className="fr" lang="fr">je déteste les lundis</span>.
        </div>
      </section>

      <section lang="es">
        <h2>
          <span className="fr" lang="fr">aimer</span> + verbo en infinitivo
        </h2>

        <div className="rule">
          Para decir lo que te gusta hacer, pones un verbo en infinitivo
          después: <span className="fr" lang="fr">j’aime lire</span> (me gusta
          leer). No hay artículo ni preposición entre los dos verbos.
        </div>

        <div className="table-wrap">
          <table>
            <caption>Los gustos con un verbo en infinitivo</caption>
            <thead>
              <tr>
                <th scope="col">Verbo</th>
                <th scope="col">Ejemplo</th>
                <th scope="col">En español</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row" className="fr" lang="fr">aimer</th>
                <td className="fr" lang="fr">J’aime lire.</td>
                <td>Me gusta leer.</td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">adorer</th>
                <td className="fr" lang="fr">Elle adore danser.</td>
                <td>Le encanta bailar.</td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">détester</th>
                <td className="fr" lang="fr">Je déteste cuisiner.</td>
                <td>Odio cocinar.</td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">préférer</th>
                <td className="fr" lang="fr">Je préfère marcher.</td>
                <td>Prefiero caminar.</td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">ne pas aimer</th>
                <td className="fr" lang="fr">Tu n’aimes pas chanter.</td>
                <td>No te gusta cantar.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="attention">
          En español, <em>gusta</em> / <em>gustan</em> cambia según lo que te
          gusta: <em>me gusta leer</em>, <em>me gustan los libros</em>. En
          francés, <span className="fr" lang="fr">aimer</span> solo cambia
          según quién habla:{" "}
          <span className="fr" lang="fr">j’aime lire</span>,{" "}
          <span className="fr" lang="fr">j’aime les livres</span>.
        </div>

        <div className="exception">
          en la negación, <span className="fr" lang="fr">ne… pas</span> rodea a{" "}
          <span className="fr" lang="fr">aimer</span> y el infinitivo se queda
          detrás: <span className="fr" lang="fr">je n’aime pas danser</span> (no
          me gusta bailar).
        </div>
      </section>

      <div className="resume" lang="es">
        <h2>En resumen</h2>
        <ul>
          <li>
            La persona es el sujeto:{" "}
            <em>me gusta el café</em> es{" "}
            <span className="fr" lang="fr">j’aime le café</span>.
          </li>
          <li>
            De lo que no te gusta a lo que te encanta:{" "}
            <span className="fr" lang="fr">détester</span>,{" "}
            <span className="fr" lang="fr">ne pas aimer</span>,{" "}
            <span className="fr" lang="fr">aimer bien</span>,{" "}
            <span className="fr" lang="fr">aimer</span>,{" "}
            <span className="fr" lang="fr">aimer beaucoup</span>,{" "}
            <span className="fr" lang="fr">adorer</span>; y{" "}
            <span className="fr" lang="fr">préférer</span> para elegir.
          </li>
          <li>
            Después de estos verbos va{" "}
            <span className="fr" lang="fr">le</span>,{" "}
            <span className="fr" lang="fr">la</span>,{" "}
            <span className="fr" lang="fr">l’</span> o{" "}
            <span className="fr" lang="fr">les</span>, no{" "}
            <span className="fr" lang="fr">un</span> ni{" "}
            <span className="fr" lang="fr">du</span>.
          </li>
          <li>
            En la negación el artículo se queda:{" "}
            <span className="fr" lang="fr">je n’aime pas le café</span>.
          </li>
          <li>
            Para una actividad, un infinitivo sin nada delante:{" "}
            <span className="fr" lang="fr">j’aime lire</span>.
          </li>
        </ul>
      </div>
    </article>
  );
}
