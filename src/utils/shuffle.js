/**
 * The one shuffle. Fisher–Yates, returning a new array.
 *
 * `[...arr].sort(() => Math.random() - 0.5)` is the idiom this replaces, and it
 * is biased: a comparator that answers inconsistently violates what the sort
 * algorithm assumes, so some permutations come up far more often than others.
 * In `phrases-en-desordre` that meant the sentence was served already in the
 * correct order 9.5 % of the time — the drill handed over the answer.
 *
 * Never re-implement this in a view. Import it.
 */
export function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

/**
 * A shuffle that refuses to return the input order, for the drills where the
 * original order *is* the answer — reordering words into a sentence, sorting
 * cards back into their column.
 *
 * Fisher–Yates is unbiased but still lands on the identity permutation once in
 * n!, which for a five-word sentence is roughly one run in 120. `same` decides
 * what "unchanged" means, since the items are usually objects: pass a comparison
 * on whatever identity the caller has (an `id`, the text itself).
 *
 * Gives up after ten draws rather than looping forever — with two identical
 * items no permutation ever looks different, and returning a shuffled array is
 * a better outcome than a frozen page.
 */
export function shuffleChanged(arr, same = (a, b) => a === b) {
  if (arr.length < 2) return [...arr]

  let out = shuffle(arr)
  for (let tries = 0; tries < 10 && out.every((item, i) => same(item, arr[i])); tries++) {
    out = shuffle(arr)
  }
  return out
}
