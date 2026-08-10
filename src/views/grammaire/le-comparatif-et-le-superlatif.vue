<!-- view-meta: created=2026-08-10; updated=2026-08-10 -->
<template>
  <AltLayout title="Le comparatif et le superlatif">
    <main class="lesson">

      <!-- ── Règle ─────────────────────────────────── -->
      <article>
        <div class="rule">
          Pour comparer, on encadre l'adjectif&nbsp;: <strong class="hl-blue">plus</strong>,
          <strong class="hl-blue">moins</strong> ou <strong class="hl-blue">aussi</strong>
          devant, et <strong class="hl-blue">que</strong> après.
        </div>
        <div class="attention">
          💡 <strong>Tip para hispanohablantes&nbsp;:</strong> la estructura es idéntica a
          <em>más… que</em> / <em>menos… que</em>. El único punto nuevo&nbsp;: para decir
          <em>tan… como</em>, el francés usa <strong class="hl-red">aussi… que</strong> —
          se repite <strong>que</strong>, no aparece «&nbsp;comme&nbsp;».
        </div>
      </article>

      <!-- ── Comparatif ─────────────────────────────── -->
      <article>
        <h2>1. Le comparatif</h2>
        <p class="method-example">
          <strong>plus / moins / aussi</strong>
          <span class="arrow-inline" aria-hidden="true">+</span>
          <strong>adjectif</strong>
          <span class="arrow-inline" aria-hidden="true">+</span>
          <strong>que</strong>
        </p>

        <table>
          <caption class="sr-only">Les trois degrés du comparatif</caption>
          <thead>
            <tr>
              <th>Degré</th>
              <th>Exemple</th>
              <th>Traducción (ES)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="aux">Supériorité</td>
              <td>Paul est <strong>plus</strong> grand <strong>que</strong> Marc.</td>
              <td class="translation">Paul es más alto que Marc.</td>
            </tr>
            <tr>
              <td class="aux">Infériorité</td>
              <td>Paul est <strong>moins</strong> grand <strong>que</strong> Marc.</td>
              <td class="translation">Paul es menos alto que Marc.</td>
            </tr>
            <tr>
              <td class="aux">Égalité</td>
              <td>Paul est <strong>aussi</strong> grand <strong>que</strong> Marc.</td>
              <td class="translation">Paul es tan alto como Marc.</td>
            </tr>
          </tbody>
        </table>

        <p class="method">
          Avec un <strong>nom</strong>, on ajoute <strong>de</strong>, et
          <em>aussi</em> devient <strong class="hl-blue">autant</strong>&nbsp;:
        </p>
        <div class="example">
          J'ai <strong class="hl-blue">plus de</strong> livres <strong>que</strong> toi.
          <span class="sep">·</span>
          Il a <strong class="hl-blue">autant de</strong> travail <strong>que</strong> moi.
        </div>
      </article>

      <!-- ── Superlatif ─────────────────────────────── -->
      <article>
        <h2>2. Le superlatif</h2>
        <p class="method">
          On ajoute l'<strong>article défini</strong> devant le comparatif. Le complément est
          introduit par <strong class="hl-blue">de</strong> — et non par «&nbsp;dans&nbsp;».
        </p>

        <table>
          <caption class="sr-only">Formation du superlatif</caption>
          <thead>
            <tr>
              <th>Construction</th>
              <th>Exemple</th>
              <th>Traducción (ES)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="aux">le / la / les plus</td>
              <td>C'est <strong>le plus</strong> beau jour <strong>de</strong> ma vie.</td>
              <td class="translation">Es el día más bonito de mi vida.</td>
            </tr>
            <tr>
              <td class="aux">le / la / les moins</td>
              <td>C'est <strong>la moins</strong> chère <strong>du</strong> magasin.</td>
              <td class="translation">Es la menos cara de la tienda.</td>
            </tr>
          </tbody>
        </table>

        <div class="example">
          Marie est <strong class="hl-blue">la plus</strong> sportive <strong>de</strong> la classe.
          <span class="note">(Marie es la más deportista de la clase)</span>
        </div>
      </article>

      <!-- ── Exception ──────────────────────────────── -->
      <article>
        <div class="exception">
          <strong>Deux formes irrégulières</strong> — comme en espagnol avec
          <em>bueno / mejor</em>. On ne dit <strong class="hl-red">jamais</strong>
          «&nbsp;plus bon&nbsp;» ni «&nbsp;plus bien&nbsp;».
        </div>
        <div class="example exception-ex">
          bon <span class="arrow-inline">→</span> <strong class="hl-red">meilleur</strong>
          <span class="note">(mejor — adjectif)</span>
          <span class="sep">·</span>
          Ce gâteau est <strong class="hl-red">meilleur</strong> que l'autre.
        </div>
        <div class="example exception-ex">
          bien <span class="arrow-inline">→</span> <strong class="hl-red">mieux</strong>
          <span class="note">(mejor — adverbe)</span>
          <span class="sep">·</span>
          Elle chante <strong class="hl-red">mieux</strong> que moi.
        </div>
        <div class="attention">
          <strong>meilleur</strong> accompagne un nom (<em>un meilleur café</em>)&nbsp;;
          <strong>mieux</strong> accompagne un verbe (<em>travailler mieux</em>).
          <em>Mauvais</em> a aussi <em>pire</em>, mais «&nbsp;plus mauvais&nbsp;» reste correct.
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
