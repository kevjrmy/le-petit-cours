<!-- view-meta: created=2026-08-03; updated=2026-08-03 -->
<template>
  <DefaultLayout title="Exercice : Associe les pairs">
    <main id="pairs-game">

      <!-- ── Victoire finale / Fin du jeu ───────────── -->
      <div v-if="allRoundsCompleted" class="result">
        <div class="result-emoji">🏆</div>
        <h2 class="result-title">Félicitations !</h2>
        <p class="result-msg">Vous avez associé toutes les paires avec succès !</p>

        <div class="stars-rating" aria-label="Évaluation">
          <span v-for="star in 3" :key="star" class="star">⭐</span>
        </div>

        <p class="result-stats">Total d'essais pour toutes les manches : <strong>{{ totalMoves }}</strong></p>
        <button class="btn-restart" @click="restartGame">Recommencer le jeu</button>
      </div>

      <template v-else>
        <!-- ── En-tête de la manche ────────────────────── -->
        <div class="round-header">
          <span class="round-tag">Manche {{ currentRoundIndex + 1 }} / {{ rounds.length }}</span>
          <h2 class="round-title">{{ currentRound.title }}</h2>
          <p class="instructions">{{ currentRound.description }}</p>
        </div>

        <div class="meta">
          <div class="stat">
            <span class="stat-label">Paires :</span>
            <span class="stat-value">{{ matchedPairIds.size }} / {{ currentRound.pairs.length }}</span>
          </div>
          <div class="stat">
            <span class="stat-label">Essais :</span>
            <span class="stat-value">{{ movesCount }}</span>
          </div>
        </div>

        <!-- ── Grille 2 colonnes (Face visible) ────────── -->
        <div class="columns-container">
          <!-- Colonne A -->
          <div class="column" role="group" aria-label="Première colonne">
            <button
              v-for="card in leftCards"
              :key="card.id"
              :class="['card-btn', cardStateClass(card)]"
              :disabled="matchedPairIds.has(card.pairId) || isChecking"
              @click="selectLeft(card)"
            >
              <span class="card-text">{{ card.text }}</span>
              <span v-if="card.subtext" class="card-subtext">{{ card.subtext }}</span>
              <span v-if="matchedPairIds.has(card.pairId)" class="check-icon">✓</span>
            </button>
          </div>

          <!-- Colonne B -->
          <div class="column" role="group" aria-label="Deuxième colonne">
            <button
              v-for="card in rightCards"
              :key="card.id"
              :class="['card-btn', cardStateClass(card)]"
              :disabled="matchedPairIds.has(card.pairId) || isChecking"
              @click="selectRight(card)"
            >
              <span class="card-text">{{ card.text }}</span>
              <span v-if="card.subtext" class="card-subtext">{{ card.subtext }}</span>
              <span v-if="matchedPairIds.has(card.pairId)" class="check-icon">✓</span>
            </button>
          </div>
        </div>

        <!-- ── Bilan Manche terminée ─────────────────── -->
        <div v-if="roundFinished" class="round-summary">
          <p class="summary-msg">
            ✨ Bravo ! Vous avez associé les 8 paires en <strong>{{ movesCount }}</strong> essais !
          </p>
          <button class="btn-next" @click="nextRound">
            {{ currentRoundIndex < rounds.length - 1 ? 'Manche suivante →' : 'Voir mon bilan final' }}
          </button>
        </div>
      </template>

    </main>
  </DefaultLayout>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'

