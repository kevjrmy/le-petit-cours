/**
 * « Quel mot pour demander ? » — quatorze questions à compléter, à l'A1
 * (`docs/levels/a1.md`). Elles travaillent `grammaire/poser-une-question`.
 *
 * **Un seul lot, pas de `sets`** : page écrite à l'A1, elle ne monte pas
 * (`AGENTS.md` §7). Le lot est exporté sous `BANKS`, clé `A1`, pour l'audit.
 *
 * **Le tirage est fixe** : les douze mots restent à l'écran, toujours dans le
 * même ordre (les mots invariables, puis `quel` et ses trois formes, puis
 * `est-ce que`). L'apprenant retrouve le paradigme au lieu d'éliminer.
 * Aucune pastille n'est un piège : chacune est la réponse d'au moins une
 * question, et la vérification en bas de fichier le contrôle.
 *
 * **Chaque question n'a qu'une réponse défendable, et c'est la réponse
 * donnée (`reply`) qui la garantit** : *À Valence* ne répond qu'à *où*,
 * *Demain* qu'à *quand*. Pour `quel`, le nom impose la forme (*âge*, *bus*
 * masculins ; *heure* féminin ; *films* masculin pluriel ; *langues* féminin
 * pluriel). `est-ce que` s'entend d'une réponse *oui* ou *non*, et le mot qui
 * suit le trou est une consonne : aucun `qu’` à élider.
 * Le trou est une fois au début de la phrase (majuscule), une fois à la fin.
 *
 * **Rien hors de la page** : ni *quoi*, ni l'inversion (*Parles-tu…*).
 *
 * **Fixe pour les pastilles, mélangé pour les questions** : le tirage est
 * mélangé avec `shuffle()` dans le plateau, chargé sans rendu serveur.
 */

export const POOL = [
  "qui",
  "où",
  "quand",
  "comment",
  "combien",
  "pourquoi",
  "qu’est-ce que",
  "quel",
  "quelle",
  "quels",
  "quelles",
  "est-ce que",
] as const;
export type Word = (typeof POOL)[number];

export interface QuestionItem {
  /** Permanent within this file: the key React renders by. */
  id: string;
  /** Ce qui précède le trou ; vide si le trou ouvre la phrase. */
  before: string;
  /** Ce qui suit le trou, espace et ponctuation comprises (` ?`). */
  after: string;
  /** La réponse donnée, qui tranche. */
  reply: string;
  answer: Word;
  /** Espagnol : la correction pointe la règle. Les mots français y sont
   *  entre `*astérisques*` : le plateau leur donne `lang="fr"`. */
  because: string;
}

const N = " "; // espace insécable avant « ? »

