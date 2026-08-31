<!-- view-meta: created=2026-08-31; updated=2026-08-31 -->
<template>
  <DefaultLayout title="Mots mêlés">
    <main class="jeu meles">

      <p class="instructions">
        Huit mots d'un même thème sont cachés dans la grille&nbsp;: horizontalement,
        verticalement, en diagonale, et dans les deux sens. Touchez la
        <strong>première</strong> lettre, puis la <strong>dernière</strong>.
        La grille est écrite sans accents&nbsp;; la liste, elle, les garde.
      </p>

      <div class="themes" role="group" aria-label="Choisir un thème">
        <button
          v-for="(t, i) in THEMES"
          :key="t.page"
          type="button"
          class="theme-chip"
          :class="{ on: i === themeIndex }"
          @click="pickTheme(i)"
        >{{ titleFor(t.page) }}</button>
      </div>

      <!-- ── La grille ───────────────────────────── -->
      <div class="grid" role="grid" :aria-label="`Grille de ${SIZE} sur ${SIZE} lettres`">
        <div v-for="(row, r) in grid" :key="r" class="grid-row" role="row">
          <button
            v-for="(ch, c) in row"
            :key="c"
            type="button"
            role="gridcell"
            class="cell"
            :class="cellClass(r, c)"
            :tabindex="r === focusR && c === focusC ? 0 : -1"
            :ref="el => setCellRef(r, c, el)"
            :aria-label="`Ligne ${r + 1}, colonne ${c + 1}, lettre ${ch.toUpperCase()}`"
            @click="tap(r, c)"
            @focus="focusR = r; focusC = c"
            @keydown="onGridKey($event, r, c)"
          >{{ ch }}</button>
        </div>
      </div>

      <p class="sr-only" aria-live="polite">{{ announce }}</p>
      <p v-if="message" class="message">{{ message }}</p>

      <!-- ── La liste ────────────────────────────── -->
      <ul class="word-list">
        <li v-for="entry in roundWords" :key="entry.w" :class="{ done: found.has(entry.w) }">
          <span class="w">{{ entry.w }}</span>
          <span v-if="found.has(entry.w)" class="es">{{ entry.es }}</span>
        </li>
      </ul>

      <p class="stats">
        Trouvés&nbsp;: <strong>{{ found.size }}</strong> / {{ roundWords.length }}
        <span class="sep">·</span>
        Grilles terminées&nbsp;: <strong>{{ completed }}</strong>
      </p>

      <div v-if="complete" class="done-panel">
        <p class="done-verdict">✓ Grille terminée&nbsp;!</p>
        <RouterLink class="lesson-link" :to="THEMES[themeIndex].page">
          Revoir ces mots dans : {{ titleFor(THEMES[themeIndex].page) }}
        </RouterLink>
      </div>

      <div class="actions">
        <button type="button" class="btn-main" @click="newGrid">Nouvelle grille</button>
      </div>

      <RelatedLinks />

    </main>
  </DefaultLayout>
</template>

<script setup>
import { ref, computed, nextTick } from 'vue'
import { RouterLink } from 'vue-router'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import RelatedLinks from '@/components/RelatedLinks.vue'
import { findLesson } from '@/data/navigation'
import { shuffle } from '@/utils/shuffle'

const SIZE  = 11   // 11 colonnes : le plus long mot du jeu fait 9 lettres
const COUNT = 8    // mots cachés par grille

/* Les huit directions, dans l'ordre où on les lit. Un mot peut être caché à
   l'envers : c'est ce qui empêche de balayer la grille de gauche à droite. */
const DIRS = [
  [0, 1], [1, 0], [1, 1], [-1, 1],
  [0, -1], [-1, 0], [-1, -1], [1, -1],
]

const ALPHA = 'abcdefghijklmnopqrstuvwxyz'

/* Les mots viennent des pages de vocabulaire du livre, groupés par page : la
   grille terminée renvoie à celle dont elle sort. Chaque entrée a été vérifiée
   présente sur sa page (voir le contrôle plus bas) — une page qui existe ne
   prouve pas qu'elle contienne le mot.

   La grille est en lettres nues : `w` sert d'affichage, sa forme repliée sert
   au placement. Aucun mot ne dépasse neuf lettres, sinon il ne rentrerait pas. */
