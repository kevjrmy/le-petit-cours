<!-- view-meta: created=2026-08-26; updated=2026-08-26 -->
<template>
  <DefaultLayout title="Exercice : Le bon pronom">
    <main class="exo pronoms">

      <!-- ── Écran de départ ──────────────────────── -->
      <div v-if="phase === 'ready'" class="ready">
        <div class="ready-emoji" aria-hidden="true">⏱️</div>
        <p class="instructions">
          <strong>Une minute, un maximum de phrases.</strong> Choisissez le pronom qui
          complète la phrase&nbsp;: la traduction espagnole sous chaque phrase vous dit
          de qui on parle. La correction est immédiate et on enchaîne tout seul.
        </p>
        <button class="btn-verify" @click="start">Commencer les 60 secondes</button>
      </div>

      <!-- ── Résultat final ───────────────────────── -->
      <div v-else-if="phase === 'finished'" class="result">
        <div class="result-emoji">{{ resultEmoji }}</div>
        <div class="result-score">{{ score }}<span class="result-total"> / {{ attempts }}</span></div>
        <p class="result-msg">{{ resultMsg }}</p>
        <button class="btn-restart" @click="restart">Rejouer</button>
      </div>

      <!-- ── Manche chronométrée ──────────────────── -->
      <template v-else>
        <div class="meta">
          <span class="counter" role="timer" aria-live="off">{{ timeLeft }}&thinsp;s</span>
          <div
            class="progress-track"
            role="progressbar"
            :aria-valuenow="timeLeft"
            :aria-valuemax="DURATION"
            aria-label="Temps restant"
          >
            <div class="progress-fill" :class="{ urgent: timeLeft <= 10 }" :style="{ width: timePct + '%' }"></div>
          </div>
          <span class="tally">{{ score }} ✓</span>
        </div>

        <div class="card">
          <p class="sentence">
            {{ current.before }}<span class="blank" :class="blankState">{{ blankText }}</span>{{ current.after }}
          </p>
          <p class="cue">{{ current.cue }}</p>
        </div>

        <div class="pool" role="group" aria-label="Choisissez un pronom">
          <button
            v-for="p in POOL"
            :key="p"
            type="button"
            class="chip"
            :class="chipState(p)"
            :disabled="picked !== null"
            :aria-label="`Répondre : ${p}`"
            @click="pick(p)"
          >{{ p }}</button>
        </div>

        <div v-if="picked !== null" :class="['feedback', isRight ? 'feedback-correct' : 'feedback-wrong']">
          <strong>{{ isRight ? '✓ Oui !' : `✗ C'était « ${current.answer} »` }}</strong>
          <p class="feedback-note">{{ current.note }}</p>
        </div>
      </template>

      <RelatedLinks />

    </main>
  </DefaultLayout>
</template>

<script setup>
import { ref, computed, onUnmounted } from 'vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import RelatedLinks from '@/components/RelatedLinks.vue'

/* The nine pronouns stay on screen the whole round: the learner recalls the form
   instead of picking from four options tailored to the sentence. */
const POOL = ['me', 'te', 'le', 'la', 'lui', 'leur', 'moi', 'toi', 'eux']

const DURATION = 60

/* `s` carries a single ___ blank. `cue` is the Spanish gloss and is what makes
   each item unambiguous — without it, « il ___ prend dans ses bras » accepts
   both me and te. Every sentence avoids a vowel after the blank, so no answer
   is ever the elided form (m', t', l'). */
