/**
 * « D’accord ou pas d’accord ? » — un dialogue à trous, et un petit menu par
 * trou. Le plateau est celui de `mais-donc-ou-parce-que`, avec le nom de la
 * personne qui parle devant chaque réplique.
 *
 * **Un dialogue, pas dix phrases isolées.** Une formule d'avis ne se choisit
 * pas dans le trou : elle dit ce que la personne fait de l'idée de l'autre
 * (l'accepter, la refuser, lui ajouter une raison), et c'est la réplique
 * d'avant qui le montre. C'est aussi le seul dialogue modèle que le jeu de
 * rôle `conv-donner-son-avis` puisse avoir : une page de `conversation/` n'en
 * imprime pas (`AGENTS.md` §7), un texte à trous de `exercices/` oui.
 *
 * **Un menu de trois par trou, jamais deux formules du même usage.** « je
 * pense que » et « à mon avis », « je trouve que » et « je crois que », « bref »
 * et « donc » se remplacent trop souvent : un trou à deux réponses défendables
 * enseigne une faute (`AGENTS.md` §9). « je trouve que » et « je crois que »
 * ne se rencontrent donc que dans le seul trou où la phrase dit « je ne suis
 * pas sûr », et « donc » n'est jamais offert à côté de « bref ».
 *
 * **Les mauvais choix sont les pièges de la leçon** (`voc-opinion`) : les deux
 * formes barrées, « dans mon opinion » et « dépend » sans son « ça » ; « être »
 * à côté de « avoir » devant « raison » et devant « d'accord » ; « se
 * disputer » à côté de « discuter ».
 *
 * **Le texte ne donne pas la réponse ailleurs** : ni « je suis d'accord » ni
 * « tu as tort » n'y sont écrits en clair ou offerts dans un menu, parce
 * qu'ils montreraient le verbe que deux trous demandent.
 *
 * **Aucun trou devant une voyelle** quand le menu contient une formule en
 * « que », et aucun verbe à choisir après « je » ou « ne » : la forme élidée
 * trahirait la réponse.
 *
 * Le sujet (le marché ou le supermarché) n'est aucune des sept situations du
 * jeu de rôle, pour que le dialogue ne lui donne pas ses phrases.
 */

export interface Blank {
  /** Permanent dans ce fichier : la clé du rendu. */
  id: string;
  /** La réponse, telle qu'elle s'écrit dans le texte, majuscule comprise. */
  answer: string;
  /** Les trois choix, dans l'ordre où le menu les montre. */
  options: [string, string, string];
  /** Montré après coup, sous un trou raté : il dit ce que fait la formule. */
  because: string;
}

/** Une réplique, coupée aux trous : une chaîne est du texte, le reste un trou. */
export type Piece = string | Blank;

export interface Line {
  /** La personne qui parle. */
  who: string;
  pieces: Piece[];
}

