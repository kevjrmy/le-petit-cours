"use client";

import type { Lesson, Level } from "@/data/navigation";
import { useAccount } from "./useAccount";

/**
 * Which variant of a multi-level lesson is in view.
 *
 * It exists for the pages that carry several — a `lecture` text with a question
 * set per level, an `exercices` drill with an item bank per level
 * (`docs/decisions.md` #68), the pages the manifest marks `perLevel` — where
 * two things on screen have to agree about which one is being done: the
 * questions themselves, and the tick that records having done them.
 *
 * **An ordinary page is listed at several levels too, and this answers for it
 * as well** (#76): it names the rung the learner is on, and `progressKey`
 * ignores it, because one page with one body of work keeps one tick however
 * many rungs it is listed at. So a non-null answer here is not a claim that the
 * page has variants — `perLevel` is the only thing that makes that claim.
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
 * floor. **The lesson's own `levels` is the authority at both steps** — an
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
