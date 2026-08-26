<!-- view-meta: created=2026-08-03; updated=2026-08-26 -->
<template>
  <DefaultLayout title="En vacances">
    <main id="dialogue">

      <div class="scene">
        <p class="scene-intro">
          🏖️ Lucas et Marc discutent de leurs projets de vacances d'été.
          Glissez les mots à la bonne place, ou écrivez-les (les accents ne comptent pas).
        </p>
        <p class="scene-hint">
          <em>(Lucas y Marc hablan de sus planes de vacaciones de verano. Arrastra o escribe las palabras; los acentos no cuentan.)</em>
        </p>
      </div>

      <!-- ── Banque de mots ───────────────────────── -->
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
          Tous les mots sont placés ✦
        </span>
      </div>

      <!-- ── Dialogue ─────────────────────────────── -->
      <div class="chat">
        <template v-for="(line, i) in dialogue" :key="i">
          <div class="bubble-row" :class="line.who">
            <span class="speaker">{{ line.who === 'lucas' ? 'Lucas' : 'Marc' }}</span>
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

      <!-- ── Actions ──────────────────────────────── -->
      <div class="actions">
        <button class="btn-check" @click="check">Vérifier</button>
        <button v-if="checked" class="btn-reset" @click="reset">Recommencer</button>
      </div>

      <!-- ── Résultat ─────────────────────────────── -->
      <div v-if="checked" class="result" :class="{ perfect: allCorrect }">
        <span v-if="allCorrect">🎉 Bravo ! Le dialogue est parfaitement complété !</span>
        <span v-else>
          {{ correctCount }} / {{ blanks.length }} corrects.
          Corrigez les mots en rouge et réessayez 💪
        </span>
      </div>

      <!-- ── Fantôme de glissement ────────────────── -->
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
  { who: 'lucas', parts: [
    { text: 'Salut Marc ! Tu es prêt pour les ' },
    { id: 1, answer: 'vacances' },
    { text: ' ?' },
  ]},
  { who: 'marc', parts: [
    { text: 'Oui ! Je pars ' },
    { id: 2, answer: 'demain', accept: ['demain'] },
    { text: ' matin au bord de la mer.' },
  ]},
  { who: 'lucas', parts: [
    { text: 'C\'est génial ! Tu vas voyager en ' },
    { id: 3, answer: 'train', accept: ['train'] },
    { text: ' ou en voiture ?' },
  ]},
  { who: 'marc', parts: [
    { text: 'En train, c\'est plus rapide. Et toi, où ' },
    { id: 4, answer: 'vas', accept: ['vas'] },
    { text: '-tu cet été ?' },
  ]},
  { who: 'lucas', parts: [
    { text: 'Je vais passer une semaine à la ' },
    { id: 5, answer: 'montagne', accept: ['montagne'] },
    { text: ' avec ma famille.' },
  ]},
  { who: 'marc', parts: [
    { text: 'Super ! Vous avez ' },
    { id: 6, answer: 'réservé', accept: ['reserve', 'reserva'] },
    { text: ' un hôtel ou un camping ?' },
  ]},
  { who: 'lucas', parts: [
    { text: 'Nous avons loué une jolie ' },
    { id: 7, answer: 'maison', accept: ['maison'] },
    { text: ' près du lac.' },
  ]},
  { who: 'marc', parts: [
    { text: 'Magnifique ! J\'espère qu\'il fera beau avec du ' },
    { id: 8, answer: 'soleil', accept: ['soleil'] },
    { text: ' !' },
  ]},
  { who: 'lucas', parts: [
    { text: 'Oui ! Bon ' },
    { id: 9, answer: 'voyage', accept: ['voyage'] },
    { text: ' et à bientôt !' },
  ]},
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
  font-size: 0.82rem;
  color: var(--clr-blue-dark);
  font-style: italic;
}

.chip {
  display: inline-flex;
  align-items: center;
  padding: 0.3rem 0.65rem;
  border-radius: var(--radius-sm);
  background: var(--clr-page);
  border: 1.5px solid var(--clr-blue);
  color: var(--clr-blue-dark);
  font-family: var(--font-sans);
  font-weight: 600;
  font-size: 0.9rem;
  cursor: grab;
  user-select: none;
  touch-action: none;
  transition: transform 0.1s ease, box-shadow 0.1s ease;
}

.chip:hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 6px rgba(24, 84, 160, 0.2);
}

.chip.dragging {
  opacity: 0.4;
}

.drag-ghost {
  position: fixed;
  pointer-events: none;
  z-index: 9999;
  transform: translate(-50%, -50%) scale(1.05);
  box-shadow: 0 8px 20px rgba(24, 84, 160, 0.3);
  background: var(--clr-page);
  border-color: var(--clr-blue);
  cursor: grabbing;
}

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

