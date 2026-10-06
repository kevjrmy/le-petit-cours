import type { QuizItem } from "../_exercice/Quiz";
import type { Morceau } from "../_exercice/Trous";

/**
 * Le compte rendu rendu, corrigé partout sauf à douze endroits : les douze
 * trous. Chaque trou propose quatre formes : la juste, celle que la copie
 * portait, et deux pièges. **Aucun piège n'est une seconde réponse juste**
 * (`AGENTS.md` §9) : « commença très bien », passé simple bien écrit, n'est
 * pas proposé, ni « quasi », ni « la zone ».
 *
 * Douze trous, quatre familles, celles du tableau de la page : le passé (4),
 * l'espagnol sous le français (3), l'accord (3), ce qui ne s'entend pas (2).
 * Le reste de la copie (accents, « grace a », « historic ») est déjà corrigé
 * dans le texte.
 *
 * « L'Espagne » et « la surface » reviennent, corrigés, plus bas dans le
 * texte : un relecteur qui les y trouve a fait ce qu'on lui demande.
 *
 * Nommé comme ses voisins, jamais `SETS` ni `BANKS` : la page est sans niveau.
 */
export const TEXTE: Morceau[][] = [
  [
    { juste: "L’Espagne", copie: "Espagne", pieges: ["La Espagne", "En Espagne"] },
    " a joué contre la République tchèque et ",
    { juste: "a gagné", copie: "gagna", pieges: ["a gagner", "à gagné"] },
    " 3-1. Le match ",
    {
      juste: "a très bien commencé",
      copie: "comenca très bien",
      pieges: ["a très bien commencer", "a très bien comencé"],
    },
    " pour l’Espagne, avec un but incroyable de Lamine Yamal depuis l’extérieur de ",
    { juste: "la surface", copie: "l’area", pieges: ["l’aréa", "la area"] },
    ". Et juste avant ",
    { juste: "la mi-temps", copie: "le mit temps", pieges: ["le mi-temps", "la mis-temps"] },
    ", Rodri ",
    { juste: "a marqué", copie: "marca", pieges: ["a marquer", "a marcé"] },
    " le deuxième, grâce à un ballon relâché par le gardien dans la surface.",
  ],
  [
    "En seconde période, l’Espagne ",
    { juste: "s’est calmée", copie: "se calma", pieges: ["s’est calmé", "c’est calmée"] },
    " et la République tchèque a mis le 2-1, et les Tchèques ont même mis un deuxième but, qui a ",
    { juste: "été annulé", copie: "èté annuler", pieges: ["été annuler", "été annulée"] },
    " à cause d’une faute antérieure.",
  ],
  [
    "Et dans les ",
    {
      juste: "dernières minutes",
      copie: "dernieres minute",
      pieges: ["dernières minute", "dernieres minutes"],
    },
    " de jeu, Mikel Merino a mis le 3-1.",
  ],
  [
    "En général, l’Espagne a été supérieure pendant ",
    { juste: "presque", copie: "casi", pieges: ["prèsque", "près que"] },
    " tout le match, avec ",
    {
      juste: "quelques moments difficiles",
      copie: "quelque moment difficil",
      pieges: ["quelques moments difficile", "quelque moments difficiles"],
    },
    " en seconde période.",
  ],
  [
    "Avec ce match, l’Espagne reste ",
    { juste: "première", copie: "premier", pieges: ["premiere", "premiers"] },
    " de son groupe et continue sa série de 41 matchs sans défaite, le record historique.",
  ],
];

