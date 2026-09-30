/**
 * « Le, la ou un ? » — vingt phrases à compléter, à l'A1 (`docs/levels/a1.md`).
 *
 * **Un seul lot, pas de `sets`** : la page est écrite à l'A1 et ne monte pas
 * (`AGENTS.md` §7). Le lot est tout de même exporté sous `BANKS`, clé `A1`,
 * pour que l'audit `nav-wiring` le lise comme les autres.
 *
 * **Le tirage est fixe** : les sept formes restent à l'écran, dans le même
 * ordre, toute la partie — les définis puis les indéfinis. L'apprenant retrouve
 * le paradigme au lieu d'éliminer trois distracteurs (`exercise-author.md`).
 * Aucune forme n'est un piège : chacune est la réponse d'au moins une phrase,
 * et la vérification en bas de fichier le contrôle.
 *
 * **Chaque phrase n'a qu'une réponse défendable**, et c'est la phrase qui la
 * garantit, jamais le tirage :
 * - `il y a` impose l'indéfini (*il y a le canapé* n'est pas une phrase) ;
 * - un nom déjà mentionné dans la phrase précédente impose le défini ;
 * - le nom impose le genre, le nombre et l'élision (`l’` devant voyelle ou
 *   h muet, jamais devant *héros*, h aspiré).
 * Le trou est toujours **juste avant le nom**, pour que la forme élidée se
 * colle à lui et que les autres soient suivies d'une espace.
 *
 * Le vocabulaire vient des cinq pages travaillées (les deux articles, le
 * singulier et le pluriel, la maison, les transports) et d'elles seules.
 * Aucun nom massif : un article indéfini n'irait pas devant (*un lait*).
 *
 * **Fixe, donc rendu sur le serveur** : rien n'est mélangé, l'ordre du lot est
 * celui de la leçon (six définis, six indéfinis, puis les deux en alternance).
 */

export const POOL = ["le", "la", "l’", "les", "un", "une", "des"] as const;
export type Form = (typeof POOL)[number];

export interface ArticleItem {
  /** Permanent within this file: the key React renders by. */
  id: string;
  /** Ce qui précède le trou. Jamais vide. */
  before: string;
  /** Le nom, tel qu'il s'écrit, et ce qui le suit (ponctuation comprise). */
  noun: string;
  /** Ce qui vient après le nom, ponctuation comprise. */
  after: string;
  answer: Form;
  /** Pour le tri et la vérification : ce que l'item fait travailler. */
  kind: "défini" | "indéfini";
  /** Espagnol : la correction pointe la règle. Les mots français y sont
   *  entre `*astérisques*` : le plateau leur donne `lang="fr"`. */
  because: string;
}

