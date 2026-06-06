<template>
  <AltLayout title="Cartes Mémoire — Vocabulaire Médical">
    <main class="flashcards-container">

      <div class="filter-bar">
        <button
          v-for="cat in categories"
          :key="cat.key"
          :class="['filter-btn', { active: selectedCategory === cat.key }]"
          @click="filtrer(cat.key)"
        >
          {{ cat.icon }} {{ cat.label }}
        </button>
      </div>

      <div class="progress-section">
        <p class="progress-text">
          Carte {{ currentIndex + 1 }} / {{ cartesFiltrees.length }}
          <span v-if="learnedCount > 0" class="learned-badge">{{ learnedCount }} apprise(s)</span>
        </p>
        <div class="progress-track">
          <div class="progress-fill" :style="{ width: ((currentIndex + 1) / cartesFiltrees.length) * 100 + '%' }"></div>
        </div>
      </div>

      <div class="card-scene" @click="retourner">
        <div :class="['card-wrapper', { 'is-flipped': flipped }]">
          <div class="card-face card-front">
            <div class="card-category">{{ carteCourante.categorie }}</div>
            <p class="card-term">{{ carteCourante.francais }}</p>
            <p class="card-hint">Clique pour voir la réponse</p>
          </div>
          <div class="card-face card-back">
            <div class="card-category">{{ carteCourante.categorie }}</div>
            <p class="card-translation">{{ carteCourante.espagnol }}</p>
            <p class="card-example">{{ carteCourante.exemple }}</p>
            <button class="btn-audio" @click.stop="prononcer(carteCourante.francais)" title="Écouter la prononciation">
              🔊 Écouter
            </button>
          </div>
        </div>
      </div>

      <div class="controls">
        <button class="ctrl-btn" @click="precedente" :disabled="cartesFiltrees.length <= 1">◀ Précédent</button>
        <button class="ctrl-btn shuffle" @click="melanger" title="Mélanger les cartes">⟳ Aléatoire</button>
        <button class="ctrl-btn" @click="suivante" :disabled="cartesFiltrees.length <= 1">Suivant ▶</button>
      </div>

      <div class="btn-apprise">
        <button
          v-if="flipped"
          :class="['btn-study', { 'is-learned': estApprise }]"
          @click="basculerApprise"
        >
          {{ estApprise ? '✓ Déjà apprise' : '☆ Marquer comme apprise' }}
        </button>
      </div>

    </main>
  </AltLayout>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import AltLayout from '@/layouts/AltLayout.vue'

