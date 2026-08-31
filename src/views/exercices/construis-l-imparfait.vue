<!-- view-meta: created=2026-08-31; updated=2026-08-31 -->
<template>
  <DefaultLayout title="Exercice : Construis l'imparfait">
    <main class="exo build-imparfait">

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
          L'imparfait se construit en deux morceaux&nbsp;: le <strong>radical</strong>, qui vient
          du présent avec «&nbsp;nous&nbsp;» (<em>nous parlons</em> → <em>parl-</em>), et la
          <strong>terminaison</strong>, qui dépend du sujet. Choisissez les deux, puis vérifiez.
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
          <p class="infinitif">{{ current.verb }}</p>

          <p class="build" role="text">
            <span class="subject" :class="{ spaced: !elides }">{{ elides ? "j'" : current.subject }}</span><span class="word"><span
              class="slot"
              :class="slotState('stem')"
            >{{ pickedStem ?? '•••' }}</span><span
              class="slot"
              :class="slotState('end')"
            >{{ pickedEnd ?? '•••' }}</span></span>
          </p>

          <p class="gloss">{{ current.gloss }}</p>
        </div>

        <div class="step">
          <p class="step-label"><span class="step-num">1</span> Le radical</p>
          <div class="pool" role="group" aria-label="Choisissez le radical">
            <button
              v-for="stem in current.stems"
              :key="stem"
              type="button"
              class="chip"
              :class="chipState('stem', stem)"
              :disabled="checked"
              :aria-label="`Radical ${stem}`"
              @click="pickStem(stem)"
            >{{ stem }}-</button>
          </div>
        </div>

        <div class="step">
          <p class="step-label"><span class="step-num">2</span> La terminaison</p>
          <div class="pool endings" role="group" aria-label="Choisissez la terminaison">
            <button
              v-for="ending in POOL"
              :key="ending"
              type="button"
              class="chip"
              :class="chipState('end', ending)"
              :disabled="checked"
              :aria-label="`Terminaison -${ending}`"
              @click="pickEnd(ending)"
            >-{{ ending }}</button>
          </div>
        </div>

        <div v-if="checked" :class="['feedback', isRight ? 'feedback-correct' : 'feedback-wrong']">
          <strong v-if="isRight">✓ Correct&nbsp;: {{ current.form }}</strong>
          <strong v-else>✗ C'était {{ current.form }}</strong>
          <p class="derivation">
            {{ current.nous }} <span aria-hidden="true">→</span> {{ current.stem }}-
            <span aria-hidden="true">+</span> -{{ current.ending }}
          </p>
          <p class="feedback-note">{{ current.note }}</p>
        </div>

        <div class="actions">
          <button
            v-if="!checked"
            class="btn-verify"
            :disabled="pickedStem === null || pickedEnd === null"
            @click="verify"
          >Vérifier</button>
          <button v-else class="btn-next" @click="next">
            {{ currentIndex < deck.length - 1 ? 'Verbe suivant →' : 'Voir mon score' }}
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

/* Étape 2 : le paradigme entier reste à l'écran, dans l'ordre du tableau de la
   leçon, et n'est jamais mélangé — le but est de retrouver la forme dans une
   liste connue, pas d'éliminer trois leurres. Cinq entrées pour six personnes :
   « je » et « tu » partagent -ais, ce qui est justement le piège de l'imparfait.
   Toute terminaison de l'exercice est ici, et toute entrée d'ici est la réponse
   d'au moins un item : il n'y a pas de leurre dans ce pool. */
const POOL = ['ais', 'ait', 'ions', 'iez', 'aient']

/* La terminaison est déduite du sujet, jamais recopiée dans les données :
   une faute de frappe y serait invisible. */
const ENDINGS = {
  je: 'ais', tu: 'ais',
  il: 'ait', elle: 'ait', on: 'ait',
  nous: 'ions', vous: 'iez',
  ils: 'aient', elles: 'aient',
}

/* Étape 1 : les trois radicaux sont propres à l'item — un pool fixe n'a pas de
   sens ici, chaque verbe a le sien. Les deux leurres ne sont pas décoratifs :
   c'est toujours l'infinitif rogné (le radical qu'on invente quand on oublie la
   règle du « nous ») et le radical du futur / conditionnel, qui donne
   « je parlerais » là où on voulait « je parlais ».

   `form` est la forme attendue, écrite en toutes lettres pour être relue comme
   du français. Le contrôle plus bas vérifie que sujet + radical + terminaison la
   reproduit exactement : si un radical dérape, la vérification tombe.

   Les verbes en -ger et -cer n'apparaissent qu'avec je / tu / il / ils, où la
   terminaison commence par un a : c'est là que le e et la cédille servent. Avec
   nous et vous ils disparaissent (nous mangions, nous commencions), ce que la
   note dit plutôt que de casser le mécanisme avec deux radicaux par verbe. */
