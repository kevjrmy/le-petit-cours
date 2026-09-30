import type { Parcours } from "./index";

/* Every A1 page, in three gestures: say who you are, talk about your people,
   count and buy. The verb sheets open it because the scene asks for « je suis »
   and « j'ai » before any article does. */
export const A1: Parcours = {
  id: "a1",
  title: "Parcours A1",
  blurb: "Vous commencez. Se présenter, parler des siens, compter et acheter.",
  level: "A1",
  etapes: [
    {
      title: "Dire qui on est",
      lessons: ["conj-etre", "conj-avoir", "gram-c-est-ce-sont", "conv-se-presenter"],
    },
    {
      title: "Parler des siens",
      lessons: ["gram-articles-definis", "gram-articles-indefinis", "voc-famille"],
    },
    {
      title: "Compter et acheter",
      lessons: ["voc-nombres", "conv-faire-des-achats"],
    },
  ],
};
