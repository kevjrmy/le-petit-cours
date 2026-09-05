<template>
  <header class="page-header">
    <p v-if="eyebrow" class="eyebrow">{{ eyebrow }}</p>
    <h1 class="page-heading">{{ title }}</h1>
    <p v-if="subtitle" class="page-subtitle">{{ subtitle }}</p>
    <div class="tricolore" aria-hidden="true">
      <span class="band band-blue"></span>
      <span class="band band-white"></span>
      <span class="band band-red"></span>
    </div>
  </header>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { findLesson } from '@/data/navigation'

/**
 * The title block at the top of the reading sheet. The chapter name is picked
 * up automatically from the navigation manifest and shown as an eyebrow, so a
 * lesson only ever has to declare its own title.
 */
const props = defineProps({
  title: { type: String, required: true },
  subtitle: { type: String, default: '' },
})

const route = useRoute()

const eyebrow = computed(() => {
  const hit = findLesson(route.path)
  if (!hit) return ''
  /* Don't repeat the chapter name when it *is* the title. */
  return hit.chapter.title === props.title ? '' : hit.chapter.title
})
</script>

<style scoped>
.page-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.3rem;
  text-align: center;
  padding-top: 0.5rem;
}

.eyebrow {
  font-family: var(--font-sans);
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--text-3);
}

.page-heading {
  font-family: var(--font-serif);
  font-size: 2rem;
  line-height: 1.2;
  color: var(--text-heading);
  text-align: center;
}

.page-subtitle {
  max-width: 52ch;
  font-family: var(--font-serif);
  font-style: italic;
  font-size: 0.98rem;
  color: var(--text-2);
}

/* Tricolore rule — the one place the flag shows up literally. */
.tricolore {
  display: flex;
  width: 108px;
  height: 3px;
  margin-top: 0.65rem;
  border-radius: var(--radius-pill);
  overflow: hidden;
  box-shadow: 0 0 0 1px var(--border-soft);
}

.band { flex: 1; }
.band-blue  { background: var(--blue-700); }
.band-white { background: var(--white); box-shadow: inset 0 0 0 1px var(--border-soft); }
.band-red   { background: var(--red-500); }

@media (max-width: 52rem) {
  .page-heading { font-size: 1.6rem; }
}
</style>