const cartes = [
  { categorie: 'Le Corps Humain', francais: 'la tête', espagnol: 'la cabeza', exemple: 'Le patient a mal à la tête.' },
  { categorie: 'Le Corps Humain', francais: 'le bras', espagnol: 'el brazo', exemple: 'Il a une blessure au bras droit.' },
  { categorie: 'Le Corps Humain', francais: 'la jambe', espagnol: 'la pierna', exemple: 'La jambe gauche est enflée.' },
  { categorie: 'Le Corps Humain', francais: 'le dos', espagnol: 'la espalda', exemple: 'Elle souffre du dos.' },
  { categorie: 'Le Corps Humain', francais: 'le ventre', espagnol: 'el vientre', exemple: 'J\'ai mal au ventre.' },
  { categorie: 'Le Corps Humain', francais: 'la gorge', espagnol: 'la garganta', exemple: 'Il a mal à la gorge.' },
  { categorie: 'Le Corps Humain', francais: 'la poitrine', espagnol: 'el pecho', exemple: 'Elle ressent une douleur à la poitrine.' },
  { categorie: 'Le Corps Humain', francais: 'le genou', espagnol: 'la rodilla', exemple: 'Le genou est gonflé.' },

  { categorie: 'Les Symptômes', francais: 'la fièvre', espagnol: 'la fiebre', exemple: 'Le patient a 38,5°C de fièvre.' },
  { categorie: 'Les Symptômes', francais: 'la toux', espagnol: 'la tos', exemple: 'Il tousse depuis trois jours.' },
  { categorie: 'Les Symptômes', francais: 'la douleur', espagnol: 'el dolor', exemple: 'La douleur est intense.' },
  { categorie: 'Les Symptômes', francais: 'la fatigue', espagnol: 'la fatiga', exemple: 'Elle se sent très fatiguée.' },
  { categorie: 'Les Symptômes', francais: 'les nausées', espagnol: 'las náuseas', exemple: 'Il a des nausées le matin.' },
  { categorie: 'Les Symptômes', francais: 'le vertige', espagnol: 'el mareo', exemple: 'Elle a des vertiges quand elle se lève.' },
  { categorie: 'Les Symptômes', francais: 'l\'éruption cutanée', espagnol: 'la erupción cutánea', exemple: 'Une éruption rouge est apparue.' },
  { categorie: 'Les Symptômes', francais: 'le gonflement', espagnol: 'la hinchazón', exemple: 'Le gonflement diminue avec la glace.' },
  { categorie: 'Les Symptômes', francais: 'l\'essoufflement', espagnol: 'la falta de aire', exemple: 'Il est essoufflé après un petit effort.' },
  { categorie: 'Les Symptômes', francais: 'la migraine', espagnol: 'la migraña', exemple: 'Elle souffre de migraines fréquentes.' },

  { categorie: 'Les Verbes Médicaux', francais: 'ausculter', espagnol: 'examinar con estetoscopio', exemple: 'Le médecin ausculte le patient.' },
  { categorie: 'Les Verbes Médicaux', francais: 'prescrire', espagnol: 'recetar', exemple: 'Je prescris des antibiotiques.' },
  { categorie: 'Les Verbes Médicaux', francais: 'soigner', espagnol: 'tratar, cuidar', exemple: 'L\'infirmière soigne les blessés.' },
  { categorie: 'Les Verbes Médicaux', francais: 'examiner', espagnol: 'examinar', exemple: 'J\'examine la gorge du patient.' },
  { categorie: 'Les Verbes Médicaux', francais: 'diagnostiquer', espagnol: 'diagnosticar', exemple: 'Le docteur diagnostique une infection.' },
  { categorie: 'Les Verbes Médicaux', francais: 'palper', espagnol: 'palpar', exemple: 'Je palpe le ventre pour vérifier.' },
  { categorie: 'Les Verbes Médicaux', francais: 'hospitaliser', espagnol: 'hospitalizar', exemple: 'Il faut hospitaliser le patient.' },
  { categorie: 'Les Verbes Médicaux', francais: 'opérer', espagnol: 'operar', exemple: 'Le chirurgien va opérer demain.' },

  { categorie: 'Les Medicaments', francais: 'les antibiotiques', espagnol: 'los antibióticos', exemple: 'Prends ces antibiotiques pendant 7 jours.' },
  { categorie: 'Les Medicaments', francais: 'l\'ordonnance', espagnol: 'la receta médica', exemple: 'Voici votre ordonnance pour la pharmacie.' },
  { categorie: 'Les Medicaments', francais: 'la piqûre', espagnol: 'la inyección', exemple: 'Je vais vous faire une piqûre.' },
  { categorie: 'Les Medicaments', francais: 'le sirop', espagnol: 'el jarabe', exemple: 'Prends une cuillère de sirop le soir.' },
  { categorie: 'Les Medicaments', francais: 'le comprimé', espagnol: 'el comprimido', exemple: 'Prends un comprimé matin et soir.' },
  { categorie: 'Les Medicaments', francais: 'la pommade', espagnol: 'la pomada', exemple: 'Applique la pommade sur la peau.' },

  { categorie: 'A l Hopital', francais: 'l\'hôpital', espagnol: 'el hospital', exemple: 'Il est à l\'hôpital depuis lundi.' },
  { categorie: 'A l Hopital', francais: 'le cabinet', espagnol: 'el consultorio', exemple: 'Rendez-vous au cabinet du docteur.' },
  { categorie: 'A l Hopital', francais: 'l\'infirmier', espagnol: 'el enfermero', exemple: 'L\'infirmier prend la tension.' },
  { categorie: 'A l Hopital', francais: 'le médecin', espagnol: 'el médico', exemple: 'Le médecin généraliste vous reçoit.' },
  { categorie: 'A l Hopital', francais: 'les urgences', espagnol: 'urgencias', exemple: 'Amenez-le aux urgences.' },
  { categorie: 'A l Hopital', francais: 'la salle d\'opération', espagnol: 'el quirófano', exemple: 'La salle d\'opération est prête.' }
]

const categories = [
  { key: 'toutes', icon: '📚', label: 'Toutes' },
  { key: 'Le Corps Humain', icon: '🧍', label: 'Corps' },
  { key: 'Les Symptômes', icon: '🤒', label: 'Symptômes' },
  { key: 'Les Verbes Médicaux', icon: '💊', label: 'Verbes' },
  { key: 'Les Medicaments', icon: '💉', label: 'Médicaments' },
  { key: 'A l Hopital', icon: '🏥', label: 'Hôpital' }
]

const currentIndex = ref(0)
const flipped = ref(false)
const selectedCategory = ref('toutes')
const learnedIds = ref(new Set())

const cartesFiltrees = computed(() => {
  if (selectedCategory.value === 'toutes') return cartes
  return cartes.filter(c => c.categorie === selectedCategory.value)
})

const carteCourante = computed(() => cartesFiltrees.value[currentIndex.value] || cartesFiltrees.value[0])

const learnedCount = computed(() => learnedIds.value.size)

const estApprise = computed(() => {
  const c = carteCourante.value
  return c && learnedIds.value.has(c.francais + c.categorie)
})

watch(cartesFiltrees, () => {
  currentIndex.value = 0
  flipped.value = false
})

function filtrer(cat) {
  selectedCategory.value = cat
}

function retourner() {
  flipped.value = !flipped.value
}

function precedente() {
  if (cartesFiltrees.value.length <= 1) return
  flipped.value = false
  currentIndex.value = (currentIndex.value - 1 + cartesFiltrees.value.length) % cartesFiltrees.value.length
}

