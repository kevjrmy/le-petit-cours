/**
 * Conjugation tables for the `conjugaison/` chapter.
 *
 * Tenses on the sheet — présent, passé composé, futur simple, impératif,
 * participe présent. Still no imparfait and no subjonctif: the imparfait is
 * taught in `grammaire/l-imparfait` and drilled in `exercices/construis-l-imparfait`,
 * and the subjonctif is past A2 entirely.
 *
 * The futur is the one tense generated rather than stored: every verb shares
 * the same six endings (-ai, -as, -a, -ons, -ez, -ont), so a verb carries only
 * its futur stem and the boundary falls where the endings begin.
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
 *   futur       — the futur simple stem; the six forms are generated from it
 *                 (parler → 'parler', être → 'ser', prendre → 'prendr')
 *   imperatif   — [tu, nous, vous], or null when the verb has none
 *   imperatifNote — optional replacement for the default "pas d'impératif"
 *                 line, when the forms exist on paper but are not used
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
  /* ── Les deux auxiliaires ─────────────────────── */
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
    futur: 'ser',
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
    futur: 'aur',
    imperatif: ['ai|e', 'ay|ons', 'ay|ez'],
  },

  /* ── Les deux modèles réguliers ───────────────── */
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
    futur: 'parler',
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
    futur: 'finir',
    imperatif: ['fin|is', 'fin|issons', 'fin|issez'],
  },

  /* ── 1er groupe : les régularités et les quatre
        particularités orthographiques qui comptent ── */
  {
    slug: 'aimer',
    infinitif: 'aimer',
    es: 'amar / gustar',
    groupe: '1er groupe',
    note: "Se conjugue comme parler. Il commence par une voyelle : « je » s'élide en « j' » (j'aime).",
    aux: 'avoir',
    participe: 'aimé',
    ppresent: 'aim|ant',
    present: ['aim|e', 'aim|es', 'aim|e', 'aim|ons', 'aim|ez', 'aim|ent'],
    futur: 'aimer',
    imperatif: ['aim|e', 'aim|ons', 'aim|ez'],
  },
  {
    slug: 'donner',
    infinitif: 'donner',
    es: 'dar',
    groupe: '1er groupe',
    note: "Parfaitement régulier. Quatre formes du présent se prononcent pareil : donne, donnes, donne, donnent.",
    aux: 'avoir',
    participe: 'donné',
    ppresent: 'donn|ant',
    present: ['donn|e', 'donn|es', 'donn|e', 'donn|ons', 'donn|ez', 'donn|ent'],
    futur: 'donner',
    imperatif: ['donn|e', 'donn|ons', 'donn|ez'],
  },
  {
    slug: 'manger',
    infinitif: 'manger',
    es: 'comer',
    groupe: '1er groupe',
    note: "Verbe en -ger : le e se maintient devant a et o pour garder le son doux du g (nous mangeons, en mangeant).",
    aux: 'avoir',
    participe: 'mangé',
    ppresent: 'mange|ant',
    present: ['mang|e', 'mang|es', 'mang|e', 'mange|ons', 'mang|ez', 'mang|ent'],
    futur: 'manger',
    imperatif: ['mang|e', 'mange|ons', 'mang|ez'],
  },
  {
    slug: 'commencer',
    infinitif: 'commencer',
    es: 'empezar / comenzar',
    groupe: '1er groupe',
    note: "Verbe en -cer : la cédille garde le son [s] devant a et o (nous commençons, en commençant).",
    aux: 'avoir',
    participe: 'commencé',
    ppresent: 'commenç|ant',
    present: ['commenc|e', 'commenc|es', 'commenc|e', 'commenç|ons', 'commenc|ez', 'commenc|ent'],
    futur: 'commencer',
    imperatif: ['commenc|e', 'commenç|ons', 'commenc|ez'],
  },
  {
    slug: 'acheter',
    infinitif: 'acheter',
    es: 'comprar',
    groupe: '1er groupe',
    note: "Le e devient è quand la terminaison est muette : j'achète, mais nous achetons. Le futur garde l'accent : j'achèterai.",
    aux: 'avoir',
    participe: 'acheté',
    ppresent: 'achet|ant',
    present: ['achèt|e', 'achèt|es', 'achèt|e', 'achet|ons', 'achet|ez', 'achèt|ent'],
    futur: 'achèter',
    imperatif: ['achèt|e', 'achet|ons', 'achet|ez'],
  },
  {
    slug: 'appeler',
    infinitif: 'appeler',
    es: 'llamar',
    groupe: '1er groupe',
    note: "Le l double quand la terminaison est muette : j'appelle, mais nous appelons. Le futur double aussi : j'appellerai.",
    aux: 'avoir',
    participe: 'appelé',
    ppresent: 'appel|ant',
    present: ['appell|e', 'appell|es', 'appell|e', 'appel|ons', 'appel|ez', 'appell|ent'],
    futur: 'appeller',
    imperatif: ['appell|e', 'appel|ons', 'appel|ez'],
  },

  /* ── 2e groupe ────────────────────────────────── */
  {
    slug: 'choisir',
    infinitif: 'choisir',
    es: 'elegir / escoger',
    groupe: '2e groupe',
    note: "Se conjugue comme finir : le -iss- apparaît au pluriel (nous choisissons).",
    aux: 'avoir',
    participe: 'choisi',
    ppresent: 'choisiss|ant',
    present: ['chois|is', 'chois|is', 'chois|it', 'chois|issons', 'chois|issez', 'chois|issent'],
    futur: 'choisir',
    imperatif: ['chois|is', 'chois|issons', 'chois|issez'],
  },

  /* ── 3e groupe ────────────────────────────────── */
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
    futur: 'ir',
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
    futur: 'fer',
    imperatif: ['fai|s', 'fais|ons', 'fait|es'],
  },
  {
    slug: 'dire',
    infinitif: 'dire',
    es: 'decir',
    groupe: '3e groupe',
    note: "« Vous dites », comme « vous faites » et « vous êtes » : ce sont les trois seules exceptions à -ez.",
    aux: 'avoir',
    participe: 'dit',
    ppresent: 'dis|ant',
    present: ['di|s', 'di|s', 'di|t', 'dis|ons', 'dit|es', 'dis|ent'],
    futur: 'dir',
    imperatif: ['di|s', 'dis|ons', 'dit|es'],
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
    futur: 'pourr',
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
    futur: 'voudr',
    imperatif: ['veuill|e', 'veuill|ons', 'veuill|ez'],
  },
  {
    slug: 'devoir',
    infinitif: 'devoir',
    es: 'deber / tener que',
    groupe: '3e groupe',
    note: "Verbe modal, suivi d'un infinitif (je dois partir). Le radical alterne doi- au singulier et dev- au pluriel.",
    aux: 'avoir',
    participe: 'dû',
    ppresent: 'dev|ant',
    present: ['doi|s', 'doi|s', 'doi|t', 'dev|ons', 'dev|ez', 'doiv|ent'],
    futur: 'devr',
    imperatif: null,
    imperatifNote: "Les formes existent (dois, devons, devez) mais ne s'emploient pas : on dit « tu dois partir ».",
  },
  {
    slug: 'savoir',
    infinitif: 'savoir',
    es: 'saber',
    groupe: '3e groupe',
    note: "Savoir = un fait ou une compétence (je sais nager). Connaître = une personne ou un lieu.",
    aux: 'avoir',
    participe: 'su',
    ppresent: 'sach|ant',
    present: ['sai|s', 'sai|s', 'sai|t', 'sav|ons', 'sav|ez', 'sav|ent'],
    futur: 'saur',
    imperatif: ['sach|e', 'sach|ons', 'sach|ez'],
  },
  {
    slug: 'voir',
    infinitif: 'voir',
    es: 'ver',
    groupe: '3e groupe',
    note: "Le radical passe à voy- devant -ons et -ez. Futur irrégulier à deux r : je verrai.",
    aux: 'avoir',
    participe: 'vu',
    ppresent: 'voy|ant',
    present: ['voi|s', 'voi|s', 'voi|t', 'voy|ons', 'voy|ez', 'voi|ent'],
    futur: 'verr',
    imperatif: ['voi|s', 'voy|ons', 'voy|ez'],
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
    futur: 'viendr',
    imperatif: ['vien|s', 'ven|ons', 'ven|ez'],
  },
  {
    slug: 'partir',
    infinitif: 'partir',
    es: 'irse / marcharse',
    groupe: '3e groupe',
    note: "Le t du radical tombe au singulier (je pars). Se conjugue avec être : elle est partie.",
    aux: 'être',
    participe: 'parti',
    ppresent: 'part|ant',
    present: ['par|s', 'par|s', 'par|t', 'part|ons', 'part|ez', 'part|ent'],
    futur: 'partir',
    imperatif: ['par|s', 'part|ons', 'part|ez'],
  },
  {
    slug: 'sortir',
    infinitif: 'sortir',
    es: 'salir',
    groupe: '3e groupe',
    note: "Même modèle que partir, et comme lui il se conjugue avec être : nous sommes sortis.",
    aux: 'être',
    participe: 'sorti',
    ppresent: 'sort|ant',
    present: ['sor|s', 'sor|s', 'sor|t', 'sort|ons', 'sort|ez', 'sort|ent'],
    futur: 'sortir',
    imperatif: ['sor|s', 'sort|ons', 'sort|ez'],
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
    futur: 'prendr',
    imperatif: ['prend|s', 'pren|ons', 'pren|ez'],
  },
  {
    slug: 'mettre',
    infinitif: 'mettre',
    es: 'poner / meter',
    groupe: '3e groupe',
    note: "Un seul t au singulier, deux au pluriel. Participe passé irrégulier : mis.",
    aux: 'avoir',
    participe: 'mis',
    ppresent: 'mett|ant',
    present: ['met|s', 'met|s', 'met', 'mett|ons', 'mett|ez', 'mett|ent'],
    futur: 'mettr',
    imperatif: ['met|s', 'mett|ons', 'mett|ez'],
  },
  {
    slug: 'attendre',
    infinitif: 'attendre',
    es: 'esperar',
    groupe: '3e groupe',
    note: "Modèle des verbes en -dre : le d reste partout, et la 3e personne du singulier n'a pas de terminaison (il attend).",
    aux: 'avoir',
    participe: 'attendu',
    ppresent: 'attend|ant',
    present: ['attend|s', 'attend|s', 'attend', 'attend|ons', 'attend|ez', 'attend|ent'],
    futur: 'attendr',
    imperatif: ['attend|s', 'attend|ons', 'attend|ez'],
  },
  {
    slug: 'ecrire',
    infinitif: 'écrire',
    es: 'escribir',
    groupe: '3e groupe',
    note: "Le -v- apparaît au pluriel : nous écrivons, en écrivant.",
    aux: 'avoir',
    participe: 'écrit',
    ppresent: 'écriv|ant',
    present: ['écri|s', 'écri|s', 'écri|t', 'écriv|ons', 'écriv|ez', 'écriv|ent'],
    futur: 'écrir',
    imperatif: ['écri|s', 'écriv|ons', 'écriv|ez'],
  },
  {
    slug: 'lire',
    infinitif: 'lire',
    es: 'leer',
    groupe: '3e groupe',
    note: "Comme dire au singulier, mais son pluriel est régulier : vous lisez, et non « vous lites ».",
    aux: 'avoir',
    participe: 'lu',
    ppresent: 'lis|ant',
    present: ['li|s', 'li|s', 'li|t', 'lis|ons', 'lis|ez', 'lis|ent'],
    futur: 'lir',
    imperatif: ['li|s', 'lis|ons', 'lis|ez'],
  },
  {
    slug: 'boire',
    infinitif: 'boire',
    es: 'beber',
    groupe: '3e groupe',
    note: "Trois radicaux : boi- au singulier, buv- au pluriel, boiv- à la 3e personne du pluriel.",
    aux: 'avoir',
    participe: 'bu',
    ppresent: 'buv|ant',
    present: ['boi|s', 'boi|s', 'boi|t', 'buv|ons', 'buv|ez', 'boiv|ent'],
    futur: 'boir',
    imperatif: ['boi|s', 'buv|ons', 'buv|ez'],
  },
  {
    slug: 'ouvrir',
    infinitif: 'ouvrir',
    es: 'abrir',
    groupe: '3e groupe',
    note: "Verbe du 3e groupe qui prend les terminaisons du 1er : j'ouvre, tu ouvres. Participe passé irrégulier : ouvert.",
    aux: 'avoir',
    participe: 'ouvert',
    ppresent: 'ouvr|ant',
    present: ['ouvr|e', 'ouvr|es', 'ouvr|e', 'ouvr|ons', 'ouvr|ez', 'ouvr|ent'],
    futur: 'ouvrir',
    imperatif: ['ouvr|e', 'ouvr|ons', 'ouvr|ez'],
  },
  {
    slug: 'connaitre',
    infinitif: 'connaître',
    es: 'conocer',
    groupe: '3e groupe',
    note: "L'accent circonflexe ne se garde que devant un t : il connaît, mais je connais.",
    aux: 'avoir',
    participe: 'connu',
    ppresent: 'connaiss|ant',
    present: ['connai|s', 'connai|s', 'connaî|t', 'connaiss|ons', 'connaiss|ez', 'connaiss|ent'],
    futur: 'connaîtr',
    imperatif: ['connai|s', 'connaiss|ons', 'connaiss|ez'],
  },
]