const ITEMS = [
  {
    verb: 'parler', nous: 'nous parlons', subject: 'tu',
    stem: 'parl', stems: ['parl', 'parle', 'parler'], form: 'tu parlais',
    gloss: 'tú hablabas',
    note: "Le radical est celui de « nous parlons », pas l'infinitif : « tu parlerais » (hablarías) serait du conditionnel.",
  },
  {
    verb: 'être', nous: 'nous sommes → radical irrégulier ét-', subject: 'je',
    stem: 'ét', stems: ['ét', 'somm', 'êt'], form: "j'étais",
    gloss: 'yo era',
    note: "Être est le seul verbe irrégulier à l'imparfait : la règle du « nous » donnerait « je sommais ». Le radical est ét-.",
  },
  {
    verb: 'faire', nous: 'nous faisons', subject: 'il',
    stem: 'fais', stems: ['fais', 'fai', 'fer'], form: 'il faisait',
    gloss: 'él hacía',
    note: "Même les verbes très irréguliers suivent la règle : nous faisons → fais-. (fer- est le radical du futur : il fera.)",
  },
  {
    verb: 'finir', nous: 'nous finissons', subject: 'nous',
    stem: 'finiss', stems: ['finiss', 'fini', 'finir'], form: 'nous finissions',
    gloss: 'nosotros terminábamos',
    note: "Le -iss- du 2ᵉ groupe est dans le radical du « nous », donc il reste à toutes les personnes de l'imparfait.",
  },
  {
    verb: 'avoir', nous: 'nous avons', subject: 'je',
    stem: 'av', stems: ['av', 'ai', 'aur'], form: "j'avais",
    gloss: 'yo tenía',
    note: "Nous avons → av-. Devant une voyelle, « je » devient « j' » : j'avais.",
  },
  {
    verb: 'aller', nous: 'nous allons', subject: 'ils',
    stem: 'all', stems: ['all', 'ir', 'alla'], form: 'ils allaient',
    gloss: 'ellos iban',
    note: "Aller est irrégulier au présent et au futur, mais parfaitement régulier à l'imparfait : all-. (ir- appartient au futur : ils iront.)",
  },
  {
    verb: 'prendre', nous: 'nous prenons', subject: 'vous',
    stem: 'pren', stems: ['pren', 'prend', 'prenn'], form: 'vous preniez',
    gloss: 'vosotros tomabais',
    note: "Au pluriel du présent, prendre perd son -d- : nous prenons. L'imparfait garde ce radical à toutes les personnes.",
  },
  {
    verb: 'boire', nous: 'nous buvons', subject: 'je',
    stem: 'buv', stems: ['buv', 'boi', 'boiv'], form: 'je buvais',
    gloss: 'yo bebía',
    note: "Le radical du « nous » est buv-, très différent de « je bois ». C'est pour cela qu'on part toujours du pluriel.",
  },
  {
    verb: 'manger', nous: 'nous mangeons', subject: 'je',
    stem: 'mange', stems: ['mange', 'mang', 'manger'], form: 'je mangeais',
    gloss: 'yo comía',
    note: "Le e de « nous mangeons » garde le son doux du g devant a : je mangeais. Devant i il ne sert plus et disparaît : nous mangions.",
  },
  {
    verb: 'commencer', nous: 'nous commençons', subject: 'elle',
    stem: 'commenç', stems: ['commenç', 'commenc', 'commencer'], form: 'elle commençait',
    gloss: 'ella empezaba',
    note: "La cédille garde le son [s] devant a : elle commençait. Devant i elle tombe : nous commencions.",
  },
  {
    verb: 'voir', nous: 'nous voyons', subject: 'tu',
    stem: 'voy', stems: ['voy', 'voi', 'verr'], form: 'tu voyais',
    gloss: 'tú veías',
    note: "Nous voyons → voy-. Attention à « nous voyions » (deux i) : celui du radical et celui de la terminaison.",
  },
  {
    verb: 'venir', nous: 'nous venons', subject: 'ils',
    stem: 'ven', stems: ['ven', 'vien', 'viendr'], form: 'ils venaient',
    gloss: 'ellos venían',
    note: "« Ils viennent » est du présent ; à l'imparfait on part de « nous venons » → ven-.",
  },
  {
    verb: 'pouvoir', nous: 'nous pouvons', subject: 'on',
    stem: 'pouv', stems: ['pouv', 'peuv', 'pourr'], form: 'on pouvait',
    gloss: 'se podía',
    note: "« On » est un sujet singulier : il prend -ait, comme il et elle.",
  },
  {
    verb: 'écrire', nous: 'nous écrivons', subject: 'vous',
    stem: 'écriv', stems: ['écriv', 'écri', 'écrir'], form: 'vous écriviez',
    gloss: 'vosotros escribíais',
    note: "Le -v- du pluriel reste à l'imparfait : nous écrivons → vous écriviez.",
  },
  {
    verb: 'habiter', nous: 'nous habitons', subject: 'nous',
    stem: 'habit', stems: ['habit', 'habite', 'habiter'], form: 'nous habitions',
    gloss: 'nosotros vivíamos',
    note: "Un seul i sépare le présent « nous habitons » de l'imparfait « nous habitions ». C'est le i de la terminaison -ions.",
  },
  {
    verb: 'dormir', nous: 'nous dormons', subject: 'je',
    stem: 'dorm', stems: ['dorm', 'dor', 'dormir'], form: 'je dormais',
    gloss: 'yo dormía',
    note: "Je dormais quand tu as téléphoné : l'imparfait décrit l'action déjà en cours.",
  },
  {
    verb: 'vouloir', nous: 'nous voulons', subject: 'elles',
    stem: 'voul', stems: ['voul', 'veul', 'voudr'], form: 'elles voulaient',
    gloss: 'ellas querían',
    note: "Nous voulons → voul-. « Elles voudraient » (querrían) serait le conditionnel.",
  },
  {
    verb: 'choisir', nous: 'nous choisissons', subject: 'tu',
    stem: 'choisiss', stems: ['choisiss', 'chois', 'choisir'], form: 'tu choisissais',
    gloss: 'tú elegías',
    note: "Comme finir : le -iss- vient du présent avec nous et ne quitte plus le verbe à l'imparfait.",
  },
]

