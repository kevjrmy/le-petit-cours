"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { findLesson } from "@/data/navigation";
import { useLessonVariant } from "@/hooks/useLessonVariant";

/**
 * La frontière client, et la raison qu'elle a d'exister : **`ssr: false`**.
 *
 * Le tirage des phrases est mélangé, et un mélange est le bug d'hydratation
 * type : `'use client'` veut dire « hydrate ceci dans le navigateur », pas
 * « saute le serveur », donc le serveur rendrait un ordre et le navigateur un
 * autre (`.claude/agents/exercise-author.md`). Voir la même note, plus longue,
 * dans `exercices/etre-ou-avoir/drill.tsx`.
 */
const Board = dynamic(() => import("./board").then((m) => m.Board), {
  ssr: false,
  loading: () => <p>Préparation de l’exercice…</p>,
});

export function CeOuCeluiDrill() {
  const found = findLesson(usePathname() ?? "");
  const level = useLessonVariant(found?.lesson ?? null);

  /* Clé sur le niveau : un autre lot est un autre tirage, et le score, la
     phrase en cours et la pastille choisie appartiennent au tirage qui les a
     produits (#68). */
  return <Board key={level ?? ""} level={level} />;
}
