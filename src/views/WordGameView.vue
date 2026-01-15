<template>
  <div class="word-game-container">
    <div class="content-wrapper">
      <!-- Back Button -->
      <router-link
        :to="{ name: 'exercises', query: { category: 'words' } }"
        class="back-button"
      >
        ← Retour aux mots
      </router-link>

      <!-- Game Card -->
      <div v-if="currentWord" class="game-card">
        <!-- Progress -->
        <div class="progress-bar">
          <div class="progress-fill" :style="{ width: progressPercentage + '%' }"></div>
        </div>
        <p class="progress-text">Mot {{ currentIndex + 1 }} sur {{ totalWords }}</p>

        <!-- Word Display -->
        <div class="word-display">
          <p class="instruction">Comment se prononce ce mot ?</p>
          <h1 class="word">{{ currentWord.word }}</h1>
        </div>

        <!-- Options -->
        <div class="options-container">
          <button
            v-for="option in currentWord.options"
            :key="option"
            @click="selectAnswer(option)"
            class="option-button"
            :class="getOptionClass(option)"
            :disabled="hasAnswered"
          >
            {{ option }}
          </button>
        </div>

        <!-- Feedback -->
        <div v-if="hasAnswered" class="feedback-section">
          <div v-if="isCorrect" class="feedback correct">
            <div class="feedback-icon">✅</div>
            <p class="feedback-text">Bravo ! C'est correct !</p>
          </div>
          <div v-else class="feedback incorrect">
            <div class="feedback-icon">❌</div>
            <p class="feedback-text">Pas tout à fait...</p>
            <p class="hint">💡 {{ currentWord.hint }}</p>
            <p class="correct-answer">La bonne réponse : <strong>{{ currentWord.correctAnswer }}</strong></p>
          </div>

          <!-- Audio Button -->
          <button
            @click="speakWord"
            :disabled="isSpeaking"
            class="audio-button"
          >
            <span v-if="!isSpeaking">🔊 Écouter</span>
            <span v-else>🔊 En cours...</span>
          </button>

          <!-- Next Button -->
          <button @click="nextWord" class="next-button">
            {{ currentIndex < totalWords - 1 ? 'Mot suivant →' : 'Terminer' }}
          </button>
        </div>
      </div>

      <!-- Results Screen -->
      <div v-if="showResults" class="results-card">
        <div class="results-icon">🎉</div>
        <h2 class="results-title">Exercice terminé !</h2>
        <p class="results-score">
          Tu as eu <strong>{{ score }}</strong> sur <strong>{{ totalWords }}</strong> !
        </p>
        <div class="results-message">
          <p v-if="score === totalWords">🌟 Parfait ! Tu es un champion !</p>
          <p v-else-if="score >= totalWords * 0.7">👏 Très bien ! Continue comme ça !</p>
          <p v-else>💪 Bon travail ! Réessaye pour t'améliorer !</p>
        </div>
        <div class="results-actions">
          <button @click="restartGame" class="restart-button">
            🔄 Recommencer
          </button>
          <router-link
            :to="{ name: 'exercises', query: { category: 'words' } }"
            class="back-link"
          >
            ← Retour aux mots
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getExercisesByCategory } from '../data/exercises'

const route = useRoute()
const exerciseId = computed(() => route.params.id)

const words = ref([])
const currentIndex = ref(0)
const selectedAnswer = ref(null)
const hasAnswered = ref(false)
const isCorrect = ref(false)
const score = ref(0)
const showResults = ref(false)
const isSpeaking = ref(false)

onMounted(() => {
  words.value = getExercisesByCategory('words')
  // Shuffle words for variety
  words.value = [...words.value].sort(() => Math.random() - 0.5)
})

const currentWord = computed(() => {
  if (showResults.value) return null
  return words.value[currentIndex.value]
})

const totalWords = computed(() => words.value.length)

const progressPercentage = computed(() => {
  return ((currentIndex.value + 1) / totalWords.value) * 100
})

const selectAnswer = (option) => {
  if (hasAnswered.value) return
  
  selectedAnswer.value = option
  hasAnswered.value = true
  isCorrect.value = option === currentWord.value.correctAnswer
  
  if (isCorrect.value) {
    score.value++
  }
}

const getOptionClass = (option) => {
  if (!hasAnswered.value) return ''
  
  if (option === currentWord.value.correctAnswer) {
    return 'correct'
  }
  
  if (option === selectedAnswer.value && !isCorrect.value) {
    return 'incorrect'
  }
  
  return 'disabled'
}

const nextWord = () => {
  if (currentIndex.value < totalWords.value - 1) {
    currentIndex.value++
    selectedAnswer.value = null
    hasAnswered.value = false
    isCorrect.value = false
  } else {
    showResults.value = true
  }
}

const restartGame = () => {
  currentIndex.value = 0
  selectedAnswer.value = null
  hasAnswered.value = false
  isCorrect.value = false
  score.value = 0
  showResults.value = false
  words.value = [...words.value].sort(() => Math.random() - 0.5)
}

