<template>
  <div class="stories-container">
    <div class="content-wrapper">
      <!-- Back Button -->
      <router-link
        :to="{ name: 'subcategories', params: { mainCategory: 'stories' } }"
        class="back-button"
      >
        ← Retour aux catégories
      </router-link>

      <!-- Header -->
      <div class="header">
        <div class="category-icon">{{ currentCategory?.icon }}</div>
        <h1 class="title">{{ currentCategory?.title }}</h1>
        <p class="description">{{ currentCategory?.description }}</p>
        <span class="level-badge" :style="{ backgroundColor: currentCategory?.color }">
          {{ currentCategory?.level }}
        </span>
      </div>

      <!-- Stories Grid -->
      <div class="stories-grid" v-if="currentStories.length > 0">
        <router-link
          v-for="story in currentStories"
          :key="story.id"
          :to="{ 
            name: 'story-detail', 
            params: { id: story.id },
            query: { category: categoryId }
          }"
          class="story-card"
        >
          <div class="story-header">
            <h3 class="story-title">{{ story.title }}</h3>
            <span class="difficulty">{{ story.difficulty }}</span>
          </div>
          <p class="story-description">{{ story.description }}</p>
          <div class="story-footer">
            <span class="duration">⏱️ {{ story.duration }}</span>
            <span class="read-button">Lire →</span>
          </div>
        </router-link>
      </div>

      <!-- Empty State -->
      <div v-else class="empty-state">
        <p class="empty-icon">📚</p>
        <p class="empty-message">Aucune histoire disponible pour le moment</p>
        <p class="empty-submessage">Reviens bientôt !</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { storyCategories, getStoriesByCategory } from '../data/exercises'

const route = useRoute()
const categoryId = computed(() => route.query.category || 'kids-stories')

const currentCategory = computed(() => 
  storyCategories.find(cat => cat.id === categoryId.value)
)

const currentStories = computed(() => 
  getStoriesByCategory(categoryId.value)
)
</script>

<style scoped>
.stories-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #fef3c7 0%, #ddd6fe 100%);
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
  margin-bottom: 1rem;
}

.level-badge {
  display: inline-block;
  padding: 0.5rem 1.5rem;
  border-radius: 2rem;
  color: white;
  font-weight: 600;
  font-size: 0.875rem;
}

.stories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
}

.story-card {
  background-color: white;
  border-radius: 1rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  cursor: pointer;
  text-decoration: none;
  transition: transform 0.2s, box-shadow 0.2s;
  display: flex;
  flex-direction: column;
}

.story-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}

.story-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
  gap: 1rem;
}

.story-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: #9333ea;
  margin: 0;
  flex: 1;
}

.difficulty {
  background-color: #e0e7ff;
  color: #6366f1;
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.75rem;
  font-weight: 600;
  white-space: nowrap;
}

.story-description {
  color: #6b7280;
  font-size: 1rem;
  margin-bottom: 1.5rem;
  flex: 1;
}

.story-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  border-top: 1px solid #e5e7eb;
}

.duration {
  color: #9ca3af;
  font-size: 0.875rem;
}

.read-button {
  color: #9333ea;
  font-weight: 600;
  font-size: 0.875rem;
}

.empty-state {
  text-align: center;
  padding: 4rem 2rem;
}

.empty-icon {
  font-size: 5rem;
  margin-bottom: 1rem;
}

.empty-message {
  font-size: 1.5rem;
  color: #374151;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.empty-submessage {
  font-size: 1.125rem;
  color: #6b7280;
}

@media (max-width: 768px) {
  .title {
    font-size: 2rem;
  }

  .stories-grid {
    grid-template-columns: 1fr;
  }
}
</style>