import type { QuizItem } from "../_exercice/Quiz";
import type { Morceau } from "../_exercice/Trous";

/**
 * Le compte rendu rendu, corrigé partout sauf à douze endroits : les douze
 * trous. Chaque trou propose quatre formes : la juste, celle que la copie
 * portait, et deux pièges. **Aucun piège n'est une seconde réponse juste**
 * (`AGENTS.md` §9) : « commença très bien », passé simple bien écrit, n'est
 * pas proposé, ni « opportunités », qui se dit, ni « difficultés ».
 *
 * Douze trous, quatre familles, celles du tableau de la page : le passé (3),
 * l'espagnol sous le français (4), l'accord (3), ce qui ne s'entend pas (2).
 * Le reste de la copie (accents, majuscules, « grace a », « de Antony ») est
 * déjà corrigé dans le texte.
 *
 * « a mis » et « le Barça » reviennent, corrigés, plus bas dans le texte : un
 * relecteur qui les y trouve a fait ce qu'on lui demande.
 *
 * Nommé comme ses voisins, jamais `SETS` ni `BANKS` : la page est sans niveau.
 */
export const TEXTE: Morceau[][] = [
  ["L’autre jour, le FC Barcelone a joué contre Getafe en championnat."],
  [
    "Barcelone ",
    { juste: "a gagné", copie: "gagna", pieges: ["a gagner", "à gagné"] },
    " 3-0, sans trop de problèmes.",
  ],
  [
    { juste: "L’équipe", copie: "L’equip", pieges: ["L’équip", "L’equipe"] },
    " bleu et grenat ",
    {
      juste: "a très bien commencé",
      copie: "comenca très bien",
      pieges: ["a très bien commencer", "a très bien comencé"],
    },
    " ",
    { juste: "et", copie: "y", pieges: ["est", "es"] },
    " a pris l’avantage dès la deuxième minute, grâce à un but d’Anthony Gordon. Et 28 minutes après, à la trentième minute, Gabriel Jesus ",
    { juste: "a mis", copie: "mis", pieges: ["a mit", "à mis"] },
    " le deuxième.",
  ],
  [
    "Dans ",
    {
      juste: "la seconde mi-temps",
      copie: "le seconde mit-temps",
      pieges: ["le second mi-temps", "la seconde mit-temps"],
    },
    ", ",
    { juste: "le Barça", copie: "barça", pieges: ["la Barça", "el Barça"] },
    " a continué à contrôler le jeu, en dominant la possession et en se créant ",
    {
      juste: "quelques occasions",
      copie: "quelques oportunité",
      pieges: ["quelque occasions", "quelques occasion"],
    },
    " de but. Getafe ne ",
    { juste: "pouvait", copie: "pouvais", pieges: ["pouvaient", "pouvez"] },
    " presque pas attaquer et a eu beaucoup de ",
    { juste: "difficulté", copie: "dificulter", pieges: ["difficulter", "dificulté"] },
    " à ",
    { juste: "freiner", copie: "frener", pieges: ["frainer", "freiné"] },
    " les attaques du Barça. Et puis finalement, à la soixante-troisième minute, Jules Koundé a mis le troisième, grâce à ",
    {
      juste: "une passe décisive",
      copie: "une assistance",
      pieges: ["une asistance", "un pase décisif"],
    },
    " de Lamine Yamal.",
  ],
];

