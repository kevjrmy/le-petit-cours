import type { Question, QuestionSets } from "@/components/exercice/Comprehension";

/**
 * The questions for this work, one set per level. Each level has its own
 * text as well (`a2.tsx`, `b1.tsx`), so a set asks about its own body (#92).
 *
 * **Data, not a component, and in its own file** so the `nav-wiring` audit can
 * import it. Every import here is `import type`, which type stripping erases,
 * so plain `node` reads it.
 */

/** A1: the first stanza and the refrain, asked in Spanish, every piece of French in « » (#85). */
const A1: Question[] = [
  {
    question: "« Mon enfant, ma sœur »: ¿con quién habla el poeta?",
    options: [
      "Con su hermana",
      "Con su hija",
      "Con la mujer que ama",
    ],
    answer: 2,
    because:
      "« Mon enfant » y « ma sœur » no hablan de la familia: son palabras cariñosas para la mujer que ama.",
  },
  {
    question: "¿Qué le propone a esa mujer?",
    options: [
      "Irse a vivir allí con él",
      "Esperarle mientras él viaja",
      "Quedarse en la ciudad donde viven",
    ],
    answer: 0,
    because:
      "« Songe à la douceur / D’aller là-bas vivre ensemble ! »: irse allí y vivir juntos.",
  },
  {
    question: "¿Qué dice el poema de ese país?",
    options: [
      "Que está en el fin del mundo",
      "Que se parece a ella",
      "Que es el país donde nació él",
    ],
    answer: 1,
    because:
      "« Au pays qui te ressemble ! »: no dice nunca dónde está, solo que se parece a ella.",
  },
  {
    question: "¿Cómo son los soles de ese país?",
    options: [
      "Muy calientes, en un cielo azul",
      "Mojados, en cielos nublados",
      "Rojos, al final del día",
    ],
    answer: 1,
    because:
      "« Les soleils mouillés / De ces ciels brouillés »: soles mojados en cielos llenos de nubes.",
  },
  {
    question: "¿A qué se parecen esos soles, para el poeta?",
    options: [
      "A los ojos de ella, que brillan entre lágrimas",
      "A las flores de su jardín",
      "A las estrellas de la noche",
    ],
    answer: 0,
    because:
      "Tienen « les charmes / Si mystérieux / De tes traîtres yeux, / Brillant à travers leurs larmes ».",
  },
  {
    question: "¿Qué dice el estribillo de ese lugar?",
    options: [
      "Que allí hay mucho ruido y fiesta",
      "Que allí todo es orden, belleza, lujo, calma y placer",
      "Que allí se trabaja mucho",
    ],
    answer: 1,
    because:
      "« Là, tout n’est qu’ordre et beauté, / Luxe, calme et volupté. »",
  },
  {
    question: "« Songe à la douceur »: ¿qué quiere decir « songer à »?",
    options: ["Soñar dormido", "Pensar en, imaginar", "Cantar"],
    answer: 1,
    because:
      "« songer à » parece « soñar », pero es pensar en algo. Soñar dormido es « rêver ».",
  },
];

/**
 * A2: the poem names concrete things throughout — meubles, fleurs, plafonds,
 * vaisseaux — so the set can stay on what is on the page without becoming a
 * vocabulary quiz. The refrain is asked once, because it is the two lines she
 * will still have in a year.
 */
