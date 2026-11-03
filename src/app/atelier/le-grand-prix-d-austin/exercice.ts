import type { Erreur, Tour } from "../_exercice/Course";

/*
 * La course de la page : un compte rendu du Grand Prix des États-Unis,
 * dimanche 25 octobre 2026 à Austin, écrit pour l'atelier dans la langue des
 * copies de l'élève, avec ses fautes qui reviennent (a ou à, avait ou était,
 * l'accord avec être, les doubles consonnes, 2e, les majuscules).
 *
 * **Chaque fait est vérifié**, et seulement ce que les sources disent de la
 * même façon :
 * - résultat (Antonelli, Leclerc, Verstappen), départ, pénalité de Russell,
 *   arrêt unique d'Antonelli au 24e tour contre deux pour les autres,
 *   9e victoire de la saison :
 *   https://www.formula1.com/en/latest/article/antonelli-surges-to-dominant-victory-in-united-states-grand-prix-ahead-of-leclerc-and-verstappen.6kmBQv9FNTW7LzkDj8S34j
 * - les mêmes, et 123 points d'avance sur Russell après la course :
 *   https://www.businessday.co.za/sport/f-one/2026-10-26-antonelli-wins-us-race-but-must-wait-to-clinch-formula-one-title/
 * - Leclerc passe Verstappen à sept tours de la fin :
 *   https://www.skysports.com/share/13603603
 * Le virage, le tour exact du dépassement et le nombre de courses restantes
 * diffèrent selon les sources : le texte ne les dit pas.
 *
 * Les pilotes sont nommés par leur nom seul (`docs/atelier.md`).
 *
 * **Un seul ordre défendable** : chaque morceau porte son indice (« Dimanche
 * 25 octobre, à Austin », « Au départ », « Dans le même tour », « Au 24e
 * tour », « À sept tours de la fin », « En conclusion »). **Aucune forme
 * proposée n'est une seconde réponse juste** (`AGENTS.md` §9) : « deuxième »
 * en lettres vaut « 2e » et n'est pas proposé ; « Etats-Unis » sans accent
 * se défend, donc ce mot n'est pas une faute.
 *
 * Vérification (morceaux, fautes, formes) :
 *
 *   node --experimental-strip-types --input-type=module -e "
 *   import * as X from './src/app/atelier/le-grand-prix-d-austin/exercice.ts'
 *   let n = 0
 *   X.TOURS.forEach((t, i) => { console.log('TOUR.' + (i + 1), t.partie, '|', t.mots.join(' ')); t.erreurs.forEach(e => { n++; console.log('   ', t.mots[e.at], '->', e.options.join(' | '), '=', e.bonne) }) })
 *   console.log('  ', X.TOURS.length, 'morceaux,', n, 'fautes')
 *   console.log('   affichage', X.AFFICHAGE.join(' '), X.AFFICHAGE.some((b, i) => b === i) ? '!! un morceau a sa place' : 'aucun a sa place')"
 */

/** Une faute, désignée par le mot fautif tel qu'il est écrit ; `fois` choisit
    son occurrence quand le mot revient (le premier « arrêté » est juste). */
type Faute = Omit<Erreur, "at"> & { mot: string; fois?: number };

/** Un morceau. Le texte se découpe aux espaces ; chaque faute est retrouvée
    par son mot, et une faute introuvable ou mal formée arrête l'import. */
function tour(partie: string, texte: string, fautes: Faute[], indice: string): Tour {
  const mots = texte.split(" ");
  const erreurs = fautes.map(({ mot, fois = 1, ...reste }) => {
    let vus = 0;
    const at = mots.findIndex((m) => m === mot && ++vus === fois);
    if (at < 0) throw new Error(`Course : « ${mot} » introuvable dans « ${texte} »`);
    if (!reste.options.includes(reste.bonne) || reste.options.includes(mot)) {
      throw new Error(`Course : les formes de « ${mot} » sont mal formées`);
    }
    return { at, ...reste };
  });
  return { partie, mots, erreurs, indice };
}

