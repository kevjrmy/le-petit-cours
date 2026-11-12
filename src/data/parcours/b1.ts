import type { Parcours } from "./index";

/* What B1 has of its own: four grammar pages, and the B1 sets of the drills
   and readings (#87); a literary page's B1 set carries its own, fuller text
   (#92). The étapes follow the FONCTIONS of `docs/levels/b1.md`, the map of
   what B1 asks: telling a story in order (13), imagining (14, 26), taking an
   idea up without naming it (21), the ties between people (15), then reading
   a dialogue closely (20). A new page joins the étape of the function it
   serves; a function with no étape yet opens one. No épreuve: there is no B1
   paper yet. */
export const B1: Parcours = {
  id: "b1",
  title: "Parcours B1",
  blurb: "Vous suivez une conversation. Raconter en détail, imaginer, lire de près.",
  level: "B1",
  es: {
    title: "Recorrido B1",
    blurb: "Sigues una conversación. Contar con detalle, imaginar, leer de cerca.",
  },
  etapes: [
    {
      title: "Raconter dans l’ordre",
      es: { title: "Contar en orden" },
      lessons: [
        "gram-plus-que-parfait",
        "ex-etre-ou-avoir",
        "lect-monte-cristo",
        "lect-swann",
        "lect-lion-et-rat",
      ],
    },
    {
      title: "Imaginer, demander poliment",
      es: { title: "Imaginar, pedir con educación" },
      lessons: ["gram-conditionnel-present", "lect-invitation-voyage"],
    },
    {
      title: "Reprendre sans nommer",
      es: { title: "Retomar sin nombrar" },
      lessons: [
        "gram-ce-qui-ce-que",
        "ex-ce-ou-celui",
        "gram-article-disparait",
        "ex-le-un-ou-du",
      ],
    },
    {
      title: "Ce qui lie les gens",
      es: { title: "Lo que une a la gente" },
      lessons: ["lect-phileas-fogg", "lect-cosette-bois", "lect-romeo-juliette"],
    },
    {
      title: "Lire de près, relire",
      es: { title: "Leer de cerca, releer" },
      lessons: ["lect-cyrano", "lect-entretien-embauche", "ex-trouve-la-faute"],
    },
  ],
};
