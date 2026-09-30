import type { Parcours } from "./index";

/* Every A1 page, in five gestures: say who you are, talk about your people,
   your tastes, count and buy, describe where you live and how you get about. The verb sheets open it
   because the scene asks for « je suis » and « j'ai » before any article does. */
export const A1: Parcours = {
  id: "a1",
  title: "Parcours A1",
  blurb: "Vous commencez. Se présenter, parler des siens et de ses goûts, compter, acheter, dire la date, décrire où l'on habite et comment on se déplace.",
  level: "A1",
  etapes: [
    {
      title: "Dire qui on est",
      lessons: [
        "conj-etre",
        "conj-avoir",
        "gram-c-est-ce-sont",
        "astuce-tu-ou-vous",
        "ex-tu-ou-vous",
        "conv-se-presenter",
        "voc-pays-nationalites",
        "ex-nationalites-a1",
      ],
    },
    {
      title: "Parler des siens",
      lessons: [
        "gram-articles-definis",
        "gram-articles-indefinis",
        "gram-singulier-pluriel",
        "voc-famille",
        "lect-chaperon-rouge",
      ],
    },
    {
      title: "Ma vie, mes goûts",
      lessons: [
        "gram-verbes-er-a1",
        "ex-verbes-er-a1",
        "gram-parler-de-ses-gouts",
        "ex-gouts-a1",
        "gram-poser-une-question",
        "ex-questions-a1",
        "conv-parler-de-ses-gouts",
      ],
    },
    {
      title: "Compter et acheter",
      lessons: ["voc-nombres", "voc-jours-mois-a1", "ex-date-a1", "conv-faire-des-achats"],
    },
    {
      title: "Chez soi et en ville",
      lessons: ["voc-maison", "voc-transports", "ex-articles-a1"],
    },
  ],
};
