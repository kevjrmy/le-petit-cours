<!-- view-meta: created=2026-08-02; updated=2026-08-02 -->
<template>
  <DefaultLayout title="Emoji & Français">
    <main id="emoji-game">

      <!-- ── Résultat final ───────────────────────── -->
      <div v-if="finished" class="result">
        <div class="result-emoji">{{ resultEmoji }}</div>
        <div class="result-score">{{ score }}<span class="result-total"> / {{ deck.length }}</span></div>
        <p class="result-msg">{{ resultMsg }}</p>
        <button class="btn-restart" @click="restart">Recommencer</button>
      </div>

      <!-- ── Jeu ─────────────────────────────────── -->
      <template v-else>
        <div class="meta">
          <span class="counter">{{ currentIndex + 1 }}&thinsp;/&thinsp;{{ deck.length }}</span>
          <div class="progress-track"
            role="progressbar"
            :aria-valuenow="currentIndex + 1"
            :aria-valuemax="deck.length"
            aria-label="Progression">
            <div class="progress-fill" :style="{ width: progressPct + '%' }"></div>
          </div>
        </div>

        <div class="card">
          <div class="emoji" role="img" :aria-label="'Question ' + (currentIndex + 1)">
            {{ current.emoji }}
          </div>

          <fieldset class="options" :class="{ answered: selected !== null }">
            <legend class="sr-only">Choisissez la bonne réponse en français</legend>
            <label
              v-for="opt in options"
              :key="opt"
              :class="['option', optionClass(opt)]"
            >
              <input
                type="radio"
                name="answer"
                :value="opt"
                :disabled="selected !== null"
                @change="choose(opt)"
                class="sr-only"
              />
              <span class="option-indicator" aria-hidden="true"></span>
              {{ opt }}
            </label>
          </fieldset>

          <div v-if="selected !== null" class="feedback">
            <span v-if="isCorrect" class="feedback-correct">✓ Correct !</span>
            <span v-else class="feedback-wrong">✗ C'était : <strong>{{ current.answer }}</strong></span>
          </div>

          <button
            v-if="selected !== null && !isCorrect"
            class="btn-next"
            @click="next"
          >
            {{ currentIndex < deck.length - 1 ? 'Suivant →' : 'Voir mon score' }}
          </button>
        </div>
      </template>

      <RelatedLinks />
    </main>
  </DefaultLayout>
</template>

<script setup>
import { ref, computed, onBeforeUnmount } from 'vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import RelatedLinks from '@/components/RelatedLinks.vue'
import { useExerciseScore } from '@/composables/useProgress'

