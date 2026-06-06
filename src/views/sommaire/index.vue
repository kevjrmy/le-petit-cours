<template>
  <DefaultLayout title="Sommaire">
    <main id="home">
      <p class="tagline">Apprendre le français, page après page.</p>

      <div class="book-toc">
        <details v-for="chapitre in bookStructure" :key="chapitre.chapter"
          v-show="chapitre.pages.some(p => p.path !== '/')" open class="chapter-section">
          <summary class="chapter-title">
            {{ chapitre.chapter }}
          </summary>

          <ul class="toc-list">
            <li v-for="page in chapitre.pages" :key="page.path" class="toc-item">
              <template v-if="page.path !== '/'">
                <RouterLink :to="page.path" class="title">
                  {{ page.title }}
                </RouterLink>
                <span class="dots"></span>
                <span class="page-num">{{ getPageNumber(page.path) }}</span>
              </template>
            </li>
          </ul>
        </details>
      </div>
    </main>
  </DefaultLayout>
</template>

<script setup>
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import { bookStructure, flattenedPages } from '@/router/book-structure'

// Fonction pour retrouver l'index (numéro de page) basé sur le chemin
const getPageNumber = (path) => {
  const index = flattenedPages.findIndex(p => p.path === path)
  return index !== -1 ? index : ''
}
</script>

<style scoped>
#home > * {
  animation: fadeIn 0.8s ease-out forwards;
  opacity: 0;
}

#home .tagline { animation-delay: 0.1s; }
#home .book-toc { animation-delay: 0.3s; }

.tagline {
  font-style: italic;
  font-size: 1.1rem;
  color: var(--clr-alt-text);
  display: inline-block;
  position: relative;
  padding: 1rem;
  width: 100%;
  text-align: center;
}

.tagline::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 25%;
  right: 25%;
  height: 1px;
  background: var(--clr-border);
  opacity: 0.5;
}

.book-toc {
  margin: 0 auto;
  padding: 1rem;
}

.chapter-section {
  margin-bottom: 2rem;
}

.chapter-title {
  font-size: 1.4rem;
  font-weight: bold;
  cursor: pointer;
  list-style: none;
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.chapter-title::-webkit-details-marker {
  display: none;
}

.toc-list {
  list-style: none;
  padding: 0 0 0 1rem;
  margin: 0;
}

.toc-item {
  display: flex;
  align-items: baseline;
  margin-bottom: 0.8rem;
  font-size: 1.05rem;
}

.title {
  transition: color 0.2s;
}

.title:hover {
  color: var(--clr-primary);
}

.dots {
  flex: 1;
  border-bottom: 2px dotted var(--clr-lightgrey);
  margin: 0 0.5rem;
  position: relative;
  top: -4px;
}

.page-num {
  font-family: 'Courier New', Courier, monospace;
  font-weight: bold;
  min-width: 25px;
  text-align: right;
}

/* Animations */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>