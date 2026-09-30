"use client";

import { variantOf, type Lesson, type Level } from "@/data/navigation";
import { useAccount } from "./useAccount";

/**
 * Which set of a page holding several is in view (#87).
 *
 * It exists for the pages that carry `sets` — a `lecture` text with a question
 * set per level, an `exercices` drill with an item bank per level (#68) — where
 * two things on screen have to agree about which one is being done: the
 * questions themselves, and the tick that records having done them.
 *
 * **The learner's default set**: the level of the parcours they follow, when
 * the page has that set, else the page's first (`variantOf`). The same rule
 * answers for the row's tick in a listing and for « La suite », so the three
 * cannot disagree. Signed out, or with no parcours, it is the first set.
 *
 * `?niveau=` stays closed (#68): it would cost the prerender. The tabs #87 asks
 * for will be component state beside this, not a URL.
 *
 * On a page with no sets it returns the page's own level, which `progressKey`
 * ignores — one body of work, one tick.
 */
export function useLessonVariant(lesson: Lesson | null): Level | null {
  const account = useAccount();
  if (!lesson) return null;
  return variantOf(lesson, account?.parcours?.level ?? null);
}
