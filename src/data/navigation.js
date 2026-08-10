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
    slug: 'orthographe',
    path: '/orthographe',
    title: 'Orthographe',
    icon: 'orthographe',
    unit: ['leçon', 'leçons'],
    blurb:
      'Apprenez à bien accorder les mots en genre, en nombre et à utiliser ' +
      'les déterminants, pronoms et homophones correctement.',
    lessons: [
      { path: '/orthographe/les-homophones', title: 'Les homophones grammaticaux (a/à, est/et…)' },
      { path: '/orthographe/les-determinants-possessifs', title: 'Les déterminants possessifs' },
      { path: '/orthographe/les-pronoms-possessifs', title: 'Les pronoms possessifs' },
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
      { path: '/dictees/la-pierre-de-rosette', title: 'La pierre de Rosette', tag: 'Intermédiaire', soon: true },
      { path: '/dictees/les-fleurs-du-mal', title: 'Les fleurs du mal', tag: 'Difficile', soon: true },
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
      { path: '/prononciation/les-syllabes-courantes', title: 'Les syllabes les plus courantes' },
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
      { path: '/musique/la-vie-en-rose', title: 'La vie en rose', subtitle: 'Édith Piaf', tag: 'Facile', soon: true },
      { path: '/musique/non-je-ne-regrette-rien', title: 'Non, je ne regrette rien', subtitle: 'Édith Piaf', tag: 'Intermédiaire', soon: true },
      { path: '/musique/le-pont-mirabeau', title: 'Le pont Mirabeau', subtitle: 'Guillaume Apollinaire', tag: 'Intermédiaire', soon: true },
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
      { path: '/vocabulaire/les-vetements', title: 'Les vêtements' },
      { path: '/vocabulaire/la-ville', title: 'La ville' },
      { path: '/vocabulaire/les-transports', title: 'Les transports' },
      { path: '/vocabulaire/le-travail', title: 'Le travail' },
      { path: '/vocabulaire/la-meteo', title: 'La météo et les saisons' },
      { path: '/vocabulaire/le-docteur', title: 'Chez le docteur' },
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
      { path: '/conversation/a-disneyland-paris', title: 'À Disneyland Paris', emoji: '🏰' },
      { path: '/conversation/chez-le-medecin', title: 'Chez le médecin', emoji: '🩺' },
      { path: '/conversation/a-la-pharmacie', title: 'À la pharmacie', emoji: '💊' },
      { path: '/conversation/demander-son-chemin', title: 'Demander son chemin', emoji: '🧭' },
    ],
  },
  {
    slug: 'theme',
    path: '/theme',
    title: 'Thèmes de conversation',
    shortTitle: 'Thèmes',
    icon: 'theme',
    unit: ['thème', 'thèmes'],
    blurb:
      "Choisissez un thème et pratiquez votre français à l'oral : vocabulaire utile, " +
      'questions pour lancer la conversation et expressions pour donner votre avis.',
    lessons: [
      { path: '/theme/la-famille', title: 'La famille et les amis', subtitle: 'Parler de votre famille, de vos relations et des gens qui vous entourent.' },
      { path: '/theme/les-loisirs', title: 'Les loisirs et le sport', subtitle: 'Parler de vos activités préférées, de vos hobbies et du sport.' },
      { path: '/theme/la-nourriture', title: 'La nourriture et les repas', subtitle: 'Parler de ce que vous aimez manger, de la cuisine et des repas en famille.' },
      { path: '/theme/ecrire-un-livre', title: "Si je devais écrire un livre…", subtitle: 'Roman littéraire ou populaire ? Imaginez votre livre idéal et défendez votre choix.' },
      { path: '/theme/ah-si-jetais-riche', title: "Ah, si j'étais riche !", subtitle: 'Que feriez-vous avec une grande fortune ? Voyages, dons, retraite anticipée… rêvez en français.' },
    ],
  },
]

/** Utility routes — reachable from the sidebar footer, not book chapters. */
export const annexes = [
  { path: '/a-propos', title: 'À propos', icon: 'about' },
  { path: '/contact', title: 'Contact', icon: 'contact' },
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
