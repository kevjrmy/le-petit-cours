import type { Parcours } from "./index";

/* The A2 pages as the DELF A2 asks for them: the everyday first, then time and
   place, then the past — told, then described — then plans, and the readings
   last because they spend all of it. Each étape pairs the rule with the scene,
   the drill or the translation that makes it work. The four épreuves close it
   (#89). */
export const A2: Parcours = {
  id: "a2",
  title: "Parcours A2",
  blurb: "Vous vous débrouillez. Le quotidien, raconter au passé, parler de ses projets.",
  level: "A2",
  etapes: [
    {
      title: "Ce qu’on mange, ce qu’on n’a pas",
      lessons: [
        "gram-articles-partitifs",
        "gram-negation",
        "astuce-pas-de",
        "ex-le-un-ou-du",
        "voc-recette-croissants",
        "conv-preparer-un-repas",
        "trad-le-frigo-est-vide",
      ],
    },
    {
      title: "L’heure, les jours, les rendez-vous",
      lessons: ["voc-heure", "voc-jours-et-date", "conv-rendez-vous-medecin"],
    },
    {
      title: "Se déplacer, décrire un lieu",
      lessons: [
        "astuce-a-en-au-aux",
        "conv-demander-son-chemin",
        "gram-determinants-demonstratifs",
        "conv-decrire-sa-ville",
        "trad-le-village",
      ],
    },
    {
      title: "Montrer, choisir, commander",
      lessons: [
        "gram-pronoms-demonstratifs",
        "ex-ce-ou-celui",
        "conv-choisir-un-cadeau",
        "conv-au-restaurant",
      ],
    },
    {
      title: "Raconter ce qui s’est passé",
      lessons: [
        "gram-passe-compose",
        "astuce-etre-ou-avoir",
        "ex-etre-ou-avoir",
        "trad-hier-dans-la-rue",
        "trad-week-end-plage",
      ],
    },
    {
      title: "Raconter comment c’était",
      lessons: [
        "gram-imparfait",
        "gram-pc-ou-imparfait",
        "ex-terminaisons",
        "conv-parler-espagne",
        "trad-une-journee",
      ],
    },
    {
      title: "Le travail et les projets",
      lessons: [
        "gram-futur-proche",
        "voc-travail",
        "conv-parler-du-travail",
        "lect-entretien-embauche",
        "trad-quand-jetais-petite",
      ],
    },
    {
      title: "Ne pas répéter le nom",
      lessons: ["gram-pronoms-cod-coi", "lect-cosette-bois"],
    },
    {
      title: "Lire et relire",
      lessons: [
        "lect-lion-et-rat",
        "lect-phileas-fogg",
        "lect-invitation-voyage",
        "ex-trouve-la-faute",
      ],
    },
  ],
  exam: [
    "delf-a2-comprehension-oral",
    "delf-a2-comprehension-ecrits",
    "delf-a2-production-ecrite",
    "delf-a2-production-orale",
  ],
};
