<template>
  <AltLayout title="Le Détective d'Erreurs">
    <main class="detective-container">

      <div class="progress-section">
        <p class="progress-text">Enquête {{ currentLevelIndex + 1 }} / {{ levels.length }}</p>
        <div class="progress-track">
          <div class="progress-fill" :style="{ width: ((currentLevelIndex + 1) / levels.length) * 100 + '%' }"></div>
        </div>
      </div>

      <div class="game-box">
        <div class="header-icon">🔍</div>
        <p class="instruction">Trouve et clique sur le mot qui contient une erreur :</p>

        <div class="sentence-display" :class="{ 'solved': isSolved }">
          <button v-for="(word, index) in currentLevel.words" :key="index" class="word-btn" :class="{
            'is-error': isSolved && index === currentLevel.errorIndex,
            'wrong-guess': lastGuess === index && index !== currentLevel.errorIndex
          }" @click="handleWordClick(index)" :disabled="isSolved">
            {{ word }}
          </button>
        </div>

        <transition name="slide-up">
          <div v-if="isSolved" class="correction-card">
            <p class="success-msg">Bien joué, Détective !</p>
            <div class="comparison">
              <span class="bad">{{ currentLevel.words[currentLevel.errorIndex] }}</span>
              <span class="arrow">➔</span>
              <span class="good">{{ currentLevel.correction }}</span>
            </div>
            <p class="explanation">{{ currentLevel.explanation }}</p>

            <button v-if="currentLevelIndex < levels.length - 1" @click="nextLevel" class="btn-next">
              Affaire suivante ➔
            </button>
            <RouterLink v-else to="/exercices" class="btn-finish">
              Terminer l'enquête 🏆
            </RouterLink>
          </div>
        </transition>

        <p v-if="lastGuess !== null && lastGuess !== currentLevel.errorIndex" class="hint">
          Ce mot est correct, cherche encore !
        </p>
      </div>
    </main>
  </AltLayout>
</template>

<script setup>
import { ref, computed } from 'vue'
import AltLayout from '@/layouts/AltLayout.vue'

const levels = [
  {
    words: ["Le", "chat", "mange", "du", "poisson", "frais."],
    errorIndex: 1, // "chat" is fine, let's make an error:
    words: ["Les", "chat", "mangent", "la", "souris."],
    errorIndex: 1,
    correction: "chats",
    explanation: "Il y a plusieurs chats (Les), donc on ajoute un 's'."
  },
  {
    words: ["Elle", "est", "très", "contant", "de", "te", "voir."],
    errorIndex: 3,
    correction: "contente",
    explanation: "C'est une fille (Elle), donc l'adjectif est au féminin."
  },
  {
    words: ["Nous", "mangeons", "des", "pomme", "rouges."],
    errorIndex: 3,
    correction: "pommes",
    explanation: "Il y a 'des' pommes, c'est au pluriel."
  },
  {
    words: ["Je", "vais", "à", "la", "boulanjerie", "ce", "matin."],
    errorIndex: 4,
    correction: "boulangerie",
    explanation: "Le son 'ge' s'écrit avec un 'g' ici."
  },
  {
    words: ["Tu", "as", "un", "belle", "vélo", "bleu."],
    errorIndex: 3,
    correction: "beau",
    explanation: "Le mot 'vélo' est masculin, on dit 'un beau vélo'."
  }
]

const currentLevelIndex = ref(0)
const isSolved = ref(ref(false))
const lastGuess = ref(null)

const currentLevel = computed(() => levels[currentLevelIndex.value])

const handleWordClick = (index) => {
  lastGuess.value = index
  if (index === currentLevel.value.errorIndex) {
    isSolved.value = true
    lastGuess.value = null
  }
}

const nextLevel = () => {
  currentLevelIndex.value++
  isSolved.value = false
  lastGuess.value = null
}
</script>

<style scoped>
.detective-container {
  padding: 1.5rem;
  max-width: 650px;
  margin: 0 auto;
}

.header-icon {
  font-size: 3rem;
  text-align: center;
  margin-bottom: 0.5rem;
}

.sentence-display {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
  background: white;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  margin-bottom: 2rem;
  border: 2px solid #eee;
}

.word-btn {
  background: none;
  border: 1px solid transparent;
  padding: 0.4rem 0.6rem;
  font-size: 1.3rem;
  cursor: pointer;
  border-radius: 6px;
  transition: all 0.2s;
  color: #2c3e50;
  font-weight: 500;
}

.word-btn:hover:not(:disabled) {
  background: #f0f7ff;
  border-color: #3498db;
}

.wrong-guess {
  color: #e67e22 !important;
  text-decoration: line-through;
}

.is-error {
  background: #ffebee !important;
  color: #d32f2f !important;
  border: 2px solid #d32f2f !important;
  font-weight: bold;
}

.correction-card {
  background: #f1f8e9;
  border: 2px solid #4caf50;
  padding: 1.5rem;
  border-radius: 16px;
  text-align: center;
}

.comparison {
  margin: 1rem 0;
  font-size: 1.5rem;
  font-weight: bold;
}

.bad {
  color: #d32f2f;
  text-decoration: line-through;
}

.good {
  color: #2e7d32;
}

.arrow {
  margin: 0 10px;
  color: #666;
}

.explanation {
  color: #555;
  font-style: italic;
  margin-bottom: 1.5rem;
}

.btn-next,
.btn-finish {
  background: #4caf50;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  width: 100%;
}

.hint {
  text-align: center;
  color: #e67e22;
  font-weight: bold;
  margin-top: 1rem;
}

/* Progress bar styles identical to puzzle for consistency */
.progress-track {
  width: 100%;
  height: 8px;
  background: #eee;
  border-radius: 4px;
  margin: 10px 0 20px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: #2196f3;
  transition: width 0.4s;
}
</style>