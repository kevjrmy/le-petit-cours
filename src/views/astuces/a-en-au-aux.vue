<!-- view-meta: created=2026-08-17; updated=2026-08-17 -->
<template>
  <AltLayout title="Où je vais : à, en, au ou aux ?">
    <main class="lesson">

      <!-- ── Les villes ─────────────────────────────── -->
      <article>
        <h2>1. Les villes : toujours « à »</h2>

        <div class="astuce">
          <p class="astuce-hook">
            Une ville&nbsp;? <strong class="hl-blue">à</strong>. Sans exception, sans réfléchir.
          </p>
          <p>
            Les villes n'ont pas de genre en français. Il n'y a donc rien à décider&nbsp;:
            <em>à Paris, à Madrid, à Valence, à Tokyo</em>.
          </p>
        </div>

        <div class="example">
          J'habite <strong>à</strong> Séville. · Je vais <strong>à</strong> Lyon. ·
          Elle travaille <strong>à</strong> Bruxelles.
        </div>

        <div class="attention">
          Quelques villes gardent leur article&nbsp;: <strong>Le</strong> Havre, <strong>La</strong> Haye.
          On dit alors <em>au Havre</em>, <em>à La Haye</em>. Elles sont rares — apprenez-les au cas par cas.
        </div>
      </article>

      <!-- ── Les pays ───────────────────────────────── -->
      <article>
        <h2>2. Les pays : écoutez la dernière lettre</h2>

        <div class="astuce">
          <p class="astuce-hook">
            Le pays finit par <strong class="hl-blue">-e</strong> → <strong class="hl-blue">en</strong>.<br>
            Sinon → <strong class="hl-blue">au</strong>. Pluriel → <strong class="hl-blue">aux</strong>.
          </p>
          <p>
            La terminaison <strong>-e</strong> signale presque toujours un pays féminin, et le
            féminin appelle <em>en</em>. C'est la seule chose à retenir&nbsp;: regardez la fin du mot.
          </p>
        </div>

        <table>
          <caption class="sr-only">Choisir la préposition devant un nom de pays</caption>
          <thead>
            <tr>
              <th>La fin du mot</th>
              <th>Préposition</th>
              <th>Exemple</th>
              <th>Traducción (ES)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="person">finit par <strong>-e</strong></td>
              <td class="aux">en</td>
              <td>Je vais <strong>en</strong> France.</td>
              <td class="translation">Voy a Francia.</td>
            </tr>
            <tr>
              <td class="person">autre lettre</td>
              <td class="aux">au</td>
              <td>Je vais <strong>au</strong> Japon.</td>
              <td class="translation">Voy a Japón.</td>
            </tr>
            <tr>
              <td class="person">nom pluriel</td>
              <td class="aux">aux</td>
              <td>Je vais <strong>aux</strong> Pays-Bas.</td>
              <td class="translation">Voy a los Países Bajos.</td>
            </tr>
          </tbody>
        </table>

        <div class="example">
          <strong>en</strong> Espagne · <strong>en</strong> Italie · <strong>en</strong> Belgique ·
          <strong>en</strong> Chine<br>
          <strong>au</strong> Portugal · <strong>au</strong> Maroc · <strong>au</strong> Canada ·
          <strong>au</strong> Brésil<br>
          <strong>aux</strong> États-Unis · <strong>aux</strong> Philippines
        </div>
      </article>

      <!-- ── Les exceptions ─────────────────────────── -->
      <article>
        <h2>3. Les trois cas où l'astuce se trompe</h2>

        <p class="note">
          Un truc qui ne dit pas ses exceptions fait apprendre des fautes. Voici les seules
          que vous rencontrerez vraiment à ce niveau.
        </p>

        <div class="exception">
          <strong>1. Des pays en -e qui sont masculins.</strong> Ils prennent
          <strong>au</strong> malgré leur terminaison&nbsp;:
          <em>au Mexique</em>, <em>au Cambodge</em>, <em>au Mozambique</em>, <em>au Zimbabwe</em>.
          Le Mexique est de loin le plus utile à retenir.
        </div>

        <div class="exception">
          <strong>2. Les pays qui commencent par une voyelle.</strong> Même masculins, ils
          prennent <strong>en</strong>, parce que « au Iran » serait difficile à prononcer&nbsp;:
          <em>en Iran</em>, <em>en Irak</em>, <em>en Israël</em>, <em>en Afghanistan</em>.
        </div>

        <div class="exception">
          <strong>3. Les îles.</strong> Elles suivent leur propre usage&nbsp;:
          <em>à Cuba</em>, <em>à Madagascar</em>, <em>en Corse</em>, <em>aux Canaries</em>.
          Traitez-les comme du vocabulaire, pas comme une règle.
        </div>

        <div class="attention">
          Pour <strong>venir de</strong>, le même raisonnement s'applique&nbsp;:
          <em>je viens <strong>de</strong> France</em> (féminin),
          <em>je viens <strong>du</strong> Japon</em> (masculin),
          <em>je viens <strong>des</strong> Pays-Bas</em> (pluriel).
        </div>

        <p class="sep">
          <RouterLink class="lesson-link" to="/grammaire/les-prepositions-de-lieu">
            Voir la leçon complète : Les prépositions de lieu
          </RouterLink>
        </p>
      </article>

      <button class="download-btn" @click="downloadPdf" aria-label="Télécharger cette leçon en PDF">
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

function downloadPdf() { window.print() }
</script>
