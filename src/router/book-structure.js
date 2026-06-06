// src/router/book-structure.js

export const bookStructure = [
  {
    chapter: "Sommaire",
    folder: "sommaire",
    pages: [
      { path: '/', name: 'sommaire', title: 'Sommaire', file: 'index' }
    ]
  },
  {
    chapter: "Orthographe",
    folder: "orthographe",
    pages: [
      {
        path: '/orthographe',
        name: 'orthographe',
        title: 'Sommaire Orthographe',
        file: 'index'
      },
      {
        path: '/orthographe/le-feminin-des-noms',
        name: 'ortho-feminin-noms',
        title: 'Le féminin des noms',
        file: 'le-feminin-des-noms'
      },
      {
        path: '/orthographe/le-pluriel-des-noms',
        name: 'ortho-pluriel-noms',
        title: 'Le pluriel des noms',
        file: 'le-pluriel-des-noms'
      }
    ]
  },
  {
    chapter: "Dictées",
    folder: "dictees",
    pages: [
      { path: '/dictees', name: 'dictees', title: 'Sommaire des Dictées', file: 'index' },
      { path: '/dictees/une-journee-a-paris', name: 'dictee-paris', title: 'Une journée à Paris', file: 'une-journee-a-paris' },
      { path: '/dictees/la-pierre-de-rosette', name: 'dictee-rosette', title: 'La pierre de Rosette', file: 'la-pierre-de-rosette' },
      { path: '/dictees/les-fleurs-du-mal', name: 'dictee-fleurs', title: 'Les fleurs du mal', file: 'les-fleurs-du-mal' }
    ]
  },
  {
    chapter: "Exercices",
    folder: "exercices",
    pages: [
      { path: '/exercices', name: 'exercices', title: 'Liste des Exercices', file: 'index' },
      { path: '/exercices/puzzle-de-mots', name: 'ex-puzzle', title: 'Le Puzzle de Mots', file: 'puzzle-de-mots' },
      { path: '/exercices/le-son-o', name: 'ex-le-son-o', title: 'Le son [o]', file: 'le-son-o' },
      { path: '/exercices/le-detective', name: 'ex-le-detective', title: 'Le détective', file: 'le-detective' },
      { path: '/exercices/les-syllabes', name: 'ex-les-syllabes', title: 'Les syllabes', file: 'les-syllabes' },
      { path: '/exercices/le-tri-de-la-marchande', name: 'ex-le-tri-de-la-marchande', title: 'Le tri de la marchande', file: 'le-tri-de-la-marchande' }
    ]
  },
  {
    chapter: "Prononciation",
    folder: "prononciation",
    pages: [
      { path: '/prononciation', name: 'prononciation', title: 'Sommaire Prononciation', file: 'index' },
      { path: '/prononciation/le-son-o', name: 'son-o', title: 'Le son [o]', file: 'le-son-o' },
    ]
  },
  {
    chapter: "Musique",
    folder: "musique",
    pages: [
      { path: '/musique', name: 'musique', title: 'Les grandes chansons françaises', file: 'index' },
      { path: '/musique/la-vie-en-rose', name: 'musique-vie-rose', title: 'La vie en rose', file: 'la-vie-en-rose' },
      { path: '/musique/non-je-ne-regrette-rien', name: 'musique-regrette-rien', title: 'Non, je ne regrette rien', file: 'non-je-ne-regrette-rien' },
      { path: '/musique/le-pont-mirabeau', name: 'musique-pont-mirabeau', title: 'Le pont Mirabeau', file: 'le-pont-mirabeau' }
    ]
  }
]

// On aplatit la structure pour le routeur
export const flattenedPages = bookStructure.flatMap((ch) =>
  ch.pages.map(page => ({
    ...page,
    folder: ch.folder,
    meta: { isBook: true, chapterTitle: ch.chapter }
  }))
)