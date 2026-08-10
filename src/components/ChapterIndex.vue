<template>
  <AltLayout :title="chapter.title" :subtitle="chapter.blurb">
    <main class="chapter-index">
      <nav class="lesson-list" :aria-label="`Contenu — ${chapter.title}`">
        <component
          v-for="lesson in chapter.lessons"
          :is="lesson.soon ? 'div' : RouterLink"
          :key="lesson.path"
          :to="lesson.soon ? undefined : lesson.path"
          class="lesson-row"
          :class="{ soon: lesson.soon }"
          :aria-disabled="lesson.soon ? 'true' : undefined"
        >
          <span class="row-body">
            <span class="row-head">
              <span v-if="lesson.emoji" class="row-emoji" aria-hidden="true">{{ lesson.emoji }}</span>
              <span v-if="lesson.titleHtml" class="row-title" v-html="lesson.titleHtml"></span>
              <span v-else class="row-title">{{ lesson.title }}</span>
              <span v-if="freshPaths.has(lesson.path)" class="new-badge">Nouveau</span>
              <span v-if="lesson.soon" class="soon-badge">Bientôt</span>
            </span>
            <span v-if="lesson.subtitle" class="row-subtitle">{{ lesson.subtitle }}</span>
          </span>

          <span v-if="lesson.tag" class="row-tag">{{ lesson.tag }}</span>
          <span v-if="!lesson.soon" class="row-arrow" aria-hidden="true">→</span>
        </component>
      </nav>
    </main>
  </AltLayout>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import AltLayout from '@/layouts/AltLayout.vue'
import { chapters, publishedLessons } from '@/data/navigation'
import { isNewView } from '@/utils/viewMeta'

/**
 * Renders any chapter's landing page straight from `src/data/navigation.js`.
 * Every `views/{chapter}/index.vue` is a one-line wrapper around this.
 */
const props = defineProps({
  slug: { type: String, required: true },
})

const chapter = computed(() => {
  const found = chapters.find(item => item.slug === props.slug)
  if (!found) throw new Error(`Unknown chapter slug "${props.slug}" — add it to src/data/navigation.js`)
  return found
})

const freshPaths = ref(new Set())

onMounted(async () => {
  const entries = await Promise.all(
    publishedLessons(chapter.value).map(
      async lesson => [lesson.path, await isNewView(lesson.path)]
    )
  )
  freshPaths.value = new Set(entries.filter(([, fresh]) => fresh).map(([path]) => path))
})
</script>

<style scoped>
.lesson-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.lesson-row {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  padding: 0.85rem 1.1rem;
  background: var(--surface-1);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  color: var(--text-1);
  transition: border-color var(--dur-fast) ease, background var(--dur-fast) ease,
              box-shadow var(--dur-fast) ease;
}

.lesson-row:not(.soon):hover {
  border-color: var(--accent-line);
  background: var(--accent-subtle);
  box-shadow: var(--shadow-sm);
  color: var(--text-1);
}

.lesson-row.soon {
  opacity: 0.55;
  cursor: default;
  background: var(--surface-2);
}

.row-body {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.row-head {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.row-emoji { font-size: 1rem; line-height: 1; }

.row-title {
  font-family: var(--font-serif);
  font-size: 0.99rem;
  color: var(--text-1);
}

.row-subtitle {
  font-size: 0.8rem;
  line-height: 1.5;
  color: var(--text-3);
}

.soon-badge {
  display: inline-flex;
  align-items: center;
  padding: 0.12rem 0.45rem;
  border-radius: var(--radius-pill);
  background: var(--surface-3);
  color: var(--text-3);
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.row-tag {
  flex-shrink: 0;
  padding: 0.15rem 0.6rem;
  border-radius: var(--radius-pill);
  background: var(--accent-soft);
  border: 1px solid var(--accent-line);
  color: var(--accent-text);
  font-size: 0.7rem;
  font-weight: 600;
  white-space: nowrap;
}

.row-arrow {
  flex-shrink: 0;
  color: var(--text-3);
  font-size: 0.9rem;
  transition: transform var(--dur-fast) var(--ease), color var(--dur-fast) ease;
}

.lesson-row:hover .row-arrow {
  transform: translateX(3px);
  color: var(--accent);
}

@media (max-width: 794px) {
  .row-tag { display: none; }
}
</style>
