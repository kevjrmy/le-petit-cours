<!-- view-meta: created=2026-08-10; updated=2026-08-10 -->
<template>
  <AltLayout title="Les pronoms COD et COI">
    <main class="lesson">

      <!-- ── Règle ─────────────────────────────────── -->
      <article>
        <div class="rule">
          Pour ne pas répéter un nom, on le remplace par un <strong class="hl-blue">pronom</strong>.
          En français, ce pronom se place <strong class="hl-red">devant le verbe</strong>.
        </div>
        <div class="attention">
          💡 <strong>Tip para hispanohablantes&nbsp;:</strong> es tu <em>lo / la / le</em>
          (<em>lo veo, le hablo</em>) y va delante del verbo, <strong>igual que en español</strong>.
          La gran diferencia&nbsp;: en francés <strong class="hl-red">nunca</strong> se pega al final
          del infinitivo. <em>Voy a verlo</em> → <em>Je vais <strong>le</strong> voir</em>, jamás «&nbsp;voir-le&nbsp;».
        </div>
      </article>

      <!-- ── COD ────────────────────────────────────── -->
      <article>
        <h2>1. Le COD — sans préposition</h2>
        <p class="method">
          Le complément d'objet <strong>direct</strong> répond à la question
          <strong>qui&nbsp;?</strong> ou <strong>quoi&nbsp;?</strong> après le verbe.
        </p>

        <table>
          <caption class="sr-only">Les pronoms compléments d'objet direct</caption>
          <thead>
            <tr>
              <th>Pronom</th>
              <th>Remplace</th>
              <th>Exemple</th>
              <th>Traducción (ES)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="aux">me / m'</td>
              <td class="person">moi</td>
              <td>Il <strong>me</strong> regarde.</td>
              <td class="translation">Me mira.</td>
            </tr>
            <tr>
              <td class="aux">te / t'</td>
              <td class="person">toi</td>
              <td>Je <strong>te</strong> vois.</td>
              <td class="translation">Te veo.</td>
            </tr>
            <tr>
              <td class="aux">le / l'</td>
              <td class="person">un nom masculin</td>
              <td>Je <strong>le</strong> mange.</td>
              <td class="translation">Lo como.</td>
            </tr>
            <tr>
              <td class="aux">la / l'</td>
              <td class="person">un nom féminin</td>
              <td>Je <strong>la</strong> connais.</td>
              <td class="translation">La conozco.</td>
            </tr>
            <tr>
              <td class="aux">nous</td>
              <td class="person">nous</td>
              <td>Elle <strong>nous</strong> invite.</td>
              <td class="translation">Nos invita.</td>
            </tr>
            <tr>
              <td class="aux">vous</td>
              <td class="person">vous</td>
              <td>Je <strong>vous</strong> écoute.</td>
              <td class="translation">Os escucho.</td>
            </tr>
            <tr>
              <td class="aux">les</td>
              <td class="person">un pluriel</td>
              <td>Je <strong>les</strong> achète.</td>
              <td class="translation">Los / las compro.</td>
            </tr>
          </tbody>
        </table>

        <div class="example">
          Tu regardes <strong>le film</strong>&nbsp;?
          <span class="arrow-inline" aria-hidden="true">→</span>
          Oui, je <strong class="hl-blue">le</strong> regarde.
        </div>
      </article>

      <!-- ── COI ────────────────────────────────────── -->
      <article>
        <h2>2. Le COI — avec la préposition «&nbsp;à&nbsp;»</h2>
        <p class="method">
          Le complément d'objet <strong>indirect</strong> répond à <strong>à qui&nbsp;?</strong>
          Seules les 3<sup>es</sup> personnes changent&nbsp;: <strong class="hl-blue">lui</strong> et
          <strong class="hl-blue">leur</strong>.
        </p>

        <table>
          <caption class="sr-only">Les pronoms compléments d'objet indirect</caption>
          <thead>
            <tr>
              <th>Pronom</th>
              <th>Exemple</th>
              <th>Traducción (ES)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="aux">me, te, nous, vous</td>
              <td>Il <strong>me</strong> parle.</td>
              <td class="translation">Me habla.</td>
            </tr>
            <tr>
              <td class="aux">lui</td>
              <td>Je <strong>lui</strong> téléphone.</td>
              <td class="translation">Le llamo (a él / a ella).</td>
            </tr>
            <tr>
              <td class="aux">leur</td>
              <td>Je <strong>leur</strong> écris.</td>
              <td class="translation">Les escribo.</td>
            </tr>
          </tbody>
        </table>

        <div class="attention">
          <strong>lui</strong> sert pour le masculin <em>et</em> le féminin. Et
          <strong class="hl-red">leur</strong> pronom ne prend <strong>jamais de -s</strong>&nbsp;:
          ne le confondez pas avec <em>leurs amis</em> (déterminant possessif).
        </div>
      </article>

      <!-- ── Exceptions ─────────────────────────────── -->
      <article>
        <div class="exception">
          <strong>La place du pronom.</strong> Toujours devant le verbe conjugué — sauf avec un
          infinitif, où il se place devant l'<strong>infinitif</strong>. Au passé composé, il passe
          devant l'auxiliaire.
        </div>
        <div class="example exception-ex">
          Je <strong class="hl-red">le</strong> vois.
          <span class="sep">·</span>
          Je vais <strong class="hl-red">le</strong> voir.
          <span class="sep">·</span>
          Je <strong class="hl-red">l'</strong>ai vu.
          <span class="sep">·</span>
          Je ne <strong class="hl-red">le</strong> vois pas.
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
