<template>
  <DefaultLayout title="À la boulangerie">
    <main id="dialogue">

      <div class="scene">
        <p class="scene-intro">
          🥖 Sophie entre dans une boulangerie. Elle veut acheter du pain.
          Complétez le dialogue avec les mots manquants.
        </p>
        <p class="scene-hint">
          <em>(Sophie entra en una panadería y quiere comprar pan. Completa el diálogo.)</em>
        </p>
      </div>

      <!-- ── Banque de mots ───────────────────────── -->
      <div class="word-bank" aria-label="Mots à placer">
        <span class="word-bank-label">Mots à placer :</span>
        <span
          v-for="w in wordBank"
          :key="w"
          class="word-chip"
          :class="{ used: usedWords.has(w) }"
        >{{ w }}</span>
      </div>

      <!-- ── Dialogue ─────────────────────────────── -->
      <div class="chat">
        <template v-for="(line, i) in dialogue" :key="i">
          <div class="bubble-row" :class="line.who">
            <span class="speaker">{{ line.who === 'cliente' ? 'Sophie' : 'La boulangère' }}</span>
            <p class="bubble">
              <template v-for="(part, j) in line.parts" :key="j">
                <span v-if="part.text">{{ part.text }}</span>
                <input
                  v-else
                  v-model.trim="answers[part.id]"
                  type="text"
                  class="blank"
                  :class="blankClass(part.id)"
                  :size="Math.max(part.answer.length, 5)"
                  :disabled="checked && isCorrect(part.id)"
                  autocomplete="off"
                  autocapitalize="off"
                  spellcheck="false"
                  :aria-label="'Mot manquant ' + part.id"
                  @keyup.enter="check"
                />
              </template>
            </p>
          </div>
        </template>
      </div>

      <!-- ── Actions ──────────────────────────────── -->
      <div class="actions">
        <button class="btn-check" @click="check">Vérifier</button>
        <button v-if="checked" class="btn-reset" @click="reset">Recommencer</button>
      </div>

      <!-- ── Résultat ─────────────────────────────── -->
      <div v-if="checked" class="result" :class="{ perfect: allCorrect }">
        <span v-if="allCorrect">🎉 Bravo Sophie ! Tout est correct !</span>
        <span v-else>
          {{ correctCount }} / {{ blanks.length }} corrects.
          Corrigez les mots en rouge et réessayez 💪
        </span>
      </div>

    </main>
  </DefaultLayout>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'

// Each blank: id, answer (canonical), accept (extra accepted spellings)
const dialogue = [
  { who: 'boulangere', parts: [
    { text: 'Bonjour, madame ! Vous ' },
    { id: 1, answer: 'désirez', accept: ['desirez'] },
    { text: ' ?' },
  ]},
  { who: 'cliente', parts: [
    { text: 'Bonjour ! Je ' },
    { id: 2, answer: 'voudrais' },
    { text: ' une baguette, s\'il vous plaît.' },
  ]},
  { who: 'boulangere', parts: [
    { text: 'Très bien. Et avec ' },
    { id: 3, answer: 'ceci' },
    { text: ' ?' },
  ]},
  { who: 'cliente', parts: [
    { text: 'Je voudrais aussi deux ' },
    { id: 4, answer: 'croissants', accept: ['croissant'] },
    { text: ', s\'il vous plaît.' },
  ]},
  { who: 'boulangere', parts: [
    { text: 'Voilà. Ce sera ' },
    { id: 5, answer: 'tout' },
    { text: ' ?' },
  ]},
  { who: 'cliente', parts: [
    { text: 'Oui, c\'est tout. ' },
    { id: 6, answer: 'Combien', accept: ['combien'] },
    { text: ' ça coûte ?' },
  ]},
  { who: 'boulangere', parts: [
    { text: 'Ça fait 3 ' },
    { id: 7, answer: 'euros', accept: ['euro'] },
    { text: ' 50, s\'il vous plaît.' },
  ]},
  { who: 'cliente', parts: [
    { text: 'Voilà. ' },
    { id: 8, answer: 'Merci', accept: ['merci'] },
    { text: ' beaucoup !' },
  ]},
  { who: 'boulangere', parts: [
    { text: 'Merci à vous. ' },
    { id: 9, answer: 'Au revoir', accept: ['au revoir'] },
    { text: ' et bonne journée !' },
  ]},
]

const blanks = dialogue.flatMap(l => l.parts.filter(p => p.id != null))

const wordBank = blanks
  .map(b => b.answer)
  .sort(() => Math.random() - 0.5)

const answers = reactive(Object.fromEntries(blanks.map(b => [b.id, ''])))
const checked = ref(false)

function normalize(s) {
  return (s || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '') // strip accents — be forgiving
    .replace(/\s+/g, ' ')
    .trim()
}

function blankById(id) {
  return blanks.find(b => b.id === id)
}

function isCorrect(id) {
  const b = blankById(id)
  const given = normalize(answers[id])
  if (!given) return false
  const accepted = [b.answer, ...(b.accept || [])].map(normalize)
  return accepted.includes(given)
}

