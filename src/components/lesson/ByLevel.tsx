"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { findLesson, type Level } from "@/data/navigation";
import { useLessonVariant } from "@/hooks/useLessonVariant";

/**
 * One literary work, one page, a body per level (#92).
 *
 * **The bodies are Server Components passed in as props**, so each level's
 * text, table and quiz section still prerenders; this leaf only chooses which
 * one to show, by the same rule as the quiz and the tick (`useLessonVariant`,
 * #87). Nothing on the page switches it: the level is the learner's, not a
 * control (the tabs of #87 were built and removed).
 *
 * **The keys must be the manifest's `sets`**, like `questions.ts`'s `SETS`,
 * which the `nav-wiring` audit checks. A missing level falls back to the first
 * body rather than to an empty page.
 */
export function ByLevel({ levels }: { levels: Partial<Record<Level, ReactNode>> }) {
  const lesson = findLesson(usePathname() ?? "")?.lesson ?? null;
  const level = useLessonVariant(lesson);
  return <>{(level && levels[level]) ?? Object.values(levels)[0]}</>;
}
