import type { Bi } from "../bilingue";

/**
 * « Mais, donc ou parce que ? » — un récit à trous, et un petit menu par trou.
 *
 * **Un récit, pas dix phrases isolées.** Un connecteur ne se choisit pas dans
 * le trou : il dit le lien entre l'idée d'avant et l'idée d'après, et c'est le
 * paragraphe qui porte ce lien. « D'abord » n'a de réponse que parce que le
 * texte annonce « deux choses ».
 *
 * **Un menu de trois par trou, et non un tirage des douze connecteurs.** Le
 * tirage fixe est la règle de la maison (`.claude/agents/exercise-author.md`),
 * mais ici il casserait l'exercice : « ensuite » et « puis », « donc » et
 * « c'est pour ça que », « mais » et « pourtant » se remplacent presque
 * partout, et un trou à deux réponses défendables enseigne une faute
 * (`AGENTS.md` §9). Chaque menu propose donc trois connecteurs de **trois
 * usages différents** : seule la logique de la phrase décide, jamais le style.
 *
 * **Les mauvais choix sont les pièges de la leçon** (`gram-connecteurs`) :
 * « pourquoi » à côté de « parce que », « donc » à côté de « pourtant »,
 * « puis » là où il faut une opposition. « puis » et « par contre » ne sont
 * jamais la réponse : aucun trou ne leur donnait une seule réponse défendable.
 *
 * **Aucun trou devant une voyelle** quand le menu contient « parce que » ou
 * « même si » : la forme élidée trahirait la réponse, ou la rendrait fausse.
 *
 * L'épisode est celui des Sirènes (Odyssée, chant XII), raconté avec nos mots,
 * au présent, sans rien citer d'Homère.
 */

export interface Blank {
  /** Permanent dans ce fichier : la clé du rendu. */
  id: string;
  /** La réponse, telle qu'elle s'écrit dans le texte, majuscule comprise. */
  answer: string;
  /** Les trois choix, dans l'ordre où le menu les montre. */
  options: [string, string, string];
  /** Montré après coup, sous un trou raté : il dit le lien, pas la règle. */
  because: Bi;
}

/** Le texte, coupé aux trous : une chaîne est du texte, le reste est un trou. */
export type Piece = string | Blank;

