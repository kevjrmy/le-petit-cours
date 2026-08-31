<!-- view-meta: created=2026-08-31; updated=2026-08-31 -->
<template>
  <DefaultLayout title="Jacques a dit">
    <main class="jeu jacques">

      <p class="instructions">
        Obéissez seulement si l'ordre commence par «&nbsp;<strong>Jacques a dit</strong>&nbsp;».
        Sinon, ne touchez rien&nbsp;: laissez passer le temps, ou dites
        «&nbsp;je ne bouge pas&nbsp;». Trois erreurs et la partie s'arrête.
      </p>

      <p v-if="noVoice" class="warn-voice">
        Aucune voix française n'est installée sur cet appareil&nbsp;: les ordres restent
        écrits. Le jeu se joue très bien ainsi.
      </p>

      <!-- ── Avant la partie ─────────────────────── -->
      <div v-if="phase === 'idle'" class="actions">
        <button type="button" class="btn-main" @click="start">Commencer</button>
      </div>

      <!-- ── Fin de partie ───────────────────────── -->
      <div v-else-if="phase === 'over'" class="over">
        <p class="over-score">{{ score }}<span class="over-total"> ordres passés</span></p>
        <p class="over-msg">{{ overMsg }}</p>
        <p class="stats">Meilleur score&nbsp;: <strong>{{ best }}</strong></p>
        <div class="actions">
          <button type="button" class="btn-main" @click="start">Rejouer</button>
        </div>
        <RouterLink class="lesson-link" to="/vocabulaire/le-corps">
          Revoir le vocabulaire : Le corps humain
        </RouterLink>
      </div>

      <!-- ── En jeu ──────────────────────────────── -->
      <template v-else>
        <div class="hud">
          <span class="lives" :aria-label="`${lives} vies restantes`">
            <span v-for="i in 3" :key="i" :class="{ spent: i > lives }">♥</span>
          </span>
          <span class="hud-item">Score&nbsp;: <strong>{{ score }}</strong></span>
          <button
            type="button"
            class="hud-btn"
            :disabled="!canSpeak"
            aria-label="Réécouter l'ordre"
            @click="say"
          >🔊 Réécouter</button>
          <button
            v-if="canSpeak"
            type="button"
            class="hud-btn"
            @click="showText = !showText"
          >{{ showText ? 'Masquer le texte' : 'Afficher le texte' }}</button>
        </div>

        <div class="timer-track" role="progressbar" :aria-valuenow="Math.ceil(remaining / 100)" aria-label="Temps restant">
          <div class="timer-fill" :style="{ width: timerPct + '%' }"></div>
        </div>

        <p class="order" :class="{ hidden: !showText }">
          <span v-if="showText">{{ current.text }}</span>
          <span v-else class="order-masked">🔊 écoutez…</span>
        </p>
        <p class="sr-only" aria-live="assertive">{{ announce }}</p>

        <!-- ── La figure ─────────────────────────── -->
        <svg class="figure" viewBox="0 0 200 362" role="group" aria-label="Un personnage : touchez une partie du corps">
          <g
            v-for="part in PARTS"
            :key="part.id"
            class="part"
            :class="partClass(part.id)"
            role="button"
            tabindex="0"
            :aria-label="part.det + part.n"
            @click="hitPart(part.id)"
            @keydown.enter.prevent="hitPart(part.id)"
            @keydown.space.prevent="hitPart(part.id)"
          >
            <ellipse v-for="(e, i) in part.ellipses ?? []" :key="'e' + i"
                     :cx="e[0]" :cy="e[1]" :rx="e[2]" :ry="e[3]" />
            <rect v-for="(r, i) in part.rects ?? []" :key="'r' + i"
                  :x="r[0]" :y="r[1]" :width="r[2]" :height="r[3]" :rx="r[4] ?? 8" />
          </g>
        </svg>

        <div class="actions">
          <button type="button" class="btn-ghost" :disabled="phase !== 'playing'" @click="hitStill">
            Je ne bouge pas
          </button>
        </div>

        <div v-if="phase === 'feedback'" class="verdict" :class="lastOk ? 'ok' : 'ko'">
          {{ lastMsg }}
        </div>
      </template>

      <RelatedLinks />

    </main>
  </DefaultLayout>
</template>

