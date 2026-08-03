<!-- view-meta: created=2026-08-03; updated=2026-08-03 -->
<template>
  <DefaultLayout title="Exercice : Accorde l'adjectif">
    <main id="adjectif-game">

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
          Choisissez la forme correcte de l'adjectif entre parenthèses. Attention au genre (masculin / féminin) et au nombre (singulier / pluriel).
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

        <section class="card" aria-live="polite">
          <div class="spanish" title="Traducción al español">
            🇪🇸 {{ current.spanish }}
          </div>

          <div class="sentence" role="text">
            <template v-for="(part, index) in sentenceParts" :key="index">
              <span v-if="part === '__BLANK__'" class="blank" :class="{ filled: selected !== null }">
                {{ selected ?? '...' }}
              </span>
              <template v-else>{{ part }}</template>
            </template>
          </div>

          <fieldset class="options" :class="{ answered: selected !== null }">
            <legend class="sr-only">Choisissez la forme correcte de l'adjectif</legend>
            <label
              v-for="opt in current.options"
              :key="opt"
              :class="['option', optionClass(opt)]"
            >
              <input
                type="radio"
                name="adjective-answer"
                :value="opt"
                :disabled="selected !== null"
                @change="choose(opt)"
                class="sr-only"
              />
              <span class="option-indicator" aria-hidden="true"></span>
              <span class="option-text">{{ opt }}</span>
            </label>
          </fieldset>

          <div v-if="selected !== null" class="feedback">
            <span v-if="selected === current.answer" class="feedback-correct">✓ Correct !</span>
            <span v-else class="feedback-wrong">
              ✗ La bonne réponse était <strong>{{ current.answer }}</strong>
            </span>
            <p class="feedback-note">{{ current.note }}</p>
          </div>

          <button v-if="selected !== null" class="btn-next" @click="next">
            {{ currentIndex < deck.length - 1 ? 'Suivant →' : 'Voir mon score' }}
          </button>
        </section>
      </template>

    </main>
  </DefaultLayout>
</template>

<script setup>
import { computed, ref } from 'vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'

