import type { ChoixItem } from "../_exercice/Choix";
import type { FauteItem } from "../_exercice/Faute";
import type { Morceau } from "../_exercice/Trous";

/*
 * Les plateaux de la page, dans l'ordre où elle les joue : le texte à trous,
 * puis un petit plateau par faute. Chaque phrase est faite des mots et des
 * faits du conte résumé.
 *
 * Vérification (trous, phrases complétées, côtés, doublons stricts) :
 *
 *   node --experimental-strip-types --input-type=module -e "
 *   import * as X from './src/app/atelier/la-sorciere-du-placard-aux-balais/exercice.ts'
 *   const trous = X.TEXTE.flat().filter(m => typeof m !== 'string')
 *   trous.forEach((t, i) => { const o = [t.juste, t.copie, ...t.pieges]; console.log('TROU.' + (i + 1), o.join(' | ')); if (new Set(o).size !== 5) console.log('  !! pas cinq formes') })
 *   console.log('  ', trous.length, 'trous')
 *   X.PHRASES.forEach((it, i) => console.log('PHRASE.' + (i + 1), it.mots.map((m, j) => (j === it.fautif ? it.correction : ' ' + m)).join('').trim()))
 *   for (const set of ['FINS', 'LETTRE', 'FRANCAIS', 'AIRE', 'APOSTROPHE']) { let g = 0; X[set].forEach((it, i) => { console.log(set + '.' + (i + 1), (it.avant + it.bonne + it.apres).replace(/\\s+/g, ' ')); if (!it.options.includes(it.bonne)) console.log('  !! bonne absente'); if (it.options[0] === it.bonne) g++ }); console.log('  ', g, 'a gauche sur', X[set].length) }"
 */

/**
 * Le texte rendu, corrigé partout sauf à vingt-deux endroits : les trous.
 * Chaque trou propose **cinq formes** : la juste, celle que la copie portait,
 * et trois pièges. **Aucun piège n'est une seconde réponse juste**
 * (`AGENTS.md` §9) : « visiter ses voisins » n'est pas un piège, « avoir de la
 * malchance » non plus.
 *
 * La copie écrit « decdé » : un i oublié, pas une faute qu'on travaille. Le
 * trou porte « décidé de acheter », la faute qui compte. Elle écrit aussi
 * « Quand il ~~avait~~ arrivé » : le trou porte « arrivé », ce qui restait, et
 * « avait arrivé » en piège.
 *
 * Les corrections sans trou : la ponctuation, « arrêter » (la copie l'écrit
 * juste plus haut), « Noël » avec sa majuscule, le second « notaire ».
 */
