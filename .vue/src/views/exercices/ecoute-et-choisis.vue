<!-- view-meta: created=2026-08-17; updated=2026-08-17 -->
<template>
  <DefaultLayout title="Exercice : Écoute et choisis">
    <main class="exo ecoute">

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
          Écoutez le mot, puis choisissez celui que vous avez entendu.
          Ces mots ne diffèrent que par <strong>un seul son</strong> — un son qui
          n'existe pas en espagnol. Réécoutez autant de fois que nécessaire.
        </p>

        <!-- The whole exercise depends on speech, so say plainly when it is
             unavailable instead of letting the learner guess blind. -->
        <p v-if="!supported" class="audio-warn">
          Votre navigateur ne prend pas en charge la synthèse vocale&nbsp;: cet exercice
          a besoin du son. Essayez Chrome, Edge ou Safari.
        </p>
        <p v-else-if="played && !hasVoice" class="audio-warn">
          Aucune voix française n'est installée sur cet appareil. Les mots seront lus
          avec une autre voix et les sons risquent d'être faux&nbsp;: ajoutez une voix
          française dans les réglages de votre système.
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
          <p class="focus">Contraste&nbsp;: <strong>{{ current.focus }}</strong></p>

          <div class="audio-controls">
            <button
              class="btn-audio primary-audio"
              :disabled="speaking"
              aria-label="Écouter le mot à vitesse normale"
              @click="play(0.9)"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
              </svg>
              <span>Écouter</span>
            </button>

            <button
              class="btn-audio"
              :disabled="speaking"
              aria-label="Écouter le mot lentement"
              @click="play(0.5)"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
              </svg>
              <span>Lentement</span>
            </button>
          </div>

          <p v-if="!played && supported" class="listen-first">
            Cliquez sur <strong>Écouter</strong> pour commencer.
          </p>
        </div>

        <!-- `locked` is the visible half of the `disabled` below: a button that
             is dead but looks alive just makes the learner click nothing. -->
        <div
          class="options"
          :class="{ locked: supported && !played && !checked }"
          role="group"
          aria-label="Mots proposés"
        >
          <button
            v-for="w in current.shown"
            :key="w.w"
            type="button"
            class="word"
            :class="wordState(w)"
            :disabled="checked || (supported && !played)"
            @click="choose(w)"
          >
            <span class="word-fr">{{ w.w }}</span>
            <span v-if="checked" class="word-es">{{ w.es }}</span>
          </button>
        </div>

        <div v-if="checked" :class="['feedback', isCorrect ? 'feedback-correct' : 'feedback-wrong']">
          <strong>
            {{ isCorrect ? '✓ Bien entendu !' : `✗ C'était « ${current.target.w} ».` }}
          </strong>
          <p class="feedback-note">{{ current.tip }}</p>
        </div>

        <div class="actions">
          <button v-if="checked" class="btn-next" @click="next">
            {{ currentIndex < deck.length - 1 ? 'Mot suivant →' : 'Voir mon score' }}
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
import { useSpeech } from '@/composables/useSpeech'
import { useExerciseScore } from '@/composables/useProgress'
import { shuffle } from '@/utils/shuffle'

const { speak, speaking, supported, hasVoice } = useSpeech()

/* Minimal pairs — the words in each set differ by exactly one sound, and that
   sound is one Spanish does not have. No two words in a set may be homophones,
   or the question has no answer: that rules out cent/sang/sans, vert/verre,
   petit/petits, and every other same-sounding trio that looks tempting.
   Glosses are Spanish, per AGENTS.md §1. */
