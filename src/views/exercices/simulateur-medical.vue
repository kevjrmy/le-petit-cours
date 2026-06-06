<template>
  <AltLayout title="Simulateur Médical">
    <main class="simu-container">

      <div class="progress-section">
        <p class="progress-text">Patient {{ currentIndex + 1 }} / {{ patients.length }}</p>
        <div class="progress-track">
          <div class="progress-fill" :style="{ width: ((currentIndex + 1) / patients.length) * 100 + '%' }"></div>
        </div>
      </div>

      <section class="section patient-card">
        <div class="section-header">
          <span class="section-icon">🏥</span>
          <h2>Fiche Patient</h2>
        </div>
        <div class="patient-info">
          <p class="patient-name">{{ patient.sexe }} {{ patient.nom }}, {{ patient.age }} ans</p>
          <p class="symptoms-label">Symptômes :</p>
          <ul class="symptom-list">
            <li v-for="symptom in patient.symptomes" :key="symptom">{{ symptom }}</li>
          </ul>
          <p class="patient-since">Depuis : {{ patient.depuis }}</p>
        </div>
        <button @click="nouveauPatient" class="btn-new-patient">
          ⟳ Nouveau patient
        </button>
      </section>

      <section class="section writing-area">
        <div class="section-header">
          <span class="section-icon">✍️</span>
          <h2>Note de Consultation</h2>
        </div>
        <p class="instruction">Rédige une note de 3-4 phrases pour décrire le patient et proposer un traitement.</p>
        <div class="connector-bar">
          <span class="connector-label">Connecteurs :</span>
          <button v-for="c in connecteurs" :key="c" class="connector-chip" @click="ajouterConnecteur(c)">{{ c }}</button>
        </div>
        <textarea v-model="note" class="consultation-textarea" placeholder="Exemple : D'abord, j'examine le patient. Ensuite, je diagnostique une infection. Enfin, je prescris un traitement." rows="5"></textarea>
        <p class="char-count">{{ note.length }} caractères</p>
      </section>

      <section class="section vocab-section">
        <div class="vocab-toggle" @click="showVocab = !showVocab">
          <span class="section-icon">💊</span>
          <h2>Vocabulaire de Soutien</h2>
          <span class="toggle-arrow">{{ showVocab ? '▾' : '▸' }}</span>
        </div>
        <div v-if="showVocab" class="vocab-grid">
          <div v-for="v in vocabulaire" :key="v.verbe" class="vocab-item">
            <span class="vocab-verbe">{{ v.verbe }}</span>
            <span class="vocab-sep">→</span>
            <span class="vocab-trad">{{ v.traduction }}</span>
            <span class="vocab-exemple">{{ v.exemple }}</span>
          </div>
        </div>
      </section>

      <section class="section finalize-section">
        <button @click="finaliser" class="btn-finaliser" :disabled="!note.trim()">
          📝 Finaliser la consultation
        </button>

        <transition name="fade">
          <div v-if="feedback" :class="['feedback-box', feedbackType]">
            <p class="feedback-emoji">✨</p>
            <p class="feedback-text">{{ feedback }}</p>
            <p v-if="savedCount > 0" class="feedback-meta">{{ savedCount }} consultation(s) enregistrée(s)</p>
          </div>
        </transition>
      </section>

      <RouterLink to="/exercices" class="btn-back">← Retour aux exercices</RouterLink>

    </main>
  </AltLayout>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import AltLayout from '@/layouts/AltLayout.vue'

const patients = [
  { sexe: 'Mme', nom: 'Martin', age: 45, symptomes: ['mal de tête persistant', 'fièvre (38.7°C)', 'toux sèche'], depuis: '5 jours' },
  { sexe: 'M.', nom: 'Dupont', age: 52, symptomes: ['douleur au ventre', 'nausées', 'fatigue générale'], depuis: '3 jours' },
  { sexe: 'Mme', nom: 'Petit', age: 28, symptomes: ['mal à la gorge', 'fièvre (39.1°C)', 'difficulté à avaler'], depuis: '2 jours' },
  { sexe: 'M.', nom: 'Bernard', age: 60, symptomes: ['douleur au genou', 'gonflement', 'difficulté à marcher'], depuis: '1 semaine' },
  { sexe: 'Mme', nom: 'Leroy', age: 35, symptomes: ['éruption cutanée', 'démangeaisons', 'rougeurs sur les bras'], depuis: '4 jours' },
  { sexe: 'M.', nom: 'Moreau', age: 40, symptomes: ['douleur à la poitrine', 'essoufflement', 'vertiges'], depuis: '2 jours' },
  { sexe: 'Mme', nom: 'Dubois', age: 30, symptomes: ['mal aux oreilles', 'fièvre (38.5°C)', 'perte d\'audition légère'], depuis: '3 jours' },
  { sexe: 'M.', nom: 'Laurent', age: 55, symptomes: ['maux de dos', 'raideur musculaire', 'difficulté à se lever'], depuis: '2 semaines' },
  { sexe: 'Mme', nom: 'Roux', age: 25, symptomes: ['migraine', 'sensibilité à la lumière', 'nausées'], depuis: '1 jour' },
  { sexe: 'M.', nom: 'Fournier', age: 70, symptomes: ['essoufflement', 'toux grasse', 'fièvre (38.2°C)'], depuis: '4 jours' }
]

