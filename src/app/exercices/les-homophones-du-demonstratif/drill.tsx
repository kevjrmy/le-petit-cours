"use client";

import dynamic from "next/dynamic";

/**
 * La frontière client, et la raison qu'elle a d'exister : **`ssr: false`**.
 *
 * Le tirage est mélangé dans un initialiseur de `useState`, donc le serveur
 * rendrait un ordre et le navigateur un autre — le bug d'hydratation type
 * (`.claude/agents/exercise-author.md`). La note longue est dans
 * `exercices/etre-ou-avoir/drill.tsx`.
 *
 * **Pas de `useLessonVariant` ici**, contrairement aux autres plateaux : cette
 * leçon est taguée `ANY` et n'a qu'un lot, donc il n'y a pas de variante à
 * choisir ni de clé à poser dessus (`docs/decisions.md` #68).
 */
const Board = dynamic(() => import("./board").then((m) => m.Board), {
  ssr: false,
  loading: () => <p>Préparation de l’exercice…</p>,
});

export function HomophonesDemonstratifDrill() {
  return <Board />;
}
