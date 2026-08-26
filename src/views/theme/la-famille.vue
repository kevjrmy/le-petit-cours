<!-- view-meta: created=2026-08-02; updated=2026-08-26 -->
<template>
  <AltLayout title="La famille et les amis">
    <main class="lesson">

      <!-- Contexte -->
      <article>
        <div class="rule">
          Parler de <strong class="hl-blue">sa famille et de ses amis</strong> est l'une des premières choses que l'on fait en français. Ce thème est très courant dans les conversations quotidiennes et vous permet de vous présenter de façon naturelle.
        </div>
      </article>

      <!-- Vocabulaire essentiel -->
      <article>
        <h2>Vocabulaire essentiel</h2>
        <p class="method">Les mots clés pour parler de votre entourage.</p>

        <table>
          <caption class="sr-only">Vocabulaire sur la famille et les amis</caption>
          <thead>
            <tr>
              <th>Mot (FR)</th>
              <th>Definición en francés</th>
              <th>Traducción (ES)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="vocab">les parents</td>
              <td>le père et la mère</td>
              <td class="transl">los padres</td>
            </tr>
            <tr>
              <td class="vocab">le frère / la sœur</td>
              <td>enfant du même père et de la même mère</td>
              <td class="transl">el hermano / la hermana</td>
            </tr>
            <tr>
              <td class="vocab">les grands-parents</td>
              <td>les parents du père ou de la mère</td>
              <td class="transl">los abuelos</td>
            </tr>
            <tr>
              <td class="vocab">un(e) ami(e)</td>
              <td>une personne avec qui on s'entend bien</td>
              <td class="transl">un(a) amigo(a)</td>
            </tr>
            <tr>
              <td class="vocab">un(e) collègue</td>
              <td>une personne avec qui on travaille</td>
              <td class="transl">un(a) colega</td>
            </tr>
            <tr>
              <td class="vocab">habiter ensemble</td>
              <td>vivre dans la même maison</td>
              <td class="transl">vivir juntos</td>
            </tr>
            <tr>
              <td class="vocab">s'entendre bien</td>
              <td>avoir une bonne relation avec quelqu'un</td>
              <td class="transl">llevarse bien</td>
            </tr>
            <tr>
              <td class="vocab">être proche de</td>
              <td>avoir une relation intime et chaleureuse</td>
              <td class="transl">estar unido a</td>
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
            Vous avez des frères et sœurs ? Parlez d'eux.
            <span class="hint">(¿Tiene hermanos o hermanas? Háblenos de ellos.)</span>
          </li>
          <li class="question-item">
            Où habitent vos parents ? Vous les voyez souvent ?
            <span class="hint">(¿Dónde viven sus padres? ¿Los ve seguido?)</span>
          </li>
          <li class="question-item">
            Décrivez votre meilleur(e) ami(e). Comment vous vous êtes rencontrés ?
            <span class="hint">(Describa a su mejor amigo(a). ¿Cómo se conocieron?)</span>
          </li>
          <li class="question-item">
            Qu'est-ce que vous aimez faire avec votre famille le week-end ?
            <span class="hint">(¿Qué le gusta hacer con su familia el fin de semana?)</span>
          </li>
          <li class="question-item">
            Est-ce que la famille est importante pour vous ? Pourquoi ?
            <span class="hint">(¿Es importante la familia para usted? ¿Por qué?)</span>
          </li>
        </ol>
      </article>

      <!-- Expressions utiles -->
      <article>
        <h2>Expressions utiles</h2>
        <p class="method">Utilisez ces expressions pour structurer vos réponses.</p>

        <div class="expr-list">
          <div class="example">
            <strong class="hl-blue">J'ai un frère qui s'appelle...</strong>
            <span class="note">(Tengo un hermano que se llama...)</span>
          </div>
          <div class="example">
            <strong class="hl-blue">Je suis fils unique / fille unique.</strong>
            <span class="note">(Soy hijo / hija único(a).)</span>
          </div>
          <div class="example">
            <strong class="hl-blue">Je m'entends très bien avec...</strong>
            <span class="note">(Me llevo muy bien con...)</span>
          </div>
          <div class="example">
            <strong class="hl-blue">On se voit souvent, environ... fois par mois.</strong>
            <span class="note">(Nos vemos seguido, unas... veces al mes.)</span>
          </div>
          <div class="example">
            <strong class="hl-blue">Pour moi, la famille c'est très important parce que...</strong>
            <span class="note">(Para mí, la familia es muy importante porque...)</span>
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

      <RelatedLinks />

    </main>
  </AltLayout>
</template>

<script setup>
import AltLayout from '@/layouts/AltLayout.vue'
import RelatedLinks from '@/components/RelatedLinks.vue'

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

/* Question list */
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

/* Expressions */
.expr-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.example + .example { margin-top: 0; }

/* Download button */
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
