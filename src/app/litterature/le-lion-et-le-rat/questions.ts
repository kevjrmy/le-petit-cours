import type { Question, QuestionSets } from "@/components/exercice/Comprehension";

/**
 * The questions for this work, one set per level. Each level has its own
 * text as well (`a2.tsx`, `b1.tsx`), so a set asks about its own body (#92).
 *
 * **Data, not a component, and in its own file** so the `nav-wiring` audit can
 * import it. Every import here is `import type`, which type stripping erases,
 * so plain `node` reads it.
 */

/** A1: asked in Spanish, answered from the French (#85); French sits in « ». */
const A1: Question[] = [
  {
    question: "¿Dónde sale de la tierra el ratón?",
    options: [
      "Dentro de una red",
      "Entre las patas de un león",
      "Lejos del león",
    ],
    answer: 1,
    because: "« Entre les pattes d’un lion / Un rat sortit de terre. »",
  },
  {
    question: "¿Quién es « le roi des animaux »?",
    options: ["El ratón", "El león", "Un cazador"],
    answer: 1,
    because:
      "El rey de los animales es el león: es él quien tiene al ratón entre sus patas.",
  },
  {
    question: "¿Qué hace el león con el ratón?",
    options: ["Se lo come", "No lo ve", "Le perdona la vida"],
    answer: 2,
    because:
      "« et lui donna la vie »: el león podía comérselo, y lo deja vivir.",
  },
  {
    question: "¿Qué le pasa al león después?",
    options: [
      "Se pone enfermo",
      "Cae en una red",
      "Se come al ratón",
    ],
    answer: 1,
    because: "« Ce lion fut pris dans des rets »: « des rets » es una red.",
  },
  {
    question: "¿Cómo libera el ratón al león?",
    options: [
      "Con los dientes: roe la red",
      "Llama a los otros animales",
      "Ruge muy fuerte",
    ],
    answer: 0,
    because:
      "« fit tant par ses dents / Qu’une maille rongée emporta tout l’ouvrage »: trabaja solo, con los dientes.",
  },
  {
    question: "En el primer verso, ¿qué quiere decir « obliger »?",
    options: ["Obligar", "Ayudar, hacer un favor", "Castigar"],
    answer: 1,
    because:
      "« Il faut, autant qu’on peut, obliger tout le monde »: hay que ayudar a todo el mundo. Hoy « obliger » es obligar, pero aquí no.",
  },
  {
    question: "Según los dos últimos versos, ¿qué puede más?",
    options: [
      "La fuerza",
      "La rabia",
      "La paciencia y el tiempo",
    ],
    answer: 2,
    because:
      "« Patience et longueur de temps / Font plus que force ni que rage. »",
  },
];

/**
 * A2: seven questions on eighteen lines. The fable is short enough that a merely
 * unlikely distractor would be ruled out in a second, so each wrong option here
 * is something the text contradicts.
 */
const A2: Question[] = [
  {
    question: "Où le rat sort-il de terre ?",
    options: [
      "Dans un filet de chasseur",
      "Entre les pattes d’un lion",
      "Au bord d’une forêt",
    ],
    answer: 1,
    because: "« Entre les pattes d’un lion / Un rat sortit de terre. »",
  },
  {
    question: "Que fait le lion quand il découvre le rat ?",
    options: [
      "Il le mange",
      "Il ne le voit pas",
      "Il lui laisse la vie",
    ],
    answer: 2,
    because:
      "« Montra ce qu’il était, et lui donna la vie » : donner la vie, ici, c’est épargner.",
  },
  {
    question: "Comment le rat sort-il de terre ?",
    options: [
      "Prudemment, après avoir regardé",
      "Sans faire attention",
      "En courant, pour échapper au lion",
    ],
    answer: 1,
    because:
      "« Assez à l’étourdie » : c’est ce qui explique qu’il se retrouve sous les pattes du lion.",
  },
  {
    question: "Que devient le lion plus tard ?",
    options: [
      "Il est pris dans des rets",
      "Il tombe malade",
      "Il perd sa forêt",
    ],
    answer: 0,
    because: "« Ce lion fut pris dans des rets », c’est-à-dire dans des filets.",
  },
  {
    question: "Pourquoi ses rugissements ne servent-ils à rien ?",
    options: [
      "Personne ne les entend",
      "Ils ne défont pas le filet",
      "Le lion est trop faible pour crier",
    ],
    answer: 1,
    because:
      "« Dont ses rugissements ne le purent défaire » : la force ne suffit pas contre un filet.",
  },
  {
    question: "Comment le rat libère-t-il le lion ?",
    options: [
      "Il appelle les autres animaux",
      "Il ronge une maille du filet",
      "Il va chercher le chasseur",
    ],
    answer: 1,
    because:
      "« Fit tant par ses dents / Qu’une maille rongée emporta tout l’ouvrage » : il travaille seul, avec ses dents.",
  },
  {
    question: "« Un rat sortit de terre » : à quel temps est ce verbe ?",
    options: ["Au présent", "Au passé composé", "Au passé simple"],
    answer: 2,
    because:
      "C’est le temps du récit écrit. En parlant, on dirait « un rat est sorti de terre ».",
  },
];

/**
 * The questions for this text: one set, at B1. The A2 reading of the first
 * fable alone is `litterature/le-lion-et-le-rat`; this page is the pair.
 *
 * **Data, not a component, and in its own file** so the `nav-wiring` audit can
 * import it and check its keys against the manifest's `sets`. Every import
 * here is `import type`, which type stripping erases, so plain `node` reads it.
 *
 * The two fables read as one argument: the promise of « deux fables », the
 * moral that serves both, the same pattern told twice, a verb whose old sense
 * the Spanish cognate hides, a rhetorical question, the switch to the present,
 * a scene seen at an ant's size, and the names each fable gives its characters.
 */
