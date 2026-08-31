/**
 * Single source of truth for the book's structure.
 *
 * The sidebar, the sommaire (accueil) and every chapter `index.vue` read from
 * this file — add a lesson here once and it appears everywhere.
 *
 * Route registration still lives in `src/router/index.js` (explicit `import()`
 * calls, so Vite can code-split). Keep the two in sync: every `path` below must
 * have a matching route.
 *
 * Lesson shape:
 *   path       — route path (required, unique)
 *   title      — plain-text label (required, used for a11y and search)
 *   titleHtml  — optional rich label (superscripts, etc.)
 *   emoji      — optional leading emoji shown in list rows, never in the sidebar
 *   subtitle   — optional secondary line (author, chapter number…)
 *   tag        — optional short badge (skill area, difficulty…)
 *   soon       — true for announced-but-unwritten lessons (no route yet)
 */

export const chapters = [
  {
    slug: 'grammaire',
    path: '/grammaire',
    title: 'Grammaire',
    icon: 'grammaire',
    unit: ['leçon', 'leçons'],
    blurb:
      'Étudiez les règles essentielles de la grammaire française : conjugaison, ' +
      'accord et structure des phrases.',
    /* Ordered as a course, not alphabetically: word classes first, then the
       tenses in teaching order, then pronouns and comparison. */
    lessons: [
      { path: '/grammaire/les-articles', title: 'Les articles' },
      { path: '/grammaire/les-adjectifs', title: 'Les adjectifs qualificatifs' },
      { path: '/grammaire/les-demonstratifs', title: 'Les démonstratifs' },
      { path: '/grammaire/les-adverbes', title: 'Les adverbes' },
      { path: '/grammaire/la-negation', title: 'La négation' },
      { path: '/grammaire/l-interrogation', title: 'Poser une question' },
      { path: '/grammaire/verbe-1er-groupe', title: 'Les verbes du 1er groupe', titleHtml: 'Les verbes du 1<sup>er</sup> groupe' },
      { path: '/grammaire/verbe-2eme-groupe', title: 'Les verbes du 2ème groupe', titleHtml: 'Les verbes du 2<sup>ème</sup> groupe' },
      { path: '/grammaire/verbe-3eme-groupe', title: 'Les verbes du 3ème groupe', titleHtml: 'Les verbes du 3<sup>ème</sup> groupe' },
      { path: '/grammaire/les-verbes-pronominaux', title: 'Les verbes pronominaux' },
      { path: '/grammaire/les-verbes-modaux', title: 'Pouvoir, vouloir, devoir' },
      { path: '/grammaire/l-imperatif', title: "L'impératif" },
      { path: '/grammaire/le-passe-compose', title: 'Le passé composé' },
      { path: '/grammaire/l-imparfait', title: "L'imparfait" },
      { path: '/grammaire/passe-compose-ou-imparfait', title: 'Passé composé ou imparfait ?' },
      { path: '/grammaire/le-futur-proche', title: 'Le futur proche' },
      { path: '/grammaire/le-futur-simple', title: 'Le futur simple' },
      { path: '/grammaire/le-conditionnel-present', title: 'Le conditionnel présent' },
      { path: '/grammaire/les-pronoms-cod-coi', title: 'Les pronoms COD et COI' },
      { path: '/grammaire/les-pronoms-y-en', title: 'Les pronoms Y et EN' },
      { path: '/grammaire/le-comparatif-et-le-superlatif', title: 'Le comparatif et le superlatif' },
      { path: '/grammaire/les-prepositions-de-lieu', title: 'Les prépositions de lieu' },
    ],
  },
  {
    slug: 'conjugaison',
    path: '/conjugaison',
    title: 'Conjugaison',
    icon: 'conjugaison',
    unit: ['verbe', 'verbes'],
    blurb:
      'Les tableaux des trente verbes les plus utiles, au présent, au passé composé, ' +
      "au futur simple, à l'impératif et au participe présent — avec la forme négative et le féminin.",
    /* Auxiliaires first, then the two regular models, then the 1er groupe
       spelling patterns (-ger, -cer, e→è, l→ll), then the frequent irregulars.
       The tables themselves live in `src/data/conjugaisons.js` and must stay
       in this order — a reader scanning the two files compares them line by
       line. */
    lessons: [
      { path: '/conjugaison/etre', title: 'être', subtitle: 'ser / estar', tag: 'Auxiliaire' },
      { path: '/conjugaison/avoir', title: 'avoir', subtitle: 'haber / tener', tag: 'Auxiliaire' },
      { path: '/conjugaison/parler', title: 'parler', subtitle: 'hablar', tag: '1er groupe' },
      { path: '/conjugaison/finir', title: 'finir', subtitle: 'terminar / acabar', tag: '2e groupe' },
      { path: '/conjugaison/aimer', title: 'aimer', subtitle: 'amar / gustar', tag: '1er groupe' },
      { path: '/conjugaison/donner', title: 'donner', subtitle: 'dar', tag: '1er groupe' },
      { path: '/conjugaison/manger', title: 'manger', subtitle: 'comer', tag: '1er groupe' },
      { path: '/conjugaison/commencer', title: 'commencer', subtitle: 'empezar / comenzar', tag: '1er groupe' },
      { path: '/conjugaison/acheter', title: 'acheter', subtitle: 'comprar', tag: '1er groupe' },
      { path: '/conjugaison/appeler', title: 'appeler', subtitle: 'llamar', tag: '1er groupe' },
      { path: '/conjugaison/choisir', title: 'choisir', subtitle: 'elegir / escoger', tag: '2e groupe' },
      { path: '/conjugaison/aller', title: 'aller', subtitle: 'ir', tag: '3e groupe' },
      { path: '/conjugaison/faire', title: 'faire', subtitle: 'hacer', tag: '3e groupe' },
      { path: '/conjugaison/dire', title: 'dire', subtitle: 'decir', tag: '3e groupe' },
      { path: '/conjugaison/pouvoir', title: 'pouvoir', subtitle: 'poder', tag: '3e groupe' },
      { path: '/conjugaison/vouloir', title: 'vouloir', subtitle: 'querer', tag: '3e groupe' },
      { path: '/conjugaison/devoir', title: 'devoir', subtitle: 'deber / tener que', tag: '3e groupe' },
      { path: '/conjugaison/savoir', title: 'savoir', subtitle: 'saber', tag: '3e groupe' },
      { path: '/conjugaison/voir', title: 'voir', subtitle: 'ver', tag: '3e groupe' },
      { path: '/conjugaison/venir', title: 'venir', subtitle: 'venir', tag: '3e groupe' },
      { path: '/conjugaison/partir', title: 'partir', subtitle: 'irse / marcharse', tag: '3e groupe' },
      { path: '/conjugaison/sortir', title: 'sortir', subtitle: 'salir', tag: '3e groupe' },
      { path: '/conjugaison/prendre', title: 'prendre', subtitle: 'tomar / coger', tag: '3e groupe' },
      { path: '/conjugaison/mettre', title: 'mettre', subtitle: 'poner / meter', tag: '3e groupe' },
      { path: '/conjugaison/attendre', title: 'attendre', subtitle: 'esperar', tag: '3e groupe' },
      { path: '/conjugaison/ecrire', title: 'écrire', subtitle: 'escribir', tag: '3e groupe' },
      { path: '/conjugaison/lire', title: 'lire', subtitle: 'leer', tag: '3e groupe' },
      { path: '/conjugaison/boire', title: 'boire', subtitle: 'beber', tag: '3e groupe' },
      { path: '/conjugaison/ouvrir', title: 'ouvrir', subtitle: 'abrir', tag: '3e groupe' },
      { path: '/conjugaison/connaitre', title: 'connaître', subtitle: 'conocer', tag: '3e groupe' },
    ],
  },
  {
    slug: 'orthographe',
    path: '/orthographe',
    title: 'Orthographe',
    icon: 'orthographe',
    unit: ['leçon', 'leçons'],
    blurb:
      'Apprenez à bien accorder les mots en genre, en nombre et à utiliser ' +
      'les déterminants, pronoms et homophones correctement.',
    lessons: [
      { path: '/orthographe/les-accents', title: 'Les accents et la cédille' },
      { path: '/orthographe/les-homophones', title: 'Les homophones grammaticaux (a/à, est/et…)' },
      { path: '/orthographe/les-determinants-possessifs', title: 'Les déterminants possessifs' },
      { path: '/orthographe/les-pronoms-possessifs', title: 'Les pronoms possessifs' },
    ],
  },
  {
    slug: 'astuces',
    path: '/astuces',
    title: 'Astuces',
    icon: 'astuces',
    unit: ['astuce', 'astuces'],
    blurb:
      'Les moyens mnémotechniques qui font gagner du temps : un truc à retenir, ' +
      'ses exceptions, et un lien vers la leçon complète.',
    /* Sits after grammaire + orthographe on purpose: these pages are the memory
       hooks for rules taught there, not a replacement for them. */
    lessons: [
      { path: '/astuces/a-en-au-aux', title: 'Où je vais : à, en, au ou aux ?', tag: 'Prépositions' },
      { path: '/astuces/le-genre-des-noms', title: 'Deviner le genre d\'un nom', tag: 'Genre' },
      { path: '/astuces/etre-ou-avoir', title: 'Passé composé : être ou avoir ?', tag: 'Verbes' },
      { path: '/astuces/le-test-de-substitution', title: 'Le test de substitution', tag: 'Homophones' },
    ],
  },
  {
    slug: 'dictees',
    path: '/dictees',
    title: 'Dictées',
    icon: 'dictees',
    unit: ['dictée', 'dictées'],
    blurb:
      'Écoutez, écrivez, corrigez. Chaque dictée est accompagnée de son texte ' +
      'et de ses points de vigilance.',
    lessons: [
      { path: '/dictees/une-journee-en-vacances', title: 'Une journée en vacances', tag: 'Facile' },
      { path: '/dictees/la-pierre-de-rosette', title: 'La pierre de Rosette', tag: 'Intermédiaire' },
      { path: '/dictees/les-fleurs-du-mal', title: 'Les fleurs du mal', tag: 'Difficile' },
    ],
  },
  {
    slug: 'exercices',
    path: '/exercices',
    title: 'Exercices',
    icon: 'exercices',
    unit: ['exercice', 'exercices'],
    blurb:
      'Mettez la théorie en pratique. Chaque exercice se corrige tout seul ' +
      'et vous donne votre score.',
    lessons: [
      { path: '/exercices/associe-les-pairs', title: 'Associe les pairs', tag: 'Mémoire' },
      { path: '/exercices/emoji-francais', title: 'Emoji & Français', tag: 'Vocabulaire' },
      { path: '/exercices/quel-groupe-verbe-appartient', title: 'Quel groupe ?', tag: 'Conjugaison' },
      { path: '/exercices/conjugaison-present', title: 'Conjugaison au présent', tag: 'Conjugaison' },
      { path: '/exercices/les-articles', title: 'Quel article ?', tag: 'Grammaire' },
      { path: '/exercices/la-negation', title: 'Mets à la négative', tag: 'Grammaire' },
      { path: '/exercices/le-futur-proche', title: 'Le futur proche', tag: 'Grammaire' },
      { path: '/exercices/le-passe-compose', title: 'Le passé composé', tag: 'Conjugaison' },
      { path: '/exercices/les-adverbes', title: 'Les adverbes', tag: 'Grammaire' },
      { path: '/exercices/les-adjectifs-accord', title: "Accorde l'adjectif", tag: 'Orthographe' },
      { path: '/exercices/phrases-en-desordre', title: 'Phrases en désordre', tag: 'Syntaxe' },
      { path: '/exercices/etre-ou-avoir', title: 'Être ou avoir ?', tag: 'Conjugaison' },
      { path: '/exercices/trouve-la-faute', title: 'Trouve la faute', tag: 'Correction' },
      { path: '/exercices/devine-les-temps', title: 'Devine les temps', tag: 'Conjugaison' },
      { path: '/exercices/ecoute-et-choisis', title: 'Écoute et choisis', tag: 'Écoute' },
      { path: '/exercices/mets-au-bon-temps', title: 'Mets au bon temps', tag: 'Conjugaison' },
      { path: '/exercices/le-bon-pronom', title: 'Le bon pronom', tag: 'Chrono' },
      { path: '/exercices/la-bonne-terminaison', title: 'La bonne terminaison', tag: 'Conjugaison' },
      { path: '/exercices/construis-l-imparfait', title: "Construis l'imparfait", tag: 'Conjugaison' },
    ],
  },
  {
    slug: 'jeux',
    path: '/jeux',
    title: 'Jeux',
    icon: 'jeux',
    unit: ['jeu', 'jeux'],
    blurb:
      'Des jeux courts qui rebrassent le vocabulaire du livre. Contrairement aux ' +
      "exercices, ils ne suivent aucune leçon et ne se terminent jamais : le contenu " +
      'est retiré au sort à chaque partie.',
    /* Un jeu, ici, n'est pas un exercice déguisé : il ne pratique pas une règle
       nommée, il ne se note pas sur N et il se rejoue. Voir AGENTS.md §5. */
    lessons: [
      { path: '/jeux/motus', title: 'Motus', subtitle: 'le mot de cinq lettres', tag: 'Orthographe' },
      { path: '/jeux/un-ou-une', title: 'Un ou une ?', subtitle: 'le genre des noms', tag: 'Réflexe' },
      { path: '/jeux/mots-meles', title: 'Mots mêlés', subtitle: 'la grille à explorer', tag: 'Vocabulaire' },
      { path: '/jeux/jacques-a-dit', title: 'Jacques a dit', subtitle: "écouter avant d'agir", tag: 'Écoute' },
    ],
  },
  {
    slug: 'lecture',
    path: '/lecture',
    title: 'Lecture',
    icon: 'lecture',
    unit: ['texte', 'textes'],
    blurb:
      'Lisez de courts textes authentiques et entraînez votre compréhension. ' +
      'La traduction en espagnol est disponible sous chaque texte.',
    lessons: [
      { path: '/lecture/le-lion-et-le-rat', title: 'Le Lion et le Rat', subtitle: 'Jean de La Fontaine · Fables' },
      { path: '/lecture/le-petit-prince', title: 'Le Petit Prince', subtitle: 'Antoine de Saint-Exupéry · Chapitre I' },
      { path: '/lecture/entretien-d-embauche', title: "Un entretien d'embauche", subtitle: 'Dialogue · Suisse romande' },
      { path: '/lecture/le-comte-de-monte-cristo', title: 'Le Comte de Monte-Cristo', subtitle: 'Alexandre Dumas · Chapitre I' },
      { path: '/lecture/le-tour-du-monde', title: 'Le Tour du monde en 80 jours', subtitle: 'Jules Verne · Chapitre I' },
    ],
  },
  {
    slug: 'litterature',
    path: '/litterature',
    title: 'Littérature',
    icon: 'litterature',
    unit: ['page', 'pages'],
    blurb:
      'Découvrez les grands classiques de la littérature française : ' +
      'romans, théâtre, poésie et essais à lire au moins une fois.',
    lessons: [
      { path: '/litterature/introduction', title: 'Introduction — 25 classiques', emoji: '📚' },
    ],
  },
  {
    slug: 'prononciation',
    path: '/prononciation',
    title: 'Prononciation',
    icon: 'prononciation',
    unit: ['leçon', 'leçons'],
    blurb:
      'Apprenez à lire et à prononcer le français en comprenant les principaux ' +
      'groupes de lettres et leurs sons.',
    lessons: [
      { path: '/prononciation/les-voyelles', title: 'Les voyelles', subtitle: 'ou · u · eu · oi · au' },
      { path: '/prononciation/les-voyelles-nasales', title: 'Les voyelles nasales', subtitle: 'an · in · on' },
      { path: '/prononciation/les-consonnes', title: 'Les consonnes', subtitle: 'ch · ill · gn' },
    ],
  },
  {
    slug: 'musique',
    path: '/musique',
    title: 'Musique',
    icon: 'musique',
    unit: ['chanson', 'chansons'],
    blurb:
      'Apprenez le français en chantant. Paroles, vocabulaire et contexte ' +
      'pour chaque chanson.',
    lessons: [
      { path: '/musique/la-vie-en-rose', title: 'La vie en rose', subtitle: 'Édith Piaf', tag: 'Facile' },
      { path: '/musique/non-je-ne-regrette-rien', title: 'Non, je ne regrette rien', subtitle: 'Édith Piaf', tag: 'Intermédiaire', soon: true },
      { path: '/musique/le-pont-mirabeau', title: 'Le pont Mirabeau', subtitle: 'Guillaume Apollinaire', tag: 'Intermédiaire', soon: true },
    ],
  },
  {
    slug: 'culture',
    path: '/culture',
    title: 'Culture',
    icon: 'culture',
    unit: ['page', 'pages'],
    blurb:
      'Découvrez le pays derrière la langue : ses territoires, ses villes ' +
      'et ses habitudes.',
    lessons: [
      { path: '/culture/les-regions-de-france', title: 'Les régions de France', emoji: '🗺️' },
    ],
  },
  {
    slug: 'vocabulaire',
    path: '/vocabulaire',
    title: 'Vocabulaire',
    icon: 'vocabulaire',
    unit: ['activité', 'activités'],
    blurb:
      'Enrichissez votre vocabulaire français avec des listes et des outils ' +
      'adaptés au niveau A2.',
    /* Base first (words, numbers, time), then the everyday themes. */
    lessons: [
      { path: '/vocabulaire/100-mots-les-plus-utilises', title: 'Les 100 mots les plus utilisés' },
      { path: '/vocabulaire/les-nombres', title: 'Les nombres' },
      { path: '/vocabulaire/l-heure', title: "L'heure" },
      { path: '/vocabulaire/les-jours-et-la-date', title: 'Les jours et la date' },
      { path: '/vocabulaire/la-maison', title: 'La maison' },
      { path: '/vocabulaire/la-nourriture', title: 'La nourriture et les repas' },
      { path: '/vocabulaire/les-vetements', title: 'Les vêtements' },
      { path: '/vocabulaire/la-ville', title: 'La ville' },
      { path: '/vocabulaire/les-transports', title: 'Les transports' },
      { path: '/vocabulaire/le-travail', title: 'Le travail' },
      { path: '/vocabulaire/la-meteo', title: 'La météo et les saisons' },
      { path: '/vocabulaire/le-docteur', title: 'Chez le docteur' },
      { path: '/vocabulaire/la-famille', title: 'La famille' },
      { path: '/vocabulaire/le-corps', title: 'Le corps humain' },
      { path: '/vocabulaire/les-couleurs', title: 'Les couleurs' },
    ],
  },
  {
    slug: 'conversation',
    path: '/conversation',
    title: 'Conversation',
    icon: 'conversation',
    unit: ['dialogue', 'dialogues'],
    blurb:
      'Mises en situation de la vie quotidienne. Complétez les dialogues ' +
      'et entraînez-vous à parler français au niveau A2.',
    lessons: [
      { path: '/conversation/en-vacances', title: 'En vacances', emoji: '🏖️' },
      { path: '/conversation/a-la-boulangerie', title: 'À la boulangerie', emoji: '🥖' },
      { path: '/conversation/au-restaurant', title: 'Au restaurant' },
      { path: '/conversation/a-disneyland-paris', title: 'À Disneyland Paris', emoji: '🏰' },
      { path: '/conversation/chez-le-medecin', title: 'Chez le médecin', emoji: '🩺' },
      { path: '/conversation/a-la-pharmacie', title: 'À la pharmacie', emoji: '💊' },
      { path: '/conversation/demander-son-chemin', title: 'Demander son chemin', emoji: '🧭' },
    ],
  },
]

