<template>
  <DefaultLayout title="Exercices">
    <main id="exercices-index">
      <p class="intro-text">Pratique ton français en t'amusant avec nos jeux pédagogiques !</p>

      <div class="ex-list">
        <RouterLink v-for="ex in exercises" :key="ex.path" :to="ex.path"
          :class="['ex-card', ex.category]">
          <div class="ex-info">
            <h3>{{ ex.title }}</h3>
            <p>Relève le défi pour progresser en {{ ex.tag.toLowerCase() }}.</p>
            <span class="skill-tag">{{ ex.tag }}</span>
          </div>
        </RouterLink>
      </div>
    </main>
  </DefaultLayout>
</template>

<script setup>
import DefaultLayout from '@/layouts/DefaultLayout.vue'

const exercises = [
  { path: '/exercices/emoji-francais', title: 'Emoji & Français', category: 'puzzle', tag: 'Vocabulaire' },
  { path: '/exercices/quel-groupe-verbe-appartient', title: 'Quel groupe ?', category: 'puzzle', tag: 'Conjugaison' },
  { path: '/exercices/conjugaison-present', title: 'Conjugaison au présent', category: 'puzzle', tag: 'Conjugaison' },
  { path: '/exercices/les-articles', title: 'Quel article ?', category: 'puzzle', tag: 'Grammaire' },
  { path: '/exercices/la-negation', title: 'Mets à la négative', category: 'puzzle', tag: 'Grammaire' },
  { path: '/exercices/le-futur-proche', title: 'Le futur proche', category: 'puzzle', tag: 'Grammaire' },
  { path: '/exercices/les-adverbes', title: 'Les adverbes', category: 'puzzle', tag: 'Grammaire' },
  { path: '/exercices/phrases-en-desordre', title: 'Phrases en désordre', category: 'puzzle', tag: 'Syntaxe' },
]
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

.ex-info h3 {
  font-family: var(--font-serif);
  margin: 0 0 0.2rem;
  font-size: 1rem;
  color: var(--clr-ink);
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