const B1: Question[] = [
  {
    question:
      "La première fable s’ouvre sur une leçon et se ferme sur une autre. Laquelle vaut aussi pour la seconde fable ?",
    options: [
      "« On a souvent besoin d’un plus petit que soi »",
      "« Patience et longueur de temps / Font plus que force ni que rage »",
      "Aucune des deux : la seconde fable finit sur sa propre morale",
    ],
    answer: 0,
    because:
      "La fourmi, plus petite que la colombe, la sauve d’un seul coup, sans patience ni longueur de temps ; et « Point de pigeon pour une obole » est une plaisanterie, pas une morale.",
  },
  {
    question:
      "« L’autre exemple est tiré d’animaux plus petits. » De quel exemple parle ce vers ?",
    options: [
      "Du rat, plus petit que le lion",
      "De la seconde preuve promise au début de la fable précédente",
      "D’un exemple que le lecteur doit trouver lui-même",
    ],
    answer: 1,
    because:
      "« De cette vérité deux fables feront foi » : le lion et le rat sont la première preuve, la colombe et la fourmi la seconde.",
  },
  {
    question:
      "« Il faut, autant qu’on peut, obliger tout le monde. » Que veut dire « obliger » ici ?",
    options: [
      "Forcer les autres à faire quelque chose",
      "Remercier celui qui vous a aidé",
      "Rendre service à quelqu’un",
    ],
    answer: 2,
    because:
      "C’est un sens ancien : « On a souvent besoin d’un plus petit que soi » ; il faut donc rendre service à tous. Le sens de forcer rendrait la morale incompréhensible.",
  },
  {
    question:
      "« Quelqu’un aurait-il jamais cru / Qu’un lion d’un rat eût affaire ? » Que fait cette question ?",
    options: [
      "Elle demande au lecteur de répondre avant de continuer",
      "Elle dit que personne n’y aurait cru, et prépare le retournement",
      "Elle annonce que le lion va finir par manger le rat",
    ],
    answer: 1,
    because:
      "La question n’attend pas de réponse : deux vers plus loin, « Ce lion fut pris dans des rets », et c’est le rat qui le délivre.",
  },
  {
    question:
      "Le rat, appelé « un rat » au début, devient « Sire rat » quand il accourt. Que fait ce changement ?",
    options: [
      "Il indique qu’un second rat entre dans l’histoire",
      "Il montre que le rat se moque du lion",
      "Il donne au rat le titre d’un roi",
    ],
    answer: 2,
    because:
      "« Sire » est le titre d’un roi, et le lion était « le roi des animaux » : le rat le reçoit quand il accourt pour le sauver, pas pour se moquer de lui.",
  },
  {
    question:
      "Le ruisseau devient « cet océan » et le brin d’herbe « un promontoire ». Pourquoi ?",
    options: [
      "Parce que la scène est vue à la taille de la fourmi",
      "Parce que le ruisseau déborde et devient une mer",
      "Parce que la colombe emporte la fourmi jusqu’à la mer",
    ],
    answer: 0,
    because:
      "C’est « un clair ruisseau » où boit une colombe, et « un brin d’herbe dans l’eau » : pour une fourmi, c’est un océan et un promontoire.",
  },
  {
    question:
      "La seconde fable passe au présent au milieu du récit : « y tombe », « arrive », « la fourmi le pique ». Pourquoi ?",
    options: [
      "Parce que l’histoire se passe aujourd’hui",
      "Parce que le présent accélère l’action, qu’on voit se dérouler",
      "Parce que ce sont les paroles de la colombe",
    ],
    answer: 1,
    because:
      "Le récit commence au passé, « buvait une colombe », puis passe au présent : l’histoire n’est pas d’aujourd’hui, et personne ne parle dans cette fable.",
  },
  {
    question:
      "« Un certain croquant », « mon villageois », « le vilain » : qui désignent ces trois noms ?",
    options: [
      "Trois hommes qui passent l’un après l’autre",
      "Trois titres de plus en plus nobles pour le chasseur",
      "Le même paysan, nommé de trois façons",
    ],
    answer: 2,
    because:
      "« Ce croquant » s’apprête à tuer la colombe, « mon villageois » aussi, et « le vilain » retourne la tête quand la fourmi le pique : un seul homme, trois noms.",
  },
  {
    question:
      "« Dès qu’il voit l’oiseau de Vénus, / Il le croit en son pot. » Que pense le croquant ?",
    options: [
      "Qu’il va manger la colombe ce soir",
      "Que la colombe appartient à quelqu’un d’autre",
      "Qu’il doit offrir la colombe à Vénus",
    ],
    answer: 0,
    because:
      "Il voit déjà l’oiseau cuit dans sa marmite, et le texte le confirme : « Le souper du croquant avec elle s’envole ».",
  },
  {
    question:
      "La fourmi ne peut pas se battre contre un homme armé. Comment sauve-t-elle la colombe ?",
    options: [
      "Elle ronge la corde de l’arbalète, comme le rat le filet",
      "Elle pique l’homme, qui se retourne, et la colombe l’entend",
      "Elle crie pour avertir la colombe du danger",
    ],
    answer: 1,
    because:
      "« La fourmi le pique au talon. / Le vilain retourne la tête : / La colombe l’entend, part, et tire de long. »",
  },
];

export const SETS: QuestionSets = { A1, A2, B1 };
