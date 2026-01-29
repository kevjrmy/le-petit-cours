<template>
  <DefaultLayout title="Prononciation">
    <main class="prononciation-index">
      <header class="chapter-intro">
        <p>Apprenez à maîtriser les sons de la langue française et à bien articuler.</p>
      </header>

      <div class="topics-grid">
        <div class="topic-card">
          <h3>Le son [o]</h3>
          <p>Différencier "o", "au" et "eau".</p>
          <RouterLink to="/prononciation/le-son-o" class="study-btn">Écouter et pratiquer</RouterLink>
        </div>

        <div class="topic-card">
          <h3>Les voyelles nasales</h3>
          <p>Maîtriser les sons "an", "in" et "on".</p>
          <RouterLink to="/prononciation/voyelles-nasales" class="study-btn">Écouter et pratiquer</RouterLink>
        </div>
      </div>
    </main>
  </DefaultLayout>
</template>

<script setup>
import DefaultLayout from '@/layouts/DefaultLayout.vue'
</script>

<style scoped>
.chapter-intro {
  margin-bottom: 2rem;
  text-align: center;
  font-family: var(--font-serif);
  font-style: italic;
  color: var(--clr-alt-text);
}

.topics-grid {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
}

.topic-card {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  border: 1px solid var(--clr-border);
  box-shadow: var(--box-shadow);
  display: flex;
  flex-direction: column;
}

.topic-card h3 {
  color: var(--clr-green);
  /* Couleur spécifique pour la prononciation */
  margin-bottom: 0.5rem;
}

.study-btn {
  margin-top: auto;
  padding-top: 1rem;
  color: var(--clr-primary);
  font-weight: bold;
  text-decoration: none;
  border-top: 1px dotted var(--clr-border);
}
</style>