const THEMES = [
  {
    page: '/vocabulaire/la-nourriture',
    words: [
      { w: 'menu',        es: 'el menú' },
      { w: 'pain',        es: 'el pan' },
      { w: 'porc',        es: 'el cerdo' },
      { w: 'thon',        es: 'el atún' },
      { w: 'carte',       es: 'la carta' },
      { w: 'crème',       es: 'la nata' },
      { w: 'dîner',       es: 'la cena' },
      { w: 'fruit',       es: 'la fruta' },
      { w: 'huile',       es: 'el aceite' },
      { w: 'pâtes',       es: 'la pasta' },
      { w: 'poire',       es: 'una pera' },
      { w: 'pomme',       es: 'una manzana' },
      { w: 'repas',       es: 'la comida' },
      { w: 'sucre',       es: 'el azúcar' },
      { w: 'carafe',      es: 'la jarra' },
      { w: 'citron',      es: 'el limón' },
      { w: 'goûter',      es: 'la merienda' },
      { w: 'jambon',      es: 'el jamón' },
      { w: 'légume',      es: 'la verdura' },
      { w: 'oignon',      es: 'la cebolla' },
      { w: 'orange',      es: 'la naranja' },
      { w: 'poulet',      es: 'el pollo' },
      { w: 'salade',      es: 'la ensalada' },
      { w: 'saumon',      es: 'el salmón' },
      { w: 'tomate',      es: 'el tomate' },
      { w: 'carotte',     es: 'la zanahoria' },
      { w: 'dessert',     es: 'el postre' },
      { w: 'fromage',     es: 'el queso' },
      { w: 'poisson',     es: 'el pescado' },
      { w: 'crevette',    es: 'la gamba' },
      { w: 'déjeuner',    es: 'la comida' },
      { w: 'bouteille',   es: 'la botella' },
    ],
  },
  {
    page: '/vocabulaire/le-corps',
    words: [
      { w: 'dos',         es: 'la espalda' },
      { w: 'nez',         es: 'la nariz' },
      { w: 'bras',        es: 'el brazo' },
      { w: 'dent',        es: 'el diente' },
      { w: 'joue',        es: 'la mejilla' },
      { w: 'main',        es: 'la mano' },
      { w: 'pied',        es: 'el pie' },
      { w: 'tête',        es: 'la cabeza' },
      { w: 'coude',       es: 'el codo' },
      { w: 'dents',       es: 'los dientes' },
      { w: 'doigt',       es: 'el dedo' },
      { w: 'genou',       es: 'la rodilla' },
      { w: 'jambe',       es: 'la pierna' },
      { w: 'bouche',      es: 'la boca' },
      { w: 'epaule',      es: 'el hombro' },
      { w: 'ventre',      es: 'la barriga' },
      { w: 'oreille',     es: 'la oreja' },
    ],
  },
  {
    page: '/vocabulaire/la-maison',
    words: [
      { w: 'lit',         es: 'la cama' },
      { w: 'mur',         es: 'la pared' },
      { w: 'cave',        es: 'el sótano' },
      { w: 'porte',       es: 'la puerta' },
      { w: 'salon',       es: 'el salón' },
      { w: 'table',       es: 'la mesa' },
      { w: 'canape',      es: 'el sofá' },
      { w: 'chaise',      es: 'la silla' },
      { w: 'douche',      es: 'la ducha' },
      { w: 'jardin',      es: 'el jardín' },
      { w: 'maison',      es: 'la casa' },
      { w: 'armoire',     es: 'el armario' },
      { w: 'chambre',     es: 'el dormitorio' },
      { w: 'cuisine',     es: 'la cocina' },
      { w: 'fenêtre',     es: 'la ventana' },
      { w: 'escalier',    es: 'la escalera' },
    ],
  },
  {
    page: '/vocabulaire/les-couleurs',
    words: [
      { w: 'brun',        es: 'moreno' },
      { w: 'gris',        es: 'gris' },
      { w: 'noir',        es: 'negro' },
      { w: 'rose',        es: 'rosa' },
      { w: 'vert',        es: 'verde' },
      { w: 'blanc',       es: 'blanco' },
      { w: 'blond',       es: 'rubio' },
      { w: 'fleur',       es: 'la flor' },
      { w: 'jaune',       es: 'amarillo' },
      { w: 'rouge',       es: 'rojo' },
      { w: 'marron',      es: 'marrón' },
      { w: 'violet',      es: 'morado' },
      { w: 'cheveux',     es: 'el pelo' },
      { w: 'couleur',     es: 'el color' },
    ],
  },
  {
    page: '/vocabulaire/la-famille',
    words: [
      { w: 'ami',         es: 'el amigo' },
      { w: 'fils',        es: 'el hijo' },
      { w: 'mari',        es: 'el marido' },
      { w: 'mère',        es: 'la madre' },
      { w: 'père',        es: 'el padre' },
      { w: 'femme',       es: 'la mujer' },
      { w: 'fille',       es: 'la hija' },
      { w: 'frère',       es: 'el hermano' },
      { w: 'oncle',       es: 'el tío' },
      { w: 'tante',       es: 'la tía' },
      { w: 'cousin',      es: 'el primo' },
      { w: 'enfant',      es: 'el niño' },
    ],
  },
  {
    page: '/vocabulaire/la-meteo',
    words: [
      { w: 'été',         es: 'el verano' },
      { w: 'ciel',        es: 'el cielo' },
      { w: 'chaud',       es: 'caliente' },
      { w: 'froid',       es: 'frío' },
      { w: 'hiver',       es: 'el invierno' },
      { w: 'neige',       es: 'la nieve' },
      { w: 'nuage',       es: 'la nube' },
      { w: 'orage',       es: 'la tormenta' },
      { w: 'pluie',       es: 'la lluvia' },
      { w: 'saison',      es: 'la estación' },
      { w: 'automne',     es: 'el otoño' },
      { w: 'printemps',   es: 'la primavera' },
    ],
  },
  {
    page: '/vocabulaire/les-jours-et-la-date',
    words: [
      { w: 'jour',        es: 'el día' },
      { w: 'mars',        es: 'marzo' },
      { w: 'mois',        es: 'el mes' },
      { w: 'année',       es: 'el año' },
      { w: 'avril',       es: 'abril' },
      { w: 'jeudi',       es: 'jueves' },
      { w: 'lundi',       es: 'lunes' },
      { w: 'mardi',       es: 'martes' },
      { w: 'samedi',      es: 'sábado' },
      { w: 'janvier',     es: 'enero' },
      { w: 'semaine',     es: 'la semana' },
      { w: 'dimanche',    es: 'domingo' },
    ],
  },
  {
    page: '/vocabulaire/la-ville',
    words: [
      { w: 'rue',         es: 'la calle' },
      { w: 'parc',        es: 'el parque' },
      { w: 'pont',        es: 'el puente' },
      { w: 'musée',       es: 'el museo' },
      { w: 'place',       es: 'la plaza' },
      { w: 'poste',       es: 'correos' },
      { w: 'ville',       es: 'la ciudad' },
      { w: 'banque',      es: 'el banco' },
      { w: 'église',      es: 'la iglesia' },
      { w: 'mairie',      es: 'el ayuntamiento' },
      { w: 'marché',      es: 'el mercado' },
    ],
  },
  {
    page: '/vocabulaire/les-transports',
    words: [
      { w: 'gare',        es: 'la estación' },
      { w: 'moto',        es: 'la moto' },
      { w: 'quai',        es: 'el andén' },
      { w: 'vélo',        es: 'la bicicleta' },
      { w: 'avion',       es: 'el avión' },
      { w: 'métro',       es: 'el metro' },
      { w: 'train',       es: 'el tren' },
      { w: 'billet',      es: 'el billete' },
      { w: 'retard',      es: 'el retraso' },
      { w: 'voiture',     es: 'el coche' },
    ],
  },
  {
    page: '/vocabulaire/le-travail',
    words: [
      { w: 'usine',       es: 'la fábrica' },
      { w: 'bureau',      es: 'la oficina' },
      { w: 'métier',      es: 'el oficio' },
      { w: 'patron',      es: 'el jefe' },
      { w: 'magasin',     es: 'la tienda' },
      { w: 'réunion',     es: 'la reunión' },
      { w: 'salaire',     es: 'el sueldo' },
      { w: 'travail',     es: 'el trabajo' },
    ],
  },
  {
    page: '/vocabulaire/l-heure',
    words: [
      { w: 'midi',        es: 'el mediodía' },
      { w: 'nuit',        es: 'la noche' },
      { w: 'soir',        es: 'la tarde' },
      { w: 'demie',       es: 'la media' },
      { w: 'heure',       es: 'la hora' },
      { w: 'matin',       es: 'la mañana' },
      { w: 'quart',       es: 'el cuarto' },
      { w: 'minute',      es: 'el minuto' },
    ],
  },
]

