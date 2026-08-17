<!-- view-meta: created=2026-08-02; updated=2026-08-02 -->
<template>
  <AltLayout title="Les syllabes les plus courantes">
    <main class="lesson">

      <!-- Règle générale -->
      <article>
        <div class="rule">
          En français, plusieurs <strong class="hl-blue">groupes de lettres</strong> se prononcent toujours de la même façon. Apprendre ces <strong class="hl-blue">syllabes types</strong> permet de lire n'importe quel mot, même sans le connaître.
        </div>
        <div class="attention">
          💡 <strong>Tip para hispanohablantes:</strong> A diferencia del español, donde cada letra tiene una pronunciación fija, en francés la combinación de letras cambia el sonido.
          <strong>Haz clic en los botones 🔊 y en las palabras de ejemplo para escuchar cómo se pronuncian.</strong>
        </div>
      </article>

      <!-- Section des sons -->
      <article v-for="(section, idx) in sections" :key="idx" class="sound-section">
        <h2>{{ idx + 1 }}. {{ section.title }}</h2>
        <p class="method">{{ section.description }}</p>

        <table>
          <caption class="sr-only">Graphies et sons pour {{ section.title }}</caption>
          <thead>
            <tr>
              <th>Graphie</th>
              <th>Son</th>
              <th>Pronunciación (ES)</th>
              <th>Écouter</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in section.table" :key="row.graphie">
              <td class="graphie">{{ row.graphie }}</td>
              <td class="phone">{{ row.phone }}</td>
              <td class="transl">{{ row.transl }}</td>
              <td class="play-cell">
                <button class="play-btn" @click="speak(row.soundVal || row.graphie)" aria-label="Écouter la syllabe">
                  🔊
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <div class="examples-container">
          <span class="examples-label">Exemples :</span>
          <div class="examples-list">
            <button
              v-for="ex in section.examples"
              :key="ex.word"
              class="word-btn"
              @click="speak(ex.word)"
              :aria-label="'Écouter le mot ' + ex.word"
            >
              <span class="word-fr">{{ ex.word }}</span>
              <span class="word-translation">({{ ex.es }})</span>
              <span class="word-icon" aria-hidden="true">🔊</span>
            </button>
          </div>
        </div>

        <div v-if="section.note" class="attention note-box">
          <strong>Note :</strong> {{ section.note }}
        </div>
      </article>

      <!-- Bouton de téléchargement -->
      <button class="download-btn" @click="downloadPdf" aria-label="Télécharger cette leçon en PDF">
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
import { useSpeech } from '@/composables/useSpeech'

const { speak } = useSpeech()

