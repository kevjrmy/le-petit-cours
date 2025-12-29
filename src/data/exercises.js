export const exerciseCategories = [
  {
    id: 'vowels',
    title: 'Les Voyelles',
    description: 'Apprends à prononcer les voyelles',
    color: 'bg-blue-400',
    icon: '🔤'
  },
  {
    id: 'syllables',
    title: 'Les Syllabes',
    description: 'Pratique les syllabes simples',
    color: 'bg-green-400',
    icon: '📚'
  },
  {
    id: 'consonants',
    title: 'Les Consonnes',
    description: 'Découvre les consonnes',
    color: 'bg-purple-400',
    icon: '✏️'
  }
]

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

export function getExercisesByCategory(categoryId) {
  return exercises[categoryId] || []
}

export function getExerciseById(categoryId, exerciseId) {
  const categoryExercises = exercises[categoryId] || []
  return categoryExercises.find(ex => ex.id === exerciseId)
}