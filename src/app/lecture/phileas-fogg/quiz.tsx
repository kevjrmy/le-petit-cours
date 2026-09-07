"use client";

import { Comprehension, type Question } from "@/components/exercice/Comprehension";

/**
 * Every answer is in the extracts above, and the last one is the grammar the
 * text is made of: nine imparfaits describing a life that never varies.
 */
const QUESTIONS: Question[] = [
  {
    question: "Où Phileas Fogg déjeune-t-il et dîne-t-il ?",
    options: ["Chez lui, à Saville-row", "Au Reform-Club", "Chez ses amis"],
    answer: 1,
    because:
      "« Déjeunant, dînant au club à des heures chronométriquement déterminées, dans la même salle, à la même table. »",
  },
  {
    question: "Combien de domestiques a-t-il ?",
    options: ["Un seul", "Deux", "Aucun"],
    answer: 0,
    because: "« Un seul domestique suffisait à le servir. »",
  },
  {
    question: "Pourquoi rentre-t-il chez lui ?",
    options: ["Pour travailler", "Pour recevoir ses amis", "Pour se coucher"],
    answer: 2,
    because:
      "« Il ne rentrait chez lui que pour se coucher, à minuit précis. » Le reste du temps, il est au club.",
  },
  {
    question: "Pourquoi M. Fogg a-t-il renvoyé James Forster ?",
    options: [
      "Il est arrivé en retard",
      "Il a apporté de l’eau à la mauvaise température",
      "Il a cassé la pendule",
    ],
    answer: 1,
    because:
      "Quatre-vingt-quatre degrés au lieu de quatre-vingt-six. Deux degrés, et il perd sa place.",
  },
  {
    question: "Quelle heure Passepartout a-t-il à sa montre ?",
    options: ["Onze heures et demie", "Onze heures vingt-deux", "Midi"],
    answer: 1,
    because: "Il tire sa montre de son gousset et répond : « Onze heures vingt-deux. »",
  },
  {
    question: "Que répond M. Fogg à cette heure-là ?",
    options: [
      "Qu’elle est juste",
      "Que la montre avance de quatre minutes",
      "Que la montre retarde de quatre minutes",
    ],
    answer: 2,
    because:
      "« Vous retardez de quatre minutes. » Il est donc onze heures vingt-six, et Passepartout entre au service à onze heures vingt-neuf.",
  },
  {
    question:
      "« Il vivait seul », « il ne rentrait que pour se coucher », « il en passait dix à son domicile » : pourquoi tous ces imparfaits ?",
    options: [
      "Parce que ce sont des habitudes",
      "Parce que c’est arrivé une seule fois",
      "Parce que c’est le présent",
    ],
    answer: 0,
    because:
      "L’imparfait dit ce qui se répétait tous les jours. Un événement unique, lui, arrive au passé composé.",
  },
];

export function Quiz() {
  return <Comprehension questions={QUESTIONS} />;
}
