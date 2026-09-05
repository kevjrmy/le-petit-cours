<!-- view-meta: created=2026-08-10; updated=2026-08-10 -->
<template>
  <AltLayout title="Les pronoms Y et EN">
    <main class="lesson">

      <!-- ── Règle ─────────────────────────────────── -->
      <article>
        <div class="rule">
          <strong class="hl-blue">Y</strong> remplace un lieu ou un complément introduit par
          <strong>à</strong>. <strong class="hl-blue">EN</strong> remplace un complément introduit
          par <strong>de</strong> ou une quantité. Tous deux se placent <strong>devant le verbe</strong>.
        </div>
        <div class="attention">
          💡 <strong>Tip para hispanohablantes&nbsp;:</strong> estos dos pronombres
          <strong class="hl-red">no existen en español</strong>. No busques traducción&nbsp;: en
          español simplemente no se dice nada (<em>—¿Vas a París? —Sí, voy</em>), pero en francés
          <strong>es obligatorio</strong> ponerlos&nbsp;: <em>—Tu vas à Paris&nbsp;? —Oui, j'<strong>y</strong> vais.</em>
          Es el error número uno de los hispanohablantes.
        </div>
      </article>

      <!-- ── Y ──────────────────────────────────────── -->
      <article>
        <h2>1. Le pronom Y</h2>

        <table>
          <caption class="sr-only">Emplois du pronom y</caption>
          <thead>
            <tr>
              <th>Remplace</th>
              <th>Question</th>
              <th>Exemple</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="aux">un lieu</td>
              <td class="person">où&nbsp;?</td>
              <td>Je vais <strong>à Paris</strong> → J'<strong class="hl-blue">y</strong> vais.</td>
            </tr>
            <tr>
              <td class="aux">à + chose</td>
              <td class="person">à quoi&nbsp;?</td>
              <td>Je pense <strong>à mon travail</strong> → J'<strong class="hl-blue">y</strong> pense.</td>
            </tr>
          </tbody>
        </table>

        <div class="example">
          Tu habites <strong>en Espagne</strong>&nbsp;?
          <span class="arrow-inline" aria-hidden="true">→</span>
          Oui, j'<strong class="hl-blue">y</strong> habite depuis dix ans.
          <span class="note">(Sí, vivo allí desde hace diez años)</span>
        </div>
      </article>

      <!-- ── EN ─────────────────────────────────────── -->
      <article>
        <h2>2. Le pronom EN</h2>

        <table>
          <caption class="sr-only">Emplois du pronom en</caption>
          <thead>
            <tr>
              <th>Remplace</th>
              <th>Exemple</th>
              <th>Traducción (ES)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="aux">de + lieu</td>
              <td>Je viens <strong>de Lyon</strong> → J'<strong class="hl-blue">en</strong> viens.</td>
              <td class="translation">Vengo de allí.</td>
            </tr>
            <tr>
              <td class="aux">de + chose</td>
              <td>Je parle <strong>du film</strong> → J'<strong class="hl-blue">en</strong> parle.</td>
              <td class="translation">Hablo de ello.</td>
            </tr>
            <tr>
              <td class="aux">un partitif</td>
              <td>Je mange <strong>du pain</strong> → J'<strong class="hl-blue">en</strong> mange.</td>
              <td class="translation">Como (de eso).</td>
            </tr>
            <tr>
              <td class="aux">une quantité</td>
              <td>J'ai <strong>deux frères</strong> → J'<strong class="hl-blue">en</strong> ai deux.</td>
              <td class="translation">Tengo dos.</td>
            </tr>
          </tbody>
        </table>

        <div class="attention">
          Avec une quantité, le <strong>nombre reste à la fin</strong> de la phrase&nbsp;:
          <em>J'en ai <strong class="hl-blue">deux</strong></em>, <em>Il en veut
          <strong class="hl-blue">beaucoup</strong></em>. On ne peut pas dire «&nbsp;J'ai deux&nbsp;»
          tout seul.
        </div>
      </article>

      <!-- ── Exception ──────────────────────────────── -->
      <article>
        <div class="exception">
          <strong>Y et EN ne remplacent jamais une personne.</strong> Pour une personne, on garde
          la préposition et on utilise un pronom tonique (moi, toi, lui, elle, nous, vous, eux, elles).
        </div>
        <div class="example exception-ex">
          Je pense <strong>à mon travail</strong> → J'<strong class="hl-red">y</strong> pense.
          <span class="sep">·</span>
          Je pense <strong>à ma sœur</strong> → Je pense <strong class="hl-red">à elle</strong>.
        </div>
        <div class="example exception-ex">
          Devant <strong>y</strong> et <strong>en</strong>, «&nbsp;je&nbsp;» devient
          <strong class="hl-red">j'</strong>&nbsp;: <em>j'y vais, j'en ai</em>.
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
