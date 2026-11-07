import type { Bi } from "../bilingue";

/**
 * « Raconter ses vacances » : un récit à trous, un menu de trois par trou.
 *
 * Même plateau que `mais-donc-ou-parce-que`. **Un récit, pas des phrases
 * isolées** : le passé composé et l'imparfait ne se choisissent que dans un
 * récit (`/grammaire/passe-compose-ou-imparfait`).
 *
 * **Deux sortes de trous, mêlés dans le récit.**
 * 1. Le temps. Chaque phrase porte son indice en français (« un matin »,
 *    « tous les matins », « soudain », « le dernier jour »),
 *    car PC et imparfait sont ambigus sans lui (`AGENTS.md` §9). Les trois
 *    choix sont la bonne forme, l'autre temps du passé, et un présent ou un
 *    mauvais auxiliaire.
 * 2. Le mot, avec les pièges d'un hispanophone : « partir en vacances »,
 *    « il faisait chaud », « il y avait du monde », « rendre visite à » une
 *    personne et « visiter » un lieu, « la carte ».
 *    Dans ces menus le temps est le même partout : seul le mot décide.
 *
 * Le sujet est dans le choix (« nous avons loué », « nous louions ») : sans
 * cela, « j'» devant le trou rendrait « je réservais » impossible à lire.
 *
 * Vocabulaire : celui de `voc-vacances`, rien de plus.
 */

export interface Blank {
  /** Permanent dans ce fichier : la clé du rendu. */
  id: string;
  /** La réponse, telle qu'elle s'écrit dans le texte. */
  answer: string;
  /** Les trois choix, dans l'ordre où le menu les montre. */
  options: [string, string, string];
  /** Montré après coup, sous un trou raté : l'indice, pas la règle entière. */
  because: Bi;
}

/** Le texte, coupé aux trous : une chaîne est du texte, le reste est un trou. */
export type Piece = string | Blank;

