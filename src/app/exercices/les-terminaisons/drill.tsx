"use client";

import { usePathname } from "next/navigation";
import { findLesson } from "@/data/navigation";
import { LevelPicker } from "@/components/lesson/LevelPicker";
import { useLessonVariant } from "@/hooks/useLessonVariant";
import { Board } from "./board";

/**
 * The client boundary.
 *
 * **No `dynamic({ ssr: false })` here**, unlike `exercices/etre-ou-avoir`. That
 * drill shuffles its deck, and a shuffle in render gives the server and the
 * browser different trees; this one draws a fixed table from a fixed pool, so
 * there is nothing non-deterministic to hide from the server and no reason to
 * make the first paint a loading line.
 */
export function LesTerminaisonsDrill() {
  const found = findLesson(usePathname() ?? "");
  const { level } = useLessonVariant(found?.lesson ?? null);

  return (
    <>
      {/* Draws nothing unless the lesson serves more than one level. */}
      <LevelPicker />
      {/* Keyed by the level: a new bank is a new verb, and the answers typed
          against the old one go with it (`docs/decisions.md` #68). */}
      <Board key={level ?? ""} level={level} />
    </>
  );
}
