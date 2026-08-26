<!-- view-meta: created=2026-08-17; updated=2026-08-17 -->
<template>
  <AltLayout title="Deviner le genre d'un nom">
    <main class="lesson">

      <!-- ── La terminaison ─────────────────────────── -->
      <article>
        <h2>1. La fin du mot vous le dit</h2>

        <div class="astuce">
          <p class="astuce-hook">
            Ne devinez pas d'après l'espagnol. Regardez la <strong class="hl-blue">terminaison</strong>.
          </p>
          <p>
            Le genre espagnol trompe souvent&nbsp;: <em>la leche</em> mais <strong>le</strong> lait,
            <em>el coche</em> mais <strong>la</strong> voiture. En revanche, la fin du mot français
            est fiable dans environ neuf cas sur dix.
          </p>
        </div>

        <table>
          <caption class="sr-only">Terminaisons qui indiquent le féminin</caption>
          <thead>
            <tr>
              <th>Terminaison</th>
              <th>Genre</th>
              <th>Exemples</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="person">-tion, -sion</td>
              <td class="aux">féminin</td>
              <td>la nation, la question, la télévision</td>
            </tr>
            <tr>
              <td class="person">-té, -tié</td>
              <td class="aux">féminin</td>
              <td>la liberté, la beauté, l'amitié</td>
            </tr>
            <tr>
              <td class="person">-ette, -elle</td>
              <td class="aux">féminin</td>
              <td>la fourchette, la vaisselle</td>
            </tr>
            <tr>
              <td class="person">-ure, -ée</td>
              <td class="aux">féminin</td>
              <td>la voiture, la journée</td>
            </tr>
          </tbody>
        </table>

        <div class="attention">
          <strong>-tion → toujours féminin.</strong> C'est la terminaison la plus rentable&nbsp;:
          des milliers de mots, aucune exception courante, et elle ressemble à l'espagnol
          <em>-ción</em>, qui est féminin aussi.
        </div>
      </article>

      <!-- ── Masculin ───────────────────────────────── -->
      <article>
        <h2>2. Les terminaisons masculines</h2>

        <table>
          <caption class="sr-only">Terminaisons qui indiquent le masculin</caption>
          <thead>
            <tr>
              <th>Terminaison</th>
              <th>Genre</th>
              <th>Exemples</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="person">-age</td>
              <td class="aux">masculin</td>
              <td>le fromage, le voyage, le garage</td>
            </tr>
            <tr>
              <td class="person">-ment</td>
              <td class="aux">masculin</td>
              <td>le moment, le gouvernement</td>
            </tr>
            <tr>
              <td class="person">-eau, -ou</td>
              <td class="aux">masculin</td>
              <td>le bateau, le bureau, le genou</td>
            </tr>
            <tr>
              <td class="person">-isme</td>
              <td class="aux">masculin</td>
              <td>le tourisme, le réalisme</td>
            </tr>
          </tbody>
        </table>

        <div class="exception">
          <strong>Quatre pièges en -age</strong> qui sont féminins&nbsp;:
          <em>la plage</em>, <em>la page</em>, <em>l'image</em>, <em>la cage</em>.
          Astuce&nbsp;: ce sont des mots courts. Les longs mots en <strong>-age</strong>
          (<em>le fromage</em>, <em>le paysage</em>) sont masculins.
        </div>
      </article>

      <!-- ── Le réflexe ─────────────────────────────── -->
      <article>
        <h2>3. Le réflexe qui compte le plus</h2>

        <div class="astuce">
          <p class="astuce-hook">
            N'apprenez jamais <em>maison</em>. Apprenez <strong class="hl-blue">une maison</strong>.
          </p>
          <p>
            Le genre n'est pas une information séparée du mot&nbsp;: il en fait partie. Un nom
            noté avec son article s'apprend une seule fois&nbsp;; un nom noté seul devra être
            réappris à chaque fois que vous l'utiliserez.
          </p>
        </div>

        <div class="example">
          À noter ainsi : <strong>une</strong> table · <strong>un</strong> livre ·
          <strong>une</strong> voiture · <strong>un</strong> lait<br>
          Et non : <s>table</s> · <s>livre</s> · <s>voiture</s> · <s>lait</s>
        </div>

        <div class="attention">
          Devant une voyelle, l'article défini s'élide et cache le genre&nbsp;:
          <em>l'hôtel</em>, <em>l'eau</em>. Notez ces mots-là avec <strong>un</strong> ou
          <strong>une</strong> — <em>un hôtel</em>, <em>une eau</em> — sinon l'information disparaît.
        </div>

        <p class="sep">
          <RouterLink class="lesson-link" to="/grammaire/les-articles">
            Voir la leçon complète : Les articles
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

      <RelatedLinks />

    </main>
  </AltLayout>
</template>

<script setup>
import AltLayout from '@/layouts/AltLayout.vue'
import RelatedLinks from '@/components/RelatedLinks.vue'

function downloadPdf() { window.print() }
</script>
