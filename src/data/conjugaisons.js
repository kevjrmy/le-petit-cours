/**
 * Conjugation tables for the `conjugaison/` chapter.
 *
 * A2 scope only — présent, passé composé, impératif, participe présent.
 * No imparfait, no futur, no subjonctif: those belong to the grammaire
 * lessons, not to a reference sheet a beginner consults.
 *
 * Every view under `src/views/conjugaison/` is a one-line wrapper around
 * `ConjugationSheet.vue`, which reads this file. Add a verb here, add the
 * view + the `navigation.js` entry + the route, and nothing else changes.
 *
 * Verb shape:
 *   slug        — route segment, ASCII (`etre`, not `être`)
 *   infinitif   — display name, accented
 *   es          — Spanish gloss (never English)
 *   groupe      — '1er groupe' | '2e groupe' | '3e groupe'
 *   note        — optional one-line remark shown under the header
 *   aux         — 'avoir' | 'être', the passé composé auxiliary
 *   participe   — past participle, masculine singular
 *   ppresent    — participe présent
 *   present     — the six forms, WITHOUT the pronoun, in order
 *                 je · tu · il/elle · nous · vous · ils/elles
 *   imperatif   — [tu, nous, vous], or null when the verb has none
 */

export const PRONOUNS = {
  masculin: ['je', 'tu', 'il', 'nous', 'vous', 'ils'],
  feminin:  ['je', 'tu', 'elle', 'nous', 'vous', 'elles'],
}

export const IMPERATIF_PERSONS = ['(tu)', '(nous)', '(vous)']

/** Participle agreement, by person, when the auxiliary is `être`. */
export const AGREEMENT = {
  masculin: ['', '', '', 's', 's', 's'],
  feminin:  ['e', 'e', 'e', 'es', 'es', 'es'],
}

export const verbs = [
  {
    slug: 'etre',
    infinitif: 'être',
    es: 'ser / estar',
    groupe: '3e groupe',
    note: "Auxiliaire. Sert à former le passé composé des verbes de mouvement et de tous les verbes pronominaux.",
    aux: 'avoir',
    participe: 'été',
    ppresent: 'ét|ant',
    present: ['sui|s', 'e|s', 'es|t', 'somm|es', 'êt|es', 'so|nt'],
    imperatif: ['soi|s', 'soy|ons', 'soy|ez'],
  },
  {
    slug: 'avoir',
    infinitif: 'avoir',
    es: 'haber / tener',
    groupe: '3e groupe',
    note: "Auxiliaire. C'est lui qui sert au passé composé de la grande majorité des verbes.",
    aux: 'avoir',
    participe: 'eu',
    ppresent: 'ay|ant',
    present: ['ai', 'a|s', 'a', 'av|ons', 'av|ez', 'o|nt'],
    imperatif: ['ai|e', 'ay|ons', 'ay|ez'],
  },
  {
    slug: 'parler',
    infinitif: 'parler',
    es: 'hablar',
    groupe: '1er groupe',
    note: "Modèle du 1er groupe : tous les verbes en -er se conjuguent ainsi (sauf aller).",
    aux: 'avoir',
    participe: 'parlé',
    ppresent: 'parl|ant',
    present: ['parl|e', 'parl|es', 'parl|e', 'parl|ons', 'parl|ez', 'parl|ent'],
    imperatif: ['parl|e', 'parl|ons', 'parl|ez'],
  },
  {
    slug: 'finir',
    infinitif: 'finir',
    es: 'terminar / acabar',
    groupe: '2e groupe',
    note: "Modèle du 2e groupe : le -iss- apparaît au pluriel (nous finissons).",
    aux: 'avoir',
    participe: 'fini',
    ppresent: 'finiss|ant',
    present: ['fin|is', 'fin|is', 'fin|it', 'fin|issons', 'fin|issez', 'fin|issent'],
    imperatif: ['fin|is', 'fin|issons', 'fin|issez'],
  },
  {
    slug: 'aller',
    infinitif: 'aller',
    es: 'ir',
    groupe: '3e groupe',
    note: "Seul verbe en -er du 3e groupe. Se conjugue avec être au passé composé.",
    aux: 'être',
    participe: 'allé',
    ppresent: 'all|ant',
    present: ['vai|s', 'va|s', 'va', 'all|ons', 'all|ez', 'vo|nt'],
    imperatif: ['va', 'all|ons', 'all|ez'],
  },
  {
    slug: 'faire',
    infinitif: 'faire',
    es: 'hacer',
    groupe: '3e groupe',
    note: "Attention à « vous faites » (et non « vous faisez ») et à « ils font ».",
    aux: 'avoir',
    participe: 'fait',
    ppresent: 'fais|ant',
    present: ['fai|s', 'fai|s', 'fai|t', 'fais|ons', 'fait|es', 'fo|nt'],
    imperatif: ['fai|s', 'fais|ons', 'fait|es'],
  },
  {
    slug: 'pouvoir',
    infinitif: 'pouvoir',
    es: 'poder',
    groupe: '3e groupe',
    note: "Verbe modal : il est suivi d'un infinitif (je peux venir). Il n'a pas d'impératif.",
    aux: 'avoir',
    participe: 'pu',
    ppresent: 'pouv|ant',
    present: ['peu|x', 'peu|x', 'peu|t', 'pouv|ons', 'pouv|ez', 'peuv|ent'],
    imperatif: null,
  },
  {
    slug: 'vouloir',
    infinitif: 'vouloir',
    es: 'querer',
    groupe: '3e groupe',
    note: "Verbe modal. Son impératif est rare, sauf « veuillez », très courant par politesse.",
    aux: 'avoir',
    participe: 'voulu',
    ppresent: 'voul|ant',
    present: ['veu|x', 'veu|x', 'veu|t', 'voul|ons', 'voul|ez', 'veul|ent'],
    imperatif: ['veuill|e', 'veuill|ons', 'veuill|ez'],
  },
  {
    slug: 'venir',
    infinitif: 'venir',
    es: 'venir',
    groupe: '3e groupe',
    note: "Se conjugue avec être au passé composé. Le radical double le n au singulier et à la 3e personne du pluriel.",
    aux: 'être',
    participe: 'venu',
    ppresent: 'ven|ant',
    present: ['vien|s', 'vien|s', 'vien|t', 'ven|ons', 'ven|ez', 'vienn|ent'],
    imperatif: ['vien|s', 'ven|ons', 'ven|ez'],
  },
  {
    slug: 'prendre',
    infinitif: 'prendre',
    es: 'tomar / coger',
    groupe: '3e groupe',
    note: "Le d disparaît au pluriel (nous prenons) et le n double à la 3e personne (ils prennent).",
    aux: 'avoir',
    participe: 'pris',
    ppresent: 'pren|ant',
    present: ['prend|s', 'prend|s', 'prend', 'pren|ons', 'pren|ez', 'prenn|ent'],
    imperatif: ['prend|s', 'pren|ons', 'pren|ez'],
  },
]

