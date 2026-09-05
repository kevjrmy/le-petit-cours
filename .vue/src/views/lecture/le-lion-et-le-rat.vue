<!-- view-meta: created=2026-08-03; updated=2026-08-03 -->
<template>
  <AltLayout title="Le Lion et le Rat">
    <main class="lesson">

      <!-- ── Source ──────────────────────────────── -->
      <div class="source-tag">
        Jean de La Fontaine · <em>Fables</em> · 1668 · Livre II, Fable 11
      </div>

      <!-- ── Texte de la Fable ────────────────────── -->
      <article class="reading">
        <p class="fable-quote">
          «&nbsp;Il faut, autant qu'on peut, <span class="hl-word" title="rendre service à / aider">obliger</span> tout le monde&nbsp;:<br>
          On a souvent besoin d'un <span class="hl-word" title="quelqu'un de plus humble ou plus petit">plus petit</span> que soi.&nbsp;»
        </p>

        <p class="fable-verse">
          Entre les pattes d'un Lion,<br>
          Un Rat sortit de terre assez <span class="hl-word" title="sans faire attention / distraitement">à l'étourdie</span>.<br>
          Le Roi des animaux, en cette occasion,<br>
          Montra grand cœur, et lui sauva la vie.<br>
          Ce <span class="hl-word" title="bonne action / service rendu">bienfait</span> ne fut pas perdu.<br>
          Quelqu'un aurait-il jamais cru<br>
          Qu'un Lion d'un Rat eût besoin ?
        </p>

        <p class="fable-verse">
          Cependant il advint qu'au sortir des forêts<br>
          Ce Lion fut pris dans des <span class="hl-word" title="filets de chasseurs">rets</span>,<br>
          Dont ses <span class="hl-word" title="cris forts du lion">rugissements</span> ne purent le défaire.<br>
          Sire Rat accourut, et travailla si bien<br>
          Qu'une <span class="hl-word" title="boucle / nœud du filet">maille</span> <span class="hl-word" title="coupée avec les dents">rongée</span> emporta tout l'ouvrage.
        </p>

        <p class="moral-box">
          💡 <strong>Morale :</strong> Patience et longueur de temps font plus que force ni que rage.
        </p>
      </article>

      <!-- ── Vocabulaire ─────────────────────────── -->
      <article>
        <h2>Vocabulaire clé</h2>
        <table>
          <caption class="sr-only">Vocabulaire de la fable avec définitions</caption>
          <thead>
            <tr>
              <th>Mot / Expression</th>
              <th>Définition en français</th>
              <th>En espagnol</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>obliger</strong></td>
              <td>rendre service, faire du bien à quelqu'un</td>
              <td><em>favorecer / ayudar</em></td>
            </tr>
            <tr>
              <td><strong>un plus petit que soi</strong></td>
              <td>une personne plus modeste ou moins forte</td>
              <td><em>alguien más humilde o pequeño</em></td>
            </tr>
            <tr>
              <td><strong>à l'étourdie</strong></td>
              <td>sans faire attention, distraitement</td>
              <td><em>distraídamente / sin pensar</em></td>
            </tr>
            <tr>
              <td><strong>un bienfait</strong></td>
              <td>une bonne action, un service rendu</td>
              <td><em>un beneficio / buena acción</em></td>
            </tr>
            <tr>
              <td><strong>des rets</strong></td>
              <td>des filets pour capturer les animaux</td>
              <td><em>redes de caza</em></td>
            </tr>
            <tr>
              <td><strong>des rugissements</strong></td>
              <td>les cris très forts du lion</td>
              <td><em>rugidos</em></td>
            </tr>
            <tr>
              <td><strong>une maille</strong></td>
              <td>un nœud ou une boucle du filet</td>
              <td><em>una malla de la red</em></td>
            </tr>
            <tr>
              <td><strong>ronger</strong></td>
              <td>couper peu à peu avec les dents</td>
              <td><em>roer</em></td>
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
          <span v-if="score === questions.length">🎉 Bravo ! {{ score }} / {{ questions.length }} — tout est parfait !</span>
          <span v-else>Vous avez obtenu {{ score }} / {{ questions.length }}. Relisez la fable et réessayez 💪</span>
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
              «Es necesario, en la medida de lo posible, favorecer a todo el mundo:<br>
              A menudo se necesita a alguien más pequeño que uno mismo.»
            </p>
            <p>
              Entre las garras de un León, un Ratón salió de la tierra bastante distraído.
              El Rey de los animales, en esa ocasión, demostró gran corazón y le salvó la vida.
              Esa buena acción no fue en vano. ¿Habría creído alguien alguna vez que un León necesitaría a un Ratón?
            </p>
            <p>
              Sin embargo, sucedió que al salir de los bosques, el León quedó atrapado en unas redes de caza, de las cuales sus rugidos no pudieron librarlo.
              El Señor Ratón acudió corriendo y trabajó tan bien que, royendo una malla, deshijo toda la red.
            </p>
            <p>
              <strong>Moraleja:</strong> La paciencia y el paso del tiempo hacen más que la fuerza y la rabia.
            </p>
          </div>
        </details>
      </article>

      <RelatedLinks />
    </main>
  </AltLayout>