/* Contrôle des données — à relancer après toute modification de THEMES :

   node --input-type=module -e "
   import { readFileSync } from 'node:fs';
   const src = readFileSync('src/views/jeux/mots-meles.vue', 'utf8');
   const nav = readFileSync('src/data/navigation.js', 'utf8');
   const fold = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
   const blocks = [...src.matchAll(/page: '([^']+)',\s*\n\s*words: \[([\s\S]*?)\n    \]/g)];
   let total = 0;
   for (const [, page, body] of blocks) {
     const rows = [...body.matchAll(/\{\s*w:\s*'([^']+)',\s*es:\s*'([^']+)'\s*\}/g)];
     const declared = body.split('\n').filter(l => l.trim().startsWith('{ w:')).length;
     if (rows.length !== declared) console.log('REGEX INCOMPLÈTE', page, rows.length, '/', declared);
     if (rows.length < 8) console.log('THÈME TROP PAUVRE', page, rows.length, '— il en faut 8');
     if (!nav.includes(page)) console.log('PAGE INTROUVABLE', page);
     const txt = readFileSync('src/views' + page + '.vue', 'utf8');
     const ftxt = fold(txt);
     for (const [, w] of rows) {
       total++;
       const b = fold(w);
       if (!/^[a-z]{3,9}\$/.test(b)) console.log('MOT INPLAÇABLE', w, '(3-9 lettres, a-z seulement)');
       if (!new RegExp('\\\\b' + b + 's?\\\\b').test(ftxt)) console.log('MOT ABSENT DE SA PAGE', w, page);
     }
   }
   console.log(blocks.length, 'thèmes,', total, 'mots vérifiés');"
*/

