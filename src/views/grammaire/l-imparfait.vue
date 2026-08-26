<!-- view-meta: created=2026-08-10; updated=2026-08-10 -->
<template>
  <AltLayout title="L'imparfait">
    <main class="lesson">

      <!-- ── Règle ─────────────────────────────────── -->
      <article>
        <div class="rule">
          L'<strong class="hl-blue">imparfait</strong> est un temps du passé. Il décrit une situation,
          une habitude ou une action qui <strong>durait</strong>, sans dire quand elle a commencé
          ni quand elle a fini.
        </div>
        <div class="attention">
          💡 <strong>Tip para hispanohablantes&nbsp;:</strong> el <em>imparfait</em> es exactamente
          tu <strong class="hl-blue">pretérito imperfecto</strong> (<em>hablaba, comía, vivía</em>).
          Se usa igual y casi siempre se traduce igual. Es de los temas más fáciles del francés
          para ti&nbsp;: lo que tienes que aprender son las <strong>terminaciones</strong>.
        </div>
      </article>

      <!-- ── Formation ──────────────────────────────── -->
      <article>
        <h2>1. La formation</h2>
        <p class="method">
          On prend le verbe conjugué à la 1<sup>re</sup> personne du pluriel du présent
          (<strong>nous</strong>), on enlève <strong>-ons</strong>, et on ajoute les terminaisons.
        </p>
        <p class="method-example">
          <strong>nous parl<span class="hl-red">ons</span></strong>
          <span class="arrow-inline" aria-hidden="true">→</span>
          <strong>parl-</strong>
          <span class="arrow-inline" aria-hidden="true">+</span>
          <strong class="hl-blue">-ais, -ais, -ait, -ions, -iez, -aient</strong>
        </p>

        <table>
          <caption class="sr-only">Conjugaison de trois verbes à l'imparfait</caption>
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
              <td class="aux">parlais</td>
              <td>finissais</td>
              <td class="translation">hablaba / terminaba</td>
            </tr>
            <tr>
              <td class="person">tu</td>
              <td class="aux">parlais</td>
              <td>finissais</td>
              <td class="translation">hablabas / terminabas</td>
            </tr>
            <tr>
              <td class="person">il / elle / on</td>
              <td class="aux">parlait</td>
              <td>finissait</td>
              <td class="translation">hablaba / terminaba</td>
            </tr>
            <tr>
              <td class="person">nous</td>
              <td class="aux">parlions</td>
              <td>finissions</td>
              <td class="translation">hablábamos / terminábamos</td>
            </tr>
            <tr>
              <td class="person">vous</td>
              <td class="aux">parliez</td>
              <td>finissiez</td>
              <td class="translation">hablabais / terminabais</td>
            </tr>
            <tr>
              <td class="person">ils / elles</td>
              <td class="aux">parlaient</td>
              <td>finissaient</td>
              <td class="translation">hablaban / terminaban</td>
            </tr>
          </tbody>
        </table>

        <div class="attention">
          Les terminaisons sont <strong>les mêmes pour tous les verbes</strong>, sans aucune exception.
          Quatre d'entre elles se prononcent de façon identique&nbsp;:
          <em>parlais, parlais, parlait, parlaient</em>.
        </div>
      </article>

      <!-- ── Emplois ────────────────────────────────── -->
      <article>
        <h2>2. Quand l'utiliser</h2>

        <table>
          <caption class="sr-only">Les trois emplois de l'imparfait</caption>
          <thead>
            <tr>
              <th>Emploi</th>
              <th>Exemple</th>
              <th>Traducción (ES)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="aux">Une habitude</td>
              <td>Tous les étés, nous <strong>allions</strong> à la mer.</td>
              <td class="translation">Todos los veranos íbamos al mar.</td>
            </tr>
            <tr>
              <td class="aux">Une description</td>
              <td>Il <strong>faisait</strong> beau et les oiseaux <strong>chantaient</strong>.</td>
              <td class="translation">Hacía bueno y los pájaros cantaban.</td>
            </tr>
            <tr>
              <td class="aux">Une action en cours</td>
              <td>Je <strong>dormais</strong> quand tu as téléphoné.</td>
              <td class="translation">Dormía cuando llamaste.</td>
            </tr>
          </tbody>
        </table>

        <div class="example">
          Quand j'<strong class="hl-blue">étais</strong> petit, j'<strong class="hl-blue">avais</strong> un chien.
          <span class="note">(Cuando era pequeño, tenía un perro)</span>
        </div>
      </article>

      <!-- ── Exceptions ─────────────────────────────── -->
      <article>
        <div class="exception">
          <strong>Un seul verbe irrégulier&nbsp;: être.</strong> Son radical est
          <strong class="hl-red">ét-</strong> (j'étais, tu étais, il était, nous étions, vous étiez,
          ils étaient). Tous les autres verbes, même les plus irréguliers, suivent la règle du
          «&nbsp;nous&nbsp;»&nbsp;: <em>nous faisons</em> → je <strong>faisais</strong>,
          <em>nous buvons</em> → je <strong>buvais</strong>.
        </div>
        <div class="example exception-ex">
          Les verbes en <strong class="hl-red">-ger</strong> et <strong class="hl-red">-cer</strong>
          gardent le son doux&nbsp;: je man<strong class="hl-red">ge</strong>ais,
          nous commen<strong class="hl-red">ç</strong>ions.
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