/**
 * Le quiz : vingt matchs célèbres de la Ligue des champions, de 1999 à 2026,
 * dans l'ordre des années, deux clics chacun (`Quiz.tsx`). Le français est
 * dans le premier clic, le football dans le second. Aucune question de la
 * semaine passée ne revient.
 *
 * **Les fautes sont celles de la copie**, une par écriture : un passé inventé
 * (« marca »), un club sans article, un e muet oublié (« minut »), un mot à
 * l'espagnole (« estade », « Liga », « abril », « agosto », « cuatrième »),
 * « de » devant une voyelle, « mit-temps », a ou à, -é ou -er, un pluriel, un
 * genre. **Aucune écriture fausse n'est défendable** (`AGENTS.md` §9) : pas
 * de passé simple bien écrit.
 *
 * **Chaque fait est daté et vérifié** : un match joué ne change plus. Les
 * deux derniers sont de la saison 2025-2026 (demi-finale aller du 28 avril,
 * finale du 30 mai 2026).
 *
 * **Les réponses sont pour quelqu'un qui suit le football** : un buteur, un
 * score, une minute, une ville, avec pour pièges les autres buteurs du même
 * match ou les villes des autres finales.
 *
 * Pas de mélange : la bonne écriture et la bonne réponse changent de place
 * d'une question à l'autre, et la vérification en fait le compte.
 *
 *   node --experimental-strip-types --input-type=module -e "
 *   import { QUIZ } from './src/app/atelier/le-barca-contre-getafe/exercice.ts'
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
    question: "Dans quel stade Manchester United a-t-il gagné la finale de la Ligue des champions 1999 ?",
    fautes: [
      { juste: "stade", faux: "estade", pourquoi: "« estadio », c’est de l’espagnol. En français : un stade, sans e devant." },
      { juste: "gagné", faux: "gagner", pourquoi: "« il a vendu », pas « vendre » : donc gagné." },
      { juste: "Ligue", faux: "Liga", pourquoi: "« liga », c’est de l’espagnol. En français : la Ligue des champions." },
    ],
    place: 0,
    reponses: ["à Wembley", "au Camp Nou", "à San Siro", "au Stade de France"],
    bonne: "au Camp Nou",
    pourquoi: "Au Camp Nou : 2-1 contre le Bayern Munich, avec deux buts dans le temps additionnel.",
  },
  {
    question: "Contre quelle équipe Zinédine Zidane a-t-il marqué de volée en finale de la Ligue des champions 2002 ?",
    fautes: [
      { juste: "quelle équipe", faux: "quel équipe", pourquoi: "« équipe » est féminin : quelle équipe." },
      { juste: "a-t-il", faux: "à-t-il", pourquoi: "C’est le verbe avoir : « il avait marqué » marche, donc a." },
      { juste: "en finale", faux: "en final", pourquoi: "« la finale » s’écrit avec un e : en finale." },
    ],
    place: 2,
    reponses: ["le Bayern Munich", "Valence", "le Borussia Dortmund", "le Bayer Leverkusen"],
    bonne: "le Bayer Leverkusen",
    pourquoi: "Le Bayer Leverkusen : 2-1 pour le Real Madrid, à Glasgow.",
  },
  {
    question: "Sur quel score l’AC Milan menait-il à la mi-temps de la finale 2005 contre Liverpool ?",
    fautes: [
      { juste: "mi-temps", faux: "mit-temps", pourquoi: "« mi » veut dire « au milieu », comme dans « midi » : la mi-temps, sans t." },
      { juste: "menait-il", faux: "menais-il", pourquoi: "« il » va avec un t : il menait." },
      { juste: "quel score", faux: "quelle score", pourquoi: "« score » est masculin : quel score." },
    ],
    place: 1,
    reponses: ["3-0", "2-0", "3-1", "4-0"],
    bonne: "3-0",
    pourquoi: "3-0. Liverpool est revenu à 3-3 en six minutes, puis a gagné aux tirs au but, à Istanbul.",
  },
  {
    question: "Quel défenseur brésilien a donné la victoire au Barça en finale de la Ligue des champions 2006 ?",
    fautes: [
      { juste: "a donné", faux: "a donner", pourquoi: "« il a vendu », pas « vendre » : donc donné." },
      { juste: "brésilien", faux: "brasilien", pourquoi: "« Brasil », c’est de l’espagnol. En français : le Brésil, brésilien." },
      { juste: "au Barça", faux: "à le Barça", pourquoi: "« à » et « le » se collent : au Barça." },
    ],
    place: 3,
    reponses: ["Sylvinho", "Edmílson", "Juliano Belletti", "Dani Alves"],
    bonne: "Juliano Belletti",
    pourquoi: "Juliano Belletti, entré en jeu en seconde mi-temps : 2-1 contre Arsenal, près de Paris.",
  },
  {
    question: "Quel joueur de Chelsea a glissé au moment de tirer son tir au but en finale 2008 ?",
    fautes: [
      { juste: "a glissé", faux: "a glisser", pourquoi: "« il a vendu », pas « vendre » : donc glissé." },
      { juste: "son tir", faux: "sont tir", pourquoi: "« son tir », c’est le sien. « sont », c’est « ils sont »." },
      { juste: "Quel joueur", faux: "Quel jouer", pourquoi: "« jouer » est le verbe. La personne, c’est un joueur." },
    ],
    place: 0,
    reponses: ["Frank Lampard", "John Terry", "Michael Ballack", "Nicolas Anelka"],
    bonne: "John Terry",
    pourquoi: "John Terry, le capitaine. Manchester United a gagné à Moscou, sous la pluie.",
  },
  {
    question: "Qui a marqué pour le Barça à la 93e minute contre Chelsea en demi-finale 2009 ?",
    fautes: [
      { juste: "a marqué", faux: "marca", pourquoi: "« marca » n’existe pas en français. Tu dis : il a marqué." },
      { juste: "minute", faux: "minut", pourquoi: "Tu entends le t à la fin : il y a un e derrière. Une minute." },
      { juste: "pour le Barça", faux: "pour Barça", pourquoi: "Un club prend son article : le Barça." },
    ],
    place: 2,
    reponses: ["Lionel Messi", "Samuel Eto’o", "Xavi", "Andrés Iniesta"],
    bonne: "Andrés Iniesta",
    pourquoi: "Andrés Iniesta, à Londres : 1-1, et le Barça est allé en finale.",
  },
  {
    question: "Qui a marqué les deux buts de l’Inter Milan en finale de la Ligue des champions 2010 ?",
    fautes: [
      { juste: "deux buts", faux: "deux but", pourquoi: "Deux, c’est plusieurs : buts, avec un s." },
      { juste: "de l’Inter", faux: "de le Inter", pourquoi: "Devant une voyelle, « le » devient « l’ » : de l’Inter." },
      { juste: "a marqué", faux: "à marqué", pourquoi: "C’est le verbe avoir : « il avait marqué » marche, donc a." },
    ],
    place: 3,
    reponses: ["Diego Milito", "Samuel Eto’o", "Wesley Sneijder", "Goran Pandev"],
    bonne: "Diego Milito",
    pourquoi: "Diego Milito : 2-0 contre le Bayern Munich, à Madrid.",
  },
  {
    question: "Qui a marqué le dernier tir au but de Chelsea en finale de la Ligue des champions 2012 ?",
    fautes: [
      { juste: "dernier", faux: "dernière", pourquoi: "« tir » est masculin : le dernier tir." },
      { juste: "a marqué", faux: "a marquer", pourquoi: "« il a vendu », pas « vendre » : donc marqué." },
      { juste: "de Chelsea", faux: "du Chelsea", pourquoi: "« Chelsea » se dit sans article : de Chelsea." },
    ],
    place: 1,
    reponses: ["Frank Lampard", "Fernando Torres", "Didier Drogba", "Juan Mata"],
    bonne: "Didier Drogba",
    pourquoi: "Didier Drogba, qui avait déjà égalisé à la 88e minute. Chelsea a gagné à Munich, dans le stade du Bayern.",
  },
  {
    question: "Sur quel score total le Bayern Munich a-t-il éliminé le Barça en demi-finale 2013 ?",
    fautes: [
      { juste: "éliminé", faux: "éliminer", pourquoi: "« il a vendu », pas « vendre » : donc éliminé." },
      { juste: "le Barça", faux: "el Barça", pourquoi: "« el », c’est de l’espagnol. En français : le Barça." },
      { juste: "score total", faux: "score totale", pourquoi: "« score » est masculin : total, sans e." },
    ],
    place: 0,
    reponses: ["4-0", "5-1", "6-2", "7-0"],
    bonne: "7-0",
    pourquoi: "7-0 : 4-0 à Munich, puis 3-0 au Camp Nou.",
  },
  {
    question: "À quelle minute Sergio Ramos a-t-il égalisé pour le Real Madrid en finale 2014 ?",
    fautes: [
      { juste: "quelle minute", faux: "quel minute", pourquoi: "« minute » est féminin : quelle minute." },
      { juste: "égalisé", faux: "égaliser", pourquoi: "« il a vendu », pas « vendre » : donc égalisé." },
      { juste: "pour", faux: "por", pourquoi: "« por », c’est de l’espagnol. En français : pour." },
    ],
    place: 2,
    reponses: ["à la 88e minute", "à la 93e minute", "à la 90e minute", "à la 95e minute"],
    bonne: "à la 93e minute",
    pourquoi: "À la 93e minute, de la tête. Le Real a ensuite gagné 4-1 en prolongation contre l’Atlético de Madrid.",
  },
  {
    question: "Qui a marqué le sixième but du Barça contre le Paris Saint-Germain le 8 mars 2017 ?",
    fautes: [
      { juste: "contre", faux: "contra", pourquoi: "« contra », c’est de l’espagnol. En français : contre." },
      { juste: "du Barça", faux: "de le Barça", pourquoi: "« de » et « le » se collent : du Barça." },
      { juste: "sixième", faux: "sisième", pourquoi: "« six » s’écrit avec un x, et « sixième » aussi." },
    ],
    place: 3,
    reponses: ["Sergi Roberto", "Neymar", "Luis Suárez", "Lionel Messi"],
    bonne: "Sergi Roberto",
    pourquoi: "Sergi Roberto, à la 95e minute : 6-1, après une défaite 4-0 à l’aller.",
  },
  {
    question: "Qui a marqué d’un retourné en finale de la Ligue des champions 2018 ?",
    fautes: [
      { juste: "d’un", faux: "de un", pourquoi: "Devant une voyelle, « de » devient « d’ » : d’un retourné." },
      { juste: "champions", faux: "campions", pourquoi: "En français, « champion » commence par ch." },
      { juste: "a marqué", faux: "à marqué", pourquoi: "C’est le verbe avoir : « il avait marqué » marche, donc a." },
    ],
    place: 1,
    reponses: ["Cristiano Ronaldo", "Karim Benzema", "Gareth Bale", "Sadio Mané"],
    bonne: "Gareth Bale",
    pourquoi: "Gareth Bale, qui venait d’entrer en jeu : 3-1 pour le Real Madrid contre Liverpool, à Kiev.",
  },
  {
    question: "Qui a tiré le corner du quatrième but de Liverpool contre le Barça, le 7 mai 2019 ?",
    fautes: [
      { juste: "quatrième", faux: "cuatrième", pourquoi: "« cuatro », c’est de l’espagnol. En français : quatre, quatrième." },
      { juste: "a tiré", faux: "a tirer", pourquoi: "« il a vendu », pas « vendre » : donc tiré." },
      { juste: "contre le Barça", faux: "contre Barça", pourquoi: "Un club prend son article : le Barça." },
    ],
    place: 0,
    reponses: ["James Milner", "Xherdan Shaqiri", "Andrew Robertson", "Trent Alexander-Arnold"],
    bonne: "Trent Alexander-Arnold",
    pourquoi: "Trent Alexander-Arnold, très vite, pendant que le Barça ne regardait pas. Liverpool a gagné 4-0, après une défaite 3-0 à l’aller.",
  },
  {
    question: "Quel joueur de Tottenham a marqué trois buts à Amsterdam en demi-finale 2019 ?",
    fautes: [
      { juste: "trois buts", faux: "trois but", pourquoi: "Trois, c’est plusieurs : buts, avec un s." },
      { juste: "à Amsterdam", faux: "a Amsterdam", pourquoi: "« avait Amsterdam » ne marche pas ici : donc à, avec accent." },
      { juste: "Quel joueur", faux: "Quelle joueur", pourquoi: "« joueur » est masculin : quel joueur." },
    ],
    place: 2,
    reponses: ["Harry Kane", "Lucas Moura", "Son Heung-min", "Dele Alli"],
    bonne: "Lucas Moura",
    pourquoi: "Lucas Moura. Le troisième est arrivé à la 96e minute, contre l’Ajax.",
  },
  {
    question: "Sur quel score le Bayern Munich a-t-il battu le Barça en quart de finale, le 14 août 2020 ?",
    fautes: [
      { juste: "battu", faux: "batu", pourquoi: "« battre » prend deux t : battu." },
      { juste: "quart de finale", faux: "quart de final", pourquoi: "« la finale » s’écrit avec un e : un quart de finale." },
      { juste: "août", faux: "agosto", pourquoi: "« agosto », c’est de l’espagnol. En français : août." },
    ],
    place: 3,
    reponses: ["8-2", "7-1", "6-2", "5-0"],
    bonne: "8-2",
    pourquoi: "8-2, à Lisbonne, sur un seul match.",
  },
  {
    question: "Qui a marqué deux buts en deux minutes pour le Real Madrid contre Manchester City en demi-finale 2022 ?",
    fautes: [
      { juste: "deux minutes", faux: "deux minute", pourquoi: "Deux, c’est plusieurs : minutes, avec un s." },
      { juste: "le Real Madrid", faux: "Real Madrid", pourquoi: "Un club prend son article : le Real Madrid." },
      { juste: "demi-finale", faux: "demie-finale", pourquoi: "Devant un nom, « demi » ne change pas : une demi-finale." },
    ],
    place: 1,
    reponses: ["Karim Benzema", "Vinícius Júnior", "Rodrygo", "Marco Asensio"],
    bonne: "Rodrygo",
    pourquoi: "Rodrygo, à la 90e et à la 91e minute. Karim Benzema a marqué le but de la qualification en prolongation.",
  },
  {
    question: "Quel défenseur de l’Inter Milan a égalisé contre le Barça dans le temps additionnel en demi-finale 2025 ?",
    fautes: [
      { juste: "défenseur", faux: "défensor", pourquoi: "« defensor », c’est de l’espagnol. En français : un défenseur." },
      { juste: "a égalisé", faux: "a égaliser", pourquoi: "« il a vendu », pas « vendre » : donc égalisé." },
      { juste: "de l’Inter", faux: "del Inter", pourquoi: "« del », c’est de l’espagnol. En français : de l’Inter." },
    ],
    place: 2,
    reponses: ["Francesco Acerbi", "Denzel Dumfries", "Alessandro Bastoni", "Davide Frattesi"],
    bonne: "Francesco Acerbi",
    pourquoi: "Francesco Acerbi, à la 93e minute. Davide Frattesi a marqué en prolongation : 4-3, et 7-6 sur les deux matchs.",
  },
  {
    question: "Sur quel score le Paris Saint-Germain a-t-il gagné la finale 2025 contre l’Inter Milan ?",
    fautes: [
      { juste: "contre l’Inter", faux: "contre Inter", pourquoi: "Un club prend son article : l’Inter." },
      { juste: "la finale", faux: "le final", pourquoi: "En français, on dit « la finale », au féminin et avec un e." },
      { juste: "gagné", faux: "gagner", pourquoi: "« il a vendu », pas « vendre » : donc gagné." },
    ],
    place: 1,
    reponses: ["3-0", "4-1", "5-0", "4-0"],
    bonne: "5-0",
    pourquoi: "5-0, à Munich : le plus grand écart dans une finale. Désiré Doué a marqué deux buts.",
  },
  {
    question: "Sur quel score le Paris Saint-Germain a-t-il battu le Bayern Munich en demi-finale aller, le 28 avril 2026 ?",
    fautes: [
      { juste: "avril", faux: "abril", pourquoi: "« abril », c’est de l’espagnol. En français : avril." },
      { juste: "battu", faux: "battue", pourquoi: "Avec « avoir », pas d’accord avec le sujet : il a battu." },
      { juste: "demi-finale", faux: "demi-final", pourquoi: "« la finale » s’écrit avec un e : une demi-finale." },
    ],
    place: 0,
    reponses: ["3-2", "5-4", "4-3", "2-1"],
    bonne: "5-4",
    pourquoi: "5-4, à Paris. Au retour, à Munich, les deux équipes ont fait 1-1.",
  },
  {
    question: "Dans quelle ville le Paris Saint-Germain a-t-il gagné la finale 2026 contre Arsenal ?",
    fautes: [
      { juste: "quelle ville", faux: "quel ville", pourquoi: "« ville » est féminin : quelle ville." },
      { juste: "contre", faux: "contra", pourquoi: "« contra », c’est de l’espagnol. En français : contre." },
      { juste: "la finale", faux: "la final", pourquoi: "« la finale » s’écrit avec un e." },
    ],
    place: 3,
    reponses: ["Munich", "Londres", "Istanbul", "Budapest"],
    bonne: "Budapest",
    pourquoi: "À Budapest, aux tirs au but, après un match nul 1-1. Munich, Londres et Istanbul sont les villes des trois finales d’avant.",
  },
];
