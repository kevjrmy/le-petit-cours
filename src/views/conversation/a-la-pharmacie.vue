<!-- view-meta: created=2026-08-02; updated=2026-08-26 -->
<template>
  <DefaultLayout title="À la pharmacie">
    <main id="dialogue">

      <div class="scene">
        <p class="scene-intro">
          Lucas va à la pharmacie pour chercher des médicaments et demander des conseils.
          Glissez les mots à la bonne place, ou écrivez-les (les accents ne comptent pas).
        </p>
        <p class="scene-hint">
          <em>(Lucas va a la farmacia para comprar medicamentos y pedir consejos. Arrastra o escribe las palabras; los acentos no cuentan.)</em>
        </p>
      </div>

      <!-- Banque de mots -->
      <div class="word-bank" aria-label="Mots à placer">
        <span class="word-bank-label">Mots à placer :</span>
        <span
          v-for="w in bank"
          :key="w.key"
          class="chip"
          :class="{ dragging: drag.active && drag.word === w }"
          @pointerdown.prevent="startDrag($event, w, { type: 'bank' })"
        >{{ w.text }}</span>
        <span v-if="bank.length === 0" class="word-bank-empty">
          Tous les mots sont placés.
        </span>
      </div>

      <!-- Dialogue -->
      <div class="chat">
        <template v-for="(line, i) in dialogue" :key="i">
          <div class="bubble-row" :class="line.who">
            <span class="speaker">{{ line.who === 'client' ? 'Lucas' : 'Le pharmacien' }}</span>
            <p class="bubble">
              <template v-for="(part, j) in line.parts" :key="j">
                <span v-if="part.text">{{ part.text }}</span>
                <span
                  v-else
                  class="slot"
                  :class="slotClass(part.id)"
                  :data-blank="part.id"
                  :style="{ minWidth: slotWidth(part) }"
                >
                  <span
                    v-if="placed[part.id]"
                    class="chip placed"
                    :class="{ dragging: drag.active && drag.word === placed[part.id] }"
                    @pointerdown.prevent="startDrag($event, placed[part.id], { type: 'blank', id: part.id })"
                  >{{ placed[part.id].text }}</span>
                  <span v-else class="slot-input-wrap">
                    <input
                      class="slot-input"
                      :value="inputs[part.id]"
                      type="text"
                      :size="Math.max(part.answer.length, 4)"
                      autocomplete="off"
                      autocapitalize="off"
                      spellcheck="false"
                      :aria-label="'Mot manquant ' + part.id"
                      @input="inputs[part.id] = $event.target.value"
                      @focus="activeBlank = part.id"
                      @blur="onBlur(part.id)"
                      @keydown.enter.prevent="onEnter(part.id)"
                      @keydown.esc="activeBlank = null"
                    />
                    <ul
                      v-if="activeBlank === part.id && suggestions.length"
                      class="suggest"
                    >
                      <li
                        v-for="w in suggestions"
                        :key="w.key"
                        @pointerdown.prevent="placeFromInput(part.id, w)"
                      >{{ w.text }}</li>
                    </ul>
                  </span>
                </span>
              </template>
            </p>
          </div>
        </template>
      </div>

      <!-- Actions -->
      <div class="actions">
        <button class="btn-check" @click="check">Vérifier</button>
        <button v-if="checked" class="btn-reset" @click="reset">Recommencer</button>
      </div>

      <!-- Résultat -->
      <div v-if="checked" class="result" :class="{ perfect: allCorrect }">
        <span v-if="allCorrect">Bravo Lucas ! Tout est correct !</span>
        <span v-else>
          {{ correctCount }} / {{ blanks.length }} corrects.
          Corrigez les mots en rouge et réessayez.
        </span>
      </div>

      <!-- Fantôme de glissement -->
      <div
        v-if="drag.active"
        class="drag-ghost chip"
        :style="{ left: drag.x + 'px', top: drag.y + 'px' }"
      >{{ drag.word.text }}</div>

      <RelatedLinks />

    </main>
  </DefaultLayout>
