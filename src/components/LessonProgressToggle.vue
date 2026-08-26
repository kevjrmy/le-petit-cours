<template>
  <div v-if="lesson" class="progress-toggle">
    <button
      type="button"
      class="toggle-button"
      :class="{ 'is-done': done }"
      :aria-pressed="done ? 'true' : 'false'"
      @click="toggle(route.path)"
    >
      <span class="toggle-box" aria-hidden="true">
        <IconCheck v-if="done" class="toggle-check" />
      </span>
      <span class="toggle-label">{{ done ? 'Terminé' : "J'ai terminé" }}</span>
    </button>

    <p v-if="done && doneLabel" class="toggle-date">{{ doneLabel }}</p>
    <p v-else-if="score" class="toggle-score">
      Dernier essai : {{ score.correct }} / {{ score.total }}
    </p>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import IconCheck from '~icons/mdi/check-bold'
import { findLesson } from '@/data/navigation'
import { useProgress } from '@/composables/useProgress'

/**
 * « J'ai terminé » — the manual done-tick at the foot of a page.
 *
 * Both layouts render this, so no lesson file has to know it exists and every
 * future lesson gets it for free. It reads the current route and renders
 * nothing unless that route is a real lesson in navigation.js — which is what
 * keeps it off chapter index pages and the annexes, with no allowlist to
 * maintain.
 *
 * Marking is manual on every page type, drills included: an exercise records
 * its score when you finish it, but only you decide it is done.
 */
const route = useRoute()
const { isDone, toggle, doneAt, scoreFor } = useProgress()

const lesson = computed(() => findLesson(route.path))
const done = computed(() => isDone(route.path))
const score = computed(() => scoreFor(route.path))

const dateFormat = new Intl.DateTimeFormat('fr-FR', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
})

const doneLabel = computed(() => {
  const at = doneAt(route.path)
  if (!at) return ''
  const date = new Date(at)
  return Number.isNaN(date.getTime()) ? '' : `Terminé le ${dateFormat.format(date)}`
})
</script>

<style scoped>
/* Sits below "Pour aller plus loin", separated from it, so it reads as a page
   action rather than as one more piece of the lesson. */
.progress-toggle {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;
  margin-top: 1.75rem;
  padding-top: 1.25rem;
  border-top: 1px solid var(--border-soft);
}

.toggle-button {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.6rem 1.1rem;
  border: 1px solid var(--border);
  border-radius: var(--radius-pill);
  background: var(--surface-1);
  color: var(--text-2);
  font-family: var(--font-sans);
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: border-color var(--dur-fast) ease, background var(--dur-fast) ease,
              color var(--dur-fast) ease;
}

.toggle-button:hover {
  border-color: var(--success-line);
  background: var(--success-soft);
  color: var(--success-text);
}

.toggle-button.is-done {
  border-color: var(--success-line);
  background: var(--success-soft);
  color: var(--success-text);
}

.toggle-box {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.15rem;
  height: 1.15rem;
  border: 1.5px solid currentColor;
  border-radius: var(--radius-sm);
  opacity: 0.75;
}

.toggle-button.is-done .toggle-box {
  background: var(--success);
  border-color: var(--success);
  color: var(--text-on-accent);
  opacity: 1;
}

.toggle-check {
  width: 0.75rem;
  height: 0.75rem;
}

.toggle-date,
.toggle-score {
  margin: 0;
  font-size: 0.75rem;
  color: var(--text-3);
}
</style>
