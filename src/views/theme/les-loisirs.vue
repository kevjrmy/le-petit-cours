<!-- view-meta: created=2026-08-02; updated=2026-08-02 -->
<template>
  <AltLayout title="Les loisirs et le sport">
    <main class="lesson">

      <!-- Contexte -->
      <article>
        <div class="rule">
          Parler de ses <strong class="hl-blue">loisirs et du sport</strong> est très courant en conversation. C'est un thème positif qui permet de mieux se connaitre et de partager ses passions.
        </div>
      </article>

      <!-- Vocabulaire essentiel -->
      <article>
        <h2>Vocabulaire essentiel</h2>
        <p class="method">Les mots clés pour parler de vos activités favorites.</p>

        <table>
          <caption class="sr-only">Vocabulaire sur les loisirs et le sport</caption>
          <thead>
            <tr>
              <th>Mot (FR)</th>
              <th>Definición en francés</th>
              <th>Traducción (ES)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="vocab">un loisir</td>
              <td>une activité que l'on fait par plaisir</td>
              <td class="transl">un pasatiempo</td>
            </tr>
            <tr>
              <td class="vocab">pratiquer</td>
              <td>faire régulièrement une activité ou un sport</td>
              <td class="transl">practicar</td>
            </tr>
            <tr>
              <td class="vocab">une passion</td>
              <td>quelque chose qu'on aime énormément</td>
              <td class="transl">una pasión</td>
            </tr>
            <tr>
              <td class="vocab">le temps libre</td>
              <td>les moments sans travail ni obligations</td>
              <td class="transl">el tiempo libre</td>
            </tr>
            <tr>
              <td class="vocab">s'entrainer</td>
              <td>faire des exercices pour progresser</td>
              <td class="transl">entrenarse</td>
            </tr>
            <tr>
              <td class="vocab">une équipe</td>
              <td>un groupe de personnes qui jouent ensemble</td>
              <td class="transl">un equipo</td>
            </tr>
            <tr>
              <td class="vocab">en plein air</td>
              <td>à l'extérieur, dans la nature</td>
              <td class="transl">al aire libre</td>
            </tr>
            <tr>
              <td class="vocab">se détendre</td>
              <td>se reposer, arrêter le stress</td>
              <td class="transl">relajarse</td>
            </tr>
          </tbody>
        </table>
      </article>

      <!-- Questions pour la conversation -->
      <article>
        <h2>Questions pour lancer la conversation</h2>
        <p class="method">
          Lisez chaque question à voix haute. Donnez votre vraie réponse en une ou deux phrases.
        </p>

        <ol class="question-list">
          <li class="question-item">
            Quel est votre loisir préféré ? Depuis combien de temps vous le pratiquez ?
            <span class="hint">(¿Cuál es su pasatiempo favorito? ¿Hace cuánto tiempo lo practica?)</span>
          </li>
          <li class="question-item">
            Vous faites du sport ? Quel sport et à quelle fréquence ?
            <span class="hint">(¿Practica algún deporte? ¿Cuál y con qué frecuencia?)</span>
          </li>
          <li class="question-item">
            Qu'est-ce que vous faites le week-end pour vous détendre ?
            <span class="hint">(¿Qué hace el fin de semana para relajarse?)</span>
          </li>
          <li class="question-item">
            Est-ce que vous préférez les activités en plein air ou à l'intérieur ? Pourquoi ?
            <span class="hint">(¿Prefiere las actividades al aire libre o en interior? ¿Por qué?)</span>
          </li>
          <li class="question-item">
            Avez-vous un sport que vous voudriez apprendre un jour ?
            <span class="hint">(¿Hay algún deporte que le gustaría aprender algún día?)</span>
          </li>
        </ol>
      </article>

      <!-- Expressions utiles -->
      <article>
        <h2>Expressions utiles</h2>
        <p class="method">Utilisez ces expressions pour structurer vos réponses.</p>

        <div class="expr-list">
          <div class="example">
            <strong class="hl-blue">J'aime beaucoup... / J'adore... / Je suis passionné(e) par...</strong>
            <span class="note">(Me gusta mucho... / Me encanta... / Soy apasionado(a) por...)</span>
          </div>
          <div class="example">
            <strong class="hl-blue">Je pratique... deux fois par semaine / tous les jours / le week-end.</strong>
            <span class="note">(Practico... dos veces por semana / todos los días / el fin de semana.)</span>
          </div>
          <div class="example">
            <strong class="hl-blue">Je préfère les activités en plein air parce que...</strong>
            <span class="note">(Prefiero las actividades al aire libre porque...)</span>
          </div>
          <div class="example">
            <strong class="hl-blue">Ca me permet de me détendre après une longue journée.</strong>
            <span class="note">(Me permite relajarme después de un día largo.)</span>
          </div>
          <div class="example">
            <strong class="hl-blue">Je voudrais apprendre à... mais je n'ai pas encore eu le temps.</strong>
            <span class="note">(Me gustaría aprender a... pero todavía no he tenido tiempo.)</span>
          </div>
        </div>
      </article>

      <button class="download-btn" @click="downloadPdf" aria-label="Télécharger cette fiche en PDF">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M12 3v14m0 0-5-5m5 5 5-5"/>
          <path d="M3 20h18"/>
        </svg>
        <span>Télécharger</span>
      </button>

    </main>
  </AltLayout>
</template>

<script setup>
import AltLayout from '@/layouts/AltLayout.vue'

function downloadPdf() {
  window.print()
}
</script>

<style scoped>
.lesson { gap: 1rem; }

.hl-blue { color: var(--clr-blue); font-weight: 700; }

.note {
  color: var(--clr-ink-soft);
  font-size: 0.82em;
  font-style: italic;
  display: block;
  margin-top: 0.15rem;
}

.method {
  color: var(--clr-ink-mid);
  font-size: 0.9rem;
  margin-bottom: 0.75rem;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1rem;
  font-size: 0.92rem;
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
  padding: 0.5rem 0.75rem;
  text-align: left;
  font-family: var(--font-sans);
  font-weight: 700;
  font-size: 0.72rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

td {
  padding: 0.45rem 0.75rem;
  border-bottom: 1px solid var(--clr-border-soft);
  color: var(--clr-ink);
  font-size: 0.9rem;
}

td.vocab {
  font-family: var(--font-mono);
  font-weight: 700;
  color: var(--clr-blue);
  white-space: nowrap;
}

td.transl {
  color: var(--clr-ink-soft);
  font-style: italic;
}

tr:last-child td { border-bottom: none; }
tr:nth-child(even) td { background: var(--clr-blue-light); }

.question-list {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  padding-left: 1.25rem;
  margin: 0;
}

.question-item {
  font-family: var(--font-serif);
  font-size: 0.97rem;
  line-height: 1.65;
  color: var(--clr-ink);
}

.hint {
  display: block;
  font-size: 0.8rem;
  font-style: italic;
  color: var(--clr-ink-soft);
  margin-top: 0.1rem;
}

.expr-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.download-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.35rem;
  margin: 0.5rem auto 0;
  padding: 0.85rem 1.5rem;
  border: 1px solid var(--clr-border);
  border-radius: var(--radius);
  color: var(--clr-ink-soft);
  font-size: 0.72rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  transition: border-color 0.15s, color 0.15s;
}

.download-btn:hover { border-color: var(--clr-blue); color: var(--clr-blue); }

@media print { .download-btn { display: none !important; } }
</style>
