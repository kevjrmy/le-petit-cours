<template>
  <DefaultLayout title="Emoji & Français">
    <main id="emoji-game">

      <!-- ── Résultat final ───────────────────────── -->
      <div v-if="finished" class="result">
        <div class="result-emoji">{{ resultEmoji }}</div>
        <div class="result-score">{{ score }}<span class="result-total"> / {{ cards.length }}</span></div>
        <p class="result-msg">{{ resultMsg }}</p>
        <button class="btn-restart" @click="restart">Recommencer</button>
      </div>

      <!-- ── Jeu ─────────────────────────────────── -->
      <template v-else>
        <div class="meta">
          <span class="counter">{{ currentIndex + 1 }}&thinsp;/&thinsp;{{ cards.length }}</span>
          <div class="progress-track"
            role="progressbar"
            :aria-valuenow="currentIndex + 1"
            :aria-valuemax="cards.length"
            aria-label="Progression">
            <div class="progress-fill" :style="{ width: progressPct + '%' }"></div>
          </div>
        </div>

        <div class="card">
          <div class="emoji" role="img" :aria-label="'Question ' + (currentIndex + 1)">
            {{ current.emoji }}
          </div>

          <fieldset class="options" :class="{ answered: selected !== null }">
            <legend class="sr-only">Choisissez la bonne réponse en français</legend>
            <label
              v-for="opt in options"
              :key="opt"
              :class="['option', optionClass(opt)]"
            >
              <input
                type="radio"
                name="answer"
                :value="opt"
                :disabled="selected !== null"
                @change="choose(opt)"
                class="sr-only"
              />
              <span class="option-indicator" aria-hidden="true"></span>
              {{ opt }}
            </label>
          </fieldset>

          <div v-if="selected !== null" class="feedback">
            <span v-if="selected === current.answer" class="feedback-correct">✓ Correct !</span>
            <span v-else class="feedback-wrong">✗ C'était : <strong>{{ current.answer }}</strong></span>
          </div>

          <button
            v-if="selected !== null"
            class="btn-next"
            @click="next"
          >
            {{ currentIndex < cards.length - 1 ? 'Suivant →' : 'Voir mon score' }}
          </button>
        </div>
      </template>

    </main>
  </DefaultLayout>
</template>

<script setup>
import { ref, computed } from 'vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'

const cards = [
  { emoji: '🐱', answer: 'un chat',        distractors: ['un chien',    'un lapin',    'un oiseau']    },
  { emoji: '🐶', answer: 'un chien',       distractors: ['un renard',   'un loup',     'un chat']      },
  { emoji: '🍎', answer: 'une pomme',      distractors: ['une poire',   'une orange',  'une cerise']   },
  { emoji: '🚗', answer: 'une voiture',    distractors: ['un train',    'un bus',      'un vélo']      },
  { emoji: '🏠', answer: 'une maison',     distractors: ['un immeuble', 'une école',   'une église']   },
  { emoji: '☀️', answer: 'le soleil',      distractors: ['la lune',     'les nuages',  'les étoiles']  },
  { emoji: '🌧️', answer: 'la pluie',      distractors: ['la neige',    'le vent',     "l'orage"]      },
  { emoji: '✏️', answer: 'un crayon',      distractors: ['un stylo',    'une règle',   'un cahier']    },
  { emoji: '🌳', answer: 'un arbre',       distractors: ['une fleur',   'un buisson',  'une plante']   },
  { emoji: '☕', answer: 'un café',         distractors: ['un thé',      'du lait',     'du jus']       },
  { emoji: '🌙', answer: 'la lune',        distractors: ['le soleil',   'une étoile',  'un nuage']     },
  { emoji: '🏖️', answer: 'une plage',     distractors: ['une forêt',   'une montagne','un lac']       },
  { emoji: '🍞', answer: 'du pain',        distractors: ['un gâteau',   'des biscuits','une tarte']    },
  { emoji: '🎒', answer: 'un sac à dos',   distractors: ['un sac',      'une valise',  'un cartable']  },
  { emoji: '🐟', answer: 'un poisson',     distractors: ['un requin',   'une baleine', 'un dauphin']   },
  { emoji: '⏰', answer: 'un réveil',       distractors: ['une montre',  'une horloge', 'une pendule']  },
]

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5)
}

const currentIndex = ref(0)
const selected     = ref(null)
const score        = ref(0)
const finished     = ref(false)

const current = computed(() => cards[currentIndex.value])

const options = computed(() => {
  const c = current.value
  return shuffle([c.answer, ...c.distractors])
})

const progressPct = computed(() =>
  ((currentIndex.value + 1) / cards.length) * 100
)

const resultEmoji = computed(() => {
  const pct = score.value / cards.length
  if (pct === 1)    return '🏆'
  if (pct >= 0.75)  return '🎉'
  if (pct >= 0.5)   return '👍'
  return '💪'
})

const resultMsg = computed(() => {
  const pct = score.value / cards.length
  if (pct === 1)    return 'Parfait ! Tu connais tous les mots.'
  if (pct >= 0.75)  return 'Très bien ! Encore un peu de pratique.'
  if (pct >= 0.5)   return 'Pas mal ! Continue comme ça.'
  return 'Courage ! Révise et recommence.'
})

function optionClass(opt) {
  if (selected.value === null) return ''
  if (opt === current.value.answer) return 'is-correct'
  if (opt === selected.value)       return 'is-wrong'
  return 'is-neutral'
}

function choose(opt) {
  if (selected.value !== null) return
  selected.value = opt
  if (opt === current.value.answer) score.value++
}

function next() {
  if (currentIndex.value < cards.length - 1) {
    currentIndex.value++
    selected.value = null
  } else {
    finished.value = true
  }
}

function restart() {
  currentIndex.value = 0
  selected.value     = null
  score.value        = 0
  finished.value     = false
}
</script>

<style scoped>
#emoji-game {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
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

.emoji {
  font-size: 5rem;
  line-height: 1;
  user-select: none;
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
  #emoji-game { display: none; }
}
</style>
