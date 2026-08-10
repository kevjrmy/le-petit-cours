<!-- view-meta: created=2026-08-02; updated=2026-08-02 -->
<template>
  <AltLayout title="Les pronoms possessifs">
    <main class="lesson">

      <article>
        <div class="rule">
          Le pronom possessif <strong class="hl-blue">remplace</strong> un groupe nominal
          (déterminant&nbsp;+&nbsp;nom) déjà mentionné. Il s'accorde en
          <strong class="hl-blue">genre</strong> et en <strong class="hl-blue">nombre</strong>
          avec le <strong class="hl-blue">nom qu'il remplace</strong>.
        </div>

        <table>
          <caption class="sr-only">Tableau des pronoms possessifs</caption>
          <thead>
            <tr>
              <th>Personne</th>
              <th class="col-m">Masc. sing.</th>
              <th class="col-f">Fém. sing.</th>
              <th class="col-mp">Masc. pl.</th>
              <th class="col-fp">Fém. pl.</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="person">je</td>
              <td><span class="art">le</span> <strong>mien</strong></td>
              <td><span class="art">la</span> <strong>mien<span class="end">ne</span></strong></td>
              <td><span class="art">les</span> <strong>mien<span class="end">s</span></strong></td>
              <td><span class="art">les</span> <strong>mien<span class="end">nes</span></strong></td>
            </tr>
            <tr>
              <td class="person">tu</td>
              <td><span class="art">le</span> <strong>tien</strong></td>
              <td><span class="art">la</span> <strong>tien<span class="end">ne</span></strong></td>
              <td><span class="art">les</span> <strong>tien<span class="end">s</span></strong></td>
              <td><span class="art">les</span> <strong>tien<span class="end">nes</span></strong></td>
            </tr>
            <tr>
              <td class="person">il / elle</td>
              <td><span class="art">le</span> <strong>sien</strong></td>
              <td><span class="art">la</span> <strong>sien<span class="end">ne</span></strong></td>
              <td><span class="art">les</span> <strong>sien<span class="end">s</span></strong></td>
              <td><span class="art">les</span> <strong>sien<span class="end">nes</span></strong></td>
            </tr>
            <tr>
              <td class="person">nous</td>
              <td><span class="art">le</span> <strong>n<span class="circ">ô</span>tre</strong></td>
              <td><span class="art">la</span> <strong>n<span class="circ">ô</span>tre</strong></td>
              <td colspan="2"><span class="art">les</span> <strong>n<span class="circ">ô</span>tres</strong></td>
            </tr>
            <tr>
              <td class="person">vous</td>
              <td><span class="art">le</span> <strong>v<span class="circ">ô</span>tre</strong></td>
              <td><span class="art">la</span> <strong>v<span class="circ">ô</span>tre</strong></td>
              <td colspan="2"><span class="art">les</span> <strong>v<span class="circ">ô</span>tres</strong></td>
            </tr>
            <tr>
              <td class="person">ils / elles</td>
              <td><span class="art">le</span> <strong>leur</strong></td>
              <td><span class="art">la</span> <strong>leur</strong></td>
              <td colspan="2"><span class="art">les</span> <strong>leurs</strong></td>
            </tr>
          </tbody>
        </table>
      </article>

      <article>
        <h2>Comment l'utiliser</h2>
        <p>On remplace le <strong class="hl-blue">déterminant possessif + nom</strong> par le <strong class="hl-red">pronom possessif</strong> correspondant.</p>

        <div class="example">
          C'est <strong class="hl-blue">mon</strong> livre.
          <span class="arrow" aria-hidden="true">→</span>
          C'est <strong class="hl-red">le mien</strong>.
        </div>
        <div class="example">
          C'est <strong class="hl-blue">ta</strong> clé.
          <span class="arrow" aria-hidden="true">→</span>
          C'est <strong class="hl-red">la tienne</strong>.
        </div>
        <div class="example">
          Ce sont <strong class="hl-blue">vos</strong> affaires.
          <span class="arrow" aria-hidden="true">→</span>
          Ce sont <strong class="hl-red">les vôtres</strong>.
        </div>
      </article>

      <article>
        <div class="attention">
          Pour <strong class="hl-blue">nous</strong> et <strong class="hl-blue">vous</strong>,
          le singulier distingue le genre (<em>le n<span class="circ">ô</span>tre</em> /
          <em>la n<span class="circ">ô</span>tre</em>), mais le pluriel est
          invariable (<em>les n<span class="circ">ô</span>tres</em>).
          Pensez à l'accent : <strong class="circ-demo">n<span class="circ">ô</span>tre</strong>,
          <strong class="circ-demo">v<span class="circ">ô</span>tre</strong>
          — sans accent au pluriel : <em>les nôtres, les vôtres</em> conservent le&nbsp;<span class="circ">ô</span>.
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

/* Article (le/la/les) — structural, lighter */
.art {
  color: var(--clr-blue-mid);
  font-weight: 400;
}

/* Variable ending highlight */
.end {
  color: var(--clr-red);
}

/* Circumflex accent — always draw the eye */
.circ {
  color: var(--clr-red);
  font-weight: 700;
}

.circ-demo {
  font-size: 1.05em;
  color: var(--clr-ink);
}

/* ── Table ─────────────────────────────────────── */
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
  font-size: 0.88rem;
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
  padding: 0.45rem 0.6rem;
  text-align: left;
  font-family: var(--font-sans);
  font-weight: 700;
  font-size: 0.72rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

th.col-m  { background: var(--clr-blue); }
th.col-f  { background: var(--clr-blue-dark); }
th.col-mp { background: var(--clr-blue-mid); }
th.col-fp { background: var(--clr-blue-mid); opacity: 0.85; }

td {
  padding: 0.4rem 0.6rem;
  border-bottom: 1px solid var(--clr-border-soft);
  color: var(--clr-ink);
}

td.person {
  color: var(--clr-ink-mid);
  font-size: 0.82rem;
  font-style: italic;
  white-space: nowrap;
}

tr:last-child td {
  border-bottom: none;
}

tr:nth-child(even) td {
  background: var(--clr-blue-light);
}

/* ── Examples ──────────────────────────────────── */
.example {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.example + .example {
  margin-top: 0.5rem;
}

.arrow {
  color: var(--clr-blue-mid);
  font-size: 1rem;
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
