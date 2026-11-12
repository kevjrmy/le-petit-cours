import type { Parcours } from "./index";

/* Every A1 page, in five gestures: say who you are, talk about your people,
   your tastes, count and buy, describe where you live and how you get about. The verb sheets open it
   because the scene asks for « je suis » and « j'ai » before any article does.
   Each étape closes on a literary work read in its A1 body (#92), the one whose
   text spends what the étape taught: Cosette is asked her name, her age and
   where she lives; the fable is all « un lion, un rat, les pattes » and Vérone
   is « deux familles »; Proust goes to bed and reads; Fogg keeps his hours and
   Cyrano's audience pays at the door; Baudelaire describes a room and a
   country, and Dantès comes into port. */
export const A1: Parcours = {
  id: "a1",
  title: "Parcours A1",
  blurb: "Vous commencez. Se présenter, parler des siens et de ses goûts, compter, acheter, dire la date, décrire où l'on habite et comment on se déplace, et lire de grands textes avec leur traduction.",
  level: "A1",
  es: {
    title: "Recorrido A1",
    blurb:
      "Empiezas. Presentarte, hablar de los tuyos y de tus gustos, contar, comprar, decir la fecha, describir dónde vives y cómo te mueves, y leer grandes textos con su traducción.",
  },
  etapes: [
    {
      title: "Dire qui on est",
      es: { title: "Decir quién eres" },
      lessons: [
        "conj-etre",
        "conj-avoir",
        "gram-c-est-ce-sont",
        "astuce-tu-ou-vous",
        "ex-tu-ou-vous",
        "conv-se-presenter",
        "voc-pays-nationalites",
        "ex-nationalites-a1",
        "lect-cosette-bois",
      ],
    },
    {
      title: "Parler des siens",
      es: { title: "Hablar de los tuyos" },
      lessons: [
        "gram-articles-definis",
        "gram-articles-indefinis",
        "gram-singulier-pluriel",
        "lect-lion-et-rat",
        "voc-famille",
        "lect-romeo-juliette",
      ],
    },
    {
      title: "Ma vie, mes goûts",
      es: { title: "Mi vida, mis gustos" },
      lessons: [
        "gram-verbes-er-a1",
        "ex-verbes-er-a1",
        "gram-parler-de-ses-gouts",
        "ex-gouts-a1",
        "gram-poser-une-question",
        "ex-questions-a1",
        "conv-parler-de-ses-gouts",
        "lect-swann",
      ],
    },
    {
      title: "Compter et acheter",
      es: { title: "Contar y comprar" },
      lessons: [
        "voc-nombres",
        "voc-jours-mois-a1",
        "ex-date-a1",
        "lect-phileas-fogg",
        "conv-faire-des-achats",
        "lect-cyrano",
      ],
    },
    {
      title: "Chez soi et en ville",
      es: { title: "En casa y en la ciudad" },
      lessons: [
        "voc-maison",
        "lect-invitation-voyage",
        "voc-transports",
        "ex-articles-a1",
        "lect-monte-cristo",
      ],
    },
  ],
};