const connecteurs = ['d\'abord', 'ensuite', 'enfin', 'parce que', 'donc', 'puis', 'mais', 'et']

const vocabulaire = [
  { verbe: 'ausculter', traduction: 'examiner avec un stéthoscope', exemple: 'J\'ausculte les poumons.' },
  { verbe: 'prescrire', traduction: 'ordonner un médicament', exemple: 'Je prescris des antibiotiques.' },
  { verbe: 'soigner', traduction: 'prendre soin, traiter', exemple: 'Je soigne le patient.' },
  { verbe: 'examiner', traduction: 'regarder attentivement', exemple: 'J\'examine la gorge.' },
  { verbe: 'diagnostiquer', traduction: 'identifier la maladie', exemple: 'Je diagnostique une grippe.' },
  { verbe: 'palper', traduction: 'toucher pour sentir', exemple: 'Je palpe le ventre.' },
  { verbe: 'hospitaliser', traduction: 'admettre à l\'hôpital', exemple: 'J\'hospitalise le patient.' },
  { verbe: 'opérer', traduction: 'faire une chirurgie', exemple: 'Le chirurgien opère demain.' }
]

const encouragements = [
  'Super ! Ta note est bien enregistrée. Continue comme ça !',
  'Bravo ! Tu rédiges une bonne note de consultation.',
  'Excellent travail ! Tu progresses en français médical.',
  'Bien rédigé ! Chaque jour un peu mieux.',
  'Parfait ! La pratique est la clé du progrès.',
  'Très bien ! Tu gagnes en confiance en français.',
  'Bonne analyse médicale ! Continue à t\'entraîner.',
  'Génial ! Tu maîtrises le vocabulaire essentiel.'
]

const currentIndex = ref(0)
const note = ref('')
const showVocab = ref(false)
const feedback = ref('')
const feedbackType = ref('')
const savedCount = ref(0)

const patient = computed(() => patients[currentIndex.value])

function nouveauPatient() {
  let next = Math.floor(Math.random() * patients.length)
  while (next === currentIndex.value && patients.length > 1) {
    next = Math.floor(Math.random() * patients.length)
  }
  currentIndex.value = next
  note.value = ''
  feedback.value = ''
  feedbackType.value = ''
}

function ajouterConnecteur(c) {
  const cursor = note.value.length
  note.value += (note.value ? ' ' : '') + c + ' '
}

function finaliser() {
  if (!note.value.trim()) return

  const consultation = {
    date: new Date().toISOString(),
    patient: { ...patient.value },
    note: note.value.trim()
  }

  const stored = JSON.parse(localStorage.getItem('lpc-consultations') || '[]')
  stored.push(consultation)
  localStorage.setItem('lpc-consultations', JSON.stringify(stored))
  savedCount.value = stored.length

  const msg = encouragements[Math.floor(Math.random() * encouragements.length)]
  feedback.value = msg
  feedbackType.value = 'success'
}

onMounted(() => {
  currentIndex.value = Math.floor(Math.random() * patients.length)
  savedCount.value = JSON.parse(localStorage.getItem('lpc-consultations') || '[]').length
})
</script>

<style scoped>
.simu-container {
  padding: 1.5rem;
  max-width: 720px;
  margin: 0 auto;
}

.progress-section {
  margin-bottom: 1.5rem;
}

.progress-text {
  text-align: center;
  font-weight: bold;
  color: var(--clr-ink-muted);
  margin-bottom: 0.5rem;
}

.progress-track {
  width: 100%;
  height: 8px;
  background: #eee;
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: #42a5f5;
  transition: width 0.4s ease;
}

.section {
  background: rgba(255, 255, 250, 0.94);
  border: 1px solid var(--clr-border);
  border-radius: 22px;
  padding: 1.6rem;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 1rem;
}

.section-header h2 {
  font-family: var(--font-serif);
  font-size: 1.3rem;
  margin: 0;
  color: var(--clr-navy);
}

.section-icon {
  font-size: 1.5rem;
}

/* Patient Card */
.patient-card {
  background: #e3f2fd;
  border-color: #bbdefb;
}

.patient-info {
  margin-bottom: 1rem;
}

.patient-name {
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--clr-navy);
  margin-bottom: 0.8rem;
}

.symptoms-label {
  font-weight: 600;
  color: var(--clr-navy);
  margin-bottom: 0.3rem;
}

.symptom-list {
  list-style: none;
  padding: 0;
  margin: 0 0 0.6rem 1.2rem;
}

.symptom-list li {
  position: relative;
  padding-left: 0.5rem;
  margin-bottom: 0.25rem;
  color: var(--clr-ink);
}

