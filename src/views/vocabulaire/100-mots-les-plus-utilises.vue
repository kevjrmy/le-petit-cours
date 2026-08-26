<!-- view-meta: created=2026-08-02; updated=2026-08-02 -->
<template>
  <AltLayout title="Les 100 mots essentiels">
    <main class="lesson">

      <article>
        <div class="rule">
          Ces 100 mots sont le cœur du français quotidien.
          Maîtrisez-les et vous comprendrez l'essentiel de toute conversation.
        </div>

        <div class="legend" aria-label="Légende des catégories grammaticales">
          <span class="cat cat-v">v.</span> verbe
          <span class="cat cat-n">n.</span> nom
          <span class="cat cat-adj">adj.</span> adjectif
          <span class="cat cat-prep">prép. / conj.</span> préposition, conjonction
          <span class="cat cat-art">art. / pron.</span> article, pronom
          <span class="cat cat-adv">adv.</span> adverbe
        </div>
      </article>

      <article class="word-article">
        <ol class="word-grid" aria-label="Les 100 mots essentiels du français">
          <li v-for="w in words" :key="w.n" class="entry">
            <span class="rank">{{ w.n }}</span>
            <strong class="word">{{ w.w }}</strong>
            <span :class="['cat', catClass(w.c)]">{{ w.c }}</span>
            <em class="trans">{{ w.t }}</em>
          </li>
        </ol>
      </article>

      <button
        class="download-btn"
        @click="downloadPdf"
        aria-label="Télécharger cette liste en PDF"
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

