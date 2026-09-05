<!-- view-meta: created=2026-08-31; updated=2026-08-31 -->
<template>
  <DefaultLayout title="Un ou une ?">
    <main class="jeu genre">

      <p class="instructions">
        Un nom apparaît&nbsp;: dites s'il est <strong>masculin</strong> ou
        <strong>féminin</strong>. Il n'y a ni fin ni score — seulement une série,
        qui repart à zéro à chaque erreur.
      </p>

      <p class="stats">
        Meilleure série&nbsp;: <strong>{{ best }}</strong>
        <span class="sep">·</span>
        Noms vus&nbsp;: <strong>{{ seen }}</strong>
      </p>

      <!-- ── La carte ────────────────────────────── -->
      <div class="card-noun" :class="phase">
        <p class="streak" :class="{ hot: streak >= 5 }">
          Série&nbsp;: <strong>{{ streak }}</strong><span v-if="streak >= 5"> 🔥</span>
        </p>

        <!-- Le nom est seul pendant la question. La traduction espagnole
             n'apparaît qu'à la correction : affichée avant, elle donnerait la
             réponse pour les deux tiers des noms, et induirait en erreur pour
             l'autre tiers — ce qui est justement ce qu'on veut tester. -->
        <p class="noun">
          <span v-if="phase !== 'asking'" class="article">{{ current.g === 'm' ? 'un' : 'une' }}</span>
          {{ current.n }}
        </p>

        <p v-if="phase === 'asking'" class="prompt">masculin ou féminin&nbsp;?</p>
        <p v-else class="gloss"><em>{{ current.es }}</em></p>
      </div>

      <!-- ── Les deux boutons ────────────────────── -->
      <div class="choices" role="group" aria-label="Choisissez le genre">
        <button
          type="button"
          class="choice"
          :class="choiceState('m')"
          :disabled="phase !== 'asking'"
          @click="answer('m')"
        >un</button>
        <button
          type="button"
          class="choice"
          :class="choiceState('f')"
          :disabled="phase !== 'asking'"
          @click="answer('f')"
        >une</button>
      </div>

      <p class="sr-only" aria-live="polite">{{ announce }}</p>

      <!-- ── La correction ───────────────────────── -->
      <div v-if="phase === 'wrong'" class="correction">
        <p class="verdict">✗ C'était <strong>{{ current.g === 'm' ? 'un' : 'une' }} {{ current.n }}</strong></p>

        <p v-if="isTrap" class="trap">
          ⚠ <strong>Piège&nbsp;:</strong> en espagnol, <em>{{ current.es }}</em> est
          {{ current.esg === 'm' ? 'masculin' : 'féminin' }} — le français dit l'inverse.
          C'est un des {{ trapCount }} noms de ce jeu où les deux langues ne sont pas d'accord.
        </p>
        <p v-else class="same">
          Les deux langues sont d'accord ici&nbsp;: <em>{{ current.es }}</em> est
          {{ current.esg === 'm' ? 'masculin' : 'féminin' }} lui aussi.
        </p>

        <RouterLink class="lesson-link" :to="current.page">
          Revoir ce mot dans : {{ pageTitle }}
        </RouterLink>
      </div>

      <div class="actions">
        <button v-if="phase === 'wrong'" type="button" class="btn-main" @click="next">
          Continuer
        </button>
        <RouterLink v-else class="btn-ghost" to="/astuces/le-genre-des-noms">
          Revoir l'astuce
        </RouterLink>
      </div>

      <RelatedLinks />

    </main>
  </DefaultLayout>
</template>