.symptom-list li::before {
  content: '•';
  position: absolute;
  left: -0.5rem;
  color: #42a5f5;
  font-weight: bold;
}

.patient-since {
  color: var(--clr-ink-muted);
  font-style: italic;
  font-size: 0.95rem;
}

.btn-new-patient {
  background: var(--clr-flag-white);
  color: var(--clr-navy);
  border: 1px solid var(--clr-navy);
  padding: 0.6rem 1.2rem;
  border-radius: 999px;
  font-weight: 600;
  cursor: pointer;
  font-size: 0.95rem;
  transition: all 0.2s;
}

.btn-new-patient:hover {
  background: var(--clr-navy);
  color: white;
}

/* Writing Area */
.writing-area {
  background: rgba(255, 255, 250, 0.94);
}

.instruction {
  color: var(--clr-ink-muted);
  font-size: 0.95rem;
  margin-bottom: 0.8rem;
}

.connector-bar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.4rem;
  margin-bottom: 0.8rem;
}

.connector-label {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--clr-ink-soft);
  margin-right: 0.3rem;
}

.connector-chip {
  background: #fff3e0;
  color: #e65100;
  border: 1px solid #ffe0b2;
  padding: 0.25rem 0.6rem;
  border-radius: 999px;
  font-size: 0.85rem;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.15s;
}

.connector-chip:hover {
  background: #ffe0b2;
  transform: translateY(-1px);
}

.consultation-textarea {
  width: 100%;
  padding: 1rem;
  border: 1px solid var(--clr-border);
  border-radius: 14px;
  font-family: var(--font-sans);
  font-size: 1rem;
  resize: vertical;
  min-height: 120px;
  background: white;
  color: var(--clr-ink);
  transition: border-color 0.2s;
}

.consultation-textarea:focus {
  outline: none;
  border-color: #42a5f5;
  box-shadow: 0 0 0 3px rgba(66, 165, 245, 0.15);
}

.char-count {
  text-align: right;
  font-size: 0.85rem;
  color: var(--clr-ink-soft);
  margin-top: 0.3rem;
}

/* Vocabulary Panel */
.vocab-section {
  background: rgba(255, 255, 250, 0.94);
}

.vocab-toggle {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  cursor: pointer;
  user-select: none;
}

.vocab-toggle h2 {
  flex: 1;
  font-family: var(--font-serif);
  font-size: 1.3rem;
  margin: 0;
  color: var(--clr-navy);
}

.toggle-arrow {
  font-size: 1rem;
  color: var(--clr-ink-soft);
  transition: transform 0.2s;
}

.vocab-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.8rem;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--clr-border);
}

.vocab-item {
  padding: 0.7rem;
  background: #f1f8e9;
  border: 1px solid #c8e6c9;
  border-radius: 12px;
}

.vocab-verbe {
  font-weight: 700;
  color: #2e7d32;
  margin-right: 0.3rem;
}

.vocab-sep {
  color: var(--clr-ink-soft);
  margin-right: 0.3rem;
}

.vocab-trad {
  color: var(--clr-ink-muted);
  font-size: 0.9rem;
}

.vocab-exemple {
  display: block;
  color: var(--clr-ink-soft);
  font-style: italic;
  font-size: 0.85rem;
  margin-top: 0.2rem;
}

/* Finalize */
.finalize-section {
  text-align: center;
}

.btn-finaliser {
  background: #43a047;
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 999px;
  font-weight: 700;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background 0.2s, transform 0.15s;
  width: 100%;
  max-width: 400px;
}

.btn-finaliser:hover:not(:disabled) {
  background: #388e3c;
  transform: translateY(-1px);
}

.btn-finaliser:disabled {
  background: #bdbdbd;
  cursor: not-allowed;
}

.feedback-box {
  margin-top: 1.2rem;
  padding: 1.2rem;
  border-radius: 16px;
  background: #e8f5e9;
  border: 1px solid #a5d6a7;
  text-align: center;
}

.feedback-box.success {
  background: #e8f5e9;
  border-color: #a5d6a7;
}

.feedback-emoji {
  font-size: 1.8rem;
  margin-bottom: 0.3rem;
}

.feedback-text {
  font-weight: 600;
  color: #2e7d32;
  font-size: 1.05rem;
}

.feedback-meta {
  color: var(--clr-ink-soft);
  font-size: 0.85rem;
  margin-top: 0.4rem;
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease, transform 0.3s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(8px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

/* Back button */
.btn-back {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  border-radius: 999px;
  font-weight: 600;
  color: var(--clr-flag-blue);
  background: rgba(255, 255, 255, 0.95);
  border: 1px solid rgba(27, 54, 95, 0.16);
  text-decoration: none;
  transition: transform 0.18s ease;
  align-self: flex-start;
}

.btn-back:hover {
  transform: translateY(-1px);
}

/* Responsive */
@media (max-width: 600px) {
  .vocab-grid {
    grid-template-columns: 1fr;
  }
}
</style>