// Larger pool — each round draws a random subset, so the game is different every time.
const POOL = [
  // ── Animaux ──
  { emoji: '🐱', answer: 'un chat',        distractors: ['un chien',    'un lapin',     'un oiseau']     },
  { emoji: '🐶', answer: 'un chien',       distractors: ['un renard',   'un loup',      'un chat']       },
  { emoji: '🐰', answer: 'un lapin',       distractors: ['un chat',     'un écureuil',  'une souris']    },
  { emoji: '🐴', answer: 'un cheval',      distractors: ['un âne',      'un mouton',    'un veau']       },
  { emoji: '🐮', answer: 'une vache',      distractors: ['une chèvre',  'une brebis',   'une jument']    },
  { emoji: '🐷', answer: 'un cochon',      distractors: ['un sanglier', 'un mouton',    'un veau']       },
  { emoji: '🐸', answer: 'une grenouille', distractors: ['un crapaud',  'un lézard',    'une tortue']    },
  { emoji: '🦋', answer: 'un papillon',    distractors: ['une abeille', 'une libellule','un moustique']  },
  { emoji: '🐝', answer: 'une abeille',    distractors: ['une guêpe',   'une mouche',   'une fourmi']    },
  { emoji: '🐢', answer: 'une tortue',     distractors: ['un escargot', 'un crabe',     'une grenouille']},
  { emoji: '🦁', answer: 'un lion',        distractors: ['un tigre',    'un guépard',   'un léopard']    },
  { emoji: '🐘', answer: 'un éléphant',    distractors: ['un rhinocéros','une girafe',  'un hippopotame']},
  { emoji: '🐻', answer: 'un ours',        distractors: ['un loup',     'un sanglier',  'un renard']     },
  { emoji: '🦊', answer: 'un renard',      distractors: ['un loup',     'un chien',     'un chat']       },
  { emoji: '🐔', answer: 'une poule',      distractors: ['un coq',      'une oie',      'un canard']     },
  { emoji: '🦆', answer: 'un canard',      distractors: ['une oie',     'un cygne',     'une poule']     },
  { emoji: '🐟', answer: 'un poisson',     distractors: ['un requin',   'une baleine',  'un dauphin']    },
  { emoji: '🐦', answer: 'un oiseau',      distractors: ['un aigle',    'un moineau',   'une mouette']   },
  { emoji: '🐭', answer: 'une souris',     distractors: ['un rat',      'un hamster',   'un lapin']      },
  { emoji: '🐌', answer: 'un escargot',    distractors: ['un ver',      'une limace',   'une tortue']    },
  // ── Nourriture ──
  { emoji: '🍎', answer: 'une pomme',      distractors: ['une poire',   'une orange',   'une cerise']    },
  { emoji: '🍌', answer: 'une banane',     distractors: ['une pomme',   'une fraise',   'une mangue']    },
  { emoji: '🍓', answer: 'une fraise',     distractors: ['une cerise',  'une framboise','une myrtille']  },
  { emoji: '🍊', answer: 'une orange',     distractors: ['un citron',   'une mandarine','un pamplemousse']},
  { emoji: '🍇', answer: 'du raisin',      distractors: ['des prunes',  'des cerises',  'des olives']    },
  { emoji: '🍅', answer: 'une tomate',     distractors: ['un poivron',  'une courgette','une aubergine'] },
  { emoji: '🥕', answer: 'une carotte',    distractors: ['un radis',    'un navet',     'une betterave'] },
  { emoji: '🍞', answer: 'du pain',        distractors: ['un gâteau',   'des biscuits', 'une tarte']     },
  { emoji: '🧀', answer: 'du fromage',     distractors: ['du beurre',   'du lait',      'du yaourt']     },
  { emoji: '🍰', answer: 'un gâteau',      distractors: ['une tarte',   'un biscuit',   'une crêpe']     },
  { emoji: '☕', answer: 'un café',         distractors: ['un thé',      'du lait',      'du jus']        },
  { emoji: '🍷', answer: 'du vin',         distractors: ['de la bière', 'du jus',       "de l'eau"]      },
  { emoji: '🥛', answer: 'du lait',        distractors: ['du jus',      "de l'eau",     'du thé']        },
  { emoji: '🥚', answer: 'un œuf',         distractors: ['une noix',    'une olive',    'un champignon'] },
  { emoji: '🍫', answer: 'du chocolat',    distractors: ['du caramel',  'du sucre',     'du miel']       },
  // ── Objets ──
  { emoji: '🚗', answer: 'une voiture',    distractors: ['un train',    'un bus',       'un vélo']       },
  { emoji: '🏠', answer: 'une maison',     distractors: ['un immeuble', 'une école',    'une église']    },
  { emoji: '✏️', answer: 'un crayon',      distractors: ['un stylo',    'une règle',    'un cahier']     },
  { emoji: '📚', answer: 'un livre',       distractors: ['un cahier',   'un journal',   'une revue']     },
  { emoji: '🔑', answer: 'une clé',        distractors: ['une serrure', 'une porte',    'un cadenas']    },
  { emoji: '🪑', answer: 'une chaise',     distractors: ['une table',   'un fauteuil',  'un tabouret']   },
  { emoji: '🛏️', answer: 'un lit',        distractors: ['un canapé',   'une armoire',  'un bureau']     },
  { emoji: '📱', answer: 'un téléphone',   distractors: ['un ordinateur','une tablette','une télévision']},
  { emoji: '🌂', answer: 'un parapluie',   distractors: ['un manteau',  'un chapeau',   'une écharpe']   },
  { emoji: '⌚', answer: 'une montre',      distractors: ['un réveil',   'une horloge',  'un bracelet']   },
  { emoji: '⏰', answer: 'un réveil',       distractors: ['une montre',  'une horloge',  'une pendule']   },
  { emoji: '🎒', answer: 'un sac à dos',   distractors: ['un sac',      'une valise',   'un cartable']   },
  { emoji: '🕯️', answer: 'une bougie',    distractors: ['une lampe',   'une torche',   'une allumette'] },
  { emoji: '👓', answer: 'des lunettes',   distractors: ['des gants',   'des chaussures','des boucles']  },
  // ── Nature ──
  { emoji: '☀️', answer: 'le soleil',      distractors: ['la lune',     'les nuages',   'les étoiles']   },
  { emoji: '🌙', answer: 'la lune',        distractors: ['le soleil',   'une étoile',   'un nuage']      },
  { emoji: '🌧️', answer: 'la pluie',      distractors: ['la neige',    'le vent',      "l'orage"]       },
  { emoji: '🌳', answer: 'un arbre',       distractors: ['une fleur',   'un buisson',   'une plante']    },
  { emoji: '🌸', answer: 'une fleur',      distractors: ['une feuille', 'une branche',  'une racine']    },
  { emoji: '⭐', answer: 'une étoile',     distractors: ['la lune',     'le soleil',    'une planète']   },
  { emoji: '🔥', answer: 'le feu',         distractors: ["l'eau",       'la fumée',     'la cendre']     },
  { emoji: '❄️', answer: 'la neige',       distractors: ['la pluie',    'la glace',     'le givre']      },
  { emoji: '🏖️', answer: 'une plage',     distractors: ['une forêt',   'une montagne', 'un lac']        },
  { emoji: '🌈', answer: 'un arc-en-ciel', distractors: ['un nuage',    'un éclair',    'une étoile']    },
  { emoji: '⛰️', answer: 'une montagne',  distractors: ['une colline', 'une vallée',   'une falaise']   },
  // ── Animaux (suite) ──
  { emoji: '🐧', answer: 'un pingouin',    distractors: ['une mouette', 'un canard',    'un cygne']      },
  { emoji: '🦅', answer: 'un aigle',       distractors: ['un faucon',   'un vautour',   'un corbeau']    },
  { emoji: '🦉', answer: 'une chouette',   distractors: ['un hibou',    'un aigle',     'un corbeau']    },
  { emoji: '🦌', answer: 'un cerf',        distractors: ['un daim',     'une biche',    'un renne']      },
  { emoji: '🐑', answer: 'un mouton',      distractors: ['une chèvre',  'un agneau',    'une vache']     },
  { emoji: '🐐', answer: 'une chèvre',     distractors: ['un mouton',   'une brebis',   'une vache']     },
  { emoji: '🦒', answer: 'une girafe',     distractors: ['un éléphant', 'un zèbre',     'un chameau']    },
  { emoji: '🐪', answer: 'un chameau',     distractors: ['un dromadaire','un cheval',   'un âne']        },
  { emoji: '🐊', answer: 'un crocodile',   distractors: ['un alligator','un lézard',    'un serpent']    },
  { emoji: '🐙', answer: 'une pieuvre',    distractors: ['un calmar',   'une méduse',   'un crabe']      },
  { emoji: '🦀', answer: 'un crabe',       distractors: ['un homard',   'une crevette', 'une langouste'] },
  { emoji: '🐳', answer: 'une baleine',    distractors: ['un dauphin',  'un requin',    'un phoque']     },
  { emoji: '🐞', answer: 'une coccinelle', distractors: ['une araignée','une fourmi',   'un scarabée']   },
  { emoji: '🕷️', answer: 'une araignée',  distractors: ['un scorpion', 'une fourmi',   'une guêpe']     },
  // ── Nourriture (suite) ──
  { emoji: '🍐', answer: 'une poire',      distractors: ['une pomme',   'une pêche',    'un coing']      },
  { emoji: '🍉', answer: 'une pastèque',   distractors: ['un melon',    'une citrouille','une courge']   },
  { emoji: '🍋', answer: 'un citron',      distractors: ['une orange',  'un pamplemousse','une mandarine']},
  { emoji: '🍒', answer: 'une cerise',     distractors: ['une fraise',  'une prune',    'une groseille'] },
  { emoji: '🍑', answer: 'une pêche',      distractors: ['un abricot',  'une nectarine','une prune']     },
  { emoji: '🌽', answer: 'du maïs',        distractors: ['du blé',      'du riz',       "de l'avoine"]   },
  { emoji: '🥔', answer: 'une pomme de terre', distractors: ['une carotte','un navet',  'un oignon']     },
  { emoji: '🍄', answer: 'un champignon',  distractors: ['une truffe',  'un oignon',    'une noix']      },
  { emoji: '🍕', answer: 'une pizza',      distractors: ['une quiche',  'une tarte',    'une crêpe']     },
  { emoji: '🍔', answer: 'un hamburger',   distractors: ['un sandwich', 'un hot-dog',   'un kebab']      },
  { emoji: '🍟', answer: 'des frites',     distractors: ['des chips',   'des nouilles', 'des pâtes']     },
  { emoji: '🥐', answer: 'un croissant',   distractors: ['une baguette','un pain',      'une brioche']   },
  { emoji: '🍦', answer: 'une glace',      distractors: ['un sorbet',   'un yaourt',    'une crème']     },
  { emoji: '🍯', answer: 'du miel',        distractors: ['de la confiture','du sirop',  'du sucre']      },
  // ── Objets (suite) ──
  { emoji: '💻', answer: 'un ordinateur',  distractors: ['une tablette','un téléphone', 'un clavier']    },
  { emoji: '✂️', answer: 'des ciseaux',    distractors: ['un couteau',  'une lame',     'une pince']     },
  { emoji: '🔨', answer: 'un marteau',     distractors: ['une clé',     'un tournevis', 'une pince']     },
  { emoji: '💡', answer: 'une ampoule',    distractors: ['une lampe',   'une bougie',   'une torche']    },
  { emoji: '🎸', answer: 'une guitare',    distractors: ['un violon',   'un piano',     'une harpe']     },
  { emoji: '🎹', answer: 'un piano',       distractors: ['un orgue',    'une guitare',  'un clavier']    },
  { emoji: '🥁', answer: 'un tambour',     distractors: ['une batterie','une caisse',   'un gong']       },
  { emoji: '👕', answer: 'un tee-shirt',   distractors: ['une chemise', 'un pull',      'une veste']     },
  { emoji: '👗', answer: 'une robe',       distractors: ['une jupe',    'un manteau',   'un pantalon']   },
  { emoji: '👞', answer: 'une chaussure',  distractors: ['une botte',   'une sandale',  'une pantoufle'] },
  { emoji: '🎁', answer: 'un cadeau',      distractors: ['un paquet',   'une boîte',    'une surprise']  },
  { emoji: '🚪', answer: 'une porte',      distractors: ['une fenêtre', 'un portail',   'un mur']        },
]