<script setup>
import { ref, computed, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import RelatedLinks from '@/components/RelatedLinks.vue'
import { useSpeech } from '@/composables/useSpeech'

/* Les quinze parties sont toutes sur `vocabulaire/le-corps` (le contrôle plus
   bas le vérifie), et toutes visibles de face : le dos et les dents en sont
   absents parce qu'on ne peut pas les montrer sur cette figure, pas parce que
   le livre ne les enseigne pas.

   La figure n'a AUCUN contour séparé : elle est faite de ses propres zones
   cliquables. Rien de visible n'est donc inerte, et il est impossible d'ajouter
   un trait décoratif qui ressemble à une cible sans en être une.

   Les paires (oreille, bras, main…) portent deux formes dans le même groupe :
   les deux côtés répondent, comme dans le vrai jeu. */
const PARTS = [
  { id: 'cheveux', n: 'cheveux', det: 'les ', es: 'el pelo',
    ellipses: [[100, 40, 39, 20]] },
  { id: 'tete',    n: 'tête',    det: 'la ',  es: 'la cabeza',
    ellipses: [[100, 64, 38, 38]] },
  { id: 'oreille', n: 'oreille', det: "l'",   es: 'la oreja',
    ellipses: [[60, 66, 7, 11], [140, 66, 7, 11]] },
  { id: 'joue',    n: 'joue',    det: 'la ',  es: 'la mejilla',
    ellipses: [[78, 78, 9, 9], [122, 78, 9, 9]] },
  { id: 'nez',     n: 'nez',     det: 'le ',  es: 'la nariz',
    ellipses: [[100, 72, 5, 9]] },
  { id: 'bouche',  n: 'bouche',  det: 'la ',  es: 'la boca',
    ellipses: [[100, 90, 13, 5]] },
  { id: 'cou',     n: 'cou',     det: 'le ',  es: 'el cuello',
    rects: [[88, 100, 24, 18, 4]] },
  { id: 'epaule',  n: 'épaule',  det: "l'",   es: 'el hombro',
    rects: [[52, 116, 96, 18, 9]] },
  { id: 'bras',    n: 'bras',    det: 'le ',  es: 'el brazo',
    rects: [[42, 134, 16, 54, 8], [142, 134, 16, 54, 8],
            [42, 200, 16, 26, 8], [142, 200, 16, 26, 8]] },
  { id: 'coude',   n: 'coude',   det: 'le ',  es: 'el codo',
    ellipses: [[50, 194, 10, 10], [150, 194, 10, 10]] },
  { id: 'main',    n: 'main',    det: 'la ',  es: 'la mano',
    ellipses: [[50, 238, 13, 13], [150, 238, 13, 13]] },
  { id: 'ventre',  n: 'ventre',  det: 'le ',  es: 'la barriga',
    rects: [[66, 132, 68, 76, 10]] },
  { id: 'jambe',   n: 'jambe',   det: 'la ',  es: 'la pierna',
    rects: [[74, 210, 20, 60, 9], [106, 210, 20, 60, 9],
            [74, 294, 20, 38, 9], [106, 294, 20, 38, 9]] },
  { id: 'genou',   n: 'genou',   det: 'le ',  es: 'la rodilla',
    ellipses: [[84, 282, 11, 11], [116, 282, 11, 11]] },
  { id: 'pied',    n: 'pied',    det: 'le ',  es: 'el pie',
    ellipses: [[84, 342, 16, 9], [116, 342, 16, 9]] },
]

/* Contrôle des données — à relancer après toute modification de PARTS :

   node --input-type=module -e "
   import { readFileSync } from 'node:fs';
   const src = readFileSync('src/views/jeux/jacques-a-dit.vue', 'utf8');
   const corps = readFileSync('src/views/vocabulaire/le-corps.vue', 'utf8')
     .normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
   // `det` peut valoir "l'" : la valeur contient une apostrophe, donc il faut
   // capturer la chaîne entière avec ses guillemets et les retirer ensuite.
   // Une classe [^'] la sautait en silence — deux parties sur quinze.
   const rows = [...src.matchAll(/\{ id: '([a-z]+)',\s*n: '([^']+)',\s*det: ("[^"]*"|'[^']*'),\s*es: '([^']+)'/g)]
     .map(m => [m[0], m[1], m[2], m[3].slice(1, -1), m[4]]);
   const declared = src.match(/const PARTS = \[([\s\S]*?)\n\]/)[1]
     .split('\n').filter(l => l.trim().startsWith('{ id:')).length;
   if (rows.length !== declared) console.log('REGEX INCOMPLÈTE', rows.length, '/', declared);
   const ids = new Set();
   for (const [, id, n, det, es] of rows) {
     const b = n.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
     if (!new RegExp('\\\\b' + b + 's?\\\\b').test(corps))
       console.log('PARTIE ABSENTE DE le-corps :', n);
     if (ids.has(id)) console.log('ID EN DOUBLE', id);
     ids.add(id);
     if (!/^(le |la |les |l')\$/.test(det)) console.log('ARTICLE DOUTEUX', n, JSON.stringify(det));
     // une partie sans forme serait invisible et injouable
     const block = src.slice(src.indexOf(\"id: '\" + id + \"'\"));
     const end = block.indexOf('{ id:', 5);
     const body = end === -1 ? block.slice(0, 400) : block.slice(0, end);
     if (!/ellipses:|rects:/.test(body)) console.log('PARTIE SANS FORME', n);
   }
   console.log(rows.length, 'parties vérifiées');"
*/

const VERBS = ['touchez', 'montrez']
const LIVES = 3
const START_MS = 5000
const FLOOR_MS = 2200
const STEP_MS  = 140     // le temps se resserre à chaque réussite

const { speak, cancel, speaking, hasVoice, supported } = useSpeech()

const phase     = ref('idle')     // idle | playing | feedback | over
const lives     = ref(LIVES)
const score     = ref(0)
const best      = ref(0)
const current   = ref({ part: PARTS[0], jacques: true, text: '' })
const remaining = ref(START_MS)
const limit     = ref(START_MS)
const lastOk    = ref(false)
const lastMsg   = ref('')
const announce  = ref('')
const showText  = ref(true)
const noVoice   = ref(false)
const clicked   = ref(null)

const canSpeak = computed(() => supported && !noVoice.value)
const timerPct = computed(() => Math.max(0, (remaining.value / limit.value) * 100))

const overMsg = computed(() => {
  if (score.value >= 25) return 'Impressionnant. Jacques ne vous aura pas.'
  if (score.value >= 15) return 'Très bien : vous écoutez la phrase entière avant de bouger.'
  if (score.value >= 8)  return "Bien. Le piège, c'est de partir sur le nom de la partie sans attendre le début."
  return "Écoutez les trois premiers mots avant tout le reste : c'est là que tout se joue."
})

/* Deux minuteurs, et c'est la règle du chapitre : le décompte et la pause qui
   laisse lire la correction. Les deux sont annulés au démontage, et le rappel
   revérifie la phase — le temps peut expirer pendant qu'il attend. */
let tick = null
let gap  = null

function clearTimers() {
  clearInterval(tick); tick = null
  clearTimeout(gap);   gap = null
}

function say() {
  if (!supported) return
  speak(current.value.text, 0.95)
  // `getVoices()` est vide tant que `voiceschanged` n'a pas été émis : on ne
  // peut donc juger qu'APRÈS la première lecture, jamais au montage.
  if (!hasVoice.value) { noVoice.value = true; showText.value = true }
}

function nextOrder() {
  const part = PARTS[Math.floor(Math.random() * PARTS.length)]
  const verb = VERBS[Math.floor(Math.random() * VERBS.length)]
  // Un ordre sur deux environ est un piège : moins souvent, le joueur cesse
  // d'écouter le début ; plus souvent, il cesse de bouger.
  const jacques = Math.random() < 0.55
  const order = `${verb} ${part.det}${part.n}`
  current.value = {
    part,
    jacques,
    text: jacques
      ? `Jacques a dit : ${order}.`
      : order.charAt(0).toUpperCase() + order.slice(1) + '.',
  }
  clicked.value = null
  limit.value = Math.max(FLOOR_MS, START_MS - score.value * STEP_MS)
  remaining.value = limit.value
  phase.value = 'playing'
  announce.value = current.value.text
  say()

  clearInterval(tick)
  tick = setInterval(() => {
    remaining.value -= 100
    if (remaining.value <= 0) {
      clearInterval(tick); tick = null
      if (phase.value === 'playing') resolve({ type: 'timeout' })
    }
  }, 100)
}

function resolve(action) {
  if (phase.value !== 'playing') return
  clearInterval(tick); tick = null
  cancel()

  const must = current.value.jacques
  const label = current.value.part.det + current.value.part.n
  let ok

  if (action.type === 'part') {
    clicked.value = action.id
    ok = must && action.id === current.value.part.id
    if (ok) lastMsg.value = `✓ ${label} — ${current.value.part.es}`
    else if (!must) lastMsg.value = "✗ Jacques n'a rien dit : il ne fallait pas bouger."
    else {
      const got = PARTS.find(p => p.id === action.id)
      lastMsg.value = `✗ C'était ${label}, pas ${got.det}${got.n}.`
    }
  } else if (action.type === 'still') {
    ok = !must
    lastMsg.value = ok
      ? "✓ Bien vu : Jacques n'avait rien dit."
      : `✗ Jacques avait parlé : il fallait toucher ${label}.`
  } else {
    ok = !must
    lastMsg.value = ok
      ? "✓ Vous n'avez pas bougé, et c'était la bonne réponse."
      : `✗ Trop tard : c'était ${label}.`
  }

  lastOk.value = ok
  announce.value = lastMsg.value
  if (ok) { score.value++; if (score.value > best.value) best.value = score.value }
  else lives.value--

  phase.value = 'feedback'
  gap = setTimeout(() => {
    if (phase.value !== 'feedback') return
    if (lives.value <= 0) { phase.value = 'over'; clearTimers() }
    else nextOrder()
  }, ok ? 900 : 1900)
}

const hitPart  = (id) => resolve({ type: 'part', id })
const hitStill = ()   => resolve({ type: 'still' })

function start() {
  clearTimers()
  lives.value = LIVES
  score.value = 0
  nextOrder()
}

function partClass(id) {
  if (phase.value !== 'feedback') return ''
  if (id === current.value.part.id && current.value.jacques) return 'target'
  if (id === clicked.value && !lastOk.value) return 'wrong'
  return ''
}

onUnmounted(() => { clearTimers(); cancel() })
</script>

<style scoped>
/* Le décor commun aux jeux (.jeu, .instructions, les boutons, .stats) est
   dans style.css ; ici, seule la planche de Jacques a dit. */

.warn-voice {
  margin: 0;
  max-width: 34rem;
  padding: 0.7rem 1rem;
  background: var(--warn-soft);
  border-left: 4px solid var(--warn);
  border-radius: 0 var(--radius) var(--radius) 0;
  font-size: 0.85rem;
  line-height: 1.55;
  color: var(--text-1);
}

/* ── Bandeau ──────────────────────────────────── */
.hud {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 0.5rem 0.9rem;
  font-family: var(--font-sans);
  font-size: 0.8rem;
  color: var(--text-2);
}

.lives { font-size: 1rem; color: var(--danger); letter-spacing: 0.1em; }
.lives .spent { opacity: 0.25; }

.hud-btn {
  padding: 0.3rem 0.7rem;
  border: 1px solid var(--border-strong);
  border-radius: var(--radius-sm);
  background: var(--surface-2);
  color: var(--text-2);
  font-family: var(--font-sans);
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;
}

.hud-btn:hover:not(:disabled) { border-color: var(--accent); background: var(--accent-subtle); }
.hud-btn:disabled { opacity: 0.4; cursor: default; }

.timer-track {
  width: 100%;
  max-width: 24rem;
  height: 5px;
  background: var(--border);
  border-radius: 3px;
  overflow: hidden;
}

.timer-fill {
  height: 100%;
  background: var(--accent);
  border-radius: 3px;
  transition: width 0.1s linear;
}

@media (prefers-reduced-motion: reduce) {
  .timer-fill { transition: none; }
}

.order {
  margin: 0;
  min-height: 2.2rem;
  max-width: 30rem;
  text-align: center;
  font-family: var(--font-serif);
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--text-1);
}

