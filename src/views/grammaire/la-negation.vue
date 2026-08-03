<!-- view-meta: created=2026-08-02; updated=2026-08-02 -->
<template>
  <AltLayout title="La négation">
    <main class="lesson">

      <!-- ── Règle ─────────────────────────────────── -->
      <article>
        <div class="rule">
          Pour rendre une phrase négative, on encadre le
          <strong class="hl-blue">verbe conjugué</strong> avec deux mots :
          <strong class="hl-red">ne</strong> ... <strong class="hl-red">pas</strong>.
        </div>

        <div class="method-example">
          <strong>Je parle.</strong>
          <span class="arrow-inline" aria-hidden="true">→</span>
          Je <strong class="hl-red">ne</strong> parle <strong class="hl-red">pas</strong>.
        </div>
      </article>

      <!-- ── Construction ──────────────────────────── -->
      <article>
        <h2>La construction</h2>
        <p class="method">
          <strong class="hl-red">ne</strong> se place
          <strong class="hl-blue">avant</strong> le verbe,
          <strong class="hl-red">pas</strong> se place
          <strong class="hl-blue">après</strong>.
        </p>

        <table>
          <caption class="sr-only">Construction de la négation avec ne...pas</caption>
          <thead>
            <tr>
              <th>Sujet</th>
              <th class="col-neg">ne</th>
              <th>Verbe</th>
              <th class="col-neg">pas</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="person">je</td>
              <td class="neg">ne</td>
              <td><span class="stem">parl</span><span class="end">e</span></td>
              <td class="neg">pas</td>
            </tr>
            <tr>
              <td class="person">tu</td>
              <td class="neg">ne</td>
              <td><span class="stem">mang</span><span class="end">es</span></td>
              <td class="neg">pas</td>
            </tr>
            <tr>
              <td class="person">il / elle</td>
              <td class="neg">ne</td>
              <td><span class="stem">fin</span><span class="end">it</span></td>
              <td class="neg">pas</td>
            </tr>
            <tr>
              <td class="person">nous</td>
              <td class="neg">ne</td>
              <td><span class="stem">venu</span><span class="end">ns</span></td>
              <td class="neg">pas</td>
            </tr>
          </tbody>
        </table>

        <div class="example">
          Elle <strong class="hl-red">ne</strong> travaille <strong class="hl-red">pas</strong> le dimanche.
        </div>
        <div class="example">
          Nous <strong class="hl-red">ne</strong> comprenons <strong class="hl-red">pas</strong> la question.
        </div>
        <div class="example">
          Ils <strong class="hl-red">ne</strong> sont <strong class="hl-red">pas</strong> français.
        </div>
      </article>

      <!-- ── À retenir : élision ────────────────────── -->
      <article>
        <div class="attention">
          Devant une <mark>voyelle</mark> ou un <mark>h muet</mark>,
          <strong class="hl-red">ne</strong> devient
          <strong class="hl-red">n'</strong>.
        </div>
        <div class="example exception-ex">
          Je <strong class="hl-red">n'</strong>aime pas le café.
          <span class="sep">·</span>
          Il <strong class="hl-red">n'</strong>habite pas ici.
        </div>
      </article>

      <!-- ── Exception : articles après la négation ── -->
      <article>
        <div class="exception">
          <strong>Les articles indéfinis et partitifs</strong>
          (un, une, des, du, de la, de l') deviennent
          <strong class="hl-red">de</strong> (ou
          <strong class="hl-red">d'</strong> devant une voyelle) après une
          négation.
        </div>
        <div class="example exception-ex">
          J'ai <strong class="hl-blue">un</strong> vélo
          <span class="arrow-inline" aria-hidden="true">→</span>
          Je n'ai pas <strong class="hl-red">de</strong> vélo
        </div>
        <div class="example exception-ex">
          Elle boit <strong class="hl-blue">du</strong> thé
          <span class="arrow-inline" aria-hidden="true">→</span>
          Elle ne boit pas <strong class="hl-red">de</strong> thé
        </div>
        <div class="example" style="margin-top: 0.5rem;">
          Il n'y a pas <strong class="hl-red">d'</strong>eau dans le verre.
          <span class="note">(de + voyelle → d')</span>
        </div>
      </article>

      <!-- ── Autres négations ──────────────────────── -->
      <article>
        <h2>D'autres mots de négation</h2>
        <p class="method">
          <strong class="hl-red">pas</strong> peut être remplacé par d'autres
          mots pour préciser le sens de la négation.
        </p>

        <table>
          <caption class="sr-only">Autres formes de négation</caption>
          <thead>
            <tr>
              <th>Négation</th>
              <th>Sens</th>
              <th>Exemple</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="neg-form">ne ... plus</td>
              <td class="sense">fin d'une action</td>
              <td>Je <strong class="hl-red">ne</strong> fume <strong class="hl-red">plus</strong>.</td>
            </tr>
            <tr>
              <td class="neg-form">ne ... jamais</td>
              <td class="sense">zéro fois</td>
              <td>Il <strong class="hl-red">ne</strong> ment <strong class="hl-red">jamais</strong>.</td>
            </tr>
            <tr>
              <td class="neg-form">ne ... rien</td>
              <td class="sense">aucune chose</td>
              <td>Elle <strong class="hl-red">ne</strong> voit <strong class="hl-red">rien</strong>.</td>
            </tr>
            <tr>
              <td class="neg-form">ne ... personne</td>
              <td class="sense">aucune personne</td>
              <td>Nous <strong class="hl-red">ne</strong> connaissons <strong class="hl-red">personne</strong>.</td>
            </tr>
          </tbody>
        </table>
      </article>

      <button
        class="download-btn"
        @click="downloadPdf"
        aria-label="Télécharger cette leçon en PDF"
      >
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
.lesson {
  gap: 1rem;
}

/* ── Inline typography helpers ─────────────────── */
.hl-blue { color: var(--clr-blue); font-weight: 700; }
.hl-red  { color: var(--clr-red);  font-weight: 700; }

.end     { color: var(--clr-red); }
.stem    { color: var(--clr-blue); font-weight: 600; }

mark {
  background: var(--clr-amber-light);
  color: var(--clr-amber);
  padding: 0.05em 0.25em;
  border-radius: 2px;
  font-style: normal;
  font-weight: 600;
}

.note {
  color: var(--clr-ink-soft);
  font-size: 0.82em;
  font-style: italic;
}

.sep {
  color: var(--clr-border);
  margin: 0 0.25rem;
}

.arrow-inline {
  color: var(--clr-blue-mid);
}

/* ── Method line ───────────────────────────────── */
.method {
  color: var(--clr-ink-mid);
  font-size: 0.9rem;
  margin-bottom: 0.35rem;
}

.method-example {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  font-size: 0.97rem;
  margin-top: 1rem;
}

/* ── Table ─────────────────────────────────────── */
table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1rem;
  font-size: 0.92rem;
}

caption.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
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

th.col-neg {
  background: var(--clr-red);
}

td {
  padding: 0.45rem 0.75rem;
  border-bottom: 1px solid var(--clr-border-soft);
  color: var(--clr-ink);
}

td.person {
  color: var(--clr-ink-mid);
  font-size: 0.85rem;
  font-style: italic;
  white-space: nowrap;
}

td.neg {
  font-family: var(--font-mono);
  font-weight: 700;
  color: var(--clr-red);
}

td.neg-form {
  font-family: var(--font-mono);
  font-weight: 700;
  color: var(--clr-red);
  white-space: nowrap;
}

td.sense {
  color: var(--clr-ink-mid);
  font-size: 0.85rem;
  font-style: italic;
}

tr:last-child td {
  border-bottom: none;
}

tr:nth-child(even) td {
  background: var(--clr-blue-light);
}

/* ── Examples ──────────────────────────────────── */
.example + .example {
  margin-top: 0.5rem;
}

.exception-ex {
  margin-top: 0.6rem;
  font-family: var(--font-mono);
  font-size: 0.9rem;
}

/* ── Download button ───────────────────────────── */
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

.download-btn:hover {
  border-color: var(--clr-blue);
  color: var(--clr-blue);
}

@media print {
  .download-btn { display: none !important; }
}
</style>
