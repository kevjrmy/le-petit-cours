import type { Question, QuestionSets } from "@/components/exercice/Comprehension";

/**
 * The questions for this work, one set per level. Each level has its own
 * text as well (`a2.tsx`, `b1.tsx`), so a set asks about its own body (#92).
 *
 * **Data, not a component, and in its own file** so the `nav-wiring` audit can
 * import it. Every import here is `import type`, which type stripping erases,
 * so plain `node` reads it.
 */

/**
 * A1: asked in Spanish, answered from the French (#85); only what happens —
 * the bed, the candle, the book, falling asleep and waking.
 */
const A1: Question[] = [
  {
    question: { fr: "Quand le narrateur se couchait-il ?", es: "¿Cuándo se acostaba el narrador?" },
    options: [
      { fr: "Très tard, la nuit", es: "Muy tarde, por la noche" },
      { fr: "Tôt", es: "Temprano" },
      { fr: "À midi", es: "A mediodía" },
    ],
    answer: 1,
    because: { fr: "« Longtemps, je me suis couché de bonne heure. » « De bonne heure » veut dire tôt.", es: "« Longtemps, je me suis couché de bonne heure. » « De bonne heure » quiere decir temprano." },
  },
  {
    question: { fr: "Quand ses yeux se ferment-ils ?", es: "¿Cuándo se le cierran los ojos?" },
    options: [
      { fr: "Dès que la bougie est éteinte", es: "Nada más apagar la vela" },
      { fr: "Une demi-heure après avoir éteint la bougie", es: "Media hora después de apagar la vela" },
      { fr: "Jamais : il laisse la bougie allumée et ne dort pas", es: "Nunca: deja la vela encendida y no duerme" },
    ],
    answer: 0,
    because: { fr: "« à peine ma bougie éteinte, mes yeux se fermaient » : « la bougie » donne la lumière, et ses yeux se ferment dès qu’il l’éteint.", es: "« à peine ma bougie éteinte, mes yeux se fermaient »: « la bougie » es la vela, y los ojos se le cierran en cuanto la apaga." },
  },
  {
    question: { fr: "Que faisait-il dans son lit avant de s’endormir ?", es: "¿Qué hacía en la cama antes de dormirse?" },
    options: [
      { fr: "Il visitait une église", es: "Visitaba una iglesia" },
      { fr: "Il lisait un livre", es: "Leía un libro" },
      { fr: "Il écoutait un quatuor", es: "Escuchaba un cuarteto" },
    ],
    answer: 1,
    because: { fr: "Il veut poser « le volume que je croyais avoir encore dans les mains » : il lisait. L’église et le quatuor sont « ce dont parlait l’ouvrage », ce que raconte le livre.", es: "Quiere dejar « le volume que je croyais avoir encore dans les mains »: leía. La iglesia y el cuarteto son « ce dont parlait l’ouvrage », lo que cuenta el libro." },
  },
  {
    question: { fr: "Comment s’endort-il ?", es: "¿Cómo se duerme?" },
    options: [
      { fr: "Lentement, peu à peu", es: "Despacio, poco a poco" },
      { fr: "En se disant « Je m’endors »", es: "Diciéndose « Je m’endors »" },
      { fr: "Très vite", es: "Muy deprisa" },
    ],
    answer: 2,
    because: { fr: "« mes yeux se fermaient si vite que je n’avais pas le temps de me dire : Je m’endors » : il s’endort si vite qu’il n’a pas le temps de se dire « Je m’endors ».", es: "« mes yeux se fermaient si vite que je n’avais pas le temps de me dire : Je m’endors »: se duerme tan deprisa que no tiene tiempo de decirse « Je m’endors », me duermo." },
  },
  {
    question: { fr: "Quand se réveille-t-il ?", es: "¿Cuándo se despierta?" },
    options: [
      { fr: "Le matin", es: "Por la mañana" },
      { fr: "Deux heures après", es: "Dos horas después" },
      { fr: "Une demi-heure après", es: "Media hora después" },
    ],
    answer: 2,
    because: "« Et, une demi-heure après, la pensée qu’il était temps de chercher le sommeil m’éveillait »",
  },
  {
    question: { fr: "En se réveillant, que veut-il faire ?", es: "Al despertarse, ¿qué quiere hacer?" },
    options: [
      { fr: "Poser le livre et éteindre la bougie", es: "Dejar el libro y apagar la vela" },
      { fr: "Allumer la bougie et continuer à lire", es: "Encender la vela y seguir leyendo" },
      { fr: "Prendre le livre pour commencer à lire", es: "Coger el libro para empezar a leer" },
    ],
    answer: 0,
    because: { fr: "« je voulais poser le volume […] et souffler ma lumière » : il veut poser le livre, pas le prendre, et éteindre la bougie, pas l’allumer.", es: "« je voulais poser le volume […] et souffler ma lumière »: quiere dejar el libro, no cogerlo, y apagar la vela, no encenderla." },
  },
  {
    question: { fr: "Endormi, que croit-il être ?", es: "Dormido, ¿qué cree ser?" },
    options: [
      { fr: "Seulement un enfant dans son lit", es: "Solo un niño en su cama" },
      { fr: "Ce que raconte le livre qu’il lisait", es: "Lo que cuenta el libro que leía" },
      { fr: "Celui qui a écrit le livre", es: "El que ha escrito el libro" },
    ],
    answer: 1,
    because: { fr: "« Il me semblait que j’étais moi-même ce dont parlait l’ouvrage : une église, un quatuor » : il croit être ce que raconte le livre, une église, un quatuor.", es: "« Il me semblait que j’étais moi-même ce dont parlait l’ouvrage : une église, un quatuor »: cree ser aquello de lo que habla el libro, una iglesia, un cuarteto." },
  },
];

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
 * The questions for this text (`docs/decisions.md` #59, #68).
 *
 * **Data, not a component, and in its own file** so the `nav-wiring` audit can
 * import it and check its keys against the manifest's `sets`. Every import
 * here is `import type`, which type stripping erases, so plain `node` reads it.
 *
 * B1: the whole passage, read for how it works — a verb that confesses an
 * error, a comparison used as a measuring instrument, a word with two senses,
 * a pillow given a face, a hope that turns out to be a mistake, and one
 * literary tense to put back into speech.
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
      "Se dire « je m’endors » demande d’être encore éveillé : le narrateur cherche un instant que personne ne peut voir passer.",
  },
  {
    question:
      "« Le volume que je croyais avoir encore dans les mains » : que dit ce « je croyais » ?",
    options: [
      "Qu’il n’a rien lu ce soir-là",
      "Qu’il a oublié ce qu’il lisait",
      "Qu’il se trompe : il pense lire encore, alors qu’il dort",
    ],
    answer: 2,
    because:
      "« Je n’avais pas cessé en dormant de faire des réflexions sur ce que je venais de lire » : il lisait, il s’en souvient, mais il dormait déjà.",
  },
  {
    question:
      "Au réveil, qu’est-ce qui l’empêche de voir que le bougeoir n’est pas allumé ?",
    options: [
      "La croyance qu’il est lui-même ce dont parlait le livre",
      "La lumière de la bougie, qui l’éblouit",
      "La lumière du jour qui entre dans la chambre",
    ],
    answer: 0,
    because:
      "« Cette croyance […] pesait comme des écailles sur mes yeux et les empêchait de se rendre compte que le bougeoir n’était pas allumé. »",
  },
  {
    question:
      "L’obscurité lui apparaît « comme une chose vraiment obscure ». Quels sont les deux sens du mot ici ?",
    options: [
      "Noire, et impossible à comprendre",
      "Noire, et dangereuse",
      "Claire, et facile à comprendre",
    ],
    answer: 0,
    because:
      "Juste avant, l’obscurité est « une chose sans cause, incompréhensible » : obscure veut dire à la fois sans lumière et sans explication.",
  },
  {
    question:
      "Le sifflement des trains est comparé au « chant d’un oiseau dans une forêt ». Que fait cette comparaison ?",
    options: [
      "Elle donne la distance, et l’espace autour de lui",
      "Elle dit que le narrateur se promène dans une forêt",
      "Elle dit que le narrateur aime écouter les oiseaux",
    ],
    answer: 0,
    because:
      "« Plus ou moins éloigné […] relevant les distances, me décrivait l’étendue de la campagne déserte » : l’oreille dessine le paysage, sans les yeux.",
  },
  {
    question:
      "« J’appuyais tendrement mes joues contre les belles joues de l’oreiller. » Que fait Proust avec cette image ?",
    options: [
      "Il donne à l’oreiller un visage, comme à une personne qu’on aime",
      "Il décrit un vieil oreiller abîmé",
      "Il parle d’une autre personne couchée près de lui",
    ],
    answer: 0,
    because:
      "Les joues sont celles de l’oreiller, « pleines et fraîches », et elles « sont comme les joues de notre enfance ».",
  },
  {
    question: "Pourquoi la joie du malade, à l’hôtel, ne dure-t-elle pas ?",
    options: [
      "La raie sous la porte n’était pas le jour : on vient d’éteindre le gaz",
      "Le domestique arrive, mais ne peut rien faire pour lui",
      "Le soleil se lève, mais personne ne vient",
    ],
    answer: 0,
    because:
      "« Et la raie de jour qui était sous sa porte a disparu. C’est minuit ; on vient d’éteindre le gaz. »",
  },
  {
    question: "Quelle peur d’enfant le sommeil lui fait-il retrouver ?",
    options: [
      "Que son grand-oncle lui tire les cheveux",
      "Que la bougie mette le feu à sa chambre",
      "Que les trains passent sous sa fenêtre",
    ],
    answer: 0,
    because:
      "Il retrouve « telle de mes terreurs enfantines comme celle que mon grand-oncle me tirât par mes boucles ».",
  },
  {
    question:
      "La coupe de ses boucles avait fait disparaître cette peur. Revient-elle encore ?",
    options: [
      "Non, plus jamais, ni le jour ni la nuit",
      "Oui, en rêve : il protège sa tête avec son oreiller avant de se rendormir",
      "Oui, chaque fois qu’il se coiffe le matin",
    ],
    answer: 1,
    because:
      "« Par mesure de précaution j’entourais complètement ma tête de mon oreiller avant de retourner dans le monde des rêves. »",
  },
  {
    question:
      "« Celle que mon grand-oncle me tirât par mes boucles » : comment le dirait-on à l’oral ?",
    options: [
      "La peur que mon grand-oncle me tire par les cheveux",
      "La peur que mon grand-oncle m’a tiré par les cheveux",
      "La peur que mon grand-oncle me tirera par les cheveux",
    ],
    answer: 0,
    because:
      "« Tirât » est un subjonctif imparfait, qui ne vit plus que dans les livres ; après « la peur que », l’oral met le subjonctif présent, « tire ».",
  },
];

export const SETS: QuestionSets = { A1, A2, B1 };
