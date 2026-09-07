"use client";

import { Comprehension, type Question } from "@/components/exercice/Comprehension";

/**
 * Half the questions are on the prologue, which tells the whole plot before it
 * starts, and half on the street scene, where the quarrel begins over a
 * gesture. Nothing here needs the English, and nothing needs Shakespeare: the
 * page asks about the French she has in front of her.
 */
const QUESTIONS: Question[] = [
  {
    question: "Dans quelle ville se passe la pièce ?",
    options: ["À Venise", "À Vérone", "À Florence"],
    answer: 1,
    because: "« Dans la belle Vérone, où nous plaçons notre scène. »",
  },
  {
    question: "Combien de familles se détestent ?",
    options: ["Deux", "Trois", "Toute la ville"],
    answer: 0,
    because:
      "« Deux familles, égales en noblesse » : les Capulets et les Montagues.",
  },
  {
    question: "D’après le prologue, que devient le couple d’amoureux ?",
    options: [
      "Il se marie et quitte la ville",
      "Il meurt, et cette mort arrête la haine des familles",
      "Il reste séparé pour toujours",
    ],
    answer: 1,
    because:
      "Le prologue raconte la fin dès le début : leur ruine « doit ensevelir dans leur tombe l’animosité de leurs parents ».",
  },
  {
    question: "Combien de temps la pièce doit-elle durer, d’après le prologue ?",
    options: ["Une heure", "Deux heures", "Toute une journée"],
    answer: 1,
    because: "« Vont en deux heures être exposés sur notre scène. »",
  },
  {
    question: "Comment la bagarre commence-t-elle, dans la rue ?",
    options: [
      "Samson mord son pouce en regardant les hommes de l’autre maison",
      "Abraham vole l’épée de Samson",
      "Tybalt insulte Grégoire",
    ],
    answer: 0,
    because:
      "Mordre son pouce devant quelqu’un était une insulte. Tout commence par un geste, et personne ne veut être celui qui a commencé.",
  },
  {
    question: "Que veut faire Benvolio quand il arrive ?",
    options: [
      "Se battre contre Tybalt",
      "Séparer les hommes et garder la paix",
      "Appeler les citoyens",
    ],
    answer: 1,
    because:
      "« Séparez-vous, imbéciles ! » puis « Je ne veux ici que maintenir la paix. »",
  },
  {
    question: "Que répond Tybalt quand Benvolio parle de paix ?",
    options: [
      "Qu’il est d’accord",
      "Qu’il déteste ce mot",
      "Qu’il va chercher son maître",
    ],
    answer: 1,
    because:
      "« Ce mot, je le hais, comme je hais l’enfer, tous les Montagues et toi. »",
  },
];

export function Quiz() {
  return <Comprehension questions={QUESTIONS} />;
}