</template>

<script setup>
import { ref, reactive, computed, onBeforeUnmount } from 'vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import RelatedLinks from '@/components/RelatedLinks.vue'

const dialogue = [
  { who: 'pharmacien', parts: [
    { text: 'Bonjour monsieur. Que puis-je faire pour vous aujourd\'hui ?' }
  ]},
  { who: 'client', parts: [
    { text: 'Bonjour. Je viens chercher des ' },
    { id: 1, answer: 'médicaments', accept: ['medicaments'] },
    { text: '. Voici mon ' },
    { id: 2, answer: 'ordonnance' },
    { text: '.' }
  ]},
  { who: 'pharmacien', parts: [
    { text: 'D\'accord, voyons voir. C\'est pour un ' },
    { id: 3, answer: 'sirop' },
    { text: ' contre la ' },
    { id: 4, answer: 'toux' },
    { text: ' et des ' },
    { id: 5, answer: 'comprimés', accept: ['comprimes'] },
    { text: '.' }
  ]},
  { who: 'client', parts: [
    { text: 'Oui, j\'ai une mauvaise toux sèche depuis deux jours.' }
  ]},
  { who: 'pharmacien', parts: [
    { text: 'Prenez-vous d\'autres ' },
    { id: 6, answer: 'traitements' },
    { text: ' en ce moment ?' }
  ]},
  { who: 'client', parts: [
    { text: 'Non, aucun. Mais j\'ai aussi un peu de ' },
    { id: 7, answer: 'fièvre', accept: ['fievre'] },
    { text: ' et des ' },
    { id: 8, answer: 'maux' },
    { text: ' de tête.' }
  ]},
  { who: 'pharmacien', parts: [
    { text: 'Je comprends. Pour la fièvre, vous pouvez prendre du ' },
    { id: 9, answer: 'paracétamol', accept: ['paracetamol'] },
    { text: ' toutes les six heures.' }
  ]},
  { who: 'client', parts: [
    { text: 'D\'accord. Quelle est la ' },
    { id: 10, answer: 'posologie' },
    { text: ' pour le sirop ?' }
  ]},
  { who: 'pharmacien', parts: [
    { text: 'Prenez une cuillère à soupe matin, midi et soir après les ' },
    { id: 11, answer: 'repas' },
    { text: '.' }
  ]},
  { who: 'client', parts: [
    { text: 'Très bien. Est-ce que ce sirop provoque de la ' },
    { id: 12, answer: 'somnolence' },
    { text: ' ?' }
  ]},
  { who: 'pharmacien', parts: [
    { text: 'Oui, un peu. Il vaut mieux éviter de conduire. Avez-vous besoin d\'autres ' },
    { id: 13, answer: 'conseils' },
    { text: ' ?' }
  ]},
  { who: 'client', parts: [
    { text: 'Non, c\'est tout. Merci beaucoup pour votre aide.' }
  ]},
  { who: 'pharmacien', parts: [
    { text: 'Je vous en prie. Soignez-vous bien et bonne journée !' }
  ]}
]

const blanks = dialogue.flatMap(l => l.parts.filter(p => p.id != null))

let keyCounter = 0
function makeBank() {
  return blanks
    .map(b => ({ key: ++keyCounter, text: b.answer }))
    .sort(() => Math.random() - 0.5)
}

const bank = reactive(makeBank())
const placed = reactive(Object.fromEntries(blanks.map(b => [b.id, null])))
const checked = ref(false)

const inputs = reactive(Object.fromEntries(blanks.map(b => [b.id, ''])))
const activeBlank = ref(null)

const suggestions = computed(() => {
  const id = activeBlank.value
  if (id == null) return []
  const q = normalize(inputs[id])
  const list = q
    ? bank.filter(w => normalize(w.text).includes(q))
    : bank
  return list.slice(0, 6)
})

