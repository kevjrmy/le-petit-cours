<!-- view-meta: created=2026-08-10; updated=2026-08-10 -->
<template>
  <AltLayout title="Le futur simple">
    <main class="lesson">

      <!-- ── Règle ─────────────────────────────────── -->
      <article>
        <div class="rule">
          Le <strong class="hl-blue">futur simple</strong> exprime une action à venir, plus
          lointaine ou moins sûre que le futur proche. On le forme avec
          l'<strong>infinitif</strong> + les terminaisons du verbe <em>avoir</em>.
        </div>
        <div class="attention">
          💡 <strong>Tip para hispanohablantes&nbsp;:</strong> se construye igual que tu futuro
          (<em>hablar + é = hablaré</em>). En francés&nbsp;: <em>parler + ai = je parlerai</em>.
          <strong>El infinitivo entero se queda</strong>, y siempre hay una
          <strong class="hl-blue">-r-</strong> antes de la terminación&nbsp;— ese es el sonido
          del futuro.
        </div>
      </article>

      <!-- ── Formation ──────────────────────────────── -->
      <article>
        <h2>1. La formation</h2>
        <p class="method-example">
          <strong>infinitif</strong>
          <span class="arrow-inline" aria-hidden="true">+</span>
          <strong class="hl-blue">-ai, -as, -a, -ons, -ez, -ont</strong>
        </p>

        <table>
          <caption class="sr-only">Conjugaison de deux verbes au futur simple</caption>
          <thead>
            <tr>
              <th>Pronom</th>
              <th>parler</th>
              <th>finir</th>
              <th>Traducción (ES)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="person">je</td>
              <td class="aux">parlerai</td>
              <td>finirai</td>
              <td class="translation">hablaré / terminaré</td>
            </tr>
            <tr>
              <td class="person">tu</td>
              <td class="aux">parleras</td>
              <td>finiras</td>
              <td class="translation">hablarás</td>
            </tr>
            <tr>
              <td class="person">il / elle / on</td>
              <td class="aux">parlera</td>
              <td>finira</td>
              <td class="translation">hablará</td>
            </tr>
            <tr>
              <td class="person">nous</td>
              <td class="aux">parlerons</td>
              <td>finirons</td>
              <td class="translation">hablaremos</td>
            </tr>
            <tr>
              <td class="person">vous</td>
              <td class="aux">parlerez</td>
              <td>finirez</td>
              <td class="translation">hablaréis</td>
            </tr>
            <tr>
              <td class="person">ils / elles</td>
              <td class="aux">parleront</td>
              <td>finiront</td>
              <td class="translation">hablarán</td>
            </tr>
          </tbody>
        </table>

        <div class="attention">
          Pour les verbes en <strong>-re</strong>, on enlève le <strong class="hl-red">-e</strong>
          final avant d'ajouter la terminaison&nbsp;: <em>prendre</em> → je
          <strong class="hl-blue">prendrai</strong>, <em>boire</em> → je <strong class="hl-blue">boirai</strong>.
        </div>
      </article>

      <!-- ── Futur proche ou futur simple ────────────── -->
      <article>
        <h2>2. Futur proche ou futur simple&nbsp;?</h2>

        <table>
          <caption class="sr-only">Différence entre le futur proche et le futur simple</caption>
          <thead>
            <tr>
              <th>Futur proche</th>
              <th>Futur simple</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>bientôt, déjà décidé</td>
              <td>plus loin, moins sûr</td>
            </tr>
            <tr>
              <td>à l'oral, tous les jours</td>
              <td>à l'écrit, projets, promesses</td>
            </tr>
            <tr>
              <td>Je <strong>vais partir</strong> demain.</td>
              <td>Un jour, je <strong>partirai</strong> au Canada.</td>
            </tr>
          </tbody>
        </table>

        <div class="example">
          Quand j'aurai le temps, je te <strong class="hl-blue">téléphonerai</strong>.
          <span class="note">(Cuando tenga tiempo, te llamaré)</span>
        </div>
      </article>

      <!-- ── Exceptions ─────────────────────────────── -->
      <article>
        <div class="exception">
          <strong>Les radicaux irréguliers.</strong> Une dizaine de verbes très fréquents changent
          de radical — mais les <strong>terminaisons restent toujours les mêmes</strong>.
          Il faut les apprendre par cœur.
        </div>
        <div class="example exception-ex">
          être → je <strong class="hl-red">ser</strong>ai
          <span class="sep">·</span>
          avoir → j'<strong class="hl-red">aur</strong>ai
          <span class="sep">·</span>
          aller → j'<strong class="hl-red">ir</strong>ai
          <span class="sep">·</span>
          faire → je <strong class="hl-red">fer</strong>ai
        </div>
        <div class="example exception-ex">
          venir → je <strong class="hl-red">viendr</strong>ai
          <span class="sep">·</span>
          voir → je <strong class="hl-red">verr</strong>ai
          <span class="sep">·</span>
          pouvoir → je <strong class="hl-red">pourr</strong>ai
          <span class="sep">·</span>
          vouloir → je <strong class="hl-red">voudr</strong>ai
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