const speakWord = () => {
  if (!currentWord.value || isSpeaking.value) return

  if (!('speechSynthesis' in window)) {
    alert('Ton navigateur ne supporte pas la lecture audio')
    return
  }

  try {
    window.speechSynthesis.cancel()
    
    setTimeout(() => {
      isSpeaking.value = true
      
      const utterance = new SpeechSynthesisUtterance(currentWord.value.word)
      utterance.lang = 'fr-FR'
      utterance.rate = 0.7
      utterance.pitch = 1.1
      utterance.volume = 1.0
      
      const voices = window.speechSynthesis.getVoices()
      const frenchVoice = voices.find(voice => 
        voice.lang.startsWith('fr') || voice.lang.includes('FR')
      )
      
      if (frenchVoice) {
        utterance.voice = frenchVoice
      }
      
      utterance.onend = () => {
        isSpeaking.value = false
      }
      
      utterance.onerror = (event) => {
        console.error('Speech error:', event.error)
        isSpeaking.value = false
        
        if (event.error === 'interrupted' || event.error === 'canceled') {
          return
        }
      }
      
      window.speechSynthesis.speak(utterance)
      
    }, 250)
    
  } catch (error) {
    console.error('Error in speakWord:', error)
    isSpeaking.value = false
  }
}
</script>

<style scoped>
.word-game-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
  padding: 1.5rem;
}

.content-wrapper {
  max-width: 800px;
  margin: 0 auto;
}

.back-button {
  display: inline-flex;
  align-items: center;
  color: #9333ea;
  text-decoration: none;
  margin-bottom: 1.5rem;
  font-size: 1.125rem;
}

.back-button:hover {
  color: #7e22ce;
}

.game-card,
.results-card {
  background-color: white;
  border-radius: 1.5rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  padding: 2.5rem;
}

.progress-bar {
  width: 100%;
  height: 0.5rem;
  background-color: #e5e7eb;
  border-radius: 1rem;
  margin-bottom: 0.5rem;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #f59e0b 0%, #ef4444 100%);
  transition: width 0.3s ease;
}

.progress-text {
  text-align: center;
  color: #6b7280;
  font-size: 0.875rem;
  margin-bottom: 2rem;
}

.word-display {
  text-align: center;
  margin-bottom: 3rem;
}

.instruction {
  font-size: 1.25rem;
  color: #6b7280;
  margin-bottom: 1rem;
}

.word {
  font-size: 4rem;
  font-weight: bold;
  color: #f59e0b;
  margin: 0;
}

.options-container {
  display: grid;
  gap: 1rem;
  margin-bottom: 2rem;
}

.option-button {
  background-color: #fef3c7;
  color: #78350f;
  font-size: 1.5rem;
  font-weight: 600;
  padding: 1.5rem;
  border: 3px solid #fde68a;
  border-radius: 1rem;
  cursor: pointer;
  transition: all 0.2s;
}

.option-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  background-color: #fde68a;
}

.option-button:disabled {
  cursor: not-allowed;
}

.option-button.correct {
  background-color: #d1fae5;
  border-color: #10b981;
  color: #065f46;
}

.option-button.incorrect {
  background-color: #fee2e2;
  border-color: #ef4444;
  color: #991b1b;
}

.option-button.disabled {
  opacity: 0.5;
}

.feedback-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
}

.feedback {
  text-align: center;
  padding: 1.5rem;
  border-radius: 1rem;
  width: 100%;
}

.feedback.correct {
  background-color: #d1fae5;
}

.feedback.incorrect {
  background-color: #fee2e2;
}

.feedback-icon {
  font-size: 3rem;
  margin-bottom: 0.5rem;
}

.feedback-text {
  font-size: 1.25rem;
  font-weight: bold;
  color: #374151;
  margin-bottom: 0.5rem;
}

.hint {
  color: #6b7280;
  font-size: 1rem;
  margin: 0.5rem 0;
}

.correct-answer {
  color: #374151;
  font-size: 1.125rem;
  margin-top: 0.5rem;
}

.audio-button {
  background: linear-gradient(135deg, #a855f7 0%, #ec4899 100%);
  color: white;
  font-size: 1.125rem;
  font-weight: bold;
  padding: 1rem 2.5rem;
  border-radius: 9999px;
  border: none;
  cursor: pointer;
  transition: transform 0.2s;
}

.audio-button:hover:not(:disabled) {
  transform: scale(1.05);
}

.audio-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.next-button {
  background-color: #f59e0b;
  color: white;
  font-size: 1.125rem;
  font-weight: bold;
  padding: 1rem 3rem;
  border-radius: 9999px;
  border: none;
  cursor: pointer;
  transition: transform 0.2s;
}

.next-button:hover {
  transform: scale(1.05);
  background-color: #d97706;
}

.results-card {
  text-align: center;
}

.results-icon {
  font-size: 5rem;
  margin-bottom: 1rem;
}

.results-title {
  font-size: 2.5rem;
  font-weight: bold;
  color: #9333ea;
  margin-bottom: 1rem;
}

.results-score {
  font-size: 1.5rem;
  color: #374151;
  margin-bottom: 1.5rem;
}

.results-message {
  font-size: 1.25rem;
  color: #6b7280;
  margin-bottom: 2rem;
}

.results-actions {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
}

.restart-button {
  background: linear-gradient(135deg, #f59e0b 0%, #ef4444 100%);
  color: white;
  font-size: 1.125rem;
  font-weight: bold;
  padding: 1rem 3rem;
  border-radius: 9999px;
  border: none;
  cursor: pointer;
  transition: transform 0.2s;
}

.restart-button:hover {
  transform: scale(1.05);
}

.back-link {
  color: #9333ea;
  text-decoration: none;
  font-size: 1.125rem;
}

.back-link:hover {
  color: #7e22ce;
}

@media (max-width: 768px) {
  .game-card,
  .results-card {
    padding: 1.5rem;
  }

  .word {
    font-size: 3rem;
  }

  .option-button {
    font-size: 1.25rem;
    padding: 1rem;
  }
}
</style>