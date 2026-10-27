import type { Level } from "@/data/navigation";
import type { Bi } from "../bilingue";

/**
 * « Ce ou celui ? » — les phrases à compléter, quatorze par niveau.
 *
 * **Le tirage est fixe et il est le même aux deux niveaux.** Les huit mots
 * restent affichés toute la partie, dans le même ordre : l'apprenante retrouve
 * le paradigme et y cherche la forme, au lieu d'éliminer trois distracteurs
 * tirés par phrase, ce qui serait un QCM déguisé en pastilles
 * (`.claude/agents/exercise-author.md`).
 *
 * **Un lot par niveau** (`docs/decisions.md` #68). La mécanique ne bouge pas,
 * les phrases oui : l'A2 oppose le déterminant au pronom, avec le piège de
 * `cet` et `cette` devant une voyelle ; le B1 y ajoute le pronom neutre
 * (`ce qui`, `ce que`, `ce dont`), qui n'a pas de nom derrière lui et que rien
 * n'accorde.
 *
 * **Chaque phrase n'a qu'une réponse défendable**, et c'est la phrase qui la
 * garantit, jamais le tirage : le nombre du verbe (« ceux qui arrivent »), le
 * genre du nom repris (« la bleue »), le `-là` collé au nom. Une phrase où deux
 * mots du tirage tiennent est une phrase cassée, pas une question difficile.
 */

/**
 * Les huit mots, dans un ordre qui ne change jamais : les quatre déterminants,
 * puis les quatre pronoms. **Aucun n'est un piège** — chacun est la réponse
 * d'au moins une phrase dans chacun des deux lots, et la vérification en bas de
 * ce fichier le contrôle.
 */
export const POOL = [
  "ce",
  "cet",
  "cette",
  "ces",
  "celui",
  "celle",
  "ceux",
  "celles",
] as const;

export type Word = (typeof POOL)[number];

export interface PickItem {
  /** Permanent within this file: the key React renders by. */
  id: string;
  /** La phrase avant le blanc. Jamais vide : une majuscule ne se pioche pas. */
  before: string;
  /** La phrase après le blanc, `-là` compris, trait d'union collé. */
  after: string;
  answer: Word;
  /** Montré seulement après coup, et il corrige au lieu de répéter la règle. */
  because: Bi;
}