const sections = [
  {
    title: '« ou » et « u »',
    description: 'Ces deux sons se distinguent clairement en français, mais n\'existent pas de la même façon en espagnol.',
    table: [
      { graphie: 'ou', phone: '/u/', transl: 'Como la "u" en español (ej. luna).', soundVal: 'ou' },
      { graphie: 'u', phone: '/y/', transl: 'No existe en español. Coloca los labios en posición de "u" y di una "i".', soundVal: 'u' }
    ],
    examples: [
      { word: 'ours', es: 'oso' },
      { word: 'tour', es: 'torre' },
      { word: 'vous', es: 'usted(es)' },
      { word: 'tu', es: 'tú' },
      { word: 'rue', es: 'calle' },
      { word: 'lune', es: 'luna' }
    ],
    note: '« tu » (tú) et « tout » (todo) ont des prononciations différentes.'
  },
  {
    title: '« eu » et « œu »',
    description: 'Ce son n\'existe pas en espagnol. Il est plus ou moins ouvert selon sa position dans le mot.',
    table: [
      { graphie: 'eu / œu', phone: '/œ/ (ouvert)', transl: 'Boca abierta en forma de "o", pronunciando una "e".', soundVal: 'peur' },
      { graphie: 'eu', phone: '/ø/ (fermé)', transl: 'Boca cerrada en forma de "o", pronunciando une "e".', soundVal: 'bleu' }
    ],
    examples: [
      { word: 'peur', es: 'miedo' },
      { word: 'cœur', es: 'corazón' },
      { word: 'sœur', es: 'hermana' },
      { word: 'jeu', es: 'juego' },
      { word: 'bleu', es: 'azul' },
      { word: 'feu', es: 'fuego' }
    ],
    note: 'Le son est généralement ouvert devant une consonne prononcée, et fermé à la fin d\'un mot.'
  },
  {
    title: '« an », « en », « am », « em »',
    description: 'Le son nasal /ɑ̃/. La bouche est bien ouverte, la langue reculée et le son passe par le nez.',
    table: [
      { graphie: 'an / am', phone: '/ɑ̃/', transl: 'Sonido "a" nasalizado. No pronuncies la "n" ni la "m".', soundVal: 'an' },
      { graphie: 'en / em', phone: '/ɑ̃/', transl: 'Se pronuncia exactamente igual que "an".', soundVal: 'en' }
    ],
    examples: [
      { word: 'ans', es: 'años' },
      { word: 'champs', es: 'campos' },
      { word: 'grand', es: 'grande' },
      { word: 'enfant', es: 'niño' },
      { word: 'temps', es: 'tiempo' },
      { word: 'vent', es: 'viento' }
    ],
    note: 'Évitez de prononcer « en » comme le mot espagnol "en". Le son doit être nasal.'
  },
  {
    title: '« in », « ain », « ein », « im », « aim »',
    description: 'Le son nasal /ɛ̃/. La bouche est étirée comme pour un sourire.',
    table: [
      { graphie: 'in / im', phone: '/ɛ̃/', transl: 'Sonido "e" nasalizado (sonrisa abierta).', soundVal: 'in' },
      { graphie: 'ain / aim', phone: '/ɛ̃/', transl: 'Se prononce exactement de la même manière.', soundVal: 'main' },
      { graphie: 'ein', phone: '/ɛ̃/', transl: 'Même prononciation nasale.', soundVal: 'plein' }
    ],
    examples: [
      { word: 'vin', es: 'vino' },
      { word: 'inviter', es: 'invitar' },
      { word: 'simple', es: 'simple' },
      { word: 'main', es: 'mano' },
      { word: 'faim', es: 'hambre' },
      { word: 'plein', es: 'lleno' }
    ]
  },
  {
    title: '« on » et « om »',
    description: 'Le son nasal /ɔ̃/. Les lèvres sont très arrondies et projetées vers l\'avant.',
    table: [
      { graphie: 'on / om', phone: '/ɔ̃/', transl: 'Sonido "o" nasalizado. Labios muy redondeados.', soundVal: 'on' }
    ],
    examples: [
      { word: 'bon', es: 'bueno' },
      { word: 'nom', es: 'nombre' },
      { word: 'maison', es: 'casa' },
      { word: 'ballon', es: 'pelota' },
      { word: 'tomber', es: 'caer' }
    ],
    note: 'Si le "n" est doublé (ex: bonne) ou suivi d\'une voyelle, la nasalisation disparaît.'
  },
  {
    title: '« oi »',
    description: 'La combinaison « oi » produit un son de diphtongue unique.',
    table: [
      { graphie: 'oi', phone: '/wa/', transl: 'Suena como "ua" rápido en español (ej. agua).', soundVal: 'moi' }
    ],
    examples: [
      { word: 'moi', es: 'yo' },
      { word: 'toi', es: 'tú' },
      { word: 'roi', es: 'rey' },
      { word: 'voiture', es: 'coche' },
      { word: 'boire', es: 'beber' }
    ]
  },
  {
    title: '« au » et « eau »',
    description: 'Ces graphies représentent le même son vocalique simple.',
    table: [
      { graphie: 'au / eau', phone: '/o/', transl: 'Se pronuncia exactamente como la "o" del español.', soundVal: 'eau' }
    ],
    examples: [
      { word: 'chaud', es: 'caliente' },
      { word: 'eau', es: 'agua' },
      { word: 'beau', es: 'bello' },
      { word: 'bureau', es: 'oficina' },
      { word: 'gâteau', es: 'pastel' }
    ]
  },
  {
    title: '« ch »',
    description: 'La prononciation de « ch » en français diffère de celle de l\'espagnol.',
    table: [
      { graphie: 'ch', phone: '/ʃ/', transl: 'Como el sonido "sh" en inglés (ej. show) o al pedir silencio (¡shh!).', soundVal: 'chat' }
    ],
    examples: [
      { word: 'chat', es: 'gato' },
      { word: 'chaud', es: 'caliente' },
      { word: 'cheval', es: 'caballo' },
      { word: 'douche', es: 'ducha' }
    ],
    note: 'Quelques rares exceptions d\'origine grecque se prononcent /k/ (ex: chorale, chaos).'
  },
  {
    title: '« ill » et « il »',
    description: 'Le son semi-consonantique /j/ en fin de mot.',
    table: [
      { graphie: 'ill / il', phone: '/j/', transl: 'Como la "y" española en "yo" (seseo/yeísmo).', soundVal: 'fille' }
    ],
    examples: [
      { word: 'famille', es: 'familia' },
      { word: 'fille', es: 'chica / hija' },
      { word: 'soleil', es: 'sol' },
      { word: 'travail', es: 'trabajo' }
    ],
    note: 'Exceptions importantes : ville, mille, tranquille se prononcent avec le son /l/.'
  },
  {
    title: '« gn »',
    description: 'Une des syllabes les plus faciles à maîtriser pour les hispanophones.',
    table: [
      { graphie: 'gn', phone: '/ɲ/', transl: 'Se pronuncia exactamente igual que la "ñ" española.', soundVal: 'montagne' }
    ],
    examples: [
      { word: 'montagne', es: 'montaña' },
      { word: 'espagnol', es: 'español' },
      { word: 'gagner', es: 'ganar' },
      { word: 'baignoire', es: 'bañera' }
    ]
  }
]

