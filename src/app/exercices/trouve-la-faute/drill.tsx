"use client";

import dynamic from "next/dynamic";

/* Browser-only, for the same reason as `exercices/etre-ou-avoir/drill.tsx`:
   the deck is shuffled, and a shuffle in a server-rendered tree is a hydration
   error. The page around it still prerenders. */
const Board = dynamic(() => import("./board").then((m) => m.Board), {
  ssr: false,
  loading: () => <p>Préparation de l’exercice…</p>,
});

export function TrouveLaFauteDrill() {
  return <Board />;
}
