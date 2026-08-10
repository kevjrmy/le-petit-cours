<!-- view-meta: created=2026-08-10; updated=2026-08-10 -->
<template>
  <AltLayout title="La ville">
    <main class="lesson">

      <div class="rule">
        Les lieux de la ville et comment demander son chemin. Retenez tout de suite le faux ami
        le plus célèbre&nbsp;: <strong class="hl-red">une librairie</strong> est
        <em>una librería</em>, mais <strong class="hl-blue">une bibliothèque</strong> est
        <em>una biblioteca</em>.
      </div>

      <!-- ── Les lieux ───────────────────────────── -->
      <article>
        <h2>Les lieux de la ville</h2>
        <table class="dense">
          <caption class="sr-only">Les lieux publics d'une ville</caption>
          <thead>
            <tr><th>Français</th><th>En espagnol</th><th>Français</th><th>En espagnol</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>la mairie</strong></td><td><em>el ayuntamiento</em></td>
              <td><strong>la poste</strong></td><td><em>la oficina de correos</em></td>
            </tr>
            <tr>
              <td><strong>la banque</strong></td><td><em>el banco</em></td>
              <td><strong>le commissariat</strong></td><td><em>la comisaría</em></td>
            </tr>
            <tr>
              <td><strong>l'église</strong> (f.)</td><td><em>la iglesia</em></td>
              <td><strong>le musée</strong></td><td><em>el museo</em></td>
            </tr>
            <tr>
              <td><strong>la place</strong></td><td><em>la plaza</em></td>
              <td><strong>le parc</strong></td><td><em>el parque</em></td>
            </tr>
            <tr>
              <td><strong>la rue</strong></td><td><em>la calle</em></td>
              <td><strong>le pont</strong></td><td><em>el puente</em></td>
            </tr>
            <tr>
              <td><strong>le marché</strong></td><td><em>el mercado</em></td>
              <td><strong>la boulangerie</strong></td><td><em>la panadería</em></td>
            </tr>
            <tr>
              <td><strong>la bibliothèque</strong></td><td><em>la biblioteca</em></td>
              <td><strong>la librairie</strong></td><td><em>la librería</em></td>
            </tr>
            <tr>
              <td><strong>le carrefour</strong></td><td><em>el cruce</em></td>
              <td><strong>le rond-point</strong></td><td><em>la rotonda</em></td>
            </tr>
          </tbody>
        </table>
      </article>

      <!-- ── Demander son chemin ─────────────────── -->
      <article>
        <h2>Demander son chemin</h2>
        <table class="dense">
          <caption class="sr-only">Expressions pour demander et indiquer un chemin</caption>
          <thead>
            <tr><th>Français</th><th>En espagnol</th></tr>
          </thead>
          <tbody>
            <tr><td><strong>Pardon, où est la gare&nbsp;?</strong></td><td><em>Perdone, ¿dónde está la estación?</em></td></tr>
            <tr><td><strong>Est-ce qu'il y a une pharmacie près d'ici&nbsp;?</strong></td><td><em>¿Hay una farmacia cerca de aquí?</em></td></tr>
            <tr><td><strong>Je cherche la poste.</strong></td><td><em>Busco la oficina de correos.</em></td></tr>
            <tr><td><strong>C'est loin&nbsp;?</strong></td><td><em>¿Está lejos?</em></td></tr>
            <tr><td><strong>Je suis perdu(e).</strong></td><td><em>Estoy perdido/a.</em></td></tr>
          </tbody>
        </table>
      </article>

      <!-- ── Indiquer le chemin ──────────────────── -->
      <article>
        <h2>Indiquer le chemin</h2>
        <p class="method">
          On répond à l'<strong class="hl-blue">impératif</strong>, avec <em>vous</em>.
        </p>
        <table class="dense">
          <caption class="sr-only">Instructions pour indiquer un chemin</caption>
          <thead>
            <tr><th>Français</th><th>En espagnol</th></tr>
          </thead>
          <tbody>
            <tr><td><strong>Allez tout droit.</strong></td><td><em>Siga recto.</em></td></tr>
            <tr><td><strong>Tournez à droite / à gauche.</strong></td><td><em>Gire a la derecha / izquierda.</em></td></tr>
            <tr><td><strong>Prenez la première rue à droite.</strong></td><td><em>Coja la primera calle a la derecha.</em></td></tr>
            <tr><td><strong>Traversez la place.</strong></td><td><em>Cruce la plaza.</em></td></tr>
            <tr><td><strong>C'est en face de la banque.</strong></td><td><em>Está enfrente del banco.</em></td></tr>
            <tr><td><strong>C'est à côté du musée.</strong></td><td><em>Está al lado del museo.</em></td></tr>
            <tr><td><strong>C'est à cinq minutes à pied.</strong></td><td><em>Está a cinco minutos a pie.</em></td></tr>
          </tbody>
        </table>

        <div class="attention">
          <strong class="hl-red">Tout droit</strong> (recto) ne veut pas dire
          <strong class="hl-blue">à droite</strong> (a la derecha). C'est une confusion très
          fréquente&nbsp;: <em>tout droit</em> = on continue&nbsp;; <em>à droite</em> = on tourne.
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
