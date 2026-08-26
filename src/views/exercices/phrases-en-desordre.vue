<!-- view-meta: created=2026-08-02; updated=2026-08-26 -->
<template>
  <DefaultLayout title="Exercice : Phrases en désordre">
    <main id="desordre-game">

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
          Reconstituez la phrase française correcte en cliquant sur les mots dans le bon ordre.
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
          <!-- Clue in Spanish -->
          <div class="spanish-prompt" role="text">
            <span class="flag" aria-hidden="true">🇪🇸</span>
            <span class="prompt-text">{{ current.spanish }}</span>
          </div>

          <!-- Target zone (Constructed sentence) -->
          <div 
            class="target-zone" 
            :class="{ 
              empty: selectedIds.length === 0, 
              answered: checked,
              'is-correct-border': checked && isCorrect,
              'is-wrong-border': checked && !isCorrect
            }"
            role="region"
            aria-label="Phrase construite"
          >
            <div v-if="selectedIds.length === 0" class="target-placeholder">
              Cliquez sur les mots ci-dessous...
            </div>
            <button 
              v-for="id in selectedIds" 
              :key="id"
              class="chip target-chip"
              :disabled="checked"
              @click="deselectWord(id)"
              :aria-label="'Retirer le mot ' + getWordText(id)"
            >
              {{ getWordText(id) }}
            </button>
          </div>

          <!-- Pool of available words -->
          <div class="pool-zone" role="group" aria-label="Mots disponibles">
            <template v-for="w in current.shuffled" :key="w.id">
              <button 
                v-if="!selectedIds.includes(w.id)" 
                class="chip pool-chip"
                :disabled="checked"
                @click="selectWord(w.id)"
              >
                {{ w.text }}
              </button>
              <div v-else class="chip-placeholder" aria-hidden="true">
                <span style="visibility: hidden">{{ w.text }}</span>
              </div>
            </template>
          </div>

          <!-- Verification Feedback -->
          <div v-if="checked" class="feedback">
            <span v-if="isCorrect" class="feedback-correct">✓ Correct !</span>
            <div v-else class="feedback-wrong-wrapper">
              <span class="feedback-wrong">✗ Ce n'est pas tout à fait ça.</span>
              <p class="correct-reveal">
                La bonne réponse : <strong>{{ correctSentence }}</strong>
              </p>
            </div>
            <p class="feedback-note">{{ current.note }}</p>
          </div>

          <!-- Actions -->
          <div class="actions">
            <button
              v-if="!checked"
              class="btn-verify"
              :disabled="selectedIds.length !== current.words.length"
              @click="verify"
            >
              Vérifier
            </button>
            <button
              v-else
              class="btn-next"
              @click="next"
            >
              {{ currentIndex < deck.length - 1 ? 'Suivant →' : 'Voir mon score' }}
            </button>
          </div>
        </div>
      </template>

      <RelatedLinks />

    </main>
  </DefaultLayout>
</template>

<script setup>
import { ref, computed } from 'vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import RelatedLinks from '@/components/RelatedLinks.vue'

