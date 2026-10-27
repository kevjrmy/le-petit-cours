"use client";

import { useState, type ReactNode } from "react";
import { T } from "@/components/lang/T";

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
const SITUATIONS: { fr: ReactNode; es: ReactNode }[] = [
  {
    fr: "C’est le premier cours. Présentez-vous au groupe en quatre phrases : votre nom, votre pays, votre ville et votre travail.",
    es: (
      <>
        Es la primera clase. Preséntate al grupo con cuatro frases: tu nombre,
        tu país, tu ciudad y tu trabajo.
      </>
    ),
  },
  {
    fr: "Vous n’avez pas compris le nom de la personne. Demandez-lui de le répéter, puis de l’épeler.",
    es: (
      <>
        No has entendido el nombre de la persona. Pídele que lo repita y después
        que lo deletree.
      </>
    ),
  },
  {
    fr: "La personne parle trop vite. Demandez-lui de parler plus lentement, puis continuez la conversation.",
    es: (
      <>
        La persona habla demasiado deprisa. Pídele que hable más despacio y
        sigue con la conversación.
      </>
    ),
  },
  {
    fr: "On vous demande d’où vous êtes. Répondez, puis posez la même question.",
    es: <>Te preguntan de dónde eres. Responde y haz tú la misma pregunta.</>,
  },
  {
    fr: (
      <>
        Une troisième personne arrive. Présentez-la : dites{" "}
        <span className="fr">voici</span> et son nom.
      </>
    ),
    es: (
      <>
        Llega una tercera persona. Preséntala: di{" "}
        <span className="fr" lang="fr">
          voici
        </span>{" "}
        y su nombre.
      </>
    ),
  },
  {
    fr: "On vous demande votre âge et votre métier. Répondez, puis posez les mêmes questions.",
    es: (
      <>
        Te preguntan tu edad y a qué te dedicas. Responde y pregunta lo mismo.
      </>
    ),
  },
  {
    fr: "La conversation est finie. Dites merci et au revoir.",
    es: <>La conversación ha terminado. Da las gracias y despídete.</>,
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
