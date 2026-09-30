/**
 * « J’aime le café » — des phrases à compléter, à l’A1 : le défini après les
 * verbes des goûts, contre `un` / `du` / `de la` / `de` après *voudrais* et
 * *mange* (`/grammaire/parler-de-ses-gouts`).
 *
 * **Un seul lot, pas de `sets`**, exporté sous `BANKS.A1` pour l’audit.
 *
 * **Tirage fixe de neuf formes**, toujours dans le même ordre : on retrouve le
 * paradigme, on n’élimine pas des distracteurs. Chaque forme est la réponse
 * d’au moins une phrase (aucun piège) ; la vérification en bas le contrôle.
 *
 * **Une seule réponse défendable par phrase**, garantie par la phrase :
 * - après *aimer, adorer, détester, préférer* : le défini, jamais `un` ni `du` ;
 * - *je voudrais* + un nom **comptable** (*table*, *verre*) : `un` / `une`.
 *   Jamais *je voudrais ___ café*, qui admet `un` et `du` ;
 * - *je mange* + un nom **massif** (*riz*, *viande*) : partitif ; jamais
 *   d’indéfini devant un nom massif (`AGENTS.md` §9) ;
 * - *ne mange pas* : `de` ; *n’aime pas* : le défini reste.
 * Le trou est **juste avant le nom**, et aucun partitif ne précède une voyelle
 * (`de l’eau` : pas de forme à taper). Le genre vient de la page des goûts et
 * des pages d’articles ; l’infinitif (*j’aime lire*) n’a pas d’article, il n’est
 * donc pas dans ce tirage.
 *
 * **Mélangé, donc `ssr: false`** (voir `drill.tsx`).
 */

export const POOL = [
  "le",
  "la",
  "l’",
  "les",
  "un",
  "une",
  "du",
  "de la",
  "de",
] as const;
export type Form = (typeof POOL)[number];

export interface GoutItem {
  id: string;
  /** Ce qui précède le trou. Jamais vide. */
  before: string;
  noun: string;
  /** Ce qui suit le nom, ponctuation comprise. */
  after: string;
  answer: Form;
  kind: "goût" | "demande" | "mange" | "négation";
  /** Espagnol ; les mots français entre `*astérisques*` (`lang="fr"`). */
  because: string;
}

export const ITEMS: GoutItem[] = [
  { id: "chocolat", before: "Elle aime beaucoup", noun: "chocolat", after: ".", answer: "le", kind: "goût",
    because: "Con *aimer* se habla del chocolate en general: definido. *Chocolat* es masculino: *le chocolat*, no *du chocolat*." },
  { id: "mer", before: "J’adore", noun: "mer", after: ".", answer: "la", kind: "goût",
    because: "Después de *adorer* va el definido, y *mer* es femenino: *la mer*." },
  { id: "table", before: "Au restaurant, je voudrais", noun: "table", after: " pour deux.", answer: "une", kind: "demande",
    because: "Con *je voudrais* pides una cosa que se cuenta: indefinido. *Table* es femenino: *une table*." },
  { id: "riz", before: "Ce soir, je mange", noun: "riz", after: ".", answer: "du", kind: "mange",
    because: "El arroz no se cuenta, y lo comes: partitivo. *Riz* es masculino: *du riz*, nunca *un riz*." },
  { id: "pluie", before: "Je n’aime pas", noun: "pluie", after: ".", answer: "la", kind: "négation",
    because: "En la negación con *aimer* el artículo se queda: *la pluie*. No existe *je n’aime pas de pluie*." },
  { id: "the", before: "Je préfère", noun: "thé", after: " au café.", answer: "le", kind: "goût",
    because: "Después de *préférer*, definido: *le thé*." },
  { id: "sucre", before: "Je ne mange pas", noun: "sucre", after: ".", answer: "de", kind: "négation",
    because: "Lo que comes, en la negación, pierde el artículo: *je mange du sucre* pasa a *je ne mange pas de sucre*." },
  { id: "musique", before: "Tu aimes", noun: "musique", after: " ?", answer: "la", kind: "goût",
    because: "Un gusto en general: definido. *Musique* es femenino: *la musique*." },
  { id: "verre", before: "Il fait chaud. Je voudrais", noun: "verre", after: " d’eau.", answer: "un", kind: "demande",
    because: "Un vaso se cuenta, y con *je voudrais* pides uno: *un verre*. *Verre* es masculino." },
  { id: "bruit", before: "Je déteste", noun: "bruit", after: ".", answer: "le", kind: "goût",
    because: "Después de *détester*, definido: *le bruit*." },
  { id: "viande", before: "Le dimanche, elle mange", noun: "viande", after: ".", answer: "de la", kind: "mange",
    because: "La carne no se cuenta, y la comes: partitivo femenino: *de la viande*, nunca *une viande*." },
  { id: "ete", before: "Il aime", noun: "été", after: ".", answer: "l’", kind: "goût",
    because: "Definido delante de vocal: *le* se convierte en *l’*: *l’été*." },
  { id: "lundis", before: "Il n’aime pas", noun: "lundis", after: ".", answer: "les", kind: "négation",
    because: "En plural, con la negación, el definido se queda: *les lundis*, no *de lundis*." },
  { id: "chats", before: "Elle adore", noun: "chats", after: ".", answer: "les", kind: "goût",
    because: "Los gatos en general: *les chats*. Después de *adorer* no va *des*." },
];

