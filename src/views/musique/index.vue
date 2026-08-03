<!-- view-meta: created=2026-08-02; updated=2026-08-02 -->
<template>
  <DefaultLayout title="Musique">
    <main id="musique-index">
      <p class="intro-text">Découvre les grandes chansons françaises et améliore ton oreille musicale !</p>

      <div class="chapters-grid">
        <RouterLink 
          v-for="song in songs" 
          :key="song.path" 
          :to="song.path"
          class="song-card"
        >
          <div class="card-icon">🎵</div>
          
          <div class="card-content">
            <span class="page-number">p. {{ song.page }}</span>
            <h3>{{ song.title }}</h3>
            <p class="artist">{{ song.artist }}</p>
            <span :class="['difficulty-badge', song.level]">
              {{ song.levelLabel }}
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

const songs = [
  { 
    path: '/musique/la-vie-en-rose', 
    title: 'La vie en rose', 
    artist: 'Édith Piaf',
    level: 'easy', 
    levelLabel: 'Facile', 
    page: 1
  },
  { 
    path: '/musique/non-je-ne-regrette-rien', 
    title: 'Non, je ne regrette rien', 
    artist: 'Édith Piaf',
    level: 'medium', 
    levelLabel: 'Intermédiaire', 
    page: 2
  },
  { 
    path: '/musique/le-pont-mirabeau', 
    title: 'Le pont Mirabeau', 
    artist: 'Guillaume Apollinaire',
    level: 'medium', 
    levelLabel: 'Intermédiaire', 
    page: 3
  }
]
</script>

<style scoped>
#musique-index {
  padding: 1.5rem;
  max-width: 700px;
  margin: 0 auto;
}

.intro-text {
  color: var(--clr-alt-text);
  margin-bottom: 2rem;
  font-style: italic;
  text-align: center;
}

.chapters-grid {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

.song-card {
  display: flex;
  align-items: center;
  padding: 1.5rem;
  background: white;
  border: 1px solid var(--clr-border);
  border-radius: 12px;
  text-decoration: none;
  color: inherit;
  position: relative;
  transition: all 0.2s ease;
  box-shadow: var(--box-shadow);
}

.song-card:hover {
  transform: translateX(5px);
  border-color: var(--clr-primary);
}

.card-icon {
  font-size: 2rem;
  margin-right: 1rem;
}

.page-number {
  display: block;
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.8rem;
  color: var(--clr-alt-text);
  margin-bottom: 0.3rem;
}

.card-content {
  flex-grow: 1;
}

.card-content h3 {
  margin: 0 0 0.2rem 0;
  font-size: 1.15rem;
  color: var(--clr-text);
}

.artist {
  margin: 0 0 0.5rem 0;
  font-size: 0.9rem;
  color: var(--clr-alt-text);
  font-style: italic;
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
  color: var(--clr-border);
  margin-left: 1rem;
}
</style>