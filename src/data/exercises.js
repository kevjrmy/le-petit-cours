// Main categories
export const mainCategories = [
  {
    id: 'pronunciation',
    title: 'Prononciation',
    description: 'Apprends à bien prononcer les sons',
    color: '#60a5fa',
    icon: '🗣️'
  },
  {
    id: 'spelling',
    title: 'Orthographe',
    description: 'Apprends à bien écrire',
    color: '#34d399',
    icon: '✍️'
  },
  {
    id: 'grammar',
    title: 'Grammaire',
    description: 'Comprends les règles de la langue',
    color: '#f472b6',
    icon: '📝'
  },
  {
    id: 'vocabulary',
    title: 'Vocabulaire',
    description: 'Enrichis ton vocabulaire',
    color: '#fbbf24',
    icon: '💬'
  },
  {
    id: 'stories',
    title: 'Histoire',
    description: 'Lis des petites histoires',
    color: '#0b075e',
    icon: '📚'
  }
]

// Subcategories for pronunciation
export const pronunciationCategories = [
  {
    id: 'vowels',
    title: 'Les Voyelles',
    description: 'Apprends à prononcer les voyelles',
    color: '#60a5fa',
    icon: '🔤'
  },
  {
    id: 'syllables',
    title: 'Les Syllabes',
    description: 'Pratique les syllabes simples',
    color: '#4ade80',
    icon: '📚'
  },
  {
    id: 'consonants',
    title: 'Les Consonnes',
    description: 'Découvre les consonnes',
    color: '#a78bfa',
    icon: '✏️'
  },
  {
    id: 'words',
    title: 'Les Mots',
    description: 'Lis et devine la prononciation',
    color: '#f59e0b',
    icon: '🎯'
  }
]

// Subcategories for stories
export const storyCategories = [
  {
    id: 'kids-stories',
    title: 'Histoires pour Enfants',
    description: 'Histoires simples et amusantes',
    color: '#60a5fa',
    icon: '🧸',
    level: 'Facile'
  },
  {
    id: 'adult-learner-stories',
    title: 'Histoires pour Apprenants',
    description: 'Histoires adaptées aux adultes',
    color: '#f59e0b',
    icon: '📖',
    level: 'Intermédiaire'
  },
  {
    id: 'advanced-stories',
    title: 'Histoires Avancées',
    description: 'Histoires plus complexes',
    color: '#ef4444',
    icon: '🎓',
    level: 'Difficile'
  }
]

