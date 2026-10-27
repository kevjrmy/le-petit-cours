"use client";

import { useState } from "react";
import { T } from "@/components/lang/T";

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
  {
    fr: "Un enfant demande ce qu’on mange en Espagne.",
    es: <>Un niño pregunta qué se come en España.</>,
  },
  {
    fr: "Un enfant est sûr qu’en Espagne il fait beau toute l’année. Vous n’êtes pas d’accord.",
    es: (
      <>
        Un niño está seguro de que en España hace buen tiempo todo el año. Tú no
        estás de acuerdo.
      </>
    ),
  },
  {
    fr: "Un enfant demande si l’école est comme en France.",
    es: <>Un niño pregunta si el colegio es como en Francia.</>,
  },
  {
    fr: "Un enfant demande comment c’était, votre école, quand vous étiez petite.",
    es: (
      <>Un niño pregunta cómo era tu colegio cuando eras pequeño o pequeña.</>
    ),
  },
  {
    fr: "Un enfant pose une question dont vous ne connaissez pas la réponse.",
    es: <>Un niño hace una pregunta cuya respuesta no sabes.</>,
  },
  {
    fr: "Deux enfants parlent en même temps. Faites répéter, puis répondez à l’un des deux.",
    es: (
      <>
        Dos niños hablan a la vez. Pide que repitan y luego responde a uno de
        los dos.
      </>
    ),
  },
  {
    fr: "Un enfant veut savoir si Bad Bunny est plus connu qu’Aya Nakamura.",
    es: (
      <>Un niño quiere saber si Bad Bunny es más conocido que Aya Nakamura.</>
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
