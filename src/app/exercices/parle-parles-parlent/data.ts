/**
 * « Parle, parles, parlent » — quinze phrases à compléter, à l'A1
 * (`docs/levels/a1.md`), pour la leçon `grammaire/les-verbes-en-er`.
 *
 * **Un seul lot, pas de `sets`** : la page est écrite à l'A1 (`AGENTS.md` §7).
 * Exporté sous `BANKS`, clé `A1`, pour l'audit `nav-wiring`.
 *
 * **Deux gestes, deux tirages fixes** (jamais mélangés, `exercise-author.md`) :
 * - `fin` : le sujet et le radical sont écrits, on clique la **terminaison**
 *   parmi les six de la leçon. `eons` (*nous mangeons*) est la sixième ;
 * - `sujet` : `je` ou `j’` devant le verbe.
 * La terminaison ne s'entend pas (*parle / parles / parlent*), c'est justement
 * ce qu'on travaille : le sujet, écrit, est le seul indice, et il suffit.
 *
 * **Une seule réponse défendable** : chaque phrase porte son sujet, et le
 * verbe est donné à l'infinitif à côté du trou. Aucun trou n'est suivi d'une
 * voyelle (la terminaison est collée au radical, le sujet est le seul trou
 * devant une voyelle et son élision est la réponse).
 * *Il / ils*, *elle / elles* sont décidés par le sujet écrit, y compris un
 * groupe nominal (*Mes parents*).
 *
 * Le vocabulaire vient de la leçon (parler, habiter, travailler, aimer,
 * regarder, écouter, manger) et des pages de la maison et des articles.
 * Aucun `-ger` autre que *manger*, aucun verbe irrégulier.
 */

export const ENDINGS = ["e", "es", "ons", "eons", "ez", "ent"] as const;
export const SUBJECTS = ["je", "j’"] as const;

export interface VerbItem {
  /** Permanent within this file: the key React renders by. */
  id: string;
  kind: "fin" | "sujet";
  /** Ce qui précède le trou : sujet + radical (`fin`), rien (`sujet`). */
  before: string;
  /** Ce qui suit le trou, ponctuation comprise. */
  after: string;
  /** Le verbe à l’infinitif, montré à côté de la phrase. */
  verb: string;
  answer: string;
  /** Espagnol ; les mots français entre `*astérisques*` (`lang="fr"`). */
  because: string;
}

export const ITEMS: VerbItem[] = [
  { id: "je-parle", kind: "fin", before: "Je parl", after: " français.", verb: "parler", answer: "e",
    because: "Con *je*, la terminación es *-e*: *je parle*. No se oye, pero se escribe." },
  { id: "tu-travailles", kind: "fin", before: "Tu travaill", after: " à Lyon.", verb: "travailler", answer: "es",
    because: "Con *tu*, siempre *-es*: *tu travailles*. La *-s* no suena, como la de *tu parles*." },
  { id: "il-parle", kind: "fin", before: "Il parl", after: " avec Paul.", verb: "parler", answer: "e",
    because: "*Il* es singular: *-e*, sin *-nt*. *Il parle* e *ils parlent* suenan igual, pero se escriben distinto." },
  { id: "mere-aime", kind: "fin", before: "Ma mère aim", after: " le café.", verb: "aimer", answer: "e",
    because: "*Ma mère* es una sola persona, como *elle*: *-e*. *Elle aime le café*." },
  { id: "nous-mangeons", kind: "fin", before: "Nous mang", after: " ensemble.", verb: "manger", answer: "eons",
    because: "Con *manger*, *nous mangeons*: la *e* que no suena mantiene suave la *g*. No es *mangons*." },
  { id: "vous-ecoutez", kind: "fin", before: "Vous écout", after: " la radio.", verb: "écouter", answer: "ez",
    because: "Con *vous*, *-ez*: *vous écoutez*. Con *nous* y *vous* la terminación sí se oye." },
  { id: "ils-habitent", kind: "fin", before: "Ils habit", after: " à Nantes.", verb: "habiter", answer: "ent",
    because: "*Ils* es plural: *-ent*, que no suena. Se oye la liaison, *ils‿habitent*, pero la terminación se escribe." },
  { id: "elles-regardent", kind: "fin", before: "Elles regard", after: " le jardin.", verb: "regarder", answer: "ent",
    because: "*Elles* es plural: *-ent*. *Elles regardent* suena igual que *elle regarde*; el sujeto dice cuántas son." },
  { id: "tu-manges", kind: "fin", before: "Tu mang", after: " un croissant ?", verb: "manger", answer: "es",
    because: "Con *tu*, *-es*: *tu manges*. La *e* extra de *nous mangeons* solo aparece con *nous*." },
  { id: "nous-travaillons", kind: "fin", before: "Nous travaill", after: " ensemble.", verb: "travailler", answer: "ons",
    because: "Con *nous*, *-ons*: *nous travaillons*. Con *travailler* no hay *e* extra; solo *manger* la lleva." },
  { id: "parents-travaillent", kind: "fin", before: "Mes parents travaill", after: " à Lyon.", verb: "travailler", answer: "ent",
    because: "*Mes parents* son varias personas, como *ils*: *-ent*. *Mes parents travaillent*." },
  { id: "j-habite", kind: "sujet", before: "", after: "habite à Madrid.", verb: "habiter", answer: "j’",
    because: "*Habite* empieza por h muda, así que *je* pasa a *j’*: *j’habite*." },
  { id: "je-parle-sujet", kind: "sujet", before: "", after: "parle avec Marie.", verb: "parler", answer: "je",
    because: "*Parle* empieza por consonante: *je parle*, sin apóstrofo." },
  { id: "j-ecoute", kind: "sujet", before: "", after: "écoute la radio.", verb: "écouter", answer: "j’",
    because: "*Écoute* empieza por vocal: *j’écoute*." },
  { id: "je-regarde", kind: "sujet", before: "", after: "regarde le jardin.", verb: "regarder", answer: "je",
    because: "*Regarde* empieza por consonante: *je regarde*, sin apóstrofo." },
];

