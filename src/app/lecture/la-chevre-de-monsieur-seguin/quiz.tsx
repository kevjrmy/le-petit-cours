"use client";

import { Comprehension, type Question } from "@/components/exercice/Comprehension";

/**
 * The questions for this text. They are data, not a component: the page stays a
 * Server Component and only this leaf ships JavaScript (`AGENTS.md` §4).
 *
 * Every answer is *in the text* and each distractor is wrong on the page rather
 * than merely unlikely — a question answerable from general knowledge tests
 * nothing about the reading. The last one is about the imparfait, which is the
 * lesson this page practises: the text is nine sentences of it.
 */
const QUESTIONS: Question[] = [
  {
    question: "Pourquoi M. Seguin perdait-il toutes ses chèvres ?",
    options: [
      "Elles tombaient malades",
      "Le loup les mangeait dans la montagne",
      "Il les vendait au marché",
    ],
    answer: 1,
    because:
      "Elles partaient dans la montagne, et là-haut le loup les mangeait.",
  },
  {
    question: "Comment les chèvres partaient-elles ?",
    options: [
      "Elles cassaient leur corde",
      "Elles sautaient par-dessus le mur",
      "M. Seguin ouvrait la porte",
    ],
    answer: 0,
    because: "« Un beau matin, elles cassaient leur corde. »",
  },
  {
    question: "Qu’est-ce que les chèvres voulaient ?",
    options: [
      "Rester près de leur maître",
      "Plus d’herbe et moins de loups",
      "Le grand air et la liberté",
    ],
    answer: 2,
    because:
      "Le texte le dit en une phrase : des chèvres « voulant à tout prix le grand air et la liberté ».",
  },
  {
    question: "Au début du texte, que décide M. Seguin ?",
    options: [
      "De ne plus garder de chèvre",
      "De tuer le loup",
      "D’acheter une corde plus solide",
    ],
    answer: 0,
    because: "« C’est fini ; […] je n’en garderai pas une. »",
  },
  {
    question: "Que propose M. Seguin à Blanquette pour la garder ?",
    options: [
      "De l’emmener dans la montagne",
      "D’allonger la corde",
      "De lui donner une autre écuelle",
    ],
    answer: 1,
    because:
      "C’est sa seule proposition : « veux-tu que j’allonge la corde ». Le reste, ce sont des questions.",
  },
  {
    question: "Pourquoi Blanquette veut-elle partir ?",
    options: [
      "Parce qu’elle a faim",
      "Parce qu’elle n’aime pas M. Seguin",
      "Parce qu’elle veut aller dans la montagne",
    ],
    answer: 2,
    because:
      "Elle ne manque de rien : l’herbe ne lui manque pas, la corde n’est pas trop courte. Elle veut la montagne.",
  },
  {
    question: "« Elles cassaient leur corde » : à quel temps est ce verbe ?",
    options: ["Au présent", "À l’imparfait", "Au passé composé"],
    answer: 1,
    because:
      "La terminaison -aient est celle de l’imparfait. Ici, il dit une habitude : ça arrivait chaque fois.",
  },
];

export function Quiz() {
  return <Comprehension questions={QUESTIONS} />;
}
