<!-- view-meta: created=2026-08-10; updated=2026-08-17 -->
<template>
  <AltLayout title="Les prépositions de lieu">
    <main class="lesson">

      <!-- ── Règle ─────────────────────────────────── -->
      <article>
        <div class="rule">
          Pour dire <strong>où l'on est</strong> ou <strong>où l'on va</strong>, la préposition
          change selon le mot qui suit&nbsp;: une ville, un pays, ou une personne.
        </div>
        <div class="attention">
          💡 <strong>Tip para hispanohablantes&nbsp;:</strong> en español dices siempre
          <em>en / a</em> sin pensar (<em>en Francia, a Francia</em>). En francés hay que
          <strong>mirar el género del país</strong>. Y existe una preposición que no tienes&nbsp;:
          <strong class="hl-blue">chez</strong>, para «&nbsp;en casa de&nbsp;».
        </div>
      </article>

      <!-- ── Villes et pays ─────────────────────────── -->
      <article>
        <h2>1. Villes et pays</h2>

        <table>
          <caption class="sr-only">Prépositions devant les villes et les pays</caption>
          <thead>
            <tr>
              <th>Devant</th>
              <th>Préposition</th>
              <th>Exemple</th>
              <th>Traducción (ES)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="person">une ville</td>
              <td class="aux">à</td>
              <td>J'habite <strong>à</strong> Valence.</td>
              <td class="translation">Vivo en Valencia.</td>
            </tr>
            <tr>
              <td class="person">un pays féminin (‑e)</td>
              <td class="aux">en</td>
              <td>Je vais <strong>en</strong> France.</td>
              <td class="translation">Voy a Francia.</td>
            </tr>
            <tr>
              <td class="person">un pays masculin</td>
              <td class="aux">au</td>
              <td>Je vais <strong>au</strong> Portugal.</td>
              <td class="translation">Voy a Portugal.</td>
            </tr>
            <tr>
              <td class="person">un pays pluriel</td>
              <td class="aux">aux</td>
              <td>Je vais <strong>aux</strong> États-Unis.</td>
              <td class="translation">Voy a Estados Unidos.</td>
            </tr>
            <tr>
              <td class="person">un pays commençant par une voyelle</td>
              <td class="aux">en</td>
              <td>Je vais <strong>en</strong> Iran.</td>
              <td class="translation">Voy a Irán.</td>
            </tr>
          </tbody>
        </table>

        <div class="attention">
          La règle simple&nbsp;: un pays qui finit par <strong class="hl-blue">-e</strong> est
          féminin → <strong>en</strong> (la France, l'Espagne, l'Italie, la Suisse, la Belgique).
          Les autres sont masculins → <strong>au</strong> (le Portugal, le Maroc, le Canada,
          le Japon, le Brésil).
        </div>

        <div class="exception">
          Quelques pays finissent par <strong>-e</strong> mais restent masculins&nbsp;:
          on dit <strong>au</strong> Mexique, <strong>au</strong> Cambodge,
          <strong>au</strong> Mozambique, <strong>au</strong> Zimbabwe.
        </div>
      </article>

      <!-- ── Chez ───────────────────────────────────── -->
      <article>
        <h2>2. «&nbsp;Chez&nbsp;» — devant une personne</h2>
        <p class="method">
          <strong class="hl-blue">Chez</strong> s'emploie devant un nom de personne, un pronom
          tonique, ou un métier. Il n'a pas d'équivalent en un seul mot en espagnol.
        </p>

        <div class="example">
          Je vais <strong class="hl-blue">chez</strong> le médecin.
          <span class="sep">·</span>
          On mange <strong class="hl-blue">chez</strong> moi&nbsp;?
          <span class="sep">·</span>
          Elle travaille <strong class="hl-blue">chez</strong> Renault.
          <span class="note">(al médico · en mi casa · en Renault)</span>
        </div>
      </article>

      <!-- ── Situer ─────────────────────────────────── -->
      <article>
        <h2>3. Situer un objet</h2>

        <table>
          <caption class="sr-only">Prépositions pour situer un objet dans l'espace</caption>
          <thead>
            <tr>
              <th>Français</th>
              <th>Espagnol</th>
              <th>Français</th>
              <th>Espagnol</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="aux">sur</td><td class="translation">sobre, encima de</td>
              <td class="aux">sous</td><td class="translation">debajo de</td>
            </tr>
            <tr>
              <td class="aux">dans</td><td class="translation">dentro de, en</td>
              <td class="aux">devant</td><td class="translation">delante de</td>
            </tr>
            <tr>
              <td class="aux">derrière</td><td class="translation">detrás de</td>
              <td class="aux">entre</td><td class="translation">entre</td>
            </tr>
            <tr>
              <td class="aux">à côté de</td><td class="translation">al lado de</td>
              <td class="aux">en face de</td><td class="translation">enfrente de</td>
            </tr>
          </tbody>
        </table>

        <div class="exception">
          <strong>Attention aux contractions&nbsp;:</strong> <em>à côté de</em> et
          <em>en face de</em> fusionnent avec l'article —
          <strong class="hl-red">du</strong> (de + le),
          <strong class="hl-red">des</strong> (de + les).
        </div>
        <div class="example exception-ex">
          à côté <strong class="hl-red">du</strong> parc
          <span class="sep">·</span>
          en face <strong class="hl-red">de la</strong> gare
          <span class="sep">·</span>
          à côté <strong class="hl-red">des</strong> enfants
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
