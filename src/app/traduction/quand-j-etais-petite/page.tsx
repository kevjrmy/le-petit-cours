import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";
import { Traduction, type Part } from "@/components/exercice/Traduction";

const PATH = "/traduction/quand-j-etais-petite";

export const metadata = lessonMetadata(PATH);

/* Three nouns, none of them guessable from Spanish — `pueblo` is the false
   friend that matters here, since a Spanish speaker reads « peuple ». No verb
   is hinted: every verb in this text is the imparfait it exists to practise. */
const LINES: Part[][] = [
  [
    "Cuando era pequeña, vivíamos en ",
    { es: "un pueblo", fr: "un village" },
    " cerca del mar.",
  ],
  [
    "Mi ",
    { es: "abuela", fr: "la grand-mère" },
    " tenía una casa con un jardín enorme.",
  ],
  [
    "Todos los domingos comíamos juntos, y después jugábamos en ",
    { es: "la calle", fr: "la rue" },
    ".",
  ],
  ["No teníamos mucho, pero éramos felices."],
];

const MODEL = [
  "Quand j’étais petite, nous habitions dans un village près de la mer.",
  "Ma grand-mère avait une maison avec un jardin énorme.",
  "Tous les dimanches, nous mangions ensemble, et après nous jouions dans la rue.",
  "Nous n’avions pas grand-chose, mais nous étions heureux.",
];

export default function Page() {
  return (
    <article className="prose">
      <PageHeader path={PATH} />

      <section>
        <h2>Le texte</h2>

        <p>
          Un souvenir : rien ne se passe, tout dure. Les huit verbes de ce texte
          sont au même temps, et c’est la seule chose à décider avant
          d’écrire.
        </p>

        <Traduction
          lines={LINES}
          model={MODEL}
          note={
            <>
              Votre version n’a pas à être identique à celle-ci. «{" "}
              <span className="fr">nous habitions</span> » et «{" "}
              <span className="fr">nous vivions</span> » vont toutes les deux,
              et «{" "}
              <span className="fr">nous n’avions pas grand-chose</span> » vaut «{" "}
              <span className="fr">nous n’avions pas beaucoup</span> ». Ce qui
              compte : que les huit verbes soient à l’imparfait, et que «{" "}
              <span className="fr">heureux</span> » s’accorde avec le sujet.
            </>
          }
        />
      </section>
    </article>
  );
}
