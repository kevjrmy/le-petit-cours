import type { Question, QuestionSets } from "@/components/exercice/Comprehension";

/**
 * The questions for this work, one set per level. Each level has its own
 * text as well (`a2.tsx`, `b1.tsx`), so a set asks about its own body (#92).
 *
 * **Data, not a component, and in its own file** so the `nav-wiring` audit can
 * import it. Every import here is `import type`, which type stripping erases,
 * so plain `node` reads it.
 */

/** A1: seven questions on the prologue, in Spanish, the French in « » (#85). */
const A1: Question[] = [
  {
    question: "¿En qué ciudad pasa la obra?",
    options: ["En Venecia", "En Verona", "En París"],
    answer: 1,
    because: "« Dans la belle Vérone, où nous plaçons notre scène »: la escena está en Verona.",
  },
  {
    question: "¿Cuántas familias hay en el prólogo?",
    options: ["Una", "Dos", "Tres"],
    answer: 1,
    because: "« Deux familles, égales en noblesse »: son dos familias.",
  },
  {
    question: "¿Qué hacen las dos familias?",
    options: [
      "Se pelean por viejos rencores",
      "Viven en paz desde hace años",
      "Preparan una boda juntas",
    ],
    answer: 0,
    because:
      "« entraînées par d’anciennes rancunes à des rixes nouvelles »: los viejos rencores las llevan a nuevas peleas.",
  },
  {
    question: "¿Qué mancha las manos de los ciudadanos?",
    options: ["El vino", "La tierra", "La sangre de otros ciudadanos"],
    answer: 2,
    because: "« le sang des citoyens souille les mains des citoyens »: es sangre.",
  },
  {
    question: "¿De dónde vienen los dos enamorados?",
    options: [
      "De otra ciudad",
      "De las dos familias enemigas",
      "De una sola de las dos familias",
    ],
    answer: 1,
    because:
      "« Des entrailles prédestinées de ces deux ennemies »: nacen de las dos familias, uno de cada familia.",
  },
  {
    question: "Según el prólogo, ¿qué entierra la tumba de los enamorados?",
    options: [
      "El odio de sus padres",
      "Las espadas de la ciudad",
      "El oro de las dos familias",
    ],
    answer: 0,
    because:
      "« Doit ensevelir dans leur tombe l’animosité de leurs parents »: su muerte entierra el odio de sus padres.",
  },
  {
    question: "¿Cuál es el sujeto de « A pris naissance »?",
    options: ["« ces deux ennemies »", "« des étoiles contraires »", "« un couple d’amoureux »"],
    answer: 2,
    because:
      "Llega al final de la línea: « un couple d’amoureux a pris naissance », una pareja de enamorados ha nacido.",
  },
];

/**
 * A2: four questions on the prologue, three on the street scene. The one text
 * in the chapter not written in French, so the questions stay on what the
 * translation plainly says (#60).
 */
