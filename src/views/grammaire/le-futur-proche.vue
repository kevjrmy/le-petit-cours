<template>
  <AltLayout title="Le futur proche">
    <main class="lesson">

      <!-- ── Règle ─────────────────────────────────── -->
      <article>
        <div class="rule">
          Le <strong class="hl-blue">futur proche</strong> s'utilise pour exprimer une action qui va se dérouler dans un avenir très proche ou qui est déjà planifiée.
          En espagnol, il correspond à la structure <strong class="hl-blue">«&nbsp;ir + a + infinitivo&nbsp;»</strong>, mais attention&nbsp;: en français, <strong class="hl-red">il n'y a pas de préposition «&nbsp;a&nbsp;»</strong> entre le verbe <em>aller</em> et l'infinitif.
        </div>
      </article>

      <!-- ── Formation ──────────────────────────────── -->
      <article>
        <h2>La formation</h2>
        <p class="method">
          Il se construit avec le verbe <strong class="hl-blue">aller</strong> conjugué au présent de l'indicatif + le verbe principal à l'<strong>infinitif</strong>.
        </p>
        <p class="method-example">
          <strong>aller</strong> (présent)
          <span class="arrow-inline" aria-hidden="true">+</span>
          <strong>verbe à l'infinitif</strong>
        </p>

        <table>
          <caption class="sr-only">Conjugaison du futur proche avec le verbe aller</caption>
          <thead>
            <tr>
              <th>Pronom</th>
              <th>aller (présent)</th>
              <th>Infinitif</th>
              <th>Traducción (ES)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="person">je</td>
              <td class="aux">vais</td>
              <td><span class="inf">parler</span></td>
              <td class="translation">voy a hablar</td>
            </tr>
            <tr>
              <td class="person">tu</td>
              <td class="aux">vas</td>
              <td><span class="inf">finir</span></td>
              <td class="translation">vas a terminar</td>
            </tr>
            <tr>
              <td class="person">il / elle / on</td>
              <td class="aux">va</td>
              <td><span class="inf">partir</span></td>
              <td class="translation">va a salir</td>
            </tr>
            <tr>
              <td class="person">nous</td>
              <td class="aux">allons</td>
              <td><span class="inf">manger</span></td>
              <td class="translation">vamos a comer</td>
            </tr>
            <tr>
              <td class="person">vous</td>
              <td class="aux">allez</td>
              <td><span class="inf">prendre</span></td>
              <td class="translation">vais/van a tomar</td>
            </tr>
            <tr>
              <td class="person">ils / elles</td>
              <td class="aux">vont</td>
              <td><span class="inf">venir</span></td>
              <td class="translation">van a venir</td>
            </tr>
          </tbody>
        </table>

        <div class="example">
          Je <strong class="hl-blue">vais manger</strong> une pomme.
          <span class="note">(Voy a comer una manzana — sans "a" intermedia)</span>
        </div>
        <div class="example">
          Nous <strong class="hl-blue">allons partir</strong> ce soir.
          <span class="note">(Vamos a salir esta noche)</span>
        </div>
      </article>

      <!-- ── À retenir : La négation ────────────────── -->
      <article>
        <div class="attention">
          À la forme <strong>négative</strong>, la négation <strong class="hl-red">ne... pas</strong> encadre uniquement le verbe semi-auxiliaire <strong class="hl-blue">aller</strong>. L'infinitif se place après le «&nbsp;pas&nbsp;».
        </div>
        <div class="example exception-ex">
          Je <strong class="hl-red">ne</strong> vais <strong class="hl-red">pas</strong> travailler.
          <span class="sep">·</span>
          Ils <strong class="hl-red">ne</strong> vont <strong class="hl-red">pas</strong> venir.
        </div>
      </article>

      <!-- ── Exception : Les verbes pronominaux ──────── -->
      <article>
        <div class="exception">
          <strong>Les verbes pronominaux</strong>&nbsp;: le pronom réfléchi (me, te, se, nous, vous) change en fonction du sujet et se place toujours <strong class="hl-red">devant l'infinitif</strong> (et non devant le verbe aller).
        </div>
        <div class="example exception-ex">
          Je vais <strong class="hl-red">me</strong> coucher.
          <span class="sep">·</span>
          Tu vas <strong class="hl-red">te</strong> laver ?
          <span class="sep">·</span>
          Nous allons <strong class="hl-red">nous</strong> promener.
        </div>
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
  margin-bottom: 1rem;
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

td.aux {
  font-weight: 700;
  color: var(--clr-blue);
}

td.translation {
  color: var(--clr-ink-soft);
  font-style: italic;
  font-size: 0.85rem;
}

.inf {
  font-family: var(--font-serif);
  font-weight: 600;
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
