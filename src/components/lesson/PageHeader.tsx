import { findLesson } from "@/data/navigation";
import { LessonDelf } from "./LessonDelf";
import styles from "./PageHeader.module.css";

/**
 * A lesson's title block, read from the manifest rather than retyped — a page
 * that carries its own copy of its title drifts the moment it is renamed.
 *
 * No chapter line and no level pill: the topbar carries both (`AGENTS.md` §6).
 */
export function PageHeader({ path }: { path: string }) {
  const found = findLesson(path);
  if (!found) return null;
  const { lesson } = found;

  return (
    <header className={styles.header}>
      <h1>
        {lesson.titleHtml ? (
          <span dangerouslySetInnerHTML={{ __html: lesson.titleHtml }} />
        ) : (
          lesson.title
        )}
      </h1>
      {/* A leaf, because on a page with a question set per level the descriptor
          changes with the picker and this component must stay on the server
          (`docs/decisions.md` #68). */}
      <LessonDelf lesson={lesson} className={styles.delf} />
    </header>
  );
}
