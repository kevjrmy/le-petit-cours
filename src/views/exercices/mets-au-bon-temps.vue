<!-- view-meta: created=2026-08-17; updated=2026-08-17 -->
<template>
  <DefaultLayout title="Exercice : Mets au bon temps">
    <main class="exo conjugue">

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
          Écrivez le verbe à la forme demandée. L'infinitif et le temps sont indiqués
          après chaque trou. <strong>Attention aux accents</strong> — ils font partie de
          la conjugaison.
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
          <p class="sentence">
            <template v-for="(part, i) in current.parts" :key="i">
              <span v-if="!part.blank">{{ part.text }}</span>

              <span v-else class="slot">
                <input
                  v-model="answers[part.n]"
                  type="text"
                  class="slot-input"
                  :class="slotState(part)"
                  :disabled="checked"
                  :aria-label="`${part.verb} au ${part.tense}`"
                  autocomplete="off"
                  autocapitalize="off"
                  spellcheck="false"
                  @keyup.enter="verify"
                />
                <span class="slot-hint">({{ part.verb }}, {{ part.tense }})</span>
                <span v-if="checked && !isBlankRight(part)" class="slot-fix">
                  → {{ part.answers[0] }}
                </span>
              </span>
            </template>
          </p>
        </div>

        <div v-if="checked" :class="['feedback', isCorrect ? 'feedback-correct' : 'feedback-wrong']">
          <strong>{{ isCorrect ? '✓ Tout est juste !' : '✗ Pas encore.' }}</strong>
          <p class="feedback-note">{{ current.note }}</p>
        </div>

        <div class="actions">
          <button
            v-if="!checked"
            class="btn-verify"
            :disabled="!allFilled"
            @click="verify"
          >Vérifier</button>
          <button v-else class="btn-next" @click="next">
            {{ currentIndex < deck.length - 1 ? 'Phrase suivante →' : 'Voir mon score' }}
          </button>
        </div>
      </template>

    </main>
  </DefaultLayout>
</template>

<script setup>
import { ref, computed } from 'vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'

/* Each sentence is one template string. A blank is {infinitif|temps|réponses},
   and several accepted spellings are separated by `/` — the first one is what
   the correction shows.
   Elision lives in the surrounding text (`j'{…}`), never in the answer, so the
   learner types only the verb form. */
const ITEMS = [
  {
    s: "Hier, j'{manger|passé composé|ai mangé} une pizza.",
    note: "Passé composé : auxiliaire avoir au présent + participe passé. « Manger » donne « mangé ».",
  },
  {
    s: "Quand j'étais petit, je {jouer|imparfait|jouais} au football.",
    note: "Imparfait, 1re personne : radical du présent « nous jouons » + -ais.",
  },
  {
    s: "Ce soir, je {regarder|futur proche|vais regarder} un film.",
    note: "Futur proche = aller au présent + infinitif. Le verbe principal ne se conjugue pas.",
  },
  {
    s: "L'année prochaine, ils {visiter|futur simple|visiteront} Paris.",
    note: "Futur simple : la terminaison s'ajoute à l'infinitif entier — visiter + ont.",
  },
  {
    s: "{fermer|impératif (tu)|Ferme} la porte, s'il te plaît !",
    note: "Impératif 2e personne d'un verbe en -er : pas de -s final, et pas de sujet devant.",
  },
  {
    s: "Si j'avais le temps, je {voyager|conditionnel présent|voyagerais} plus souvent.",
    note: "Après « si » + imparfait, le résultat va au conditionnel : infinitif + -ais.",
  },
  {
    s: "Il {pleuvoir|imparfait|pleuvait} quand nous {sortir|passé composé|sommes sortis/sommes sorties} du cinéma.",
    note: "Le décor à l'imparfait, l'action ponctuelle au passé composé. « Sortir » se conjugue avec être : le participe s'accorde avec « nous ».",
  },
  {
    s: "Je {être|présent|suis} fatigué parce que j'{travailler|passé composé|ai travaillé} toute la journée.",
    note: "Un état maintenant (présent) et une action terminée (passé composé) dans la même phrase.",
  },
  {
    s: "Quand elle {arriver|passé composé|est arrivée}, tout le monde {dormir|imparfait|dormait}.",
    note: "« Arriver » se conjugue avec être, donc le participe s'accorde avec « elle » : arrivée. « Tout le monde » est singulier.",
  },
  {
    s: "Aujourd'hui, je {finir|présent|finis} mes devoirs, puis je {sortir|futur proche|vais sortir}.",
    note: "Présent du 2e groupe (je finis), puis futur proche pour ce qui suit immédiatement.",
  },
  {
    s: "{prendre|impératif (tu)|Prends} ton manteau, il {faire|présent|fait} froid dehors.",
    note: "Impératif de prendre : « prends », avec le -s. « Faire » au présent, 3e personne : fait.",
  },
  {
    s: "Si tu {avoir|imparfait|avais} de l'argent, tu {acheter|conditionnel présent|achèterais} une voiture.",
    note: "Même structure « si » + imparfait → conditionnel. Notez l'accent grave : achèterais.",
  },
]

