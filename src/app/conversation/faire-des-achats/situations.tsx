"use client";

import { useState, type ReactNode } from "react";
import { T } from "@/components/lang/T";

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
const SITUATIONS: { fr: ReactNode; es: ReactNode }[] = [
  {
    fr: "Vous êtes à la boulangerie. Demandez deux baguettes et trois croissants.",
    es: <>Estás en la panadería. Pide dos baguettes y tres cruasanes.</>,
  },
  {
    fr: "Au marché, vous voulez des pommes. Demandez un kilo de pommes et demandez le prix.",
    es: (
      <>
        En el mercado quieres manzanas. Pide un kilo de manzanas y pregunta el
        precio.
      </>
    ),
  },
  {
    fr: (
      <>
        Le vendeur vous montre <span className="fr">un gâteau</span> en deux
        tailles, un grand et un petit. Choisissez en disant{" "}
        <span className="fr">celui-ci</span> ou <span className="fr">le grand</span>.
      </>
    ),
    es: (
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
      </>
    ),
  },
  {
    fr: "On vous demande si vous voulez autre chose. Ajoutez six œufs et dites que c’est tout.",
    es: (
      <>
        Te preguntan si quieres algo más. Añade seis huevos y di que eso es
        todo.
      </>
    ),
  },
  {
    fr: "Le vendeur dit un prix et vous n’avez pas compris. Demandez-lui de le répéter, puis payez.",
    es: (
      <>
        El vendedor dice un precio y no lo has entendido. Pídele que lo repita y
        paga.
      </>
    ),
  },
  {
    fr: "Vous n’avez pas de monnaie. Demandez si vous pouvez payer par carte.",
    es: <>No tienes monedas. Pregunta si puedes pagar con tarjeta.</>,
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
