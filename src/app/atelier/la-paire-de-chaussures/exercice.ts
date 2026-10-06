import type { ChoixItem } from "../_exercice/Choix";
import type { FauteItem } from "../_exercice/Faute";
import type { Morceau } from "../_exercice/Trous";

/*
 * Les plateaux de la page, dans l'ordre où elle les joue : le texte à trous,
 * un plateau par truc, puis un défi qui mélange les trois. Chaque phrase est
 * faite des mots et des faits de l'histoire.
 *
 * Vérification (trous, phrases complétées, côtés, doublons stricts) :
 *
 *   node --experimental-strip-types --input-type=module -e "
 *   import * as X from './src/app/atelier/la-paire-de-chaussures/exercice.ts'
 *   const vu = new Map(); let durs = 0
 *   const n = (k, p, c) => { p = p.replace(/\\s+/g, ' ').trim(); console.log(k, p); const key = p + '|' + c; vu.set(key, (vu.get(key) ?? 0) + 1) }
 *   const trous = X.TEXTE.flat().filter(m => typeof m !== 'string')
 *   trous.forEach((t, i) => { const o = [t.juste, t.copie, ...t.pieges]; console.log('TROU.' + (i + 1), o.join(' | ')); if (new Set(o).size !== 4) console.log('  !! formes en double') })
 *   console.log('  ', trous.length, 'trous')
 *   for (const set of ['TRUC_1', 'TRUC_2', 'TRUC_3']) { let g = 0; X[set].forEach((it, i) => { n(set + '.' + (i + 1), it.avant + it.bonne + it.apres, it.bonne); if (!it.options.includes(it.bonne)) console.log('  !! bonne absente'); if (it.options[0] === it.bonne) g++ }); console.log('  ', g, 'a gauche sur', X[set].length) }
 *   X.DEFI.forEach((it, i) => { n('DEFI.' + (i + 1), it.mots.map((m, j) => (j === it.fautif ? it.correction : m)).join(' '), it.correction); if (it.mots[it.fautif] === it.correction || it.mots[it.fautif].includes(' ')) console.log('  !! fautif') })
 *   for (const [k, v] of vu) if (v > 1) { durs++; console.log('  DOUBLON', k) }
 *   console.log(durs, 'doublon(s) strict(s)')"
 */

/**
 * Le texte rendu, corrigé partout sauf à douze endroits : les douze trous.
 * Chaque trou propose quatre formes : la juste, celle que la copie portait,
 * et deux pièges. **Aucun piège n'est une seconde réponse juste**
 * (`AGENTS.md` §9) : « tout le jour » se dit, donc « toute la journée » n'est
 * pas un trou, et « Le jour suivant » n'est pas un piège de « Le lendemain ».
 *
 * Les trous suivent les trois trucs de la page (-é ou -er, -ait ou -ais, a ou
 * à), plus un pluriel, une tournure venue de l'espagnol et un « c'était ».
 * **Aucun piège ne diffère de la bonne forme par le seul accord** :
 * « achetées » s'oppose à « acheter », « achetez », « achetait », jamais à
 * « acheté ». L'accord avec « les » n'est pas la leçon du jour.
 *
 * Un mot manque dans la dernière phrase de la copie : le texte garde « (…) »,
 * et la page pose la question sous le corrigé.
 *
 * Nommé comme ses voisins, jamais `SETS` ni `BANKS` : la page est sans niveau.
 */