const ALL: ArticleItem[] = [
  /* — Les définis : le nom est déjà connu, ou la forme dépend du nom. — */
  {
    id: "chaise",
    before: "Ma mère a une chaise et un fauteuil.",
    noun: "chaise",
    after: " est petite.",
    answer: "la",
    kind: "défini",
    because:
      "Ya se ha hablado de la silla, así que va con el definido. *Chaise* es femenino: *la chaise*.",
  },
  {
    id: "car",
    before: "Devant la gare, il y a un car.",
    noun: "car",
    after: " est grand.",
    answer: "le",
    kind: "défini",
    because:
      "Ya se ha hablado del autocar: definido. Y *car* es masculino, no como *la voiture*: *le car*.",
  },
  {
    id: "voiture",
    before: "Mon père a une voiture.",
    noun: "voiture",
    after: " est petite.",
    answer: "la",
    kind: "défini",
    because: "Ya se conoce el coche: definido, y *voiture* es femenino: *la voiture*.",
  },
  {
    id: "armoire",
    before: "Dans la chambre, il y a une armoire. Mes vêtements sont dans",
    noun: "armoire",
    after: ".",
    answer: "l’",
    kind: "défini",
    because:
      "Es el armario del que se acaba de hablar: definido. *Armoire* empieza por vocal, así que *la* se convierte en *l’*: *l’armoire*.",
  },
  {
    id: "avion",
    before: "Il y a un avion.",
    noun: "avion",
    after: " est très grand.",
    answer: "l’",
    kind: "défini",
    because:
      "Ya se ha hablado del avión: definido. Delante de vocal, *le* se convierte en *l’*: *l’avion*.",
  },
  {
    id: "arret-defini",
    before: "Il y a un arrêt derrière la maison.",
    noun: "arrêt",
    after: " est petit.",
    answer: "l’",
    kind: "défini",
    because:
      "Ya se ha hablado de la parada: definido, y *arrêt* empieza por vocal: *l’arrêt*.",
  },
  {
    id: "heros",
    before: "Il y a un héros et un enfant.",
    noun: "héros",
    after: " est grand.",
    answer: "le",
    kind: "défini",
    because:
      "*Héros* empieza por h aspirada, y delante de ella no hay apóstrofo: *le héros*, nunca *l’héros*.",
  },
  {
    id: "velos",
    before: "J’ai deux vélos.",
    noun: "vélos",
    after: " sont dans le jardin.",
    answer: "les",
    kind: "défini",
    because:
      "Son los dos vélos de los que se acaba de hablar: definido plural: *les vélos*. *Des* sería nuevo.",
  },
  {
    id: "toilettes-les",
    before: "La salle de bains est petite.",
    noun: "toilettes",
    after: " sont à gauche.",
    answer: "les",
    kind: "défini",
    because:
      "*Toilettes* va siempre en plural, y aquí son unas concretas, las de la casa: *les toilettes*.",
  },
  {
    id: "france",
    before: "",
    noun: "France",
    after: " est grande.",
    answer: "la",
    kind: "défini",
    because:
      "Los nombres de país llevan artículo: *la France*.",
  },

  /* — Les indéfinis : `il y a` présente, il ne désigne pas. — */
  {
    id: "canape",
    before: "Dans le salon, il y a",
    noun: "canapé",
    after: ".",
    answer: "un",
    kind: "indéfini",
    because:
      "Con *il y a* se presenta algo nuevo: indefinido. *Canapé* es masculino: *un canapé*.",
  },
  {
    id: "lampe",
    before: "Dans ma chambre, il y a",
    noun: "lampe",
    after: ".",
    answer: "une",
    kind: "indéfini",
    because:
      "*Il y a* presenta algo nuevo: indefinido. *Lampe* es femenino: *une lampe*.",
  },
  {
    id: "balcon",
    before: "Chez moi, il y a",
    noun: "balcon",
    after: " avec deux chaises.",
    answer: "un",
    kind: "indéfini",
    because: "*Il y a* presenta algo nuevo, y *balcon* es masculino: *un balcon*.",
  },
  {
    id: "armoire-une",
    before: "Dans ma chambre, il y a",
    noun: "armoire",
    after: " et un lit.",
    answer: "une",
    kind: "indéfini",
    because:
      "Se enumera lo que hay, sin haberlo mencionado: indefinido. *Armoire* es femenino, y *une* no pierde la vocal: *une armoire*.",
  },
  {
    id: "arret-un",
    before: "À côté de la gare, il y a",
    noun: "arrêt",
    after: ".",
    answer: "un",
    kind: "indéfini",
    because:
      "*Il y a* presenta algo nuevo, y *un* no se elide nunca: *un arrêt* (masculino), no *l’arrêt*.",
  },
  {
    id: "etagere",
    before: "Dans l’entrée, il y a",
    noun: "étagère",
    after: ".",
    answer: "une",
    kind: "indéfini",
    because:
      "*Il y a* presenta algo nuevo, y *étagère* es femenino: *une étagère*. Ni *la* ni *l’*, que serían definidos.",
  },
  {
    id: "etageres",
    before: "Dans la chambre, il y a un lit, une armoire et",
    noun: "étagères",
    after: ".",
    answer: "des",
    kind: "indéfini",
    because:
      "Varias *étagères* nuevas: *des*. En francés el plural indefinido no se puede omitir, como sí haces en español.",
  },
  {
    id: "toilettes-des",
    before: "À gauche, il y a",
    noun: "toilettes",
    after: ".",
    answer: "des",
    kind: "indéfini",
    because:
      "*Toilettes* es siempre plural, y aquí se presentan unas nuevas: *des toilettes*.",
  },
  {
    id: "taxis",
    before: "Devant la maison, il y a",
    noun: "taxis",
    after: ".",
    answer: "des",
    kind: "indéfini",
    because:
      "Varios taxis nuevos. En *taxis* la -s final no se pronuncia; el plural se oye en el artículo: *des taxis*.",
  },
  {
    id: "hotels",
    before: "À côté de la maison, il y a",
    noun: "hôtels",
    after: ".",
    answer: "des",
    kind: "indéfini",
    because:
      "Varios hoteles nuevos: *des hôtels*. *Hôtel* empieza por h muda: la s de *des* suena (*des‿hôtels*), pero se escribe igual.",
  },
];

