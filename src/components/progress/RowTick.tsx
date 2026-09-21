"use client";

import type { Lesson, Level } from "@/data/navigation";
import { useProgress } from "@/hooks/useProgress";
import styles from "./RowTick.module.css";

/**
 * The tick at the end of a listing row — and it *sets* it.
 *
 * **A chapter's listing used to show the tick without setting it**, which meant
 * ticking eight lessons was eight navigations and eight scrolls to the foot of a
 * page already read (`docs/decisions.md` #79). Marking is still manual, which is
 * the whole of #2: this is a second place to press, never a second way to be
 * ticked by the app.
 *
 * **It is a sibling of the row's link, not a child of it.** A button inside an
 * anchor is invalid, and the click would navigate as well as toggle — so
 * `PageRow` takes it as a slot and lays it out beside the link, on the same row.
 *
 * **Rendered only where there is a record to report**, which is the listing's
 * call and not this component's: signed out, and before the cache answers, an
 * empty circle is a claim (`AGENTS.md` §8). `ChapterLessons` holds that gate.
 *
 * `level` is which variant the tick belongs to, exactly as `DoneTick`'s is —
 * asked at the level the list is filtered to, so a B1 learner sees her B1 tick.
 *
 * **`done` is handed in rather than read here**, because the row is tinted by the
 * same answer (`PageRow`'s `done`). One read per row, in the listing, so the
 * circle and the ground under it cannot end up saying different things.
 */
export function RowTick({
  lesson,
  level,
  done,
}: {
  lesson: Lesson;
  level: Level | null;
  done: boolean;
}) {
  const { toggle } = useProgress();

  return (
    <button
      type="button"
      className={styles.tick}
      /* The state is the button's, so it is announced by `aria-pressed` rather
         than by the row's link — which is why the link no longer carries the
         hidden « , terminée » it used to. The label names the lesson, because a
         list of these is otherwise a list of identical buttons. */
      aria-pressed={done}
      aria-label={`Terminé : ${lesson.title}`}
      title={done ? "Marquer comme non terminée" : "Marquer comme terminée"}
      onClick={() => toggle(lesson, level)}
    >
      {/* A mark as well as a fill (`AGENTS.md` §5). */}
      <span className={`${styles.state} ${done ? styles.stateDone : ""}`} aria-hidden="true">
        {done && (
          <svg className={styles.check} viewBox="0 0 24 24">
            <path d="M6.5 12.5l3.7 3.7 7.3-7.7" />
          </svg>
        )}
      </span>
    </button>
  );
}
