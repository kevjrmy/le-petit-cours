import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";

const PATH = "/grammaire/c-est-ce-sont";

export const metadata = lessonMetadata(PATH);

export default function Page() {
  return (
    <article className="prose">
      <PageHeader path={PATH} />

      <section lang="es">
        <h2>
          Nombrar una cosa, presentar a una persona con{" "}
          <span className="fr" lang="fr">c’est</span>
        </h2>

        <div className="rule">
          Para decir qué es una cosa o quién es una persona, la frase empieza
          por <strong lang="fr">c’est</strong>. Es el «es» del español. El
          nombre que sigue conserva su palabra pequeña (el artículo):{" "}
          <span className="fr" lang="fr">un</span>,{" "}
          <span className="fr" lang="fr">une</span>,{" "}
          <span className="fr" lang="fr">le</span>,{" "}
          <span className="fr" lang="fr">ma</span>.
        </div>

        <div className="example" lang="fr">
          <strong>C’est</strong> un stylo. · <strong>C’est</strong> la gare. ·{" "}
          <strong>C’est</strong> ma sœur. · <strong>C’est</strong> Paul.
        </div>

        <p>
          Es «un bolígrafo», «la estación», «mi hermana» y «Paul». En español
          puedes callar el sujeto: <em>es un libro</em>. En francés no:{" "}
          <span className="fr" lang="fr">c’est un livre</span>.{" "}
          <span className="fr" lang="fr">est un livre</span> no existe.
        </p>

        <p>
          <span className="fr" lang="fr">c’est</span> se escribe siempre con
          apóstrofo: <span className="fr" lang="fr">ce</span> pierde la{" "}
          <em>e</em> delante de <span className="fr" lang="fr">est</span>, y{" "}
          <span className="fr" lang="fr">ce est</span> no existe.
        </p>

        <p>
          La misma frase responde a las dos preguntas que más se hacen al
          llegar a un sitio.
        </p>

        <div className="example" lang="fr">
          Qu’est-ce que c’est ? – <strong>C’est</strong> une clé.
          <br />
          Qui est-ce ? – <strong>C’est</strong> mon voisin.
        </div>

        <p>
          «¿Qué es esto? – Es una llave.» «¿Quién es? – Es mi vecino.»
        </p>

        <div className="attention">
          <span className="fr" lang="fr">c’est</span> no cambia con el género
          del nombre. Se escribe{" "}
          <span className="fr" lang="fr">c’est un livre</span> (es un libro) y{" "}
          <span className="fr" lang="fr">c’est une table</span> (es una mesa):
          la palabra que cambia es la del nombre, nunca{" "}
          <span className="fr" lang="fr">c’est</span>.
        </div>
      </section>

      <section lang="es">
        <h2>
          En plural, y cuando la respuesta es no:{" "}
          <span className="fr" lang="fr">ce sont</span>
        </h2>

        <div className="rule">
          Delante de un nombre en plural se escribe{" "}
          <strong lang="fr">ce sont</strong>. Es el «son» del español. Para
          decir lo contrario, la negación rodea al verbo:{" "}
          <strong lang="fr">ce n’est pas</strong>,{" "}
          <strong lang="fr">ce ne sont pas</strong>.
        </div>

        <div className="table-wrap">
          <table>
            <caption>Las cuatro formas de la frase que presenta algo</caption>
            <thead>
              <tr>
                <th scope="col">El nombre que sigue</th>
                <th scope="col">Se dice que sí</th>
                <th scope="col">Se dice que no</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">uno solo</th>
                <td className="fr" lang="fr">C’est une clé.</td>
                <td className="fr" lang="fr">Ce n’est pas une clé.</td>
              </tr>
              <tr>
                <th scope="row">varios</th>
                <td className="fr" lang="fr">Ce sont des clés.</td>
                <td className="fr" lang="fr">Ce ne sont pas des clés.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p>
          En español: «es una llave», «no es una llave», «son llaves» y «no son
          llaves». El verbo es <span className="fr" lang="fr">être</span> (ser) y
          concuerda con lo que sigue: un nombre en singular pide{" "}
          <span className="fr" lang="fr">est</span>, un nombre en plural pide{" "}
          <span className="fr" lang="fr">sont</span>.
        </p>

        <div className="attention">
          En la conversación se oye mucho{" "}
          <span className="fr" lang="fr">c’est des clés</span>; en un texto
          cuidado se escribe{" "}
          <span className="fr" lang="fr">ce sont des clés</span>.
        </div>
      </section>

      <section lang="es">
        <h2>
          ¿<span className="fr" lang="fr">c’est</span> o{" "}
          <span className="fr" lang="fr">il est</span>?
        </h2>

        <div className="rule">
          Lo que viene después decide. Tres casos. Un nombre con su artículo
          (<span className="fr" lang="fr">un</span>,{" "}
          <span className="fr" lang="fr">une</span>,{" "}
          <span className="fr" lang="fr">mon</span>,{" "}
          <span className="fr" lang="fr">le</span>): <strong lang="fr">c’est</strong>.
          Una profesión sola, o un adjetivo que describe a una persona o cosa
          ya nombrada: <strong lang="fr">il est</strong> o{" "}
          <strong lang="fr">elle est</strong>. Un nombre propio o una opinión
          sobre la situación: <strong lang="fr">c’est</strong>.
        </div>

        <div className="table-wrap">
          <table>
            <caption>Lo que sigue al verbo decide la forma que se escribe</caption>
            <thead>
              <tr>
                <th scope="col">La forma</th>
                <th scope="col">Lo que sigue</th>
                <th scope="col">Ejemplo</th>
                <th scope="col">En español</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row" className="fr" lang="fr">
                  c’est
                </th>
                <td>una palabra pequeña y un nombre</td>
                <td className="fr" lang="fr">
                  C’est un médecin. C’est ma voisine.
                </td>
                <td>Es un médico. Es mi vecina.</td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">
                  il est / elle est
                </th>
                <td>una profesión, sin nada delante</td>
                <td className="fr" lang="fr">
                  Il est médecin. Elle est étudiante.
                </td>
                <td>Es médico. Es estudiante.</td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">
                  il est / elle est
                </th>
                <td>un adjetivo que concuerda con la persona</td>
                <td className="fr" lang="fr">
                  Il est grand. Elle est grande.
                </td>
                <td>Es alto. Es alta.</td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">
                  c’est
                </th>
                <td>un adjetivo, para dar una opinión</td>
                <td className="fr" lang="fr">C’est bon. C’est difficile.</td>
                <td>Está bien / es bueno. Es difícil.</td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">
                  ils sont / elles sont
                </th>
                <td>el plural de una profesión</td>
                <td className="fr" lang="fr">
                  Ils sont médecins. Elles sont étudiantes.
                </td>
                <td>Son médicos. Son estudiantes.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="attention">
          En español dices «es médico» y también «es un médico». En francés la
          frase cambia de forma: sin palabra pequeña, se dice{" "}
          <span className="fr" lang="fr">il est médecin</span>; con ella,{" "}
          <span className="fr" lang="fr">c’est un médecin</span>.{" "}
          <span className="fr" lang="fr">il est un médecin</span> no existe, y
          tampoco <span className="fr" lang="fr">c’est médecin</span>.
        </div>

        <div className="exception">
          después de <span className="fr" lang="fr">c’est</span>, el adjetivo
          no concuerda nunca. Se escribe{" "}
          <span className="fr" lang="fr">c’est bon</span> incluso hablando de
          una tarta, porque el adjetivo no describe la tarta: da tu opinión.
          Para describir la tarta misma, se dice{" "}
          <span className="fr" lang="fr">elle est bonne</span> (la tarta está
          buena).
        </div>
      </section>

      <div className="resume" lang="es">
        <h2>En resumen</h2>
        <ul>
          <li>
            <span className="fr" lang="fr">c’est</span> sirve para nombrar una
            cosa y presentar a una persona, y se escribe siempre con apóstrofo.
          </li>
          <li>
            Delante de un nombre en plural, al escribir, se usa{" "}
            <span className="fr" lang="fr">ce sont</span> y no{" "}
            <span className="fr" lang="fr">c’est</span>.
          </li>
          <li>
            La negación rodea al verbo:{" "}
            <span className="fr" lang="fr">ce n’est pas</span>,{" "}
            <span className="fr" lang="fr">ce ne sont pas</span>.
          </li>
          <li>
            Un artículo delante del nombre, un nombre propio o una opinión
            piden <span className="fr" lang="fr">c’est</span>; una profesión
            sola o un adjetivo que describe a alguien piden{" "}
            <span className="fr" lang="fr">il est</span> o{" "}
            <span className="fr" lang="fr">elle est</span>.
          </li>
          <li>
            Después de <span className="fr" lang="fr">c’est</span>, el
            adjetivo se queda en masculino:{" "}
            <span className="fr" lang="fr">c’est bon</span>.
          </li>
        </ul>
      </div>
    </article>
  );
}
