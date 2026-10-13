import type { ChoixItem } from "../_exercice/Choix";
import type { FauteItem } from "../_exercice/Faute";
import type { Morceau } from "../_exercice/Trous";

/*
 * Les plateaux de la page, dans l'ordre où elle les joue : le texte à trous,
 * un plateau par truc, puis un défi qui mélange les trois et ramène celui
 * d'avant (« vendre »). Chaque phrase est faite des mots et des faits de
 * l'histoire.
 *
 * Vérification (trous, phrases complétées, côtés, doublons stricts) :
 *
 *   node --experimental-strip-types --input-type=module -e "
 *   import * as X from './src/app/atelier/la-poupee-qui-sait-tout/exercice.ts'
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
 * (`AGENTS.md` §9) : « si elle dit la météo » se défend, donc « dit » n'est
 * pas un piège de « disait ».
 *
 * Les trous suivent les trois trucs de la page (avait ou était, a ou à, le s
 * du pluriel) et les deux d'avant (-é ou -er, -ait ou -ais), plus un « mais »
 * que la copie écrit comme un verbe. **Aucun piège ne diffère de la bonne
 * forme par le seul accord** : « était partie » s'oppose à « avait partit »,
 * « avait partie », « était partit », jamais à « était parti ».
 *
 * « était allé », « à » et « poupée » reviennent, corrigés, plus bas dans le
 * texte : un relecteur qui les y trouve a fait ce qu'on lui demande.
 *
 * Nommé comme ses voisins, jamais `SETS` ni `BANKS` : la page est sans niveau.
 */
export const TEXTE: Morceau[][] = [
  ["Scoubidou, la poupée qui sait tout"],
  [
    "Il était une fois une poupée appelée Scoubidou. Mais elle n’était pas une poupée normale : elle avait ",
    { juste: "des pouvoirs", copie: "des pouvoir", pieges: ["dés pouvoirs", "des pouvoires"] },
    ". Elle pouvait marcher et parler, et aussi elle pouvait connaître le passé et le futur, et elle pouvait savoir ",
    {
      juste: "les secrets des autres",
      copie: "les secret des autre",
      pieges: ["les secrets des autre", "les secret des autres"],
    },
    ". Elle vivait dans une famille avec un père et un fils : le père s’appelait Saïd et le fils, Bachir.",
  ],
  [
    "Un jour, Bachir ",
    {
      juste: "avait demandé à",
      copie: "avait demander a",
      pieges: ["avait demander à", "avait demandé a"],
    },
    " son père s’il pouvait avoir un vélo, ",
    { juste: "mais", copie: "mait", pieges: ["mes", "met"] },
    " le père avait dit qu’il n’avait pas assez d’argent. Alors Bachir avait demandé à Scoubidou si elle pouvait faire que Saïd achète un vélo à Bachir. Le lendemain, le père ",
    { juste: "était allé", copie: "avait aller", pieges: ["avait allé", "était aller"] },
    " faire les courses, mais dans chaque épicerie, il disait qu’il voulait un vélo au lieu de la nourriture. Alors il était allé chez le docteur, et le docteur avait compris tout de suite qu’il avait un fils qui voulait un vélo et qui avait une poupée.",
  ],
  [
    "Alors le père avait dit à la poupée qu’elle devait partir de la maison, mais la poupée lui avait dit qu’elle voulait des lunettes avec des verres en bois pour pouvoir utiliser ses pouvoirs, car elle pouvait juste les utiliser si elle avait les yeux couverts. Elle ",
    { juste: "était partie", copie: "avait partit", pieges: ["avait partie", "était partit"] },
    " sur un bateau. Quand le capitaine était arrivé, il lui avait demandé pourquoi elle était là, et elle lui avait dit qu’elle voulait travailler pour lui. Il lui avait dit qu’il lui donnerait 5 euros par jour si elle ",
    { juste: "disait", copie: "disais", pieges: ["disaient", "disez"] },
    " la météo du lendemain. Un jour, le capitaine avait ordonné au cuisinier de jeter ses lunettes à la mer : comme ça, il n’aurait pas à payer la poupée.",
  ],
  [
    "Comme la poupée ne savait pas la météo, elle l’avait dite au hasard. Le lendemain, il était en train de pleuvoir, et Scoubidou avait dit qu’il allait faire soleil. Le capitaine l’avait jetée à la mer, et tout à coup elle est entrée dans l’estomac d’un requin. Elle avait senti qu’elle touchait quelque chose : ça avait la texture du bois. C’étaient ses lunettes ! Elle les avait mises et elle ",
    {
      juste: "a commencé à",
      copie: "a comencé a",
      pieges: ["à commencé a", "a commencer à"],
    },
    " sauter dans le ventre du requin. Il lui avait dit d’arrêter, mais elle n’arrêtait pas, jusqu’à ce qu’elle dise qu’elle voulait qu’il la ramène au bord. Le requin avait dit oui, car il ne voulait pas qu’elle continue. Tout à coup, Scoubidou ",
    {
      juste: "avait trouvé",
      copie: "avait trouver",
      pieges: ["avait trouvait", "avait trouvez"],
    },
    " un autre objet : c’était une perle précieuse. Sûrement, ",
    { juste: "tu pouvais", copie: "tu pouvait", pieges: ["tu pouvaient", "tu pouvez"] },
    " acheter six vélos avec. Quand ils ",
    { juste: "sont arrivés", copie: "sont arriver", pieges: ["ont arrivé", "sont arrivez"] },
    ", la poupée était allée directement chez Bachir, et ils lui ",
    { juste: "ont acheté", copie: "ont acheter", pieges: ["ont achetait", "ont achetez"] },
    " le vélo.",
  ],
];