const words = [
  // ── Verbes ───────────────────────────────────────────────────────────
  { n:  1, w: 'être',              t: 'ser / estar',          c: 'v.' },
  { n:  2, w: 'avoir',             t: 'tener / haber',        c: 'v.' },
  { n:  3, w: 'faire',             t: 'hacer',                c: 'v.' },
  { n:  4, w: 'aller',             t: 'ir',                   c: 'v.' },
  { n:  5, w: 'venir',             t: 'venir',                c: 'v.' },
  { n:  6, w: 'pouvoir',           t: 'poder',                c: 'v.' },
  { n:  7, w: 'vouloir',           t: 'querer',               c: 'v.' },
  { n:  8, w: 'savoir',            t: 'saber',                c: 'v.' },
  { n:  9, w: 'parler',            t: 'hablar',               c: 'v.' },
  { n: 10, w: 'manger',            t: 'comer',                c: 'v.' },
  { n: 11, w: 'boire',             t: 'beber',                c: 'v.' },
  { n: 12, w: 'voir',              t: 'ver',                  c: 'v.' },
  { n: 13, w: 'prendre',           t: 'tomar, coger',         c: 'v.' },
  { n: 14, w: 'donner',            t: 'dar',                  c: 'v.' },
  { n: 15, w: 'dire',              t: 'decir',                c: 'v.' },
  { n: 16, w: 'partir',            t: 'salir, irse',          c: 'v.' },
  { n: 17, w: 'arriver',           t: 'llegar',               c: 'v.' },
  { n: 18, w: 'aimer',             t: 'amar, gustar',         c: 'v.' },
  { n: 19, w: 'habiter',           t: 'vivir, habitar',       c: 'v.' },
  { n: 20, w: 'travailler',        t: 'trabajar',             c: 'v.' },
  { n: 21, w: 'comprendre',        t: 'comprender',           c: 'v.' },
  { n: 22, w: 'lire',              t: 'leer',                 c: 'v.' },
  { n: 23, w: 'écrire',            t: 'escribir',             c: 'v.' },
  // ── Mots de liaison ──────────────────────────────────────────────────
  { n: 24, w: 'le / la / les',     t: 'el / la / los / las',  c: 'art.' },
  { n: 25, w: 'un / une',          t: 'un / una',             c: 'art.' },
  { n: 26, w: 'de',                t: 'de',                   c: 'prép.' },
  { n: 27, w: 'à',                 t: 'a, en',                c: 'prép.' },
  { n: 28, w: 'en',                t: 'en',                   c: 'prép.' },
  { n: 29, w: 'dans',              t: 'en, dentro de',        c: 'prép.' },
  { n: 30, w: 'sur',               t: 'sobre',                c: 'prép.' },
  { n: 31, w: 'avec',              t: 'con',                  c: 'prép.' },
  { n: 32, w: 'pour',              t: 'para',                 c: 'prép.' },
  { n: 33, w: 'sans',              t: 'sin',                  c: 'prép.' },
  { n: 34, w: 'et',                t: 'y',                    c: 'conj.' },
  { n: 35, w: 'ou',                t: 'o',                    c: 'conj.' },
  { n: 36, w: 'mais',              t: 'pero',                 c: 'conj.' },
  { n: 37, w: 'que / qu\'',        t: 'que',                  c: 'conj.' },
  { n: 38, w: 'qui',               t: 'que, quien',           c: 'pron.' },
  { n: 39, w: 'parce que',         t: 'porque',               c: 'conj.' },
  { n: 40, w: 'si',                t: 'si',                   c: 'conj.' },
  { n: 41, w: 'quand',             t: 'cuando',               c: 'conj.' },
  // ── Adverbes ─────────────────────────────────────────────────────────
  { n: 42, w: 'ne... pas',         t: 'no (negación)',        c: 'adv.' },
  { n: 43, w: 'très',              t: 'muy',                  c: 'adv.' },
  { n: 44, w: 'aussi',             t: 'también',              c: 'adv.' },
  { n: 45, w: 'beaucoup',          t: 'mucho/a',              c: 'adv.' },
  { n: 46, w: 'plus',              t: 'más',                  c: 'adv.' },
  { n: 47, w: 'oui',               t: 'sí',                   c: 'adv.' },
  { n: 48, w: 'non',               t: 'no',                   c: 'adv.' },
  { n: 49, w: 'ici',               t: 'aquí',                 c: 'adv.' },
  { n: 50, w: 'là',                t: 'allí, ahí',            c: 'adv.' },
  { n: 51, w: 'maintenant',        t: 'ahora',                c: 'adv.' },
  { n: 52, w: 'aujourd\'hui',      t: 'hoy',                  c: 'adv.' },
  { n: 53, w: 'demain',            t: 'mañana',               c: 'adv.' },
  { n: 54, w: 'hier',              t: 'ayer',                 c: 'adv.' },
  { n: 55, w: 'toujours',          t: 'siempre',              c: 'adv.' },
  { n: 56, w: 'jamais',            t: 'nunca',                c: 'adv.' },
  // ── Noms ─────────────────────────────────────────────────────────────
  { n: 57, w: 'maison',            t: 'casa',                 c: 'n.' },
  { n: 58, w: 'ville',             t: 'ciudad',               c: 'n.' },
  { n: 59, w: 'pays',              t: 'país',                 c: 'n.' },
  { n: 60, w: 'famille',           t: 'familia',              c: 'n.' },
  { n: 61, w: 'ami(e)',            t: 'amigo/a',              c: 'n.' },
  { n: 62, w: 'homme',             t: 'hombre',               c: 'n.' },
  { n: 63, w: 'femme',             t: 'mujer',                c: 'n.' },
  { n: 64, w: 'enfant',            t: 'niño/a',               c: 'n.' },
  { n: 65, w: 'jour',              t: 'día',                  c: 'n.' },
  { n: 66, w: 'nuit',              t: 'noche',                c: 'n.' },
  { n: 67, w: 'heure',             t: 'hora',                 c: 'n.' },
  { n: 68, w: 'temps',             t: 'tiempo',               c: 'n.' },
  { n: 69, w: 'année',             t: 'año',                  c: 'n.' },
  { n: 70, w: 'semaine',           t: 'semana',               c: 'n.' },
  { n: 71, w: 'eau',               t: 'agua',                 c: 'n.' },
  { n: 72, w: 'pain',              t: 'pan',                  c: 'n.' },
  { n: 73, w: 'travail',           t: 'trabajo',              c: 'n.' },
  { n: 74, w: 'école',             t: 'escuela',              c: 'n.' },
  { n: 75, w: 'livre',             t: 'libro',                c: 'n.' },
  { n: 76, w: 'voiture',           t: 'coche / carro',        c: 'n.' },
  { n: 77, w: 'argent',            t: 'dinero',               c: 'n.' },
  { n: 78, w: 'rue',               t: 'calle',                c: 'n.' },
  { n: 79, w: 'vie',               t: 'vida',                 c: 'n.' },
  { n: 80, w: 'monde',             t: 'mundo',                c: 'n.' },
  { n: 81, w: 'chose',             t: 'cosa',                 c: 'n.' },
  { n: 82, w: 'personne',          t: 'persona',              c: 'n.' },
  { n: 83, w: 'porte',             t: 'puerta',               c: 'n.' },
  { n: 84, w: 'mot',               t: 'palabra',              c: 'n.' },
  // ── Adjectifs ────────────────────────────────────────────────────────
  { n: 85, w: 'grand(e)',          t: 'grande',               c: 'adj.' },
  { n: 86, w: 'petit(e)',          t: 'pequeño/a',            c: 'adj.' },
  { n: 87, w: 'bon / bonne',       t: 'bueno/a',              c: 'adj.' },
  { n: 88, w: 'mauvais(e)',        t: 'malo/a',               c: 'adj.' },
  { n: 89, w: 'beau / belle',      t: 'bonito/a, bello/a',    c: 'adj.' },
  { n: 90, w: 'nouveau / nouvelle',t: 'nuevo/a',              c: 'adj.' },
  { n: 91, w: 'vieux / vieille',   t: 'viejo/a',              c: 'adj.' },
  { n: 92, w: 'jeune',             t: 'joven',                c: 'adj.' },
  { n: 93, w: 'premier / première',t: 'primero/a',            c: 'adj.' },
  { n: 94, w: 'dernier / dernière',t: 'último/a',             c: 'adj.' },
  { n: 95, w: 'autre',             t: 'otro/a',               c: 'adj.' },
  { n: 96, w: 'même',              t: 'mismo/a',              c: 'adj.' },
  { n: 97, w: 'tout / toute',      t: 'todo/a',               c: 'adj.' },
  { n: 98, w: 'content(e)',        t: 'contento/a, feliz',    c: 'adj.' },
  { n: 99, w: 'facile',            t: 'fácil',                c: 'adj.' },
  { n:100, w: 'difficile',         t: 'difícil',              c: 'adj.' },
]