function placeFromInput(id, word) {
  removeFromBank(word.key)
  const existing = placed[id]
  if (existing) bank.push(existing)
  placed[id] = word
  inputs[id] = ''
  activeBlank.value = null
}

function onEnter(id) {
  const s = suggestions.value
  if (s.length) placeFromInput(id, s[0])
}

function onBlur(id) {
  setTimeout(() => {
    if (activeBlank.value === id) activeBlank.value = null
  }, 120)
}

const drag = reactive({
  active: false,
  word: null,
  from: null,
  x: 0,
  y: 0,
  overBlank: null,
})

function startDrag(e, word, from) {
  if (from.type === 'blank' && checked.value && isCorrect(from.id)) return

  drag.active = true
  drag.word = word
  drag.from = from
  drag.x = e.clientX
  drag.y = e.clientY
  drag.overBlank = null

  window.addEventListener('pointermove', onMove)
  window.addEventListener('pointerup', onUp)
  window.addEventListener('pointercancel', onUp)
}

function onMove(e) {
  drag.x = e.clientX
  drag.y = e.clientY
  const el = document.elementFromPoint(e.clientX, e.clientY)
  const slot = el && el.closest('[data-blank]')
  drag.overBlank = slot ? Number(slot.dataset.blank) : null
}

function onUp() {
  window.removeEventListener('pointermove', onMove)
  window.removeEventListener('pointerup', onUp)
  window.removeEventListener('pointercancel', onUp)

  const { word, from, overBlank } = drag

  if (overBlank != null) {
    drop(word, from, overBlank)
  } else if (from.type === 'blank') {
    placed[from.id] = null
    bank.push(word)
  }

  drag.active = false
  drag.word = null
  drag.from = null
  drag.overBlank = null
}

function drop(word, from, targetId) {
  if (checked.value && isCorrect(targetId)) return

  const existing = placed[targetId] || null

  if (from.type === 'bank') {
    removeFromBank(word.key)
    placed[targetId] = word
    if (existing) bank.push(existing)
  } else {
    placed[from.id] = existing
    placed[targetId] = word
  }
}

function removeFromBank(key) {
  const i = bank.findIndex(w => w.key === key)
  if (i !== -1) bank.splice(i, 1)
}

function normalize(s) {
  return (s || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

function blankById(id) {
  return blanks.find(b => b.id === id)
}

function isCorrect(id) {
  const b = blankById(id)
  const w = placed[id]
  if (!w) return false
  const accepted = [b.answer, ...(b.accept || [])].map(normalize)
  return accepted.includes(normalize(w.text))
}

function slotClass(id) {
  const cls = []
  if (placed[id]) cls.push('filled')
  if (drag.active && drag.overBlank === id) cls.push('over')
  if (checked.value) cls.push(isCorrect(id) ? 'is-correct' : 'is-wrong')
  return cls
}

function slotWidth(part) {
  return Math.max(part.answer.length, 5) + 2 + 'ch'
}

const correctCount = computed(() =>
  checked.value ? blanks.filter(b => isCorrect(b.id)).length : 0
)

const allCorrect = computed(() => correctCount.value === blanks.length)

function check() {
  checked.value = true
}

function reset() {
  for (const id in placed) {
    placed[id] = null
    inputs[id] = ''
  }
  activeBlank.value = null
  bank.splice(0, bank.length, ...makeBank())
  checked.value = false
}

onBeforeUnmount(() => {
  window.removeEventListener('pointermove', onMove)
  window.removeEventListener('pointerup', onUp)
  window.removeEventListener('pointercancel', onUp)
})
</script>

<style scoped>
#dialogue {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

/* Scene */
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

/* Word bank */
.word-bank {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.4rem;
  padding: 0.85rem 1rem;
  background: var(--clr-blue-light);
  border: 1px solid var(--clr-border);
  border-radius: var(--radius);
  min-height: 2.5rem;
  position: sticky;
  top: 0;
  z-index: 20;
  box-shadow: 0 4px 12px rgba(26, 26, 46, 0.08);
}

.word-bank-label {
  font-family: var(--font-sans);
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--clr-ink-soft);
  margin-right: 0.25rem;
}

.word-bank-empty {
  font-family: var(--font-sans);
  font-size: 0.8rem;
  font-style: italic;
  color: var(--clr-ink-soft);
}

/* Chips */
.chip {
  font-family: var(--font-mono);
  font-size: 0.82rem;
  padding: 0.25rem 0.6rem;
  background: var(--clr-page);
  border: 1px solid var(--clr-border);
  border-radius: 99px;
  color: var(--clr-ink);
  cursor: grab;
  user-select: none;
  -webkit-user-select: none;
  touch-action: none;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.06);
  transition: opacity 0.12s, box-shadow 0.12s, transform 0.12s;
}

