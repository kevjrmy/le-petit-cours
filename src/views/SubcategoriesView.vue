<template>
  <div class="subcategories-container">
    <div class="content-wrapper">
      <!-- Back Button -->
      <router-link to="/" class="back-button">
        ← Retour
      </router-link>

      <!-- Header -->
      <div class="header">
        <div class="main-category-icon">{{ mainCategory?.icon }}</div>
        <h1 class="title">{{ mainCategory?.title }}</h1>
        <p class="description">{{ mainCategory?.description }}</p>
      </div>

      <!-- Subcategories Grid -->
      <div class="subcategories-grid">
        <router-link
          v-for="subcategory in subcategories"
          :key="subcategory.id"
          :to="getSubcategoryRoute(subcategory.id)"
          class="subcategory-card"
          :style="{ backgroundColor: subcategory.color }"
        >
          <div class="subcategory-icon">{{ subcategory.icon }}</div>
          <h2 class="subcategory-title">{{ subcategory.title }}</h2>
          <p class="subcategory-description">{{ subcategory.description }}</p>
          <span v-if="subcategory.level" class="level-badge">
            {{ subcategory.level }}
          </span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { getMainCategoryById, getSubcategoriesByMainCategory } from '../data/exercises'

const route = useRoute()
const mainCategoryId = computed(() => route.params.mainCategory)

const mainCategory = computed(() => getMainCategoryById(mainCategoryId.value))
const subcategories = computed(() => getSubcategoriesByMainCategory(mainCategoryId.value))

// Determine which route to use based on main category
const getSubcategoryRoute = (subcategoryId) => {
  if (mainCategoryId.value === 'stories') {
    return { name: 'stories-list', query: { category: subcategoryId } }
  } else {
    return { name: 'exercises', query: { category: subcategoryId } }
  }
}
</script>

<style scoped>
.subcategories-container {
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
  margin-bottom: 3rem;
}

.main-category-icon {
  font-size: 5rem;
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

.subcategories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.subcategory-card {
  border-radius: 1rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  text-align: center;
  color: white;
  cursor: pointer;
  text-decoration: none;
  transition: transform 0.2s;
}

.subcategory-card:hover {
  transform: scale(1.05);
}

.subcategory-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.subcategory-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.subcategory-description {
  opacity: 0.9;
}

.level-badge {
  display: inline-block;
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 1rem;
  font-size: 0.875rem;
  font-weight: 600;
}

@media (max-width: 768px) {
  .title {
    font-size: 2rem;
  }

  .subcategories-grid {
    grid-template-columns: 1fr;
  }
}
</style>