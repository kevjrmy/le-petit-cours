import type { Question, QuestionSets } from "@/components/exercice/Comprehension";

/**
 * The questions for this extract, one set per level.
 *
 * **Data, not a component, and in its own file** so the `nav-wiring` audit can
 * import it and check its keys against the manifest's `levels` without loading
 * a client component and its stylesheet. Every import here is `import type`,
 * which type stripping erases, so plain `node` can read this file.
 *
 * **Both sets are answerable from this page**, which is what separates them
 * from trivia: same text, same vocabulary table, harder question
 * (`docs/decisions.md` #59 — difficulty is a property of the questions, not
 * only of the prose).
 */

/**
 * A2: five questions on what is said, then two on what is not. The whole novel
 * turns on the second kind — Morrel asking after the cargo before the dead man,
 * Danglars looking sideways — and both are readable at A2 because the text
 * states the gesture even where it hides the motive.
 */
const A2: Question[] = [
  {
    question: "Où et quand cette scène se passe-t-elle ?",
    options: [
      "À Naples, en 1815",
      "À Marseille, en 1815",
      "À Marseille, en 1840",
    ],
    answer: 1,
    because:
      "« Le 24 février 1815, la vigie de Notre-Dame de la Garde signala le trois-mâts le Pharaon. » Notre-Dame de la Garde est à Marseille.",
  },
  {
    question: "Qu’est-ce que le Pharaon ?",
    options: ["Un bateau", "Une maison", "Un café du port"],
    answer: 0,
    because:
      "C’est un trois-mâts, un grand bateau à voiles, qui revient de Smyrne, de Trieste et de Naples.",
  },
  {
    question: "Quel âge a Edmond Dantès ?",
    options: ["Entre dix et douze ans", "Entre dix-huit et vingt ans", "Trente ans"],
    answer: 1,
    because:
      "« C’était un jeune homme de dix-huit à vingt ans, grand, svelte, avec de beaux yeux noirs. »",
  },
  {
    question: "Quel est le grand malheur ?",
    options: [
      "Le bateau a été attaqué",
      "Le chargement est perdu",
      "Le capitaine Leclère est mort",
    ],
    answer: 2,
    because:
      "« Nous avons perdu ce brave capitaine Leclère. » Un peu plus loin, Dantès le dit en trois mots : « Il est mort. »",
  },
  {
    question: "De quoi le capitaine est-il mort ?",
    options: [
      "Il est tombé à la mer",
      "D’une fièvre",
      "Il s’est battu contre les Anglais",
    ],
    answer: 1,
    because:
      "Morrel demande « Tombé à la mer ? » et Dantès répond : « Non, monsieur ; mort d’une fièvre cérébrale. »",
  },
  {
    question:
      "Après la nouvelle de la mort, quelle est la première question de monsieur Morrel ?",
    options: [
      "Il demande des nouvelles du chargement",
      "Il demande comment le capitaine est mort",
      "Il demande si l’équipage va bien",
    ],
    answer: 0,
    because:
      "« Et le chargement ? demanda vivement l’armateur. » Il ne revient au capitaine qu’ensuite, et « d’un air visiblement soulagé » : la marchandise est sauve.",
  },
  {
    question: "Que pense Danglars de Dantès ?",
    options: [
      "Il l’admire",
      "Il ne le connaît pas",
      "Il le déteste",
    ],
    answer: 2,
    because:
      "Il ne le dit pas ; le texte le montre. Il jette « un regard oblique où brilla un éclair de haine », et il appelle Dantès « cela ».",
  },
];

/**
 * B1: the same page, and not one question about what happens.
 *
 * What changes is what is asked of her — a word read from its context instead
 * of from the table, an adverb that judges the man who is speaking, a sentence
 * that lets her rebuild the one Dumas cut, a compliment given back as an
 * insult. Every answer is still on the page, and every wrong option is still
 * something the text *contradicts* rather than something it merely omits.
 */
