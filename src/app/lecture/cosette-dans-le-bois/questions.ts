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
 * A2: the facts of the scene — the bucket, her age, where she comes from, who
 * sent her, and what the pronoun in « je vais vous le porter » stands for.
 */
const A2: Question[] = [
  {
    question: "Que porte Cosette quand l’homme la rencontre ?",
    options: ["Un panier", "Un seau d’eau", "Une poupée"],
    answer: 1,
    because: "« Cosette lâcha le seau. L’homme se mit à cheminer près d’elle. »",
  },
  {
    question: "Quel âge a-t-elle ?",
    options: ["Six ans", "Huit ans", "Douze ans"],
    answer: 1,
    because: "« — Petite, quel âge as-tu ? — Huit ans, monsieur. »",
  },
  {
    question: "D’où vient-elle avec son seau ?",
    options: [
      "De la source qui est dans le bois",
      "De la rivière du village",
      "De l’auberge",
    ],
    answer: 0,
    because: "Elle marche depuis la source, et il reste un bon quart d’heure.",
  },
  {
    question: "Que répond-elle quand l’homme lui parle de sa mère ?",
    options: [
      "Que sa mère est morte",
      "Que sa mère habite à Paris",
      "Qu’elle ne sait pas, et qu’elle croit n’en avoir jamais eu",
    ],
    answer: 2,
    because:
      "« Je ne sais pas », puis « Les autres en ont. Moi, je n’en ai pas. » C’est la phrase qui arrête l’homme net.",
  },
  {
    question: "Qui l’a envoyée chercher de l’eau, la nuit, dans le bois ?",
    options: ["Sa mère", "Madame Thénardier", "Personne"],
    answer: 1,
    because: "« — C’est madame Thénardier. »",
  },
  {
    question: "Que fait madame Thénardier ?",
    options: ["Elle tient une auberge", "Elle est maîtresse d’école", "Elle vend de l’eau"],
    answer: 0,
    because:
      "« C’est ma bourgeoise, dit l’enfant. Elle tient l’auberge. » C’est pour cela que l’homme décide d’y dormir.",
  },
  {
    question: "« Je vais vous le porter » : que remplace « le » ?",
    options: ["Le bois", "Le seau", "Le chemin"],
    answer: 1,
    because:
      "« le » remplace le seau, et « vous » remplace Cosette : il porte le seau à Cosette. Un COD et un COI dans la même phrase.",
  },
];

/**
 * B1: the same dialogue read for what nobody says. A child who lets go of a
 * bucket without asking who is taking it, who reasons her way to an answer
 * about her own mother because no one ever gave her one, and a man whose
 * silence before a question is what makes the question grave.
 */
const B1: Question[] = [
  {
    question:
      "« Donnez, reprit l’homme, je vais vous le porter. » « Cosette lâcha le seau. » Que dit cette obéissance immédiate ?",
    options: [
      "Qu’elle a compris qu’il voulait lui prendre son eau",
      "Qu’elle connaît cet homme et lui fait confiance",
      "Qu’elle obéit sans discuter à l’adulte qui ordonne",
    ],
    answer: 2,
    because:
      "« Donnez » est un ordre, et elle lâche. Elle ne demande pas qui il est ni ce qu’il veut : une enfant qu’on envoie chercher de l’eau la nuit a appris à faire ce qu’on lui dit.",
  },
  {
    question:
      "Sur sa mère, Cosette dit d’abord « Je ne sais pas », puis « Les autres en ont. Moi, je n’en ai pas. » Que fait-elle entre les deux ?",
    options: [
      "Elle raisonne à voix haute, faute qu’on lui ait jamais répondu",
      "Elle se souvient brusquement de sa mère",
      "Elle ment pour faire pitié à l’inconnu",
    ],
    answer: 0,
    because:
      "Personne ne lui a rien dit. Elle se compare aux autres enfants et en tire une conclusion, ce qui est le travail d’une enfant laissée sans réponse.",
  },
  {
    question:
      "« L’homme resta un moment sans parler, puis il dit brusquement : Tu n’as donc pas de mère ? » Que marque ce silence ?",
    options: [
      "Qu’il cherche son chemin dans le bois",
      "Qu’il a compris quelque chose et hésite à le demander",
      "Qu’il ne souhaite plus parler à l’enfant",
    ],
    answer: 1,
    because:
      "Le narrateur ne dit jamais ce que l’homme pense. Il met un silence devant la question, et c’est le silence qui la rend grave.",
  },
  {
    question:
      "L’homme commence par « vous » et passe à « tu ». Et Cosette, comment lui parle-t-elle ?",
    options: [
      "Elle passe au « tu » elle aussi",
      "Elle cesse peu à peu de répondre",
      "Elle dit « monsieur » du début à la fin",
    ],
    answer: 2,
    because:
      "« Oui, monsieur. » « Huit ans, monsieur. » « À Montfermeil, si vous connaissez. » Le rapprochement ne va que dans un sens : lui descend vers elle, elle reste à sa place.",
  },
  {
    question:
      "« C’est ma bourgeoise », dit Cosette de madame Thénardier. Que dit ce mot dans la bouche d’une enfant de huit ans ?",
    options: [
      "Que c’est une dame riche du village",
      "Que c’est sa patronne, et qu’elle parle d’elle en domestique",
      "Que c’est une parente éloignée qui l’a recueillie",
    ],
    answer: 1,
    because:
      "« Bourgeoise » est le mot d’un employé pour celle qui l’emploie. À huit ans, Cosette n’a pas une famille chez les Thénardier : elle y a une place.",
  },
  {
    question:
      "« L’auberge ? dit l’homme. Eh bien, je vais aller y loger cette nuit. » Pourquoi cette décision tombe-t-elle maintenant ?",
    options: [
      "Parce qu’il cherchait une auberge depuis le début du chemin",
      "Parce qu’il est trop fatigué pour aller plus loin",
      "Parce qu’il vient d’apprendre où vit l’enfant et veut voir",
    ],
    answer: 2,
    because:
      "Elle tombe juste après « Elle tient l’auberge ». Rien ne l’annonçait : c’est ce qu’il vient d’entendre sur Cosette qui décide de sa nuit.",
  },
  {
    question:
      "« Tu n’as donc pas de mère ? », « Qui est-ce donc qui t’a envoyée… ? » Que fait ce « donc » ?",
    options: [
      "Il marque que la question suit de ce qu’il vient de comprendre",
      "Il rend la question plus polie",
      "Il indique que l’homme répète une question déjà posée",
    ],
    answer: 0,
    because:
      "« Donc » enchaîne sur ce qui précède. Il a vu le seau, l’heure et le bois ; la question sort de là. Ce n’est pas de la curiosité, c’est une conclusion.",
  },
];

export const SETS: QuestionSets = { A2, B1 };