const items = [
  {
    sentence: 'Une __BLANK__ (grand) maison.',
    spanish: 'Una casa grande.',
    answer: 'grande',
    options: ['grand', 'grande', 'grands', 'grandes'],
    note: '« maison » est féminin singulier. On ajoute un -e à l’adjectif régulier « grand » (placé avant le nom).'
  },
  {
    sentence: 'Des livres __BLANK__ (intéressant).',
    spanish: 'Unos libros interesantes.',
    answer: 'intéressants',
    options: ['intéressant', 'intéressante', 'intéressants', 'intéressantes'],
    note: '« livres » est masculin pluriel. On ajoute un -s au masculin singulier.'
  },
  {
    sentence: 'Une voiture __BLANK__ (rouge).',
    spanish: 'Un coche rojo.',
    answer: 'rouge',
    options: ['rouge', 'rouges', 'rougée', 'rougest'],
    note: 'Les adjectifs se terminant par un -e au masculin singulier ne changent pas au féminin.'
  },
  {
    sentence: 'Des filles __BLANK__ (content).',
    spanish: 'Unas chicas contentas.',
    answer: 'contentes',
    options: ['content', 'contents', 'contentes', 'contente'],
    note: '« filles » est féminin pluriel. On ajoute -es au masculin singulier (content + es).'
  },
  {
    sentence: 'Une __BLANK__ (bon) pizza.',
    spanish: 'Una pizza buena.',
    answer: 'bonne',
    options: ['bon', 'bons', 'bonne', 'bonnes'],
    note: 'Les adjectifs en -on doublent la consonne n au féminin (bon → bonne). L’adjectif « bon » se place avant le nom.'
  },
  {
    sentence: 'Elle est très __BLANK__ (heureux).',
    spanish: 'Ella está muy feliz.',
    answer: 'heureuse',
    options: ['heureux', 'heureuse', 'heureuses', 'heureuxes'],
    note: 'Les adjectifs en -eux font leur féminin en -euse (heureux → heureuse).'
  },
  {
    sentence: 'Des chaussures __BLANK__ (neuf).',
    spanish: 'Unos zapatos nuevos (a estrenar).',
    answer: 'neuves',
    options: ['neuf', 'neufs', 'neuve', 'neuves'],
    note: 'Les adjectifs en -f font leur féminin en -ve (neuf → neuve), puis on ajoute -s au pluriel.'
  },
  {
    sentence: 'Une amie __BLANK__ (canadien).',
    spanish: 'Una amiga canadiense.',
    answer: 'canadienne',
    options: ['canadien', 'canadiens', 'canadienne', 'canadiennes'],
    note: 'Les adjectifs en -en doublent le n au féminin (canadien → canadienne).'
  },
  {
    sentence: 'La __BLANK__ (premier) leçon de français.',
    spanish: 'La primera lección de francés.',
    answer: 'première',
    options: ['premier', 'premiers', 'première', 'premières'],
    note: 'Les adjectifs en -er font leur féminin en -ère (premier → première).'
  },
  {
    sentence: 'Une __BLANK__ (beau) ville en France.',
    spanish: 'Una ciudad hermosa en Francia.',
    answer: 'belle',
    options: ['beau', 'beaux', 'belle', 'belles'],
    note: '« beau » a un féminin irrégulier : « belle ».'
  },
  {
    sentence: 'Ces histoires sont très __BLANK__ (court).',
    spanish: 'Estas historias son muy cortas.',
    answer: 'courtes',
    options: ['court', 'courts', 'courte', 'courtes'],
    note: '« histoires » est féminin pluriel. On ajoute -es (court → courtes).'
  },
  {
    sentence: 'Des étudiants __BLANK__ (actif).',
    spanish: 'Unos estudiantes activos.',
    answer: 'actifs',
    options: ['actif', 'active', 'actifs', 'actives'],
    note: '« étudiants » est masculin pluriel. On ajoute un -s au masculin singulier (actif → actifs).'
  },
  {
    sentence: 'Une chemise __BLANK__ (blanc).',
    spanish: 'Una camisa blanca.',
    answer: 'blanche',
    options: ['blanc', 'blancs', 'blanche', 'blanches'],
    note: 'L’adjectif « blanc » a un féminin irrégulier en -che (blanc → blanche).'
  },
  {
    sentence: 'Des fruits __BLANK__ (frais).',
    spanish: 'Frutas frescas.',
    answer: 'frais',
    options: ['frais', 'fraîche', 'fraîches', 'fraises'],
    note: '« fruits » est masculin pluriel. Les adjectifs finissant par -s au masculin singulier ne changent pas au masculin pluriel.'
  }
]

function shuffle(array) {
  return [...array].sort(() => Math.random() - 0.5)
}

function prepareItem(item) {
  return { ...item, options: shuffle(item.options) }
}

const deck = ref(shuffle(items).map(prepareItem))
const currentIndex = ref(0)
const selected = ref(null)
const score = ref(0)
const finished = ref(false)

const current = computed(() => deck.value[currentIndex.value])
const progressPct = computed(() => ((currentIndex.value + 1) / deck.value.length) * 100)
const sentenceParts = computed(() => current.value.sentence.split(/(__BLANK__)/))

const resultEmoji = computed(() => {
  const pct = score.value / deck.value.length
  if (pct === 1) return '🏆'
  if (pct >= 0.75) return '🌟'
  if (pct >= 0.5) return '👍'
  return '📚'
})

const resultMsg = computed(() => {
  const pct = score.value / deck.value.length
  if (pct === 1) return 'Parfait ! Vous maîtrisez parfaitement l’accord des adjectifs.'
  if (pct >= 0.75) return 'Très bien ! Faites attention aux féminins et pluriels particuliers.'
  if (pct >= 0.5) return 'Pas mal ! Observez bien le genre et le nombre du nom avant de choisir.'
  return 'Recommencez l’exercice pour bien fixer les règles d’accord.'
})

function optionClass(option) {
  if (selected.value === null) return ''
  if (option === current.value.answer) return 'is-correct'
  if (option === selected.value) return 'is-wrong'
  return 'is-muted'
}

function choose(option) {
  if (selected.value !== null) return
  selected.value = option
  if (option === current.value.answer) score.value++
}

function next() {
  if (currentIndex.value < deck.value.length - 1) {
    currentIndex.value++
    selected.value = null
    return
  }

  finished.value = true
}