.chip:active {
  cursor: grabbing;
}

.chip.dragging {
  opacity: 0.3;
}

/* Chat */
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

.bubble-row.client {
  align-self: flex-end;
  align-items: flex-end;
}

.bubble-row.pharmacien {
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
  line-height: 2.2;
  border: 1px solid var(--clr-border);
}

.bubble-row.pharmacien .bubble {
  background: var(--clr-page);
  border-bottom-left-radius: 4px;
}

.bubble-row.client .bubble {
  background: var(--clr-blue-light);
  border-bottom-right-radius: 4px;
}

/* Slots */
.slot {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  margin: 0 0.15rem;
  padding: 0.1rem;
  border-bottom: 2px dashed var(--clr-blue);
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.5);
  transition: background 0.12s, border-color 0.12s, box-shadow 0.12s;
}

.slot.filled {
  border-bottom-style: solid;
  background: transparent;
}

.slot.over {
  background: var(--surface-1);
  border-bottom-color: var(--clr-blue-dark);
  box-shadow: 0 0 0 2px var(--clr-blue);
}

/* Typed input and autocomplete */
.slot-input-wrap {
  position: relative;
  display: inline-flex;
}

.slot-input {
  font-family: var(--font-mono);
  font-size: 0.82rem;
  width: 100%;
  min-width: 4ch;
  padding: 0.15rem 0.3rem;
  border: none;
  background: transparent;
  color: var(--clr-ink);
  text-align: center;
  outline: none;
}

.suggest {
  position: absolute;
  top: calc(100% + 4px);
  left: 50%;
  transform: translateX(-50%);
  z-index: 900;
  margin: 0;
  padding: 0.25rem;
  list-style: none;
  min-width: max-content;
  background: var(--clr-page);
  border: 1px solid var(--clr-border);
  border-radius: var(--radius);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.14);
}

.suggest li {
  font-family: var(--font-mono);
  font-size: 0.82rem;
  padding: 0.3rem 0.7rem;
  border-radius: 6px;
  color: var(--clr-ink);
  white-space: nowrap;
  cursor: pointer;
}

.suggest li:hover {
  background: var(--clr-blue-light);
}

.slot.is-correct {
  border-bottom-color: var(--success-strong);
}

.slot.is-correct .chip.placed {
  background: var(--success-soft);
  border-color: var(--success-strong);
  color: var(--success-text);
  font-weight: 600;
  cursor: default;
}

.slot.is-wrong {
  border-bottom-color: var(--clr-red);
}

.slot.is-wrong .chip.placed {
  background: var(--clr-red-light);
  border-color: var(--clr-red);
  color: var(--clr-red);
}

/* Drag ghost */
.drag-ghost {
  position: fixed;
  z-index: 1000;
  transform: translate(-50%, -50%) scale(1.05);
  pointer-events: none;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
  opacity: 0.95;
}

/* Actions */
.actions {
  display: flex;
  gap: 0.6rem;
}

.btn-check {
  flex: 1;
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

/* Result */
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
  background: var(--success-soft);
  color: var(--success-text);
}

@media print {
  .word-bank,
  .actions { display: none; }
}
</style>