/* Truc 1, le retour : « hier, il… ». On entend « est », on écrit « était » ;
   on entend « a », on écrit « avait ». Le participe est déjà écrit, accordé :
   l'accord n'est pas la question. Le dernier item est un verbe de mouvement
   qui prend « avoir », sans quoi « ça bouge, donc était » serait une
   stratégie. */
export const TRUC_1: ChoixItem[] = [
  {
    avant: "Le père ",
    apres: " allé faire les courses.",
    options: ["avait", "était"],
    bonne: "était",
    pourquoi: "Tu dis « hier, il est allé faire les courses », donc était.",
  },
  {
    avant: "Le docteur ",
    apres: " compris tout de suite.",
    options: ["avait", "était"],
    bonne: "avait",
    pourquoi: "Tu dis « hier, il a compris », donc avait.",
  },
  {
    avant: "La poupée ",
    apres: " partie sur un bateau.",
    options: ["était", "avait"],
    bonne: "était",
    pourquoi: "Tu dis « hier, elle est partie », donc était.",
  },
  {
    avant: "Le capitaine ",
    apres: " ordonné au cuisinier de jeter les lunettes.",
    options: ["était", "avait"],
    bonne: "avait",
    pourquoi: "Tu dis « hier, il a ordonné », donc avait.",
  },
  {
    avant: "Le capitaine ",
    apres: " arrivé sur le bateau.",
    options: ["était", "avait"],
    bonne: "était",
    pourquoi: "Tu dis « hier, il est arrivé », donc était.",
  },
  {
    avant: "Dans le ventre du requin, la poupée ",
    apres: " sauté très fort.",
    options: ["était", "avait"],
    bonne: "avait",
    pourquoi:
      "Piège ! Sauter, c’est bouger, mais tu dis « hier, elle a sauté ». C’est ton oreille qui décide : avait.",
  },
];

/* Truc 2, le retour : « avait » à la place. La phrase tient, c'est a ; elle ne
   veut plus rien dire, c'est à. La copie n'a pas un seul « à », mais elle a
   deux « a » verbes : trois items en portent un, sans quoi « toujours à »
   serait une stratégie. */
export const TRUC_2: ChoixItem[] = [
  {
    avant: "Bachir avait demandé un vélo ",
    apres: " son père.",
    options: ["a", "à"],
    bonne: "à",
    pourquoi: "« demandé un vélo avait son père » ne veut rien dire, donc à.",
  },
  {
    avant: "Dans le ventre du requin, la poupée ",
    apres: " trouvé ses lunettes.",
    options: ["a", "à"],
    bonne: "a",
    pourquoi: "« la poupée avait trouvé ses lunettes » marche, donc a.",
  },
  {
    avant: "Le capitaine a jeté la poupée ",
    apres: " la mer.",
    options: ["à", "a"],
    bonne: "à",
    pourquoi:
      "« jeté la poupée avait la mer » ne veut rien dire, donc à. Le premier a, lui, marche avec avait.",
  },
  {
    avant: "Tout ",
    apres: " coup, Scoubidou a trouvé une perle.",
    options: ["a", "à"],
    bonne: "à",
    pourquoi: "« tout avait coup » ne veut rien dire, donc à.",
  },
  {
    avant: "Le requin ",
    apres: " ramené la poupée au bord.",
    options: ["à", "a"],
    bonne: "a",
    pourquoi: "« le requin avait ramené la poupée » marche, donc a.",
  },
  {
    avant: "La poupée a commencé ",
    apres: " sauter.",
    options: ["à", "a"],
    bonne: "à",
    pourquoi:
      "« commencé avait sauter » ne veut rien dire, donc à. Le premier a marche avec avait : « la poupée avait commencé ».",
  },
];

