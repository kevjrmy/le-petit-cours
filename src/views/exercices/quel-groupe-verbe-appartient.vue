<template>
  <DefaultLayout title="Quel groupe ?">
    <main id="group-game">

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
          À quel groupe appartient ce verbe ? Choisissez
          <strong>1<sup>er</sup></strong>, <strong>2<sup>ème</sup></strong>
          ou <strong>3<sup>ème</sup></strong> groupe.
        </p>

        <div class="meta">
          <span class="counter">{{ currentIndex + 1 }}&thinsp;/&thinsp;{{ deck.length }}</span>
          <div class="progress-track"
            role="progressbar"
            :aria-valuenow="currentIndex + 1"
            :aria-valuemax="deck.length"
            aria-label="Progression">
            <div class="progress-fill" :style="{ width: progressPct + '%' }"></div>
          </div>
        </div>

        <div class="card">
          <div class="verb" role="text" :aria-label="'Verbe : ' + current.verb">
            {{ current.verb }}
          </div>

          <fieldset class="options" :class="{ answered: selected !== null }">
            <legend class="sr-only">Choisissez le groupe du verbe</legend>
            <label
              v-for="g in groups"
              :key="g.id"
              :class="['option', optionClass(g.id)]"
            >
              <input
                type="radio"
                name="answer"
                :value="g.id"
                :disabled="selected !== null"
                @change="choose(g.id)"
                class="sr-only"
              />
              <span class="option-indicator" aria-hidden="true"></span>
              {{ g.label }}
            </label>
          </fieldset>

          <div v-if="selected !== null" class="feedback">
            <span v-if="selected === current.group" class="feedback-correct">✓ Correct !</span>
            <span v-else class="feedback-wrong">
              ✗ C'était le <strong>{{ groupLabel(current.group) }}</strong>
            </span>
            <p class="feedback-note">{{ explanation(current) }}</p>
          </div>

          <button
            v-if="selected !== null"
            class="btn-next"
            @click="next"
          >
            {{ currentIndex < deck.length - 1 ? 'Suivant →' : 'Voir mon score' }}
          </button>
        </div>
      </template>

    </main>
  </DefaultLayout>
</template>

<script setup>
import { ref, computed } from 'vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'

const groups = [
  { id: 1, label: '1ᵉʳ groupe' },
  { id: 2, label: '2ᵉ groupe' },
  { id: 3, label: '3ᵉ groupe' },
]

// group: 1 | 2 | 3 ; note: optional trap explanation
const verbs = [
  { verb: 'parler',     group: 1 },
  { verb: 'finir',      group: 2 },
  { verb: 'prendre',    group: 3 },
  { verb: 'manger',     group: 1, note: 'Verbe en -GER, mais bien du 1ᵉʳ groupe (nous mangeons).' },
  { verb: 'choisir',    group: 2 },
  { verb: 'partir',     group: 3, note: 'Piège ! Infinitif en -IR, mais irrégulier : nous partons (sans -iss-).' },
  { verb: 'aimer',      group: 1 },
  { verb: 'grandir',    group: 2 },
  { verb: 'faire',      group: 3 },
  { verb: 'venir',      group: 3, note: 'Piège ! En -IR, mais irrégulier : nous venons (sans -iss-).' },
  { verb: 'travailler', group: 1 },
  { verb: 'réussir',    group: 2 },
  { verb: 'vouloir',    group: 3 },
  { verb: 'aller',      group: 3, note: 'Piège ! Seul verbe en -ER irrégulier : je vais, nous allons.' },
  { verb: 'obéir',      group: 2 },
  { verb: 'commencer',  group: 1, note: 'Verbe en -CER, mais bien du 1ᵉʳ groupe (nous commençons).' },
  { verb: 'dormir',     group: 3, note: 'Piège ! En -IR, mais irrégulier : nous dormons (sans -iss-).' },
  { verb: 'réfléchir',  group: 2 },
  { verb: 'pouvoir',    group: 3 },
  { verb: 'danser',     group: 1 },
  { verb: 'écrire',     group: 3 },
  { verb: 'voir',       group: 3 },
]

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5)
}

const deck         = ref(shuffle(verbs))
const currentIndex = ref(0)
const selected     = ref(null)
const score        = ref(0)
const finished     = ref(false)

const current = computed(() => deck.value[currentIndex.value])

const progressPct = computed(() =>
  ((currentIndex.value + 1) / deck.value.length) * 100
)

const resultEmoji = computed(() => {
  const pct = score.value / deck.value.length
  if (pct === 1)    return '🏆'
  if (pct >= 0.75)  return '🎉'
  if (pct >= 0.5)   return '👍'
  return '💪'
})

const resultMsg = computed(() => {
  const pct = score.value / deck.value.length
  if (pct === 1)    return 'Parfait ! Tu maîtrises les trois groupes.'
  if (pct >= 0.75)  return 'Très bien ! Attention aux pièges en -IR.'
  if (pct >= 0.5)   return 'Pas mal ! Révise les verbes irréguliers.'
  return 'Courage ! Relis la leçon et recommence.'
})

function groupLabel(id) {
  return groups.find(g => g.id === id).label
}

function explanation(card) {
  if (card.note) return card.note
  if (card.group === 1) return 'Infinitif en -ER → 1ᵉʳ groupe.'
  if (card.group === 2) return 'Infinitif en -IR avec « nous -issons » → 2ᵉ groupe.'
  return 'Verbe irrégulier → 3ᵉ groupe.'
}

