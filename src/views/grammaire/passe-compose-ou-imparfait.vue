<!-- view-meta: created=2026-08-10; updated=2026-08-10 -->
<template>
  <AltLayout title="Passé composé ou imparfait ?">
    <main class="lesson">

      <!-- ── Règle ─────────────────────────────────── -->
      <article>
        <div class="rule">
          Les deux temps parlent du passé, mais ils ne racontent pas la même chose.
          Le <strong class="hl-blue">passé composé</strong> raconte <strong>ce qui est arrivé</strong>&nbsp;;
          l'<strong class="hl-blue">imparfait</strong> décrit <strong>le décor</strong> autour.
        </div>
        <div class="attention">
          💡 <strong>Tip para hispanohablantes&nbsp;:</strong> ya conoces esta diferencia&nbsp;—
          es la misma que entre <strong>comí</strong> (indefinido) y <strong>comía</strong> (imperfecto).
          El <em>passé composé</em> corresponde a tu indefinido, el <em>imparfait</em> a tu imperfecto.
          <strong>Fíate de tu intuición de español</strong>&nbsp;: acierta casi siempre.
        </div>
      </article>

      <!-- ── Le contraste ───────────────────────────── -->
      <article>
        <h2>1. Action ou décor&nbsp;?</h2>

        <table>
          <caption class="sr-only">Comparaison des emplois du passé composé et de l'imparfait</caption>
          <thead>
            <tr>
              <th></th>
              <th>Passé composé</th>
              <th>Imparfait</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="person">Rôle</td>
              <td class="aux">l'action</td>
              <td class="aux">le décor</td>
            </tr>
            <tr>
              <td class="person">Question</td>
              <td>Qu'est-ce qui s'est passé&nbsp;?</td>
              <td>Comment c'était&nbsp;?</td>
            </tr>
            <tr>
              <td class="person">Durée</td>
              <td>terminée, limitée</td>
              <td>non limitée</td>
            </tr>
            <tr>
              <td class="person">Combien de fois</td>
              <td>une fois, un nombre précis</td>
              <td>souvent, tous les jours</td>
            </tr>
            <tr>
              <td class="person">Espagnol</td>
              <td class="translation">comí, hablé, fui</td>
              <td class="translation">comía, hablaba, iba</td>
            </tr>
          </tbody>
        </table>

        <div class="example">
          Il <strong class="hl-blue">faisait</strong> nuit et je <strong class="hl-blue">dormais</strong>
          quand le téléphone <strong class="hl-red">a sonné</strong>.
          <span class="note">(Era de noche y dormía cuando sonó el teléfono)</span>
        </div>
        <p class="method">
          Le décor est à l'imparfait (<em>faisait, dormais</em>), l'événement qui arrive et
          coupe le décor est au passé composé (<em>a sonné</em>).
        </p>
      </article>

      <!-- ── Les mots qui aident ────────────────────── -->
      <article>
        <h2>2. Les mots qui vous mettent sur la piste</h2>

        <table>
          <caption class="sr-only">Expressions de temps associées à chaque temps du passé</caption>
          <thead>
            <tr>
              <th>Plutôt passé composé</th>
              <th>Plutôt imparfait</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>soudain, tout à coup</td>
              <td>souvent, d'habitude</td>
            </tr>
            <tr>
              <td>hier, ce matin</td>
              <td>tous les jours, chaque été</td>
            </tr>
            <tr>
              <td>une fois, deux fois</td>
              <td>quand j'étais petit</td>
            </tr>
            <tr>
              <td>puis, ensuite, enfin</td>
              <td>pendant que, à cette époque</td>
            </tr>
          </tbody>
        </table>

        <div class="example">
          <strong class="hl-blue">Tous les dimanches</strong>, nous <strong>allions</strong> chez ma grand-mère.
          <span class="sep">·</span>
          <strong class="hl-red">Dimanche dernier</strong>, nous <strong>sommes allés</strong> au cinéma.
        </div>
      </article>

      <!-- ── À retenir ──────────────────────────────── -->
      <article>
        <div class="attention">
          Dans une histoire, les deux temps travaillent ensemble&nbsp;: l'imparfait <strong>plante
          le décor</strong>, le passé composé <strong>fait avancer l'histoire</strong>.
          Si vous pouvez remplacer par «&nbsp;était en train de&nbsp;», c'est l'imparfait.
        </div>
      </article>

      <!-- ── Exception ──────────────────────────────── -->
      <article>
        <div class="exception">
          <strong>Attention au changement de sens.</strong> Certains verbes changent de signification
          selon le temps choisi. Ce n'est pas une faute de grammaire&nbsp;: c'est une autre phrase.
        </div>
        <div class="example exception-ex">
          Je <strong class="hl-red">savais</strong> la réponse.
          <span class="note">(yo sabía la respuesta — état)</span>
          <br />
          J'<strong class="hl-red">ai su</strong> la réponse.
          <span class="note">(supe la respuesta — je l'ai apprise à ce moment-là)</span>
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
