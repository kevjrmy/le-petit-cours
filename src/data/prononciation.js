/**
 * Pronunciation sheets, split by sound family.
 *
 * One page per family: `PronunciationSheet.vue` renders any of these from its
 * `slug`, the way `ConjugationSheet.vue` renders a verb. They live here because
 * the old single page carried all ten sections and printed to five A4 — three
 * short sheets are consultable, one long one is not.
 *
 * Section shape:
 *   title       — the graphies this section covers
 *   description — one line on how the sound is made
 *   table       — { graphie, phone, transl (ES), soundVal } ; soundVal is the
 *                 word handed to the speech synthesiser, since a bare graphie
 *                 like « an » is not pronounceable on its own
 *   examples    — { word, es } ; clicking one speaks it
 *   note        — optional exception or warning
 */
export const sheets = {
  'les-voyelles': {
    title: 'Les voyelles : ou, u, eu, oi, au',
    intro:
      'Quatre groupes de lettres qui ne se lisent pas comme en espagnol. ' +
      'Deux de ces sons — « u » et « eu » — n\'existent pas du tout en espagnol : ' +
      'ce sont eux qui demandent le plus d\'entraînement.',
    sections: [
      {
        title: '« ou » et « u »',
        description: "Ces deux sons se distinguent clairement en français, mais n'existent pas de la même façon en espagnol.",
        table: [
          { graphie: 'ou', phone: '/u/', transl: 'Como la "u" en español (ej. luna).', soundVal: 'ou' },
          { graphie: 'u', phone: '/y/', transl: 'No existe en español. Coloca los labios en posición de "u" y di una "i".', soundVal: 'u' },
        ],
        examples: [
          { word: 'ours', es: 'oso' },
          { word: 'tour', es: 'torre' },
          { word: 'vous', es: 'usted(es)' },
          { word: 'tu', es: 'tú' },
          { word: 'rue', es: 'calle' },
          { word: 'lune', es: 'luna' },
        ],
        note: '« tu » (tú) et « tout » (todo) ont des prononciations différentes.',
      },
      {
        title: '« eu » et « œu »',
        description: "Ce son n'existe pas en espagnol. Il est plus ou moins ouvert selon sa position dans le mot.",
        table: [
          { graphie: 'eu / œu', phone: '/œ/ (ouvert)', transl: 'Boca abierta en forma de "o", pronunciando una "e".', soundVal: 'peur' },
          { graphie: 'eu', phone: '/ø/ (fermé)', transl: 'Boca cerrada en forma de "o", pronunciando una "e".', soundVal: 'bleu' },
        ],
        examples: [
          { word: 'peur', es: 'miedo' },
          { word: 'cœur', es: 'corazón' },
          { word: 'sœur', es: 'hermana' },
          { word: 'jeu', es: 'juego' },
          { word: 'bleu', es: 'azul' },
          { word: 'feu', es: 'fuego' },
        ],
        note: "Le son est généralement ouvert devant une consonne prononcée, et fermé à la fin d'un mot.",
      },
      {
        title: '« oi »',
        description: 'La combinaison « oi » produit un son de diphtongue unique.',
        table: [
          { graphie: 'oi', phone: '/wa/', transl: 'Suena como "ua" rápido en español (ej. agua).', soundVal: 'moi' },
        ],
        examples: [
          { word: 'moi', es: 'yo' },
          { word: 'toi', es: 'tú' },
          { word: 'roi', es: 'rey' },
          { word: 'voiture', es: 'coche' },
          { word: 'boire', es: 'beber' },
        ],
      },
      {
        title: '« au » et « eau »',
        description: 'Ces graphies représentent le même son vocalique simple.',
        table: [
          { graphie: 'au / eau', phone: '/o/', transl: 'Se pronuncia exactamente como la "o" del español.', soundVal: 'eau' },
        ],
        examples: [
          { word: 'chaud', es: 'caliente' },
          { word: 'eau', es: 'agua' },
          { word: 'beau', es: 'bello' },
          { word: 'bureau', es: 'oficina' },
          { word: 'gâteau', es: 'pastel' },
        ],
      },
    ],
  },

  'les-voyelles-nasales': {
    title: 'Les voyelles nasales : an, in, on',
    intro:
      "Trois sons qui n'existent pas en espagnol. L'air passe par le nez et la " +
      'consonne finale ne se prononce jamais : dans « vin », on n\'entend aucun « n ». ' +
      'Les confondre change le mot — vin, vent et vont sont trois mots différents.',
    sections: [
      {
        title: '« an », « en », « am », « em »',
        description: 'Le son nasal /ɑ̃/. La bouche est bien ouverte, la langue reculée et le son passe par le nez.',
        table: [
          { graphie: 'an / am', phone: '/ɑ̃/', transl: 'Sonido "a" nasalizado. No pronuncies la "n" ni la "m".', soundVal: 'an' },
          { graphie: 'en / em', phone: '/ɑ̃/', transl: 'Se pronuncia exactamente igual que "an".', soundVal: 'en' },
        ],
        examples: [
          { word: 'ans', es: 'años' },
          { word: 'champs', es: 'campos' },
          { word: 'grand', es: 'grande' },
          { word: 'enfant', es: 'niño' },
          { word: 'temps', es: 'tiempo' },
          { word: 'vent', es: 'viento' },
        ],
        note: 'Évitez de prononcer « en » comme le mot espagnol "en". Le son doit être nasal.',
      },
      {
        title: '« in », « ain », « ein », « im », « aim »',
        description: 'Le son nasal /ɛ̃/. La bouche est étirée comme pour un sourire.',
        table: [
          { graphie: 'in / im', phone: '/ɛ̃/', transl: 'Sonido "e" nasalizado (sonrisa abierta).', soundVal: 'in' },
          { graphie: 'ain / aim', phone: '/ɛ̃/', transl: 'Se pronuncia exactamente de la misma manera.', soundVal: 'main' },
          { graphie: 'ein', phone: '/ɛ̃/', transl: 'Misma pronunciación nasal.', soundVal: 'plein' },
        ],
        examples: [
          { word: 'vin', es: 'vino' },
          { word: 'inviter', es: 'invitar' },
          { word: 'simple', es: 'simple' },
          { word: 'main', es: 'mano' },
          { word: 'faim', es: 'hambre' },
          { word: 'plein', es: 'lleno' },
        ],
      },
      {
        title: '« on » et « om »',
        description: "Le son nasal /ɔ̃/. Les lèvres sont très arrondies et projetées vers l'avant.",
        table: [
          { graphie: 'on / om', phone: '/ɔ̃/', transl: 'Sonido "o" nasalizado. Labios muy redondeados.', soundVal: 'on' },
        ],
        examples: [
          { word: 'bon', es: 'bueno' },
          { word: 'nom', es: 'nombre' },
          { word: 'maison', es: 'casa' },
          { word: 'ballon', es: 'pelota' },
          { word: 'tomber', es: 'caer' },
        ],
        note: 'Si le "n" est doublé (ex : bonne) ou suivi d\'une voyelle, la nasalisation disparaît.',
      },
    ],
  },

  'les-consonnes': {
    title: 'Les consonnes : ch, ill, gn',
    intro:
      'Trois graphies de consonnes qui ne se lisent pas comme en espagnol. ' +
      'La dernière, « gn », est la plus facile : c\'est exactement votre « ñ ».',
    sections: [
      {
        title: '« ch »',
        description: "La prononciation de « ch » en français diffère de celle de l'espagnol.",
        table: [
          { graphie: 'ch', phone: '/ʃ/', transl: 'Como el sonido "sh" en inglés (ej. show) o al pedir silencio (¡shh!).', soundVal: 'chat' },
        ],
        examples: [
          { word: 'chat', es: 'gato' },
          { word: 'chaud', es: 'caliente' },
          { word: 'cheval', es: 'caballo' },
          { word: 'douche', es: 'ducha' },
        ],
        note: "Quelques rares exceptions d'origine grecque se prononcent /k/ (ex : chorale, chaos).",
      },
      {
        title: '« ill » et « il »',
        description: 'Le son semi-consonantique /j/ en fin de mot.',
        table: [
          { graphie: 'ill / il', phone: '/j/', transl: 'Como la "y" española en "yo" (seseo/yeísmo).', soundVal: 'fille' },
        ],
        examples: [
          { word: 'famille', es: 'familia' },
          { word: 'fille', es: 'chica / hija' },
          { word: 'soleil', es: 'sol' },
          { word: 'travail', es: 'trabajo' },
        ],
        note: 'Exceptions importantes : ville, mille, tranquille se prononcent avec le son /l/.',
      },
      {
        title: '« gn »',
        description: 'Une des syllabes les plus faciles à maîtriser pour les hispanophones.',
        table: [
          { graphie: 'gn', phone: '/ɲ/', transl: 'Se pronuncia exactamente igual que la "ñ" española.', soundVal: 'montagne' },
        ],
        examples: [
          { word: 'montagne', es: 'montaña' },
          { word: 'espagnol', es: 'español' },
          { word: 'gagner', es: 'ganar' },
          { word: 'baignoire', es: 'bañera' },
        ],
      },
    ],
  },
}

/** Look up one sheet, failing loudly on a typo in a view's `slug`. */
export function getSheet(slug) {
  const sheet = sheets[slug]
  if (!sheet) throw new Error(`Unknown pronunciation sheet "${slug}" — see src/data/prononciation.js`)
  return sheet
}
