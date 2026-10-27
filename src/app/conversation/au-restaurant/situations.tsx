"use client";

import { useState } from "react";
import { T } from "@/components/lang/T";

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
  {
    fr: "Vous arrivez à deux, sans réservation, un vendredi soir. Demandez une table et acceptez celle qu’on vous propose.",
    es: (
      <>
        Llegáis dos, sin reserva, un viernes por la noche. Pide una mesa y
        acepta la que te ofrezcan.
      </>
    ),
  },
  {
    fr: "Le serveur vous tend la carte et vous annonce aussi un menu à prix fixe. Faites-vous expliquer la différence, puis choisissez.",
    es: (
      <>
        El camarero te da la carta y te anuncia también un menú a precio fijo.
        Haz que te expliquen la diferencia y luego elige.
      </>
    ),
  },
  {
    fr: "Un plat de la carte porte un nom que vous ne connaissez pas. Demandez ce qu’il y a dedans avant de commander.",
    es: (
      <>
        Un plato de la carta tiene un nombre que no conoces. Pregunta qué lleva
        antes de pedir.
      </>
    ),
  },
  {
    fr: "Vous ne mangez pas de viande, ou vous êtes allergique à quelque chose. Dites-le et demandez ce qui vous reste.",
    es: (
      <>
        No comes carne, o tienes alguna alergia. Dilo y pregunta qué te queda.
      </>
    ),
  },
  {
    fr: "Vous voulez de l’eau, pas une bouteille payante. Demandez une carafe.",
    es: <>Quieres agua, no una botella de pago. Pide una jarra.</>,
  },
  {
    fr: "Votre plat arrive froid. Signalez-le poliment au serveur.",
    es: <>Tu plato llega frío. Avisa al camarero con educación.</>,
  },
  {
    fr: "Le repas est fini. Demandez l’addition, puis demandez à payer par carte, chacun sa part.",
    es: (
      <>
        La comida ha terminado. Pide la cuenta y luego pide pagar con tarjeta,
        cada uno su parte.
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
