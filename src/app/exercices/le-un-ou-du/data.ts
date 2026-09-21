import type { Level } from "@/data/navigation";

/**
 * « Le, un ou du ? » — un texte à trous par niveau, et un tirage d'articles.
 *
 * **Un texte, pas quatorze phrases isolées.** L'article ne se choisit pas dans
 * une phrase seule : c'est le paragraphe qui décide. *Un chien* devient *le
 * chien* à la ligne suivante parce qu'on en a déjà parlé, et aucune phrase
 * détachée ne peut demander ça. C'est la raison d'être de cette mécanique, et
 * la raison pour laquelle ce plateau n'a pas de deck à mélanger.
 *
 * **Un lot par niveau** (`docs/decisions.md` #68). La mécanique ne bouge pas,
 * le texte oui : l'A2 fait travailler les trois séries et le passage de l'une
 * à l'autre ; le B1 y ajoute la pastille **rien**, parce que son sujet est
 * l'article qui ne s'écrit pas.
 *
 * **Chaque trou n'a qu'une réponse défendable, et c'est le texte qui s'en
 * charge** : un verbe de goût impose le défini, une quantité impose `de`, une
 * négation aussi, un superlatif impose le défini, une voyelle impose l'élision.
 * Un trou qu'on peut remplir de deux façons est un trou cassé, pas une question
 * difficile — **avec une exception documentée**, le premier trou du lot B1 :
 * *je suis professeur* est la forme neutre, et *je suis un professeur* n'est
 * pas agrammatical, seulement marqué et normalement introduit par *c'est*. La
 * correction du trou le dit plutôt que de faire comme si la question ne se
 * posait pas.
 *
 * **Type-only import**, comme partout ici : l'audit `nav-wiring` lit `BANKS`
 * avec `node` tout court (`AGENTS.md` §8).
 */

/** Ce que la pastille « rien » veut dire : l'article ne s'écrit pas. */
export const NOTHING = "rien";

export interface Blank {
  /** Permanent within this file: the key React renders by. */
  id: string;
  /** La réponse, qui doit figurer dans le tirage du lot. */
  answer: string;
  /** Montré après coup, et il corrige au lieu de répéter la règle. */
  because: string;
}

/** Le texte, coupé aux trous : une chaîne est du texte, le reste est un trou. */
export type Piece = string | Blank;

export interface Bank {
  /** Les pastilles, dans un ordre fixe du début à la fin de la partie. */
  pool: string[];
  text: Piece[];
}

/* Les articles, dans l'ordre du cours : les définis, les indéfinis, les
   partitifs, puis `de` tout seul. L'ordre ne change jamais — on retrouve le
   paradigme, on ne le redécouvre pas. */
const ARTICLES = [
  "le",
  "la",
  "l’",
  "les",
  "un",
  "une",
  "des",
  "du",
  "de la",
  "de l’",
  "de",
];

const A2: Bank = {
  pool: ARTICLES,
  text: [
    "Hier, j’ai vu ",
    {
      id: "chien-1",
      answer: "un",
      because:
        "C’est la première fois qu’on en parle : un chien, que personne ne connaît encore.",
    },
    " chien devant la boulangerie. Ce matin, ",
    {
      id: "chien-2",
      answer: "le",
      because:
        "On vient d’en parler une ligne plus haut : le chien, celui d’hier.",
    },
    " chien était encore là, devant ",
    {
      id: "entree",
      answer: "l’",
      because:
        "Entrée commence par une voyelle, donc l’, et celle du magasin est une entrée précise.",
    },
    "entrée du magasin. Je suis entrée acheter ",
    {
      id: "baguette",
      answer: "une",
      because: "Une baguette se compte, comme les deux croissants qui suivent.",
    },
    " baguette et deux croissants. Il faut toujours ",
    {
      id: "lait-1",
      answer: "du",
      because:
        "Le lait ne se compte pas : il faut du lait, et jamais un lait.",
    },
    " lait à la maison, alors j’ai pris une bouteille. Ma fille n’aime pas ",
    {
      id: "lait-2",
      answer: "le",
      because:
        "Aimer ne prend pas une part : l’article reste défini, même après une négation.",
    },
    " lait, mais elle adore ",
    {
      id: "gateaux",
      answer: "les",
      because: "Adorer parle des gâteaux en général : l’article défini pluriel.",
    },
    " gâteaux au chocolat. Pour en faire un, il faut ",
    {
      id: "farine",
      answer: "de la",
      because: "Farine est féminin et ne se compte pas : de la farine.",
    },
    " farine, ",
    {
      id: "oeufs",
      answer: "des",
      because:
        "Les œufs se comptent, mais on ne dit pas combien : des œufs, jamais œufs tout seul.",
    },
    " œufs, ",
    {
      id: "eau",
      answer: "de l’",
      because: "Eau commence par une voyelle : de l’eau.",
    },
    "eau et un peu ",
    {
      id: "sucre",
      answer: "de",
      because: "Après un peu, l’article disparaît et il ne reste que de.",
    },
    " sucre. Le soir, je ne bois jamais ",
    {
      id: "cafe",
      answer: "de",
      because: "Après une négation, du café devient de café.",
    },
    " café : je préfère ",
    {
      id: "tisane",
      answer: "la",
      because:
        "Préférer parle de la tisane en général, comme aimer : l’article reste défini.",
    },
    " tisane. C’est la boulangerie la plus chère ",
    {
      id: "quartier",
      answer: "du",
      because: "De et le se soudent : de le quartier ne s’écrit pas, du quartier oui.",
    },
    " quartier, mais c’est la meilleure.",
  ],
};

