<!-- view-meta: created=2026-08-02; updated=2026-08-02 -->
<template>
  <AltLayout title="Les verbes du 2ème groupe">
    <main class="lesson">

      <!-- ── Règle ─────────────────────────────────── -->
      <article>
        <div class="rule">
          Les verbes du <strong class="hl-blue">2<sup>ème</sup> groupe</strong> ont un infinitif
          qui se termine en <strong class="hl-red">-IR</strong>
          et un participe présent en <strong class="hl-red">-ISSANT</strong>
          (fin<strong class="hl-red">issant</strong>).
          C'est un groupe régulier d'environ <strong class="hl-blue">300</strong> verbes.
        </div>

        <div class="verb-examples">
          <span class="verb-pill">fin<span class="inf-end">ir</span></span>
          <span class="verb-pill">chois<span class="inf-end">ir</span></span>
          <span class="verb-pill">grand<span class="inf-end">ir</span></span>
          <span class="verb-pill">réuss<span class="inf-end">ir</span></span>
          <span class="verb-pill">roug<span class="inf-end">ir</span></span>
          <span class="verb-pill">obé<span class="inf-end">ir</span></span>
          <span class="verb-pill">rempl<span class="inf-end">ir</span></span>
          <span class="verb-pill">applaud<span class="inf-end">ir</span></span>
        </div>
      </article>

      <!-- ── Conjugaison ────────────────────────────── -->
      <article>
        <h2>La conjugaison au présent</h2>
        <p class="method">
          Retirez <strong class="hl-red">-IR</strong> pour obtenir le
          <strong class="hl-blue">radical</strong>, puis ajoutez la terminaison.
          Au pluriel, on intercale <strong class="hl-red">-ISS-</strong>.
        </p>
        <p class="method-example">
          <strong>fin<span class="hl-red">ir</span></strong>
          <span class="arrow-inline" aria-hidden="true">→</span>
          radical <strong class="hl-blue">fin-</strong>
          <span class="arrow-inline" aria-hidden="true">+</span>
          terminaison
        </p>

        <table>
          <caption class="sr-only">Conjugaison des verbes du 2ème groupe au présent</caption>
          <thead>
            <tr>
              <th>Pronom</th>
              <th class="col-end">Terminaison</th>
              <th>fin<span class="th-end">ir</span></th>
              <th>chois<span class="th-end">ir</span></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="person">je / j'</td>
              <td class="ending">-<strong>is</strong></td>
              <td><span class="stem">fin</span><span class="end">is</span></td>
              <td><span class="stem">chois</span><span class="end">is</span></td>
            </tr>
            <tr>
              <td class="person">tu</td>
              <td class="ending">-<strong>is</strong></td>
              <td><span class="stem">fin</span><span class="end">is</span></td>
              <td><span class="stem">chois</span><span class="end">is</span></td>
            </tr>
            <tr>
              <td class="person">il / elle</td>
              <td class="ending">-<strong>it</strong></td>
              <td><span class="stem">fin</span><span class="end">it</span></td>
              <td><span class="stem">chois</span><span class="end">it</span></td>
            </tr>
            <tr>
              <td class="person">nous</td>
              <td class="ending">-<strong>issons</strong></td>
              <td><span class="stem">fin</span><span class="end">issons</span></td>
              <td><span class="stem">chois</span><span class="end">issons</span></td>
            </tr>
            <tr>
              <td class="person">vous</td>
              <td class="ending">-<strong>issez</strong></td>
              <td><span class="stem">fin</span><span class="end">issez</span></td>
              <td><span class="stem">chois</span><span class="end">issez</span></td>
            </tr>
            <tr>
              <td class="person">ils / elles</td>
              <td class="ending">-<strong>issent</strong></td>
              <td><span class="stem">fin</span><span class="end">issent</span></td>
              <td><span class="stem">chois</span><span class="end">issent</span></td>
            </tr>
          </tbody>
        </table>

        <div class="example">
          Je <strong class="hl-blue">finis</strong> mes devoirs.
        </div>
        <div class="example">
          Nous <strong class="hl-blue">choisissons</strong> un cadeau.
        </div>
        <div class="example">
          Les enfants <strong class="hl-blue">grandissent</strong> vite.
        </div>
      </article>

      <!-- ── À retenir ──────────────────────────────── -->
      <article>
        <div class="attention">
          On reconnaît un verbe du 2<sup>ème</sup> groupe à sa forme
          <em>nous</em> en <strong class="hl-blue">-issons</strong> et à son participe
          présent en <strong class="hl-blue">-issant</strong>
          (<strong class="hl-blue">fin<span class="end">issant</span></strong>).
          C'est ce <strong class="hl-red">-iss-</strong> qui le distingue des verbes en
          <strong>-IR</strong> du 3<sup>ème</sup> groupe.
        </div>
      </article>

      <!-- ── Exception : faux 2ème groupe ──────────── -->
      <article>
        <div class="exception">
          <strong>Attention :</strong> tous les verbes en <span class="hl-red">-IR</span>
          ne sont pas du 2<sup>ème</sup> groupe. Certains appartiennent au
          <strong class="hl-red">3<sup>ème</sup> groupe</strong> et n'ont pas le
          <strong class="hl-red">-iss-</strong> :
        </div>
        <div class="example exception-ex">
          partir → nous part<strong class="hl-red">ons</strong>
          <span class="sep">·</span>
          venir → nous ven<strong class="hl-red">ons</strong>
          <span class="sep">·</span>
          dormir → nous dorm<strong class="hl-red">ons</strong>
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