const items = [
  {
    sentence: "Je ne le sais pas.",
    spanish: "No lo sé.",
    words: ["Je", "ne", "le", "sais", "pas."],
    note: "En francés, los pronombres de objeto directo y la negación rodean al verbo conjugado: « Je ne le sais pas »."
  },
  {
    sentence: "Elle ne se réveille pas tôt.",
    spanish: "Ella no se despierta temprano.",
    words: ["Elle", "ne", "se", "réveille", "pas", "tôt."],
    note: "El pronombre reflexivo « se » va justo antes del verbo, y ambos se sitúan dentro de la negación « ne ... pas »."
  },
  {
    sentence: "Nous allons y aller demain.",
    spanish: "Nosotros vamos a ir allí mañana.",
    words: ["Nous", "allons", "y", "aller", "demain."],
    note: "En el futuro cercano (futur proche), el pronombre de lugar « y » se coloca antes del verbo infinitivo (aller), no de « allons »."
  },
  {
    sentence: "Je vais lui parler ce soir.",
    spanish: "Le voy a hablar esta noche.",
    words: ["Je", "vais", "lui", "parler", "ce", "soir."],
    note: "El pronombre de objeto indirecto (lui) se coloca justo delante del infinitivo (parler)."
  },
  {
    sentence: "Tu ne dois pas faire ça.",
    spanish: "No debes hacer eso.",
    words: ["Tu", "ne", "dois", "pas", "faire", "ça."],
    note: "La negación « ne ... pas » rodea al primer verbo conjugado (dois). El infinitivo (faire) va después."
  },
  {
    sentence: "Il y a beaucoup de monde.",
    spanish: "Hay mucha gente.",
    words: ["Il", "y", "a", "beaucoup", "de", "monde."],
    note: "La expresión impersonal « il y a » (hay) mantiene su orden. Se usa « beaucoup de » antes de un sustantivo."
  },
  {
    sentence: "Est-ce que tu viens avec nous ?",
    spanish: "¿Vienes con nosotros?",
    words: ["Est-ce", "que", "tu", "viens", "avec", "nous", "?"],
    note: "La estructura interrogativa « Est-ce que » se coloca siempre al principio de la frase."
  },
  {
    sentence: "Je ne comprends rien du tout.",
    spanish: "No entiendo nada en absoluto.",
    words: ["Je", "ne", "comprends", "rien", "du", "tout."],
    note: "La negación « ne ... rien » (nada) sustituye a « ne ... pas ». La frase « du tout » significa « en absoluto »."
  }
]

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

/* A sentence handed over in its original order is not a puzzle — the learner
   just taps left to right. Fisher–Yates alone still lands on the identity
   permutation (1 time in n!), so re-draw until the order actually changed. */
function shuffleWords(words) {
  if (words.length < 2) return [...words]
  let out = shuffle(words)
  for (let tries = 0; tries < 10 && out.every((w, i) => w.id === words[i].id); tries++) {
    out = shuffle(words)
  }
  return out
}

function prepareItem(item) {
  const wordObjects = item.words.map((w, index) => ({
    id: index,
    text: w
  }))
  return {
    ...item,
    shuffled: shuffleWords(wordObjects)
  }
}

const deck         = ref(shuffle(items).map(prepareItem))
const currentIndex = ref(0)
const selectedIds  = ref([])
const checked      = ref(false)
const isCorrect    = ref(false)
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
  if (pct === 1)    return 'Parfait ! Tu maîtrises parfaitement la syntaxe française.'
  if (pct >= 0.75)  return 'Très bien ! La structure des phrases est bien comprise.'
  if (pct >= 0.5)   return 'Pas mal ! Fais attention à la place des pronoms et de la négation.'
  return 'Courage ! Révise les leçons de grammaire et recommence.'
})

function getWordText(id) {
  return current.value.shuffled.find(w => w.id === id)?.text || ''
}

function selectWord(id) {
  if (checked.value) return
  if (!selectedIds.value.includes(id)) {
    selectedIds.value.push(id)
  }
}

function deselectWord(id) {
  if (checked.value) return
  selectedIds.value = selectedIds.value.filter(x => x !== id)
}

const constructedSentence = computed(() => {
  return selectedIds.value.map(getWordText).join(' ')
})

const correctSentence = computed(() => {
  return current.value.words.join(' ')
})

function verify() {
  if (checked.value) return
  const userText = constructedSentence.value.trim()
  const targetText = correctSentence.value.trim()
  
  isCorrect.value = userText === targetText
  if (isCorrect.value) {
    score.value++
  }
  checked.value = true
}

function next() {
  if (currentIndex.value < deck.value.length - 1) {
    currentIndex.value++
    selectedIds.value = []
    checked.value = false
    isCorrect.value = false
  } else {
    finished.value = true
  }
}

function restart() {
  deck.value         = shuffle(items).map(prepareItem)
  currentIndex.value = 0
  selectedIds.value  = []
  checked.value      = false
  isCorrect.value    = false
  score.value        = 0
  finished.value     = false
}
</script>

<style scoped>
#desordre-game {
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

/* ── Card & Board ──────────────────────────────── */
.card {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 1.5rem;
}

.spanish-prompt {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1.25rem;
  background: var(--clr-amber-light);
  border-left: 4px solid var(--clr-amber);
  border-radius: 0 var(--radius) var(--radius) 0;
}

