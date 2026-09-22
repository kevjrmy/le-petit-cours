import type { ChoixItem } from "../_exercice/Choix";
import type { FauteItem } from "../_exercice/Faute";
import type { EcrireItem } from "../_exercice/Ecrire";

/**
 * Les trois exercices de la page : reconnaître (`ITEMS`), voir (`FAUTES`),
 * produire (`ECRITURES`). Même découpage que sur l'autre page de l'atelier, et
 * pour la même raison — c'est l'ordre de la difficulté réelle.
 *
 * **Le pronom est le sujet de ce texte-ci**, et il ouvre les trois exercices.
 * Le troisième item de `ITEMS` et le troisième de `FAUTES` portent un `lui`
 * **correct** : un exercice où `lui` est toujours faux apprendrait une règle
 * fausse, et le texte lui-même dément cette règle, puisqu'il écrit « on lui
 * disait » et « lui volant la caméra » sans se tromper.
 *
 * Le reste suit les autres lignes du tableau : accents, consonnes doubles,
 * mot juste. Rien n'est inventé : chaque phrase est faite des mots et des
 * faits du texte, telle quelle ou recomposée pour qu'une même phrase ne
 * serve pas deux fois la même question.
 *
 * Mêmes contraintes que l'autre page : deux formes qui s'écrivent vraiment,
 * bonne réponse qui alterne de côté puisque l'ordre est fixe, mot fautif
 * toujours sur un seul mot dans `FAUTES`, aucune variante acceptée dans
 * `ECRITURES`. Ni `data.ts`/`BANKS` ni `questions.ts`/`SETS` : ces noms
 * déclenchent la comparaison par niveau de l'audit, et la page est taguée
 * `ANY`.
 *
 * **Vérification : on relit chaque phrase une fois complétée ou corrigée.**
 *
 *   node --experimental-strip-types --input-type=module -e "
 *   import { ITEMS, FAUTES, ECRITURES } from './src/app/temp/un-resume-de-film/exercice.ts'
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
 *
 * **Et le contrôle qui a servi à quelque chose : les doublons.** Les trois
 * exercices tirent du même texte, donc la même phrase finit par revenir. Une
 * phrase revue avec une *autre* cible est un bon item — on la relit et on
 * cherche autre chose. La même phrase avec la **même** cible n'en est pas un :
 * au troisième passage on se souvient de la réponse au lieu d'appliquer la
 * règle. Six de ces doublons stricts avaient survécu à la première écriture.
 *
 *   node --experimental-strip-types --input-type=module -e "
 *   import { ITEMS, FAUTES, ECRITURES } from './src/app/temp/un-resume-de-film/exercice.ts'
 *   const vu = new Map()
 *   const noter = (ex, n, phrase, cible) => {
 *     const cle = phrase.replace(/\\s+/g, ' ').trim()
 *     if (!vu.has(cle)) vu.set(cle, [])
 *     vu.get(cle).push(ex + n + ':' + cible)
 *   }
 *   ITEMS.forEach((it, i) => noter('C', i + 1, it.avant + it.bonne + it.apres, it.bonne))
 *   FAUTES.forEach((it, i) => noter('F', i + 1, it.mots.map((m, j) => (j === it.fautif ? it.correction : m)).join(' '), it.correction))
 *   ECRITURES.forEach((it, i) => noter('E', i + 1, it.avant + it.reponse + it.apres, it.reponse))
 *   let durs = 0
 *   for (const [phrase, ou] of vu) {
 *     if (ou.length === 1) continue
 *     const cibles = new Set(ou.map(o => o.split(':')[1]))
 *     if (cibles.size === 1) { durs++; console.log('  DOUBLON', ou.join(' '), '|', phrase) }
 *     else console.log('  echo   ', ou.join(' '), '|', phrase)
 *   }
 *   console.log(vu.size, 'phrases distinctes,', durs, 'doublon(s) strict(s) — doit etre 0')"
 */

