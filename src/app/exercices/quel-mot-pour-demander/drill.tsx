"use client";

import dynamic from "next/dynamic";

/**
 * La frontière client, et la raison d'être de ce fichier : **`ssr: false`**.
 * Le tirage des questions est mélangé (`shuffle()`), donc le serveur et le
 * navigateur ne s'accorderaient pas (`.claude/agents/exercise-author.md`).
 * Pas de niveau : la page n'a pas de `sets`.
 */
const Board = dynamic(() => import("./board").then((m) => m.Board), {
  ssr: false,
  loading: () => <p>Préparation de l’exercice…</p>,
});

export function QuelMotDrill() {
  return <Board />;
}