.flag {
  font-size: 1.2rem;
}

.prompt-text {
  font-family: var(--font-serif);
  font-style: italic;
  font-size: 0.95rem;
  color: var(--clr-ink);
}

/* ── Target Zone ───────────────────────────────── */
.target-zone {
  min-height: 5.5rem;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  gap: 0.5rem;
  padding: 1rem;
  border: 1.5px dashed var(--clr-border);
  border-radius: var(--radius-lg);
  background: var(--clr-page);
  transition: border-color 0.2s, background-color 0.2s;
}

.target-zone.empty {
  align-items: center;
  justify-content: center;
}

.target-placeholder {
  color: var(--clr-ink-soft);
  font-size: 0.88rem;
  font-style: italic;
  text-align: center;
  width: 100%;
  pointer-events: none;
  user-select: none;
}

.target-zone.is-correct-border {
  border-color: var(--success-strong);
  background: var(--success-soft);
}

.target-zone.is-wrong-border {
  border-color: var(--clr-red);
  background: var(--clr-red-light);
}

/* ── Chips ─────────────────────────────────────── */
.chip {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 0.9rem;
  font-size: 0.95rem;
  border-radius: var(--radius-sm);
  font-family: var(--font-sans);
  background: var(--clr-page);
  border: 1px solid var(--clr-border);
  color: var(--clr-ink);
  cursor: pointer;
  box-shadow: 0 1px 3px var(--clr-shadow);
  transition: all 0.15s ease;
  user-select: none;
}

.chip:hover {
  border-color: var(--clr-blue);
  background: var(--clr-blue-light);
  color: var(--clr-blue-dark);
}

.chip:active {
  transform: translateY(1px);
}

.chip:disabled {
  cursor: default;
}

.target-chip:disabled:hover {
  border-color: var(--clr-border);
  background: var(--clr-page);
  color: var(--clr-ink);
}

.pool-zone {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
  padding: 1.25rem;
  background: var(--clr-bg);
  border-radius: var(--radius-lg);
  border: 1px solid var(--clr-border-soft);
  min-height: 5.5rem;
}

.chip-placeholder {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 0.9rem;
  font-size: 0.95rem;
  border-radius: var(--radius-sm);
  font-family: var(--font-sans);
  background: rgba(26, 26, 46, 0.03);
  border: 1px dashed var(--clr-border-soft);
  pointer-events: none;
  user-select: none;
}

/* ── Actions ───────────────────────────────────── */
.actions {
  display: flex;
  flex-direction: column;
}

.btn-verify, .btn-next {
  width: 100%;
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: var(--radius);
  font-family: var(--font-sans);
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background 0.15s, opacity 0.15s;
  text-align: center;
}

.btn-verify {
  background: var(--clr-blue);
  color: var(--text-on-accent);
}

.btn-verify:hover:not(:disabled) {
  background: var(--clr-blue-dark);
}

.btn-verify:disabled {
  background: var(--clr-ink-soft);
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-next {
  background: var(--clr-blue);
  color: var(--text-on-accent);
}

.btn-next:hover {
  background: var(--clr-blue-dark);
}

/* ── Feedback ──────────────────────────────────── */
.feedback {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem;
  background: var(--clr-page);
  border: 1px solid var(--clr-border);
  border-radius: var(--radius);
}

.feedback-correct {
  color: var(--success-text);
  font-weight: 600;
  font-size: 0.95rem;
}

.feedback-wrong-wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.feedback-wrong {
  color: var(--clr-red);
  font-weight: 600;
  font-size: 0.95rem;
}

.correct-reveal {
  font-family: var(--font-serif);
  font-size: 1.05rem;
  color: var(--clr-ink);
  margin-top: 0.25rem;
}

.correct-reveal strong {
  color: var(--clr-blue-dark);
}

.feedback-note {
  font-family: var(--font-serif);
  font-style: italic;
  font-size: 0.88rem;
  color: var(--clr-ink-mid);
  line-height: 1.5;
  margin: 0;
  padding-top: 0.4rem;
  border-top: 1px solid var(--clr-border-soft);
}

/* ── Result Screen ─────────────────────────────── */
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
  #desordre-game { display: none; }
}
</style>
