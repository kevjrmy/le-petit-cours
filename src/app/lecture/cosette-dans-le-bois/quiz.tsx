"use client";

import { Comprehension, type Question } from "@/components/exercice/Comprehension";

/**
 * The text is almost entirely dialogue, and its questions are the ones an A2
 * learner asks every day: quel âge as-tu, où demeures-tu, comment t’appelles-tu.
 * The last question is about « je vais vous le porter », which is the COD and
 * the COI in one line, and the reason this page links to that lesson.
 */
const QUESTIONS: Question[] = [
  {
    question: "Que porte Cosette quand l’homme la rencontre ?",
    options: ["Un panier", "Un seau d’eau", "Une poupée"],
    answer: 1,
    because: "« Cosette lâcha le seau. L’homme se mit à cheminer près d’elle. »",
  },
  {
    question: "Quel âge a-t-elle ?",
    options: ["Six ans", "Huit ans", "Douze ans"],
    answer: 1,
    because: "« — Petite, quel âge as-tu ? — Huit ans, monsieur. »",
  },
  {
    question: "D’où vient-elle avec son seau ?",
    options: [
      "De la source qui est dans le bois",
      "De la rivière du village",
      "De l’auberge",
    ],
    answer: 0,
    because: "Elle marche depuis la source, et il reste un bon quart d’heure.",
  },
  {
    question: "Que répond-elle quand l’homme lui parle de sa mère ?",
    options: [
      "Que sa mère est morte",
      "Que sa mère habite à Paris",
      "Qu’elle ne sait pas, et qu’elle croit n’en avoir jamais eu",
    ],
    answer: 2,
    because:
      "« Je ne sais pas », puis « Les autres en ont. Moi, je n’en ai pas. » C’est la phrase qui arrête l’homme net.",
  },
  {
    question: "Qui l’a envoyée chercher de l’eau, la nuit, dans le bois ?",
    options: ["Sa mère", "Madame Thénardier", "Personne"],
    answer: 1,
    because: "« — C’est madame Thénardier. »",
  },
  {
    question: "Que fait madame Thénardier ?",
    options: ["Elle tient une auberge", "Elle est maîtresse d’école", "Elle vend de l’eau"],
    answer: 0,
    because:
      "« C’est ma bourgeoise, dit l’enfant. Elle tient l’auberge. » C’est pour cela que l’homme décide d’y dormir.",
  },
  {
    question: "« Je vais vous le porter » : que remplace « le » ?",
    options: ["Le bois", "Le seau", "Le chemin"],
    answer: 1,
    because:
      "« le » remplace le seau, et « vous » remplace Cosette : il porte le seau à Cosette. Un COD et un COI dans la même phrase.",
  },
];

export function Quiz() {
  return <Comprehension questions={QUESTIONS} />;
}
