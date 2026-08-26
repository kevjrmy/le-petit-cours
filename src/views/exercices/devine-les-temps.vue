<!-- view-meta: created=2026-08-17; updated=2026-08-17 -->
<template>
  <DefaultLayout title="Exercice : Devine les temps">
    <main class="exo temps">

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
          Lisez la phrase et trouvez le temps des verbes <strong>en bleu</strong>.
          <strong>Attention&nbsp;: il peut y avoir plusieurs temps dans une même phrase.</strong>
          Sélectionnez tous ceux que vous reconnaissez.
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
          <p class="phrase">
            <span
              v-for="(part, i) in phraseParts"
              :key="i"
              :class="{ v: part.verb }"
            >{{ part.s }}</span>
          </p>
        </div>

        <div class="chips" role="group" aria-label="Temps possibles">
          <button
            v-for="t in TENSES"
            :key="t.key"
            type="button"
            class="chip"
            :class="chipState(t.key)"
            :aria-pressed="selected.includes(t.key)"
            :disabled="checked"
            @click="toggle(t.key)"
          >
            <span class="chip-mark" aria-hidden="true">{{ chipMark(t.key) }}</span>
            {{ t.label }}
          </button>
        </div>

        <p v-if="checked && missedLabels.length" class="missed-hint">
          Il manquait&nbsp;: <strong>{{ missedLabels.join(', ') }}</strong>.
        </p>

        <div v-if="checked" :class="['feedback', isCorrect ? 'feedback-correct' : 'feedback-wrong']">
          <strong>{{ isCorrect ? '✓ Bravo !' : '✗ Pas tout à fait.' }}</strong>
          <p class="feedback-note">{{ current.note }}</p>
        </div>

        <div class="actions">
          <button
            v-if="!checked"
            class="btn-verify"
            :disabled="selected.length === 0"
            @click="verify"
          >Vérifier</button>
          <button v-else class="btn-next" @click="next">
            {{ currentIndex < deck.length - 1 ? 'Phrase suivante →' : 'Voir mon score' }}
          </button>
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
import { useExerciseScore } from '@/composables/useProgress'

/* The seven tenses the course covers at A2. The list is fixed and always shown
   in the same order, so the learner reads the same board every time. */
const TENSES = [
  { key: 'present',     label: 'Présent' },
  { key: 'passe',       label: 'Passé composé' },
  { key: 'imparfait',   label: 'Imparfait' },
  { key: 'futurProche', label: 'Futur proche' },
  { key: 'futurSimple', label: 'Futur simple' },
  { key: 'imperatif',   label: 'Impératif' },
  { key: 'conditionnel',label: 'Conditionnel présent' },
]

const LABEL = Object.fromEntries(TENSES.map(t => [t.key, t.label]))

/* Verbs to analyse are wrapped in [brackets]; everything else is plain text.
   Only the conjugated verb is marked — in « vais regarder » the whole unit is
   the futur proche, in « voudrait partir » only « voudrait » carries the tense. */
const ITEMS = [
  {
    text: "Elle [travaille] à Paris et elle [aime] son travail.",
    tenses: ['present'],
    note: "Deux verbes, un seul temps. « Travaille » et « aime » décrivent une situation actuelle : c'est le présent.",
  },
  {
    text: "Hier soir, nous [avons mangé] au restaurant.",
    tenses: ['passe'],
    note: "Auxiliaire avoir au présent + participe passé = passé composé. L'action est finie (comimos).",
  },
  {
    text: "Quand j'[étais] petit, je [jouais] au football tous les jeudis.",
    tenses: ['imparfait'],
    note: "Les terminaisons -ais / -ait signalent l'imparfait : une habitude passée (era, jugaba).",
  },
  {
    text: "Ce soir, je [vais regarder] un film.",
    tenses: ['futurProche'],
    note: "Le verbe aller au présent + un infinitif = futur proche. En espagnol : voy a ver.",
  },
  {
    text: "L'année prochaine, nous [visiterons] le Portugal.",
    tenses: ['futurSimple'],
    note: "La terminaison -ons s'ajoute à l'infinitif entier (visiter + ons) : c'est le futur simple.",
  },
  {
    text: "[Ferme] la fenêtre, s'il te plaît !",
    tenses: ['imperatif'],
    note: "Un ordre ou une demande, sans sujet exprimé : l'impératif. Notez qu'il n'y a pas de « tu » devant.",
  },
  {
    text: "Il [voudrait] partir en vacances.",
    tenses: ['conditionnel'],
    note: "« Voudrait » est un conditionnel présent : il exprime un souhait, poliment (le gustaría). « Partir » reste à l'infinitif.",
  },
  {
    text: "Il [pleuvait] quand nous [sommes sortis] du cinéma.",
    tenses: ['imparfait', 'passe'],
    note: "Le décor à l'imparfait (« il pleuvait »), l'action ponctuelle au passé composé (« nous sommes sortis »). C'est le couple le plus fréquent du récit.",
  },
  {
    text: "Je [suis] fatiguée parce que j'[ai couru] ce matin.",
    tenses: ['present', 'passe'],
    note: "« Suis » décrit l'état maintenant (présent) ; « ai couru » raconte l'action terminée (passé composé).",
  },
  {
    text: "Si j'[avais] beaucoup d'argent, je [ferais] le tour du monde.",
    tenses: ['imparfait', 'conditionnel'],
    note: "Après « si » on met l'imparfait, et le résultat imaginaire va au conditionnel présent. Exactement comme en espagnol : si tuviera… haría.",
  },
  {
    text: "[Prends] ton parapluie, il [fait] froid dehors.",
    tenses: ['imperatif', 'present'],
    note: "« Prends » donne un ordre (impératif) ; « fait » décrit la météo en ce moment (présent).",
  },
  {
    text: "Je [finis] mes devoirs et après je [vais jouer] dehors.",
    tenses: ['present', 'futurProche'],
    note: "« Finis » se passe maintenant (présent) ; « vais jouer » annonce la suite immédiate (futur proche).",
  },
]

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

