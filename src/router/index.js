import { createRouter, createWebHistory } from 'vue-router'
import { flattenedPages } from './book-structure'

// 1. Transformer les pages du livre en routes Vue
const bookRoutes = flattenedPages.map((page, index) => ({
  path: page.path,
  name: page.name,
  component: () => import(`../views/${page.folder}/${page.file}.vue`),
  meta: {
    ...page.meta,
    pageNumber: index // La page 0 sera le sommaire
  }
}))

// 2. Définir les routes annexes (Hors Livre)
const staticRoutes = [
  {
    path: '/a-propos',
    name: 'about',
    component: () => import('../views/annexe/a-propos.vue'),
    meta: { isBook: false, title: 'À propos' }
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import('../views/annexe/contact.vue'),
    meta: { isBook: false, title: 'Contact' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes: [...bookRoutes, ...staticRoutes] // Fusion des deux mondes
})

export default router
