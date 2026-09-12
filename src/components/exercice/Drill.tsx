"use client";

import type { ReactNode } from "react";
import styles from "./Drill.module.css";

/**
 * The furniture every drill in `exercices/` shares: the instruction line, the
 * progress meter and the score panel.
 *
 * **A drill is graded on screen and stored nowhere** (`docs/decisions.md` #2,
 * #22). The score is shown, « Recommencer » clears it, and finishing never
 * ticks the lesson — the tick under the page stays the learner's own claim.
 * Nothing here touches storage, which is also what keeps a drill playable
 * offline and replayable in class.
 */

export function Instructions({ children }: { children: ReactNode }) {
  return <p className={styles.instructions}>{children}</p>;
}

/**
 * How far through the deck. `role="progressbar"` carries the numbers, and the
 * count beside it prints them, so the bar is never the only statement of where
 * the learner is (`AGENTS.md` §5 — colour, and shape, are never alone).
 */
export function Meter({
  value,
  max,
  label,
}: {
  value: number;
  max: number;
  label: string;
}) {
  return (
    <div className={styles.meter}>
      <span className={styles.count}>
        {value}&thinsp;/&thinsp;{max}
      </span>
      <div
        className={styles.track}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={label}
      >
        <div
          className={styles.fill}
          style={{ width: `${max === 0 ? 0 : (value / max) * 100}%` }}
        />
      </div>
    </div>
  );
}

/**
 * The end of a drill.
 *
 * The three thresholds — everything, three quarters, half — are the shared
 * shape, so two drills never disagree about what a good round is. The sentence
 * is French and says what to do next; there is no badge and no stored total.
 */
export function Score({
  score,
  total,
  onRestart,
}: {
  score: number;
  total: number;
  onRestart: () => void;
}) {
  const share = total === 0 ? 0 : score / total;
  const message =
    share === 1
      ? "Tout est juste. Cet exercice n’a plus rien à vous apprendre."
      : share >= 0.75
        ? "C’est presque acquis. Refaites-le une fois : les erreurs qui restent sont toujours les mêmes."
        : share >= 0.5
          ? "La règle est là, l’automatisme non. Relisez la leçon, puis recommencez."
          : "Reprenez la leçon avant de refaire l’exercice : le score ne veut rien dire tant que la règle n’est pas claire.";

  return (
    <div className={`card ${styles.score}`} role="status">
      <p className={styles.tally}>
        {score}
        <span> / {total}</span>
      </p>
      <p>{message}</p>
      <p>
        Rien n’est enregistré : cochez la leçon vous-même quand vous la jugez
        terminée.
      </p>
      <button type="button" className="button" onClick={onRestart}>
        Recommencer
      </button>
    </div>
  );
}
