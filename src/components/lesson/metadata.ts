import type { Metadata } from "next";
import { findLesson } from "@/data/navigation";

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
  return {
    title: lesson.title,
    description: lesson.delf ?? `${lesson.title} : ${chapter.title}`,
  };
}
