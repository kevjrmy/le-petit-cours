<!-- view-meta: created=2026-08-02; updated=2026-08-02 -->
<template>
  <AltLayout title="Les déterminants possessifs">
    <main class="lesson">

      <article>
        <div class="rule">
          Le déterminant possessif se place devant un nom pour indiquer à qui
          appartient quelque chose. Il s'accorde en <strong class="hl-blue">genre</strong> et en
          <strong class="hl-blue">nombre</strong> avec le <strong class="hl-blue">nom qu'il accompagne</strong>,
          <em>pas</em> avec le <strong class="hl-red">possesseur</strong>.
        </div>

        <table>
          <caption class="sr-only">Tableau des déterminants possessifs</caption>
          <thead>
            <tr>
              <th>Personne</th>
              <th class="col-m">Masc. singulier</th>
              <th class="col-f">Fém. singulier</th>
              <th class="col-pl">Pluriel</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="person">je</td>
              <td><strong>m<span class="end">on</span></strong></td>
              <td><strong>m<span class="end">a</span></strong></td>
              <td><strong>m<span class="end">es</span></strong></td>
            </tr>
            <tr>
              <td class="person">tu</td>
              <td><strong>t<span class="end">on</span></strong></td>
              <td><strong>t<span class="end">a</span></strong></td>
              <td><strong>t<span class="end">es</span></strong></td>
            </tr>
            <tr>
              <td class="person">il / elle</td>
              <td><strong>s<span class="end">on</span></strong></td>
              <td><strong>s<span class="end">a</span></strong></td>
              <td><strong>s<span class="end">es</span></strong></td>
            </tr>
            <tr>
              <td class="person">nous</td>
              <td><strong>notre</strong></td>
              <td><strong>notre</strong></td>
              <td><strong>n<span class="end">os</span></strong></td>
            </tr>
            <tr>
              <td class="person">vous</td>
              <td><strong>votre</strong></td>
              <td><strong>votre</strong></td>
              <td><strong>v<span class="end">os</span></strong></td>
            </tr>
            <tr>
              <td class="person">ils / elles</td>
              <td><strong>leur</strong></td>
              <td><strong>leur</strong></td>
              <td><strong>leur<span class="end">s</span></strong></td>
            </tr>
          </tbody>
        </table>
      </article>

      <article>
        <h2>Exemples</h2>
        <div class="example">
          C'est <strong class="hl-blue">mon</strong> livre.
          <span class="note">(masc. sing. — <em>je</em>)</span>
        </div>
        <div class="example">
          Je cherche <strong class="hl-blue">ma</strong> clé.
          <span class="note">(fém. sing. — <em>je</em>)</span>
        </div>
        <div class="example">
          Où sont <strong class="hl-blue">mes</strong> chaussures ?
          <span class="note">(pluriel — <em>je</em>)</span>
        </div>
        <div class="example">
          <strong class="hl-blue">Notre</strong> professeur est patient.
          <span class="note">(sing. — <em>nous</em>)</span>
        </div>
      </article>

      <article>
        <div class="attention">
          Devant un nom féminin commençant par une <mark>voyelle</mark> ou un
          <mark>h muet</mark>, on utilise <strong class="hl-red">mon, ton, son</strong>
          — et non <span class="crossed">ma, ta, sa</span>.
        </div>
        <div class="example exception-ex">
          <strong class="hl-red">mon</strong> amie
          <span class="sep">·</span>
          <strong class="hl-red">ton</strong> école
          <span class="sep">·</span>
          <strong class="hl-red">son</strong> histoire
        </div>
      </article>

      <RelatedLinks />
    </main>
  </AltLayout>
</template>

<script setup>
import AltLayout from '@/layouts/AltLayout.vue'
import RelatedLinks from '@/components/RelatedLinks.vue'
</script>

<style scoped>
.lesson {
  gap: 1rem;
}

/* ── Inline typography helpers ─────────────────── */
.hl-blue { color: var(--clr-blue); font-weight: 700; }
.hl-red  { color: var(--clr-red);  font-weight: 700; }

.end {
  color: var(--clr-red);
}

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

.crossed {
  text-decoration: line-through;
  color: var(--clr-ink-soft);
}

.sep {
  color: var(--clr-border);
  margin: 0 0.25rem;
}

/* ── Table ─────────────────────────────────────── */
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
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

th.col-m  { background: var(--clr-blue); }
th.col-f  { background: var(--clr-blue-dark); }
th.col-pl { background: var(--clr-blue-mid); }

td {
  padding: 0.45rem 0.75rem;
  border-bottom: 1px solid var(--clr-border-soft);
  color: var(--clr-ink);
}

td.person {
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

/* ── Examples spacing ──────────────────────────── */
.example + .example {
  margin-top: 0.5rem;
}

.exception-ex {
  margin-top: 0.75rem;
  letter-spacing: 0.01em;
}

/* ── Download button ───────────────────────────── */
</style>
