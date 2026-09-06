"use client";

import { useState } from "react";

/**
 * The constraint card, same contract as `prendre-rendez-vous/situations.tsx`:
 * cycles in order, stores nothing, and is the only client code on the page.
 *
 * Each entry is a different *function* rather than a different topic, so the
 * seven of them cannot be answered with one rehearsed paragraph about Spain:
 * describing, contradicting politely, asking for repetition, comparing,
 * remembering in the imparfait, and admitting you do not know.
 *
 * The Bad Bunny one carries a second job. He is Puerto Rican, so the question
 * arrives with a wrong premise inside it, and correcting someone politely
 * without dropping the conversation is its own skill. The count in the card is
 * read from this array, so adding an entry here is the whole change.
 */
const SITUATIONS = [
  "Un enfant demande ce qu’on mange en Espagne.",
  "Un enfant est sûr qu’en Espagne il fait beau toute l’année. Vous n’êtes pas d’accord.",
  "Un enfant demande si l’école est comme en France.",
  "Un enfant demande comment c’était, votre école, quand vous étiez petite.",
  "Un enfant pose une question dont vous ne connaissez pas la réponse.",
  "Deux enfants parlent en même temps. Faites répéter, puis répondez à l’un des deux.",
  "Un enfant veut savoir si Bad Bunny est plus connu qu’Aya Nakamura.",
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
