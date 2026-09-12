"use client";

import { useState } from "react";

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
  "Vous cherchez la gare et vous êtes à pied. Arrêtez quelqu’un dans la rue et demandez votre chemin.",
  "On vous répond trop vite et vous n’avez rien compris. Faites répéter, plus lentement.",
  "On vient de vous donner trois indications. Répétez-les à voix haute pour vérifier que vous avez compris.",
  "Vous voulez savoir si c’est loin, et combien de temps il faut à pied. Demandez-le.",
  "La personne ne sait pas. Remerciez-la et demandez à quelqu’un d’autre.",
  "Vous avez suivi les indications et vous êtes perdu. Expliquez où vous êtes et ce qu’on vous avait dit.",
  "Quelqu’un vous demande où se trouve la poste, et vous le savez. Expliquez-lui le chemin.",
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
