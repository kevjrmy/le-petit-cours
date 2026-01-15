<template>
  <div class="home-container">
    <div class="content-wrapper">
      <!-- Header -->
      <div class="header">
        <h1 class="title">🎓 Le Petit Cours</h1>
        <p class="subtitle">Apprends à bien prononcer en français !</p>
      </div>

      <!-- Main Categories Grid -->
      <div class="categories-grid">
        <router-link
          v-for="category in categories"
          :key="category.id"
          :to="{ 
            name: (category.id === 'pronunciation' || category.id === 'stories') ? 'subcategories' : 'coming-soon',
            params: { mainCategory: category.id }
          }"
          class="category-card"
          :style="{ backgroundColor: category.color }"
        >
          <div class="category-icon">{{ category.icon }}</div>
          <h2 class="category-title">{{ category.title }}</h2>
          <p class="category-description">{{ category.description }}</p>
          <span v-if="category.id !== 'pronunciation' && category.id !== 'stories'" class="coming-soon-badge">
            Bientôt disponible
          </span>
        </router-link>
      </div>

      <!-- Footer -->
      <div class="footer">
        <p>Clique sur une catégorie pour commencer !</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { mainCategories } from '../data/exercises'

const categories = mainCategories
</script>

<style scoped>
.home-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #fef3c7 0%, #fce7f3 100%);
  padding: 1.5rem;
}

.content-wrapper {
  max-width: 1200px;
  margin: 0 auto;
}

.header {
  text-align: center;
  margin-bottom: 3rem;
  margin-top: 2rem;
}

.title {
  font-size: 3rem;
  font-weight: bold;
  color: #9333ea;
  margin-bottom: 1rem;
}

.subtitle {
  font-size: 1.25rem;
  color: #374151;
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.category-card {
  border-radius: 1rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  text-align: center;
  color: white;
  cursor: pointer;
  text-decoration: none;
  transition: transform 0.2s;
  height: 100%;
  position: relative;
}

.category-card:hover {
  transform: scale(1.05);
}

.category-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.category-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.category-description {
  opacity: 0.9;
}

.coming-soon-badge {
  display: inline-block;
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 1rem;
  font-size: 0.875rem;
  font-weight: 600;
}

.footer {
  text-align: center;
  color: #4b5563;
}

@media (max-width: 768px) {
  .title {
    font-size: 2rem;
  }

  .categories-grid {
    grid-template-columns: 1fr;
  }
}
</style>