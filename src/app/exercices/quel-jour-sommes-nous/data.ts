/**
 * « Quel jour sommes-nous ? » — quatorze phrases à compléter, à l'A1
 * (`docs/levels/a1.md`). Elles font travailler la page
 * `vocabulaire/les-jours-et-les-mois` et rien d'autre : *au printemps* et
 * *en* + saison ou mois, *lundi* / *le lundi*, la date sans « de »,
 * *le premier*.
 *
 * **Un seul lot, pas de `sets`** : la page est écrite à l'A1. Le lot est tout
 * de même exporté sous `BANKS`, clé `A1`, pour l'audit `nav-wiring`.
 *
 * **Le tirage est fixe** : les sept pastilles restent à l'écran, dans le même
 * ordre, toute la partie (`exercise-author.md`). Deux sont des pièges voulus
 * et ne sont jamais la réponse : `de` (*le 3 de mars*, le calque de
 * l'espagnol) et `un` (*le un mai*). Les cinq autres sont chacune la réponse
 * d'au moins une phrase ; la vérification en bas de fichier le contrôle.
 *
 * **Chaque phrase n'a qu'une réponse défendable**, et c'est la phrase qui la
 * garantit :
 * - `lundi` seul ou `le lundi` sont tous deux du bon français : la phrase
 *   porte donc un `hint` espagnol (« todos los lunes » / « este lunes »),
 *   sans quoi l'item aurait deux réponses ;
 * - devant `printemps`, seul `au` va ; devant une saison en été / automne /
 *   hiver ou un mois, seul `en` ;
 * - dans une date (`le 3 mars`) rien n'entre entre le nombre et le mois ;
 * - pour le 1er, `un` est exclu et le hint donne le jour.
 * Aucun trou ne précède une voyelle qui élide : `au`, `en`, `le` et `de` n'ont
 * ici aucune forme élidée (*le* ne précède que des nombres, *lundi* ou un mot
 * en consonne).
 *
 * Fixe dans son contenu, mais **mélangé** à chaque partie : le plateau est donc
 * chargé sans rendu serveur (`drill.tsx`).
 */

export const POOL = ["au", "en", "le", "de", "premier", "un", "rien"] as const;
export type Form = (typeof POOL)[number];

export interface DateItem {
  /** Permanent within this file: the key React renders by. */
  id: string;
  /** Ce qui précède le trou. Vide si le trou ouvre la phrase. */
  before: string;
  /** Ce qui suit le trou, ponctuation comprise. Jamais vide. */
  after: string;
  answer: Form;
  /** Espagnol, optionnel : le contexte qui départage *lundi* / *le lundi*
   *  ou donne le jour du 1er. */
  hint?: string;
  /** Espagnol : la correction pointe la règle. Les mots français y sont
   *  entre `*astérisques*` : le plateau leur donne `lang="fr"`. */
  because: string;
}

