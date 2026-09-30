"use client";

import { useState, type ReactNode } from "react";

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
const SITUATIONS: ReactNode[] = [
  <>Te preguntan si te gusta la música. Responde y haz tú la misma pregunta.</>,
  <>Di una comida que te encanta y otra que no soportas.</>,
  <>
    Pregunta a la otra persona si le gusta el deporte, y después si le gusta el
    fútbol.
  </>,
  <>
    Te preguntan qué haces en tu tiempo libre. Di dos cosas que te gusta hacer,
    con un verbo (leer, bailar, cocinar).
  </>,
  <>
    La otra persona dice que le gusta el cine. A ti también. Díselo, y di
    también que a ti no te gustan las películas de miedo.
  </>,
  <>
    La otra persona dice que no le gusta la cocina, y a ti tampoco. Responde en
    una frase corta y pregunta por otra cosa.
  </>,
];

export function Situations() {
  const [index, setIndex] = useState(0);

  return (
    <div className="card">
      <p>
        <strong>
          Situación {index + 1} de {SITUATIONS.length}
        </strong>
      </p>

      <p aria-live="polite" lang="es">
        {SITUATIONS[index]}
      </p>

      <p>
        <button
          type="button"
          className="button"
          onClick={() => setIndex((i) => (i + 1) % SITUATIONS.length)}
        >
          Otra situación
        </button>
      </p>
    </div>
  );
}
