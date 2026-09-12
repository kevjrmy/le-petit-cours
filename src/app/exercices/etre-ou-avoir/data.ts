import type { Level } from "@/data/navigation";

/**
 * « Être ou avoir ? » — les verbes à classer, seize par niveau.
 *
 * **Chaque item n'a qu'une réponse défendable.** Les verbes qui changent
 * d'auxiliaire avec un complément d'objet — *sortir, monter, descendre,
 * passer, retourner* — ne peuvent pas être posés seuls : « sortir » prend
 * *être* (elle est sortie) **et** *avoir* (elle a sorti la poubelle), et la
 * leçon l'enseigne dans son astuce. Ils entrent donc avec leur complément, ce
 * qui fait de la paire la leçon elle-même plutôt qu'un piège.
 *
 * **Un lot par niveau** (`docs/decisions.md` #68). La mécanique ne change pas :
 * ce sont les verbes qui montent. A2 oppose la petite famille d'*être* à la
 * masse des autres ; B1 prend les cinq verbes qui changent d'auxiliaire selon
 * qu'ils ont un complément d'objet, et y ajoute *courir* et *marcher*, qui
 * disent un déplacement et prennent *avoir* — c'est-à-dire les deux endroits
 * où la règle apprise en A2 se retourne contre l'apprenante.
 *
 * Vérification (l'answer d'un tri est la colonne : il faut donc compter les
 * deux colonnes de chaque lot et relire les items ambigus) :
 *
 *   node --experimental-strip-types --input-type=module -e "
 *   import { BANKS } from './src/app/exercices/etre-ou-avoir/data.ts'
 *   for (const [level, bank] of Object.entries(BANKS)) {
 *     const e = bank.filter(v => v.aux === 'etre').length
 *     console.log(level, bank.length, 'items', e, 'être', bank.length - e, 'avoir')
 *     if (new Set(bank.map(v => v.id)).size !== bank.length) console.log('  id en double')
 *     if (new Set(bank.map(v => v.text)).size !== bank.length) console.log('  texte en double')
 *   }"
 */
export interface VerbItem {
  /** Permanent within this file: the key React renders by. */
  id: string;
  /** What the chip says. A complement only where the verb needs one. */
  text: string;
  aux: "etre" | "avoir";
  /** Shown only when the chip was misplaced, so it corrects rather than tells. */
  because: string;
}

const A2: VerbItem[] = [
  {
    id: "aller",
    text: "aller",
    aux: "etre",
    because: "Un déplacement : elle est allée à Paris.",
  },
  {
    id: "venir",
    text: "venir",
    aux: "etre",
    because: "Un déplacement : il est venu à midi.",
  },
  {
    id: "partir",
    text: "partir",
    aux: "etre",
    because: "Un déplacement : nous sommes partis tôt.",
  },
  {
    id: "naitre",
    text: "naître",
    aux: "etre",
    because: "Un changement d’état : elle est née en mars.",
  },
  {
    id: "rester",
    text: "rester",
    aux: "etre",
    because:
      "Rester est dans la liste même s’il ne dit aucun mouvement : il est resté chez lui.",
  },
  {
    id: "tomber",
    text: "tomber",
    aux: "etre",
    because: "Un déplacement : elle est tombée dans l’escalier.",
  },
  {
    id: "se-lever",
    text: "se lever",
    aux: "etre",
    because: "Tous les verbes pronominaux prennent être : je me suis levé.",
  },
  {
    id: "sortir-maison",
    text: "sortir de la maison",
    aux: "etre",
    because:
      "Sans complément d’objet, sortir prend être : elle est sortie de la maison.",
  },
  {
    id: "manger",
    text: "manger",
    aux: "avoir",
    because: "La grande majorité des verbes prennent avoir : j’ai mangé.",
  },
  {
    id: "parler",
    text: "parler",
    aux: "avoir",
    because: "La grande majorité des verbes prennent avoir : nous avons parlé.",
  },
  {
    id: "finir",
    text: "finir",
    aux: "avoir",
    because: "La grande majorité des verbes prennent avoir : ils ont fini.",
  },
  {
    id: "prendre",
    text: "prendre",
    aux: "avoir",
    because: "La grande majorité des verbes prennent avoir : elle a pris le train.",
  },
  {
    id: "faire",
    text: "faire",
    aux: "avoir",
    because: "La grande majorité des verbes prennent avoir : tu as fait le ménage.",
  },
  {
    id: "attendre",
    text: "attendre",
    aux: "avoir",
    because: "La grande majorité des verbes prennent avoir : j’ai attendu une heure.",
  },
  {
    id: "voir",
    text: "voir",
    aux: "avoir",
    because: "La grande majorité des verbes prennent avoir : nous avons vu le film.",
  },
  {
    id: "sortir-poubelle",
    text: "sortir la poubelle",
    aux: "avoir",
    because:
      "Avec un complément d’objet, sortir prend avoir : elle a sorti la poubelle.",
  },
];

