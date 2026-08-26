<!-- view-meta: created=2026-08-17; updated=2026-08-17 -->
<template>
  <AltLayout title="Passé composé : être ou avoir ?">
    <main class="lesson">

      <!-- ── Le principe ────────────────────────────── -->
      <article>
        <h2>1. Renversez la question</h2>

        <div class="astuce">
          <p class="astuce-hook">
            N'apprenez pas la liste de <strong class="hl-blue">avoir</strong> : elle est infinie.
            Apprenez la petite liste de <strong class="hl-blue">être</strong>.
          </p>
          <p>
            La quasi-totalité des verbes français se conjuguent avec <em>avoir</em>&nbsp;; seule une
            vingtaine prend <em>être</em>. Si le verbe n'est pas dans cette courte liste, la réponse
            est <strong>avoir</strong>, sans hésiter. En espagnol le passé se forme toujours avec
            <em>haber</em> (<em>he comido</em>, <em>he ido</em>)&nbsp;: c'est donc <em>être</em> qui
            demande un effort, jamais <em>avoir</em>.
          </p>
        </div>
      </article>

      <!-- ── La liste ───────────────────────────────── -->
      <article>
        <h2>2. La liste d'être tient par paires</h2>

        <div class="astuce">
          <p class="astuce-hook">
            Les verbes d'<strong class="hl-blue">être</strong> vont deux par deux,
            chacun avec son contraire.
          </p>
          <p>
            Retenir un couple coûte à peine plus qu'un verbe seul, et vous en récupérez deux.
            Ce sont tous des verbes de mouvement ou de changement d'état.
          </p>
        </div>


        <table>
          <caption class="sr-only">Les verbes qui se conjuguent avec être, par paires de contraires</caption>
          <thead>
            <tr>
              <th>Verbe</th>
              <th>Son contraire</th>
              <th>Traducción (ES)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="person">aller</td>
              <td class="aux">venir</td>
              <td class="translation">ir / venir</td>
            </tr>
            <tr>
              <td class="person">entrer</td>
              <td class="aux">sortir</td>
              <td class="translation">entrar / salir</td>
            </tr>
            <tr>
              <td class="person">monter</td>
              <td class="aux">descendre</td>
              <td class="translation">subir / bajar</td>
            </tr>
            <tr>
              <td class="person">arriver</td>
              <td class="aux">partir</td>
              <td class="translation">llegar / salir</td>
            </tr>
            <tr>
              <td class="person">naître</td>
              <td class="aux">mourir</td>
              <td class="translation">nacer / morir</td>
            </tr>
            <tr>
              <td class="person">rester</td>
              <td class="aux">tomber</td>
              <td class="translation">quedarse / caer</td>
            </tr>
          </tbody>
        </table>

        <h3>Et tous les verbes pronominaux</h3>

        <div class="astuce">
          <p class="astuce-hook">
            Verbe pronominal (<strong class="hl-blue">se</strong> laver, <strong class="hl-blue">se</strong> lever)
            → <strong class="hl-blue">être</strong>, toujours.
          </p>
          <p>
            Aucune exception, aucune liste&nbsp;: il suffit de voir le <em>se</em>.
          </p>
        </div>

        <div class="example">
          Je <strong>suis</strong> allé au marché. · Elle <strong>est</strong> partie à huit heures. ·
          Nous <strong>sommes</strong> restés à la maison.<br>
          Je me <strong>suis</strong> levé tôt. · Elle s'<strong>est</strong> lavée. ·
          Nous nous <strong>sommes</strong> promenés.
        </div>
      </article>

      <!-- ── L'accord ───────────────────────────────── -->
      <article>
        <h2>3. Avec être, le participe s'accorde</h2>

        <div class="astuce">
          <p class="astuce-hook">
            Avec <strong class="hl-blue">être</strong>, le participe s'accorde avec le sujet —
            comme un adjectif.
          </p>
          <p>
            Avec <em>avoir</em>, il ne bouge pas&nbsp;: <em>elle a mangé</em>, jamais
            <s>elle a mangée</s>. C'est la contrepartie de la petite liste.
          </p>
        </div>

        <div class="example">
          Il est allé · Elle est allé<strong class="hl-red">e</strong> ·
          Ils sont allé<strong class="hl-red">s</strong> · Elles sont allé<strong class="hl-red">es</strong>
        </div>

        <div class="exception">
          <strong>Quatre verbes jouent double jeu.</strong> <em>Monter, descendre, sortir, passer</em>
          prennent <strong>avoir</strong> quand ils sont suivis d'un complément d'objet&nbsp;:
          <em>je <strong>suis</strong> sorti</em> (yo salí) mais
          <em>j'<strong>ai</strong> sorti la poubelle</em> (saqué la basura).
        </div>

        <p class="sep">
          <RouterLink class="lesson-link" to="/grammaire/le-passe-compose">
            Voir la leçon complète : Le passé composé
          </RouterLink><br>
          <RouterLink class="lesson-link" to="/exercices/etre-ou-avoir">
            S'entraîner : l'exercice « Être ou avoir »
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