function catClass(c) {
  if (c === 'v.')                          return 'cat-v'
  if (c === 'n.')                          return 'cat-n'
  if (c === 'adj.')                        return 'cat-adj'
  if (c === 'prép.' || c === 'conj.')      return 'cat-prep'
  if (c === 'art.' || c === 'pron.' || c === 'dét.') return 'cat-art'
  return 'cat-adv'
}

function downloadPdf() {
  window.print()
}
</script>

<style scoped>
.lesson {
  gap: 1rem;
}

.hl-blue { color: var(--clr-blue); font-weight: 700; }

/* ── Legend ──────────────────────────────────── */
.legend {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem 1rem;
  margin-top: 0.75rem;
  font-size: 0.78rem;
  color: var(--clr-ink-mid);
}

/* ── Category pills ──────────────────────────── */
.cat {
  display: inline-block;
  font-family: var(--font-sans);
  font-size: 0.6rem;
  font-weight: 700;
  padding: 0.1rem 0.35rem;
  border-radius: 2px;
  white-space: nowrap;
  vertical-align: middle;
  flex-shrink: 0;
}

.cat-v    { background: var(--clr-red-light);          color: var(--clr-red);        }
.cat-n    { background: var(--clr-blue-light);         color: var(--clr-blue-dark);  }
.cat-adj  { background: var(--accent-line);                       color: var(--clr-blue);       }
.cat-prep { background: var(--clr-amber-light);        color: var(--clr-amber);      }
.cat-art  { background: var(--clr-blue-light);         color: var(--clr-blue-mid);   }
.cat-adv  { background: rgba(26, 26, 46, 0.06);        color: var(--clr-ink-mid);    }

/* ── Word grid ───────────────────────────────── */
.word-article {
  padding: 0 !important;
}

.word-grid {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 1.25rem;
}

.entry {
  display: grid;
  grid-template-columns: 1.75rem 7rem 2.75rem 1fr;
  align-items: center;
  gap: 0.35rem;
  padding: 0.2rem 0.25rem;
  border-bottom: 1px solid var(--clr-border-soft);
}

/* Group separator — subtle background shift per section */
.entry:nth-child(-n+23)  { background: rgba(200, 32, 46, 0.025); }  /* verbes */
.entry:nth-child(n+57):nth-child(-n+84) { background: rgba(24, 84, 160, 0.03); } /* noms */
.entry:nth-child(n+85)   { background: rgba(24, 84, 160, 0.06); }   /* adj */

.rank {
  font-family: var(--font-mono);
  font-size: 0.65rem;
  color: var(--clr-ink-soft);
  text-align: right;
  line-height: 1.6;
}

.word {
  font-family: var(--font-serif);
  font-size: 0.88rem;
  color: var(--clr-ink);
  line-height: 1.6;
}

.trans {
  font-family: var(--font-sans);
  font-size: 0.72rem;
  color: var(--clr-ink-mid);
  font-style: italic;
  line-height: 1.6;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

@media (max-width: 480px) {
  .word-grid { grid-template-columns: 1fr; }
  .entry { grid-template-columns: 1.5rem 6rem 2.5rem 1fr; }
}

/* ── Download button ─────────────────────────── */
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
  .word-grid { grid-template-columns: 1fr 1fr; column-gap: 2rem; }
  .entry { padding: 0.12rem 0; }
  .entry:nth-child(-n+23),
  .entry:nth-child(n+57):nth-child(-n+84),
  .entry:nth-child(n+85) { background: none; }
}
</style>