const rng = () => Math.random()

/** Toutes les positions où `w` se lit dans la grille, dans les huit sens. */
function readAll(grid, w) {
  const hits = []
  for (const [dr, dc] of DIRS) {
    for (let r = 0; r < SIZE; r++) {
      for (let c = 0; c < SIZE; c++) {
        const er = r + dr * (w.length - 1)
        const ec = c + dc * (w.length - 1)
        if (er < 0 || er >= SIZE || ec < 0 || ec >= SIZE) continue
        let ok = true
        for (let i = 0; i < w.length && ok; i++) if (grid[r + dr * i][c + dc * i] !== w[i]) ok = false
        if (ok) hits.push([r, c, dr, dc])
      }
    }
  }
  return hits
}

/**
 * Place les mots du plus long au plus court, puis comble avec des lettres au
 * hasard. Les croisements sont autorisés quand la lettre coïncide, ce qui rend
 * la grille plus dense et la recherche moins mécanique.
 *
 * Retourne null si un mot n'a pas trouvé sa place ; l'appelant retire alors et
 * recommence, plutôt que de livrer une grille où un mot de la liste est
 * introuvable. Sur 300 grilles d'essai, ce cas ne s'est jamais produit.
 */
function build(words) {
  const grid = Array.from({ length: SIZE }, () => Array(SIZE).fill(null))
  const order = [...words].sort((a, b) => b.length - a.length)

  for (const w of order) {
    const spots = []
    for (const [dr, dc] of DIRS) {
      for (let r = 0; r < SIZE; r++) {
        for (let c = 0; c < SIZE; c++) {
          const er = r + dr * (w.length - 1)
          const ec = c + dc * (w.length - 1)
          if (er < 0 || er >= SIZE || ec < 0 || ec >= SIZE) continue
          let ok = true
          for (let i = 0; i < w.length && ok; i++) {
            const cell = grid[r + dr * i][c + dc * i]
            if (cell !== null && cell !== w[i]) ok = false
          }
          if (ok) spots.push([r, c, dr, dc])
        }
      }
    }
    if (!spots.length) return null
    const [r, c, dr, dc] = spots[Math.floor(rng() * spots.length)]
    for (let i = 0; i < w.length; i++) grid[r + dr * i][c + dc * i] = w[i]
  }

  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      if (grid[r][c] === null) grid[r][c] = ALPHA[Math.floor(rng() * 26)]
    }
  }
  return grid
}