<script setup>
import { ref, computed, onUnmounted, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import RelatedLinks from '@/components/RelatedLinks.vue'
import { findLesson } from '@/data/navigation'
import { shuffle } from '@/utils/shuffle'

/* Le genre espagnol est stocké (`esg`), jamais déduit de l'article écrit dans
   `es` : « el agua » est un nom FÉMININ qui prend el au singulier, et une
   déduction le classerait masculin, inventant un piège qui n'existe pas.
   Le contrôle plus bas compare quand même les deux et n'autorise l'écart que
   pour cette famille de mots, ce qui attrape les vraies fautes de frappe.

   Le piège, lui, n'est pas stocké : il se déduit de `g !== esg`. Une donnée
   dérivée ne peut pas contredire celle dont elle vient.

   Les noms viennent des pages de vocabulaire du livre, et chaque erreur
   renvoie à la page d'origine.

   **Uniquement des noms comptables.** Le jeu demande « un ou une ? », or un nom
   massif ne prend pas d'article indéfini au singulier : on dit « DU poivre »,
   « DE LA farine », « DE L'eau » — « un poivre » n'existe pas. Vingt noms de
   ce genre ont été retirés le 2026-08-31 ; la liste MASS du contrôle plus bas
   les nomme et vérifie qu'aucun n'est revenu. Le partitif est une autre
   compétence, enseignée dans `grammaire/les-articles` et appliquée dans
   `vocabulaire/la-nourriture` — il mérite son propre jeu, pas une case ici. */
const NOUNS = [
  // ── La nourriture ──
  { n: 'pain',        g: 'm', es: 'el pan',       esg: 'm', page: '/vocabulaire/la-nourriture' },
  { n: 'poisson',     g: 'm', es: 'el pescado',   esg: 'm', page: '/vocabulaire/la-nourriture' },
  { n: 'fromage',     g: 'm', es: 'el queso',     esg: 'm', page: '/vocabulaire/la-nourriture' },
  { n: 'pomme',       g: 'f', es: 'la manzana',   esg: 'f', page: '/vocabulaire/la-nourriture' },
  { n: 'poire',       g: 'f', es: 'la pera',      esg: 'f', page: '/vocabulaire/la-nourriture' },
  { n: 'tomate',      g: 'f', es: 'el tomate',    esg: 'm', page: '/vocabulaire/la-nourriture' },
  { n: 'carotte',     g: 'f', es: 'la zanahoria', esg: 'f', page: '/vocabulaire/la-nourriture' },
  { n: 'oignon',      g: 'm', es: 'la cebolla',   esg: 'f', page: '/vocabulaire/la-nourriture' },
  { n: 'citron',      g: 'm', es: 'el limón',     esg: 'm', page: '/vocabulaire/la-nourriture' },
  { n: 'orange',      g: 'f', es: 'la naranja',   esg: 'f', page: '/vocabulaire/la-nourriture' },
  { n: 'poulet',      g: 'm', es: 'el pollo',     esg: 'm', page: '/vocabulaire/la-nourriture' },
  { n: 'jambon',      g: 'm', es: 'el jamón',     esg: 'm', page: '/vocabulaire/la-nourriture' },
  { n: 'fruit',       g: 'm', es: 'la fruta',     esg: 'f', page: '/vocabulaire/la-nourriture' },
  { n: 'légume',      g: 'm', es: 'la verdura',   esg: 'f', page: '/vocabulaire/la-nourriture' },
  { n: 'repas',       g: 'm', es: 'la comida',    esg: 'f', page: '/vocabulaire/la-nourriture' },
  { n: 'déjeuner',    g: 'm', es: 'la comida',    esg: 'f', page: '/vocabulaire/la-nourriture' },
  { n: 'dîner',       g: 'm', es: 'la cena',      esg: 'f', page: '/vocabulaire/la-nourriture' },
  { n: 'goûter',      g: 'm', es: 'la merienda',  esg: 'f', page: '/vocabulaire/la-nourriture' },
  { n: 'dessert',     g: 'm', es: 'el postre',    esg: 'm', page: '/vocabulaire/la-nourriture' },
  { n: 'bouteille',   g: 'f', es: 'la botella',   esg: 'f', page: '/vocabulaire/la-nourriture' },

  // ── Les transports ──
  { n: 'train',       g: 'm', es: 'el tren',      esg: 'm', page: '/vocabulaire/les-transports' },
  { n: 'avion',       g: 'm', es: 'el avión',     esg: 'm', page: '/vocabulaire/les-transports' },
  { n: 'voiture',     g: 'f', es: 'el coche',     esg: 'm', page: '/vocabulaire/les-transports' },
  { n: 'métro',       g: 'm', es: 'el metro',     esg: 'm', page: '/vocabulaire/les-transports' },
  { n: 'vélo',        g: 'm', es: 'la bicicleta', esg: 'f', page: '/vocabulaire/les-transports' },
  { n: 'gare',        g: 'f', es: 'la estación',  esg: 'f', page: '/vocabulaire/les-transports' },
  { n: 'billet',      g: 'm', es: 'el billete',   esg: 'm', page: '/vocabulaire/les-transports' },

  // ── Les vêtements ──
  { n: 'robe',        g: 'f', es: 'el vestido',   esg: 'm', page: '/vocabulaire/les-vetements' },
  { n: 'veste',       g: 'f', es: 'la chaqueta',  esg: 'f', page: '/vocabulaire/les-vetements' },
  { n: 'pantalon',    g: 'm', es: 'el pantalón',  esg: 'm', page: '/vocabulaire/les-vetements' },
  { n: 'chemise',     g: 'f', es: 'la camisa',    esg: 'f', page: '/vocabulaire/les-vetements' },
  { n: 'jupe',        g: 'f', es: 'la falda',     esg: 'f', page: '/vocabulaire/les-vetements' },
  { n: 'chaussure',   g: 'f', es: 'el zapato',    esg: 'm', page: '/vocabulaire/les-vetements' },
  { n: 'manteau',     g: 'm', es: 'el abrigo',    esg: 'm', page: '/vocabulaire/les-vetements' },
  { n: 'chaussette',  g: 'f', es: 'el calcetín',  esg: 'm', page: '/vocabulaire/les-vetements' },

  // ── Le corps ──
  { n: 'tête',        g: 'f', es: 'la cabeza',    esg: 'f', page: '/vocabulaire/le-corps' },
  { n: 'bras',        g: 'm', es: 'el brazo',     esg: 'm', page: '/vocabulaire/le-corps' },
  { n: 'jambe',       g: 'f', es: 'la pierna',    esg: 'f', page: '/vocabulaire/le-corps' },
  { n: 'main',        g: 'f', es: 'la mano',      esg: 'f', page: '/vocabulaire/le-corps' },
  { n: 'doigt',       g: 'm', es: 'el dedo',      esg: 'm', page: '/vocabulaire/le-corps' },
  { n: 'nez',         g: 'm', es: 'la nariz',     esg: 'f', page: '/vocabulaire/le-corps' },
  { n: 'bouche',      g: 'f', es: 'la boca',      esg: 'f', page: '/vocabulaire/le-corps' },
  { n: 'oreille',     g: 'f', es: 'la oreja',     esg: 'f', page: '/vocabulaire/le-corps' },
  { n: 'dos',         g: 'm', es: 'la espalda',   esg: 'f', page: '/vocabulaire/le-corps' },
  { n: 'dent',        g: 'f', es: 'el diente',    esg: 'm', page: '/vocabulaire/le-corps' },
  { n: 'pied',        g: 'm', es: 'el pie',       esg: 'm', page: '/vocabulaire/le-corps' },

  // ── La famille ──
  { n: 'père',        g: 'm', es: 'el padre',     esg: 'm', page: '/vocabulaire/la-famille' },
  { n: 'mère',        g: 'f', es: 'la madre',     esg: 'f', page: '/vocabulaire/la-famille' },
  { n: 'frère',       g: 'm', es: 'el hermano',   esg: 'm', page: '/vocabulaire/la-famille' },
  { n: 'oncle',       g: 'm', es: 'el tío',       esg: 'm', page: '/vocabulaire/la-famille' },
  { n: 'tante',       g: 'f', es: 'la tía',       esg: 'f', page: '/vocabulaire/la-famille' },
  { n: 'fille',       g: 'f', es: 'la hija',      esg: 'f', page: '/vocabulaire/la-famille' },
  { n: 'fils',        g: 'm', es: 'el hijo',      esg: 'm', page: '/vocabulaire/la-famille' },

  // ── La météo ──
  { n: 'nuage',       g: 'm', es: 'la nube',      esg: 'f', page: '/vocabulaire/la-meteo' },
  { n: 'hiver',       g: 'm', es: 'el invierno',  esg: 'm', page: '/vocabulaire/la-meteo' },
  { n: 'été',         g: 'm', es: 'el verano',    esg: 'm', page: '/vocabulaire/la-meteo' },
  { n: 'printemps',   g: 'm', es: 'la primavera', esg: 'f', page: '/vocabulaire/la-meteo' },
  { n: 'automne',     g: 'm', es: 'el otoño',     esg: 'm', page: '/vocabulaire/la-meteo' },
  { n: 'orage',       g: 'm', es: 'la tormenta',  esg: 'f', page: '/vocabulaire/la-meteo' },
  { n: 'saison',      g: 'f', es: 'la estación',  esg: 'f', page: '/vocabulaire/la-meteo' },

  // ── La maison ──
  { n: 'maison',      g: 'f', es: 'la casa',      esg: 'f', page: '/vocabulaire/la-maison' },
  { n: 'table',       g: 'f', es: 'la mesa',      esg: 'f', page: '/vocabulaire/la-maison' },
  { n: 'porte',       g: 'f', es: 'la puerta',    esg: 'f', page: '/vocabulaire/la-maison' },
  { n: 'chaise',      g: 'f', es: 'la silla',     esg: 'f', page: '/vocabulaire/la-maison' },
  { n: 'lit',         g: 'm', es: 'la cama',      esg: 'f', page: '/vocabulaire/la-maison' },
  { n: 'fenêtre',     g: 'f', es: 'la ventana',   esg: 'f', page: '/vocabulaire/la-maison' },
  { n: 'salon',       g: 'm', es: 'el salón',     esg: 'm', page: '/vocabulaire/la-maison' },
  { n: 'cuisine',     g: 'f', es: 'la cocina',    esg: 'f', page: '/vocabulaire/la-maison' },
  { n: 'mur',         g: 'm', es: 'la pared',     esg: 'f', page: '/vocabulaire/la-maison' },
  { n: 'chambre',     g: 'f', es: 'el dormitorio',esg: 'm', page: '/vocabulaire/la-maison' },
  { n: 'jardin',      g: 'm', es: 'el jardín',    esg: 'm', page: '/vocabulaire/la-maison' },
  { n: 'escalier',    g: 'm', es: 'la escalera',  esg: 'f', page: '/vocabulaire/la-maison' },

  // ── La ville ──
  { n: 'ville',       g: 'f', es: 'la ciudad',    esg: 'f', page: '/vocabulaire/la-ville' },
  { n: 'place',       g: 'f', es: 'la plaza',     esg: 'f', page: '/vocabulaire/la-ville' },
  { n: 'rue',         g: 'f', es: 'la calle',     esg: 'f', page: '/vocabulaire/la-ville' },
  { n: 'pont',        g: 'm', es: 'el puente',    esg: 'm', page: '/vocabulaire/la-ville' },
  { n: 'église',      g: 'f', es: 'la iglesia',   esg: 'f', page: '/vocabulaire/la-ville' },
  { n: 'marché',      g: 'm', es: 'el mercado',   esg: 'm', page: '/vocabulaire/la-ville' },
  { n: 'banque',      g: 'f', es: 'el banco',     esg: 'm', page: '/vocabulaire/la-ville' },
  { n: 'parc',        g: 'm', es: 'el parque',    esg: 'm', page: '/vocabulaire/la-ville' },

  // ── Les 100 mots ──
  { n: 'école',       g: 'f', es: 'la escuela',   esg: 'f', page: '/vocabulaire/100-mots-les-plus-utilises' },

  // ── Le travail ──
  { n: 'magasin',     g: 'm', es: 'la tienda',    esg: 'f', page: '/vocabulaire/le-travail' },
  { n: 'travail',     g: 'm', es: 'el trabajo',   esg: 'm', page: '/vocabulaire/le-travail' },
  { n: 'bureau',      g: 'm', es: 'la oficina',   esg: 'f', page: '/vocabulaire/le-travail' },
  { n: 'métier',      g: 'm', es: 'el oficio',    esg: 'm', page: '/vocabulaire/le-travail' },
  { n: 'usine',       g: 'f', es: 'la fábrica',   esg: 'f', page: '/vocabulaire/le-travail' },
  { n: 'réunion',     g: 'f', es: 'la reunión',   esg: 'f', page: '/vocabulaire/le-travail' },

  // ── L'heure ──
  { n: 'heure',       g: 'f', es: 'la hora',      esg: 'f', page: '/vocabulaire/l-heure' },
  { n: 'minute',      g: 'f', es: 'el minuto',    esg: 'm', page: '/vocabulaire/l-heure' },
  { n: 'nuit',        g: 'f', es: 'la noche',     esg: 'f', page: '/vocabulaire/l-heure' },
  { n: 'matin',       g: 'm', es: 'la mañana',    esg: 'f', page: '/vocabulaire/l-heure' },

  // ── Les jours ──
  { n: 'jour',        g: 'm', es: 'el día',       esg: 'm', page: '/vocabulaire/les-jours-et-la-date' },
  { n: 'semaine',     g: 'f', es: 'la semana',    esg: 'f', page: '/vocabulaire/les-jours-et-la-date' },
  { n: 'mois',        g: 'm', es: 'el mes',       esg: 'm', page: '/vocabulaire/les-jours-et-la-date' },
  { n: 'année',       g: 'f', es: 'el año',       esg: 'm', page: '/vocabulaire/les-jours-et-la-date' },

  // ── Chez le docteur ──
  { n: 'douleur',     g: 'f', es: 'el dolor',     esg: 'm', page: '/vocabulaire/le-docteur' },
  { n: 'rhume',       g: 'm', es: 'el resfriado', esg: 'm', page: '/vocabulaire/le-docteur' },
  { n: 'fièvre',      g: 'f', es: 'la fiebre',    esg: 'f', page: '/vocabulaire/le-docteur' },
  { n: 'ordonnance',  g: 'f', es: 'la receta',    esg: 'f', page: '/vocabulaire/le-docteur' },
  { n: 'pharmacie',   g: 'f', es: 'la farmacia',  esg: 'f', page: '/vocabulaire/le-docteur' },

  // ── Les couleurs ──
  { n: 'couleur',     g: 'f', es: 'el color',     esg: 'm', page: '/vocabulaire/les-couleurs' },
  { n: 'fleur',       g: 'f', es: 'la flor',      esg: 'f', page: '/vocabulaire/les-couleurs' },
]

/* Contrôle des données — à relancer après toute modification de NOUNS :

   node --input-type=module -e "
   import { readFileSync } from 'node:fs';
   const src = readFileSync('src/views/jeux/un-ou-une.vue', 'utf8');
   const nav = readFileSync('src/data/navigation.js', 'utf8');
   // Tolérant aux espaces d'alignement : une regex trop stricte saute une ligne
   // en silence, et un contrôle qui saute une ligne ne contrôle rien. D'où le
   // comptage croisé avec le nombre de lignes de données juste après.
   const rows = [...src.matchAll(/\{\s*n:\s*'([^']+)',\s*g:\s*'([mf])',\s*es:\s*'([^']+)',\s*esg:\s*'([mf])',\s*page:\s*'([^']+)'\s*\}/g)];
   const declared = src.match(/const NOUNS = \[([\s\S]*?)\n\]/)[1]
     .split('\n').filter(l => l.trim().startsWith('{ n:')).length;
   if (rows.length !== declared) console.log('REGEX INCOMPLÈTE :', rows.length, 'sur', declared, 'lignes');
   // Un nom féminin espagnol écrit avec « el » n'est licite que pour la famille
   // agua/alma/hambre : a- tonique. Toute autre discordance est une faute.
   const EL_FEMININ = [];
   // Noms massifs retirés : « un poivre » n'est pas du français. Aucun ne doit
   // revenir, et rien dans la donnée ne le signale — d'où cette liste.
   const MASS = ['lait','beurre','creme','huile','sel','poivre','sucre','farine','riz',
                 'viande','confiture','eau','vin','biere','sang','neige','pluie','vent',
                 'soleil','sante'];
   const bare0 = x => x.normalize('NFD').replace(/[̀-ͯ]/g, '');
   const seen = new Set();
   for (const [, n, g, es, esg, page] of rows) {
     const art = es.split(' ')[0];
     const fromArt = art === 'el' ? 'm' : art === 'la' ? 'f' : null;
     if (!fromArt)                            console.log('ARTICLE ABSENT', n, es);
     else if (fromArt !== esg && !EL_FEMININ.includes(es))
                                              console.log('ARTICLE/GENRE INCOHÉRENTS', n, es, esg);
     if (!nav.includes(page))                 console.log('PAGE INTROUVABLE', n, page);
     // Le nom doit être SUR la page vers laquelle l'erreur renvoie. Six entrées
     // pointaient vers une page qui ne les contenait pas.
     const txt = readFileSync('src/views' + page + '.vue', 'utf8')
       .normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
     const bare = n.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
     if (!new RegExp('\\b' + bare + 's?\\b').test(txt))
                                              console.log('NOM ABSENT DE SA PAGE', n, page);
     if (MASS.includes(bare0(n)))             console.log('NOM MASSIF REVENU', n, '— on dit du/de la, pas un/une');
     if (seen.has(n))                         console.log('DOUBLON', n);
     seen.add(n);
   }
   const traps = rows.filter(r => r[2] !== r[4]);
   console.log(rows.length, 'noms —', traps.length, 'pièges :', traps.map(r => r[1]).join(' '));"
*/

const TRAP_COUNT = NOUNS.filter(x => x.g !== x.esg).length

const pool   = ref(shuffle(NOUNS))
const cursor = ref(0)

const current   = computed(() => pool.value[cursor.value])
const isTrap    = computed(() => current.value.g !== current.value.esg)
const pageTitle = computed(() => findLesson(current.value.page)?.title ?? 'le vocabulaire')
const trapCount = TRAP_COUNT

const phase    = ref('asking')   // 'asking' | 'right' | 'wrong'
const picked   = ref(null)
const streak   = ref(0)
const best     = ref(0)
const seen     = ref(0)
const announce = ref('')

/* Une bonne réponse enchaîne toute seule : le jeu vit de son rythme. Une
   mauvaise s'arrête et attend un clic — la correction ne sert à rien si elle
   disparaît avant d'être lue. */
let advanceTimer = null

function choiceState(g) {
  if (phase.value === 'asking') return ''
  if (g === current.value.g) return 'ok'
  if (g === picked.value) return 'ko'
  return 'muted'
}

function answer(g) {
  if (phase.value !== 'asking') return
  picked.value = g
  seen.value++

  if (g === current.value.g) {
    phase.value = 'right'
    streak.value++
    if (streak.value > best.value) best.value = streak.value
    announce.value = `Correct : ${g === 'm' ? 'un' : 'une'} ${current.value.n}. Série ${streak.value}.`
    // La phase est revérifiée au réveil : le composant peut avoir été démonté,
    // ou le joueur avoir déjà avancé à la main.
    advanceTimer = setTimeout(() => {
      if (phase.value === 'right') next()
    }, 700)
  } else {
    phase.value = 'wrong'
    streak.value = 0
    announce.value =
      `Faux. C'était ${current.value.g === 'm' ? 'un' : 'une'} ${current.value.n}, ` +
      `en espagnol ${current.value.es}.`
  }
}

function next() {
  clearTimeout(advanceTimer)
  cursor.value++
  // La pioche est remélangée quand elle est épuisée : le jeu n'a pas de fin,
  // seulement un tour complet avant de recommencer dans un autre ordre.
  if (cursor.value >= pool.value.length) {
    pool.value = shuffle(NOUNS)
    cursor.value = 0
  }
  phase.value = 'asking'
  picked.value = null
}

/* ← et → pour répondre, Entrée pour continuer : jouable au clavier sans viser
   deux boutons à la souris. */
function onKeydown(e) {
  if (e.ctrlKey || e.metaKey || e.altKey) return
  if (phase.value === 'asking') {
    if (e.key === 'ArrowLeft')  { answer('m'); e.preventDefault() }
    if (e.key === 'ArrowRight') { answer('f'); e.preventDefault() }
  } else if (phase.value === 'wrong' && (e.key === 'Enter' || e.key === ' ')) {
    next(); e.preventDefault()
  }
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onUnmounted(() => {
  clearTimeout(advanceTimer)
  window.removeEventListener('keydown', onKeydown)
})
</script>

<style scoped>
/* Le décor commun aux jeux (.jeu, .instructions, les boutons, .stats) est
   dans style.css ; ici, seule la planche de « Un ou une ? ». */

.card-noun {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  max-width: 26rem;
  padding: 2rem 1.5rem;
  border: 2px solid var(--border);
  border-radius: var(--radius);
  background: var(--surface-1);
  text-align: center;
  transition: border-color 0.2s, background 0.2s;
}

.card-noun.right {
  border-color: var(--success);
  background: var(--success-soft);
}

.card-noun.wrong {
  border-color: var(--danger);
  background: var(--danger-soft);
}

@media (prefers-reduced-motion: reduce) {
  .card-noun { transition: none; }
}

.streak {
  margin: 0;
  font-family: var(--font-sans);
  font-size: 0.72rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-3);
}

.streak.hot { color: var(--warn-text); }

.noun {
  margin: 0;
  font-family: var(--font-serif);
  font-size: 2rem;
  font-weight: 700;
  line-height: 1.2;
  color: var(--text-1);
}

/* L'article n'apparaît qu'à la correction, et c'est lui qu'on doit retenir —
   « une maison », jamais « maison » seul (astuces/le-genre-des-noms). */
.article {
  color: var(--accent-text);
}

.prompt,
.gloss {
  margin: 0;
  font-family: var(--font-serif);
  font-size: 0.9rem;
  font-style: italic;
  color: var(--text-3);
}

/* ── Les deux boutons ─────────────────────────── */
.choices {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
  width: 100%;
  max-width: 26rem;
}

.choice {
  padding: 1.1rem 0.5rem;
  border: 2px solid var(--border-strong);
  border-radius: var(--radius);
  background: var(--surface-2);
  color: var(--text-1);
  font-family: var(--font-serif);
  font-size: 1.5rem;
  font-weight: 700;
  cursor: pointer;
  transition: border-color 0.15s, background 0.15s, opacity 0.15s;
}

.choice:not(:disabled):hover {
  border-color: var(--accent);
  background: var(--accent-subtle);
}

.choice.ok {
  border-color: var(--success);
  background: var(--success-soft);
  color: var(--success-text);
}

.choice.ko {
  border-color: var(--danger);
  background: var(--danger-soft);
  color: var(--danger-text);
}

.choice.muted { opacity: 0.4; }
.choice:disabled { cursor: default; }

/* ── La correction ────────────────────────────── */
.correction {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  max-width: 30rem;
  text-align: center;
}

.verdict {
  margin: 0;
  font-family: var(--font-sans);
  font-size: 1rem;
  font-weight: 700;
  color: var(--danger-text);
}

.trap,
.same {
  margin: 0;
  font-family: var(--font-serif);
  font-size: 0.88rem;
  line-height: 1.6;
  color: var(--text-2);
}

.trap {
  padding: 0.7rem 1rem;
  background: var(--warn-soft);
  border-left: 4px solid var(--warn);
  border-radius: 0 var(--radius) var(--radius) 0;
  text-align: left;
  color: var(--text-1);
}
</style>