const A2: Question[] = [
  {
    question: "Comment le poète appelle-t-il la personne à qui il parle ?",
    options: [
      "« Mon enfant, ma sœur »",
      "« Ma reine, ma belle »",
      "« Mon amie, ma voisine »",
    ],
    answer: 0,
    because:
      "Ce sont les trois premiers mots du poème. Il ne parle ni de sa famille ni d’une enfant : ce sont des mots tendres pour la femme qu’il aime.",
  },
  {
    question: "Que propose-t-il à cette femme ?",
    options: [
      "De partir vivre là-bas avec lui",
      "De l’attendre pendant son voyage",
      "De venir habiter dans sa ville",
    ],
    answer: 0,
    because:
      "« Songe à la douceur / D’aller là-bas vivre ensemble ! » Tout le poème est cette proposition.",
  },
  {
    question: "Comment est le pays dont il parle ?",
    options: [
      "Il est loin, au bout du monde",
      "Il ressemble à la femme à qui il parle",
      "C’est le pays où il est né",
    ],
    answer: 1,
    because:
      "« Au pays qui te ressemble ! » Le poème ne dit jamais où ce pays se trouve, seulement à qui il ressemble.",
  },
  {
    question: "Que dit le refrain de ce lieu ?",
    options: [
      "Qu’il y a de l’or et des fleurs",
      "Qu’il n’y a qu’ordre, beauté, luxe, calme et volupté",
      "Qu’on y parle une langue étrangère",
    ],
    answer: 1,
    because:
      "« Là, tout n’est qu’ordre et beauté, / Luxe, calme et volupté. » Ces deux vers reviennent trois fois, sans changer un mot.",
  },
  {
    question: "Comment sont les meubles de la chambre ?",
    options: [
      "Neufs et modernes",
      "Luisants et polis par les ans",
      "Simples et en bois blanc",
    ],
    answer: 1,
    because:
      "« Des meubles luisants, / Polis par les ans. » C’est le temps qui les a rendus beaux, pas l’argent.",
  },
  {
    question: "Qu’est-ce qui dort sur les canaux ?",
    options: ["Des oiseaux", "Des vaisseaux", "Des fleurs"],
    answer: 1,
    because:
      "« Vois sur ces canaux / Dormir ces vaisseaux. » Un vaisseau est un grand bateau.",
  },
  {
    question: "À quel moment de la journée le poème se termine-t-il ?",
    options: ["Au petit matin", "À midi", "Au coucher du soleil"],
    answer: 2,
    because:
      "« Les soleils couchants » habillent la ville d’or, puis « le monde s’endort dans une chaude lumière ».",
  },
];

/**
 * The questions for « L’Invitation au voyage » in prose (1869).
 *
 * **Data, not a component, and in its own file** so the `nav-wiring` audit can
 * import it and check its keys against the manifest's `sets` without loading
 * a client component and its stylesheet. Every import here is `import type`,
 * which type stripping erases, so plain `node` can read this file.
 */

/**
 * B1: the text is C1 prose, so the set follows the page's four steps (the
 * country, the house, the flower, the doubt) and asks what each image stands
 * for, never what a rare word means out of context. The ships are asked with
 * the verse lines the astuce quotes, and the last question bridges to the
 * passé simple through the page's one example.
 */
