/**
 * « Écrivez le bon mot » — quatorze phrases, huit mots possibles.
 *
 * **Un seul lot, sans niveau.** La paire `ces / ses` se décide de la même façon
 * pour qui apprend le français et pour qui l'écrit depuis toujours : c'est de
 * la littératie, pas un échelon du CECRL, et la leçon qui la porte est taguée
 * `ANY` comme le reste du chapitre `orthographe`. Ce fichier n'exporte donc pas
 * de `BANKS` : il n'y a rien à faire varier par niveau (`AGENTS.md` §8).
 *
 * **Aucun import**, pas même de type : l'audit `nav-wiring` lit ce dossier avec
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
  because: string;
}

export const ITEMS: WordItem[] = [
  {
    id: "ce-matin",
    before: "",
    after: " matin, je me suis levé tôt.",
    answer: "Ce",
    because:
      "Un nom suit, et on peut dire « le matin » : c’est le démonstratif, ce.",
  },
  {
    id: "ce-que",
    before: "Je ne comprends pas ",
    after: " que tu écris.",
    answer: "ce",
    because:
      "Devant que, la forme est ce : ce que tu écris. « Se que » n’existe pas.",
  },
  {
    id: "se-leve",
    before: "Il ",
    after: " lève à six heures tous les jours.",
    answer: "se",
    because: "Mettez la phrase à je : je me lève. Le me prouve le se.",
  },
  {
    id: "se-souvient",
    before: "Elle ",
    after: " souvient très bien de ce jour-là.",
    answer: "se",
    because: "Je me souviens : le test du je donne me, donc se.",
  },
  {
    id: "ces-montagnes",
    before: "Regarde ",
    after: " montagnes-là, au fond.",
    answer: "ces",
    because: "Le -là est collé au nom : on montre, donc ces.",
  },
  {
    id: "ces-gens",
    before: "",
    after: " gens-là habitent en face.",
    answer: "Ces",
    because: "Le -là appelle le démonstratif : ces gens-là.",
  },
  {
    id: "ses-mains",
    before: "Il a mis ",
    after: " mains dans les poches de son manteau.",
    answer: "ses",
    because:
      "Ce sont les siennes, et personne ne les montre : le possessif, ses.",
  },
  {
    id: "ses-affaires",
    before: "Chacun reprend ",
    after: " affaires avant de partir.",
    answer: "ses",
    because: "Chacun reprend les siennes : ses affaires.",
  },
  {
    id: "c-est-tard",
    before: "",
    after: " trop tard pour téléphoner.",
    answer: "C’est",
    because: "Cela est trop tard : la phrase tient, donc c’est.",
  },
  {
    id: "c-est-elle",
    before: "",
    after: " elle qui a téléphoné hier soir.",
    answer: "C’est",
    because:
      "Aucun participe passé ne suit, donc ce n’est pas s’est : c’est elle.",
  },
  {
    id: "s-est-trompe",
    before: "Il ",
    after: " trompé de train.",
    answer: "s’est",
    because: "Je me suis trompé : le test du je donne s’est, suivi du participe.",
  },
  {
    id: "s-est-ouverte",
    before: "La porte ",
    after: " ouverte toute seule.",
    answer: "s’est",
    because: "Le verbe est s’ouvrir au passé composé : la porte s’est ouverte.",
  },
  {
    id: "ca-marche",
    before: "",
    after: " ne marche plus depuis hier.",
    answer: "Ça",
    because: "Cela ne marche plus : ça, avec une cédille et sans accent.",
  },
  {
    id: "sa-voiture",
    before: "",
    after: " voiture est en panne, il vient à pied.",
    answer: "Sa",
    because: "Remplacez par ma : ma voiture. Donc sa.",
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
  if (item.because.length < 20) bad.push(item.id + ': correction trop courte')
  console.log('   ' + item.before + item.answer + item.after)
}
for (const word of EIGHT) if (!used.has(word)) bad.push('« ' + word + ' » n_est jamais la réponse')
console.log('phrases vérifiées:', ITEMS.length, '/ mots couverts:', used.size, 'sur 8')
console.log('problèmes:', bad.length ? bad : 'aucun')
"
*/
