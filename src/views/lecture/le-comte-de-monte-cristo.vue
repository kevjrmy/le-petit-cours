<!-- view-meta: created=2026-08-02; updated=2026-08-02 -->
<template>
  <AltLayout title="Le Comte de Monte-Cristo — Chapitre I">
    <main class="lesson">

      <!-- ── Source ──────────────────────────────── -->
      <div class="source-tag">
        Alexandre Dumas · <em>Le Comte de Monte-Cristo</em> · 1844 · Chapitre&nbsp;I, « Marseille — L'arrivée »
      </div>

      <!-- ── Texte ───────────────────────────────── -->
      <article class="reading">
        <p>
          Le 24 février 1815, la
          <span class="hl-word" title="marin chargé de surveiller l'horizon">vigie</span>
          de Notre-Dame de la Garde signala le
          <span class="hl-word" title="voilier à trois mâts">trois-mâts</span>
          <em>le Pharaon</em>, venant de Smyrne, Trieste et Naples.
        </p>

        <p>
          Comme d'habitude, un
          <span class="hl-word" title="marin qui guide les navires à l'entrée du port">pilote côtier</span>
          partit aussitôt du port, rasa le château d'If, et alla aborder le
          navire entre le cap de Morgion et l'île de Rion.
        </p>

        <p>
          Aussitôt, comme d'habitude encore, la plateforme du fort Saint-Jean
          s'était couverte de curieux ; car c'est toujours une grande affaire
          à Marseille que l'arrivée d'un
          <span class="hl-word" title="grand bateau">bâtiment</span>,
          surtout quand ce bâtiment, comme le Pharaon, a été construit,
          <span class="hl-word" title="équipé de voiles et de cordages">gréé</span>
          sur les
          <span class="hl-word" title="lieux où l'on construit les navires">chantiers</span>
          de la vieille Phocée, et appartient à un
          <span class="hl-word" title="propriétaire d'un navire de commerce">armateur</span>
          de la ville.
        </p>

        <p>
          Cependant ce bâtiment s'avançait ; il avait doublé Pomègue, et il
          s'avançait sous ses voiles, mais si lentement et d'une allure si
          triste, que les curieux, avec cet instinct qui
          <span class="hl-word" title="deviner à l'avance">pressent</span>
          un malheur, se demandaient déjà quel accident avait pu arriver à bord.
        </p>

        <p class="summary-note">
          <strong>La suite du chapitre</strong> (résumé) — En observant le navire de
          plus près, les gens du port comprennent que le capitaine, monsieur
          Leclère, est mort pendant la traversée. C'est un jeune marin de dix-neuf
          ans, <strong>Edmond Dantès</strong>, second du bord, qui a pris le
          commandement et ramené le Pharaon jusqu'au port avec beaucoup de
          sang-froid. Ce jeune homme calme et compétent est le héros du roman.
        </p>
      </article>

      <!-- ── Vocabulaire ─────────────────────────── -->
      <article>
        <h2>Vocabulaire clé</h2>
        <table>
          <caption class="sr-only">Vocabulaire du texte avec définitions</caption>
          <thead>
            <tr>
              <th>Mot</th>
              <th>Définition</th>
              <th>En espagnol</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>une vigie</strong></td>
              <td>marin chargé de surveiller l'horizon</td>
              <td><em>un vigía</em></td>
            </tr>
            <tr>
              <td><strong>un trois-mâts</strong></td>
              <td>voilier à trois mâts</td>
              <td><em>un velero de tres palos</em></td>
            </tr>
            <tr>
              <td><strong>un pilote côtier</strong></td>
              <td>marin qui guide les navires à l'entrée du port</td>
              <td><em>un práctico de puerto</em></td>
            </tr>
            <tr>
              <td><strong>un bâtiment</strong></td>
              <td>ici : un grand bateau</td>
              <td><em>un buque</em></td>
            </tr>
            <tr>
              <td><strong>gréer</strong></td>
              <td>équiper un navire de voiles et de cordages</td>
              <td><em>aparejar</em></td>
            </tr>
            <tr>
              <td><strong>un chantier (naval)</strong></td>
              <td>lieu où l'on construit les navires</td>
              <td><em>un astillero</em></td>
            </tr>
            <tr>
              <td><strong>un armateur</strong></td>
              <td>propriétaire d'un navire de commerce</td>
              <td><em>un armador</em></td>
            </tr>
            <tr>
              <td><strong>pressentir</strong></td>
              <td>deviner à l'avance, sans preuve</td>
              <td><em>presentir</em></td>
            </tr>
            <tr>
              <td><strong>le sang-froid</strong></td>
              <td>calme et maîtrise de soi face au danger</td>
              <td><em>la sangre fría</em></td>
            </tr>
          </tbody>
        </table>
      </article>

      <!-- ── Compréhension (quiz) ────────────────── -->
      <article class="quiz">
        <h2>Avez-vous compris ?</h2>
        <p class="quiz-intro">Répondez aux questions pour vérifier votre compréhension.</p>

        <div
          v-for="(item, qi) in questions"
          :key="qi"
          class="question"
        >
          <p class="q-text"><span class="q-num">{{ qi + 1 }}.</span> {{ item.q }}</p>
          <div class="q-options">
            <button
              v-for="(opt, oi) in item.options"
              :key="oi"
              type="button"
              class="q-option"
              :class="optionClass(qi, oi)"
              :disabled="picks[qi] !== null"
              @click="pick(qi, oi)"
            >
              <span class="q-mark" aria-hidden="true"></span>
              {{ opt }}
            </button>
          </div>
        </div>

        <div v-if="allAnswered" class="quiz-score" :class="{ perfect: score === questions.length }">
          <span v-if="score === questions.length">🎉 Bravo ! {{ score }} / {{ questions.length }} — tout est correct !</span>
          <span v-else>Vous avez {{ score }} / {{ questions.length }}. Relisez le texte et réessayez 💪</span>
          <button class="btn-retry" @click="resetQuiz">Recommencer le quiz</button>
        </div>
      </article>

      <!-- ── Traduction cachée ───────────────────── -->
      <article>
        <details class="translation">
          <summary>
            <span class="summary-icon" aria-hidden="true">🇪🇸</span>
            Ver la traducción al español
          </summary>
          <div class="translation-body">
            <p>
              El 24 de febrero de 1815, el vigía de Notre-Dame de la Garde
              anunció el velero de tres palos <em>el Pharaon</em>, que venía
              de Esmirna, Trieste y Nápoles.
            </p>
            <p>
              Como de costumbre, un práctico de puerto salió enseguida del
              puerto, bordeó el castillo de If, y fue a abordar el navío
              entre el cabo de Morgion y la isla de Rion.
            </p>
            <p>
              Enseguida, como de costumbre también, la plataforma del fuerte
              Saint-Jean se había llenado de curiosos; porque siempre es un
              gran acontecimiento en Marsella la llegada de un buque, sobre
              todo cuando ese buque, como el Pharaon, ha sido construido,
              aparejado en los astilleros de la vieja Focea, y pertenece a
              un armador de la ciudad.
            </p>
            <p>
              Sin embargo, el buque avanzaba; había pasado ya Pomègue, y
              avanzaba bajo sus velas, pero tan lentamente y con un aire tan
              triste, que los curiosos, con ese instinto que presiente una
              desgracia, ya se preguntaban qué accidente había podido
              ocurrir a bordo.
            </p>
            <p>
              <strong>El resto del capítulo (resumen)</strong> — Observando el
              navío más de cerca, la gente del puerto comprende que el
              capitán, el señor Leclère, ha muerto durante la travesía. Es un
              joven marinero de diecinueve años, <strong>Edmond Dantès</strong>,
              segundo de a bordo, quien ha tomado el mando y ha traído el
              Pharaon de vuelta al puerto con mucha sangre fría. Este joven
              tranquilo y competente es el héroe de la novela.
            </p>
          </div>
        </details>
      </article>

    </main>
  </AltLayout>