export const TEXT: Piece[][] = [
  [
    "Le bateau d’Ulysse arrive près de l’île des Sirènes. Les Sirènes chantent très bien, ",
    {
      id: "mais",
      answer: "mais",
      options: ["puis", "mais", "parce que"],
      because: {
        fr: "Bien chanter et être dangereux sont deux idées qui s’opposent : « mais ».",
        es: "Cantar bien y ser peligroso son dos ideas que se oponen: «*mais*».",
      },
    },
    " leur chant est dangereux : les marins qui l’écoutent ne rentrent jamais chez eux. Ulysse connaît le danger. ",
    {
      id: "pourtant",
      answer: "Pourtant",
      options: ["Donc", "Parce que", "Pourtant"],
      because: {
        fr: "Il connaît le danger, et il veut quand même écouter. C’est une surprise, pas une conséquence : « pourtant ».",
        es: "Conoce el peligro y aun así quiere escuchar. Es una sorpresa, no una consecuencia: «*pourtant*».",
      },
    },
    ", il veut entendre ce chant.",
  ],
  [
    "Il prépare deux choses. ",
    {
      id: "dabord",
      answer: "D’abord",
      options: ["D’abord", "Enfin", "Pourtant"],
      because: {
        fr: "C’est la première des deux choses qu’il prépare : « d’abord ».",
        es: "Es la primera de las dos cosas que prepara: «*d’abord*».",
      },
    },
    ", il met de la cire dans les oreilles de ses hommes. ",
    {
      id: "ensuite",
      answer: "Ensuite",
      options: ["Pourtant", "Ensuite", "D’abord"],
      because: {
        fr: "C’est la deuxième chose, l’action suivante : « ensuite ».",
        es: "Es la segunda cosa, la acción siguiente: «*ensuite*».",
      },
    },
    ", il leur demande de l’attacher au mât du bateau.",
  ],
  [
    "Le bateau passe devant l’île. ",
    {
      id: "comme",
      answer: "Comme",
      options: ["Donc", "Enfin", "Comme"],
      because: {
        fr: "La cire est la cause, et elle vient au début de la phrase : « comme ».",
        es: "La cera es la causa, y va al principio de la frase: «*comme*».",
      },
    },
    " les hommes ont de la cire dans les oreilles, ils n’entendent rien. Ulysse, lui, entend tout. Il trouve le chant magnifique, ",
    {
      id: "donc",
      answer: "donc",
      options: ["pourtant", "donc", "mais"],
      because: {
        fr: "Il trouve le chant magnifique : vouloir y aller est la conséquence, « donc ».",
        es: "Encuentra el canto magnífico: querer ir es la consecuencia, «*donc*».",
      },
    },
    " il veut aller vers les Sirènes.",
  ],
  [
    "Il fait signe à ses hommes de le détacher. ",
    {
      id: "meme-si",
      answer: "Même si",
      options: ["Comme", "Même si", "Donc"],
      because: {
        fr: "Ulysse est le chef, et cela ne change rien : les hommes n’obéissent pas. Un obstacle qui ne change rien, c’est « même si ».",
        es: "*Ulysse* es el jefe, y eso no cambia nada: los hombres no obedecen. Un obstáculo que no cambia nada es «*même si*».",
      },
    },
    " Ulysse est leur chef, les hommes ne lui obéissent pas : ils l’attachent plus fort. Ulysse ne peut pas bouger ",
    {
      id: "parce-que",
      answer: "parce que",
      options: ["pourquoi", "par contre", "parce que"],
      because: {
        fr: "Les cordes solides sont la cause : « parce que ». « Pourquoi » pose une question, il ne donne jamais la cause.",
        es: "Las cuerdas sólidas son la causa: «*parce que*». «*Pourquoi*» plantea una pregunta, nunca da la causa.",
      },
    },
    " les cordes sont solides.",
  ],
  [
    "Les hommes n’entendent pas le chant. ",
    {
      id: "pour-ca",
      answer: "C’est pour ça que",
      options: ["C’est pour ça que", "Même si", "Parce que"],
      because: {
        fr: "Les hommes n’entendent rien : le bateau qui continue est la conséquence, « c’est pour ça que ».",
        es: "Los hombres no oyen nada: que el barco siga es la consecuencia, «*c’est pour ça que*».",
      },
    },
    " le bateau continue sa route. ",
    {
      id: "enfin",
      answer: "Enfin",
      options: ["D’abord", "Pourtant", "Enfin"],
      because: {
        fr: "C’est la dernière action du récit : « enfin ».",
        es: "Es la última acción del relato: «*enfin*».",
      },
    },
    ", quand l’île est loin, les hommes détachent Ulysse. Il connaît maintenant le chant des Sirènes, et il est vivant.",
  ],
];

/** Les trous, dans l'ordre de la lecture. */
export const ITEMS: Blank[] = TEXT.flat().filter(
  (piece): piece is Blank => typeof piece !== "string",
);

/* Vérification, à relancer après toute modification. Elle imprime le récit
   reconstruit avec ses réponses : un trou à deux réponses défendables ne se
   voit pas dans les données, il se voit en relisant le paragraphe, puis en
   relisant chaque phrase avec ses deux mauvais choix (`AGENTS.md` §9). Le
   compte est imprimé avant le verdict.

node --experimental-strip-types --input-type=module -e "
import { TEXT, ITEMS } from './src/app/exercices/mais-donc-ou-parce-que/data.ts'
const bad = []
if (new Set(ITEMS.map(b => b.id)).size !== ITEMS.length) bad.push('id en double')
const places = [0, 0, 0]
TEXT.forEach((paragraph) => paragraph.forEach((piece, i) => {
  if (typeof piece === 'string') return
  const b = piece
  if (b.options.filter(o => o === b.answer).length !== 1) bad.push(b.id + ': la réponse doit figurer une fois dans le menu')
  if (new Set(b.options).size !== 3) bad.push(b.id + ': choix en double')
  if (b.because.fr.length < 20 || b.because.es.length < 20) bad.push(b.id + ': correction trop courte')
  places[b.options.indexOf(b.answer)]++
  const next = paragraph[i + 1]
  const elides = b.options.some(o => /(que|si)$/i.test(o))
  if (elides && typeof next === 'string' && /^ [aeiouyhéèêAEIOUYHÉ]/.test(next) && !/^ Ulysse/.test(next)) bad.push(b.id + ': trou devant une voyelle')
}))
console.log(TEXT.map(p => p.map(x => typeof x === 'string' ? x : x.answer).join('')).join('\n'))
console.log('trous vérifiés:', ITEMS.length, '/ place de la réponse dans le menu:', places.join(' '))
console.log('problèmes:', bad.length ? bad : 'aucun')
"

   « Même si Ulysse » passe le contrôle des voyelles par exception : « si » ne
   s'élide que devant « il » et « ils », et « Comme » et « Donc », les deux
   autres choix de ce trou, ne s'élident jamais. */
