"use client";

import { usePathname } from "next/navigation";
import { findLesson } from "@/data/navigation";
import { useLessonVariant } from "@/hooks/useLessonVariant";
import { Board } from "./board";

/**
 * La frontière client.
 *
 * **Pas de `dynamic({ ssr: false })` ici**, contrairement à
 * `exercices/etre-ou-avoir` : ce plateau ne mélange rien. Le texte est fixe et
 * le tirage aussi, donc il n'y a aucune source d'aléatoire à cacher au serveur,
 * et payer une ligne de chargement que rien n'exige serait pire
 * (`.claude/agents/exercise-author.md`).
 */
export function LeUnOuDuDrill() {
  const found = findLesson(usePathname() ?? "");
  const level = useLessonVariant(found?.lesson ?? null);

  /* Clé sur le niveau : un autre lot est un autre texte, et les réponses
     posées dans celui-ci n'ont plus de trou où aller (#68). */
  return <Board key={level ?? ""} level={level} />;
}
