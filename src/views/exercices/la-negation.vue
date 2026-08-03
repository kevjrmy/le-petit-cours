<!-- view-meta: created=2026-08-02; updated=2026-08-02 -->
<template>
  <DefaultLayout title="Mets à la négative">
    <main id="negation-game">

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
          Quelle est la bonne version <strong>négative</strong> de cette phrase ?
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
            <legend class="sr-only">Choisissez la phrase négative correcte</legend>
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

// sentence: phrase affirmative ; answer: bonne version négative ; options: choix (incluant answer) ; note: explication
const items = [
  {
    sentence: 'Je parle anglais.',
    answer: 'Je ne parle pas anglais.',
    options: ['Je ne parle pas anglais.', 'Je pas parle anglais.', 'Ne je parle pas anglais.'],
    note: "« ne » se place avant le verbe, « pas » juste après.",
  },
  {
    sentence: 'Il aime le café.',
    answer: "Il n'aime pas le café.",
    options: ["Il n'aime pas le café.", 'Il ne aime pas le café.', "Il n'aime le café."],
    note: "Devant une voyelle, « ne » devient « n' ».",
  },
  {
    sentence: "J'ai un vélo.",
    answer: "Je n'ai pas de vélo.",
    options: ["Je n'ai pas de vélo.", "Je n'ai pas un vélo.", "J'ai pas de vélo."],
    note: "Après une négation, « un/une/des » devient « de ».",
  },
  {
    sentence: 'Elle boit du thé.',
    answer: 'Elle ne boit pas de thé.',
    options: ['Elle ne boit pas de thé.', 'Elle ne boit pas du thé.', 'Elle boit ne pas de thé.'],
    note: "Après une négation, « du/de la » devient « de ».",
  },
  {
    sentence: 'Nous habitons ici.',
    answer: "Nous n'habitons pas ici.",
    options: ["Nous n'habitons pas ici.", 'Nous ne habitons pas ici.', "Nous n'habitons ici."],
    note: "« habitons » commence par une voyelle → « n' ».",
  },
  {
    sentence: 'Ils sont français.',
    answer: 'Ils ne sont pas français.',
    options: ['Ils ne sont pas français.', 'Ils sont ne pas français.', 'Ils ne sont français.'],
    note: "« ne » avant le verbe conjugué, « pas » après.",
  },
  {
    sentence: 'Il y a des nuages.',
    answer: "Il n'y a pas de nuages.",
    options: ["Il n'y a pas de nuages.", "Il n'y a pas des nuages.", "Il n'y a pas nuages."],
    note: "« des » devient « de » après la négation.",
  },
  {
    sentence: 'Elle a une sœur.',
    answer: "Elle n'a pas de sœur.",
    options: ["Elle n'a pas de sœur.", "Elle n'a pas une sœur.", "Elle a pas de sœur."],
    note: "« une » devient « de » après la négation.",
  },
  {
    sentence: 'Tu comprends la leçon.',
    answer: 'Tu ne comprends pas la leçon.',
    options: ['Tu ne comprends pas la leçon.', 'Tu comprends ne pas la leçon.', 'Tu ne comprends la leçon.'],
    note: "« pas » se place juste après le verbe conjugué.",
  },
  {
    sentence: 'Je fume.',
    answer: 'Je ne fume plus.',
    options: ['Je ne fume plus.', 'Je ne fume jamais.', 'Je ne fume pas.'],
    note: "Ici le contexte indique l'arrêt d'une habitude → « ne...plus ».",
    context: "(il a arrêté de fumer)",
  },
  {
    sentence: 'Il ment.',
    answer: 'Il ne ment jamais.',
    options: ['Il ne ment jamais.', 'Il ne ment plus.', 'Il ne ment rien.'],
    note: "« jamais » = zéro fois, une caractéristique constante.",
    context: "(cela n'arrive jamais)",
  },
  {
    sentence: 'Elle voit quelque chose.',
    answer: 'Elle ne voit rien.',
    options: ['Elle ne voit rien.', 'Elle ne voit jamais.', 'Elle ne voit personne.'],
    note: "« rien » nie une chose (quelque chose → rien).",
  },
  {
    sentence: 'Nous connaissons quelqu\'un ici.',
    answer: 'Nous ne connaissons personne ici.',
    options: ['Nous ne connaissons personne ici.', 'Nous ne connaissons rien ici.', 'Nous ne connaissons pas ici.'],
    note: "« personne » nie une personne (quelqu'un → personne).",
  },
  {
    sentence: 'Elle boit de la limonade.',
    answer: 'Elle ne boit pas de limonade.',
    options: ['Elle ne boit pas de limonade.', 'Elle ne boit pas de la limonade.', 'Elle boit ne pas de limonade.'],
    note: "« de la » devient « de » après la négation.",
  },
  {
    sentence: 'Il boit de l\'eau.',
    answer: "Il ne boit pas d'eau.",
    options: ["Il ne boit pas d'eau.", 'Il ne boit pas de eau.', "Il ne boit pas de l'eau."],
    note: "« de » devient « d' » devant une voyelle.",
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

const resultEmoji = computed(() => {
  const pct = score.value / deck.value.length
  if (pct === 1)    return '🏆'
  if (pct >= 0.75)  return '🎉'
  if (pct >= 0.5)   return '👍'
  return '💪'
})

const resultMsg = computed(() => {
  const pct = score.value / deck.value.length
  if (pct === 1)    return 'Parfait ! La négation n’a plus de secret pour toi.'
  if (pct >= 0.75)  return 'Très bien ! Attention aux articles après « pas ».'
  if (pct >= 0.5)   return 'Pas mal ! Révise l’élision de « ne » devant une voyelle.'
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
#negation-game {
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
  #negation-game { display: none; }
}
</style>
