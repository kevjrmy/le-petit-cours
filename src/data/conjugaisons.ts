/**
 * The conjugation tables, and the only place a verb form is written down.
 *
 * Ported from the Vue app's `src/data/conjugaisons.js` — the *model*, not the
 * file: the shape earned its place over thirty verbs and is kept, and three
 * things change with it.
 *
 * 1. **No Spanish gloss.** The `es` field is gone (`docs/decisions.md` #53).
 * 2. **The imparfait is here**, which the Vue sheet never had: it lived only in
 *    `grammaire/l-imparfait`, so the one tense whose forms are perfectly regular
 *    was the one tense you could not look up.
 * 3. **Twelve verbs, one route.** `app/conjugaison/[verbe]/page.tsx` renders all
 *    of them, the way `[chapitre]` renders the chapter pages (#56).
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
 *   note       — one line under the header, where the verb has a trap worth naming
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
 *                exist on paper but are not used
 *
 * `|` marks where the ending begins. A form with no `|` is all stem (`ai`,
 * `va`), which is a fact about the verb and not a missing split.
 */

export type Groupe = "1er groupe" | "2e groupe" | "3e groupe";
export type Auxiliaire = "avoir" | "être";

export interface Verb {
  slug: string;
  infinitif: string;
  groupe: Groupe;
  note?: string;
  aux: Auxiliaire;
  participe: string;
  ppresent: string;
  present: [string, string, string, string, string, string];
  imparfait: string;
  imparfaitDevantA?: string;
  futur: string;
  imperatif: [string, string, string] | null;
  imperatifNote?: string;
}

export const PRONOUNS = {
  masculin: ["je", "tu", "il", "nous", "vous", "ils"],
  feminin: ["je", "tu", "elle", "nous", "vous", "elles"],
} as const;

export const IMPERATIF_PERSONS = ["(tu)", "(nous)", "(vous)"] as const;

/** Participle agreement, by person, when the auxiliary is `être`. */
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
    note: "Auxiliaire. Sert à former le passé composé des verbes de mouvement et de tous les verbes pronominaux.",
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
    note: "Auxiliaire. C’est lui qui sert au passé composé de la grande majorité des verbes.",
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
    note: "Modèle du 1er groupe : tous les verbes en -er se conjuguent ainsi, sauf aller.",
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
    note: "Modèle du 2e groupe : le -iss- apparaît au pluriel, et il reste à l’imparfait (nous finissions).",
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
    note: "Verbe en -ger : le e se maintient devant a et o pour garder le son doux du g (nous mangeons, je mangeais), et il disparaît devant i (nous mangions).",
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
    note: "Verbe en -cer : la cédille garde le son [s] devant a et o (nous commençons, je commençais), et elle disparaît devant i (nous commencions).",
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
    note: "Seul verbe en -er du 3e groupe. Se conjugue avec être au passé composé.",
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
    note: "Attention à « vous faites », et non « vous faisez », et à « ils font ».",
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
    note: "Le d disparaît au pluriel (nous prenons) et le n double à la 3e personne (ils prennent).",
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
    note: "Se conjugue avec être au passé composé. Le radical double le n au singulier et à la 3e personne du pluriel.",
    aux: "être",
    participe: "venu",
    ppresent: "ven|ant",
    present: ["vien|s", "vien|s", "vien|t", "ven|ons", "ven|ez", "vienn|ent"],
    imparfait: "ven",
    futur: "viendr",
    imperatif: ["vien|s", "ven|ons", "ven|ez"],
  },
  {
    slug: "pouvoir",
    infinitif: "pouvoir",
    groupe: "3e groupe",
    note: "Verbe modal : il est suivi d’un infinitif (je peux venir).",
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
    note: "Verbe modal. Son impératif est rare, sauf « veuillez », très courant par politesse.",
    aux: "avoir",
    participe: "voulu",
    ppresent: "voul|ant",
    present: ["veu|x", "veu|x", "veu|t", "voul|ons", "voul|ez", "veul|ent"],
    imparfait: "voul",
    futur: "voudr",
    imperatif: ["veuill|e", "veuill|ons", "veuill|ez"],
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
