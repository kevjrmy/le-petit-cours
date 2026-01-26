<template>
  <DefaultLayout title="Sommaire">
    <main id="home">
      <div class="book-toc">
        <details v-for="chapitre in bookStructure" :key="chapitre.chapter"
          v-show="chapitre.pages.some(p => p.path !== '/')" open class="chapter-section">
          <summary class="chapter-title">
            {{ chapitre.chapter }}
            <span class="line"></span>
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
.book-toc {
  margin: 0 auto;
  padding: 1rem;
}

.chapter-section {
  margin-bottom: 2rem;
}

.chapter-title {
  display: flex;
  align-items: center;
  font-size: 1.4rem;
  font-weight: 800;
  color: var(--clr-dark);
  cursor: pointer;
  list-style: none;
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.chapter-title::-webkit-details-marker {
  display: none;
}

.chapter-title .line {
  flex: 1;
  height: 2px;
  background: var(--clr-dark);
  margin-left: 1rem;
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
  text-decoration: none;
  color: #333;
  transition: color 0.2s;
}

.title:hover {
  color: var(--clr-primary);
}

.dots {
  flex: 1;
  border-bottom: 2px dotted #ccc;
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
</style>