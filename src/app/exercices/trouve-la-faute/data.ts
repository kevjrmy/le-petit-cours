import type { Level } from "@/data/navigation";
import type { Bi } from "../bilingue";

/**
 * « Trouvez la faute » — dix phrases, une seule faute dans chacune.
 *
 * Les cinq paires de `orthographe/les-homophones` y passent **dans les deux
 * sens** : a/à, et/est, on/ont, son/sont, ou/où. Plusieurs phrases contiennent
 * aussi un exemplaire *correct* du même mot, parce que c'est là qu'est la
 * difficulté : « elle **a** fini » et « rentrée **a** la maison » dans la même
 * phrase.
 *
 * Toutes les corrections sont dans `FIXES`, et `FIXES` ne contient rien qui ne
 * serve jamais : une pastille qui n'est jamais la réponse serait un piège, et
 * un piège se déclare.
 *
 * **Un lot par niveau** (`docs/decisions.md` #68), et chacun a ses propres
 * pastilles : la mécanique ne change pas, les paires montent. A2 prend les cinq
 * de la leçon ; B1 en prend cinq que la leçon nomme sans les détailler, ou
 * auxquelles son test de remplacement s'applique tel quel. C'est bien la même
 * compétence : reconnaître laquelle des deux formes la phrase demande.
 *
 * **Vérification : on effectue la substitution et on relit chaque phrase.**
 * Une faute de lecture ne se voit pas dans les données, seulement dans la
 * phrase corrigée (`.claude/agents/exercise-author.md`).
 *
 *   node --experimental-strip-types --input-type=module -e "
 *   import { BANKS } from './src/app/exercices/trouve-la-faute/data.ts'
 *   for (const [level, { items, fixes }] of Object.entries(BANKS)) {
 *     console.log('--', level)
 *     items.forEach((it, i) => {
 *       const fixed = it.words.map((w, j) => (j === it.badIndex ? it.fix : w))
 *       console.log(String(i + 1).padStart(2), fixed.join(' '))
 *       if (!fixes.includes(it.fix)) console.log('   !! correction absente du choix :', it.fix)
 *       if (it.words[it.badIndex] === it.fix) console.log('   !! le mot fautif est deja la correction')
 *       if (it.badIndex < 0 || it.badIndex >= it.words.length) console.log('   !! badIndex hors phrase')
 *     })
 *     const used = new Set(items.map(i => i.fix))
 *     console.log(items.length, 'phrases,', used.size, 'corrections distinctes sur', fixes.length)
 *     for (const f of fixes) if (!used.has(f)) console.log('   !! pastille jamais correcte :', f)
 *   }"
 */
export interface FaultItem {
  /** The sentence, one clickable token per entry. Punctuation stays attached. */
  words: string[];
  /** Index into `words` of the one wrong word. */
  badIndex: number;
  /** What it should read. Always one of `FIXES`. */
  fix: string;
  /** The substitution test, in French, shown after the answer. */
  because: Bi;
}

/**
 * Le choix de corrections, fixe et dans un ordre stable tout au long de
 * l'exercice : la paire se lit d'un coup d'œil et l'apprenante retrouve la
 * forme dans le tableau qu'elle a appris, au lieu d'éliminer trois leurres
 * tirés au sort.
 */
const FIXES_A2 = [
  "a",
  "à",
  "et",
  "est",
  "on",
  "ont",
  "ou",
  "où",
  "son",
  "sont",
] as const;