// 4 Rounds of 8 pairs each
const rounds = [
  {
    title: '1. Participes Passés (Passé composé)',
    description: 'Sélectionnez un infinitif à gauche, puis cliquez sur son participe passé à droite.',
    pairs: [
      { a: { text: 'prendre' }, b: { text: 'pris' } },
      { a: { text: 'faire' }, b: { text: 'fait' } },
      { a: { text: 'voir' }, b: { text: 'vu' } },
      { a: { text: 'pouvoir' }, b: { text: 'pu' } },
      { a: { text: 'vouloir' }, b: { text: 'voulu' } },
      { a: { text: 'écrire' }, b: { text: 'écrit' } },
      { a: { text: 'venir' }, b: { text: 'venu' } },
      { a: { text: 'avoir' }, b: { text: 'eu' } },
    ]
  },
  {
    title: '2. Formes particulières (Féminin & Pluriel)',
    description: 'Associez la forme de gauche avec sa forme correspondante à droite.',
    pairs: [
      { a: { text: 'un œil' }, b: { text: 'des yeux' } },
      { a: { text: 'un travail' }, b: { text: 'des travaux' } },
      { a: { text: 'un cheval' }, b: { text: 'des chevaux' } },
      { a: { text: 'beau' }, b: { text: 'belle' } },
      { a: { text: 'vieux' }, b: { text: 'vieille' } },
      { a: { text: 'frais' }, b: { text: 'fraîche' } },
      { a: { text: 'blanc' }, b: { text: 'blanche' } },
      { a: { text: 'nouveau' }, b: { text: 'nouvelle' } },
    ]
  },
  {
    title: '3. Les Antonymes et Adverbes A2',
    description: 'Associez chaque mot ou adverbe à gauche avec son contraire à droite.',
    pairs: [
      { a: { text: 'souvent' }, b: { text: 'rarement' } },
      { a: { text: 'toujours' }, b: { text: 'jamais' } },
      { a: { text: 'partout' }, b: { text: 'nulle part' } },
      { a: { text: 'déjà' }, b: { text: 'pas encore' } },
      { a: { text: 'gagner' }, b: { text: 'perdre' } },
      { a: { text: 'commencer' }, b: { text: 'terminer' } },
      { a: { text: 'monter' }, b: { text: 'descendre' } },
      { a: { text: 'allumer' }, b: { text: 'éteindre' } },
    ]
  },
  {
    title: '4. Expressions idiomatiques (FR ↔ ES)',
    description: 'Associez l’expression imagée française à sa traduction en espagnol.',
    pairs: [
      { a: { text: 'Avoir le cafard' }, b: { text: 'Estar deprimido/a' } },
      { a: { text: 'Poser un lapin' }, b: { text: 'Dejar plantado/a' } },
      { a: { text: 'Être dans les nuages' }, b: { text: 'Estar en las nubes' } },
      { a: { text: 'Coûter les yeux de la tête' }, b: { text: 'Costar un ojo de la cara' } },
      { a: { text: 'Avoir le coup de foudre' }, b: { text: 'Enamorarse a 1ª vista' } },
      { a: { text: 'Tomber dans les pommes' }, b: { text: 'Desmayarse' } },
      { a: { text: 'C\'est la fin des haricots' }, b: { text: 'Se acabó todo' } },
      { a: { text: 'Donner sa langue au chat' }, b: { text: 'Darse por vencido/a' } },
    ]
  }
]

const currentRoundIndex = ref(0)
const selectedLeft = ref(null)
const selectedRight = ref(null)
const matchedPairIds = ref(new Set())
const isChecking = ref(false)
const movesCount = ref(0)
const totalMoves = ref(0)
const roundFinished = ref(false)
const allRoundsCompleted = ref(false)

const currentRound = computed(() => rounds[currentRoundIndex.value])
const leftCards = ref([])
const rightCards = ref([])

function setupRound() {
  const left = []
  const right = []

  currentRound.value.pairs.forEach((pair, pairIndex) => {
    left.push({
      id: `${pairIndex}-left`,
      pairId: pairIndex,
      side: 'left',
      text: pair.a.text,
      subtext: pair.a.subtext || null
    })
    right.push({
      id: `${pairIndex}-right`,
      pairId: pairIndex,
      side: 'right',
      text: pair.b.text,
      subtext: pair.b.subtext || null
    })
  })

  // Independently shuffle both columns
  leftCards.value = left.sort(() => Math.random() - 0.5)
  rightCards.value = right.sort(() => Math.random() - 0.5)

  selectedLeft.value = null
  selectedRight.value = null
  matchedPairIds.value = new Set()
  movesCount.value = 0
  roundFinished.value = false
  isChecking.value = false
}

watch(currentRoundIndex, setupRound, { immediate: true })

function cardStateClass(card) {
  if (matchedPairIds.value.has(card.pairId)) return 'is-matched'

  const isSel = (card.side === 'left' && selectedLeft.value?.id === card.id) ||
                (card.side === 'right' && selectedRight.value?.id === card.id)

  if (isSel) {
    if (selectedLeft.value && selectedRight.value) {
      return selectedLeft.value.pairId === selectedRight.value.pairId ? 'is-matched' : 'is-wrong'
    }
    return 'is-selected'
  }
  return ''
}

function selectLeft(card) {
  if (isChecking.value || matchedPairIds.value.has(card.pairId)) return
  selectedLeft.value = card
  checkMatch()
}

function selectRight(card) {
  if (isChecking.value || matchedPairIds.value.has(card.pairId)) return
  selectedRight.value = card
  checkMatch()
}

function checkMatch() {
  if (selectedLeft.value && selectedRight.value) {
    movesCount.value++
    totalMoves.value++

    if (selectedLeft.value.pairId === selectedRight.value.pairId) {
      matchedPairIds.value.add(selectedLeft.value.pairId)
      selectedLeft.value = null
      selectedRight.value = null

      if (matchedPairIds.value.size === currentRound.value.pairs.length) {
        roundFinished.value = true
      }
    } else {
      isChecking.value = true
      setTimeout(() => {
        selectedLeft.value = null
        selectedRight.value = null
        isChecking.value = false
      }, 800)
    }
  }
}

