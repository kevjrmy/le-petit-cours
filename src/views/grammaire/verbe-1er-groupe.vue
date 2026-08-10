<!-- view-meta: created=2026-08-02; updated=2026-08-02 -->
<template>
  <AltLayout title="Les verbes du 1er groupe">
    <main class="lesson">

      <!-- ── Règle ─────────────────────────────────── -->
      <article>
        <div class="rule">
          Les verbes du <strong class="hl-blue">1<sup>er</sup> groupe</strong> ont un infinitif
          qui se termine en <strong class="hl-red">-ER</strong>.
          C'est le groupe le plus grand : plus de <strong class="hl-blue">90 %</strong>
          des verbes français y appartiennent.
        </div>

        <div class="verb-examples">
          <span class="verb-pill">parl<span class="inf-end">er</span></span>
          <span class="verb-pill">aim<span class="inf-end">er</span></span>
          <span class="verb-pill">march<span class="inf-end">er</span></span>
          <span class="verb-pill">mang<span class="inf-end">er</span></span>
          <span class="verb-pill">regard<span class="inf-end">er</span></span>
          <span class="verb-pill">écout<span class="inf-end">er</span></span>
          <span class="verb-pill">travaill<span class="inf-end">er</span></span>
          <span class="verb-pill">chant<span class="inf-end">er</span></span>
        </div>
      </article>

      <!-- ── Conjugaison ────────────────────────────── -->
      <article>
        <h2>La conjugaison au présent</h2>
        <p class="method">
          Retirez <strong class="hl-red">-ER</strong> pour obtenir le
          <strong class="hl-blue">radical</strong>, puis ajoutez la terminaison.
        </p>
        <p class="method-example">
          <strong>parl<span class="hl-red">er</span></strong>
          <span class="arrow-inline" aria-hidden="true">→</span>
          radical <strong class="hl-blue">parl-</strong>
          <span class="arrow-inline" aria-hidden="true">+</span>
          terminaison
        </p>

        <table>
          <caption class="sr-only">Conjugaison des verbes du 1er groupe au présent</caption>
          <thead>
            <tr>
              <th>Pronom</th>
              <th class="col-end">Terminaison</th>
              <th>parl<span class="th-end">er</span></th>
              <th>aim<span class="th-end">er</span></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="person">je&nbsp;/ j'</td>
              <td class="ending">-<strong>e</strong></td>
              <td><span class="stem">parl</span><span class="end">e</span></td>
              <td><span class="stem">aim</span><span class="end">e</span></td>
            </tr>
            <tr>
              <td class="person">tu</td>
              <td class="ending">-<strong>es</strong></td>
              <td><span class="stem">parl</span><span class="end">es</span></td>
              <td><span class="stem">aim</span><span class="end">es</span></td>
            </tr>
            <tr>
              <td class="person">il / elle</td>
              <td class="ending">-<strong>e</strong></td>
              <td><span class="stem">parl</span><span class="end">e</span></td>
              <td><span class="stem">aim</span><span class="end">e</span></td>
            </tr>
            <tr>
              <td class="person">nous</td>
              <td class="ending">-<strong>ons</strong></td>
              <td><span class="stem">parl</span><span class="end">ons</span></td>
              <td><span class="stem">aim</span><span class="end">ons</span></td>
            </tr>
            <tr>
              <td class="person">vous</td>
              <td class="ending">-<strong>ez</strong></td>
              <td><span class="stem">parl</span><span class="end">ez</span></td>
              <td><span class="stem">aim</span><span class="end">ez</span></td>
            </tr>
            <tr>
              <td class="person">ils / elles</td>
              <td class="ending">-<strong>ent</strong></td>
              <td><span class="stem">parl</span><span class="end">ent</span></td>
              <td><span class="stem">aim</span><span class="end">ent</span></td>
            </tr>
          </tbody>
        </table>

        <div class="example">
          Tu <strong class="hl-blue">parles</strong> très bien français.
        </div>
        <div class="example">
          Nous <strong class="hl-blue">aimons</strong> la musique.
        </div>
        <div class="example">
          Ils <strong class="hl-blue">travaillent</strong> beaucoup.
        </div>
      </article>

      <!-- ── À retenir ──────────────────────────────── -->
      <article>
        <div class="attention">
          Les formes <em>je, tu, il/elle</em> et <em>ils/elles</em> se
          prononcent de la même façon :
          <strong class="hl-blue">parl<span class="end">e</span></strong>,
          <strong class="hl-blue">parl<span class="end">es</span></strong>,
          <strong class="hl-blue">parl<span class="end">ent</span></strong>
          → toutes sonnent « parl ».
          Le <span class="end">-s</span> et le <span class="end">-ent</span> finaux sont muets.
        </div>
      </article>

      <!-- ── Exception -GER ────────────────────────── -->
      <article>
        <div class="exception">
          <strong>Verbes en <span class="hl-red">-GER</span></strong>
          (manger, nager, voyager…) : on ajoute un <strong class="hl-red">e</strong>
          avant <strong>-ons</strong> pour conserver le son doux du
          <strong class="hl-red">G</strong>.
        </div>
        <div class="example exception-ex">
          nous mang<strong class="hl-red">e</strong>ons
          <span class="sep">·</span>
          nous nag<strong class="hl-red">e</strong>ons
          <span class="sep">·</span>
          nous voyag<strong class="hl-red">e</strong>ons
        </div>
        <div class="exception" style="margin-top: 0.75rem;">
          <strong>Verbes en <span class="hl-red">-CER</span></strong>
          (commencer, placer…) : la cédille remplace le
          <strong class="hl-red">C</strong> devant <strong>-ons</strong>.
        </div>
        <div class="example exception-ex">
          nous commen<strong class="hl-red">ç</strong>ons
          <span class="sep">·</span>
          nous pla<strong class="hl-red">ç</strong>ons
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

/* ── Inline helpers ────────────────────────────── */
.hl-blue { color: var(--clr-blue);     font-weight: 700; }
.hl-red  { color: var(--clr-red);      font-weight: 700; }

/* Variable ending — red throughout */
.end     { color: var(--clr-red); }

/* Invariable stem — blue throughout */
.stem    { color: var(--clr-blue); font-weight: 600; }

/* ── Verb pills (infinitive showcase) ──────────── */
.verb-examples {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-top: 1rem;
}

.verb-pill {
  padding: 0.25rem 0.65rem;
  border: 1px solid var(--clr-border);
  border-radius: 99px;
  font-family: var(--font-serif);
  font-size: 0.9rem;
  color: var(--clr-ink);
  background: var(--clr-page);
}

.inf-end {
  color: var(--clr-red);
  font-weight: 700;
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

.arrow-inline {
  color: var(--clr-blue-mid);
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
  color: var(--text-on-accent);
  padding: 0.5rem 0.75rem;
  text-align: left;
  font-family: var(--font-sans);
  font-weight: 700;
  font-size: 0.72rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

th.col-end {
  background: var(--clr-blue-dark);
}

.th-end {
  color: rgba(255, 255, 255, 0.6);
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

td.ending {
  font-family: var(--font-mono);
  font-size: 0.88rem;
  color: var(--clr-red);
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

.sep {
  color: var(--clr-border);
  margin: 0 0.25rem;
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