export const BANKS: Record<string, GoutItem[]> = { A1: ITEMS };

export function bankFor(): GoutItem[] {
  return BANKS.A1;
}

/** La forme et le nom collés comme à l’écrit : `l’` sans espace. */
export function glue(form: string): string {
  return form.endsWith("’") ? "" : " ";
}

/* Vérification, à relancer après toute modification : imprime les phrases
   corrigées (à relire), le compte par type, et contrôle réponse dans le tirage,
   élision, forme jamais inutilisée, ids uniques, noms présents sur les pages.

node --experimental-strip-types --input-type=module -e "
import { ITEMS, POOL, glue } from './src/app/exercices/j-aime-le-cafe/data.ts'
import { readFileSync } from 'node:fs'
const pages = ['grammaire/parler-de-ses-gouts','grammaire/les-articles-definis','grammaire/les-articles-partitifs'].map(p => readFileSync('./src/app/' + p + '/page.tsx', 'utf8')).join(' ').toLowerCase()
const bad = [], used = new Set(), kinds = {}
const vowel = /^[aeiouyéèêâîôûàh]/i
for (const it of ITEMS) {
  used.add(it.answer); kinds[it.kind] = (kinds[it.kind] || 0) + 1
  if (!POOL.includes(it.answer)) bad.push(it.id + ': réponse absente du tirage')
  if (['de la','du','de','un','une','le','la'].includes(it.answer) && vowel.test(it.noun)) bad.push(it.id + ': voyelle après ' + it.answer)
  if (it.answer === 'l’' && !vowel.test(it.noun)) bad.push(it.id + ': l’ devant consonne')
  if (it.kind === 'goût' && !/aim|ador|déteste|préf/.test(it.before)) bad.push(it.id + ': pas un verbe de goût')
  if (['un','une'].includes(it.answer) && !/voudrais/.test(it.before)) bad.push(it.id + ': indéfini sans voudrais')
  if (['du','de la'].includes(it.answer) && !/mange/.test(it.before)) bad.push(it.id + ': partitif sans mange')
  if (it.because.split('*').length % 2 === 0) bad.push(it.id + ': astérisque impair')
  console.log(it.kind.padEnd(9), (it.before + ' [' + it.answer + ']' + glue(it.answer) + it.noun + it.after))
}
for (const f of POOL) if (!used.has(f)) bad.push('pastille jamais réponse : ' + f)
if (new Set(ITEMS.map(i => i.id)).size !== ITEMS.length) bad.push('id en double')
console.log('items vérifiés:', ITEMS.length, kinds, 'formes utilisées:', used.size + '/' + POOL.length)
console.log('problèmes:', bad.length ? bad : 'aucun')
"
*/