/* Contrôle des données — à relancer après toute modification de ITEMS :

   python3 - <<'PY'
   import re, pathlib
   src = pathlib.Path('src/views/exercices/construis-l-imparfait.vue').read_text()
   POOL = re.search(r"const POOL = \[([^\]]*)\]", src).group(1)
   POOL = re.findall(r"'([^']+)'", POOL)
   ENDS = dict(re.findall(r"(\w+): '(ais|ait|ions|iez|aient)'", src))
   body = re.search(r"const ITEMS = \[(.*?)\n\]\n", src, re.S).group(1)
   used = set()
   for raw in re.findall(r"\{(.*?)\n  \}", body, re.S):
       g = lambda k: re.search(k + r": ['\"](.*?)['\"],", raw).group(1)
       verb, subj, stem, form = g('verb'), g('subject'), g('stem'), g('form')
       stems = re.findall(r"'([^']+)'", re.search(r"stems: \[(.*?)\]", raw).group(1))
       end = ENDS[subj]; used.add(end)
       sub = "j'" if subj == 'je' and stem[0].lower() in 'aeiouyâàéèêîïôûh' else subj + ' '
       if sub + stem + end != form: print('FORME', verb, repr(sub + stem + end), '!=', repr(form))
       if stem not in stems:        print('RADICAL absent des options', verb)
       if len(stems) != 3:          print('PAS 3 options', verb)
       if len(set(stems)) != 3:     print('DOUBLON dans les options', verb)
       if end not in POOL:          print('TERMINAISON hors pool', verb, end)
   for e in POOL:
       if e not in used: print('POOL jamais réponse (leurre non documenté)', e)
   print('OK')
   PY
*/

/** Un item prêt à jouer : terminaison déduite du sujet, radicaux mélangés. */
function prepare(item) {
  return {
    ...item,
    ending: ENDINGS[item.subject],
    stems: shuffle(item.stems),
  }
}

function buildDeck() {
  return shuffle(ITEMS).map(prepare)
}

const deck         = ref(buildDeck())
const currentIndex = ref(0)
const pickedStem   = ref(null)
const pickedEnd    = ref(null)
const checked      = ref(false)
const score        = ref(0)
const finished     = ref(false)

const current     = computed(() => deck.value[currentIndex.value])
const progressPct = computed(() => ((currentIndex.value + 1) / deck.value.length) * 100)
const stemOk      = computed(() => pickedStem.value === current.value.stem)
const endOk       = computed(() => pickedEnd.value === current.value.ending)

/* Tout ou rien : un radical juste avec la mauvaise terminaison n'est pas la
   forme demandée. Les pastilles disent laquelle des deux étapes a lâché. */
const isRight = computed(() => stemOk.value && endOk.value)