</template>

<script setup>
import { computed, reactive } from 'vue'
import AltLayout from '@/layouts/AltLayout.vue'
import RelatedLinks from '@/components/RelatedLinks.vue'

const questions = [
  {
    q: "Que fait le lion au début de la fable lorsqu'il attrape le rat ?",
    options: [
      "Il mange immédiatement le rat.",
      "Il fait preuve de générosité et lui sauve la vie.",
      "Il l'enferme dans une cage."
    ],
    answer: 1
  },
  {
    q: "Que se passe-t-il plus tard pour le lion dans la forêt ?",
    options: [
      "Il se perd dans la forêt.",
      "Il est capturé dans des filets de chasseurs.",
      "Il tombe de sommeil au pied d'un arbre."
    ],
    answer: 1
  },
  {
    q: "Comment le rat réussit-il à libérer le puissant lion ?",
    options: [
      "En rongeant les mailles du filet avec ses dents.",
      "En appelant tous les autres animaux de la forêt.",
      "En utilisant des ciseaux de jardin."
    ],
    answer: 0
  },
  {
    q: "Quelle est la morale principale transmise par La Fontaine ?",
    options: [
      "Les lions restent toujours les plus forts.",
      "On a souvent besoin de plus petit que soi.",
      "Il faut éviter d'aller se promener en forêt."
    ],
    answer: 1
  }
]

const picks = reactive(Array(questions.length).fill(null))

const allAnswered = computed(() => picks.every(p => p !== null))
const score = computed(() => picks.reduce((acc, p, i) => acc + (p === questions[i].answer ? 1 : 0), 0))

function pick(qi, oi) {
  if (picks[qi] !== null) return
  picks[qi] = oi
}

function optionClass(qi, oi) {
  if (picks[qi] === null) return ''
  if (oi === questions[qi].answer) return 'correct'
  if (picks[qi] === oi) return 'wrong'
  return 'muted'
}

function resetQuiz() {
  picks.fill(null)
}
</script>