const B1: Question[] = [
  {
    question:
      "« Un grand malheur, pour moi surtout » : que dit ce « surtout » de la peine de Dantès ?",
    options: [
      "Il annonce la mort du capitaine sans y être mêlé lui-même",
      "Sa peine est plus forte que celle du reste de l’équipage",
      "Il est le seul à bord que cette mort attriste",
    ],
    answer: 1,
    because:
      "Morrel a vu « cet air de tristesse répandu sur tout votre bord » : tout l’équipage est triste. « Surtout » met la peine de Dantès au-dessus de cette tristesse commune, il ne la met pas à la place.",
  },
  {
    question:
      "« Et le chargement ? demanda vivement l’armateur », puis il revient au capitaine « d’un air visiblement soulagé ». Que font « vivement » et « soulagé » dans ces deux phrases ?",
    options: [
      "Ils disent la première inquiétude de Morrel : sa marchandise, avant son capitaine",
      "Ils montrent que Morrel est soulagé d’apprendre la mort du capitaine",
      "Ils marquent que Morrel n’a pas compris ce que Dantès vient de dire",
    ],
    answer: 0,
    because:
      "« Vivement » est la vitesse de la question, et « soulagé » vient après « il est arrivé à bon port ». Le narrateur ne juge pas Morrel : il met ses deux questions dans cet ordre et laisse lire.",
  },
  {
    question:
      "« Je crois que vous serez content sous ce rapport » : que veut dire « sous ce rapport » ?",
    options: [
      "D’après le rapport écrit du capitaine",
      "Malgré ce qui vient d’arriver",
      "Sur ce point-là, pour cette chose-là",
    ],
    answer: 2,
    because:
      "Un rapport n’est pas ici un document. Dantès sépare ses deux nouvelles, et le « mais » qui suit annonce la seconde : bonne pour le chargement, mauvaise pour le capitaine.",
  },
  {
    question:
      "Morrel dit d’Edmond qu’il travaille « en homme qui n’a besoin de demander des conseils à personne ». Que fait Danglars de cette phrase ?",
    options: [
      "Il la répète pour montrer qu’il est du même avis",
      "Il reprend la même qualité et la retourne contre Dantès",
      "Il corrige Morrel sur un point de métier",
    ],
    answer: 1,
    because:
      "« C’est jeune, et cela ne doute de rien. » Ne demander de conseils à personne devient ne douter de rien : la même qualité, dite en mal. Danglars ne contredit pas son patron, il le suit et empoisonne le mot.",
  },
  {
    question:
      "« Il n’y a pas besoin d’être si vieux marin que vous le dites, Danglars » : qu’avait dit Danglars avant ce passage ?",
    options: [
      "Que Dantès était trop jeune pour conduire le navire",
      "Qu’il voulait lui-même commander le Pharaon",
      "Qu’il avait défendu Dantès devant l’équipage",
    ],
    answer: 0,
    because:
      "Les crochets marquent ce qui est coupé, mais Morrel répond à une objection et la cite : « si vieux marin que vous le dites ». Il faut donc que Danglars ait fait de l’âge une condition du métier.",
  },
  {
    question:
      "Danglars dit « c’est jeune, et cela ne doute de rien ». Pourquoi « cela » et non « il » ?",
    options: [
      "Parce que Danglars parle du navire, pas de Dantès",
      "Parce que « cela » était la forme polie à cette époque",
      "Parce que parler d’un homme comme d’une chose est une façon de le rabaisser",
    ],
    answer: 2,
    because:
      "Le mot est choisi. Danglars n’insulte pas Dantès devant l’armateur : il lui retire seulement le pronom qu’on donne à une personne.",
  },
  {
    question:
      "Le récit dit « la vigie signala » et « brilla un éclair », mais Dantès dit « nous avons perdu ». Pourquoi deux temps différents ?",
    options: [
      "Le passé simple sert aux actions longues, le passé composé aux actions courtes",
      "Le récit écrit emploie le passé simple, les personnages qui parlent emploient le passé composé",
      "Dumas emploie les deux au hasard, comme on le faisait en 1844",
    ],
    answer: 1,
    because:
      "C’est la règle de tout le roman du dix-neuvième siècle. Vous lirez « il signala » toute votre vie sans jamais avoir à l’écrire : en parlant, on dit « il a signalé ».",
  },
];

export const SETS: QuestionSets = { A2, B1 };
