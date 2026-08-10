<!-- view-meta: created=2026-08-10; updated=2026-08-10 -->
<template>
  <DefaultLayout title="Exercice : Être ou avoir ?">
    <main class="exo sorter">

      <!-- ── Résultat final ───────────────────────── -->
      <div v-if="finished" class="result">
        <div class="result-emoji">{{ resultEmoji }}</div>
        <div class="result-score">{{ score }}<span class="result-total"> / {{ deck.length }}</span></div>
        <p class="result-msg">{{ resultMsg }}</p>
        <button class="btn-restart" @click="restart">Recommencer</button>
      </div>

      <!-- ── Jeu ─────────────────────────────────── -->
      <template v-else>
        <p class="instructions">
          Au <strong>passé composé</strong>, chaque verbe se conjugue avec
          <strong>être</strong> ou avec <strong>avoir</strong>.
          Glissez chaque verbe dans la bonne colonne — ou cliquez dessus.
        </p>

        <div class="meta">
          <span class="counter">{{ sorted }}&thinsp;/&thinsp;{{ deck.length }}</span>
          <div
            class="progress-track"
            role="progressbar"
            :aria-valuenow="sorted"
            :aria-valuemax="deck.length"
            aria-label="Progression"
          >
            <div class="progress-fill" :style="{ width: progressPct + '%' }"></div>
          </div>
        </div>

        <!-- Réserve -->
        <div class="pool" :class="{ empty: pool.length === 0 }" aria-label="Verbes à classer">
          <button
            v-for="v in pool"
            :key="v.id"
            class="verb"
            :class="{ dragging: drag.active && drag.item === v }"
            :disabled="checked"
            @pointerdown.prevent="startDrag($event, v)"
            @click="cycle(v)"
          >{{ v.text }}</button>
          <span v-if="pool.length === 0" class="pool-empty">
            Tous les verbes sont classés ✦
          </span>
        </div>

        <!-- Colonnes -->
        <div class="columns">
          <section
            v-for="col in COLUMNS"
            :key="col.key"
            class="column"
            :class="{ over: drag.active && drag.overCol === col.key }"
            :data-col="col.key"
          >
            <h2 class="column-head">
              <span class="column-aux">{{ col.label }}</span>
              <span class="column-hint">{{ col.hint }}</span>
            </h2>

            <div class="column-body">
              <button
                v-for="v in inColumn(col.key)"
                :key="v.id"
                class="verb placed"
                :class="verbClass(v)"
                :disabled="checked"
                @pointerdown.prevent="startDrag($event, v)"
                @click="cycle(v)"
              >{{ v.text }}</button>

              <span v-if="inColumn(col.key).length === 0" class="column-empty">
                Déposez ici
              </span>
            </div>
          </section>
        </div>

        <!-- Feedback -->
        <div v-if="checked" class="feedback">
          <span v-if="score === deck.length" class="feedback-correct">
            ✓ Tout est juste !
          </span>
          <span v-else class="feedback-wrong">
            ✗ {{ score }} / {{ deck.length }} — les verbes en rouge sont mal placés.
          </span>
          <p class="feedback-note">
            Les verbes avec <strong>être</strong> sont surtout des verbes de mouvement
            et de changement d'état (aller, venir, partir, naître, mourir…) et
            <strong>tous</strong> les verbes pronominaux. Avec <em>être</em>, le participe
            s'accorde avec le sujet&nbsp;: <em>elle est allé<strong>e</strong></em>.
          </p>
        </div>

        <!-- Actions -->
        <div class="actions">
          <button
            v-if="!checked"
            class="btn-verify"
            :disabled="pool.length > 0"
            @click="verify"
          >
            {{ pool.length > 0 ? `Encore ${pool.length} verbe${pool.length > 1 ? 's' : ''}` : 'Vérifier' }}
          </button>
          <button v-else class="btn-next" @click="next">Voir mon score</button>
        </div>
      </template>

      <!-- Fantôme de glissement -->
      <div
        v-if="drag.active"
        class="verb drag-ghost"
        :style="{ left: drag.x + 'px', top: drag.y + 'px' }"
      >{{ drag.item.text }}</div>

    </main>
  </DefaultLayout>