.bubble-row.lucas {
  align-self: flex-start;
}

.bubble-row.marc {
  align-self: flex-end;
}

.speaker {
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--clr-ink-soft);
  padding: 0 0.4rem;
}

.bubble-row.marc .speaker {
  text-align: right;
}

.bubble {
  padding: 0.75rem 1rem;
  border-radius: 1rem;
  font-family: var(--font-serif);
  font-size: 1rem;
  line-height: 1.6;
  margin: 0;
}

.bubble-row.lucas .bubble {
  background: var(--clr-page);
  border: 1px solid var(--clr-border);
  border-bottom-left-radius: 0.25rem;
  color: var(--clr-ink);
}

.bubble-row.marc .bubble {
  background: var(--clr-blue-light);
  border: 1px solid rgba(24, 84, 160, 0.2);
  border-bottom-right-radius: 0.25rem;
  color: var(--clr-blue-dark);
}

.slot {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  margin: 0 0.25rem;
  padding: 0.1rem 0.25rem;
  border-bottom: 2px dashed var(--clr-blue);
  border-radius: var(--radius-sm);
  background: rgba(24, 84, 160, 0.05);
  position: relative;
  transition: background 0.15s ease, border-color 0.15s ease;
}

.slot.over {
  background: rgba(24, 84, 160, 0.18);
  border-bottom-style: solid;
}

.slot.filled {
  border-bottom-style: solid;
  background: transparent;
}

.slot.is-correct {
  border-color: var(--success-text);
  background: rgba(46, 125, 50, 0.1);
}

.slot.is-wrong {
  border-color: var(--clr-red);
  background: var(--clr-red-light);
}

.chip.placed {
  cursor: grab;
}

.slot.is-correct .chip.placed {
  border-color: var(--success-text);
  color: var(--success-text);
  background: var(--success-soft);
  cursor: default;
}

.slot.is-wrong .chip.placed {
  border-color: var(--clr-red);
  color: var(--clr-red);
  background: var(--clr-red-light);
}

.slot-input-wrap {
  position: relative;
  display: inline-flex;
}

.slot-input {
  border: none;
  background: transparent;
  font-family: inherit;
  font-size: 0.95rem;
  color: var(--clr-blue-dark);
  text-align: center;
  outline: none;
  width: 100%;
}

.suggest {
  position: absolute;
  top: calc(100% + 4px);
  left: 50%;
  transform: translateX(-50%);
  background: var(--clr-page);
  border: 1px solid var(--clr-border);
  border-radius: var(--radius-sm);
  box-shadow: 0 4px 12px rgba(26, 26, 46, 0.15);
  list-style: none;
  padding: 0.25rem 0;
  margin: 0;
  z-index: 30;
  min-width: 6rem;
}

.suggest li {
  padding: 0.35rem 0.75rem;
  font-family: var(--font-sans);
  font-size: 0.85rem;
  color: var(--clr-ink);
  cursor: pointer;
  white-space: nowrap;
}

.suggest li:hover {
  background: var(--clr-blue-light);
  color: var(--clr-blue-dark);
}

.actions {
  display: flex;
  gap: 0.75rem;
  justify-content: center;
}

.btn-check,
.btn-reset {
  padding: 0.75rem 1.5rem;
  border-radius: var(--radius);
  font-family: var(--font-sans);
  font-weight: 700;
  font-size: 0.95rem;
  cursor: pointer;
  transition: background 0.15s ease, border-color 0.15s ease;
}

.btn-check {
  background: var(--clr-blue);
  border: 1px solid var(--clr-blue);
  color: var(--text-on-accent);
}

.btn-check:hover {
  background: var(--clr-blue-dark);
  border-color: var(--clr-blue-dark);
}

.btn-reset {
  background: var(--clr-page);
  border: 1px solid var(--clr-border);
  color: var(--clr-ink-mid);
}

.btn-reset:hover {
  border-color: var(--clr-blue);
  color: var(--clr-blue);
  background: var(--clr-blue-light);
}

.result {
  padding: 1rem 1.25rem;
  border-radius: var(--radius);
  background: var(--clr-blue-light);
  border: 1px solid var(--clr-border);
  color: var(--clr-blue-dark);
  font-family: var(--font-serif);
  font-size: 1.05rem;
  text-align: center;
}

.result.perfect {
  background: var(--success-soft);
  border-color: var(--success-line);
  color: var(--success-text);
}

@media (max-width: 52rem) {
  .bubble-row {
    max-width: 92%;
  }
}
</style>