/* « je » s'élide devant une voyelle : j'étais, j'avais — mais je dormais.
   Le contrôle ci-dessus compare la forme assemblée à `form`, donc une élision
   fautive ne peut pas passer inaperçue. */
const elides = computed(
  () => current.value.subject === 'je' && /^[aeiouyâàéèêîïôûh]/i.test(current.value.stem),
)

function slotState(which) {
  if (!checked.value) return ''
  return (which === 'stem' ? stemOk.value : endOk.value) ? 'ok' : 'ko'
}

/* Après la vérification, la bonne pastille passe au vert même si elle n'a pas
   été choisie : la correction doit montrer où se trouvait la forme. */
function chipState(which, value) {
  if (!checked.value) return ''
  const answer = which === 'stem' ? current.value.stem : current.value.ending
  const picked = which === 'stem' ? pickedStem.value : pickedEnd.value
  if (value === answer) return 'ok'
  if (value === picked) return 'ko'
  return 'muted'
}

function pickStem(stem) {
  if (checked.value) return
  pickedStem.value = stem
}

function pickEnd(ending) {
  if (checked.value) return
  pickedEnd.value = ending
}

function verify() {
  if (checked.value || pickedStem.value === null || pickedEnd.value === null) return
  checked.value = true
  if (isRight.value) score.value++
}

function next() {
  if (currentIndex.value < deck.value.length - 1) {
    currentIndex.value++
    pickedStem.value = null
    pickedEnd.value = null
    checked.value = false
  } else {
    finished.value = true
  }
}

function restart() {
  deck.value = buildDeck()
  currentIndex.value = 0
  pickedStem.value = null
  pickedEnd.value = null
  checked.value = false
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
  if (pct === 1)   return "Sans faute ! Le radical du « nous » est devenu un réflexe."
  if (pct >= 0.75) return "Très bien ! Revoyez les verbes dont le pluriel change de radical : buvons, voyons, faisons."
  if (pct >= 0.5)  return "Bon travail. Avant de choisir, dites le verbe avec « nous » au présent : le radical est dedans."
  return "Reprenez la leçon sur l'imparfait à côté, puis refaites l'exercice tranquillement."
})

useExerciseScore(finished, () => ({ correct: score.value, total: deck.value.length }))
</script>

<style scoped>
/* Seul le plateau est stylé ici ; le reste vient de `.exo`. */

/* L'infinitif, le mot en construction et la glose forment un bloc : le gap de
   1,5 rem de `.exo .card` les éparpillerait. Sélecteur à trois classes pour
   passer devant lui sans compter sur l'ordre du cascade. */
.build-imparfait .card { gap: 0.75rem; }

.infinitif {
  margin: 0;
  text-align: center;
  font-family: var(--font-sans);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-3);
}

.build {
  margin: 0;
  text-align: center;
  font-family: var(--font-serif);
  font-size: 1.6rem;
  line-height: 1.6;
  color: var(--text-1);
}

.subject { color: var(--text-3); }
.subject.spaced { margin-right: 0.3em; }

/* Radical et terminaison forment un seul mot : aucun espace, aucune coupure. */
.word {
  display: inline-flex;
  align-items: baseline;
  white-space: nowrap;
}

/* Les deux cases ont la même largeur minimale quelle que soit la réponse :
   une case taillée sur « ét » ou sur « choisiss » vendrait la mèche. */
.slot {
  display: inline-block;
  min-width: 4.5rem;
  padding: 0 0.3rem;
  border-bottom: 2px solid var(--border-strong);
  text-align: center;
  font-weight: 700;
  color: var(--text-3);
}

.slot.ok {
  border-bottom-color: var(--success);
  background: var(--success-soft);
  color: var(--success-text);
}

.slot.ko {
  border-bottom-color: var(--danger);
  background: var(--danger-soft);
  color: var(--danger-text);
}

.gloss {
  margin: 0;
  text-align: center;
  font-family: var(--font-serif);
  font-style: italic;
  font-size: 0.9rem;
  color: var(--text-3);
}

/* Un div, pas un section : le style global des cartes l'encadrerait. */
.step {
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
}

.step-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0;
  font-family: var(--font-sans);
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--text-2);
}

.step-num {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.35rem;
  height: 1.35rem;
  border-radius: 50%;
  background: var(--accent-subtle);
  color: var(--accent-text);
  font-size: 0.72rem;
  font-weight: 700;
}

.pool {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(6rem, 1fr));
  gap: 0.5rem;
}

.pool.endings {
  grid-template-columns: repeat(auto-fit, minmax(4.5rem, 1fr));
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

.derivation {
  margin: 0;
  font-family: var(--font-serif);
  font-size: 0.9rem;
  color: var(--text-2);
}
</style>