export const BANKS: Record<string, VerbItem[]> = { A1: ITEMS };

export function bankFor(): VerbItem[] {
  return BANKS.A1;
}

export function poolFor(item: VerbItem): readonly string[] {
  return item.kind === "fin" ? ENDINGS : SUBJECTS;
}

/** Le mot du trou, avec une majuscule s'il ouvre la phrase (`sujet`). */
export function shown(item: VerbItem, form: string): string {
  return item.kind === "sujet" ? form[0].toUpperCase() + form.slice(1) : form;
}

/** Entre le trou et la suite : rien après un radical ou `j’`, sinon une espace. */
export function glue(item: VerbItem, form: string): string {
  return item.kind === "fin" || form.endsWith("’") ? "" : " ";
}

/** La phrase complète, réponse en place. */
export function full(item: VerbItem, form: string): string {
  return item.before + shown(item, form) + glue(item, form) + item.after;
}

/* Vérification, à relancer après toute modification. Elle imprime les quinze
   phrases corrigées (un trou à deux réponses se voit en relisant), le compte,
   et les contrôles : réponse dans le tirage, chaque pastille sert au moins une
   fois, `je`/`j’` selon la voyelle ou h muet, terminaison conforme au sujet,
   aucun trou de terminaison collé à une voyelle (toute suite commence par une espace), ids uniques, astérisques pairs.

node --experimental-strip-types --input-type=module -e "
import { ITEMS, ENDINGS, SUBJECTS, poolFor, full } from './src/app/exercices/parle-parles-parlent/data.ts'
const bad = []
const used = new Set()
const kinds = {}
const want = { je: ['e','eons'], tu: ['es'], il: ['e'], elle: ['e'], ma: ['e'], nous: ['ons','eons'], vous: ['ez'], ils: ['ent'], elles: ['ent'], mes: ['ent'] }
for (const it of ITEMS) {
  used.add(it.answer)
  kinds[it.kind] = (kinds[it.kind] || 0) + 1
  const pool = poolFor(it)
  if (!pool.includes(it.answer)) bad.push(it.id + ': réponse absente du tirage')
  if (new Set(pool).size !== pool.length) bad.push(it.id + ': doublon')
  if (it.because.split('*').length % 2 === 0) bad.push(it.id + ': astérisque impair')
  if (it.kind === 'fin') {
    const subj = it.before.split(' ')[0].toLowerCase()
    if (!want[subj].includes(it.answer)) bad.push(it.id + ': terminaison non conforme à ' + subj)
    if (/^[aeiouyéèêàâîôûh]/i.test(it.after)) bad.push(it.id + ': voyelle après le trou')
    if ((it.answer === 'eons') !== (it.verb === 'manger' && subj === 'nous')) bad.push(it.id + ': eons mal placé')
    if (!it.before.split(' ').at(-1) || !it.verb.startsWith(it.before.split(' ').at(-1))) bad.push(it.id + ': radical hors infinitif')
  } else {
    const vowel = /^[aeiouyéèêàâîôûh]/i.test(it.after)
    if ((it.answer === 'j’') !== vowel) bad.push(it.id + ': élision fausse')
    if (!it.verb.startsWith(it.after.slice(0, 4).toLowerCase())) bad.push(it.id + ': verbe hors infinitif')
  }
  console.log(it.kind.padEnd(6), full(it, it.answer), '(' + it.verb + ')')
}
for (const f of ENDINGS) if (!used.has(f)) bad.push('terminaison jamais réponse : ' + f)
for (const f of SUBJECTS) if (!used.has(f)) bad.push('sujet jamais réponse : ' + f)
if (new Set(ITEMS.map(i => i.id)).size !== ITEMS.length) bad.push('id en double')
console.log('items vérifiés:', ITEMS.length, kinds, 'terminaisons utilisées:', ENDINGS.filter(f => used.has(f)).length + '/' + ENDINGS.length)
console.log('problèmes:', bad.length ? bad : 'aucun')
"
*/