.order-masked { color: var(--text-3); font-weight: 400; font-style: italic; }

/* ── La figure ────────────────────────────────── */
.figure {
  width: 100%;
  max-width: 15rem;
  height: auto;
}

.part ellipse,
.part rect {
  fill: var(--surface-2);
  stroke: var(--border-strong);
  stroke-width: 1.5;
  transition: fill 0.15s, stroke 0.15s;
}

.part { cursor: pointer; }

.part:hover ellipse,
.part:hover rect {
  fill: var(--accent-subtle);
  stroke: var(--accent);
}

.part:focus-visible { outline: none; }

.part:focus-visible ellipse,
.part:focus-visible rect {
  stroke: var(--accent);
  stroke-width: 3;
}

/* La bonne partie s'allume à la correction même si le joueur ne l'a pas
   touchée : montrer où elle était est tout l'intérêt de la pause. */
.part.target ellipse,
.part.target rect {
  fill: var(--success-soft);
  stroke: var(--success);
  stroke-width: 2.5;
}

.part.wrong ellipse,
.part.wrong rect {
  fill: var(--danger-soft);
  stroke: var(--danger);
  stroke-width: 2.5;
}

/* ── Verdict et fin ───────────────────────────── */
.verdict {
  min-height: 1.4rem;
  max-width: 30rem;
  text-align: center;
  font-family: var(--font-sans);
  font-size: 0.9rem;
  font-weight: 700;
}

.verdict.ok { color: var(--success-text); }
.verdict.ko { color: var(--danger-text); }

.over {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.6rem;
  padding: 1.5rem 0;
  text-align: center;
}

.over-score {
  margin: 0;
  font-family: var(--font-sans);
  font-size: 3rem;
  font-weight: 800;
  line-height: 1;
  color: var(--accent);
}

.over-total { font-size: 1.1rem; font-weight: 400; color: var(--text-3); }

.over-msg {
  margin: 0;
  max-width: 26rem;
  font-family: var(--font-serif);
  font-style: italic;
  color: var(--text-2);
}
</style>
