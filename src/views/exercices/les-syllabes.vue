<template>
    <AltLayout title="Le Maître des Syllabes">
        <main class="syllabes-container">

            <div class="progress-section">
                <p class="progress-text">Mot {{ currentLevelIndex + 1 }} / {{ levels.length }}</p>
                <div class="progress-track">
                    <div class="progress-fill"
                        :style="{ width: ((currentLevelIndex + 1) / levels.length) * 100 + '%' }"></div>
                </div>
            </div>

            <div class="game-box">
                <div class="word-display" :class="{ 'is-split': step >= 2 }">
                    <transition name="scale" mode="out-in">
                        <h2 :key="step >= 2" class="target-word">
                            {{ step >= 2 ? currentLevel.split : currentLevel.word }}
                        </h2>
                    </transition>
                    <p v-if="step >= 2" class="split-label">Bien découpé !</p>
                </div>

                <div v-if="step === 1" class="step-container">
                    <p class="instruction">Combien y a-t-il de syllabes ? 👏</p>
                    <div class="options">
                        <button v-for="n in 4" :key="n" class="opt-btn" @click="checkSyllables(n)">
                            {{ n }}
                        </button>
                    </div>
                </div>

                <div v-if="step === 2" class="choice-menu">
                    <p class="instruction">Bravo ! Que veux-tu faire maintenant ?</p>
                    <div class="choices-grid">
                        <button class="choice-btn mic" @click="startListening">
                            <span class="icon">🎤</span>
                            <span class="label">Le prononcer</span>
                        </button>

                        <button class="choice-btn audio" @click="playAudio">
                            <span class="icon">🔊</span>
                            <span class="label">L'écouter</span>
                        </button>

                        <button class="choice-btn skip" @click="nextLevel">
                            <span class="icon">⏭️</span>
                            <span class="label">Mot suivant</span>
                        </button>
                    </div>
                </div>

                <div v-if="step === 3" class="step-container">
                    <button :class="['mic-btn', { 'is-listening': isListening }]" @click="startListening"
                        :disabled="isListening">
                        {{ isListening ? '🔵 Je t\'écoute...' : '🎤 Clique et parle' }}
                    </button>
                    <button class="btn-cancel" @click="step = 2">Retour</button>
                </div>

                <transition name="fade">
                    <div v-if="feedback" :class="['feedback', feedbackType]">
                        {{ feedback }}
                    </div>
                </transition>

                <button v-if="showFinishButton" @click="nextLevel" class="btn-next">
                    {{ currentLevelIndex < levels.length - 1 ? 'Continuer ➔' : 'Terminer l\' exercice 🏆' }} </button>
            </div>
        </main>
    </AltLayout>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import AltLayout from '@/layouts/AltLayout.vue'

const router = useRouter()

const levels = [
    { word: "Chapeau", syllables: 2, split: "Cha - peau" },
    { word: "Papillon", syllables: 3, split: "Pa - pil - lon" },
    { word: "Crocodile", syllables: 3, split: "Cro - co - dile" },
    { word: "Pain", syllables: 1, split: "Pain" },
    { word: "Chocolat", syllables: 3, split: "Cho - co - lat" }
]

const currentLevelIndex = ref(0)
const step = ref(1)
const isListening = ref(false)
const feedback = ref('')
const feedbackType = ref('')
const showFinishButton = ref(false)

const currentLevel = computed(() => levels[currentLevelIndex.value])

const checkSyllables = (n) => {
    if (n === currentLevel.value.syllables) {
        feedback.value = "Correct ! C'est bien " + n + " syllabes."
        feedbackType.value = 'success'
        setTimeout(() => {
            step.value = 2
            feedback.value = ''
        }, 1200)
    } else {
        feedback.value = "Réessaie encore ! 👏"
        feedbackType.value = 'error'
    }
}

const playAudio = () => {
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(currentLevel.value.word)
    utterance.lang = 'fr-FR'
    utterance.rate = 0.8
    window.speechSynthesis.speak(utterance)

    feedback.value = "Écoute bien la prononciation."
    feedbackType.value = 'success'
    showFinishButton.value = true
}

const startListening = () => {
    step.value = 3
    feedback.value = ''
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRecognition) {
        feedback.value = "Micro non supporté sur ce navigateur."
        showFinishButton.value = true
        return
    }

    const recognition = new SpeechRecognition()
    recognition.lang = 'fr-FR'
    isListening.value = true

    recognition.onresult = (event) => {
        const speech = event.results[0][0].transcript.toLowerCase()
        if (speech.includes(currentLevel.value.word.toLowerCase())) {
            feedback.value = "Excellent ! C'est parfait."
            feedbackType.value = 'success'
            showFinishButton.value = true
            step.value = 2 // Retour au menu pour voir le bouton continuer
        } else {
            feedback.value = `J'ai entendu "${speech}". Réessaie !`
            feedbackType.value = 'error'
        }
    }

    recognition.onend = () => { isListening.value = false }
    recognition.start()
}