export const ITEMS: QuestionItem[] = [
  {
    id: "habiter",
    before: "",
    after: ` tu habites${N}?`,
    reply: "À Valence.",
    answer: "où",
    because:
      "La respuesta es un lugar (*À Valence*): se pregunta con *où*. Ojo: *où* lleva acento, y solo él.",
  },
  {
    id: "parler-a",
    before: "Tu parles à",
    after: `${N}?`,
    reply: "À ma sœur.",
    answer: "qui",
    because: "La respuesta es una persona, «quién»: *qui*. Sin tilde, como todas.",
  },
  {
    id: "partir",
    before: "Tu pars",
    after: `${N}?`,
    reply: "Demain.",
    answer: "quand",
    because: "*Demain* es un momento, «cuándo»: *quand*.",
  },
  {
    id: "appeler",
    before: "Tu t’appelles",
    after: `${N}?`,
    reply: "Je m’appelle Lucas.",
    answer: "comment",
    because: "Se pregunta por el nombre, «cómo»: *comment*. Ninguna de estas palabras lleva acento.",
  },
  {
    id: "prix",
    before: "Ça coûte",
    after: `${N}?`,
    reply: "Dix euros.",
    answer: "combien",
    because: "La respuesta es una cantidad, «cuánto»: *combien*.",
  },
  {
    id: "etudier",
    before: "",
    after: ` tu étudies le français${N}?`,
    reply: "Parce que j’aime ça.",
    answer: "pourquoi",
    because:
      "*Parce que* es la respuesta a una causa: la pregunta es *pourquoi*, «por qué». Se escribe en dos palabras, y *pourquoi* pregunta, *parce que* responde.",
  },
  {
    id: "manger",
    before: "",
    after: ` tu manges${N}?`,
    reply: "Une pomme.",
    answer: "qu’est-ce que",
    because:
      "Se pregunta por una cosa (*une pomme*) y la palabra va al principio: *qu’est-ce que*. Al principio de la frase no se dice *quoi*.",
  },
  {
    id: "age",
    before: "Tu as",
    after: ` âge${N}?`,
    reply: "J’ai dix ans.",
    answer: "quel",
    because: "«Qué» delante de un nombre es *quel*, no *que*. *Âge* es masculino singular: *quel âge*.",
  },
  {
    id: "bus",
    before: "Tu prends",
    after: ` bus${N}?`,
    reply: "Le bus 12.",
    answer: "quel",
    because: "«Qué» delante de un nombre: *quel*. *Bus* es masculino singular: *quel bus*.",
  },
  {
    id: "heure",
    before: "",
    after: ` heure est-il${N}?`,
    reply: "Il est trois heures.",
    answer: "quelle",
    because:
      "*Heure* es femenino singular, así que *quelle*. *Que heure est-il* no existe: *quelle heure est-il*.",
  },
  {
    id: "films",
    before: "Tu aimes",
    after: ` films${N}?`,
    reply: "J’aime les films d’action.",
    answer: "quels",
    because: "*Films* es masculino plural: *quels films*. Suena igual que *quel*, pero se escribe con -s.",
  },
  {
    id: "langues",
    before: "",
    after: ` langues tu parles${N}?`,
    reply: "Le français et l’espagnol.",
    answer: "quelles",
    because:
      "*Langues* es femenino plural: *quelles langues*. Las cuatro formas suenan igual, solo se distinguen al escribir.",
  },
  {
    id: "parler-francais",
    before: "",
    after: ` tu parles français${N}?`,
    reply: "Oui, un peu.",
    answer: "est-ce que",
    because:
      "La respuesta es *oui*: es una pregunta de «sí o no», y *est-ce que* va al principio y no cambia el resto.",
  },
  {
    id: "frere",
    before: "",
    after: ` ton frère habite à Paris${N}?`,
    reply: "Non, à Lyon.",
    answer: "est-ce que",
    because:
      "La respuesta empieza por *non*: pregunta de «sí o no», con *est-ce que* al principio.",
  },
];

export const BANKS: Record<string, QuestionItem[]> = { A1: ITEMS };

export function bankFor(): QuestionItem[] {
  return BANKS.A1;
}

/** Le mot du trou, avec une majuscule si la phrase commence par lui. */
export function shown(item: QuestionItem, word: string): string {
  return item.before === "" ? word[0].toUpperCase() + word.slice(1) : word;
}

/* Vérification, à relancer après toute modification. Elle imprime les quatorze
   questions corrigées, le compte, et les contrôles : réponse dans le tirage,
   chaque pastille réponse au moins une fois, ids uniques, pas de doublon dans
   le tirage, astérisques pairs, aucun est-ce que devant une voyelle ou un h muet
   (il faudrait `qu’`), aucun quel/quelle mal accordé.

node --experimental-strip-types --input-type=module -e "
import { ITEMS, POOL, shown } from './src/app/exercices/quel-mot-pour-demander/data.ts'
const bad = [], used = new Set()
const gender = { âge: 'quel', bus: 'quel', heure: 'quelle', films: 'quels', langues: 'quelles' }
for (const it of ITEMS) {
  used.add(it.answer)
  if (!POOL.includes(it.answer)) bad.push(it.id + ': réponse absente du tirage')
  if (it.because.split('*').length % 2 === 0) bad.push(it.id + ': astérisque impair')
  if (it.answer === 'est-ce que' && /^ [aeiouyéèêhâî]/i.test(it.after)) bad.push(it.id + ': est-ce que devant voyelle (il faudrait qu’)')
  if (!it.reply) bad.push(it.id + ': pas de réponse donnée')
  if (it.answer.startsWith('quel')) {
    const noun = it.after.trim().split(/[\s ]/)[0]
    if (gender[noun] !== it.answer) bad.push(it.id + ': quel mal accordé avec ' + noun)
  }
  console.log(shown(it, it.answer).padEnd(14), (it.before + ' ' + it.answer + it.after).trim(), '—', it.reply)
}
for (const w of POOL) if (!used.has(w)) bad.push('pastille jamais réponse : ' + w)
if (new Set(POOL).size !== POOL.length) bad.push('doublon dans le tirage')
if (new Set(ITEMS.map(i => i.id)).size !== ITEMS.length) bad.push('id en double')
console.log('items vérifiés:', ITEMS.length, '| mots utilisés:', used.size + '/' + POOL.length)
console.log('problèmes:', bad.length ? bad : 'aucun')
"
*/
