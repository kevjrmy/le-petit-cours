<!-- view-meta: created=2026-08-17; updated=2026-08-17 -->
<template>
  <AltLayout title="Le test de substitution">
    <main class="lesson">

      <!-- ── Le principe ────────────────────────────── -->
      <article>
        <h2>1. Une seule méthode pour tous les homophones</h2>

        <div class="astuce">
          <p class="astuce-hook">
            Deux mots se prononcent pareil&nbsp;? <strong class="hl-blue">Remplacez-en un.</strong>
            Si la phrase tient debout, c'est celui-là.
          </p>
          <p>
            Vous n'avez pas besoin de savoir ce qu'est un auxiliaire ou un pronom. Vous avez
            besoin d'un mot de remplacement et de votre oreille&nbsp;: si la phrase devient
            absurde, changez d'orthographe.
          </p>
        </div>

        <div class="method">
          <em>Il a mangé</em> → <em>Il <strong>avait</strong> mangé</em> ✓ &nbsp;donc « a » sans accent.<br>
          <em>Il va a Paris</em> → <em>Il va <strong>avait</strong> Paris</em> ✗ &nbsp;donc « à » avec accent.
        </div>
      </article>

      <!-- ── Le tableau ─────────────────────────────── -->
      <article>
        <h2>2. Le mot de remplacement de chaque paire</h2>

        <table class="dense">
          <caption class="sr-only">Mot de remplacement pour tester chaque homophone</caption>
          <thead>
            <tr>
              <th>Paire</th>
              <th>Remplacez par</th>
              <th>Si ça marche</th>
              <th>Sinon</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="person">a / à</td>
              <td class="aux">avait</td>
              <td><strong>a</strong> (verbe)</td>
              <td><strong>à</strong></td>
            </tr>
            <tr>
              <td class="person">est / et</td>
              <td class="aux">était</td>
              <td><strong>est</strong> (verbe)</td>
              <td><strong>et</strong></td>
            </tr>
            <tr>
              <td class="person">son / sont</td>
              <td class="aux">étaient</td>
              <td><strong>sont</strong> (verbe)</td>
              <td><strong>son</strong></td>
            </tr>
            <tr>
              <td class="person">ou / où</td>
              <td class="aux">ou bien</td>
              <td><strong>ou</strong> (choix)</td>
              <td><strong>où</strong> (lieu)</td>
            </tr>
            <tr>
              <td class="person">ce / se</td>
              <td class="aux">ce livre-là</td>
              <td><strong>ce</strong> (devant un nom)</td>
              <td><strong>se</strong> (devant un verbe)</td>
            </tr>
            <tr>
              <td class="person">on / ont</td>
              <td class="aux">avaient</td>
              <td><strong>ont</strong> (verbe)</td>
              <td><strong>on</strong></td>
            </tr>
          </tbody>
        </table>

        <div class="attention">
          Le principe est toujours le même&nbsp;: on remplace par <strong>un temps du passé</strong>.
          Un verbe accepte de changer de temps&nbsp;; une préposition ou un possessif, non.
          C'est pour cela que le test fonctionne.
        </div>
      </article>

      <!-- ── À l'œuvre ──────────────────────────────── -->
      <article>
        <h2>3. Le test en situation</h2>

        <div class="example">
          <em>Elle est partie</em> → <em>Elle <strong>était</strong> partie</em> ✓ · on écrit <strong>est</strong>.<br>
          <em>Paul et Marie</em> → <em>Paul <strong>était</strong> Marie</em> ✗ · on écrit <strong>et</strong>.<br>
          <em>Où vas-tu&nbsp;?</em> → <em><strong>Ou bien</strong> vas-tu&nbsp;?</em> ✗ · on écrit <strong>où</strong>.<br>
          <em>Thé ou café&nbsp;?</em> → <em>Thé <strong>ou bien</strong> café&nbsp;?</em> ✓ · on écrit <strong>ou</strong>.
        </div>

        <div class="astuce">
          <p class="astuce-hook">
            Pour <strong class="hl-blue">où</strong>, pensez à l'accent comme à une flèche&nbsp;:
            il pointe vers un endroit.
          </p>
          <p>
            <em>Où</em> répond toujours à la question « à quel endroit&nbsp;? »
            (<em>¿dónde?</em>). Sans accent, <em>ou</em> propose un choix (<em>o</em>).
          </p>
        </div>

        <div class="exception">
          Le test échoue quand la phrase est déjà au passé&nbsp;: dans <em>il a eu</em>,
          remplacer par <em>avait</em> donne <em>il avait eu</em>, qui marche aussi. Dans ce cas,
          repérez plutôt le participe qui suit&nbsp;: s'il y en a un, <em>a</em> est le verbe.
        </div>

        <p class="sep">
          <RouterLink class="lesson-link" to="/orthographe/les-homophones">
            Voir la leçon complète : Les homophones grammaticaux
          </RouterLink><br>
          <RouterLink class="lesson-link" to="/exercices/trouve-la-faute">
            S'entraîner : l'exercice « Trouve la faute »
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