export const TEXTE: Morceau[][] = [
  ["La paire de chaussures"],
  [
    "Il était une fois une paire de chaussures qui étaient mariées. La dame s’appelait Tina et l’homme, Nicolas. Ils ",
    { juste: "vivaient", copie: "vivaients", pieges: ["vivait", "vivaint"] },
    " dans une boîte, enroulés dans du papier ; ils voulaient y rester pour toujours, jusqu’au jour où une dame les sortit de leur boîte et les essaya. Elles lui allaient parfaitement, alors elle les avait ",
    { juste: "achetées", copie: "acheter", pieges: ["achetait", "achetez"] },
    ". Mais le problème était que, quand la dame marchait, les chaussures étaient séparées, car quand l’un ",
    { juste: "était à", copie: "etait a", pieges: ["était a", "etait à"] },
    " l’avant, l’autre était à l’arrière.",
  ],
  [
    "Un jour, Nicolas décida qu’à chaque pas que la dame ferait, il irait dire bonjour à Tina. ",
    { juste: "Le lendemain", copie: "Le prochain jour", pieges: ["Le demain", "Le suivant jour"] },
    ", la dame alla se promener avec ses ",
    {
      juste: "nouvelles chaussures",
      copie: "nouvelle chausure",
      pieges: ["nouvelles chausures", "nouvelle chaussures"],
    },
    ", mais comme Nicolas allait vers le côté pour ",
    {
      juste: "dire bonjour à",
      copie: "dir bonjour a",
      pieges: ["dire bonjour a", "dir bonjour à"],
    },
    " Tina, la dame ",
    { juste: "n’arrêtait", copie: "n’arretais", pieges: ["n’arrêtais", "n’arretait"] },
    " pas de tomber. Et le jour d’après, ",
    { juste: "c’était", copie: "s’était", pieges: ["c’étais", "s’étais"] },
    " Tina qui le faisait.",
  ],
  [
    "Alors la dame était allée chez le docteur, et il avait dit que peut-être il fallait lui couper les pieds. Mais la dame avait écouté les chaussures parler et elle avait compris qu’ils étaient mariés. Alors elle demanda à la femme de ménage de laver les chaussures et de prendre soin des chaussures, même si elle n’allait pas les mettre. Alors la femme de ménage avait ",
    { juste: "pensé", copie: "penser", pieges: ["pensait", "pensez"] },
    " qu’elle allait voler les chaussures. Mais quand elle les portait, elle n’arrêtait pas de tomber. Alors elle les avait ",
    { juste: "données à", copie: "donner a", pieges: ["donner à", "données a"] },
    " sa nièce. Comme sa nièce était presque toute la journée assise, elle ne ",
    { juste: "tombait", copie: "tombais", pieges: ["tombaient", "tombé"] },
    " pas. Mais elle trouvait Tina de plus en plus (…), alors Nicolas ",
    { juste: "voulait", copie: "voulais", pieges: ["voulaient", "voulez"] },
    " faire un nœud avec les lacets : comme ça, ils seraient toujours ensemble.",
  ],
];

/* Truc 1, le retour : après « avait » et « était », -é ; après « il fallait »
   et « de », -er. Deux formes écrites vraiment, la bonne alterne de côté.
   **Aucune phrase n'a de « les » devant « avait »** : l'accord d'« achetées »
   n'est pas la leçon. Le dernier item garde un « avait » qui ne commande pas
   le mot à trouver, sans quoi « avait, donc -é » serait une stratégie. */
export const TRUC_1: ChoixItem[] = [
  {
    avant: "La dame avait ",
    apres: " les chaussures tout de suite.",
    options: ["acheter", "acheté"],
    bonne: "acheté",
    pourquoi:
      "Avec vendre : « la dame avait vendu les chaussures ». Tu entends vendu, donc acheté.",
  },
  {
    avant: "Il fallait peut-être lui ",
    apres: " les pieds.",
    options: ["couper", "coupé"],
    bonne: "couper",
    pourquoi: "Avec vendre : « il fallait lui vendre ». Tu entends vendre, donc couper.",
  },
  {
    avant: "Quand la dame marchait, les chaussures étaient ",
    apres: ".",
    options: ["séparer", "séparées"],
    bonne: "séparées",
    pourquoi:
      "Avec vendre : « les chaussures étaient vendues ». Tu entends vendu, donc -é. Et ce sont les chaussures : séparées.",
  },
  {
    avant: "La femme de ménage avait décidé de ",
    apres: " les chaussures à sa nièce.",
    options: ["donner", "donné"],
    bonne: "donner",
    pourquoi:
      "Piège ! Il y a « avait », mais regarde le mot juste avant : « de ». Avec vendre : « décidé de vendre ». Donc donner.",
  },
];

/* Truc 2 : -ais est pour « je » et « tu » ; pour les autres, « est » donne
   -ait et « sont » donne -aient. Le dernier item est une réplique où « je »
   parle, sans quoi « jamais -ais » serait une stratégie. */
export const TRUC_2: ChoixItem[] = [
  {
    avant: "La dame n’",
    apres: " pas de tomber.",
    options: ["arrêtais", "arrêtait"],
    bonne: "arrêtait",
    pourquoi: "Tu dis « la dame est », donc -ait.",
  },
  {
    avant: "Tina et Nicolas ",
    apres: " dans une boîte.",
    options: ["vivaient", "vivait"],
    bonne: "vivaient",
    pourquoi: "Tu dis « Tina et Nicolas sont », donc -aient.",
  },
  {
    avant: "Nicolas ",
    apres: " faire un nœud avec les lacets.",
    options: ["voulais", "voulait"],
    bonne: "voulait",
    pourquoi: "Tu dis « Nicolas est », donc -ait. Le -ais, c’est pour je et tu.",
  },
  {
    avant: "Les chaussures ",
    apres: " séparées quand la dame marchait.",
    options: ["étaient", "était"],
    bonne: "étaient",
    pourquoi: "Tu dis « les chaussures sont », donc -aient.",
  },
  {
    avant: "Nicolas dit à Tina : « Je ",
    apres: " te dire bonjour. »",
    options: ["voulais", "voulait"],
    bonne: "voulais",
    pourquoi: "Piège ! C’est Nicolas qui parle, et il dit « je ». Avec je, -ais.",
  },
];

