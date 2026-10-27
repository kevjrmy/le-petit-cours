/**
 * The conjugation tables, and the only place a verb form is written down.
 *
 * The shape earned its place over thirty verbs in an earlier version of this
 * course, and is kept. Three things differ from it:
 *
 * 1. **No Spanish gloss of a form.** A verb form is never translated; only the
 *    explanations around them (`note`, `imperatifNote`, the group's name) have
 *    a Spanish twin, for the interface in Spanish (#102).
 * 2. **The imparfait is here.** It used to live only in `grammaire/l-imparfait`,
 *    so the one tense whose forms are perfectly regular was the one tense you
 *    could not look up.
 * 3. **One route for every verb.** `app/conjugaison/[verbe]/page.tsx` renders
 *    all of them, the way `[chapitre]` renders the chapter pages (#56).
 *
 * **Two tenses are generated, and for the same reason**: every French verb
 * shares one set of endings, so storing six forms would be storing the same
 * six endings twelve times and inviting a typo into one of them.
 *
 * - **futur simple** — stem + `ai as a ons ez ont`. The stem always ends in
 *   `r` (`parler`, `ser`, `viendr`), which `assertVerbs()` checks.
 * - **imparfait** — stem + `ais ais ait ions iez aient`, the stem being the
 *   *nous* form of the présent minus `-ons`. `être` is the only verb in French
 *   whose imparfait stem is not that, and it is stored like all the others
 *   because the field holds the stem rather than the rule.
 *
 * **The trap that generation carries, and how it is handled.** A `-ger` or
 * `-cer` verb keeps its soft consonant before `a` and loses it before `i`:
 * *je mangeais* but *nous mangions*; *je commençais* but *nous commencions*.
 * One stem cannot say both, so such a verb stores **two**: `imparfait` is the
 * bare stem used before `-ions` and `-iez`, and `imparfaitDevantA` is the
 * softened one used before the four endings that begin with `a`. Both are
 * written out rather than derived, because a rule that inserts an `e` is a rule
 * that will one day insert it into the wrong verb.
 *
 * `assertVerbs()` holds the pair together: a stem ending in `c` or `g` **must**
 * carry its softened twin, that twin must end in `ç` or `ge`, and a stem that
 * is already softened (ending in `e` or `ç`) is refused outright as the right
 * string in the wrong field.
 *
 * Verb shape:
 *   slug       — route segment, ASCII (`etre`, not `être`)
 *   infinitif  — display name, accented
 *   groupe     — '1er groupe' | '2e groupe' | '3e groupe'
 *   note       — one line under the header, where the verb has a trap worth
 *                naming; `{ fr, es }` (see `Explication`)
 *   aux        — 'avoir' | 'être', the passé composé auxiliary
 *   participe  — past participle, masculine singular
 *   ppresent   — participe présent, with the stem/ending split
 *   present    — the six forms, no pronoun, in order je · tu · il · nous · vous · ils
 *   imparfait  — the imparfait stem, bare (`mang`, `commenc`)
 *   imparfaitDevantA — the softened stem (`mange`, `commenç`), required for a
 *                -ger or -cer verb and meaningless for any other
 *   futur      — the futur simple stem
 *   imperatif  — [tu, nous, vous], or null when the verb has none
 *   imperatifNote — replaces the default "pas d'impératif" line, when the forms
 *                exist on paper but are not used; `{ fr, es }` too
 *
 * `|` marks where the ending begins. A form with no `|` is all stem (`ai`,
 * `va`), which is a fact about the verb and not a missing split.
 */

export type Groupe = "1er groupe" | "2e groupe" | "3e groupe";
export type Auxiliaire = "avoir" | "être";

/** The group's name in Spanish. A `Record`, so a fourth `Groupe` without one
 *  fails to compile. */
export const GROUPE_ES: Record<Groupe, string> = {
  "1er groupe": "1.er grupo",
  "2e groupe": "2.º grupo",
  "3e groupe": "3.er grupo",
};

