"use client";

import Link from "next/link";
import { useProgress } from "@/hooks/useProgress";
import styles from "./DoneTick.module.css";

/**
 * « J'ai terminé » — the one control that marks a lesson done.
 *
 * **Rendered by the shell, not by pages** — `LessonEnd` places it directly under
 * the lesson's own words and above « Pour aller plus loin », and decides for
 * itself whether the current path is a lesson at all. Adding a lesson therefore
 * needs no progress work (`AGENTS.md` §8).
 *
 * **Marking is manual, always.** Nothing here is automatic: reaching the foot
 * of a page is not finishing it, and a drill scored at 50 % is not a finished
 * lesson either. Do not make this component clever.
 *
 * Signed out it is a link to `/compte`, carrying where to come back to. It is
 * not disabled and it is not hidden: the learner should be able to see what an
 * account is *for* before being asked to have one — **and it says nothing else**.
 * `/compte` explains what an account keeps, in the sentence written for it; a
 * second copy under every lesson was the pitch made fourteen times a day to
 * someone who has already decided.
 */
export function DoneTick({ path }: { path: string }) {
  const { state, signedIn, isDone, toggle } = useProgress();

  if (!signedIn) {
    return (
      <aside className={styles.tick}>
        <Link
          href={`/compte?suivant=${encodeURIComponent(path)}`}
          className={`button ${styles.control}`}
        >
          <Mark done={false} />
          J&rsquo;ai terminé
        </Link>
      </aside>
    );
  }

  const done = isDone(path);

  return (
    <aside className={styles.tick}>
      <button
        type="button"
        className={`button ${styles.control} ${done ? styles.controlDone : ""}`}
        /* Until the cache has answered, the state on screen is not yet known to
           be right — clicking would toggle from a guess. */
        disabled={state === null}
        aria-pressed={done}
        onClick={() => toggle(path)}
      >
        <Mark done={done} />
        {done ? "Leçon terminée" : "J’ai terminé"}
      </button>
      {done && (
        <p className={styles.hint}>
          Cochée. Cliquez de nouveau pour la décocher.
        </p>
      )}
    </aside>
  );
}

/* A mark as well as a fill: the state is never carried by colour alone
   (`AGENTS.md` §5). Empty circle for todo, ticked circle for done. */
function Mark({ done }: { done: boolean }) {
  return (
    <svg className={styles.mark} viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      {done && <path d="M8 12.2l2.8 2.8L16.2 9.4" />}
    </svg>
  );
}
