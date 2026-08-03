<!-- view-meta: created=2026-08-02; updated=2026-08-02 -->
<template>
  <AltLayout title="Le Tour du monde en 80 jours">
    <main class="lesson">

      <!-- ── Source ──────────────────────────────── -->
      <div class="source-tag">
        Jules Verne · <em>Le Tour du monde en quatre-vingts jours</em> · 1872 · Chapitre I
      </div>

      <!-- ── Texte ───────────────────────────────── -->
      <article class="reading">
        <p>
          En l’année 1872, la maison située au numéro 7 de Saville-row, à Londres, était habitée par Phileas Fogg.
          Ce monsieur était l’un des membres les plus <span class="hl-word" title="extraordinaires, uniques">singuliers</span> et les plus <span class="hl-word" title="dignes d'attention">remarquables</span> du Reform-Club de Londres.
        </p>

        <p>
          Phileas Fogg était un personnage <span class="hl-word" title="mystérieux, secret">énigmatique</span>.
          On savait seulement que c’était un très galant homme et l’un des plus beaux gentlemen de la haute société anglaise.
          Il parlait le moins possible, semblait silencieux et très <span class="hl-word" title="ordonné, régulier">méthodique</span>.
          Il n’avait ni femme ni enfants — ce qui arrive aux gens les plus honnêtes —, et pas de parents non plus.
        </p>

        <p>
          Il vivait seul dans sa maison avec son unique <span class="hl-word" title="personne payée pour faire le ménage">domestique</span>.
          Il prenait ses repas au club à des heures précises.
          Il ne voyageait jamais, sauf dans le Reform-Club où il passait ses journées à lire les journaux et à jouer aux cartes.
          Il était riche, mais on ne savait pas d'où venait sa fortune.
          Il ne semblait pas faire d'économies, mais il ne aimait pas non plus <span class="hl-word" title="utiliser de l'argent pour acheter ou donner">dépenser</span> sans raison.
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
              <td><strong>singulier</strong></td>
              <td>unique, étrange ou différent</td>
              <td><em>singular / peculiar</em></td>
            </tr>
            <tr>
              <td><strong>remarquable</strong></td>
              <td>digne d'être remarqué, extraordinaire</td>
              <td><em>destacable / notable</em></td>
            </tr>
            <tr>
              <td><strong>énigmatique</strong></td>
              <td>mystérieux, difficile à comprendre</td>
              <td><em>enigmático / misterioso</em></td>
            </tr>
            <tr>
              <td><strong>méthodique</strong></td>
              <td>qui a des habitudes très régulières et ordonnées</td>
              <td><em>metódico</em></td>
            </tr>
            <tr>
              <td><strong>un domestique</strong></td>
              <td>une personne qui fait le service de maison</td>
              <td><em>un criado / sirviente</em></td>
            </tr>
            <tr>
              <td><strong>dépenser</strong></td>
              <td>utiliser de l'argent pour payer quelque chose</td>
              <td><em>gastar</em></td>
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
              En el año 1872, la casa situada en el número 7 de Saville-row, en Londres, estaba habitada por Phileas Fogg.
              Este caballero era uno de los miembros más singulares y destacables del Reform-Club de Londres.
            </p>
            <p>
              Phileas Fogg era un personaje enigmático.
              Solo se sabía de él que era un hombre muy galante y uno de los más hermosos caballeros de la alta sociedad inglesa.
              Hablaba lo menos posible, parecía silencioso y muy metódico.
              No tenía esposa ni hijos —lo cual le ocurre a la gente más honesta—, ni tampoco parientes.
            </p>
            <p>
              Vivía solo en su casa con su único sirviente.
              Hacía sus comidas en el club a horas precisas.
              No viajaba nunca, excepto al Reform-Club, donde pasaba sus días leyendo los periódicos y jugando a las cartas.
              Era rico, pero no se sabía de dónde venía su fortuna.
              No parecía ahorrar, pero tampoco le gustaba gastar sin motivo.
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
    q: 'En quelle année commence cette histoire ?',
    options: ['1816', '1872', '1943'],
    answer: 1,
  },
  {
    q: 'Où habite Phileas Fogg au début de l\'histoire ?',
    options: ['À Londres', 'À Paris', 'À New York'],
    answer: 0,
  },
  {
    q: 'De quel club Phileas Fogg est-il membre ?',
    options: ['Le French-Club', 'Le Book-Club', 'Le Reform-Club'],
    answer: 2,
  },
  {
    q: 'Avec qui Phileas Fogg vit-il dans sa maison ?',
    options: ['Sa femme et ses enfants', 'Seul avec un domestique', 'Avec ses parents'],
    answer: 1,
  },
  {
    q: 'Quelle est l\'une des occupations quotidiennes de Phileas Fogg ?',
    options: ['Voyager dans le monde', 'Faire du sport', 'Jouer aux cartes au club'],
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
  color: var(--clr-page);
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
  border-color: #4CAF50;
  background: #F1FBF2;
  color: #2E7D32;
  font-weight: 600;
}

.q-option.is-correct .q-mark {
  border-color: #4CAF50;
  background: #4CAF50;
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
  background: #F1FBF2;
  color: #2E7D32;
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