const ROUND_SIZE = 12

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5)
}

function buildDeck() {
  return shuffle(POOL).slice(0, ROUND_SIZE)
}

const deck         = ref(buildDeck())
const currentIndex = ref(0)
const selected     = ref(null)
const score        = ref(0)
const finished     = ref(false)
let advanceTimer   = null

const current = computed(() => deck.value[currentIndex.value])

const options = computed(() => {
  const c = current.value
  return shuffle([c.answer, ...c.distractors])
})

const isCorrect = computed(() =>
  selected.value !== null && selected.value === current.value.answer
)

const progressPct = computed(() =>
  ((currentIndex.value + 1) / deck.value.length) * 100
)

const resultEmoji = computed(() => {
  const pct = score.value / deck.value.length
  if (pct === 1)    return '🏆'
  if (pct >= 0.75)  return '🎉'
  if (pct >= 0.5)   return '👍'
  return '💪'
})

const resultMsg = computed(() => {
  const pct = score.value / deck.value.length
  if (pct === 1)    return 'Parfait ! Tu connais tous les mots.'
  if (pct >= 0.75)  return 'Très bien ! Encore un peu de pratique.'
  if (pct >= 0.5)   return 'Pas mal ! Continue comme ça.'
  return 'Courage ! Révise et recommence.'
})

