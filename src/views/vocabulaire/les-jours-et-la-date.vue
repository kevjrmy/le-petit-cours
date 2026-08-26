<!-- view-meta: created=2026-08-10; updated=2026-08-10 -->
<template>
  <AltLayout title="Les jours et la date">
    <main class="lesson">

      <div class="rule">
        Les jours, les mois et la date. Deux règles simples&nbsp;: tout s'écrit en
        <strong class="hl-blue">minuscule</strong>, et la date commence toujours par
        <strong class="hl-blue">le</strong>.
      </div>

      <!-- ── Jours et mois ───────────────────────── -->
      <article>
        <h2>Les jours et les mois</h2>
        <table class="dense">
          <caption class="sr-only">Les jours de la semaine et les mois de l'année</caption>
          <thead>
            <tr><th>Jours</th><th>En espagnol</th><th>Mois</th><th>Mois</th></tr>
          </thead>
          <tbody>
            <tr><td><strong>lundi</strong></td><td><em>lunes</em></td><td><strong>janvier</strong></td><td><strong>juillet</strong></td></tr>
            <tr><td><strong>mardi</strong></td><td><em>martes</em></td><td><strong>février</strong></td><td><strong>août</strong></td></tr>
            <tr><td><strong>mercredi</strong></td><td><em>miércoles</em></td><td><strong>mars</strong></td><td><strong>septembre</strong></td></tr>
            <tr><td><strong>jeudi</strong></td><td><em>jueves</em></td><td><strong>avril</strong></td><td><strong>octobre</strong></td></tr>
            <tr><td><strong>vendredi</strong></td><td><em>viernes</em></td><td><strong>mai</strong></td><td><strong>novembre</strong></td></tr>
            <tr><td><strong>samedi</strong></td><td><em>sábado</em></td><td><strong>juin</strong></td><td><strong>décembre</strong></td></tr>
            <tr><td><strong>dimanche</strong></td><td><em>domingo</em></td><td></td><td></td></tr>
          </tbody>
        </table>

        <div class="attention">
          Les jours et les mois s'écrivent avec une <strong class="hl-blue">minuscule</strong>,
          exactement comme en espagnol&nbsp;: <em>lundi</em>, <em>mars</em>.
        </div>
      </article>

      <!-- ── lundi ou le lundi ? ─────────────────── -->
      <article>
        <h2>«&nbsp;lundi&nbsp;» ou «&nbsp;le lundi&nbsp;»&nbsp;?</h2>
        <table class="dense">
          <caption class="sr-only">Différence entre lundi et le lundi</caption>
          <thead>
            <tr><th>Forme</th><th>Sens</th><th>Exemple</th></tr>
          </thead>
          <tbody>
            <tr>
              <td class="aux">lundi</td>
              <td>un jour précis</td>
              <td><strong>Lundi</strong>, je vais chez le médecin.</td>
            </tr>
            <tr>
              <td class="aux">le lundi</td>
              <td>tous les lundis</td>
              <td><strong>Le lundi</strong>, je fais du sport.</td>
            </tr>
          </tbody>
        </table>
        <div class="attention">
          L'article change tout&nbsp;: <em>lundi</em> = <em>el lunes</em> (una vez),
          <strong class="hl-blue">le</strong> <em>lundi</em> = <em>los lunes</em> (cada semana).
        </div>
      </article>

      <!-- ── La date ─────────────────────────────── -->
      <article>
        <h2>Dire la date</h2>
        <p class="method-example">
          <strong>le</strong>
          <span class="arrow-inline" aria-hidden="true">+</span>
          <strong>nombre</strong>
          <span class="arrow-inline" aria-hidden="true">+</span>
          <strong>mois</strong>
          <span class="arrow-inline" aria-hidden="true">+</span>
          <strong>année</strong>
        </p>

        <div class="example">
          Nous sommes <strong class="hl-blue">le</strong> 14 juillet 2026.
          <span class="sep">·</span>
          Je pars <strong class="hl-blue">le</strong> 1<sup>er</sup> août.
          <span class="note">(Estamos a 14 de julio · Me voy el 1 de agosto)</span>
        </div>

        <div class="exception">
          <strong>Deux pièges&nbsp;:</strong> pas de <strong class="hl-red">«&nbsp;de&nbsp;»</strong>
          entre le jour et le mois (<em>le 5 mai</em>, jamais «&nbsp;le 5 de mai&nbsp;»), et on
          emploie le nombre normal — sauf le premier du mois, où l'on écrit
          <strong class="hl-red">le 1<sup>er</sup></strong> (<em>le premier</em>).
        </div>
      </article>

      <!-- ── Mise en situation ───────────────────── -->
      <article>
        <h2>Prendre rendez-vous</h2>
        <div class="dialogue">
          <div class="line alt">
            <span class="speaker">Sec.</span>
            <span class="text">Cabinet du docteur Martin, bonjour&nbsp;!</span>
            <span class="transl">Consulta del doctor Martin, ¡buenos días!</span>
          </div>
          <div class="line">
            <span class="speaker">Cli.</span>
            <span class="text">Bonjour, je voudrais un rendez-vous, s'il vous plaît.</span>
            <span class="transl">Buenos días, querría una cita, por favor.</span>
          </div>
          <div class="line alt">
            <span class="speaker">Sec.</span>
            <span class="text">Est-ce que le jeudi 12 mars à quinze heures vous convient&nbsp;?</span>
            <span class="transl">¿Le viene bien el jueves 12 de marzo a las tres?</span>
          </div>
          <div class="line">
            <span class="speaker">Cli.</span>
            <span class="text">Parfait, merci. À jeudi&nbsp;!</span>
            <span class="transl">Perfecto, gracias. ¡Hasta el jueves!</span>
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