/** Présent forms of the two auxiliaries, for building the passé composé. */
const AUX_PRESENT = {
  avoir: ['ai', 'a|s', 'a', 'av|ons', 'av|ez', 'o|nt'],
  être:  ['sui|s', 'e|s', 'es|t', 'somm|es', 'êt|es', 'so|nt'],
}

const VOWEL = /^[aeiouyéèêëàâîïôöûù]/i

/**
 * `je` → `j'` and `ne` → `n'` before a vowel, returning the word plus its
 * separator so the caller can concatenate directly.
 *
 * Only `je` and `ne` elide. `elle`, `ils`, `elles` never do — `elle est`
 * stays two words. Passing any other pronoun here would produce `ell'est`.
 */
export function elide(word, next) {
  return VOWEL.test(next) ? `${word.slice(0, -1)}'` : `${word} `
}

/** The subject pronoun with its separator — elided only when it is `je`. */
function subject(pronoun, form) {
  return pronoun === 'je' ? elide('je', form) : `${pronoun} `
}

export function getVerb(slug) {
  return verbs.find(v => v.slug === slug) ?? null
}

/**
 * Split a stored form on its `|` marker into [stem, ending].
 * A form with no marker is irregular enough that no ending is worth colouring
 * (`j'ai`, `il a`) — it comes back as all stem.
 */
function splitForm(raw) {
  const i = raw.indexOf('|')
  return i === -1 ? [raw, ''] : [raw.slice(0, i), raw.slice(i + 1)]
}

/**
 * Build the six displayed lines of a tense, as typed segments so the view can
 * colour them. Segment kinds:
 *
 *   pron   the subject pronoun, with its separator (`j'` or `je `)
 *   stem   the radical — never coloured
 *   end    the terminaison — this is the pattern the learner should see
 *   neg    `ne` / `n'` / ` pas`
 *   accord the participle's agreement letters, when the auxiliary is être
 *
 * Concatenating every `s` reproduces the plain sentence exactly.
 *
 * @param {object}  verb
 * @param {'present'|'passeCompose'} tense
 * @param {boolean} negative
 * @param {'masculin'|'feminin'} gender
 * @returns {{ segments: { k: string, s: string }[] }[]}
 */
export function conjugate(verb, tense, negative, gender) {
  const pronouns = PRONOUNS[gender]

  return pronouns.map((pronoun, i) => {
    const raw = tense === 'present' ? verb.present[i] : AUX_PRESENT[verb.aux][i]
    const [stem, end] = splitForm(raw)
    const whole = stem + end

    // ne … pas wraps the conjugated verb — the auxiliary, not the participle.
    const ne = negative ? elide('ne', whole) : ''
    const segments = [{ k: 'pron', s: subject(pronoun, negative ? ne : whole) }]

    if (negative) segments.push({ k: 'neg', s: ne })
    segments.push({ k: 'stem', s: stem })
    if (end) segments.push({ k: 'end', s: end })
    if (negative) segments.push({ k: 'neg', s: ' pas' })

    if (tense === 'passeCompose') {
      segments.push({ k: 'stem', s: ` ${verb.participe}` })
      // The participle only agrees when the auxiliary is être.
      const accord = verb.aux === 'être' ? AGREEMENT[gender][i] : ''
      if (accord) segments.push({ k: 'accord', s: accord })
    }

    return { segments }
  })
}

/** Wrap one form in `ne … pas` and split its ending, as segments. */
function segmentForm(raw, negative) {
  const [stem, end] = splitForm(raw)
  const segments = []

  if (negative) segments.push({ k: 'neg', s: elide('ne', stem + end) })
  segments.push({ k: 'stem', s: stem })
  if (end) segments.push({ k: 'end', s: end })
  if (negative) segments.push({ k: 'neg', s: ' pas' })

  return segments
}

/** Impératif lines, or [] when the verb has no imperative. */
export function conjugateImperatif(verb, negative) {
  if (!verb.imperatif) return []
  return verb.imperatif.map((raw, i) => ({
    person: IMPERATIF_PERSONS[i],
    segments: segmentForm(raw, negative),
  }))
}

/** Participe présent, negated as `ne … pas` around the participle. */
export function conjugatePPresent(verb, negative) {
  return segmentForm(verb.ppresent, negative)
}
