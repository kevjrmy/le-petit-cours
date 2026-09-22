import type { ChoixItem } from "../_exercice/Choix";
import type { FauteItem } from "../_exercice/Faute";
import type { EcrireItem } from "../_exercice/Ecrire";

/**
 * Les trois exercices de la page, et ils sont trois parce qu'ils demandent
 * trois choses différentes :
 *
 * - `ITEMS` — **reconnaître**. Le trou est creusé, deux formes sont proposées.
 * - `FAUTES` — **voir**. La phrase arrive entière, rien n'est signalé.
 * - `ECRITURES` — **produire**. Il faut taper la forme, accents compris.
 *
 * Cet ordre est celui de la difficulté réelle pour un locuteur d'origine :
 * reconnaître, il y arrive souvent ; voir, beaucoup moins ; écrire, c'est ce
 * qui manque. Les trois tirent du même texte, donc un item raté au troisième
 * renvoie à une phrase déjà lue deux fois.
 *
 * **Rien n'est inventé.** Chaque phrase vient du texte de la page, fautive ou
 * corrigée, ce qui est la différence entre cet exercice et ceux de
 * `exercices/` : là-bas on tire d'un vivier, ici on retravaille sa propre
 * copie.
 *
 * **Les deux formes de `ITEMS` sont celles qui s'écrivent vraiment** : la
 * fautive telle quelle, la juste telle quelle. Aucun distracteur fabriqué,
 * donc aucun item à deux réponses défendables (`AGENTS.md` §9). Et la bonne
 * réponse alterne de côté, puisque le paquet n'est pas mélangé : sans cela
 * « c'est toujours la deuxième » serait une stratégie gagnante.
 *
 * **Dans `FAUTES`, le mot fautif est toujours un seul mot.** La correction,
 * elle, peut en valoir deux — « c'était » devient « ce n'était ». L'inverse ne
 * marche pas : « que elle » occupe deux boutons, et les réunir sous un seul
 * désignerait la faute avant qu'on l'ait cherchée. L'élision est donc traitée
 * dans les deux autres exercices, pas dans celui-ci.
 *
 * **Dans `ECRITURES`, aucune variante n'est acceptée.** L'accent *est* la
 * réponse : un `accept` qui laisserait passer « demande » pour « demandé »
 * viderait l'exercice (`AGENTS.md` §9, dans l'autre sens).
 *
 * **Ce fichier ne s'appelle ni `data.ts` ni `questions.ts`, et ses exports ne
 * sont ni `BANKS` ni `SETS`.** Ces noms-là déclenchent la comparaison
 * niveau-par-niveau de l'audit `nav-wiring` (#68, #76), et cette page est
 * taguée `ANY` : elle n'a pas de matière par niveau et n'en aura jamais.
 *
 * **Vérification : on relit chaque phrase une fois complétée ou corrigée.**
 * Une réponse fausse ne se voit pas dans les données, seulement dans la phrase
 * finie (`.claude/agents/exercise-author.md`).
 *
 *   node --experimental-strip-types --input-type=module -e "
 *   import { ITEMS, FAUTES, ECRITURES } from './src/app/temp/la-sorciere-de-la-rue-mouffetard/exercice.ts'
 *   let gauche = 0
 *   console.log('-- ITEMS')
 *   ITEMS.forEach((it, i) => {
 *     console.log(String(i + 1).padStart(2), it.avant + it.bonne + it.apres)
 *     if (!it.options.includes(it.bonne)) console.log('   !! la bonne reponse n est pas proposee')
 *     if (it.options[0] === it.options[1]) console.log('   !! les deux options sont identiques')
 *     if (it.options[0] === it.bonne) gauche++
 *   })
 *   console.log(ITEMS.length, 'items,', gauche, 'a gauche,', ITEMS.length - gauche, 'a droite')
 *   console.log('-- FAUTES')
 *   FAUTES.forEach((it, i) => {
 *     const fixed = it.mots.map((m, j) => (j === it.fautif ? it.correction : m))
 *     console.log(String(i + 1).padStart(2), fixed.join(' '))
 *     if (it.fautif < 0 || it.fautif >= it.mots.length) console.log('   !! fautif hors phrase')
 *     if (it.mots[it.fautif] === it.correction) console.log('   !! le mot fautif est deja la correction')
 *     if (it.mots[it.fautif].includes(' ')) console.log('   !! le mot fautif tient sur deux mots')
 *   })
 *   console.log('-- ECRITURES')
 *   ECRITURES.forEach((it, i) => {
 *     console.log(String(i + 1).padStart(2), it.avant + it.reponse + it.apres)
 *     if (it.reponse.trim() !== it.reponse) console.log('   !! la reponse porte une espace au bord')
 *     if (it.indice.includes(it.reponse)) console.log('   !! l indice donne la reponse')
 *   })
 *   console.log(FAUTES.length, 'fautes,', ECRITURES.length, 'ecritures')"
 */

