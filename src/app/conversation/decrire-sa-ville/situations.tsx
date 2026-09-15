"use client";

import { useState } from "react";

/**
 * The constraint card, same contract as the other role-plays: cycles in order,
 * stores nothing, and is the only client code on the page.
 *
 * Describing a town is the one scene a learner can survive with a rehearsed
 * paragraph, so every entry asks for a different *move* instead of a different
 * subject: situating, sizing without a number, recommending and justifying,
 * explaining how you get around, describing what is under the window, judging a
 * month, and defining a word French does not have. The last one is the only
 * place on this page where a Spanish word may be in the room, and it has to
 * leave it in French.
 *
 * The count in the card is read from this array, so adding an entry here is the
 * whole change.
 */
const SITUATIONS = [
  "Votre amie demande où est votre ville. Situez-la sans carte : par rapport à la mer, à la montagne, à une autre ville.",
  "Elle demande si c’est grand. Répondez sans donner de chiffre.",
  "Elle n’a qu’un après-midi libre. Conseillez-lui un seul endroit, et dites pourquoi celui-là.",
  "Elle demande comment on se déplace chez vous, et si elle peut tout faire à pied.",
  "Décrivez votre rue à quelqu’un qui ne l’a jamais vue : ce qu’il y a en bas, en face, à côté.",
  "Elle veut venir au mois d’août. Dites-lui ce que ça change.",
  "Vous parlez d’une fête de chez vous. Le mot n’existe pas en français : expliquez-la autrement.",
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
