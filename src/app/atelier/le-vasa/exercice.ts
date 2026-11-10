import type { ChoixItem } from "../_exercice/Choix";
import type { QuizItem } from "../_exercice/Quiz";
import type { Morceau } from "../_exercice/Trous";

/*
 * Les plateaux de la page, dans l'ordre où elle les joue : le quiz sur
 * l'article, le résumé à trous, puis le plateau du truc nouveau.
 *
 * **Rien n'est copié de l'article** (`AGENTS.md` §9b) : les questions et le
 * résumé sont écrits pour la page, avec les faits de l'article (Ouest-France,
 * 23 août 2020, texte complet dans `.private/2026-11-11/`).
 *
 * **Quatre affirmations de l'article restent dehors**, parce que le musée
 * Vasa les contredit ou que rien ne les confirme : « un mille marin soit 1852
 * mètres » (le musée dit environ 1 300 m), « il est 18 h », « des centaines de
 * millions de téléspectateurs », le capitaine Hans Jonsson.
 *
 * Vérification (formes, phrases complétées, places, côtés) :
 *
 *   node --experimental-strip-types --input-type=module -e "
 *   import * as X from './src/app/atelier/le-vasa/exercice.ts'
 *   X.QUIZ.forEach((q, i) => { console.log('QUIZ.' + (i + 1), 'place', q.place, '| bonne en', q.reponses.indexOf(q.bonne), '|', q.question); q.fautes.forEach(f => { if (q.question.split(f.juste).length !== 2) console.log('  !! morceau absent ou double :', f.juste); console.log('   ', q.question.replace(f.juste, f.faux)) }) })
 *   const trous = X.RESUME.flat().filter(m => typeof m !== 'string')
 *   trous.forEach((t, i) => { const o = [t.juste, t.copie, ...t.pieges]; console.log('TROU.' + (i + 1), o.join(' | ')); if (new Set(o).size !== 4) console.log('  !! pas quatre formes') })
 *   console.log('  ', trous.length, 'trous')
 *   console.log(X.RESUME.map(p => p.map(m => typeof m === 'string' ? m : m.juste).join('')).join('\\n'))
 *   let g = 0; X.CEST.forEach((it, i) => { console.log('CEST.' + (i + 1), (it.avant + it.bonne + it.apres).replace(/\\s+/g, ' ')); if (!it.options.includes(it.bonne)) console.log('  !! bonne absente'); if (it.options[0] === it.bonne) g++ }); console.log('  ', g, 'a gauche sur', X.CEST.length)"
 */

/**
 * Le quiz : cinq questions sur l'article, deux clics chacune. Les écritures
 * fausses portent les fautes de l'élève (« pour quoi », la lettre muette,
 * -é ou -er, a ou à, le s du pluriel), une seule chacune.
 *
 * La bonne écriture change de place (`place`), la bonne réponse aussi : les
 * données font le mélange, la page reste prérendue.
 */
