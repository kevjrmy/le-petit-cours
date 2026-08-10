<!-- view-meta: created=2026-08-02; updated=2026-08-02 -->
<template>
  <DefaultLayout title="Quel article ?">
    <main id="article-game">

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
          Choisissez l'article qui complète correctement la phrase.
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
            <template v-for="(part, i) in sentenceParts" :key="i">
              <template v-if="part === '__BLANK__'">
                <span class="blank" :class="{ filled: selected !== null }">{{ selected !== null ? selected : '•••' }}</span>
              </template>
              <template v-else>{{ part }}</template>
            </template>
          </div>

          <fieldset class="options" :class="{ answered: selected !== null }">
            <legend class="sr-only">Choisissez l'article correct</legend>
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

// answer: correct article ; options: choices shown (includes answer) ; note: explanation
const items = [
  { sentence: '__BLANK__ chat dort sur le canapé.', answer: 'Le', options: ['Le', 'La', 'Les', "L'"], note: "« chat » est masculin singulier → Le." },
  { sentence: '__BLANK__ maison est très grande.', answer: 'La', options: ['Le', 'La', "L'", 'Les'], note: "« maison » est féminin singulier → La." },
  { sentence: '__BLANK__ école est fermée aujourd’hui.', answer: "L'", options: ['Le', 'La', "L'", 'Les'], note: "Devant une voyelle, le/la deviennent L'." },
  { sentence: '__BLANK__ enfants jouent dans le jardin.', answer: 'Les', options: ['Le', 'La', "L'", 'Les'], note: "« enfants » est au pluriel → Les." },
  { sentence: 'J’ai __BLANK__ frère et une sœur.', answer: 'un', options: ['un', 'une', 'des', 'du'], note: "« frère » est masculin singulier non précisé → un." },
  { sentence: 'Elle porte __BLANK__ robe rouge.', answer: 'une', options: ['un', 'une', 'des', 'de la'], note: "« robe » est féminin singulier non précisé → une." },
  { sentence: 'Il y a __BLANK__ nuages dans le ciel.', answer: 'des', options: ['un', 'une', 'des', 'du'], note: "Pluriel non précisé → des." },
  { sentence: 'Je mange __BLANK__ pain tous les matins.', answer: 'du', options: ['un', 'du', 'de la', "de l'"], note: "Quantité indéterminée + nom masculin → du." },
  { sentence: 'Elle boit __BLANK__ limonade fraîche.', answer: 'de la', options: ['une', 'du', 'de la', "de l'"], note: "Quantité indéterminée + nom féminin → de la." },
  { sentence: 'Il boit __BLANK__ eau avant de dormir.', answer: "de l'", options: ['du', 'de la', "de l'", 'des'], note: "Devant une voyelle, du/de la deviennent de l'." },
  { sentence: 'Je vais __BLANK__ marché ce matin.', answer: 'au', options: ['au', 'à la', "à l'", 'aux'], note: "à + le → au (contraction obligatoire)." },
  { sentence: 'Il parle __BLANK__ voisins tous les jours.', answer: 'aux', options: ['au', 'à la', "à l'", 'aux'], note: "à + les → aux (contraction obligatoire)." },
  { sentence: 'Nous allons __BLANK__ plage cet été.', answer: 'à la', options: ['au', 'à la', "à l'", 'aux'], note: "Piège ! à + la ne se contracte pas → à la." },
  { sentence: 'Tu penses __BLANK__ examen de demain.', answer: "à l'", options: ['au', 'à la', "à l'", 'aux'], note: "Devant une voyelle, à + le/la → à l'." },
  { sentence: 'Elle revient __BLANK__ marché avec des légumes.', answer: 'du', options: ['du', 'de la', "de l'", 'des'], note: "de + le → du (contraction obligatoire)." },
  { sentence: 'Ils parlent __BLANK__ élèves absents.', answer: 'des', options: ['du', 'de la', "de l'", 'des'], note: "de + les → des (contraction obligatoire)." },
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

const sentenceParts = computed(() => current.value.sentence.split('__BLANK__').reduce((acc, part, i, arr) => {
  acc.push(part)
  if (i < arr.length - 1) acc.push('__BLANK__')
  return acc
}, []))

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
  if (pct === 1)    return 'Parfait ! Les articles n’ont plus de secret pour toi.'
  if (pct >= 0.75)  return 'Très bien ! Fais attention aux contractions à/de.'
  if (pct >= 0.5)   return 'Pas mal ! Révise les articles partitifs.'
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
#article-game {
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
  line-height: 1.6;
  color: var(--clr-ink);
  text-align: center;
  user-select: none;
  padding: 0.5rem 0;
}

.blank {
  display: inline-block;
  min-width: 3.2em;
  padding: 0 0.3em;
  border-bottom: 2px solid var(--clr-blue);
  color: var(--clr-blue);
  font-weight: 700;
  text-align: center;
}

.blank:not(.filled) {
  color: var(--clr-ink-soft);
  font-weight: 400;
  letter-spacing: 0.15em;
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

.option input {
  pointer-events: none;
}

.option.is-correct {
  border-color: var(--success-strong);
  background: var(--success-soft);
  color: var(--success-text);
  font-weight: 600;
}

.option.is-correct .option-indicator {
  border-color: var(--success-strong);
  background: var(--success-strong);
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
  color: var(--success-text);
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
  color: var(--text-on-accent);
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
  color: var(--text-on-accent);
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
  #article-game { display: none; }
}
</style>
