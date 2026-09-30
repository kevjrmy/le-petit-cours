import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";
import { Situations } from "./situations";

const PATH = "/conversation/se-presenter";

export const metadata = lessonMetadata(PATH);

export default function Page() {
  return (
    <article className="prose">
      <PageHeader path={PATH} />

      <section lang="es">
        <h2>La situación</h2>

        <p>
          Conoces a alguien por primera vez: en clase, en casa de un vecino o en
          tu primer día de trabajo. Otra persona hace ese papel. Tienes que
          decir quién eres, entender quién es y pedir ayuda cuando no entiendas.
          Es la primera conversación que se tiene en francés, y la más
          frecuente.
        </p>

        <Situations />
      </section>

      <section lang="es">
        <h2>Los pasos</h2>

        <p>
          Una presentación sigue casi siempre el mismo orden. En cada paso
          tienes que decir una frase que solo tú puedes producir.
        </p>

        <ol>
          <li>Saluda y di tu nombre.</li>
          <li>
            Pregunta cómo se llama la otra persona. Pide que repita o que
            deletree.
          </li>
          <li>Di de dónde eres y dónde vives.</li>
          <li>Di tu edad y tu profesión, o lo que estudias.</li>
          <li>Da las gracias y despídete.</li>
        </ol>

        <div className="attention">
          <p>
            Para dar tu nombre se dice{" "}
            <span className="fr" lang="fr">
              je m’appelle
            </span>
            . No se dice{" "}
            <span className="fr" lang="fr">
              je suis appelle
            </span>
            . Para la edad se usa el verbo{" "}
            <span className="fr" lang="fr">
              avoir
            </span>{" "}
            (tener):{" "}
            <span className="fr" lang="fr">
              j’ai vingt-cinq ans
            </span>{" "}
            (tengo veinticinco años). La palabra{" "}
            <span className="fr" lang="fr">
              ans
            </span>{" "}
            no se omite nunca. No se dice{" "}
            <span className="fr" lang="fr">
              je suis vingt-cinq
            </span>{" "}
            ni{" "}
            <span className="fr" lang="fr">
              j’ai vingt-cinq
            </span>
            .
          </p>
        </div>

        <div className="astuce">
          <p className="astuce-hook">La pregunta corta es la que oirás.</p>
          <p>
            En un libro, la pregunta se escribe{" "}
            <span className="fr" lang="fr">
              D’où venez-vous ?
            </span>
            . En la calle te dirán{" "}
            <span className="fr" lang="fr">
              Vous êtes d’où ?
            </span>
            , y a alguien de tu edad{" "}
            <span className="fr" lang="fr">
              Tu es d’où ?
            </span>
            . Las tres preguntan lo mismo. Aprende la corta para entender y la
            larga para escribir.
          </p>
          <p>
            Usa{" "}
            <span className="fr" lang="fr">
              vous
            </span>{" "}
            con alguien que no conoces, con una persona mayor o con quien te
            atiende (en una tienda, un profesor). Usa{" "}
            <span className="fr" lang="fr">
              tu
            </span>{" "}
            con amigos, familia, niños y con quien te habla de{" "}
            <span className="fr" lang="fr">
              tu
            </span>
            . Y{" "}
            <span className="fr" lang="fr">
              vous
            </span>{" "}
            es también el plural: «vosotros», «ustedes».
          </p>
        </div>
      </section>

      <section lang="es">
        <h2>Las palabras para decirlo</h2>

        <p>
          Con esto puedes sostener la conversación de principio a fin. Coge lo
          que te sirva y deja el resto.
        </p>

        <ul className="mots">
          <li>
            <span className="fr" lang="fr">
              bonjour
            </span>{" "}
            (hola)
          </li>
          <li>
            <span className="fr" lang="fr">
              bonsoir
            </span>{" "}
            (buenas tardes, buenas noches)
          </li>
          <li>
            <span className="fr" lang="fr">
              salut
            </span>{" "}
            (hola, entre amigos)
          </li>
          <li>
            <span className="fr" lang="fr">
              je m’appelle
            </span>{" "}
            (me llamo)
          </li>
          <li>
            <span className="fr" lang="fr">
              il s’appelle
            </span>{" "}
            /{" "}
            <span className="fr" lang="fr">
              elle s’appelle
            </span>{" "}
            (se llama)
          </li>
          <li>
            <span className="fr" lang="fr">
              comment vous appelez-vous ?
            </span>{" "}
            (¿cómo se llama?)
          </li>
          <li>
            <span className="fr" lang="fr">
              enchanté
            </span>{" "}
            (encantado; una mujer dice{" "}
            <span className="fr" lang="fr">
              enchantée
            </span>
            )
          </li>
          <li>
            <span className="fr" lang="fr">
              vous pouvez répéter ?
            </span>{" "}
            (¿puede repetir?)
          </li>
          <li>
            <span className="fr" lang="fr">
              vous pouvez épeler ?
            </span>{" "}
            (¿puede deletrear?)
          </li>
          <li>
            <span className="fr" lang="fr">
              plus lentement
            </span>{" "}
            (más despacio)
          </li>
          <li>
            <span className="fr" lang="fr">
              je ne comprends pas
            </span>{" "}
            (no entiendo)
          </li>
          <li>
            <span className="fr" lang="fr">
              je viens de
            </span>{" "}
            (vengo de)
          </li>
          <li>
            <span className="fr" lang="fr">
              j’habite à
            </span>{" "}
            (vivo en)
          </li>
          <li>
            <span className="fr" lang="fr">
              je suis espagnol
            </span>{" "}
            (soy español;{" "}
            <span className="fr" lang="fr">
              espagnole
            </span>{" "}
            si eres mujer)
          </li>
          <li>
            <span className="fr" lang="fr">
              je parle un peu français
            </span>{" "}
            (hablo un poco de francés)
          </li>
          <li>
            <span className="fr" lang="fr">
              j’ai vingt ans
            </span>{" "}
            (tengo veinte años)
          </li>
          <li>
            <span className="fr" lang="fr">
              je suis étudiant
            </span>{" "}
            (soy estudiante;{" "}
            <span className="fr" lang="fr">
              étudiante
            </span>{" "}
            si eres mujer)
          </li>
          <li>
            <span className="fr" lang="fr">
              je suis professeur
            </span>{" "}
            (soy profesor o profesora)
          </li>
          <li>
            <span className="fr" lang="fr">
              je travaille dans
            </span>{" "}
            (trabajo en)
          </li>
          <li>
            <span className="fr" lang="fr">
              voici
            </span>{" "}
            (este es, esta es)
          </li>
          <li>
            <span className="fr" lang="fr">
              et vous ?
            </span>{" "}
            (¿y usted?)
          </li>
          <li>
            <span className="fr" lang="fr">
              merci beaucoup
            </span>{" "}
            (muchas gracias)
          </li>
          <li>
            <span className="fr" lang="fr">
              au revoir
            </span>{" "}
            (adiós)
          </li>
          <li>
            <span className="fr" lang="fr">
              à bientôt
            </span>{" "}
            (hasta pronto)
          </li>
          <li>
            <span className="fr" lang="fr">
              bonne journée
            </span>{" "}
            (que tengas un buen día)
          </li>
        </ul>
      </section>
    </article>
  );
}
