<!-- view-meta: created=2026-08-10; updated=2026-08-10 -->
<template>
  <AltLayout title="L'impératif">
    <main class="lesson">

      <!-- ── Règle ─────────────────────────────────── -->
      <article>
        <div class="rule">
          L'<strong class="hl-blue">impératif</strong> sert à donner un ordre, un conseil ou une
          instruction. Il n'a que <strong>trois personnes</strong> (tu, nous, vous) et
          <strong class="hl-red">on n'écrit pas le pronom sujet</strong>.
        </div>
        <div class="attention">
          💡 <strong>Tip para hispanohablantes&nbsp;:</strong> igual que en español
          (<em>¡Habla! ¡Hablemos! ¡Hablad!</em>), el sujeto desaparece. Lo nuevo para ti&nbsp;:
          en francés el imperativo <strong>se parece al presente</strong>, no tiene formas
          propias que aprender — salvo cuatro verbos.
        </div>
      </article>

      <!-- ── Formation ──────────────────────────────── -->
      <article>
        <h2>1. La formation</h2>
        <p class="method">
          On prend le <strong>présent</strong> et on enlève le pronom sujet.
        </p>

        <table>
          <caption class="sr-only">Formation de l'impératif à partir du présent</caption>
          <thead>
            <tr>
              <th>Présent</th>
              <th>Impératif</th>
              <th>Traducción (ES)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="person">tu parles</td>
              <td class="aux">Parle&nbsp;!</td>
              <td class="translation">¡Habla!</td>
            </tr>
            <tr>
              <td class="person">nous parlons</td>
              <td class="aux">Parlons&nbsp;!</td>
              <td class="translation">¡Hablemos!</td>
            </tr>
            <tr>
              <td class="person">vous parlez</td>
              <td class="aux">Parlez&nbsp;!</td>
              <td class="translation">¡Hable(n)! / ¡Hablad!</td>
            </tr>
            <tr>
              <td class="person">tu finis</td>
              <td class="aux">Finis&nbsp;!</td>
              <td class="translation">¡Termina!</td>
            </tr>
            <tr>
              <td class="person">tu attends</td>
              <td class="aux">Attends&nbsp;!</td>
              <td class="translation">¡Espera!</td>
            </tr>
          </tbody>
        </table>

        <div class="attention">
          Pour les verbes en <strong>-er</strong>, le <strong class="hl-red">-s</strong> de
          «&nbsp;tu&nbsp;» <strong>disparaît</strong>&nbsp;: <em>tu manges</em> →
          <strong class="hl-blue">Mange&nbsp;!</strong> C'est la faute la plus fréquente.
          Les autres verbes gardent leur <em>-s</em>&nbsp;: <em>Finis&nbsp;! Attends&nbsp;! Viens&nbsp;!</em>
        </div>
      </article>

      <!-- ── Négatif et pronoms ─────────────────────── -->
      <article>
        <h2>2. La forme négative et les pronoms</h2>
        <p class="method">
          À la forme <strong>négative</strong>, le pronom revient <strong>devant</strong> le verbe,
          comme d'habitude. À la forme <strong>affirmative</strong>, il passe
          <strong class="hl-blue">après</strong>, avec un trait d'union.
        </p>

        <table>
          <caption class="sr-only">Place du pronom à l'impératif affirmatif et négatif</caption>
          <thead>
            <tr>
              <th>Affirmatif</th>
              <th>Négatif</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Regarde<strong class="hl-blue">-moi</strong>&nbsp;!</td>
              <td>Ne <strong class="hl-red">me</strong> regarde pas&nbsp;!</td>
            </tr>
            <tr>
              <td>Lève<strong class="hl-blue">-toi</strong>&nbsp;!</td>
              <td>Ne <strong class="hl-red">te</strong> lève pas&nbsp;!</td>
            </tr>
            <tr>
              <td>Prends<strong class="hl-blue">-en</strong>&nbsp;!</td>
              <td>N'<strong class="hl-red">en</strong> prends pas&nbsp;!</td>
            </tr>
          </tbody>
        </table>

        <div class="example">
          <strong class="hl-blue">Tournez</strong> à droite, puis <strong class="hl-blue">continuez</strong>
          tout droit.
          <span class="note">(Gire a la derecha, luego siga recto — pour indiquer un chemin)</span>
        </div>
      </article>

      <!-- ── Exception ──────────────────────────────── -->
      <article>
        <div class="exception">
          <strong>Quatre verbes irréguliers</strong> à connaître. Ils ne suivent pas le présent.
        </div>
        <div class="example exception-ex">
          être → <strong class="hl-red">Sois</strong>, Soyons, Soyez
          <span class="sep">·</span>
          avoir → <strong class="hl-red">Aie</strong>, Ayons, Ayez
        </div>
        <div class="example exception-ex">
          savoir → <strong class="hl-red">Sache</strong>, Sachons, Sachez
          <span class="sep">·</span>
          vouloir → <strong class="hl-red">Veuille</strong>, Veuillez
          <span class="note">(Veuillez = «&nbsp;tenga la amabilidad de&nbsp;», très poli)</span>
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
