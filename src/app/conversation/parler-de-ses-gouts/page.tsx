import Link from "next/link";
import type { ReactNode } from "react";
import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";
import { Situations } from "./situations";

const PATH = "/conversation/parler-de-ses-gouts";

export const metadata = lessonMetadata(PATH);

/* Two bodies, French and Spanish, section by section (#102): CSS shows the
   interface's. The words to say are French with a Spanish gloss (A1, #85),
   written once and shared. */
const Fr = ({ children }: { children: ReactNode }) => (
  <span className="fr" lang="fr">
    {children}
  </span>
);

const WORDS: { fr: string; es: string }[] = [
  { fr: "tu aimes… ?", es: "¿te gusta…?" },
  { fr: "j’aime", es: "me gusta" },
  { fr: "j’adore", es: "me encanta" },
  { fr: "j’aime bien", es: "me gusta bastante" },
  { fr: "je n’aime pas", es: "no me gusta" },
  { fr: "je déteste", es: "no soporto, odio" },
  { fr: "beaucoup", es: "mucho" },
  { fr: "un peu", es: "un poco" },
  { fr: "pas du tout", es: "para nada" },
  { fr: "et toi ?", es: "¿y a ti?" },
  { fr: "moi aussi", es: "a mí también" },
  { fr: "moi non plus", es: "a mí tampoco" },
  { fr: "la musique", es: "la música" },
  { fr: "le sport", es: "el deporte" },
  { fr: "le football", es: "el fútbol" },
  { fr: "le cinéma", es: "el cine" },
  { fr: "les films d’horreur", es: "las películas de miedo" },
  { fr: "la cuisine", es: "la cocina" },
  { fr: "le fromage", es: "el queso" },
  { fr: "les légumes", es: "las verduras" },
  { fr: "le temps libre", es: "el tiempo libre" },
  { fr: "lire", es: "leer" },
  { fr: "danser", es: "bailar" },
  { fr: "cuisiner", es: "cocinar" },
  { fr: "écouter de la musique", es: "escuchar música" },
];

function Mots() {
  return (
    <ul className="mots">
      {WORDS.map((w) => (
        <li key={w.fr}>
          <Fr>{w.fr}</Fr> (<span lang="es">{w.es}</span>)
        </li>
      ))}
    </ul>
  );
}

export default function Page() {
  return (
    <article className="prose">
      <PageHeader path={PATH} />

      <section data-ui="fr">
        <h2>La situation</h2>

        <p>
          Vous rencontrez quelqu’un et la conversation continue :
          qu’est-ce que vous aimez ? Une autre personne joue ce rôle. Vous devez
          dire ce que vous aimez et ce que vous n’aimez pas, poser la même
          question à l’autre et réagir à sa réponse. Vous parlez de cuisine, de
          musique, de sport et de temps libre. La grammaire de la phrase est
          dans{" "}
          <Link href="/grammaire/parler-de-ses-gouts">Parler de ses goûts</Link>
          .
        </p>

        <Situations />
      </section>

      <section data-ui="es" lang="es">
        <h2>La situación</h2>

        <p>
          Acabas de conocer a alguien y la conversación sigue: ¿qué te gusta?
          Otra persona hace ese papel. Tienes que decir lo que te gusta y lo que
          no, preguntar lo mismo a la otra persona y reaccionar a lo que te
          cuenta. Habláis de cocina, de música, de deporte y del tiempo libre.
          La gramática de la frase está en{" "}
          <Link href="/grammaire/parler-de-ses-gouts" lang="fr">
            Parler de ses goûts
          </Link>
          .
        </p>

        <Situations />
      </section>

      <section data-ui="fr">
        <h2>Les étapes</h2>

        <p>
          Parler de ses goûts est un jeu de questions et de réponses. Il va et
          vient entre les deux personnes.
        </p>

        <ol>
          <li>Demandez à l’autre personne si elle aime quelque chose.</li>
          <li>Dites ce que vous aimez, plus ou moins fort.</li>
          <li>Dites une chose que vous n’aimez pas.</li>
          <li>Parlez de ce que vous aimez faire pendant votre temps libre.</li>
          <li>Posez la question à l’autre et réagissez à sa réponse.</li>
        </ol>

        <div className="attention">
          <p>
            Après <Fr>j’aime</Fr>, on met l’article : <Fr>j’aime la musique</Fr>,
            pas <s className="fr">j’aime musique</s>. Avec un verbe, on utilise
            l’infinitif, sans rien d’autre : <Fr>j’aime lire</Fr> (
            <span lang="es">me gusta leer</span>). Pour dire non, le verbe est
            entre <Fr>ne</Fr> et <Fr>pas</Fr> : <Fr>je n’aime pas le fromage</Fr>
            .
          </p>
        </div>

        <div className="astuce">
          <p className="astuce-hook">
            <Fr>Et toi ?</Fr> est la phrase qui garde la conversation vivante.
          </p>
          <p>
            Quand vous répondez, posez la question à l’autre avec{" "}
            <Fr>et toi ?</Fr>. Si vous dites <Fr>vous</Fr> à la personne, dites{" "}
            <Fr>et vous ?</Fr>. Si l’autre pense comme vous, une
            expression courte suffit. Après une phrase positive, on dit{" "}
            <Fr>moi aussi</Fr> (<Fr>J’aime le jazz.</Fr> →{" "}
            <Fr>Moi aussi.</Fr>). Après une phrase négative, on dit{" "}
            <Fr>moi non plus</Fr> (<Fr>Je n’aime pas le jazz.</Fr> →{" "}
            <Fr>Moi non plus.</Fr>).
          </p>
        </div>
      </section>

      <section data-ui="es" lang="es">
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
            Después de <Fr>j’aime</Fr> va el artículo: <Fr>j’aime la musique</Fr>
            , no{" "}
            <s className="fr" lang="fr">
              j’aime musique
            </s>
            . Con un verbo se usa el infinitivo, sin
            nada más: <Fr>j’aime lire</Fr> (me gusta leer). Para decir que no,
            el verbo va entre <Fr>ne</Fr> y <Fr>pas</Fr>:{" "}
            <Fr>je n’aime pas le fromage</Fr>.
          </p>
        </div>

        <div className="astuce">
          <p className="astuce-hook">
            <Fr>Et toi ?</Fr> es la frase que mantiene viva la conversación.
          </p>
          <p>
            Cuando respondes, devuelve la pregunta con <Fr>et toi ?</Fr>. Con
            alguien a quien tratas de <Fr>vous</Fr> se dice <Fr>et vous ?</Fr>.
            Si la otra persona piensa como tú, basta con una expresión corta.
            Después de una frase afirmativa se dice <Fr>moi aussi</Fr> (
            <Fr>J’aime le jazz.</Fr> → <Fr>Moi aussi.</Fr>). Después de una
            frase negativa se dice <Fr>moi non plus</Fr> (
            <Fr>Je n’aime pas le jazz.</Fr> → <Fr>Moi non plus.</Fr>).
          </p>
        </div>
      </section>

      <section data-ui="fr">
        <h2>Les mots pour le dire</h2>

        <p>
          Avec ces mots, vous pouvez poser des questions, répondre et réagir.
          Prenez ce qui vous sert, laissez le reste.
        </p>

        <Mots />
      </section>

      <section data-ui="es" lang="es">
        <h2>Las palabras para decirlo</h2>

        <p>
          Con esto puedes preguntar, responder y reaccionar. Coge lo que te
          sirva y deja el resto.
        </p>

        <Mots />
      </section>
    </article>
  );
}