</template>

<script setup>
import { reactive, computed } from 'vue'
import AltLayout from '@/layouts/AltLayout.vue'

const questions = [
  {
    q: 'Quelle est la date du début de l\'histoire ?',
    options: ['Le 24 février 1815', 'Le 14 juillet 1789', 'Le 24 décembre 1815'],
    answer: 0,
  },
  {
    q: 'Comment s\'appelle le navire ?',
    options: ['Le Phocée', 'Le Pharaon', 'Le Château d\'If'],
    answer: 1,
  },
  {
    q: 'Qui signale l\'arrivée du navire ?',
    options: ['Un pilote côtier', 'La vigie de Notre-Dame de la Garde', 'Un armateur'],
    answer: 1,
  },
  {
    q: 'Pourquoi la plateforme du fort Saint-Jean se couvre-t-elle de curieux ?',
    options: [
      'L\'arrivée d\'un navire est un grand événement à Marseille',
      'Il y a une tempête',
      'Le roi visite la ville',
    ],
    answer: 0,
  },
  {
    q: 'Pourquoi les curieux s\'inquiètent-ils en regardant le navire ?',
    options: [
      'Il avance très vite',
      'Il avance lentement et tristement',
      'Il change de direction',
    ],
    answer: 1,
  },
  {
    q: 'Qui a pris le commandement du navire après la mort du capitaine ?',
    options: ['Un pilote côtier', 'Un armateur', 'Edmond Dantès'],
    answer: 2,
  },
]

