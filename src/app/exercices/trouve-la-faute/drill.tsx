"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { findLesson } from "@/data/navigation";
import { useLessonVariant } from "@/hooks/useLessonVariant";

/* Browser-only, for the same reason as `exercices/etre-ou-avoir/drill.tsx`:
   the deck is shuffled, and a shuffle in a server-rendered tree is a hydration
   error. The page around it still prerenders. */
const Board = dynamic(() => import("./board").then((m) => m.Board), {
  ssr: false,
  loading: () => <p>Préparation de l’exercice…</p>,
});

export function TrouveLaFauteDrill() {
  const found = findLesson(usePathname() ?? "");
  const level = useLessonVariant(found?.lesson ?? null);

  /* **Keyed by the level, and that key is the whole reset.** A new bank means a
     new deck, and the board's placements, its score and its « vérifié » flag
     all belong to the deck they were dealt. Remounting drops them together;
     threading a reset through four setters would drop them one at a time, and
     the first one forgotten is a board scored against the other level's answers
     (`docs/decisions.md` #68). */
  return <Board key={level ?? ""} level={level} />;
}