export const TEXT: Line[] = [
  {
    who: "Marc",
    pieces: ["Tu fais tes courses au marché ou au supermarché ?"],
  },
  {
    who: "Inès",
    pieces: [
      "Au marché, toujours. ",
      {
        id: "a-mon-avis",
        answer: "À mon avis",
        options: ["Dans mon opinion", "À mon avis", "Bref"],
        because:
          "Inès annonce son idée. La formule est « à mon avis » : « dans mon opinion » ne se dit pas.",
      },
      ", les légumes du marché sont meilleurs, parce qu’ils sont plus frais.",
    ],
  },
  {
    who: "Marc",
    pieces: [
      "Pas pour moi. Les légumes du supermarché sont bons aussi, et ils coûtent moins cher.",
    ],
  },
  {
    who: "Inès",
    pieces: [
      {
        id: "c-est-vrai",
        answer: "C’est vrai",
        options: ["C’est vrai", "En plus", "Bref"],
        because:
          "Inès accepte une partie de l’idée de Marc, puis elle ajoute son idée avec « mais » : « c’est vrai ».",
      },
      ", le marché est plus cher, mais j’achète moins. ",
      {
        id: "par-exemple",
        answer: "Par exemple",
        options: ["Pourtant", "Ça dépend", "Par exemple"],
        because:
          "Trois tomates, pas un kilo : c’est un cas précis de « j’achète moins ». Un cas précis s’annonce par « par exemple ».",
      },
      ", je prends trois tomates, pas un kilo.",
    ],
  },
  {
    who: "Marc",
    pieces: [
      "Tu ",
      {
        id: "as-raison",
        answer: "as",
        options: ["es", "as", "fais"],
        because: "« raison » va avec le verbe avoir : « tu as raison ».",
      },
      " raison, on achète souvent trop. Mais je travaille jusqu’à dix-neuf heures, et le supermarché est ouvert le soir. ",
      {
        id: "en-plus",
        answer: "En plus",
        options: ["En plus", "Pourtant", "Bref"],
        because:
          "Marc a donné une première raison, le supermarché ouvert le soir. Il ajoute une deuxième raison : « en plus ».",
      },
      ", il est à côté de chez moi.",
    ],
  },
  {
    who: "Inès",
    pieces: [
      "Le marché est ouvert le samedi matin, et tu ne travailles pas le samedi !",
    ],
  },
  {
    who: "Marc",
    pieces: [
      {
        id: "ca-depend",
        answer: "Ça dépend",
        options: ["Dépend", "C’est vrai", "Ça dépend"],
        because:
          "La réponse change avec les semaines. « dépend » garde toujours son « ça » : « ça dépend des semaines ».",
      },
      " des semaines. Et quand je ne travaille pas, je dors tard. Je ne suis pas sûr, mais ",
      {
        id: "je-crois-que",
        answer: "je crois que",
        options: ["je crois que", "je trouve que", "par exemple"],
        because:
          "Marc n’est pas sûr de l’heure. Quand on n’est pas tout à fait sûr, on dit « je crois que ». « Je trouve que » juge une chose qu’on connaît.",
      },
      " le marché ferme à treize heures.",
    ],
  },
  {
    who: "Inès",
    pieces: [
      "Dommage pour toi ! Moi, j’aime le marché, ",
      {
        id: "surtout",
        answer: "surtout",
        options: ["pourtant", "surtout", "donc"],
        because:
          "Les vendeurs sont la raison la plus importante pour Inès : « surtout ».",
      },
      " pour les vendeurs : ils connaissent mon prénom. ",
      {
        id: "bref",
        answer: "Bref",
        options: ["Par exemple", "Pourtant", "Bref"],
        because: "Inès ferme son avis en quelques mots : « bref ».",
      },
      ", je préfère le marché, et toi le supermarché.",
    ],
  },
  {
    who: "Marc",
    pieces: [
      "Toi et moi, on ",
      {
        id: "est-d-accord",
        answer: "est",
        options: ["est", "a", "fait"],
        because: "« d’accord » va avec le verbe être : « on est d’accord ».",
      },
      " rarement d’accord, mais on ne se fâche jamais. J’aime ",
      {
        id: "discuter",
        answer: "discuter",
        options: ["se disputer", "dépendre", "discuter"],
        because:
          "Ils ne se fâchent jamais : ils parlent ensemble, calmement. C’est « discuter ». « Se disputer », c’est se fâcher.",
      },
      " avec toi !",
    ],
  },
];

/** Les trous, dans l'ordre de la lecture. */
export const ITEMS: Blank[] = TEXT.flatMap((line) => line.pieces).filter(
  (piece): piece is Blank => typeof piece !== "string",
);

/* Vérification, à relancer après toute modification. Elle imprime le dialogue
   reconstruit avec ses réponses : un trou à deux réponses défendables ne se
   voit pas dans les données, il se voit en relisant la réplique, puis en la
   relisant avec ses deux mauvais choix (`AGENTS.md` §9). Le compte est imprimé
   avant le verdict.

node --experimental-strip-types --input-type=module -e "
import { TEXT, ITEMS } from './src/app/exercices/d-accord-ou-pas-d-accord/data.ts'
const bad = []
if (new Set(ITEMS.map(b => b.id)).size !== ITEMS.length) bad.push('id en double')
const places = [0, 0, 0]
TEXT.forEach(({ pieces }) => pieces.forEach((piece, i) => {
  if (typeof piece === 'string') return
  const b = piece
  if (b.options.filter(o => o === b.answer).length !== 1) bad.push(b.id + ': la réponse doit figurer une fois dans le menu')
  if (new Set(b.options).size !== 3) bad.push(b.id + ': choix en double')
  if (b.because.length < 20) bad.push(b.id + ': correction trop courte')
  places[b.options.indexOf(b.answer)]++
  const before = pieces[i - 1]
  const next = pieces[i + 1]
  const vowel = (s) => /^[aeiouyhéèêàâ]/i.test(s)
  if (b.options.some(o => /(que|si)$/i.test(o)) && typeof next === 'string' && vowel(next.trimStart())) bad.push(b.id + ': trou devant une voyelle')
  if (typeof before === 'string' && /(^|[ ’'])(je|ne|me|te|se|le|la|de|que)\s$/i.test(before) && b.options.some(vowel)) bad.push(b.id + ': un choix s’élide après le mot d’avant')
}))
console.log(TEXT.map(l => l.who + ' : ' + l.pieces.map(x => typeof x === 'string' ? x : x.answer).join('')).join('\n'))
console.log('trous vérifiés:', ITEMS.length, '/ place de la réponse dans le menu:', places.join(' '))
console.log('problèmes:', bad.length ? bad : 'aucun')
"
*/