export const QUIZ: QuizItem[] = [
  {
    question: "Pourquoi est-ce que le capitaine avait peur avant le départ ?",
    fautes: [
      {
        juste: "Pourquoi",
        faux: "Pour quoi",
        pourquoi: "Pour poser une question, « pourquoi » s’écrit en un seul mot.",
      },
      {
        juste: "avait peur",
        faux: "était peur",
        pourquoi: "On dit « avoir peur » : il avait peur.",
      },
      {
        juste: "avant le",
        faux: "avan le",
        pourquoi: "« Avant » finit par un t muet, comme dans « avant-hier ».",
      },
    ],
    place: 1,
    reponses: [
      "Il ne savait pas nager",
      "Il y avait une tempête",
      "Un test avait montré que le bateau était instable",
      "Le roi était à bord",
    ],
    bonne: "Un test avait montré que le bateau était instable",
    pourquoi:
      "Pendant la construction, un test avait montré que le Vasa penchait trop. Mais l’amiral n’a pas voulu écouter, et le roi attendait son navire.",
  },
  {
    question: "Qu’est-ce qui a fait tomber le Vasa sur le côté ?",
    fautes: [
      {
        juste: "a fait",
        faux: "a fais",
        pourquoi: "Dis-le au féminin : « une chose faite ». Donc fait, avec un t.",
      },
      {
        juste: "tomber",
        faux: "tombé",
        pourquoi: "Après « faire », le verbe reste à l’infinitif : faire tomber.",
      },
      {
        juste: "le côté",
        faux: "le coté",
        pourquoi: "Côté prend un accent circonflexe sur le o.",
      },
    ],
    place: 3,
    reponses: [
      "Un coup de vent",
      "Un boulet de canon",
      "Une baleine",
      "Un rocher",
    ],
    bonne: "Un coup de vent",
    pourquoi:
      "Aux premiers coups de vent, le Vasa s’est couché à bâbord, et l’eau est entrée par les sabords ouverts.",
  },
  {
    question: "D’après le musée, pourquoi est-ce que le Vasa a coulé ?",
    fautes: [
      {
        juste: "Vasa a",
        faux: "Vasa à",
        pourquoi: "On peut dire « le Vasa avait coulé » : c’est a, sans accent.",
      },
      {
        juste: "coulé",
        faux: "couler",
        pourquoi: "Après « a », c’est -é : il a coulé.",
      },
      {
        juste: "D’après",
        faux: "D’aprés",
        pourquoi: "Après prend un accent grave, comme très.",
      },
    ],
    place: 0,
    reponses: [
      "Il avait un trou dans la coque",
      "Les ennemis l’ont attaqué",
      "Le capitaine dormait",
      "Il était trop lourd en haut",
    ],
    bonne: "Il était trop lourd en haut",
    pourquoi:
      "Le musée Vasa l’explique : le navire était trop lourd au-dessus de l’eau. Quand le vent l’a poussé, il n’a pas pu se redresser.",
  },
  {
    question: "En quelle année est-ce qu’on a remonté le Vasa ?",
    fautes: [
      {
        juste: "on a",
        faux: "on à",
        pourquoi: "On peut dire « on avait remonté » : c’est a, sans accent.",
      },
      {
        juste: "remonté",
        faux: "remonter",
        pourquoi: "Après « a », c’est -é : on a remonté.",
      },
      {
        juste: "année",
        faux: "anné",
        pourquoi: "Année finit par -ée, comme journée.",
      },
    ],
    place: 2,
    reponses: ["1628", "1961", "1856", "2020"],
    bonne: "1961",
    pourquoi:
      "On l’a retrouvé en 1956, et on l’a remonté le 24 avril 1961, trois cent trente-trois ans après le naufrage.",
  },
  {
    question: "Où sont passés la plupart des canons du Vasa ?",
    fautes: [
      {
        juste: "Où",
        faux: "Ou",
        pourquoi: "Pour un lieu, « où » prend un accent grave.",
      },
      {
        juste: "sont",
        faux: "son",
        pourquoi: "On peut dire « où étaient passés » : c’est le verbe, sont.",
      },
      {
        juste: "des canons",
        faux: "des canon",
        pourquoi: "Après « des », le mot prend un s.",
      },
    ],
    place: 1,
    reponses: [
      "Ils sont toujours au fond de l’eau",
      "Le roi les a gardés en Pologne",
      "Ils ont été récupérés et vendus au XVIIe siècle",
      "Ils ont fondu dans l’eau",
    ],
    bonne: "Ils ont été récupérés et vendus au XVIIe siècle",
    pourquoi:
      "Dès le XVIIe siècle, on a remonté des canons et on les a revendus. Quand on a retrouvé l’épave, il n’en restait que trois.",
  },
];

/**
 * Le résumé de l'article, écrit pour la page, au passé : treize trous, quatre
 * formes chacun — la juste, la faute que l'élève fait d'habitude (`copie`), et
 * deux pièges. Ce sont ses fautes qui reviennent, déjà travaillées sur un
 * plateau : -aient, a ou à, avait ou était, -é ou -er, le s du pluriel, la
 * lettre muette, et -eau, -eaux (« sur un bateaux », 13 octobre). D'après
 * `docs/atelier.md`, elles reviennent ici, et nulle part ailleurs.
 *
 * **Aucun piège n'est une seconde réponse juste**, ni une forme qui ne diffère
 * de la bonne que par un accord que la page n'enseigne pas (`AGENTS.md` §9).
 */
