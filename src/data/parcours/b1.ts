import type { Parcours } from "./index";

/* What B1 has of its own: four grammar pages, and the B1 sets of the drills and
   readings (#87). Short, because B1 has no syllabus map yet (§12.2) — the
   order will come from it. No épreuve: there is no B1 paper. */
export const B1: Parcours = {
  id: "b1",
  title: "Parcours B1",
  blurb: "Vous suivez une conversation. Raconter en détail, imaginer, lire de près.",
  level: "B1",
  etapes: [
    {
      title: "Raconter dans l’ordre",
      lessons: ["gram-plus-que-parfait", "ex-etre-ou-avoir", "lect-monte-cristo"],
    },
    {
      title: "Imaginer, demander poliment",
      lessons: ["gram-conditionnel-present", "lect-cyrano"],
    },
    {
      title: "Reprendre sans nommer",
      lessons: [
        "gram-ce-qui-ce-que",
        "ex-ce-ou-celui",
        "gram-article-disparait",
        "ex-le-un-ou-du",
      ],
    },
    {
      title: "Lire de près",
      lessons: [
        "lect-swann",
        "lect-romeo-juliette",
        "lect-cosette-bois",
        "lect-lion-et-rat",
        "lect-phileas-fogg",
        "lect-invitation-voyage",
        "lect-entretien-embauche",
        "ex-trouve-la-faute",
      ],
    },
  ],
};
