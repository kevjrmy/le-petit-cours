<!-- view-meta: created=2026-08-02; updated=2026-08-02 -->
<template>
  <DefaultLayout title="Exercices">
    <main id="exercices-index">
      <p class="intro-text">Pratique ton français en t'amusant avec nos jeux pédagogiques !</p>

      <div class="ex-list">
        <RouterLink v-for="ex in exercises" :key="ex.path" :to="ex.path"
          :class="['ex-card', ex.category]">
          <div class="ex-info">
            <div class="title-line">
              <h3>{{ ex.title }}</h3>
              <span v-if="newExercisePaths.has(ex.path)" class="new-badge">Nouveau</span>
            </div>
            <p>Relève le défi pour progresser en {{ ex.tag.toLowerCase() }}.</p>
            <span class="skill-tag">{{ ex.tag }}</span>
          </div>
        </RouterLink>
      </div>
    </main>
  </DefaultLayout>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import { isNewView } from '@/utils/viewMeta'

const newExercisePaths = ref(new Set())

const exercises = [
  { path: '/exercices/emoji-francais', title: 'Emoji & Français', category: 'puzzle', tag: 'Vocabulaire' },
  { path: '/exercices/quel-groupe-verbe-appartient', title: 'Quel groupe ?', category: 'puzzle', tag: 'Conjugaison' },
  { path: '/exercices/conjugaison-present', title: 'Conjugaison au présent', category: 'puzzle', tag: 'Conjugaison' },
  { path: '/exercices/les-articles', title: 'Quel article ?', category: 'puzzle', tag: 'Grammaire' },
  { path: '/exercices/la-negation', title: 'Mets à la négative', category: 'puzzle', tag: 'Grammaire' },
  { path: '/exercices/le-futur-proche', title: 'Le futur proche', category: 'puzzle', tag: 'Grammaire' },
  { path: '/exercices/le-passe-compose', title: 'Le passé composé', category: 'puzzle', tag: 'Conjugaison' },
  { path: '/exercices/les-adverbes', title: 'Les adverbes', category: 'puzzle', tag: 'Grammaire' },
  { path: '/exercices/les-adjectifs-accord', title: "Accorde l'adjectif", category: 'puzzle', tag: 'Orthographe' },
  { path: '/exercices/phrases-en-desordre', title: 'Phrases en désordre', category: 'puzzle', tag: 'Syntaxe' },
]

onMounted(async () => {
  const entries = await Promise.all(
    exercises.map(async exercise => [exercise.path, await isNewView(exercise.path)])
  )
  newExercisePaths.value = new Set(entries.filter(([, isNew]) => isNew).map(([path]) => path))
})
</script>

<style scoped>
#exercices-index {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.intro-text {
  font-family: var(--font-serif);
  font-style: italic;
  color: var(--clr-ink-mid);
  text-align: center;
  line-height: 1.65;
}

.ex-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.ex-card {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  padding: 1rem 1.1rem;
  background: var(--clr-page);
  border: 1px solid var(--clr-border);
  border-radius: var(--radius);
  text-decoration: none;
  color: var(--clr-ink);
  transition: border-color 0.15s, background 0.15s, transform 0.15s;
}

.ex-card:hover {
  border-color: var(--clr-blue);
  background: var(--clr-blue-light);
  transform: translateX(4px);
}

.title-line {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.45rem;
  margin-bottom: 0.2rem;
}

.ex-info h3 {
  font-family: var(--font-serif);
  margin: 0;
  font-size: 1rem;
  color: var(--clr-ink);
}

.new-badge {
  display: inline-flex;
  align-items: center;
  padding: 0.12rem 0.45rem;
  border-radius: 99px;
  background: var(--clr-red);
  color: var(--clr-page);
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  line-height: 1.4;
  text-transform: uppercase;
}

.ex-info p {
  margin: 0 0 0.5rem;
  font-size: 0.85rem;
  color: var(--clr-ink-mid);
}

.skill-tag {
  display: inline-block;
  font-family: var(--font-sans);
  font-size: 0.65rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  padding: 0.15rem 0.5rem;
  background: var(--clr-blue-light);
  color: var(--clr-blue);
  border-radius: var(--radius-sm);
}
</style>