export const TEXT: Piece[][] = [
  [
    "Un matin de juin, ",
    {
      id: "reserver",
      answer: "j’ai réservé",
      options: ["je réservais", "j’ai réservé", "je réserve"],
      because: {
        fr: "« Un matin de juin » : un événement précis, terminé. Passé composé.",
        es: "«*Un matin de juin*»: un suceso concreto y terminado. *Passé composé*.",
      },
    },
    " une chambre d’hôte près de la mer. Une semaine plus tard, mon amie et moi, nous sommes parties ",
    {
      id: "envacances",
      answer: "en vacances",
      options: ["en vacances", "de vacances", "en vacance"],
      because: {
        fr: "On part « en vacances », toujours au pluriel.",
        es: "Se dice «*partir en vacances*», siempre en plural (no *de vacances*).",
      },
    },
    " pour sept jours. Le premier jour, ",
    {
      id: "louer",
      answer: "nous avons loué",
      options: ["nous avons loué", "nous louions", "nous louons"],
      because: {
        fr: "« Le premier jour » : une action précise, finie. Passé composé.",
        es: "«*Le premier jour*»: una acción concreta y acabada. *Passé composé*.",
      },
    },
    " une voiture. Mon amie suivait la route sur la ",
    {
      id: "carte",
      answer: "carte",
      options: ["lettre", "carte", "page"],
      because: {
        fr: "Une « carte » montre la route. Une « lettre » s’écrit et s’envoie.",
        es: "El mapa es *la carte*. La carta que se escribe y se envía es *la lettre*.",
      },
    },
    " de la région, et moi, je conduisais.",
  ],
  [
    "Tous les matins, ",
    {
      id: "petitdej",
      answer: "nous prenions",
      options: ["nous avons pris", "nous prenions", "nous prenons"],
      because: {
        fr: "« Tous les matins » : une habitude, elle se répète. Imparfait.",
        es: "«*Tous les matins*»: una costumbre que se repite. *Imparfait*.",
      },
    },
    " le petit-déjeuner sur la terrasse. ",
    {
      id: "chaud",
      answer: "Il faisait chaud",
      options: ["Il faisait chaud", "Il était chaud", "Il avait chaud"],
      because: {
        fr: "Pour le temps, on dit « il fait chaud ». « Il a chaud » parle d’une personne qui a chaud.",
        es: "Para el tiempo se dice *il fait chaud*. *Il a chaud* habla de una persona que tiene calor; *il est chaud* no sirve aquí.",
      },
    },
    " : trente degrés tous les jours. Sur la plage, il y ",
    {
      id: "monde",
      answer: "avait",
      options: ["était", "avait", "faisait"],
      because: {
        fr: "« Il y a » devient « il y avait » : il y avait du monde (había gente).",
        es: "*Hay* es *il y a*, y *había* es *il y avait*: *il y avait du monde*.",
      },
    },
    " du monde, mais nous trouvions toujours une place. Tous les après-midi, pendant que mon amie se baignait, ",
    {
      id: "photos",
      answer: "je prenais",
      options: ["je prenais", "j’ai pris", "je prends"],
      because: {
        fr: "« Tous les après-midi » : une habitude, elle se répète. Imparfait.",
        es: "«*Tous les après-midi*»: una costumbre que se repite. *Imparfait*.",
      },
    },
    " des photos de la plage. Chaque soir, ",
    {
      id: "promener",
      answer: "nous nous promenions",
      options: ["nous nous promenons", "nous nous sommes promenées", "nous nous promenions"],
      because: {
        fr: "« Chaque soir » : une habitude. Imparfait.",
        es: "«*Chaque soir*»: una costumbre. *Imparfait*.",
      },
    },
    " au bord de l’eau.",
  ],
  [
    "Un jour, ",
    {
      id: "randonnee",
      answer: "nous avons fait",
      options: ["nous faisions", "nous avons fait", "nous faisons"],
      because: {
        fr: "« Un jour », et une durée finie (quatre heures) : un événement terminé. Passé composé.",
        es: "«*Un jour*» y una duración cerrada (*quatre heures*): un suceso terminado. *Passé composé*.",
      },
    },
    " une randonnée de quatre heures dans la montagne. Le soir, en ville, soudain, ",
    {
      id: "pluie",
      answer: "la pluie a commencé",
      options: ["la pluie a commencé", "la pluie commence", "la pluie commençait"],
      because: {
        fr: "« Soudain » annonce un événement qui coupe la scène. Passé composé.",
        es: "«*Soudain*» anuncia un suceso que corta la escena. *Passé composé*.",
      },
    },
    ", alors nous sommes entrées dans un café. Le lendemain, nous ",
    {
      id: "visiter",
      answer: "avons visité",
      options: ["avons rendu visite à", "avons visité à", "avons visité"],
      because: {
        fr: "On visite un lieu (la vieille ville) : « visiter » sans « à ».",
        es: "Un lugar se *visite*: *visiter la vieille ville*, sin *à*. *Rendre visite à* es solo para personas.",
      },
    },
    " la vieille ville. Un soir, nous ",
    {
      id: "rendrevisite",
      answer: "avons rendu visite à",
      options: ["avons visité", "avons rendu visite à", "avons visité à"],
      because: {
        fr: "On rend visite à une personne (une amie) : « rendre visite à ». « Visiter » est pour un lieu.",
        es: "A una persona se le *rend visite*: *rendre visite à une amie*. *Visiter* es para un lugar.",
      },
    },
    " une amie de ma mère, qui habite dans la région. Un autre soir, nous ",
    {
      id: "gouter",
      answer: "avons goûté",
      options: ["goûtions", "avons goûté", "goûtons"],
      because: {
        fr: "« Un autre soir » : une fois, un événement. Passé composé.",
        es: "«*Un autre soir*»: una vez, un suceso. *Passé composé*.",
      },
    },
    " des plats du pays dans un petit restaurant.",
  ],
  [
    "Le dernier jour, ",
    {
      id: "rentrer",
      answer: "nous sommes rentrées",
      options: ["nous sommes rentrées", "nous rentrions", "nous avons rentré"],
      because: {
        fr: "« Le dernier jour » : un événement précis. Passé composé, et ~rentrer~ se conjugue avec « être ».",
        es: "«*Le dernier jour*»: un suceso concreto. *Passé composé*, y *rentrer* va con *être*.",
      },
    },
    " à la maison à six heures du soir. Le séjour était magnifique : ça ",
    {
      id: "plu",
      answer: "nous a beaucoup plu",
      options: ["a beaucoup plu à nous", "nous a beaucoup aimées", "nous a beaucoup plu"],
      because: {
        fr: "Avec « plaire », « nous » se place avant le verbe : « ça nous a plu ». « Ça nous a aimées » dirait que le séjour nous aime.",
        es: "*Plaire* funciona como *gustar*: *ça nous a plu*, con *nous* delante del verbo. *Ça nous a aimées* diría que la estancia nos quiere.",
      },
    },
    ", et je repars bientôt !",
  ],
];

/** Les trous, dans l'ordre de la lecture. */
export const ITEMS: Blank[] = TEXT.flat().filter(
  (piece): piece is Blank => typeof piece !== "string",
);

/* Vérification, à relancer après toute modification. Elle imprime le récit
   reconstruit avec ses réponses : un trou à deux réponses défendables se voit
   en relisant le paragraphe, puis chaque phrase avec ses deux mauvais choix
   (`AGENTS.md` §9). Le compte est imprimé avant le verdict.

node --experimental-strip-types --input-type=module -e "
import { TEXT, ITEMS } from './src/app/exercices/raconter-ses-vacances/data.ts'
const bad = []
if (new Set(ITEMS.map(b => b.id)).size !== ITEMS.length) bad.push('id en double')
const places = [0, 0, 0]
TEXT.forEach((paragraph) => paragraph.forEach((b) => {
  if (typeof b === 'string') return
  if (b.options.filter(o => o === b.answer).length !== 1) bad.push(b.id + ': la réponse doit figurer une fois')
  if (new Set(b.options).size !== 3) bad.push(b.id + ': choix en double')
  if (b.because.fr.length < 20 || b.because.es.length < 20) bad.push(b.id + ': correction trop courte')
  if ((b.because.es.split(String.fromCharCode(42)).length - 1) % 2) bad.push(b.id + ': astérisques es impairs')
  if ((b.because.fr.split('~').length - 1) % 2) bad.push(b.id + ': tildes fr impairs')
  places[b.options.indexOf(b.answer)]++
}))
console.log(TEXT.map(p => p.map(x => typeof x === 'string' ? x : '[' + x.answer + ']').join('')).join('\n'))
console.log('trous vérifiés:', ITEMS.length, '/ place de la réponse dans le menu:', places.join(' '))
console.log('problèmes:', bad.length ? bad : 'aucun')
"
*/
