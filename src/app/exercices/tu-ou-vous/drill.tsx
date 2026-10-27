"use client";

import dynamic from "next/dynamic";
import { T } from "@/components/lang/T";

/**
 * La frontière client, et sa raison d'être : **`ssr: false`**. Le lot et
 * l'ordre des choix sont mélangés, et un tirage au rendu diffère entre le
 * serveur et le navigateur (`.claude/agents/exercise-author.md`). La page
 * autour reste un Server Component et se prérend. Pas de niveau : la page n'a
 * pas de `sets`.
 */
const Board = dynamic(() => import("./board").then((m) => m.Board), {
  ssr: false,
  loading: () => (
    <p>
      <T fr="Préparation de l’exercice…" es="Preparando el ejercicio…" />
    </p>
  ),
});

export function TuOuVousDrill() {
  return <Board />;
}
