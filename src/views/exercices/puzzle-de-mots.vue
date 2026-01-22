<template>
  <AltLayout title="Le Puzzle de Mots">
    <main class="puzzle-container">
      
      <div class="progress-section">
        <p class="progress-text">Phrase {{ currentLevelIndex + 1 }} sur {{ levels.length }}</p>
        <div class="progress-track">
          <div class="progress-fill" :style="{ width: ((currentLevelIndex + 1) / levels.length) * 100 + '%' }"></div>
        </div>
      </div>

      <div class="game-box">
        <p class="instruction">Clique sur les mots pour construire la phrase :</p>

        <div class="drop-zone" :class="{ 'success-glow': feedbackType === 'success' }">
          <button 
            v-for="(word, index) in userSentence" 
            :key="'user-'+index"
            :class="['word-pill', word.type]"
            @click="removeFromSentence(index)"
          >
            {{ word.text }}
          </button>
          <span v-if="userSentence.length === 0" class="placeholder">Ta phrase ici...</span>
        </div>

        <div class="word-bank">
          <button 
            v-for="(word, index) in wordBank" 
            :key="'bank-'+index"
            :class="['word-pill', word.type]"
            @click="addToSentence(index)"
          >
            {{ word.text }}
          </button>
        </div>

        <div class="controls">
          <button 
            v-if="feedbackType === 'success' && currentLevelIndex < levels.length - 1" 
            @click="nextLevel" 
            class="btn-next"
          >
            Phrase suivante ➔
          </button>
          
          <button 
            v-else-if="currentLevelIndex === levels.length - 1 && feedbackType === 'success'"
            @click="$router.push('/exercices')"
            class="btn-finish"
          >
            Terminer l'exercice 🏆
          </button>

          <button 
            v-else 
            @click="checkAnswer" 
            class="btn-check" 
            :disabled="wordBank.length > 0"
          >
            Vérifier
          </button>

          <button @click="initLevel" class="btn-reset" title="Recommencer cette phrase">
            🔄
          </button>
        </div>

        <transition name="fade">
          <div v-if="feedback" :class="['feedback', feedbackType]">
            {{ feedback }}
          </div>
        </transition>
      </div>
    </main>
  </AltLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import AltLayout from '@/layouts/AltLayout.vue'

const levels = [
  {
    sentence: [
      { text: "Le", type: "det" },
      { text: "petit", type: "adj" },
      { text: "chat", type: "nom" },
      { text: "mange", type: "ver" },
      { text: "une", type: "det" },
      { text: "pomme", type: "nom" },
      { text: "verte", type: "adj" }
    ]
  },
  {
    sentence: [
      { text: "La", type: "det" },
      { text: "grande", type: "adj" },
      { text: "voiture", type: "nom" },
      { text: "roule", type: "ver" },
      { text: "vite", type: "adj" }
    ]
  },
  {
    sentence: [
      { text: "Un", type: "det" },
      { text: "oiseau", type: "nom" },
      { text: "bleu", type: "adj" },
      { text: "chante", type: "ver" },
      { text: "dans", type: "det" },
      { text: "le", type: "det" },
      { text: "jardin", type: "nom" }
    ]
  },
  {
    sentence: [
      { text: "Ma", type: "det" },
      { text: "maman", type: "nom" },
      { text: "prépare", type: "ver" },
      { text: "un", type: "det" },
      { text: "gâteau", type: "nom" },
      { text: "délicieux", type: "adj" }
    ]
  },
  {
    sentence: [
      { text: "Les", type: "det" },
      { text: "enfants", type: "nom" },
      { text: "jouent", type: "ver" },
      { text: "au", type: "det" },
      { text: "ballon", type: "nom" }
    ]
  }
]

const currentLevelIndex = ref(0)
const wordBank = ref([])
const userSentence = ref([])
const feedback = ref('')
const feedbackType = ref('')

const initLevel = () => {
  const current = levels[currentLevelIndex.value].sentence
  wordBank.value = [...current].sort(() => Math.random() - 0.5)
  userSentence.value = []
  feedback.value = ''
  feedbackType.value = ''
}

