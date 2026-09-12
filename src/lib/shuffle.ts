/**
 * One shuffle, imported everywhere.
 *
 * **Never write `sort(() => Math.random() - 0.5)`.** It is not a shuffle: the
 * comparator is inconsistent, so the result depends on the sort algorithm and
 * is heavily biased towards the input order. In a word-order drill it served the
 * sentence *already in the correct order* 9.5 % of the time, and eighteen files
 * had each grown their own copy of it before an audit found them (`AGENTS.md` §9).
 *
 * A local Fisher–Yates in a component is a regression too, even when it is
 * correct — one implementation, one import, one place to check.
 *
 * It copies rather than sorting in place, because a drill's deck is built from
 * a module-level constant and shuffling that array would reorder it for every
 * later mount in the same session.
 */
export function shuffle<T>(items: readonly T[]): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}
