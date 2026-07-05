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
    { path: '/grammaire/les-articles', name: 'grammaire-les-articles', component: () => import('../views/grammaire/les-articles.vue') },
    { path: '/grammaire/verbe-1er-groupe', name: 'grammaire-verbe-1er-groupe', component: () => import('../views/grammaire/verbe-1er-groupe.vue') },
    { path: '/grammaire/verbe-2eme-groupe', name: 'grammaire-verbe-2eme-groupe', component: () => import('../views/grammaire/verbe-2eme-groupe.vue') },
    { path: '/grammaire/verbe-3eme-groupe', name: 'grammaire-verbe-3eme-groupe', component: () => import('../views/grammaire/verbe-3eme-groupe.vue') },
    { path: '/grammaire/la-negation', name: 'grammaire-la-negation', component: () => import('../views/grammaire/la-negation.vue') },

    // Dictées
    { path: '/dictees', name: 'dictees', component: () => import('../views/dictees/index.vue') },

    // Exercices
    { path: '/exercices', name: 'exercices', component: () => import('../views/exercices/index.vue') },
    { path: '/exercices/emoji-francais', name: 'ex-emoji-francais', component: () => import('../views/exercices/emoji-francais.vue') },
    { path: '/exercices/quel-groupe-verbe-appartient', name: 'ex-quel-groupe-verbe', component: () => import('../views/exercices/quel-groupe-verbe-appartient.vue') },
    { path: '/exercices/les-articles', name: 'ex-les-articles', component: () => import('../views/exercices/les-articles.vue') },
    { path: '/exercices/la-negation', name: 'ex-la-negation', component: () => import('../views/exercices/la-negation.vue') },

    // Lecture
    { path: '/lecture', name: 'lecture', component: () => import('../views/lecture/index.vue') },
    { path: '/lecture/le-petit-prince', name: 'lecture-le-petit-prince', component: () => import('../views/lecture/le-petit-prince.vue') },
    { path: '/lecture/entretien-d-embauche', name: 'lecture-entretien-d-embauche', component: () => import('../views/lecture/entretien-d-embauche.vue') },
    { path: '/lecture/le-comte-de-monte-cristo', name: 'lecture-le-comte-de-monte-cristo', component: () => import('../views/lecture/le-comte-de-monte-cristo.vue') },

    // Prononciation
    { path: '/prononciation', name: 'prononciation', component: () => import('../views/prononciation/index.vue') },

    // Musique
    { path: '/musique', name: 'musique', component: () => import('../views/musique/index.vue') },

    // Conversation
    { path: '/conversation', name: 'conversation', component: () => import('../views/conversation/index.vue') },
    { path: '/conversation/a-la-boulangerie', name: 'conv-a-la-boulangerie', component: () => import('../views/conversation/a-la-boulangerie.vue') },
    { path: '/conversation/a-disneyland-paris', name: 'conv-a-disneyland-paris', component: () => import('../views/conversation/a-disneyland-paris.vue') },
    { path: '/conversation/chez-le-medecin', name: 'conv-chez-le-medecin', component: () => import('../views/conversation/chez-le-medecin.vue') },

    // Littérature
    { path: '/litterature', name: 'litterature', component: () => import('../views/litterature/index.vue') },
    { path: '/litterature/introduction', name: 'litterature-introduction', component: () => import('../views/litterature/introduction.vue') },

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
