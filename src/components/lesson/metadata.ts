import type { Metadata } from "next";
import { delfFor, findLesson } from "@/data/navigation";

/**
 * A lesson's `<title>` and description, read from the manifest.
 *
 * A page that retypes its own title has two copies of it, and the renamed one
 * is always the other one. `export const metadata = lessonMetadata(PATH)` keeps
 * the tab, the breadcrumb, the sidebar and the page heading on one string.
 */
export function lessonMetadata(path: string): Metadata {
  const found = findLesson(path);
  if (!found) return {};

  const { chapter, lesson } = found;
  /* The lesson's first level, because a `<meta>` description is written once
     for a URL and cannot follow a picker the way the line under the title does
     (`docs/decisions.md` #68). The page's lowest claim is the honest one to
     publish: what it offers everyone who opens it. */
  const delf = delfFor(lesson, null);
  return {
    title: lesson.title,
    description: delf ?? `${lesson.title} : ${chapter.title}`,
  };
}
