"use client";

import type { Lesson, Level } from "@/data/navigation";
import { useAccount } from "./useAccount";

/**
 * Which variant of a multi-level lesson is in view.
 *
 * Almost every page has one body of work and this resolves to its only level,
 * or to nothing. It exists for the pages that carry several — a `lecture` text
 * with a question set per level, an `exercices` drill with an item bank per
 * level (`docs/decisions.md` #68) — where two things on screen have to agree
 * about which one is being done: the questions themselves, and the tick that
 * records having done them.
 *
 * **The level comes from the account and from nowhere else** (#73). There was a
 * `LevelPicker` on the page until 2026-09-21, and the reason it is gone is that
 * a level is the course a learner is following, not a view of the page in front
 * of them: choosing it belongs in the settings, beside the thing it changes
 * everywhere, and a control that silently repointed the tick beneath it made
 * the level look like a display option. **Do not put a picker back** — neither
 * here, nor as `?niveau=`, which costs the prerender as well (#68).
 *
 * Resolved in this order: the level they are working at, then the lesson's
 * first. **The lesson's own `levels` is the authority at both steps** — an
 * account level the page does not serve is ignored rather than passed on, so
 * this can never name a variant that has no questions behind it. Signed out
 * there is no level, so a page serving several shows its first.
 *
 * Returns `null` for a lesson tagged `[]`, which is the right answer: a verb
 * sheet or a culture page belongs to no level and has no variant to be in.
 */
export function useLessonVariant(lesson: Lesson | null): Level | null {
  const account = useAccount();
  const levels = lesson?.levels ?? [];
  const working = account?.level;

  if (working && levels.includes(working)) return working;
  return levels[0] ?? null;
}
