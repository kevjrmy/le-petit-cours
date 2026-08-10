<!-- view-meta: created=2026-08-02; updated=2026-08-02 -->
<template>
  <AltLayout title="Dictée : Une journée en vacances">
    <main id="dictee-page">

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
            @click="playSpeech(currentSentence.text, 0.85)"
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
            @click="playSpeech(currentSentence.text, 0.55)"
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

    </main>
  </AltLayout>
</template>

<script setup>
import { ref, computed, onBeforeUnmount } from 'vue'
import AltLayout from '@/layouts/AltLayout.vue'

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
const speaking     = ref(false)

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

function playSpeech(text, rate) {
  if (!('speechSynthesis' in window)) {
    alert("La synthèse vocale n'est pas prise en charge par votre navigateur.")
    return
  }
  
  // Cancel active speaking to avoid overlap
  window.speechSynthesis.cancel()
  
  const utterance = new SpeechSynthesisUtterance(text)
  utterance.lang = 'fr-FR'
  utterance.rate = rate
  
  utterance.onstart = () => { speaking.value = true }
  utterance.onend   = () => { speaking.value = false }
  utterance.onerror = () => { speaking.value = false }
  
  window.speechSynthesis.speak(utterance)
}

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

onBeforeUnmount(() => {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel()
  }
})
</script>

<style scoped>
#dictee-page {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* ── Preparation card ── */
.prep-card {
  background: var(--clr-page);
  border: 1px solid var(--clr-border);
  border-radius: var(--radius);
  padding: 1.5rem;
}

.prep-card h2 {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
}

.prep-intro {
  font-size: 0.88rem;
  color: var(--clr-ink-mid);
  line-height: 1.6;
  margin-bottom: 1.25rem;
}

/* Tables style matching Bled standard */
table {
  width: 100%;
  border-collapse: collapse;
  margin: 0.5rem 0;
  font-size: 0.9rem;
}

thead {
  background: var(--clr-blue);
  color: var(--text-on-accent);
}

th {
  text-align: left;
  padding: 0.6rem 0.8rem;
  font-family: var(--font-sans);
  font-weight: 600;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

td {
  padding: 0.65rem 0.8rem;
  border-bottom: 1px solid var(--clr-border-soft);
  line-height: 1.5;
}

tbody tr:nth-child(even) {
  background: var(--clr-blue-light);
}

tbody tr:last-child td {
  border-bottom: none;
}

/* ── Dictation Interactive Card ── */
.card-dictation {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
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
  border-radius: 2px;
  transition: width 0.3s ease;
}

.spanish-prompt {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1.25rem;
  background: var(--clr-amber-light);
  border-left: 4px solid var(--clr-amber);
  border-radius: 0 var(--radius) var(--radius) 0;
}

.flag {
  font-weight: 700;
  font-size: 0.85rem;
  color: var(--clr-amber);
}

.prompt-text {
  font-family: var(--font-serif);
  font-style: italic;
  font-size: 0.95rem;
  color: var(--clr-ink);
}

/* Audio control buttons */
.audio-controls {
  display: flex;
  gap: 0.75rem;
  justify-content: center;
}

.btn-audio {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.7rem 1.25rem;
  border-radius: var(--radius);
  font-family: var(--font-sans);
  font-weight: 600;
  font-size: 0.85rem;
  cursor: pointer;
  border: 1px solid var(--clr-border);
  background: var(--clr-page);
  color: var(--clr-ink);
  transition: border-color 0.15s, background 0.15s;
}

.btn-audio:hover:not(:disabled) {
  border-color: var(--clr-blue);
  background: var(--clr-blue-light);
  color: var(--clr-blue-dark);
}

.btn-audio:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.primary-audio {
  border-color: var(--clr-blue);
  color: var(--clr-blue);
}

/* Typing area */
.input-area textarea {
  width: 100%;
  padding: 1rem;
  border: 1.5px solid var(--clr-border);
  border-radius: var(--radius);
  font-family: var(--font-serif);
  font-size: 1.1rem;
  line-height: 1.6;
  resize: vertical;
  background: var(--clr-page);
  color: var(--clr-ink);
  transition: border-color 0.15s;
}

.input-area textarea:focus {
  outline: none;
  border-color: var(--clr-blue);
}

/* Feedback card */
.feedback-card {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.25rem;
  background: var(--clr-page);
  border: 1px solid var(--clr-border);
  border-radius: var(--radius);
}

.result-status {
  font-weight: 700;
  font-size: 0.95rem;
}

.result-status.correct {
  color: var(--success-text);
}

.result-status.wrong {
  color: var(--clr-red);
}

.comparison {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--clr-border-soft);
}