/** Utility routes — reachable from the sidebar footer, not book chapters. */
export const annexes = [
  { path: '/nouveautes', title: 'Nouveautés', icon: 'nouveautes' },
  { path: '/ma-progression', title: 'Ma progression', icon: 'progress' },
  { path: '/a-propos', title: 'À propos', icon: 'about' },
]

/** Lessons that actually have a route (excludes `soon` placeholders). */
export function publishedLessons(chapter) {
  return chapter.lessons.filter(lesson => !lesson.soon)
}

/** "9 leçons" / "1 dictée" — pluralised with the chapter's own unit noun. */
export function chapterCount(chapter) {
  const count = publishedLessons(chapter).length
  return { count, label: chapter.unit[count === 1 ? 0 : 1] }
}

/** Find the chapter owning a route path, e.g. '/grammaire/les-adverbes'. */
export function findChapter(routePath) {
  const slug = routePath.split('/').filter(Boolean)[0]
  return chapters.find(chapter => chapter.slug === slug) ?? null
}

/** Find the lesson matching an exact route path. */
export function findLesson(routePath) {
  for (const chapter of chapters) {
    const lesson = chapter.lessons.find(item => item.path === routePath)
    if (lesson) return { chapter, lesson }
  }
  return null
}

/**
 * Renamed lesson paths — old path → current path.
 *
 * Progress in `useProgress` is keyed by route path, so moving or renaming a
 * lesson would otherwise silently orphan every tick a learner has on it. Add
 * the old path here in the same commit as the rename and their history follows
 * the page. Entries are cheap and never expire: keep them.
 */
