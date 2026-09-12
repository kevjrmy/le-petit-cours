import { findLesson } from "@/data/navigation";
import styles from "./PageHeader.module.css";

/**
 * A lesson's title block, read from the manifest rather than retyped — a page
 * that carries its own copy of its title drifts the moment it is renamed.
 *
 * No chapter line: the topbar crumb already names it (`AGENTS.md` §6).
 */
export function PageHeader({ path }: { path: string }) {
  const found = findLesson(path);
  if (!found) return null;
  const { lesson } = found;

  return (
    <header className={styles.header}>
      {/* La pastille reste hors du `h1` : dedans, le nom accessible du titre
          deviendrait « Le passé composé A2 ». */}
      <div className={styles.title}>
        <h1>
          {lesson.titleHtml ? (
            <span dangerouslySetInnerHTML={{ __html: lesson.titleHtml }} />
          ) : (
            lesson.title
          )}
        </h1>
        {lesson.levels.length > 0 && (
          <p className={styles.levels}>
            <span className="visually-hidden">
              {lesson.levels.length === 1 ? "Niveau " : "Niveaux "}
            </span>
            {lesson.levels.map((level) => (
              <span key={level}>{level}</span>
            ))}
          </p>
        )}
      </div>
      {lesson.delf && <p className={styles.delf}>{lesson.delf}</p>}
    </header>
  );
}
