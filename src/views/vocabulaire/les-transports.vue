<!-- view-meta: created=2026-08-10; updated=2026-08-10 -->
<template>
  <AltLayout title="Les transports">
    <main class="lesson">

      <div class="rule">
        Se déplacer en français. Le point clé&nbsp;: on dit
        <strong class="hl-blue">en</strong> voiture, mais
        <strong class="hl-red">à</strong> pied et <strong class="hl-red">à</strong> vélo.
      </div>

      <!-- ── Les moyens de transport ─────────────── -->
      <article>
        <h2>Les moyens de transport</h2>
        <table class="dense">
          <caption class="sr-only">Moyens de transport et prépositions</caption>
          <thead>
            <tr><th>Français</th><th>En espagnol</th><th>On dit</th></tr>
          </thead>
          <tbody>
            <tr><td><strong>une voiture</strong></td><td><em>un coche</em></td><td><strong class="hl-blue">en</strong> voiture</td></tr>
            <tr><td><strong>un bus</strong></td><td><em>un autobús</em></td><td><strong class="hl-blue">en</strong> bus</td></tr>
            <tr><td><strong>le métro</strong></td><td><em>el metro</em></td><td><strong class="hl-blue">en</strong> métro</td></tr>
            <tr><td><strong>un train</strong></td><td><em>un tren</em></td><td><strong class="hl-blue">en</strong> train</td></tr>
            <tr><td><strong>un avion</strong></td><td><em>un avión</em></td><td><strong class="hl-blue">en</strong> avion</td></tr>
            <tr><td><strong>un vélo</strong></td><td><em>una bicicleta</em></td><td><strong class="hl-red">à</strong> vélo</td></tr>
            <tr><td><strong>une moto</strong></td><td><em>una moto</em></td><td><strong class="hl-red">à</strong> moto</td></tr>
            <tr><td>—</td><td><em>a pie</em></td><td><strong class="hl-red">à</strong> pied</td></tr>
          </tbody>
        </table>
        <div class="attention">
          La logique&nbsp;: <strong class="hl-blue">en</strong> quand on est
          <strong>dedans</strong> (une voiture, un train), <strong class="hl-red">à</strong>
          quand on est <strong>dessus</strong> ou sans véhicule (à vélo, à moto, à pied).
        </div>
      </article>

      <!-- ── À la gare et à l'aéroport ───────────── -->
      <article>
        <h2>À la gare et à l'aéroport</h2>
        <table class="dense">
          <caption class="sr-only">Vocabulaire de la gare et de l'aéroport</caption>
          <thead>
            <tr><th>Français</th><th>En espagnol</th><th>Français</th><th>En espagnol</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>la gare</strong></td><td><em>la estación</em></td>
              <td><strong>l'aéroport</strong> (m.)</td><td><em>el aeropuerto</em></td>
            </tr>
            <tr>
              <td><strong>un billet</strong></td><td><em>un billete</em></td>
              <td><strong>un aller-retour</strong></td><td><em>un ida y vuelta</em></td>
            </tr>
            <tr>
              <td><strong>le quai</strong></td><td><em>el andén</em></td>
              <td><strong>la voie</strong></td><td><em>la vía</em></td>
            </tr>
            <tr>
              <td><strong>l'arrêt</strong> (m.)</td><td><em>la parada</em></td>
              <td><strong>la correspondance</strong></td><td><em>el transbordo</em></td>
            </tr>
            <tr>
              <td><strong>le départ</strong></td><td><em>la salida</em></td>
              <td><strong>l'arrivée</strong> (f.)</td><td><em>la llegada</em></td>
            </tr>
            <tr>
              <td><strong>en retard</strong></td><td><em>con retraso</em></td>
              <td><strong>à l'heure</strong></td><td><em>puntual</em></td>
            </tr>
          </tbody>
        </table>
      </article>

      <!-- ── Faux amis ───────────────────────────── -->
      <article>
        <h2>Deux faux amis à retenir</h2>
        <div class="exception">
          <strong class="hl-red">un car</strong> n'est pas «&nbsp;un coche&nbsp;»&nbsp;: c'est
          <em>un autocar</em> (bus interurbano). Une voiture, c'est
          <strong class="hl-blue">une voiture</strong>.
        </div>
        <div class="exception">
          <strong class="hl-red">la voie</strong> (<em>la vía</em>) ne se confond pas avec
          <em>la voix</em> (<em>la voz</em>) — même prononciation, sens différent.
        </div>
      </article>

      <!-- ── Mise en situation ───────────────────── -->
      <article>
        <h2>Acheter un billet</h2>
        <div class="dialogue">
          <div class="line alt">
            <span class="speaker">Cli.</span>
            <span class="text">Bonjour, je voudrais un aller-retour pour Marseille, s'il vous plaît.</span>
            <span class="transl">Buenos días, querría un ida y vuelta para Marsella, por favor.</span>
          </div>
          <div class="line">
            <span class="speaker">Emp.</span>
            <span class="text">Pour quelle date&nbsp;?</span>
            <span class="transl">¿Para qué fecha?</span>
          </div>
          <div class="line alt">
            <span class="speaker">Cli.</span>
            <span class="text">Le 5 juin, et le retour le 9. Il y a une correspondance&nbsp;?</span>
            <span class="transl">El 5 de junio, y la vuelta el 9. ¿Hay transbordo?</span>
          </div>
          <div class="line">
            <span class="speaker">Emp.</span>
            <span class="text">Non, c'est direct. Départ voie 7, à treize heures dix.</span>
            <span class="transl">No, es directo. Sale de la vía 7, a las trece diez.</span>
          </div>
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
