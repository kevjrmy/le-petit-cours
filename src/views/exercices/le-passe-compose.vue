<!-- view-meta: created=2026-08-03; updated=2026-08-03 -->
<template>
  <DefaultLayout title="Exercice : Le passé composé">
    <main id="passe-compose-game">

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
          Choisissez la forme correcte du verbe au <strong>passé composé</strong> (attention à l'auxiliaire <em>avoir</em> ou <em>être</em>, aux participes passés et aux accords !).
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
            <legend class="sr-only">Choisissez la forme correcte au passé composé</legend>
            <label
              v-for="opt in current.options"
              :key="opt"
              :class="['option', optionClass(opt)]"
            >
              <input
                type="radio"
                name="passe-compose-answer"
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

      <RelatedLinks />

    </main>
  </DefaultLayout>
</template>

<script setup>
import { computed, ref } from 'vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import RelatedLinks from '@/components/RelatedLinks.vue'
import { useExerciseScore } from '@/composables/useProgress'
import { shuffle } from '@/utils/shuffle'

const items = [
  {
    sentence: 'Hier, j\'__BLANK__ avec le professeur.',
    spanish: 'Ayer hablé con el profesor.',
    answer: 'ai parlé',
    options: ['ai parlé', 'suis parlé', 'as parlé', 'ai parler'],
    note: 'Le verbe « parler » utilise l’auxiliaire « avoir » : j’ai parlé.'
  },
  {
    sentence: 'Marie __BLANK__ au marché ce matin.',
    spanish: 'Marie fue / ha ido al mercado esta mañana.',
    answer: 'est allée',
    options: ['est allée', 'a allé', 'est allé', 'a allée'],
    note: '« aller » utilise l’auxiliaire « être ». Le participe passé s’accorde avec le sujet féminin (Marie → allée).'
  },
  {
    sentence: 'Nous __BLANK__ un gâteau au chocolat.',
    spanish: 'Hicimos un pastel de chocolate.',
    answer: 'avons fait',
    options: ['avons fait', 'sommes fait', 'avons fais', 'avons faissé'],
    note: 'Le participe passé du verbe « faire » est irrégulier : fait.'
  },
  {
    sentence: 'Ils __BLANK__ en vacances hier.',
    spanish: 'Se fueron de vacaciones ayer.',
    answer: 'sont partis',
    options: ['sont partis', 'ont parti', 'sont parti', 'ont partis'],
    note: '« partir » se conjugue avec « être » et s’accorde au masculin pluriel avec « ils » (partis).'
  },
  {
    sentence: 'Je __BLANK__ tôt ce matin.',
    spanish: 'Me levanté temprano esta mañana.',
    answer: 'me suis levé',
    options: ['me suis levé', 'm\'ai levé', 'me suis lever', 'm\'ai levée'],
    note: 'Tous les verbes pronominaux se conjuguent avec l’auxiliaire « être » au passé composé.'
  },
  {
    sentence: 'Tu __BLANK__ ton travail ?',
    spanish: '¿Terminaste tu trabajo?',
    answer: 'as fini',
    options: ['as fini', 'es fini', 'as finis', 'es finie'],
    note: '« finir » se conjugue avec « avoir ». Le participe passé des verbes en -ir est en -i.'
  },
  {
    sentence: 'Elle __BLANK__ la question.',
    spanish: 'Ella no entendió la pregunta.',
    answer: 'n\'a pas compris',
    options: ['n\'a pas compris', 'a pas ne compris', 'n\'est pas comprise', 'pas a compris'],
    note: 'La négation « ne... pas » encadre uniquement l’auxiliaire (n’a pas + compris).'
  },
  {
    sentence: 'Vous __BLANK__ le train de 8 heures.',
    spanish: 'Tomasteis / Tomaron el tren de las 8.',
    answer: 'avez pris',
    options: ['avez pris', 'êtes pris', 'avez prendre', 'avez prendu'],
    note: 'Le participe passé du verbe « prendre » est « pris ». Auxiliaire avoir.'
  },
  {
    sentence: 'Mes sœurs __BLANK__ à la fête.',
    spanish: 'Mis hermanas vinieron a la fiesta.',
    answer: 'sont venues',
    options: ['sont venues', 'ont venu', 'sont venus', 'ont venue'],
    note: '« venir » se conjugue avec « être ». Au féminin pluriel (mes sœurs), le participe passé prend -es (venues).'
  },
  {
    sentence: 'J\'__BLANK__ un bon film hier soir.',
    spanish: 'Vi una buena película anoche.',
    answer: 'ai vu',
    options: ['ai vu', 'suis vu', 'ai voi', 'ai voyé'],
    note: 'Le participe passé de « voir » est « vu ». Auxiliaire avoir.'
  },
  {
    sentence: 'Nous __BLANK__ à la maison ce week-end.',
    spanish: 'Nos quedamos en casa este fin de semana.',
    answer: 'sommes restés',
    options: ['sommes restés', 'avons resté', 'sommes rester', 'avons restés'],
    note: '« rester » est un verbe de mouvement/état conjugué avec l’auxiliaire « être ».'
  },
  {
    sentence: 'Paul __BLANK__ une lettre à ses parents.',
    spanish: 'Paul escribió una carta a sus padres.',
    answer: 'a écrit',
    options: ['a écrit', 'est écrit', 'a écri', 'a écriture'],
    note: 'Le participe passé du verbe « écrire » est « écrit ».'
  },
  {
    sentence: 'Elles __BLANK__ une paella délicieuse.',
    spanish: 'Ellas comieron una paella deliciosa.',
    answer: 'ont mangé',
    options: ['ont mangé', 'sont mangées', 'ont mangés', 'sont mangé'],
    note: 'Avec l’auxiliaire « avoir », le participe passé ne s’accorde pas avec le sujet.'
  },
  {
    sentence: 'Je __BLANK__ hier soir.',
    spanish: 'No salí anoche.',
    answer: 'ne suis pas sorti',
    options: ['ne suis pas sorti', 'n\'ai pas sorti', 'ne pas suis sorti', 'n\'ai pas sortie'],
    note: '« sortir » prend l’auxiliaire « être ». La négation encadre l’auxiliaire (ne suis pas + sorti).'
  }
]


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
  if (pct === 1) return 'Parfait ! Vous maîtrisez parfaitement le passé composé.'
  if (pct >= 0.75) return 'Très bien ! Attention aux accords avec l’auxiliaire être et aux participes passés.'
  if (pct >= 0.5) return 'Pas mal ! Révisez la différence entre avoir et être au passé composé.'
  return 'Recommencez l’exercice pour bien mémoriser les auxiliaires et les participes passés.'
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

useExerciseScore(finished, () => ({ correct: score.value, total: deck.value.length }))
</script>

<style scoped>
#passe-compose-game {
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
  border-color: var(--success-text);
  background: var(--success-soft);
  color: var(--success-text);
}

.option.is-correct .option-indicator {
  border-color: var(--success-text);
  background: var(--success-text);
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
  color: var(--success-text);
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

@media (max-width: 52rem) {
  .options {
    grid-template-columns: 1fr;
  }
}
</style>
