"use client";

import { useState } from "react";

/**
 * The constraint card, same contract as the other role-plays: cycles in order,
 * stores nothing, and is the only client code on the page.
 *
 * Each entry is a different *move* of an argument rather than a different
 * topic, so the seven cannot be answered with one rehearsed opinion: un avis et
 * une raison, contredire avec un exemple, concéder puis ajouter, nuancer,
 * approuver et ajouter, deux raisons et une fin, demander l’avis de l’autre.
 *
 * **The subjects are everyday choices, never the learner’s country or her
 * life.** A disagreement about trains costs nothing; one about where she comes
 * from turns the scene into a defence (see `parler-du-travail`). The count in
 * the card is read from this array, so adding an entry here is the whole
 * change.
 */
const SITUATIONS = [
  "Votre amie vous demande : pour vivre, la ville ou la campagne ? Donnez votre avis, puis une raison.",
  "Votre amie ne cuisine jamais : pour elle, le restaurant est plus simple. Vous n’êtes pas d’accord. Dites-le, avec un exemple.",
  "Votre amie pense que le train est toujours mieux que la voiture. Acceptez une partie de son idée, puis ajoutez la vôtre.",
  "Votre amie vous demande si un enfant de dix ans peut avoir un téléphone. Répondez que ça dépend, et dites de quoi.",
  "Votre amie trouve que les gens regardent trop leur téléphone. Vous êtes d’accord : ajoutez une deuxième raison.",
  "Travailler à la maison ou au bureau ? Donnez deux raisons, puis fermez votre avis en une phrase.",
  "C’est vous qui posez la question : les vacances à la mer ou à la montagne ? Écoutez la réponse de votre amie, puis dites si vous êtes d’accord.",
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
