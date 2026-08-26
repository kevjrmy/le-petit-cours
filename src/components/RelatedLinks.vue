<template>
  <nav v-if="items.length" class="related" aria-labelledby="related-heading">
    <h2 id="related-heading" class="related-heading">Pour aller plus loin</h2>

    <ul class="related-list">
      <li v-for="item in items" :key="item.path">
        <RouterLink class="related-link" :to="item.path">
          <ChapterIcon :name="item.icon" size="1rem" class="related-icon" />
          <span class="related-body">
            <span class="related-chapter">{{ item.chapter }}</span>
            <span class="related-title">
              <span v-if="item.emoji" class="related-emoji" aria-hidden="true">{{ item.emoji }}</span>{{ item.title }}
            </span>
          </span>
          <span class="related-arrow" aria-hidden="true">→</span>
        </RouterLink>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import ChapterIcon from '@/components/ChapterIcon.vue'
import { relatedFor } from '@/data/navigation'

/**
 * "Pour aller plus loin" — the cross-links at the foot of a lesson.
 *
 * Reads the current route, so a page only has to drop `<RelatedLinks />` in
 * before `</main>`; the targets live in `relatedPages` in navigation.js.
 * Renders nothing when a page has no entry.
 */
const route = useRoute()
const items = computed(() => relatedFor(route.path))
</script>

<style scoped>
.related {
  margin-top: 1.5rem;
  padding-top: 1.25rem;
  border-top: 1px solid var(--border-soft);
}

.related-heading {
  margin: 0 0 0.75rem;
  font-family: var(--font-sans);
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--text-3);
}

/* Two columns on the sheet: four links land as a tidy 2×2 instead of the
   3 + 1 an auto-fit grid produces at the reading width. */
.related-list {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.5rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.related-link {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  height: 100%;
  padding: 0.6rem 0.75rem;
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  background: var(--surface-1);
  color: var(--text-1);
  text-decoration: none;
  transition: border-color 0.15s, background 0.15s;
}

.related-link:hover {
  border-color: var(--accent);
  background: var(--accent-subtle);
}

.related-icon {
  flex: none;
  color: var(--accent);
}

.related-body {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  min-width: 0;
}

.related-chapter {
  font-family: var(--font-sans);
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-3);
}

.related-title {
  font-family: var(--font-serif);
  font-size: 0.95rem;
  line-height: 1.3;
  color: var(--text-1);
}

.related-emoji { margin-right: 0.35rem; }

.related-arrow {
  margin-left: auto;
  padding-left: 0.5rem;
  color: var(--text-3);
}

.related-link:hover .related-arrow { color: var(--accent); }

@media (max-width: 560px) {
  .related-list { grid-template-columns: 1fr; }
}

</style>
