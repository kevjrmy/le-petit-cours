import Link from "next/link";
import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";
import { Situations } from "./situations";

const PATH = "/conversation/parler-de-ses-gouts";

export const metadata = lessonMetadata(PATH);

export default function Page() {
  return (
    <article className="prose">
      <PageHeader path={PATH} />

      <section lang="es">
        <h2>La situación</h2>

        <p>
          Acabas de conocer a alguien y la conversación sigue: ¿qué te gusta?
          Otra persona hace ese papel. Tienes que decir lo que te gusta y lo que
          no, preguntar lo mismo a la otra persona y reaccionar a lo que te
          cuenta. Habláis de comida, de música, de deporte y del tiempo libre.
          La gramática de la frase está en{" "}
          <Link href="/grammaire/parler-de-ses-gouts">Parler de ses goûts</Link>
          .
        </p>

        <Situations />
      </section>

      <section lang="es">
        <h2>Los pasos</h2>

        <p>
          Hablar de gustos es un juego de pregunta y respuesta que va y viene.
        </p>

        <ol>
          <li>Pregunta a la otra persona si le gusta algo.</li>
          <li>Di lo que te gusta, con más o menos fuerza.</li>
          <li>Di algo que no te gusta.</li>
          <li>Habla de lo que te gusta hacer en tu tiempo libre.</li>
          <li>Devuelve la pregunta y reacciona a la respuesta.</li>
        </ol>

        <div className="attention">
          <p>
            Después de{" "}
            <span className="fr" lang="fr">
              j’aime
            </span>{" "}
            va el artículo:{" "}
            <span className="fr" lang="fr">
              j’aime la musique
            </span>
            , no{" "}
            <span className="fr" lang="fr">
              j’aime musique
            </span>
            . Con un verbo se usa el infinitivo, sin nada más:{" "}
            <span className="fr" lang="fr">
              j’aime lire
            </span>{" "}
            (me gusta leer). Para decir que no, el verbo va entre{" "}
            <span className="fr" lang="fr">
              ne
            </span>{" "}
            y{" "}
            <span className="fr" lang="fr">
              pas
            </span>
            :{" "}
            <span className="fr" lang="fr">
              je n’aime pas le fromage
            </span>
            .
          </p>
        </div>

        <div className="astuce">
          <p className="astuce-hook">
            <span className="fr" lang="fr">
              Et toi ?
            </span>{" "}
            es la frase que mantiene viva la conversación.
          </p>
          <p>
            Cuando respondes, devuelve la pregunta con{" "}
            <span className="fr" lang="fr">
              et toi ?
            </span>
            . Con alguien a quien tratas de{" "}
            <span className="fr" lang="fr">
              vous
            </span>{" "}
            se dice{" "}
            <span className="fr" lang="fr">
              et vous ?
            </span>
            . Si la otra persona piensa como tú, basta con una expresión corta.
            Después de una frase afirmativa se dice{" "}
            <span className="fr" lang="fr">
              moi aussi
            </span>{" "}
            (
            <span className="fr" lang="fr">
              J’aime le jazz.
            </span>{" "}
            →{" "}
            <span className="fr" lang="fr">
              Moi aussi.
            </span>
            ). Después de una frase negativa se dice{" "}
            <span className="fr" lang="fr">
              moi non plus
            </span>{" "}
            (
            <span className="fr" lang="fr">
              Je n’aime pas le jazz.
            </span>{" "}
            →{" "}
            <span className="fr" lang="fr">
              Moi non plus.
            </span>
            ).
          </p>
        </div>
      </section>

      <section lang="es">
        <h2>Las palabras para decirlo</h2>

        <p>
          Con esto puedes preguntar, responder y reaccionar. Coge lo que te
          sirva y deja el resto.
        </p>

        <ul className="mots">
          <li>
            <span className="fr" lang="fr">
              tu aimes… ?
            </span>{" "}
            (¿te gusta…?)
          </li>
          <li>
            <span className="fr" lang="fr">
              j’aime
            </span>{" "}
            (me gusta)
          </li>
          <li>
            <span className="fr" lang="fr">
              j’adore
            </span>{" "}
            (me encanta)
          </li>
          <li>
            <span className="fr" lang="fr">
              j’aime bien
            </span>{" "}
            (me gusta bastante)
          </li>
          <li>
            <span className="fr" lang="fr">
              je n’aime pas
            </span>{" "}
            (no me gusta)
          </li>
          <li>
            <span className="fr" lang="fr">
              je déteste
            </span>{" "}
            (no soporto, odio)
          </li>
          <li>
            <span className="fr" lang="fr">
              beaucoup
            </span>{" "}
            (mucho)
          </li>
          <li>
            <span className="fr" lang="fr">
              un peu
            </span>{" "}
            (un poco)
          </li>
          <li>
            <span className="fr" lang="fr">
              pas du tout
            </span>{" "}
            (para nada)
          </li>
          <li>
            <span className="fr" lang="fr">
              et toi ?
            </span>{" "}
            (¿y a ti?)
          </li>
          <li>
            <span className="fr" lang="fr">
              moi aussi
            </span>{" "}
            (a mí también)
          </li>
          <li>
            <span className="fr" lang="fr">
              moi non plus
            </span>{" "}
            (a mí tampoco)
          </li>
          <li>
            <span className="fr" lang="fr">
              la musique
            </span>{" "}
            (la música)
          </li>
          <li>
            <span className="fr" lang="fr">
              le sport
            </span>{" "}
            (el deporte)
          </li>
          <li>
            <span className="fr" lang="fr">
              le football
            </span>{" "}
            (el fútbol)
          </li>
          <li>
            <span className="fr" lang="fr">
              le cinéma
            </span>{" "}
            (el cine)
          </li>
          <li>
            <span className="fr" lang="fr">
              les films d’horreur
            </span>{" "}
            (las películas de miedo)
          </li>
          <li>
            <span className="fr" lang="fr">
              la cuisine
            </span>{" "}
            (la cocina)
          </li>
          <li>
            <span className="fr" lang="fr">
              le fromage
            </span>{" "}
            (el queso)
          </li>
          <li>
            <span className="fr" lang="fr">
              les légumes
            </span>{" "}
            (las verduras)
          </li>
          <li>
            <span className="fr" lang="fr">
              le temps libre
            </span>{" "}
            (el tiempo libre)
          </li>
          <li>
            <span className="fr" lang="fr">
              lire
            </span>{" "}
            (leer)
          </li>
          <li>
            <span className="fr" lang="fr">
              danser
            </span>{" "}
            (bailar)
          </li>
          <li>
            <span className="fr" lang="fr">
              cuisiner
            </span>{" "}
            (cocinar)
          </li>
          <li>
            <span className="fr" lang="fr">
              écouter de la musique
            </span>{" "}
            (escuchar música)
          </li>
        </ul>
      </section>
    </article>
  );
}
