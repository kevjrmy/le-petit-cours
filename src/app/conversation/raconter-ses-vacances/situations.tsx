"use client";

import { useState } from "react";
import { T } from "@/components/lang/T";

/**
 * The constraint card, same contract as the other role-plays: cycles in order,
 * stores nothing, and is the only client code on the page.
 *
 * No trip is named, so any learner can play it with their own holiday. Each
 * entry asks for a different *move* in the story: when and how long, where you
 * slept, what happened in order, what the weather and the place were like,
 * what disappointed, one thing to recommend, the way back. The count in the
 * card is read from this array, so adding an entry here is the whole change.
 */
const SITUATIONS = [
  {
    fr: "Lundi matin, un collègue demande : « Alors, ces vacances ? » Dites quand vous êtes parti(e) et combien de temps.",
    es: (
      <>
        Lunes por la mañana, un compañero pregunta: «Alors, ces vacances ?». Di
        cuándo te fuiste y cuánto tiempo.
      </>
    ),
  },
  {
    fr: "Il demande où vous avez dormi. Répondez, et dites ce que vous en avez pensé.",
    es: <>Pregunta dónde dormiste. Responde y di qué te pareció.</>,
  },
  {
    fr: "Il veut savoir ce que vous avez fait le premier jour. Racontez dans l’ordre, avec d’abord, ensuite, finalement.",
    es: (
      <>
        Quiere saber qué hiciste el primer día. Cuéntalo en orden, con{" "}
        <span lang="fr">d’abord, ensuite, finalement</span>.
      </>
    ),
  },
  {
    fr: "Il demande s’il a fait beau. Décrivez le temps, et dites s’il y avait du monde.",
    es: (
      <>
        Pregunta si hizo buen tiempo. Describe el tiempo y di si había mucha
        gente.
      </>
    ),
  },
  {
    fr: "Il sent que quelque chose vous a déçu. Dites quoi, et pourquoi.",
    es: <>Nota que algo te decepcionó. Di qué fue y por qué.</>,
  },
  {
    fr: "Il pense y aller un jour. Racontez la chose qui vous a le plus plu, et donnez-lui un conseil.",
    es: <>Piensa ir algún día. Cuenta lo que más te gustó y aconséjale algo.</>,
  },
  {
    fr: "Il demande quand vous êtes rentré(e) et comment s’est passé le retour.",
    es: <>Pregunta cuándo volviste y cómo fue la vuelta.</>,
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
