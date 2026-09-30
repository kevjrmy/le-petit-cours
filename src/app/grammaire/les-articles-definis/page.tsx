import Link from "next/link";
import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";

const PATH = "/grammaire/les-articles-definis";

export const metadata = lessonMetadata(PATH);

export default function Page() {
  return (
    <article className="prose">
      <PageHeader path={PATH} />

      <section lang="es">
        <h2>Cuatro formas, y las decide el nombre</h2>

        <div className="rule">
          El artículo definido va delante del nombre. Es el «el, la, los, las»
          del español. En francés tiene cuatro formas:{" "}
          <span className="fr" lang="fr">le</span>,{" "}
          <span className="fr" lang="fr">la</span>,{" "}
          <span className="fr" lang="fr">l’</span> y{" "}
          <span className="fr" lang="fr">les</span>.
        </div>

        <div className="table-wrap">
          <table>
            <caption>Las cuatro formas y el nombre que decide cada una</caption>
            <thead>
              <tr>
                <th scope="col">El nombre</th>
                <th scope="col">La forma</th>
                <th scope="col">Ejemplo</th>
                <th scope="col">En español</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">masculino</th>
                <td className="fr" lang="fr">le</td>
                <td className="fr" lang="fr">Le train part à huit heures.</td>
                <td>El tren sale a las ocho.</td>
              </tr>
              <tr>
                <th scope="row">femenino</th>
                <td className="fr" lang="fr">la</td>
                <td className="fr" lang="fr">La porte est fermée.</td>
                <td>La puerta está cerrada.</td>
              </tr>
              <tr>
                <th scope="row">delante de vocal o h muda</th>
                <td className="fr" lang="fr">l’</td>
                <td className="fr" lang="fr">L’école ouvre à neuf heures.</td>
                <td>La escuela abre a las nueve.</td>
              </tr>
              <tr>
                <th scope="row">plural</th>
                <td className="fr" lang="fr">les</td>
                <td className="fr" lang="fr">Les enfants jouent dehors.</td>
                <td>Los niños juegan fuera.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p>
          Delante de una vocal (a, e, i, o, u), <span className="fr" lang="fr">le</span> y{" "}
          <span className="fr" lang="fr">la</span> pierden la vocal y ponen un
          apóstrofo. <span className="fr" lang="fr">la école</span> no existe:
          se escribe <span className="fr" lang="fr">l’école</span>. Se pronuncia
          todo junto, como una sola palabra. <span className="fr" lang="fr">les</span> no cambia al escribirlo: es igual
          para masculino y femenino.
        </p>

        <div className="attention">
          <span className="fr" lang="fr">l’</span> esconde el género.{" "}
          <span className="fr" lang="fr">l’école</span> es femenino y{" "}
          <span className="fr" lang="fr">l’hôtel</span> es masculino, pero el
          artículo no lo dice. Aprende el nombre con su artículo completo:{" "}
          <span className="fr" lang="fr">une école</span> (una escuela),{" "}
          <span className="fr" lang="fr">un hôtel</span> (un hotel). Y el género
          no siempre es el del español: <em>la leche</em> se dice{" "}
          <span className="fr" lang="fr">le lait</span> (masculino).
        </div>

        <div className="exception">
          delante de unas pocas palabras con h no hay apóstrofo:{" "}
          <span className="fr" lang="fr">le héros</span> (héroe),{" "}
          <span className="fr" lang="fr">la hauteur</span> (altura),{" "}
          <span className="fr" lang="fr">le haricot</span> (judía). Son pocas
          y se aprenden una por una.
        </div>
      </section>

      <section lang="es">
        <h2>
          Después de <span className="fr" lang="fr">à</span> y{" "}
          <span className="fr" lang="fr">de</span>, el artículo se junta
        </h2>

        <div className="rule">
          En español pasa lo mismo: a + el = <em>al</em>, de + el = <em>del</em>.
          En francés, <span className="fr" lang="fr">à</span> y{" "}
          <span className="fr" lang="fr">de</span> se juntan con{" "}
          <span className="fr" lang="fr">le</span> y con{" "}
          <span className="fr" lang="fr">les</span> y forman una sola palabra:{" "}
          <strong lang="fr">au</strong>, <strong lang="fr">aux</strong>,{" "}
          <strong lang="fr">du</strong>, <strong lang="fr">des</strong>. Con{" "}
          <span className="fr" lang="fr">la</span> y{" "}
          <span className="fr" lang="fr">l’</span> no cambia nada.
        </div>

        <div className="table-wrap">
          <table>
            <caption>
              Lo que pasa con <span className="fr" lang="fr">à</span> y{" "}
              <span className="fr" lang="fr">de</span> delante de cada artículo
            </caption>
            <thead>
              <tr>
                <th scope="col">El artículo</th>
                <th scope="col">
                  Con <span className="fr" lang="fr">à</span> (a)
                </th>
                <th scope="col">
                  Con <span className="fr" lang="fr">de</span> (de)
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row" className="fr" lang="fr">le</th>
                <td>
                  <span className="fr" lang="fr">au cinéma</span> (al cine)
                </td>
                <td>
                  <span className="fr" lang="fr">du cinéma</span> (del cine)
                </td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">la</th>
                <td>
                  <span className="fr" lang="fr">à la gare</span> (a la estación)
                </td>
                <td>
                  <span className="fr" lang="fr">de la gare</span> (de la estación)
                </td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">l’</th>
                <td>
                  <span className="fr" lang="fr">à l’école</span> (a la escuela)
                </td>
                <td>
                  <span className="fr" lang="fr">de l’école</span> (de la escuela)
                </td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">les</th>
                <td>
                  <span className="fr" lang="fr">aux enfants</span> (a los niños)
                </td>
                <td>
                  <span className="fr" lang="fr">des enfants</span> (de los niños)
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="attention">
          <span className="fr" lang="fr">à le</span> y{" "}
          <span className="fr" lang="fr">de le</span> no se escriben nunca. La
          forma junta es obligatoria:{" "}
          <span className="fr" lang="fr">je vais au marché</span> (voy al
          mercado), <span className="fr" lang="fr">la voiture du voisin</span> (el
          coche del vecino).
        </div>

        <p>
          Para las preposiciones con países y ciudades, mira{" "}
          <Link href="/astuces/a-en-au-aux" lang="fr">à, en, au ou aux ?</Link>.
        </p>

        <div className="astuce">
          <p className="astuce-hook">
            <strong lang="fr">du</strong> y <strong lang="fr">des</strong> tienen
            dos vidas.
          </p>
          <p>
            <span className="fr" lang="fr">la porte du garage</span> (la puerta
            del garaje) es <span className="fr" lang="fr">de</span> +{" "}
            <span className="fr" lang="fr">le</span>. Pero{" "}
            <span className="fr" lang="fr">je bois du café</span> (bebo café) es
            otra cosa: es un artículo distinto, que se explica en{" "}
            <Link href="/grammaire/les-articles-partitifs" lang="fr">
              Les articles partitifs
            </Link>
            . Se escriben igual, y solo la frase te dice cuál es.
          </p>
        </div>
      </section>

      <section lang="es">
        <h2>Tres casos en que conviene fijarse</h2>

        <div className="rule">
          El artículo definido es obligatorio en tres casos: delante de una
          cosa en general, delante del nombre de un país y delante de un día que
          se repite cada semana. En español a veces no lo pones (<em>Francia es
          grande</em>): por eso se olvida.
        </div>

        <div className="table-wrap">
          <table>
            <caption>Tres casos en los que el artículo no se adivina</caption>
            <thead>
              <tr>
                <th scope="col">El caso</th>
                <th scope="col">Ejemplo</th>
                <th scope="col">En español</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">una cosa en general</th>
                <td className="fr" lang="fr">J’aime le chocolat.</td>
                <td>Me gusta el chocolate.</td>
              </tr>
              <tr>
                <th scope="row">un país</th>
                <td className="fr" lang="fr">La France est grande.</td>
                <td>Francia es grande. (sin artículo)</td>
              </tr>
              <tr>
                <th scope="row">un día que se repite</th>
                <td className="fr" lang="fr">Le lundi, je travaille chez moi.</td>
                <td>Los lunes trabajo en casa.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="attention">
          <span className="fr" lang="fr">j’aime chocolat</span> no existe.
          En estos tres casos hace falta un artículo.
        </div>

        <div className="exception">
          <span className="fr" lang="fr">lundi</span> sin artículo es un lunes
          concreto:{" "}
          <span className="fr" lang="fr">lundi, je pars à Paris</span> (el lunes
          me voy a París). <span className="fr" lang="fr">le lundi, je pars à Paris</span>{" "}
          es todos los lunes. Y después de <span className="fr" lang="fr">en</span>,
          el país no lleva artículo:{" "}
          <span className="fr" lang="fr">en France</span> (en Francia).
        </div>
      </section>

      <div className="resume" lang="es">
        <h2>En resumen</h2>
        <ul>
          <li>
            Cuatro formas: <span className="fr" lang="fr">le</span>,{" "}
            <span className="fr" lang="fr">la</span>,{" "}
            <span className="fr" lang="fr">l’</span> delante de vocal y{" "}
            <span className="fr" lang="fr">les</span> en plural.
          </li>
          <li>
            <span className="fr" lang="fr">l’</span> esconde el género: aprende
            el nombre con <span className="fr" lang="fr">un</span> o{" "}
            <span className="fr" lang="fr">une</span>.
          </li>
          <li>
            <span className="fr" lang="fr">à</span> y{" "}
            <span className="fr" lang="fr">de</span> se juntan con{" "}
            <span className="fr" lang="fr">le</span> y{" "}
            <span className="fr" lang="fr">les</span>:{" "}
            <span className="fr" lang="fr">au</span>,{" "}
            <span className="fr" lang="fr">aux</span>,{" "}
            <span className="fr" lang="fr">du</span>,{" "}
            <span className="fr" lang="fr">des</span>.
          </li>
          <li>
            Con <span className="fr" lang="fr">la</span> y{" "}
            <span className="fr" lang="fr">l’</span> no se junta nada:{" "}
            <span className="fr" lang="fr">à la gare</span>,{" "}
            <span className="fr" lang="fr">de l’école</span>.
          </li>
          <li>
            Una cosa en general, un país, un día que se repite: el artículo es
            obligatorio.
          </li>
        </ul>
      </div>
    </article>
  );
}
