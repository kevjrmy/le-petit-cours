"use client";

import { useState } from "react";

/**
 * The constraint card, same contract as the other role-plays: cycles in order,
 * stores nothing, and is the only client code on the page.
 *
 * **Written at A1, which is what makes it a different page from the A2 scenes**
 * (`docs/decisions.md` #72). Every situation is answerable with a present tense,
 * a name, a country and a number — nothing here asks for a past, a reason or a
 * negotiation, because the learner this is written for cannot yet produce one.
 *
 * The seven are seven different *moves*, not seven people to meet: introducing
 * yourself, repairing what you did not catch, slowing the other person down,
 * returning a question, introducing a third person, answering about age and
 * work, and leaving. Numbers 2 and 3 are the DELF A1 function nobody writes a
 * scene for — asking someone to repeat, to spell, to speak more slowly — and
 * they are the two that keep a real conversation alive.
 */
const SITUATIONS = [
  "C’est le premier cours. Présentez-vous au groupe en quatre phrases : votre nom, votre pays, votre ville, votre métier.",
  "Vous n’avez pas compris le nom de la personne. Demandez-lui de répéter, puis d’épeler son nom.",
  "La personne parle trop vite pour vous. Demandez-lui de parler plus lentement, et reprenez la conversation.",
  "On vous demande d’où vous venez. Répondez, puis posez la même question.",
  "Quelqu’un arrive. Présentez-le à la personne : son nom, son pays, son métier.",
  "On vous demande votre âge et ce que vous faites. Répondez, et demandez la même chose.",
  "La conversation est finie. Remerciez et prenez congé.",
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