const ITEMS = [
  {
    focus: 'u · ou · eu',
    words: [{ w: 'du', es: 'del' }, { w: 'doux', es: 'suave' }, { w: 'deux', es: 'dos' }],
    tip: "Le « u » français (/y/) n'existe pas en espagnol : dites « ou » avec les lèvres de « i ». « ou » est le son espagnol u, et « eu » se place entre les deux.",
  },
  {
    focus: 'u · ou · eu',
    words: [{ w: 'vu', es: 'visto' }, { w: 'vous', es: 'usted(es)' }, { w: 'veux', es: 'quiero' }],
    tip: "Même contraste, mots très fréquents : « j'ai vu », « vous êtes », « je veux ». Confondre « vu » et « vous » change complètement la phrase.",
  },
  {
    focus: 'u · ou · eu',
    words: [{ w: 'su', es: 'sabido' }, { w: 'sous', es: 'debajo de' }, { w: 'ceux', es: 'los (aquellos)' }],
    tip: "« Sous » (debajo) et « su » (sabido) sont deux mots courants que l'oreille hispanophone entend d'abord pareil. Écoutez la position des lèvres.",
  },
  {
    focus: 'u · ou · o',
    words: [{ w: 'bu', es: 'bebido' }, { w: 'boue', es: 'barro' }, { w: 'beau', es: 'bonito' }],
    tip: "Trois voyelles proches. « Beau » est le plus ouvert, « bu » le plus fermé et le plus antérieur.",
  },
  {
    focus: 'voyelles nasales',
    words: [{ w: 'vin', es: 'vino' }, { w: 'vent', es: 'viento' }, { w: 'vont', es: 'van' }],
    tip: "Les trois nasales du français : /ɛ̃/ (vin), /ɑ̃/ (vent), /ɔ̃/ (vont). L'espagnol n'a pas de voyelle nasale — l'air passe par le nez sans prononcer de « n » final.",
  },
  {
    focus: 'voyelles nasales',
    words: [{ w: 'bain', es: 'baño' }, { w: 'banc', es: 'banco' }, { w: 'bon', es: 'bueno' }],
    tip: "Même série de nasales après un « b ». Attention : on n'entend jamais le « n » comme une consonne, il colore seulement la voyelle.",
  },
  {
    focus: 'voyelles nasales',
    words: [{ w: 'sain', es: 'sano' }, { w: 'sang', es: 'sangre' }, { w: 'son', es: 'su / sonido' }],
    tip: "Trois mots courants qui ne diffèrent que par la nasale. « Son » est aussi le possessif : c'est celui que vous entendrez le plus souvent.",
  },
  {
    focus: 'v · b · p',
    words: [{ w: 'va', es: 'va' }, { w: 'bas', es: 'bajo' }, { w: 'pas', es: 'paso / no' }],
    tip: "En espagnol, « b » et « v » se prononcent pareil. En français, « v » se dit avec les dents sur la lèvre (comme un « f » sonore) — c'est un son à part entière.",
  },
  {
    focus: 'v · b · p',
    words: [{ w: 'vont', es: 'van' }, { w: 'bon', es: 'bueno' }, { w: 'pont', es: 'puente' }],
    tip: "Même contraste v / b / p sur une nasale. Si vous prononcez « vont » comme « bon », votre interlocuteur entendra un autre mot.",
  },
  {
    focus: 's · z',
    words: [{ w: 'poisson', es: 'pez / pescado' }, { w: 'poison', es: 'veneno' }, { w: 'boisson', es: 'bebida' }],
    tip: "Un seul « s » entre deux voyelles se prononce /z/ : « poison » (veneno). Doublé, il reste /s/ : « poisson » (pescado). L'espagnol n'a pas le son /z/.",
  },
  {
    focus: 's · z · t',
    words: [{ w: 'douze', es: 'doce' }, { w: 'douce', es: 'dulce' }, { w: 'doute', es: 'duda' }],
    tip: "Trois consonnes finales différentes : /z/, /s/, /t/. Le /z/ final de « douze » vibre — posez la main sur la gorge pour le sentir.",
  },
  {
    focus: 'ch · j · l',
    words: [{ w: 'bouche', es: 'boca' }, { w: 'bouge', es: 'se mueve' }, { w: 'boule', es: 'bola' }],
    tip: "« ch » = /ʃ/ (comme le « sh » anglais, absent de l'espagnol), « j » = /ʒ/, sa version sonore. Ce n'est jamais la jota espagnole.",
  },
]


/* Pick a random target per item and shuffle the buttons, so replaying the deck
   is a genuinely different drill rather than a memory test. */
function buildDeck() {
  return shuffle(ITEMS).map(item => ({
    ...item,
    target: item.words[Math.floor(Math.random() * item.words.length)],
    shown: shuffle(item.words),
  }))
}

const deck         = ref(buildDeck())
const currentIndex = ref(0)
const picked       = ref(null)
const checked      = ref(false)
const isCorrect    = ref(false)
const played       = ref(false)
const score        = ref(0)
const finished     = ref(false)

const current = computed(() => deck.value[currentIndex.value])
const progressPct = computed(() => ((currentIndex.value + 1) / deck.value.length) * 100)

