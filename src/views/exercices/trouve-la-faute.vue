<!-- view-meta: created=2026-08-10; updated=2026-08-10 -->
<template>
  <DefaultLayout title="Exercice : Trouve la faute">
    <main class="exo">

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
          Chaque phrase contient <strong>une seule faute</strong>.
          Cliquez sur le mot incorrect, puis écrivez la correction.
        </p>

        <div class="meta">
          <span class="counter">{{ currentIndex + 1 }}&thinsp;/&thinsp;{{ deck.length }}</span>
          <div
            class="progress-track"
            role="progressbar"
            :aria-valuenow="currentIndex + 1"
            :aria-valuemax="deck.length"
            aria-label="Progression"
          >
            <div class="progress-fill" :style="{ width: progressPct + '%' }"></div>
          </div>
        </div>

        <div class="card">
          <!-- Indice en espagnol -->
          <div class="spanish-prompt">
            <span class="flag" aria-hidden="true">🇪🇸</span>
            <span class="prompt-text">{{ current.spanish }}</span>
          </div>

          <!-- Phrase cliquable -->
          <p class="sentence" role="group" aria-label="Phrase à corriger">
            <button
              v-for="(w, i) in current.words"
              :key="i"
              class="word"
              :class="wordClass(i)"
              :disabled="checked"
              :aria-pressed="picked === i"
              @click="pick(i)"
            >{{ w }}</button>
          </p>

          <!-- Correction -->
          <div v-if="picked !== null" class="fix">
            <label class="fix-label" :for="'fix-' + currentIndex">
              Remplacez «&nbsp;<strong>{{ current.words[picked] }}</strong>&nbsp;» par&nbsp;:
            </label>
            <input
              :id="'fix-' + currentIndex"
              ref="fixInput"
              v-model="typed"
              class="fix-input"
              type="text"
              autocomplete="off"
              autocapitalize="off"
              spellcheck="false"
              :disabled="checked"
              @keydown.enter.prevent="verify"
            />
          </div>

          <!-- Feedback -->
          <div v-if="checked" class="feedback">
            <span v-if="isCorrect" class="feedback-correct">✓ Exact !</span>
            <div v-else>
              <span class="feedback-wrong">✗ Ce n'est pas ça.</span>
              <p class="correct-reveal">
                La bonne réponse&nbsp;:
                <strong>{{ current.words[current.badIndex] }}</strong>
                <span class="arrow" aria-hidden="true"> → </span>
                <strong class="good">{{ current.fix }}</strong>
              </p>
            </div>
            <p class="feedback-note">{{ current.note }}</p>
          </div>

          <!-- Actions -->
          <div class="actions">
            <button
              v-if="!checked"
              class="btn-verify"
              :disabled="picked === null || !typed.trim()"
              @click="verify"
            >
              Vérifier
            </button>
            <button v-else class="btn-next" @click="next">
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
import { ref, computed, nextTick } from 'vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import RelatedLinks from '@/components/RelatedLinks.vue'

/**
 * Error correction. Each item has exactly one wrong word: `badIndex` points at
 * it and `fix` is the correction. The learner must both *locate* the mistake
 * and *produce* the right form — no options to pick from.
 *
 * Mistakes are the ones hispanophones actually make, drawn from the grammar
 * chapter: contractions (à+le), avoir/être at the passé composé, adjective
 * position, y/en, the "si + imparfait" rule, prepositions with countries.
 */
const items = [
  {
    words: ['Je', 'suis', 'allé', 'à', 'cinéma', 'hier.'],
    badIndex: 3, fix: 'au',
    spanish: 'Fui al cine ayer.',
    note: 'Falta el artículo : « à » + « le » se contraen siempre en « au ». Nunca se escribe « à le ».',
  },
  {
    words: ['Elle', 'a', 'allée', 'à', 'Paris', 'en', 'train.'],
    badIndex: 1, fix: 'est',
    spanish: 'Ella fue a París en tren.',
    note: '« aller » forma el passé composé con « être », no con « avoir » : elle est allée.',
  },
  {
    words: ['Nous', 'avons', 'mangé', 'une', 'pizza', 'délicieux', 'hier.'],
    badIndex: 5, fix: 'délicieuse',
    spanish: 'Ayer comimos una pizza deliciosa.',
    note: 'El adjetivo concuerda con « pizza », que es femenino : délicieuse.',
  },
  {
    words: ['Je', 'vais', 'à', 'Portugal', 'cet', 'été.'],
    badIndex: 2, fix: 'au',
    spanish: 'Voy a Portugal este verano.',
    note: '« le Portugal » es masculino, así que se dice « au Portugal ». Con países femeninos : « en France ».',
  },
  {
    words: ['Tu', 'ne', 'manges', 'pas', 'du', 'pain.'],
    badIndex: 4, fix: 'de',
    spanish: 'No comes pan.',
    note: 'En negativa, el partitivo « du / de la / des » se convierte en « de » : « pas de pain ».',
  },
  {
    words: ['Si', "j'aurais", 'le', 'temps,', 'je', 'viendrais.'],
    badIndex: 1, fix: "j'avais",
    spanish: 'Si tuviera tiempo, vendría.',
    note: 'Después de « si » se usa el imparfait, nunca el condicional : « Si j\'avais… je viendrais ».',
  },
  {
    words: ['Elle', 'a', 'une', 'grand', 'maison', 'à', 'Lyon.'],
    badIndex: 3, fix: 'grande',
    spanish: 'Ella tiene una casa grande en Lyon.',
    note: '« maison » es femenino, así que el adjetivo concuerda : une grande maison.',
  },
  {
    words: ['Je', 'vais', 'voir-le', 'demain', 'matin.'],
    badIndex: 2, fix: 'le voir',
    spanish: 'Voy a verlo mañana por la mañana.',
    note: 'En francés el pronombre nunca se pega al infinitivo : « je vais le voir ».',
  },
  {
    words: ['Il', 'sont', 'huit', 'heures', 'et', 'demie.'],
    badIndex: 1, fix: 'est',
    spanish: 'Son las ocho y media.',
    note: 'En español dices « son las ocho », en plural. En francés siempre es singular : « il est ».',
  },
  {
    words: ['Tu', 'vas', 'à', 'la', 'gare', '?', 'Oui,', 'je', 'vais.'],
    badIndex: 7, fix: "j'y",
    spanish: '¿Vas a la estación? Sí, voy.',
    note: 'En español no se dice nada, pero en francés « y » es obligatorio : « Oui, j\'y vais ».',
  },
]

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5)
}

