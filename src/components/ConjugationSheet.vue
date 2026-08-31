<template>
  <AltLayout :title="`Conjuguer « ${verb.infinitif} »`">
    <main class="conj">

      <!-- ── Identity ───────────────────────────────── -->
      <section class="conj-head">
        <dl class="conj-meta">
          <div><dt>Traduction</dt><dd><em>{{ verb.es }}</em></dd></div>
          <div><dt>Groupe</dt><dd>{{ verb.groupe }}</dd></div>
          <div><dt>Auxiliaire</dt><dd><strong>{{ verb.aux }}</strong></dd></div>
          <div><dt>Participe passé</dt><dd><strong>{{ verb.participe }}</strong></dd></div>
        </dl>
        <p v-if="verb.note" class="conj-note">{{ verb.note }}</p>
      </section>

      <!-- ── Toggles (screen only) ──────────────────── -->
      <div class="conj-controls">
        <div class="toggle" role="group" aria-label="Forme affirmative ou négative">
          <button
            v-for="opt in [{ v: false, l: 'Affirmatif' }, { v: true, l: 'Négatif' }]"
            :key="String(opt.v)"
            type="button"
            :class="{ on: negative === opt.v }"
            :aria-pressed="negative === opt.v"
            @click="negative = opt.v"
          >{{ opt.l }}</button>
        </div>

        <div class="toggle" role="group" aria-label="Genre du sujet">
          <button
            v-for="opt in ['masculin', 'féminin']"
            :key="opt"
            type="button"
            :class="{ on: gender === norm(opt) }"
            :aria-pressed="gender === norm(opt)"
            @click="gender = norm(opt)"
          >{{ cap(opt) }}</button>
        </div>
      </div>

      <!-- Print carries the state the toggles are in, since it is not obvious on paper. -->

      <p v-if="genderIsInert" class="conj-hint">
        Avec l'auxiliaire <strong>avoir</strong>, le participe passé ne s'accorde pas&nbsp;:
        le genre ne change que les pronoms.
      </p>

      <!-- Colour legend — the sheet is unreadable as a pattern without it.
           Ordered radical → terminaison, the way the word is built. Each entry
           appears only when that colour is actually on screen: no `négation`
           in affirmative mode, no `accord` on an avoir verb. -->
      <ul class="conj-legend">
        <li class="sg-stem">radical</li>
        <li class="sg-end">terminaison</li>
        <li v-if="negative" class="sg-neg">négation</li>
        <li v-if="verb.aux === 'être'" class="sg-accord">accord</li>
      </ul>

      <!-- ── Tenses ─────────────────────────────────── -->
      <div class="conj-grid">

        <section class="tense">
          <h2>Présent</h2>
          <table>
            <caption class="sr-only">{{ verb.infinitif }} au présent</caption>
            <tbody>
              <tr v-for="(line, i) in present" :key="i">
                <td><span v-for="(sg, j) in line.segments" :key="j" :class="'sg-' + sg.k">{{ sg.s }}</span></td>
              </tr>
            </tbody>
          </table>
        </section>

        <section class="tense">
          <h2>Passé composé</h2>
          <table>
            <caption class="sr-only">{{ verb.infinitif }} au passé composé</caption>
            <tbody>
              <tr v-for="(line, i) in passeCompose" :key="i">
                <td><span v-for="(sg, j) in line.segments" :key="j" :class="'sg-' + sg.k">{{ sg.s }}</span></td>
              </tr>
            </tbody>
          </table>
        </section>

        <section class="tense">
          <h2>Futur simple</h2>
          <table>
            <caption class="sr-only">{{ verb.infinitif }} au futur simple</caption>
            <tbody>
              <tr v-for="(line, i) in futur" :key="i">
                <td><span v-for="(sg, j) in line.segments" :key="j" :class="'sg-' + sg.k">{{ sg.s }}</span></td>
              </tr>
            </tbody>
          </table>
          <p class="conj-none">
            Radical <strong>{{ verb.futur }}-</strong> + les mêmes six terminaisons pour tous les verbes.
          </p>
        </section>

        <section class="tense">
          <h2>Impératif</h2>
          <table v-if="imperatif.length">
            <caption class="sr-only">{{ verb.infinitif }} à l'impératif</caption>
            <tbody>
              <tr v-for="(line, i) in imperatif" :key="i">
                <!-- The trailing space must live in the expression: Vue's
                     whitespace: 'condense' trims a literal one before </span>. -->
                <td><span class="sg-pron">{{ line.person + ' ' }}</span><span v-for="(sg, j) in line.segments" :key="j" :class="'sg-' + sg.k">{{ sg.s }}</span></td>
              </tr>
            </tbody>
          </table>
          <p v-else class="conj-none">
            {{ verb.imperatifNote ?? "Ce verbe n'a pas d'impératif." }}
          </p>
        </section>

        <section class="tense tense-wide">
          <h2>Participe présent</h2>
          <table>
            <caption class="sr-only">{{ verb.infinitif }} au participe présent</caption>
            <tbody>
              <tr>
                <td><span v-for="(sg, j) in pPresent" :key="j" :class="'sg-' + sg.k">{{ sg.s }}</span></td>
              </tr>
            </tbody>
          </table>
          <p class="conj-none">
            Invariable — ni genre ni nombre.
          </p>
        </section>

      </div>

      <!-- ── Cross-links ────────────────────────────── -->
      <section class="conj-links">
        <RouterLink class="lesson-link" :to="groupLesson">
          Voir la leçon : {{ groupLessonLabel }}
        </RouterLink><br>
        <RouterLink class="lesson-link" to="/grammaire/le-passe-compose">
          Voir la leçon : Le passé composé
        </RouterLink><br>
        <RouterLink class="lesson-link" to="/grammaire/le-futur-simple">
          Voir la leçon : Le futur simple
        </RouterLink><br>
        <RouterLink class="lesson-link" to="/astuces/etre-ou-avoir">
          Astuce : être ou avoir au passé composé ?
        </RouterLink>
      </section>
      <RelatedLinks />
    </main>
  </AltLayout>
