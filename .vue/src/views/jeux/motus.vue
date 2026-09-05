<!-- view-meta: created=2026-08-31; updated=2026-08-31 -->
<template>
  <DefaultLayout title="Motus">
    <main class="jeu motus">

      <p class="instructions">
        Trouvez le mot de <strong>cinq lettres</strong> en <strong>six essais</strong>.
        Après chaque essai, chaque lettre change de couleur. Tapez les lettres
        <strong>sans accent</strong>&nbsp;: le jeu les ajoute pour vous.
      </p>

      <ul class="legend">
        <li class="lg-ok">bien placée</li>
        <li class="lg-misplaced">mal placée</li>
        <li class="lg-absent">absente du mot</li>
      </ul>

      <!-- ── La grille ───────────────────────────── -->
      <div class="board" role="group" aria-label="Grille de jeu">
        <div v-for="(row, r) in board" :key="r" class="row" :class="{ shake: shakeRow === r }">
          <div
            v-for="(cell, c) in row"
            :key="c"
            class="tile"
            :class="cell.state"
          >{{ cell.ch }}<span class="sr-only">{{ STATE_LABEL[cell.state] }}</span></div>
        </div>
      </div>

      <p class="sr-only" aria-live="polite">{{ announce }}</p>
      <p v-if="message" class="message">{{ message }}</p>

      <!-- ── Fin de partie ───────────────────────── -->
      <div v-if="phase !== 'playing'" class="reveal">
        <p class="reveal-verdict" :class="phase">
          {{ phase === 'won' ? verdictWon : 'Perdu !' }}
        </p>
        <p class="reveal-word">
          <strong>{{ target.w }}</strong> — <em>{{ target.es }}</em>
        </p>
        <RouterLink class="lesson-link" :to="target.page">
          Réviser ce mot dans : {{ pageTitle }}
        </RouterLink>
      </div>

      <!-- ── Le clavier ──────────────────────────── -->
      <div v-else class="keyboard" role="group" aria-label="Clavier AZERTY">
        <div v-for="(row, r) in KEYBOARD" :key="r" class="krow">
          <button
            v-if="r === 2"
            type="button"
            class="key key-wide"
            aria-label="Effacer la dernière lettre"
            @click="erase"
          >⌫</button>

          <button
            v-for="ch in row"
            :key="ch"
            type="button"
            class="key"
            :class="keyStates[ch]"
            :aria-label="`Lettre ${ch}${keyStates[ch] ? ', ' + STATE_LABEL[keyStates[ch]] : ''}`"
            @click="type(ch)"
          >{{ ch }}</button>

          <button
            v-if="r === 2"
            type="button"
            class="key key-wide"
            aria-label="Valider le mot"
            :disabled="current.length !== LEN"
            @click="submit"
          >↵</button>
        </div>
      </div>

      <!-- ── Actions ─────────────────────────────── -->
      <div class="actions">
        <button
          v-if="phase === 'playing'"
          type="button"
          class="btn-ghost"
          :disabled="guesses.length < 2 || hintShown"
          @click="hintShown = true"
        >{{ hintShown ? `Indice : ${target.es}` : 'Indice (après 2 essais)' }}</button>
        <button v-else type="button" class="btn-main" @click="nextWord">Nouveau mot</button>
      </div>

      <p v-if="hintShown && phase === 'playing'" class="hint">
        En espagnol&nbsp;: <em>{{ target.es }}</em>
      </p>

      <p class="stats">
        Parties&nbsp;: <strong>{{ played }}</strong>
        <span class="sep">·</span>
        Série en cours&nbsp;: <strong>{{ streak }}</strong>
      </p>

      <RelatedLinks />

    </main>
  </DefaultLayout>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import RelatedLinks from '@/components/RelatedLinks.vue'
import { findLesson } from '@/data/navigation'
import { shuffle } from '@/utils/shuffle'

const LEN  = 5
const ROWS = 6

/* Un clavier AZERTY, pas QWERTY ni l'ordre alphabétique : c'est celui que le
   learner trouvera sur un ordinateur français, et le jeu est une occasion
   gratuite de s'y habituer. La touche ⌫ et la touche ↵ encadrent la dernière
   rangée, comme sur un vrai clavier de téléphone. */
