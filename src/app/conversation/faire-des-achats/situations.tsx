"use client";

import { useState } from "react";

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
const SITUATIONS = [
  "Vous êtes à la boulangerie. Demandez deux baguettes et trois croissants.",
  "Au marché, vous voulez des pommes. Demandez un kilo de pommes, puis demandez le prix.",
  "Le vendeur vous propose deux tailles, une grande et une petite. Choisissez, et dites pourquoi en trois mots.",
  "On vous demande si vous voulez autre chose. Ajoutez une bouteille d’eau, puis dites que c’est tout.",
  "Le vendeur annonce un prix, et vous ne l’avez pas compris. Demandez-lui de répéter, puis payez.",
  "Vous n’avez pas de monnaie. Demandez si vous pouvez payer par carte.",
];

export function Situations() {
  const [index, setIndex] = useState(0);

  return (
    <div className="card">
      <p>
        <strong>
          Situation {index + 1} sur {SITUATIONS.length}
        </strong>
      </p>

      <p aria-live="polite">{SITUATIONS[index]}</p>

      <p>
        <button
          type="button"
          className="button"
          onClick={() => setIndex((i) => (i + 1) % SITUATIONS.length)}
        >
          Autre situation
        </button>
      </p>
    </div>
  );
}
