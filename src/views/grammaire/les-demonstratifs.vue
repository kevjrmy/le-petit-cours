<!-- view-meta: created=2026-08-10; updated=2026-08-10 -->
<template>
  <AltLayout title="Les démonstratifs">
    <main class="lesson">

      <!-- ── Règle ─────────────────────────────────── -->
      <article>
        <div class="rule">
          Les démonstratifs servent à <strong class="hl-blue">montrer</strong> quelque chose ou
          quelqu'un&nbsp;: <em>ce livre</em>, <em>cette femme</em>. Ils s'accordent avec le nom
          qu'ils accompagnent.
        </div>
        <div class="attention">
          💡 <strong>Tip para hispanohablantes&nbsp;:</strong> el español tiene tres grados
          (<em>este / ese / aquel</em>). El francés tiene <strong class="hl-red">uno solo</strong>&nbsp;:
          <strong>ce</strong> sirve para todo. Es más fácil de lo que crees&nbsp;— y si de verdad
          necesitas marcar la distancia, se añade <strong>-ci</strong> o <strong>-là</strong>.
        </div>
      </article>

      <!-- ── Les déterminants ───────────────────────── -->
      <article>
        <h2>1. Les déterminants démonstratifs</h2>
        <p class="method">
          Ils se placent <strong>devant le nom</strong>, à la place de l'article.
        </p>

        <table>
          <caption class="sr-only">Formes des déterminants démonstratifs</caption>
          <thead>
            <tr>
              <th>Forme</th>
              <th>S'utilise devant</th>
              <th>Exemple</th>
              <th>Traducción (ES)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="aux">ce</td>
              <td class="person">masculin singulier</td>
              <td><strong>ce</strong> livre</td>
              <td class="translation">este libro</td>
            </tr>
            <tr>
              <td class="aux">cet</td>
              <td class="person">masc. sing. devant voyelle ou h muet</td>
              <td><strong>cet</strong> homme, <strong>cet</strong> ami</td>
              <td class="translation">este hombre, este amigo</td>
            </tr>
            <tr>
              <td class="aux">cette</td>
              <td class="person">féminin singulier</td>
              <td><strong>cette</strong> maison</td>
              <td class="translation">esta casa</td>
            </tr>
            <tr>
              <td class="aux">ces</td>
              <td class="person">pluriel (masc. et fém.)</td>
              <td><strong>ces</strong> enfants</td>
              <td class="translation">estos niños</td>
            </tr>
          </tbody>
        </table>

        <div class="attention">
          <strong>cet</strong> et <strong>cette</strong> se prononcent <strong>exactement pareil</strong>.
          Seule l'orthographe change&nbsp;: <em>cet</em> est masculin, <em>cette</em> est féminin.
        </div>
      </article>

      <!-- ── -ci / -là ──────────────────────────────── -->
      <article>
        <h2>2. Marquer la distance&nbsp;: -ci et -là</h2>
        <p class="method">
          Pour opposer deux choses, on ajoute un trait d'union et
          <strong class="hl-blue">-ci</strong> (près) ou <strong class="hl-blue">-là</strong> (loin).
        </p>

        <div class="example">
          <strong>Ce</strong> gâteau<strong class="hl-blue">-ci</strong> est au chocolat,
          <strong>ce</strong> gâteau<strong class="hl-blue">-là</strong> est à la fraise.
          <span class="note">(Este pastel… aquel pastel…)</span>
        </div>
        <p class="method">
          Dans la vie de tous les jours, on dit très souvent <strong>-là</strong> même pour
          quelque chose de proche&nbsp;: <em>Je prends ce livre-là</em>.
        </p>
      </article>

      <!-- ── Les pronoms ────────────────────────────── -->
      <article>
        <h2>3. Les pronoms démonstratifs</h2>
        <p class="method">
          Ils remplacent le nom pour ne pas le répéter&nbsp;: <em>celui</em>, <em>celle</em>,
          <em>ceux</em>, <em>celles</em>.
        </p>

        <table>
          <caption class="sr-only">Formes des pronoms démonstratifs</caption>
          <thead>
            <tr>
              <th>Masc. sing.</th>
              <th>Fém. sing.</th>
              <th>Masc. plur.</th>
              <th>Fém. plur.</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="aux">celui</td>
              <td class="aux">celle</td>
              <td class="aux">ceux</td>
              <td class="aux">celles</td>
            </tr>
          </tbody>
        </table>

        <div class="example">
          Quel manteau&nbsp;? <strong class="hl-blue">Celui</strong> de Marie.
          <span class="sep">·</span>
          J'aime ces photos, surtout <strong class="hl-blue">celles</strong>-là.
        </div>
      </article>

      <!-- ── Exception ──────────────────────────────── -->
      <article>
        <div class="exception">
          <strong>Ne confondez pas «&nbsp;ces&nbsp;» et «&nbsp;ses&nbsp;»</strong>&nbsp;: ils se
          prononcent pareil mais ne veulent pas dire la même chose.
          <strong class="hl-red">ces</strong> = je montre&nbsp;;
          <strong class="hl-red">ses</strong> = ça appartient à quelqu'un.
        </div>
        <div class="example exception-ex">
          <strong class="hl-red">ces</strong> livres <span class="note">(estos libros)</span>
          <span class="sep">·</span>
          <strong class="hl-red">ses</strong> livres <span class="note">(sus libros)</span>
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