const ALL: DateItem[] = [
  /* — Les saisons et les mois : en, sauf au printemps. — */
  {
    id: "printemps",
    before: "",
    after: "printemps, il y a des fleurs.",
    answer: "au",
    because:
      "La primavera es la excepción: *au printemps*. Con las otras tres estaciones se usa *en*.",
  },
  {
    id: "ete",
    before: "Je vais à la plage",
    after: "été.",
    answer: "en",
    because: "Verano, otoño e invierno llevan *en*: *en été*. Solo la primavera es *au*.",
  },
  {
    id: "hiver",
    before: "",
    after: "hiver, il fait nuit tôt.",
    answer: "en",
    because: "El invierno lleva *en*: *en hiver*, no *au hiver*.",
  },
  {
    id: "automne",
    before: "Il pleut souvent",
    after: "automne.",
    answer: "en",
    because: "El otoño lleva *en*: *en automne*.",
  },
  {
    id: "mars",
    before: "Mon anniversaire est",
    after: "mars.",
    answer: "en",
    because: "Con un mes se usa *en*: *en mars*, como «en marzo».",
  },

  /* — La date : le + nombre + mois, sans « de ». — */
  {
    id: "trois-mars",
    before: "Nous sommes",
    after: "3 mars.",
    answer: "le",
    because: "La fecha empieza por *le*: *Nous sommes le 3 mars*.",
  },
  {
    id: "noel",
    before: "On est le 25",
    after: "décembre.",
    answer: "rien",
    because:
      "En francés no hay «de» entre el número y el mes: *le 25 décembre*, no *le 25 de décembre*.",
  },
  {
    id: "quatorze",
    before: "C’est quand, ton anniversaire ? C’est le 14",
    after: "juillet.",
    answer: "rien",
    because:
      "Sin «de»: *le 14 juillet*. Es un calco del español («14 de julio») que hay que evitar.",
  },
  {
    id: "premier-septembre",
    before: "Le cours commence le",
    after: "septembre.",
    answer: "premier",
    hint: "Es el día 1 de septiembre.",
    because:
      "El día 1 es el único ordinal: *le premier septembre*. Nunca *le un septembre*.",
  },
  {
    id: "premier-mai",
    before: "Le",
    after: "mai, je ne travaille pas.",
    answer: "premier",
    hint: "Es el día 1 de mayo.",
    because: "Solo el día 1 dice *premier*: *le premier mai*. Los demás: *le deux*, *le trois*…",
  },

  /* — lundi (este lunes) ou le lundi (todos los lunes). — */
  {
    id: "lundi-habitude",
    before: "",
    after: "lundi, je fais du sport.",
    answer: "le",
    hint: "Todos los lunes, es una costumbre.",
    because:
      "Una costumbre lleva artículo: *le lundi* = todos los lunes. Sin artículo sería solo este lunes.",
  },
  {
    id: "lundi-once",
    before: "",
    after: "lundi, je vais chez le médecin.",
    answer: "rien",
    hint: "Este lunes, una sola vez.",
    because:
      "Un día concreto va sin artículo: *lundi* = este lunes. Con *le* sería cada lunes.",
  },
  {
    id: "jeudi-habitude",
    before: "Je vais au marché",
    after: "jeudi.",
    answer: "le",
    hint: "Todos los jueves.",
    because: "Todos los jueves: *le jeudi*. Se usa el artículo para decir que se repite.",
  },
  {
    id: "samedi-once",
    before: "Nous partons",
    after: "samedi.",
    answer: "rien",
    hint: "Este sábado.",
    because: "Este sábado, una sola vez: *samedi*, sin artículo.",
  },
];

export const ITEMS: DateItem[] = ALL;
export const BANKS: Record<string, DateItem[]> = { A1: ITEMS };

export function bankFor(): DateItem[] {
  return BANKS.A1;
}

/** Ce que le trou affiche : « rien » se montre ∅. */
export function label(form: string): string {
  return form === "rien" ? "∅" : form;
}

/** La phrase entière, écrite comme à l'écrit : le trou vide disparaît, et la
 *  première lettre prend une majuscule si le trou ouvre la phrase. */
export function sentence(item: DateItem, form: string): string {
  const text = [item.before, form === "rien" ? "" : form, item.after]
    .filter(Boolean)
    .join(" ");
  return text[0].toUpperCase() + text.slice(1);
}

/* Vérification, à relancer après toute modification. Elle imprime les quatorze
   phrases corrigées (un trou à deux réponses défendables se voit en relisant),
   puis les contrôles : réponse dans le tirage, ids uniques, pastilles jamais
   réponse (attendu : de, un), hint sur chaque lundi / jeudi / samedi / premier,
   astérisques pairs.

node --experimental-strip-types --input-type=module -e "
import { ITEMS, POOL, sentence } from './src/app/exercices/quel-jour-sommes-nous/data.ts'
const bad = [], used = new Set()
for (const it of ITEMS) {
  used.add(it.answer)
  if (!POOL.includes(it.answer)) bad.push(it.id + ': réponse absente du tirage')
  if (new Set(POOL).size !== POOL.length) bad.push('tirage en double')
  const day = /\b(lundi|mardi|mercredi|jeudi|vendredi|samedi|dimanche)\b/.test(it.after)
  if ((day || it.answer === 'premier') && !it.hint) bad.push(it.id + ': jour ou 1er sans hint')
  if (it.because.split('*').length % 2 === 0) bad.push(it.id + ': astérisque impair')
  if (/^[aeiouyéèêâîôûàh]/i.test(it.after) && ['le'].includes(it.answer)) bad.push(it.id + ': élision')
  console.log(sentence(it, it.answer), it.hint ? '   [' + it.hint + ']' : '')
}
if (new Set(ITEMS.map(i => i.id)).size !== ITEMS.length) bad.push('id en double')
console.log('items vérifiés:', ITEMS.length, '| pastilles jamais réponse:', POOL.filter(f => !used.has(f)))
console.log('problèmes:', bad.length ? bad : 'aucun')
"
*/
