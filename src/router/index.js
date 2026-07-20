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
    { path: '/grammaire/le-futur-proche', name: 'grammaire-le-futur-proche', component: () => import('../views/grammaire/le-futur-proche.vue') },
    { path: '/grammaire/les-verbes-pronominaux', name: 'grammaire-les-verbes-pronominaux', component: () => import('../views/grammaire/les-verbes-pronominaux.vue') },
    { path: '/grammaire/les-adverbes', name: 'grammaire-les-adverbes', component: () => import('../views/grammaire/les-adverbes.vue') },

    // Dictées
    { path: '/dictees', name: 'dictees', component: () => import('../views/dictees/index.vue') },
    { path: '/dictees/une-journee-en-vacances', name: 'dictee-une-journee-en-vacances', component: () => import('../views/dictees/une-journee-en-vacances.vue') },

    // Exercices
    { path: '/exercices', name: 'exercices', component: () => import('../views/exercices/index.vue') },
    { path: '/exercices/emoji-francais', name: 'ex-emoji-francais', component: () => import('../views/exercices/emoji-francais.vue') },
    { path: '/exercices/quel-groupe-verbe-appartient', name: 'ex-quel-groupe-verbe', component: () => import('../views/exercices/quel-groupe-verbe-appartient.vue') },
    { path: '/exercices/les-articles', name: 'ex-les-articles', component: () => import('../views/exercices/les-articles.vue') },
    { path: '/exercices/la-negation', name: 'ex-la-negation', component: () => import('../views/exercices/la-negation.vue') },
    { path: '/exercices/le-futur-proche', name: 'ex-le-futur-proche', component: () => import('../views/exercices/le-futur-proche.vue') },
    { path: '/exercices/conjugaison-present', name: 'ex-conjugaison-present', component: () => import('../views/exercices/conjugaison-present.vue') },
    { path: '/exercices/les-adverbes', name: 'ex-les-adverbes', component: () => import('../views/exercices/les-adverbes.vue') },
    { path: '/exercices/phrases-en-desordre', name: 'ex-phrases-en-desordre', component: () => import('../views/exercices/phrases-en-desordre.vue') },

    // Lecture
    { path: '/lecture', name: 'lecture', component: () => import('../views/lecture/index.vue') },
    { path: '/lecture/le-petit-prince', name: 'lecture-le-petit-prince', component: () => import('../views/lecture/le-petit-prince.vue') },
    { path: '/lecture/entretien-d-embauche', name: 'lecture-entretien-d-embauche', component: () => import('../views/lecture/entretien-d-embauche.vue') },
    { path: '/lecture/le-comte-de-monte-cristo', name: 'lecture-le-comte-de-monte-cristo', component: () => import('../views/lecture/le-comte-de-monte-cristo.vue') },
    { path: '/lecture/le-tour-du-monde', name: 'lecture-le-tour-du-monde', component: () => import('../views/lecture/le-tour-du-monde.vue') },

    // Prononciation
    { path: '/prononciation', name: 'prononciation', component: () => import('../views/prononciation/index.vue') },
    { path: '/prononciation/les-syllabes-courantes', name: 'prononciation-les-syllabes-courantes', component: () => import('../views/prononciation/les-syllabes-courantes.vue') },

    // Musique
    { path: '/musique', name: 'musique', component: () => import('../views/musique/index.vue') },

    // Conversation
    { path: '/conversation', name: 'conversation', component: () => import('../views/conversation/index.vue') },
    { path: '/conversation/a-la-boulangerie', name: 'conv-a-la-boulangerie', component: () => import('../views/conversation/a-la-boulangerie.vue') },
    { path: '/conversation/a-disneyland-paris', name: 'conv-a-disneyland-paris', component: () => import('../views/conversation/a-disneyland-paris.vue') },
    { path: '/conversation/chez-le-medecin', name: 'conv-chez-le-medecin', component: () => import('../views/conversation/chez-le-medecin.vue') },
    { path: '/conversation/a-la-pharmacie', name: 'conv-a-la-pharmacie', component: () => import('../views/conversation/a-la-pharmacie.vue') },

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

    // Thèmes de conversation
    { path: '/theme', name: 'theme', component: () => import('../views/theme/index.vue') },
    { path: '/theme/la-famille', name: 'theme-la-famille', component: () => import('../views/theme/la-famille.vue') },
    { path: '/theme/les-loisirs', name: 'theme-les-loisirs', component: () => import('../views/theme/les-loisirs.vue') },
    { path: '/theme/la-nourriture', name: 'theme-la-nourriture', component: () => import('../views/theme/la-nourriture.vue') },
    { path: '/theme/ecrire-un-livre', name: 'theme-ecrire-un-livre', component: () => import('../views/theme/ecrire-un-livre.vue') },
    { path: '/theme/ah-si-jetais-riche', name: 'theme-ah-si-jetais-riche', component: () => import('../views/theme/ah-si-jetais-riche.vue') },
  ]
})

export default router