export const TEXTE: Morceau[][] = [
  ["La sorcière du placard aux balais"],
  [
    "(J’ai juste ",
    { juste: "écrit", copie: "écris", pieges: ["écri", "écrie", "écrits"] },
    " « il » parce que l’histoire ne ",
    { juste: "dit", copie: "dis", pieges: ["di", "dît", "disent"] },
    " pas son nom.)",
  ],
  [
    { juste: "Il était", copie: "Il y était", pieges: ["Il étais", "Ils était", "Il y étais"] },
    " une fois un homme qui avait trouvé 500 €. Alors il avait ",
    {
      juste: "décidé d’acheter",
      copie: "décidé de acheter",
      pieges: ["décider d’acheter", "décidé d’acheté", "décider de acheter"],
    },
    " une maison. Il y avait juste une maison ",
    { juste: "à 500 €", copie: "a 500 €", pieges: ["â 500 €", "as 500 €", "à 500 euro"] },
    ".",
  ],
  [
    "Le ",
    { juste: "notaire", copie: "notair", pieges: ["notère", "notaires", "nottaire"] },
    " n’arrêtait pas de rire, mais il ne disait pas pourquoi. Quand il ",
    {
      juste: "était arrivé",
      copie: "arrivé",
      pieges: ["avait arrivé", "était arriver", "étais arrivé"],
    },
    ", il ",
    { juste: "voulait", copie: "voulais", pieges: ["voulaient", "voulai", "voulé"] },
    " ",
    {
      juste: "rendre visite à ses voisins",
      copie: "visiter ses voisin",
      pieges: [
        "rendre visite à ses voisin",
        "rendre visite à ces voisins",
        "rendre visiter ses voisins",
      ],
    },
    ", mais ils ",
    { juste: "étaient", copie: "etait", pieges: ["était", "étais", "été"] },
    " bizarres : ils ",
    { juste: "disaient", copie: "disait", pieges: ["disais", "disaients", "dissaient"] },
    " qu’il ",
    {
      juste: "n’avait pas de chance",
      copie: "avait de la mauvaise chance",
      pieges: [
        "n’avait pas de la chance",
        "avait la mauvaise chance",
        "avait de mauvaise chance",
      ],
    },
    ". Alors il avait demandé au notaire pourquoi ",
    {
      juste: "ils étaient tous bizarres",
      copie: "ils était tous bizarre",
      pieges: [
        "ils étaient tous bizarre",
        "ils était tous bizarres",
        "ils étais tous bizarres",
      ],
    },
    " quand ils ",
    { juste: "parlaient", copie: "parlais", pieges: ["parlait", "parler", "parlé"] },
    " de la maison. Le notaire ",
    { juste: "avait dit", copie: "avait dis", pieges: ["avait dire", "avait dît", "avait dits"] },
    " que c’était ",
    { juste: "parce qu’il", copie: "car il", pieges: ["par ce qu’il", "pour qu’il", "parce que il"] },
    " y avait une sorcière dans le placard aux balais, et que si tu ",
    { juste: "disais", copie: "disait", pieges: ["disaient", "disai", "disez"] },
    " « Sorcière, sorcière, ",
    { juste: "prends", copie: "prend", pieges: ["prent", "prendre", "prenez"] },
    " garde à ton derrière ! », pendant la nuit elle ",
    {
      juste: "sortirait",
      copie: "sortirais",
      pieges: ["sortiraient", "sortirai", "sortiré"],
    },
    " et elle te ",
    {
      juste: "mangerait",
      copie: "mangerais",
      pieges: ["mangeraient", "mangerai", "mangé"],
    },
    ".",
  ],
  [
    "Le lendemain, il ne pouvait pas arrêter de penser ",
    {
      juste: "à la chanson",
      copie: "a la chanson",
      pieges: ["à là chanson", "â la chanson", "as la chanson"],
    },
    ". Mais la nuit de Noël, il ",
    {
      juste: "était revenu",
      copie: "avait revenu",
      pieges: ["était revenus", "avait revenir", "était revenir"],
    },
    " un peu fou, et il avait dit la chanson sans faire exprès.",
  ],
];

/* Partie 2 : la fin du verbe suit le sujet. je, tu : -ais ; il, elle : -ait ;
   ils, elles : -aient ; et avec tu, toujours un s. Le dernier item est le s
   des autres mots quand ils sont plusieurs, que la partie dit en une phrase. */
export const FINS: ChoixItem[] = [
  {
    avant: "Quand il était arrivé, il ",
    apres: " rendre visite à ses voisins.",
    options: ["voulais", "voulait"],
    bonne: "voulait",
    pourquoi: "Avec il : -ait. Il voulait.",
  },
  {
    avant: "Mais ses voisins ",
    apres: " bizarres.",
    options: ["étaient", "était"],
    bonne: "étaient",
    pourquoi: "Ses voisins, ce sont « ils » : -aient. Ils étaient.",
  },
  {
    avant: "Ils ",
    apres: " qu’il n’avait pas de chance.",
    options: ["disait", "disaient"],
    bonne: "disaient",
    pourquoi: "Avec ils : -aient. Ils disaient.",
  },
  {
    avant: "Ils étaient bizarres quand ils ",
    apres: " de la maison.",
    options: ["parlaient", "parlais"],
    bonne: "parlaient",
    pourquoi: "Avec ils : -aient. Ils parlaient.",
  },
  {
    avant: "Et si tu ",
    apres: " la chanson…",
    options: ["disait", "disais"],
    bonne: "disais",
    pourquoi: "Avec tu : -ais. Tu disais.",
  },
  {
    avant: "« Sorcière, sorcière, ",
    apres: " garde à ton derrière ! »",
    options: ["prends", "prend"],
    bonne: "prends",
    pourquoi: "La chanson dit « tu » à la sorcière (ton derrière). Avec tu, un s : prends.",
  },
  {
    avant: "Pendant la nuit, elle ",
    apres: ".",
    options: ["sortirais", "sortirait"],
    bonne: "sortirait",
    pourquoi: "Avec elle : -ait. Elle sortirait.",
  },
  {
    avant: "Et elle te ",
    apres: " !",
    options: ["mangerait", "mangerais"],
    bonne: "mangerait",
    pourquoi: "Avec elle : -ait. Elle te mangerait.",
  },
  {
    avant: "Les voisins avaient peur des ",
    apres: ".",
    options: ["sorcière", "sorcières"],
    bonne: "sorcières",
    pourquoi: "« des » : il y en a plusieurs. Sorcières prend un s.",
  },
];