const KEYBOARD = ['AZERTYUIOP', 'QSDFGHJKLM', 'WXCVBN']

const STATE_LABEL = {
  ok:        ' (bien placée)',
  misplaced: ' (mal placée)',
  absent:    ' (absente)',
  '':        '',
}

/* Tous les mots viennent d'une page du livre, et la partie se termine par un
   lien vers elle : le jeu renvoie au cours au lieu de vivre à côté.

   Chaque mot fait exactement cinq lettres, accents compris — « CRÈME » en fait
   cinq, pas six. Le contrôle en bas du fichier le vérifie, ainsi que le fait
   que la page citée existe encore. Aucun mot ne contient œ ni ç : le premier
   ne se tape pas sur un clavier espagnol, le second se replierait sur un C et
   rendrait la case verte trompeuse. */
const WORDS = [
  { w: 'POMME', es: 'una manzana',   page: '/vocabulaire/la-nourriture' },
  { w: 'POIRE', es: 'una pera',      page: '/vocabulaire/la-nourriture' },
  { w: 'SUCRE', es: 'el azúcar',     page: '/vocabulaire/la-nourriture' },
  { w: 'HUILE', es: 'el aceite',     page: '/vocabulaire/la-nourriture' },
  { w: 'CRÈME', es: 'la nata',       page: '/vocabulaire/la-nourriture' },
  { w: 'PÂTES', es: 'la pasta',      page: '/vocabulaire/la-nourriture' },
  { w: 'TRAIN', es: 'el tren',       page: '/vocabulaire/les-transports' },
  { w: 'AVION', es: 'el avión',      page: '/vocabulaire/les-transports' },
  { w: 'MÉTRO', es: 'el metro',      page: '/vocabulaire/les-transports' },
  { w: 'USINE', es: 'la fábrica',    page: '/vocabulaire/le-travail' },
  { w: 'ROUGE', es: 'rojo',          page: '/vocabulaire/les-couleurs' },
  { w: 'JAUNE', es: 'amarillo',      page: '/vocabulaire/les-couleurs' },
  { w: 'BLANC', es: 'blanco',        page: '/vocabulaire/les-couleurs' },
  { w: 'VESTE', es: 'la chaqueta',   page: '/vocabulaire/les-vetements' },
  { w: 'MUSÉE', es: 'el museo',      page: '/vocabulaire/la-ville' },
  { w: 'JAMBE', es: 'la pierna',     page: '/vocabulaire/le-corps' },
  { w: 'DOIGT', es: 'el dedo',       page: '/vocabulaire/le-corps' },
  { w: 'DENTS', es: 'los dientes',   page: '/vocabulaire/le-corps' },
  { w: 'FRÈRE', es: 'el hermano',    page: '/vocabulaire/la-famille' },
  { w: 'ONCLE', es: 'el tío',        page: '/vocabulaire/la-famille' },
  { w: 'TANTE', es: 'la tía',        page: '/vocabulaire/la-famille' },
  { w: 'FILLE', es: 'la hija',       page: '/vocabulaire/la-famille' },
  { w: 'NEIGE', es: 'la nieve',      page: '/vocabulaire/la-meteo' },
  { w: 'PLUIE', es: 'la lluvia',     page: '/vocabulaire/la-meteo' },
  { w: 'NUAGE', es: 'la nube',       page: '/vocabulaire/la-meteo' },
  { w: 'HIVER', es: 'el invierno',   page: '/vocabulaire/la-meteo' },
  { w: 'LUNDI', es: 'lunes',         page: '/vocabulaire/les-jours-et-la-date' },
  { w: 'MARDI', es: 'martes',        page: '/vocabulaire/les-jours-et-la-date' },
  { w: 'AVRIL', es: 'abril',         page: '/vocabulaire/les-jours-et-la-date' },
  { w: 'ANNÉE', es: 'el año',        page: '/vocabulaire/les-jours-et-la-date' },
  { w: 'HEURE', es: 'la hora',       page: '/vocabulaire/l-heure' },
  { w: 'TROIS', es: 'tres',          page: '/vocabulaire/les-nombres' },
  { w: 'DOUZE', es: 'doce',          page: '/vocabulaire/les-nombres' },
  { w: 'SEIZE', es: 'dieciséis',     page: '/vocabulaire/les-nombres' },
  { w: 'MILLE', es: 'mil',           page: '/vocabulaire/les-nombres' },
  { w: 'TABLE', es: 'la mesa',       page: '/vocabulaire/la-maison' },
  { w: 'PORTE', es: 'la puerta',     page: '/vocabulaire/la-maison' },
  { w: 'SALON', es: 'el salón',      page: '/vocabulaire/la-maison' },
  { w: 'ÉCOLE', es: 'la escuela',    page: '/vocabulaire/100-mots-les-plus-utilises' },
  { w: 'PLACE', es: 'la plaza',      page: '/vocabulaire/la-ville' },
]

