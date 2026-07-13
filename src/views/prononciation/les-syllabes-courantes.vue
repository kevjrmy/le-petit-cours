<template>
  <AltLayout title="Les syllabes les plus courantes">
    <main class="lesson">

      <!-- Règle -->
      <article>
        <div class="rule">
          En français, plusieurs <strong class="hl-blue">groupes de lettres</strong> se prononcent toujours de la même façon. Apprendre ces <strong class="hl-blue">syllabes types</strong> permet de lire n'importe quel mot, même sans le connaître.
          En espagnol, chaque lettre a une seule prononciation. En français, la même lettre peut se prononcer différemment selon les lettres qui l'entourent, donc il faut mémoriser les combinaisons.
        </div>
      </article>

      <!-- Sons du groupe OU / U -->
      <article>
        <h2>1. « ou » et « u »</h2>
        <p class="method">
          Ces deux sons n'existent pas en espagnol avec la même distinction. Il faut faire attention.
        </p>

        <table>
          <caption class="sr-only">Comparaison des sons ou et u</caption>
          <thead>
            <tr>
              <th>Graphie</th>
              <th>Son phonétique</th>
              <th>Exemples</th>
              <th>Traducción (ES)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="graphie">ou</td>
              <td class="phone">/u/</td>
              <td><strong>ou</strong>rs, t<strong>ou</strong>r, v<strong>ou</strong>s</td>
              <td class="transl">como « u » en español (luna)</td>
            </tr>
            <tr>
              <td class="graphie">u</td>
              <td class="phone">/y/</td>
              <td>t<strong>u</strong>, r<strong>u</strong>e, l<strong>u</strong>ne</td>
              <td class="transl">no existe en español: labios de « u », lengua de « i »</td>
            </tr>
          </tbody>
        </table>
        <div class="attention">
          « tu » et « tout » se prononcent <strong class="hl-red">différemment</strong>. Pratiquez devant un miroir pour distinguer les lèvres.
        </div>
      </article>

      <!-- Sons EU -->
      <article>
        <h2>2. « eu » et « oeu »</h2>
        <p class="method">
          Le son /oe/ ou /o/ selon la position dans le mot (ouvert en syllabe fermée, fermé en syllabe ouverte).
        </p>

        <table>
          <caption class="sr-only">Sons eu et oeu</caption>
          <thead>
            <tr>
              <th>Graphie</th>
              <th>Son phonétique</th>
              <th>Exemples</th>
              <th>Traducción (ES)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="graphie">eu (ouvert)</td>
              <td class="phone">/oe/</td>
              <td>p<strong>eu</strong>r, c<strong>oeu</strong>r, s<strong>oeu</strong>r</td>
              <td class="transl">miedo, corazón, hermana</td>
            </tr>
            <tr>
              <td class="graphie">eu (fermé)</td>
              <td class="phone">/o/</td>
              <td>j<strong>eu</strong>, bl<strong>eu</strong>, f<strong>eu</strong></td>
              <td class="transl">juego, azul, fuego</td>
            </tr>
          </tbody>
        </table>
      </article>

      <!-- Sons AN / EN / AM / EM -->
      <article>
        <h2>3. « an » / « en » / « am » / « em »</h2>
        <p class="method">
          Toutes ces graphies donnent le même son nasal /a/.
        </p>

        <table>
          <caption class="sr-only">Sons nasaux an en am em</caption>
          <thead>
            <tr>
              <th>Graphie</th>
              <th>Son phonétique</th>
              <th>Exemples</th>
              <th>Traducción (ES)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="graphie">an / am</td>
              <td class="phone">/ɑ̃/</td>
              <td><strong>an</strong>s, ch<strong>am</strong>ps, gr<strong>an</strong>d</td>
              <td class="transl">años, campos, grande</td>
            </tr>
            <tr>
              <td class="graphie">en / em</td>
              <td class="phone">/ɑ̃/</td>
              <td><strong>en</strong>fant, t<strong>em</strong>ps, v<strong>en</strong>t</td>
              <td class="transl">niño, tiempo, viento</td>
            </tr>
          </tbody>
        </table>
        <div class="attention">
          Attention: « <strong class="hl-red">en</strong> » dans un mot peut se prononcer /ɑ̃/ mais jamais /en/ comme en espagnol (el « e » se nazaliza, no se pronuncia abierto).
        </div>
      </article>

      <!-- Sons IN / AIN / EIN / IM / AIM -->
      <article>
        <h2>4. « in » / « ain » / « ein » / « im » / « aim »</h2>
        <p class="method">
          Toutes ces graphies donnent le même son nasal /e/.
        </p>

        <table>
          <caption class="sr-only">Sons nasaux in ain ein im aim</caption>
          <thead>
            <tr>
              <th>Graphie</th>
              <th>Exemples</th>
              <th>Traducción (ES)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="graphie">in / im</td>
              <td><strong>in</strong>viter, s<strong>im</strong>ple, v<strong>in</strong></td>
              <td class="transl">invitar, simple, vino</td>
            </tr>
            <tr>
              <td class="graphie">ain / aim</td>
              <td>m<strong>ain</strong>, f<strong>aim</strong>, pl<strong>ain</strong></td>
              <td class="transl">mano, hambre, plano</td>
            </tr>
            <tr>
              <td class="graphie">ein</td>
              <td>pl<strong>ein</strong>, p<strong>ein</strong>ture</td>
              <td class="transl">lleno, pintura</td>
            </tr>
          </tbody>
        </table>
      </article>

      <!-- Sons ON / OM -->
      <article>
        <h2>5. « on » / « om »</h2>
        <p class="method">
          Son nasal /o/. La bouche est arrondie et le son passe par le nez.
        </p>
        <div class="example">
          b<strong class="hl-blue">on</strong>, m<strong class="hl-blue">on</strong>sieur, s<strong class="hl-blue">on</strong>, n<strong class="hl-blue">om</strong>, t<strong class="hl-blue">om</strong>ber
          <span class="note">(buen, monsieur, su, nombre, caer)</span>
        </div>
        <div class="attention">
          Quand « on » est suivi d'une voyelle, le son nasal disparait parfois : b<strong class="hl-red">on</strong>ne se prononce /bɔn/ (pas nasal). La nasalisation disparait devant une double consonne ou quand on ajoute un « e ».
        </div>
      </article>

      <!-- Sons OI -->
      <article>
        <h2>6. « oi »</h2>
        <p class="method">
          La graphie « oi » se prononce toujours /wa/. Ce son n'existe pas en espagnol et surprend souvent les hispanophones.
        </p>
        <div class="example">
          m<strong class="hl-blue">oi</strong>, t<strong class="hl-blue">oi</strong>, r<strong class="hl-blue">oi</strong>, v<strong class="hl-blue">oi</strong>ture, b<strong class="hl-blue">oi</strong>re
          <span class="note">(yo, tú, rey, coche, beber)</span>
        </div>
      </article>

      <!-- Sons AU / EAU -->
      <article>
        <h2>7. « au » / « eau »</h2>
        <p class="method">
          Les deux graphies se prononcent /o/, comme le son « o » fermé en espagnol.
        </p>
        <div class="example">
          ch<strong class="hl-blue">au</strong>d, <strong class="hl-blue">au</strong>jourd'hui, g<strong class="hl-blue">eau</strong>, bure<strong class="hl-blue">au</strong>, t<strong class="hl-blue">eau</strong>
          <span class="note">(caliente, hoy, pastel, oficina, taladro)</span>
        </div>
      </article>

      <!-- Sons CH -->
      <article>
        <h2>8. « ch »</h2>
        <p class="method">
          En français, « ch » se prononce toujours /sh/, jamais /k/ comme dans certains mots espagnols ou grecs.
        </p>
        <div class="example">
          <strong class="hl-blue">ch</strong>at, <strong class="hl-blue">ch</strong>aud, <strong class="hl-blue">ch</strong>eval, dou<strong class="hl-blue">ch</strong>e
          <span class="note">(gato, caliente, caballo, ducha)</span>
        </div>
        <div class="exception">
          Exception : les mots d'origine grecque ou latine gardent le son /k/ : <strong class="hl-red">ch</strong>oriste, <strong class="hl-red">ch</strong>rysanthème.
        </div>
      </article>

      <!-- Sons ILL / IL -->
      <article>
        <h2>9. « ill » / « il » (en fin de mot)</h2>
        <p class="method">
          La combinaison « ill » ou « il » en fin de mot se prononce /ij/, similaire au son « y » de l'espagnol (comme dans « yo »).
        </p>
        <div class="example">
          fam<strong class="hl-blue">ille</strong>, trav<strong class="hl-blue">aille</strong>r, ore<strong class="hl-blue">ille</strong>, solem<strong class="hl-blue">il</strong>
          <span class="note">(familia, trabajar, oreja, sol)</span>
        </div>
        <div class="exception">
          Exception : dans certains mots, « ill » garde le son /il/ : v<strong class="hl-red">ill</strong>e, tranqu<strong class="hl-red">ill</strong>e, m<strong class="hl-red">ill</strong>e.
        </div>
      </article>

      <!-- Sons GN -->
      <article>
        <h2>10. « gn »</h2>
        <p class="method">
          La graphie « gn » se prononce /nj/, exactement comme le son « ñ » de l'espagnol. C'est l'un des rares sons faciles pour un hispanophone.
        </p>
        <div class="example">
          vi<strong class="hl-blue">gn</strong>e, monta<strong class="hl-blue">gn</strong>e, si<strong class="hl-blue">gn</strong>er, ba<strong class="hl-blue">gn</strong>oire
          <span class="note">(vid, montaña, firmar, bañera)</span>
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