</template>

<script setup>
import { ref, computed } from 'vue'
import AltLayout from '@/layouts/AltLayout.vue'
import RelatedLinks from '@/components/RelatedLinks.vue'
import { getVerb, conjugate, conjugateImperatif, conjugatePPresent } from '@/data/conjugaisons'

const props = defineProps({
  /** Verb slug as it appears in `src/data/conjugaisons.js` (ASCII, e.g. `etre`). */
  slug: { type: String, required: true },
})

const verb = computed(() => getVerb(props.slug))

const negative = ref(false)
const gender   = ref('masculin')

/** `féminin` → `feminin`, so the display label can keep its accent. */
const norm = (s) => (s === 'féminin' ? 'feminin' : 'masculin')
const cap  = (s) => s.charAt(0).toUpperCase() + s.slice(1)

const present      = computed(() => conjugate(verb.value, 'present', negative.value, gender.value))
const passeCompose = computed(() => conjugate(verb.value, 'passeCompose', negative.value, gender.value))
const futur        = computed(() => conjugate(verb.value, 'futur', negative.value, gender.value))
const imperatif    = computed(() => conjugateImperatif(verb.value, negative.value))
const pPresent     = computed(() => conjugatePPresent(verb.value, negative.value))

/* With `avoir` the participle never agrees, so switching gender only swaps
   il/elle. Say so rather than leaving the learner hunting for a difference. */
const genderIsInert = computed(() => verb.value.aux === 'avoir' && gender.value === 'feminin')

const GROUP_LESSONS = {
  '1er groupe': ['/grammaire/verbe-1er-groupe', 'Les verbes du 1er groupe'],
  '2e groupe':  ['/grammaire/verbe-2eme-groupe', 'Les verbes du 2e groupe'],
  '3e groupe':  ['/grammaire/verbe-3eme-groupe', 'Les verbes du 3e groupe'],
}

const groupLesson      = computed(() => GROUP_LESSONS[verb.value.groupe][0])
const groupLessonLabel = computed(() => GROUP_LESSONS[verb.value.groupe][1])
</script>

<style scoped>
/* This is the only component rendering a conjugation sheet, so its chrome
   lives here rather than in style.css — there is nothing to duplicate. */
.conj {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

/* ── Identity ─────────────────────────────────── */
.conj-meta {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.6rem 1.5rem;
  margin: 0;
}

.conj-meta div {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
}

.conj-meta dt {
  font-family: var(--font-sans);
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-3);
}

