import type { Level } from "@/data/navigation";

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
  because: string;
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
    because:
      "Le premier « a » est le verbe avoir : « elle avait fini » se dit. Le second ne se remplace par rien, c’est la préposition « à ».",
  },
  {
    words: ["Ma", "sœur", "et", "sa", "fille", "son", "arrivées", "hier", "soir."],
    badIndex: 5,
    fix: "sont",
    because: "On remplace par « étaient » : « elles étaient arrivées ». C’est le verbe être, donc « sont ».",
  },
  {
    words: ["Demain,", "ont", "part", "à", "midi."],
    badIndex: 1,
    fix: "on",
    because: "« ont » se remplace par « avaient », et « avaient part à midi » ne se dit pas. Ici c’est le sujet « on ».",
  },
  {
    words: ["Tu", "préfères", "le", "thé", "où", "le", "café", "?"],
    badIndex: 4,
    fix: "ou",
    because: "On peut dire « le thé ou bien le café » : c’est « ou » sans accent. « où » sert pour le lieu.",
  },
  {
    words: ["Je", "ne", "sais", "pas", "ou", "tu", "as", "mis", "les", "clés."],
    badIndex: 4,
    fix: "où",
    because: "« ou bien tu as mis les clés » ne veut rien dire : il s’agit du lieu, donc « où ».",
  },
  {
    words: ["Elle", "est", "partie", "et", "son", "mari", "et", "resté", "à", "la", "maison."],
    badIndex: 6,
    fix: "est",
    because: "On remplace par « était » : « son mari était resté » se dit. Le premier « et » relie bien deux propositions.",
  },
  {
    words: ["Il", "a", "oublié", "sont", "parapluie", "dans", "le", "train."],
    badIndex: 3,
    fix: "son",
    because: "« étaient parapluie » ne se dit pas. C’est le possessif « son », celui de « le sien ».",
  },
  {
    words: ["Elle", "à", "trouvé", "son", "passeport", "dans", "le", "tiroir."],
    badIndex: 1,
    fix: "a",
    because: "On remplace par « avait » : « elle avait trouvé ». C’est le verbe avoir, sans accent.",
  },
  {
    words: ["Mes", "parents", "on", "vendu", "leur", "voiture."],
    badIndex: 2,
    fix: "ont",
    because: "On remplace par « avaient » : « mes parents avaient vendu ». C’est le verbe avoir, donc « ont ».",
  },
  {
    words: ["Mon", "père", "est", "ma", "mère", "arrivent", "demain."],
    badIndex: 2,
    fix: "et",
    because: "« mon père était ma mère » n’a pas de sens : ici le mot relie deux sujets, c’est « et ».",
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
    because:
      "On remplace par « cela » : « cela lève à six heures » ne se dit pas. Devant un verbe, c’est « se ».",
  },
  {
    words: ["Je", "n’ai", "pas", "du", "tout", "aimé", "se", "livre."],
    badIndex: 6,
    fix: "ce",
    because:
      "« Se » accompagne toujours un verbe. Devant un nom, on écrit « ce » : on pourrait dire « je n’ai pas aimé celui-ci ».",
  },
  {
    words: ["Regarde", "ses", "arbres-là,", "ils", "ont", "plus", "de", "cent", "ans."],
    badIndex: 1,
    fix: "ces",
    because:
      "« -là » appelle le démonstratif : ces arbres-là, ceux-là. « Ses » supposerait un propriétaire, et la phrase n’en nomme aucun.",
  },
  {
    words: ["Il", "est", "parti", "sans", "prévenir", "ces", "parents."],
    badIndex: 5,
    fix: "ses",
    because:
      "Ce sont les parents de lui : « les siens ». « Ces parents » renverrait à des parents déjà nommés, et il n’y en a pas.",
  },
  {
    words: ["Elle", "ne", "peu", "pas", "venir", "avant", "huit", "heures."],
    badIndex: 2,
    fix: "peut",
    because:
      "On remplace par « pouvait » : « elle ne pouvait pas venir » se dit. C’est le verbe pouvoir, donc « peut ».",
  },
  {
    words: ["Il", "reste", "très", "peut", "de", "pain."],
    badIndex: 3,
    fix: "peu",
    because:
      "« Très pouvait de pain » ne veut rien dire. Après « très », c’est l’adverbe de quantité : « peu ».",
  },
  {
    words: ["Le", "repas", "est", "près", "dans", "cinq", "minutes."],
    badIndex: 3,
    fix: "prêt",
    because:
      "On le met au féminin pour entendre la différence : « la table est prête ». « Près » ne change jamais et dit la distance.",
  },
  {
    words: ["La", "boulangerie", "est", "tout", "prêt", "de", "chez", "moi."],
    badIndex: 4,
    fix: "près",
    because:
      "« Tout près de » dit la distance. « Prêt » se construit avec « à » et jamais avec « de » : on est prêt à partir, près de la gare.",
  },
  {
    words: ["Posez", "les", "valises", "la", "et", "fermez", "la", "porte."],
    badIndex: 3,
    fix: "là",
    because:
      "Ce mot-ci dit le lieu : on peut le remplacer par « ici ». Le second « la » est l’article de « la porte » et reste sans accent.",
  },
  {
    words: ["Je", "là", "vois", "tous", "les", "jours", "à", "la", "gare."],
    badIndex: 1,
    fix: "la",
    because:
      "Ici le mot remplace une personne : « je vois Marie » devient « je la vois ». C’est le pronom, sans accent.",
  },
];

export interface FaultBank {
  items: FaultItem[];
  /** Les pastilles proposées, dans un ordre stable. */
  fixes: readonly string[];
}

/**
 * Les lots, par niveau. **Les clés doivent être exactement les `levels` de la
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
