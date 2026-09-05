<!-- view-meta: created=2026-08-10; updated=2026-08-10 -->
<template>
  <AltLayout title="L'heure">
    <main class="lesson">

      <div class="rule">
        Pour dire l'heure, le français utilise toujours <strong class="hl-blue">Il est…</strong>
        au singulier, et n'oublie <strong class="hl-red">jamais</strong> le mot <em>heures</em>.
      </div>

      <!-- ── Dire l'heure ────────────────────────── -->
      <article>
        <h2>Quelle heure est-il&nbsp;?</h2>
        <table class="dense">
          <caption class="sr-only">Comment dire l'heure en français</caption>
          <thead>
            <tr><th>Heure</th><th>Français</th><th>En espagnol</th></tr>
          </thead>
          <tbody>
            <tr><td>8 h 00</td><td><strong>Il est huit heures.</strong></td><td><em>Son las ocho.</em></td></tr>
            <tr><td>8 h 10</td><td><strong>huit heures dix</strong></td><td><em>las ocho y diez</em></td></tr>
            <tr><td>8 h 15</td><td><strong>huit heures et quart</strong></td><td><em>las ocho y cuarto</em></td></tr>
            <tr><td>8 h 30</td><td><strong>huit heures et demie</strong></td><td><em>las ocho y media</em></td></tr>
            <tr><td>8 h 45</td><td><strong>neuf heures moins le quart</strong></td><td><em>las nueve menos cuarto</em></td></tr>
            <tr><td>8 h 50</td><td><strong>neuf heures moins dix</strong></td><td><em>las nueve menos diez</em></td></tr>
            <tr><td>12 h 00</td><td><strong>midi</strong></td><td><em>mediodía</em></td></tr>
            <tr><td>00 h 00</td><td><strong>minuit</strong></td><td><em>medianoche</em></td></tr>
          </tbody>
        </table>

        <div class="attention">
          En espagnol on dit <em>Son las ocho</em> (pluriel). En français, c'est toujours
          <strong class="hl-blue">Il est</strong>, au singulier, quelle que soit l'heure.
          Et le mot <strong>heures</strong> est obligatoire&nbsp;: jamais
          «&nbsp;<em>il est huit</em>&nbsp;».
        </div>

        <div class="example">
          <strong>À quelle heure</strong> est-ce que le train part&nbsp;?
          <span class="arrow-inline" aria-hidden="true">→</span>
          Il part <strong class="hl-blue">à</strong> dix heures.
          <span class="note">(la preposición es « à », no « en »)</span>
        </div>
      </article>

      <!-- ── Les moments de la journée ───────────── -->
      <article>
        <h2>Les moments de la journée</h2>
        <table class="dense">
          <caption class="sr-only">Les moments de la journée</caption>
          <thead>
            <tr><th>Français</th><th>En espagnol</th><th>Français</th><th>En espagnol</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>le matin</strong></td><td><em>la mañana</em></td>
              <td><strong>le soir</strong></td><td><em>la tarde-noche</em></td>
            </tr>
            <tr>
              <td><strong>l'après-midi</strong></td><td><em>la tarde</em></td>
              <td><strong>la nuit</strong></td><td><em>la noche</em></td>
            </tr>
            <tr>
              <td><strong>aujourd'hui</strong></td><td><em>hoy</em></td>
              <td><strong>demain</strong></td><td><em>mañana</em></td>
            </tr>
            <tr>
              <td><strong>hier</strong></td><td><em>ayer</em></td>
              <td><strong>tôt / tard</strong></td><td><em>temprano / tarde</em></td>
            </tr>
          </tbody>
        </table>

        <div class="attention">
          Piège classique&nbsp;: <strong class="hl-red">le matin</strong> est <em>la mañana</em>
          (le moment), alors que <strong class="hl-red">demain</strong> est <em>mañana</em> (le jour
          suivant). Deux mots différents en français pour un seul en espagnol.
        </div>
      </article>

      <!-- ── L'heure officielle ──────────────────── -->
      <article>
        <div class="exception">
          <strong>L'heure officielle.</strong> En France, les horaires (trains, cinémas,
          rendez-vous) utilisent les <strong class="hl-red">24 heures</strong>, avec les minutes
          en entier, sans <em>quart</em> ni <em>demie</em>&nbsp;:
          <em>14 h 30 = quatorze heures trente</em>,
          <em>20 h 45 = vingt heures quarante-cinq</em>.
        </div>
        <div class="example exception-ex">
          Le film commence à <strong class="hl-red">vingt heures trente</strong>.
          <span class="note">(La película empieza a las ocho y media)</span>
        </div>
      </article>

      <RelatedLinks />
    </main>
  </AltLayout>
</template>

<script setup>
import AltLayout from '@/layouts/AltLayout.vue'
import RelatedLinks from '@/components/RelatedLinks.vue'
</script>
