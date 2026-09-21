import type { Level } from "@/data/navigation";

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
  because: string;
}

const A2: PickItem[] = [
  {
    id: "train",
    before: "Je prends ",
    after: " train de huit heures.",
    answer: "ce",
    because: "« train » est masculin et commence par une consonne : ce train.",
  },
  {
    id: "homme",
    before: "Tu connais ",
    after: " homme, au fond de la salle ?",
    answer: "cet",
    because:
      "Devant une voyelle, le masculin s’écrit cet : cet homme, comme cet arbre.",
  },
  {
    id: "rue",
    before: "Elle habite dans ",
    after: " rue depuis dix ans.",
    answer: "cette",
    because: "« rue » est féminin : cette rue.",
  },
  {
    id: "photos",
    before: "Range ",
    after: " photos dans la boîte.",
    answer: "ces",
    because: "Le nom est au pluriel, et ces sert aux deux genres.",
  },
  {
    id: "hotel",
    before: "Réservez ",
    after: " hôtel, il est moins cher.",
    answer: "cet",
    because: "Le h de hôtel est muet, donc la voyelle compte : cet hôtel.",
  },
  {
    id: "affiche",
    before: "Regarde ",
    after: " affiche : elle est magnifique.",
    answer: "cette",
    because:
      "« affiche » est féminin, et cet ne se met jamais devant un nom féminin : cette affiche.",
  },
  {
    id: "soir",
    before: "Nous partons ",
    after: " soir à sept heures.",
    answer: "ce",
    because: "Ce soir désigne le soir d’aujourd’hui : ce, masculin singulier.",
  },
  {
    id: "enfants",
    before: "Tu as vu ",
    after: " enfants dans la cour ?",
    answer: "ces",
    because: "Le nom est au pluriel : ces enfants.",
  },
  {
    id: "gateau",
    before: "Quel gâteau veux-tu ? Je prends ",
    after: "-là, au chocolat.",
    answer: "celui",
    because:
      "Le nom « gâteau » a déjà été dit, donc c’est le pronom : celui-là, masculin singulier.",
  },
  {
    id: "echarpe",
    before: "J’hésite entre ces deux écharpes : je prends ",
    after: "-ci, la bleue.",
    answer: "celle",
    because: "« écharpe » est féminin singulier : celle-ci.",
  },
  {
    id: "velo",
    before: "Mon vélo est ",
    after: " de mon frère.",
    answer: "celui",
    because: "Le pronom remplace « vélo », masculin singulier : celui de.",
  },
  {
    id: "cles",
    before: "Mes clés sont ",
    after: " du tiroir.",
    answer: "celles",
    because: "Le pronom remplace « clés », féminin pluriel : celles du tiroir.",
  },
  {
    id: "citron",
    before: "Parmi les gâteaux, je préfère ",
    after: " qui sont au citron.",
    answer: "ceux",
    because:
      "« sont » est au pluriel, et les gâteaux sont masculins : ceux qui sont.",
  },
  {
    id: "veste",
    before: "Cette veste est trop grande : essaie ",
    after: "-là.",
    answer: "celle",
    because: "Le pronom reprend « veste », féminin singulier : celle-là.",
  },
];

const B1: PickItem[] = [
  {
    id: "passe",
    before: "Je ne sais pas ",
    after: " qui s’est passé hier soir.",
    answer: "ce",
    because:
      "La chose n’a pas de nom, donc le pronom est ce, et « qui » lui donne le sujet du verbe.",
  },
  {
    id: "ecrit",
    before: "Je n’ai pas compris ",
    after: " que tu as écrit.",
    answer: "ce",
    because: "Un sujet suit (« tu »), donc ce que, et non ce qui.",
  },
  {
    id: "besoin",
    before: "Dis-moi ",
    after: " dont tu as besoin pour demain.",
    answer: "ce",
    because: "On a besoin de quelque chose : le verbe réclame de, donc ce dont.",
  },
  {
    id: "brille",
    before: "Tout ",
    after: " qui brille n’est pas or.",
    answer: "ce",
    because: "Après tout, la forme ne change pas : tout ce qui, tout ce que.",
  },
  {
    id: "candidats",
    before: "Parmi les candidats, ",
    after: " qui arrivent en retard ne passeront pas.",
    answer: "ceux",
    because:
      "Le pronom reprend « candidats », masculin pluriel, et « arrivent » le confirme.",
  },
  {
    id: "chambre",
    before: "Ma chambre est ",
    after: " du fond du couloir.",
    answer: "celle",
    because: "Le pronom reprend « chambre », féminin singulier : celle du fond.",
  },
  {
    id: "grand-pere",
    before: "Ces photos sont ",
    after: " de mon grand-père.",
    answer: "celles",
    because: "Le pronom reprend « photos », féminin pluriel : celles de.",
  },
  {
    id: "midi",
    before: "Le train de midi et ",
    after: " de treize heures sont complets.",
    answer: "celui",
    because:
      "Le pronom reprend un seul train, masculin singulier : celui de treize heures.",
  },
  {
    id: "exercices",
    before: "Ces exercices sont plus durs que ",
    after: " de la semaine dernière.",
    answer: "ceux",
    because: "Le pronom reprend « exercices », masculin pluriel : ceux de.",
  },
  {
    id: "robes",
    before: "De toutes ses robes, ",
    after: " qu’elle préfère est la bleue.",
    answer: "celle",
    because:
      "« la bleue » est au singulier : une seule robe est reprise, donc celle que.",
  },
  {
    id: "manteau",
    before: "Prends ",
    after: " manteau-là, il est plus chaud.",
    answer: "ce",
    because:
      "Le nom « manteau » est encore là, donc c’est le déterminant : ce manteau-là.",
  },
  {
    id: "gare",
    before: "Tu te souviens de ",
    after: " homme-là, à la gare ?",
    answer: "cet",
    because: "Le nom suit, masculin et devant une voyelle : cet homme-là.",
  },
  {
    id: "histoire",
    before: "Franchement, ",
    after: " histoire ne m’intéresse pas.",
    answer: "cette",
    because: "« histoire » est féminin, malgré la voyelle : cette histoire.",
  },
  {
    id: "annees",
    before: "Nous avons passé ",
    after: " années-là en Espagne.",
    answer: "ces",
    because: "Le nom est au pluriel, et -là le renvoie au récit : ces années-là.",
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
    if (item.because.length < 20) bad.push(at + ': correction trop courte')
  }
  for (const word of POOL) if (!used.has(word)) bad.push(level + ': « ' + word + ' » n_est jamais la réponse')
  console.log('--- ' + level + ' : ' + bank.length + ' phrases')
  for (const item of bank) console.log('   ' + item.before + item.answer + item.after)
}
console.log('phrases vérifiées:', items)
console.log('problèmes:', bad.length ? bad : 'aucun')
"
*/