const picks = reactive(questions.map(() => null))

function pick(qi, oi) {
  if (picks[qi] !== null) return
  picks[qi] = oi
}

function optionClass(qi, oi) {
  if (picks[qi] === null) return ''
  if (oi === questions[qi].answer) return 'is-correct'
  if (oi === picks[qi]) return 'is-wrong'
  return 'is-neutral'
}

const allAnswered = computed(() => picks.every(p => p !== null))

const score = computed(() =>
  picks.reduce((n, p, qi) => n + (p === questions[qi].answer ? 1 : 0), 0)
)

function resetQuiz() {
  picks.forEach((_, i) => { picks[i] = null })
}
</script>

<style scoped>
.lesson {
  gap: 1.25rem;
}

/* ── Source stamp ─────────────────────────────── */
.source-tag {
  font-family: var(--font-sans);
  font-size: 0.72rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--clr-ink-soft);
  border-left: 3px solid var(--clr-blue);
  padding-left: 0.65rem;
}

/* ── Reading text ─────────────────────────────── */
.reading {
  display: flex;
  flex-direction: column;
  gap: 1em;
}

.reading p {
  font-family: var(--font-serif);
  font-size: 1.05rem;
  line-height: 1.9;
  color: var(--clr-ink);
  margin: 0;
}

.summary-note {
  font-size: 0.92rem !important;
  font-style: italic;
  color: var(--clr-ink-mid) !important;
  background: var(--clr-blue-light);
  border-left: 3px solid var(--clr-blue-mid);
  padding: 0.75rem 0.9rem;
  border-radius: 0 var(--radius) var(--radius) 0;
}

/* Inline vocabulary hint — underline + tooltip cursor */
.hl-word {
  border-bottom: 1px dashed var(--clr-blue-mid);
  cursor: help;
  color: inherit;
}

/* ── Vocabulary table ─────────────────────────── */
table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.88rem;
  margin-top: 0.75rem;
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
  padding: 0.45rem 0.75rem;
  text-align: left;
  font-family: var(--font-sans);
  font-weight: 700;
  font-size: 0.72rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

td {
  padding: 0.4rem 0.75rem;
  border-bottom: 1px solid var(--clr-border-soft);
  color: var(--clr-ink);
  vertical-align: top;
}

td:first-child {
  white-space: nowrap;
}

td em {
  color: var(--clr-ink-mid);
}

tr:last-child td { border-bottom: none; }
tr:nth-child(even) td { background: var(--clr-blue-light); }

