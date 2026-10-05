"use client";

import { Board } from "./board";

/**
 * La frontière client.
 *
 * **Pas de `dynamic({ ssr: false })` ici** : le récit est fixe et l'ordre des
 * menus aussi, donc il n'y a aucune source d'aléatoire à cacher au serveur
 * (`.claude/agents/exercise-author.md`). Un seul lot, donc pas de niveau à
 * lire non plus.
 */
export function ConnecteursDrill() {
  return <Board />;
}
