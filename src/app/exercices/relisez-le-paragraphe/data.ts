/**
 * « Relisez le paragraphe » — huit paragraphes, et les mots mal écrits dedans.
 *
 * **Le nombre de fautes change d'un paragraphe à l'autre**, et c'est la
 * mécanique : deux ici, trois là, une seule ailleurs. Une quantité annoncée
 * transformerait la relecture en chasse au trésor à compteur, alors que la
 * compétence visée est de relire un texte sans savoir ce qu'on y cherche.
 *
 * **Chaque paragraphe contient aussi le mot bien écrit.** Un paragraphe où
 * chaque `la` est faux apprend à se méfier du mot, pas à lire la phrase : il
 * faut donc que la même forme y soit juste quelque part, et c'est ce que la
 * vérification en bas de ce fichier contrôle.
 *
 * **Les mots restent courts, et c'est une contrainte du plateau** : la liste de
 * corrections affiche « mot → correction » sans le couper (`white-space:
 * nowrap`), pour qu'une paire ne se lise pas sur deux lignes. Les seize paires
 * actuelles tiennent en neuf caractères au plus ; une paire longue déborderait
 * la colonne sur un téléphone.
 *
 * **Un seul lot, sans niveau** : la paire `la / l'a` se décide de la même façon
 * pour qui apprend le français et pour qui l'écrit depuis toujours. Ce fichier
 * n'exporte donc pas de `BANKS` (`AGENTS.md` §8), et aucun import, pas même de
 * type : l'audit `nav-wiring` lit ce dossier avec `node` tout court.
 */

export interface Fault {
  /** L'indice du mot fautif dans `words`. */
  at: number;
  /** Ce qu'il fallait écrire, ponctuation comprise. */
  fix: string;
  /** Le test appliqué, montré après coup. */
  because: string;
}

export interface Paragraph {
  /** Permanent within this file: the key React renders by. */
  id: string;
  /** Le paragraphe, mot par mot, la ponctuation collée au mot. */
  words: string[];
  faults: Fault[];
}

export const PARAGRAPHS: Paragraph[] = [
  {
    id: "pluie",
    words: [
      "Dés", "que", "la", "pluie", "s’arrête,", "je", "sors.", "La", "rue",
      "est", "encore", "mouillée,", "mais", "je", "là", "traverse", "quand",
      "même.",
    ],
    faults: [
      {
        at: 0,
        fix: "Dès",
        because: "À partir du moment où la pluie s’arrête : dès, avec un accent grave.",
      },
      {
        at: 14,
        fix: "la",
        because: "Je la traverse, je les traverse : c’est le pronom, sans accent.",
      },
    ],
  },
  {
    id: "film",
    words: [
      "Il", "a", "du", "partir", "avant", "la", "fin", "du", "film.", "Sa",
      "sœur", "la", "raccompagné", "à", "la", "gare.",
    ],
    faults: [
      {
        at: 2,
        fix: "dû",
        because: "Il a pu partir, il a dû partir : c’est un participe passé, donc l’accent.",
      },
      {
        at: 11,
        fix: "l’a",
        because: "Il l’avait raccompagné : c’est le verbe avoir, avec le pronom collé.",
      },
    ],
  },
  {
    id: "cles",
    words: [
      "Pose", "les", "clés", "la,", "sur", "le", "meuble", "de", "la",
      "cuisine.", "Je", "les", "ai", "vues", "des", "ce", "matin.",
    ],
    faults: [
      {
        at: 3,
        fix: "là,",
        because: "Pose-les ici : c’est l’endroit, donc là avec un accent.",
      },
      {
        at: 14,
        fix: "dès",
        because: "À partir de ce matin : dès, et non l’article des.",
      },
    ],
  },
  {
    id: "debut",
    words: [
      "Des", "le", "début,", "elle", "a", "dit", "qu’elle", "ne", "viendrait",
      "pas.", "Elle", "l’a", "répété", "deux", "fois,", "et", "personne", "ne",
      "la", "crue.",
    ],
    faults: [
      {
        at: 0,
        fix: "Dès",
        because: "À partir du début : dès. L’article des demanderait un nom pluriel.",
      },
      {
        at: 18,
        fix: "l’a",
        because: "Personne ne l’avait crue : c’est le verbe avoir, suivi d’un participe.",
      },
    ],
  },
  {
    id: "copies",
    words: [
      "Le", "professeur", "a", "rendu", "les", "copies.", "Il", "a", "du",
      "en", "corriger", "trente,", "dés", "huit", "heures", "du", "matin.",
    ],
    faults: [
      {
        at: 8,
        fix: "dû",
        because: "Il a pu en corriger trente : le participe de devoir prend l’accent.",
      },
      {
        at: 12,
        fix: "dès",
        because: "À partir de huit heures : dès, avec un accent grave.",
      },
    ],
  },
  {
    id: "voiture",
    words: [
      "La", "voiture", "est", "la,", "devant", "la", "maison.", "Mon", "frère",
      "la", "garée", "ce", "matin,", "dès", "son", "arrivée.",
    ],
    faults: [
      {
        at: 3,
        fix: "là,",
        because: "Elle est ici, devant la maison : c’est l’endroit, donc là.",
      },
      {
        at: 9,
        fix: "l’a",
        because: "Mon frère l’avait garée : c’est le verbe avoir, pas l’article.",
      },
    ],
  },
  {
    id: "excuses",
    words: [
      "Il", "n’a", "pas", "fait", "ce", "qu’il", "aurait", "du", "faire.",
      "Dès", "excuses,", "il", "en", "a", "donné", "tout", "au", "long", "du",
      "repas,", "mais", "il", "ne", "la", "jamais", "dit", "clairement.",
    ],
    faults: [
      {
        at: 7,
        fix: "dû",
        because: "Ce qu’il aurait pu faire : c’est le participe de devoir, donc dû.",
      },
      {
        at: 9,
        fix: "Des",
        because: "Un nom pluriel suit, et rien ne dit à partir de quand : c’est l’article des.",
      },
      {
        at: 23,
        fix: "l’a",
        because: "Il ne l’avait jamais dit : le verbe avoir, suivi d’un participe.",
      },
    ],
  },
  {
    id: "reunion",
    words: [
      "Là", "réunion", "commence", "dès", "neuf", "heures.", "Le", "directeur",
      "l’a", "annoncée", "hier,", "et", "personne", "n’est", "venu", "la",
      "contredire.",
    ],
    faults: [
      {
        at: 0,
        fix: "La",
        because: "Les réunions commencent : c’est l’article, et il n’a pas d’accent.",
      },
    ],
  },
];

