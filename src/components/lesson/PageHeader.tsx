import { findLesson } from "@/data/navigation";
import styles from "./PageHeader.module.css";

/**
 * A lesson's title block, read from the manifest rather than retyped — a page
 * that carries its own copy of its title drifts the moment it is renamed.
 *
 * **It does not name the chapter.** The topbar's breadcrumb sits directly above
 * this block and says « Grammaire » already; printing it again put the same
 * word twice on one screen, a few pixels apart. The crumb is now the only place
 * a lesson names its chapter (`AGENTS.md` §6).
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
