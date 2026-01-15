<template>
  <div class="story-detail-container">
    <div class="content-wrapper">
      <!-- Back Button -->
      <router-link
        :to="{ name: 'stories-list', query: { category: categoryId } }"
        class="back-button"
      >
        ← Retour aux histoires
      </router-link>

      <!-- Story Card -->
      <div v-if="story" class="story-card">
        <!-- Story Header -->
        <div class="story-header">
          <h1 class="story-title">{{ story.title }}</h1>
          <div class="story-meta">
            <span class="difficulty-badge">{{ story.difficulty }}</span>
            <span class="duration">⏱️ {{ story.duration }}</span>
          </div>
        </div>

        <!-- Audio Button -->
        <div class="audio-section">
          <button
            @click="readStory"
            :disabled="isReading"
            class="audio-button"
            :class="{ reading: isReading }"
          >
            <span v-if="!isReading">🔊 Écouter l'histoire</span>
            <span v-else>
              <span class="reading-animation">🔊</span> Lecture en cours...
            </span>
          </button>
          <button
            v-if="isReading"
            @click="stopReading"
            class="stop-button"
          >
            ⏸️ Arrêter
          </button>
        </div>

        <!-- Story Content -->
        <div class="story-content">
          <p v-for="(paragraph, index) in storyParagraphs" :key="index" class="paragraph">
            {{ paragraph }}
          </p>
        </div>

        <!-- Completion Message -->
        <div v-if="showCompletion" class="completion-message">
          <div class="completion-icon">🎉</div>
          <p class="completion-text">Bravo ! Tu as terminé l'histoire !</p>
        </div>
      </div>

      <!-- Not Found -->
      <div v-else class="story-card">
        <p class="not-found">Histoire non trouvée</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { getStoryById } from '../data/exercises'

const route = useRoute()
const categoryId = computed(() => route.query.category || 'kids-stories')
const storyId = computed(() => route.params.id)

const story = ref(null)
const isReading = ref(false)
const showCompletion = ref(false)

onMounted(() => {
  story.value = getStoryById(categoryId.value, storyId.value)
})

onUnmounted(() => {
  // Stop any ongoing speech when leaving the page
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel()
  }
})

const storyParagraphs = computed(() => {
  if (!story.value?.content) return []
  return story.value.content.split('\n\n').filter(p => p.trim())
})

const readStory = () => {
  if (!story.value || isReading.value) return

  if (!('speechSynthesis' in window)) {
    alert('Ton navigateur ne supporte pas la lecture audio')
    return
  }

  try {
    window.speechSynthesis.cancel()
    
    setTimeout(() => {
      isReading.value = true
      showCompletion.value = false
      
      const utterance = new SpeechSynthesisUtterance(story.value.content)
      utterance.lang = 'fr-FR'
      utterance.rate = 0.85
      utterance.pitch = 1.15
      utterance.volume = 1.0
      
      const voices = window.speechSynthesis.getVoices()
      const frenchVoice = voices.find(voice => 
        voice.lang.startsWith('fr') || voice.lang.includes('FR')
      )
      
      if (frenchVoice) {
        utterance.voice = frenchVoice
      }
      
      utterance.onend = () => {
        isReading.value = false
        showCompletion.value = true
        
        setTimeout(() => {
          showCompletion.value = false
        }, 5000)
      }
      
      utterance.onerror = (event) => {
        console.error('Speech error:', event.error, event)
        isReading.value = false
        
        if (event.error === 'interrupted' || event.error === 'canceled') {
          return
        }
        
        if (event.error === 'synthesis-failed') {
          alert('Le navigateur ne peut pas lire le son. Essaie de recharger la page ou utilise Chrome.')
        }
      }
      
      window.speechSynthesis.speak(utterance)
      
    }, 250)
    
  } catch (error) {
    console.error('Error in readStory:', error)
    isReading.value = false
    alert('Une erreur est survenue.')
  }
}

const stopReading = () => {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel()
    isReading.value = false
  }
}
</script>

<style scoped>
.story-detail-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #fef3c7 0%, #ddd6fe 100%);
  padding: 1.5rem;
}

.content-wrapper {
  max-width: 900px;
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

.story-card {
  background-color: white;
  border-radius: 1.5rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  padding: 2.5rem;
}

.story-header {
  text-align: center;
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 2px solid #e5e7eb;
}

.story-title {
  font-size: 2.5rem;
  font-weight: bold;
  color: #9333ea;
  margin-bottom: 1rem;
}

.story-meta {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}

.difficulty-badge {
  background-color: #e0e7ff;
  color: #6366f1;
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  font-size: 0.875rem;
  font-weight: 600;
}

.duration {
  color: #6b7280;
  font-size: 0.875rem;
}

.audio-section {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.audio-button {
  background: linear-gradient(135deg, #a855f7 0%, #ec4899 100%);
  color: white;
  font-size: 1.125rem;
  font-weight: bold;
  padding: 1rem 2.5rem;
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
  opacity: 0.7;
  cursor: not-allowed;
}

.stop-button {
  background-color: #ef4444;
  color: white;
  font-size: 1rem;
  font-weight: 600;
  padding: 1rem 2rem;
  border-radius: 9999px;
  border: none;
  cursor: pointer;
  transition: transform 0.2s;
}

.stop-button:hover {
  transform: scale(1.05);
  background-color: #dc2626;
}

.reading-animation {
  display: inline-block;
  animation: pulse 1s infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.story-content {
  margin-bottom: 2rem;
}

.paragraph {
  font-size: 1.25rem;
  line-height: 2;
  color: #374151;
  margin-bottom: 1.5rem;
  text-align: justify;
}

.paragraph:last-child {
  margin-bottom: 0;
  text-align: center;
  font-weight: bold;
  color: #9333ea;
}

.completion-message {
  text-align: center;
  padding: 2rem;
  background: linear-gradient(135deg, #fef3c7 0%, #fce7f3 100%);
  border-radius: 1rem;
  margin-top: 2rem;
  animation: fadeIn 0.5s;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.completion-icon {
  font-size: 3rem;
  margin-bottom: 0.5rem;
}

.completion-text {
  font-size: 1.5rem;
  font-weight: bold;
  color: #9333ea;
  margin: 0;
}

.not-found {
  text-align: center;
  font-size: 1.25rem;
  color: #6b7280;
  padding: 3rem;
}

@media (max-width: 768px) {
  .story-card {
    padding: 1.5rem;
  }

  .story-title {
    font-size: 1.75rem;
  }

  .paragraph {
    font-size: 1.125rem;
    line-height: 1.8;
  }

  .audio-button {
    font-size: 1rem;
    padding: 0.875rem 2rem;
  }

  .audio-section {
    flex-direction: column;
    align-items: stretch;
  }
}
</style>