/* Partie 3 : la lettre muette de dit, écrit, pris, fait, mis. Après avait ou
   j'ai, le féminin la fait entendre (écrite, prise). Au présent, je et tu
   prennent un s, il et elle un t : la règle de la partie 2. */
export const LETTRE: ChoixItem[] = [
  {
    avant: "J’ai juste ",
    apres: " « il ».",
    options: ["écris", "écrit"],
    bonne: "écrit",
    pourquoi: "Une lettre écrite : tu entends t, donc écrit.",
  },
  {
    avant: "L’histoire ne ",
    apres: " pas son nom.",
    options: ["dit", "dis"],
    bonne: "dit",
    pourquoi: "L’histoire, c’est « elle » : elle dit, avec t.",
  },
  {
    avant: "Le notaire avait ",
    apres: " qu’il y avait une sorcière.",
    options: ["dis", "dit"],
    bonne: "dit",
    pourquoi: "Une chose dite : tu entends t, donc dit.",
  },
  {
    avant: "La sorcière avait ",
    apres: " son balai.",
    options: ["pris", "prit"],
    bonne: "pris",
    pourquoi: "Une chose prise : tu entends z, donc pris, avec s.",
  },
  {
    avant: "Moi, je ne ",
    apres: " jamais la chanson !",
    options: ["dit", "dis"],
    bonne: "dis",
    pourquoi: "Avec je : un s. Je dis.",
  },
  {
    avant: "Il avait ",
    apres: " une grosse bêtise.",
    options: ["fait", "fais"],
    bonne: "fait",
    pourquoi: "Une chose faite : tu entends t, donc fait.",
  },
  {
    avant: "Le notaire avait ",
    apres: " la maison en vente.",
    options: ["mit", "mis"],
    bonne: "mis",
    pourquoi: "Une maison mise en vente : tu entends z, donc mis, avec s.",
  },
];

/* Partie 4 : quatre phrases qu'on comprend, mais qu'on dit autrement en
   français. La page ne dit jamais « un Français dirait » : l'élève est
   français, il vit à l'étranger. L'espagnol des trois premières est dans la prose de la page,
   où il porte son lang="es" ; une explication de plateau est du texte nu. */
export const FRANCAIS: ChoixItem[] = [
  {
    avant: "",
    apres: " une fois un homme qui avait trouvé 500 €.",
    options: ["Il y était", "Il était"],
    bonne: "Il était",
    pourquoi: "Les contes commencent toujours par « Il était une fois », sans y.",
  },
  {
    avant: "Il voulait ",
    apres: " ses voisins.",
    options: ["rendre visite à", "visiter"],
    bonne: "rendre visite à",
    pourquoi: "On visite une ville ou un musée. Des personnes, on leur rend visite.",
  },
  {
    avant: "Ses voisins disaient qu’il ",
    apres: ".",
    options: ["avait de la mauvaise chance", "n’avait pas de chance"],
    bonne: "n’avait pas de chance",
    pourquoi: "En français, on dit « il n’a pas de chance ».",
  },
  {
    avant: "C’était ",
    apres: " y avait une sorcière dans le placard.",
    options: ["parce qu’il", "car il"],
    bonne: "parce qu’il",
    pourquoi: "Après « c’était », on dit « parce que », jamais « car ».",
  },
];