<style scoped>
.lesson {
  gap: 1rem;
}

/* Inline helpers */
.hl-blue { color: var(--clr-blue); font-weight: 700; }
.hl-red  { color: var(--clr-red);  font-weight: 700; }

.note {
  color: var(--clr-ink-soft);
  font-size: 0.82em;
  font-style: italic;
}

.sep {
  color: var(--clr-border);
  margin: 0 0.25rem;
}

/* Method line */
.method {
  color: var(--clr-ink-mid);
  font-size: 0.9rem;
  margin-bottom: 0.35rem;
}

/* Table */
table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1rem;
  font-size: 0.92rem;
}

caption.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
}

th {
  background: var(--clr-blue);
  color: var(--clr-page);
  padding: 0.5rem 0.75rem;
  text-align: left;
  font-family: var(--font-sans);
  font-weight: 700;
  font-size: 0.72rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

td {
  padding: 0.45rem 0.75rem;
  border-bottom: 1px solid var(--clr-border-soft);
  color: var(--clr-ink);
}

td.graphie {
  font-family: var(--font-mono);
  font-weight: 700;
  font-size: 1rem;
  color: var(--clr-blue);
  white-space: nowrap;
}

td.phone {
  font-family: var(--font-mono);
  font-size: 0.9rem;
  color: var(--clr-red);
  font-weight: 600;
}

td.transl {
  color: var(--clr-ink-soft);
  font-style: italic;
  font-size: 0.85rem;
}

tr:last-child td {
  border-bottom: none;
}

tr:nth-child(even) td {
  background: var(--clr-blue-light);
}

/* Examples */
.example + .example {
  margin-top: 0.5rem;
}

/* Download button */
.download-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.35rem;
  margin: 0.5rem auto 0;
  padding: 0.85rem 1.5rem;
  border: 1px solid var(--clr-border);
  border-radius: var(--radius);
  color: var(--clr-ink-soft);
  font-size: 0.72rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  transition: border-color 0.15s, color 0.15s;
}

.download-btn:hover {
  border-color: var(--clr-blue);
  color: var(--clr-blue);
}

@media print {
  .download-btn { display: none !important; }
}
</style>