/* Contrôle des données — à relancer après toute modification de WORDS :

   node --input-type=module -e "
   import { readFileSync } from 'node:fs';
   const src = readFileSync('src/views/jeux/motus.vue', 'utf8');
   const rows = [...src.matchAll(/\{\s*w:\s*'([^']+)',\s*es:\s*'([^']+)',\s*page:\s*'([^']+)'\s*\}/g)];
   const declared = src.match(/const WORDS = \[([\s\S]*?)\n\]/)[1]
     .split('\n').filter(l => l.trim().startsWith('{ w:')).length;
   if (rows.length !== declared) console.log('REGEX INCOMPLÈTE :', rows.length, 'sur', declared, 'lignes');
   const nav = readFileSync('src/data/navigation.js', 'utf8');
   const fold = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '');
   for (const [, w, es, page] of rows) {
     if ([...w].length !== 5)        console.log('PAS 5 LETTRES', w, [...w].length);
     if (fold(w).length !== w.length) console.log('REPLI NON 1:1', w);
     if (!/^[A-Z]{5}$/.test(fold(w))) console.log('CARACTÈRE HORS A-Z', w, fold(w));
     if (!nav.includes(page))         console.log('PAGE INTROUVABLE', w, page);
     // Le mot doit être SUR la page vers laquelle la partie renvoie : une page
     // qui existe ne garantit pas qu'elle contienne le mot. Trois entrées sont
     // parties là-dessus.
     const txt = readFileSync('src/views' + page + '.vue', 'utf8')
       .normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
     const bare = w.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
     if (!new RegExp('\\b' + bare + 's?\\b').test(txt))
                                      console.log('MOT ABSENT DE SA PAGE', w, page);
   }
   const seen = new Set(rows.map(r => r[1]));
   if (seen.size !== rows.length) console.log('DOUBLON dans WORDS');
   console.log(rows.length, 'mots vérifiés');"
*/

/** Enlève les accents et met en capitales : c'est ce que le learner tape. */
const fold = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toUpperCase()

/* La file est mélangée une fois puis parcourue : on ne revoit pas le même mot
   avant d'avoir fait le tour des quarante. */
const queue = ref(shuffle(WORDS))
const cursor = ref(0)

const target       = computed(() => queue.value[cursor.value])
const targetFolded = computed(() => fold(target.value.w))
const pageTitle    = computed(() => findLesson(target.value.page)?.title ?? 'le vocabulaire')

const guesses   = ref([])          // essais validés, déjà évalués
const current   = ref('')          // les lettres en cours de saisie
const phase     = ref('playing')   // 'playing' | 'won' | 'lost'
const keyStates = ref({})          // lettre → meilleur état connu
const hintShown = ref(false)
const message   = ref('')
const announce  = ref('')
const shakeRow  = ref(-1)
const played    = ref(0)
const streak    = ref(0)

const verdictWon = computed(() => {
  const n = guesses.value.length
  if (n === 1) return 'Extraordinaire !'
  if (n === 2) return 'Magnifique !'
  if (n <= 4)  return 'Bien joué !'
  return 'Ouf, trouvé !'
})

/* La grille est toujours dessinée en entier : six rangées de cinq cases, dont
   les essais validés, la ligne en cours, puis des cases vides. */
