"use client";

import { usePathname } from "next/navigation";
import { findLesson } from "@/data/navigation";
import { useLessonVariant } from "@/hooks/useLessonVariant";
import styles from "./LevelPicker.module.css";

/**
 * Which level's material a page is showing, where it has more than one set:
 * the questions of a `lecture` quiz, the deck of an `exercices` drill.
 *
 * **It draws nothing at all for a lesson that serves one level, or none**, which
 * is every lesson today. Dropping it into a drill or a quiz costs that page
 * nothing until the manifest says the page has variants — so nothing has to be
 * remembered when one grows them, and no page carries a control that lies.
 *
 * **It is an offer, not a gate** (`docs/decisions.md` #35). Signed out, or
 * working at A2 in front of a text that also serves B1, she can still read the
 * harder questions: the level decides what the course *proposes*, never what it
 * permits. The tick follows the same choice, so answering the B1 set and then
 * marking the lesson done records the B1 variant (#68).
 *
 * It reads its own lesson from the path rather than taking one as a prop, like
 * `LessonEnd` — a page that has to pass its own identity in is a page that can
 * pass the wrong one.
 */
export function LevelPicker() {
  const pathname = usePathname() ?? "";
  const found = findLesson(pathname);
  const { level, levels, choose } = useLessonVariant(found?.lesson ?? null);

  if (levels.length < 2) return null;

  return (
    <div className={styles.picker} role="group" aria-label="Choix du niveau">
      <span className={styles.label}>Niveau&nbsp;:</span>
      {levels.map((offered) => {
        const current = offered === level;
        return (
          <button
            key={offered}
            type="button"
            /* `aria-pressed` rather than a `<select>`: three short options that
               are all worth seeing at once, and the current one has to be
               announced as pressed rather than merely tinted (`AGENTS.md` §5). */
            aria-pressed={current}
            className={`button ${styles.level} ${current ? styles.current : ""}`}
            onClick={() => choose(offered)}
          >
            {offered}
          </button>
        );
      })}
    </div>
  );
}
