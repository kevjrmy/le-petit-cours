import type { Question, QuestionSets } from "@/components/exercice/Comprehension";

/**
 * The questions for this work, one set per level. Each level has its own
 * text as well (`a2.tsx`, `b1.tsx`), so a set asks about its own body (#92).
 *
 * **Data, not a component, and in its own file** so the `nav-wiring` audit can
 * import it. Every import here is `import type`, which type stripping erases,
 * so plain `node` reads it.
 */

/** A1, asked in Spanish, French in « » (#85): who, how old, from where, where she lives, who sent her. */
const A1: Question[] = [
  {
    question: "¿Qué lleva Cosette cuando el hombre le habla?",
    options: ["Una cesta de pan", "Un cubo de agua", "Una muñeca"],
    answer: 1,
    because: "« Cosette lâcha le seau. »: « le seau » es el cubo, y el hombre lo lleva por ella.",
  },
  {
    question: "¿Cuántos años tiene Cosette?",
    options: ["Seis años", "Ocho años", "Doce años"],
    answer: 1,
    because: "« Petite, quel âge as-tu ? » « Huit ans, monsieur. »: « huit » es ocho.",
  },
  {
    question: "¿De dónde viene Cosette con el agua?",
    options: ["De la posada", "Del manantial del bosque", "De París"],
    answer: 1,
    because: "« De la source qui est dans le bois. » La posada es adonde va, no de donde viene.",
  },
  {
    question: "¿Dónde vive Cosette?",
    options: ["En el bosque", "En París", "En Montfermeil"],
    answer: 2,
    because: "« Petite, où demeures-tu ? » « À Montfermeil, si vous connaissez. »",
  },
  {
    question: "¿Qué dice Cosette de su madre?",
    options: [
      "Que su madre la espera en la posada",
      "Que cree que no tiene madre",
      "Que su madre es la señora Thénardier",
    ],
    answer: 1,
    because: "« Je ne crois pas. Les autres en ont. Moi, je n’en ai pas. » La señora Thénardier es su patrona.",
  },
  {
    question: "¿Quién ha mandado a Cosette a buscar agua de noche?",
    options: ["Su madre", "El hombre", "La señora Thénardier"],
    answer: 2,
    because: "« Qui est-ce donc qui t’a envoyée à cette heure chercher de l’eau dans le bois ? » « C’est madame Thénardier. »",
  },
  {
    question: "¿Qué va a hacer el hombre esta noche?",
    options: ["Dormir en la posada", "Volver solo al bosque", "Irse a París"],
    answer: 0,
    because: "« Elle tient l’auberge. » « Eh bien, je vais aller y loger cette nuit. Conduis-moi. »",
  },
];

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
 * The questions for this text (`docs/decisions.md` #68).
 *
 * **Data, not a component, and in its own file** so the `nav-wiring` audit can
 * import it and check its keys against the manifest. Every import here is
 * `import type`, which type stripping erases, so plain `node` reads it.
 */

/**
 * B1: the whole chapter read for what nobody says. A child who lets go of a
 * bucket without asking who is taking it, who reasons her way to an answer
 * about her own mother, a man whose body answers a name before he does, and
 * a tear the narrator shows the reader and nobody in the scene can see.
 */
const B1: Question[] = [
  {
    question:
      "« Donnez, reprit l’homme, je vais vous le porter. » « Cosette lâcha le seau. » Que dit cette obéissance immédiate ?",
    options: [
      "Qu’elle refuse d’abord, puis finit par céder",
      "Qu’elle demande à l’homme qui il est avant de lâcher",
      "Qu’elle obéit sans discuter à l’adulte qui ordonne",
    ],
    answer: 2,
    because:
      "« Donnez » est un ordre, et la phrase suivante est « Cosette lâcha le seau. » : pas un mot, pas une question.",
  },
  {
    question:
      "Sur sa mère, Cosette dit d’abord « Je ne sais pas », puis « Je ne crois pas. Les autres en ont. Moi, je n’en ai pas. » Que fait-elle entre les deux ?",
    options: [
      "Elle raisonne à voix haute, parce que personne ne le lui a jamais dit",
      "Elle se souvient brusquement de sa mère",
      "Elle change de sujet pour ne pas répondre à l’inconnu",
    ],
    answer: 0,
    because:
      "Elle se compare aux autres enfants et en tire une conclusion, puis la corrige : « Je crois que je n’en ai jamais eu. » Personne ne lui a rien dit.",
  },
  {
    question:
      "« L’homme resta un moment sans parler, puis il dit brusquement : Tu n’as donc pas de mère ? » D’où vient ce « donc » ? Qu’a-t-il appris juste avant ?",
    options: [
      "Qu’elle s’appelle Cosette",
      "Qu’une enfant de huit ans porte seule ce seau, de la source du bois, loin de chez elle",
      "Qu’elle travaille pour madame Thénardier",
    ],
    answer: 1,
    because:
      "« Huit ans, monsieur. » « De la source qui est dans le bois. » « À un bon quart d’heure d’ici. » Le prénom et madame Thénardier ne viennent qu’après.",
  },
  {
    question:
      "« Comment t’appelles-tu ? » « Cosette. » « L’homme eut comme une secousse électrique. » Que montre cette réaction ?",
    options: [
      "Que ce prénom signifie quelque chose pour lui",
      "Qu’il a froid, seul dans le bois la nuit",
      "Que la réponse de l’enfant le met en colère",
    ],
    answer: 0,
    because:
      "La secousse vient au prénom, pas avant : « Il la regarda encore, puis il ôta ses mains de dessus les épaules de Cosette, saisit le seau, et se remit à marcher. »",
  },
  {
    question:
      "L’homme passe du « vous » au « tu ». Et Cosette, comment lui parle-t-elle, du bois jusqu’à l’auberge ?",
    options: [
      "Elle passe au « tu » elle aussi",
      "Elle dit « monsieur » et « vous » jusqu’au bout",
      "Elle cesse peu à peu de lui répondre",
    ],
    answer: 1,
    because:
      "« Oui, monsieur. » « À Montfermeil, si vous connaissez. » « Voulez-vous me laisser reprendre le seau à présent ? » Lui descend vers elle, elle reste à sa place.",
  },
  {
    question:
      "« C’est ma bourgeoise », dit Cosette de madame Thénardier. Que dit ce mot dans la bouche d’une enfant de huit ans ?",
    options: [
      "Que c’est une dame riche du village",
      "Que c’est une parente qui l’élève comme sa fille",
      "Que c’est sa patronne, et qu’elle parle d’elle en domestique",
    ],
    answer: 2,
    because:
      "« Est-ce qu’il n’y a pas de servante chez madame Thénardier ? » « Non, monsieur. » « Est-ce que tu es seule ? » « Oui, monsieur. » La servante, c’est elle.",
  },
  {
    question:
      "L’homme demande deux fois « Toute la journée ? », une fois pour Ponine et Zelma, une fois pour Cosette. Que fait voir cette question répétée ?",
    options: [
      "Que Cosette joue avec Ponine et Zelma toute la journée",
      "Que les deux filles jouent toute la journée et que Cosette travaille toute la journée",
      "Que l’homme n’a pas entendu la première réponse",
    ],
    answer: 1,
    because:
      "« Elles jouent, elles s’amusent. » « Moi, je travaille. » La même question, la même réponse « Oui, monsieur », et deux vies opposées.",
  },
  {
    question:
      "« L’enfant leva ses grands yeux où il y avait une larme qu’on ne voyait pas à cause de la nuit. » Qui voit cette larme ?",
    options: [
      "L’homme, qui la regarde de près",
      "Madame Thénardier, qui l’attend à l’auberge",
      "Personne dans la scène : le narrateur la montre au lecteur",
    ],
    answer: 2,
    because:
      "« qu’on ne voyait pas à cause de la nuit » : l’homme ne peut pas la voir, et Cosette répond « doucement ». Seul le lecteur sait qu’elle pleure.",
  },
  {
    question:
      "Près de l’auberge, Cosette demande : « Voulez-vous me laisser reprendre le seau à présent ? » Pourquoi ?",
    options: [
      "Parce que madame la battra si elle voit qu’on l’a aidée",
      "Parce qu’elle veut montrer à l’homme qu’elle est forte",
      "Parce que l’homme est trop fatigué pour le porter",
    ],
    answer: 0,
    because: "« C’est que si madame voit qu’on me l’a porté, elle me battra. »",
  },
  {
    question:
      "« Et qui ne coupe pas ? » « Si, monsieur, dit l’enfant, ça coupe la salade et les têtes de mouches. » Pourquoi « si » et pas « oui » ?",
    options: [
      "Parce que « si » est plus poli que « oui »",
      "Parce qu’elle parle à un adulte qu’elle ne connaît pas",
      "Parce qu’elle contredit une question posée à la forme négative",
    ],
    answer: 2,
    because:
      "« Et qui ne coupe pas ? » est négative : pour dire le contraire, on répond « si ». Ailleurs, au même inconnu, elle dit « Oui, monsieur ».",
  },
];

export const SETS: QuestionSets = { A1, A2, B1 };