const B1: Question[] = [
  {
    question: "Où se trouve ce pays, d’après le premier paragraphe ?",
    options: [
      "Dans le Nord, mais il ressemble à l’Orient",
      "En Chine, au bout du monde",
      "Dans le Sud, sous un soleil brûlant",
    ],
    answer: 0,
    because:
      "« Pays singulier, noyé dans les brumes de notre Nord, et qu’on pourrait appeler l’Orient de l’Occident, la Chine de l’Europe. »",
  },
  {
    question: "Qu’est-ce qui n’existe pas dans ce pays de Cocagne ?",
    options: [
      "Le luxe et la cuisine riche",
      "Le désordre, la turbulence et l’imprévu",
      "Le silence et le calme",
    ],
    answer: 1,
    because:
      "« D’où le désordre, la turbulence et l’imprévu sont exclus. » Le luxe, la cuisine et le silence, eux, y sont.",
  },
  {
    question: "Il parle de « la sœur d’élection ». De qui s’agit-il ?",
    options: [
      "De sa vraie sœur, qui voyage avec lui",
      "De la femme aimée, une sœur qu’il a choisie",
      "D’une amie d’enfance qu’il a perdue",
    ],
    answer: 1,
    because:
      "« Qu’on puisse offrir à la femme aimée, à la sœur d’élection » : les deux noms désignent la même personne, une sœur choisie, pas de naissance.",
  },
  {
    question: "À quoi ressemblent les meubles de la maison ?",
    options: [
      "À des âmes raffinées, pleines de secrets",
      "À ceux d’une maison modeste et simple",
      "À des meubles neufs, sans histoire",
    ],
    answer: 0,
    because:
      "« Les meubles sont vastes, curieux, bizarres, armés de serrures et de secrets comme des âmes raffinées. »",
  },
  {
    question:
      "Les alchimistes de l’horticulture cherchent une tulipe noire et un dahlia bleu. Qu’a trouvé le narrateur ?",
    options: [
      "Les deux fleurs, et il a gagné le prix",
      "Rien : il cherche encore avec eux",
      "Sa tulipe noire et son dahlia bleu, c’est-à-dire la femme qu’il aime",
    ],
    answer: 2,
    because:
      "« Moi, j’ai trouvé ma tulipe noire et mon dahlia bleu ! » puis il s’adresse à elle : « Fleur incomparable, tulipe retrouvée ».",
  },
  {
    question:
      "« Qu’ils cherchent, qu’ils cherchent encore » : quelle attitude montre ce subjonctif ?",
    options: [
      "Il leur demande de l’aider dans sa recherche",
      "Libre à eux de chercher : lui, il a déjà trouvé",
      "Il regrette de ne pas pouvoir chercher avec eux",
    ],
    answer: 1,
    because:
      "La phrase suivante oppose « Moi, j’ai trouvé » à leurs recherches sans fin : il les laisse chercher, cela ne le concerne plus.",
  },
  {
    question:
      "« Chaque homme porte en lui sa dose d’opium naturel. » Que veut dire le narrateur ?",
    options: [
      "Que chacun fabrique des rêves qui l’éloignent du possible",
      "Que les rêves aident à agir et à réussir",
      "Qu’il a rapporté de l’opium de Sumatra",
    ],
    answer: 0,
    because:
      "« Plus l’âme est ambitieuse et délicate, plus les rêves l’éloignent du possible. » L’opium, ici, ce sont les rêves.",
  },
  {
    question:
      "« Ces trésors, ces meubles, ce luxe, cet ordre, ces parfums, ces fleurs miraculeuses » : qu’est-ce que c’est, à la fin ?",
    options: [
      "Le pays où il est né",
      "Ses pensées, parties au loin",
      "La femme à qui il parle",
    ],
    answer: 2,
    because:
      "« Ces trésors, ces meubles, ce luxe, cet ordre, ces parfums, ces fleurs miraculeuses, c’est toi. » Ses pensées, ce sont les navires, pas les trésors.",
  },
  {
    question:
      "Dans le poème en vers, les bateaux viennent « pour assouvir ton moindre désir ». Et dans la prose ?",
    options: [
      "Ils viennent aussi pour satisfaire ses désirs à elle",
      "Ce sont les pensées de l’homme, qui partent vers l’infini et reviennent vers elle",
      "Ils emportent le couple vers le pays rêvé",
    ],
    answer: 1,
    because:
      "« Ces énormes navires […] ce sont mes pensées », et à la fin « ce sont encore mes pensées enrichies qui reviennent de l’infini vers toi ».",
  },
  {
    question:
      "« Les artistes qui les créèrent » : c’est un fait unique et terminé, pas une habitude. Comment dit-on cela à l’oral ?",
    options: [
      "Les artistes qui les créent",
      "Les artistes qui les créaient",
      "Les artistes qui les ont créées",
    ],
    answer: 2,
    because:
      "« Créèrent » est un passé simple, un temps de livre. Pour un fait unique et terminé, l’oral dit « qui les ont créées » ; l’imparfait dirait une habitude.",
  },
];

export const SETS: QuestionSets = { A1, A2, B1 };
