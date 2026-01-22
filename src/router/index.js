import { createRouter, createWebHistory } from 'vue-router'

// Book chapters configuration
const chapters = [
  // Home - Sommaire
  { path: '/', name: 'home', title: 'Sommaire', folder: 'home', file: 'index' },

  // Dictées
  { path: '/dictees', name: 'dictees', title: 'Dictées', folder: 'dictees', file: 'index', page: 1 },
  { path: '/dictees/une-journee-a-paris', name: 'dictee-paris', title: 'Dictée: Une journée à Paris', page: 2, folder: 'dictees', file: 'une-journee-a-paris' },
  { path: '/dictees/la-pierre-de-rosette', name: 'dictee-inter', title: 'Dictée: La pierre de Rosette', page: 3, folder: 'dictees', file: 'la-pierre-de-rosette' },
  { path: '/dictees/la-philosophie-sous-la-renaissance', name: 'dictee-diff', title: 'Dictée: La philosophie sous la renaissance', page: 4, folder: 'dictees', file: 'la-philosophie-sous-la-renaissance' },

  // Exercices
  { path: '/exercices', name: 'exercices', title: 'Exercices', folder: 'exercices', file: 'index', page: 6 },
  { path: '/exercices/puzzle-de-mots', name: 'ex-puzzle', title: 'Le Puzzle de Mots', folder: 'exercices', file: 'puzzle-de-mots', page: 7 },
  { path: '/exercices/le-detective', name: 'ex-detective', title: 'Le Détective d\'Erreurs', folder: 'exercices', file: 'le-detective', page: 8 },
  { path: '/exercices/les-syllabes', name: 'ex-syllabes', title: 'Le Maître des Syllabes', folder: 'exercices', file: 'les-syllabes', page: 9 },

  // Prononciation
  { path: '/prononciation', name: 'prononciation', title: 'Prononciation', folder: 'prononciation', file: 'index', page: 5 },

  // Lecture
  { path: '/lecture', name: 'lecture', title: 'Lecture', page: 41, folder: 'lecture', file: 'index' },

  // Pages
  { path: '/a-propos', name: 'about', title: 'À propos', page: 100, folder: 'pages', file: 'a-propos' },
  { path: '/contact', name: 'contact', title: 'Contact', page: 102, folder: 'pages', file: 'contact' },
]

const routes = chapters.map(chapter => ({
  path: chapter.path,
  name: chapter.name,
  component: () => import(`../views/${chapter.folder}/${chapter.file}.vue`),
  meta: {
    title: chapter.title,
    page: chapter.page,
  },
}))

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
