<!-- view-meta: created=2026-08-02; updated=2026-08-26 -->
<template>
    <DefaultLayout
        title="À propos"
        subtitle="Un petit cours de français écrit à la main, une leçon après l'autre."
    >
        <main class="about">
            <!-- ── Ce que c'est ───────────────────────────── -->
            <section class="intro">
                <p>
                    <strong>Le Petit Cours</strong> est un cours de français de niveau A2,
                    écrit pour des hispanophones. Chaque leçon tient sur une page et se lit
                    en quelques minutes&nbsp;; les exercices, eux, se font directement dans
                    l'application.
                </p>
                <p>
                    Je m'appelle Kevin Jeremy. Je donne des cours de français à Valence,
                    en Espagne&nbsp;: ce que j'explique en classe finit ici.
                </p>
            </section>

            <!-- ── Les partis pris ────────────────────────── -->
            <section class="principles">
                <h2>Comment c'est pensé</h2>

                <ul class="principle-list">
                    <li v-for="item in principles" :key="item.title" class="principle">
                        <span class="principle-icon" aria-hidden="true">
                            <component :is="item.icon" />
                        </span>
                        <span class="principle-body">
                            <span class="principle-title">{{ item.title }}</span>
                            <span class="principle-text">{{ item.text }}</span>
                        </span>
                    </li>
                </ul>
            </section>

            <!-- ── Le cours grandit ───────────────────────── -->
            <section class="growing">
                <h2>Le cours grandit</h2>
                <p>
                    De nouvelles leçons arrivent régulièrement. Le sommaire ouvre sur
                    <strong>Récemment ajouté</strong>&nbsp;; celles écrites aujourd'hui portent
                    en plus le badge <span class="new-badge">Nouveau</span> dans leur chapitre
                    et un point rouge dans le menu&nbsp;: vous voyez d'un coup d'œil ce qui
                    vient d'être ajouté.
                </p>

                <div class="cta-row">
                    <RouterLink class="btn-cta" to="/">Voir le sommaire</RouterLink>
                    <RouterLink class="btn-link" to="/contact">Écrire un message</RouterLink>
                </div>
            </section>
        </main>
    </DefaultLayout>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import DefaultLayout from '@/layouts/DefaultLayout.vue'

import IconSpanish from '~icons/mdi/translate'
import IconLevel from '~icons/mdi/stairs'
import IconSheet from '~icons/mdi/file-document-outline'
import IconOffline from '~icons/mdi/cellphone-arrow-down'

const principles = [
    {
        icon: IconSpanish,
        title: 'Pour les hispanophones',
        text: "Les traductions et les glossaires sont en espagnol. On compare le français à l'espagnol, jamais à l'anglais.",
    },
    {
        icon: IconLevel,
        title: 'Niveau A2, vraiment',
        text: 'Des phrases courtes, du vocabulaire de tous les jours, un seul point de grammaire à la fois.',
    },
    {
        icon: IconSheet,
        title: 'Une leçon, une page',
        text: 'Chaque fiche tient sur une page A4 et se télécharge en PDF pour être révisée sur papier.',
    },
    {
        icon: IconOffline,
        title: 'Dans la poche',
        text: "L'app s'installe sur le téléphone et continue de fonctionner sans connexion.",
    },
]
</script>

<style scoped>
.about {
    gap: 1rem;
}

/* ── Intro ──────────────────────────────────────── */
.intro {
    display: flex;
    flex-direction: column;
    gap: 0.7rem;
    background:
        radial-gradient(110% 100% at 0% 0%, var(--accent-subtle) 0%, transparent 65%),
        var(--surface-1);
}

.intro p {
    margin: 0;
    font-size: 0.95rem;
}

/* ── Principes ──────────────────────────────────── */
.principle-list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.7rem;
    padding: 0;
    margin: 0;
    list-style: none;
}

.principle {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    padding: 0.9rem 1rem;
    background: var(--surface-2);
    border: 1px solid var(--border-soft);
    border-radius: var(--radius);
}

.principle-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 2rem;
    height: 2rem;
    border-radius: var(--radius-sm);
    background: var(--surface-1);
    border: 1px solid var(--border);
    color: var(--accent);
    font-size: 1.05rem;
}

.principle-body {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    min-width: 0;
}

.principle-title {
    font-family: var(--font-serif);
    font-size: 0.95rem;
    font-weight: 600;
    color: var(--text-heading);
}

.principle-text {
    font-size: 0.82rem;
    line-height: 1.55;
    color: var(--text-2);
}

/* ── Le cours grandit ───────────────────────────── */
.growing p {
    font-size: 0.95rem;
}

.growing .new-badge {
    vertical-align: 0.05em;
}

.cta-row {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.75rem;
    margin-top: 1.25rem;
}

.cta-row .btn-cta,
.cta-row .btn-link {
    text-decoration: none;
}

.cta-row .btn-cta:hover {
    color: var(--text-on-accent);
}

@media (max-width: 794px) {
    .principle-list {
        grid-template-columns: 1fr;
    }

    .cta-row .btn-cta,
    .cta-row .btn-link {
        flex: 1 1 100%;
        justify-content: center;
    }
}
</style>
