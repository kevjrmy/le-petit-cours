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
      <div class="exercises-grid">
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