const nextLevel = () => {
    if (currentLevelIndex.value < levels.length - 1) {
        currentLevelIndex.value++
        step.value = 1
        feedback.value = ''
        feedbackType.value = ''
        showFinishButton.value = false
    } else {
        router.push('/exercices')
    }
}
</script>

<style scoped>
.syllabes-container {
    padding: 1.5rem;
    max-width: 600px;
    margin: 0 auto;
}

.word-display {
    background: white;
    padding: 2.5rem 1rem;
    border-radius: 20px;
    text-align: center;
    margin-bottom: 2rem;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
    border: 3px solid #e91e63;
}

.target-word {
    font-size: 2.8rem;
    color: #e91e63;
    margin: 0;
    text-transform: capitalize;
}

.choices-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 12px;
    margin-top: 1rem;
}

.choice-btn {
    display: flex;
    align-items: center;
    padding: 1rem;
    border: 2px solid #eee;
    border-radius: 12px;
    background: white;
    cursor: pointer;
    transition: all 0.2s;
}

.choice-btn .icon {
    font-size: 1.5rem;
    margin-right: 15px;
}

.choice-btn .label {
    font-weight: bold;
    font-size: 1.1rem;
    color: #2c3e50;
}

.choice-btn:hover {
    border-color: #e91e63;
    background: #fff9fb;
}

.mic-btn {
    width: 100%;
    padding: 1.5rem;
    border-radius: 12px;
    border: none;
    background: #2196f3;
    color: white;
    font-weight: bold;
    font-size: 1.2rem;
    cursor: pointer;
}

.btn-cancel {
    display: block;
    width: 100%;
    margin-top: 10px;
    background: none;
    border: none;
    color: #999;
    cursor: pointer;
}

.btn-next {
    width: 100%;
    margin-top: 2rem;
    padding: 1.2rem;
    background: #4caf50;
    color: white;
    border: none;
    border-radius: 12px;
    font-weight: bold;
    font-size: 1.1rem;
    cursor: pointer;
}

.opt-btn {
    width: 55px;
    height: 55px;
    font-size: 1.3rem;
    font-weight: bold;
    border-radius: 50%;
    border: 2px solid #ddd;
    background: white;
    cursor: pointer;
}

.opt-btn:hover {
    background: #e91e63;
    color: white;
    border-color: #e91e63;
}

.is-listening {
    background: #f44336;
    animation: pulse 1s infinite;
}

@keyframes pulse {

    0%,
    100% {
        opacity: 1;
    }

    50% {
        opacity: 0.7;
    }
}

.progress-track {
    width: 100%;
    height: 8px;
    background: #eee;
    border-radius: 10px;
    margin: 10px 0 20px;
    overflow: hidden;
}

.progress-fill {
    height: 100%;
    background: #e91e63;
    transition: width 0.4s;
}

.feedback {
    margin-top: 1.5rem;
    padding: 1rem;
    border-radius: 10px;
    text-align: center;
    font-weight: bold;
}

.success {
    background: #e8f5e9;
    color: #2e7d32;
    border: 1px solid #c8e6c9;
}

.error {
    background: #ffebee;
    color: #c62828;
    border: 1px solid #ffcdd2;
}

/* À ajouter/modifier dans <style scoped> */

.word-display {
    background: white;
    padding: 2.5rem 1rem;
    border-radius: 20px;
    text-align: center;
    margin-bottom: 2rem;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
    border: 3px solid #e91e63;
    transition: all 0.5s ease;
}

.word-display.is-split {
    background: #fff9fb;
    border-style: dashed;
    /* Change de style pour montrer le découpage */
    transform: scale(1.02);
}

.target-word {
    font-size: 2.8rem;
    color: #e91e63;
    margin: 0;
    text-transform: capitalize;
    letter-spacing: 2px;
}

.split-label {
    color: #e91e63;
    font-size: 0.8rem;
    font-weight: bold;
    text-transform: uppercase;
    margin-top: 10px;
    letter-spacing: 1px;
}

/* Animation de transition pour le changement de texte */
.scale-enter-active,
.scale-leave-active {
    transition: all 0.3s ease;
}

.scale-enter-from,
.scale-leave-to {
    opacity: 0;
    transform: scale(0.9);
}
</style>