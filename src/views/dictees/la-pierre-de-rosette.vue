<!-- view-meta: created=2026-08-17; updated=2026-08-17 -->
<template>
  <AltLayout title="Dictée : La pierre de Rosette">
    <main class="dictee">

      <!-- ── Section préparation (Invisible à l'impression) ── -->
      <section class="prep-card no-print">
        <h2>Préparation : Vocabulaire utile</h2>
        <p class="prep-intro">
          Cette dictée raconte une histoire vraie : la découverte de la pierre qui a permis
          de lire les hiéroglyphes. Révisez ces mots avant de commencer, et surveillez
          surtout les temps du passé (passé composé et imparfait) et les accents.
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
      <section v-if="finished" class="result no-print">
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
      <section v-else class="card-dictation no-print">
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
            placeholder="Écoutez la phrase et écrivez-la ici..."
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

      <!-- ── Version imprimable (Visible UNIQUEMENT à l'impression) ── -->
      <section class="print-content print-only">
        <!-- The page title is printed by PageHeader (AltLayout) — not repeated here. -->
        <div class="print-section">
          <h2>Texte de la dictée</h2>
          <ol class="print-sentences">
            <li v-for="(sentence, index) in dictation.sentences" :key="index">
              {{ sentence.text }}
              <span class="print-note">({{ sentence.note }})</span>
            </li>
          </ol>
        </div>

        <div class="print-section">
          <h2>Vocabulaire de préparation</h2>
          <table class="print-table">
            <thead>
              <tr>
                <th>Français</th>
                <th>Espagnol</th>
                <th>Remarques</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="vocab in dictation.vocabulary" :key="'print-' + vocab.fr">
                <td><strong>{{ vocab.fr }}</strong></td>
                <td>{{ vocab.es }}</td>
                <td>{{ vocab.note }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- ── Download PDF Button ── -->
      <button class="download-btn no-print" @click="downloadPdf" aria-label="Télécharger cette leçon en PDF">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M12 3v14m0 0-5-5m5 5 5-5"/>
          <path d="M3 20h18"/>
        </svg>
        <span>Télécharger</span>
      </button>

    </main>
  </AltLayout>
</template>

<script setup>
import { ref, computed } from 'vue'
import AltLayout from '@/layouts/AltLayout.vue'
import { useSpeech } from '@/composables/useSpeech'

const dictation = {
  title: "La pierre de Rosette",
  sentences: [
    {
      text: "En 1799, des soldats français ont trouvé une grande pierre noire en Égypte.",
      spanish: "En 1799, unos soldados franceses encontraron una gran piedra negra en Egipto.",
      note: "« ont trouvé » est un passé composé avec avoir : le participe ne s'accorde pas ici. « français » est un adjectif : il reste en minuscule, et son -s de pluriel est muet."
    },
    {
      text: "Cette pierre portait trois écritures différentes.",
      spanish: "Esta piedra llevaba tres escrituras diferentes.",
      note: "« portait » est un imparfait : la terminaison -ait ne se prononce pas. « écritures » est féminin pluriel, donc l'adjectif prend -es : « différentes »."
    },
    {
      text: "Personne ne pouvait lire les hiéroglyphes des anciens Égyptiens.",
      spanish: "Nadie podía leer los jeroglíficos de los antiguos egipcios.",
      note: "Avec « personne », on écrit « ne » tout seul, jamais « ne… pas ». Le h de « hiéroglyphes » est muet mais s'écrit. Ici « Égyptiens » est un nom de peuple : majuscule."
    },
    {
      text: "Un jeune Français a étudié le texte pendant des années.",
      spanish: "Un joven francés estudió el texto durante años.",
      note: "Attention : ici « Français » est un nom (une personne), donc majuscule — contrairement à l'adjectif « français » de la première phrase."
    },
    {
      text: "En 1822, il a enfin compris le secret de l'écriture égyptienne.",
      spanish: "En 1822, por fin comprendió el secreto de la escritura egipcia.",
      note: "Le participe passé de « comprendre » est irrégulier : « compris », avec un -s final muet. « égyptienne » est un adjectif : minuscule, et le féminin double le n."
    }
  ],
  vocabulary: [
    { fr: "la pierre", es: "la piedra", note: "Nom féminin, comme en espagnol : une pierre noire." },
    { fr: "un soldat", es: "un soldado", note: "Nom masculin. Le -t final ne se prononce pas." },
    { fr: "une écriture", es: "una escritura", note: "Nom féminin, avec un accent aigu sur le é." },
    { fr: "les hiéroglyphes", es: "los jeroglíficos", note: "Nom masculin pluriel. Le h s'écrit mais ne se prononce pas." },
    { fr: "comprendre → compris", es: "comprender → comprendido", note: "Participe passé irrégulier en -is : j'ai compris." },
    { fr: "égyptien / égyptienne", es: "egipcio / egipcia", note: "Adjectif en minuscule ; le féminin double le n avant le -e." }
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
  if (pct === 1)    return 'Parfait ! Les temps du passé et les majuscules sont maîtrisés.'
  if (pct >= 0.75)  return 'Très bien ! Relis seulement les accords au pluriel.'
  if (pct >= 0.5)   return 'Pas mal. Revois quand « français » prend une majuscule et quand il n\'en prend pas.'
  return 'Révise le passé composé et l\'imparfait, puis réessaie cette dictée.'
})


function verify() {
  if (checked.value) return

  const clean = (str) => {
    return str
      .toLowerCase()
      .trim()
      .replace(/[’']/g, "'")                          // normalize quotes first
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

function downloadPdf() {
  window.print()
}

</script>

