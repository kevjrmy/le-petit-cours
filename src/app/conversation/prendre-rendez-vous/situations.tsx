"use client";

import { useState } from "react";

/**
 * The one interactive part of a role-play page: a constraint to play the scene
 * against, and a button that moves to the next one.
 *
 * It **cycles in order** rather than drawing at random. Two reasons, and both
 * are the point: a random pick renders one thing on the server and another on
 * the client, which is the hydration trap `AGENTS.md` §4 describes; and in a
 * class you want to walk the whole list, not roll dice against it. Nothing is
 * stored — the scene is replayable and records nothing, exactly like a game
 * (`AGENTS.md` §7).
 */
const SITUATIONS = [
  "Vous êtes libre seulement le matin. L’après-midi, vous travaillez.",
  "Le cabinet n’a rien avant jeudi, et vous avez mal depuis trois jours.",
  "Vous appelez pour annuler le rendez-vous de mardi, puis pour en prendre un autre.",
  "Le docteur Lambert est absent cette semaine. On vous propose un autre médecin.",
  "Vous appelez pour votre fils de huit ans, pas pour vous.",
  "La secrétaire propose une heure, vous n’avez pas bien entendu : faites répéter.",
];

export function Situations() {
  const [index, setIndex] = useState(0);

  return (
    <div className="card">
      <p>
        <strong>Situation {index + 1} sur {SITUATIONS.length}</strong>
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
