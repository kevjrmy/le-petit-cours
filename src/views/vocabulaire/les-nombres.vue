<!-- view-meta: created=2026-08-10; updated=2026-08-10 -->
<template>
  <AltLayout title="Les nombres">
    <main class="lesson">

      <div class="rule">
        Compter en français est facile jusqu'à <strong class="hl-blue">69</strong>.
        Ensuite, le français fait des <strong class="hl-red">additions et des multiplications</strong>&nbsp;:
        c'est la grande différence avec l'espagnol.
      </div>

      <!-- ── De 0 à 20 ───────────────────────────── -->
      <article>
        <h2>De 0 à 20</h2>
        <table class="dense">
          <caption class="sr-only">Les nombres de zéro à vingt</caption>
          <thead>
            <tr><th>Nº</th><th>Français</th><th>Nº</th><th>Français</th></tr>
          </thead>
          <tbody>
            <tr><td>0</td><td><strong>zéro</strong></td><td>11</td><td><strong>onze</strong></td></tr>
            <tr><td>1</td><td><strong>un</strong> / <strong>une</strong></td><td>12</td><td><strong>douze</strong></td></tr>
            <tr><td>2</td><td><strong>deux</strong></td><td>13</td><td><strong>treize</strong></td></tr>
            <tr><td>3</td><td><strong>trois</strong></td><td>14</td><td><strong>quatorze</strong></td></tr>
            <tr><td>4</td><td><strong>quatre</strong></td><td>15</td><td><strong>quinze</strong></td></tr>
            <tr><td>5</td><td><strong>cinq</strong></td><td>16</td><td><strong>seize</strong></td></tr>
            <tr><td>6</td><td><strong>six</strong></td><td>17</td><td><strong>dix-sept</strong></td></tr>
            <tr><td>7</td><td><strong>sept</strong></td><td>18</td><td><strong>dix-huit</strong></td></tr>
            <tr><td>8</td><td><strong>huit</strong></td><td>19</td><td><strong>dix-neuf</strong></td></tr>
            <tr><td>9</td><td><strong>neuf</strong></td><td>20</td><td><strong>vingt</strong></td></tr>
            <tr><td>10</td><td><strong>dix</strong></td><td></td><td></td></tr>
          </tbody>
        </table>
        <div class="attention">
          À partir de <strong>17</strong>, on additionne&nbsp;: <em>dix-sept</em> = 10 + 7,
          comme <em>diecisiete</em> en espagnol. Le mécanisme est le même.
        </div>
      </article>

      <!-- ── Les dizaines ────────────────────────── -->
      <article>
        <h2>Les dizaines — et le fameux 70, 80, 90</h2>
        <table class="dense">
          <caption class="sr-only">Les dizaines de dix à cent</caption>
          <thead>
            <tr><th>Nº</th><th>Français</th><th>Calcul</th><th>En espagnol</th></tr>
          </thead>
          <tbody>
            <tr><td>30</td><td><strong>trente</strong></td><td></td><td><em>treinta</em></td></tr>
            <tr><td>40</td><td><strong>quarante</strong></td><td></td><td><em>cuarenta</em></td></tr>
            <tr><td>50</td><td><strong>cinquante</strong></td><td></td><td><em>cincuenta</em></td></tr>
            <tr><td>60</td><td><strong>soixante</strong></td><td></td><td><em>sesenta</em></td></tr>
            <tr><td>70</td><td><strong class="hl-red">soixante-dix</strong></td><td>60 + 10</td><td><em>setenta</em></td></tr>
            <tr><td>80</td><td><strong class="hl-red">quatre-vingts</strong></td><td>4 × 20</td><td><em>ochenta</em></td></tr>
            <tr><td>90</td><td><strong class="hl-red">quatre-vingt-dix</strong></td><td>4 × 20 + 10</td><td><em>noventa</em></td></tr>
            <tr><td>100</td><td><strong>cent</strong></td><td></td><td><em>cien</em></td></tr>
          </tbody>
        </table>

        <div class="example">
          71 = soixante-<strong class="hl-red">et</strong>-onze
          <span class="sep">·</span>
          75 = soixante-quinze
          <span class="sep">·</span>
          85 = quatre-vingt-cinq
          <span class="sep">·</span>
          99 = quatre-vingt-dix-neuf
        </div>

        <div class="attention">
          En <strong>Belgique</strong> et en <strong>Suisse</strong>, on dit <em>septante</em> (70)
          et <em>nonante</em> (90). En France, c'est <em>soixante-dix</em> et <em>quatre-vingt-dix</em>.
        </div>
      </article>

      <!-- ── Au-delà de cent + ordinaux ──────────── -->
      <article>
        <h2>À partir de 100</h2>
        <table class="dense">
          <caption class="sr-only">Les nombres à partir de cent</caption>
          <thead>
            <tr><th>Nº</th><th>Français</th><th>En espagnol</th></tr>
          </thead>
          <tbody>
            <tr><td>101</td><td><strong>cent un</strong></td><td><em>ciento uno</em></td></tr>
            <tr><td>200</td><td><strong>deux cents</strong></td><td><em>doscientos</em></td></tr>
            <tr><td>250</td><td><strong>deux cent cinquante</strong></td><td><em>doscientos cincuenta</em></td></tr>
            <tr><td>1 000</td><td><strong>mille</strong></td><td><em>mil</em></td></tr>
            <tr><td>2 000</td><td><strong>deux mille</strong></td><td><em>dos mil</em></td></tr>
            <tr><td>1 000 000</td><td><strong>un million</strong></td><td><em>un millón</em></td></tr>
          </tbody>
        </table>
        <div class="attention">
          <strong>Mille</strong> ne prend <strong class="hl-red">jamais de -s</strong>.
          <em>Cent</em> et <em>vingt</em> en prennent un seulement s'ils sont multipliés
          <strong>et</strong> terminent le nombre&nbsp;: <em>deux cent<strong>s</strong></em>,
          <em>quatre-vingt<strong>s</strong></em> — mais <em>deux cent dix</em>, <em>quatre-vingt-un</em>.
        </div>

        <h3>Les ordinaux</h3>
        <p class="method">
          On ajoute <strong class="hl-blue">-ième</strong> au nombre&nbsp;; seul <em>premier</em>
          fait exception. Attention à l'orthographe&nbsp;: quatr<em>ième</em>, cinqu<em>ième</em>,
          neuv<em>ième</em>.
        </p>
        <div class="example">
          1<sup>er</sup> <strong>premier</strong> / 1<sup>re</sup> <strong>première</strong>
          <span class="sep">·</span>
          2<sup>e</sup> <strong>deuxième</strong>
          <span class="sep">·</span>
          9<sup>e</sup> <strong>neuvième</strong>
          <span class="sep">·</span>
          21<sup>e</sup> <strong>vingt-et-unième</strong>
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