export const RESUME: Morceau[][] = [
  [
    "Le 10 août 1628, tout Stockholm ",
    { juste: "attendait", copie: "attendais", pieges: ["attendaient", "attendé"] },
    " le départ du Vasa. C’était le plus beau ",
    { juste: "bateau", copie: "bateaux", pieges: ["bato", "bateaus"] },
    " du monde : ses sculptures ",
    { juste: "étaient", copie: "était", pieges: ["étais", "été"] },
    " peintes de toutes les couleurs, et il portait soixante-quatre ",
    { juste: "canons", copie: "canon", pieges: ["canont", "cannons"] },
    ".",
  ],
  [
    "Mais le capitaine n’était pas tranquille. Un test ",
    { juste: "avait", copie: "était", pieges: ["avais", "à"] },
    " montré que le navire était instable. Le roi, qui ",
    { juste: "faisait", copie: "fesait", pieges: ["faisais", "faisaient"] },
    " la guerre en Pologne, voulait pourtant son navire tout de suite.",
  ],
  [
    "Au premier coup de vent, le Vasa s’est couché ",
    { juste: "à", copie: "a", pieges: ["as", "â"] },
    " bâbord. L’eau est entrée par les sabords. Les marins ",
    { juste: "essayaient", copie: "essayait", pieges: ["essayais", "essayé"] },
    " de le ",
    { juste: "redresser", copie: "redressé", pieges: ["redressait", "redressés"] },
    ", mais c’était trop tard : en quelques minutes, le Vasa ",
    { juste: "a", copie: "à", pieges: ["as", "ha"] },
    " coulé.",
  ],
  [
    "En 1956, Anders Franzén a ",
    { juste: "trouvé", copie: "trouver", pieges: ["trouvait", "trouvez"] },
    " l’épave. Le 24 avril 1961, après 333 ans au fond, le Vasa est enfin sorti de l’eau.",
  ],
  [
    "Dans la vase, les archéologues ont découvert des ",
    { juste: "tonneaux", copie: "tonneau", pieges: ["tonnaux", "tonneaus"] },
    ", un coffre et des squelettes. Le musée ",
    { juste: "dit", copie: "dis", pieges: ["di", "dient"] },
    " que le Vasa a coulé parce qu’il était trop lourd en haut.",
  ],
];

/**
 * Le truc nouveau : c'était ou s'était ? Il vient de la copie du 5 octobre
 * (« l'autre jour s'était Tina qui le fesait »). Six phrases sur le Vasa ; la
 * bonne forme change de côté d'un item à l'autre.
 */
export const CEST: ChoixItem[] = [
  {
    avant: "Le Vasa ",
    apres: " couché à bâbord.",
    options: ["c’est", "s’est"],
    bonne: "s’est",
    pourquoi: "Au présent : « le Vasa se couche ». On entend se, donc s’est.",
  },
  {
    avant: "",
    apres: " le plus beau bateau du monde.",
    options: ["C’était", "S’était"],
    bonne: "C’était",
    pourquoi: "On peut dire « cela était le plus beau bateau » : donc c’.",
  },
  {
    avant: "L’eau ",
    apres: " infiltrée par les sabords.",
    options: ["c’est", "s’est"],
    bonne: "s’est",
    pourquoi: "Au présent : « l’eau s’infiltre ». On entend se, donc s’est.",
  },
  {
    avant: "Pour le roi, ",
    apres: " une œuvre d’art.",
    options: ["c’était", "s’était"],
    bonne: "c’était",
    pourquoi: "On peut dire « cela était une œuvre d’art » : donc c’.",
  },
  {
    avant: "Le vent ",
    apres: " levé, et le Vasa a penché.",
    options: ["c’est", "s’est"],
    bonne: "s’est",
    pourquoi: "Au présent : « le vent se lève ». On entend se, donc s’est.",
  },
  {
    avant: "Aujourd’hui, ",
    apres: " le navire de son époque le mieux conservé au monde.",
    options: ["c’est", "s’est"],
    bonne: "c’est",
    pourquoi: "On peut dire « cela est le navire le mieux conservé » : donc c’.",
  },
];
