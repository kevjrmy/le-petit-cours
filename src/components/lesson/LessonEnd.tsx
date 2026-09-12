"use client";

import { findLesson } from "@/data/navigation";
import { useLessonVariant } from "@/hooks/useLessonVariant";
import { DoneTick } from "@/components/progress/DoneTick";
import { RelatedLinks } from "./RelatedLinks";
import styles from "./LessonEnd.module.css";
import { usePathname } from "next/navigation";

/**
 * Everything that comes after a lesson's own words: the done-tick, then
 * « Pour aller plus loin ».
 *
 * **Both are drawn from the manifest, so neither is the page's job.** The tick
 * was already the shell's (`AGENTS.md` §8); the related links joined it here so
 * that the two could be put in the right order — the tick belongs to the lesson
 * you just read, the links point away from it, and the shell owning only one of
 * them forced the wrong sequence.
 *
 * The gain is bigger than the ordering: a lesson now renders its prose and
 * nothing else. Forgetting `<RelatedLinks />` used to cost a page its
 * cross-links silently, which is exactly the class of omission the manifest
 * exists to prevent.
 *
 * It renders nothing at all unless the current path is a lesson, which is what
 * keeps it off chapter pages, the sommaire and the annexes with no allowlist to
 * keep in step.
 */
export function LessonEnd() {
  const path = usePathname() ?? "";
  const found = findLesson(path);
  /* Called before the early return, because a hook cannot be. It answers `null`
     for a path that is not a lesson, which is what that return is for. */
  const { level } = useLessonVariant(found?.lesson ?? null);
  if (!found) return null;

  return (
    <div className={styles.end}>
      {/* The tick is for the variant she is looking at, not for the level she
          is working at: she can read a text's B1 questions from A2, and what
          she ticks is what she did (`docs/decisions.md` #68). Every lesson
          serving one level resolves to it, and `progressKey` ignores it. */}
      <DoneTick lesson={found.lesson} level={level} path={path} />
      <RelatedLinks path={path} />
    </div>
  );
}