const deck         = ref(shuffle(ITEMS))
const currentIndex = ref(0)
const selected     = ref([])
const checked      = ref(false)
const isCorrect    = ref(false)
const score        = ref(0)
const finished     = ref(false)

const current = computed(() => deck.value[currentIndex.value])

const progressPct = computed(() => ((currentIndex.value + 1) / deck.value.length) * 100)

/** Split the phrase on [brackets] into plain and verb parts. */
const phraseParts = computed(() =>
  current.value.text
    .split(/(\[[^\]]+\])/)
    .filter(Boolean)
    .map(s => (s.startsWith('[') ? { verb: true, s: s.slice(1, -1) } : { verb: false, s }))
)

const missedLabels = computed(() =>
  current.value.tenses.filter(k => !selected.value.includes(k)).map(k => LABEL[k])
)

function toggle(key) {
  if (checked.value) return
  const i = selected.value.indexOf(key)
  if (i === -1) selected.value.push(key)
  else selected.value.splice(i, 1)
}

/* Before checking: only "on"/off. After: right, wrong, or missed — the three
   states a multi-answer question needs, since forgetting one is its own mistake. */
function chipState(key) {
  const picked = selected.value.includes(key)
  if (!checked.value) return picked ? 'on' : ''
  const wanted = current.value.tenses.includes(key)
  if (picked && wanted) return 'ok'
  if (picked && !wanted) return 'ko'
  if (!picked && wanted) return 'missed'
  return ''
}

function chipMark(key) {
  const state = chipState(key)
  if (state === 'ok') return '✓'
  if (state === 'ko') return '✗'
  if (state === 'missed') return '+'
  return state === 'on' ? '●' : '○'
}

function verify() {
  if (checked.value || selected.value.length === 0) return
  const want = [...current.value.tenses].sort().join()
  const got  = [...selected.value].sort().join()
  isCorrect.value = want === got
  if (isCorrect.value) score.value++
  checked.value = true
}

function next() {
  if (currentIndex.value < deck.value.length - 1) {
    currentIndex.value++
    selected.value = []
    checked.value  = false
    isCorrect.value = false
  } else {
    finished.value = true
  }
}

function restart() {
  deck.value = shuffle(ITEMS)
  currentIndex.value = 0
  selected.value = []
  checked.value  = false
  isCorrect.value = false
  score.value = 0
  finished.value = false
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
  if (pct === 1)   return 'Parfait ! Tu reconnais tous les temps, même quand il y en a deux.'
  if (pct >= 0.75) return 'Très bien ! Surveille les phrases qui mélangent deux temps.'
  if (pct >= 0.5)  return "Pas mal. Revois le couple imparfait + passé composé, c'est le plus fréquent."
  return 'Relis les leçons de grammaire sur les temps, puis réessaie.'
})

useExerciseScore(finished, () => ({ correct: score.value, total: deck.value.length }))
</script>

<style scoped>
/* Only the exercise's own body is styled here — instructions, progress, card,
   feedback, actions and the score screen all come from `.exo` in style.css. */
.phrase {
  margin: 0;
  font-family: var(--font-serif);
  font-size: 1.15rem;
  line-height: 1.7;
  color: var(--text-1);
}

/* The verbs to analyse. Same blue as a conjugation terminaison — it means
   "this is the form to look at" in both places. */
.phrase .v {
  color: var(--accent-text);
  font-weight: 700;
}

.chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.chip {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.5rem 0.9rem;
  border: 1.5px solid var(--border);
  border-radius: var(--radius);
  background: var(--surface-1);
  color: var(--text-2);
  font-family: var(--font-sans);
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: border-color 0.15s, background 0.15s, color 0.15s;
}

.chip:hover:not(:disabled):not(.on) {
  border-color: var(--accent);
  color: var(--text-1);
}

.chip:disabled { cursor: default; }

.chip-mark {
  font-size: 0.9em;
  opacity: 0.85;
}

.chip.on {
  border-color: var(--accent);
  background: var(--accent-soft);
  color: var(--accent-text);
}

/* After checking — the three outcomes. `missed` is amber rather than red: a
   tense the learner failed to tick is an omission, not a wrong answer. */
.chip.ok {
  border-color: var(--success);
  background: var(--success-soft);
  color: var(--success-text);
}

.chip.ko {
  border-color: var(--danger);
  background: var(--danger-soft);
  color: var(--danger-text);
}

.chip.missed {
  border-color: var(--warn);
  background: var(--warn-soft);
  color: var(--warn-text);
  border-style: dashed;
}

.missed-hint {
  margin: 0;
  font-size: 0.85rem;
  color: var(--text-2);
}
</style>
