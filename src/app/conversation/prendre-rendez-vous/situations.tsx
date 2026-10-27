"use client";

import { useState } from "react";
import { T } from "@/components/lang/T";

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
  {
    fr: "Vous êtes libre seulement le matin. L’après-midi, vous travaillez.",
    es: <>Solo estás libre por la mañana. Por la tarde trabajas.</>,
  },
  {
    fr: "Le cabinet n’a rien avant jeudi, et vous avez mal depuis trois jours.",
    es: (
      <>
        La consulta no tiene nada hasta el jueves y llevas tres días con dolor.
      </>
    ),
  },
  {
    fr: "Vous appelez pour annuler le rendez-vous de mardi, puis pour en prendre un autre.",
    es: <>Llamas para anular la cita del martes y luego para pedir otra.</>,
  },
  {
    fr: "Le docteur Lambert est absent cette semaine. On vous propose un autre médecin.",
    es: (
      <>El doctor Lambert está ausente esta semana. Te proponen otro médico.</>
    ),
  },
  {
    fr: "Vous appelez pour votre fils de huit ans, pas pour vous.",
    es: <>Llamas por tu hijo de ocho años, no por ti.</>,
  },
  {
    fr: "La secrétaire propose une heure, vous n’avez pas bien entendu : faites répéter.",
    es: (
      <>
        La secretaria propone una hora y no has oído bien: pide que la repita.
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
