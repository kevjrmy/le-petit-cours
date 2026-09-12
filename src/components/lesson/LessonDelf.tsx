"use client";

import { delfFor, type Lesson } from "@/data/navigation";
import { useLessonVariant } from "@/hooks/useLessonVariant";

/**
 * The DELF descriptor under a lesson's title.
 *
 * **A client leaf inside a Server Component**, which is the whole reason it is
 * its own file: `PageHeader` keeps the `<h1>` and stays on the server, and only
 * this line follows the picker (`AGENTS.md` §4). A page serving one level
 * renders exactly what it rendered before, prerendered like the rest of it.
 *
 * It exists because a descriptor is a claim about what the questions check, and
 * on a page with a set per level that claim is not the same at both (#68). The
 * alternative was the title block reading « comprendre un récit simple » over
 * the B1 questions, which is the page telling the learner she is doing
 * something easier than she is.
 */
export function LessonDelf({ lesson, className }: { lesson: Lesson; className?: string }) {
  const { level } = useLessonVariant(lesson);
  const delf = delfFor(lesson, level);
  if (!delf) return null;
  return <p className={className}>{delf}</p>;
}
