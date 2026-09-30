import type { Question, QuestionSets } from "@/components/exercice/Comprehension";

/**
 * The questions for this work, one set per level. Each level has its own
 * text as well (`a2.tsx`, `b1.tsx`), so a set asks about its own body (#92).
 *
 * **Data, not a component, and in its own file** so the `nav-wiring` audit can
 * import it. Every import here is `import type`, which type stripping erases,
 * so plain `node` reads it.
 */

/**
 * A1: asked in Spanish, answered from the French (#85); every piece of French
 * sits in « » so `quotes="fr"` marks it. Who pays, the time, what they all do.
 */
const A1: Question[] = [
  {
    question: "¿Dónde pasa la escena?",
    options: ["En un teatro", "En una iglesia", "En un mercado"],
    answer: 0,
    because:
      "Es el « Hôtel de Bourgogne », un teatro: « On ne commence qu’à deux heures. Le parterre est vide. »",
  },
  {
    question: "¿Cuánto cuesta la entrada?",
    options: ["« quinze sols »", "« deux sols »", "« cinq sols »"],
    answer: 0,
    because: "El portero se lo pide al primer caballero: « Holà ! vos quinze sols ! »",
  },
  {
    question: "¿Qué hace el primer caballero?",
    options: ["Paga la entrada", "Entra sin pagar", "Se va del teatro"],
    answer: 1,
    because:
      "« J’entre gratis ! » Y da su razón: « Je suis chevau-léger de la maison du Roi ! »",
  },
  {
    question: "¿Por qué no paga el segundo caballero?",
    options: [
      "Porque no tiene dinero",
      "Porque es amigo del portero",
      "Porque es mosquetero",
    ],
    answer: 2,
    because: "« Je ne paye pas ! », y luego: « Je suis mousquetaire. »",
  },
  {
    question: "¿A qué hora empieza la obra?",
    options: ["A mediodía", "A las dos", "A las ocho"],
    answer: 1,
    because: "« On ne commence qu’à deux heures. » No empiezan hasta las dos.",
  },
  {
    question: "¿Qué hacen los dos caballeros mientras esperan?",
    options: [
      "Juegan a las cartas",
      "Comen en el suelo",
      "Practican esgrima con el florete",
    ],
    answer: 2,
    because:
      "« Exerçons-nous au fleuret. » Luego: « Ils font des armes avec des fleurets qu’ils ont apportés. »",
  },
  {
    question: "¿Y los dos lacayos?",
    options: [
      "Juegan a las cartas y a los dados",
      "Practican esgrima",
      "Cobran la entrada",
    ],
    answer: 0,
    because:
      "Uno saca los juegos de su jubón: « Cartes. Dés. » Se sienta en el suelo y dice: « Jouons. »",
  },
];

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
 * The questions for this text: one set, at B1.
 *
 * **Data, not a component, and in its own file** so the `nav-wiring` audit can
 * import it and check its keys against the manifest's `sets`. Every import
 * here is `import type`, which type stripping erases, so plain `node` reads it.
 *
 * The whole scene, read for how Rostand assembles a crowd: a rank instead of a
 * coin, a pun on the theatre's name, two worlds in one room, speeches cut into
 * each other so that one line answers another across the hall.
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
      "« Je suis chevau-léger de la maison du Roi ! », « Je suis mousquetaire. » Le rang tient lieu de billet, et le portier n’a rien à répondre.",
  },
  {
    question:
      "« Un ivrogne doit boire son bourgogne… à l’hôtel de Bourgogne ! » Sur quoi repose la plaisanterie ?",
    options: [
      "Sur une erreur de l’ivrogne, qui se croit dans une auberge",
      "Sur deux sens du mot Bourgogne : le vin, et le nom du théâtre",
      "Sur le prix du vin, que le portier vend à l’entrée",
    ],
    answer: 1,
    because:
      "Il sort sa propre bouteille « de sous son manteau » : le vin de Bourgogne et l’hôtel de Bourgogne portent le même nom, et il boit l’un dans l’autre.",
  },
  {
    question: "Avant l’arrivée des marquis, qui regarde la scène ?",
    options: [
      "Toute la salle, qui attend le lever du rideau en silence",
      "Personne : on se bat, on joue, on mange, on boit, on vole",
      "Les pages, sagement assis aux galeries",
    ],
    answer: 1,
    because:
      "Fleurets, cartes, dés, provisions, bouteille, et les pages entrent « en farandole » puis lancent des pois à la sarbacane : la salle s’occupe d’elle-même.",
  },
  {
    question:
      "« Oui, mon coquin », dit un laquais ; « Plaçons-nous là, mon fils », dit un bourgeois. Que fait Rostand en mettant ces deux répliques dans la même scène ?",
    options: [
      "Il montre que tout le monde parlait alors de la même façon",
      "Il indique que le bourgeois est le père du laquais",
      "Il fait entendre deux mondes dans la même salle",
    ],
    answer: 2,
    because:
      "L’un appelle son camarade « coquin », l’autre « conduit son fils », qui est « le jeune homme » de la scène. La salle contient les deux mondes.",
  },
  {
    question:
      "« Et penser que c’est dans une salle pareille qu’on joua du Rotrou, mon fils ! » Que ressent le bourgeois ?",
    options: [
      "Il est choqué que ce public occupe un lieu où l’on a joué de grands auteurs",
      "Il est fier de montrer à son fils un public si joyeux",
      "Il regrette d’être venu et ramène son fils à la maison",
    ],
    answer: 0,
    because:
      "« Ne se croirait-on pas en quelque mauvais lieu ? Buveurs… Bretteurs ! Joueurs ! » Et il ne part pas : « Vous verrez des acteurs très illustres… »",
  },
  {
    question:
      "« Oh ! Monsieur ! ce soupçon !… », dit le premier page au portier. Est-il sincère ?",
    options: [
      "Oui : il ne fait que chanter avec les autres pages",
      "Oui : c’est le portier qui lui a demandé de la ficelle",
      "Non : dès que le portier a le dos tourné, il prépare sa farce",
    ],
    answer: 2,
    because:
      "« dès que le portier a tourné le dos » : « As-tu de la ficelle ? », puis « On pourra de là-haut pêcher quelque perruque. »",
  },
  {
    question:
      "Les répliques du bourgeois et celles du tire-laine alternent. Qu’est-ce qui rend ce montage comique ?",
    options: [
      "Le bourgeois admire des acteurs pendant que le voleur énumère ce qu’on peut prendre aux gens comme lui",
      "Le bourgeois et le tire-laine se parlent et se disputent une place",
      "Le tire-laine nomme les mêmes acteurs que le bourgeois, mais se trompe de noms",
    ],
    answer: 0,
    because:
      "« Les montres… », « Vous verrez des acteurs très illustres… », « Les mouchoirs… », « Montfleury… » : l’un regarde la scène, l’autre les poches.",
  },
  {
    question:
      "« Hé quoi ! Nous arrivons ainsi que les drapiers, sans déranger les gens ? » De quoi se plaint le marquis ?",
    options: [
      "D’être arrivé en retard, après le début de la pièce",
      "D’entrer dans une salle presque vide, où personne ne le remarque",
      "D’une salle trop pleine, où il ne trouve pas de place",
    ],
    answer: 1,
    because:
      "Il parle « voyant la salle à moitié vide » et regrette de ne pas « marcher sur les pieds » : un noble veut qu’on le voie entrer.",
  },
  {
    question:
      "Comment sait-on que le bourgeois tombe au milieu des joueurs ?",
    options: [
      "Parce qu’il le raconte lui-même à son fils",
      "Par une indication entre parenthèses, au milieu de sa réplique",
      "Parce que les joueurs se plaignent de lui",
    ],
    answer: 1,
    because:
      "« (En rompant, un des cavaliers le bouscule.) », « (Il tombe au milieu des joueurs.) » : lui ne dit que « Buveurs… Bretteurs ! Joueurs ! »",
  },
  {
    question:
      "« Vous ? » « Je ne paye pas ! » « Mais… » « Je suis mousquetaire. » Pourquoi ces répliques sont-elles si courtes ?",
    options: [
      "Parce que le texte a été coupé pour cette page",
      "Parce que la pièce est en vers et qu’une ligne se partage entre plusieurs voix",
      "Parce que les cavaliers veulent ressortir aussitôt du théâtre",
    ],
    answer: 1,
    because:
      "Ensemble, elles font un seul vers de douze syllabes. La réplique s’arrête où le vers l’exige, et la scène est donnée ici en entier.",
  },
];

export const SETS: QuestionSets = { A1, A2, B1 };
