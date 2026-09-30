"use client";

import dynamic from "next/dynamic";

/**
 * La frontière client, et la raison d'être de **`ssr: false`** : le lot est
 * mélangé, et un mélange rendu sur le serveur puis dans le navigateur est un
 * bogue d'hydratation (`.claude/agents/exercise-author.md`). Pas de niveau :
 * la page n'a pas de `sets`.
 */
const Board = dynamic(() => import("./board").then((m) => m.Board), {
  ssr: false,
  loading: () => <p>Préparation de l’exercice…</p>,
});

export function ParleParlesParlentDrill() {
  return <Board />;
}