/**
 * An explanation in both interface languages (#102). Both are required, so a
 * note written in French alone fails to compile.
 *
 * In `es`, **`{…}` marks French** — a form, an example, a letter, a tense's
 * name: `ConjugationSheet` prints it without the braces, in `lang="fr"`, so a
 * screen reader does not read « nous mangeons » with a Spanish voice. `fr`
 * needs no mark: it is French throughout.
 */
export interface Explication {
  fr: string;
  es: string;
}

export interface Verb {
  slug: string;
  infinitif: string;
  groupe: Groupe;
  note?: Explication;
  aux: Auxiliaire;
  participe: string;
  ppresent: string;
  present: [string, string, string, string, string, string];
  imparfait: string;
  imparfaitDevantA?: string;
  futur: string;
  imperatif: [string, string, string] | null;
  imperatifNote?: Explication;
}

export const PRONOUNS = {
  masculin: ["je", "tu", "il", "nous", "vous", "ils"],
  feminin: ["je", "tu", "elle", "nous", "vous", "elles"],
} as const;

export const IMPERATIF_PERSONS = ["(tu)", "(nous)", "(vous)"] as const;

/**
 * Participle agreement, by person, when the auxiliary is `être`.
 *
 * **The `vous` row is the plural reading, and it is only half the truth.** A
 * `vous` addressed to one person out of politeness takes a singular participle —
 * *vous êtes allée*, not *vous êtes allées* — and for a learner that is the more
 * common of the two. A table cannot show both without becoming *allé(e)(s)*, so
 * the row stays plural and `ConjugationSheet` prints the singular underneath the
 * passé composé, in the gender currently selected.
 */
export const AGREEMENT = {
  masculin: ["", "", "", "s", "s", "s"],
  feminin: ["e", "e", "e", "es", "es", "es"],
} as const;

export const FUTUR_ENDINGS = ["ai", "as", "a", "ons", "ez", "ont"] as const;
export const IMPARFAIT_ENDINGS = [
  "ais",
  "ais",
  "ait",
  "ions",
  "iez",
  "aient",
] as const;

