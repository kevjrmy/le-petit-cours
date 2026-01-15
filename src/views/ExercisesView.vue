<template>
  <div class="exercises-container">
    <div class="content-wrapper">
      <!-- Back Button -->
      <router-link to="/" class="back-button">
        ← Retour
      </router-link>

      <!-- Header -->
      <div class="header">
        <div class="category-icon">{{ currentCategory?.icon }}</div>
        <h1 class="title">{{ currentCategory?.title }}</h1>
        <p class="description">{{ currentCategory?.description }}</p>
      </div>

      <!-- Exercises Grid -->
      <div v-if="categoryId === 'words'" class="game-start-section">
        <div class="game-intro">
          <p class="game-description">
            Devine comment se prononcent les mots ! Tu verras un mot écrit et tu devras choisir la bonne prononciation parmi plusieurs options.
          </p>
          <div class="game-stats">
            <div class="stat">
              <div class="stat-icon">📝</div>
              <div class="stat-text">{{ currentExercises.length }} mots</div>
            </div>
            <div class="stat">
              <div class="stat-icon">🎯</div>
              <div class="stat-text">Choix multiples</div>
            </div>
            <div class="stat">
              <div class="stat-icon">🔊</div>
              <div class="stat-text">Audio inclus</div>
            </div>
          </div>
          <router-link
            :to="{ name: 'word-game' }"
            class="start-game-button"
          >
            🎮 Commencer l'exercice
          </router-link>
        </div>
      </div>

      <div v-else class="exercises-grid">
        <router-link
          v-for="exercise in currentExercises"
          :key="exercise.id"
          :to="{ 
            name: 'exercise-detail', 
            params: { id: exercise.id },
            query: { category: categoryId }
          }"
        >
          <SoundCard
            :letter="exercise.letter"
            :syllable="exercise.syllable"
            :word="exercise.word"
          />
        </router-link>
      </div>

      <!-- Empty State -->
      <div v-if="currentExercises.length === 0" class="empty-state">
        <p>Aucun exercice disponible</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { pronunciationCategories, getExercisesByCategory } from '../data/exercises'
import SoundCard from '../components/SoundCard.vue'

const route = useRoute()
const categoryId = computed(() => route.query.category || 'vowels')

const currentCategory = computed(() => 
  pronunciationCategories.find(cat => cat.id === categoryId.value)
)

const currentExercises = computed(() => 
  getExercisesByCategory(categoryId.value)
)
</script>

<style scoped>
.exercises-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #dbeafe 0%, #e9d5ff 100%);
  padding: 1.5rem;
}

.content-wrapper {
  max-width: 1200px;
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

.header {
  text-align: center;
  margin-bottom: 2rem;
}

.category-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.title {
  font-size: 2.5rem;
  font-weight: bold;
  color: #9333ea;
  margin-bottom: 0.5rem;
}

.description {
  font-size: 1.125rem;
  color: #374151;
}

.exercises-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
}

.exercises-grid a {
  text-decoration: none;
}

.game-start-section {
  display: flex;
  justify-content: center;
}

.game-intro {
  background-color: white;
  border-radius: 1.5rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  padding: 3rem;
  text-align: center;
  max-width: 600px;
}

.game-description {
  font-size: 1.125rem;
  color: #374151;
  line-height: 1.8;
  margin-bottom: 2rem;
}

.game-stats {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 2rem;
}

.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.stat-icon {
  font-size: 2rem;
}

.stat-text {
  font-size: 0.875rem;
  color: #6b7280;
  font-weight: 600;
}

.start-game-button {
  display: inline-block;
  background: linear-gradient(135deg, #f59e0b 0%, #ef4444 100%);
  color: white;
  font-size: 1.25rem;
  font-weight: bold;
  padding: 1rem 3rem;
  border-radius: 9999px;
  text-decoration: none;
  transition: transform 0.2s;
}

.start-game-button:hover {
  transform: scale(1.05);
}

.empty-state {
  text-align: center;
  padding: 3rem 0;
}

.empty-state p {
  font-size: 1.25rem;
  color: #4b5563;
}

@media (max-width: 768px) {
  .title {
    font-size: 2rem;
  }

  .exercises-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 1rem;
  }
}
</style>