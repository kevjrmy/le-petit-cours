import type { Question } from "@/components/exercice/Comprehension";

/**
 * The questions for this récit: one set, at A2.
 *
 * **Data, not a component, and in its own file** so the question check in
 * `.claude/agents/lesson-author.md` and the `nav-wiring` audit can import it.
 * Every import here is `import type`, which type stripping erases, so plain
 * `node` reads it. `SETS` keeps its name with a single key: the audit reads it,
 * and the manifest declares no `sets` for one body of work (#87).
 *
 * The facts in the order of the text, then two « pourquoi » that a connector
 * answers (`parce que`, `donc`), and a last question on `pourtant`, the false
 * friend of `gram-connecteurs`.
 */
const A2: Question[] = [
  {
    question: "Où Ulysse veut-il aller ?",
    options: ["Sur l’île des Cyclopes", "Chez lui, à Ithaque", "À Troie"],
    answer: 1,
    because:
      "« Ulysse veut rentrer chez lui, sur l’île d’Ithaque » : la guerre de Troie est finie, et l’île des Cyclopes est seulement sur sa route.",
  },
  {
    question: "Qui est Polyphème ?",
    options: [
      "Le maître de la grotte",
      "Un des douze hommes d’Ulysse",
      "Le père de Poséidon",
    ],
    answer: 0,
    because:
      "« Le maître de la grotte rentre avec son troupeau de moutons. C’est Polyphème ». Poséidon est son père, pas son fils.",
  },
  {
    question: "Pourquoi Ulysse ne tue-t-il pas le géant pendant la nuit ?",
    options: [
      "Parce qu’il ne veut pas le tuer",
      "Parce que les autres Cyclopes sont dans la grotte",
      "Parce que les hommes ne peuvent pas bouger le rocher",
    ],
    answer: 2,
    because:
      "« Il ne fait rien, parce que les hommes ne peuvent pas bouger le rocher. Sans le géant, ils restent enfermés. »",
  },
  {
    question: "Pourquoi les autres Cyclopes repartent-ils ?",
    options: [
      "Parce qu’ils ont peur d’Ulysse",
      "Parce qu’ils pensent que tout va bien",
      "Parce que Polyphème dort",
    ],
    answer: 1,
    because:
      "Polyphème répond « Personne ! » : « Ils pensent que tout va bien, donc ils repartent. »",
  },
  {
    question: "Comment les hommes sortent-ils de la grotte ?",
    options: [
      "Ils bougent le rocher pendant la nuit",
      "Ils montent sur le dos des moutons",
      "Ils se cachent sous le ventre des moutons",
    ],
    answer: 2,
    because:
      "Le géant « passe la main sur le dos de chaque mouton » : « C’est pour ça que les hommes se cachent sous le ventre des moutons. »",
  },
  {
    question: "Quelle erreur Ulysse fait-il à la fin ?",
    options: [
      "Il crie son vrai nom",
      "Il retourne dans la grotte",
      "Il laisse ses hommes sur l’île",
    ],
    answer: 0,
    because:
      "« Il crie son vrai nom » : Polyphème sait maintenant qui il est, et il demande à Poséidon « de punir Ulysse ».",
  },
  {
    question: "« Pourtant, il ne fait rien » : que dit « pourtant » ?",
    options: [
      "Une conséquence : c’est logique",
      "Une surprise : on attendait le contraire",
      "L’action suivante",
    ],
    answer: 1,
    because:
      "« Ulysse veut le tuer », donc on attend une action. « Pourtant » annonce le contraire : il ne fait rien.",
  },
];

export const SETS = { A2 };