/* Reconnaître : six items, un par ligne du tableau « Ce qui revient ». */
export const ITEMS: ChoixItem[] = [
  {
    avant: "Un homme nommé Fester ",
    apres: " poussa.",
    options: ["lui", "le"],
    bonne: "le",
    pourquoi: "On pousse quelqu’un, sans « à ». Donc le, la ou l’, jamais lui.",
  },
  {
    avant: "En partant, ",
    apres: ".",
    options: ["on l’attaqua", "on lui attaqua"],
    bonne: "on l’attaqua",
    pourquoi: "On attaque quelqu’un, sans « à ». Même question, même réponse.",
  },
  {
    avant: "On ",
    apres: " vola sa caméra.",
    options: ["lui", "la"],
    bonne: "lui",
    pourquoi:
      "Celui-ci est juste dans votre texte. On vole quelque chose à quelqu’un : le « à » est là, donc lui.",
  },
  {
    avant: "Ray est le personnage ",
    apres: " du film.",
    options: ["principale", "principal"],
    bonne: "principal",
    pourquoi:
      "L’adjectif s’accorde avec « personnage », qui est masculin, même quand le personnage est une femme.",
  },
  {
    avant: "Il regrette son ",
    apres: " de photoreporter.",
    options: ["statut", "status"],
    bonne: "statut",
    pourquoi: "Un statut, avec un t. « status » est un mot d’une autre langue.",
  },
  {
    avant: "Au collège, on lui disait qu’il avait ",
    apres: " grand potentiel.",
    options: ["du", "un"],
    bonne: "un",
    pourquoi:
      "« du potentiel » se dit, mais pas avec un adjectif devant : un grand potentiel, un vrai talent.",
  },
];

/* Voir : six phrases entières, une faute dans chacune, rien de signalé. */
export const FAUTES: FauteItem[] = [
  {
    mots: ["Le", "personage", "principal", "s’appelle", "Ray."],
    fautif: 1,
    correction: "personnage",
    pourquoi: "Deux n : une personne, un personnage.",
  },
  {
    mots: ["Il", "regrette", "son", "status", "d’avant."],
    fautif: 3,
    correction: "statut",
    pourquoi: "Un statut, avec un t. L’autre mot vient d’une autre langue.",
  },
  {
    mots: ["Un", "homme", "nommé", "Fester", "lui", "poussa."],
    fautif: 4,
    correction: "le",
    pourquoi: "Pousser quelqu’un, sans « à ». Donc le, pas lui.",
  },
  {
    mots: [
      "On",
      "le",
      "vola",
      "sa",
      "caméra",
      "en",
      "partant.",
    ],
    fautif: 1,
    correction: "lui",
    pourquoi:
      "L’inverse du précédent : on vole quelque chose à quelqu’un, le « à » est là, donc lui.",
  },
  {
    mots: ["Puis", "il", "retourna", "a", "la", "réalité."],
    fautif: 3,
    correction: "à",
    pourquoi:
      "« a » est le verbe avoir : il a faim. « à » est la préposition. Remplacez par « avait » pour trancher.",
  },
  {
    mots: [
      "Pendan",
      "une",
      "séance",
      "de",
      "paparazzi,",
      "il",
      "se",
      "souvint",
      "de",
      "sa",
      "jeunesse.",
    ],
    fautif: 0,
    correction: "Pendant",
    pourquoi: "Pendant, avec un t à la fin, comme dans « cependant ».",
  },
];

/* Produire : six formes à taper, accents compris. */
export const ECRITURES: EcrireItem[] = [
  {
    avant: "Ray ne supporte plus son ",
    apres: " actuel.",
    reponse: "statut",
    indice: "le mot français, avec un t",
    pourquoi: "Un statut, un institut, un débat : le t est muet et il s’écrit.",
  },
  {
    avant: "Au ",
    apres: ", on lui disait qu’il avait un grand potentiel.",
    reponse: "collège",
    indice: "l’école, avec deux l et un accent",
    pourquoi:
      "L’accent grave, parce que la syllabe suivante est muette : collège, mais collégien.",
  },
  {
    avant: "Puis il revint ",
    apres: " la réalité.",
    reponse: "à",
    indice: "la préposition, pas le verbe",
    pourquoi:
      "Remplacez par « avait » : « il revint avait la réalité » ne se dit pas, donc c’est à.",
  },
  {
    avant: "On lui vola sa ",
    apres: " en partant.",
    reponse: "caméra",
    indice: "l’appareil, avec un accent",
    pourquoi: "Un accent aigu au milieu : caméra, cinéma, opéra.",
  },
  {
    avant: "Pendant une ",
    apres: " de paparazzi, il pensa à sa jeunesse.",
    reponse: "séance",
    indice: "le rendez-vous de travail, avec un accent",
    pourquoi: "Une séance, une séparation : l’accent se voit et s’entend.",
  },
  {
    avant: "Un homme ",
    apres: " Fester le poussa.",
    reponse: "nommé",
    indice: "nommer, au participe",
    pourquoi: "Deux m, et le participe en -é : un homme nommé, une femme nommée.",
  },
];
