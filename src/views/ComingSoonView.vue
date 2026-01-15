<template>
  <div class="coming-soon-container">
    <div class="content-wrapper">
      <!-- Back Button -->
      <router-link to="/" class="back-button">
        ← Retour
      </router-link>

      <!-- Content -->
      <div class="content">
        <div class="icon">{{ mainCategory?.icon }}</div>
        <h1 class="title">{{ mainCategory?.title }}</h1>
        <div class="message">
          <p class="main-message">🚧 Bientôt disponible ! 🚧</p>
          <p class="sub-message">
            Cette section est en cours de préparation.<br>
            Reviens bientôt pour découvrir de nouveaux exercices !
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { getMainCategoryById } from '../data/exercises'

const route = useRoute()
const mainCategoryId = computed(() => route.params.mainCategory)
const mainCategory = computed(() => getMainCategoryById(mainCategoryId.value))
</script>

<style scoped>
.coming-soon-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #fef3c7 0%, #fce7f3 100%);
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
  margin-bottom: 2rem;
  font-size: 1.125rem;
}

.back-button:hover {
  color: #7e22ce;
}

.content {
  background-color: white;
  border-radius: 1.5rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  padding: 3rem;
  text-align: center;
}

.icon {
  font-size: 6rem;
  margin-bottom: 1.5rem;
}

.title {
  font-size: 2.5rem;
  font-weight: bold;
  color: #9333ea;
  margin-bottom: 2rem;
}

.message {
  margin-top: 2rem;
}

.main-message {
  font-size: 1.75rem;
  color: #f59e0b;
  font-weight: bold;
  margin-bottom: 1.5rem;
}

.sub-message {
  font-size: 1.125rem;
  color: #6b7280;
  line-height: 1.8;
}

@media (max-width: 768px) {
  .content {
    padding: 2rem 1.5rem;
  }

  .icon {
    font-size: 4rem;
  }

  .title {
    font-size: 2rem;
  }

  .main-message {
    font-size: 1.5rem;
  }
}
</style>