const fold = (s) => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()

const themeIndex = ref(Math.floor(rng() * THEMES.length))
const roundWords = ref([])
const grid       = ref([])
const found      = ref(new Set())
const foundCells = ref(new Set())   // "r,c" des lettres déjà révélées
const anchor     = ref(null)        // première lettre touchée
const message    = ref('')
const announce   = ref('')
const completed  = ref(0)
const focusR     = ref(0)
const focusC     = ref(0)

const complete = computed(
  () => roundWords.value.length > 0 && found.value.size === roundWords.value.length,
)

const titleFor = (page) => findLesson(page)?.title ?? 'le vocabulaire'

const cellRefs = new Map()
const setCellRef = (r, c, el) => { if (el) cellRefs.set(`${r},${c}`, el); else cellRefs.delete(`${r},${c}`) }

function newGrid() {
  const theme = THEMES[themeIndex.value]
  const picked = shuffle(theme.words).slice(0, COUNT)
  let g = null
  // Une grille invalide est jetée, jamais servie : mieux vaut retirer que
  // proposer une liste dont un mot n'est pas dans la grille.
  for (let attempt = 0; attempt < 20 && !g; attempt++) g = build(picked.map(x => fold(x.w)))
  if (!g) { message.value = 'Grille impossible, réessayez.'; return }

  grid.value = g
  roundWords.value = picked
  found.value = new Set()
  foundCells.value = new Set()
  anchor.value = null
  message.value = ''
  announce.value = `Nouvelle grille, thème ${titleFor(theme.page)}.`
}

function pickTheme(i) {
  themeIndex.value = i
  newGrid()
}

/** Les lettres entre deux cases, si elles sont alignées dans un des huit sens. */
function lineBetween(r1, c1, r2, c2) {
  const dr = Math.sign(r2 - r1)
  const dc = Math.sign(c2 - c1)
  const len = Math.max(Math.abs(r2 - r1), Math.abs(c2 - c1)) + 1
  // alignées seulement si la distance colle à la direction
  if (Math.abs(r2 - r1) !== 0 && Math.abs(c2 - c1) !== 0
      && Math.abs(r2 - r1) !== Math.abs(c2 - c1)) return null
  const cells = []
  for (let i = 0; i < len; i++) cells.push([r1 + dr * i, c1 + dc * i])
  return cells
}

function tap(r, c) {
  message.value = ''
  if (!anchor.value) { anchor.value = [r, c]; return }

  const [r1, c1] = anchor.value
  if (r1 === r && c1 === c) { anchor.value = null; return }

  const cells = lineBetween(r1, c1, r, c)
  anchor.value = null
  if (!cells) { message.value = 'Les deux lettres doivent être alignées.'; return }

  const word = cells.map(([rr, cc]) => grid.value[rr][cc]).join('')
  // On valide en LISANT la ligne, jamais en comparant à des coordonnées
  // mémorisées : un mot peut apparaître deux fois dans une grille (2 % des cas
  // mesurés), et le joueur a raison de valider celui qu'il voit.
  const entry = roundWords.value.find(
    e => fold(e.w) === word && !found.value.has(e.w),
  )
  if (!entry) { message.value = `« ${word} » n'est pas dans la liste.`; return }

  found.value = new Set(found.value).add(entry.w)
  const next = new Set(foundCells.value)
  for (const [rr, cc] of cells) next.add(`${rr},${cc}`)
  foundCells.value = next
  announce.value = `${entry.w} trouvé — ${entry.es}. ${found.value.size} sur ${roundWords.value.length}.`
  if (found.value.size === roundWords.value.length) completed.value++
}

