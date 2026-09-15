import type { Question, QuestionSets } from "@/components/exercice/Comprehension";

/**
 * The questions for « L’Invitation au voyage », one set per level.
 *
 * **Data, not a component, and in its own file** so the `nav-wiring` audit can
 * import it and check its keys against the manifest's `levels` without loading
 * a client component and its stylesheet. Every import here is `import type`,
 * which type stripping erases, so plain `node` can read this file.
 */

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
 * B1: the same poem read for the two things that decide it — the conditional,
 * which says the chambre does not exist, and the restrictive « ne… que » in the
 * refrain, which is usually read as praise and is closer to a boundary. Both
 * are answerable from the page, and the last bridges to « la négation ».
 */
const B1: Question[] = [
  {
    question:
      "« Décoreraient », « parlerait » : ces verbes sont au conditionnel. Qu’est-ce que cela change ?",
    options: [
      "La chambre est décrite telle qu’elle est aujourd’hui",
      "La chambre n’existe pas : elle existerait, s’ils partaient",
      "La chambre a existé autrefois et a disparu",
    ],
    answer: 1,
    because:
      "Le conditionnel place la scène dans ce qui n’est pas encore. Toute la deuxième strophe est une chambre rêvée, pas une chambre visitée.",
  },
  {
    question:
      "« Les soleils mouillés / De ces ciels brouillés » ressemblent, dans le poème, à quoi ?",
    options: [
      "Au pays lointain qu’il décrit",
      "Aux yeux de la femme, qui brillent à travers leurs larmes",
      "Aux miroirs profonds de la chambre",
    ],
    answer: 1,
    because:
      "« Pour mon esprit ont les charmes / Si mystérieux / De tes traîtres yeux, / Brillant à travers leurs larmes. » Le ciel voilé et l’œil en larmes sont la même image.",
  },
  {
    question: "Le poète appelle ces yeux « traîtres ». Que dit ce mot ?",
    options: [
      "Qu’il ne leur fait pas entièrement confiance, et les aime quand même",
      "Que la femme lui a menti au sujet du voyage",
      "Que ses yeux ont changé de couleur",
    ],
    answer: 0,
    because:
      "Le mot est posé au milieu d’un compliment, sans être expliqué ni repris. Rien dans le poème ne raconte une trahison : le charme et la méfiance tiennent dans le même vers.",
  },
  {
    question:
      "« C’est pour assouvir / Ton moindre désir / Qu’ils viennent du bout du monde. » Que dit ce vers des vaisseaux ?",
    options: [
      "Qu’ils transportent des marchandises rares",
      "Que le monde entier se dérange pour son plus petit désir",
      "Qu’ils repartiront dès qu’elle le demandera",
    ],
    answer: 1,
    because:
      "« Moindre » veut dire le plus petit. Ce n’est pas un grand désir qui fait venir les bateaux : c’est le plus petit d’entre eux.",
  },
  {
    question: "Le refrain revient trois fois, identique. Qu’est-ce qu’il fait ?",
    options: [
      "Il fait avancer l’histoire d’une strophe à l’autre",
      "Il arrête la description et dit seulement ce qu’on ressent là-bas",
      "Il répète ce que la strophe précédente vient de décrire",
    ],
    answer: 1,
    because:
      "Les strophes nomment des objets, meubles, fleurs, plafonds, vaisseaux. Le refrain n’en nomme aucun : ordre, beauté, luxe, calme, volupté ne sont pas des choses.",
  },
  {
    question: "« Là, tout n’est qu’ordre et beauté » : que veut dire « ne… que » ici ?",
    options: [
      "Il n’y a rien d’autre que de l’ordre et de la beauté",
      "Il n’y a ni ordre ni beauté",
      "Il n’y a pas assez d’ordre ni de beauté",
    ],
    answer: 0,
    because:
      "« Ne… que » n’est pas une négation : c’est une restriction, et elle veut dire « seulement ». Là-bas, il n’y a que cela, et rien d’autre.",
  },
];

export const SETS: QuestionSets = { A2, B1 };
