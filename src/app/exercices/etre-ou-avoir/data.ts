/**
 * « Être ou avoir ? » — les seize verbes à classer.
 *
 * **Chaque item n'a qu'une réponse défendable.** Les verbes qui changent
 * d'auxiliaire avec un complément d'objet — *sortir, monter, descendre,
 * passer, retourner* — ne peuvent pas être posés seuls : « sortir » prend
 * *être* (elle est sortie) **et** *avoir* (elle a sorti la poubelle), et la
 * leçon l'enseigne dans son astuce. Ils entrent donc avec leur complément, ce
 * qui fait de la paire la leçon elle-même plutôt qu'un piège.
 *
 * Vérification (l'answer d'un tri est la colonne : il faut donc compter les
 * deux colonnes et relire les items ambigus) :
 *
 *   npx tsx -e "
 *   import { verbs } from './src/app/exercices/etre-ou-avoir/data'
 *   const e = verbs.filter(v => v.aux === 'etre').length
 *   console.log(verbs.length, 'items', e, 'être', verbs.length - e, 'avoir')
 *   if (new Set(verbs.map(v => v.id)).size !== verbs.length) console.log('id en double')
 *   if (new Set(verbs.map(v => v.text)).size !== verbs.length) console.log('texte en double')"
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

export const verbs: VerbItem[] = [
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
