/**
 * « En, au ou aux ? » — des phrases à compléter, à l'A1 (`docs/levels/a1.md`).
 * Elles travaillent la page `vocabulaire/les-pays-et-les-nationalites` et elle
 * seule : aucun pays, aucune nationalité, aucune préposition qu'elle n'enseigne pas.
 *
 * **Un seul lot, pas de `sets`** : la page est écrite à l'A1 (`AGENTS.md` §7).
 * Le lot est exporté sous `BANKS`, clé `A1`, pour l'audit `nav-wiring`.
 *
 * **Deux sortes de phrases, toutes cliquées** :
 * - `lieu` / `origine` : la préposition d'un pays ou d'une ville. Le tirage
 *   est **fixe**, les huit formes toujours à l'écran dans le même ordre
 *   (lieu puis origine) : on retrouve le paradigme au lieu d'éliminer. Chaque
 *   forme est la réponse d'au moins une phrase ; la vérification le contrôle ;
 * - `nationalité` : les deux formes du même adjectif, masculin puis féminin.
 *   Le genre du sujet est **imprimé** (*il* / *elle*), jamais deviné d'un
 *   prénom. Seuls des adjectifs dont les deux formes **diffèrent** sont
 *   proposés : *belge*, *suisse*, *russe* ne feraient pas un vrai choix.
 *
 * **Une seule réponse défendable par phrase** : le pays fixe l'article
 * (`d’` devant voyelle, `de` devant consonne : « Je viens ___ Espagne » n'a
 * que `d’`) ; une ville prend toujours `à` / `de` ; *le Mexique* est masculin.
 * Le trou est toujours juste avant le nom, pour que `d’` se colle à lui.
 */

export const POOL = ["en", "au", "aux", "à", "d’", "de", "du", "des"] as const;

export type Kind = "lieu" | "origine" | "nationalité";

export interface Item {
  id: string;
  kind: Kind;
  /** Ce qui précède le trou. Jamais vide. */
  before: string;
  /** Ce qui suit le trou : le nom du lieu, ou vide pour une nationalité. */
  noun: string;
  /** Ponctuation et suite de la phrase. */
  after: string;
  /** Les formes proposées : `POOL` pour un lieu, [masculin, féminin] sinon. */
  options: readonly string[];
  answer: string;
  /** Espagnol ; les mots français entre `*astérisques*` (`lang="fr"`). */
  because: string;
}

const lieu = (
  id: string,
  before: string,
  noun: string,
  after: string,
  answer: string,
  because: string,
): Item => ({ id, kind: "lieu", before, noun, after, options: POOL, answer, because });

const origine = (
  id: string,
  before: string,
  noun: string,
  after: string,
  answer: string,
  because: string,
): Item => ({ id, kind: "origine", before, noun, after, options: POOL, answer, because });

const nationalite = (
  id: string,
  before: string,
  masculin: string,
  feminin: string,
  answer: "m" | "f",
  because: string,
): Item => ({
  id,
  kind: "nationalité",
  before,
  noun: "",
  after: ".",
  options: [masculin, feminin],
  answer: answer === "m" ? masculin : feminin,
  because,
});

export const ITEMS: Item[] = [
  lieu("fr", "J’habite", "France", ".", "en",
    "*France* es femenino (la France): *en France*."),
  lieu("pt", "Elle habite", "Portugal", ".", "au",
    "*Portugal* es masculino (le Portugal): *au Portugal*."),
  lieu("us", "J’habite", "États-Unis", ".", "aux",
    "*États-Unis* es plural: *aux États-Unis*."),
  lieu("mx", "Elle habite", "Mexique", ".", "au",
    "*Mexique* acaba en -e pero es masculino: *au Mexique*, no *en Mexique*."),
  lieu("lyon", "Tu habites où ? J’habite", "Lyon", ", en France.", "à",
    "Con una ciudad, siempre *à*: *à Lyon*."),
  lieu("chine", "Elle habite", "Chine", ".", "en",
    "*Chine* es femenino (la Chine): *en Chine*."),
  origine("es", "Je viens", "Espagne", ".", "d’",
    "País femenino que empieza por vocal: *de* pierde la e, *d’Espagne*."),
  origine("co", "Je viens", "Colombie", ".", "de",
    "País femenino que empieza por consonante: *de Colombie*."),
  origine("ma", "Il vient", "Maroc", ".", "du",
    "*Maroc* es masculino (le Maroc): *de + le* da *du Maroc*."),
  origine("us2", "Je viens", "États-Unis", ".", "des",
    "*États-Unis* es plural: *de + les* da *des États-Unis*."),
  origine("lima", "Il vient", "Lima", ", au Pérou.", "de",
    "Con una ciudad, siempre *de*: *de Lima*."),
  nationalite("n-es", "Elle vient d’Espagne. Elle est", "espagnol", "espagnole", "f",
    "*Elle* pide el femenino: *espagnole*."),
  nationalite("n-fr", "Il habite en France. Il est", "français", "française", "m",
    "*Il* pide el masculino: *français*."),
  nationalite("n-it", "Elle vient d’Italie. Elle est", "italien", "italienne", "f",
    "*Elle* pide el femenino: *italienne*."),
  nationalite("n-cn", "Elle habite en Chine. Elle est", "chinois", "chinoise", "f",
    "*Elle* pide el femenino: *chinoise*."),
  nationalite("n-mx", "Il habite au Mexique. Il est", "mexicain", "mexicaine", "m",
    "*Il* pide el masculino: *mexicain*."),
];

