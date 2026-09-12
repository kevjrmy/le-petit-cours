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
 * A2: the facts of a life that never varies — where he eats, how many servants,
 * why he goes home, and the four minutes between two watches.
 */
const A2: Question[] = [
  {
    question: "Où Phileas Fogg déjeune-t-il et dîne-t-il ?",
    options: ["Chez lui, à Saville-row", "Au Reform-Club", "Chez ses amis"],
    answer: 1,
    because:
      "« Déjeunant, dînant au club à des heures chronométriquement déterminées, dans la même salle, à la même table. »",
  },
  {
    question: "Combien de domestiques a-t-il ?",
    options: ["Un seul", "Deux", "Aucun"],
    answer: 0,
    because: "« Un seul domestique suffisait à le servir. »",
  },
  {
    question: "Pourquoi rentre-t-il chez lui ?",
    options: ["Pour travailler", "Pour recevoir ses amis", "Pour se coucher"],
    answer: 2,
    because:
      "« Il ne rentrait chez lui que pour se coucher, à minuit précis. » Le reste du temps, il est au club.",
  },
  {
    question: "Pourquoi M. Fogg a-t-il renvoyé James Forster ?",
    options: [
      "Il est arrivé en retard",
      "Il a apporté de l’eau à la mauvaise température",
      "Il a cassé la pendule",
    ],
    answer: 1,
    because:
      "Quatre-vingt-quatre degrés au lieu de quatre-vingt-six. Deux degrés, et il perd sa place.",
  },
  {
    question: "Quelle heure Passepartout a-t-il à sa montre ?",
    options: ["Onze heures et demie", "Onze heures vingt-deux", "Midi"],
    answer: 1,
    because: "Il tire sa montre de son gousset et répond : « Onze heures vingt-deux. »",
  },
  {
    question: "Que répond M. Fogg à cette heure-là ?",
    options: [
      "Qu’elle est juste",
      "Que la montre avance de quatre minutes",
      "Que la montre retarde de quatre minutes",
    ],
    answer: 2,
    because:
      "« Vous retardez de quatre minutes. » Il est donc onze heures vingt-six, et Passepartout entre au service à onze heures vingt-neuf.",
  },
  {
    question:
      "« Il vivait seul », « il ne rentrait que pour se coucher », « il en passait dix à son domicile » : pourquoi tous ces imparfaits ?",
    options: [
      "Parce que ce sont des habitudes",
      "Parce que c’est arrivé une seule fois",
      "Parce que c’est le présent",
    ],
    answer: 0,
    because:
      "L’imparfait dit ce qui se répétait tous les jours. Un événement unique, lui, arrive au passé composé.",
  },
];

/**
 * B1: the same page read for how Verne builds the man. A portrait made by
 * subtraction, a courtroom word laid on two degrees of shaving water, a servant
 * speaking to his master in the third person, and the one line in which Fogg
 * declines to correct a wrong watch and simply records the gap.
 */
const B1: Question[] = [
  {
    question:
      "« Phileas Fogg était membre du Reform-Club, et voilà tout. » Que fait « et voilà tout » ?",
    options: [
      "Il annonce la longue liste des titres qui vont suivre",
      "Il ferme le portrait : c’est la seule chose qu’on puisse dire de lui",
      "Il indique que le Reform-Club comptait énormément pour lui",
    ],
    answer: 1,
    because:
      "Ce qui suit ne fait qu’ôter : « ni femme ni enfants », « ni parents ni amis », « où personne ne pénétrait ». Verne dessine Fogg par ce qu’il n’a pas.",
  },
  {
    question:
      "James Forster s’est « rendu coupable » d’une erreur de deux degrés. Que fait ce mot « coupable » ?",
    options: [
      "Il annonce que Forster sera jugé et puni par la loi",
      "Il montre que le narrateur approuve entièrement M. Fogg",
      "Il pose le vocabulaire d’un tribunal sur une faute minuscule",
    ],
    answer: 2,
    because:
      "« Coupable » appartient au procès. Verne le pose sur deux degrés d’eau chaude, et c’est l’écart entre le mot et la chose qui fait sourire.",
  },
  {
    question:
      "« Vous êtes Français et vous vous nommez John ? » « Jean, n’en déplaise à monsieur. » Que fait Passepartout ?",
    options: [
      "Il corrige son nouveau maître, en s’excusant de le corriger",
      "Il accepte le nom que M. Fogg vient de lui donner",
      "Il refuse de répondre à une question qui le vexe",
    ],
    answer: 0,
    because:
      "« N’en déplaise à monsieur » est une formule d’excuse. Il rectifie et se couvre dans la même phrase : un domestique ne contredit pas son maître, il rectifie poliment.",
  },
  {
    question:
      "La montre de Passepartout retarde. « N’importe. Il suffit de constater l’écart. » Que fait M. Fogg ?",
    options: [
      "Il lui demande de la régler sur-le-champ",
      "Il ne la fait pas régler : il note l’écart et continue",
      "Il lui offre une montre neuve pour la remplacer",
    ],
    answer: 1,
    because:
      "Fogg ne corrige pas le monde, il le mesure. Une montre fausse dont on connaît l’erreur reste un instrument exact, et tout le roman tiendra dans cette idée.",
  },
  {
    question:
      "« Sur vingt-quatre heures, il en passait dix à son domicile. » Qu’en déduit-on des quatorze autres ?",
    options: [
      "Qu’il dormait dix heures et travaillait quatorze",
      "Qu’il ne sortait presque jamais de chez lui",
      "Qu’il les passait ailleurs, et le texte vient de dire où : au club",
    ],
    answer: 2,
    because:
      "Le texte compte les heures de la maison et laisse le lecteur faire la soustraction. Il déjeune et dîne au club, et « ne rentrait chez lui que pour se coucher ».",
  },
  {
    question:
      "Il déjeune et dîne « à des heures chronométriquement déterminées, dans la même salle, à la même table ». Que construit cette accumulation ?",
    options: [
      "Un homme pauvre qui n’a pas les moyens de choisir",
      "Une vie réglée comme une machine, où rien n’est laissé au hasard",
      "Un homme indécis qui suit ce que font les autres",
    ],
    answer: 1,
    because:
      "Chaque détail retire une possibilité : la même heure, la même salle, la même table. Le portrait se fait en fermant des portes les unes après les autres.",
  },
  {
    question:
      "« Que monsieur me pardonne », « n’en déplaise à monsieur » : pourquoi Passepartout parle-t-il de M. Fogg à la troisième personne alors qu’il lui parle ?",
    options: [
      "Parce qu’un troisième homme est présent dans la pièce",
      "Parce qu’il n’ose pas encore le vouvoyer",
      "Parce qu’un domestique s’adressait ainsi à son maître",
    ],
    answer: 2,
    because:
      "C’était la marque du service : on ne disait pas « vous » à son maître, on parlait de lui comme d’un absent. Cela ne se dit plus, et cela se lit encore partout au dix-neuvième siècle.",
  },
];

export const SETS: QuestionSets = { A2, B1 };
