import { findLesson } from "@/data/navigation";
import styles from "./PageHeader.module.css";

/**
 * A lesson's title block, read from the manifest rather than retyped — a page
 * that carries its own copy of its title drifts the moment it is renamed.
 */
export function PageHeader({ path }: { path: string }) {
  const found = findLesson(path);
  if (!found) return null;
  const { chapter, lesson } = found;

  return (
    <header className={styles.header}>
      <p className={styles.chapter}>{chapter.shortTitle ?? chapter.title}</p>
      <h1>
        {lesson.titleHtml ? (
          <span dangerouslySetInnerHTML={{ __html: lesson.titleHtml }} />
        ) : (
          lesson.title
        )}
      </h1>
      {lesson.delf && <p className={styles.delf}>{lesson.delf}</p>}
      {lesson.levels.length > 0 && (
        <p className={styles.levels}>
          {lesson.levels.map((level) => (
            <span key={level}>{level}</span>
          ))}
        </p>
      )}
    </header>
  );
}
