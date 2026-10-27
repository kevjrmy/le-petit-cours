import type { QuizItem } from "../_exercice/Quiz";
import type { Morceau } from "../_exercice/Trous";

/**
 * Le compte rendu rendu, corrigé partout sauf à douze endroits : les douze
 * trous. Chaque trou propose quatre formes : la juste, celle que la copie
 * portait, et deux pièges. **Aucun piège n'est une seconde réponse juste**
 * (`AGENTS.md` §9) : pas de passé simple bien écrit en piège (« égalisa »),
 * ni « opportunités », qui se dit, ni d'accord du participe, que la page
 * n'enseigne pas. La copie, elle, est proposée telle qu'elle était, « mit » et
 * « joua » compris : c'est ce que l'élève doit reconnaître.
 *
 * Douze trous, quatre familles, celles du tableau de la page : le passé (3),
 * l'espagnol sous le français (3), l'accord (3), les petits mots et les signes
 * (3). Le reste de la copie (« grace a » répété, « a la 87ème », « Gerard
 * Martin », « le real », « ne les utilisa pas bien ») est déjà corrigé dans le
 * texte ; « n'a pas su les utiliser » évite un accord du participe que la page
 * n'enseigne pas.
 *
 * « a mis », « grâce à » et « à la 87e minute » reviennent, corrigés, plus bas :
 * un relecteur qui les y trouve a fait ce qu'on lui demande.
 *
 * Nommé comme ses voisins, jamais `SETS` ni `BANKS` : la page est sans niveau.
 */
export const TEXTE: Morceau[][] = [
  [
    "Barcelone a perdu hier contre ",
    {
      juste: "le Real Madrid",
      copie: "Real Madrid",
      pieges: ["el Real Madrid", "la Real Madrid"],
    },
    " lors du Clasico joué au Camp Nou. L’équipe blanche ",
    { juste: "a mis", copie: "mit", pieges: ["a mit", "a mi"] },
    " le premier but ",
    { juste: "grâce à", copie: "grace a", pieges: ["grâce a", "grace à"] },
    " une erreur de Gerard Martín et un coup de chance de Mbappé, ",
    {
      juste: "à la 41e minute",
      copie: "a la 41 minutes",
      pieges: ["à la 41 minutes", "a la 41e minute"],
    },
    ". ",
    {
      juste: "En seconde mi-temps",
      copie: "Au second mi-temps",
      pieges: ["En second mi-temps", "Au seconde mi-temps"],
    },
    ", Barcelone ",
    {
      juste: "a égalisé",
      copie: "marca le 1-1",
      pieges: ["a égaliser", "à égalisé"],
    },
    " grâce à ",
    { juste: "Raphinha", copie: "Raphiña", pieges: ["Raphina", "Raphigna"] },
    ", mais à la 87e minute, Mbappé a mis le deuxième pour Madrid, grâce à une belle course de Camavinga.",
  ],
  [
    "En conclusion, Barcelone ",
    { juste: "a joué", copie: "joua", pieges: ["a jouer", "à joué"] },
    " un beau match, avec ",
    {
      juste: "plein d’occasions",
      copie: "plein d’opportunité",
      pieges: ["plein d’occasion", "plein de occasions"],
    },
    ", mais n’a pas su les utiliser, alors que le Real ",
    {
      juste: "a profité",
      copie: "pris avantage",
      pieges: ["a pris avantage", "a profiter"],
    },
    " des erreurs ",
    {
      juste: "défensives",
      copie: "defensif",
      pieges: ["défensifs", "défensive"],
    },
    " de Barcelone, et a remporté ",
    {
      juste: "la victoire",
      copie: "la Victoire",
      pieges: ["le victoire", "la victoir"],
    },
    ".",
  ],
];

