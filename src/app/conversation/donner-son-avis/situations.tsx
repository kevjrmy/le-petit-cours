"use client";

import { useState } from "react";
import { T } from "@/components/lang/T";

/**
 * The constraint card, same contract as the other role-plays: cycles in order,
 * stores nothing, and is the only client code on the page.
 *
 * Each entry is a different *move* of an argument rather than a different
 * topic, so the seven cannot be answered with one rehearsed opinion: un avis et
 * une raison, contredire avec un exemple, concéder puis ajouter, nuancer,
 * approuver et ajouter, deux raisons et une fin, demander l’avis de l’autre.
 *
 * **The subjects are everyday choices, never the learner’s country or her
 * life.** A disagreement about trains costs nothing; one about where she comes
 * from turns the scene into a defence (see `parler-du-travail`). The count in
 * the card is read from this array, so adding an entry here is the whole
 * change.
 */
const SITUATIONS = [
  {
    fr: "Votre amie vous demande : pour vivre, la ville ou la campagne ? Donnez votre avis, puis une raison.",
    es: (
      <>
        Tu amiga te pregunta: para vivir, ¿la ciudad o el campo? Da tu opinión y
        luego una razón.
      </>
    ),
  },
  {
    fr: "Votre amie ne cuisine jamais : pour elle, le restaurant est plus simple. Vous n’êtes pas d’accord. Dites-le, avec un exemple.",
    es: (
      <>
        Tu amiga no cocina nunca: para ella, el restaurante es más sencillo. No
        estás de acuerdo. Dilo, con un ejemplo.
      </>
    ),
  },
  {
    fr: "Votre amie pense que le train est toujours mieux que la voiture. Acceptez une partie de son idée, puis ajoutez la vôtre.",
    es: (
      <>
        Tu amiga piensa que el tren es siempre mejor que el coche. Acepta una
        parte de su idea y añade la tuya.
      </>
    ),
  },
  {
    fr: "Votre amie vous demande si un enfant de dix ans peut avoir un téléphone. Répondez que ça dépend, et dites de quoi.",
    es: (
      <>
        Tu amiga te pregunta si un niño de diez años puede tener móvil. Responde
        que depende, y di de qué.
      </>
    ),
  },
  {
    fr: "Votre amie trouve que les gens regardent trop leur téléphone. Vous êtes d’accord : ajoutez une deuxième raison.",
    es: (
      <>
        Tu amiga piensa que la gente mira demasiado el móvil. Estás de
        acuerdo: añade una segunda razón.
      </>
    ),
  },
  {
    fr: "Travailler à la maison ou au bureau ? Donnez deux raisons, puis fermez votre avis en une phrase.",
    es: (
      <>
        ¿Trabajar en casa o en la oficina? Da dos razones y luego cierra tu
        opinión en una frase.
      </>
    ),
  },
  {
    fr: "C’est vous qui posez la question : les vacances à la mer ou à la montagne ? Écoutez la réponse de votre amie, puis dites si vous êtes d’accord.",
    es: (
      <>
        Ahora preguntas tú: ¿vacaciones en la playa o en la montaña? Escucha la
        respuesta de tu amiga y di si estás de acuerdo.
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
