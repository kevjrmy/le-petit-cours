"use client";

import dynamic from "next/dynamic";

/**
 * **`ssr: false`** : le lot est mélangé, et un mélange rendu sur le serveur
 * puis dans le navigateur est une erreur d’hydratation
 * (`.claude/agents/exercise-author.md`). La page autour reste prérendue.
 * Pas de `sets`, donc pas de clé de niveau.
 */
const Board = dynamic(() => import("./board").then((m) => m.Board), {
  ssr: false,
  loading: () => <p>Préparation de l’exercice…</p>,
});

export function JAimeLeCafeDrill() {
  return <Board />;
}