const ITEMS = [
  // ── COD : le / la
  { s: "Tu vois Marie ? — Oui, je ___ vois.", cue: "la veo", answer: 'la',
    note: "Marie est complément direct, féminin singulier : la." },
  { s: "Tu regardes le film ? — Oui, je ___ regarde.", cue: "lo veo", answer: 'le',
    note: "« Le film » est complément direct, masculin : le." },
  { s: "J'aime ce livre, je ___ lis chaque soir.", cue: "lo leo", answer: 'le',
    note: "Lire quelque chose : complément direct, masculin → le." },
  { s: "Cette chanson est belle, je ___ chante souvent.", cue: "la canto", answer: 'la',
    note: "« La chanson » est féminin : je la chante." },
  { s: "Tu connais ma sœur ? — Non, je ne ___ connais pas.", cue: "no la conozco", answer: 'la',
    note: "À la forme négative le pronom reste devant le verbe : ne la connais pas." },

  // ── COI : lui / leur
  { s: "Sophie est là : il ___ parle tous les jours.", cue: "le habla (a ella)", answer: 'lui',
    note: "Parler À quelqu'un : complément indirect. Lui sert pour il et pour elle." },
  { s: "Mes parents attendent : je ___ téléphone le dimanche.", cue: "les llamo (a ellos)", answer: 'leur',
    note: "Téléphoner À plusieurs personnes : leur, sans -s jamais." },
  { s: "Son frère écoute : elle ___ dit la vérité.", cue: "le dice (a él)", answer: 'lui',
    note: "Dire quelque chose À quelqu'un : le complément indirect est lui." },
  { s: "Nos amis sont loin : nous ___ écrivons souvent.", cue: "les escribimos", answer: 'leur',
    note: "Leur ne s'élide pas : nous leur écrivons, même devant une voyelle." },
  { s: "Tu donnes le livre à Paul ? — Oui, je ___ donne le livre.", cue: "se lo doy (a él)", answer: 'lui',
    note: "Le livre est déjà là : le pronom remplace « à Paul », donc lui." },
  { s: "Leurs mères sont contentes : ils ___ offrent des fleurs.", cue: "les ofrecen", answer: 'leur',
    note: "Offrir quelque chose À plusieurs personnes : leur." },

  // ── me / te
  { s: "Il ___ prend dans ses bras.", cue: "me toma (a mí)", answer: 'me',
    note: "Le vers de Piaf : il me prend. Le pronom se place avant le verbe, comme en espagnol." },
  { s: "Tu ___ parles tout bas.", cue: "me hablas (a mí)", answer: 'me',
    note: "Parler à moi → me. Même position qu'en espagnol : « me hablas »." },
  { s: "Je ___ vois demain à midi.", cue: "te veo (a ti)", answer: 'te',
    note: "Voir toi → te, devant le verbe." },
  { s: "Elle ___ dit toujours la vérité.", cue: "te dice (a ti)", answer: 'te',
    note: "Dire à toi → te. Avec « à moi » ce serait me." },

  // ── Pronoms toniques, après une préposition
  { s: "C'est lui pour ___, moi pour lui.", cue: "él para mí", answer: 'moi',
    note: "Après une préposition on n'utilise jamais je, mais moi." },
  { s: "Je vais au cinéma avec ___.", cue: "con ellos", answer: 'eux',
    note: "Avec + eux : la forme tonique du pluriel masculin, jamais ils." },
  { s: "Ce cadeau est pour ___.", cue: "para ti", answer: 'toi',
    note: "Pour + toi, jamais « pour tu »." },
  { s: "Elle habite chez ___.", cue: "en casa de él", answer: 'lui',
    note: "Chez + lui. Lui est aussi la forme tonique du masculin singulier." },
  { s: "Tu viens avec ___ ?", cue: "conmigo", answer: 'moi',
    note: "Avec + moi. L'espagnol soude le mot (conmigo), le français non." },
  { s: "Sans ___, la vie est triste.", cue: "sin ti", answer: 'toi',
    note: "Sans + toi : après une préposition, toujours la forme tonique." },
  { s: "Ils partent sans ___.", cue: "sin ellos", answer: 'eux',
    note: "Sans + eux, jamais « sans ils »." },
]

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
    const [before, after] = item.s.split('___')
    return { ...item, before, after }
  })
}

const phase    = ref('ready')   // ready · playing · finished
const deck     = ref(buildDeck())
const cursor   = ref(0)
const picked   = ref(null)
const score    = ref(0)
const attempts = ref(0)
const timeLeft = ref(DURATION)

let tick = null      // the one-second countdown
let advance = null   // the pause that lets the learner read the correction

const current  = computed(() => deck.value[cursor.value])
const timePct  = computed(() => (timeLeft.value / DURATION) * 100)
const isRight  = computed(() => picked.value === current.value.answer)

const blankText  = computed(() => (picked.value === null ? '?' : picked.value))
const blankState = computed(() => {
  if (picked.value === null) return ''
  return isRight.value ? 'ok' : 'ko'
})

function chipState(p) {
  if (picked.value === null) return ''
  if (p === current.value.answer) return 'ok'
  if (p === picked.value) return 'ko'
  return 'muted'
}

function start() {
  phase.value = 'playing'
  tick = setInterval(() => {
    timeLeft.value--
    if (timeLeft.value <= 0) stop()
  }, 1000)
}

