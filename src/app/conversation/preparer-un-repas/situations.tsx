"use client";

import { useState } from "react";
import { T } from "@/components/lang/T";

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
  {
    fr: "Vous recevez quatre personnes samedi soir. Dites combien vous serez et proposez un plat.",
    es: (
      <>
        Recibes a cuatro personas el sábado por la noche. Di cuántos seréis y
        propón un plato.
      </>
    ),
  },
  {
    fr: "L’un des invités ne mange pas de viande. Trouvez une entrée et un plat qui conviennent à tout le monde.",
    es: (
      <>
        Uno de los invitados no come carne. Encuentra un entrante y un plato que
        convengan a todos.
      </>
    ),
  },
  {
    fr: "Ouvrez le frigo et faites l’inventaire à voix haute : ce qu’il y a, et ce qu’il n’y a plus.",
    es: (
      <>
        Abre la nevera y haz el inventario en voz alta: lo que hay y lo que ya
        no queda.
      </>
    ),
  },
  {
    fr: "Fixez les quantités : pour six personnes, combien de chaque chose ?",
    es: <>Fija las cantidades: para seis personas, ¿cuánto de cada cosa?</>,
  },
  {
    fr: "Le budget est serré. Proposez de remplacer un ingrédient cher par un autre, et dites pourquoi.",
    es: (
      <>
        El presupuesto es ajustado. Propón sustituir un ingrediente caro por
        otro y di por qué.
      </>
    ),
  },
  {
    fr: "Partagez-vous les courses : qui va au marché, qui va au supermarché, et qui achète quoi.",
    es: (
      <>
        Repartíos la compra: quién va al mercado, quién va al supermercado y
        quién compra qué.
      </>
    ),
  },
  {
    fr: "Il manque quelque chose au dernier moment. Demandez à l’autre d’aller le chercher, en disant exactement quoi et combien.",
    es: (
      <>
        Falta algo en el último momento. Pide al otro que vaya a buscarlo,
        diciendo exactamente qué y cuánto.
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