const board = computed(() => {
  const rows = guesses.value.map(g => g.slice())
  if (phase.value === 'playing') {
    rows.push(Array.from({ length: LEN }, (_, i) => ({
      ch: current.value[i] ?? '',
      state: '',
    })))
  }
  while (rows.length < ROWS) {
    rows.push(Array.from({ length: LEN }, () => ({ ch: '', state: '' })))
  }
  return rows
})

/**
 * Évalue un essai en DEUX passes, et c'est la seule façon correcte de le faire.
 *
 * Une passe unique se trompe dès qu'une lettre est répétée : si le mot est
 * POMME et qu'on propose PILON, le premier O est mal placé, mais le deuxième
 * (il n'y en a qu'un dans POMME) doit rester gris. La première passe fige les
 * lettres bien placées et compte ce qui reste réellement disponible ; la
 * seconde ne peut donc plus distribuer de jaune qui n'existe pas.
 */
function evaluate(guess) {
  const answer = targetFolded.value
  const states = new Array(LEN).fill(null)
  const pool = {}

  for (let i = 0; i < LEN; i++) {
    if (guess[i] === answer[i]) states[i] = 'ok'
    else pool[answer[i]] = (pool[answer[i]] ?? 0) + 1
  }

  for (let i = 0; i < LEN; i++) {
    if (states[i]) continue
    const ch = guess[i]
    if (pool[ch] > 0) { states[i] = 'misplaced'; pool[ch]-- }
    else states[i] = 'absent'
  }

  // Une case bien placée affiche la lettre accentuée du mot : on tape E, on
  // lit É. C'est là que l'accent s'apprend, sans jamais avoir à le taper.
  return states.map((state, i) => ({
    ch: state === 'ok' ? target.value.w[i] : guess[i],
    state,
  }))
}

const RANK = { absent: 0, misplaced: 1, ok: 2 }

function type(ch) {
  if (phase.value !== 'playing' || current.value.length >= LEN) return
  current.value += ch
  message.value = ''
}

function erase() {
  if (phase.value !== 'playing') return
  current.value = current.value.slice(0, -1)
  message.value = ''
}

function submit() {
  if (phase.value !== 'playing') return
  if (current.value.length !== LEN) {
    message.value = `Il faut ${LEN} lettres.`
    shakeRow.value = guesses.value.length
    setTimeout(() => { shakeRow.value = -1 }, 400)
    return
  }

  const row = evaluate(current.value)
  guesses.value.push(row)

  // Le clavier ne garde que la meilleure information connue sur chaque lettre :
  // une lettre devenue verte ne doit pas repasser au gris à l'essai suivant.
  row.forEach((cell, i) => {
    const key = current.value[i]
    const best = keyStates.value[key]
    if (!best || RANK[cell.state] > RANK[best]) keyStates.value[key] = cell.state
  })

  if (current.value === targetFolded.value) {
    phase.value = 'won'
    played.value++
    streak.value++
    announce.value = `Gagné en ${guesses.value.length} essais. Le mot était ${target.value.w}.`
  } else if (guesses.value.length >= ROWS) {
    phase.value = 'lost'
    played.value++
    streak.value = 0
    announce.value = `Perdu. Le mot était ${target.value.w}.`
  } else {
    announce.value = `Essai ${guesses.value.length} : ` +
      row.map(c => c.ch + STATE_LABEL[c.state]).join(', ')
  }

  current.value = ''
}

function nextWord() {
  cursor.value++
  if (cursor.value >= queue.value.length) {
    queue.value = shuffle(WORDS)
    cursor.value = 0
  }
  guesses.value = []
  current.value = ''
  keyStates.value = {}
  phase.value = 'playing'
  hintShown.value = false
  message.value = ''
  announce.value = 'Nouveau mot.'
}

/* Le clavier physique marche aussi, pour qui joue sur un ordinateur. Les
   lettres accentuées tapées à la main sont repliées, donc « é » entre comme E
   et le jeu reste jouable depuis un clavier espagnol. */