function optionClass(opt) {
  if (selected.value === null) return ''
  if (opt === current.value.answer) return 'is-correct'
  if (opt === selected.value)       return 'is-wrong'
  return 'is-neutral'
}

function choose(opt) {
  if (selected.value !== null) return
  selected.value = opt
  if (opt === current.value.answer) {
    score.value++
    // Right answer → flash the green check, then move on by itself
    advanceTimer = setTimeout(next, 900)
  }
  // Wrong answer → stay put, show the correct word, wait for "Suivant"
}

function next() {
  clearTimeout(advanceTimer)
  advanceTimer = null
  if (currentIndex.value < deck.value.length - 1) {
    currentIndex.value++
    selected.value = null
  } else {
    finished.value = true
  }
}

function restart() {
  clearTimeout(advanceTimer)
  advanceTimer = null
  deck.value         = buildDeck()
  currentIndex.value = 0
  selected.value     = null
  score.value        = 0
  finished.value     = false
}

onBeforeUnmount(() => clearTimeout(advanceTimer))

useExerciseScore(finished, () => ({ correct: score.value, total: deck.value.length }))
</script>

<style scoped>
#emoji-game {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

/* ── Progress ──────────────────────────────────── */
.meta {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.counter {
  font-family: var(--font-mono);
  font-size: 0.78rem;
  color: var(--clr-ink-soft);
  white-space: nowrap;
}

.progress-track {
  flex: 1;
  height: 4px;
  background: var(--clr-border);
  border-radius: 2px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: var(--clr-blue);
  border-radius: 2px;
  transition: width 0.3s ease;
}

/* ── Card ──────────────────────────────────────── */
.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
}

