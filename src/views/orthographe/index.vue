<template>
    <DefaultLayout title="Orthographe">
        <main class="orthographe-index">
            <div class="intro-card">
                <p>Bienvenue dans le chapitre dédié à l'orthographe. Ici, nous allons apprendre à bien accorder les mots
                    en genre et en nombre.</p>
            </div>

            <div class="topics-grid">
                <div class="topic">
                    <h3>Le Genre</h3>
                    <p>Apprendre à transformer un nom masculin en féminin.</p>
                    <RouterLink to="/orthographe/le-feminin-des-noms" class="btn-link">Étudier le féminin</RouterLink>
                </div>

                <div class="topic">
                    <h3>Le Nombre</h3>
                    <p>Comprendre comment passer du singulier au pluriel.</p>
                    <RouterLink to="/orthographe/le-pluriel-des-noms" class="btn-link">Étudier le pluriel</RouterLink>
                </div>
            </div>
        </main>
    </DefaultLayout>
</template>

<script setup>
import DefaultLayout from '@/layouts/DefaultLayout.vue'
</script>

<style scoped>
.intro-card {
    background: white;
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: var(--box-shadow);
    margin-bottom: 2rem;
    border-left: 5px solid var(--clr-yellow);
}

.topics-grid {
    display: grid;
    gap: 1.5rem;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
}

.topic {
    background: white;
    padding: 1.5rem;
    border-radius: 8px;
    border: 1px solid var(--clr-border);
}

.topic h3 {
    color: var(--clr-primary);
    margin-bottom: 0.5rem;
}

.btn-link {
    display: inline-block;
    margin-top: 1rem;
    color: var(--clr-primary);
    font-weight: bold;
    text-decoration: underline;
}
</style>