// Exercises data
export const exercises = {
  vowels: [
    { id: 'v1', letter: 'A', word: 'Avion', pronunciation: 'ah' },
    { id: 'v2', letter: 'E', word: 'Éléphant', pronunciation: 'eh' },
    { id: 'v3', letter: 'I', word: 'Igloo', pronunciation: 'ee' },
    { id: 'v4', letter: 'O', word: 'Orange', pronunciation: 'oh' },
    { id: 'v5', letter: 'U', word: 'Usine', pronunciation: 'oo' }
  ],
  syllables: [
    { id: 's1', syllable: 'BA', word: 'Banane', pronunciation: 'bah' },
    { id: 's2', syllable: 'BE', word: 'Bébé', pronunciation: 'beh' },
    { id: 's3', syllable: 'BI', word: 'Bicyclette', pronunciation: 'bee' },
    { id: 's4', syllable: 'BO', word: 'Botte', pronunciation: 'boh' },
    { id: 's5', syllable: 'BU', word: 'Bulle', pronunciation: 'boo' }
  ],
  consonants: [
    { id: 'c1', letter: 'P', word: 'Papa', pronunciation: 'peh' },
    { id: 'c2', letter: 'B', word: 'Balle', pronunciation: 'beh' },
    { id: 'c3', letter: 'T', word: 'Tarte', pronunciation: 'teh' },
    { id: 'c4', letter: 'D', word: 'Dodo', pronunciation: 'deh' },
    { id: 'c5', letter: 'M', word: 'Maman', pronunciation: 'em' }
  ],
  words: [
    {
      id: 'w1',
      word: 'chat',
      options: ['cha', 'chat', 'chate'],
      correctAnswer: 'cha',
      hint: 'Le T est muet à la fin'
    },
    {
      id: 'w2',
      word: 'fille',
      options: ['fil', 'fille', 'fie'],
      correctAnswer: 'fie',
      hint: 'Les deux L font le son "ye"'
    },
    {
      id: 'w3',
      word: 'eau',
      options: ['o', 'eau', 'é-o'],
      correctAnswer: 'o',
      hint: 'EAU se prononce comme O'
    },
    {
      id: 'w4',
      word: 'pain',
      options: ['pin', 'pain', 'pan'],
      correctAnswer: 'pin',
      hint: 'AIN se prononce "in"'
    },
    {
      id: 'w5',
      word: 'œuf',
      options: ['oeuf', 'euf', 'œuf'],
      correctAnswer: 'euf',
      hint: 'Œ se prononce "eu"'
    },
    {
      id: 'w6',
      word: 'chien',
      options: ['chi-en', 'chien', 'chin'],
      correctAnswer: 'chin',
      hint: 'IEN se prononce "in"'
    },
    {
      id: 'w7',
      word: 'maison',
      options: ['mai-zon', 'mai-son', 'mé-zon'],
      correctAnswer: 'mé-zon',
      hint: 'AI se prononce "é", S entre voyelles fait "z"'
    },
    {
      id: 'w8',
      word: 'rouge',
      options: ['rouj', 'rouge', 'rouge'],
      correctAnswer: 'rouj',
      hint: 'GE se prononce "je"'
    },
    {
      id: 'w9',
      word: 'oiseau',
      options: ['oi-zo', 'oi-seau', 'wa-zo'],
      correctAnswer: 'wa-zo',
      hint: 'OI se prononce "wa", S entre voyelles = "z"'
    },
    {
      id: 'w10',
      word: 'nez',
      options: ['né', 'nez', 'nè'],
      correctAnswer: 'né',
      hint: 'Le Z final est muet'
    },
    {
      id: 'w11',
      word: 'garçon',
      options: ['gar-son', 'gar-kon', 'gar-çon'],
      correctAnswer: 'gar-son',
      hint: 'Ç se prononce comme "ss"'
    },
    {
      id: 'w12',
      word: 'heure',
      options: ['heure', 'eur', 'heu-re'],
      correctAnswer: 'eur',
      hint: 'Le H est muet, EUR se prononce "eur"'
    },
    {
      id: 'w13',
      word: 'pied',
      options: ['pied', 'pi-ed', 'pié'],
      correctAnswer: 'pié',
      hint: 'IED se prononce "ié", le D est muet'
    },
    {
      id: 'w14',
      word: 'automne',
      options: ['o-tomne', 'au-tom-ne', 'o-ton'],
      correctAnswer: 'o-ton',
      hint: 'AU = "o", MN ensemble = "n", E final muet'
    },
    {
      id: 'w15',
      word: 'monsieur',
      options: ['mon-sieur', 'mon-sieu', 'me-sieu'],
      correctAnswer: 'me-sieu',
      hint: 'MON se prononce "me", SIEUR = "sieu"'
    },
    {
      id: 'w16',
      word: 'femme',
      options: ['fem-me', 'fame', 'fam'],
      correctAnswer: 'fam',
      hint: 'FEMME se prononce "fam" (exception !)'
    },
    {
      id: 'w17',
      word: 'gentil',
      options: ['jen-til', 'jan-ti', 'jan-til'],
      correctAnswer: 'jan-ti',
      hint: 'GEN = "jan", TIL = "ti" (L muet)'
    },
    {
      id: 'w18',
      word: 'été',
      options: ['été', 'è-té', 'é-té'],
      correctAnswer: 'é-té',
      hint: 'Les deux É se prononcent "é"'
    },
    {
      id: 'w19',
      word: 'clown',
      options: ['klown', 'clown', 'klon'],
      correctAnswer: 'klon',
      hint: 'C = "k", OW = "o", N final se prononce'
    },
    {
      id: 'w20',
      word: 'sept',
      options: ['sept', 'sète', 'sèt'],
      correctAnswer: 'sèt',
      hint: 'Le P et le T finaux sont muets'
    }
  ]
}