</template>

<script setup>
import { ref, reactive, computed, onBeforeUnmount } from 'vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'

/**
 * Bucket-sorting exercise: drag (or click to cycle) each infinitive into the
 * auxiliary it takes at the passé composé.
 *
 * Pointer-based drag so it works on mouse and touch alike — same approach as
 * the conversation gap-fills. Clicking cycles pool → être → avoir → pool, so
 * the exercise is fully usable without dragging (and with a keyboard).
 */
const COLUMNS = [
  { key: 'etre',  label: 'ÊTRE',  hint: 'je suis allé(e)' },
  { key: 'avoir', label: 'AVOIR', hint: "j'ai mangé" },
]

const items = [
  { text: 'aller',        aux: 'etre'  },
  { text: 'venir',        aux: 'etre'  },
  { text: 'partir',       aux: 'etre'  },
  { text: 'sortir',       aux: 'etre'  },
  { text: 'naître',       aux: 'etre'  },
  { text: 'tomber',       aux: 'etre'  },
  { text: 'se lever',     aux: 'etre'  },
  { text: 'rester',       aux: 'etre'  },
  { text: 'manger',       aux: 'avoir' },
  { text: 'parler',       aux: 'avoir' },
  { text: 'finir',        aux: 'avoir' },
  { text: 'prendre',      aux: 'avoir' },
  { text: 'voir',         aux: 'avoir' },
  { text: 'faire',        aux: 'avoir' },
  { text: 'attendre',     aux: 'avoir' },
  { text: 'travailler',   aux: 'avoir' },
]

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5)
}

let idCounter = 0
function makeDeck() {
  idCounter = 0
  return shuffle(items).map(it => ({ ...it, id: ++idCounter, col: null }))
}

const deck     = ref(makeDeck())
const checked  = ref(false)
const finished = ref(false)

const pool = computed(() => deck.value.filter(v => v.col === null))
const sorted = computed(() => deck.value.length - pool.value.length)

const progressPct = computed(() =>
  (sorted.value / deck.value.length) * 100
)

const score = computed(() =>
  deck.value.filter(v => v.col === v.aux).length
)

function inColumn(key) {
  return deck.value.filter(v => v.col === key)
}

function verbClass(v) {
  if (!checked.value) return ''
  return v.col === v.aux ? 'is-correct' : 'is-wrong'
}

/** Click fallback: pool → être → avoir → pool. */
function cycle(v) {
  if (checked.value || drag.moved) return
  v.col = v.col === null ? 'etre' : v.col === 'etre' ? 'avoir' : null
}

// ── Drag (pointer-based → mouse + touch) ──
const drag = reactive({
  active: false,
  item: null,
  x: 0,
  y: 0,
  overCol: null,
  moved: false, // distinguishes a drag from a click
})

function startDrag(e, item) {
  if (checked.value) return
  drag.active = true
  drag.item = item
  drag.x = e.clientX
  drag.y = e.clientY
  drag.overCol = null
  drag.moved = false

  window.addEventListener('pointermove', onMove)
  window.addEventListener('pointerup', onUp)
  window.addEventListener('pointercancel', onUp)
}

function onMove(e) {
  drag.x = e.clientX
  drag.y = e.clientY
  drag.moved = true
  const el = document.elementFromPoint(e.clientX, e.clientY)
  const col = el && el.closest('[data-col]')
  drag.overCol = col ? col.dataset.col : null
}

function onUp() {
  window.removeEventListener('pointermove', onMove)
  window.removeEventListener('pointerup', onUp)
  window.removeEventListener('pointercancel', onUp)

  if (drag.moved && drag.item) {
    // Dropped outside any column → back to the pool
    drag.item.col = drag.overCol
  }

  drag.active = false
  drag.item = null
  drag.overCol = null
  // Cleared on the next tick so the click handler can read it
  setTimeout(() => { drag.moved = false }, 0)
}

const resultEmoji = computed(() => {
  const pct = score.value / deck.value.length
  if (pct === 1)   return '🏆'
  if (pct >= 0.75) return '🎉'
  if (pct >= 0.5)  return '👍'
  return '💪'
})