/* Truc 3 : « cheval » à la place du nom. On dit « chevaux », il y en a
   plusieurs et le nom prend un s ; on dit « cheval », pas de s. Le dernier
   item parle de plusieurs épiceries et reste au singulier après « chaque »,
   sans quoi « il y en a plusieurs dans l'histoire, donc s » serait une
   stratégie. */
export const TRUC_3: ChoixItem[] = [
  {
    avant: "Scoubidou avait des ",
    apres: " magiques.",
    options: ["pouvoir", "pouvoirs"],
    bonne: "pouvoirs",
    pourquoi: "Avec cheval : « elle avait des chevaux ». Il y en a plusieurs, donc pouvoirs.",
  },
  {
    avant: "La poupée était partie sur un ",
    apres: ".",
    options: ["bateau", "bateaux"],
    bonne: "bateau",
    pourquoi: "Avec cheval : « sur un cheval ». Un seul, donc bateau, sans x.",
  },
  {
    avant: "Elle savait les ",
    apres: " de tout le monde.",
    options: ["secrets", "secret"],
    bonne: "secrets",
    pourquoi: "Avec cheval : « les chevaux de tout le monde ». Donc secrets.",
  },
  {
    avant: "Elle voulait des lunettes avec des ",
    apres: " en bois.",
    options: ["verre", "verres"],
    bonne: "verres",
    pourquoi: "Avec cheval : « avec des chevaux ». Donc verres.",
  },
  {
    avant: "Avec la perle, tu pouvais acheter six ",
    apres: ".",
    options: ["vélos", "vélo"],
    bonne: "vélos",
    pourquoi: "Avec cheval : « six chevaux ». Donc vélos.",
  },
  {
    avant: "Le père demandait un vélo dans chaque ",
    apres: ".",
    options: ["épiceries", "épicerie"],
    bonne: "épicerie",
    pourquoi:
      "Piège ! Il y a plusieurs épiceries dans l’histoire, mais tu dis « chaque cheval ». Après chaque, pas de s.",
  },
];

/* Le défi : les trois trucs mélangés et celui avec « vendre », rien n'est
   signalé. Un seul mot fautif par phrase, jamais une élision, et aucune
   phrase d'un plateau ne revient. La copie ne se trompe sur « a » que dans un
   sens ; la phrase 8 porte donc aussi un « a » juste, à ne pas cliquer, et la
   phrase 3 un « à » juste. */
export const DEFI: FauteItem[] = [
  {
    mots: ["Le", "père", "avait", "allé", "chez", "le", "docteur."],
    fautif: 2,
    correction: "était",
    pourquoi: "Truc 1 : tu dis « hier, il est allé chez le docteur », donc était.",
  },
  {
    mots: ["Scoubidou", "avait", "trouver", "une", "perle", "dans", "le", "ventre", "du", "requin."],
    fautif: 2,
    correction: "trouvé",
    pourquoi: "Le truc avec vendre : « Scoubidou avait vendu une perle », donc trouvé.",
  },
  {
    mots: ["Le", "capitaine", "donnait", "cinq", "euro", "par", "jour", "à", "la", "poupée."],
    fautif: 4,
    correction: "euros",
    pourquoi: "Truc 3 : « cinq chevaux », donc euros. Et le à est juste : « par jour avait la poupée » ne veut rien dire.",
  },
  {
    mots: ["Le", "cuisinier", "devait", "jeter", "les", "lunettes", "a", "la", "mer."],
    fautif: 6,
    correction: "à",
    pourquoi: "Truc 2 : « jeter les lunettes avait la mer » ne veut rien dire, donc à.",
  },
  {
    mots: ["Scoubidou", "savait", "les", "secret", "de", "toute", "la", "famille."],
    fautif: 3,
    correction: "secrets",
    pourquoi: "Truc 3 : « les chevaux de toute la famille », donc secrets.",
  },
  {
    mots: ["Quand", "le", "capitaine", "avait", "arrivé,", "la", "poupée", "dormait", "sur", "le", "bateau."],
    fautif: 3,
    correction: "était",
    pourquoi: "Truc 1 : tu dis « hier, il est arrivé », donc était.",
  },
  {
    mots: ["Le", "requin", "voulait", "ramené", "la", "poupée", "au", "bord."],
    fautif: 3,
    correction: "ramener",
    pourquoi: "Le truc avec vendre : « il voulait vendre », donc ramener.",
  },
  {
    mots: ["La", "poupée", "a", "donné", "la", "perle", "a", "Bachir."],
    fautif: 6,
    correction: "à",
    pourquoi:
      "Truc 2 : « donné la perle avait Bachir » ne veut rien dire, donc à. Le premier a est juste : « la poupée avait donné » marche.",
  },
];
