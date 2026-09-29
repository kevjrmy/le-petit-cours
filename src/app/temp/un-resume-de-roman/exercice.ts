import type { Morceau } from "../_exercice/Trous";

/**
 * Le texte rendu, corrigé partout sauf à douze endroits : les douze trous.
 * Chaque trou propose quatre formes : la juste, celle que la copie portait,
 * et deux pièges plausibles. La forme de la copie est toujours là, donc
 * l'élève corrige sa propre faute ; les pièges empêchent de trouver par
 * élimination entre deux. **Aucun piège n'est une seconde réponse juste** :
 * « Jusqu'à ce qu'un jour » l'aurait été, et n'y est pas (`AGENTS.md` §9). Les autres fautes de la copie (accents, un
 * « nouveaux », un « bizzare ») sont déjà corrigées dans le texte : douze
 * choix suffisent pour dix minutes.
 *
 * Une phrase de la copie résumait le passé du personnage d'une façon qui n'a
 * pas sa place sur une page publique ; elle n'est pas reprise.
 *
 * Nommé comme ses voisins, jamais `SETS` ni `BANKS` : la page est `ANY`.
 */
export const TEXTE: Morceau[][] = [
  [
    "Maintenant que l’",
    { juste: "introduction", copie: "introduccion", pieges: ["introdution", "introducsion"] },
    " de Ray Levine est ",
    { juste: "finie", copie: "fini", pieges: ["finit", "finis"] },
    ", on nous présente un nouveau personnage, Megane Pierce. Megane est une mère de deux enfants, ",
    { juste: "une fille nommée", copie: "un fille nommé", pieges: ["une fille nommé", "un fille nommée"] },
    " Kaylie et son petit frère, Jordan ; elle a aussi un mari appelé Dave. Mais Megane a un passé trouble : dans sa jeunesse, elle ",
    { juste: "a connu", copie: "connaisa", pieges: ["a connue", "a connaissé"] },
    " un acteur connu, et ils ",
    { juste: "sont sortis", copie: "sortinent", pieges: ["ont sorti", "sont sorti"] },
    " ensemble ",
    { juste: "quelques semaines", copie: "quelque semaine", pieges: ["quelques semaine", "quelque semaines"] },
    ", mais ça, c’était dans le passé.",
  ],
  [
    { juste: "Jusqu’au jour où", copie: "Jusqu’à qu’un jour,", pieges: ["Jusqu’au jour que", "Jusqu’à le jour où"] },
    " une de ses vieilles copines ",
    { juste: "l’appelle", copie: "lui appelle", pieges: ["l’appèle", "la appelle"] },
    " et lui dit qu’",
    { juste: "elles", copie: "ils", pieges: ["elle", "eux"] },
    " doivent ",
    { juste: "se", copie: "ce", pieges: ["ses", "ces"] },
    " voir. Elles se retrouvent dans un Starbucks, ",
    { juste: "après avoir emmené", copie: "après emmener", pieges: ["après avoir emmener", "après avoir emmenée"] },
    " sa fille à un entraînement de foot, et sa copine lui dit qu’un homme bizarre ",
    { juste: "l’a demandée", copie: "a demandé pour elle", pieges: ["l’a demandé", "lui a demandé"] },
    " au bar…",
  ],
];
