<!-- view-meta: created=2026-08-10; updated=2026-08-10 -->
<template>
  <AltLayout title="Pouvoir, vouloir, devoir">
    <main class="lesson">

      <!-- ── Règle ─────────────────────────────────── -->
      <article>
        <div class="rule">
          <strong class="hl-blue">Pouvoir</strong>, <strong class="hl-blue">vouloir</strong> et
          <strong class="hl-blue">devoir</strong> expriment la capacité, l'envie et l'obligation.
          Ils sont toujours suivis d'un <strong class="hl-red">infinitif</strong>, sans préposition.
        </div>
        <div class="attention">
          💡 <strong>Tip para hispanohablantes&nbsp;:</strong> son tus <em>poder, querer, deber</em>
          y funcionan igual — <strong>verbo + infinitivo</strong>, sin nada en medio
          (<em>puedo hablar</em> → <em>je peux parler</em>). Los tres son irregulares en francés,
          pero como los usarás cada día, se aprenden solos.
        </div>
      </article>

      <!-- ── Conjugaison ────────────────────────────── -->
      <article>
        <h2>1. La conjugaison au présent</h2>

        <table>
          <caption class="sr-only">Conjugaison au présent de pouvoir, vouloir et devoir</caption>
          <thead>
            <tr>
              <th>Pronom</th>
              <th>pouvoir</th>
              <th>vouloir</th>
              <th>devoir</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="person">je</td>
              <td class="aux">peux</td><td class="aux">veux</td><td class="aux">dois</td>
            </tr>
            <tr>
              <td class="person">tu</td>
              <td class="aux">peux</td><td class="aux">veux</td><td class="aux">dois</td>
            </tr>
            <tr>
              <td class="person">il / elle / on</td>
              <td class="aux">peut</td><td class="aux">veut</td><td class="aux">doit</td>
            </tr>
            <tr>
              <td class="person">nous</td>
              <td class="aux">pouvons</td><td class="aux">voulons</td><td class="aux">devons</td>
            </tr>
            <tr>
              <td class="person">vous</td>
              <td class="aux">pouvez</td><td class="aux">voulez</td><td class="aux">devez</td>
            </tr>
            <tr>
              <td class="person">ils / elles</td>
              <td class="aux">peuvent</td><td class="aux">veulent</td><td class="aux">doivent</td>
            </tr>
          </tbody>
        </table>

        <div class="attention">
          Les trois suivent le même dessin&nbsp;: <strong>je</strong> et <strong>tu</strong> ont la
          même forme, et le radical <strong>change</strong> avec <em>nous</em> et <em>vous</em>
          (peux → pouvons, veux → voulons, dois → devons).
        </div>
      </article>

      <!-- ── Sens ───────────────────────────────────── -->
      <article>
        <h2>2. Le sens de chacun</h2>

        <table>
          <caption class="sr-only">Emploi de chaque verbe modal</caption>
          <thead>
            <tr>
              <th>Verbe</th>
              <th>Sens</th>
              <th>Exemple</th>
              <th>Traducción (ES)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="aux">pouvoir</td>
              <td class="person">capacité, permission</td>
              <td>Je <strong>peux</strong> venir demain.</td>
              <td class="translation">Puedo venir mañana.</td>
            </tr>
            <tr>
              <td class="aux">vouloir</td>
              <td class="person">envie, volonté</td>
              <td>Elle <strong>veut</strong> apprendre le français.</td>
              <td class="translation">Quiere aprender francés.</td>
            </tr>
            <tr>
              <td class="aux">devoir</td>
              <td class="person">obligation personnelle</td>
              <td>Nous <strong>devons</strong> partir.</td>
              <td class="translation">Tenemos que irnos.</td>
            </tr>
            <tr>
              <td class="aux">il faut</td>
              <td class="person">obligation générale</td>
              <td><strong>Il faut</strong> réserver à l'avance.</td>
              <td class="translation">Hay que reservar con antelación.</td>
            </tr>
          </tbody>
        </table>

        <div class="example">
          Je <strong class="hl-blue">dois</strong> travailler
          <span class="note">(obligación mía)</span>
          <span class="sep">·</span>
          <strong class="hl-blue">Il faut</strong> travailler
          <span class="note">(hay que — vale para todos)</span>
        </div>
      </article>

      <!-- ── Il faut ────────────────────────────────── -->
      <article>
        <div class="attention">
          <strong class="hl-blue">Il faut</strong> est <strong>impersonnel</strong>&nbsp;: le
          «&nbsp;il&nbsp;» ne désigne personne, exactement comme dans <em>il pleut</em>. Il ne se
          conjugue jamais à une autre personne&nbsp;: on ne dit pas «&nbsp;<em>je faut</em>&nbsp;».
        </div>
      </article>

      <!-- ── Exception ──────────────────────────────── -->
      <article>
        <div class="exception">
          <strong>Politesse&nbsp;: passez au conditionnel.</strong> Au présent, <em>je veux</em>
          sonne dur en français. Pour demander quelque chose, on emploie presque toujours
          <strong class="hl-red">je voudrais</strong> ou <strong class="hl-red">pourriez-vous</strong>.
        </div>
        <div class="example exception-ex">
          ✓ <strong class="hl-red">Je voudrais</strong> un café.
          <span class="sep">·</span>
          ✓ <strong class="hl-red">Pourriez-vous</strong> m'aider&nbsp;?
          <br />
          ✗ <span class="note">Je veux un café. (correcto gramaticalmente, pero suena brusco)</span>
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
