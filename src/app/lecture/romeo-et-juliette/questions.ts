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
 * B1: the price the prologue names before the play begins, a metaphor for fate,
 * a servant hedging his insult against the law, an insult capped in three
 * words, and the « tu » a man uses on the one he means to kill.
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
      "« Ensevelir dans leur tombe l’animosité de leurs parents » : c’est la mort du couple qui enterre la querelle. Le prologue annonce la paix et son prix dans la même phrase.",
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
      "On lisait l’avenir dans les astres. Naître sous des étoiles contraires, c’est porter un destin décidé avant d’avoir rien fait.",
  },
  {
    question:
      "« La loi est-elle de notre côté, si je dis oui ? » demande Samson tout bas. Que révèle cette question ?",
    options: [
      "Qu’il est avocat de son métier",
      "Qu’il a peur d’Abraham et cherche à s’en aller",
      "Qu’il veut la querelle, mais sans en porter la faute",
    ],
    answer: 2,
    because:
      "Il consulte Grégoire tout bas avant de répondre tout haut. Il cherche la bagarre et veut que ce soit l’autre qui l’ait commencée.",
  },
  {
    question:
      "« Je sers un maître aussi bon que le vôtre. » « Mais pas meilleur. » Que fait Abraham ?",
    options: [
      "Il concède l’égalité et ferme la porte à tout ce qui irait au-delà",
      "Il approuve Samson pour éviter le combat",
      "Il change de sujet pour gagner du temps",
    ],
    answer: 0,
    because:
      "Samson avance « aussi bon ». Abraham accorde l’égalité et rien de plus : trois mots suffisent à empêcher l’autre de monter d’un cran.",
  },
  {
    question:
      "« Tourne-toi, Benvolio, et fais face à ta mort. » Tybalt tutoie Benvolio. Que marque ce « tu » ?",
    options: [
      "La familiarité de deux hommes qui se connaissent bien",
      "Le mépris : on ne vouvoie pas celui qu’on veut tuer",
      "Une inattention du traducteur",
    ],
    answer: 1,
    because:
      "Benvolio vient de parler de paix, et Tybalt répond par le tutoiement et par « lâche ». Le « tu » est ici une arme, pas une intimité.",
  },
  {
    question:
      "« Rengaine ton épée, ou emploie-la, comme moi, à séparer ces hommes. » Que propose Benvolio à Tybalt ?",
    options: [
      "Un duel, à l’écart des autres",
      "De s’en aller et de le laisser seul",
      "Deux façons de ne pas se battre",
    ],
    answer: 2,
    because:
      "Rengainer, ou se servir de son épée pour séparer : dans les deux cas personne ne meurt. Tybalt choisira la troisième, qui n’était pas proposée.",
  },
  {
    question:
      "La pièce est de Shakespeare. À qui appartient le français que vous venez de lire ?",
    options: [
      "À Shakespeare, qui écrivait dans les deux langues",
      "À Victor Hugo, l’auteur des Misérables",
      "À François-Victor Hugo, qui a traduit la pièce en 1868",
    ],
    answer: 2,
    because:
      "Une traduction est le travail de quelqu’un, et se cite avec son traducteur et sa date. François-Victor Hugo, fils de Victor Hugo, a traduit tout Shakespeare.",
  },
];

export const SETS: QuestionSets = { A2, B1 };
