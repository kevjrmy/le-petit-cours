<!-- view-meta: created=2026-08-03; updated=2026-08-03 -->
<template>
  <AltLayout title="Les homophones grammaticaux">
    <main class="lesson">

      <!-- ── Règle principale ───────────────────────── -->
      <article>
        <div class="rule">
          Les <strong class="hl-blue">homophones grammaticaux</strong> sont des mots qui se prononcent de la même façon mais qui s'écrivent différemment et n'ont pas le même rôle dans la phrase.
          <br><br>
          <strong class="hl-blue">Astuce essentielle :</strong> Pour trouver la bonne orthographe, essayez de <strong class="hl-red">changer le temps de la phrase</strong> (par exemple, à l'imparfait : <em>avait, était, étaient</em>).
        </div>
      </article>

      <!-- ── 1. a / à ───────────────────────────────── -->
      <article>
        <h2>1. a / à</h2>
        <div class="example">
          <strong>a</strong> (sans accent) = verbe <em>avoir</em>. On peut le remplacer par <strong class="hl-blue">avait</strong>.
          <br>
          <span class="ex-detail">Il <strong class="hl-blue">a</strong> un nouveau vélo. → Il <strong class="hl-blue">avait</strong> un nouveau vélo. <em>(Él tiene una bicicleta nueva)</em></span>
        </div>
        <div class="example">
          <strong>à</strong> (avec accent grave) = préposition. On <strong class="hl-red">ne peut pas</strong> le remplacer par <em>avait</em>.
          <br>
          <span class="ex-detail">Je vais <strong class="hl-blue">à</strong> Paris <strong class="hl-blue">à</strong> 8 heures. <em>(Voy a París a las 8)</em></span>
        </div>
      </article>

      <!-- ── 2. est / et ────────────────────────────── -->
      <article>
        <h2>2. est / et</h2>
        <div class="example">
          <strong>est</strong> = verbe <em>être</em> (3<sup>e</sup> personne). On peut le remplacer par <strong class="hl-blue">était</strong>.
          <br>
          <span class="ex-detail">Le professeur <strong class="hl-blue">est</strong> gentil. → Le professeur <strong class="hl-blue">était</strong> gentil. <em>(El profesor es amable)</em></span>
        </div>
        <div class="example">
          <strong>et</strong> = mot de liaison (corresponde a la <em>y</em> en español). On peut le remplacer par <strong class="hl-blue">et puis</strong>.
          <br>
          <span class="ex-detail">J'aime les pommes <strong class="hl-blue">et</strong> les bananes. <em>(Me gustan las manzanas y los plátanos)</em></span>
        </div>
      </article>

      <!-- ── 3. son / sont ──────────────────────────── -->
      <article>
        <h2>3. son / sont</h2>
        <div class="example">
          <strong>son</strong> = déterminant possessif <em>(su)</em>. On peut le remplacer par <strong class="hl-blue">mon</strong> ou <strong class="hl-blue">ton</strong>.
          <br>
          <span class="ex-detail">Lucas a perdu <strong class="hl-blue">son</strong> sac. → Lucas a perdu <strong class="hl-blue">mon</strong> sac. <em>(Lucas perdió su bolsa)</em></span>
        </div>
        <div class="example">
          <strong>sont</strong> = verbe <em>être</em> au pluriel. On peut le remplacer par <strong class="hl-blue">étaient</strong>.
          <br>
          <span class="ex-detail">Ils <strong class="hl-blue">sont</strong> très fatigués. → Ils <strong class="hl-blue">étaient</strong> très fatigués. <em>(Ellos están muy cansados)</em></span>
        </div>
      </article>

      <!-- ── 4. ou / où ─────────────────────────────── -->
      <article>
        <h2>4. ou / où</h2>
        <div class="example">
          <strong>ou</strong> (sans accent) = choix <em>(o en español)</em>. On peut le remplacer par <strong class="hl-blue">ou bien</strong>.
          <br>
          <span class="ex-detail">Tu préfères le café <strong class="hl-blue">ou</strong> le thé ? <em>(¿Prefieres café o té?)</em></span>
        </div>
        <div class="example">
          <strong>où</strong> (avec accent grave) = lieu ou temps <em>(dónde / donde)</em>.
          <br>
          <span class="ex-detail"><strong class="hl-blue">Où</strong> habites-tu ? <em>(¿Dónde vives?)</em></span>
        </div>
      </article>

      <!-- ── Résumé rapide ──────────────────────────── -->
      <article>
        <div class="attention">
          <strong>Tableau récapitulatif des tests :</strong>
          <table>
            <caption class="sr-only">Règles de remplacement des homophones</caption>
            <thead>
              <tr>
                <th>Mot</th>
                <th>Nature</th>
                <th>Test de remplacement</th>
                <th>Exemple</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>a</strong></td>
                <td>verbe avoir</td>
                <td>remplacer par <strong>avait</strong></td>
                <td>Il <strong>a</strong> faim.</td>
              </tr>
              <tr>
                <td><strong>à</strong></td>
                <td>préposition</td>
                <td>impossible de mettre <em>avait</em></td>
                <td>Il habite <strong>à</strong> Lyon.</td>
              </tr>
              <tr>
                <td><strong>est</strong></td>
                <td>verbe être</td>
                <td>remplacer par <strong>était</strong></td>
                <td>Elle <strong>est</strong> ici.</td>
              </tr>
              <tr>
                <td><strong>et</strong></td>
                <td>liaison (y)</td>
                <td>remplacer par <strong>et puis</strong></td>
                <td>Un café <strong>et</strong> un croissant.</td>
              </tr>
              <tr>
                <td><strong>son</strong></td>
                <td>possessif (su)</td>
                <td>remplacer par <strong>mon / ton</strong></td>
                <td>C'est <strong>son</strong> chien.</td>
              </tr>
              <tr>
                <td><strong>sont</strong></td>
                <td>verbe être (pluriel)</td>
                <td>remplacer par <strong>étaient</strong></td>
                <td>Elles <strong>sont</strong> prêtes.</td>
              </tr>
            </tbody>
          </table>
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
.lesson {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.hl-blue { color: var(--clr-blue); font-weight: 700; }
.hl-red  { color: var(--clr-red);  font-weight: 700; }

h2 {
  font-family: var(--font-serif);
  font-size: 1.15rem;
  color: var(--clr-blue-dark);
  margin-top: 1rem;
  margin-bottom: 0.4rem;
}

.ex-detail {
  display: block;
  margin-top: 0.25rem;
  color: var(--clr-ink-mid);
  font-size: 0.93rem;
}

.ex-detail em {
  color: var(--clr-ink-soft);
  font-size: 0.88em;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 0.6rem;
  font-size: 0.9rem;
}

th {
  background: var(--clr-blue);
  color: var(--text-on-accent);
  text-align: left;
  padding: 0.45rem 0.65rem;
  font-weight: 600;
}

td {
  padding: 0.45rem 0.65rem;
  border-bottom: 1px solid var(--clr-border-soft);
}

tbody tr:nth-child(even) {
  background: var(--clr-blue-light);
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
  background: var(--clr-page);
  color: var(--clr-ink-soft);
  font-size: 0.72rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  cursor: pointer;
  transition: border-color 0.15s, color 0.15s;
}

.download-btn:hover {
  border-color: var(--clr-blue);
  color: var(--clr-blue);
}

@media print {
  .download-btn {
    display: none !important;
  }
}
</style>
