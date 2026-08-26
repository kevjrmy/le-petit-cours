<!-- view-meta: created=2026-08-03; updated=2026-08-27 -->
<template>
  <DefaultLayout title="En vacances">
    <main class="gapfill">

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
            <span class="speaker">{{ line.who === 'right' ? 'Lucas' : 'Marc' }}</span>
            <p class="bubble">
              <template v-for="(part, j) in line.parts" :key="j">
                <!-- Test the id, not the text: an empty-string text part would
                     be falsy and get rendered as a blank with no `answer`. -->
                <span v-if="part.id == null">{{ part.text }}</span>
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
import { shuffle } from '@/utils/shuffle'

/**
 * Drills the passé composé in conversation, the tense `grammaire/le-passe-compose`
 * teaches and `dictees/une-journee-en-vacances` reads back.
 *
 * Each blank: id, answer (canonical), accept (extra accepted spellings).
 */
const dialogue = [
  { who: 'right', parts: [
    { text: 'Salut Marc ! Tu es prêt pour les ' },
    { id: 1, answer: 'vacances' },
    { text: ' ?' },
  ]},
  { who: 'left', parts: [
    { text: 'Oui ! Je pars ' },
    { id: 2, answer: 'demain', accept: ['demain'] },
    { text: ' matin au bord de la mer.' },
  ]},
  { who: 'right', parts: [
    { text: 'C\'est génial ! Tu vas voyager en ' },
    { id: 3, answer: 'train', accept: ['train'] },
    { text: ' ou en voiture ?' },
  ]},
  { who: 'left', parts: [
    { text: 'En train, c\'est plus rapide. Et toi, où ' },
    { id: 4, answer: 'vas', accept: ['vas'] },
    { text: '-tu cet été ?' },
  ]},
  { who: 'right', parts: [
    { text: 'Je vais passer une semaine à la ' },
    { id: 5, answer: 'montagne', accept: ['montagne'] },
    { text: ' avec ma famille.' },
  ]},
  { who: 'left', parts: [
    { text: 'Super ! Vous avez ' },
    { id: 6, answer: 'réservé', accept: ['reserve', 'reserva'] },
    { text: ' un hôtel ou un camping ?' },
  ]},
  { who: 'right', parts: [
    { text: 'Nous avons loué une jolie ' },
    { id: 7, answer: 'maison', accept: ['maison'] },
    { text: ' près du lac.' },
  ]},
  { who: 'left', parts: [
    { text: 'Magnifique ! J\'espère qu\'il fera beau avec du ' },
    { id: 8, answer: 'soleil', accept: ['soleil'] },
    { text: ' !' },
  ]},
  { who: 'right', parts: [
    { text: 'Oui ! Bon ' },
    { id: 9, answer: 'voyage', accept: ['voyage'] },
    { text: ' et à bientôt !' },
  ]},
]

const blanks = dialogue.flatMap(l => l.parts.filter(p => p.id != null))

// Build a shuffled bank of word tokens, each with a stable unique key
let keyCounter = 0
function makeBank() {
  return shuffle(blanks.map(b => ({ key: ++keyCounter, text: b.answer })))
}

const bank = reactive(makeBank())
const placed = reactive(Object.fromEntries(blanks.map(b => [b.id, null])))
const checked = ref(false)

// ── Typing + accent-insensitive autocomplete ──
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
  if (existing) bank.push(existing) // displaced word returns to bank
  placed[id] = word
  inputs[id] = ''
  activeBlank.value = null
}

function onEnter(id) {
  const s = suggestions.value
  if (s.length) placeFromInput(id, s[0])
}

function onBlur(id) {
  // Delay so a suggestion tap can fire first
  setTimeout(() => {
    if (activeBlank.value === id) activeBlank.value = null
  }, 120)
}

// ── Drag state (pointer-based → works on mouse + touch) ──
const drag = reactive({
  active: false,
  word: null,      // the token being dragged { key, text }
  from: null,      // { type: 'bank' } | { type: 'blank', id }
  x: 0,
  y: 0,
  overBlank: null, // id of the slot currently under the pointer
})

function startDrag(e, word, from) {
  // Locked once it's confirmed correct
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
    // Dropped outside any slot → send back to the bank
    placed[from.id] = null
    bank.push(word)
  }
  // Dropped outside from the bank → no change

  drag.active = false
  drag.word = null
  drag.from = null
  drag.overBlank = null
}

function drop(word, from, targetId) {
  // Can't drop onto a locked-correct slot
  if (checked.value && isCorrect(targetId)) return

  const existing = placed[targetId] || null

  if (from.type === 'bank') {
    removeFromBank(word.key)
    placed[targetId] = word
    if (existing) bank.push(existing) // displaced word goes back to bank
  } else {
    // moving between slots → swap contents
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
    .replace(/[̀-ͯ]/g, '') // strip accents — be forgiving
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
