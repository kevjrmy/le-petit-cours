<template>
  <DefaultLayout title="Exercices">
    <main id="exercices-index">
      <p class="intro-text">Pratique ton français en t'amusant avec ces trois jeux !</p>

      <div class="ex-list">
        <RouterLink to="/exercices/puzzle-de-mots" class="ex-card puzzle">
          <div class="ex-icon">🧩</div>
          <div class="ex-info">
            <h3>Le Puzzle de Mots</h3>
            <p>Remets les mots dans le bon ordre pour construire la phrase.</p>
            <span class="skill-tag">Syntaxe</span>
          </div>
        </RouterLink>

        <RouterLink to="/exercices/le-detective" class="ex-card detective">
          <div class="ex-icon">🔍</div>
          <div class="ex-info">
            <h3>Le Détective d'Erreurs</h3>
            <p>Trouve la faute cachée dans la phrase (orthographe ou grammaire).</p>
            <span class="skill-tag">Orthographe</span>
          </div>
        </RouterLink>

        <RouterLink to="/exercices/les-syllabes" class="ex-card syllabes">
          <div class="ex-icon">🗣️</div>
          <div class="ex-info">
            <h3>Le Maître des Syllabes</h3>
            <p>Découpe les mots en syllabes et prononce-les correctement.</p>
            <span class="skill-tag">Prononciation</span>
          </div>
        </RouterLink>
      </div>
    </main>
  </DefaultLayout>
</template>

<script setup>
import DefaultLayout from '@/layouts/DefaultLayout.vue'
</script>

<style scoped>
#exercices-index {
  padding: 1.5rem;
  max-width: 700px;
  margin: 0 auto;
}

.intro-text {
  color: #555;
  margin-bottom: 2rem;
  text-align: center;
}

.ex-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.ex-card {
  display: flex;
  align-items: center;
  padding: 1.5rem;
  background: white;
  border-radius: 16px;
  text-decoration: none;
  color: inherit;
  border: 2px solid transparent;
  box-shadow: 0 4px 10px rgba(0,0,0,0.05);
  transition: all 0.3s ease;
}

/* Different borders for different games */
.puzzle:hover { border-color: #ff9800; transform: translateY(-3px); }
.detective:hover { border-color: #2196f3; transform: translateY(-3px); }
.syllabes:hover { border-color: #e91e63; transform: translateY(-3px); }

.ex-icon {
  font-size: 2.5rem;
  margin-right: 1.5rem;
}

.ex-info h3 {
  margin: 0 0 0.4rem 0;
  font-size: 1.2rem;
}

.ex-info p {
  margin: 0 0 0.8rem 0;
  font-size: 0.95rem;
  color: #666;
  line-height: 1.4;
}

.skill-tag {
  font-size: 0.75rem;
  padding: 0.2rem 0.6rem;
  background: #f0f0f0;
  border-radius: 4px;
  font-weight: bold;
  color: #555;
}
</style>