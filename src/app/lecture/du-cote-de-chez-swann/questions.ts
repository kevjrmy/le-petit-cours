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
 * A2: seven questions, all on what actually happens — a candle, a book, half
 * an hour, a train. The opening sentence is A2 and the paragraph around it is
 * not (#59), so the questions stay where the page is readable.
 */
const A2: Question[] = [
  {
    question: "À quelle heure le narrateur se couchait-il ?",
    options: ["Tard dans la nuit", "De bonne heure, c’est-à-dire tôt", "À midi"],
    answer: 1,
    because:
      "« Longtemps, je me suis couché de bonne heure. » De bonne heure veut dire tôt.",
  },
  {
    question: "Que fait-il dans son lit avant de s’endormir ?",
    options: ["Il lit", "Il écrit", "Il écoute la radio"],
    answer: 0,
    because:
      "Il veut « poser le volume » qu’il croit avoir encore dans les mains : il s’est endormi en lisant.",
  },
  {
    question: "Qu’est-ce qu’il éteint ?",
    options: ["La lampe électrique", "Sa bougie", "Le feu"],
    answer: 1,
    because: "« À peine ma bougie éteinte… » On est en 1913, et on s’éclaire à la bougie.",
  },
  {
    question: "Combien de temps après s’endormir se réveille-t-il ?",
    options: ["Une demi-heure après", "Deux heures après", "Au matin"],
    answer: 0,
    because: "« Et, une demi-heure après, la pensée qu’il était temps de chercher le sommeil m’éveillait. »",
  },
  {
    question: "En dormant, que croit-il être ?",
    options: [
      "Un enfant perdu",
      "Un voyageur dans un train",
      "Ce dont parle le livre qu’il lisait",
    ],
    answer: 2,
    because:
      "« Il me semblait que j’étais moi-même ce dont parlait l’ouvrage : une église, un quatuor, la rivalité de François Ier et de Charles-Quint. »",
  },
  {
    question: "Qu’entend-il, la nuit, quand il se demande l’heure ?",
    options: ["Le sifflement des trains", "La pluie", "Une horloge"],
    answer: 0,
    because:
      "Le sifflement des trains lui dit la distance, et lui fait imaginer la campagne et le voyageur.",
  },
  {
    question:
      "« Je me suis couché » est au passé composé, et la suite à l’imparfait. Pourquoi ?",
    options: [
      "Parce que la première phrase regarde toute une période, aujourd’hui finie",
      "Parce que la première phrase raconte une seule nuit",
      "Parce que le passé composé et l’imparfait sont la même chose",
    ],
    answer: 0,
    because:
      "Le passé composé pose la période en bloc : pendant longtemps, et c’est fini. Les imparfaits qui suivent racontent ce qui s’y passait chaque soir.",
  },
];

/**
 * B1: the same lines, read for how they work — a verb that confesses an error,
 * a comparison used as a measuring instrument, an elliptical construction, and
 * the two tenses that cut the memory into a period and its evenings.
 */
const B1: Question[] = [
  {
    question:
      "« Mes yeux se fermaient si vite que je n’avais pas le temps de me dire : « Je m’endors. » » Qu’y a-t-il d’impossible dans cette phrase ?",
    options: [
      "On ne peut pas fermer les yeux aussi vite",
      "On ne peut pas lire et dormir en même temps",
      "On ne peut pas assister au moment où l’on s’endort",
    ],
    answer: 2,
    because:
      "Se dire « je m’endors » demande d’être encore éveillé. Le narrateur cherche un instant que personne ne peut voir passer, et c’est de là que part tout le livre.",
  },
  {
    question:
      "« Le volume que je croyais avoir encore dans les mains » : que dit ce « je croyais » ?",
    options: [
      "Qu’il tient bien son livre",
      "Qu’il ne se rappelle plus le titre du livre",
      "Qu’il se trompait : le livre n’était plus là",
    ],
    answer: 2,
    because:
      "« Croire » marque ici l’écart entre ce qu’il pense et ce qui est. Toute la page raconte des choses dont le dormeur se trompe.",
  },
  {
    question:
      "Le sifflement des trains est comparé au « chant d’un oiseau dans une forêt ». Que fait cette comparaison ?",
    options: [
      "Elle donne la distance, et l’espace autour de lui",
      "Elle dit que le train est une sorte d’animal",
      "Elle dit que le narrateur aime écouter les oiseaux",
    ],
    answer: 0,
    because:
      "« Plus ou moins éloigné […] relevant les distances, me décrivait l’étendue de la campagne déserte. » Le bruit sert à mesurer : c’est l’oreille qui dessine le paysage, la nuit, sans les yeux.",
  },
  {
    question:
      "« À peine ma bougie éteinte, mes yeux se fermaient. » Que veut dire « à peine » ici ?",
    options: ["Difficilement, avec effort", "Tout de suite après", "Presque jamais"],
    answer: 1,
    because:
      "« À peine » suivi d’un participe marque le temps, pas la difficulté : la bougie éteinte, le sommeil vient aussitôt. Même construction que « à peine arrivé, il repart ».",
  },
  {
    question: "Pourquoi le narrateur ne sait-il pas quelle heure il est ?",
    options: [
      "Parce que la pendule de la maison est arrêtée",
      "Parce qu’il s’est endormi sans s’en apercevoir et se réveille dans le noir",
      "Parce qu’il n’a jamais eu de montre",
    ],
    answer: 1,
    because:
      "Il n’a « pas le temps de se dire : je m’endors », et se réveille une demi-heure après. C’est le bruit des trains, et non une horloge, qui lui rend le monde.",
  },
  {
    question:
      "« Une demi-heure après, la pensée qu’il était temps de chercher le sommeil m’éveillait. » Qu’y a-t-il d’étrange ici ?",
    options: [
      "Il se réveille en pensant qu’il doit encore s’endormir, alors qu’il dormait déjà",
      "Il ne parvient pas à dormir de toute la nuit",
      "Un bruit venu du dehors l’a tiré de son lit",
    ],
    answer: 0,
    because:
      "Il dormait sans le savoir. La pensée qui le tire du sommeil est celle d’un homme convaincu de n’y être pas encore entré, et c’est elle qui le réveille.",
  },
  {
    question:
      "C’est le début d’un livre de trois mille pages. Sur quoi ce livre commence-t-il, au juste ?",
    options: [
      "Sur un voyage en train à travers la campagne",
      "Sur la rivalité de François Ier et de Charles-Quint",
      "Sur un homme qui se réveille sans savoir où il est",
    ],
    answer: 2,
    because:
      "Rien n’arrive dans ces lignes : un homme lit, s’endort, se réveille et écoute. L’église et le quatuor sont ce dont parlait son livre à lui, pas ce dont parle celui-ci.",
  },
];

export const SETS: QuestionSets = { A2, B1 };