const ITEMS_A2: FaultItem[] = [
  {
    words: ["Elle", "a", "fini", "son", "travail", "et", "elle", "est", "rentrée", "a", "la", "maison."],
    badIndex: 9,
    fix: "à",
    because: {
      fr: "Le premier « a » est le verbe avoir : « elle avait fini » se dit. Le second ne se remplace par rien, c’est la préposition « à ».",
      es: "La primera «*a*» es el verbo *avoir*: se puede decir «*elle avait fini*». La segunda no se sustituye por nada: es la preposición «*à*».",
    },
  },
  {
    words: ["Ma", "sœur", "et", "sa", "fille", "son", "arrivées", "hier", "soir."],
    badIndex: 5,
    fix: "sont",
    because: {
      fr: "On remplace par « étaient » : « elles étaient arrivées ». C’est le verbe être, donc « sont ».",
      es: "Se sustituye por «*étaient*»: «*elles étaient arrivées*». Es el verbo *être*, por tanto «*sont*».",
    },
  },
  {
    words: ["Demain,", "ont", "part", "à", "midi."],
    badIndex: 1,
    fix: "on",
    because: {
      fr: "« ont » se remplace par « avaient », et « avaient part à midi » ne se dit pas. Ici c’est le sujet « on ».",
      es: "«*ont*» se sustituye por «*avaient*», y «*avaient part à midi*» no se dice. Aquí es el sujeto «*on*».",
    },
  },
  {
    words: ["Tu", "préfères", "le", "thé", "où", "le", "café", "?"],
    badIndex: 4,
    fix: "ou",
    because: {
      fr: "On peut dire « le thé ou bien le café » : c’est « ou » sans accent. « où » sert pour le lieu.",
      es: "Se puede decir «*le thé ou bien le café*»: es «*ou*» sin acento. «*où*» sirve para el lugar.",
    },
  },
  {
    words: ["Je", "ne", "sais", "pas", "ou", "tu", "as", "mis", "les", "clés."],
    badIndex: 4,
    fix: "où",
    because: {
      fr: "« ou bien tu as mis les clés » ne veut rien dire : il s’agit du lieu, donc « où ».",
      es: "«*ou bien tu as mis les clés*» no significa nada: se trata del lugar, por tanto «*où*».",
    },
  },
  {
    words: ["Elle", "est", "partie", "et", "son", "mari", "et", "resté", "à", "la", "maison."],
    badIndex: 6,
    fix: "est",
    because: {
      fr: "On remplace par « était » : « son mari était resté » se dit. Le premier « et » relie bien deux propositions.",
      es: "Se sustituye por «*était*»: se puede decir «*son mari était resté*». La primera «*et*» une bien dos oraciones.",
    },
  },
  {
    words: ["Il", "a", "oublié", "sont", "parapluie", "dans", "le", "train."],
    badIndex: 3,
    fix: "son",
    because: {
      fr: "« étaient parapluie » ne se dit pas. C’est le possessif « son », celui de « le sien ».",
      es: "«*étaient parapluie*» no se dice. Es el posesivo «*son*», el de «*le sien*».",
    },
  },
  {
    words: ["Elle", "à", "trouvé", "son", "passeport", "dans", "le", "tiroir."],
    badIndex: 1,
    fix: "a",
    because: {
      fr: "On remplace par « avait » : « elle avait trouvé ». C’est le verbe avoir, sans accent.",
      es: "Se sustituye por «*avait*»: «*elle avait trouvé*». Es el verbo *avoir*, sin acento.",
    },
  },
  {
    words: ["Mes", "parents", "on", "vendu", "leur", "voiture."],
    badIndex: 2,
    fix: "ont",
    because: {
      fr: "On remplace par « avaient » : « mes parents avaient vendu ». C’est le verbe avoir, donc « ont ».",
      es: "Se sustituye por «*avaient*»: «*mes parents avaient vendu*». Es el verbo *avoir*, por tanto «*ont*».",
    },
  },
  {
    words: ["Mon", "père", "est", "ma", "mère", "arrivent", "demain."],
    badIndex: 2,
    fix: "et",
    because: {
      fr: "« mon père était ma mère » n’a pas de sens : ici le mot relie deux sujets, c’est « et ».",
      es: "«*mon père était ma mère*» no tiene sentido: aquí la palabra une dos sujetos, es «*et*».",
    },
  },
];

/**
 * B1 : cinq paires que la leçon nomme sans les détailler, ou qui tombent sous
 * son test de remplacement sans qu'il faille rien apprendre de neuf.
 *
 * **Chaque phrase tranche elle-même.** Un homophone se défend presque toujours
 * dans l'absolu — « ces clés » et « ses clés » sont deux phrases françaises —
 * donc chaque item porte ce qui décide : un « -là » qui appelle le
 * démonstratif, un possesseur que la phrase ne nomme pas, un féminin qui
 * s'entend. Sans cela l'item aurait deux réponses défendables, ce qui est un
 * item cassé (`AGENTS.md` §9).
 *
 * Deux phrases portent aussi un exemplaire **correct** du mot, comme en A2 :
 * c'est là qu'est la difficulté.
 */
const FIXES_B1 = [
  "ce",
  "se",
  "ces",
  "ses",
  "la",
  "là",
  "peu",
  "peut",
  "près",
  "prêt",
] as const;