<style scoped>
.lesson {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.source-tag {
  font-family: var(--font-mono);
  font-size: 0.78rem;
  color: var(--clr-ink-soft);
  text-align: center;
  border-bottom: 1px dashed var(--clr-border);
  padding-bottom: 0.5rem;
}

.reading {
  background: var(--clr-page);
  padding: 1.25rem 1.5rem;
  border: 1px solid var(--clr-border);
  border-radius: var(--radius);
  line-height: 1.8;
}

.fable-quote {
  font-family: var(--font-serif);
  font-style: italic;
  color: var(--clr-blue-dark);
  font-size: 1.05rem;
  padding: 0.75rem 1rem;
  background: var(--clr-blue-light);
  border-left: 4px solid var(--clr-blue);
  border-radius: var(--radius-sm);
  margin-bottom: 1.2rem;
}

.fable-verse {
  font-family: var(--font-serif);
  font-size: 1.05rem;
  color: var(--clr-ink);
  margin-bottom: 1.2rem;
}

.moral-box {
  padding: 0.75rem 1rem;
  background: var(--warn-soft);
  border: 1px solid var(--clr-amber);
  border-radius: var(--radius-sm);
  color: var(--clr-ink);
  font-family: var(--font-serif);
  font-size: 0.98rem;
  margin: 0;
}

.hl-word {
  border-bottom: 1px dashed var(--clr-blue);
  cursor: help;
  color: var(--clr-blue-dark);
  font-weight: 600;
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.92rem;
}

th {
  background: var(--clr-blue);
  color: var(--text-on-accent);
  text-align: left;
  padding: 0.5rem 0.75rem;
  font-weight: 600;
}

td {
  padding: 0.5rem 0.75rem;
  border-bottom: 1px solid var(--clr-border-soft);
}

tbody tr:nth-child(even) {
  background: var(--clr-blue-light);
}

.quiz {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.quiz h2 {
  font-family: var(--font-serif);
  color: var(--clr-blue-dark);
  margin: 0;
}

.quiz-intro {
  font-size: 0.9rem;
  color: var(--clr-ink-soft);
  margin: 0;
}

.question {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.85rem;
  background: var(--clr-page);
  border: 1px solid var(--clr-border);
  border-radius: var(--radius);
}

.q-text {
  font-family: var(--font-serif);
  font-weight: 600;
  margin: 0;
}

.q-num {
  color: var(--clr-blue);
  margin-right: 0.25rem;
}

.q-options {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.q-option {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 0.85rem;
  border: 1px solid var(--clr-border);
  border-radius: var(--radius-sm);
  background: var(--clr-page);
  color: var(--clr-ink);
  cursor: pointer;
  text-align: left;
  font-size: 0.92rem;
  transition: border-color 0.15s, background 0.15s;
}

.q-option:not(:disabled):hover {
  border-color: var(--clr-blue);
  background: var(--clr-blue-light);
}

.q-option.correct {
  border-color: var(--success-text);
  background: var(--success-soft);
  color: var(--success-text);
  font-weight: 600;
}

.q-option.wrong {
  border-color: var(--clr-red);
  background: var(--clr-red-light);
  color: var(--clr-red);
}

.q-option.muted {
  opacity: 0.55;
  cursor: default;
}

.quiz-score {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.85rem 1.1rem;
  border-radius: var(--radius);
  background: var(--clr-blue-light);
  border: 1px solid var(--clr-blue);
  color: var(--clr-blue-dark);
  font-family: var(--font-serif);
  font-size: 0.98rem;
}

.quiz-score.perfect {
  background: var(--success-soft);
  border-color: var(--success-line);
  color: var(--success-text);
}

.btn-retry {
  padding: 0.45rem 0.85rem;
  border: 1px solid var(--clr-blue);
  border-radius: var(--radius-sm);
  background: var(--clr-page);
  color: var(--clr-blue);
  font-weight: 600;
  font-size: 0.85rem;
  cursor: pointer;
}

.translation {
  background: var(--clr-bg);
  border: 1px solid var(--clr-amber);
  border-radius: var(--radius);
  padding: 0.75rem 1rem;
}

.translation summary {
  cursor: pointer;
  font-family: var(--font-sans);
  font-weight: 600;
  color: var(--warn-text);
  list-style: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.translation summary::-webkit-details-marker {
  display: none;
}

.translation-body {
  margin-top: 0.85rem;
  padding-top: 0.85rem;
  border-top: 1px dashed var(--clr-amber);
  font-family: var(--font-serif);
  font-size: 0.95rem;
  line-height: 1.75;
  color: var(--clr-ink-mid);
}

</style>
