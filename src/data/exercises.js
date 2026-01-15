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
      content: `Il était une fois un petit chat gris qui s'appelait Minou. Minou adorait explorer le jardin.

Un matin, Minou voit quelque chose briller sous un buisson. "Qu'est-ce que c'est ?" se demande-t-il.

Il s'approche doucement. C'est une belle coccinelle rouge avec des points noirs ! La coccinelle bouge ses petites ailes.

"Bonjour !" dit Minou. "Tu veux jouer avec moi ?"

Mais la coccinelle s'envole. Minou essaie de la suivre. Il saute ! Il court ! Il tourne en rond !

Soudain, Minou arrive devant une grande flaque d'eau. Il voit son reflet. "Qui est ce chat ?" pense-t-il.

Il touche l'eau avec sa patte. SPLASH ! De l'eau partout !

Minou secoue sa patte mouillée. Il rit. "C'est moi dans l'eau !"

La coccinelle revient et se pose sur le nez de Minou. Chatouille, chatouille !

"Tu es mon amie maintenant," dit Minou en souriant.

Et depuis ce jour, Minou et la coccinelle jouent ensemble tous les matins dans le jardin.

**FIN**`
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