function blankClass(id) {
  if (!checked.value) return ''
  return isCorrect(id) ? 'is-correct' : 'is-wrong'
}

const correctCount = computed(() =>
  checked.value ? blanks.filter(b => isCorrect(b.id)).length : 0
)

const allCorrect = computed(() => correctCount.value === blanks.length)

// Highlight word-bank chips that the student has already placed correctly
const usedWords = computed(() => {
  const set = new Set()
  for (const b of blanks) {
    if (isCorrect(b.id)) set.add(b.answer)
  }
  return set
})

function check() {
  checked.value = true
}

function reset() {
  for (const b of blanks) answers[b.id] = ''
  checked.value = false
}
</script>

<style scoped>
#dialogue {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

/* ── Scene ─────────────────────────────────────── */
.scene-intro {
  font-family: var(--font-serif);
  font-size: 1rem;
  line-height: 1.7;
  color: var(--clr-ink);
  margin: 0;
}

.scene-hint {
  font-family: var(--font-serif);
  font-style: italic;
  font-size: 0.85rem;
  color: var(--clr-ink-soft);
  margin: 0.35rem 0 0;
}

/* ── Word bank ─────────────────────────────────── */
.word-bank {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.4rem;
  padding: 0.85rem 1rem;
  background: var(--clr-blue-light);
  border: 1px solid var(--clr-border);
  border-radius: var(--radius);
}

.word-bank-label {
  font-family: var(--font-sans);
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--clr-ink-soft);
  margin-right: 0.25rem;
}

.word-chip {
  font-family: var(--font-mono);
  font-size: 0.82rem;
  padding: 0.2rem 0.55rem;
  background: var(--clr-page);
  border: 1px solid var(--clr-border);
  border-radius: 99px;
  color: var(--clr-ink);
  transition: opacity 0.15s, text-decoration 0.15s;
}

.word-chip.used {
  opacity: 0.4;
  text-decoration: line-through;
}

/* ── Chat ──────────────────────────────────────── */
.chat {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.bubble-row {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  max-width: 85%;
}

.bubble-row.cliente {
  align-self: flex-end;
  align-items: flex-end;
}

.bubble-row.boulangere {
  align-self: flex-start;
  align-items: flex-start;
}

.speaker {
  font-family: var(--font-sans);
  font-size: 0.68rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--clr-ink-soft);
}

.bubble {
  margin: 0;
  padding: 0.7rem 0.95rem;
  border-radius: var(--radius);
  font-family: var(--font-serif);
  font-size: 0.97rem;
  line-height: 1.9;
  border: 1px solid var(--clr-border);
}

.bubble-row.boulangere .bubble {
  background: var(--clr-page);
  border-bottom-left-radius: 4px;
}

.bubble-row.cliente .bubble {
  background: var(--clr-blue-light);
  border-bottom-right-radius: 4px;
}

/* ── Blanks ────────────────────────────────────── */
.blank {
  font-family: var(--font-mono);
  font-size: 0.88rem;
  padding: 0.1rem 0.4rem;
  margin: 0 0.1rem;
  border: none;
  border-bottom: 2px solid var(--clr-blue);
  background: rgba(255, 255, 255, 0.6);
  border-radius: 4px 4px 0 0;
  color: var(--clr-ink);
  text-align: center;
  outline: none;
}

.blank:focus {
  background: #fff;
  box-shadow: 0 1px 0 var(--clr-blue);
}

.blank.is-correct {
  border-bottom-color: #4CAF50;
  background: #F1FBF2;
  color: #2E7D32;
  font-weight: 600;
}

.blank.is-wrong {
  border-bottom-color: var(--clr-red);
  background: var(--clr-red-light);
  color: var(--clr-red);
}

/* ── Actions ───────────────────────────────────── */
.actions {
  display: flex;
  gap: 0.6rem;
}

.btn-check {
  flex: 1;
  padding: 0.8rem 1.5rem;
  background: var(--clr-blue);
  color: var(--clr-page);
  border-radius: var(--radius);
  font-family: var(--font-sans);
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background 0.15s;
}

.btn-check:hover {
  background: var(--clr-blue-dark);
}

.btn-reset {
  padding: 0.8rem 1.25rem;
  background: transparent;
  border: 1.5px solid var(--clr-border);
  border-radius: var(--radius);
  color: var(--clr-ink-mid);
  font-family: var(--font-sans);
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: border-color 0.15s, color 0.15s;
}

.btn-reset:hover {
  border-color: var(--clr-blue);
  color: var(--clr-blue);
}

/* ── Result ────────────────────────────────────── */
.result {
  text-align: center;
  padding: 0.85rem 1rem;
  border-radius: var(--radius);
  font-family: var(--font-sans);
  font-size: 0.9rem;
  font-weight: 600;
  background: var(--clr-red-light);
  color: var(--clr-red);
}

.result.perfect {
  background: #F1FBF2;
  color: #2E7D32;
}

@media print {
  .word-bank.used,
  .actions { display: none; }
}
</style>