/* L'ordre de la leçon : six définis, six indéfinis, puis les huit restants en
   alternance, où l'apprenant doit d'abord décider lequel des deux il lui faut. */
const definis = ALL.filter((item) => item.kind === "défini");
const indefinis = ALL.filter((item) => item.kind === "indéfini");
export const ITEMS: ArticleItem[] = [
  ...definis.slice(0, 6),
  ...indefinis.slice(0, 6),
  ...definis.slice(6).flatMap((item, i) => [item, indefinis[6 + i]]),
];

export const BANKS: Record<string, ArticleItem[]> = { A1: ITEMS };

export function bankFor(): ArticleItem[] {
  return BANKS.A1;
}

/** Le mot du trou, avec une majuscule si la phrase commence par lui. */
export function shown(item: ArticleItem, form: string): string {
  return item.before === "" ? form[0].toUpperCase() + form.slice(1) : form;
}

/** La forme et le nom collés comme à l'écrit : `l’` sans espace, le reste avec. */
export function glue(form: string): string {
  return form.endsWith("’") ? "" : " ";
}

/* Vérification, à relancer après toute modification. Elle imprime les vingt
   phrases corrigées (un trou à deux réponses défendables se voit en relisant,
   pas dans les données), le compte par type, et les cinq contrôles : réponse
   dans le tirage, élision juste, nom présent dans une des cinq pages,
   tirage sans pastille inutile, ids uniques.

node --experimental-strip-types --input-type=module -e "
import { ITEMS, POOL, glue } from './src/app/exercices/le-la-ou-un/data.ts'
import { readFileSync } from 'node:fs'
const pages = ['grammaire/les-articles-definis','grammaire/les-articles-indefinis','grammaire/le-singulier-et-le-pluriel','vocabulaire/la-maison','vocabulaire/les-transports']
  .map(p => readFileSync('./src/app/' + p + '/page.tsx', 'utf8')).join(' ').replace(/<[^>]*>|\{\" \"\}/g, ' ').toLowerCase()
const bad = []
const used = new Set()
const kinds = {}
const vowel = /^[aeiouyéèêâîôûàh]/i
const hAspire = ['héros']
for (const it of ITEMS) {
  used.add(it.answer)
  kinds[it.kind] = (kinds[it.kind] || 0) + 1
  if (!POOL.includes(it.answer)) bad.push(it.id + ': réponse absente du tirage')
  const elides = vowel.test(it.noun) && !hAspire.includes(it.noun)
  if (it.answer === 'l’' && !elides) bad.push(it.id + ': l’ devant consonne ou h aspiré')
  if (['le','la'].includes(it.answer) && elides) bad.push(it.id + ': le/la devant voyelle')
  if (it.kind === 'indéfini' && !['un','une','des'].includes(it.answer)) bad.push(it.id + ': indéfini sans un/une/des')
  if (it.kind === 'défini' && !['le','la','l’','les'].includes(it.answer)) bad.push(it.id + ': défini sans le/la/l’/les')
  if (['un','une','des'].includes(it.answer) && it.kind === 'indéfini' && !/il y a/.test(it.before)) bad.push(it.id + ': rien ne force l’indéfini')
  if (it.because.split('*').length % 2 === 0) bad.push(it.id + ': astérisque impair')
  if (['la','le','les','l’'].includes(it.answer) && it.before && !/ (un|une|deux) |^La salle/.test(it.before + ' ')) bad.push(it.id + ': rien ne force le défini')
  if (!pages.includes(it.noun.toLowerCase().replace(/s$/, ''))) bad.push(it.id + ': « ' + it.noun + ' » absent des cinq pages')
  if (it.because.length < 30) bad.push(it.id + ': correction trop courte')
  console.log(it.kind.padEnd(8), (it.before + ' ' + it.answer + glue(it.answer) + it.noun + it.after).trim())
}
for (const f of POOL) if (!used.has(f)) bad.push('pastille jamais réponse : ' + f)
if (new Set(ITEMS.map(i => i.id)).size !== ITEMS.length) bad.push('id en double')
console.log('items vérifiés:', ITEMS.length, kinds, 'formes utilisées:', [...used].length + '/' + POOL.length)
console.log('problèmes:', bad.length ? bad : 'aucun')
"
*/
