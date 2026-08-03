<!-- view-meta: created=2026-08-02; updated=2026-08-03 -->
<template>
  <AltLayout title="Grammaire">
    <main>
      <p class="intro">
        Étudiez les règles essentielles de la grammaire française : conjugaison,
        accord et structure des phrases.
      </p>

      <nav class="lesson-nav" aria-label="Leçons disponibles">
        <RouterLink
          v-for="l in lessons"
          :key="l.path"
          :to="l.path"
          class="lesson-row"
        >
          <span class="title-wrap">
            <span class="lesson-title" v-if="l.titleHtml" v-html="l.titleHtml"></span>
            <span class="lesson-title" v-else>{{ l.title }}</span>
            <span v-if="newLessonPaths.has(l.path)" class="new-badge">Nouveau</span>
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

const newLessonPaths = ref(new Set())

const lessons = [
  { path: '/grammaire/les-articles', title: 'Les articles' },
  { path: '/grammaire/verbe-1er-groupe', title: 'Les verbes du 1er groupe', titleHtml: 'Les verbes du 1<sup>er</sup> groupe' },
  { path: '/grammaire/verbe-2eme-groupe', title: 'Les verbes du 2ème groupe', titleHtml: 'Les verbes du 2<sup>ème</sup> groupe' },
  { path: '/grammaire/verbe-3eme-groupe', title: 'Les verbes du 3ème groupe', titleHtml: 'Les verbes du 3<sup>ème</sup> groupe' },
  { path: '/grammaire/la-negation', title: 'La négation' },
  { path: '/grammaire/le-futur-proche', title: 'Le futur proche' },
  { path: '/grammaire/le-passe-compose', title: 'Le passé composé' },
  { path: '/grammaire/les-verbes-pronominaux', title: 'Les verbes pronominaux' },
  { path: '/grammaire/les-adverbes', title: 'Les adverbes' },
]

onMounted(async () => {
  const entries = await Promise.all(
    lessons.map(async lesson => [lesson.path, await isNewView(lesson.path)])
  )
  newLessonPaths.value = new Set(entries.filter(([, isNew]) => isNew).map(([path]) => path))
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
  gap: 0.55rem;
}

.lesson-title {
  font-family: var(--font-serif);
  font-size: 0.97rem;
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
  transition: transform 0.15s, color 0.15s;
}

.lesson-row:hover .arrow {
  transform: translateX(3px);
  color: var(--clr-blue);
}
</style>