// Stories data
export const stories = {
  'kids-stories': [
    {
      id: 'story-1',
      title: 'Le Petit Chat Curieux',
      description: 'L\'histoire d\'un petit chat qui explore',
      duration: '5 min',
      difficulty: 'Facile',
      content: `Le secret du jardin de Minou

Il était une fois, dans un jardin rempli de fleurs et d’herbe douce, un petit chat gris nommé Minou.
Minou n’était pas un chat ordinaire : il était curieux, très curieux. Trop curieux, disaient parfois les oiseaux.

Chaque matin, Minou sortait de la maison en bâillant et en s’étirant.
— Une nouvelle aventure m’attend, pensait-il.

Ce matin-là, le jardin était étrangement silencieux. Pas un bruit.
Soudain, quelque chose brilla près du vieux pommier.

— « Oh ! Qu’est-ce que c’est que ça ? » murmura Minou.

Il avança à pas de velours, la queue bien droite. Sous une feuille verte se trouvait une coccinelle rouge, brillante comme un petit bouton magique.

— « Bonjour, petite boule rouge », dit Minou. « Tu es perdue ? »

La coccinelle ouvrit lentement ses ailes.
— « Je ne suis pas perdue », répondit-elle. « Je cherche le secret du jardin. »

Minou ouvrit de grands yeux.
— « Le secret du jardin ? Il y a un secret ici ? »

La coccinelle s’envola doucement.
— « Suis-moi si tu es courageux. »

Minou hésita une seconde… puis bondit.
— « Attends-moi ! »

Ils traversèrent les fleurs, passèrent sous un banc et arrivèrent devant une grande flaque d’eau brillante comme un miroir.

Minou se pencha et vit son reflet.
— « Oh ! Je croyais que c’était un autre chat ! » dit-il en riant.

Il posa sa patte dans l’eau.
— SPLASH !

— « Oups… » fit Minou, mouillé jusqu’aux moustaches.

La coccinelle se posa sur son nez.
— « Le secret du jardin, Minou, ce n’est pas un trésor caché », dit-elle doucement.
— « Alors c’est quoi ? »

Minou regarda autour de lui : les fleurs, le soleil, l’eau qui brillait, les oiseaux qui chantaient de nouveau.

— « Le secret… » continua la coccinelle, « c’est de prendre le temps de regarder. »

Minou sourit.
— « Alors j’aime ce secret. »

Depuis ce jour, chaque matin, Minou explore le jardin avec son amie la coccinelle, sans courir trop vite, en regardant bien autour de lui.

Et le jardin, lui, ne se tait plus jamais.

FIN`
    }
  ],
  'adult-learner-stories': [],
  'advanced-stories': []
}

export function getMainCategoryById(categoryId) {
  return mainCategories.find(cat => cat.id === categoryId)
}

export function getSubcategoriesByMainCategory(mainCategoryId) {
  if (mainCategoryId === 'pronunciation') {
    return pronunciationCategories
  }
  if (mainCategoryId === 'stories') {
    return storyCategories
  }
  return []
}

export function getExercisesByCategory(categoryId) {
  return exercises[categoryId] || []
}

export function getStoriesByCategory(categoryId) {
  return stories[categoryId] || []
}

export function getStoryById(categoryId, storyId) {
  const categoryStories = stories[categoryId] || []
  return categoryStories.find(story => story.id === storyId)
}

export function getExerciseById(categoryId, exerciseId) {
  const categoryExercises = exercises[categoryId] || []
  return categoryExercises.find(ex => ex.id === exerciseId)
}