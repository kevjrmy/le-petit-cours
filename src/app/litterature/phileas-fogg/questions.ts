import type { Question, QuestionSets } from "@/components/exercice/Comprehension";

/**
 * The questions for this work, one set per level. Each level has its own
 * text as well (`a1.tsx`, `a2.tsx`, `b1.tsx`), so a set asks about its own body (#92).
 *
 * **Data, not a component, and in its own file** so the `nav-wiring` audit can
 * import it. Every import here is `import type`, which type stripping erases,
 * so plain `node` reads it.
 */

/** A1: the hours of a life that never varies, and the four minutes between two watches. */
const A1: Question[] = [
  {
    question: "¿Cómo vive Phileas Fogg?",
    options: [
      "Con su mujer y sus hijos",
      "Solo, con un criado",
      "Con sus amigos del club",
    ],
    answer: 1,
    because:
      "« Phileas Fogg vivait seul » y « Un seul domestique suffisait à le servir. » No tiene ni mujer ni hijos, ni familia ni amigos.",
  },
  {
    question: "¿Dónde come y cena Phileas Fogg?",
    options: ["En su casa", "En el club", "En casa de sus amigos"],
    answer: 1,
    because:
      "« Déjeunant, dînant au club »: « déjeuner » es comer a mediodía, no desayunar.",
  },
  {
    question: "¿A qué hora vuelve a su casa para acostarse?",
    options: ["A las diez", "A medianoche en punto", "A las once y media"],
    answer: 1,
    because:
      "« Il ne rentrait chez lui que pour se coucher, à minuit précis. » « minuit » es medianoche.",
  },
  {
    question: "¿Cuántas horas al día pasa en su casa?",
    options: ["Diez", "Veinticuatro", "Cuatro"],
    answer: 0,
    because:
      "« Sur vingt-quatre heures, il en passait dix à son domicile. »",
  },
  {
    question: "Fogg le dice « John » al nuevo criado. ¿Qué nombre dice él?",
    options: ["« John »", "« Jean »", "« Phileas »"],
    answer: 1,
    because:
      "« Jean, n’en déplaise à monsieur »: es francés, y Jean es su nombre en francés.",
  },
  {
    question: "¿Qué hora marca el reloj de Passepartout?",
    options: [
      "« Onze heures vingt-deux »",
      "« Onze heures vingt-neuf »",
      "« Minuit »",
    ],
    answer: 0,
    because:
      "Saca su reloj de plata y contesta: « Onze heures vingt-deux. »",
  },
  {
    question: "Según Fogg, ¿cómo va el reloj de Passepartout?",
    options: ["Va bien", "Atrasa cuatro minutos", "Adelanta cuatro minutos"],
    answer: 1,
    because:
      "« Vous retardez de quatre minutes. » Son las once y veintiséis, y Passepartout empieza a trabajar a las once y veintinueve.",
  },
];

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
 * The questions for this text (`docs/decisions.md` #68).
 *
 * **Data, not a component, and in its own file** so the `nav-wiring` audit can
 * import it and check its keys against the manifest's `sets`. Every import
 * here is `import type`, which type stripping erases, so plain `node` reads it.
 */

/**
 * B1: the whole end of chapter I, read for how Verne builds the man. The
 * narrator's asides, a life closed door by door, the irony of the club's luxury,
 * a courtroom word on two degrees of shaving water, a servant who corrects his
 * master politely and speaks of him in the third person, a name that promises
 * the adventure its bearer is fleeing, and a gap measured rather than corrected.
 */
const B1: Question[] = [
  {
    question:
      "Après « ni femme ni enfants », le narrateur ajoute « ce qui peut arriver aux gens les plus honnêtes » ; après « ni parents ni amis », « ce qui est plus rare en vérité ». Que font ces deux remarques ?",
    options: [
      "Elles reprochent à M. Fogg d’être un homme malhonnête",
      "Elles glissent un sourire : ne pas avoir d’amis est plus étrange que ne pas avoir d’enfants",
      "Elles rappellent que M. Fogg reçoit souvent ses amis chez lui",
    ],
    answer: 1,
    because:
      "« Ce qui peut arriver aux gens les plus honnêtes » : rien de malhonnête. Et chez lui, « personne ne pénétrait ».",
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
      "Chaque détail retire une possibilité : la même heure, la même salle, la même table, et « à minuit précis » pour rentrer.",
  },
  {
    question:
      "Après la longue liste du club, le narrateur écrit : « Si vivre dans ces conditions, c’est être un excentrique, il faut convenir que l’excentricité a du bon ! » Que veut-il dire ?",
    options: [
      "Qu’une vie aussi confortable n’est pas à plaindre, même si on la trouve bizarre",
      "Que M. Fogg vit pauvrement et qu’il faudrait l’aider",
      "Que le club refuse de servir un homme aussi étrange",
    ],
    answer: 0,
    because:
      "Tout est luxe : « leurs succulentes réserves », « une porcelaine spéciale », « un admirable linge en toile de Saxe ».",
  },
  {
    question:
      "James Forster s’est « rendu coupable » d’une erreur de deux degrés. Que fait ce mot « coupable » ?",
    options: [
      "Il annonce que Forster sera jugé et puni par la loi",
      "Il montre que Forster a volé quelque chose à son maître",
      "Il pose le vocabulaire d’un tribunal sur une faute minuscule",
    ],
    answer: 2,
    because:
      "La faute : « de l’eau à quatre-vingt-quatre degrés Fahrenheit au lieu de quatre-vingt-six ». Le mot du procès sur deux degrés fait sourire.",
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
      "« N’en déplaise à monsieur » est une formule d’excuse : il rectifie « John » en « Jean » et se couvre dans la même phrase.",
  },
  {
    question:
      "Son surnom vient de « mon aptitude naturelle à me tirer d’affaire », et il espère « oublier jusqu’à ce nom de Passepartout ». Qu’y a-t-il de curieux ?",
    options: [
      "Il a toujours fait le même métier et ne connaît que celui-là",
      "Il veut garder ce surnom toute sa vie",
      "Son nom promet l’aventure, et lui cherche une vie tranquille",
    ],
    answer: 2,
    because:
      "Acrobate, pompier, puis valet : il vient chez M. Fogg « avec l’espérance d’y vivre tranquille ».",
  },
  {
    question:
      "« Que monsieur me pardonne », « je me suis présenté chez monsieur » : pourquoi Passepartout parle-t-il de M. Fogg à la troisième personne alors qu’il lui parle ?",
    options: [
      "Parce qu’il ne sait pas encore qui est M. Fogg",
      "Parce qu’un domestique s’adressait ainsi à son maître",
      "Parce qu’il veut se moquer de son nouveau maître",
    ],
    answer: 1,
    because:
      "À l’époque, un domestique parle ainsi à son maître « par respect », pas pour s’en moquer. Et il sait qui est M. Fogg : « l’homme le plus exact ».",
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
      "« N’importe » : Fogg ne corrige pas la montre, il la mesure. Une montre dont on connaît l’erreur reste un instrument exact.",
  },
  {
    question:
      "Passepartout entre au service à onze heures vingt-neuf, et M. Fogg sort aussitôt. Pourquoi ?",
    options: [
      "Parce qu’il est fâché que la montre de Passepartout retarde",
      "Parce qu’il va chercher un autre domestique",
      "Parce qu’à onze heures et demie il part chaque jour au Reform-Club",
    ],
    answer: 2,
    because:
      "« À onze heures et demie sonnant, Mr. Fogg devait, suivant sa quotidienne habitude, quitter la maison et se rendre au Reform-Club. »",
  },
  {
    question:
      "« Il ne rentrait chez lui que pour se coucher », puis « En ce moment, on frappa à la porte ». Pourquoi le temps change-t-il ?",
    options: [
      "L’imparfait dit l’habitude de tous les jours, le passé simple ce qui arrive une fois",
      "L’imparfait est plus poli, le passé simple plus familier",
      "Les deux phrases racontent la même habitude avec deux temps au choix",
    ],
    answer: 0,
    because:
      "Le portrait est à l’imparfait ; « En ce moment » ouvre l’événement du 2 octobre, au passé simple : « on frappa », « apparut ».",
  },
];

export const SETS: QuestionSets = { A1, A2, B1 };
