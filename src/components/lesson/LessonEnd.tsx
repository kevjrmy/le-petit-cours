"use client";

import { canonicalPath, findLesson } from "@/data/navigation";
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
  const pathname = usePathname();
  const path = canonicalPath(pathname ?? "");
  if (!findLesson(path)) return null;

  return (
    <div className={styles.end}>
      <DoneTick path={path} />
      <RelatedLinks path={path} />
    </div>
  );
}
