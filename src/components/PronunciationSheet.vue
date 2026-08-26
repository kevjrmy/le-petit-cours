<!-- view-meta: created=2026-08-26; updated=2026-08-26 -->
<template>
  <AltLayout :title="sheet.title">
    <main class="lesson">

      <article>
        <div class="rule">{{ sheet.intro }}</div>
        <div class="attention">
          💡 <strong>Tip para hispanohablantes:</strong> A diferencia del español, donde cada
          letra tiene una pronunciación fija, en francés la combinación de letras cambia el sonido.
          <strong>Haz clic en los botones 🔊 y en las palabras de ejemplo para escuchar cómo se pronuncian.</strong>
        </div>
        <!-- Only after a first play: getVoices() is empty until `voiceschanged`
             fires, so checking on mount would flash a false alarm. -->
        <div v-if="played && !hasVoice" class="exception voice-warning">
          <strong>Aucune voix française installée.</strong> Les mots seront lus avec la voix
          par défaut du système — un accent espagnol rendrait ces contrastes inaudibles.
          <span class="note">(Instala una voz francesa en tu sistema para usar esta página.)</span>
        </div>
      </article>

      <article class="sound-sheet">
      <div v-for="(section, idx) in sheet.sections" :key="section.title" class="sound-section">
        <h2>{{ idx + 1 }}. {{ section.title }}</h2>
        <p class="method">{{ section.description }}</p>

        <table>
          <caption class="sr-only">Graphies et sons pour {{ section.title }}</caption>
          <thead>
            <tr>
              <th>Graphie</th>
              <th>Son</th>
              <th>Pronunciación (ES)</th>
              <th>Écouter</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in section.table" :key="row.graphie">
              <td class="graphie">{{ row.graphie }}</td>
              <td class="phone">{{ row.phone }}</td>
              <td class="transl">{{ row.transl }}</td>
              <td class="play-cell">
                <button
                  class="play-btn"
                  :disabled="speaking"
                  :aria-label="`Écouter la syllabe ${row.graphie}`"
                  @click="say(row.soundVal || row.graphie)"
                >🔊</button>
              </td>
            </tr>
          </tbody>
        </table>

        <div class="examples-container">
          <span class="examples-label">Exemples :</span>
          <div class="examples-list">
            <button
              v-for="ex in section.examples"
              :key="ex.word"
              class="word-btn"
              :disabled="speaking"
              :aria-label="'Écouter le mot ' + ex.word"
              @click="say(ex.word)"
            >
              <span class="word-fr">{{ ex.word }}</span>
              <span class="word-translation">({{ ex.es }})</span>
              <span class="word-icon" aria-hidden="true">🔊</span>
            </button>
          </div>
        </div>

        <div v-if="section.note" class="attention note-box">
          <strong>Note :</strong> {{ section.note }}
        </div>
      </div>
      </article>

      <RelatedLinks />
    </main>
  </AltLayout>
</template>

<script setup>
import { computed, ref } from 'vue'
import AltLayout from '@/layouts/AltLayout.vue'
import RelatedLinks from '@/components/RelatedLinks.vue'
import { useSpeech } from '@/composables/useSpeech'
import { getSheet } from '@/data/prononciation'

/**
 * Renders any pronunciation sheet from `src/data/prononciation.js`.
 * Every `views/prononciation/*.vue` is a one-line wrapper around this — the
 * same shape as `ConjugationSheet.vue`.
 */
const props = defineProps({
  slug: { type: String, required: true },
})

const sheet = computed(() => getSheet(props.slug))

const { speak, speaking, hasVoice } = useSpeech()
const played = ref(false)

function say(text) {
  played.value = true
  speak(text, 0.85)
}
</script>
<style scoped>
.lesson {
  gap: 1.5rem;
}

.hl-blue { color: var(--clr-blue); font-weight: 700; }
.hl-red  { color: var(--clr-red);  font-weight: 700; }

.sound-sheet {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.sound-section {
  border-bottom: 1px solid var(--clr-border-soft);
  padding-bottom: 1.5rem;
}

.sound-section h2 { margin-top: 0; }

.sound-section:last-of-type {
  border-bottom: none;
}

.method {
  color: var(--clr-ink-mid);
  font-size: 0.92rem;
  margin-bottom: 0.75rem;
  line-height: 1.5;
}

/* Table */
table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1rem;
  font-size: 0.9rem;
}

caption.sr-only {
  position: absolute;
  width: 1px; height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
}

th {
  background: var(--clr-blue);
  color: var(--text-on-accent);
  padding: 0.5rem 0.75rem;
  text-align: left;
  font-family: var(--font-sans);
  font-weight: 700;
  font-size: 0.72rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

td {
  padding: 0.5rem 0.75rem;
  border-bottom: 1px solid var(--clr-border-soft);
  color: var(--clr-ink);
  vertical-align: middle;
}

td.graphie {
  font-family: var(--font-mono);
  font-weight: 700;
  font-size: 1.05rem;
  color: var(--clr-blue);
  white-space: nowrap;
}

td.phone {
  font-family: var(--font-mono);
  font-size: 0.88rem;
  color: var(--clr-red);
  font-weight: 600;
}

td.transl {
  color: var(--clr-ink-soft);
  font-style: italic;
  font-size: 0.85rem;
}

.play-cell {
  width: 50px;
  text-align: center;
}

.play-btn {
  background: var(--clr-blue-light);
  border: 1px solid var(--clr-blue-mid);
  color: var(--clr-blue-dark);
  font-size: 0.95rem;
  padding: 0.3rem 0.6rem;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: background 0.15s, transform 0.1s;
}

.play-btn:hover {
  background: var(--clr-blue-mid);
}

.play-btn:active {
  transform: scale(0.95);
}

tr:last-child td { border-bottom: none; }
tr:nth-child(even) td { background: var(--clr-blue-light); }

/* Examples */
.examples-container {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  margin-top: 0.75rem;
  flex-wrap: wrap;
}

.examples-label {
  font-family: var(--font-sans);
  font-weight: 700;
  font-size: 0.82rem;
  color: var(--clr-ink-mid);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-top: 0.35rem;
}

.examples-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  flex: 1;
}

.word-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  background: var(--clr-page);
  border: 1px solid var(--clr-border);
  padding: 0.35rem 0.75rem;
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: border-color 0.15s, background 0.15s;
}

.word-btn:hover {
  border-color: var(--clr-blue);
  background: var(--clr-blue-light);
}

.word-btn:active {
  transform: scale(0.98);
}

.word-fr {
  font-family: var(--font-serif);
  font-weight: 700;
  color: var(--clr-ink);
  font-size: 0.92rem;
}

.word-translation {
  font-family: var(--font-sans);
  font-style: italic;
  font-size: 0.78rem;
  color: var(--clr-ink-soft);
}

.word-icon {
  font-size: 0.78rem;
  color: var(--clr-blue-mid);
  margin-left: 0.15rem;
}

.note-box {
  margin-top: 1rem;
  font-size: 0.9rem;
}

/* Download button */
.voice-warning {
  margin-top: 0.75rem;
  font-size: 0.9rem;
}

</style>
