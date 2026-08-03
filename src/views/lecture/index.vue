<!-- view-meta: created=2026-08-02; updated=2026-08-03 -->
<template>
  <AltLayout title="Lecture">
    <main>
      <p class="intro">
        Lisez de courts textes authentiques et entraînez votre compréhension.
        La traduction en espagnol est disponible sous chaque texte.
      </p>

      <nav class="lesson-nav" aria-label="Textes disponibles">
        <RouterLink
          v-for="l in texts"
          :key="l.path"
          :to="l.path"
          class="lesson-row"
        >
          <span class="title-wrap">
            <span class="lesson-title">
              <em v-if="l.isBook">{{ l.title }}</em>
              <template v-else>{{ l.title }}</template>
              <span v-if="l.subtitle" class="subtitle"> {{ l.subtitle }}</span>
              <span class="author">{{ l.author }}</span>
            </span>
            <span v-if="newTextPaths.has(l.path)" class="new-badge">Nouveau</span>
          </span>
          <span class="arrow" aria-hidden="true">→</span>
        </RouterLink>
      </nav>
    </main>
  </AltLayout>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import AltLayout from '@/layouts/AltLayout.vue'
import { isNewView } from '@/utils/viewMeta'

const newTextPaths = ref(new Set())

const texts = [
  { path: '/lecture/le-lion-et-le-rat', title: 'Le Lion et le Rat', author: 'Jean de La Fontaine · Fables', isBook: true },
  { path: '/lecture/le-petit-prince', title: 'Le Petit Prince', subtitle: '— Chapitre I', author: 'Antoine de Saint-Exupéry', isBook: true },
  { path: '/lecture/entretien-d-embauche', title: "Un entretien d'embauche", author: 'Dialogue · Suisse romande', isBook: false },
  { path: '/lecture/le-comte-de-monte-cristo', title: 'Le Comte de Monte-Cristo', subtitle: '— Chapitre I', author: 'Alexandre Dumas', isBook: true },
  { path: '/lecture/le-tour-du-monde', title: 'Le Tour du monde en 80 jours', subtitle: '— Chapitre I', author: 'Jules Verne', isBook: true },
]

onMounted(async () => {
  const entries = await Promise.all(
    texts.map(async text => [text.path, await isNewView(text.path)])
  )
  newTextPaths.value = new Set(entries.filter(([, isNew]) => isNew).map(([path]) => path))
})
</script>

<style scoped>
.intro {
  font-family: var(--font-serif);
  font-style: italic;
  color: var(--clr-ink-mid);
  font-size: 1rem;
  line-height: 1.75;
  padding-bottom: 1.25rem;
  border-bottom: 1px solid var(--clr-border-soft);
}

.lesson-nav {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.lesson-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.9rem 1.1rem;
  background: var(--clr-page);
  border: 1px solid var(--clr-border);
  border-radius: var(--radius);
  color: var(--clr-ink);
  text-decoration: none;
  transition: border-color 0.15s, color 0.15s, background 0.15s;
}

.lesson-row:hover {
  border-color: var(--clr-blue);
  color: var(--clr-blue-dark);
  background: var(--clr-blue-light);
}

.title-wrap {
  display: flex;
  align-items: center;
  gap: 0.65rem;
}

.lesson-title {
  font-family: var(--font-serif);
  font-size: 0.97rem;
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.subtitle {
  font-style: normal;
}

.author {
  font-family: var(--font-sans);
  font-style: normal;
  font-size: 0.72rem;
  color: var(--clr-ink-soft);
}

.new-badge {
  display: inline-flex;
  align-items: center;
  padding: 0.12rem 0.45rem;
  border-radius: 99px;
  background: var(--clr-red);
  color: var(--clr-page);
  font-family: var(--font-sans);
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  line-height: 1.4;
  text-transform: uppercase;
}

.arrow {
  color: var(--clr-ink-soft);
  font-size: 0.9rem;
  flex-shrink: 0;
  margin-left: 0.75rem;
  transition: transform 0.15s, color 0.15s;
}

.lesson-row:hover .arrow {
  transform: translateX(3px);
  color: var(--clr-blue);
}
</style>
