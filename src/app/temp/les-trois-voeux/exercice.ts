import type { ChoixItem } from "../_exercice/Choix";
import type { FauteItem } from "../_exercice/Faute";

/**
 * Un plateau par truc, puis un défi qui mélange les trois. Chaque phrase est
 * faite des mots et des faits de l'histoire.
 *
 * - `TRUC_1` (-é ou -er), `TRUC_2` (dit, fait, pris) et `TRUC_3` (avait ou
 *   était) : on clique, deux formes écrites vraiment, la bonne alterne de
 *   côté. `TRUC_3` garde un item où « avait » est juste, sans quoi « toujours
 *   était » serait une stratégie.
 * - `DEFI` : un seul mot fautif par phrase, jamais une élision.
 *
 * Les noms `data.ts`, `SETS`, `BANKS` sont évités exprès : la page est sans niveau.
 *
 * Vérification (phrases complétées, côtés, doublons stricts) :
 *
 *   node --experimental-strip-types --input-type=module -e "
 *   import * as X from './src/app/temp/les-trois-voeux/exercice.ts'
 *   const vu = new Map(); let durs = 0
 *   const n = (k, p, c) => { p = p.replace(/\\s+/g, ' ').trim(); console.log(k, p); const key = p + '|' + c; vu.set(key, (vu.get(key) ?? 0) + 1) }
 *   for (const set of ['TRUC_1', 'TRUC_2', 'TRUC_3']) { let g = 0; X[set].forEach((it, i) => { n(set + '.' + (i + 1), it.avant + it.bonne + it.apres, it.bonne); if (!it.options.includes(it.bonne)) console.log('  !! bonne absente'); if (it.options[0] === it.bonne) g++ }); console.log('  ', g, 'a gauche sur', X[set].length) }
 *   X.DEFI.forEach((it, i) => { n('DEFI.' + (i + 1), it.mots.map((m, j) => (j === it.fautif ? it.correction : m)).join(' '), it.correction); if (it.mots[it.fautif] === it.correction || it.mots[it.fautif].includes(' ')) console.log('  !! fautif') })
 *   for (const [k, v] of vu) if (v > 1) { durs++; console.log('  DOUBLON', k) }
 *   console.log(durs, 'doublon(s) strict(s)')"
 */

/* Truc 1 : après « avait », -é ; après « il fallait », « et », « pour », -er. */
export const TRUC_1: ChoixItem[] = [
  {
    avant: "Heureusement, ça n’avait pas trop ",
    apres: ".",
    options: ["durer", "duré"],
    bonne: "duré",
    pourquoi: "Avec vendre : « il avait vendu ». Tu entends vendu, donc duré.",
  },
  {
    avant: "La sorcière lui avait ",
    apres: " la potion pour grandir.",
    options: ["donné", "donner"],
    bonne: "donné",
    pourquoi: "Avec vendre : « elle lui avait vendu la potion ». Donc donné.",
  },
  {
    avant: "Il fallait aller au bord de la mer et ",
    apres: " son nom trois fois.",
    options: ["répété", "répéter"],
    bonne: "répéter",
    pourquoi:
      "Pas de « avait » devant. Avec vendre : « il fallait vendre ». Donc répéter.",
  },
  {
    avant: "Le premier vœu, il l’avait ",
    apres: " pour revenir au village.",
    options: ["utilisé", "utiliser"],
    bonne: "utilisé",
    pourquoi: "Avec vendre : « il l’avait vendu ». Donc utilisé.",
  },
];

