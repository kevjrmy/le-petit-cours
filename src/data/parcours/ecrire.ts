import type { Parcours } from "./index";

/* The heritage speaker's path (#13): they say all of this already, and write
   it wrong. Remediation order — the accents first, because every later page
   leans on them; then the words that sound alike, pair by pair; then the end
   of the verb, which is where a spoken French hides its spelling; then the
   irregular sheets to check against. No level: literacy is not a rung. */
export const ECRIRE: Parcours = {
  id: "ecrire-le-francais",
  title: "Écrire le français",
  blurb: "Vous le parlez déjà. Écrire ce que vous savez dire : accents, homophones, terminaisons.",
  level: null,
  etapes: [
    {
      title: "Les accents",
      lessons: ["orth-accents"],
    },
    {
      title: "Les mots qui se prononcent pareil",
      lessons: ["orth-homophones", "ex-trouve-la-faute"],
    },
    {
      title: "ce, se, ces, ses",
      lessons: [
        "orth-homophones-demonstratif",
        "astuce-ces-ou-ses",
        "orth-determinants-possessifs",
        "ex-homophones-demonstratif",
      ],
    },
    {
      title: "L’article et ses sosies",
      lessons: ["orth-homophones-article", "ex-relisez-le-paragraphe"],
    },
    {
      title: "La fin du verbe",
      lessons: [
        "orth-terminaisons-verbales",
        "conj-parler",
        "conj-finir",
        "ex-terminaisons",
        "conj-etre",
        "conj-avoir",
        "astuce-etre-ou-avoir",
      ],
    },
    {
      title: "Les verbes qui changent",
      lessons: [
        "conj-manger",
        "conj-commencer",
        "conj-aller",
        "conj-faire",
        "conj-prendre",
        "conj-venir",
        "conj-partir",
        "conj-pouvoir",
        "conj-vouloir",
        "conj-devoir",
      ],
    },
  ],
};
