"use client";

import { useState, type ReactNode } from "react";

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
const SITUATIONS: ReactNode[] = [
  <>
    Es la primera clase. Preséntate al grupo con cuatro frases: tu nombre, tu
    país, tu ciudad y tu trabajo.
  </>,
  <>
    No has entendido el nombre de la persona. Pídele que lo repita y después que
    lo deletree.
  </>,
  <>
    La persona habla demasiado deprisa. Pídele que hable más despacio y sigue
    con la conversación.
  </>,
  <>Te preguntan de dónde eres. Responde y haz tú la misma pregunta.</>,
  <>
    Llega otra persona. Preséntasela a tu interlocutor: di{" "}
    <span className="fr" lang="fr">
      voici
    </span>{" "}
    y su nombre, y di cómo se llama.
  </>,
  <>Te preguntan tu edad y a qué te dedicas. Responde y pregunta lo mismo.</>,
  <>La conversación ha terminado. Da las gracias y despídete.</>,
];

export function Situations() {
  const [index, setIndex] = useState(0);

  return (
    <div className="card">
      <p>
        <strong>
          Situación {index + 1} de {SITUATIONS.length}
        </strong>
      </p>

      <p aria-live="polite" lang="es">
        {SITUATIONS[index]}
      </p>

      <p>
        <button
          type="button"
          className="button"
          onClick={() => setIndex((i) => (i + 1) % SITUATIONS.length)}
        >
          Otra situación
        </button>
      </p>
    </div>
  );
}