export const verbs: Verb[] = [
  /* ── Les deux auxiliaires ─────────────────────────────────────────────── */
  {
    slug: "etre",
    infinitif: "être",
    groupe: "3e groupe",
    note: {
      fr: "Auxiliaire. Sert à former le passé composé des verbes de mouvement et de tous les verbes pronominaux.",
      es: "Auxiliar. Sirve para formar el {passé composé} de los verbos de movimiento y de todos los verbos pronominales.",
    },
    aux: "avoir",
    participe: "été",
    ppresent: "ét|ant",
    present: ["sui|s", "e|s", "es|t", "somm|es", "êt|es", "so|nt"],
    imparfait: "ét",
    futur: "ser",
    imperatif: ["soi|s", "soy|ons", "soy|ez"],
  },
  {
    slug: "avoir",
    infinitif: "avoir",
    groupe: "3e groupe",
    note: {
      fr: "Auxiliaire. C’est lui qui sert au passé composé de la grande majorité des verbes.",
      es: "Auxiliar. Es el que forma el {passé composé} de la gran mayoría de los verbos.",
    },
    aux: "avoir",
    participe: "eu",
    ppresent: "ay|ant",
    present: ["ai", "a|s", "a", "av|ons", "av|ez", "o|nt"],
    imparfait: "av",
    futur: "aur",
    imperatif: ["ai|e", "ay|ons", "ay|ez"],
  },

  /* ── Les deux modèles réguliers ───────────────────────────────────────── */
  {
    slug: "parler",
    infinitif: "parler",
    groupe: "1er groupe",
    note: {
      fr: "Modèle du 1er groupe : tous les verbes en -er se conjuguent ainsi, sauf aller.",
      es: "Modelo del 1.er grupo: todos los verbos en {-er} se conjugan así, menos {aller}.",
    },
    aux: "avoir",
    participe: "parlé",
    ppresent: "parl|ant",
    present: ["parl|e", "parl|es", "parl|e", "parl|ons", "parl|ez", "parl|ent"],
    imparfait: "parl",
    futur: "parler",
    imperatif: ["parl|e", "parl|ons", "parl|ez"],
  },
  {
    slug: "finir",
    infinitif: "finir",
    groupe: "2e groupe",
    note: {
      fr: "Modèle du 2e groupe : le -iss- apparaît au pluriel, et il reste à l’imparfait (nous finissions).",
      es: "Modelo del 2.º grupo: {-iss-} aparece en plural y se mantiene en el imperfecto ({nous finissions}).",
    },
    aux: "avoir",
    participe: "fini",
    ppresent: "finiss|ant",
    present: [
      "fin|is",
      "fin|is",
      "fin|it",
      "fin|issons",
      "fin|issez",
      "fin|issent",
    ],
    imparfait: "finiss",
    futur: "finir",
    imperatif: ["fin|is", "fin|issons", "fin|issez"],
  },

  /* ── Les deux orthographes du 1er groupe ──────────────────────────────── */
  {
    slug: "manger",
    infinitif: "manger",
    groupe: "1er groupe",
    note: {
      fr: "Verbe en -ger : le e se maintient devant a et o pour garder le son doux du g (nous mangeons, je mangeais), et il disparaît devant i (nous mangions).",
      es: "Verbo en {-ger}: la {e} se mantiene delante de {a} y de {o} para que la {g} siga sonando como en {manger} ({nous mangeons}, {je mangeais}), y desaparece delante de {i} ({nous mangions}).",
    },
    aux: "avoir",
    participe: "mangé",
    ppresent: "mange|ant",
    present: ["mang|e", "mang|es", "mang|e", "mange|ons", "mang|ez", "mang|ent"],
    imparfait: "mang",
    imparfaitDevantA: "mange",
    futur: "manger",
    imperatif: ["mang|e", "mange|ons", "mang|ez"],
  },
  {
    slug: "commencer",
    infinitif: "commencer",
    groupe: "1er groupe",
    note: {
      fr: "Verbe en -cer : la cédille garde le son [s] devant a et o (nous commençons, je commençais), et elle disparaît devant i (nous commencions).",
      es: "Verbo en {-cer}: la cedilla mantiene el sonido [s] delante de {a} y de {o} ({nous commençons}, {je commençais}), y desaparece delante de {i} ({nous commencions}).",
    },
    aux: "avoir",
    participe: "commencé",
    ppresent: "commenç|ant",
    present: [
      "commenc|e",
      "commenc|es",
      "commenc|e",
      "commenç|ons",
      "commenc|ez",
      "commenc|ent",
    ],
    imparfait: "commenc",
    imparfaitDevantA: "commenç",
    futur: "commencer",
    imperatif: ["commenc|e", "commenç|ons", "commenc|ez"],
  },

  /* ── Les six irréguliers qu’on ne peut pas contourner ─────────────────── */
  {
    slug: "aller",
    infinitif: "aller",
    groupe: "3e groupe",
    note: {
      fr: "Seul verbe en -er du 3e groupe. Se conjugue avec être au passé composé.",
      es: "El único verbo en {-er} del 3.er grupo. Se conjuga con {être} en el {passé composé}.",
    },
    aux: "être",
    participe: "allé",
    ppresent: "all|ant",
    present: ["vai|s", "va|s", "va", "all|ons", "all|ez", "vo|nt"],
    imparfait: "all",
    futur: "ir",
    imperatif: ["va", "all|ons", "all|ez"],
  },
  {
    slug: "faire",
    infinitif: "faire",
    groupe: "3e groupe",
    note: {
      fr: "Attention à « vous faites », et non « vous faisez », et à « ils font ».",
      es: "Cuidado con {« vous faites »}, y no {« vous faisez »}, y con {« ils font »}.",
    },
    aux: "avoir",
    participe: "fait",
    ppresent: "fais|ant",
    present: ["fai|s", "fai|s", "fai|t", "fais|ons", "fait|es", "fo|nt"],
    imparfait: "fais",
    futur: "fer",
    imperatif: ["fai|s", "fais|ons", "fait|es"],
  },
  {
    slug: "prendre",
    infinitif: "prendre",
    groupe: "3e groupe",
    note: {
      fr: "Le d disparaît au pluriel (nous prenons) et le n double à la 3e personne (ils prennent).",
      es: "La {d} desaparece en plural ({nous prenons}) y la {n} se duplica en la 3.ª persona del plural ({ils prennent}).",
    },
    aux: "avoir",
    participe: "pris",
    ppresent: "pren|ant",
    present: ["prend|s", "prend|s", "prend", "pren|ons", "pren|ez", "prenn|ent"],
    imparfait: "pren",
    futur: "prendr",
    imperatif: ["prend|s", "pren|ons", "pren|ez"],
  },
  {
    slug: "venir",
    infinitif: "venir",
    groupe: "3e groupe",
    note: {
      fr: "Se conjugue avec être au passé composé. Le radical devient vien- au singulier et à la 3e personne du pluriel, où le n double (ils viennent).",
      es: "Se conjuga con {être} en el {passé composé}. La raíz pasa a {vien-} en singular y en la 3.ª persona del plural, donde además la {n} se duplica ({ils viennent}).",
    },
    aux: "être",
    participe: "venu",
    ppresent: "ven|ant",
    present: ["vien|s", "vien|s", "vien|t", "ven|ons", "ven|ez", "vienn|ent"],
    imparfait: "ven",
    futur: "viendr",
    imperatif: ["vien|s", "ven|ons", "ven|ez"],
  },
  {
    slug: "partir",
    infinitif: "partir",
    groupe: "3e groupe",
    note: {
      fr: "Se conjugue avec être au passé composé. Le radical perd son t à je et tu : je pars, tu pars, mais il part, nous partons.",
      es: "Se conjuga con {être} en el {passé composé}. La raíz pierde la {t} en {je} y {tu}: {je pars}, {tu pars}, pero {il part}, {nous partons}.",
    },
    aux: "être",
    participe: "parti",
    ppresent: "part|ant",
    present: ["par|s", "par|s", "par|t", "part|ons", "part|ez", "part|ent"],
    imparfait: "part",
    futur: "partir",
    imperatif: ["par|s", "part|ons", "part|ez"],
  },
  {
    slug: "pouvoir",
    infinitif: "pouvoir",
    groupe: "3e groupe",
    note: {
      fr: "Verbe modal : il est suivi d’un infinitif (je peux venir).",
      es: "Verbo modal: va seguido de un infinitivo ({je peux venir}).",
    },
    aux: "avoir",
    participe: "pu",
    ppresent: "pouv|ant",
    present: ["peu|x", "peu|x", "peu|t", "pouv|ons", "pouv|ez", "peuv|ent"],
    imparfait: "pouv",
    futur: "pourr",
    imperatif: null,
  },
  {
    slug: "vouloir",
    infinitif: "vouloir",
    groupe: "3e groupe",
    note: {
      fr: "Verbe modal. Son impératif est rare, sauf « veuillez », très courant par politesse.",
      es: "Verbo modal. Su imperativo es raro, salvo {« veuillez »}, muy frecuente por cortesía.",
    },
    aux: "avoir",
    participe: "voulu",
    ppresent: "voul|ant",
    present: ["veu|x", "veu|x", "veu|t", "voul|ons", "voul|ez", "veul|ent"],
    imparfait: "voul",
    futur: "voudr",
    imperatif: ["veuill|e", "veuill|ons", "veuill|ez"],
  },
  {
    slug: "devoir",
    infinitif: "devoir",
    groupe: "3e groupe",
    note: {
      fr: "Verbe modal : il est suivi d’un infinitif (je dois partir). Son participe porte un accent circonflexe au masculin singulier seulement : dû, mais due, dus, dues.",
      es: "Verbo modal: va seguido de un infinitivo ({je dois partir}). Su participio lleva acento circunflejo solo en masculino singular: {dû}, pero {due}, {dus}, {dues}.",
    },
    aux: "avoir",
    participe: "dû",
    ppresent: "dev|ant",
    present: ["doi|s", "doi|s", "doi|t", "dev|ons", "dev|ez", "doiv|ent"],
    imparfait: "dev",
    futur: "devr",
    imperatif: null,
    imperatifNote: {
      fr: "Les formes existent (dois, devons, devez) mais ne s’emploient pas : on dit « tu dois partir », pas « pars, tu le dois ».",
      es: "Las formas existen ({dois}, {devons}, {devez}), pero no se usan: se dice {« tu dois partir »}, no {« pars, tu le dois »}.",
    },
  },
];