const ITEMS_B1: FaultItem[] = [
  {
    words: ["Il", "ce", "lève", "à", "six", "heures", "tous", "les", "matins."],
    badIndex: 1,
    fix: "se",
    because: {
      fr: "On remplace par « cela » : « cela lève à six heures » ne se dit pas. Devant un verbe, c’est « se ».",
      es: "Se sustituye por «*cela*»: «*cela lève à six heures*» no se dice. Delante de un verbo es «*se*».",
    },
  },
  {
    words: ["Je", "n’ai", "pas", "du", "tout", "aimé", "se", "livre."],
    badIndex: 6,
    fix: "ce",
    because: {
      fr: "« Se » accompagne toujours un verbe. Devant un nom, on écrit « ce » : on pourrait dire « je n’ai pas aimé celui-ci ».",
      es: "«*Se*» acompaña siempre a un verbo. Delante de un sustantivo se escribe «*ce*»: se podría decir «*je n’ai pas aimé celui-ci*».",
    },
  },
  {
    words: ["Regarde", "ses", "arbres-là,", "ils", "ont", "plus", "de", "cent", "ans."],
    badIndex: 1,
    fix: "ces",
    because: {
      fr: "« -là » appelle le démonstratif : ces arbres-là, ceux-là. « Ses » supposerait un propriétaire, et la phrase n’en nomme aucun.",
      es: "«*-là*» pide el demostrativo: *ces arbres-là*, *ceux-là*. «*Ses*» supondría un poseedor, y la frase no nombra ninguno.",
    },
  },
  {
    words: ["Il", "est", "parti", "sans", "prévenir", "ces", "parents."],
    badIndex: 5,
    fix: "ses",
    because: {
      fr: "Ce sont les parents de lui : « les siens ». « Ces parents » renverrait à des parents déjà nommés, et il n’y en a pas.",
      es: "Son los padres de él: «*les siens*». «*Ces parents*» remitiría a unos padres ya nombrados, y aquí no hay ninguno.",
    },
  },
  {
    words: ["Elle", "ne", "peu", "pas", "venir", "avant", "huit", "heures."],
    badIndex: 2,
    fix: "peut",
    because: {
      fr: "On remplace par « pouvait » : « elle ne pouvait pas venir » se dit. C’est le verbe pouvoir, donc « peut ».",
      es: "Se sustituye por «*pouvait*»: «*elle ne pouvait pas venir*» se dice. Es el verbo *pouvoir*, por tanto «*peut*».",
    },
  },
  {
    words: ["Il", "reste", "très", "peut", "de", "pain."],
    badIndex: 3,
    fix: "peu",
    because: {
      fr: "« Très pouvait de pain » ne veut rien dire. Après « très », c’est l’adverbe de quantité : « peu ».",
      es: "«*Très pouvait de pain*» no significa nada. Después de «*très*» va el adverbio de cantidad: «*peu*».",
    },
  },
  {
    words: ["Le", "repas", "est", "près", "dans", "cinq", "minutes."],
    badIndex: 3,
    fix: "prêt",
    because: {
      fr: "On le met au féminin pour entendre la différence : « la table est prête ». « Près » ne change jamais et dit la distance.",
      es: "Se pone en femenino para oír la diferencia: «*la table est prête*». «*Près*» nunca cambia y expresa la distancia.",
    },
  },
  {
    words: ["La", "boulangerie", "est", "tout", "prêt", "de", "chez", "moi."],
    badIndex: 4,
    fix: "près",
    because: {
      fr: "« Tout près de » dit la distance. « Prêt » se construit avec « à » et jamais avec « de » : on est prêt à partir, près de la gare.",
      es: "«*Tout près de*» expresa la distancia. «*Prêt*» se construye con «*à*» y nunca con «*de*»: *on est prêt à partir*, *près de la gare*.",
    },
  },
  {
    words: ["Posez", "les", "valises", "la", "et", "fermez", "la", "porte."],
    badIndex: 3,
    fix: "là",
    because: {
      fr: "Ce mot-ci dit le lieu : on peut le remplacer par « ici ». Le second « la » est l’article de « la porte » et reste sans accent.",
      es: "Esta palabra expresa el lugar: se puede sustituir por «*ici*». La segunda «*la*» es el artículo de «*la porte*» y no lleva acento.",
    },
  },
  {
    words: ["Je", "là", "vois", "tous", "les", "jours", "à", "la", "gare."],
    badIndex: 1,
    fix: "la",
    because: {
      fr: "Ici le mot remplace une personne : « je vois Marie » devient « je la vois ». C’est le pronom, sans accent.",
      es: "Aquí la palabra sustituye a una persona: «*je vois Marie*» pasa a ser «*je la vois*». Es el pronombre, sin acento.",
    },
  },
];

export interface FaultBank {
  items: FaultItem[];
  /** Les pastilles proposées, dans un ordre stable. */
  fixes: readonly string[];
}

/**
 * Les lots, par niveau. **Les clés doivent être exactement les `sets` de la
 * leçon dans le manifeste**, et l'audit de `nav-wiring` ne vérifie que cela.
 */
export const BANKS: Partial<Record<Level, FaultBank>> = {
  A2: { items: ITEMS_A2, fixes: FIXES_A2 },
  B1: { items: ITEMS_B1, fixes: FIXES_B1 },
};

/** Le lot du niveau regardé, ou le premier écrit si ce niveau n'en a pas. */
export function bankFor(level: Level | null): FaultBank {
  return (
    (level ? BANKS[level] : undefined) ??
    Object.values(BANKS)[0] ?? { items: [], fixes: [] }
  );
}
