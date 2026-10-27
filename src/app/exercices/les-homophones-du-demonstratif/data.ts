/**
 * « Écrivez le bon mot » — quatorze phrases, huit mots possibles.
 *
 * **Un seul lot, sans niveau.** La paire `ces / ses` se décide de la même façon
 * pour qui apprend le français et pour qui l'écrit depuis toujours : c'est de
 * la littératie, pas un échelon du CECRL, et la leçon qui la porte est taguée
 * sans niveau comme le reste du chapitre `orthographe`. Ce fichier n'exporte donc pas
 * de `BANKS` : il n'y a rien à faire varier par niveau (`AGENTS.md` §8).
 *
 * **Aucun import**, pas même de type (d'où `because` typé en ligne, et non par `Bi`) : l'audit `nav-wiring` lit ce dossier avec
 * `node` tout court.
 *
 * **La saisie est ici légitime**, contrairement au reste du chapitre : ce qui
 * s'apprend est l'orthographe elle-même, donc cliquer sur la bonne pastille
 * aurait été reconnaître au lieu d'écrire (`.claude/agents/exercise-author.md`).
 * `AccentBar` accompagne le champ, parce que `ç` ne se tape pas sur un clavier
 * espagnol — sans cette rangée, le plateau compterait faux une réponse juste
 * (`AGENTS.md` §1).
 *
 * **Chaque phrase n'a qu'une réponse défendable, et c'est la phrase qui s'en
 * charge** : un `-là` collé au nom appelle le démonstratif, `chacun` appelle le
 * possessif, un participe passé appelle `s'est`. Deux phrases françaises
 * séparées par le seul sens seraient un item cassé.
 */

export interface WordItem {
  /** Permanent within this file: the key React renders by. */
  id: string;
  /** Avant le blanc. Vide quand la phrase commence par le mot à écrire. */
  before: string;
  /** Après le blanc, ponctuation finale comprise. */
  after: string;
  /**
   * La forme attendue, **telle qu'elle s'écrit dans la phrase** : la majuscule
   * en tête de phrase et l'apostrophe typographique en font partie. La
   * comparaison, elle, pardonne la casse et l'apostrophe droite (`board.tsx`),
   * parce que ni l'une ni l'autre n'est ce qui s'apprend ici.
   */
  answer: string;
  /** Le test appliqué, montré après coup : il corrige au lieu de répéter. */
  because: { fr: string; es: string };
}

