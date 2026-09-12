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
 * A2: what happens. Six goats leave, a seventh wants to, and the dialogue is
 * short enough that every answer is a line she can point at.
 */
const A2: Question[] = [
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

/**
 * B1: the same page, read for what the narrator does with it — an adverb that
 * hands a claim to somebody else, a compliment sitting in the same sentence as
 * a criticism, two offers that answer a question nobody asked, and a man who
 * buys a seventh goat three lines after swearing off goats.
 */
const B1: Question[] = [
  {
    question:
      "« Le brave M. Seguin, qui ne comprenait rien au caractère de ses bêtes, était consterné. » Que fait le narrateur dans cette phrase ?",
    options: [
      "Il annonce que M. Seguin va enfin comprendre",
      "Il dit que M. Seguin se trompe, tout en l’appelant « brave »",
      "Il se moque de M. Seguin et le condamne",
    ],
    answer: 1,
    because:
      "« Brave » et « qui ne comprenait rien » tiennent dans la même phrase. M. Seguin est un bon homme qui cherche la faute du mauvais côté, et le narrateur le dit sans élever la voix.",
  },
  {
    question:
      "« C’était, paraît-il, des chèvres indépendantes. » Que fait « paraît-il » ?",
    options: [
      "Il annonce que le narrateur va le prouver",
      "Il veut dire « c’est certain »",
      "Il met la phrase dans la bouche d’un autre, sans que le narrateur la prenne à son compte",
    ],
    answer: 2,
    because:
      "« Paraît-il », c’est « à ce qu’on dit ». Le narrateur raconte l’histoire comme on la lui a racontée, et se garde de trancher sur le caractère des chèvres.",
  },
  {
    question:
      "« Ni les caresses de leur maître, ni la peur du loup, rien ne les retenait. » Que dit cette phrase de ce que veulent les chèvres ?",
    options: [
      "Qu’elles n’aimaient pas M. Seguin",
      "Que leur désir est plus fort que la tendresse et que la peur",
      "Qu’elles ignoraient qu’un loup vivait dans la montagne",
    ],
    answer: 1,
    because:
      "La phrase écarte les deux seules choses qui retiennent d’ordinaire, la douceur et la peur. Ce qui reste n’est pas contre M. Seguin : c’est pour la montagne.",
  },
  {
    question:
      "« Veux-tu que j’allonge la corde ! » : pourquoi cette offre ne peut-elle pas suffire ?",
    options: [
      "Parce que la corde est déjà trop longue pour elle",
      "Parce que Blanquette ne sait pas ce qu’est une corde",
      "Parce qu’une corde plus longue attache toujours",
    ],
    answer: 2,
    because:
      "Blanquette ne demande pas plus de place, elle demande la montagne. Allonger la corde agrandit l’enclos sans l’ouvrir, et c’est tout ce que M. Seguin sait offrir.",
  },
  {
    question:
      "« C’est fini ; les chèvres s’ennuient chez moi, je n’en garderai pas une. » Que fait M. Seguin ensuite ?",
    options: [
      "Il tient parole et ne reprend pas de chèvre",
      "Il achète quand même une septième chèvre",
      "Il vend sa maison et quitte la Provence",
    ],
    answer: 1,
    because:
      "Il renonce à voix haute, puis recommence. Ce « quand même » est toute l’histoire : il n’a rien compris et il essaie encore.",
  },
  {
    question: "Comment Blanquette répond-elle à M. Seguin ?",
    options: [
      "Elle le tutoie, comme il la tutoie",
      "Elle évite ses questions et parle d’autre chose",
      "Elle répond en une phrase et l’appelle « monsieur Seguin » à chaque fois",
    ],
    answer: 2,
    because:
      "« Oui, monsieur Seguin. » « Oh ! non ! monsieur Seguin. » Elle reste polie et brève. Elle ne discute pas, et elle ne cède pas non plus.",
  },
  {
    question:
      "Le récit dit « elles cassaient leur corde, s’en allaient dans la montagne », puis « cria M. Seguin ». Pourquoi deux temps ?",
    options: [
      "L’imparfait dit ce qui se répétait, le passé simple ce qui arrive une fois",
      "L’imparfait est réservé aux animaux, le passé simple aux personnes",
      "Les deux temps disent exactement la même chose",
    ],
    answer: 0,
    because:
      "Les six premières chèvres partaient toutes de la même façon : c’est une habitude, et l’imparfait la porte. Le matin de Blanquette n’arrive qu’une fois, et le passé simple le détache du reste.",
  },
];

export const SETS: QuestionSets = { A2, B1 };
