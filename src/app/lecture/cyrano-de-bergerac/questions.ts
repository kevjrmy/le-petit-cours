import type { Question, QuestionSets } from "@/components/exercice/Comprehension";

/**
 * The questions for this text, one set per level (`docs/decisions.md` #68).
 *
 * **Data, not a component, and in its own file** so the `nav-wiring` audit can
 * import it and check its keys against the manifest's `levels`. Every import
 * here is `import type`, which type stripping erases, so plain `node` reads it.
 *
 * Same text, same vocabulary table, same tick: only the question changes (#59).
 */

/**
 * A2: where, how much, who refuses to pay, and what everyone does while the
 * play has not started. The verse is 1640 and the questions are not: this is
 * twenty people arriving at a theatre (#59).
 */
const A2: Question[] = [
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

/**
 * B1: the same crowd read for how Rostand assembles it. Two men producing a
 * rank instead of a coin, a pun built on the theatre's own name, two registers
 * sitting in one room, and a line of verse shared between two voices.
 */
const B1: Question[] = [
  {
    question:
      "Les deux cavaliers refusent de payer, chacun avec sa raison. Qu’ont ces raisons en commun ?",
    options: [
      "Ils disent tous deux qu’ils n’ont pas d’argent sur eux",
      "Ils opposent tous deux un grade au prix de l’entrée",
      "Ils prétendent tous deux travailler dans ce théâtre",
    ],
    answer: 1,
    because:
      "« Je suis chevau-léger de la maison du Roi ! », « Je suis mousquetaire. » Le rang tient lieu de billet, et le portier n’a rien à répondre à cela.",
  },
  {
    question:
      "« Un ivrogne doit boire son bourgogne… à l’hôtel de Bourgogne ! » Sur quoi repose la plaisanterie ?",
    options: [
      "Sur une erreur de l’ivrogne, qui s’est trompé d’adresse",
      "Sur le fait qu’il boit du vin blanc dans un théâtre",
      "Sur deux sens du mot Bourgogne : le vin, et le nom du théâtre",
    ],
    answer: 2,
    because:
      "Le vin de Bourgogne et l’hôtel de Bourgogne portent le même nom. L’homme boit le premier dans le second, et le dit en vers.",
  },
  {
    question: "Pendant tout cet extrait, qui regarde la scène ?",
    options: [
      "Personne : on se bat, on joue aux cartes, on mange et on boit",
      "Toute la salle, qui attend le lever du rideau en silence",
      "Seuls le bourgeois et son fils, assis devant",
    ],
    answer: 0,
    because:
      "Fleurets, cartes, dés, provisions de bouche, bouteille sous le manteau : la salle s’occupe d’elle-même. Rostand ouvre sa pièce sur un public qui ne regarde rien.",
  },
  {
    question:
      "« Lorsqu’on vient en avance, on est bien pour manger. » Qu’apprend-on du théâtre de 1640 ?",
    options: [
      "Qu’un repas était servi aux spectateurs avant la pièce",
      "Qu’on y venait longtemps à l’avance, et qu’on y mangeait",
      "Que les spectateurs avaient faim parce qu’ils étaient pauvres",
    ],
    answer: 1,
    because:
      "Des « porteurs de provisions de bouche » s’assoient par terre. On n’allait pas au théâtre pour deux heures : on y passait l’après-midi, et on apportait de quoi.",
  },
  {
    question:
      "« Oui, mon coquin », dit un laquais ; « Plaçons-nous là, mon fils », dit un bourgeois. Que fait Rostand en les mettant côte à côte ?",
    options: [
      "Il montre que tout le monde y parlait de la même façon",
      "Il indique que le bourgeois est le père du laquais",
      "Il fait entendre deux mondes dans la même salle",
    ],
    answer: 2,
    because:
      "L’un tutoie son camarade et l’appelle « coquin », l’autre conduit son fils et parle en père de famille. La salle contient les deux : c’est le portrait d’un public, pas d’un homme.",
  },
  {
    question:
      "Dans cet extrait, où lit-on le plus de choses : dans les répliques, ou dans les indications de mise en scène ?",
    options: [
      "Dans les répliques, où les personnages expliquent ce qu’ils font",
      "Dans les indications : elles disent qui s’assoit, qui se bat, qui sort des cartes",
      "Les deux en disent exactement autant",
    ],
    answer: 1,
    because:
      "« Il s’assied par terre », « tirant de sa poche un bout de chandelle », « tirant une bouteille de sous son manteau ». Les répliques tiennent en trois mots ; c’est autour d’elles que la scène se fait.",
  },
  {
    question:
      "« Holà ! vos quinze sols ! » « J’entre gratis ! » Pourquoi ces répliques sont-elles si courtes ?",
    options: [
      "Parce que les personnages sont pressés d’entrer",
      "Parce que le texte a été coupé pour cette page",
      "Parce que la pièce est en vers et qu’une ligne se partage entre deux voix",
    ],
    answer: 2,
    because:
      "Un vers de douze syllabes peut se dire à deux, six et six. La réplique s’arrête où le vers l’exige, et non où le personnage aurait fini de parler.",
  },
];

export const SETS: QuestionSets = { A2, B1 };