/** Présent forms of the two auxiliaries, for building the passé composé. */
const AUX_PRESENT = {
  avoir: ['ai', 'a|s', 'a', 'av|ons', 'av|ez', 'o|nt'],
  être:  ['sui|s', 'e|s', 'es|t', 'somm|es', 'êt|es', 'so|nt'],
}

/**
 * Futur simple terminaisons, in pronoun order. They are the same for every
 * verb in the language without exception — irregularity lives entirely in the
 * stem — which is why a verb stores a stem here and not six forms.
 */
const FUTUR_ENDINGS = ['ai', 'as', 'a', 'ons', 'ez', 'ont']

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
 * @param {'present'|'futur'|'passeCompose'} tense
 * @param {boolean} negative
 * @param {'masculin'|'feminin'} gender
 * @returns {{ segments: { k: string, s: string }[] }[]}
 */
export function conjugate(verb, tense, negative, gender) {
  const pronouns = PRONOUNS[gender]

  return pronouns.map((pronoun, i) => {
    // The futur is assembled from the stem; the other two read a stored form —
    // the passé composé conjugates its auxiliary, not the verb itself.
    const raw =
      tense === 'present' ? verb.present[i]
      : tense === 'futur' ? `${verb.futur}|${FUTUR_ENDINGS[i]}`
      : AUX_PRESENT[verb.aux][i]
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
