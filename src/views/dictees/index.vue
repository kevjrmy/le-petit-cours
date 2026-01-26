<template>
  <DefaultLayout title="Dictées">
    <main id="dictees-index">
      <p class="intro-text">Choisis ton aventure et prépare ton cahier !</p>

      <div class="chapters-grid">
        <RouterLink 
          v-for="chapter in dicteeChapters" 
          :key="chapter.path" 
          :to="chapter.path"
          class="chapter-card"
        >
          <div class="card-status" v-if="chapter.isComingSoon">Bientôt</div>
          
          <div class="card-content">
            <span class="page-number">p. {{ chapter.page }}</span>
            <h3>{{ chapter.displayTitle }}</h3>
            <span :class="['difficulty-badge', chapter.level]">
              {{ chapter.levelLabel }}
            </span>
          </div>
          
          <div class="card-arrow">→</div>
        </RouterLink>
      </div>
    </main>
  </DefaultLayout>
</template>

<script setup>
import DefaultLayout from '@/layouts/DefaultLayout.vue'

const dicteeChapters = [
  { 
    path: '/dictees/une-journee-a-paris', 
    displayTitle: 'Une journée à Paris', 
    level: 'easy', 
    levelLabel: 'Facile', 
    page: 2,
    isComingSoon: false 
  },
  { 
    path: '/dictees/la-pierre-de-rosette', 
    displayTitle: 'La pierre de Rosette', 
    level: 'medium', 
    levelLabel: 'Intermédiaire', 
    page: 3,
    isComingSoon: true 
  },
  { 
    path: '/dictees/les-fleurs-du-mal', 
    displayTitle: 'Les fleurs du mal', 
    level: 'hard', 
    levelLabel: 'Difficile', 
    page: 4,
    isComingSoon: true 
  }
]
</script>

<style scoped>
#dictees-index {
  padding: 1.5rem;
  max-width: 700px;
  margin: 0 auto;
}

.intro-text {
  color: #666;
  margin-bottom: 2rem;
  font-style: italic;
}

.chapters-grid {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

.chapter-card {
  display: flex;
  align-items: center;
  padding: 1.5rem;
  background: white;
  border: 1px solid #eee;
  border-radius: 12px;
  text-decoration: none;
  color: inherit;
  position: relative;
  transition: all 0.2s ease;
  box-shadow: 0 2px 5px rgba(0,0,0,0.03);
}

.chapter-card:hover {
  transform: translateX(5px);
  border-color: #2c3e50;
}

.page-number {
  display: block;
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.8rem;
  color: #aaa;
  margin-bottom: 0.3rem;
}

.card-content {
  flex-grow: 1;
}

.card-content h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.15rem;
  color: #2c3e50;
}

.difficulty-badge {
  font-size: 0.75rem;
  padding: 0.2rem 0.6rem;
  border-radius: 4px;
  font-weight: bold;
  text-transform: uppercase;
}

.easy { background: #e8f5e9; color: #2e7d32; }
.medium { background: #fff3e0; color: #ef6c00; }
.hard { background: #ffebee; color: #c62828; }

.card-arrow {
  font-size: 1.5rem;
  color: #ccc;
  margin-left: 1rem;
}

/* Coming Soon Overlay */
.card-status {
  position: absolute;
  top: 10px;
  right: 10px;
  background: #f0f0f0;
  color: #999;
  font-size: 0.7rem;
  padding: 2px 8px;
  border-radius: 10px;
  font-weight: bold;
}

/* Visual cue for disabled links */
.chapter-card[href$="rosette"], 
.chapter-card[href$="renaissance"] {
  opacity: 0.7;
  cursor: not-allowed;
  pointer-events: none; /* Disables the link */
}
</style>