const deck         = ref(shuffle(items))
const currentIndex = ref(0)
const picked       = ref(null)
const typed        = ref('')
const checked      = ref(false)
const isCorrect    = ref(false)
const score        = ref(0)
const finished     = ref(false)
const fixInput     = ref(null)   // template ref on the correction input

const current = computed(() => deck.value[currentIndex.value])

const progressPct = computed(() =>
  ((currentIndex.value + 1) / deck.value.length) * 100
)

const resultEmoji = computed(() => {
  const pct = score.value / deck.value.length
  if (pct === 1)   return '🏆'
  if (pct >= 0.75) return '🎉'
  if (pct >= 0.5)  return '👍'
  return '💪'
})

const resultMsg = computed(() => {
  const pct = score.value / deck.value.length
  if (pct === 1)   return "Parfait ! Tu as l'œil d'un correcteur."
  if (pct >= 0.75) return 'Très bien ! Tu repères la plupart des fautes.'
  if (pct >= 0.5)  return 'Pas mal ! Relis les leçons de grammaire et recommence.'
  return 'Courage ! Ces fautes sont les plus fréquentes — révise et réessaie.'
})

/** Accent- and case-insensitive, so a missing accent is not counted wrong. */
function normalize(s) {
  return (s || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[.,!?]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

function pick(i) {
  if (checked.value) return
  picked.value = i
  typed.value = ''
  nextTick(() => fixInput.value?.focus())
}

function wordClass(i) {
  if (!checked.value) return picked.value === i ? 'is-picked' : ''
  if (i === current.value.badIndex) return 'is-target'
  if (picked.value === i) return 'is-missed'
  return ''
}

function verify() {
  if (checked.value || picked.value === null || !typed.value.trim()) return
  isCorrect.value =
    picked.value === current.value.badIndex &&
    normalize(typed.value) === normalize(current.value.fix)
  if (isCorrect.value) score.value++
  checked.value = true
}

function next() {
  if (currentIndex.value < deck.value.length - 1) {
    currentIndex.value++
    picked.value = null
    typed.value = ''
    checked.value = false
    isCorrect.value = false
  } else {
    finished.value = true
  }
}

function restart() {
  deck.value = shuffle(items)
  currentIndex.value = 0
  picked.value = null
  typed.value = ''
  checked.value = false
  isCorrect.value = false
  score.value = 0
  finished.value = false
}
</script>

<style scoped>
/* ── Indice espagnol ───────────────────────────── */
.spanish-prompt {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.6rem 0.9rem;
  background: var(--surface-2);
  border: 1px solid var(--border-soft);
  border-radius: var(--radius);
  font-family: var(--font-serif);
  font-style: italic;
  font-size: 0.88rem;
  color: var(--text-2);
}

.flag { font-style: normal; }

/* ── Phrase cliquable ──────────────────────────── */
.sentence {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 0.3rem;
  margin: 0;
  font-family: var(--font-serif);
}

.word {
  padding: 0.3rem 0.5rem;
  border-radius: var(--radius-sm);
  border: 1px solid transparent;
  background: transparent;
  font-family: var(--font-serif);
  font-size: 1.05rem;
  font-weight: 400;
  color: var(--text-1);
  transition: background var(--dur-fast) ease, border-color var(--dur-fast) ease;
}

.word:hover:not(:disabled) {
  background: var(--accent-soft);
  border-color: var(--accent-line);
}

.word.is-picked {
  background: var(--accent-soft);
  border-color: var(--accent);
  font-weight: 700;
  color: var(--accent-text);
}

/* After checking: the real mistake, and a wrong guess. */
.word.is-target {
  background: var(--success-soft);
  border-color: var(--success-strong);
  color: var(--success-text);
  font-weight: 700;
}

.word.is-missed {
  background: var(--danger-soft);
  border-color: var(--danger);
  color: var(--danger-text);
  text-decoration: line-through;
}

.word:disabled { cursor: default; }

/* ── Correction ────────────────────────────────── */
.fix {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.fix-label {
  font-family: var(--font-sans);
  font-size: 0.85rem;
  color: var(--text-2);
}

.fix-input {
  width: min(100%, 18rem);
  padding: 0.6rem 0.85rem;
  border: 1.5px solid var(--border);
  border-radius: var(--radius);
  background: var(--surface-1);
  color: var(--text-1);
  font-family: var(--font-mono);
  font-size: 0.95rem;
  text-align: center;
}

.fix-input:focus {
  outline: none;
  border-color: var(--accent);
  box-shadow: 0 0 0 3px var(--accent-soft);
}

.correct-reveal {
  margin: 0.35rem 0 0;
  font-family: var(--font-serif);
  font-size: 0.95rem;
  color: var(--text-1);
}

.correct-reveal .good { color: var(--success-text); }
.arrow { color: var(--text-3); }
</style>