export const TOURS: Tour[] = [
  tour(
    "L’introduction",
    "Dimanche 25 octobre, a Austin, Antonelli a gagné le Grand Prix des États-Unis. leclerc et Verstappen ont complété le podium.",
    [
      {
        mot: "a",
        options: ["à", "au", "à la"],
        bonne: "à",
        pourquoi: "Devant une ville : à, avec l’accent. Sans accent, a est le verbe avoir : il a gagné.",
      },
      {
        mot: "leclerc",
        options: ["LeClerc", "Leclerc", "Le Clerc"],
        bonne: "Leclerc",
        pourquoi: "Un nom de famille prend une majuscule, et le premier mot d’une phrase aussi.",
      },
    ],
    "Qui, où, quand, et le résultat : c’est le début du texte.",
  ),
  tour(
    "Le développement",
    "Au départ, Antonelli a gardé la premiere place. Derrière lui, Leclerc a doublé Verstappen, mais Verstappen a repris la deuxième place avant la fin du premier tour.",
    [
      {
        mot: "premiere",
        options: ["premiére", "premièr", "première"],
        bonne: "première",
        pourquoi: "première prend un accent grave, comme dernière : è.",
      },
    ],
    "« Au départ » : le premier fait de la course.",
  ),
  tour(
    "Le développement",
    "Dans le même tour, Russell est sortie de la piste, et il a reçu une pénalité de cinq secondes.",
    [
      {
        mot: "sortie",
        options: ["sorti", "sortis", "sorties"],
        bonne: "sorti",
        pourquoi: "Russell, c’est « il » : est sorti, sans e.",
      },
    ],
    "« Dans le même tour » : le premier tour, celui du morceau d’avant.",
  ),
  tour(
    "Le développement",
    "Au 24ème tour, Antonelli s’est arrêté au stand une seule fois, pour prendre des pneus durs. Ses adversaires, eux, se sont arrêté deux fois.",
    [
      {
        mot: "24ème",
        options: ["24è", "24e", "24éme"],
        bonne: "24e",
        pourquoi: "Après le chiffre, juste un e : 24e.",
      },
      {
        mot: "arrêté",
        fois: 2,
        options: ["arrêter", "arrêtées", "arrêtés"],
        bonne: "arrêtés",
        pourquoi: "Ses adversaires, c’est « ils » : se sont arrêtés, avec un s. Antonelli, lui, s’est arrêté : « il », sans s.",
      },
    ],
    "« Au 24e tour » : le milieu de la course, après le premier tour.",
  ),
  tour(
    "Le développement",
    "À sept tours de la fin, Leclerc a doubler Verstappen pour la deuxième place. Antonelli, lui, avait déjà loin devant.",
    [
      {
        mot: "doubler",
        options: ["doublé", "doublait", "doublés"],
        bonne: "doublé",
        pourquoi: "Après a, mets un verbe comme prendre à la place : a pris, pas a prendre. Donc a doublé.",
      },
      {
        mot: "avait",
        options: ["étaient", "été", "était"],
        bonne: "était",
        pourquoi: "Il était loin devant : c’est être, on dit où il se trouve. avait, c’est avoir : il avait 123 points.",
      },
    ],
    "« À sept tours de la fin » : le dernier fait avant l’arrivée.",
  ),
  tour(
    "La conclusion",
    "En conclusion, c’était une course passionante, et une victoire mérité. Antonelli a gagné son neuvième Grand Prix de la saison, et après Austin, il avait 123 points d’avance sur Russell au championnat.",
    [
      {
        mot: "passionante,",
        options: ["passionnante,", "pasionnante,", "passionnantte,"],
        bonne: "passionnante,",
        pourquoi: "Comme passion : deux s et deux n.",
      },
      {
        mot: "mérité.",
        options: ["méritées.", "mériter.", "méritée."],
        bonne: "méritée.",
        pourquoi: "Une victoire, c’est « elle » : méritée, avec un e.",
      },
    ],
    "« En conclusion » : le bilan et ton avis, à la fin.",
  ),
];

/** L'ordre de la grille de départ : aucun morceau à sa place. */
export const AFFICHAGE = [3, 5, 0, 4, 1, 2];
