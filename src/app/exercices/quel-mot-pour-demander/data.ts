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

import type { Bi } from "../bilingue";

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
  /** La correction pointe la règle, dans les deux langues. L’espagnol marque
   *  son français entre `*astérisques*`, le français son espagnol entre
   *  `~tildes~` : le plateau leur donne leur `lang`. */
  because: Bi;
}

const N = " "; // espace insécable avant « ? »

export const ITEMS: QuestionItem[] = [
  {
    id: "habiter",
    before: "",
    after: ` tu habites${N}?`,
    reply: "À Valence.",
    answer: "où",
    because: {
      es: "La respuesta es un lugar (*À Valence*): se pregunta con *où*. Ojo: *où* lleva acento, y solo él.",
      fr: "La réponse est un lieu (« À Valence ») : on demande avec « où ». Attention : « où » a un accent, et lui seul.",
    },
  },
  {
    id: "parler-a",
    before: "Tu parles à",
    after: `${N}?`,
    reply: "À ma sœur.",
    answer: "qui",
    because: {
      es: "La respuesta es una persona, «quién»: *qui*. Sin tilde, como todas.",
      fr: "La réponse est une personne, ~quién~ : « qui ». Sans accent, comme tous les autres.",
    },
  },
  {
    id: "partir",
    before: "Tu pars",
    after: `${N}?`,
    reply: "Demain.",
    answer: "quand",
    because: {
      es: "*Demain* es un momento, «cuándo»: *quand*.",
      fr: "« Demain » est un moment, ~cuándo~ : « quand ».",
    },
  },
  {
    id: "appeler",
    before: "Tu t’appelles",
    after: `${N}?`,
    reply: "Je m’appelle Lucas.",
    answer: "comment",
    because: {
      es: "Se pregunta por el nombre, «cómo»: *comment*. De estas palabras, solo *où* lleva acento.",
      fr: "On demande le nom, ~cómo~ : « comment ». Seul « où » a un accent.",
    },
  },
  {
    id: "prix",
    before: "Ça coûte",
    after: `${N}?`,
    reply: "Dix euros.",
    answer: "combien",
    because: {
      es: "La respuesta es una cantidad, «cuánto»: *combien*.",
      fr: "La réponse est une quantité, ~cuánto~ : « combien ».",
    },
  },
  {
    id: "etudier",
    before: "",
    after: ` tu étudies le français${N}?`,
    reply: "Parce que j’aime ça.",
    answer: "pourquoi",
    because: {
      es: "*Parce que* es la respuesta a una causa: la pregunta es *pourquoi*, «por qué». Se escribe en dos palabras, y *pourquoi* pregunta, *parce que* responde.",
      fr: "« Parce que » répond à une cause : la question est « pourquoi », ~por qué~. « Pourquoi » s’écrit en un mot et pose la question ; « parce que » s’écrit en deux mots et donne la réponse.",
    },
  },
  {
    id: "manger",
    before: "",
    after: ` tu manges${N}?`,
    reply: "Une pomme.",
    answer: "qu’est-ce que",
    because: {
      es: "Se pregunta por una cosa (*une pomme*) y la palabra va al principio: *qu’est-ce que*. Al principio de la frase no se dice *quoi*.",
      fr: "On demande une chose (« une pomme ») et le mot est au début : « qu’est-ce que ». Au début de la phrase, on ne dit pas « quoi ».",
    },
  },
  {
    id: "age",
    before: "Tu as",
    after: ` âge${N}?`,
    reply: "J’ai dix ans.",
    answer: "quel",
    because: {
      es: "«Qué» delante de un nombre es *quel*, no *que*. *Âge* es masculino singular: *quel âge*.",
      fr: "~Qué~ devant un nom, c’est « quel », pas « que ». « Âge » est masculin singulier : « quel âge ».",
    },
  },
  {
    id: "bus",
    before: "Tu prends",
    after: ` bus${N}?`,
    reply: "Le bus 12.",
    answer: "quel",
    because: {
      es: "«Qué» delante de un nombre: *quel*. *Bus* es masculino singular: *quel bus*.",
      fr: "~Qué~ devant un nom : « quel ». « Bus » est masculin singulier : « quel bus ».",
    },
  },
  {
    id: "heure",
    before: "",
    after: ` heure est-il${N}?`,
    reply: "Il est trois heures.",
    answer: "quelle",
    because: {
      es: "*Heure* es femenino singular, así que *quelle*. *Que heure est-il* no existe: *quelle heure est-il*.",
      fr: "« Heure » est féminin singulier, donc « quelle ». « Que heure est-il » n’existe pas : « quelle heure est-il ».",
    },
  },
  {
    id: "films",
    before: "Tu aimes",
    after: ` films${N}?`,
    reply: "J’aime les films d’action.",
    answer: "quels",
    because: {
      es: "*Films* es masculino plural: *quels films*. Suena igual que *quel*, pero se escribe con -s.",
      fr: "« Films » est masculin pluriel : « quels films ». Il sonne comme « quel », mais s’écrit avec un -s.",
    },
  },
  {
    id: "langues",
    before: "",
    after: ` langues tu parles${N}?`,
    reply: "Le français et l’espagnol.",
    answer: "quelles",
    because: {
      es: "*Langues* es femenino plural: *quelles langues*. Las cuatro formas suenan igual, solo se distinguen al escribir.",
      fr: "« Langues » est féminin pluriel : « quelles langues ». Les quatre formes sonnent pareil, on les distingue seulement à l’écrit.",
    },
  },
  {
    id: "parler-francais",
    before: "",
    after: ` tu parles français${N}?`,
    reply: "Oui, un peu.",
    answer: "est-ce que",
    because: {
      es: "La respuesta es *oui*: es una pregunta de «sí o no», y *est-ce que* va al principio y no cambia el resto.",
      fr: "La réponse est « oui » : c’est une question ~de sí o no~, et « est-ce que » se place au début sans changer le reste.",
    },
  },
  {
    id: "frere",
    before: "",
    after: ` ton frère habite à Paris${N}?`,
    reply: "Non, à Lyon.",
    answer: "est-ce que",
    because: {
      es: "La respuesta empieza por *non*: pregunta de «sí o no», con *est-ce que* al principio.",
      fr: "La réponse commence par « non » : question ~de sí o no~, avec « est-ce que » au début.",
    },
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
  if (it.because.es.split('*').length % 2 === 0 || it.because.fr.split('~').length % 2 === 0) bad.push(it.id + ': astérisque impair')
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