const A2: PickItem[] = [
  {
    id: "train",
    before: "Je prends ",
    after: " train de huit heures.",
    answer: "ce",
    because: {
      fr: "« train » est masculin et commence par une consonne : ce train.",
      es: "«*train*» es masculino y empieza por consonante: *ce train*.",
    },
  },
  {
    id: "homme",
    before: "Tu connais ",
    after: " homme, au fond de la salle ?",
    answer: "cet",
    because: {
      fr: "Devant une voyelle, le masculin s’écrit cet : cet homme, comme cet arbre.",
      es: "Delante de vocal, el masculino se escribe *cet*: *cet homme*, como *cet arbre*.",
    },
  },
  {
    id: "rue",
    before: "Elle habite dans ",
    after: " rue depuis dix ans.",
    answer: "cette",
    because: {
      fr: "« rue » est féminin : cette rue.",
      es: "«*rue*» es femenino: *cette rue*.",
    },
  },
  {
    id: "photos",
    before: "Range ",
    after: " photos dans la boîte.",
    answer: "ces",
    because: {
      fr: "Le nom est au pluriel, et ces sert aux deux genres.",
      es: "El sustantivo está en plural, y *ces* sirve para los dos géneros.",
    },
  },
  {
    id: "hotel",
    before: "Réservez ",
    after: " hôtel, il est moins cher.",
    answer: "cet",
    because: {
      fr: "Le h de hôtel est muet, donc la voyelle compte : cet hôtel.",
      es: "La *h* de *hôtel* es muda, así que cuenta la vocal: *cet hôtel*.",
    },
  },
  {
    id: "affiche",
    before: "Regarde ",
    after: " affiche : elle est magnifique.",
    answer: "cette",
    because: {
      fr: "« affiche » est féminin, et cet ne se met jamais devant un nom féminin : cette affiche.",
      es: "«*affiche*» es femenino, y *cet* nunca va delante de un sustantivo femenino: *cette affiche*.",
    },
  },
  {
    id: "soir",
    before: "Nous partons ",
    after: " soir à sept heures.",
    answer: "ce",
    because: {
      fr: "Ce soir désigne le soir d’aujourd’hui : ce, masculin singulier.",
      es: "*Ce soir* se refiere a la noche de hoy: *ce*, masculino singular.",
    },
  },
  {
    id: "enfants",
    before: "Tu as vu ",
    after: " enfants dans la cour ?",
    answer: "ces",
    because: {
      fr: "Le nom est au pluriel : ces enfants.",
      es: "El sustantivo está en plural: *ces enfants*.",
    },
  },
  {
    id: "gateau",
    before: "Quel gâteau veux-tu ? Je prends ",
    after: "-là, au chocolat.",
    answer: "celui",
    because: {
      fr: "Le nom « gâteau » a déjà été dit, donc c’est le pronom : celui-là, masculin singulier.",
      es: "El sustantivo «*gâteau*» ya se ha dicho, así que es el pronombre: *celui-là*, masculino singular.",
    },
  },
  {
    id: "echarpe",
    before: "J’hésite entre ces deux écharpes : je prends ",
    after: "-ci, la bleue.",
    answer: "celle",
    because: {
      fr: "« écharpe » est féminin singulier : celle-ci.",
      es: "«*écharpe*» es femenino singular: *celle-ci*.",
    },
  },
  {
    id: "velo",
    before: "Mon vélo est ",
    after: " de mon frère.",
    answer: "celui",
    because: {
      fr: "Le pronom remplace « vélo », masculin singulier : celui de.",
      es: "El pronombre sustituye a «*vélo*», masculino singular: *celui de*.",
    },
  },
  {
    id: "cles",
    before: "Mes clés sont ",
    after: " du tiroir.",
    answer: "celles",
    because: {
      fr: "Le pronom remplace « clés », féminin pluriel : celles du tiroir.",
      es: "El pronombre sustituye a «*clés*», femenino plural: *celles du tiroir*.",
    },
  },
  {
    id: "citron",
    before: "Parmi les gâteaux, je préfère ",
    after: " qui sont au citron.",
    answer: "ceux",
    because: {
      fr: "« sont » est au pluriel, et les gâteaux sont masculins : ceux qui sont.",
      es: "«*sont*» está en plural, y *les gâteaux* son masculinos: *ceux qui sont*.",
    },
  },
  {
    id: "veste",
    before: "Cette veste est trop grande : essaie ",
    after: "-là.",
    answer: "celle",
    because: {
      fr: "Le pronom reprend « veste », féminin singulier : celle-là.",
      es: "El pronombre retoma «*veste*», femenino singular: *celle-là*.",
    },
  },
];

