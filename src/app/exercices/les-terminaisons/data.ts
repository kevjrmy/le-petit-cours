import type { Level } from "@/data/navigation";

/**
 * What this drill asks for, per level.
 *
 * **The forms are not here.** They live in `src/data/conjugaisons.ts`, stored
 * as `radical|terminaison`, and `board.tsx` reads them from there — so the
 * drill and the verb sheet at `/conjugaison/parler` cannot drift, and adding a
 * verb to this drill is naming a slug rather than retyping eighteen endings.
 *
 * **Type-only imports, deliberately** (`AGENTS.md` §8). The `nav-wiring` audit
 * imports this file with plain `node` to check `BANKS`'s keys against the
 * manifest's `levels`; a runtime import of `@/data/conjugaisons` would need the
 * path alias node does not have, and the audit would stop reporting without
 * saying so.
 */

export type TenseKey =
  | "present"
  | "imparfait"
  | "passeCompose"
  | "futur"
  | "imperatif";

export interface Bank {
  /** A `slug` from `src/data/conjugaisons.ts`. */
  verb: string;
  /** Which tenses the board asks for, in the order it draws them. */
  tenses: TenseKey[];
  /**
   * The participe passé cut into stem and ending, for the passé composé blank.
   *
   * **Written here rather than derived, and not in `conjugaisons.ts`.** The verb
   * entry stores the participle whole (`parlé`), because the sheet prints it
   * whole; splitting it by rule works for *parler* and fails for *aller*, whose
   * participle shares no stem with its présent. So the bank states the cut, and
   * the check below refuses one that does not reassemble into the participle
   * the verb entry holds.
   */
  participe: [stem: string, ending: string];
}

/**
 * A2 is *parler*, and that is not a modest choice: the note on its entry says
 * « tous les verbes en -er se conjuguent ainsi, sauf aller », so these eighteen
 * endings are the endings of the largest group in the language.
 *
 * **One bank, so this lesson is not `perLevel`** and its tick is the bare id
 * (#76). A second bank belongs on this page rather than on a new one, the
 * mechanic being level-independent (#68) — *manger* or *commencer* would make a
 * good harder bank, since their stems soften before `a` and not before `i`, and
 * the board already reads that from the verb entry. **Adding it costs three
 * things in one commit**: `perLevel: true` in the manifest, `levels` written
 * out as exactly the banks' keys, and a backfill moving every stored tick from
 * `ex-les-terminaisons` to `ex-les-terminaisons@A2`.
 */
export const BANKS: Record<string, Bank> = {
  A2: {
    verb: "parler",
    tenses: ["present", "imparfait", "passeCompose", "futur", "imperatif"],
    participe: ["parl", "é"],
  },
};

export function bankFor(level: Level | null): Bank {
  return (level && BANKS[level]) || BANKS[Object.keys(BANKS)[0]];
}

/* Validate after any edit here or in the verb entry. Reads the count as well as
   the verdict, so a check that silently matches nothing fails loudly
   (`AGENTS.md` §9). The drill is type-in only: its one aid is `AccentBar`, so
   the assertion that matters is that every ending is reachable from that row.

node --experimental-strip-types --input-type=module -e "
import { BANKS } from './src/app/exercices/les-terminaisons/data.ts'
import { findVerb, imparfaitForms, futurForms, plain } from './src/data/conjugaisons.ts'
const bad = []
let cells = 0
const endingsOf = (bank) => {
  const verb = findVerb(bank.verb)
  if (!verb) return []
  const out = []
  for (const tense of bank.tenses) {
    if (tense === 'passeCompose') { for (let i = 0; i < 6; i++) out.push(['passeCompose', bank.participe[0], bank.participe[1]]); continue }
    if (tense === 'imperatif') { for (const f of verb.imperatif ?? []) out.push(['imperatif', ...f.split('|')]); continue }
    const forms = tense === 'imparfait' ? imparfaitForms(verb) : tense === 'futur' ? futurForms(verb) : verb.present
    for (const f of forms) out.push([tense, ...f.split('|')])
  }
  return out
}
for (const [level, bank] of Object.entries(BANKS)) {
  const verb = findVerb(bank.verb)
  if (!verb) { bad.push(level + ': no verb ' + bank.verb); continue }
  if (bank.participe.join('') !== verb.participe) bad.push(level + ': participe split ' + bank.participe.join('|') + ' does not rebuild ' + verb.participe)
  if (bank.tenses.includes('passeCompose') && verb.aux !== 'avoir') bad.push(level + ': passé composé with être makes the participle agree, so its ending is no longer one answer for six persons')
  if (bank.tenses.includes('imperatif') && !verb.imperatif) bad.push(level + ': no impératif on this verb')
  for (const [tense, stem, ending] of endingsOf(bank)) {
    cells++
    if (ending === undefined) { bad.push(level + '/' + tense + ' ' + stem + ': all stem, no ending to ask for'); continue }
    if (!/^[a-zé]+$/.test(ending)) bad.push(level + '/' + tense + ' -' + ending + ': carries a character the AccentBar row does not offer')
  }
}
console.log('cells checked:', cells)
console.log('problems:', bad.length ? bad : 'none')
"
*/
