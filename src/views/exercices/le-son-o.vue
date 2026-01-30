<template>
  <AltLayout title="Le jeu du son [o]">
    <main class="exercise-container">
      <header class="instruction">
        <p>Clique sur les images où tu entends le son <strong>[o]</strong>, comme dans "vélo".</p>
      </header>

      <div class="game-grid">
        <button 
          v-for="(item, index) in items" 
          :key="index"
          @click="checkAnswer(index)"
          :class="['item-card', { 
            'is-correct': item.clicked && item.hasSound, 
            'is-wrong': item.clicked && !item.hasSound 
          }]"
          :disabled="item.clicked && item.hasSound"
        >
          <span class="emoji">{{ item.emoji }}</span>
          <span class="word" v-if="item.clicked || showWords">{{ item.name }}</span>
          
          <div class="feedback-icon" v-if="item.clicked">
            <IconCheck v-if="item.hasSound" />
            <IconCross v-else />
          </div>
        </button>
      </div>

      <footer v-if="allFound" class="success-message">
        <p>✨ Bravo ! Tu as trouvé tous les mots avec le son [o] ! ✨</p>
      </footer>
    </main>
  </AltLayout>
</template>

<script setup>
import AltLayout from '@/layouts/AltLayout.vue'
import { ref, computed } from 'vue'

const showWords = ref(false) // On peut cacher les mots pour corser l'exercice

const items = ref([
  { name: 'Cadeau', emoji: '🎁', hasSound: true, clicked: false },
  { name: 'Pomme', emoji: '🍎', hasSound: false, clicked: false }, // Son [ɔ] ouvert, différent du [o] fermé
  { name: 'Bateau', emoji: '⛵', hasSound: true, clicked: false },
  { name: 'Livre', emoji: '📖', hasSound: false, clicked: false },
  { name: 'Moto', emoji: '🏍️', hasSound: true, clicked: false },
  { name: 'Soleil', emoji: '☀️', hasSound: false, clicked: false }
])

const checkAnswer = (index) => {
  items.value[index].clicked = true
}

const allFound = computed(() => {
  return items.value.filter(i => i.hasSound).every(i => i.clicked)
})
</script>

<style scoped>
.exercise-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 600px;
  margin: 0 auto;
}

.instruction {
  background: var(--clr-alt-background);
  padding: 1rem;
  border-radius: 8px;
  border-left: 4px solid var(--clr-green);
  font-family: var(--font-serif);
}

.game-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.item-card {
  background: white;
  border: 2px solid var(--clr-border);
  border-radius: 12px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  position: relative;
  transition: all 0.2s;
}

.item-card:hover:not(:disabled) {
  transform: scale(1.02);
  border-color: var(--clr-primary);
}

.emoji { font-size: 3rem; }

.word {
  font-weight: bold;
  font-family: var(--font-sans);
  text-transform: capitalize;
}

.is-correct {
  border-color: var(--clr-green);
  background-color: #f0fff0;
}

.is-wrong {
  border-color: var(--clr-red);
  background-color: #fff0f0;
  animation: shake 0.4s;
}

.feedback-icon {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 1.2rem;
}

.success-message {
  text-align: center;
  padding: 1rem;
  background: var(--clr-green);
  color: white;
  border-radius: 8px;
  font-weight: bold;
  animation: bounce 0.5s;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}
</style>