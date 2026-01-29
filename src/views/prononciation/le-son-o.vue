<template>
    <AltLayout title="Le son [o]">
        <main class="prononciation-page">
            <section class="lesson-card">
                <p>Le son <strong>[o]</strong> peut s'écrire de trois manières différentes en français :</p>

                <ul class="sound-list">
                    <li class="sound-item">
                        <span class="letter">O</span>
                        <span class="word">Un vélo</span>
                        <button class="mini-audio">🔊</button>
                    </li>
                    <li class="sound-item">
                        <span class="letter">AU</span>
                        <span class="word">Une auto</span>
                        <button class="mini-audio">🔊</button>
                    </li>
                    <li class="sound-item">
                        <span class="letter">EAU</span>
                        <span class="word">Un gâteau</span>
                        <button class="mini-audio">🔊</button>
                    </li>
                </ul>
            </section>

            <section class="practice-zone">
                <h3>Virelangue pour pratiquer :</h3>
                <p class="tongue-twister">"L'eau chaude de l'auto de Paul."</p>
            </section>
        </main>
    </AltLayout>
</template>

<script setup>
import AltLayout from '@/layouts/AltLayout.vue'
</script>

<style scoped>
.prononciation-page {
    display: flex;
    flex-direction: column;
    gap: 2rem;
}

.lesson-card,
.practice-zone {
    background: white;
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: var(--box-shadow);
}

.sound-list {
    list-style: none;
    margin-top: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.sound-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.8rem;
    background: var(--clr-alt-background);
    border-radius: 6px;
}

.letter {
    font-weight: 800;
    color: var(--clr-green);
    width: 40px;
}

.word {
    flex: 1;
    font-family: var(--font-serif);
}

.mini-audio {
    font-size: 1.2rem;
    opacity: 0.7;
    transition: opacity 0.2s;
}

.mini-audio:hover {
    opacity: 1;
}

.tong_twister {
    font-family: var(--font-serif);
    font-style: italic;
    font-size: 1.2rem;
    text-align: center;
    margin-top: 1rem;
}
</style>