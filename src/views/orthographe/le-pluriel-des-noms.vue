<template>
    <AltLayout title="Le pluriel des noms">
        <main class="lesson">
            <section class="lesson-section">
                <h2>La règle générale</h2>
                <p>Pour mettre un nom au pluriel, on ajoute généralement un <strong>-s</strong> à la fin du mot.</p>

                <div class="box">
                    <p>Un livre ➔ Des livre<strong>s</strong></p>
                    <p>Une pomme ➔ Des pomme<strong>s</strong></p>
                </div>
            </section>

            <section class="lesson-section alert">
                <h2>Attention !</h2>
                <p>Les mots finissant par <strong>-s</strong>, <strong>-x</strong> ou <strong>-z</strong> ne changent
                    pas au pluriel.</p>
                <div class="box">
                    <p>Un souri<strong>s</strong> ➔ Des souri<strong>s</strong></p>
                    <p>Un ne<strong>z</strong> ➔ Des ne<strong>z</strong></p>
                </div>
            </section>
        </main>
    </AltLayout>
</template>

<script setup>
import AltLayout from '@/layouts/AltLayout.vue'
</script>

<style scoped>
.lesson {
    display: flex;
    flex-direction: column;
    gap: 2rem;
}

.lesson-section {
    background: white;
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: var(--box-shadow);
}

.alert {
    border-top: 4px solid var(--clr-red);
}

h2 {
    color: var(--clr-primary);
    margin-bottom: 1rem;
}

.box {
    background: var(--clr-alt-background);
    padding: 1rem;
}
</style>