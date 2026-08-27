<!-- view-meta: created=2026-08-27; updated=2026-08-27 -->
<template>
  <DefaultLayout title="Exercice : La bonne terminaison">
    <main class="exo terminaisons">

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
          Le radical du verbe est déjà écrit&nbsp;: choisissez <strong>la terminaison</strong>
          qui le complète. L'infinitif et le temps demandés sont indiqués sous la phrase, et
          les mêmes terminaisons restent affichées à chaque phrase.
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
          <!-- before / after carry their own spaces, so the three pieces stay on
               one line: a break here would be condensed away by the compiler. -->
          <p class="sentence" role="text">{{ current.before }}<span class="verb"><span class="stem">{{ current.stem }}</span><span
                class="blank"
                :class="blankState"
              >{{ picked ?? '•••' }}</span></span>{{ current.after }}</p>

          <p class="cue">{{ current.verb }} · {{ current.tense }}</p>
        </div>

        <div class="pool" role="group" aria-label="Choisissez une terminaison">
          <button
            v-for="ending in POOL"
            :key="ending"
            type="button"
            class="chip"
            :class="chipState(ending)"
            :disabled="checked"
            :aria-label="`Terminaison -${ending}`"
            @click="pick(ending)"
          >-{{ ending }}</button>
        </div>

        <div v-if="checked" :class="['feedback', isRight ? 'feedback-correct' : 'feedback-wrong']">
          <strong v-if="isRight">✓ Correct&nbsp;: {{ current.stem }}<span class="fix">{{ current.answer }}</span></strong>
          <strong v-else>✗ C'était {{ current.stem }}<span class="fix">{{ current.answer }}</span></strong>
          <p class="feedback-note">{{ current.note }}</p>
        </div>

        <div class="actions">
          <button v-if="checked" class="btn-next" @click="next">
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
import { shuffle } from '@/utils/shuffle'

/* The same eighteen terminaisons stay on screen for every sentence, grouped by
   family and never shuffled: the learner recalls the paradigm and finds the form
   in it, instead of eliminating three distractors chosen for that one sentence.
   Clicking also spares a Spanish keyboard the é and the è.

   Every answer in ITEMS is in this pool. `-ée` is the exception: it is here only
   as the trap next to `-ie` and `-ées`. */
const POOL = [
  'e', 'es', 'ent', 's', 'it', 'ez', 'issons',
  'ais', 'ait', 'aient', 'ions',
  'ai', 'ont',
  'é', 'ée', 'ées', 'er', 'ie',
]

/* Each sentence carries its answer in braces, written inside the word it belongs
   to — « tu regard{ais} » — so an item can be proofread as a real sentence.
   The radical is whatever letters precede the brace.

   `verb` + `tense` are not decoration: they are what makes an item have exactly
   one answer. « tu regard___ » alone takes -es (présent) as readily as -ais
   (imparfait), so no item may ship without them. */
const ITEMS = [
  // ── Présent, 1er groupe : -e / -es / -ent, trois orthographes pour un seul son
  {
    s: "Le samedi, tu regard{es} un film avec tes amis.",
    verb: 'regarder', tense: 'présent',
    note: "Présent, 2ᵉ personne du singulier : -es. On ne l'entend pas, mais le -s s'écrit toujours.",
  },
  {
    s: "Mes cousins habit{ent} à Lyon depuis deux ans.",
    verb: 'habiter', tense: 'présent',
    note: "Ils / elles → -ent, une terminaison muette : « il habite » et « ils habitent » se prononcent exactement pareil.",
  },
  {
    s: "Elle cherch{e} ses clés depuis ce matin.",
    verb: 'chercher', tense: 'présent',
    note: "Il / elle → -e, jamais -es. (Ella busca)",
  },

  // ── Imparfait : -ais / -ait / -aient, même son, trois écritures
  {
    s: "Hier soir, tu regard{ais} un film quand j'ai téléphoné.",
    verb: 'regarder', tense: 'imparfait',
    note: "L'imparfait plante le décor pendant qu'une autre action arrive. 2ᵉ personne : -ais.",
  },
  {
    s: "Quand je suis sorti, il pleuv{ait} encore.",
    verb: 'pleuvoir', tense: 'imparfait',
    note: "Il / elle à l'imparfait : -ait. Même son que -ais et -aient, mais le sujet est singulier.",
  },
  {
    s: "Quand nous étions petits, nous jou{ions} dans le jardin.",
    verb: 'jouer', tense: 'imparfait',
    note: "Le radical de l'imparfait vient de « nous jouons ». Avec nous, la terminaison est -ions.",
  },
  {
    s: "À l'époque, ils ne parl{aient} pas espagnol.",
    verb: 'parler', tense: 'imparfait',
    note: "-ais, -ait et -aient se prononcent de la même façon : c'est le sujet qui décide de l'orthographe. Ici « ils » → -aient.",
  },

  // ── Futur / conditionnel : la terminaison s'ajoute à l'infinitif entier
  {
    s: "Demain, je te téléphoner{ai} vers midi.",
    verb: 'téléphoner', tense: 'futur simple',
    note: "Futur simple : infinitif entier + -ai. (llamaré)",
  },
  {
    s: "Si j'avais le temps, je te téléphoner{ais} plus souvent.",
    verb: 'téléphoner', tense: 'conditionnel présent',
    note: "Un seul -s sépare « je téléphonerai » (llamaré) de « je téléphonerais » (llamaría). Après « si » + imparfait, c'est le conditionnel.",
  },
  {
    s: "L'année prochaine, ils visiter{ont} le Canada.",
    verb: 'visiter', tense: 'futur simple',
    note: "Futur simple, 3ᵉ personne du pluriel : -ont, comme « ils ont ».",
  },

  // ── -é ou -er : le piège le plus fréquent à l'écrit
  {
    s: "Nous avons mang{é} une pizza hier soir.",
    verb: 'manger', tense: 'participe passé',
    note: "Après l'auxiliaire avoir vient le participe passé : -é. Test : on peut dire « nous avons vendu », pas « nous avons vendre ».",
  },
  {
    s: "Je vais mang{er} à midi, tu viens ?",
    verb: 'manger', tense: 'infinitif',
    note: "Derrière un verbe déjà conjugué (aller, vouloir, pouvoir…), le second verbe reste à l'infinitif : -er. Test : « je vais vendre ».",
  },

  // ── Participe passé avec être : il s'accorde
  {
    s: "Elles sont arriv{ées} en retard ce matin.",
    verb: 'arriver', tense: 'participe passé',
    note: "Avec l'auxiliaire être, le participe s'accorde avec le sujet : « elles » → -ées, féminin pluriel.",
  },
  {
    s: "Marie est part{ie} à huit heures.",
    verb: 'partir', tense: 'participe passé',
    note: "Partir se conjugue avec être : « parti » prend un -e au féminin singulier, sans -s.",
  },

  // ── 2e groupe : le -iss- du pluriel
  {
    s: "Nous fin{issons} notre travail avant midi.",
    verb: 'finir', tense: 'présent',
    note: "Au pluriel, le 2ᵉ groupe intercale -iss- : nous finissons, vous finissez, ils finissent.",
  },
  {
    s: "Le film fin{it} à dix heures.",
    verb: 'finir', tense: 'présent',
    note: "Au singulier : finis, finis, finit. Le sujet est « le film », donc -it.",
  },

  // ── 3e groupe : des radicaux qui bougent
  {
    s: "Vous pren{ez} le métro tous les jours ?",
    verb: 'prendre', tense: 'présent',
    note: "Au pluriel, prendre perd son -d- : nous prenons, vous prenez.",
  },
  {
    s: "Tu attend{s} le bus depuis dix minutes.",
    verb: 'attendre', tense: 'présent',
    note: "Verbes en -dre : le -d- du radical reste et le -s s'ajoute — j'attends, tu attends.",
  },

  // ── Impératif : la règle du -s qui tombe
  {
    s: "Ferm{e} la porte, s'il te plaît !",
    verb: 'fermer', tense: 'impératif (tu)',
    note: "À l'impératif, les verbes en -er perdent leur -s à la 2ᵉ personne : « ferme », et non « fermes ».",
  },
]

