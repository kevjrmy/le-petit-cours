import type { Question, QuestionSets } from "@/components/exercice/Comprehension";

/**
 * The questions for this text: one set, at A1.
 *
 * **Asked in Spanish, answered from the French** (#85): the question and
 * `because` are explanation, so they are Spanish; `because` quotes the French
 * line that settles it, and an option is French where it cites the text.
 * **Every piece of French sits in « »**: `quotes="fr"` in `quiz.tsx` gives
 * each one `lang="fr"`, and French outside guillemets is read in Spanish.
 *
 * **Data, not a component**, so the `nav-wiring` audit can import it. Every
 * import here is `import type`, which type stripping erases.
 */
const A1: Question[] = [
  {
    question: "¿Dónde está el lobo cuando entra Caperucita?",
    options: [
      "Detrás de la puerta",
      "En la cama, debajo de la manta",
      "Debajo de la mesa",
    ],
    answer: 1,
    because:
      "« en se cachant dans le lit, sous la couverture »: se esconde en la cama, debajo de la manta.",
  },
  {
    question: "¿Qué le pide el lobo a Caperucita?",
    options: [
      "Dejar la comida y acostarse con él",
      "Cerrar la puerta y salir",
      "Comer la « galette » con él",
    ],
    answer: 0,
    because:
      "« Mets la galette et le petit pot de beurre sur la huche, et viens te coucher avec moi. »",
  },
  {
    question: "¿Qué partes del cuerpo nombra Caperucita, en este orden?",
    options: [
      "« les yeux, les oreilles, les bras, les jambes, les dents »",
      "« les bras, les jambes, les oreilles, les yeux, les dents »",
      "« la tête, les mains, les pieds, le nez, la bouche »",
    ],
    answer: 1,
    because:
      "Empieza por « de grands bras » y termina por « de grandes dents »: los dientes van al final.",
  },
  {
    question: "Según el lobo, ¿para qué son las orejas grandes?",
    options: ["Para ver mejor", "Para escuchar mejor", "Para correr mejor"],
    answer: 1,
    because:
      "« C’est pour mieux écouter »: « écouter » es escuchar. Ver es para los ojos, correr para las piernas.",
  },
  {
    question: "¿Qué contesta el lobo cuando Caperucita habla de sus dientes?",
    options: [
      "« C’est pour mieux te voir »",
      "« C’est pour mieux t’embrasser »",
      "« C’est pour te manger »",
    ],
    answer: 2,
    because:
      "Es la última respuesta, y la única sin « mieux »: ya no hay nada mejor, solo comer.",
  },
  {
    question: "¿Cómo termina el cuento de Perrault?",
    options: [
      "Un cazador salva a Caperucita",
      "El lobo se come a Caperucita",
      "Caperucita se escapa por la puerta",
    ],
    answer: 1,
    because:
      "« ce méchant Loup se jeta sur le petit Chaperon rouge, et la mangea. » En Perrault no hay cazador.",
  },
  {
    question:
      "Caperucita dice « vous avez » a su abuela, y el lobo le dice « te voir » a ella. ¿Por qué?",
    options: [
      "Caperucita habla con respeto a una persona mayor, y la abuela habla a una niña",
      "« vous » es más cariñoso que « tu »",
      "Caperucita habla a varias personas a la vez",
    ],
    answer: 0,
    because:
      "« Ma mère-grand, que vous avez »: « vous » para la abuela. « t’embrasser », « te voir »: « tu » para la niña.",
  },
];

export const SETS: QuestionSets = { A1 };
