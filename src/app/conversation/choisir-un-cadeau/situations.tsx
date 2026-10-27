"use client";

import { useState } from "react";
import { T } from "@/components/lang/T";

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
  {
    fr: "Vous cherchez un cadeau pour votre mère et vous n’avez pas d’idée. Dites pour qui c’est et laissez-vous conseiller.",
    es: (
      <>
        Buscas un regalo para tu madre y no tienes ni idea. Di para quién es y
        déjate aconsejar.
      </>
    ),
  },
  {
    fr: "Deux écharpes vous plaisent. Faites-les comparer par le vendeur, puis choisissez-en une et dites pourquoi.",
    es: (
      <>
        Te gustan dos bufandas. Haz que el dependiente las compare, luego elige
        una y di por qué.
      </>
    ),
  },
  {
    fr: "L’objet qui vous plaît est en vitrine, pas en rayon. Demandez celui qui est exposé.",
    es: (
      <>
        El objeto que te gusta está en el escaparate, no en el estante. Pide el
        que está expuesto.
      </>
    ),
  },
  {
    fr: "Le premier prix annoncé est trop élevé. Demandez à voir quelque chose de moins cher, sans vexer personne.",
    es: (
      <>
        El primer precio que te dicen es demasiado alto. Pide ver algo más
        barato, sin ofender a nadie.
      </>
    ),
  },
  {
    fr: "Vous hésitez entre deux couleurs. Demandez l’avis du vendeur, puis décidez vous-même.",
    es: (
      <>
        Dudas entre dos colores. Pide la opinión del dependiente y luego decide
        tú.
      </>
    ),
  },
  {
    fr: "Vous avez choisi. Demandez un paquet cadeau et payez par carte.",
    es: <>Ya has elegido. Pide que te lo envuelvan para regalo y paga con tarjeta.</>,
  },
  {
    fr: "Vous revenez le lendemain : ce n’est pas la bonne taille. Demandez à l’échanger.",
    es: <>Vuelves al día siguiente: no es la talla correcta. Pide cambiarlo.</>,
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
