"use client";

import { useState } from "react";

/**
 * The constraint card, same contract as the two other role-plays: cycles in
 * order, stores nothing, and is the only client code on the page.
 *
 * Each entry is a different *function* rather than a different topic, so the
 * seven cannot be answered with one rehearsed paragraph comparing the two
 * countries: décrire avec des heures, raconter, faire expliquer un mot,
 * raconter à l’imparfait, accepter et relancer, chercher les ressemblances,
 * changer de registre en cours de conversation.
 *
 * **Nothing here sets the two speakers against each other.** The first draft
 * had the colleague finding Spanish hours impossible and being sure everyone
 * naps, which turns the scene into a defence: the learner spends her French
 * justifying her country instead of describing it. The colleague welcomes her,
 * so every entry is something two people build together. The count in the card
 * is read from this array, so adding an entry here is the whole change.
 */
const SITUATIONS = [
  "Votre collègue vous demande à quelle heure vous commencez et à quelle heure vous finissez. Décrivez votre journée, heure par heure.",
  "Votre collègue veut savoir ce qu’on fait à midi en Espagne : la pause, le repas, avec qui. Racontez-lui.",
  "Votre collègue emploie un mot que vous ne connaissez pas : « les congés », « un jour férié », « la mutuelle ». Faites-le expliquer.",
  "Racontez une journée dans votre ancien travail, en Espagne, à l’imparfait.",
  "Votre collègue vous propose de vous montrer quelque chose : la cantine, la machine à café, le badge. Acceptez, et posez une question.",
  "Trouvez trois choses qui se ressemblent dans les deux pays, pas seulement des différences.",
  "Votre collègue vous dit « on se tutoie ? ». Répondez, puis continuez en tutoyant.",
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
