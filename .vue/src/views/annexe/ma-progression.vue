<!-- view-meta: created=2026-08-26; updated=2026-08-26 -->
<template>
  <DefaultLayout
    title="Ma progression"
    subtitle="Ce que vous avez déjà terminé, chapitre par chapitre."
  >
    <main class="progression">
      <section class="overall" aria-labelledby="overall-heading">
        <h2 id="overall-heading" class="sr-only">Progression générale</h2>

        <p class="overall-pct">{{ overall.pct }}<span class="pct-sign">%</span></p>
        <p class="overall-count">
          {{ overall.done }} page{{ overall.done === 1 ? '' : 's' }} terminée{{ overall.done === 1 ? '' : 's' }}
          sur {{ overall.total }}
        </p>
        <span class="bar bar-lg" aria-hidden="true">
          <span class="bar-fill" :style="{ width: overall.pct + '%' }"></span>
        </span>
      </section>

      <section aria-labelledby="chapters-heading">
        <h2 id="chapters-heading" class="section-heading">Par chapitre</h2>

        <ul class="chapter-list">
          <li v-for="row in chapterRows" :key="row.chapter.slug" class="chapter-row">
            <RouterLink class="chapter-link" :to="row.chapter.path">
              <ChapterIcon :name="row.chapter.icon" size="1.05rem" class="chapter-icon" />
              <span class="chapter-name">{{ row.chapter.title }}</span>
              <span class="chapter-count">{{ row.done }} / {{ row.total }}</span>
            </RouterLink>
            <span class="bar" aria-hidden="true">
              <span class="bar-fill" :style="{ width: row.pct + '%' }"></span>
            </span>
          </li>
        </ul>
      </section>

      <section v-if="exerciseRows.length" aria-labelledby="scores-heading">
        <h2 id="scores-heading" class="section-heading">Derniers résultats</h2>
        <p class="section-note">
          Le score de votre dernier essai. Un exercice n'est « terminé » que
          lorsque vous le marquez vous-même.
        </p>

        <ul class="score-list">
          <li v-for="row in exerciseRows" :key="row.path" class="score-row">
            <RouterLink class="score-link" :to="row.path">{{ row.title }}</RouterLink>
            <span class="score-value" :class="row.tone">{{ row.correct }} / {{ row.total }}</span>
          </li>
        </ul>
      </section>

      <section class="danger-zone" aria-labelledby="reset-heading">
        <h2 id="reset-heading" class="section-heading">Recommencer à zéro</h2>
        <p class="section-note">
          Efface toutes les coches et tous les scores. Cette action est définitive.
        </p>

        <button v-if="!confirming" type="button" class="reset-button" @click="confirming = true">
          Effacer ma progression
        </button>

        <p v-else class="confirm-row">
          <span class="confirm-text">Vraiment tout effacer ?</span>
          <button type="button" class="reset-button is-armed" @click="confirmReset">Oui, effacer</button>
          <button type="button" class="cancel-button" @click="confirming = false">Annuler</button>
        </p>
      </section>
    </main>
  </DefaultLayout>
</template>

<script setup>
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import ChapterIcon from '@/components/ChapterIcon.vue'
import { chapters, publishedLessons } from '@/data/navigation'
import { useProgress } from '@/composables/useProgress'

/**
 * « Ma progression » — the one place that reads the whole progress store.
 *
 * Everything here is derived from `navigation.js` plus `useProgress`, so a new
 * chapter or lesson appears without touching this file.
 */
const { overall, chapterProgress, scoreFor, reset } = useProgress()

const chapterRows = computed(() =>
  chapters.map(chapter => ({ chapter, ...chapterProgress(chapter) }))
)

/* Only drills that have actually been played show a line. */
const exerciseRows = computed(() => {
  const chapter = chapters.find(item => item.slug === 'exercices')
  if (!chapter) return []

  return publishedLessons(chapter)
    .map(lesson => {
      const score = scoreFor(lesson.path)
      if (!score) return null

      const pct = score.correct / score.total
      return {
        path: lesson.path,
        title: lesson.title,
        correct: score.correct,
        total: score.total,
        /* Three bands only — a colour per decile would say nothing. */
        tone: pct >= 0.8 ? 'is-good' : pct >= 0.5 ? 'is-mid' : 'is-low',
      }
    })
    .filter(Boolean)
})