/* Truc 3 : « avait » à la place. La phrase tient, c'est a ; elle ne veut plus
   rien dire, c'est à. La copie n'a aucun « a » verbe (tout y est au passé) :
   deux items en apportent un, sans quoi « toujours à » serait une stratégie. */
export const TRUC_3: ChoixItem[] = [
  {
    avant: "Nicolas voulait dire bonjour ",
    apres: " Tina.",
    options: ["a", "à"],
    bonne: "à",
    pourquoi: "« dire bonjour avait Tina » ne veut rien dire, donc à.",
  },
  {
    avant: "La dame ",
    apres: " acheté des chaussures neuves.",
    options: ["a", "à"],
    bonne: "a",
    pourquoi: "« la dame avait acheté » marche, donc a.",
  },
  {
    avant: "La femme de ménage a donné les chaussures ",
    apres: " sa nièce.",
    options: ["à", "a"],
    bonne: "à",
    pourquoi:
      "« les chaussures avait sa nièce » ne veut rien dire, donc à. Le premier a, lui, marche avec avait.",
  },
  {
    avant: "Quand la dame marchait, Tina était ",
    apres: " l’avant.",
    options: ["a", "à"],
    bonne: "à",
    pourquoi: "« Tina était avait l’avant » ne veut rien dire, donc à.",
  },
  {
    avant: "Tina ",
    apres: " un mari : il s’appelle Nicolas.",
    options: ["à", "a"],
    bonne: "a",
    pourquoi: "« Tina avait un mari » marche, donc a.",
  },
];

/* Le défi : les trois trucs mélangés, rien n'est signalé. Un seul mot fautif
   par phrase, jamais une élision. La copie ne se trompe sur « a » que dans un
   sens ; la phrase 7 porte donc un « a » juste, à ne pas cliquer. */
export const DEFI: FauteItem[] = [
  {
    mots: ["La", "femme", "de", "ménage", "portais", "les", "chaussures", "tous", "les", "jours."],
    fautif: 4,
    correction: "portait",
    pourquoi: "Truc 2 : tu dis « la femme de ménage est », donc portait.",
  },
  {
    mots: ["La", "dame", "avait", "écouter", "les", "chaussures", "parler."],
    fautif: 3,
    correction: "écouté",
    pourquoi: "Truc 1 : « la dame avait vendu », donc écouté.",
  },
  {
    mots: ["Nicolas", "allait", "vers", "le", "côté", "pour", "dire", "bonjour", "a", "Tina."],
    fautif: 8,
    correction: "à",
    pourquoi: "Truc 3 : « bonjour avait Tina » ne veut rien dire, donc à.",
  },
  {
    mots: ["Tina", "et", "Nicolas", "voulait", "rester", "ensemble", "pour", "toujours."],
    fautif: 3,
    correction: "voulaient",
    pourquoi: "Truc 2 : tu dis « Tina et Nicolas sont », donc voulaient.",
  },
  {
    mots: ["Le", "docteur", "voulait", "coupé", "les", "pieds", "de", "la", "dame."],
    fautif: 3,
    correction: "couper",
    pourquoi: "Truc 1 : « il voulait vendre », donc couper.",
  },
  {
    mots: ["La", "dame", "demanda", "a", "la", "femme", "de", "ménage", "de", "laver", "les", "chaussures."],
    fautif: 3,
    correction: "à",
    pourquoi: "Truc 3 : « demanda avait la femme de ménage » ne veut rien dire, donc à.",
  },
  {
    mots: ["La", "dame", "a", "dit", "que", "les", "chaussures", "étaient", "marier."],
    fautif: 8,
    correction: "mariées.",
    pourquoi:
      "Truc 1 : « les chaussures étaient vendues », donc -é. Ce sont les chaussures : mariées. Et le « a » est juste : « la dame avait dit » marche.",
  },
  {
    mots: ["Dans", "la", "boîte,", "les", "deux", "chaussures", "était", "toujours", "ensemble."],
    fautif: 6,
    correction: "étaient",
    pourquoi: "Truc 2 : tu dis « les deux chaussures sont », donc étaient.",
  },
];