.emoji {
  font-size: 5rem;
  line-height: 1;
  user-select: none;
}

/* ── Options ───────────────────────────────────── */
.options {
  border: none;
  padding: 0;
  margin: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.option {
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border: 1.5px solid var(--clr-border);
  border-radius: var(--radius);
  background: var(--clr-page);
  color: var(--clr-ink);
  font-family: var(--font-serif);
  font-size: 0.97rem;
  cursor: pointer;
  transition: border-color 0.15s, background 0.15s, color 0.15s;
}

.options:not(.answered) .option:hover {
  border-color: var(--clr-blue);
  background: var(--clr-blue-light);
  color: var(--clr-blue-dark);
}

.option-indicator {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 1.5px solid var(--clr-border);
  flex-shrink: 0;
  transition: border-color 0.15s, background 0.15s;
}

.options.answered .option {
  cursor: default;
}

/* Hidden radios must never intercept a click — the label handles it */
.option input {
  pointer-events: none;
}

/* Correct answer */
.option.is-correct {
  border-color: var(--success-strong);
  background: var(--success-soft);
  color: var(--success-text);
  font-weight: 600;
}

.option.is-correct .option-indicator {
  border-color: var(--success-strong);
  background: var(--success-strong);
}

/* Wrong selected answer */
.option.is-wrong {
  border-color: var(--clr-red);
  background: var(--clr-red-light);
  color: var(--clr-red);
}

.option.is-wrong .option-indicator {
  border-color: var(--clr-red);
  background: var(--clr-red);
}

/* Unselected options after answer */
.option.is-neutral {
  opacity: 0.45;
}

/* ── Feedback line ─────────────────────────────── */
.feedback {
  font-family: var(--font-sans);
  font-size: 0.88rem;
}

.feedback-correct {
  color: var(--success-text);
  font-weight: 600;
}

.feedback-wrong {
  color: var(--clr-red);
}

/* ── Next button ───────────────────────────────── */
.btn-next {
  align-self: stretch;
  padding: 0.8rem 1.5rem;
  background: var(--clr-blue);
  color: var(--text-on-accent);
  border-radius: var(--radius);
  font-family: var(--font-sans);
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background 0.15s;
}

.btn-next:hover {
  background: var(--clr-blue-dark);
}

/* ── Result screen ─────────────────────────────── */
.result {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  padding: 2rem 0;
  text-align: center;
}

.result-emoji {
  font-size: 3.5rem;
  line-height: 1;
}

.result-score {
  font-family: var(--font-sans);
  font-size: 3rem;
  font-weight: 800;
  color: var(--clr-blue);
  line-height: 1;
}

.result-total {
  font-size: 1.5rem;
  font-weight: 400;
  color: var(--clr-ink-soft);
}

.result-msg {
  font-family: var(--font-serif);
  font-style: italic;
  color: var(--clr-ink-mid);
  font-size: 1rem;
  margin: 0;
}

.btn-restart {
  margin-top: 0.5rem;
  padding: 0.75rem 2rem;
  background: transparent;
  border: 1.5px solid var(--clr-blue);
  border-radius: var(--radius);
  color: var(--clr-blue);
  font-family: var(--font-sans);
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background 0.15s, color 0.15s;
}

.btn-restart:hover {
  background: var(--clr-blue);
  color: var(--text-on-accent);
}

/* ── Accessibility ─────────────────────────────── */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
}

</style>