/**
 * Le quiz : vingt questions de football, deux clics chacune (`Quiz.tsx`).
 * Le français est dans le premier clic, le football dans le second.
 *
 * **Les fautes sont celles de la copie**, une par écriture : un passé
 * inventé (« marca »), un pays sans article, un accord, a ou à, -é ou -er, un
 * mot à l'espagnole (« contra », « primer »). **Aucune écriture fausse n'est
 * défendable** (`AGENTS.md` §9) : pas de passé simple bien écrit, pas de
 * « d'Espagne » (on dit bien « l'équipe d'Espagne »), pas de « en quel pays ».
 *
 * **Chaque fait est daté** (« en 2010 », « à l'Euro 2024 ») : un record ou un
 * total change à la compétition suivante, un résultat daté ne change plus.
 * Quand deux questions portent sur le même match, l'explication de la
 * première ne donne pas la réponse de la seconde.
 *
 * **Les réponses sont pour quelqu'un qui suit le football** : une minute, une
 * ville, un numéro, une mesure du terrain, avec pour pièges les autres
 * buteurs du même match ou les autres villes du même tournoi. « Combien de
 * joueurs dans une équipe » ne départage personne.
 *
 * Pas de mélange : la bonne écriture et la bonne réponse changent de place
 * d'une question à l'autre, et la vérification en fait le compte.
 *
 *   node --experimental-strip-types --input-type=module -e "
 *   import { QUIZ } from './src/app/atelier/un-compte-rendu-de-match/exercice.ts'
 *   const ecrit = [0, 0, 0, 0], rep = [0, 0, 0, 0]; let pb = 0
 *   const non = (m) => { pb++; console.log('  !!', m) }
 *   QUIZ.forEach((it, i) => { console.log(i + 1, it.question, '->', it.bonne)
 *     const vues = new Set([it.question])
 *     for (const f of it.fautes) { const n = it.question.split(f.juste).length - 1; const v = it.question.replace(f.juste, f.faux); console.log('     x', v); if (n !== 1) non('morceau present ' + n + ' fois : ' + f.juste); if (vues.has(v)) non('ecriture en double'); vues.add(v) }
 *     const at = it.reponses.indexOf(it.bonne); if (at < 0) non('bonne absente'); else rep[at]++
 *     if (new Set(it.reponses).size !== 4) non('reponses en double'); ecrit[it.place]++ })
 *   console.log(QUIZ.length, 'questions,', QUIZ.length * 3, 'ecritures fausses,', pb, 'probleme(s)')
 *   console.log('bonne ecriture par place :', ecrit.join(' '), '| bonne reponse par place :', rep.join(' '))"
 */
