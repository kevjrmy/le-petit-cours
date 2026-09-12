import { findLesson } from "@/data/navigation";
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
      {lesson.delf && <p className={styles.delf}>{lesson.delf}</p>}
    </header>
  );
}
