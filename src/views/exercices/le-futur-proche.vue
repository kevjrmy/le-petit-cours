<template>
  <DefaultLayout title="Exercice : Le futur proche">
    <main id="game">

      <!-- Résultat final -->
      <div v-if="finished" class="result">
        <div class="result-score">{{ score }}<span class="result-total"> / {{ deck.length }}</span></div>
        <p class="result-msg">{{ resultMsg }}</p>
        <button class="btn-restart" @click="restart">Recommencer</button>
      </div>

      <!-- Jeu -->
      <template v-else>
        <p class="instructions">
          Choisissez la forme correcte au futur proche pour chaque phrase.
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
          <div class="sentence" role="text">
            {{ current.sentence }}
            <span v-if="current.context" class="context">{{ current.context }}</span>
          </div>

          <fieldset class="options" :class="{ answered: selected !== null }">
            <legend class="sr-only">Choisissez la bonne option au futur proche</legend>
            <label
              v-for="opt in current.options"
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
            <span v-else class="feedback-wrong">
              ✗ La bonne réponse était <strong>{{ current.answer }}</strong>
            </span>
            <p class="feedback-note">{{ current.note }}</p>
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

const items = [
  {
    sentence: 'Je mange une pomme.',
    answer: 'Je vais manger une pomme.',
    options: ['Je vais manger une pomme.', 'Je vais mange une pomme.', 'Je vais à manger une pomme.'],
    note: "Le futur proche se forme avec aller au présent (je vais) et le verbe principal à l'infinitif (manger). Il n'y a pas de préposition « a ».",
  },
  {
    sentence: 'Tu finis tes devoirs.',
    answer: 'Tu vas finir tes devoirs.',
    options: ['Tu vas finir tes devoirs.', 'Tu vas finis tes devoirs.', 'Tu vas à finir tes devoirs.'],
    note: "aller au présent (tu vas) + verbe principal à l'infinitif (finir).",
  },
  {
    sentence: 'Nous partons ce soir.',
    answer: 'Nous allons partir ce soir.',
    options: ['Nous allons partir ce soir.', 'Nous allons partons ce soir.', 'Nous allons à partir ce soir.'],
    note: "aller au présent (nous allons) + verbe principal à l'infinitif (partir).",
  },
  {
    sentence: 'Je vais parler.',
    answer: 'Je ne vais pas parler.',
    options: ['Je ne vais pas parler.', 'Je vais ne pas parler.', 'Je ne vais parler pas.'],
    note: "La négation encadre le verbe conjugué (aller) : ne + vais + pas + infinitif.",
    context: '(à la forme négative)',
  },
  {
    sentence: 'Elle se lave.',
    answer: 'Elle va se laver.',
    options: ['Elle va se laver.', 'Elle se va laver.', 'Elle va se lave.'],
    note: "Le pronom réfléchi (se) se place juste devant le verbe à l'infinitif (laver).",
  },
  {
    sentence: 'Nous nous levons.',
    answer: "Nous n'allons pas nous lever.",
    options: ["Nous n'allons pas nous lever.", 'Nous ne nous allons pas lever.', "Nous n'allons pas nous levons."],
    note: "La négation encadre le verbe aller (nous n'allons pas). Le pronom réfléchi (nous) reste placé devant l'infinitif.",
    context: '(à la forme négative)',
  },
  {
    sentence: 'Ils viennent demain.',
    answer: 'Ils vont venir demain.',
    options: ['Ils vont venir demain.', 'Ils vont viennent demain.', 'Ils vont à venir demain.'],
    note: "aller au présent (ils vont) + verbe principal à l'infinitif (venir).",
  },
  {
    sentence: 'Vous prenez le train.',
    answer: 'Vous allez prendre le train.',
    options: ['Vous allez prendre le train.', 'Vous allez prenez le train.', 'Vous allez à prendre le train.'],
    note: "aller au présent (vous allez) + verbe principal à l'infinitif (prendre).",
  },
  {
    sentence: 'Je me couche.',
    answer: 'Je vais me coucher.',
    options: ['Je vais me coucher.', 'Je me vais coucher.', 'Je vais me couche.'],
    note: "Le pronom réfléchi (me) change avec le sujet et se place juste devant le verbe à l'infinitif.",
  },
  {
    sentence: 'Vous allez étudier.',
    answer: "Vous n'allez pas étudier.",
    options: ["Vous n'allez pas étudier.", 'Vous allez ne pas étudier.', 'Vous ne allez pas à étudier.'],
    note: "La négation encadre le verbe conjugué aller (vous n'allez pas).",
    context: '(à la forme négative)',
  },
]

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5)
}

function withShuffledOptions(item) {
  return { ...item, options: shuffle(item.options) }
}

const deck         = ref(shuffle(items).map(withShuffledOptions))
const currentIndex = ref(0)
const selected     = ref(null)
const score        = ref(0)
const finished     = ref(false)

const current = computed(() => deck.value[currentIndex.value])

const progressPct = computed(() =>
  ((currentIndex.value + 1) / deck.value.length) * 100
)

const resultMsg = computed(() => {
  const pct = score.value / deck.value.length
  if (pct === 1)    return "Parfait ! Le futur proche n'a plus de secret pour toi."
  if (pct >= 0.75)  return 'Très bien ! Attention au placement des pronoms ou de la négation.'
  if (pct >= 0.5)   return "Pas mal ! Révise la formation du verbe aller au présent."
  return 'Courage ! Relis la leçon et recommence.'
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
  if (currentIndex.value < deck.value.length - 1) {
    currentIndex.value++
    selected.value = null
  } else {
    finished.value = true
  }
}

function restart() {
  deck.value         = shuffle(items).map(withShuffledOptions)
  currentIndex.value = 0
  selected.value     = null
  score.value        = 0
  finished.value     = false
}
</script>

<style scoped>
#game {
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

/* Progress */
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

/* Card */
.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
}

.sentence {
  font-family: var(--font-serif);
  font-size: 1.3rem;
  font-weight: 700;
  line-height: 1.5;
  color: var(--clr-blue);
  text-align: center;
  user-select: none;
  padding: 0.5rem 0;
}

.context {
  display: block;
  font-size: 0.8rem;
  font-weight: 400;
  font-style: italic;
  color: var(--clr-ink-soft);
  margin-top: 0.2rem;
}

/* Options */
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
  font-size: 0.95rem;
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

.option input {
  pointer-events: none;
}

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

.option.is-wrong {
  border-color: var(--clr-red);
  background: var(--clr-red-light);
  color: var(--clr-red);
}

.option.is-wrong .option-indicator {
  border-color: var(--clr-red);
  background: var(--clr-red);
}

.option.is-neutral {
  opacity: 0.45;
}

/* Feedback line */
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

/* Next button */
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

/* Result screen */
.result {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  padding: 2rem 0;
  text-align: center;
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

/* Accessibility */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
}

@media print {
  #game { display: none; }
}
</style>
