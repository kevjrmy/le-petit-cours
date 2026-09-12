"use client";

import { useState } from "react";

/**
 * The constraint card, same contract as the other role-plays: cycles in order,
 * stores nothing, and is the only client code on the page.
 *
 * Each entry is a different *move*, not a different dish — otherwise the seven
 * are one rehearsed order repeated with a new noun. Arriving without a booking,
 * choosing between two ways of ordering, asking what is in a dish, refusing
 * something, sending a plate back, and settling the bill are six different
 * things to be able to say.
 *
 * **Nothing here makes the waiter an obstacle.** A scene where the restaurant
 * is unhelpful turns the learner's French into a complaint; she needs to be
 * able to order before she needs to be able to argue. The one difficulty on the
 * card, the cold plate, is written as something the waiter fixes.
 */
const SITUATIONS = [
  "Vous arrivez à deux, sans réservation, un vendredi soir. Demandez une table et acceptez celle qu’on vous propose.",
  "Le serveur vous tend la carte et vous annonce aussi un menu à prix fixe. Faites-vous expliquer la différence, puis choisissez.",
  "Un plat de la carte porte un nom que vous ne connaissez pas. Demandez ce qu’il y a dedans avant de commander.",
  "Vous ne mangez pas de viande, ou vous êtes allergique à quelque chose. Dites-le et demandez ce qui vous reste.",
  "Vous voulez de l’eau, pas une bouteille payante. Demandez une carafe.",
  "Votre plat arrive froid. Signalez-le poliment au serveur.",
  "Le repas est fini. Demandez l’addition, puis demandez à payer par carte, chacun sa part.",
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
