"use client";

import { Board } from "./board";

/**
 * La frontière client.
 *
 * **Pas de `dynamic({ ssr: false })`** : le récit est fixe et l'ordre des
 * menus aussi, aucune source d'aléatoire à cacher au serveur
 * (`.claude/agents/exercise-author.md`). Un seul lot, donc pas de niveau.
 */
export function VacancesDrill() {
  return <Board />;
}
