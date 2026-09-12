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
 * B1: the fable read as a fable. Two morals that are not one, a rhetorical
 * question that prepares its own reversal, a verb whose old sense the Spanish
 * cognate hides, lines that shorten where the lesson tightens, and the title
 * the rat is given at the moment he earns it.
 */
const B1: Question[] = [
  {
    question:
      "La fable porte une leçon au début et une autre à la fin. Disent-elles la même chose ?",
    options: [
      "Oui, c’est la même phrase dite deux fois autrement",
      "Non : la première parle du service rendu, la seconde de la patience contre la force",
      "Non : la seconde contredit la première",
    ],
    answer: 1,
    because:
      "« On a souvent besoin d’un plus petit que soi » ouvre la fable ; « Patience et longueur de temps / Font plus que force ni que rage » la ferme. Une seule histoire, deux leçons tirées d’elle.",
  },
  {
    question:
      "« De cette vérité deux fables feront foi. » Que promet ce vers, et qu’en lisez-vous ici ?",
    options: [
      "Deux morales, que vous venez toutes deux de lire",
      "Deux personnages, le lion et le rat",
      "Deux histoires, et vous n’en lisez qu’une",
    ],
    answer: 2,
    because:
      "La Fontaine annonce deux récits pour prouver une seule vérité. Celui du rat est le premier ; l’autre n’est pas sur cette page.",
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
      "La question n’attend pas de réponse : elle pose l’invraisemblance juste avant de la démentir. Deux vers plus loin, le lion est pris dans les rets.",
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
      "C’est un sens ancien, encore vivant dans « je vous serais obligé ». Le sens de forcer, qui vient le premier à l’esprit, rendrait la morale incompréhensible.",
  },
  {
    question:
      "« Patience et longueur de temps / Font plus que force ni que rage. » Pourquoi ces deux vers sont-ils plus courts que le reste ?",
    options: [
      "Parce que la morale se resserre pour être retenue",
      "Parce que La Fontaine manquait de place à la fin",
      "Parce que ce sont les paroles du rat",
    ],
    answer: 0,
    because:
      "Le vers s’allonge quand l’action se déroule et se raccourcit quand elle se resserre. Ces deux-là sont la phrase que tout le monde en France connaît par cœur.",
  },
  {
    question:
      "La morale est au présent, l’histoire au passé simple. Pourquoi deux temps ?",
    options: [
      "Le présent se lit plus facilement que le passé simple",
      "La morale vaut pour toujours, l’histoire n’est arrivée qu’une fois",
      "La Fontaine change de temps pour varier les sons",
    ],
    answer: 1,
    because:
      "Une vérité générale se dit au présent ; un récit se raconte au passé. La fable met les deux bout à bout, et c’est la forme même du genre.",
  },
  {
    question:
      "Le rat, appelé « un rat » au début, devient « Sire rat » quand il accourt. Que fait ce changement ?",
    options: [
      "Il indique qu’un second rat entre dans l’histoire",
      "Il annonce que le rat va devenir roi de la forêt",
      "Il donne au rat le titre qu’on réservait au lion",
    ],
    answer: 2,
    because:
      "Le lion était « le roi des animaux ». C’est le rat qui reçoit le titre à l’instant où il sauve, et tout le renversement de la fable tient dans ce mot.",
  },
];

export const SETS: QuestionSets = { A2, B1 };
