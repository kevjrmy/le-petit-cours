"use client";

import { useState } from "react";
import { T } from "@/components/lang/T";

/**
 * The constraint card, same contract as the other role-plays: cycles in order,
 * stores nothing, and is the only client code on the page.
 *
 * Describing a town is the one scene a learner can survive with a rehearsed
 * paragraph, so every entry asks for a different *move* instead of a different
 * subject: situating, sizing without a number, recommending and justifying,
 * explaining how you get around, describing what is under the window, judging a
 * month, and defining a word French does not have. The last one is the only
 * place on this page where a Spanish word may be in the room, and it has to
 * leave it in French.
 *
 * The count in the card is read from this array, so adding an entry here is the
 * whole change.
 */
const SITUATIONS = [
  {
    fr: "Votre amie demande où est votre ville. Situez-la sans carte : par rapport à la mer, à la montagne, à une autre ville.",
    es: (
      <>
        Tu amiga pregunta dónde está tu ciudad. Sitúala sin mapa: con respecto
        al mar, a la montaña, a otra ciudad.
      </>
    ),
  },
  {
    fr: "Elle demande si c’est grand. Répondez sans donner de chiffre.",
    es: <>Pregunta si es grande. Responde sin dar ninguna cifra.</>,
  },
  {
    fr: "Elle n’a qu’un après-midi libre. Conseillez-lui un seul endroit, et dites pourquoi celui-là.",
    es: (
      <>
        Solo tiene una tarde libre. Aconséjale un único lugar y di por qué ese.
      </>
    ),
  },
  {
    fr: "Elle demande comment on se déplace chez vous, et si elle peut tout faire à pied.",
    es: (
      <>
        Pregunta cómo se mueve la gente por tu ciudad y si puede hacerlo todo a
        pie.
      </>
    ),
  },
  {
    fr: "Décrivez votre rue à quelqu’un qui ne l’a jamais vue : ce qu’il y a en bas, en face, à côté.",
    es: (
      <>
        Describe tu calle a alguien que nunca la ha visto: lo que hay abajo,
        enfrente, al lado.
      </>
    ),
  },
  {
    fr: "Elle veut venir au mois d’août. Dites-lui ce que ça change.",
    es: <>Quiere ir en agosto. Dile lo que cambia con eso.</>,
  },
  {
    fr: "Vous parlez d’une fête de chez vous. Le mot n’existe pas en français : expliquez-la autrement.",
    es: (
      <>
        Hablas de una fiesta de tu tierra. La palabra no existe en francés:
        explícala de otra manera.
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