export const QUIZ: QuizItem[] = [
  {
    question: "À quelle distance minimale du ballon le mur doit-il se placer sur un coup franc ?",
    fautes: [
      { juste: "se placer", faux: "ce placer", pourquoi: "Devant un verbe, c’est « se » : se placer." },
      { juste: "placer", faux: "placé", pourquoi: "« il doit vendre », pas « vendu » : donc placer." },
      { juste: "quelle distance", faux: "quel distance", pourquoi: "« distance » est féminin : quelle distance." },
    ],
    place: 1,
    reponses: ["7 mètres", "9,15 mètres", "10 mètres", "11 mètres"],
    bonne: "9,15 mètres",
    pourquoi: "À 9,15 mètres au moins : dix yards, la mesure anglaise d’origine.",
  },
  {
    question: "Contre quelle équipe l’Espagne a-t-elle perdu son premier match de la Coupe du monde 2010 ?",
    fautes: [
      { juste: "perdu", faux: "perdue", pourquoi: "Avec « avoir », pas d’accord avec le sujet : elle a perdu." },
      { juste: "son premier", faux: "sont premier", pourquoi: "« son match », c’est le sien. « sont », c’est « ils sont »." },
      { juste: "l’Espagne", faux: "Espagne", pourquoi: "Un pays prend son article : l’Espagne." },
    ],
    place: 3,
    reponses: ["le Chili", "le Honduras", "la Suisse", "le Paraguay"],
    bonne: "la Suisse",
    pourquoi: "La Suisse, 1-0. L’Espagne a gagné tous ses matchs suivants.",
  },
  {
    question: "Qui a marqué de la tête contre l’Allemagne en demi-finale de la Coupe du monde 2010 ?",
    fautes: [
      { juste: "a marqué", faux: "marca", pourquoi: "« marca » n’existe pas en français. Tu dis : il a marqué." },
      { juste: "contre", faux: "contra", pourquoi: "« contra », c’est de l’espagnol. En français : contre." },
      { juste: "l’Allemagne", faux: "Allemagne", pourquoi: "Un pays prend son article : l’Allemagne." },
    ],
    place: 0,
    reponses: ["Carles Puyol", "Gerard Piqué", "Sergio Ramos", "Xabi Alonso"],
    bonne: "Carles Puyol",
    pourquoi: "Carles Puyol, sur un corner de Xavi.",
  },
  {
    question: "À quelle minute Andrés Iniesta a-t-il marqué en finale de la Coupe du monde 2010 ?",
    fautes: [
      { juste: "quelle minute", faux: "quel minute", pourquoi: "« minute » est féminin : quelle minute." },
      { juste: "marqué", faux: "marquer", pourquoi: "« il a vendu », pas « vendre » : donc marqué." },
      { juste: "a-t-il", faux: "à-t-il", pourquoi: "C’est le verbe avoir : « il avait marqué » marche, donc a." },
    ],
    place: 2,
    reponses: ["à la 89e minute", "à la 105e minute", "à la 110e minute", "à la 116e minute"],
    bonne: "à la 116e minute",
    pourquoi: "À la 116e minute, pendant la prolongation.",
  },
  {
    question: "Dans quelle ville la finale de la Coupe du monde 2010 a-t-elle été jouée ?",
    fautes: [
      { juste: "été jouée", faux: "été joué", pourquoi: "« la finale » est féminin : elle a été jouée." },
      { juste: "été jouée", faux: "été jouer", pourquoi: "« elle a été vendue », pas « vendre » : donc jouée." },
      { juste: "quelle ville", faux: "quel ville", pourquoi: "« ville » est féminin : quelle ville." },
    ],
    place: 3,
    reponses: ["Le Cap", "Johannesburg", "Durban", "Pretoria"],
    bonne: "Johannesburg",
    pourquoi: "À Johannesburg, au stade Soccer City.",
  },
  {
    question: "Quelle est la largeur d’un but de football ?",
    fautes: [
      { juste: "Quelle est", faux: "Quel est", pourquoi: "« la largeur » est féminin : quelle." },
      { juste: "Quelle est", faux: "Qu’elle est", pourquoi: "« qu’elle », c’est « que » et « elle ». Pour poser la question : quelle." },
      { juste: "largeur", faux: "largueur", pourquoi: "« largeur » vient de « large » : pas de u." },
    ],
    place: 1,
    reponses: ["6,50 mètres", "7 mètres", "7,32 mètres", "8,50 mètres"],
    bonne: "7,32 mètres",
    pourquoi: "7,32 mètres de large, et 2,44 mètres de haut.",
  },
  {
    question: "Qui était le sélectionneur de l’Espagne à l’Euro 2008 ?",
    fautes: [
      { juste: "sélectionneur", faux: "séleccionneur", pourquoi: "« sélection » s’écrit avec ct, comme « introduction »." },
      { juste: "était", faux: "étais", pourquoi: "« qui » se conjugue comme « il » : il était, avec un t." },
      { juste: "à l’Euro", faux: "a l’Euro", pourquoi: "« avait l’Euro » ne marche pas ici : donc à, avec accent." },
    ],
    place: 2,
    reponses: ["Luis Aragonés", "Vicente del Bosque", "Luis Enrique", "José Antonio Camacho"],
    bonne: "Luis Aragonés",
    pourquoi: "Luis Aragonés. Vicente del Bosque lui a succédé juste après.",
  },
  {
    question: "Dans quelle ville l’Espagne a-t-elle gagné la finale de l’Euro 2008 ?",
    fautes: [
      { juste: "gagné", faux: "gagner", pourquoi: "« elle a vendu », pas « vendre » : donc gagné." },
      { juste: "l’Espagne", faux: "la Espagne", pourquoi: "Devant une voyelle, « la » devient « l’ » : l’Espagne." },
      { juste: "de l’Euro", faux: "du Euro", pourquoi: "Devant une voyelle, on garde « de l’ » : de l’Euro." },
    ],
    place: 0,
    reponses: ["Zurich", "Bâle", "Salzbourg", "Vienne"],
    bonne: "Vienne",
    pourquoi: "À Vienne, 1-0 contre l’Allemagne.",
  },
  {
    question: "Qui a ouvert le score en finale de l’Euro 2012 ?",
    fautes: [
      { juste: "a ouvert", faux: "a ouvri", pourquoi: "« ouvrir » donne « ouvert » : il a ouvert." },
      { juste: "a ouvert", faux: "à ouvert", pourquoi: "C’est le verbe avoir : « il avait ouvert » marche, donc a." },
      { juste: "en finale", faux: "en final", pourquoi: "« la finale » s’écrit avec un e : en finale." },
    ],
    place: 3,
    reponses: ["Jordi Alba", "David Silva", "Fernando Torres", "Juan Mata"],
    bonne: "David Silva",
    pourquoi: "David Silva, de la tête. Jordi Alba, Fernando Torres et Juan Mata ont marqué ensuite : 4-0 contre l’Italie.",
  },
  {
    question: "Avec combien de joueurs au minimum une équipe peut-elle continuer un match ?",
    fautes: [
      { juste: "joueurs", faux: "joueur", pourquoi: "Après « combien de », il y en a plusieurs : joueurs, avec un s." },
      { juste: "continuer", faux: "continué", pourquoi: "« elle peut vendre », pas « vendu » : donc continuer." },
      { juste: "une équipe", faux: "un équipe", pourquoi: "« équipe » est féminin : une équipe." },
    ],
    place: 0,
    reponses: ["six", "sept", "huit", "neuf"],
    bonne: "sept",
    pourquoi: "Sept. Avec six joueurs ou moins, le match s’arrête.",
  },
  {
    question: "Sur quel score l’Espagne a-t-elle perdu contre les Pays-Bas à la Coupe du monde 2014 ?",
    fautes: [
      { juste: "a-t-elle", faux: "a-t-il", pourquoi: "« l’Espagne » est féminin : a-t-elle." },
      { juste: "les Pays-Bas", faux: "le Pays-Bas", pourquoi: "« les Pays-Bas » est un pluriel." },
      { juste: "à la Coupe", faux: "a la Coupe", pourquoi: "« avait la Coupe » ne marche pas ici : donc à, avec accent." },
    ],
    place: 2,
    reponses: ["5-1", "2-1", "3-0", "4-2"],
    bonne: "5-1",
    pourquoi: "5-1. L’Espagne, championne du monde en titre, a été éliminée au premier tour.",
  },
  {
    question: "Quelle équipe a éliminé l’Espagne aux tirs au but à la Coupe du monde 2022 ?",
    fautes: [
      { juste: "a éliminé", faux: "a éliminer", pourquoi: "« il a vendu », pas « vendre » : donc éliminé." },
      { juste: "aux tirs", faux: "au tirs", pourquoi: "Plusieurs tirs, donc « aux » : aux tirs au but." },
      { juste: "Quelle équipe", faux: "Quel équipe", pourquoi: "« équipe » est féminin : quelle équipe." },
    ],
    place: 1,
    reponses: ["le Japon", "la Croatie", "le Portugal", "le Maroc"],
    bonne: "le Maroc",
    pourquoi: "Le Maroc, en huitième de finale, après un match nul 0-0.",
  },
  {
    question: "À quelle distance de la ligne de but la surface de réparation s’arrête-t-elle ?",
    fautes: [
      { juste: "s’arrête-t-elle", faux: "s’arrête-t-il", pourquoi: "« la surface » est féminin : s’arrête-t-elle." },
      { juste: "réparation", faux: "réparacion", pourquoi: "En français, la fin s’écrit -tion : réparation." },
      { juste: "quelle distance", faux: "quel distance", pourquoi: "« distance » est féminin : quelle distance." },
    ],
    place: 3,
    reponses: ["à 11 mètres", "à 16,50 mètres", "à 18 mètres", "à 20 mètres"],
    bonne: "à 16,50 mètres",
    pourquoi: "À 16,50 mètres. Le point de penalty, lui, est à 11 mètres.",
  },
  {
    question: "Qui a marqué le but de la victoire contre l’Allemagne en quart de finale de l’Euro 2024 ?",
    fautes: [
      { juste: "a marqué", faux: "a marquer", pourquoi: "« il a vendu », pas « vendre » : donc marqué." },
      { juste: "quart de finale", faux: "quart de final", pourquoi: "« la finale » s’écrit avec un e : un quart de finale." },
      { juste: "victoire", faux: "victoir", pourquoi: "« la victoire » finit par un e." },
    ],
    place: 0,
    reponses: ["Dani Olmo", "Álvaro Morata", "Mikel Merino", "Ferran Torres"],
    bonne: "Mikel Merino",
    pourquoi: "Mikel Merino, de la tête, à la 119e minute. Dani Olmo avait ouvert le score.",
  },
  {
    question: "Dans quelle ville l’Espagne a-t-elle battu la France en demi-finale de l’Euro 2024 ?",
    fautes: [
      { juste: "battu", faux: "batu", pourquoi: "« battre » prend deux t : battu." },
      { juste: "battu", faux: "battue", pourquoi: "Avec « avoir », pas d’accord avec le sujet : elle a battu." },
      { juste: "demi-finale", faux: "demie-finale", pourquoi: "Devant un nom, « demi » ne change pas : une demi-finale." },
    ],
    place: 2,
    reponses: ["Munich", "Dortmund", "Stuttgart", "Berlin"],
    bonne: "Munich",
    pourquoi: "À Munich, 2-1. L’autre demi-finale se jouait à Dortmund.",
  },
  {
    question: "Qui a égalisé pour l’Angleterre en finale de l’Euro 2024 ?",
    fautes: [
      { juste: "a égalisé", faux: "a égaliser", pourquoi: "« il a vendu », pas « vendre » : donc égalisé." },
      { juste: "pour", faux: "por", pourquoi: "« por », c’est de l’espagnol. En français : pour." },
      { juste: "l’Angleterre", faux: "Angleterre", pourquoi: "Un pays prend son article : l’Angleterre." },
    ],
    place: 1,
    reponses: ["Harry Kane", "Jude Bellingham", "Bukayo Saka", "Cole Palmer"],
    bonne: "Cole Palmer",
    pourquoi: "Cole Palmer, entré en jeu quelques minutes plus tôt.",
  },
  {
    question: "Qui a été élu meilleur joueur de l’Euro 2024 ?",
    fautes: [
      { juste: "a été", faux: "à été", pourquoi: "C’est le verbe avoir : « il avait été élu » marche, donc a." },
      { juste: "meilleur joueur", faux: "meilleure joueur", pourquoi: "« joueur » est masculin : meilleur, sans e." },
      { juste: "joueur", faux: "jouer", pourquoi: "« jouer » est le verbe. La personne, c’est un joueur." },
    ],
    place: 3,
    reponses: ["Lamine Yamal", "Dani Olmo", "Rodri", "Nico Williams"],
    bonne: "Rodri",
    pourquoi: "Rodri. Lamine Yamal, lui, a été élu meilleur jeune joueur.",
  },
  {
    question: "Quel numéro Lamine Yamal portait-il à l’Euro 2024 ?",
    fautes: [
      { juste: "portait-il", faux: "portais-il", pourquoi: "« il » va avec un t : il portait." },
      { juste: "Quel numéro", faux: "Quelle numéro", pourquoi: "« numéro » est masculin : quel numéro." },
      { juste: "numéro", faux: "numero", pourquoi: "« numéro » prend un accent sur le e." },
    ],
    place: 2,
    reponses: ["le 19", "le 10", "le 17", "le 27"],
    bonne: "le 19",
    pourquoi: "Le 19. Le 17 était celui de Nico Williams.",
  },
  {
    question: "Avant Rodri en 2024, quel Espagnol avait gagné le Ballon d’Or, en 1960 ?",
    fautes: [
      { juste: "gagné", faux: "gagner", pourquoi: "« il avait vendu », pas « vendre » : donc gagné." },
      { juste: "Espagnol", faux: "espagnol", pourquoi: "La personne prend une majuscule : un Espagnol. L’adjectif n’en prend pas : un joueur espagnol." },
      { juste: "avait", faux: "avais", pourquoi: "« il » va avec un t : il avait." },
    ],
    place: 1,
    reponses: ["Raúl", "Xavi", "Andrés Iniesta", "Luis Suárez"],
    bonne: "Luis Suárez",
    pourquoi: "Luis Suárez. Rodri a été le premier Espagnol à le gagner depuis lui.",
  },
  {
    question: "Qui a marqué le but de l’Allemagne en finale de la Coupe du monde 2014 ?",
    fautes: [
      { juste: "a marqué", faux: "à marqué", pourquoi: "C’est le verbe avoir : « il avait marqué » marche, donc a." },
      { juste: "de l’Allemagne", faux: "de la Allemagne", pourquoi: "Devant une voyelle, « la » devient « l’ » : de l’Allemagne." },
      { juste: "Coupe", faux: "Copa", pourquoi: "« copa », c’est de l’espagnol. En français : la Coupe." },
    ],
    place: 0,
    reponses: ["Thomas Müller", "Miroslav Klose", "Mario Götze", "André Schürrle"],
    bonne: "Mario Götze",
    pourquoi: "Mario Götze, à la 113e minute, contre l’Argentine.",
  },
];