const confirming = ref(false)

function confirmReset() {
  reset()
  confirming.value = false
}
</script>

<style scoped>
.progression {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

/* ── Overall ───────────────────────────────────── */
.overall {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.35rem;
  padding: 1.5rem 1.25rem;
  background: var(--surface-1);
  border: 1px solid var(--border);
  border-radius: var(--radius);
}

.overall-pct {
  margin: 0;
  font-family: var(--font-serif);
  font-size: 2.75rem;
  line-height: 1;
  color: var(--text-1);
}

.pct-sign {
  font-size: 1.35rem;
  color: var(--text-3);
}

.overall-count {
  margin: 0 0 0.5rem;
  font-size: 0.85rem;
  color: var(--text-3);
}

/* ── Bars ──────────────────────────────────────── */
.bar {
  display: block;
  width: 100%;
  height: 5px;
  background: var(--surface-3);
  border-radius: var(--radius-pill);
  overflow: hidden;
}

.bar-lg { height: 8px; }

.bar-fill {
  display: block;
  height: 100%;
  background: var(--success);
  border-radius: var(--radius-pill);
  transition: width var(--dur-fast) var(--ease);
}

/* ── Sections ──────────────────────────────────── */
.section-heading {
  margin: 0 0 0.5rem;
  font-family: var(--font-sans);
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--text-3);
}

.section-note {
  margin: 0 0 0.85rem;
  font-size: 0.82rem;
  line-height: 1.6;
  color: var(--text-3);
}

/* ── Chapters ──────────────────────────────────── */
.chapter-list,
.score-list {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.chapter-row {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  padding: 0.7rem 0.9rem;
  background: var(--surface-1);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
}

.chapter-link {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  color: var(--text-1);
  text-decoration: none;
}

.chapter-link:hover .chapter-name { color: var(--accent-text); }

.chapter-icon {
  flex-shrink: 0;
  color: var(--text-3);
}

.chapter-name {
  flex: 1;
  min-width: 0;
  font-family: var(--font-serif);
  font-size: 0.93rem;
  transition: color var(--dur-fast) ease;
}

.chapter-count {
  flex-shrink: 0;
  font-family: var(--font-mono);
  font-size: 0.78rem;
  color: var(--text-3);
}

/* ── Scores ────────────────────────────────────── */
.score-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.55rem 0.9rem;
  background: var(--surface-1);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
}

.score-link {
  flex: 1;
  min-width: 0;
  font-size: 0.88rem;
  color: var(--text-1);
  text-decoration: none;
}

.score-link:hover { color: var(--accent-text); }

.score-value {
  flex-shrink: 0;
  padding: 0.1rem 0.5rem;
  border-radius: var(--radius-pill);
  font-family: var(--font-mono);
  font-size: 0.76rem;
  font-weight: 600;
}

.score-value.is-good { background: var(--success-soft); color: var(--success-text); }
.score-value.is-mid  { background: var(--warn-soft);    color: var(--warn-text); }
.score-value.is-low  { background: var(--danger-soft);  color: var(--danger-text); }

/* ── Reset ─────────────────────────────────────── */
.danger-zone {
  padding-top: 1.25rem;
  border-top: 1px solid var(--border-soft);
}

.reset-button,
.cancel-button {
  padding: 0.45rem 0.9rem;
  border-radius: var(--radius-sm);
  font-family: var(--font-sans);
  font-size: 0.82rem;
  font-weight: 600;
  cursor: pointer;
  transition: background var(--dur-fast) ease, border-color var(--dur-fast) ease,
              color var(--dur-fast) ease;
}

.reset-button {
  border: 1px solid var(--danger-line);
  background: var(--surface-1);
  color: var(--danger-text);
}

.reset-button:hover { background: var(--danger-soft); }

.reset-button.is-armed {
  background: var(--danger-soft);
  border-color: var(--danger);
}

.cancel-button {
  border: 1px solid var(--border);
  background: var(--surface-1);
  color: var(--text-2);
}

.cancel-button:hover { background: var(--surface-2); }

.confirm-row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin: 0;
}

.confirm-text {
  font-size: 0.85rem;
  color: var(--text-2);
}
</style>