/**
 * B1 : les cinq verbes à double auxiliaire, avec leur complément.
 *
 * **Chacun paraît deux fois, et c'est la paire qui enseigne.** *monter* seul
 * n'a pas de réponse — *elle est montée* et *elle a monté l'escalier* sont
 * justes tous les deux — donc aucun n'entre sans ce qui le décide. Ce sont les
 * cinq vraies paires, et il n'y en a pas une sixième à inventer (`AGENTS.md`
 * §9).
 *
 * *courir* et *marcher* sont là pour la raison inverse : ils disent un
 * déplacement, la règle de A2 les enverrait vers *être*, et ils prennent
 * *avoir*. Un lot qui ne contiendrait que les paires laisserait croire que le
 * déplacement suffit.
 */
const B1: VerbItem[] = [
  {
    id: "monter-train",
    text: "monter dans le train",
    aux: "etre",
    because:
      "Sans complément d’objet, monter prend être : elle est montée dans le train.",
  },
  {
    id: "descendre-bus",
    text: "descendre du bus",
    aux: "etre",
    because:
      "Sans complément d’objet, descendre prend être : il est descendu du bus.",
  },
  {
    id: "passer-gare",
    text: "passer devant la gare",
    aux: "etre",
    because:
      "Sans complément d’objet, passer prend être : nous sommes passés devant la gare.",
  },
  {
    id: "retourner-espagne",
    text: "retourner en Espagne",
    aux: "etre",
    because:
      "Sans complément d’objet, retourner prend être : elle est retournée en Espagne.",
  },
  {
    id: "rentrer-maison",
    text: "rentrer à la maison",
    aux: "etre",
    because:
      "Sans complément d’objet, rentrer prend être : ils sont rentrés à la maison.",
  },
  {
    id: "devenir",
    text: "devenir médecin",
    aux: "etre",
    because: "Un changement d’état : elle est devenue médecin.",
  },
  {
    id: "se-souvenir",
    text: "se souvenir du code",
    aux: "etre",
    because:
      "Tous les verbes pronominaux prennent être : je me suis souvenu du code.",
  },
  {
    id: "s-apercevoir",
    text: "s’apercevoir de la faute",
    aux: "etre",
    because:
      "Tous les verbes pronominaux prennent être : elle s’est aperçue de la faute.",
  },
  {
    id: "monter-escalier",
    text: "monter l’escalier",
    aux: "avoir",
    because:
      "Avec un complément d’objet, monter prend avoir : elle a monté l’escalier.",
  },
  {
    id: "descendre-valises",
    text: "descendre les valises",
    aux: "avoir",
    because:
      "Avec un complément d’objet, descendre prend avoir : il a descendu les valises.",
  },
  {
    id: "passer-heure",
    text: "passer une heure au téléphone",
    aux: "avoir",
    because:
      "Avec un complément d’objet, passer prend avoir : nous avons passé une heure au téléphone.",
  },
  {
    id: "retourner-crepe",
    text: "retourner la crêpe",
    aux: "avoir",
    because:
      "Avec un complément d’objet, retourner prend avoir : elle a retourné la crêpe.",
  },
  {
    id: "rentrer-voiture",
    text: "rentrer la voiture",
    aux: "avoir",
    because:
      "Avec un complément d’objet, rentrer prend avoir : ils ont rentré la voiture.",
  },
  {
    id: "courir",
    text: "courir dix kilomètres",
    aux: "avoir",
    because:
      "Courir dit un déplacement et prend pourtant avoir : elle a couru dix kilomètres.",
  },
  {
    id: "marcher",
    text: "marcher jusqu’au port",
    aux: "avoir",
    because:
      "Marcher dit un déplacement et prend pourtant avoir : nous avons marché jusqu’au port.",
  },
  {
    id: "vivre",
    text: "vivre à Lyon",
    aux: "avoir",
    because: "Vivre prend avoir : ils ont vécu à Lyon pendant dix ans.",
  },
];

/**
 * Les lots, par niveau. **Les clés doivent être exactement les `levels` de la
 * leçon dans le manifeste**, et l'audit de `nav-wiring` ne vérifie que cela.
 */
export const BANKS: Partial<Record<Level, VerbItem[]>> = { A2, B1 };

/** Le lot du niveau regardé, ou le premier écrit si ce niveau n'en a pas. */
export function bankFor(level: Level | null): VerbItem[] {
  return (level ? BANKS[level] : undefined) ?? Object.values(BANKS)[0] ?? [];
}
