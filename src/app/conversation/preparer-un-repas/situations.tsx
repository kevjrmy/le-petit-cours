"use client";

import { useState } from "react";

/**
 * La carte des contraintes, même contrat que les autres jeux de rôle : elle
 * défile dans l'ordre, n'enregistre rien, et c'est le seul code client de la
 * page.
 *
 * Chaque entrée est un *geste* différent, pas un plat différent : proposer,
 * tenir compte de quelqu'un, faire l'inventaire, chiffrer, remplacer, se
 * répartir le travail, réparer un oubli. Sept menus ne feraient qu'une seule
 * conversation répétée sept fois.
 *
 * **Chacune force l'article sans le dire.** Faire l'inventaire d'un frigo, ce
 * sont des négations (*il n'y a plus de*) ; chiffrer, ce sont des quantités
 * (*un kilo de*) ; proposer un plat, ce sont des partitifs (*il faut de la*).
 * C'est la scène qui rend la grammaire inévitable, pas une consigne qui la
 * réclame.
 */
const SITUATIONS = [
  "Vous recevez quatre personnes samedi soir. Dites combien vous serez et proposez un plat.",
  "L’un des invités ne mange pas de viande. Trouvez une entrée et un plat qui conviennent à tout le monde.",
  "Ouvrez le frigo et faites l’inventaire à voix haute : ce qu’il y a, et ce qu’il n’y a plus.",
  "Fixez les quantités : pour six personnes, combien de chaque chose ?",
  "Le budget est serré. Proposez de remplacer un ingrédient cher par un autre, et dites pourquoi.",
  "Partagez-vous les courses : qui va au marché, qui va au supermarché, et qui achète quoi.",
  "Il manque quelque chose au dernier moment. Demandez à l’autre d’aller le chercher, en disant exactement quoi et combien.",
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
