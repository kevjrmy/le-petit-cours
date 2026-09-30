"use client";

import { Board } from "./board";

/**
 * La frontière client.
 *
 * **Pas de `dynamic({ ssr: false })` ni de niveau** : le lot est fixe, rien
 * n'est mélangé, donc rien ne diffère entre le serveur et le navigateur, et la
 * page n'a pas de `sets` (`.claude/agents/exercise-author.md`).
 */
export function LeLaOuUnDrill() {
  return <Board />;
}
