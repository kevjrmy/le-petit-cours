<!-- view-meta: created=2026-08-02; updated=2026-08-10 -->
<template>
    <DefaultLayout title="À propos">
        <main class="static-page">
            <section class="card">
                <h2>Coucou</h2>
                <p>Je suis Kevin Jeremy et je suis en train de créer
                    <strong>Le Petit Cours</strong> pour rendre l'apprentissage du français ludique et accessible.
                </p>
                <p>
                    J'ai commencé à donner des cours de français sur Valencia (Espagne) récemment et comme ça me plaît je me suis mis à coder cette petite app.
                </p>
            </section>
        </main>
    </DefaultLayout>
</template>

<script setup>
import DefaultLayout from '@/layouts/DefaultLayout.vue'
</script>

<style scoped>
.static-page {
    display: flex;
    flex-direction: column;
    gap: 2rem;
}

h2 {
    color: var(--text-heading);
    margin-bottom: 1rem;
}

ul {
    padding-left: 1.2rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}
</style>