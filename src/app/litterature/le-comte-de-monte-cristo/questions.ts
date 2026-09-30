import type { Question, QuestionSets } from "@/components/exercice/Comprehension";

/**
 * The questions for this work, one set per level. Each level has its own
 * text as well (`a2.tsx`, `b1.tsx`), so a set asks about its own body (#92).
 *
 * **Data, not a component, and in its own file** so the `nav-wiring` audit can
 * import it. Every import here is `import type`, which type stripping erases,
 * so plain `node` reads it.
 */

/** A1: asked in Spanish on the Morrel–Dantès exchange; French in « » (`quotes="fr"`). */
const A1: Question[] = [
  {
    question: "¿Quién es el hombre de la barca?",
    options: [
      "El capitán Leclère",
      "Edmond Dantès",
      "El señor Morrel, el dueño del barco",
    ],
    answer: 2,
    because:
      "Dantès le contesta « monsieur Morrel », y el texto lo llama « l’armateur »: el dueño del barco. El capitán Leclère ha muerto.",
  },
  {
    question: "¿Qué gran desgracia anuncia Dantès?",
    options: [
      "La carga se ha perdido",
      "El capitán Leclère ha muerto",
      "Un marinero se ha caído al mar",
    ],
    answer: 1,
    because:
      "« nous avons perdu ce brave capitaine Leclère », y después: « Il est mort. »",
  },
  {
    question: "Después de la noticia, ¿qué pregunta primero Morrel?",
    options: [
      "« Et le chargement ? »",
      "« Tombé à la mer ? »",
      "« Que lui est-il donc arrivé ? »",
    ],
    answer: 0,
    because:
      "« Et le chargement ? demanda vivement l’armateur. » Pregunta por la carga antes que por el capitán.",
  },
  {
    question: "¿Cómo ha llegado la carga?",
    options: [
      "Sin problemas",
      "Se ha perdido en el mar",
      "Se ha quedado en Civitavecchia",
    ],
    answer: 0,
    because:
      "« Il est arrivé à bon port »: la carga ha llegado sin problemas, y Dantès añade: « vous serez content ».",
  },
  {
    question: "¿De qué ha muerto el capitán?",
    options: [
      "Se ha caído al mar",
      "De una fiebre",
      "En una pelea",
    ],
    answer: 1,
    because:
      "Morrel pregunta « Tombé à la mer ? » y Dantès contesta: « Non, monsieur ; mort d’une fièvre cérébrale ».",
  },
  {
    question:
      "Morrel pregunta por el capitán « d’un air visiblement soulagé ». ¿Por qué está aliviado?",
    options: [
      "Porque el capitán no ha muerto",
      "Porque la carga ha llegado bien",
      "Porque Dantès se ha quedado en Civitavecchia",
    ],
    answer: 1,
    because:
      "Acaba de oír « Il est arrivé à bon port »: la carga está a salvo. El capitán sí ha muerto, y Dantès está en el barco, hablando con él.",
  },
  {
    question: "Con « arriver » y « mourir », ¿qué auxiliar usa Dantès?",
    options: [
      "« être »: « il est arrivé », « il est mort »",
      "« avoir »: « il a arrivé », « il a mort »",
    ],
    answer: 0,
    because:
      "« Il est arrivé à bon port », « Il est mort »: con « être ». En español siempre se usa haber; en francés, no.",
  },
];

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
 * The questions for the whole passage, B1 only.
 *
 * **Data, not a component, and in its own file** so the `nav-wiring` audit can
 * import it and check its keys against the manifest without loading a client
 * component. Every import here is `import type`, so plain `node` can read it.
 *
 * The A2 page quotes a cut extract; this one quotes the passage whole, so the
 * question that asked her to rebuild a cut sentence now asks which sentence
 * Morrel answers. Every answer is on the page, and every wrong option is
 * something the text contradicts rather than something it merely omits.
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
      "Morrel a vu « cet air de tristesse répandu sur tout votre bord » : tout l’équipage est triste, et « surtout » met la peine de Dantès au-dessus de cette tristesse commune.",
  },
  {
    question:
      "« Et le chargement ? demanda vivement l’armateur », puis il revient au capitaine « d’un air visiblement soulagé ». Que montrent « vivement » et « soulagé » ?",
    options: [
      "La première inquiétude de Morrel : sa marchandise, avant son capitaine",
      "Morrel est heureux d’apprendre la mort du capitaine",
      "Morrel n’a pas compris ce que Dantès vient de dire",
    ],
    answer: 0,
    because:
      "« Soulagé » vient juste après « il est arrivé à bon port » : c’est la marchandise sauvée qui le rassure, et plus loin il « paraissait se consoler de plus en plus ».",
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
      "Dantès sépare ses deux nouvelles, et le « mais » qui suit annonce la seconde : « content sous ce rapport ; mais ce pauvre capitaine Leclère… ».",
  },
  {
    question:
      "« C’était bien la peine de faire dix ans la guerre aux Anglais pour en arriver à mourir, comme tout le monde, dans son lit. » Que veut dire Dantès ?",
    options: [
      "Tant de dangers traversés, et le capitaine meurt d’une maladie, comme n’importe qui",
      "Le capitaine est mort au combat contre les Anglais",
      "Le capitaine a eu la mort tranquille qu’il méritait après la guerre",
    ],
    answer: 0,
    because:
      "Il le dit « avec un sourire mélancolique » : le capitaine est mort « d’une fièvre cérébrale, au milieu d’horribles souffrances », pas dans une bataille.",
  },
  {
    question:
      "« Il faut bien que les anciens fassent place aux nouveaux, sans cela il n’y aurait pas d’avancement. » Que dit Morrel ?",
    options: [
      "Les anciens doivent rester à bord pour former les nouveaux",
      "La mort d’un capitaine laisse une place à un plus jeune",
      "Le navire doit avancer plus vite pour arriver à l’heure",
    ],
    answer: 1,
    because:
      "« Faire place », c’est laisser sa place ; l’avancement, c’est monter dans son métier. Et Morrel parle à « monsieur Edmond », un jeune homme « de dix-huit à vingt ans ».",
  },
  {
    question:
      "« Il n’y a pas besoin d’être si vieux marin que vous le dites, Danglars » : à quelle phrase de Danglars Morrel répond-il ?",
    options: [
      "« Vous savez le malheur, n’est-ce pas ? »",
      "« C’est jeune, et cela ne doute de rien »",
      "« Un excellent marin surtout, vieilli entre le ciel et l’eau »",
    ],
    answer: 2,
    because:
      "Danglars vient de dire que Leclère était « vieilli entre le ciel et l’eau », et Morrel reprend le mot : « si vieux marin que vous le dites ». L’autre phrase sur l’âge vient après.",
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
      "« C’est jeune, et cela ne doute de rien. » Ne demander de conseils à personne devient ne douter de rien : la même qualité, dite en mal.",
  },
  {
    question:
      "Danglars dit « c’est jeune, et cela ne doute de rien ». Pourquoi « cela » et non « il » ?",
    options: [
      "Parce que Danglars parle du navire, pas de Dantès",
      "Parce que Danglars veut faire un compliment à Dantès devant l’armateur",
      "Parce qu’en parlant de lui comme d’une chose, il le rabaisse sans le dire",
    ],
    answer: 2,
    because:
      "Il le dit « en jetant sur Dantès un regard oblique où brilla un éclair de haine » : ce n’est pas un compliment, et « cela » est le pronom d’une chose, pas d’une personne.",
  },
  {
    question: "Que reproche Danglars à Dantès, à la fin du passage ?",
    options: [
      "D’avoir pris le commandement seul et fait perdre du temps à l’île d’Elbe",
      "D’avoir perdu une partie de la cargaison pendant le voyage",
      "D’avoir caché à l’armateur la mort du capitaine",
    ],
    answer: 0,
    because:
      "« Il a pris le commandement sans consulter personne, et il nous a fait perdre un jour et demi à l’île d’Elbe au lieu de revenir directement à Marseille. »",
  },
  {
    question:
      "« À peine le capitaine a-t-il été mort qu’il a pris le commandement » : quand Dantès a-t-il pris le commandement ?",
    options: [
      "Juste après la mort du capitaine",
      "Longtemps après, une fois l’équipage consulté",
      "Jamais vraiment, il a eu du mal à le prendre",
    ],
    answer: 0,
    because:
      "« À peine… que » dit qu’une chose arrive tout de suite après une autre, et Danglars ajoute « sans consulter personne ».",
  },
];

export const SETS: QuestionSets = { A1, A2, B1 };
