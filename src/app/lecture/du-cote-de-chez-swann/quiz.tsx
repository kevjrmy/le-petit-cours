"use client";

import { Comprehension, type Question } from "@/components/exercice/Comprehension";

/**
 * The questions stay on the concrete: a candle, a book, half an hour, a train.
 * Everything abstract in this paragraph is above A2 and is not asked about —
 * the page is honest that it carries the opening and not the chapter.
 *
 * The last question is the most useful thing this text can teach at A2: why
 * *je me suis couché* is a passé composé and everything after it an imparfait.
 */
const QUESTIONS: Question[] = [
  {
    question: "À quelle heure le narrateur se couchait-il ?",
    options: ["Tard dans la nuit", "De bonne heure, c’est-à-dire tôt", "À midi"],
    answer: 1,
    because:
      "« Longtemps, je me suis couché de bonne heure. » De bonne heure veut dire tôt.",
  },
  {
    question: "Que fait-il dans son lit avant de s’endormir ?",
    options: ["Il lit", "Il écrit", "Il écoute la radio"],
    answer: 0,
    because:
      "Il veut « poser le volume » qu’il croit avoir encore dans les mains : il s’est endormi en lisant.",
  },
  {
    question: "Qu’est-ce qu’il éteint ?",
    options: ["La lampe électrique", "Sa bougie", "Le feu"],
    answer: 1,
    because: "« À peine ma bougie éteinte… » On est en 1913, et on s’éclaire à la bougie.",
  },
  {
    question: "Combien de temps après s’endormir se réveille-t-il ?",
    options: ["Une demi-heure après", "Deux heures après", "Au matin"],
    answer: 0,
    because: "« Et, une demi-heure après, la pensée qu’il était temps de chercher le sommeil m’éveillait. »",
  },
  {
    question: "En dormant, que croit-il être ?",
    options: [
      "Un enfant perdu",
      "Un voyageur dans un train",
      "Ce dont parle le livre qu’il lisait",
    ],
    answer: 2,
    because:
      "« Il me semblait que j’étais moi-même ce dont parlait l’ouvrage : une église, un quatuor, la rivalité de François Ier et de Charles-Quint. »",
  },
  {
    question: "Qu’entend-il, la nuit, quand il se demande l’heure ?",
    options: ["Le sifflement des trains", "La pluie", "Une horloge"],
    answer: 0,
    because:
      "Le sifflement des trains lui dit la distance, et lui fait imaginer la campagne et le voyageur.",
  },
  {
    question:
      "« Je me suis couché » est au passé composé, et la suite à l’imparfait. Pourquoi ?",
    options: [
      "Parce que la première phrase regarde toute une période, aujourd’hui finie",
      "Parce que la première phrase raconte une seule nuit",
      "Parce que le passé composé et l’imparfait sont la même chose",
    ],
    answer: 0,
    because:
      "Le passé composé pose la période en bloc : pendant longtemps, et c’est fini. Les imparfaits qui suivent racontent ce qui s’y passait chaque soir.",
  },
];

export function Quiz() {
  return <Comprehension questions={QUESTIONS} />;
}
