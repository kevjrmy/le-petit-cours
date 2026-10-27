"use client";

import dynamic from "next/dynamic";
import { T } from "@/components/lang/T";

/**
 * La frontière client, et sa raison d'être : **`ssr: false`**. Le tirage des
 * phrases est mélangé à chaque partie ; le serveur et le navigateur ne
 * s'accorderaient pas (`.claude/agents/exercise-author.md`). La page autour
 * reste un Server Component.
 */
const Board = dynamic(() => import("./board").then((m) => m.Board), {
  ssr: false,
  loading: () => (
    <p>
      <T fr="Préparation de l’exercice…" es="Preparando el ejercicio…" />
    </p>
  ),
});

export function QuelJourSommesNousDrill() {
  return <Board />;
}
