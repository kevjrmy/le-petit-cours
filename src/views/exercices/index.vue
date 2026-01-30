<template>
  <DefaultLayout title="Exercices">
    <main id="exercices-index">
      <p class="intro-text">Pratique ton français en t'amusant avec nos jeux pédagogiques !</p>

      <div class="ex-list">
        <RouterLink v-for="page in exercicesPages" :key="page.path" :to="page.path"
          :class="['ex-card', getCategoryClass(page.path)]">
          <div class="ex-icon">{{ getIcon(page.path) }}</div>
          <div class="ex-info">
            <h3>{{ page.title }}</h3>
            <p>Relève le défi pour progresser en {{ getTag(page.path).toLowerCase() }}.</p>
            <span class="skill-tag">{{ getTag(page.path) }}</span>
          </div>
        </RouterLink>
      </div>
    </main>
  </DefaultLayout>
</template>

<script setup>
import { computed } from 'vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import { bookStructure } from '@/router/book-structure'

// On récupère uniquement les pages du chapitre Exercices (en excluant l'index)
const exercicesPages = computed(() => {
  const chapter = bookStructure.find(c => c.folder === 'exercices')
  return chapter ? chapter.pages.filter(p => p.path !== '/exercices') : []
})

// Logique pour déterminer le style et l'icône selon le chemin
const getCategoryClass = (path) => {
  if (path.includes('puzzle')) return 'puzzle'
  if (path.includes('detective')) return 'detective'
  return 'syllabes'
}

const getIcon = (path) => {
  if (path.includes('puzzle')) return '🧩'
  if (path.includes('detective')) return '🔍'
  return '🗣️'
}

const getTag = (path) => {
  if (path.includes('puzzle')) return 'Syntaxe'
  if (path.includes('detective')) return 'Orthographe'
  return 'Prononciation'
}
</script>

<style scoped>
#exercices-index {
  padding: 1rem;
  max-width: 700px;
  margin: 0 auto;
}

.intro-text {
  font-family: var(--font-serif);
  font-style: italic;
  color: var(--clr-alt-text);
  margin-bottom: 2rem;
  text-align: center;
}

.ex-list {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

.ex-card {
  display: flex;
  align-items: center;
  padding: 1.2rem;
  background: white;
  border-radius: 12px;
  text-decoration: none;
  color: inherit;
  border: 1px solid var(--clr-border);
  box-shadow: var(--box-shadow);
  transition: all 0.2s ease;
}

.ex-info h3 {
  font-family: var(--font-serif);
  margin: 0 0 0.3rem 0;
  font-size: 1.2rem;
  color: var(--clr-text);
}

.ex-info p {
  margin: 0 0 0.8rem 0;
  font-size: 0.9rem;
  color: var(--clr-alt-text);
}

.ex-icon {
  font-size: 2.5rem;
  margin-right: 1.5rem;
}

/* Interaction subtile au survol */
.ex-card:hover {
  transform: translateX(8px);
}

.puzzle:hover {
  border-color: var(--clr-primary);
}

.detective:hover {
  border-color: var(--clr-red);
}

.syllabes:hover {
  border-color: var(--clr-green);
}

.skill-tag {
  font-family: var(--font-sans);
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 0.2rem 0.6rem;
  background: var(--clr-alt-background);
  border-radius: 4px;
  font-weight: bold;
}
</style>