<template>
  <AltLayout title="Le Petit Prince — Chapitre I">
    <main class="lesson">

      <!-- ── Source ──────────────────────────────── -->
      <div class="source-tag">
        Antoine de Saint-Exupéry · <em>Le Petit Prince</em> · 1943 · Chapitre&nbsp;I
      </div>

      <!-- ── Texte ───────────────────────────────── -->
      <article class="reading">
        <p>
          Lorsque j'avais six ans j'ai vu, une fois, une magnifique image,
          dans un livre sur la Forêt Vierge qui s'appelait
          <em>« Histoires Vécues »</em>. Ça représentait un serpent boa
          qui <span class="hl-word" title="se mettre dans la gorge">avalait</span>
          un <span class="hl-word" title="animal sauvage">fauve</span>.
          Voilà la copie du dessin.
        </p>

        <p>
          On disait dans le livre : « Les serpents boas avalent leur
          <span class="hl-word" title="animal chassé">proie</span>
          tout entière, sans la
          <span class="hl-word" title="écraser avec les dents">mâcher</span>.
          Ensuite ils ne peuvent plus bouger et ils dorment pendant
          les six mois de leur digestion. »
        </p>

        <p>
          J'ai alors beaucoup
          <span class="hl-word" title="pensé sérieusement">réfléchi</span>
          sur les aventures de la jungle et, à mon tour, j'ai réussi,
          avec un crayon de couleur, à
          <span class="hl-word" title="dessiner">tracer</span>
          mon premier dessin.
        </p>

        <p>
          Mon dessin numéro 1 ressemblait à ceci. J'ai montré mon
          chef-d'œuvre aux grandes personnes et je leur ai demandé si mon
          dessin leur faisait peur.
        </p>

        <p>
          Elles m'ont répondu : « Pourquoi un chapeau ferait-il peur ? »
        </p>

        <p>
          Mon dessin ne représentait pas un chapeau. Il représentait un serpent
          boa qui <span class="hl-word" title="digestait">digérait</span>
          un éléphant. J'ai alors dessiné l'intérieur du serpent boa,
          afin que les grandes personnes puissent comprendre.
          Les grandes personnes ont toujours besoin d'explications.
          Mon dessin numéro 2 ressemblait à ceci.
        </p>

        <p>
          Les grandes personnes m'ont conseillé de laisser de côté les dessins
          de serpents boas ouverts ou fermés, et de m'intéresser plutôt
          à la géographie, à l'histoire, au calcul et à la grammaire.
          C'est ainsi que j'ai abandonné, à l'âge de six ans, une magnifique
          carrière de peintre.
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
              <td><strong>avaler</strong></td>
              <td>faire passer dans la gorge</td>
              <td><em>tragar</em></td>
            </tr>
            <tr>
              <td><strong>un fauve</strong></td>
              <td>un grand animal sauvage</td>
              <td><em>una fiera</em></td>
            </tr>
            <tr>
              <td><strong>une proie</strong></td>
              <td>un animal chassé par un autre</td>
              <td><em>una presa</em></td>
            </tr>
            <tr>
              <td><strong>mâcher</strong></td>
              <td>écraser avec les dents</td>
              <td><em>masticar</em></td>
            </tr>
            <tr>
              <td><strong>réfléchir</strong></td>
              <td>penser sérieusement</td>
              <td><em>reflexionar</em></td>
            </tr>
            <tr>
              <td><strong>tracer</strong></td>
              <td>dessiner une ligne ou une forme</td>
              <td><em>trazar</em></td>
            </tr>
            <tr>
              <td><strong>un chef-d'œuvre</strong></td>
              <td>une création exceptionnelle</td>
              <td><em>una obra maestra</em></td>
            </tr>
            <tr>
              <td><strong>laisser de côté</strong></td>
              <td>ne plus s'occuper de quelque chose</td>
              <td><em>dejar de lado</em></td>
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
              Cuando tenía seis años vi una vez una imagen magnífica en un libro
              sobre la Selva Virgen que se llamaba <em>«Historias Vividas»</em>.
              Representaba a una boa que se tragaba a una fiera. Aquí está la
              copia del dibujo.
            </p>
            <p>
              En el libro decía: «Las serpientes boas se tragan a su presa
              entera, sin masticarla. Luego no pueden moverse y duermen durante
              los seis meses que dura su digestión.»
            </p>
            <p>
              Entonces reflexioné mucho sobre las aventuras de la jungla y, a
              mi vez, logré, con un lápiz de colores, trazar mi primer dibujo.
            </p>
            <p>
              Mi dibujo número uno tenía este aspecto. Mostré mi obra maestra
              a las personas mayores y les pregunté si mi dibujo les daba miedo.
            </p>
            <p>
              Me respondieron: «¿Por qué un sombrero daría miedo?»
            </p>
            <p>
              Mi dibujo no representaba un sombrero. Representaba una boa que
              estaba digiriendo un elefante. Dibujé entonces el interior de la
              boa, para que las personas mayores pudieran comprender.
              Las personas mayores siempre necesitan explicaciones.
              Mi dibujo número dos tenía este aspecto.
            </p>
            <p>
              Las personas mayores me aconsejaron que dejara de lado los dibujos
              de serpientes boas abiertas o cerradas, y que me interesara más
              bien por la geografía, la historia, el cálculo y la gramática.
              Así fue como abandoné, a la edad de seis años, una magnífica
              carrera de pintor.
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
    q: 'Quel âge avait le narrateur quand il a vu l\'image ?',
    options: ['Six ans', 'Dix ans', 'Vingt ans'],
    answer: 0,
  },
  {
    q: 'Que faisait le serpent boa dans l\'image ?',
    options: ['Il dormait', 'Il avalait un fauve', 'Il chassait un oiseau'],
    answer: 1,
  },
  {
    q: 'Combien de mois dorment les serpents boas pendant leur digestion ?',
    options: ['Trois mois', 'Six mois', 'Douze mois'],
    answer: 1,
  },
  {
    q: 'Que représentait vraiment le dessin numéro 1 ?',
    options: ['Un chapeau', 'Un serpent boa qui digérait un éléphant', 'Un éléphant seul'],
    answer: 1,
  },
  {
    q: 'Que voyaient les grandes personnes dans le dessin ?',
    options: ['Un serpent', 'Un chapeau', 'Un éléphant'],
    answer: 1,
  },
  {
    q: 'Quelle carrière le narrateur a-t-il abandonnée ?',
    options: ['Une carrière de peintre', 'Une carrière de pilote', 'Une carrière de professeur'],
    answer: 0,
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
