<template>
  <div class="detail-container">
    <div class="content-wrapper">
      <!-- Back Button -->
      <router-link
        :to="{ name: 'exercises', query: { category: categoryId } }"
        class="back-button"
      >
        ← Retour aux exercices
      </router-link>

      <!-- Exercise Card -->
      <div v-if="exercise" class="exercise-card">
        <!-- Main Letter/Syllable -->
        <div class="exercise-content">
          <div class="letter">
            {{ exercise.letter || exercise.syllable }}
          </div>
          <div class="word">{{ exercise.word }}</div>
          <div class="pronunciation">
            Prononciation: {{ exercise.pronunciation }}
          </div>
        </div>

        <!-- Audio Button -->
        <button
          @click="speak"
          :disabled="isSpeaking"
          class="audio-button"
          :class="{ speaking: isSpeaking }"
        >
          <span v-if="!isSpeaking">🔊 Écouter</span>
          <span v-else>🔊 En cours...</span>
        </button>

        <!-- Feedback Message -->
        <div v-if="showFeedback" class="feedback">
          {{ feedbackMessage }}
        </div>
      </div>

      <!-- Not Found -->
      <div v-else class="exercise-card">
        <p class="not-found">Exercice non trouvé</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getExercisesByCategory } from '../data/exercises'

const route = useRoute()
const categoryId = computed(() => route.query.category || 'vowels')
const exerciseId = computed(() => route.params.id)

const exercise = ref(null)
const isSpeaking = ref(false)
const showFeedback = ref(false)
const feedbackMessage = ref('🎉 Très bien !')
const voicesReady = ref(false)

const feedbackMessages = ['🎉 Bravo !', '⭐ Super !', '👏 Excellent !', '💪 Parfait !']

onMounted(() => {
  const exercises = getExercisesByCategory(categoryId.value)
  exercise.value = exercises.find(ex => ex.id === exerciseId.value)
  
  // Ensure voices are loaded
  if ('speechSynthesis' in window) {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices()
      if (voices.length > 0) {
        voicesReady.value = true
      }
    }
    
    loadVoices()
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices
    }
  }
})

const speak = () => {
  if (!exercise.value || isSpeaking.value) return

  if (!('speechSynthesis' in window)) {
    alert('Ton navigateur ne supporte pas la lecture audio')
    return
  }

  try {
    // Cancel any ongoing speech and reset
    window.speechSynthesis.cancel()
    
    // Wait a bit for cancel to complete
    setTimeout(() => {
      isSpeaking.value = true
      
      const utterance = new SpeechSynthesisUtterance(exercise.value.word)
      utterance.lang = 'fr-FR'
      utterance.rate = 0.8
      utterance.pitch = 1.1
      utterance.volume = 1.0
      
      // Try to find a French voice
      const voices = window.speechSynthesis.getVoices()
      console.log('Available voices:', voices.length)
      
      const frenchVoice = voices.find(voice => 
        voice.lang.startsWith('fr') || voice.lang.includes('FR')
      )
      
      if (frenchVoice) {
        console.log('Using French voice:', frenchVoice.name)
        utterance.voice = frenchVoice
      } else {
        console.log('No French voice found, using default')
      }
      
      utterance.onstart = () => {
        console.log('Speech started')
      }
      
      utterance.onend = () => {
        console.log('Speech ended')
        isSpeaking.value = false
        showFeedback.value = true
        feedbackMessage.value = feedbackMessages[Math.floor(Math.random() * feedbackMessages.length)]
        
        setTimeout(() => {
          showFeedback.value = false
        }, 2000)
      }
      
      utterance.onerror = (event) => {
        console.error('Speech error:', event.error, event)
        isSpeaking.value = false
        
        // Different error messages based on error type
        if (event.error === 'interrupted' || event.error === 'canceled') {
          return // User action, ignore
        }
        
        if (event.error === 'synthesis-failed') {
          alert('Le navigateur ne peut pas lire le son. Essaie de recharger la page ou utilise un autre navigateur (Chrome recommandé).')
        } else {
          alert('Erreur: ' + event.error)
        }
      }
      
      console.log('Speaking:', exercise.value.word)
      window.speechSynthesis.speak(utterance)
      
    }, 250) // Wait 250ms after cancel
    
  } catch (error) {
    console.error('Error in speak function:', error)
    isSpeaking.value = false
    alert('Une erreur est survenue. Réessaye.')
  }
}
</script>

<style scoped>
.detail-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #d1fae5 0%, #dbeafe 100%);
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

.exercise-card {
  background-color: white;
  border-radius: 1.5rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  padding: 3rem;
  text-align: center;
}

.exercise-content {
  margin-bottom: 2rem;
}

.letter {
  font-size: 6rem;
  font-weight: bold;
  color: #9333ea;
  margin-bottom: 1rem;
}

.word {
  font-size: 2rem;
  color: #374151;
  font-weight: 500;
  margin-bottom: 0.5rem;
}

.pronunciation {
  font-size: 1.25rem;
  color: #6b7280;
}

.audio-button {
  background: linear-gradient(135deg, #a855f7 0%, #ec4899 100%);
  color: white;
  font-size: 1.25rem;
  font-weight: bold;
  padding: 1.5rem 3rem;
  border-radius: 9999px;
  border: none;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.audio-button:hover:not(:disabled) {
  transform: scale(1.05);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.audio-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.feedback {
  margin-top: 2rem;
  font-size: 1.5rem;
  animation: bounce 1s infinite;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.not-found {
  font-size: 1.25rem;
  color: #4b5563;
}

@media (max-width: 768px) {
  .exercise-card {
    padding: 2rem 1.5rem;
  }

  .letter {
    font-size: 4rem;
  }

  .word {
    font-size: 1.5rem;
  }

  .audio-button {
    font-size: 1rem;
    padding: 1rem 2rem;
  }
}
</style>