/**
 * The six imparfait forms, `radical|terminaison`.
 *
 * The softened stem is used before an ending that begins with `a` and only
 * there, which is the whole -ger / -cer rule: *je mangeais* against *nous
 * mangions*. A verb with no softened twin uses its one stem six times.
 */
export function imparfaitForms(verb: Verb): string[] {
  return IMPARFAIT_ENDINGS.map((ending) => {
    const stem = ending.startsWith("a")
      ? (verb.imparfaitDevantA ?? verb.imparfait)
      : verb.imparfait;
    return `${stem}|${ending}`;
  });
}

/** The six futur forms. No verb softens here: the stem already ends in `r`. */
export function futurForms(verb: Verb): string[] {
  return FUTUR_ENDINGS.map((ending) => `${verb.futur}|${ending}`);
}

/** The whole form, with the stem/ending mark taken out. */
export function plain(form: string): string {
  return form.replace("|", "");
}

export function findVerb(slug: string): Verb | undefined {
  return verbs.find((verb) => verb.slug === slug);
}

/**
 * Checked at import, so a bad entry fails `next build` rather than rendering a
 * wrong form to a learner. Same discipline as `assertLessonIds()` in the
 * manifest, and for the same reason: nothing else in the toolchain can tell
 * that « nous mangeions » is not a French word.
 */
