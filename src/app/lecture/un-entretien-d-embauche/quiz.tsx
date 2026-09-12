"use client";

import {
  Comprehension,
  type Question,
} from "@/components/exercice/Comprehension";

/**
 * The questions for this dialogue. Data, not a component (`AGENTS.md` §4).
 *
 * A job interview is a scene the reader can half-guess, so every distractor
 * here is a *plausible* interview answer that this dialogue does not give —
 * a different reason for leaving, a different day off, a different training.
 * Guessing from experience gets you the wrong one.
 *
 * The last question is about the futur proche, which the dialogue uses twice
 * and which `grammaire/le-futur-proche` explains.
 */
const QUESTIONS: Question[] = [
  {
    question: "Pourquoi M. Morales veut-il travailler dans cette librairie ?",
    options: [
      "Parce qu’elle est près de chez lui",
      "Parce qu’elle vend des livres étrangers",
      "Parce que le salaire est intéressant",
    ],
    answer: 1,
    because:
      "« Parce que vous vendez beaucoup de livres étrangers, et que j’aime conseiller les clients. »",
  },
  {
    question: "Qu’a-t-il fait à Séville ?",
    options: [
      "Il a été vendeur pendant deux ans",
      "Il a étudié les langues",
      "Il a dirigé une librairie",
    ],
    answer: 0,
    because:
      "« J’ai travaillé deux ans comme vendeur à Séville » : vendeur, pas directeur.",
  },
  {
    question: "Pourquoi a-t-il quitté l’Espagne ?",
    options: [
      "Il a perdu son travail",
      "Sa femme a trouvé un travail en France",
      "Il voulait apprendre le français",
    ],
    answer: 1,
    because: "« Ma femme a trouvé un travail ici. Nous sommes arrivés en juin. »",
  },
  {
    question: "Quel jour la librairie est-elle fermée ?",
    options: ["Le dimanche", "Le samedi", "Le lundi"],
    answer: 2,
    because:
      "« Du mardi au samedi. Le magasin est fermé le lundi. » Le samedi, au contraire, on travaille.",
  },
  {
    question: "Combien de temps dure la période d’essai ?",
    options: ["Une semaine", "Deux mois", "Six mois"],
    answer: 1,
    because: "« Oui, deux mois. Après, le contrat devient définitif. »",
  },
  {
    question: "Quelle question M. Morales pose-t-il à la fin ?",
    options: [
      "Il demande s’il y aura une formation",
      "Il demande le montant du salaire",
      "Il demande combien de jours de congés il aura",
    ],
    answer: 0,
    because:
      "« Est-ce que je vais suivre une formation au logiciel de caisse ? » C’est sa seule question.",
  },
  {
    question:
      "« Nous allons vous donner une réponse vendredi » : à quel temps est cette phrase ?",
    options: ["Au présent", "Au futur proche", "Au passé composé"],
    answer: 1,
    because:
      "« aller » au présent suivi d’un infinitif : c’est le futur proche, celui de la conversation.",
  },
];

export function Quiz() {
  return <Comprehension questions={QUESTIONS} />;
}
