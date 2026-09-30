import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";

const PATH = "/grammaire/poser-une-question";

export const metadata = lessonMetadata(PATH);

export default function Page() {
  return (
    <article className="prose">
      <PageHeader path={PATH} />

      <section lang="es">
        <h2>Preguntar «sí o no»: tres formas</h2>

        <div className="rule">
          Para una pregunta con respuesta «sí» o «no», tienes tres maneras.
          La más fácil: dices la frase normal y{" "}
          <strong>subes la voz al final</strong>. La segunda: pones{" "}
          <strong lang="fr">est-ce que</strong> al principio y el resto no
          cambia. La tercera existe, pero es para más adelante.
        </div>

        <div className="table-wrap">
          <table>
            <caption>Las tres formas de preguntar «sí o no»</caption>
            <thead>
              <tr>
                <th scope="col">Forma</th>
                <th scope="col">Cómo se hace</th>
                <th scope="col">Ejemplo</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">la entonación</th>
                <td>la frase normal, con la voz que sube al final</td>
                <td className="fr" lang="fr">Tu parles français&nbsp;?</td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">est-ce que</th>
                <td>
                  <span className="fr" lang="fr">est-ce que</span> + la frase
                  normal
                </td>
                <td className="fr" lang="fr">
                  Est-ce que tu parles français&nbsp;?
                </td>
              </tr>
              <tr>
                <th scope="row">la inversión</th>
                <td>el verbo va antes del sujeto: formal, para más adelante</td>
                <td className="fr" lang="fr">Parles-tu français&nbsp;?</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p>
          Con las dos primeras, la respuesta es{" "}
          <span className="fr" lang="fr">oui</span> o{" "}
          <span className="fr" lang="fr">non</span>. Si el sujeto empieza por
          vocal, <span className="fr" lang="fr">que</span> se une a él con
          apóstrofo:{" "}
          <span className="fr" lang="fr">Est-ce qu’elle habite ici&nbsp;?</span>
        </p>

        <div className="attention">
          En español, una pregunta se reconoce por los signos{" "}
          <em>¿ ?</em>. En francés{" "}
          <strong>no se escribe el signo de apertura</strong>, y{" "}
          <strong>hay un espacio antes del signo de cierre</strong>:{" "}
          <span className="fr" lang="fr">Tu parles français&nbsp;?</span>, no{" "}
          <span className="fr" lang="fr">¿Tu parles français?</span>. Ese
          espacio es el que no se puede partir al cambiar de línea.
        </div>
      </section>

      <section lang="es">
        <h2>Las palabras para preguntar</h2>

        <div className="rule">
          Para preguntar por algo concreto usas una palabra interrogativa. Hay
          tres maneras. En la conversación va{" "}
          <strong>al final</strong>:{" "}
          <span className="fr" lang="fr">Tu habites où&nbsp;?</span> En una
          frase más cuidada va <strong>al principio</strong>, seguida de{" "}
          <span className="fr" lang="fr">est-ce que</span>:{" "}
          <span className="fr" lang="fr">Où est-ce que tu habites&nbsp;?</span>{" "}
          Al hablar también es muy corriente ponerla{" "}
          <strong>al principio sin</strong>{" "}
          <span className="fr" lang="fr">est-ce que</span>:{" "}
          <span className="fr" lang="fr">Où tu habites&nbsp;?</span>
        </div>

        <div className="table-wrap">
          <table>
            <caption>Las palabras interrogativas más útiles</caption>
            <thead>
              <tr>
                <th scope="col">Palabra</th>
                <th scope="col">En español</th>
                <th scope="col">Ejemplo</th>
                <th scope="col">Respuesta</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row" className="fr" lang="fr">qui</th>
                <td>quién</td>
                <td className="fr" lang="fr">Tu parles à qui&nbsp;?</td>
                <td className="fr" lang="fr">À ma sœur.</td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">où</th>
                <td>dónde</td>
                <td className="fr" lang="fr">Où est-ce que tu habites&nbsp;?</td>
                <td className="fr" lang="fr">À Madrid.</td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">quand</th>
                <td>cuándo</td>
                <td className="fr" lang="fr">Tu pars quand&nbsp;?</td>
                <td className="fr" lang="fr">Demain.</td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">comment</th>
                <td>cómo</td>
                <td className="fr" lang="fr">Comment tu t’appelles&nbsp;?</td>
                <td className="fr" lang="fr">Je m’appelle Lucas.</td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">combien</th>
                <td>cuánto</td>
                <td className="fr" lang="fr">Ça coûte combien&nbsp;?</td>
                <td className="fr" lang="fr">Dix euros.</td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">pourquoi</th>
                <td>por qué</td>
                <td className="fr" lang="fr">Pourquoi tu pars&nbsp;?</td>
                <td className="fr" lang="fr">Parce que je travaille.</td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">qu’est-ce que</th>
                <td>qué</td>
                <td className="fr" lang="fr">Qu’est-ce que tu manges&nbsp;?</td>
                <td className="fr" lang="fr">Une pomme.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p>
          En español, <em>quién</em>, <em>dónde</em>, <em>cuándo</em>,{" "}
          <em>cómo</em> y <em>cuánto</em> llevan tilde. En francés{" "}
          <strong>ninguna palabra lleva acento para preguntar</strong>: se
          escribe <span className="fr" lang="fr">qui</span>,{" "}
          <span className="fr" lang="fr">quand</span>,{" "}
          <span className="fr" lang="fr">comment</span>. Solo{" "}
          <span className="fr" lang="fr">où</span> lleva un acento, y lo lleva
          siempre, también cuando no preguntas.
        </p>

        <p>
          <span className="fr" lang="fr">pourquoi</span> pregunta y{" "}
          <span className="fr" lang="fr">parce que</span> responde. Son dos
          palabras distintas, como «por qué» y «porque»:{" "}
          <span className="fr" lang="fr">
            Pourquoi tu étudies le français&nbsp;? – Parce que j’aime ça.
          </span>
        </p>

        <div className="attention">
          <span className="fr" lang="fr">qu’est-ce que</span> es el «qué» de
          una pregunta sobre una cosa, y va siempre al principio:{" "}
          <span className="fr" lang="fr">Qu’est-ce que tu fais&nbsp;?</span>{" "}
          (¿qué haces?). No existe{" "}
          <span className="fr" lang="fr">Tu fais qu’est-ce que&nbsp;?</span>.
          Al final de la frase, «qué» se dice{" "}
          <span className="fr" lang="fr">quoi</span>:{" "}
          <span className="fr" lang="fr">Tu fais quoi&nbsp;?</span>
        </div>
      </section>

      <section lang="es">
        <h2>
          «Qué» delante de un nombre:{" "}
          <span className="fr" lang="fr">quel</span>
        </h2>

        <div className="rule">
          Cuando «qué» va delante de un nombre, en francés se dice{" "}
          <strong lang="fr">quel</strong>, no{" "}
          <span className="fr" lang="fr">que</span>. Concuerda con el nombre,
          como un adjetivo: <span className="fr" lang="fr">quel</span>,{" "}
          <span className="fr" lang="fr">quelle</span>,{" "}
          <span className="fr" lang="fr">quels</span>,{" "}
          <span className="fr" lang="fr">quelles</span>.
        </div>

        <div className="table-wrap">
          <table>
            <caption>«<span className="fr" lang="fr">Quel</span>» concuerda con el nombre que sigue</caption>
            <thead>
              <tr>
                <th scope="col">Forma</th>
                <th scope="col">El nombre es</th>
                <th scope="col">Ejemplo</th>
                <th scope="col">En español</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row" className="fr" lang="fr">quel</th>
                <td>masculino, uno</td>
                <td className="fr" lang="fr">Tu as quel âge&nbsp;?</td>
                <td>¿Qué edad tienes?</td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">quelle</th>
                <td>femenino, una</td>
                <td className="fr" lang="fr">Quelle heure est-il&nbsp;?</td>
                <td>¿Qué hora es?</td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">quels</th>
                <td>masculino, varios</td>
                <td className="fr" lang="fr">Tu aimes quels films&nbsp;?</td>
                <td>¿Qué películas te gustan?</td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">quelles</th>
                <td>femenino, varias</td>
                <td className="fr" lang="fr">Quelles langues tu parles&nbsp;?</td>
                <td>¿Qué idiomas hablas?</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p>
          Al hablar, las cuatro formas suenan igual: se distinguen solo al
          escribir (salvo delante de vocal, por la liaison:{" "}
          <span className="fr" lang="fr">quels‿amis</span>). También sirve cuando el verbo es «ser» y quieres decir
          «cuál»:{" "}
          <span className="fr" lang="fr">Quelle est ton adresse&nbsp;?</span>{" "}
          (¿cuál es tu dirección?).
        </p>

        <div className="attention">
          En español dices «¿qué hora es?». En francés{" "}
          <span className="fr" lang="fr">Que heure est-il&nbsp;?</span> no
          existe: se dice{" "}
          <span className="fr" lang="fr">Quelle heure est-il&nbsp;?</span>,
          porque «hora» es <span className="fr" lang="fr">heure</span>, un
          nombre femenino. La frase{" "}
          <span className="fr" lang="fr">Quelle heure est-il&nbsp;?</span> usa
          la inversión de la primera sección, pero es una fórmula fija: apréndela
          tal cual.
        </div>

        <div className="exception">
          <span className="fr" lang="fr">quel</span> va siempre con un nombre
          (<span className="fr" lang="fr">quel âge</span>,{" "}
          <span className="fr" lang="fr">quelle heure</span>). Sin nombre, para
          preguntar por una cosa, se usa{" "}
          <span className="fr" lang="fr">qu’est-ce que</span> o{" "}
          <span className="fr" lang="fr">quoi</span>.
        </div>
      </section>

      <div className="resume" lang="es">
        <h2>En resumen</h2>
        <ul>
          <li>
            Una pregunta «sí o no» se hace con la voz que sube (
            <span className="fr" lang="fr">Tu parles français&nbsp;?</span>) o
            con <span className="fr" lang="fr">est-ce que</span> al principio.
            La inversión existe, pero es formal.
          </li>
          <li>
            En francés no hay <em>¿</em> de apertura, y antes de{" "}
            <em>?</em> va un espacio.
          </li>
          <li>
            <span className="fr" lang="fr">qui</span>,{" "}
            <span className="fr" lang="fr">où</span>,{" "}
            <span className="fr" lang="fr">quand</span>,{" "}
            <span className="fr" lang="fr">comment</span> y{" "}
            <span className="fr" lang="fr">combien</span> van al final al
            hablar, o al principio (con o sin{" "}
            <span className="fr" lang="fr">est-ce que</span>);{" "}
            <span className="fr" lang="fr">pourquoi</span> va al principio.
            Ninguna lleva tilde.
          </li>
          <li>
            <span className="fr" lang="fr">pourquoi</span> pregunta y{" "}
            <span className="fr" lang="fr">parce que</span> responde.
          </li>
          <li>
            «Qué» + nombre es{" "}
            <span className="fr" lang="fr">quel</span>,{" "}
            <span className="fr" lang="fr">quelle</span>,{" "}
            <span className="fr" lang="fr">quels</span> o{" "}
            <span className="fr" lang="fr">quelles</span>, según el nombre;
            suenan igual.
          </li>
        </ul>
      </div>
    </article>
  );
}