const resultMsg = computed(() => {
  const pct = score.value / deck.value.length
  if (pct === 1)   return 'Parfait ! Tu connais tes auxiliaires par cœur.'
  if (pct >= 0.75) return 'Très bien ! Encore quelques verbes de mouvement à retenir.'
  if (pct >= 0.5)  return 'Pas mal ! Révise la liste des verbes qui vont avec « être ».'
  return 'Courage ! Relis la leçon sur le passé composé et recommence.'
})

function verify() {
  if (pool.value.length > 0) return
  checked.value = true
}

function next() {
  finished.value = true
}

function restart() {
  deck.value = makeDeck()
  checked.value = false
  finished.value = false
}

onBeforeUnmount(() => {
  window.removeEventListener('pointermove', onMove)
  window.removeEventListener('pointerup', onUp)
  window.removeEventListener('pointercancel', onUp)
})
</script>

<style scoped>
/* ── Réserve de verbes ─────────────────────────── */
.pool {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.4rem;
  min-height: 3rem;
  padding: 0.75rem 0.9rem;
  background: var(--surface-2);
  border: 1px dashed var(--border-strong);
  border-radius: var(--radius);
  transition: background var(--dur-fast) ease;
}

.pool.empty {
  border-style: solid;
  justify-content: center;
}

.pool-empty {
  font-family: var(--font-sans);
  font-size: 0.8rem;
  font-style: italic;
  color: var(--text-3);
}

/* ── Jeton verbe ───────────────────────────────── */
.verb {
  padding: 0.35rem 0.7rem;
  border: 1px solid var(--border);
  border-radius: var(--radius-pill);
  background: var(--surface-1);
  color: var(--text-1);
  font-family: var(--font-mono);
  font-size: 0.84rem;
  font-weight: 500;
  cursor: grab;
  touch-action: none;
  box-shadow: var(--shadow-sm);
  transition: border-color var(--dur-fast) ease, background var(--dur-fast) ease,
              opacity var(--dur-fast) ease;
}

.verb:hover:not(:disabled) { border-color: var(--accent); color: var(--accent-text); }
.verb:active { cursor: grabbing; }
.verb.dragging { opacity: 0.3; }
.verb:disabled { cursor: default; }

.verb.is-correct {
  background: var(--success-soft);
  border-color: var(--success-strong);
  color: var(--success-text);
  font-weight: 700;
}

.verb.is-wrong {
  background: var(--danger-soft);
  border-color: var(--danger);
  color: var(--danger-text);
  font-weight: 700;
}

/* ── Colonnes ──────────────────────────────────── */
.columns {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
}

/* `.column` is a <section>, so the global content-block rule in style.css
   would give it padding and a sibling margin-top — both must be cancelled or
   the header floats inset and the second column sits lower than the first. */
.column {
  display: flex;
  flex-direction: column;
  padding: 0;
  margin-top: 0;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--surface-1);
  overflow: hidden;
  transition: border-color var(--dur-fast) ease, box-shadow var(--dur-fast) ease;
}

.column.over {
  border-color: var(--accent);
  box-shadow: 0 0 0 2px var(--accent-soft);
}

.column-head {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  margin: 0;
  padding: 0.55rem 0.75rem;
  background: var(--accent-soft);
  border-bottom: 1px solid var(--accent-line);
  text-align: center;
}

.column-aux {
  font-family: var(--font-sans);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: var(--accent-text);
}

.column-hint {
  font-family: var(--font-serif);
  font-style: italic;
  font-size: 0.72rem;
  font-weight: 400;
  color: var(--text-3);
}

.column-body {
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  gap: 0.4rem;
  padding: 0.75rem;
  min-height: 7rem;
}

.column-empty {
  width: 100%;
  align-self: center;
  text-align: center;
  font-family: var(--font-sans);
  font-size: 0.78rem;
  font-style: italic;
  color: var(--text-3);
}

/* ── Fantôme ───────────────────────────────────── */
.drag-ghost {
  position: fixed;
  z-index: 1000;
  transform: translate(-50%, -50%) scale(1.05);
  pointer-events: none;
  box-shadow: var(--shadow-lg);
  opacity: 0.95;
}

@media (max-width: 560px) {
  .columns { grid-template-columns: 1fr; }
}
</style>
