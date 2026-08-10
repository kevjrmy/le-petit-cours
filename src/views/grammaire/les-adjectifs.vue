<!-- view-meta: created=2026-08-10; updated=2026-08-10 -->
<template>
  <AltLayout title="Les adjectifs qualificatifs">
    <main class="lesson">

      <!-- ── Règle ─────────────────────────────────── -->
      <article>
        <div class="rule">
          L'adjectif <strong class="hl-blue">s'accorde</strong> toujours avec le nom&nbsp;:
          il prend son <strong>genre</strong> (masculin ou féminin) et son
          <strong>nombre</strong> (singulier ou pluriel).
        </div>
        <div class="attention">
          💡 <strong>Tip para hispanohablantes&nbsp;:</strong> la concordancia funciona igual que
          en español&nbsp;: <em>une voiture noire</em> → <em>un coche negro</em>.
          La diferencia está en <strong>la posición</strong>&nbsp;: en francés hay un grupo de
          adjetivos muy comunes que van <strong class="hl-red">delante</strong> del nombre.
        </div>
      </article>

      <!-- ── Accord ─────────────────────────────────── -->
      <article>
        <h2>1. L'accord</h2>
        <p class="method">
          Règle générale&nbsp;: on ajoute <strong>-e</strong> au féminin, <strong>-s</strong> au pluriel.
        </p>

        <table>
          <caption class="sr-only">Accord des adjectifs en genre et en nombre</caption>
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
              <td class="aux">grand</td>
              <td>grande</td>
              <td>grands</td>
              <td>grandes</td>
            </tr>
            <tr>
              <td class="aux">joli</td>
              <td>jolie</td>
              <td>jolis</td>
              <td>jolies</td>
            </tr>
            <tr>
              <td class="aux">heureux</td>
              <td>heureu<strong class="hl-red">se</strong></td>
              <td>heureux</td>
              <td>heureuses</td>
            </tr>
            <tr>
              <td class="aux">sportif</td>
              <td>sporti<strong class="hl-red">ve</strong></td>
              <td>sportifs</td>
              <td>sportives</td>
            </tr>
            <tr>
              <td class="aux">rouge</td>
              <td>rouge</td>
              <td>rouges</td>
              <td>rouges</td>
            </tr>
          </tbody>
        </table>

        <div class="attention">
          Un adjectif qui finit déjà par <strong>-e</strong> ne change pas au féminin&nbsp;:
          <em>rouge, jaune, calme, facile, jeune</em>. Un adjectif qui finit par <strong>-s</strong>
          ou <strong>-x</strong> ne change pas au masculin pluriel&nbsp;: <em>un homme heureux,
          des hommes heureux</em>.
        </div>
      </article>

      <!-- ── Place ──────────────────────────────────── -->
      <article>
        <h2>2. Avant ou après le nom&nbsp;?</h2>
        <p class="method">
          En règle générale, l'adjectif se place <strong class="hl-blue">après</strong> le nom&nbsp;—
          comme en espagnol. Mais un petit groupe d'adjectifs très fréquents se place
          <strong class="hl-red">avant</strong>.
        </p>

        <table>
          <caption class="sr-only">Adjectifs placés avant ou après le nom</caption>
          <thead>
            <tr>
              <th>Position</th>
              <th>Adjectifs</th>
              <th>Exemple</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="aux">Avant</td>
              <td>beau, joli, jeune, vieux, bon, mauvais, grand, petit, gros, nouveau</td>
              <td>une <strong class="hl-red">jolie</strong> maison</td>
            </tr>
            <tr>
              <td class="aux">Après</td>
              <td>couleurs, formes, nationalités, religions, adjectifs longs</td>
              <td>une maison <strong class="hl-blue">bleue</strong></td>
            </tr>
          </tbody>
        </table>

        <div class="example">
          un <strong class="hl-red">petit</strong> chat <strong class="hl-blue">noir</strong>
          <span class="note">(un gatito negro — les deux positions dans la même phrase)</span>
        </div>
        <div class="example">
          une <strong class="hl-red">vieille</strong> voiture <strong class="hl-blue">italienne</strong>
          <span class="note">(un coche italiano viejo)</span>
        </div>
      </article>

      <!-- ── Exceptions ─────────────────────────────── -->
      <article>
        <div class="exception">
          <strong>Cinq adjectifs irréguliers</strong> à connaître par cœur. Ils ont une forme
          spéciale au masculin devant une voyelle&nbsp;:
        </div>
        <div class="example exception-ex">
          beau <span class="arrow-inline">→</span> un <strong class="hl-red">bel</strong> homme · belle
          <span class="sep">·</span>
          nouveau <span class="arrow-inline">→</span> un <strong class="hl-red">nouvel</strong> ami · nouvelle
          <span class="sep">·</span>
          vieux <span class="arrow-inline">→</span> un <strong class="hl-red">vieil</strong> arbre · vieille
        </div>
        <div class="example exception-ex">
          Devant un adjectif placé avant le nom, <strong>des</strong> devient
          <strong class="hl-red">de</strong>&nbsp;: <em>de jolies fleurs</em> (et non «&nbsp;des jolies fleurs&nbsp;»).
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
