<template>
  <DefaultLayout title="Vocabulaire Médical">
    <main id="vocab-index">
      <p class="intro-text">
        Apprends le vocabulaire médical essentiel en français. Catégories thématiques
        pour t'aider à communiquer dans un contexte professionnel.
      </p>

      <div class="chapters-grid">
        <RouterLink
          to="/vocabulaire/flashcards"
          class="chapter-card main-card"
        >
          <div class="card-content">
            <span class="card-icon">🃏</span>
            <h3>Cartes Mémoire</h3>
            <p>Révise les termes médicaux avec des flashcards interactives.</p>
            <span class="difficulty-badge easy">A2</span>
          </div>
          <div class="card-arrow">→</div>
        </RouterLink>
      </div>

      <div class="categories-preview">
        <h2>Catégories disponibles</h2>
        <div class="preview-grid">
          <div v-for="cat in categories" :key="cat.name" class="preview-card">
            <span class="preview-icon">{{ cat.icon }}</span>
            <h4>{{ cat.name }}</h4>
            <p>{{ cat.count }} termes</p>
          </div>
        </div>
      </div>
    </main>
  </DefaultLayout>
</template>

<script setup>
import DefaultLayout from '@/layouts/DefaultLayout.vue'

const categories = [
  { name: 'Le Corps Humain', icon: '🧍', count: 8 },
  { name: 'Les Symptômes', icon: '🤒', count: 10 },
  { name: 'Les Verbes Médicaux', icon: '💊', count: 8 },
  { name: 'Les Médicaments', icon: '💉', count: 6 },
  { name: 'À l\'Hôpital', icon: '🏥', count: 6 }
]
</script>

<style scoped>
#vocab-index {
  padding: 1.5rem;
  max-width: 700px;
  margin: 0 auto;
}

.intro-text {
  font-family: var(--font-serif);
  font-style: italic;
  color: var(--clr-ink-muted);
  margin-bottom: 2rem;
  text-align: center;
  line-height: 1.6;
}

.chapters-grid {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  margin-bottom: 2.5rem;
}

.chapter-card {
  display: flex;
  align-items: center;
  padding: 1.5rem;
  background: white;
  border: 1px solid var(--clr-border);
  border-radius: 12px;
  text-decoration: none;
  color: inherit;
  transition: all 0.2s ease;
  box-shadow: 0 2px 5px rgba(0,0,0,0.03);
}

.chapter-card:hover {
  transform: translateX(5px);
}

.main-card {
  border-color: #bbdefb;
  background: #e3f2fd;
}

.main-card:hover {
  border-color: #42a5f5;
}

.card-content {
  flex-grow: 1;
}

.card-icon {
  font-size: 2rem;
  display: block;
  margin-bottom: 0.5rem;
}

.card-content h3 {
  margin: 0 0 0.3rem 0;
  font-size: 1.2rem;
  color: var(--clr-navy);
  font-family: var(--font-serif);
}

.card-content p {
  margin: 0 0 0.6rem 0;
  font-size: 0.9rem;
  color: var(--clr-ink-muted);
}

.difficulty-badge {
  font-size: 0.75rem;
  padding: 0.2rem 0.6rem;
  border-radius: 4px;
  font-weight: bold;
  text-transform: uppercase;
}

.easy {
  background: #e8f5e9;
  color: #2e7d32;
}

.card-arrow {
  font-size: 1.5rem;
  color: var(--clr-ink-soft);
  margin-left: 1rem;
}

.categories-preview h2 {
  font-family: var(--font-serif);
  font-size: 1.2rem;
  color: var(--clr-navy);
  text-align: center;
  margin-bottom: 1rem;
}

.preview-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 0.8rem;
}

.preview-card {
  background: white;
  border: 1px solid var(--clr-border);
  border-radius: 12px;
  padding: 1rem;
  text-align: center;
  transition: transform 0.15s;
}

.preview-card:hover {
  transform: translateY(-2px);
}

.preview-icon {
  font-size: 1.5rem;
  display: block;
  margin-bottom: 0.4rem;
}

.preview-card h4 {
  font-size: 0.85rem;
  color: var(--clr-navy);
  margin-bottom: 0.2rem;
}

.preview-card p {
  font-size: 0.8rem;
  color: var(--clr-ink-soft);
}
</style>