/* ── Quiz ─────────────────────────────────────── */
.quiz-intro {
  font-family: var(--font-serif);
  font-style: italic;
  font-size: 0.9rem;
  color: var(--clr-ink-mid);
  margin: 0 0 1rem;
}

.question {
  margin-bottom: 1.1rem;
}

.q-text {
  font-family: var(--font-serif);
  font-size: 0.97rem;
  color: var(--clr-ink);
  margin: 0 0 0.5rem;
  line-height: 1.5;
}

.q-num {
  font-family: var(--font-mono);
  font-weight: 700;
  color: var(--clr-blue);
  margin-right: 0.3rem;
}

.q-options {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.q-option {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  width: 100%;
  text-align: left;
  padding: 0.65rem 0.9rem;
  border: 1.5px solid var(--clr-border);
  border-radius: var(--radius);
  background: var(--clr-page);
  color: var(--clr-ink);
  font-family: var(--font-serif);
  font-size: 0.92rem;
  cursor: pointer;
  transition: border-color 0.15s, background 0.15s, color 0.15s;
}

.q-option:not(:disabled):hover {
  border-color: var(--clr-blue);
  background: var(--clr-blue-light);
  color: var(--clr-blue-dark);
}

.q-mark {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 1.5px solid var(--clr-border);
  flex-shrink: 0;
  transition: border-color 0.15s, background 0.15s;
}

.q-option:disabled {
  cursor: default;
}

.q-option.is-correct {
  border-color: var(--success-strong);
  background: var(--success-soft);
  color: var(--success-text);
  font-weight: 600;
}

.q-option.is-correct .q-mark {
  border-color: var(--success-strong);
  background: var(--success-strong);
}

.q-option.is-wrong {
  border-color: var(--clr-red);
  background: var(--clr-red-light);
  color: var(--clr-red);
}

.q-option.is-wrong .q-mark {
  border-color: var(--clr-red);
  background: var(--clr-red);
}

.q-option.is-neutral {
  opacity: 0.5;
}

.quiz-score {
  margin-top: 1rem;
  padding: 0.85rem 1rem;
  border-radius: var(--radius);
  text-align: center;
  font-family: var(--font-sans);
  font-size: 0.9rem;
  font-weight: 600;
  background: var(--clr-red-light);
  color: var(--clr-red);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
}

.quiz-score.perfect {
  background: var(--success-soft);
  color: var(--success-text);
}

.btn-retry {
  padding: 0.55rem 1.25rem;
  background: transparent;
  border: 1.5px solid currentColor;
  border-radius: var(--radius);
  color: inherit;
  font-family: var(--font-sans);
  font-weight: 600;
  font-size: 0.82rem;
  cursor: pointer;
  transition: opacity 0.15s;
}

.btn-retry:hover {
  opacity: 0.7;
}

/* ── Hidden translation ───────────────────────── */
.translation {
  border: 1px solid var(--clr-border);
  border-radius: var(--radius);
  overflow: hidden;
}

.translation summary {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  cursor: pointer;
  list-style: none;
  font-family: var(--font-sans);
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--clr-amber);
  transition: background 0.15s;
  user-select: none;
}

.translation summary::-webkit-details-marker { display: none; }

.translation summary::after {
  content: '▸';
  margin-left: auto;
  font-size: 0.75rem;
  color: var(--clr-ink-soft);
  transition: transform 0.2s;
}

.translation[open] summary {
  background: var(--clr-amber-light);
  border-bottom: 1px solid var(--clr-border-soft);
}

.translation[open] summary::after {
  transform: rotate(90deg);
}

.translation-body {
  padding: 1rem 1.1rem;
  display: flex;
  flex-direction: column;
  gap: 0.85em;
}

.translation-body p {
  font-family: var(--font-serif);
  font-style: italic;
  font-size: 0.92rem;
  line-height: 1.85;
  color: var(--clr-ink-mid);
  margin: 0;
}

@media print {
  .quiz,
  .translation { display: none !important; }
  .hl-word { border-bottom: none; }
}
</style>