/* Partie 5 : deux phrases collées, sans point entre elles. On clique le mot
   qui commence la deuxième. **Une seule coupure possible par item** : chaque
   item est fait de deux idées et d'aucune troisième. Le mot qui ouvre la
   deuxième peut revenir plus tôt (« il », « la ») : c'est un autre bouton,
   et le cliquer est faux. La première et la
   troisième viennent de la copie ; les deux autres de son histoire. */
export const PHRASES: FauteItem[] = [
  {
    mots: "Alors il avait décidé d’acheter une maison il y avait juste une maison à 500 €.".split(" "),
    fautif: 7,
    correction: ". Il",
    pourquoi: "Deux idées : il veut une maison, et il n’y en a qu’une. Un point entre les deux.",
  },
  {
    mots: "Le notaire n’arrêtait pas de rire il ne disait pas pourquoi.".split(" "),
    fautif: 6,
    correction: ". Il",
    pourquoi: "Le notaire rit, puis il ne dit pas pourquoi : deux phrases.",
  },
  {
    mots: "Ils étaient tous bizarres quand ils parlaient de la maison alors le notaire avait tout raconté.".split(" "),
    fautif: 10,
    correction: ". Alors",
    pourquoi: "La première phrase finit sur « la maison ». « Alors » ouvre la suivante.",
  },
  {
    mots: "Il ne pouvait pas arrêter de penser à la chanson la nuit de Noël, il était revenu un peu fou.".split(" "),
    fautif: 10,
    correction: ". La",
    pourquoi: "Le lendemain, puis la nuit de Noël : deux moments, deux phrases.",
  },
];

/* Partie 6 : le son « ère » d'un métier s'écrit -aire, sauf le féminin d'un
   métier en -er (boulangère, sorcière). Le notaire de la copie, puis des
   métiers que l'élève connaît. */
export const AIRE: ChoixItem[] = [
  {
    avant: "Le ",
    apres: " n’arrêtait pas de rire.",
    options: ["notair", "notaire"],
    bonne: "notaire",
    pourquoi: "Un métier : -aire, avec un e. Le notaire.",
  },
  {
    avant: "La dame soigne les chats : elle est ",
    apres: ".",
    options: ["vétérinaire", "vétérinair"],
    bonne: "vétérinaire",
    pourquoi: "Un métier : -aire. Vétérinaire.",
  },
  {
    avant: "On achète un livre chez le ",
    apres: ".",
    options: ["librair", "libraire"],
    bonne: "libraire",
    pourquoi: "Un métier : -aire. Le libraire.",
  },
  {
    avant: "La ",
    apres: " vend du pain.",
    options: ["boulangère", "boulangaire"],
    bonne: "boulangère",
    pourquoi: "Le féminin de boulanger : boulangère, avec -ère.",
  },
  {
    avant: "La ",
    apres: " du placard aux balais.",
    options: ["sorcaire", "sorcière"],
    bonne: "sorcière",
    pourquoi: "Le féminin de sorcier : sorcière, avec -ère. Tu l’as bien écrit dans ton titre !",
  },
];

/* Partie 7 : de devient d' devant une voyelle, que devient qu'. Devant une
   consonne, rien ne change : le deuxième item le montre. */
export const APOSTROPHE: ChoixItem[] = [
  {
    avant: "Il avait décidé ",
    apres: " une maison.",
    options: ["de acheter", "d’acheter"],
    bonne: "d’acheter",
    pourquoi: "acheter commence par a : de devient d’.",
  },
  {
    avant: "Il ne pouvait pas arrêter ",
    apres: " à la chanson.",
    options: ["de penser", "d’penser"],
    bonne: "de penser",
    pourquoi: "penser commence par p, une consonne : de reste de.",
  },
  {
    avant: "Il avait peur ",
    apres: " dans le placard.",
    options: ["d’entrer", "de entrer"],
    bonne: "d’entrer",
    pourquoi: "entrer commence par e : de devient d’.",
  },
  {
    avant: "Le notaire avait dit ",
    apres: " y avait une sorcière.",
    options: ["que il", "qu’il"],
    bonne: "qu’il",
    pourquoi: "il commence par i : que devient qu’. Tu l’écris déjà très bien !",
  },
];