function nextRound() {
  if (currentRoundIndex.value < rounds.length - 1) {
    currentRoundIndex.value++
  } else {
    allRoundsCompleted.value = true
  }
}

function restartGame() {
  totalMoves.value = 0
  allRoundsCompleted.value = false
  currentRoundIndex.value = 0
  setupRound()
}
</script>

<style scoped>
#pairs-game {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.round-header {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.35rem;
}

.round-tag {
  font-family: var(--font-mono);
  font-size: 0.78rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--clr-blue);
  background: var(--clr-blue-light);
  padding: 0.2rem 0.6rem;
  border-radius: 99px;
  font-weight: 700;
}

.round-title {
  font-family: var(--font-serif);
  font-size: 1.35rem;
  color: var(--clr-blue-dark);
  margin: 0.2rem 0 0;
}

.instructions {
  font-family: var(--font-serif);
  color: var(--clr-ink-mid);
  font-size: 0.95rem;
  line-height: 1.5;
  margin: 0;
}

.meta {
  display: flex;
  justify-content: center;
  gap: 2rem;
  padding: 0.6rem 1rem;
  background: var(--clr-page);
  border: 1px solid var(--clr-border);
  border-radius: var(--radius);
}

.stat {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-family: var(--font-sans);
  font-size: 0.9rem;
}

.stat-label {
  color: var(--clr-ink-soft);
}

.stat-value {
  font-weight: 700;
  color: var(--clr-blue-dark);
}

/* ── 2 Columns Container ───────────────────── */
.columns-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.25rem;
}

.column {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.card-btn {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.85rem 1rem;
  min-height: 3.2rem;
  background: var(--clr-page);
  border: 1.5px solid var(--clr-border);
  border-radius: var(--radius);
  color: var(--clr-ink);
  cursor: pointer;
  text-align: left;
  transition: border-color 0.15s ease, background 0.15s ease, transform 0.15s ease;
  user-select: none;
}

.card-btn:not(:disabled):hover {
  border-color: var(--clr-blue);
  background: var(--clr-blue-light);
}

.card-text {
  font-family: var(--font-serif);
  font-size: 1rem;
  font-weight: 600;
}

.card-subtext {
  font-family: var(--font-sans);
  font-size: 0.75rem;
  color: var(--clr-ink-soft);
}

.check-icon {
  color: #2E7D32;
  font-weight: 700;
  font-size: 1.1rem;
}

/* ── Card States ────────────────────────────── */
.card-btn.is-selected {
  border-color: var(--clr-blue);
  background: var(--clr-blue-light);
  color: var(--clr-blue-dark);
  box-shadow: 0 0 0 3px rgba(24, 84, 160, 0.2);
}

.card-btn.is-matched {
  border-color: #2E7D32;
  background: #E8F5E9;
  color: #2E7D32;
  cursor: default;
}

.card-btn.is-wrong {
  border-color: var(--clr-red);
  background: var(--clr-red-light);
  color: var(--clr-red);
  animation: shake 0.35s ease;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  20%, 60% { transform: translateX(-4px); }
  40%, 80% { transform: translateX(4px); }
}

/* ── Summary & Next Round ────────────────────── */
.round-summary {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.8rem;
  padding: 1.25rem;
  background: #E8F5E9;
  border: 1px solid #A5D6A7;
  border-radius: var(--radius);
  text-align: center;
}

.summary-msg {
  color: #2E7D32;
  font-family: var(--font-serif);
  font-size: 1.1rem;
  margin: 0;
}

.btn-next,
.btn-restart {
  padding: 0.75rem 1.5rem;
  border: 1px solid var(--clr-blue);
  border-radius: var(--radius);
  background: var(--clr-blue);
  color: var(--clr-page);
  font-weight: 700;
  font-size: 0.95rem;
  cursor: pointer;
  transition: background 0.15s, border-color 0.15s;
}

.btn-next:hover,
.btn-restart:hover {
  background: var(--clr-blue-dark);
  border-color: var(--clr-blue-dark);
}

.result {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 2.5rem 1.5rem;
  border: 1px solid var(--clr-border);
  border-radius: var(--radius);
  background: var(--clr-page);
  text-align: center;
}

.result-emoji {
  font-size: 3.5rem;
}

.stars-rating {
  font-size: 1.8rem;
}

.result-title {
  font-family: var(--font-serif);
  font-size: 1.8rem;
  color: var(--clr-blue-dark);
  margin: 0;
}

.result-msg {
  color: var(--clr-ink-mid);
  font-size: 1.05rem;
  margin: 0;
}

.result-stats {
  font-size: 1.1rem;
  color: var(--clr-ink);
}

@media (max-width: 794px) {
  .columns-container {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }

  .card-btn {
    min-height: 2.8rem;
    padding: 0.7rem 0.85rem;
  }

  .card-text {
    font-size: 0.95rem;
  }
}
</style>