export const BANKS: Record<string, Item[]> = { A1: ITEMS };

export function bankFor(): Item[] {
  return BANKS.A1;
}

/** Espace avant le nom, sauf après `d’` et devant rien (nationalité). */
export function glue(form: string, item: Item): string {
  return form.endsWith("’") || item.noun === "" ? "" : " ";
}

/* Vérification, à relancer après toute modification : imprime les phrases
   corrigées (à relire), les comptes, et contrôle réponse dans les options,
   options sans doublon, deux formes différentes pour une nationalité, élision
   juste, chaque forme du tirage réponse d'au moins une phrase, pays et
   nationalités présents dans la page, ids uniques, astérisques pairs.

node --experimental-strip-types --input-type=module -e "
import { ITEMS, POOL, glue } from './src/app/exercices/en-au-ou-aux/data.ts'
import { readFileSync } from 'node:fs'
const page = readFileSync('./src/app/vocabulaire/les-pays-et-les-nationalites/page.tsx','utf8').replace(/<[^>]*>|\{\" \"\}/g,' ').replace(/\s+/g,' ').toLowerCase()
const bad = [], used = new Set(), kinds = {}
const vowel = /^[aeiouyéèêâîôûh]/i
for (const it of ITEMS) {
  kinds[it.kind] = (kinds[it.kind]||0)+1
  used.add(it.answer)
  if (!it.options.includes(it.answer)) bad.push(it.id+': réponse absente')
  if (new Set(it.options).size !== it.options.length) bad.push(it.id+': doublon')
  if (it.kind === 'nationalité') {
    if (it.options.length !== 2) bad.push(it.id+': pas deux formes')
    if (!/^(Il|Elle) est\$/.test(it.before.split('. ').pop())) bad.push(it.id+': genre non imprimé')
    const g = it.before.split('. ').pop().startsWith('Elle') ? 1 : 0
    if (it.options[g] !== it.answer) bad.push(it.id+': genre du sujet et réponse en désaccord')
    for (const o of it.options) if (!page.includes(o)) bad.push(it.id+': '+o+' absent de la page')
  } else {
    if (it.options !== POOL) bad.push(it.id+': tirage non fixe')
    const cityLike = ['Lyon','Lima'].includes(it.noun)
    if (cityLike && !['à','de'].includes(it.answer)) bad.push(it.id+': ville sans à/de')
    if (it.answer === 'd’' && !vowel.test(it.noun)) bad.push(it.id+': d’ devant consonne')
    if (it.answer === 'de' && !cityLike && vowel.test(it.noun)) bad.push(it.id+': de devant voyelle')
    if (!page.includes(it.noun.toLowerCase())) bad.push(it.id+': '+it.noun+' absent de la page')
    if (it.kind === 'lieu' && !/habite/.test(it.before)) bad.push(it.id+': lieu sans habiter')
    if (it.kind === 'origine' && !/vien|venons/.test(it.before)) bad.push(it.id+': origine sans venir')
  }
  if (it.because.split('*').length % 2 === 0) bad.push(it.id+': astérisque impair')
  console.log(it.kind.padEnd(12), (it.before+' '+it.answer+glue(it.answer,it)+it.noun+it.after))
}
for (const f of POOL) if (!used.has(f)) bad.push('pastille jamais réponse : '+f)
if (new Set(ITEMS.map(i=>i.id)).size !== ITEMS.length) bad.push('id en double')
console.log('items vérifiés:', ITEMS.length, kinds, 'formes du tirage utilisées:', POOL.filter(f=>used.has(f)).length+'/'+POOL.length)
console.log('problèmes:', bad.length ? bad : 'aucun')
"
*/
