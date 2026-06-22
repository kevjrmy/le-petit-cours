import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    // Sommaire
    { path: '/', name: 'sommaire', component: () => import('../views/sommaire/index.vue') },

    // Orthographe
    { path: '/orthographe', name: 'orthographe', component: () => import('../views/orthographe/index.vue') },
    { path: '/orthographe/les-determinants-possessifs', name: 'ortho-determinants-possessifs', component: () => import('../views/orthographe/les-determinants-possessifs.vue') },
    { path: '/orthographe/les-pronoms-possessifs', name: 'ortho-pronoms-possessifs', component: () => import('../views/orthographe/les-pronoms-possessifs.vue') },

    // Grammaire
    { path: '/grammaire', name: 'grammaire', component: () => import('../views/grammaire/index.vue') },
    { path: '/grammaire/verbe-1er-groupe', name: 'grammaire-verbe-1er-groupe', component: () => import('../views/grammaire/verbe-1er-groupe.vue') },

    // Dictées
    { path: '/dictees', name: 'dictees', component: () => import('../views/dictees/index.vue') },

    // Exercices
    { path: '/exercices', name: 'exercices', component: () => import('../views/exercices/index.vue') },
    { path: '/exercices/emoji-francais', name: 'ex-emoji-francais', component: () => import('../views/exercices/emoji-francais.vue') },

    // Lecture
    { path: '/lecture', name: 'lecture', component: () => import('../views/lecture/index.vue') },
    { path: '/lecture/le-petit-prince', name: 'lecture-le-petit-prince', component: () => import('../views/lecture/le-petit-prince.vue') },

    // Prononciation
    { path: '/prononciation', name: 'prononciation', component: () => import('../views/prononciation/index.vue') },

    // Musique
    { path: '/musique', name: 'musique', component: () => import('../views/musique/index.vue') },

    // Vocabulaire
    { path: '/vocabulaire', name: 'vocabulaire', component: () => import('../views/vocabulaire/index.vue') },
    { path: '/vocabulaire/100-mots-les-plus-utilises', name: 'vocab-100-mots', component: () => import('../views/vocabulaire/100-mots-les-plus-utilises.vue') },
    { path: '/vocabulaire/le-docteur', name: 'vocab-le-docteur', component: () => import('../views/vocabulaire/le-docteur.vue') },

    // Annexes
    { path: '/a-propos', name: 'about', component: () => import('../views/annexe/a-propos.vue') },
    { path: '/contact', name: 'contact', component: () => import('../views/annexe/contact.vue') },
  ]
})

export default router
