"use client";

import { useState } from "react";
import { T } from "@/components/lang/T";

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
  {
    fr: "Votre collègue vous demande à quelle heure vous commencez et à quelle heure vous finissez. Décrivez votre journée, heure par heure.",
    es: (
      <>
        Tu compañero te pregunta a qué hora empiezas y a qué hora terminas.
        Describe tu jornada, hora por hora.
      </>
    ),
  },
  {
    fr: "Votre collègue veut savoir ce qu’on fait à midi en Espagne : la pause, le repas, avec qui. Racontez-lui.",
    es: (
      <>
        Tu compañero quiere saber qué se hace a mediodía en España: la pausa, la
        comida, con quién. Cuéntaselo.
      </>
    ),
  },
  {
    fr: "Votre collègue emploie un mot que vous ne connaissez pas : « les congés », « un jour férié », « la mutuelle ». Faites-le expliquer.",
    es: (
      <>
        Tu compañero usa una palabra que no conoces:{" "}
        <span className="fr" lang="fr">
          « les congés »
        </span>
        ,{" "}
        <span className="fr" lang="fr">
          « un jour férié »
        </span>
        ,{" "}
        <span className="fr" lang="fr">
          « la mutuelle »
        </span>
        . Pide que te la expliquen.
      </>
    ),
  },
  {
    fr: "Racontez une journée dans votre ancien travail, en Espagne, à l’imparfait.",
    es: (
      <>
        Cuenta una jornada de tu antiguo trabajo, en España, en{" "}
        <span className="fr" lang="fr">
          imparfait
        </span>
        .
      </>
    ),
  },
  {
    fr: "Votre collègue vous propose de vous montrer quelque chose : la cantine, la machine à café, le badge. Acceptez, et posez une question.",
    es: (
      <>
        Tu compañero te propone enseñarte algo:{" "}
        <span className="fr" lang="fr">
          la cantine
        </span>
        ,{" "}
        <span className="fr" lang="fr">
          la machine à café
        </span>
        ,{" "}
        <span className="fr" lang="fr">
          le badge
        </span>
        . Acepta y haz una pregunta.
      </>
    ),
  },
  {
    fr: "Trouvez trois choses qui se ressemblent dans les deux pays, pas seulement des différences.",
    es: (
      <>
        Encuentra tres cosas que se parezcan en los dos países, no solo
        diferencias.
      </>
    ),
  },
  {
    fr: "Votre collègue vous dit « on se tutoie ? ». Répondez, puis continuez en tutoyant.",
    es: (
      <>
        Tu compañero te dice{" "}
        <span className="fr" lang="fr">
          « on se tutoie ? »
        </span>
        . Responde y sigue tuteando.
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
