"use client";

import { useState, type ReactNode } from "react";

/**
 * The constraint card, same contract as the other role-plays: cycles in order,
 * stores nothing, and is the only client code on the page.
 *
 * **A1, so every situation is answerable with a quantity, a price and
 * `je voudrais`** (`docs/decisions.md` #72). Nothing on the card asks the
 * learner to complain, to return an item or to explain a preference: those are
 * the A2 and B1 versions of a shop, and they need a past tense and a reason.
 *
 * Six moves rather than six shopping lists: asking with a quantity, asking for
 * a price, choosing between two, adding something, saying it is all, and
 * paying. The last one carries the only number the learner has to *understand*
 * rather than produce, which is why it is written as a price said out loud.
 */
const SITUATIONS: ReactNode[] = [
  <>Estás en la panadería. Pide dos baguettes y tres cruasanes.</>,
  <>
    En el mercado quieres manzanas. Pide un kilo de manzanas y pregunta el
    precio.
  </>,
  <>
    El vendedor te enseña dos tamaños de{" "}
    <span className="fr" lang="fr">
      un gâteau
    </span>
    , uno grande y uno pequeño. Elige uno con{" "}
    <span className="fr" lang="fr">
      celui-ci
    </span>{" "}
    o{" "}
    <span className="fr" lang="fr">
      le grand
    </span>
    .
  </>,
  <>
    Te preguntan si quieres algo más. Añade seis huevos y di que eso es todo.
  </>,
  <>
    El vendedor dice un precio y no lo has entendido. Pídele que lo repita y
    paga.
  </>,
  <>No tienes monedas. Pregunta si puedes pagar con tarjeta.</>,
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