function optionClass(id) {
  if (selected.value === null) return ''
  if (id === current.value.group) return 'is-correct'
  if (id === selected.value)      return 'is-wrong'
  return 'is-neutral'
}

function choose(id) {
  if (selected.value !== null) return
  selected.value = id
  if (id === current.value.group) score.value++
}

function next() {
  if (currentIndex.value < deck.value.length - 1) {
    currentIndex.value++
    selected.value = null
  } else {
    finished.value = true
  }
}

function restart() {
  deck.value         = shuffle(verbs)
  currentIndex.value = 0
  selected.value     = null
  score.value        = 0
  finished.value     = false
}
</script>

<style scoped>
#group-game {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.instructions {
  font-family: var(--font-serif);
  font-size: 0.95rem;
  line-height: 1.65;
  color: var(--clr-ink-mid);
  margin: 0;
  text-align: center;
}

/* ── Progress ──────────────────────────────────── */
.meta {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.counter {
  font-family: var(--font-mono);
  font-size: 0.78rem;
  color: var(--clr-ink-soft);
  white-space: nowrap;
}

.progress-track {
  flex: 1;
  height: 4px;
  background: var(--clr-border);
  border-radius: 2px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: var(--clr-blue);
  border-radius: 2px;
  transition: width 0.3s ease;
}

/* ── Card ──────────────────────────────────────── */
.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
}

.verb {
  font-family: var(--font-serif);
  font-size: 2.6rem;
  font-weight: 700;
  line-height: 1;
  color: var(--clr-blue);
  user-select: none;
  padding: 0.5rem 0;
}

/* ── Options ───────────────────────────────────── */
.options {
  border: none;
  padding: 0;
  margin: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.option {
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border: 1.5px solid var(--clr-border);
  border-radius: var(--radius);
  background: var(--clr-page);
  color: var(--clr-ink);
  font-family: var(--font-serif);
  font-size: 0.97rem;
  cursor: pointer;
  transition: border-color 0.15s, background 0.15s, color 0.15s;
}

.options:not(.answered) .option:hover {
  border-color: var(--clr-blue);
  background: var(--clr-blue-light);
  color: var(--clr-blue-dark);
}

.option-indicator {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 1.5px solid var(--clr-border);
  flex-shrink: 0;
  transition: border-color 0.15s, background 0.15s;
}

.options.answered .option {
  cursor: default;
}

/* Hidden radios must never intercept a click — the label handles it */
.option input {
  pointer-events: none;
}

/* Correct answer */
.option.is-correct {
  border-color: #4CAF50;
  background: #F1FBF2;
  color: #2E7D32;
  font-weight: 600;
}

.option.is-correct .option-indicator {
  border-color: #4CAF50;
  background: #4CAF50;
}

/* Wrong selected answer */
.option.is-wrong {
  border-color: var(--clr-red);
  background: var(--clr-red-light);
  color: var(--clr-red);
}

.option.is-wrong .option-indicator {
  border-color: var(--clr-red);
  background: var(--clr-red);
}

/* Unselected options after answer */
.option.is-neutral {
  opacity: 0.45;
}

/* ── Feedback line ─────────────────────────────── */
.feedback {
  width: 100%;
  text-align: center;
  font-family: var(--font-sans);
  font-size: 0.88rem;
}

.feedback-correct {
  color: #2E7D32;
  font-weight: 600;
}

.feedback-wrong {
  color: var(--clr-red);
}

.feedback-note {
  margin: 0.4rem 0 0;
  font-family: var(--font-serif);
  font-style: italic;
  font-size: 0.85rem;
  color: var(--clr-ink-mid);
  line-height: 1.5;
}

/* ── Next button ───────────────────────────────── */
.btn-next {
  align-self: stretch;
  padding: 0.8rem 1.5rem;
  background: var(--clr-blue);
  color: var(--clr-page);
  border-radius: var(--radius);
  font-family: var(--font-sans);
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background 0.15s;
}

.btn-next:hover {
  background: var(--clr-blue-dark);
}

/* ── Result screen ─────────────────────────────── */
.result {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  padding: 2rem 0;
  text-align: center;
}

.result-emoji {
  font-size: 3.5rem;
  line-height: 1;
}

.result-score {
  font-family: var(--font-sans);
  font-size: 3rem;
  font-weight: 800;
  color: var(--clr-blue);
  line-height: 1;
}

.result-total {
  font-size: 1.5rem;
  font-weight: 400;
  color: var(--clr-ink-soft);
}

.result-msg {
  font-family: var(--font-serif);
  font-style: italic;
  color: var(--clr-ink-mid);
  font-size: 1rem;
  margin: 0;
}

.btn-restart {
  margin-top: 0.5rem;
  padding: 0.75rem 2rem;
  background: transparent;
  border: 1.5px solid var(--clr-blue);
  border-radius: var(--radius);
  color: var(--clr-blue);
  font-family: var(--font-sans);
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background 0.15s, color 0.15s;
}

.btn-restart:hover {
  background: var(--clr-blue);
  color: var(--clr-page);
}

/* ── Accessibility ─────────────────────────────── */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
}

@media print {
  #group-game { display: none; }
}
</style>