/** Split "Le samedi, tu regard{es} un film." into before / stem / answer / after. */
function parse(item) {
  const [before, answer, after] = item.s.split(/\{([^}]*)\}/)
  const stem = (before.match(/[\p{L}'-]+$/u) ?? [''])[0]
  return {
    ...item,
    before: before.slice(0, before.length - stem.length),
    stem,
    answer,
    after,
  }
}

function buildDeck() {
  return shuffle(ITEMS).map(parse)
}

const deck         = ref(buildDeck())
const currentIndex = ref(0)
const picked       = ref(null)
const score        = ref(0)
const finished     = ref(false)

const current     = computed(() => deck.value[currentIndex.value])
const progressPct = computed(() => ((currentIndex.value + 1) / deck.value.length) * 100)
const checked     = computed(() => picked.value !== null)
const isRight     = computed(() => picked.value === current.value.answer)

const blankState = computed(() => {
  if (!checked.value) return ''
  return isRight.value ? 'ok' : 'ko'
})

/* After the pick, the right answer lights up green even when it was not the one
   chosen — the correction has to show where the form actually lives in the pool. */
function chipState(ending) {
  if (!checked.value) return ''
  if (ending === current.value.answer) return 'ok'
  if (ending === picked.value) return 'ko'
  return 'muted'
}

function pick(ending) {
  if (checked.value) return
  picked.value = ending
  if (isRight.value) score.value++
}

function next() {
  if (currentIndex.value < deck.value.length - 1) {
    currentIndex.value++
    picked.value = null
  } else {
    finished.value = true
  }
}

function restart() {
  deck.value = buildDeck()
  currentIndex.value = 0
  picked.value = null
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
  if (pct === 1)   return 'Sans faute ! Les terminaisons muettes ne vous piègent plus.'
  if (pct >= 0.75) return "Très bien ! Revoyez les terminaisons qui ne s'entendent pas : -e, -es, -ent."
  if (pct >= 0.5)  return "Bon travail. Le sujet commande la terminaison : cherchez-le avant de choisir."
  return 'Ouvrez les tableaux de conjugaison à côté et refaites l\'exercice tranquillement.'
})

useExerciseScore(finished, () => ({ correct: score.value, total: deck.value.length }))
</script>

<style scoped>
/* Only the board is styled here; the rest comes from `.exo`. */
.sentence {
  margin: 0;
  font-family: var(--font-serif);
  font-size: 1.15rem;
  line-height: 2.2;
  color: var(--text-1);
}

/* The radical and the blank are one word: no gap, and no break between them. */
.verb {
  display: inline-flex;
  align-items: baseline;
  white-space: nowrap;
}

.stem { font-weight: 600; }

/* Every blank is the same width whatever its answer: sizing it to -e or to
   -issons would give the ending away before the first click. */
.blank {
  display: inline-block;
  min-width: 5rem;
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
  margin: 0;
  font-family: var(--font-sans);
  font-size: 0.78rem;
  letter-spacing: 0.02em;
  color: var(--text-3);
}

.pool {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(4.5rem, 1fr));
  gap: 0.5rem;
}

.chip {
  padding: 0.6rem 0.4rem;
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

.fix {
  text-decoration: underline;
  text-underline-offset: 0.2em;
}
</style>