function onKeydown(e) {
  if (e.ctrlKey || e.metaKey || e.altKey) return
  if (e.key === 'Enter')     { submit(); return }
  if (e.key === 'Backspace') { erase(); e.preventDefault(); return }
  const ch = fold(e.key)
  if (ch.length === 1 && ch >= 'A' && ch <= 'Z') type(ch)
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onUnmounted(() => window.removeEventListener('keydown', onKeydown))
</script>

<style scoped>
/* Le décor commun aux jeux (.jeu, .instructions, les boutons, .stats) est
   dans style.css ; ici, seule la planche de Motus. */

/* ── Légende ──────────────────────────────────── */
.legend {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.35rem 1rem;
  margin: 0;
  padding: 0;
  list-style: none;
  font-family: var(--font-sans);
  font-size: 0.7rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--text-2);
}

.legend li { display: flex; align-items: center; gap: 0.35rem; }

.legend li::before {
  content: "";
  width: 0.7rem;
  height: 0.7rem;
  border-radius: 2px;
  border: 1px solid var(--border-strong);
}

.lg-ok::before        { background: var(--success); border-color: var(--success); }
.lg-misplaced::before { background: var(--warn); border-color: var(--warn); }
.lg-absent::before    { background: var(--surface-3); }

/* ── La grille ────────────────────────────────── */
.board {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.row {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0.35rem;
}

.tile {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3.1rem;
  aspect-ratio: 1;
  border: 2px solid var(--border-strong);
  border-radius: var(--radius-sm);
  background: var(--surface-1);
  font-family: var(--font-serif);
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--text-1);
  text-transform: uppercase;
}

.tile.ok {
  background: var(--success);
  border-color: var(--success);
  color: var(--text-on-accent);
}

.tile.misplaced {
  background: var(--warn);
  border-color: var(--warn);
  color: var(--text-on-accent);
}

/* L'absence est la seule information dont le joueur se sert pour éliminer :
   elle est marquée par le fond ET par un texte estompé, pour ne pas reposer
   sur la seule couleur. */
.tile.absent {
  background: var(--surface-3);
  border-color: var(--surface-3);
  color: var(--text-3);
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25%      { transform: translateX(-5px); }
  75%      { transform: translateX(5px); }
}

.row.shake { animation: shake 0.4s; }

@media (prefers-reduced-motion: reduce) {
  .row.shake { animation: none; }
}

.message {
  margin: 0;
  font-family: var(--font-sans);
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--danger-text);
}

/* ── Fin de partie ────────────────────────────── */
.reveal {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;
  text-align: center;
}

.reveal-verdict {
  margin: 0;
  font-family: var(--font-sans);
  font-size: 1.1rem;
  font-weight: 800;
}

.reveal-verdict.won  { color: var(--success-text); }
.reveal-verdict.lost { color: var(--danger-text); }

.reveal-word {
  margin: 0;
  font-family: var(--font-serif);
  font-size: 1.25rem;
  color: var(--text-1);
}

/* ── Le clavier ───────────────────────────────── */
.keyboard {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  width: 100%;
  max-width: 30rem;
}

.krow {
  display: flex;
  justify-content: center;
  gap: 0.25rem;
}

.key {
  flex: 1 1 0;
  min-width: 0;
  padding: 0.75rem 0.2rem;
  border: 1px solid var(--border-strong);
  border-radius: var(--radius-sm);
  background: var(--surface-2);
  color: var(--text-1);
  font-family: var(--font-sans);
  font-size: 0.9rem;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.15s, border-color 0.15s, opacity 0.15s;
}

.key-wide { flex: 1.5 1 0; }

.key:not(:disabled):hover {
  border-color: var(--accent);
  background: var(--accent-subtle);
}

.key:disabled { opacity: 0.4; cursor: default; }

.key.ok {
  background: var(--success);
  border-color: var(--success);
  color: var(--text-on-accent);
}

.key.misplaced {
  background: var(--warn);
  border-color: var(--warn);
  color: var(--text-on-accent);
}

/* Une lettre éliminée est barrée en plus d'être grisée : le joueur qui ne
   distingue pas les couleurs doit pouvoir lire le clavier lui aussi. */
.key.absent {
  background: var(--surface-3);
  border-color: var(--surface-3);
  color: var(--text-3);
  text-decoration: line-through;
}

/* ── Pied ─────────────────────────────────────── */
.hint {
  margin: 0;
  font-family: var(--font-serif);
  font-style: italic;
  color: var(--text-2);
}

@media (max-width: 26rem) {
  .tile { width: 2.6rem; font-size: 1.35rem; }
}
</style>