function restart() {
  deck.value = shuffle(items).map(prepareItem)
  currentIndex.value = 0
  selected.value = null
  score.value = 0
  finished.value = false
}
</script>

<style scoped>
#adjectif-game {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.instructions {
  font-family: var(--font-serif);
  color: var(--clr-ink-mid);
  text-align: center;
  line-height: 1.65;
}

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
  transition: width 0.2s ease;
}

.card {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.spanish {
  align-self: center;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.25rem 0.75rem;
  background: var(--clr-bg);
  border: 1px solid var(--clr-border);
  border-radius: 1rem;
  font-size: 0.85rem;
  color: var(--clr-ink-mid);
  font-style: italic;
}

.sentence {
  padding: 1.1rem 1rem;
  border-radius: var(--radius);
  background: var(--clr-blue-light);
  color: var(--clr-blue-dark);
  font-family: var(--font-serif);
  font-size: 1.25rem;
  text-align: center;
  line-height: 1.5;
}

.blank {
  display: inline-block;
  min-width: 5rem;
  padding: 0.1rem 0.5rem;
  border-bottom: 2px solid var(--clr-blue);
  color: var(--clr-blue);
  font-weight: 700;
}

.blank.filled {
  background: var(--clr-page);
  border-radius: var(--radius-sm);
}

.options {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.6rem;
  border: none;
  padding: 0;
  margin: 0;
}

.option {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.85rem 1rem;
  border: 1px solid var(--clr-border);
  border-radius: var(--radius);
  background: var(--clr-page);
  color: var(--clr-ink);
  cursor: pointer;
  font-weight: 600;
  transition: border-color 0.15s, color 0.15s, background 0.15s;
}

.option-indicator {
  width: 14px;
  height: 14px;
  border: 2px solid var(--clr-border);
  border-radius: 50%;
  flex-shrink: 0;
  transition: border-color 0.15s, background 0.15s;
}

.option:not(.answered):hover {
  border-color: var(--clr-blue);
  background: var(--clr-blue-light);
}

.option:not(.answered):hover .option-indicator {
  border-color: var(--clr-blue);
}

.option.is-correct {
  border-color: #2E7D32;
  background: #E8F5E9;
  color: #2E7D32;
}

.option.is-correct .option-indicator {
  border-color: #2E7D32;
  background: #2E7D32;
}

.option.is-wrong {
  border-color: var(--clr-red);
  background: var(--clr-red-light);
  color: var(--clr-red);
}

.option.is-wrong .option-indicator {
  border-color: var(--clr-red);
  background: var(--clr-red);
}

.option.is-muted {
  opacity: 0.55;
  cursor: default;
}

.feedback {
  border-left: 4px solid var(--clr-blue);
  padding: 0.85rem 1.1rem;
  background: var(--clr-blue-light);
  border-radius: 0 var(--radius) var(--radius) 0;
}

.feedback-correct {
  color: #2E7D32;
  font-weight: 700;
}

.feedback-wrong {
  color: var(--clr-red);
  font-weight: 700;
}

.feedback-note {
  margin-top: 0.4rem;
  color: var(--clr-ink-mid);
  font-size: 0.92rem;
  line-height: 1.5;
}

.btn-next,
.btn-restart {
  align-self: center;
  padding: 0.75rem 1.5rem;
  border: 1px solid var(--clr-border);
  border-radius: var(--radius);
  background: var(--clr-page);
  color: var(--clr-blue);
  font-weight: 700;
  cursor: pointer;
  transition: border-color 0.15s, background 0.15s;
}

.btn-next:hover,
.btn-restart:hover {
  border-color: var(--clr-blue);
  background: var(--clr-blue-light);
}

.result {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.9rem;
  padding: 2.5rem 1.5rem;
  border: 1px solid var(--clr-border);
  border-radius: var(--radius);
  background: var(--clr-page);
  text-align: center;
}

.result-emoji {
  font-size: 3rem;
}

.result-score {
  font-family: var(--font-serif);
  font-size: 2.5rem;
  color: var(--clr-blue-dark);
}

.result-total {
  font-size: 1.2rem;
  color: var(--clr-ink-soft);
}

.result-msg {
  color: var(--clr-ink-mid);
  font-size: 1.05rem;
}

@media (max-width: 794px) {
  .options {
    grid-template-columns: 1fr;
  }
}
</style>

