<!-- view-meta: created=2026-08-02; updated=2026-08-02 -->
<template>
  <AltLayout title="Dictée : Une journée en vacances">
    <main class="dictee">

      <!-- ── Section préparation (Invisible à l'impression) ── -->
      <section class="prep-card no-print">
        <h2>Préparation : Vocabulaire utile</h2>
        <p class="prep-intro">
          Révisez ces mots importants avant de commencer la dictée. Portez une attention particulière au genre des noms (masculin/féminin) et aux accents.
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

      <!-- ── Download PDF Button (Omitted on exercises, included on dictée lessons) ── -->
      <button class="download-btn no-print" @click="downloadPdf" aria-label="Télécharger cette leçon en PDF">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M12 3v14m0 0-5-5m5 5 5-5"/>
          <path d="M3 20h18"/>
        </svg>
        <span>Télécharger</span>
      </button>

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
  title: "Une journée en vacances",
  sentences: [
    {
      text: "Ce matin, je me réveille tôt sous le soleil chaud.",
      spanish: "Esta mañana me despierto temprano bajo el cálido sol.",
      note: "Notez la conjugaison de « se réveiller » (verbo pronominal). Rappelez-vous que « soleil » est masculin (el sol)."
    },
    {
      text: "Nous préparons un grand panier pour aller à la plage.",
      spanish: "Preparamos una gran cesta para ir a la playa.",
      note: "« Panier » est masculin en français (un panier), alors que « cesta » est féminin en espagnol."
    },
    {
      text: "Mon frère préfère nager dans la mer bleue.",
      spanish: "Mi hermano prefiere nadar en el mar azul.",
      note: "Attention ! « Mer » est féminin en français (la mer), c'est pourquoi l'adjectif prend un -e final : « bleue »."
    },
    {
      text: "Le soir, nous mangeons une glace délicieuse en ville.",
      spanish: "Por la tarde comemos un helado delicioso en la ciudad.",
      note: "Pour conserver le son doux du 'g', on écrit « mangeons » (avec un 'e'). « Glace » est féminin, donc l'adjectif s'accorde au féminin : « délicieuse »."
    }
  ],
  vocabulary: [
    { fr: "se réveiller", es: "despertarse", note: "Verbe pronominal du 1er groupe (je me réveille)." },
    { fr: "le panier", es: "la cesta", note: "Nom masculin en français." },
    { fr: "la mer", es: "el mar", note: "Nom féminin en français. Exemple : la mer bleue." },
    { fr: "délicieuse", es: "deliciosa", note: "Féminin de l'adjectif délicieux (le gâteau délicieux)." }
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
  if (pct === 1)    return 'Parfait ! Ton orthographe est impeccable.'
  if (pct >= 0.75)  return 'Très bien ! Tu maîtrises les accords et les accents.'
  if (pct >= 0.5)   return 'Pas mal, mais fais bien attention aux accords de genre (mer bleue).'
  return 'Révise le vocabulaire et les règles de grammaire, puis réessaie.'
})


function verify() {
  if (checked.value) return
  
  const clean = (str) => {
    return str
      .toLowerCase()
      .trim()
      .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?«»]/g, "") // remove punctuation
      .replace(/\s+/g, " ") // normalize spacing
      .replace(/[’']/g, "'") // normalize quotes
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

