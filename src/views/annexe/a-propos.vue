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
                    <li v-for="item in principles" :key="item.title">
                        <strong>{{ item.title }}</strong> — {{ item.text }}
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

const principles = [
    {
        title: 'Pour les hispanophones',
        text: "les traductions et les glossaires sont en espagnol, jamais en anglais.",
    },
    {
        title: 'Niveau A2, vraiment',
        text: 'des phrases courtes et un seul point de grammaire à la fois.',
    },
    {
        title: 'Une leçon, une page',
        text: "chaque fiche tient sur une page A4, et les leçons se téléchargent en PDF.",
    },
    {
        title: 'Dans la poche',
        text: "l'app s'installe sur le téléphone et fonctionne sans connexion.",
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
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin: 0;
    padding-left: 1.1rem;
}

.principle-list li {
    font-size: 0.92rem;
    line-height: 1.6;
    color: var(--text-2);
}

.principle-list strong {
    color: var(--text-heading);
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
    .cta-row .btn-cta,
    .cta-row .btn-link {
        flex: 1 1 100%;
        justify-content: center;
    }
}
</style>
