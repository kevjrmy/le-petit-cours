import Link from "next/link";
import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";

const PATH = "/grammaire/les-articles-indefinis";

export const metadata = lessonMetadata(PATH);

export default function Page() {
  return (
    <article className="prose">
      <PageHeader path={PATH} />

      <section lang="es">
        <h2>
          <span className="fr" lang="fr">un</span>,{" "}
          <span className="fr" lang="fr">une</span>,{" "}
          <span className="fr" lang="fr">des</span>
        </h2>

        <div className="rule">
          El artículo indefinido presenta una cosa nueva. Es el «un, una, unos,
          unas» del español. Tiene tres formas:{" "}
          <span className="fr" lang="fr">un</span>,{" "}
          <span className="fr" lang="fr">une</span> y{" "}
          <span className="fr" lang="fr">des</span> en plural, para los dos
          géneros.
        </div>

        <div className="table-wrap">
          <table>
            <caption>Las tres formas y el nombre que decide cada una</caption>
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
                <th scope="row">masculino singular</th>
                <td className="fr" lang="fr">un</td>
                <td className="fr" lang="fr">Il y a un problème.</td>
                <td>Hay un problema.</td>
              </tr>
              <tr>
                <th scope="row">femenino singular</th>
                <td className="fr" lang="fr">une</td>
                <td className="fr" lang="fr">J’ai une question.</td>
                <td>Tengo una pregunta.</td>
              </tr>
              <tr>
                <th scope="row">plural, los dos géneros</th>
                <td className="fr" lang="fr">des</td>
                <td className="fr" lang="fr">Elle achète des livres.</td>
                <td>Ella compra libros.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="attention">
          <span className="fr" lang="fr">des</span> es el plural de{" "}
          <span className="fr" lang="fr">un</span> y{" "}
          <span className="fr" lang="fr">une</span>, y es obligatorio. En
          español muchas veces no dices nada: <em>compro manzanas</em>. En
          francés siempre hay un artículo:{" "}
          <span className="fr" lang="fr">j’achète des pommes</span>.{" "}
          <span className="fr" lang="fr">j’achète pommes</span> no existe. Es un
          olvido muy frecuente: falta una palabra entera.
        </div>

        <p>
          Después de una negación, <span className="fr" lang="fr">un</span>,{" "}
          <span className="fr" lang="fr">une</span> y{" "}
          <span className="fr" lang="fr">des</span> pasan a{" "}
          <span className="fr" lang="fr">de</span>:{" "}
          <span className="fr" lang="fr">je n’ai pas de voiture</span> (no
          tengo coche). Con <span className="fr" lang="fr">c’est</span> no
          cambia: <span className="fr" lang="fr">ce n’est pas un chien</span>{" "}
          (no es un perro). La regla completa está en{" "}
          <Link href="/grammaire/la-negation" lang="fr">La négation</Link>.
        </p>
      </section>

      <section lang="es">
        <h2>
          <span className="fr" lang="fr">un</span> presenta,{" "}
          <span className="fr" lang="fr">le</span> señala
        </h2>

        <div className="rule">
          La primera vez que sale una cosa, va con{" "}
          <span className="fr" lang="fr">un</span> o{" "}
          <span className="fr" lang="fr">une</span>. Después, todos saben cuál
          es, y vuelve con <span className="fr" lang="fr">le</span> o{" "}
          <span className="fr" lang="fr">la</span>. Es igual que en español.
        </div>

        <div className="example" lang="fr">
          Hier, j’ai vu <strong>un</strong> chien devant la porte.
          <br />
          Ce matin, <strong>le</strong> chien était encore là.
        </div>

        <p>
          Ayer vi un perro delante de la puerta. Esta mañana el perro todavía
          estaba allí. La misma palabra lleva los dos artículos: lo decide el
          orden de la historia, no el nombre. Las formas de la otra serie están
          en{" "}
          <Link href="/grammaire/les-articles-definis" lang="fr">
            Les articles définis
          </Link>
          .
        </p>

        <div className="attention">
          Después de <span className="fr" lang="fr">c’est</span>, el artículo
          casi siempre está: <span className="fr" lang="fr">c’est un médecin</span>{" "}
          (es médico), <span className="fr" lang="fr">c’est une amie</span> (es
          una amiga). En español dices «es médico», sin artículo. En francés,
          sin artículo, la frase cambia de forma:{" "}
          <span className="fr" lang="fr">il est médecin</span>. Se explica en{" "}
          <Link href="/grammaire/c-est-ce-sont" lang="fr">C’est, ce sont</Link>.
        </div>
      </section>

      <section lang="es">
        <h2>
          ¿<span className="fr" lang="fr">un</span> o{" "}
          <span className="fr" lang="fr">une</span>? Lo que dice el final del
          nombre
        </h2>

        <div className="rule">
          Para elegir entre <span className="fr" lang="fr">un</span> y{" "}
          <span className="fr" lang="fr">une</span> necesitas el género del
          nombre. El final de la palabra lo da muchas veces.
        </div>

        <div className="table-wrap">
          <table>
            <caption>Los finales que anuncian el género del nombre</caption>
            <thead>
              <tr>
                <th scope="col">El final</th>
                <th scope="col">El género</th>
                <th scope="col">Ejemplo</th>
                <th scope="col">En español</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row" className="fr" lang="fr">-tion, -sion</th>
                <td>femenino</td>
                <td className="fr" lang="fr">une question, une décision</td>
                <td>pregunta, decisión</td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">-té</th>
                <td>femenino</td>
                <td className="fr" lang="fr">une université, la santé</td>
                <td>universidad, salud</td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">-ance, -ence</th>
                <td>femenino</td>
                <td className="fr" lang="fr">une chance, la patience</td>
                <td>suerte, paciencia</td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">-ette</th>
                <td>femenino</td>
                <td className="fr" lang="fr">une fourchette, une baguette</td>
                <td>tenedor, barra de pan</td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">-ment</th>
                <td>masculino</td>
                <td className="fr" lang="fr">un moment, un appartement</td>
                <td>momento, piso</td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">-eau</th>
                <td>masculino</td>
                <td className="fr" lang="fr">un bureau, un couteau</td>
                <td>escritorio o despacho, cuchillo</td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">-age</th>
                <td>masculino</td>
                <td className="fr" lang="fr">un fromage, un village</td>
                <td>queso, pueblo</td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">-isme</th>
                <td>masculino</td>
                <td className="fr" lang="fr">un organisme, un mécanisme</td>
                <td>organismo, mecanismo</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p>
          El género francés y el español no siempre coinciden: el español no
          prueba nada. Fíjate en <em>tenedor</em>, masculino en español y{" "}
          <span className="fr" lang="fr">une fourchette</span> en francés.
        </p>

        <div className="exception">
          casi todas las filas tienen excepciones, y las más comunes se
          aprenden de memoria. <span className="fr" lang="fr">le silence</span>{" "}
          (silencio), <span className="fr" lang="fr">le côté</span> (lado)
          y <span className="fr" lang="fr">l’été</span> (verano) son
          masculinos aunque acaben como un femenino;{" "}
          <span className="fr" lang="fr">l’eau</span> (agua),{" "}
          <span className="fr" lang="fr">la peau</span> (piel),{" "}
          <span className="fr" lang="fr">la page</span> (página),{" "}
          <span className="fr" lang="fr">la plage</span> (playa) e{" "}
          <span className="fr" lang="fr">l’image</span> (imagen) son
          femeninos.
        </div>

        <div className="attention">
          El género no siempre es el del español, aunque la palabra se parezca
          o sea la misma: <em>el mar</em> es{" "}
          <span className="fr" lang="fr">la mer</span> (femenino) y{" "}
          <em>la sal</em> es <span className="fr" lang="fr">le sel</span>{" "}
          (masculino). Cuando el final no dice nada, aprende el nombre con su
          artículo. Por eso el diccionario escribe siempre{" "}
          <span className="fr" lang="fr">n. m.</span> o{" "}
          <span className="fr" lang="fr">n. f.</span> junto a la palabra.
        </div>
      </section>

      <div className="resume" lang="es">
        <h2>En resumen</h2>
        <ul>
          <li>
            Tres formas: <span className="fr" lang="fr">un</span>,{" "}
            <span className="fr" lang="fr">une</span> y{" "}
            <span className="fr" lang="fr">des</span> en plural, para los dos
            géneros.
          </li>
          <li>
            <span className="fr" lang="fr">des</span> es el plural de{" "}
            <span className="fr" lang="fr">un</span> y{" "}
            <span className="fr" lang="fr">une</span> y no se puede quitar:{" "}
            <em>compro manzanas</em> es{" "}
            <span className="fr" lang="fr">j’achète des pommes</span>.
          </li>
          <li>
            La primera vez, <span className="fr" lang="fr">un</span>; después,{" "}
            <span className="fr" lang="fr">le</span>. Lo decide el orden de la
            historia.
          </li>
          <li>
            El final de la palabra anuncia muchas veces el género:{" "}
            <span className="fr" lang="fr">-tion</span>,{" "}
            <span className="fr" lang="fr">-té</span>,{" "}
            <span className="fr" lang="fr">-ance</span>,{" "}
            <span className="fr" lang="fr">-ette</span> son femeninos;{" "}
            <span className="fr" lang="fr">-ment</span>,{" "}
            <span className="fr" lang="fr">-eau</span>,{" "}
            <span className="fr" lang="fr">-age</span>,{" "}
            <span className="fr" lang="fr">-isme</span> son masculinos.
          </li>
          <li>
            Si el final no dice nada, aprende el nombre con su artículo.
          </li>
        </ul>
      </div>
    </article>
  );
}