/* Vérification, à relancer après toute modification. Les fautes se contrôlent
   en **faisant la substitution** et en relisant les huit paragraphes corrigés :
   une faute d'insertion, d'ordre ou de ponctuation ne se voit pas autrement
   (`.claude/agents/exercise-author.md`). Le compte est imprimé avant le
   verdict, pour qu'un contrôle qui ne trouve rien échoue bruyamment.

node --experimental-strip-types --input-type=module -e "
import { PARAGRAPHS } from './src/app/exercices/relisez-le-paragraphe/data.ts'
const TRICKY = ['la', 'des', 'du']
const fold = (w) => w.toLowerCase().replace(/[.,;:!?]/g, '').replace(/[’']/g, '').replace(/[àâ]/g, 'a').replace(/[èéê]/g, 'e').replace(/û/g, 'u')
const bad = []
let faults = 0
if (new Set(PARAGRAPHS.map(p => p.id)).size !== PARAGRAPHS.length) bad.push('id en double')
for (const p of PARAGRAPHS) {
  if (p.faults.length === 0) bad.push(p.id + ': aucune faute')
  const seen = new Set()
  for (const f of p.faults) {
    faults++
    if (seen.has(f.at)) bad.push(p.id + ': deux fautes sur le même mot')
    seen.add(f.at)
    if (f.at < 0 || f.at >= p.words.length) bad.push(p.id + ': indice hors du paragraphe')
    if (p.words[f.at] === f.fix) bad.push(p.id + '/' + f.at + ': le mot est déjà correct')
    if (fold(p.words[f.at]) !== fold(f.fix)) bad.push(p.id + '/' + f.at + ': ' + p.words[f.at] + ' et ' + f.fix + ' ne sont pas des homophones')
    if (f.because.length < 20) bad.push(p.id + '/' + f.at + ': correction trop courte')
  }
  const fixed = p.words.map((w, i) => { const f = p.faults.find(x => x.at === i); return f ? f.fix : w })
  const forms = new Set(fixed.filter((w, i) => !seen.has(i)).map(fold))
  if (!TRICKY.some(t => forms.has(t))) bad.push(p.id + ': aucun de ces mots ny est écrit correctement ailleurs')
  console.log('   ' + fixed.join(' '))
}
console.log('paragraphes:', PARAGRAPHS.length, '/ fautes:', faults)
console.log('problèmes:', bad.length ? bad : 'aucun')
"
*/