function downloadPdf() {
  window.print()
}
</script>

<style scoped>
.lesson {
  gap: 1.5rem;
}

.hl-blue { color: var(--clr-blue); font-weight: 700; }
.hl-red  { color: var(--clr-red);  font-weight: 700; }

.sound-section {
  border-bottom: 1px solid var(--clr-border-soft);
  padding-bottom: 1.5rem;
}

.sound-section:last-of-type {
  border-bottom: none;
}

.method {
  color: var(--clr-ink-mid);
  font-size: 0.92rem;
  margin-bottom: 0.75rem;
  line-height: 1.5;
}

/* Table */
table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1rem;
  font-size: 0.9rem;
}

caption.sr-only {
  position: absolute;
  width: 1px; height: 1px;
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
  padding: 0.5rem 0.75rem;
  border-bottom: 1px solid var(--clr-border-soft);
  color: var(--clr-ink);
  vertical-align: middle;
}

td.graphie {
  font-family: var(--font-mono);
  font-weight: 700;
  font-size: 1.05rem;
  color: var(--clr-blue);
  white-space: nowrap;
}

td.phone {
  font-family: var(--font-mono);
  font-size: 0.88rem;
  color: var(--clr-red);
  font-weight: 600;
}

td.transl {
  color: var(--clr-ink-soft);
  font-style: italic;
  font-size: 0.85rem;
}

.play-cell {
  width: 50px;
  text-align: center;
}

.play-btn {
  background: var(--clr-blue-light);
  border: 1px solid var(--clr-blue-mid);
  color: var(--clr-blue-dark);
  font-size: 0.95rem;
  padding: 0.3rem 0.6rem;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: background 0.15s, transform 0.1s;
}

.play-btn:hover {
  background: var(--clr-blue-mid);
}

.play-btn:active {
  transform: scale(0.95);
}

tr:last-child td { border-bottom: none; }
tr:nth-child(even) td { background: var(--clr-blue-light); }

/* Examples */
.examples-container {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  margin-top: 0.75rem;
  flex-wrap: wrap;
}

.examples-label {
  font-family: var(--font-sans);
  font-weight: 700;
  font-size: 0.82rem;
  color: var(--clr-ink-mid);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-top: 0.35rem;
}

.examples-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  flex: 1;
}

.word-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  background: var(--clr-page);
  border: 1px solid var(--clr-border);
  padding: 0.35rem 0.75rem;
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: border-color 0.15s, background 0.15s;
}

.word-btn:hover {
  border-color: var(--clr-blue);
  background: var(--clr-blue-light);
}

.word-btn:active {
  transform: scale(0.98);
}

.word-fr {
  font-family: var(--font-serif);
  font-weight: 700;
  color: var(--clr-ink);
  font-size: 0.92rem;
}

.word-translation {
  font-family: var(--font-sans);
  font-style: italic;
  font-size: 0.78rem;
  color: var(--clr-ink-soft);
}

.word-icon {
  font-size: 0.78rem;
  color: var(--clr-blue-mid);
  margin-left: 0.15rem;
}

.note-box {
  margin-top: 1rem;
  font-size: 0.9rem;
}

/* Download button */
.download-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.35rem;
  margin: 1.5rem auto 0;
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
  .download-btn,
  .play-cell,
  .word-icon { display: none !important; }
  .word-btn {
    border: none;
    padding: 0;
    cursor: default;
    background: transparent;
  }
}
</style>
