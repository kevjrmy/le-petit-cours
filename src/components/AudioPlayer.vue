<template>
  <div class="audio-player">
    <button
      @click="play"
      :disabled="isPlaying"
      class="play-button"
      :class="{ playing: isPlaying }"
    >
      <span v-if="!isPlaying">{{ buttonText }}</span>
      <span v-else>{{ playingText }}</span>
    </button>

    <div v-if="showFeedback" class="feedback">
      {{ currentFeedback }}
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  text: {
    type: String,
    required: true
  },
  lang: {
    type: String,
    default: 'fr-FR'
  },
  rate: {
    type: Number,
    default: 0.8
  },
  pitch: {
    type: Number,
    default: 1.1
  },
  buttonText: {
    type: String,
    default: '🔊 Écouter'
  },
  playingText: {
    type: String,
    default: '🔊 En cours...'
  },
  showFeedbackMessage: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['play', 'end', 'error'])

const isPlaying = ref(false)
const showFeedback = ref(false)
const currentFeedback = ref('')
const voicesLoaded = ref(false)

const feedbackMessages = ['🎉 Bravo !', '⭐ Super !', '👏 Excellent !', '💪 Parfait !']

onMounted(() => {
  // Load voices
  if ('speechSynthesis' in window) {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices()
      if (voices.length > 0) {
        voicesLoaded.value = true
      }
    }
    
    loadVoices()
    window.speechSynthesis.onvoiceschanged = loadVoices
  }
})

const play = () => {
  if (isPlaying.value) return

  if ('speechSynthesis' in window) {
    // Cancel any ongoing speech
    window.speechSynthesis.cancel()
    
    isPlaning.value = true
    emit('play')
    
    const utterance = new SpeechSynthesisUtterance(props.text)
    utterance.lang = props.lang
    utterance.rate = props.rate
    utterance.pitch = props.pitch
    
    // Try to find a French voice
    const voices = window.speechSynthesis.getVoices()
    const frenchVoice = voices.find(voice => voice.lang.startsWith('fr'))
    if (frenchVoice) {
      utterance.voice = frenchVoice
    }
    
    utterance.onend = () => {
      isPlaying.value = false
      emit('end')
      
      if (props.showFeedbackMessage) {
        showFeedback.value = true
        currentFeedback.value = feedbackMessages[Math.floor(Math.random() * feedbackMessages.length)]
        
        setTimeout(() => {
          showFeedback.value = false
        }, 2000)
      }
    }
    
    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event)
      isPlaying.value = false
      emit('error', event)
      alert('Erreur lors de la lecture audio. Réessaye dans quelques secondes.')
    }
    
    // Small delay to ensure voices are loaded
    setTimeout(() => {
      window.speechSynthesis.speak(utterance)
    }, 100)
  } else {
    alert('Ton navigateur ne supporte pas la lecture audio')
    emit('error', new Error('Speech Synthesis not supported'))
  }
}
</script>

<style scoped>
.audio-player {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.play-button {
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

.play-button:hover:not(:disabled) {
  transform: scale(1.05);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.play-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.feedback {
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

@media (max-width: 768px) {
  .play-button {
    font-size: 1rem;
    padding: 1rem 2rem;
  }
}
</style>