/** Turn a template string into renderable parts, numbering the blanks. */
function parse(s) {
  let n = 0
  return s
    .split(/(\{[^}]+\})/)
    .filter(Boolean)
    .map(chunk => {
      if (!chunk.startsWith('{')) return { blank: false, text: chunk }
      const [verb, tense, answers] = chunk.slice(1, -1).split('|')
      return { blank: true, n: n++, verb, tense, answers: answers.split('/') }
    })
}

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function buildDeck() {
  return shuffle(ITEMS).map(item => {
    const parts = parse(item.s)
    return { ...item, parts, blanks: parts.filter(p => p.blank) }
  })
}

const deck         = ref(buildDeck())
const currentIndex = ref(0)
const answers      = ref([])
const checked      = ref(false)
const isCorrect    = ref(false)
const score        = ref(0)
const finished     = ref(false)

const current = computed(() => deck.value[currentIndex.value])
const progressPct = computed(() => ((currentIndex.value + 1) / deck.value.length) * 100)

const allFilled = computed(() =>
  current.value.blanks.every(b => (answers.value[b.n] ?? '').trim() !== '')
)

/* Case- and spacing-tolerant, apostrophes normalised — but deliberately
   ACCENT-SENSITIVE: « achèterais » without its accent is a spelling mistake,
   and this exercise exists to catch exactly that. */
function clean(str) {
  return (str ?? '')
    .toLowerCase()
    .trim()
    .replace(/[’']/g, "'")
    .replace(/\s+/g, ' ')
}

function isBlankRight(part) {
  return part.answers.some(a => clean(a) === clean(answers.value[part.n]))
}

function slotState(part) {
  if (!checked.value) return ''
  return isBlankRight(part) ? 'ok' : 'ko'
}

function verify() {
  if (checked.value || !allFilled.value) return
  isCorrect.value = current.value.blanks.every(isBlankRight)
  if (isCorrect.value) score.value++
  checked.value = true
}

function next() {
  if (currentIndex.value < deck.value.length - 1) {
    currentIndex.value++
    answers.value = []
    checked.value = false
    isCorrect.value = false
  } else {
    finished.value = true
  }
}

function restart() {
  deck.value = buildDeck()
  currentIndex.value = 0
  answers.value = []
  checked.value = false
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
  if (pct === 1)   return 'Parfait ! Les formes et les accents sont maîtrisés.'
  if (pct >= 0.75) return 'Très bien ! Relisez les participes passés qui s\'accordent.'
  if (pct >= 0.5)  return "Bon travail. Revoyez les tableaux de conjugaison, puis réessayez."
  return 'Ouvrez le chapitre Conjugaison à côté et refaites l\'exercice tranquillement.'
})
</script>

<style scoped>
/* Only the sentence body is styled here; the rest comes from `.exo`. */
.sentence {
  margin: 0;
  font-family: var(--font-serif);
  font-size: 1.1rem;
  line-height: 2.4;
  color: var(--text-1);
}

.slot {
  display: inline-flex;
  align-items: baseline;
  gap: 0.3rem;
  white-space: nowrap;
}

/* Every input is the same width on purpose: sizing it to its answer would
   leak how long the expected form is. */
.slot-input {
  width: 9rem;
  padding: 0.25rem 0.5rem;
  border: none;
  border-bottom: 2px solid var(--border-strong);
  border-radius: 0;
  background: var(--surface-2);
  color: var(--text-1);
  font-family: var(--font-serif);
  font-size: 1rem;
  transition: border-color 0.15s, background 0.15s;
}

.slot-input:focus {
  outline: none;
  border-bottom-color: var(--accent);
  background: var(--accent-subtle);
}

.slot-input:disabled { opacity: 1; }

.slot-input.ok {
  border-bottom-color: var(--success);
  background: var(--success-soft);
  color: var(--success-text);
}

.slot-input.ko {
  border-bottom-color: var(--danger);
  background: var(--danger-soft);
  color: var(--danger-text);
  text-decoration: line-through;
}

.slot-hint {
  font-family: var(--font-sans);
  font-size: 0.72rem;
  font-style: normal;
  color: var(--text-3);
  white-space: nowrap;
}

.slot-fix {
  font-family: var(--font-serif);
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--success-text);
  white-space: nowrap;
}

@media (max-width: 560px) {
  .slot { white-space: normal; }
  .slot-input { width: 7rem; }
}
</style>