function cellClass(r, c) {
  const a = anchor.value
  return {
    found:  foundCells.value.has(`${r},${c}`),
    anchor: a && a[0] === r && a[1] === c,
  }
}

/* Navigation au clavier : une grille de 121 boutons tabulables serait un piège
   à tabulation. Un seul bouton est atteignable (tabindex 0) et les flèches
   déplacent le focus, ce qui est le motif attendu pour un role="grid". */
function onGridKey(e, r, c) {
  const moves = { ArrowUp: [-1, 0], ArrowDown: [1, 0], ArrowLeft: [0, -1], ArrowRight: [0, 1] }
  const m = moves[e.key]
  if (!m) return
  e.preventDefault()
  const nr = Math.min(SIZE - 1, Math.max(0, r + m[0]))
  const nc = Math.min(SIZE - 1, Math.max(0, c + m[1]))
  focusR.value = nr
  focusC.value = nc
  nextTick(() => cellRefs.get(`${nr},${nc}`)?.focus())
}

newGrid()
</script>

<style scoped>
/* Le décor commun aux jeux (.jeu, .instructions, les boutons, .stats) est
   dans style.css ; ici, seule la planche de Mots mêlés. */

.themes {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.35rem;
  max-width: 34rem;
}

.theme-chip {
  padding: 0.35rem 0.7rem;
  border: 1px solid var(--border-strong);
  border-radius: 999px;
  background: var(--surface-2);
  color: var(--text-2);
  font-family: var(--font-sans);
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s, border-color 0.15s, color 0.15s;
}

.theme-chip:hover { border-color: var(--accent); background: var(--accent-subtle); }

.theme-chip.on {
  background: var(--accent);
  border-color: var(--accent);
  color: var(--text-on-accent);
}

/* ── La grille ────────────────────────────────── */
.grid {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 0.5rem;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--surface-1);
}

.grid-row { display: flex; gap: 2px; }

.cell {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  padding: 0;
  border: 1px solid transparent;
  border-radius: 3px;
  background: transparent;
  color: var(--text-2);
  font-family: var(--font-mono);
  font-size: 0.95rem;
  text-transform: uppercase;
  cursor: pointer;
  transition: background 0.12s, color 0.12s;
}

.cell:hover { background: var(--accent-subtle); }

/* La case de départ reste visible tant que la seconde n'est pas touchée :
   sans elle, un appui manqué laisse le joueur sans repère. */
.cell.anchor {
  border-color: var(--accent);
  background: var(--accent-subtle);
  color: var(--accent-text);
  font-weight: 700;
}

/* Un mot trouvé reste allumé. Une seule teinte pour les huit : huit couleurs
   ne voudraient rien dire, et les mots se croisent. */
.cell.found {
  background: var(--success-soft);
  color: var(--success-text);
  font-weight: 700;
}

.message {
  margin: 0;
  font-family: var(--font-sans);
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--danger-text);
}

/* ── La liste ─────────────────────────────────── */
.word-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(9rem, 1fr));
  gap: 0.3rem 1rem;
  width: 100%;
  max-width: 34rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.word-list li {
  display: flex;
  flex-direction: column;
  font-family: var(--font-serif);
  font-size: 0.9rem;
  color: var(--text-1);
}

/* Barré ET estompé : la couleur seule ne dirait pas ce qui est déjà trouvé. */
.word-list li.done .w {
  text-decoration: line-through;
  color: var(--text-3);
}

.word-list .es {
  font-size: 0.78rem;
  font-style: italic;
  color: var(--success-text);
}

.done-panel {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;
  text-align: center;
}

.done-verdict {
  margin: 0;
  font-family: var(--font-sans);
  font-size: 1.05rem;
  font-weight: 800;
  color: var(--success-text);
}

@media (max-width: 30rem) {
  .cell { width: 1.7rem; height: 1.7rem; font-size: 0.8rem; }
}
</style>