.conj-meta dd {
  margin: 0;
  font-family: var(--font-serif);
  font-size: 1rem;
  color: var(--text-1);
}

.conj-note {
  margin: 1rem 0 0;
  padding-top: 0.85rem;
  border-top: 1px solid var(--border-soft);
  font-size: 0.88rem;
  line-height: 1.6;
  color: var(--text-2);
}

/* ── Toggles ──────────────────────────────────── */
.conj-controls {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.toggle {
  display: inline-flex;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  overflow: hidden;
  background: var(--surface-1);
}

.toggle button {
  padding: 0.5rem 1rem;
  border: none;
  background: transparent;
  cursor: pointer;
  font-family: var(--font-sans);
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--text-2);
  transition: background var(--dur, 0.15s), color var(--dur, 0.15s);
}

.toggle button + button { border-left: 1px solid var(--border); }
.toggle button:hover:not(.on) { background: var(--surface-3); color: var(--text-1); }

.toggle button.on {
  background: var(--accent);
  color: var(--text-on-accent);
}

.conj-state {
  margin: 0;
  font-family: var(--font-sans);
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--text-2);
}

.conj-hint {
  margin: 0;
  padding: 0.7rem 1rem;
  background: var(--warn-soft);
  border-left: 4px solid var(--warn);
  border-radius: 0 var(--radius) var(--radius) 0;
  font-size: 0.85rem;
  line-height: 1.55;
  color: var(--text-1);
}

/* ── Tense grid ───────────────────────────────── */
.conj-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

/* `.tense` is a <section>, which style.css already paints as a card — but the
   global `section + section { margin-top: 1rem }` applies to grid items too,
   pushing every card except the first down by 1rem and breaking row alignment.
   Reset it here; the grid `gap` already does the spacing. */
.tense {
  padding: 1.1rem 1.25rem;
  margin-top: 0;
}

/* Odd panel out: the participe présent is one line, so it closes the grid as
   a full-width row instead of sitting alone in the left column. */
.tense-wide { grid-column: 1 / -1; }

.tense h2 {
  font-size: 0.95rem;
  margin: 0 0 0.6rem;
  padding-bottom: 0.4rem;
  border-bottom: 2px solid var(--accent);
}

.tense table {
  width: 100%;
  border-collapse: collapse;
}

.tense td {
  padding: 0.3rem 0;
  font-family: var(--font-serif);
  font-size: 1rem;
  line-height: 1.5;
  color: var(--text-1);
  border-bottom: 1px solid var(--border-soft);
}

.tense tr:last-child td { border-bottom: none; }

/* ── Coloured segments ────────────────────────────
   The point of the sheet: the terminaison must pop, so the pattern is visible
   down a column (parle · parles · parlons · parlez · parlent). Three roles
   only — more colours and none of them mean anything.
   `-text` variants are the readable-on-surface shades; the plain --accent /
   --danger / --warn are fills and would be too light in dark mode. */
.sg-pron {
  color: var(--text-3);
  font-style: italic;
}

.sg-stem { color: var(--text-1); }

.sg-end {
  color: var(--accent-text);
  font-weight: 700;
}

.sg-neg { color: var(--danger-text); }

.sg-accord {
  color: var(--warn-text);
  font-weight: 700;
}

/* ── Legend ───────────────────────────────────── */
.conj-legend {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem 1.1rem;
  margin: 0;
  padding: 0;
  list-style: none;
  font-family: var(--font-sans);
  font-size: 0.72rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

/* The `sg-*` class sits on the <li> itself, so the dash and the word share one
   colour and reordering the legend cannot mis-colour the key — which a
   :nth-child scheme would do silently. */
.conj-legend li {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-style: normal;
}

/* A dash as well as the coloured word, so the key still reads in greyscale
   a colour-blind learner. */
.conj-legend li::before {
  content: "—";
  font-weight: 700;
}

.conj-none {
  margin: 0.5rem 0 0;
  font-size: 0.8rem;
  font-style: italic;
  color: var(--text-3);
}

.conj-links { font-size: 0.9rem; line-height: 2; }

@media (max-width: 560px) {
  .conj-grid { grid-template-columns: 1fr; }
  .conj-meta { grid-template-columns: 1fr; }
}

</style>