/**
 * Le quiz : vingt Clasicos, de 2006 au match de la copie, le 25 octobre 2026,
 * dans l'ordre des années, deux clics chacun (`Quiz.tsx`). Le français est
 * dans le premier clic, le football dans le second. Aucun match du quiz de la
 * semaine passée ne revient.
 *
 * **Les fautes sont celles de la copie**, une par écriture : un passé inventé
 * (« marca »), un club sans article, a ou à, on ou ont, -é ou -er, un mot à
 * l'espagnole (« noviembre », « gol », « Copa », « del », « contra »),
 * « mi-temps » au masculin, « 92 minutes » au pluriel, une majuscule de trop
 * (« Victoire ») ou de moins (« barça »), un nom qui perd son accent
 * (« Bernabeu »), et « assistance », la faute de la semaine passée. **Aucune
 * écriture fausse n'est défendable** (`AGENTS.md` §9) : pas de passé simple
 * bien écrit.
 *
 * **Chaque fait est daté et vérifié** : un match joué ne change plus. La
 * dernière question est le match de la copie : la réponse y est écrite.
 *
 * Pas de mélange : la bonne écriture et la bonne réponse changent de place
 * d'une question à l'autre, et la vérification en fait le compte :
 *
 *   node --experimental-strip-types --input-type=module -e "
 *   import { QUIZ } from './src/app/atelier/le-clasico/exercice.ts'
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
    question: "Qui a marqué le premier but du Real Madrid contre le Barça au Bernabéu, le 22 octobre 2006 ?",
    fautes: [
      { juste: "le premier but", faux: "la première but", pourquoi: "« but » est masculin : le premier but." },
      { juste: "octobre", faux: "octubre", pourquoi: "« octubre », c’est de l’espagnol. En français : octobre." },
      { juste: "du Real Madrid", faux: "del Real Madrid", pourquoi: "« del », c’est de l’espagnol. En français : du Real Madrid." },
    ],
    place: 0,
    reponses: ["Ruud van Nistelrooy", "Raúl", "Guti", "Roberto Carlos"],
    bonne: "Raúl",
    pourquoi: "Raúl, dès le début du match. Ruud van Nistelrooy a marqué le deuxième : 2-0.",
  },
  {
    question: "Qui a marqué les trois buts du Barça lors du 3-3 contre le Real Madrid, le 10 mars 2007 ?",
    fautes: [
      { juste: "trois buts", faux: "trois but", pourquoi: "Trois, c’est plusieurs : buts, avec un s." },
      { juste: "le Real Madrid", faux: "Real Madrid", pourquoi: "Un club prend son article : le Real Madrid." },
      { juste: "mars", faux: "marzo", pourquoi: "« marzo », c’est de l’espagnol. En français : mars." },
    ],
    place: 2,
    reponses: ["Ronaldinho", "Samuel Eto’o", "Deco", "Lionel Messi"],
    bonne: "Lionel Messi",
    pourquoi: "Lionel Messi, à dix-neuf ans. Le troisième est arrivé dans le temps additionnel.",
  },
  {
    question: "Qu’ont fait les joueurs du Barça pour accueillir le Real, champion d’Espagne, au Bernabéu le 7 mai 2008 ?",
    fautes: [
      { juste: "Qu’ont", faux: "Qu’on", pourquoi: "C’est le verbe avoir : « qu’avaient-ils fait » marche, donc ont. « on », c’est quelqu’un." },
      { juste: "le Real", faux: "el Real", pourquoi: "« el », c’est de l’espagnol. En français : le Real." },
      { juste: "Espagne", faux: "España", pourquoi: "« España », c’est de l’espagnol. En français : l’Espagne." },
    ],
    place: 1,
    reponses: ["une haie d’honneur", "une minute de silence", "un tour d’honneur", "une photo des deux équipes"],
    bonne: "une haie d’honneur",
    pourquoi: "Une haie d’honneur, à l’entrée sur le terrain. Le Real a ensuite gagné 4-1.",
  },
  {
    question: "Sur quel score le Barça a-t-il gagné au Bernabéu, le 2 mai 2009 ?",
    fautes: [
      { juste: "gagné", faux: "gagner", pourquoi: "« il a vendu », pas « vendre » : donc gagné." },
      { juste: "mai", faux: "mayo", pourquoi: "« mayo », c’est de l’espagnol. En français : mai." },
      { juste: "quel score", faux: "quelle score", pourquoi: "« score » est masculin : quel score." },
    ],
    place: 3,
    reponses: ["5-0", "4-1", "6-2", "3-0"],
    bonne: "6-2",
    pourquoi: "6-2 : Thierry Henry et Lionel Messi ont marqué deux buts chacun. Cette saison-là, le Barça a gagné la Liga, la Coupe du Roi et la Ligue des champions.",
  },
  {
    question: "Qui entraînait le Real Madrid lors de sa défaite 5-0 au Camp Nou, le 29 novembre 2010 ?",
    fautes: [
      { juste: "entraînait", faux: "entraînais", pourquoi: "« il » va avec un t : il entraînait." },
      { juste: "sa défaite", faux: "son défaite", pourquoi: "« défaite » est féminin : sa défaite." },
      { juste: "novembre", faux: "noviembre", pourquoi: "« noviembre », c’est de l’espagnol. En français : novembre." },
    ],
    place: 0,
    reponses: ["Manuel Pellegrini", "Carlo Ancelotti", "José Mourinho", "Fabio Capello"],
    bonne: "José Mourinho",
    pourquoi: "José Mourinho, pour son premier Clasico. En face, sur le banc du Barça : Pep Guardiola.",
  },
  {
    question: "Quel joueur du Real Madrid a fait tomber la Coupe du Roi du haut du bus, en avril 2011 ?",
    fautes: [
      { juste: "a fait", faux: "à fait", pourquoi: "C’est le verbe avoir : « il avait fait » marche, donc a." },
      { juste: "tomber", faux: "tombé", pourquoi: "Après « faire », l’infinitif : on dirait « faire vendre », pas « faire vendu ». Donc tomber." },
      { juste: "Coupe du Roi", faux: "Coupe del Roi", pourquoi: "« del », c’est de l’espagnol. En français : la Coupe du Roi." },
    ],
    place: 2,
    reponses: ["Sergio Ramos", "Iker Casillas", "Cristiano Ronaldo", "Marcelo"],
    bonne: "Sergio Ramos",
    pourquoi: "Sergio Ramos, pendant la fête dans les rues de Madrid. Le Real avait gagné la finale 1-0 contre le Barça, sur une tête de Cristiano Ronaldo.",
  },
  {
    question: "Qui a marqué les deux buts du Barça au Bernabéu, en demi-finale aller de la Ligue des champions 2011 ?",
    fautes: [
      { juste: "du Barça", faux: "de le Barça", pourquoi: "« de » et « le » se collent : du Barça." },
      { juste: "Ligue", faux: "Liga", pourquoi: "« liga », c’est de l’espagnol. En français : la Ligue des champions." },
      { juste: "deux buts", faux: "deux but", pourquoi: "Deux, c’est plusieurs : buts, avec un s." },
    ],
    place: 3,
    reponses: ["David Villa", "Pedro", "Xavi", "Lionel Messi"],
    bonne: "Lionel Messi",
    pourquoi: "Lionel Messi : 2-0, le 27 avril 2011. Le Barça a ensuite gagné la finale contre Manchester United, à Wembley.",
  },
  {
    question: "Qui a marqué le but de la victoire du Real Madrid au Camp Nou, le 21 avril 2012 ?",
    fautes: [
      { juste: "victoire", faux: "Victoire", pourquoi: "« victoire » est un nom commun : pas de majuscule." },
      { juste: "a marqué", faux: "marca", pourquoi: "« marca » n’existe pas en français. Tu dis : il a marqué." },
      { juste: "le but", faux: "le gol", pourquoi: "« gol », c’est de l’espagnol. En français : un but." },
    ],
    place: 1,
    reponses: ["Sami Khedira", "Cristiano Ronaldo", "Karim Benzema", "Mesut Özil"],
    bonne: "Cristiano Ronaldo",
    pourquoi: "Cristiano Ronaldo, à la 73e minute : 2-1. Le Real a gagné la Liga cette saison-là.",
  },
  {
    question: "Qui a marqué le but de la victoire du Real Madrid contre le Barça en finale de la Coupe du Roi, le 16 avril 2014 ?",
    fautes: [
      { juste: "contre", faux: "contra", pourquoi: "« contra », c’est de l’espagnol. En français : contre." },
      { juste: "avril", faux: "abril", pourquoi: "« abril », c’est de l’espagnol. En français : avril." },
      { juste: "le Barça", faux: "el Barça", pourquoi: "« el », c’est de l’espagnol. En français : le Barça." },
    ],
    place: 0,
    reponses: ["Ángel Di María", "Gareth Bale", "Karim Benzema", "Isco"],
    bonne: "Gareth Bale",
    pourquoi: "Gareth Bale, à la 85e minute, après une longue course le long de la ligne. Ángel Di María avait ouvert le score et Marc Bartra avait égalisé.",
  },
  {
    question: "Quel joueur du Barça a marqué deux buts lors de la victoire 4-0 au Bernabéu, le 21 novembre 2015 ?",
    fautes: [
      { juste: "deux buts", faux: "deux but", pourquoi: "Deux, c’est plusieurs : buts, avec un s." },
      { juste: "de la victoire", faux: "du victoire", pourquoi: "« victoire » est féminin : de la victoire." },
      { juste: "a marqué", faux: "à marqué", pourquoi: "C’est le verbe avoir : « il avait marqué » marche, donc a." },
    ],
    place: 2,
    reponses: ["Neymar", "Andrés Iniesta", "Lionel Messi", "Luis Suárez"],
    bonne: "Luis Suárez",
    pourquoi: "Luis Suárez. Neymar et Andrés Iniesta ont marqué les deux autres ; Lionel Messi, qui revenait de blessure, est entré en seconde mi-temps.",
  },
  {
    question: "Qu’a montré Lionel Messi au public du Bernabéu après son but de la 92e minute, le 23 avril 2017 ?",
    fautes: [
      { juste: "après", faux: "aprés", pourquoi: "Le è d’« après » s’ouvre comme dans « père » : accent grave." },
      { juste: "92e minute", faux: "92 minutes", pourquoi: "C’est la 92e, comme la première : une minute, au singulier." },
      { juste: "son but", faux: "sont but", pourquoi: "« son but », c’est le sien. « sont », c’est « ils sont »." },
    ],
    place: 1,
    reponses: ["son maillot", "le ballon", "ses chaussures", "son brassard"],
    bonne: "son maillot",
    pourquoi: "Son maillot, avec son nom et son numéro 10, après le but du 3-2. C’était son 500e but avec le Barça.",
  },
  {
    question: "Qui a marqué trois buts pour le Barça lors du 5-1 contre le Real Madrid, le 28 octobre 2018 ?",
    fautes: [
      { juste: "octobre", faux: "octubre", pourquoi: "« octubre », c’est de l’espagnol. En français : octobre." },
      { juste: "le Real Madrid", faux: "el Real Madrid", pourquoi: "« el », c’est de l’espagnol. En français : le Real Madrid." },
      { juste: "pour le Barça", faux: "pour Barça", pourquoi: "Un club prend son article : le Barça." },
    ],
    place: 3,
    reponses: ["Lionel Messi", "Philippe Coutinho", "Luis Suárez", "Arturo Vidal"],
    bonne: "Luis Suárez",
    pourquoi: "Luis Suárez. Lionel Messi, blessé au bras, était en tribune. Le lendemain, le Real a renvoyé son entraîneur, Julen Lopetegui.",
  },
  {
    question: "Quel joueur du Barça a marqué deux buts au Bernabéu, le 20 mars 2022 ?",
    fautes: [
      { juste: "a marqué", faux: "à marqué", pourquoi: "C’est le verbe avoir : « il avait marqué » marche, donc a." },
      { juste: "deux buts", faux: "deux but", pourquoi: "Deux, c’est plusieurs : buts, avec un s." },
      { juste: "du Barça", faux: "du barça", pourquoi: "« Barça » est le nom d’un club : une majuscule." },
    ],
    place: 0,
    reponses: ["Ferran Torres", "Ronald Araujo", "Pierre-Emerick Aubameyang", "Ousmane Dembélé"],
    bonne: "Pierre-Emerick Aubameyang",
    pourquoi: "Pierre-Emerick Aubameyang : 4-0 pour le Barça de Xavi. Ronald Araujo et Ferran Torres ont marqué les deux autres.",
  },
  {
    question: "Qui a marqué le but de la victoire du Barça à la 92e minute, le 19 mars 2023 ?",
    fautes: [
      { juste: "a marqué", faux: "à marqué", pourquoi: "C’est le verbe avoir : « il avait marqué » marche, donc a." },
      { juste: "du Barça", faux: "del Barça", pourquoi: "« del », c’est de l’espagnol. En français : du Barça." },
      { juste: "mars", faux: "marzo", pourquoi: "« marzo », c’est de l’espagnol. En français : mars." },
    ],
    place: 2,
    reponses: ["Franck Kessié", "Sergi Roberto", "Robert Lewandowski", "Ansu Fati"],
    bonne: "Franck Kessié",
    pourquoi: "Franck Kessié, entré en jeu en seconde mi-temps : 2-1 au Camp Nou. Sergi Roberto avait égalisé.",
  },
  {
    question: "Qui a marqué les deux premiers buts du Barça au Bernabéu, le 26 octobre 2024 ?",
    fautes: [
      { juste: "premiers", faux: "premier", pourquoi: "Deux, c’est plusieurs : premiers prend un s, comme buts." },
      { juste: "a marqué", faux: "marca", pourquoi: "« marca » n’existe pas en français. Tu dis : il a marqué." },
      { juste: "Bernabéu", faux: "Bernabeu", pourquoi: "Un nom garde son orthographe : Bernabéu garde son accent, comme Gerard Martín." },
    ],
    place: 3,
    reponses: ["Lamine Yamal", "Raphinha", "Pedri", "Robert Lewandowski"],
    bonne: "Robert Lewandowski",
    pourquoi: "Robert Lewandowski, en trois minutes. Lamine Yamal et Raphinha ont marqué ensuite : 4-0.",
  },
  {
    question: "Sur quel score le Barça a-t-il battu le Real Madrid en finale de la Supercoupe d’Espagne, le 12 janvier 2025 ?",
    fautes: [
      { juste: "Supercoupe", faux: "Supercopa", pourquoi: "« Supercopa », c’est de l’espagnol. En français : la Supercoupe." },
      { juste: "a-t-il", faux: "à-t-il", pourquoi: "C’est le verbe avoir : « il avait battu » marche, donc a." },
      { juste: "le Real Madrid", faux: "Real Madrid", pourquoi: "Un club prend son article : le Real Madrid." },
    ],
    place: 1,
    reponses: ["4-1", "5-2", "3-2", "4-0"],
    bonne: "5-2",
    pourquoi: "5-2, à Djeddah, en Arabie saoudite. Kylian Mbappé avait pourtant ouvert le score.",
  },
  {
    question: "Qui a marqué le but de la victoire du Barça en finale de la Coupe du Roi, le 26 avril 2025 ?",
    fautes: [
      { juste: "Coupe", faux: "Copa", pourquoi: "« Copa », c’est de l’espagnol. En français : la Coupe du Roi." },
      { juste: "du Barça", faux: "del Barça", pourquoi: "« del », c’est de l’espagnol. En français : du Barça." },
      { juste: "victoire", faux: "Victoire", pourquoi: "« victoire » est un nom commun : pas de majuscule." },
    ],
    place: 0,
    reponses: ["Ferran Torres", "Jules Koundé", "Pedri", "Raphinha"],
    bonne: "Jules Koundé",
    pourquoi: "Jules Koundé, en prolongation : 3-2, à Séville. Pedri et Ferran Torres avaient marqué les deux autres buts du Barça.",
  },
  {
    question: "Sur quel score le Barça menait-il à la mi-temps du Clasico du 11 mai 2025 ?",
    fautes: [
      { juste: "la mi-temps", faux: "le mi-temps", pourquoi: "« mi-temps » est féminin : la mi-temps." },
      { juste: "menait-il", faux: "menais-il", pourquoi: "« il » va avec un t : il menait." },
      { juste: "mai", faux: "mayo", pourquoi: "« mayo », c’est de l’espagnol. En français : mai." },
    ],
    place: 2,
    reponses: ["2-2", "3-2", "4-1", "4-2"],
    bonne: "4-2",
    pourquoi: "4-2, après avoir été mené 0-2. Kylian Mbappé a marqué trois buts, mais le Barça a gagné 4-3, puis la Liga.",
  },
  {
    question: "Qui a marqué le deuxième but du Real Madrid au Clasico du 26 octobre 2025, gagné 2-1 ?",
    fautes: [
      { juste: "deuxième", faux: "deuxièm", pourquoi: "Tu entends le m à la fin : il y a un e derrière. Deuxième." },
      { juste: "gagné", faux: "gagner", pourquoi: "« il a vendu », pas « vendre » : donc gagné." },
      { juste: "du Real Madrid", faux: "del Real Madrid", pourquoi: "« del », c’est de l’espagnol. En français : du Real Madrid." },
    ],
    place: 1,
    reponses: ["Jude Bellingham", "Kylian Mbappé", "Vinícius Júnior", "Arda Güler"],
    bonne: "Jude Bellingham",
    pourquoi: "Jude Bellingham, juste avant la mi-temps. Kylian Mbappé avait ouvert le score, et Fermín López avait égalisé.",
  },
  {
    question: "Quel joueur du Real Madrid a fait la passe décisive du but de Mbappé à la 87e minute, au Camp Nou, le 25 octobre 2026 ?",
    fautes: [
      { juste: "la passe décisive", faux: "l’assistance", pourquoi: "Au football, « une assistance » se dit une passe décisive." },
      { juste: "87e minute", faux: "87 minutes", pourquoi: "C’est la 87e, comme la première : une minute, au singulier." },
      { juste: "a fait", faux: "à fait", pourquoi: "C’est le verbe avoir : « il avait fait » marche, donc a." },
    ],
    place: 3,
    reponses: ["Vinícius Júnior", "Jude Bellingham", "Eduardo Camavinga", "Arda Güler"],
    bonne: "Eduardo Camavinga",
    pourquoi: "Eduardo Camavinga : c’était dans ta copie. Raphinha avait égalisé à la 61e minute, et ce but était le 100e de Kylian Mbappé avec le Real.",
  },
];
