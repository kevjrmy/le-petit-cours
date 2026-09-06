"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { canonicalPath, findLesson } from "@/data/navigation";
import { useProgress } from "@/hooks/useProgress";
import styles from "./DoneTick.module.css";

/**
 * « J'ai terminé » — the one control that marks a lesson done.
 *
 * **Rendered by the shell, not by pages.** It draws itself only when the
 * current path resolves to a lesson in the manifest, which is what keeps it off
 * chapter landing pages and annexes with no allowlist to maintain, and why
 * adding a lesson needs no progress work at all (`AGENTS.md` §8).
 *
 * The consequence of living in the shell is that it sits *after* « Pour aller
 * plus loin », which the lesson itself renders. It reads as the end of the
 * page either way, and the alternative — every lesson remembering to place it —
 * is the class of omission the manifest exists to prevent.
 *
 * **Marking is manual, always.** Nothing here is automatic: reaching the foot
 * of a page is not finishing it, and a drill scored at 50 % is not a finished
 * lesson either. Do not make this component clever.
 *
 * Signed out it is a link to `/compte`, carrying where to come back to. It is
 * not disabled and it is not hidden: the learner should be able to see what an
 * account is *for* before being asked to have one.
 */
export function DoneTick() {
  const pathname = usePathname();
  const { state, signedIn, isDone, toggle } = useProgress();

  const path = canonicalPath(pathname ?? "");
  if (!findLesson(path)) return null;

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
        <p className={styles.hint}>
          Un compte garde vos leçons cochées d&rsquo;un appareil à l&rsquo;autre.
          Tout le reste du site se lit sans.
        </p>
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