const addToSentence = (index) => {
  userSentence.value.push(wordBank.value[index])
  wordBank.value.splice(index, 1)
  feedback.value = '' // Clear error feedback when child continues trying
}

const removeFromSentence = (index) => {
  wordBank.value.push(userSentence.value[index])
  userSentence.value.splice(index, 1)
  feedbackType.value = ''
}

const checkAnswer = () => {
  const correct = levels[currentLevelIndex.value].sentence.map(w => w.text).join(' ')
  const user = userSentence.value.map(w => w.text).join(' ')

  if (user === correct) {
    feedback.value = "Bravo ! C'est exactement ça. 🌟"
    feedbackType.value = 'success'
  } else {
    feedback.value = "Pas tout à fait... vérifie l'ordre des mots !"
    feedbackType.value = 'error'
  }
}

const nextLevel = () => {
  currentLevelIndex.value++
  initLevel()
}

onMounted(() => {
  initLevel()
})
</script>

<style scoped>
.puzzle-container {
  padding: 1.5rem;
  max-width: 600px;
  margin: 0 auto;
}

/* Progress Bar Styles */
.progress-section {
  margin-bottom: 2rem;
}
.progress-text {
  text-align: center;
  font-weight: bold;
  color: #7f8c8d;
  margin-bottom: 0.5rem;
}
.progress-track {
  width: 100%;
  height: 10px;
  background: #eee;
  border-radius: 10px;
  overflow: hidden;
}
.progress-fill {
  height: 100%;
  background: #4caf50;
  transition: width 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.instruction {
  text-align: center;
  margin-bottom: 1.5rem;
  color: #34495e;
  font-weight: 500;
}

/* Drop Zone Styles */
.drop-zone {
  min-height: 120px;
  background: #fdfdfd;
  border: 2px dashed #bdc3c7;
  border-radius: 16px;
  padding: 1.2rem;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
  transition: all 0.3s ease;
}
.success-glow {
  border-color: #4caf50;
  background: #f1f8e9;
}

/* Word Bank Styles */
.word-bank {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
  margin-bottom: 2.5rem;
  padding: 1.2rem;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.05);
}

/* Word Pill Categories */
.word-pill {
  padding: 0.7rem 1.2rem;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  font-weight: 700;
  font-size: 1.05rem;
  transition: transform 0.1s, box-shadow 0.1s;
  box-shadow: 0 3px 0 rgba(0,0,0,0.1);
}
.word-pill:active {
  transform: translateY(2px);
  box-shadow: none;
}

.det { background-color: #fff9c4; color: #fbc02d; border: 1px solid #fff176; }
.nom { background-color: #e3f2fd; color: #1976d2; border: 1px solid #90caf9; }
.ver { background-color: #ffebee; color: #d32f2f; border: 1px solid #ef9a9a; }
.adj { background-color: #e8f5e9; color: #388e3c; border: 1px solid #a5d6a7; }

.placeholder { color: #bdc3c7; font-style: italic; font-size: 0.95rem; }

/* Control Buttons */
.controls {
  display: flex;
  gap: 12px;
}
.btn-check, .btn-next, .btn-finish {
  flex: 4;
  padding: 1rem;
  color: white;
  border: none;
  border-radius: 10px;
  font-weight: bold;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background 0.3s;
}
.btn-check { background: #2c3e50; }
.btn-check:disabled { opacity: 0.4; cursor: not-allowed; }
.btn-next, .btn-finish { 
  background: #4caf50; 
  animation: pulse 2s infinite; 
}
.btn-reset {
  flex: 1;
  padding: 1rem;
  background: #f8f9fa;
  border: 1px solid #ddd;
  border-radius: 10px;
  font-size: 1.2rem;
  cursor: pointer;
}

/* Feedback Box */
.feedback {
  margin-top: 1.5rem;
  padding: 1.2rem;
  border-radius: 10px;
  text-align: center;
  font-weight: bold;
  font-size: 1.1rem;
}
.success { background: #e8f5e9; color: #2e7d32; border: 1px solid #c8e6c9; }
.error { background: #fff3e0; color: #e65100; border: 1px solid #ffe0b2; }

/* Animations */
@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.03); }
  100% { transform: scale(1); }
}

.fade-enter-active, .fade-leave-active { transition: opacity 0.5s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>