const B1: Bank = {
  /* La pastille de plus, et le sujet du lot : l'article qui ne s'écrit pas. */
  pool: [...ARTICLES, NOTHING],
  text: [
    "Depuis septembre, je suis ",
    {
      id: "professeur",
      answer: NOTHING,
      because:
        "Après être, un nom de métier s’écrit sans article. Avec un article, la phrase changerait de forme et commencerait par c’est : c’est un professeur de français.",
    },
    " professeur de français dans un lycée. Je pars tous les matins en ",
    {
      id: "voiture",
      answer: NOTHING,
      because: "En voiture, en train, en bus : en ne prend jamais d’article.",
    },
    " voiture, et j’arrive avant huit heures. Il y a ",
    {
      id: "eleves",
      answer: "des",
      because:
        "Un pluriel dont on ne dit pas le nombre : des élèves, jamais élèves tout seul.",
    },
    " élèves qui n’ouvrent jamais leur livre : ils font beaucoup ",
    {
      id: "fautes",
      answer: "de",
      because: "Après beaucoup, il ne reste que de.",
    },
    " fautes, mais ils ont ",
    {
      id: "courage",
      answer: "du",
      because: "Le courage ne se compte pas : avoir du courage.",
    },
    " courage. Ils ont surtout besoin ",
    {
      id: "patience",
      answer: "de",
      because:
        "Avoir besoin de : le verbe réclame déjà de, et l’article ne revient pas derrière.",
    },
    " patience, et je n’ai pas toujours ",
    {
      id: "temps",
      answer: "de",
      because: "Après une négation, du temps devient de temps.",
    },
    " temps. À ",
    {
      id: "entree",
      answer: "l’",
      because: "Entrée commence par une voyelle, et celle du lycée est précise.",
    },
    "entrée du lycée, il y a ",
    {
      id: "fille",
      answer: "une",
      because:
        "On la présente pour la première fois, et elle se compte : une élève.",
    },
    " élève qui attend chaque matin ; elle a ",
    {
      id: "chance",
      answer: "de la",
      because: "La chance ne se compte pas, et le nom est féminin : de la chance.",
    },
    " chance, ",
    {
      id: "autres",
      answer: "les",
      because: "Les autres, ce sont tous ceux qui restent : l’article est défini.",
    },
    " autres l’ont adoptée. À la fin ",
    {
      id: "annee",
      answer: "de l’",
      because: "Année commence par une voyelle : la fin de l’année.",
    },
    "année, ils passent ",
    {
      id: "examen",
      answer: "un",
      because:
        "Un examen se compte, et on n’a pas encore dit lequel : un examen difficile.",
    },
    " examen difficile. Le soir, je rentre à ",
    {
      id: "maison",
      answer: "la",
      because: "À et la ne se soudent pas : à la maison, comme à l’école.",
    },
    " maison, je bois ",
    {
      id: "the",
      answer: "du",
      because: "Le thé se prend par quantité : boire du thé.",
    },
    " thé sans ",
    {
      id: "sucre",
      answer: NOTHING,
      because: "Sans fait tomber l’article : un thé sans sucre.",
    },
    " sucre. C’est ",
    {
      id: "metier",
      answer: "le",
      because:
        "Un superlatif désigne une chose unique : le métier le plus fatigant.",
    },
    " métier le plus fatigant que je connaisse.",
  ],
};

export const BANKS: Record<string, Bank> = { A2, B1 };

export function bankFor(level: Level | null): Bank {
  return (level && BANKS[level]) || BANKS[Object.keys(BANKS)[0]];
}

export function blanksOf(bank: Bank): Blank[] {
  return bank.text.filter((piece): piece is Blank => typeof piece !== "string");
}

/* Vérification, à relancer après toute modification. Elle imprime le texte
   reconstruit avec ses réponses : un trou à deux réponses défendables ne se
   voit pas dans les données, il se voit en relisant le paragraphe
   (`AGENTS.md` §9). Le compte est imprimé avant le verdict, pour qu'un
   contrôle qui ne trouve rien échoue bruyamment.

node --experimental-strip-types --input-type=module -e "
import { BANKS, NOTHING, blanksOf } from './src/app/exercices/le-un-ou-du/data.ts'
const bad = []
let blanks = 0
for (const [level, bank] of Object.entries(BANKS)) {
  const list = blanksOf(bank)
  const used = new Set()
  if (new Set(list.map(b => b.id)).size !== list.length) bad.push(level + ': id en double')
  for (const b of list) {
    blanks++
    used.add(b.answer)
    if (!bank.pool.includes(b.answer)) bad.push(level + '/' + b.id + ': réponse absente du tirage')
    if (b.because.length < 20) bad.push(level + '/' + b.id + ': correction trop courte')
  }
  for (const word of bank.pool) if (!used.has(word)) bad.push(level + ': la pastille « ' + word + ' » nest jamais la réponse')
  const filled = bank.text.map(p => typeof p === 'string' ? p : (p.answer === NOTHING ? '' : p.answer)).join('')
  console.log('--- ' + level + ' : ' + list.length + ' trous, ' + bank.pool.length + ' pastilles')
  console.log(filled.replace(/ +/g, ' '))
}
console.log('trous vérifiés:', blanks)
console.log('problèmes:', bad.length ? bad : 'aucun')
"
*/
