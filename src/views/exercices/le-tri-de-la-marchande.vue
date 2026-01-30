<template>
    <AltLayout title="Le Marché des Lettres">
        <main class="game-container">
            <header class="instruction">
                <p>Aide la marchande à ranger ses produits dans les bons paniers !</p>
            </header>

            <section class="current-item-zone" v-if="currentIndex < items.length">
                <div class="item-to-sort">
                    <span class="emoji">{{ items[currentIndex].emoji }}</span>
                    <p class="item-name">{{ items[currentIndex].name }}</p>
                </div>
            </section>

            <section class="baskets-grid">
                <button v-for="letter in ['b', 'd', 'p']" :key="letter" @click="handleDrop(letter)"
                    :class="['basket', `basket-${letter}`, { 'shake': errorLetter === letter }]">
                    <span class="basket-letter">{{ letter }}</span>
                    <div class="basket-handle"></div>
                    <p>Le panier des <strong>{{ letter }}</strong></p>
                </button>
            </section>

            <footer v-if="currentIndex >= items.length" class="victory-zone">
                <h3>✨ Bravo ! Tout est rangé ! ✨</h3>
                <button @click="resetGame" class="reset-btn">Rejouer</button>
            </footer>
        </main>
    </AltLayout>
</template>

<script setup>
import { ref } from 'vue'
import AltLayout from '@/layouts/AltLayout.vue'

const currentIndex = ref(0)
const errorLetter = ref(null)

const items = ref([
    { name: 'Banane', emoji: '🍌', correct: 'b' },
    { name: 'Dauphin', emoji: '🐬', correct: 'd' },
    { name: 'Poire', emoji: '🍐', correct: 'p' },
    { name: 'Ballon', emoji: '🎈', correct: 'b' },
    { name: 'Dinosaure', emoji: '🦖', correct: 'd' },
    { name: 'Panda', emoji: '🐼', correct: 'p' },
])

const handleDrop = (letter) => {
    const current = items.value[currentIndex.value]

    if (letter === current.correct) {
        // Succès : passage à l'objet suivant
        currentIndex.value++
        errorLetter.value = null
    } else {
        // Erreur : animation visuelle
        errorLetter.value = letter
        setTimeout(() => { errorLetter.value = null }, 500)
    }
}

const resetGame = () => {
    currentIndex.value = 0
}
</script>

<style scoped>
.game-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
}

.instruction {
    text-align: center;
    font-family: var(--font-serif);
    font-style: italic;
    color: var(--clr-alt-text);
}

/* L'objet actuel */
.current-item-zone {
    height: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.item-to-sort {
    background: white;
    padding: 1.5rem;
    border-radius: 20px;
    box-shadow: var(--box-shadow);
    border: 2px solid var(--clr-border);
    text-align: center;
    animation: popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.item-to-sort .emoji {
    font-size: 4rem;
    display: block;
}

.item-to-sort .item-name {
    font-weight: bold;
    margin-top: 0.5rem;
    font-size: 1.2rem;
}

/* Les paniers */
.baskets-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    width: 100%;
}

.basket {
    background: #fdf5e6;
    /* Couleur osier/panier */
    border: 3px solid #d2b48c;
    border-radius: 15px 15px 10px 10px;
    padding: 1rem;
    cursor: pointer;
    position: relative;
    transition: transform 0.2s;
}

.basket:hover {
    transform: scale(1.05);
}

.basket-letter {
    font-size: 3rem;
    font-family: var(--font-serif);
    font-weight: 900;
    color: var(--clr-primary);
    display: block;
}

/* Feedback erreur */
.shake {
    animation: shake 0.4s;
    border-color: var(--clr-red);
}

@keyframes popIn {
    from {
        opacity: 0;
        transform: scale(0.5);
    }

    to {
        opacity: 1;
        transform: scale(1);
    }
}

@keyframes shake {

    0%,
    100% {
        transform: translateX(0);
    }

    25% {
        transform: translateX(-8px);
    }

    75% {
        transform: translateX(8px);
    }
}

.victory-zone {
    text-align: center;
    animation: fadeIn 1s;
}

.reset-btn {
    margin-top: 1rem;
    padding: 0.8rem 1.5rem;
    background: var(--clr-primary);
    color: white;
    border-radius: 50px;
    font-weight: bold;
}
</style>