const A2: Question[] = [
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

/**
 * The questions for this text (`docs/decisions.md` #68).
 *
 * **Data, not a component, and in its own file** so the `nav-wiring` audit can
 * import it and check its keys against the manifest's `sets`. Every import
 * here is `import type`, which type stripping erases, so plain `node` reads it.
 */

/**
 * B1: the whole prologue and the scene uncut, so the questions reach the lines
 * the A2 page leaves out: the Chœur's appeal to the audience, the plan to put
 * the law on their side, a servant emboldened by a relative of his master, a
 * crutch for a sword, and a death sentence said as a price.
 */
const B1: Question[] = [
  {
    question:
      "« Dont la ruine néfaste et lamentable / Doit ensevelir dans leur tombe l’animosité de leurs parents. » Que dit ce vers du prix de la paix ?",
    options: [
      "Que les amoureux survivront à la haine de leurs familles",
      "Que la haine des deux familles mourra avec les enfants",
      "Que les parents seront enterrés avec leurs enfants",
    ],
    answer: 1,
    because:
      "Plus loin, le Chœur le redit : la rage des familles, « Que peut seule apaiser la mort de leurs enfants ».",
  },
  {
    question: "« Sous des étoiles contraires » : que dit cette expression ?",
    options: [
      "Que leur sort est écrit d’avance, et contre eux",
      "Que les amoureux se rencontrent une nuit d’orage",
      "Qu’ils viennent de deux pays différents",
    ],
    answer: 0,
    because:
      "Les entrailles des deux familles sont « prédestinées » : on lisait l’avenir dans les astres, et le leur est décidé avant leur naissance.",
  },
  {
    question:
      "« Si vous daignez nous écouter patiemment, / Notre zèle s’efforcera de corriger notre insuffisance. » À qui parle le Chœur, et que demande-t-il ?",
    options: [
      "Au prince, pour qu’il pardonne aux deux familles",
      "Au public, pour qu’il écoute avec patience des acteurs qui s’excusent d’avance",
      "Aux Capulets et aux Montagues, pour qu’ils fassent la paix",
    ],
    answer: 1,
    because:
      "Il présente la pièce « sur notre scène » et parle à ceux qui vont « écouter » : ce sont les acteurs qui promettent leur « zèle ».",
  },
  {
    question:
      "« Oui, tu te tiendras derrière pour mieux déguerpir. » Que pense Grégoire de Samson ?",
    options: [
      "Qu’il le protégera s’il y a un combat",
      "Qu’il se bat mieux que lui",
      "Qu’il parle fort mais qu’il s’enfuira au premier danger",
    ],
    answer: 2,
    because:
      "Samson promet « je serai derrière toi » ; Grégoire retourne la phrase : derrière, c’est la meilleure place pour partir en courant.",
  },
  {
    question:
      "« Mettons la loi de notre côté et laissons-les commencer. » Plus tard, Samson demande tout bas : « La loi est-elle de notre côté, si je dis oui ? » Que montre ce plan ?",
    options: [
      "Que Samson veut la querelle, mais sans en porter la faute",
      "Que Samson a peur d’Abraham et cherche à s’en aller",
      "Que Samson veut appeler le prince à son secours",
    ],
    answer: 0,
    because:
      "Il provoque en mordant son pouce, puis refuse de dire que c’est une insulte : l’autre doit être celui qui commence.",
  },
  {
    question:
      "Samson accepte d’abord « Mais pas meilleur » avec un « Soit, monsieur », puis crie « Si fait, monsieur, meilleur ! ». Pourquoi change-t-il de réponse ?",
    options: [
      "Parce qu’Abraham vient de l’insulter",
      "Parce qu’un parent de son maître arrive et qu’il se sent soutenu",
      "Parce que Benvolio lui ordonne de se battre",
    ],
    answer: 1,
    because:
      "Grégoire lui souffle : « Dis meilleur ! Voici un parent de notre maître. » Le courage de Samson arrive avec les renforts.",
  },
  {
    question:
      "« Quoi, l’épée à la main, tu parles de paix ! » Que reproche Tybalt à Benvolio ?",
    options: [
      "De parler de paix avec une arme à la main",
      "De l’avoir insulté le premier",
      "D’avoir mordu son pouce devant lui",
    ],
    answer: 0,
    because:
      "Benvolio tient « la rapière au poing » pour séparer les valets ; c’est Tybalt qui parle le premier, et il ne voit que l’épée.",
  },
  {
    question:
      "Capulet, en robe de chambre, demande « ma grande épée ». « Non ! une béquille ! une béquille ! » répond sa femme. Le prince l’appelle ensuite « vieux Capulet ». Que veut dire sa femme ?",
    options: [
      "Qu’il a été blessé dans la bagarre",
      "Qu’elle veut se battre à sa place",
      "Qu’il est trop vieux pour se battre",
    ],
    answer: 2,
    because:
      "Il sort de chez lui en robe de chambre et demande « Quel est ce bruit ? » : il n’est pas blessé, il est « vieux », et sa femme ne veut pas d’arme : « Pourquoi demander une épée ? »",
  },
  {
    question:
      "« Trois querelles civiles, nées d’une parole en l’air » : que dit le prince de l’origine de ces combats ?",
    options: [
      "Qu’elles viennent d’un crime très ancien",
      "Qu’elles naissent de presque rien, d’un mot dit sans réfléchir",
      "Qu’elles viennent d’une guerre entre deux villes",
    ],
    answer: 1,
    because:
      "Une « parole en l’air » ne pèse rien, comme le pouce que Samson mord au début de la scène : trois fois, un rien a suffi.",
  },
  {
    question:
      "« Si jamais vous troublez encore nos rues, votre vie payera le dommage fait à la paix. » Que risquent Capulet et Montague ?",
    options: [
      "De payer une forte amende",
      "De quitter Vérone pour toujours",
      "D’être condamnés à mort",
    ],
    answer: 2,
    because:
      "C’est « votre vie » qui paye, pas l’argent ; et le prince répète : « sous peine de mort, que tous se séparent ! »",
  },
];

export const SETS: QuestionSets = { A1, A2, B1 };
