"use client";

import { useState } from "react";
import { T } from "@/components/lang/T";

/**
 * The constraint card, same contract as the other role-plays: cycles in order,
 * stores nothing, and is the only client code on the page.
 *
 * Asking the way is two skills, not one: producing the question, and *surviving
 * the answer*. Half the entries put the learner on the receiving end — an
 * answer too fast, an answer she has to repeat back, an answer that turns out
 * to be wrong — because that is where the conversation actually breaks down.
 *
 * The last entry reverses the roles on purpose: being asked the way is the same
 * vocabulary in the imperative, and it is the one the learner never rehearses.
 */
const SITUATIONS = [
  {
    fr: "Vous cherchez la gare et vous êtes à pied. Arrêtez quelqu’un dans la rue et demandez votre chemin.",
    es: (
      <>
        Buscas la estación y vas a pie. Para a alguien en la calle y pregunta
        cómo llegar.
      </>
    ),
  },
  {
    fr: "On vous répond trop vite et vous n’avez rien compris. Faites répéter, plus lentement.",
    es: (
      <>
        Te contestan demasiado rápido y no has entendido nada. Pide que lo
        repitan, más despacio.
      </>
    ),
  },
  {
    fr: "On vient de vous donner trois indications. Répétez-les à voix haute pour vérifier que vous avez compris.",
    es: (
      <>
        Acaban de darte tres indicaciones. Repítelas en voz alta para comprobar
        que las has entendido.
      </>
    ),
  },
  {
    fr: "Vous voulez savoir si c’est loin, et combien de temps il faut à pied. Demandez-le.",
    es: <>Quieres saber si está lejos y cuánto se tarda a pie. Pregúntalo.</>,
  },
  {
    fr: "La personne ne sait pas. Remerciez-la et demandez à quelqu’un d’autre.",
    es: <>La persona no lo sabe. Dale las gracias y pregunta a otra.</>,
  },
  {
    fr: "Vous avez suivi les indications et vous êtes perdu. Expliquez où vous êtes et ce qu’on vous avait dit.",
    es: (
      <>
        Has seguido las indicaciones y te has perdido. Explica dónde estás y lo
        que te habían dicho.
      </>
    ),
  },
  {
    fr: "Quelqu’un vous demande où se trouve la poste, et vous le savez. Expliquez-lui le chemin.",
    es: (
      <>
        Alguien te pregunta dónde está correos, y tú lo sabes. Explícale el
        camino.
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