const B1: PickItem[] = [
  {
    id: "passe",
    before: "Je ne sais pas ",
    after: " qui s’est passé hier soir.",
    answer: "ce",
    because: {
      fr: "La chose n’a pas de nom, donc le pronom est ce, et « qui » lui donne le sujet du verbe.",
      es: "La cosa no tiene sustantivo, por eso el pronombre es *ce*, y «*qui*» es el sujeto del verbo.",
    },
  },
  {
    id: "ecrit",
    before: "Je n’ai pas compris ",
    after: " que tu as écrit.",
    answer: "ce",
    because: {
      fr: "Un sujet suit (« tu »), donc ce que, et non ce qui.",
      es: "Sigue un sujeto («*tu*»), por tanto *ce que*, y no *ce qui*.",
    },
  },
  {
    id: "besoin",
    before: "Dis-moi ",
    after: " dont tu as besoin pour demain.",
    answer: "ce",
    because: {
      fr: "On a besoin de quelque chose : le verbe réclame de, donc ce dont.",
      es: "Se necesita algo: el verbo pide *de*, por tanto *ce dont*.",
    },
  },
  {
    id: "brille",
    before: "Tout ",
    after: " qui brille n’est pas or.",
    answer: "ce",
    because: {
      fr: "Après tout, la forme ne change pas : tout ce qui, tout ce que.",
      es: "Después de *tout*, la forma no cambia: *tout ce qui*, *tout ce que*.",
    },
  },
  {
    id: "candidats",
    before: "Parmi les candidats, ",
    after: " qui arrivent en retard ne passeront pas.",
    answer: "ceux",
    because: {
      fr: "Le pronom reprend « candidats », masculin pluriel, et « arrivent » le confirme.",
      es: "El pronombre retoma «*candidats*», masculino plural, y «*arrivent*» lo confirma.",
    },
  },
  {
    id: "chambre",
    before: "Ma chambre est ",
    after: " du fond du couloir.",
    answer: "celle",
    because: {
      fr: "Le pronom reprend « chambre », féminin singulier : celle du fond.",
      es: "El pronombre retoma «*chambre*», femenino singular: *celle du fond*.",
    },
  },
  {
    id: "grand-pere",
    before: "Ces photos sont ",
    after: " de mon grand-père.",
    answer: "celles",
    because: {
      fr: "Le pronom reprend « photos », féminin pluriel : celles de.",
      es: "El pronombre retoma «*photos*», femenino plural: *celles de*.",
    },
  },
  {
    id: "midi",
    before: "Le train de midi et ",
    after: " de treize heures sont complets.",
    answer: "celui",
    because: {
      fr: "Le pronom reprend un seul train, masculin singulier : celui de treize heures.",
      es: "El pronombre retoma un solo tren, masculino singular: *celui de treize heures*.",
    },
  },
  {
    id: "exercices",
    before: "Ces exercices sont plus durs que ",
    after: " de la semaine dernière.",
    answer: "ceux",
    because: {
      fr: "Le pronom reprend « exercices », masculin pluriel : ceux de.",
      es: "El pronombre retoma «*exercices*», masculino plural: *ceux de*.",
    },
  },
  {
    id: "robes",
    before: "De toutes ses robes, ",
    after: " qu’elle préfère est la bleue.",
    answer: "celle",
    because: {
      fr: "« la bleue » est au singulier : une seule robe est reprise, donc celle que.",
      es: "«*la bleue*» está en singular: se retoma un solo vestido, por tanto *celle que*.",
    },
  },
  {
    id: "manteau",
    before: "Prends ",
    after: " manteau-là, il est plus chaud.",
    answer: "ce",
    because: {
      fr: "Le nom « manteau » est encore là, donc c’est le déterminant : ce manteau-là.",
      es: "El sustantivo «*manteau*» sigue ahí, así que es el determinante: *ce manteau-là*.",
    },
  },
  {
    id: "gare",
    before: "Tu te souviens de ",
    after: " homme-là, à la gare ?",
    answer: "cet",
    because: {
      fr: "Le nom suit, masculin et devant une voyelle : cet homme-là.",
      es: "Sigue el sustantivo, masculino y delante de vocal: *cet homme-là*.",
    },
  },
  {
    id: "histoire",
    before: "Franchement, ",
    after: " histoire ne m’intéresse pas.",
    answer: "cette",
    because: {
      fr: "« histoire » est féminin, malgré la voyelle : cette histoire.",
      es: "«*histoire*» es femenino, a pesar de la vocal: *cette histoire*.",
    },
  },
  {
    id: "annees",
    before: "Nous avons passé ",
    after: " années-là en Espagne.",
    answer: "ces",
    because: {
      fr: "Le nom est au pluriel, et -là le renvoie au récit : ces années-là.",
      es: "El sustantivo está en plural, y *-là* lo remite al relato: *ces années-là*.",
    },
  },
];

export const BANKS: Record<string, PickItem[]> = { A2, B1 };

export function bankFor(level: Level | null): PickItem[] {
  return (level && BANKS[level]) || BANKS[Object.keys(BANKS)[0]];
}

/* Vérification, à relancer après toute modification. Elle imprime les comptes
   avant le verdict, pour qu'un contrôle qui ne trouve rien échoue bruyamment
   (`AGENTS.md` §9) — et surtout elle **reconstruit chaque phrase avec sa
   réponse** : une phrase à deux réponses défendables ne se voit pas dans les
   données, elle se voit en la lisant.

node --experimental-strip-types --input-type=module -e "
import { BANKS, POOL } from './src/app/exercices/ce-ou-celui/data.ts'
const bad = []
let items = 0
for (const [level, bank] of Object.entries(BANKS)) {
  const used = new Set()
  if (new Set(bank.map(i => i.id)).size !== bank.length) bad.push(level + ': id en double')
  for (const item of bank) {
    items++
    used.add(item.answer)
    const at = level + '/' + item.id
    if (!POOL.includes(item.answer)) bad.push(at + ': réponse absente du tirage')
    if (item.before === '') bad.push(at + ': blanc en tête de phrase, la majuscule ne se pioche pas')
    if (!/[.?!]$/.test(item.after)) bad.push(at + ': la phrase ne finit pas')
    if (item.because.fr.length < 20 || item.because.es.length < 20) bad.push(at + ': correction trop courte')
  }
  for (const word of POOL) if (!used.has(word)) bad.push(level + ': « ' + word + ' » n_est jamais la réponse')
  console.log('--- ' + level + ' : ' + bank.length + ' phrases')
  for (const item of bank) console.log('   ' + item.before + item.answer + item.after)
}
console.log('phrases vérifiées:', items)
console.log('problèmes:', bad.length ? bad : 'aucun')
"
*/
