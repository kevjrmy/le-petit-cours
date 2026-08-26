<!-- view-meta: created=2026-08-17; updated=2026-08-17 -->
<template>
  <AltLayout title="Dictée : Les fleurs du mal">
    <main class="dictee">

      <!-- ── Section préparation (Invisible à l'impression) ── -->
      <section class="prep-card">
        <h2>Préparation : Vocabulaire utile</h2>
        <p class="source">
          Vers extraits de <em>Les Fleurs du mal</em>, de Charles Baudelaire (1857) —
          poèmes « L'Invitation au voyage » et « L'Albatros ». Texte du domaine public.
        </p>
        <p class="prep-intro">
          Dictée difficile : c'est de la vraie poésie du XIX<sup>e</sup> siècle. Les phrases
          sont courtes mais les mots sont rares et pleins d'accents. Écoutez d'abord en
          vitesse normale, puis lentement, et vérifiez chaque accent avant de valider.
        </p>
        <p class="prep-intro tip">
          <strong>Astuce clavier :</strong> le mot « sœur » s'écrit avec la ligature œ.
          Si votre clavier ne la produit pas, tapez simplement « soeur » : la correction
          l'accepte. L'orthographe soignée reste « sœur ».
        </p>
        <table>
          <caption class="sr-only">Vocabulaire de préparation pour la dictée</caption>
          <thead>
            <tr>
              <th>Français</th>
              <th>En espagnol</th>
              <th>Note de grammaire / orthographe</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="vocab in dictation.vocabulary" :key="vocab.fr">
              <td><strong>{{ vocab.fr }}</strong></td>
              <td><em>{{ vocab.es }}</em></td>
              <td>{{ vocab.note }}</td>
            </tr>
          </tbody>
        </table>
      </section>

      <!-- ── Résultat final ── -->
      <section v-if="finished" class="result">
        <div class="result-emoji">{{ resultEmoji }}</div>
        <div class="result-score">{{ score }}<span class="result-total"> / {{ dictation.sentences.length }}</span></div>
        <p class="result-msg">{{ resultMsg }}</p>

        <div class="final-review">
          <h3>Texte complet de la dictée :</h3>
          <div class="full-text-box">
            <p v-for="(sentence, index) in dictation.sentences" :key="index">
              {{ sentence.text }}
            </p>
          </div>
        </div>

        <button class="btn-restart" @click="restart">Recommencer</button>
      </section>

      <!-- ── Zone interactive de la Dictée (Invisible à l'impression) ── -->
      <section v-else class="card-dictation">
        <div class="meta">
          <span class="counter">Phrase {{ currentIndex + 1 }}&thinsp;/&thinsp;{{ dictation.sentences.length }}</span>
          <div class="progress-track"
            role="progressbar"
            :aria-valuenow="currentIndex + 1"
            :aria-valuemax="dictation.sentences.length"
            aria-label="Progression">
            <div class="progress-fill" :style="{ width: progressPct + '%' }"></div>
          </div>
        </div>

        <!-- Clue/Spanish Translation -->
        <div class="spanish-prompt">
          <span class="flag" aria-hidden="true">🇪🇸 Clave:</span>
          <span class="prompt-text">{{ currentSentence.spanish }}</span>
        </div>

        <!-- Audio controls (Speech Synthesis) -->
        <div class="audio-controls">
          <button
            class="btn-audio primary-audio"
            @click="speak(currentSentence.text, 0.85)"
            :disabled="speaking"
            aria-label="Écouter la dictée à vitesse normale"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
            </svg>
            <span>Écouter</span>
          </button>

          <button
            class="btn-audio secondary-audio"
            @click="speak(currentSentence.text, 0.55)"
            :disabled="speaking"
            aria-label="Écouter la dictée lentement"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
            </svg>
            <span>Lentement</span>
          </button>
        </div>

        <!-- Text input area -->
        <div class="input-area">
          <label for="dictation-input" class="sr-only">Saisissez la phrase entendue</label>
          <textarea
            id="dictation-input"
            v-model="userInput"
            :disabled="checked"
            placeholder="Écoutez le vers et écrivez-le ici..."
            rows="3"
          ></textarea>
        </div>

        <!-- Real-time Verification Feedback -->
        <div v-if="checked" class="feedback-card">
          <div :class="['result-status', isCorrect ? 'correct' : 'wrong']">
            <span v-if="isCorrect">✓ Parfait ! Aucune faute.</span>
            <span v-else>✗ Des différences ont été détectées.</span>
          </div>

          <div class="comparison">
            <div class="comparison-line">
              <span class="label">Votre réponse :</span>
              <span class="user-text" :class="{ 'has-errors': !isCorrect }">{{ userInput || '(vide)' }}</span>
            </div>
            <div class="comparison-line">
              <span class="label">Correction :</span>
              <span class="correct-text">{{ currentSentence.text }}</span>
            </div>
          </div>

          <div class="rule">
            <strong>Règle Bled :</strong>
            <p>{{ currentSentence.note }}</p>
          </div>
        </div>

        <!-- Actions -->
        <div class="actions">
          <button
            v-if="!checked"
            class="btn-verify"
            :disabled="!userInput.trim()"
            @click="verify"
          >
            Valider ma réponse
          </button>
          <button
            v-else
            class="btn-next"
            @click="next"
          >
            {{ currentIndex < dictation.sentences.length - 1 ? 'Phrase suivante →' : 'Voir mon score final' }}
          </button>
        </div>
      </section>

      <RelatedLinks />
    </main>
  </AltLayout>
</template>

<script setup>
import { ref, computed } from 'vue'
import AltLayout from '@/layouts/AltLayout.vue'
import RelatedLinks from '@/components/RelatedLinks.vue'
import { useSpeech } from '@/composables/useSpeech'

const dictation = {
  title: "Les fleurs du mal",
  sentences: [
    {
      text: "Mon enfant, ma sœur, songe à la douceur d'aller là-bas vivre ensemble.",
      spanish: "Hija mía, hermana mía, piensa en la dulzura de ir allá a vivir juntos.",
      note: "« sœur » s'écrit avec la ligature œ (un e dans l'o). « songe » est un impératif d'un verbe en -er : pas de -s final. « là-bas » prend un accent grave et un trait d'union."
    },
    {
      text: "Là, tout n'est qu'ordre et beauté, luxe, calme et volupté.",
      spanish: "Allí, todo es orden y belleza, lujo, calma y voluptuosidad.",
      note: "« ne… que » veut dire solamente, ce n'est pas une négation. Devant une voyelle, « que » devient « qu' ». « Là » porte un accent grave : sans lui, « la » serait l'article."
    },
    {
      text: "Souvent, pour s'amuser, les hommes d'équipage prennent des albatros.",
      spanish: "A menudo, para divertirse, los hombres de la tripulación cogen albatros.",
      note: "« s'amuser » est un verbe pronominal à l'infinitif : le se s'élide en s'. « prennent » (prendre, 3e personne du pluriel) prend deux n, et la terminaison -ent est muette."
    },
    {
      text: "Ses ailes de géant l'empêchent de marcher.",
      spanish: "Sus alas de gigante le impiden caminar.",
      note: "« Ses » est le possessif pluriel (sus) : ne pas le confondre avec le démonstratif « ces » (estos), qui se prononce pareil. « empêchent » porte un accent circonflexe sur le ê."
    },
    {
      text: "Le poète est semblable au prince des nuées.",
      spanish: "El poeta es semejante al príncipe de las nubes.",
      note: "« poète » prend un accent grave sur le è. « au » = à + le, et « des » = de + les : les articles contractés sont obligatoires en français."
    }
  ],
  vocabulary: [
    { fr: "la sœur", es: "la hermana", note: "Nom féminin, écrit avec la ligature œ. Le clavier peut taper « oe »." },
    { fr: "songer à", es: "pensar en", note: "Verbe du 1er groupe. Impératif sans -s : songe à la douceur." },
    { fr: "la volupté", es: "la voluptuosidad", note: "Nom féminin. Accent aigu sur le é final, comme beauté ou bonté." },
    { fr: "l'équipage", es: "la tripulación", note: "Nom masculin en français, alors que tripulación est féminin en espagnol." },
    { fr: "empêcher", es: "impedir", note: "Faux ami : ce n'est pas « empezar ». Accent circonflexe sur le ê." },
    { fr: "une nuée", es: "una nube (poético)", note: "Nom féminin. La terminaison -ée est typique des noms féminins." }
  ]
}

const currentIndex = ref(0)
const userInput    = ref('')
const checked      = ref(false)
const isCorrect    = ref(false)
const score        = ref(0)
const finished     = ref(false)

const { speak, speaking } = useSpeech()

const currentSentence = computed(() => dictation.sentences[currentIndex.value])

const progressPct = computed(() =>
  ((currentIndex.value + 1) / dictation.sentences.length) * 100
)

const resultEmoji = computed(() => {
  const pct = score.value / dictation.sentences.length
  if (pct === 1)    return '🏆'
  if (pct >= 0.75)  return '🎉'
  if (pct >= 0.5)   return '👍'
  return '💪'
})

const resultMsg = computed(() => {
  const pct = score.value / dictation.sentences.length
  if (pct === 1)    return 'Impeccable ! Même Baudelaire n\'aurait rien à corriger.'
  if (pct >= 0.75)  return 'Très bien ! Ce niveau de poésie est exigeant : relis seulement les accents.'
  if (pct >= 0.5)   return 'Bon travail. Revois les accents (è, ê) et la différence entre « ses » et « ces ».'
  return 'Cette dictée est difficile. Relis le vocabulaire, réécoute lentement, puis réessaie.'
})

function verify() {
  if (checked.value) return

  const clean = (str) => {
    return str
      .toLowerCase()
      .trim()
      .replace(/[’']/g, "'")                          // normalize quotes first
      .replace(/œ/g, 'oe')                            // ligature is untypeable on many keyboards
      .replace(/æ/g, 'ae')
      .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?«»]/g, "") // remove punctuation
      .replace(/\s+/g, " ")                           // normalize spacing
  }

  isCorrect.value = clean(userInput.value) === clean(currentSentence.value.text)

  if (isCorrect.value) {
    score.value++
  }
  checked.value = true
}

function next() {
  if (currentIndex.value < dictation.sentences.length - 1) {
    currentIndex.value++
    userInput.value = ''
    checked.value   = false
    isCorrect.value = false
  } else {
    finished.value = true
  }
}

function restart() {
  currentIndex.value = 0
  userInput.value    = ''
  checked.value      = false
  isCorrect.value    = false
  score.value        = 0
  finished.value     = false
}

</script>