function assertVerbs(): void {
  const seen = new Set<string>();

  for (const verb of verbs) {
    const where = `conjugaisons.ts: ${verb.slug}`;

    if (!/^[a-z]+$/.test(verb.slug)) {
      throw new Error(`${where}: slug must be lower-case ASCII`);
    }
    if (seen.has(verb.slug)) throw new Error(`${where}: duplicate slug`);
    seen.add(verb.slug);

    if (verb.present.length !== 6) {
      throw new Error(`${where}: présent needs six forms`);
    }
    for (const form of [...verb.present, verb.ppresent]) {
      if ((form.match(/\|/g) ?? []).length > 1) {
        throw new Error(`${where}: "${form}" has more than one | mark`);
      }
    }

    if (!verb.futur.endsWith("r")) {
      throw new Error(
        `${where}: the futur stem "${verb.futur}" does not end in r — every French futur stem does`,
      );
    }

    /* The -ger / -cer pair, checked in both directions. See the header. */
    if (/[eç]$/.test(verb.imparfait)) {
      throw new Error(
        `${where}: the imparfait stem "${verb.imparfait}" is already softened, so « nous ${verb.imparfait}ions » would be wrong. Put the bare stem here and the softened one in imparfaitDevantA.`,
      );
    }

    const needsSoft = /[cg]$/.test(verb.imparfait);
    if (needsSoft && !verb.imparfaitDevantA) {
      throw new Error(
        `${where}: the imparfait stem "${verb.imparfait}" ends in c or g, so « je ${verb.imparfait}ais » would lose the soft sound. Add imparfaitDevantA ("${verb.imparfait.endsWith("g") ? verb.imparfait + "e" : verb.imparfait.slice(0, -1) + "ç"}").`,
      );
    }
    if (!needsSoft && verb.imparfaitDevantA) {
      throw new Error(
        `${where}: imparfaitDevantA is set on a verb whose stem "${verb.imparfait}" does not soften. Remove it.`,
      );
    }
    if (verb.imparfaitDevantA) {
      const expected = verb.imparfait.endsWith("g")
        ? `${verb.imparfait}e`
        : `${verb.imparfait.slice(0, -1)}ç`;
      if (verb.imparfaitDevantA !== expected) {
        throw new Error(
          `${where}: imparfaitDevantA is "${verb.imparfaitDevantA}" but the stem "${verb.imparfait}" softens to "${expected}".`,
        );
      }
    }
  }
}

assertVerbs();
