<template>
    <AltLayout title="Une journée à Paris">
        <main class="story-container">

            <div class="story-header">
                <span class="difficulty-tag">🌟 Niveau Facile</span>
                <p class="instruction">Écoute bien et écris les phrases dans ton cahier.</p>
            </div>

            <div class="story-content">
                <section v-for="(step, index) in steps" :key="index" class="story-block">
                    <div class="image-container">
                        <img :src="step.image" :alt="'Illustration partie ' + (index + 1)" class="story-img" />
                    </div>

                    <div class="card-body">
                        <button class="btn-read" :class="{ 'is-playing': playingIndex === index }"
                            @click="readAloud(step.text, index)">
                            <span v-if="playingIndex === index">✨ Lecture en cours...</span>
                            <span v-else>🔊 Écouter la partie {{ index + 1 }}</span>
                        </button>

                        <details class="correction">
                            <summary>Vérifier l'orthographe</summary>
                            <p class="text-reveal">{{ step.text }}</p>
                        </details>
                    </div>
                </section>
            </div>

            <div class="story-footer">
                <RouterLink to="/dictees" class="btn-back">← Retour aux chapitres</RouterLink>
            </div>
        </main>
    </AltLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import AltLayout from '@/layouts/AltLayout.vue'

// Centralisation du contenu
const steps = [
    {
        image: '/dictees/paris/paris-1.png',
        text: "Aujourd'hui, nous allons à la Tour Eiffel. Elle est très grande et très belle !"
    },
    {
        image: '/dictees/paris/paris-2.png',
        text: "Ensuite, nous prenons un bateau sur la Seine pour voir les ponts de Paris."
    },
    {
        image: '/dictees/paris/paris-3.png',
        text: "Pour finir, nous mangeons un bon croissant chaud dans une petite boulangerie."
    }
]

// Track which part is playing (-1 means nothing is playing)
const playingIndex = ref(-1)

const readAloud = (text, index) => {
    // If we click the one already playing, stop it and reset index
    if (playingIndex.value === index) {
        window.speechSynthesis.cancel()
        playingIndex.value = -1
        return
    }

    // Otherwise, cancel anything else and play new part
    window.speechSynthesis.cancel()

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'fr-FR'
    utterance.rate = 0.85

    utterance.onstart = () => { playingIndex.value = index }
    utterance.onend = () => { playingIndex.value = -1 }
    utterance.onerror = () => { playingIndex.value = -1 }

    const voices = window.speechSynthesis.getVoices()
    const frenchVoice = voices.find(v => v.lang === 'fr-FR' && v.name.includes('Google')) ||
        voices.find(v => v.lang.startsWith('fr'))

    if (frenchVoice) utterance.voice = frenchVoice
    window.speechSynthesis.speak(utterance)
}

onMounted(() => {
    window.speechSynthesis.getVoices()
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices()
    }
})
</script>

<style scoped>
.story-container {
    padding: 1rem 1.5rem 4rem;
    max-width: 650px;
    margin: 0 auto;
}

.story-header {
    text-align: center;
    margin-bottom: 2.5rem;
}

.difficulty-tag {
    background: #e8f5e9;
    color: #2e7d32;
    padding: 0.5rem 1.2rem;
    border-radius: 20px;
    font-weight: bold;
    font-size: 0.9rem;
    border: 1px solid #c8e6c9;
}

.story-block {
    margin-bottom: 3rem;
    background: #fff;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    border: 1px solid #eee;
}

.image-container {
    width: 100%;
    background-color: #f5f5f5;
}

.story-img {
    width: 100%;
    height: auto;
    display: block;
}

.card-body {
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
}

.btn-read {
    background: #2c3e50;
    color: white;
    border: none;
    padding: 0.8rem 1.5rem;
    border-radius: 8px;
    font-size: 1rem;
    cursor: pointer;
    font-weight: 600;
    width: 100%;
}

/* Using native <details> for the correction toggle */
.correction {
    width: 100%;
    text-align: center;
}

summary {
    font-size: 0.85rem;
    color: #7f8c8d;
    cursor: pointer;
    user-select: none;
    padding: 0.5rem;
}

.text-reveal {
    margin-top: 1rem;
    padding: 1rem;
    background: #fdfdfd;
    border: 1px dashed #ccc;
    border-radius: 8px;
    font-size: 1.1rem;
    line-height: 1.6;
    color: #34495e;
}

.btn-back {
    display: inline-block;
    margin-top: 2rem;
    text-decoration: none;
    color: #95a5a6;
    font-weight: 500;
}
</style>