function suivante() {
  if (cartesFiltrees.value.length <= 1) return
  flipped.value = false
  currentIndex.value = (currentIndex.value + 1) % cartesFiltrees.value.length
}

function melanger() {
  const current = cartesFiltrees.value
  for (let i = current.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [current[i], current[j]] = [current[j], current[i]]
  }
  currentIndex.value = 0
  flipped.value = false
}

function basculerApprise() {
  const c = carteCourante.value
  if (!c) return
  const key = c.francais + c.categorie
  const next = new Set(learnedIds.value)
  if (next.has(key)) {
    next.delete(key)
  } else {
    next.add(key)
  }
  learnedIds.value = next
  localStorage.setItem('lpc-vocab-apprises', JSON.stringify([...next]))
}

function prononcer(texte) {
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(texte)
    utterance.lang = 'fr-FR'
    utterance.rate = 0.85
    speechSynthesis.speak(utterance)
  }
}

onMounted(() => {
  currentIndex.value = Math.floor(Math.random() * cartes.length)
  const stored = localStorage.getItem('lpc-vocab-apprises')
  if (stored) {
    learnedIds.value = new Set(JSON.parse(stored))
  }
})
</script>

<style scoped>
.flashcards-container {
  padding: 1.5rem;
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

/* Filter Bar */
.filter-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
}

.filter-btn {
  background: white;
  border: 1px solid var(--clr-border);
  padding: 0.5rem 0.9rem;
  border-radius: 999px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
  color: var(--clr-ink-muted);
}

.filter-btn:hover {
  border-color: #42a5f5;
  color: var(--clr-navy);
}

.filter-btn.active {
  background: #e3f2fd;
  border-color: #42a5f5;
  color: #1565c0;
}

/* Progress */
.progress-section {
  margin-bottom: 0.5rem;
}

.progress-text {
  text-align: center;
  font-weight: bold;
  color: var(--clr-ink-muted);
  margin-bottom: 0.4rem;
  font-size: 0.9rem;
}

.learned-badge {
  display: inline-block;
  background: #e8f5e9;
  color: #2e7d32;
  padding: 0.1rem 0.5rem;
  border-radius: 999px;
  font-size: 0.75rem;
  margin-left: 0.5rem;
}

.progress-track {
  width: 100%;
  height: 6px;
  background: #eee;
  border-radius: 3px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: #42a5f5;
  transition: width 0.3s ease;
}

/* Card 3D Scene */
.card-scene {
  perspective: 1000px;
  cursor: pointer;
  min-height: 280px;
}

.card-wrapper {
  position: relative;
  width: 100%;
  min-height: 280px;
  transition: transform 0.5s ease;
  transform-style: preserve-3d;
}

.card-wrapper.is-flipped {
  transform: rotateY(180deg);
}

.card-face {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem 1.5rem;
  border-radius: 20px;
  backface-visibility: hidden;
  border: 1px solid var(--clr-border);
  box-shadow: 0 4px 20px rgba(0,0,0,0.06);
}

.card-front {
  background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
  z-index: 2;
}

.card-back {
  background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%);
  transform: rotateY(180deg);
}

.card-category {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--clr-ink-soft);
  font-weight: 600;
  margin-bottom: 0.8rem;
}

.card-term {
  font-family: var(--font-serif);
  font-size: 2rem;
  font-weight: 700;
  color: var(--clr-navy);
  text-align: center;
  margin-bottom: 1rem;
}

.card-hint {
  font-size: 0.85rem;
  color: var(--clr-ink-soft);
  font-style: italic;
}

.card-translation {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1b5e20;
  text-align: center;
  margin-bottom: 0.8rem;
}

.card-example {
  font-size: 0.95rem;
  color: var(--clr-ink-muted);
  font-style: italic;
  text-align: center;
  margin-bottom: 1rem;
  max-width: 90%;
}

.btn-audio {
  background: white;
  border: 1px solid #42a5f5;
  color: #1565c0;
  padding: 0.5rem 1.2rem;
  border-radius: 999px;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.15s;
}

.btn-audio:hover {
  background: #42a5f5;
  color: white;
}

/* Controls */
.controls {
  display: flex;
  gap: 0.8rem;
  justify-content: center;
}

.ctrl-btn {
  background: white;
  border: 1px solid var(--clr-border);
  padding: 0.7rem 1.2rem;
  border-radius: 999px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
  color: var(--clr-ink);
  font-size: 0.9rem;
  flex: 1;
  text-align: center;
}

.ctrl-btn:hover:not(:disabled) {
  border-color: #42a5f5;
  color: #1565c0;
}

.ctrl-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.ctrl-btn.shuffle {
  flex: 0.6;
}

.btn-apprise {
  text-align: center;
}

.btn-study {
  background: white;
  border: 1px solid #c8e6c9;
  color: #2e7d32;
  padding: 0.7rem 1.5rem;
  border-radius: 999px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
  font-size: 0.9rem;
}

.btn-study:hover {
  background: #e8f5e9;
}

.btn-study.is-learned {
  background: #e8f5e9;
  border-color: #4caf50;
  color: #1b5e20;
}
</style>