/* Both timers are cleared here and on unmount: a round left running would keep
   ticking — and firing its advance — after the learner navigates away. */
function stop() {
  clearInterval(tick); tick = null
  clearTimeout(advance); advance = null
  timeLeft.value = 0
  phase.value = 'finished'
}

onUnmounted(() => {
  clearInterval(tick)
  clearTimeout(advance)
})

function pick(p) {
  if (phase.value !== 'playing' || picked.value !== null) return
  picked.value = p
  attempts.value++
  if (p === current.value.answer) score.value++

  // A wrong answer gets longer on screen — that is when the note is read.
  advance = setTimeout(() => {
    advance = null
    if (phase.value !== 'playing') return
    picked.value = null
    cursor.value++
    // The deck is a loop: a fast learner must never run out of sentences.
    if (cursor.value >= deck.value.length) {
      deck.value = buildDeck()
      cursor.value = 0
    }
  }, p === current.value.answer ? 550 : 1400)
}

function restart() {
  clearInterval(tick); tick = null
  clearTimeout(advance); advance = null
  deck.value = buildDeck()
  cursor.value = 0
  picked.value = null
  score.value = 0
  attempts.value = 0
  timeLeft.value = DURATION
  phase.value = 'ready'
}

/* Scored on accuracy, not on volume: rushing through twenty sentences with half
   of them wrong is not a better round than eight clean ones. */
const accuracy = computed(() => (attempts.value === 0 ? 0 : score.value / attempts.value))

const resultEmoji = computed(() => {
  if (attempts.value === 0) return '⏱️'
  if (accuracy.value === 1)    return '🏆'
  if (accuracy.value >= 0.75)  return '🎉'
  if (accuracy.value >= 0.5)   return '👍'
  return '💪'
})

const resultMsg = computed(() => {
  if (attempts.value === 0) return "Le temps est passé sans une seule réponse — relancez la manche."
  if (accuracy.value === 1)   return `Sans faute, et ${attempts.value} phrases en une minute. Les pronoms sont automatiques.`
  if (accuracy.value >= 0.75) return 'Très bien ! Regardez encore la différence entre lui (une personne) et leur (plusieurs).'
  if (accuracy.value >= 0.5)  return "Bon rythme. Revoyez la leçon sur les pronoms COD et COI, puis rejouez."
  return "Ouvrez la leçon des pronoms à côté et rejouez sans regarder l'heure."
})
</script>

<style scoped>
/* Only the board is styled here; the rest comes from `.exo`. */
.ready {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.1rem;
  text-align: center;
  padding: 2rem 1.5rem;
}

.ready-emoji { font-size: 3rem; line-height: 1; }
.ready .instructions { max-width: 34rem; }

.meta { align-items: center; }

.tally {
  font-family: var(--font-sans);
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--success-text);
  white-space: nowrap;
}

.progress-fill.urgent { background: var(--danger); }

.sentence {
  margin: 0;
  font-family: var(--font-serif);
  font-size: 1.15rem;
  line-height: 2;
  color: var(--text-1);
}

.blank {
  display: inline-block;
  min-width: 3.5rem;
  padding: 0 0.35rem;
  border-bottom: 2px solid var(--border-strong);
  text-align: center;
  font-weight: 700;
  color: var(--text-3);
}

.blank.ok {
  border-bottom-color: var(--success);
  background: var(--success-soft);
  color: var(--success-text);
}

.blank.ko {
  border-bottom-color: var(--danger);
  background: var(--danger-soft);
  color: var(--danger-text);
}

.cue {
  margin: 0.6rem 0 0;
  font-size: 0.85rem;
  font-style: italic;
  color: var(--text-3);
}

.pool {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(5rem, 1fr));
  gap: 0.5rem;
  margin-top: 1rem;
}

.chip {
  padding: 0.7rem 0.5rem;
  border: 1px solid var(--border-strong);
  border-radius: var(--radius-sm);
  background: var(--surface-2);
  color: var(--text-1);
  font-family: var(--font-serif);
  font-size: 1.05rem;
  font-weight: 600;
  cursor: pointer;
  transition: border-color 0.15s, background 0.15s, opacity 0.15s;
}

.chip:not(:disabled):hover {
  border-color: var(--accent);
  background: var(--accent-subtle);
}

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

.chip.muted { opacity: 0.4; }
.chip:disabled { cursor: default; }
</style>