function play(rate) {
  played.value = true
  speak(current.value.target.w, rate)
}

/* One shot per word: choosing checks immediately. Re-listening stays available
   afterwards, which is where most of the learning happens. */
function choose(word) {
  if (checked.value) return
  picked.value = word
  isCorrect.value = word.w === current.value.target.w
  if (isCorrect.value) score.value++
  checked.value = true
}

function wordState(word) {
  if (!checked.value) return ''
  if (word.w === current.value.target.w) return 'ok'
  if (picked.value && word.w === picked.value.w) return 'ko'
  return 'dim'
}

function next() {
  if (currentIndex.value < deck.value.length - 1) {
    currentIndex.value++
    picked.value = null
    checked.value = false
    isCorrect.value = false
    played.value = false
  } else {
    finished.value = true
  }
}

function restart() {
  deck.value = buildDeck()
  currentIndex.value = 0
  picked.value = null
  checked.value = false
  isCorrect.value = false
  played.value = false
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
  if (pct === 1)   return "Parfait ! Votre oreille distingue déjà les sons qui n'existent pas en espagnol."
  if (pct >= 0.75) return 'Très bien ! Réécoutez les nasales, ce sont les plus difficiles.'
  if (pct >= 0.5)  return "Bon travail. Reprenez la leçon de prononciation, puis réessayez."
  return "L'oreille se forme lentement — réécoutez chaque mot lentement avant de choisir."
})

useExerciseScore(finished, () => ({ correct: score.value, total: deck.value.length }))
</script>

<style scoped>
/* Only this exercise's body is styled here; the rest comes from `.exo`. */
.focus {
  margin: 0 0 0.9rem;
  font-family: var(--font-sans);
  font-size: 0.78rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--text-3);
  text-align: center;
}

.focus strong { color: var(--accent-text); }

.audio-controls {
  display: flex;
  gap: 0.75rem;
  justify-content: center;
}

.btn-audio {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.7rem 1.25rem;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--surface-1);
  color: var(--text-1);
  font-family: var(--font-sans);
  font-weight: 600;
  font-size: 0.85rem;
  cursor: pointer;
  transition: border-color 0.15s, background 0.15s, color 0.15s;
}

.btn-audio:hover:not(:disabled) {
  border-color: var(--accent);
  background: var(--accent-soft);
  color: var(--text-heading);
}

.btn-audio:disabled { opacity: 0.5; cursor: not-allowed; }

.primary-audio { border-color: var(--accent); color: var(--accent-text); }

.listen-first {
  margin: 0.9rem 0 0;
  text-align: center;
  font-size: 0.82rem;
  color: var(--text-3);
}

.audio-warn {
  margin: 0;
  padding: 0.75rem 1rem;
  background: var(--warn-soft);
  border-left: 4px solid var(--warn);
  border-radius: 0 var(--radius) var(--radius) 0;
  font-size: 0.85rem;
  line-height: 1.55;
  color: var(--text-1);
}

/* ── Word choices ─────────────────────────────── */
.options {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.6rem;
}

.word {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.15rem;
  padding: 0.9rem 0.6rem;
  border: 1.5px solid var(--border);
  border-radius: var(--radius);
  background: var(--surface-1);
  cursor: pointer;
  transition: border-color 0.15s, background 0.15s, opacity 0.15s;
}

.word:hover:not(:disabled) {
  border-color: var(--accent);
  background: var(--accent-subtle);
}

.word:disabled { cursor: default; }

/* Before the first play. Not applied after checking, where .ok / .ko / .dim
   carry their own emphasis and must stay at full strength. */
.options.locked .word {
  opacity: 0.45;
  border-style: dashed;
}

.word-fr {
  font-family: var(--font-serif);
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-1);
}

.word-es {
  font-size: 0.75rem;
  font-style: italic;
  color: var(--text-3);
}

.word.ok {
  border-color: var(--success);
  background: var(--success-soft);
}

.word.ok .word-fr { color: var(--success-text); }

.word.ko {
  border-color: var(--danger);
  background: var(--danger-soft);
}

.word.ko .word-fr { color: var(--danger-text); }

/* Unchosen wrong answers fade back so the eye goes to the two that matter. */
.word.dim { opacity: 0.55; }

@media (max-width: 560px) {
  .options { grid-template-columns: 1fr; }
}
</style>
