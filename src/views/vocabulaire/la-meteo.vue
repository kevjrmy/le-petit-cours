<!-- view-meta: created=2026-08-10; updated=2026-08-10 -->
<template>
  <AltLayout title="La météo et les saisons">
    <main class="lesson">

      <div class="rule">
        Pour parler du temps, le français utilise presque toujours
        <strong class="hl-blue">Il fait…</strong> — une tournure impersonnelle,
        où le «&nbsp;il&nbsp;» ne désigne personne, comme dans <em>hace calor</em>.
      </div>

      <!-- ── Il fait / Il y a ────────────────────── -->
      <article>
        <h2>Quel temps fait-il&nbsp;?</h2>
        <table class="dense">
          <caption class="sr-only">Expressions pour décrire le temps qu'il fait</caption>
          <thead>
            <tr><th>Français</th><th>En espagnol</th><th>Construction</th></tr>
          </thead>
          <tbody>
            <tr><td><strong>Il fait beau.</strong></td><td><em>Hace bueno.</em></td><td class="person">il fait + adjectif</td></tr>
            <tr><td><strong>Il fait mauvais.</strong></td><td><em>Hace mal tiempo.</em></td><td class="person">il fait + adjectif</td></tr>
            <tr><td><strong>Il fait chaud.</strong></td><td><em>Hace calor.</em></td><td class="person">il fait + adjectif</td></tr>
            <tr><td><strong>Il fait froid.</strong></td><td><em>Hace frío.</em></td><td class="person">il fait + adjectif</td></tr>
            <tr><td><strong>Il pleut.</strong></td><td><em>Llueve.</em></td><td class="person">verbe seul</td></tr>
            <tr><td><strong>Il neige.</strong></td><td><em>Nieva.</em></td><td class="person">verbe seul</td></tr>
            <tr><td><strong>Il y a du vent.</strong></td><td><em>Hace viento.</em></td><td class="person">il y a + du/de la</td></tr>
            <tr><td><strong>Il y a du soleil.</strong></td><td><em>Hace sol.</em></td><td class="person">il y a + du/de la</td></tr>
            <tr><td><strong>Il y a du brouillard.</strong></td><td><em>Hay niebla.</em></td><td class="person">il y a + du/de la</td></tr>
          </tbody>
        </table>

        <div class="attention">
          Trois constructions à ne pas mélanger&nbsp;: <strong class="hl-blue">il fait</strong>
          + adjectif (beau, chaud), <strong class="hl-blue">il y a</strong> + nom
          (du vent, du soleil), et le <strong class="hl-blue">verbe seul</strong>
          (il pleut, il neige). On ne dit pas «&nbsp;<em>il fait du pleuvoir</em>&nbsp;».
        </div>
      </article>

      <!-- ── Les saisons ─────────────────────────── -->
      <article>
        <h2>Les saisons</h2>
        <table class="dense">
          <caption class="sr-only">Les quatre saisons et leurs prépositions</caption>
          <thead>
            <tr><th>Saison</th><th>En espagnol</th><th>On dit</th></tr>
          </thead>
          <tbody>
            <tr><td><strong>le printemps</strong></td><td><em>la primavera</em></td><td><strong class="hl-red">au</strong> printemps</td></tr>
            <tr><td><strong>l'été</strong> (m.)</td><td><em>el verano</em></td><td><strong class="hl-blue">en</strong> été</td></tr>
            <tr><td><strong>l'automne</strong> (m.)</td><td><em>el otoño</em></td><td><strong class="hl-blue">en</strong> automne</td></tr>
            <tr><td><strong>l'hiver</strong> (m.)</td><td><em>el invierno</em></td><td><strong class="hl-blue">en</strong> hiver</td></tr>
          </tbody>
        </table>
        <div class="exception">
          <strong>Le printemps est le seul à faire exception&nbsp;:</strong> on dit
          <strong class="hl-red">au</strong> printemps, mais <strong class="hl-blue">en</strong>
          été, <strong class="hl-blue">en</strong> automne, <strong class="hl-blue">en</strong> hiver.
          Toutes les saisons sont <strong>masculines</strong>.
        </div>
      </article>

      <!-- ── La température ──────────────────────── -->
      <article>
        <h2>La température et le ciel</h2>
        <table class="dense">
          <caption class="sr-only">Vocabulaire de la température et du ciel</caption>
          <thead>
            <tr><th>Français</th><th>En espagnol</th><th>Français</th><th>En espagnol</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>le ciel</strong></td><td><em>el cielo</em></td>
              <td><strong>un nuage</strong></td><td><em>una nube</em></td>
            </tr>
            <tr>
              <td><strong>la pluie</strong></td><td><em>la lluvia</em></td>
              <td><strong>la neige</strong></td><td><em>la nieve</em></td>
            </tr>
            <tr>
              <td><strong>un orage</strong></td><td><em>una tormenta</em></td>
              <td><strong>le vent</strong></td><td><em>el viento</em></td>
            </tr>
            <tr>
              <td><strong>nuageux</strong></td><td><em>nublado</em></td>
              <td><strong>ensoleillé</strong></td><td><em>soleado</em></td>
            </tr>
            <tr>
              <td><strong>humide</strong></td><td><em>húmedo</em></td>
              <td><strong>sec</strong></td><td><em>seco</em></td>
            </tr>
          </tbody>
        </table>

        <div class="example">
          Il fait <strong class="hl-blue">vingt degrés</strong> aujourd'hui.
          <span class="sep">·</span>
          Il fait <strong class="hl-blue">moins cinq</strong> ce matin.
          <span class="note">(veinte grados · cinco bajo cero)</span>
        </div>
        <div class="example">
          Quel temps fait-il à Valence&nbsp;?
          <span class="arrow-inline" aria-hidden="true">→</span>
          Il fait beau et chaud, il y a du soleil.
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
