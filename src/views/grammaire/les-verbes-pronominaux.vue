<!-- view-meta: created=2026-08-02; updated=2026-08-02 -->
<template>
  <AltLayout title="Les verbes pronominaux">
    <main class="lesson">

      <!-- Règle -->
      <article>
        <div class="rule">
          Les <strong class="hl-blue">verbes pronominaux</strong> (se laver, se dépêcher, se sentir...) se conjuguent toujours avec un <strong class="hl-blue">pronom réfléchi</strong> qui s'accorde avec le sujet.
          Pour les sujets <strong>nous</strong> et <strong>vous</strong>, le pronom réfléchi est identique au sujet, ce qui donne la répétition <strong class="hl-red">nous nous</strong> et <strong class="hl-red">vous vous</strong>.
          En espagnol, cela correspond exactement à la logique de <strong class="hl-blue">« nosotros nos »</strong>.
        </div>
      </article>

      <!-- Conjugaison -->
      <article>
        <h2>La conjugaison (Exemple : se laver)</h2>
        <p class="method">
          Observez le pronom réfléchi placé avant le verbe.
        </p>

        <table>
          <caption class="sr-only">Conjugaison du verbe pronominal se laver au présent</caption>
          <thead>
            <tr>
              <th>Sujet</th>
              <th>Pronom réfléchi</th>
              <th>Verbe conjugué</th>
              <th>Traducción (ES)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="person">je</td>
              <td class="ref-pron">me</td>
              <td><span class="stem">lav</span><span class="end">e</span></td>
              <td class="translation">yo me lavo</td>
            </tr>
            <tr>
              <td class="person">tu</td>
              <td class="ref-pron">te</td>
              <td><span class="stem">lav</span><span class="end">es</span></td>
              <td class="translation">tú te lavas</td>
            </tr>
            <tr>
              <td class="person">il / elle / on</td>
              <td class="ref-pron">se</td>
              <td><span class="stem">lav</span><span class="end">e</span></td>
              <td class="translation">él / ella se lava</td>
            </tr>
            <tr>
              <td class="person">nous</td>
              <td class="ref-pron-double">nous</td>
              <td><span class="stem">lav</span><span class="end">ons</span></td>
              <td class="translation">nosotros nos lavamos</td>
            </tr>
            <tr>
              <td class="person">vous</td>
              <td class="ref-pron-double">vous</td>
              <td><span class="stem">lav</span><span class="end">ez</span></td>
              <td class="translation">vosotros os laváis / ustedes se lavan</td>
            </tr>
            <tr>
              <td class="person">ils / elles</td>
              <td class="ref-pron">se</td>
              <td><span class="stem">lav</span><span class="end">ent</span></td>
              <td class="translation">ellos / ellas se lavan</td>
            </tr>
          </tbody>
        </table>

        <div class="example">
          Nous <strong class="hl-blue">nous dépêchons</strong> pour aller au travail.
          <span class="note">(Nosotros nos damos prisa para ir al trabajo)</span>
        </div>
        <div class="example">
          Vous <strong class="hl-blue">vous lavez</strong> les mains.
          <span class="note">(Vosotros os laváis las manos / Ustedes se lavan las manos)</span>
        </div>
      </article>

      <!-- Inversion dans les questions -->
      <article>
        <h2>L'inversion dans les questions</h2>
        <p class="method">
          Quand on pose une question formelle avec inversion, on place le pronom sujet après le verbe, lié par un trait d'union. Le pronom réfléchi reste devant le verbe.
        </p>
        <p class="method-example">
          <strong>Pronom réfléchi</strong>
          <span class="arrow-inline" aria-hidden="true">+</span>
          <strong>Verbe</strong>
          <span class="arrow-inline" aria-hidden="true">+</span>
          <strong>Pronom sujet</strong>
        </p>

        <div class="example">
          Comment vous <strong class="hl-blue">sentez-vous</strong> aujourd'hui ?
          <span class="note">(¿Cómo se siente usted hoy? / ¿Cómo os sentís hoy?)</span>
        </div>
        <div class="example bg-light">
          Dans cette phrase, le premier <strong>vous</strong> est le pronom réfléchi, et le second <strong>vous</strong> est le pronom sujet inversé.
        </div>
      </article>

      <!-- À retenir : Élision -->
      <article>
        <div class="attention">
          Devant une <mark>voyelle</mark> ou un <mark>h muet</mark>, les pronoms réfléchis <em>me, te, se</em> s'élident et deviennent <strong class="hl-red">m', t', s'</strong>.
        </div>
        <div class="example exception-ex">
          Je <strong class="hl-red">m'</strong>appelle Lucas.
          <span class="sep">·</span>
          Il <strong class="hl-red">s'</strong>habille rapidement.
          <span class="sep">·</span>
          Tu <strong class="hl-red">t'</strong>amuses bien ?
        </div>
      </article>

      <!-- Exception : La négation -->
      <article>
        <div class="exception">
          <strong>La négation</strong> : les mots de négation <strong class="hl-red">ne</strong> et <strong class="hl-red">pas</strong> encadrent à la fois le pronom réfléchi et le verbe conjugué.
        </div>
        <div class="example exception-ex">
          Nous <strong class="hl-red">ne</strong> nous dépêchons <strong class="hl-red">pas</strong>.
          <span class="sep">·</span>
          Je <strong class="hl-red">ne</strong> m'habille <strong class="hl-red">pas</strong> en rouge.
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

<style scoped>
.lesson {
  gap: 1rem;
}

/* Inline typography helpers */
.hl-blue { color: var(--clr-blue); font-weight: 700; }
.hl-red  { color: var(--clr-red);  font-weight: 700; }

.end     { color: var(--clr-red); }
.stem    { color: var(--clr-blue); font-weight: 600; }

.note {
  color: var(--clr-ink-soft);
  font-size: 0.82em;
  font-style: italic;
}

.sep {
  color: var(--clr-border);
  margin: 0 0.25rem;
}

.arrow-inline {
  color: var(--clr-blue-mid);
}

mark {
  background: var(--clr-amber-light);
  color: var(--clr-amber);
  padding: 0.05em 0.25em;
  border-radius: 2px;
  font-style: normal;
  font-weight: 600;
}

/* Method line */
.method {
  color: var(--clr-ink-mid);
  font-size: 0.9rem;
  margin-bottom: 0.35rem;
}

.method-example {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  font-size: 0.97rem;
  margin-bottom: 1rem;
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
  color: var(--text-on-accent);
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

td.person {
  color: var(--clr-ink-mid);
  font-size: 0.85rem;
  font-style: italic;
  white-space: nowrap;
}

td.ref-pron {
  font-family: var(--font-mono);
  font-weight: 700;
  color: var(--clr-red);
}

td.ref-pron-double {
  font-family: var(--font-mono);
  font-weight: 800;
  color: var(--clr-red);
  text-decoration: underline;
}

td.translation {
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

.bg-light {
  background: var(--clr-blue-light);
  border-left: 3px solid var(--clr-blue-mid);
  padding: 0.5rem 0.75rem;
  font-size: 0.88rem;
  color: var(--clr-ink-mid);
}

.exception-ex {
  margin-top: 0.6rem;
  font-family: var(--font-mono);
  font-size: 0.9rem;
}

/* Download button */
</style>
