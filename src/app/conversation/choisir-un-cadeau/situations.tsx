"use client";

import { useState } from "react";

/**
 * La carte des contraintes, même contrat que les autres jeux de rôle : elle
 * défile dans l'ordre, n'enregistre rien, et c'est le seul code client de la
 * page.
 *
 * Chaque entrée est un *geste* différent, pas un objet différent : sinon les
 * sept ne sont qu'un seul achat répété avec un autre nom. Se faire conseiller,
 * comparer deux objets, réclamer celui de la vitrine, faire baisser le budget,
 * demander un avis, faire emballer et revenir échanger sont sept choses
 * distinctes à savoir dire.
 *
 * **Le vendeur n'est jamais un obstacle.** Une scène où le magasin résiste
 * transforme le français de l'apprenante en réclamation ; la seule difficulté
 * de la carte, l'échange du lendemain, est écrite comme quelque chose que le
 * vendeur accepte.
 */
const SITUATIONS = [
  "Vous cherchez un cadeau pour votre mère et vous n’avez pas d’idée. Dites pour qui c’est et laissez-vous conseiller.",
  "Deux écharpes vous plaisent. Faites-les comparer par le vendeur, puis choisissez-en une et dites pourquoi.",
  "L’objet qui vous plaît est en vitrine, pas en rayon. Demandez celui qui est exposé.",
  "Le premier prix annoncé est trop élevé. Demandez à voir quelque chose de moins cher, sans vexer personne.",
  "Vous hésitez entre deux couleurs. Demandez l’avis du vendeur, puis décidez vous-même.",
  "Vous avez choisi. Demandez un paquet cadeau et payez par carte.",
  "Vous revenez le lendemain : ce n’est pas la bonne taille. Demandez à l’échanger.",
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
