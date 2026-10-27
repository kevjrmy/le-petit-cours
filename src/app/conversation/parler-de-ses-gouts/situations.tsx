"use client";

import { useState, type ReactNode } from "react";
import { T } from "@/components/lang/T";

/**
 * The constraint card, same contract as the other role-plays: cycles in order,
 * stores nothing, and is the only client code on the page.
 *
 * **A1: every situation is answerable with `j'aime` / `je n'aime pas`, an
 * article or an infinitive, and `et toi ?`** (`docs/decisions.md` #72). Nothing
 * asks for a reason or a comparison, which need a longer sentence.
 *
 * Six moves: asking, answering yes, answering no, speaking of free time with an
 * infinitive, agreeing, and returning the question.
 */
const SITUATIONS: { fr: ReactNode; es: ReactNode }[] = [
  {
    fr: "On vous demande si vous aimez la musique. Répondez, puis posez la même question.",
    es: (
      <>Te preguntan si te gusta la música. Responde y haz tú la misma pregunta.</>
    ),
  },
  {
    fr: "Dites un plat que vous adorez et un autre que vous détestez.",
    es: <>Di una comida que te encanta y otra que no soportas.</>,
  },
  {
    fr: "Demandez à l’autre personne si elle aime le sport, puis si elle aime le football.",
    es: (
      <>
        Pregunta a la otra persona si le gusta el deporte, y después si le gusta
        el fútbol.
      </>
    ),
  },
  {
    fr: "On vous demande ce que vous faites pendant votre temps libre. Dites deux choses que vous aimez faire, avec un verbe (lire, danser, cuisiner).",
    es: (
      <>
        Te preguntan qué haces en tu tiempo libre. Di dos cosas que te gusta
        hacer, con un verbo (leer, bailar, cocinar).
      </>
    ),
  },
  {
    fr: "L’autre personne dit qu’elle aime le cinéma. Vous aussi. Dites-le, et dites aussi que vous n’aimez pas les films d’horreur.",
    es: (
      <>
        La otra persona dice que le gusta el cine. A ti también. Díselo, y di
        también que a ti no te gustan las películas de miedo.
      </>
    ),
  },
  {
    fr: "L’autre personne dit qu’elle n’aime pas la cuisine, et vous non plus. Répondez en une phrase courte et posez une question sur autre chose.",
    es: (
      <>
        La otra persona dice que no le gusta la cocina, y a ti tampoco. Responde
        en una frase corta y pregunta por otra cosa.
      </>
    ),
  },
];

export function Situations() {
  const [index, setIndex] = useState(0);
  const { fr, es } = SITUATIONS[index];

  return (
    <div className="card">
      <p>
        <strong>
          <T
            fr={`Situation ${index + 1} sur ${SITUATIONS.length}`}
            es={`Situación ${index + 1} de ${SITUATIONS.length}`}
          />
        </strong>
      </p>

      <p aria-live="polite">
        <T fr={fr} es={es} />
      </p>

      <p>
        <button
          type="button"
          className="button"
          onClick={() => setIndex((i) => (i + 1) % SITUATIONS.length)}
        >
          <T fr="Autre situation" es="Otra situación" />
        </button>
      </p>
    </div>
  );
}
