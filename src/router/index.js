import { createRouter, createWebHistory } from 'vue-router'

// Book chapters configuration
const chapters = [
  { path: '/', name: 'home', title: 'Sommaire', folder: 'home', file: 'index' },
  { path: '/dictees', name: 'dictees', title: 'Dictées', page: 1, folder: 'dictees', file: 'index' },
  { path: '/prononciation', name: 'prononciation', title: 'Prononciation', page: 12, folder: 'prononciation', file: 'index' },
  { path: '/exercices', name: 'exercices', title: 'Exercices', page: 27, folder: 'exercices', file: 'index' },
  { path: '/lecture', name: 'lecture', title: 'Lecture', page: 41, folder: 'lecture', file: 'index' },

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
