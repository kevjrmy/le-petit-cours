<template>
    <AltLayout title="Le féminin des noms">
        <main class="lesson">
            <section class="lesson-section">
                <h2>La règle générale</h2>
                <p>En général, on forme le féminin des noms en ajoutant un <strong>-e</strong> au nom masculin.</p>

                <div class="box">
                    <p>Un ami ➔ Une ami<strong>e</strong></p>
                    <p>Un avocat ➔ Une avocat<strong>e</strong></p>
                </div>
            </section>

            <section class="lesson-section">
                <h2>Les cas particuliers</h2>
                <p>Certains noms doublent la consonne finale :</p>
                <div class="box">
                    <p>Un lion ➔ Une lion<strong>ne</strong></p>
                    <p>Un chat ➔ Une chat<strong>te</strong></p>
                </div>
                <p>Quand un nom masculin se termine par <i>-on, -en, -el, -et, -as, -ot, -il</i> on forme souvent le féminin en doublant la consonne finale + ajoutant <i>“-e”</i></p>
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

h2 {
    color: var(--clr-primary);
    margin-bottom: 1rem;
    font-size: 1.2rem;
}

.box {
    background: var(--clr-alt-background);
    padding: 1rem;
    border-radius: 4px;
    margin: 0.5rem 0;
}

.box p {
    font-family: 'monospace';
}
</style>