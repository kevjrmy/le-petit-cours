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
 * **Vérification : on effectue la substitution et on relit les dix phrases.**
 * Une faute de lecture ne se voit pas dans les données, seulement dans la
 * phrase corrigée (`.claude/agents/exercise-author.md`).
 *
 *   npx tsx -e "
 *   import { items, FIXES } from './src/app/exercices/trouve-la-faute/data'
 *   items.forEach((it, i) => {
 *     const fixed = it.words.map((w, j) => (j === it.badIndex ? it.fix : w))
 *     console.log(String(i + 1).padStart(2), fixed.join(' '))
 *     if (!FIXES.includes(it.fix)) console.log('   !! correction absente du choix :', it.fix)
 *     if (it.words[it.badIndex] === it.fix) console.log('   !! le mot fautif est déjà la correction')
 *     if (it.badIndex < 0 || it.badIndex >= it.words.length) console.log('   !! badIndex hors phrase')
 *   })
 *   console.log(items.length, 'phrases,', new Set(items.map(i => i.fix)).size, 'corrections distinctes sur', FIXES.length)"
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
export const FIXES = [
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

export const items: FaultItem[] = [
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