export const pathAliases = {
  // '/grammaire/ancien-slug': '/grammaire/nouveau-slug',
}

/** A page shows at most four related links — past that it stops being a hint. */
export const MAX_RELATED = 4

/**
 * "Pour aller plus loin" — the links at the foot of a lesson, keyed by route.
 *
 * The pairing is always one of three: the lesson a drill practises, the drill
 * that practises a lesson, or the sibling page a learner reaches for next.
 * Kept here rather than inside each view so a renamed route is fixed in one
 * place; `RelatedLinks.vue` resolves the titles from `chapters` above, so a
 * typo shows up as a missing row rather than a dead anchor.
 */
export const relatedPages = {
  // ── Grammaire ────────────────────────────────
  '/grammaire/les-articles': ['/exercices/les-articles', '/astuces/le-genre-des-noms', '/grammaire/les-adjectifs', '/vocabulaire/la-nourriture'],
  '/grammaire/les-adjectifs': ['/exercices/les-adjectifs-accord', '/astuces/le-genre-des-noms', '/grammaire/le-comparatif-et-le-superlatif'],
  '/grammaire/les-demonstratifs': ['/orthographe/les-determinants-possessifs', '/grammaire/les-articles'],
  '/grammaire/les-adverbes': ['/exercices/les-adverbes', '/grammaire/les-adjectifs'],
  '/grammaire/la-negation': ['/exercices/la-negation', '/grammaire/l-interrogation', '/exercices/phrases-en-desordre'],
  '/grammaire/l-interrogation': ['/exercices/phrases-en-desordre', '/grammaire/la-negation', '/conversation/demander-son-chemin'],
  '/grammaire/verbe-1er-groupe': ['/conjugaison/parler', '/exercices/quel-groupe-verbe-appartient', '/exercices/conjugaison-present', '/exercices/la-bonne-terminaison'],
  '/grammaire/verbe-2eme-groupe': ['/conjugaison/finir', '/exercices/quel-groupe-verbe-appartient', '/exercices/conjugaison-present'],
  '/grammaire/verbe-3eme-groupe': ['/conjugaison/prendre', '/conjugaison/venir', '/exercices/quel-groupe-verbe-appartient'],
  '/grammaire/les-verbes-pronominaux': ['/grammaire/les-pronoms-cod-coi', '/conjugaison/etre'],
  '/grammaire/les-verbes-modaux': ['/conjugaison/pouvoir', '/conjugaison/vouloir'],
  '/grammaire/l-imperatif': ['/conjugaison/parler', '/conversation/demander-son-chemin'],
  '/grammaire/le-passe-compose': ['/exercices/le-passe-compose', '/astuces/etre-ou-avoir', '/exercices/etre-ou-avoir', '/conjugaison/avoir'],
  '/grammaire/l-imparfait': ['/exercices/construis-l-imparfait', '/grammaire/passe-compose-ou-imparfait', '/exercices/devine-les-temps', '/exercices/mets-au-bon-temps'],
  '/grammaire/passe-compose-ou-imparfait': ['/grammaire/le-passe-compose', '/grammaire/l-imparfait', '/exercices/devine-les-temps', '/exercices/construis-l-imparfait'],
  '/grammaire/le-futur-proche': ['/exercices/le-futur-proche', '/conjugaison/aller', '/grammaire/le-futur-simple'],
  '/grammaire/le-futur-simple': ['/grammaire/le-futur-proche', '/grammaire/le-conditionnel-present', '/exercices/mets-au-bon-temps', '/conjugaison/voir'],
  '/grammaire/le-conditionnel-present': ['/exercices/mets-au-bon-temps', '/grammaire/le-futur-simple', '/exercices/la-bonne-terminaison'],
  '/grammaire/les-pronoms-cod-coi': ['/exercices/le-bon-pronom', '/grammaire/les-pronoms-y-en', '/musique/la-vie-en-rose'],
  '/grammaire/les-pronoms-y-en': ['/exercices/le-bon-pronom', '/grammaire/les-pronoms-cod-coi'],
  '/grammaire/le-comparatif-et-le-superlatif': ['/grammaire/les-adjectifs', '/grammaire/les-adverbes'],
  '/grammaire/les-prepositions-de-lieu': ['/astuces/a-en-au-aux', '/culture/les-regions-de-france', '/conversation/demander-son-chemin'],

  // ── Conjugaison ──────────────────────────────
  '/conjugaison/etre': ['/astuces/etre-ou-avoir', '/exercices/etre-ou-avoir', '/grammaire/le-passe-compose'],
  '/conjugaison/avoir': ['/astuces/etre-ou-avoir', '/exercices/etre-ou-avoir', '/grammaire/le-passe-compose'],
  '/conjugaison/parler': ['/grammaire/verbe-1er-groupe', '/exercices/conjugaison-present'],
  '/conjugaison/finir': ['/grammaire/verbe-2eme-groupe', '/exercices/conjugaison-present'],
  '/conjugaison/aimer': ['/conjugaison/parler', '/grammaire/verbe-1er-groupe', '/exercices/conjugaison-present'],
  '/conjugaison/donner': ['/conjugaison/parler', '/grammaire/les-pronoms-cod-coi', '/exercices/conjugaison-present'],
  '/conjugaison/manger': ['/conjugaison/commencer', '/grammaire/verbe-1er-groupe', '/vocabulaire/la-nourriture', '/exercices/la-bonne-terminaison'],
  '/conjugaison/commencer': ['/conjugaison/manger', '/grammaire/verbe-1er-groupe'],
  '/conjugaison/acheter': ['/conjugaison/appeler', '/grammaire/verbe-1er-groupe', '/vocabulaire/les-vetements'],
  '/conjugaison/appeler': ['/conjugaison/acheter', '/grammaire/verbe-1er-groupe', '/conversation/chez-le-medecin'],
  '/conjugaison/choisir': ['/conjugaison/finir', '/grammaire/verbe-2eme-groupe', '/exercices/quel-groupe-verbe-appartient'],
  '/conjugaison/aller': ['/grammaire/le-futur-proche', '/exercices/le-futur-proche'],
  '/conjugaison/faire': ['/grammaire/verbe-3eme-groupe', '/exercices/conjugaison-present'],
  '/conjugaison/pouvoir': ['/grammaire/les-verbes-modaux', '/conjugaison/vouloir'],
  '/conjugaison/vouloir': ['/grammaire/les-verbes-modaux', '/conjugaison/pouvoir'],
  '/conjugaison/venir': ['/grammaire/verbe-3eme-groupe', '/grammaire/le-passe-compose'],
  '/conjugaison/prendre': ['/grammaire/verbe-3eme-groupe', '/vocabulaire/les-transports'],
  '/conjugaison/dire': ['/conjugaison/faire', '/conjugaison/lire', '/grammaire/verbe-3eme-groupe'],
  '/conjugaison/devoir': ['/grammaire/les-verbes-modaux', '/conjugaison/pouvoir', '/conjugaison/vouloir'],
  '/conjugaison/savoir': ['/conjugaison/connaitre', '/grammaire/verbe-3eme-groupe'],
  '/conjugaison/voir': ['/conjugaison/savoir', '/grammaire/verbe-3eme-groupe', '/exercices/mets-au-bon-temps'],
  '/conjugaison/partir': ['/conjugaison/sortir', '/grammaire/le-passe-compose', '/astuces/etre-ou-avoir'],
  '/conjugaison/sortir': ['/conjugaison/partir', '/grammaire/le-passe-compose', '/astuces/etre-ou-avoir'],
  '/conjugaison/mettre': ['/conjugaison/prendre', '/grammaire/verbe-3eme-groupe', '/vocabulaire/les-vetements'],
  '/conjugaison/attendre': ['/conjugaison/prendre', '/grammaire/verbe-3eme-groupe', '/vocabulaire/les-transports'],
  '/conjugaison/ecrire': ['/conjugaison/lire', '/grammaire/verbe-3eme-groupe', '/dictees/une-journee-en-vacances'],
  '/conjugaison/lire': ['/conjugaison/ecrire', '/conjugaison/dire', '/lecture/le-petit-prince'],
  '/conjugaison/boire': ['/conjugaison/manger', '/vocabulaire/la-nourriture', '/grammaire/verbe-3eme-groupe', '/conversation/a-la-boulangerie'],
  '/conjugaison/ouvrir': ['/conjugaison/parler', '/grammaire/verbe-3eme-groupe'],
  '/conjugaison/connaitre': ['/conjugaison/savoir', '/grammaire/verbe-3eme-groupe', '/conversation/demander-son-chemin'],

  // ── Orthographe ──────────────────────────────
  '/orthographe/les-accents': ['/orthographe/les-homophones', '/prononciation/les-voyelles', '/conjugaison/commencer', '/dictees/une-journee-en-vacances'],
  '/orthographe/les-homophones': ['/orthographe/les-accents', '/astuces/le-test-de-substitution', '/exercices/trouve-la-faute', '/exercices/ecoute-et-choisis'],
  '/orthographe/les-determinants-possessifs': ['/orthographe/les-pronoms-possessifs', '/grammaire/les-demonstratifs'],
  '/orthographe/les-pronoms-possessifs': ['/orthographe/les-determinants-possessifs', '/grammaire/les-demonstratifs'],

  // ── Astuces ──────────────────────────────────
  '/astuces/a-en-au-aux': ['/grammaire/les-prepositions-de-lieu', '/vocabulaire/la-ville', '/culture/les-regions-de-france'],
  '/astuces/le-genre-des-noms': ['/jeux/un-ou-une', '/grammaire/les-articles', '/exercices/les-articles', '/grammaire/les-adjectifs'],
  '/astuces/etre-ou-avoir': ['/grammaire/le-passe-compose', '/exercices/etre-ou-avoir', '/conjugaison/etre'],
  '/astuces/le-test-de-substitution': ['/orthographe/les-homophones', '/exercices/trouve-la-faute'],

  // ── Dictées ──────────────────────────────────
  '/dictees/une-journee-en-vacances': ['/conversation/en-vacances', '/vocabulaire/la-meteo', '/grammaire/le-passe-compose'],
  '/dictees/la-pierre-de-rosette': ['/lecture/le-comte-de-monte-cristo', '/grammaire/l-imparfait'],
  '/dictees/les-fleurs-du-mal': ['/litterature/introduction', '/lecture/le-petit-prince'],

  // ── Exercices — every drill points back at the lesson it practises ──
  '/exercices/associe-les-pairs': ['/vocabulaire/100-mots-les-plus-utilises', '/exercices/emoji-francais'],
  '/exercices/emoji-francais': ['/vocabulaire/100-mots-les-plus-utilises', '/exercices/associe-les-pairs'],
  '/exercices/quel-groupe-verbe-appartient': ['/grammaire/verbe-1er-groupe', '/grammaire/verbe-2eme-groupe', '/grammaire/verbe-3eme-groupe'],
  '/exercices/conjugaison-present': ['/conjugaison/parler', '/conjugaison/finir', '/grammaire/verbe-1er-groupe'],
  '/exercices/les-articles': ['/grammaire/les-articles', '/astuces/le-genre-des-noms'],
  '/exercices/la-negation': ['/grammaire/la-negation', '/grammaire/l-interrogation'],
  '/exercices/le-futur-proche': ['/grammaire/le-futur-proche', '/conjugaison/aller'],
  '/exercices/le-passe-compose': ['/grammaire/le-passe-compose', '/astuces/etre-ou-avoir', '/exercices/etre-ou-avoir'],
  '/exercices/les-adverbes': ['/grammaire/les-adverbes', '/grammaire/les-adjectifs'],
  '/exercices/les-adjectifs-accord': ['/grammaire/les-adjectifs', '/astuces/le-genre-des-noms'],
  '/exercices/phrases-en-desordre': ['/grammaire/l-interrogation', '/grammaire/la-negation'],
  '/exercices/etre-ou-avoir': ['/astuces/etre-ou-avoir', '/grammaire/le-passe-compose', '/conjugaison/etre', '/conjugaison/avoir'],
  '/exercices/trouve-la-faute': ['/orthographe/les-homophones', '/astuces/le-test-de-substitution'],
  '/exercices/devine-les-temps': ['/grammaire/passe-compose-ou-imparfait', '/grammaire/l-imparfait', '/grammaire/le-futur-simple'],
  '/exercices/ecoute-et-choisis': ['/prononciation/les-voyelles-nasales', '/prononciation/les-voyelles', '/orthographe/les-homophones'],
  '/exercices/mets-au-bon-temps': ['/grammaire/le-conditionnel-present', '/grammaire/l-imparfait', '/conjugaison/parler', '/exercices/la-bonne-terminaison'],
  '/exercices/le-bon-pronom': ['/grammaire/les-pronoms-cod-coi', '/grammaire/les-pronoms-y-en', '/musique/la-vie-en-rose'],
  '/exercices/la-bonne-terminaison': ['/grammaire/verbe-1er-groupe', '/grammaire/l-imparfait', '/grammaire/le-conditionnel-present', '/exercices/mets-au-bon-temps'],
  '/exercices/construis-l-imparfait': ['/grammaire/l-imparfait', '/grammaire/passe-compose-ou-imparfait', '/exercices/la-bonne-terminaison', '/conjugaison/parler'],

  // ── Jeux ────────────────────────────────────
  '/jeux/motus': ['/vocabulaire/la-nourriture', '/prononciation/les-voyelles', '/exercices/emoji-francais'],
  '/jeux/un-ou-une': ['/astuces/le-genre-des-noms', '/grammaire/les-articles', '/exercices/les-articles', '/jeux/motus'],
  '/jeux/mots-meles': ['/vocabulaire/la-nourriture', '/vocabulaire/le-corps', '/jeux/motus', '/exercices/emoji-francais'],
  '/jeux/jacques-a-dit': ['/vocabulaire/le-corps', '/grammaire/l-imperatif', '/exercices/ecoute-et-choisis', '/prononciation/les-voyelles'],

  // ── Lecture ──────────────────────────────────
  '/lecture/le-lion-et-le-rat': ['/litterature/introduction', '/grammaire/l-imparfait'],
  '/lecture/le-petit-prince': ['/litterature/introduction', '/lecture/le-comte-de-monte-cristo'],
  '/lecture/entretien-d-embauche': ['/vocabulaire/le-travail', '/grammaire/le-conditionnel-present'],
  '/lecture/le-comte-de-monte-cristo': ['/litterature/introduction', '/lecture/le-tour-du-monde'],
  '/lecture/le-tour-du-monde': ['/litterature/introduction', '/vocabulaire/les-transports'],

  // ── Littérature · Prononciation · Musique ────
  '/litterature/introduction': ['/lecture/le-petit-prince', '/lecture/le-comte-de-monte-cristo', '/dictees/les-fleurs-du-mal'],
  '/prononciation/les-voyelles': ['/prononciation/les-voyelles-nasales', '/prononciation/les-consonnes', '/exercices/ecoute-et-choisis'],
  '/prononciation/les-voyelles-nasales': ['/prononciation/les-voyelles', '/exercices/ecoute-et-choisis', '/dictees/une-journee-en-vacances'],
  '/prononciation/les-consonnes': ['/prononciation/les-voyelles', '/orthographe/les-homophones', '/exercices/ecoute-et-choisis'],
  '/musique/la-vie-en-rose': ['/grammaire/les-pronoms-cod-coi', '/exercices/le-bon-pronom', '/prononciation/les-voyelles'],

  // ── Culture ──────────────────────────────────
  '/culture/les-regions-de-france': ['/astuces/a-en-au-aux', '/grammaire/les-prepositions-de-lieu', '/vocabulaire/la-ville', '/vocabulaire/la-meteo'],

  // ── Vocabulaire ──────────────────────────────
  '/vocabulaire/100-mots-les-plus-utilises': ['/exercices/associe-les-pairs', '/exercices/emoji-francais'],
  '/vocabulaire/les-nombres': ['/vocabulaire/l-heure', '/vocabulaire/les-jours-et-la-date', '/conversation/a-la-boulangerie'],
  '/vocabulaire/l-heure': ['/vocabulaire/les-nombres', '/vocabulaire/les-jours-et-la-date'],
  '/vocabulaire/les-jours-et-la-date': ['/vocabulaire/l-heure', '/vocabulaire/les-nombres', '/vocabulaire/la-meteo'],
  '/vocabulaire/la-maison': ['/vocabulaire/les-vetements', '/vocabulaire/la-ville'],
  '/vocabulaire/la-nourriture': ['/grammaire/les-articles', '/conversation/a-la-boulangerie', '/conjugaison/manger', '/conjugaison/boire'],
  '/vocabulaire/les-vetements': ['/vocabulaire/la-maison', '/vocabulaire/la-meteo'],
  '/vocabulaire/la-ville': ['/vocabulaire/les-transports', '/conversation/demander-son-chemin', '/grammaire/les-prepositions-de-lieu'],
  '/vocabulaire/les-transports': ['/vocabulaire/la-ville', '/conversation/demander-son-chemin', '/lecture/le-tour-du-monde'],
  '/vocabulaire/le-travail': ['/lecture/entretien-d-embauche', '/grammaire/le-conditionnel-present'],
  '/vocabulaire/la-meteo': ['/vocabulaire/les-jours-et-la-date', '/conversation/en-vacances', '/dictees/une-journee-en-vacances'],
  '/vocabulaire/le-docteur': ['/conversation/chez-le-medecin', '/conversation/a-la-pharmacie'],
  '/vocabulaire/la-famille': ['/orthographe/les-determinants-possessifs', '/vocabulaire/le-corps', '/conversation/chez-le-medecin'],
  '/vocabulaire/le-corps': ['/vocabulaire/le-docteur', '/conversation/chez-le-medecin', '/astuces/a-en-au-aux'],
  '/vocabulaire/les-couleurs': ['/grammaire/les-adjectifs', '/exercices/les-adjectifs-accord', '/musique/la-vie-en-rose'],

  // ── Conversation ─────────────────────────────
  '/conversation/en-vacances': ['/vocabulaire/la-meteo', '/dictees/une-journee-en-vacances'],
  '/conversation/a-la-boulangerie': ['/vocabulaire/la-nourriture', '/vocabulaire/les-nombres', '/vocabulaire/la-ville'],
  '/conversation/au-restaurant': ['/vocabulaire/la-nourriture', '/vocabulaire/les-nombres', '/grammaire/les-articles', '/conversation/a-la-boulangerie'],
  '/conversation/a-disneyland-paris': ['/vocabulaire/les-transports', '/conversation/demander-son-chemin'],
  '/conversation/chez-le-medecin': ['/vocabulaire/le-docteur', '/conversation/a-la-pharmacie'],
  '/conversation/a-la-pharmacie': ['/vocabulaire/le-docteur', '/conversation/chez-le-medecin'],
  '/conversation/demander-son-chemin': ['/grammaire/les-prepositions-de-lieu', '/astuces/a-en-au-aux', '/vocabulaire/la-ville'],

  // ── Thèmes ───────────────────────────────────
}

/**
 * Resolve a page's related links into renderable rows.
 * A path with no matching lesson — or one still marked `soon` — is dropped, so
 * a stale entry degrades to one fewer link instead of a dead anchor.
 */
export function relatedFor(routePath) {
  return (relatedPages[routePath] ?? [])
    .slice(0, MAX_RELATED)
    .map(path => {
      const chapter = findChapter(path)
      const lesson = chapter?.lessons.find(item => item.path === path)
      if (!lesson || lesson.soon) return null
      return {
        path,
        title: lesson.title,
        emoji: lesson.emoji ?? null,
        icon: chapter.icon,
        chapter: chapter.shortTitle ?? chapter.title,
      }
    })
    .filter(Boolean)
}
