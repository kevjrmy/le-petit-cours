"use client";

import { Comprehension, type Question } from "@/components/exercice/Comprehension";

/**
 * The questions stay on what happens in the room — who pays, who does not, what
 * each pair of people is doing while they wait. That is what a crowd scene can
 * be asked about at A2, and it is also what makes the scene funny.
 */
const QUESTIONS: Question[] = [
  {
    question: "Où sommes-nous ?",
    options: ["Dans une auberge", "Dans un théâtre", "Dans une église"],
    answer: 1,
    because:
      "Un portier fait payer l’entrée, le parterre est encore vide, et la pièce commence à deux heures.",
  },
  {
    question: "Combien coûte l’entrée ?",
    options: ["Quinze sols", "Deux sols", "C’est gratuit"],
    answer: 0,
    because: "« Holà ! vos quinze sols ! » crie le portier à chaque arrivée.",
  },
  {
    question: "Pourquoi le premier cavalier ne paye-t-il pas ?",
    options: [
      "Parce qu’il connaît le portier",
      "Parce qu’il paiera en sortant",
      "Parce qu’il est un soldat du Roi",
    ],
    answer: 2,
    because:
      "« Je suis chevau-léger de la maison du Roi ! » Le deuxième fait pareil : « Je suis mousquetaire. »",
  },
  {
    question: "À quelle heure la pièce commence-t-elle ?",
    options: ["À midi", "À deux heures", "À la nuit tombée"],
    answer: 1,
    because: "« On ne commence qu’à deux heures. Le parterre est vide. »",
  },
  {
    question: "Que font les deux cavaliers en attendant ?",
    options: [
      "Ils s’exercent au fleuret",
      "Ils jouent aux cartes",
      "Ils mangent",
    ],
    answer: 0,
    because:
      "« Exerçons-nous au fleuret », et un peu plus loin l’un d’eux reçoit un coup : « Touche ! »",
  },
  {
    question: "Et les deux laquais ?",
    options: ["Ils dorment", "Ils jouent aux cartes et aux dés", "Ils servent à boire"],
    answer: 1,
    because:
      "« Cartes. Dés. Jouons. » Ils s’assoient par terre pour jouer, pendant que les cavaliers se battent.",
  },
  {
    question: "D’où vient la chandelle qu’un laquais allume par terre ?",
    options: [
      "Il l’a prise à son maître",
      "Le portier la lui a donnée",
      "Il l’a achetée en entrant",
    ],
    answer: 0,
    because:
      "« J’ai soustrait à mon maître un peu de luminaire. » Soustraire, ici, veut dire prendre sans demander.",
  },
];

export function Quiz() {
  return <Comprehension questions={QUESTIONS} />;
}
