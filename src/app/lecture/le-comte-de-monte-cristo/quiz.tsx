"use client";

import { Comprehension, type Question } from "@/components/exercice/Comprehension";

/**
 * Five questions on what is said, then two on what is not. The whole novel
 * turns on the second kind — Morrel asking after the cargo before the dead man,
 * Danglars looking sideways — and both are readable at A2 because the text
 * states the gesture even where it hides the motive.
 */
const QUESTIONS: Question[] = [
  {
    question: "Où et quand cette scène se passe-t-elle ?",
    options: [
      "À Naples, en 1815",
      "À Marseille, en 1815",
      "À Marseille, en 1840",
    ],
    answer: 1,
    because:
      "« Le 24 février 1815, la vigie de Notre-Dame de la Garde signala le trois-mâts le Pharaon. » Notre-Dame de la Garde est à Marseille.",
  },
  {
    question: "Qu’est-ce que le Pharaon ?",
    options: ["Un bateau", "Une maison", "Un café du port"],
    answer: 0,
    because:
      "C’est un trois-mâts, un grand bateau à voiles, qui revient de Smyrne, de Trieste et de Naples.",
  },
  {
    question: "Quel âge a Edmond Dantès ?",
    options: ["Entre dix et douze ans", "Entre dix-huit et vingt ans", "Trente ans"],
    answer: 1,
    because:
      "« C’était un jeune homme de dix-huit à vingt ans, grand, svelte, avec de beaux yeux noirs. »",
  },
  {
    question: "Quel est le grand malheur ?",
    options: [
      "Le bateau a été attaqué",
      "Le chargement est perdu",
      "Le capitaine Leclère est mort",
    ],
    answer: 2,
    because:
      "« Nous avons perdu ce brave capitaine Leclère. » Un peu plus loin, Dantès le dit en trois mots : « Il est mort. »",
  },
  {
    question: "De quoi le capitaine est-il mort ?",
    options: [
      "Il est tombé à la mer",
      "D’une fièvre",
      "Il s’est battu contre les Anglais",
    ],
    answer: 1,
    because:
      "Morrel demande « Tombé à la mer ? » et Dantès répond : « Non, monsieur ; mort d’une fièvre cérébrale. »",
  },
  {
    question:
      "Après la nouvelle de la mort, quelle est la première question de monsieur Morrel ?",
    options: [
      "Il demande des nouvelles du chargement",
      "Il demande comment le capitaine est mort",
      "Il demande si l’équipage va bien",
    ],
    answer: 0,
    because:
      "« Et le chargement ? demanda vivement l’armateur. » Il ne revient au capitaine qu’ensuite, et « d’un air visiblement soulagé » : la marchandise est sauve.",
  },
  {
    question: "Que pense Danglars de Dantès ?",
    options: [
      "Il l’admire",
      "Il ne le connaît pas",
      "Il le déteste",
    ],
    answer: 2,
    because:
      "Il ne le dit pas ; le texte le montre. Il jette « un regard oblique où brilla un éclair de haine », et il appelle Dantès « cela ».",
  },
];

export function Quiz() {
  return <Comprehension questions={QUESTIONS} />;
}