.comparison-line {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.comparison-line .label {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--clr-ink-soft);
}

.user-text {
  font-family: var(--font-serif);
  font-size: 1rem;
  color: var(--clr-ink);
}

.user-text.has-errors {
  text-decoration: line-through var(--clr-red);
  color: var(--clr-ink-mid);
}

.correct-text {
  font-family: var(--font-serif);
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--clr-blue-dark);
}

.rule {
  padding: 0.75rem 1rem;
  background: var(--clr-red-light);
  border-left: 4px solid var(--clr-red);
  border-radius: 0 var(--radius) var(--radius) 0;
  font-size: 0.88rem;
}

.rule strong {
  display: block;
  margin-bottom: 0.2rem;
  color: var(--clr-red);
}

.rule p {
  margin: 0;
  font-family: var(--font-serif);
  font-style: italic;
  line-height: 1.5;
  color: var(--clr-ink);
}

/* Actions */
.btn-verify, .btn-next {
  width: 100%;
  padding: 0.85rem 1.5rem;
  border: none;
  border-radius: var(--radius);
  font-family: var(--font-sans);
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background 0.15s;
  text-align: center;
}

.btn-verify {
  background: var(--clr-blue);
  color: var(--text-on-accent);
}

.btn-verify:hover:not(:disabled) {
  background: var(--clr-blue-dark);
}

.btn-verify:disabled {
  background: var(--clr-ink-soft);
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-next {
  background: var(--clr-blue);
  color: var(--text-on-accent);
}

.btn-next:hover {
  background: var(--clr-blue-dark);
}

/* ── Result Card ── */
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
  margin: 0 0 1rem;
}

.final-review {
  width: 100%;
  max-width: 600px;
  background: var(--clr-page);
  border: 1px solid var(--clr-border);
  border-radius: var(--radius);
  padding: 1.25rem;
  margin-bottom: 1.5rem;
  text-align: left;
}

.final-review h3 {
  font-size: 1rem;
  margin-bottom: 0.75rem;
}

.full-text-box {
  background: var(--clr-bg);
  padding: 1rem;
  border-radius: var(--radius-sm);
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.full-text-box p {
  font-family: var(--font-serif);
  font-size: 1rem;
  line-height: 1.5;
  color: var(--clr-ink);
  margin: 0;
}

.btn-restart {
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

/* ── Download Button ── */
.download-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.35rem;
  margin: 0.5rem auto 0;
  padding: 0.85rem 1.5rem;
  border: 1px solid var(--clr-border);
  border-radius: var(--radius);
  color: var(--clr-ink-soft);
  font-size: 0.72rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  transition: border-color 0.15s, color 0.15s;
  background: var(--clr-page);
  cursor: pointer;
}

.download-btn:hover {
  border-color: var(--clr-blue);
  color: var(--clr-blue);
}

/* ── Print Utilities ── */
.print-only {
  display: none;
}

@media print {
  .no-print {
    display: none !important;
  }
  
  .print-only {
    display: block !important;
  }
  
  #dictee-page {
    gap: 2rem;
  }

  .print-title {
    font-family: var(--font-serif);
    font-size: 1.8rem;
    color: var(--clr-blue-dark);
    text-align: center;
    margin-bottom: 1.5rem;
  }

  .print-section {
    margin-bottom: 1.5rem;
  }

  .print-section h2 {
    font-family: var(--font-serif);
    font-size: 1.2rem;
    border-bottom: 1px solid var(--clr-blue);
    padding-bottom: 0.25rem;
    margin-bottom: 1rem;
  }

  .print-sentences {
    padding-left: 1.25rem;
  }

  .print-sentences li {
    font-family: var(--font-serif);
    font-size: 1rem;
    margin-bottom: 0.8rem;
    line-height: 1.6;
  }

  .print-note {
    display: block;
    font-family: var(--font-sans);
    font-size: 0.8rem;
    font-style: italic;
    color: var(--clr-ink-mid);
    margin-top: 0.2rem;
  }

  .print-table {
    width: 100%;
    border-collapse: collapse;
  }

  .print-table th {
    background: var(--accent-subtle);
    color: var(--clr-blue-dark);
    border-bottom: 2px solid var(--clr-blue);
  }

  .print-table td {
    border-bottom: 1px solid var(--clr-border-soft);
  }
}

/* Accessibility */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
}
</style>