/* Truc 2 : la lettre muette s'entend au féminin. */
export const TRUC_2: ChoixItem[] = [
  {
    avant: "Il lui avait ",
    apres: " en chinois qu’il voulait rétrécir.",
    options: ["dis", "dit"],
    bonne: "dit",
    pourquoi: "Une chose dite : on entend le t, donc dit.",
  },
  {
    avant: "Après l’avoir ",
    apres: ", il avait la taille d’un humain.",
    options: ["fait", "fais"],
    bonne: "fait",
    pourquoi: "Une chose faite : on entend le t, donc fait.",
  },
  {
    avant: "Marie lui avait donné un conseil, et il l’avait ",
    apres: " au sérieux.",
    options: ["prit", "pris"],
    bonne: "pris",
    pourquoi: "Une chose prise : on entend le s, donc pris.",
  },
  {
    avant: "Le sorcier lui avait ",
    apres: " d’aller chez la sorcière bretonne.",
    options: ["dit", "dis"],
    bonne: "dit",
    pourquoi: "Une chose dite : le t revient, même au masculin où il ne s’entend pas.",
  },
];

/* Truc 3 : l'oreille décide. « hier, il est… » donne était, « hier, il a… » avait. */
export const TRUC_3: ChoixItem[] = [
  {
    avant: "Alors il ",
    apres: " allé voir le pape à Rome.",
    options: ["avait", "était"],
    bonne: "était",
    pourquoi: "Tu dis « hier, il est allé », donc il était allé.",
  },
  {
    avant: "Grâce au premier vœu, il ",
    apres: " revenu au village.",
    options: ["était", "avait"],
    bonne: "était",
    pourquoi: "Tu dis « hier, il est revenu », donc il était revenu.",
  },
  {
    avant: "Il ",
    apres: " appelé la Sainte Vierge Marie.",
    options: ["était", "avait"],
    bonne: "avait",
    pourquoi:
      "Piège ! Tu dis « hier, il a appelé », donc il avait appelé.",
  },
  {
    avant: "Quand il ",
    apres: " arrivé en Bretagne, la sorcière lui avait donné la mauvaise potion.",
    options: ["était", "avait"],
    bonne: "était",
    pourquoi: "Tu dis « hier, il est arrivé », donc il était arrivé.",
  },
];

/* Le défi : les trois trucs mélangés, rien n'est signalé. */
export const DEFI: FauteItem[] = [
  {
    mots: ["Il", "lui", "avait", "dis", "qu’il", "voulait", "rétrécir."],
    fautif: 3,
    correction: "dit",
    pourquoi: "Truc 2 : une chose dite, donc dit.",
  },
  {
    mots: ["Heureusement,", "la", "recherche", "n’avait", "pas", "trop", "durer."],
    fautif: 6,
    correction: "duré.",
    pourquoi: "Truc 1 : « n’avait pas vendu », donc duré.",
  },
  {
    mots: ["Alors", "il", "avait", "allé", "voir", "le", "pape."],
    fautif: 2,
    correction: "était",
    pourquoi: "Truc 3 : « hier, il est allé », donc il était allé.",
  },
  {
    mots: ["La", "sorcière", "bretonne", "lui", "avait", "donner", "une", "potion."],
    fautif: 5,
    correction: "donné",
    pourquoi: "Truc 1 : « lui avait vendu », donc donné.",
  },
  {
    mots: ["Après", "l’avoir", "fais,", "il", "avait", "trois", "vœux."],
    fautif: 2,
    correction: "fait,",
    pourquoi: "Truc 2 : une chose faite, donc fait.",
  },
  {
    mots: ["Il", "avait", "revenu", "au", "village", "grâce", "au", "premier", "vœu."],
    fautif: 1,
    correction: "était",
    pourquoi: "Truc 3 : « hier, il est revenu », donc il était revenu.",
  },
  {
    mots: ["Marie", "lui", "avait", "dit", "d’aller", "au", "bord", "de", "la", "mer", "et", "de", "répété", "son", "nom."],
    fautif: 12,
    correction: "répéter",
    pourquoi: "Truc 1 : « de vendre », pas « de vendu ». Donc répéter.",
  },
  {
    mots: ["Le", "deuxième", "vœu,", "il", "l’avait", "utiliser", "pour", "rétrécir", "les", "chaussettes."],
    fautif: 5,
    correction: "utilisé",
    pourquoi: "Truc 1 : « il l’avait vendu », donc utilisé.",
  },
];
