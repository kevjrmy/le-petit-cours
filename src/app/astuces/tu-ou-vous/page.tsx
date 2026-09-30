import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";

const PATH = "/astuces/tu-ou-vous";

export const metadata = lessonMetadata(PATH);

export default function Page() {
  return (
    <article className="prose">
      <PageHeader path={PATH} />

      <section lang="es">
        <h2>¿Tú o usted? En francés, casi siempre «<span className="fr" lang="fr">vous</span>»</h2>

        <div className="astuce">
          <p className="astuce-hook">
            Si no es un amigo, un familiar o un niño, di{" "}
            <strong lang="fr">vous</strong>. Y si hablas a varias personas, también{" "}
            <strong lang="fr">vous</strong>.
          </p>
          <p>
            En España casi todo el mundo se tutea, así que el <em>usted</em>{" "}
            se usa poco. En Francia es al revés: con un desconocido, en una
            tienda, con un profesor o con tu jefe, se dice{" "}
            <span className="fr" lang="fr">vous</span>. Además,{" "}
            <span className="fr" lang="fr">vous</span> es también el plural
            (<em>vosotros</em>): no existe una tercera palabra.
          </p>
        </div>

        <div className="table-wrap">
          <table>
            <caption>Con quién usas «<span className="fr" lang="fr">tu</span>» y con quién usas «<span className="fr" lang="fr">vous</span>»</caption>
            <thead>
              <tr>
                <th scope="col">Hablas con…</th>
                <th scope="col">Dices</th>
                <th scope="col">Ejemplo</th>
                <th scope="col">En español</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">un amigo, un familiar, un niño</th>
                <td className="fr" lang="fr">tu</td>
                <td className="fr" lang="fr">Tu parles français ?</td>
                <td>¿Hablas francés?</td>
              </tr>
              <tr>
                <th scope="row">un desconocido, un vendedor, un profesor</th>
                <td className="fr" lang="fr">vous</td>
                <td className="fr" lang="fr">Vous parlez français ?</td>
                <td>¿Habla usted francés?</td>
              </tr>
              <tr>
                <th scope="row">varias personas, aunque sean amigas</th>
                <td className="fr" lang="fr">vous</td>
                <td className="fr" lang="fr">Vous venez demain ?</td>
                <td>¿Venís mañana?</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p>
          El error típico: a la panadera le dices{" "}
          <span className="fr" lang="fr">Tu as du pain ?</span> por costumbre. Es
          lo correcto con un amigo, pero con ella suena grosero. Se dice{" "}
          <span className="fr" lang="fr">Vous avez du pain ?</span>
        </p>

        <div className="exception">
          entre jóvenes, entre compañeros de trabajo y en muchos ambientes
          informales se usa <span className="fr" lang="fr">tu</span> aunque no
          os conozcáis. Si dudas, empieza con{" "}
          <span className="fr" lang="fr">vous</span>: si te conviene el{" "}
          <span className="fr" lang="fr">tu</span>, la otra persona te lo dirá
          (<span className="fr" lang="fr">On peut se tutoyer ?</span>). Nunca
          empieces tú con <span className="fr" lang="fr">tu</span> a alguien
          mayor o con autoridad.
        </div>
      </section>

      <section lang="es">
        <h2>Saludar y despedirse</h2>

        <div className="astuce">
          <p className="astuce-hook">
            Al entrar en un sitio, saluda siempre:{" "}
            <strong lang="fr">Bonjour</strong>. Es obligatorio, y más aún en una
            tienda.
          </p>
          <p>
            Entrar en una panadería o en una consulta sin decir{" "}
            <span className="fr" lang="fr">bonjour</span> se toma por una falta
            de educación, aunque después seas muy amable. Al salir, se dan las
            gracias y se dice adiós.
          </p>
        </div>

        <div className="table-wrap">
          <table>
            <caption>Las fórmulas para saludar y despedirse, y cuándo se dicen</caption>
            <thead>
              <tr>
                <th scope="col">Expresión</th>
                <th scope="col">Cuándo</th>
                <th scope="col">Ejemplo</th>
                <th scope="col">En español</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row" className="fr" lang="fr">bonjour</th>
                <td>de día, con cualquiera</td>
                <td className="fr" lang="fr">Bonjour, madame.</td>
                <td>Buenos días / buenas tardes, señora.</td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">bonsoir</th>
                <td>al caer la tarde y de noche</td>
                <td className="fr" lang="fr">Bonsoir, monsieur.</td>
                <td>Buenas tardes / buenas noches, señor.</td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">salut</th>
                <td>solo con «<span className="fr" lang="fr">tu</span>»: hola y adiós</td>
                <td className="fr" lang="fr">Salut, Léa !</td>
                <td>¡Hola, Léa! / ¡Chao, Léa!</td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">au revoir</th>
                <td>adiós, con cualquiera</td>
                <td className="fr" lang="fr">Au revoir, monsieur.</td>
                <td>Adiós, señor.</td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">bonne journée</th>
                <td>al despedirte, de día</td>
                <td className="fr" lang="fr">Merci, bonne journée !</td>
                <td>Gracias, ¡buen día!</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="attention">
          <span className="fr" lang="fr">bonjour</span> sirve por la mañana y
          por la tarde: no existe un «buenas tardes» aparte. Hacia las seis, se
          cambia a <span className="fr" lang="fr">bonsoir</span>. Y por la
          noche, al despedirte, se dice <span className="fr" lang="fr">bonne
          soirée</span>.
        </div>

        <div className="exception">
          <span className="fr" lang="fr">salut</span> es muy cercano: con un
          desconocido o con un profesor no se dice.{" "}
          <span className="fr" lang="fr">bonne nuit</span> no es un saludo, solo
          se dice a quien se va a dormir.
        </div>
      </section>

      <section lang="es">
        <h2>Dar las gracias y pedir perdón</h2>

        <div className="astuce">
          <p className="astuce-hook">
            En español, <em>perdón</em> lo hace todo. En francés hay tres
            palabras:{" "}
            <strong lang="fr">pardon</strong>,{" "}
            <strong lang="fr">excusez-moi</strong> y{" "}
            <strong lang="fr">désolé</strong>.
          </p>
          <p>
            Elige según lo que pasa: un pequeño choque, una pregunta a un
            desconocido, o un error del que lamentas las consecuencias.
          </p>
        </div>

        <div className="table-wrap">
          <table>
            <caption>Cuándo usar cada palabra para dar las gracias o pedir perdón</caption>
            <thead>
              <tr>
                <th scope="col">Expresión</th>
                <th scope="col">Cuándo</th>
                <th scope="col">Ejemplo</th>
                <th scope="col">En español</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row" className="fr" lang="fr">merci</th>
                <td>dar las gracias</td>
                <td className="fr" lang="fr">Merci beaucoup !</td>
                <td>¡Muchas gracias!</td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">de rien</th>
                <td>responder a «<span className="fr" lang="fr">merci</span>»</td>
                <td className="fr" lang="fr">Merci. – De rien.</td>
                <td>Gracias. – De nada.</td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">pardon</th>
                <td>un roce, un paso, no haber oído</td>
                <td className="fr" lang="fr">Pardon ? Vous pouvez répéter ?</td>
                <td>¿Perdón? ¿Puede repetir?</td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">excusez-moi</th>
                <td>llamar la atención, molestar</td>
                <td className="fr" lang="fr">Excusez-moi, où est la gare ?</td>
                <td>Perdone, ¿dónde está la estación?</td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">désolé</th>
                <td>lamentar de verdad</td>
                <td className="fr" lang="fr">Je suis désolé, je suis en retard.</td>
                <td>Lo siento, llego tarde.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="exception">
          <span className="fr" lang="fr">désolé</span> concuerda con quien
          habla: una mujer escribe{" "}
          <span className="fr" lang="fr">désolée</span>. Y con «<span className="fr" lang="fr">vous</span>» se
          responde a <span className="fr" lang="fr">merci</span> con{" "}
          <span className="fr" lang="fr">je vous en prie</span>, más cortés que{" "}
          <span className="fr" lang="fr">de rien</span>.
        </div>
      </section>

      <div className="resume" lang="es">
        <h2>En resumen</h2>
        <ul>
          <li>
            <span className="fr" lang="fr">tu</span> para amigos, familia y
            niños; <span className="fr" lang="fr">vous</span> para desconocidos,
            tiendas, profesores y para varias personas.
          </li>
          <li>
            Si dudas, di <span className="fr" lang="fr">vous</span>; el{" "}
            <span className="fr" lang="fr">tu</span> lo propone el otro.
          </li>
          <li>
            Al entrar, <span className="fr" lang="fr">bonjour</span>; de noche,{" "}
            <span className="fr" lang="fr">bonsoir</span>. Al salir,{" "}
            <span className="fr" lang="fr">au revoir</span> y{" "}
            <span className="fr" lang="fr">bonne journée</span>.
          </li>
          <li>
            <span className="fr" lang="fr">salut</span> solo con quien tuteas.
          </li>
          <li>
            <span className="fr" lang="fr">merci</span> se responde{" "}
            <span className="fr" lang="fr">de rien</span>;{" "}
            <span className="fr" lang="fr">pardon</span>,{" "}
            <span className="fr" lang="fr">excusez-moi</span> y{" "}
            <span className="fr" lang="fr">désolé(e)</span> no son lo mismo.
          </li>
        </ul>
      </div>
    </article>
  );
}