export const ITEMS: WordItem[] = [
  {
    id: "ce-matin",
    before: "",
    after: " matin, je me suis levé tôt.",
    answer: "Ce",
    because: {
      fr: "Un nom suit, et on peut dire « le matin » : c’est le démonstratif, ce.",
      es: "Sigue un sustantivo, y se puede decir «*le matin*»: es el demostrativo, *ce*.",
    },
  },
  {
    id: "ce-que",
    before: "Je ne comprends pas ",
    after: " que tu écris.",
    answer: "ce",
    because: {
      fr: "Devant que, la forme est ce : ce que tu écris. « Se que » n’existe pas.",
      es: "Delante de *que*, la forma es *ce*: *ce que tu écris*. «*Se que*» no existe.",
    },
  },
  {
    id: "se-leve",
    before: "Il ",
    after: " lève à six heures tous les jours.",
    answer: "se",
    because: {
      fr: "Mettez la phrase à je : je me lève. Le me prouve le se.",
      es: "Pasa la frase a *je*: *je me lève*. El *me* prueba que es *se*.",
    },
  },
  {
    id: "se-souvient",
    before: "Elle ",
    after: " souvient très bien de ce jour-là.",
    answer: "se",
    because: {
      fr: "Je me souviens : le test du je donne me, donc se.",
      es: "*Je me souviens*: la prueba del *je* da *me*, por tanto *se*.",
    },
  },
  {
    id: "ces-montagnes",
    before: "Regarde ",
    after: " montagnes-là, au fond.",
    answer: "ces",
    because: {
      fr: "Le -là est collé au nom : on montre, donc ces.",
      es: "El *-là* va pegado al sustantivo: se señala, por tanto *ces*.",
    },
  },
  {
    id: "ces-gens",
    before: "",
    after: " gens-là habitent en face.",
    answer: "Ces",
    because: {
      fr: "Le -là appelle le démonstratif : ces gens-là.",
      es: "El *-là* pide el demostrativo: *ces gens-là*.",
    },
  },
  {
    id: "ses-mains",
    before: "Il a mis ",
    after: " mains dans les poches de son manteau.",
    answer: "ses",
    because: {
      fr: "Ce sont les siennes, et personne ne les montre : le possessif, ses.",
      es: "Son las suyas, y nadie las señala: el posesivo, *ses*.",
    },
  },
  {
    id: "ses-affaires",
    before: "Chacun reprend ",
    after: " affaires avant de partir.",
    answer: "ses",
    because: {
      fr: "Chacun reprend les siennes : ses affaires.",
      es: "Cada uno recoge las suyas: *ses affaires*.",
    },
  },
  {
    id: "c-est-tard",
    before: "",
    after: " trop tard pour téléphoner.",
    answer: "C’est",
    because: {
      fr: "Cela est trop tard : la phrase tient, donc c’est.",
      es: "*Cela est trop tard*: la frase se sostiene, por tanto *c’est*.",
    },
  },
  {
    id: "c-est-elle",
    before: "",
    after: " elle qui a téléphoné hier soir.",
    answer: "C’est",
    because: {
      fr: "Aucun participe passé ne suit, donc ce n’est pas s’est : c’est elle.",
      es: "No sigue ningún participio pasado, así que no es *s’est*: *c’est elle*.",
    },
  },
  {
    id: "s-est-trompe",
    before: "Il ",
    after: " trompé de train.",
    answer: "s’est",
    because: {
      fr: "Je me suis trompé : le test du je donne s’est, suivi du participe.",
      es: "*Je me suis trompé*: la prueba del *je* da *s’est*, seguido del participio.",
    },
  },
  {
    id: "s-est-ouverte",
    before: "La porte ",
    after: " ouverte toute seule.",
    answer: "s’est",
    because: {
      fr: "Le verbe est s’ouvrir au passé composé : la porte s’est ouverte.",
      es: "El verbo es *s’ouvrir* en *passé composé*: *la porte s’est ouverte*.",
    },
  },
  {
    id: "ca-marche",
    before: "",
    after: " ne marche plus depuis hier.",
    answer: "Ça",
    because: {
      fr: "Cela ne marche plus : ça, avec une cédille et sans accent.",
      es: "*Cela ne marche plus*: *ça*, con cedilla y sin acento.",
    },
  },
  {
    id: "sa-voiture",
    before: "",
    after: " voiture est en panne, il vient à pied.",
    answer: "Sa",
    because: {
      fr: "Remplacez par ma : ma voiture. Donc sa.",
      es: "Sustituye por *ma*: *ma voiture*. Por tanto *sa*.",
    },
  },
];

/* Vérification, à relancer après toute modification. Elle imprime les phrases
   reconstruites : une phrase à deux réponses défendables ne se voit pas dans
   les données, elle se voit en la relisant (`AGENTS.md` §9).

node --experimental-strip-types --input-type=module -e "
import { ITEMS } from './src/app/exercices/les-homophones-du-demonstratif/data.ts'
const EIGHT = ['ce', 'se', 'ces', 'ses', 'c_est', 's_est', 'ca', 'sa']
const fold = (s) => s.toLowerCase().replace(/[’']/g, '_').replace('ç', 'c')
const bad = []
const used = new Set()
if (new Set(ITEMS.map(i => i.id)).size !== ITEMS.length) bad.push('id en double')
for (const item of ITEMS) {
  const key = fold(item.answer)
  used.add(key)
  if (!EIGHT.includes(key)) bad.push(item.id + ': réponse hors des huit mots (' + item.answer + ')')
  if (item.before === '' && item.answer[0] !== item.answer[0].toUpperCase()) bad.push(item.id + ': début de phrase sans majuscule')
  if (item.before !== '' && item.answer[0] === item.answer[0].toUpperCase()) bad.push(item.id + ': majuscule en plein milieu de phrase')
  if (/'/.test(item.answer)) bad.push(item.id + ': apostrophe droite dans la réponse')
  if (!/[.?!]$/.test(item.after)) bad.push(item.id + ': la phrase ne finit pas')
  if (item.because.fr.length < 20 || item.because.es.length < 20) bad.push(item.id + ': correction trop courte')
  console.log('   ' + item.before + item.answer + item.after)
}
for (const word of EIGHT) if (!used.has(word)) bad.push('« ' + word + ' » n_est jamais la réponse')
console.log('phrases vérifiées:', ITEMS.length, '/ mots couverts:', used.size, 'sur 8')
console.log('problèmes:', bad.length ? bad : 'aucun')
"
*/