/* Reconnaître : huit items, un par ligne du tableau « Ce qui revient ». */
export const ITEMS: ChoixItem[] = [
  {
    avant: "Son père lui avait ",
    apres: " où elle allait.",
    options: ["demander", "demandé"],
    bonne: "demandé",
    pourquoi:
      "Après « avait », c’est le participe. Remplacez par mordre : « il avait mordu », jamais « il avait mordre ».",
  },
  {
    avant: "Son petit frère ",
    apres: " parti chercher sa sœur.",
    options: ["avait", "était"],
    bonne: "était",
    pourquoi:
      "« partir » se conjugue avec être, comme entrer, sortir, venir et revenir.",
  },
  {
    avant: "Ce ",
    apres: " jamais celle que Nadia voulait.",
    options: ["n’était", "était"],
    bonne: "n’était",
    pourquoi:
      "À l’oral on saute le « ne », à l’écrit jamais : « ne … jamais » tient en deux morceaux.",
  },
  {
    avant: "Si elle voulait de la sauce, elle ",
    apres: " la chercher elle-même.",
    options: ["devrais", "devrait"],
    bonne: "devrait",
    pourquoi:
      "« elle » prend -ait ; « je » et « tu » prennent -ais. Le son est le même, le sujet décide.",
  },
  {
    avant: "Elle ",
    apres: " repartir tout de suite.",
    options: ["allait", "aller"],
    bonne: "allait",
    pourquoi:
      "C’est le verbe de la phrase, il est conjugué. L’infinitif, ici, c’est « repartir », juste après.",
  },
  {
    avant: "Elle ",
    apres: " une jeune fille appelée Nadia.",
    options: ["connaissait", "conaisait"],
    bonne: "connaissait",
    pourquoi: "Deux n et deux s : connaître, je connais, elle connaissait.",
  },
  {
    avant: "Nadia lui avait dit ",
    apres: " allait rapporter la sauce.",
    options: ["qu’elle", "que elle"],
    bonne: "qu’elle",
    pourquoi: "« que » perd son e devant une voyelle, toujours.",
  },
  {
    avant: "Le frère battit la sorcière en réclamant sa ",
    apres: ".",
    options: ["soeur", "sœur"],
    bonne: "sœur",
    pourquoi:
      "Le o et le e sont collés : sœur, cœur, œil, bœuf. Le clavier espagnol ne le fait pas, il faut le copier.",
  },
];

/* Voir : six phrases entières, une faute dans chacune, rien de signalé. */
export const FAUTES: FauteItem[] = [
  {
    mots: ["Elle", "conaisait", "une", "jeune", "fille", "appelée", "Nadia."],
    fautif: 1,
    correction: "connaissait",
    pourquoi: "Connaître prend deux n et deux s.",
  },
  {
    mots: ["Son", "père", "lui", "avait", "demander", "où", "elle", "allait."],
    fautif: 4,
    correction: "demandé",
    pourquoi: "Après « avait », le participe. « Il avait mordu », pas « mordre ».",
  },
  {
    mots: [
      "Son",
      "frère",
      "avait",
      "pris",
      "sa",
      "guitare",
      "et",
      "il",
      "avait",
      "parti",
      "chercher",
      "sa",
      "sœur.",
    ],
    fautif: 8,
    correction: "était",
    pourquoi:
      "Le premier « avait » est juste : avoir pris. Le second ne l’est pas : partir se conjugue avec être.",
  },
  {
    mots: [
      "Tout",
      "les",
      "jours,",
      "la",
      "sorcière",
      "allait",
      "dans",
      "une",
      "épicerie",
      "différente.",
    ],
    fautif: 0,
    correction: "Tous",
    pourquoi: "« les jours » est au pluriel, donc tous, avec un s qui ne s’entend pas.",
  },
  {
    mots: ["C’était", "jamais", "celle", "que", "Nadia", "voulait."],
    fautif: 0,
    correction: "Ce n’était",
    pourquoi: "À l’écrit, la négation garde son « ne », même quand on ne le dit pas.",
  },
  {
    mots: ["La", "sorcière", "detestes", "la", "chanson", "du", "frère."],
    fautif: 2,
    correction: "détestait",
    pourquoi:
      "Avec « elle » ou « la sorcière », jamais de s : elle détestait. Et l’accent se voit.",
  },
];

/* Produire : six formes à taper, accents compris. */
export const ECRITURES: EcrireItem[] = [
  {
    avant: "Son père lui avait ",
    apres: " où elle allait.",
    reponse: "demandé",
    indice: "demander, après « avait »",
    pourquoi: "Après avoir, le participe : il avait mordu, il avait demandé.",
  },
  {
    avant: "Quand il était dehors, il avait ",
    apres: " les yeux.",
    reponse: "fermé",
    indice: "fermer, après « avait »",
    pourquoi: "La même règle, un verbe plus loin. C’est celle qui revient le plus.",
  },
  {
    avant: "Elle connaissait une jeune fille ",
    apres: " Nadia.",
    reponse: "appelée",
    indice: "appeler, au féminin",
    pourquoi:
      "Ici le participe suit un nom et s’accorde avec lui : une fille appelée, un garçon appelé.",
  },
  {
    avant: "Si elle voulait de la sauce, elle ",
    apres: " la chercher elle-même.",
    reponse: "devrait",
    indice: "devoir, au conditionnel, avec « elle »",
    pourquoi: "elle, il, on prennent -ait. je et tu prennent -ais.",
  },
  {
    avant: "La sorcière ",
    apres: " la chanson du frère.",
    reponse: "détestait",
    indice: "détester, à l’imparfait, avec « la sorcière »",
    pourquoi: "Un sujet singulier, donc pas de s. L’accent, lui, se voit et s’entend.",
  },
  {
    avant: "Le frère battit la sorcière en réclamant sa ",
    apres: ".",
    reponse: "sœur",
    indice: "le o et le e collés",
    pourquoi:
      "sœur, cœur, œil, bœuf. Le clavier espagnol ne le tape pas : la rangée sous le champ, si.",
  },
];
