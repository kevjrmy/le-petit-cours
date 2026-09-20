"use client";

import Link from "next/link";
import { nextUp } from "@/data/navigation";
import { useAccount } from "@/hooks/useAccount";
import { useProgress } from "@/hooks/useProgress";
import { ChapterIcon } from "@/components/nav/ChapterIcon";
import styles from "./NextLesson.module.css";

/**
 * « La suite »: the one lesson to open now.
 *
 * The only thing this app could not tell a signed-in learner. `/ma-progression`
 * is a record of where they have been and `/compte` is a settings drawer;
 * neither answers "what do I do next", which is the question somebody opening
 * the app on their phone actually has.
 *
 * **Two shapes, one component and one rule.** A line under the home page's
 * search field, a card at the head of the record. Drawing the same offer twice
 * is how the two would come to disagree about what "next" means — the rule
 * itself is `nextUp`, in the manifest.
 *
 * **It is an offer, so it filters by level** (`AGENTS.md` §6) — unlike the
 * record beneath it on `/ma-progression`, which deliberately does not (#48).
 * The two blocks make different claims on the same page.
 *
 * Signed out it draws nothing at all: an offer to resume is meaningless without
 * the ticks that say what is left, and the home page already says what an
 * account is for nowhere — that is `/compte`'s job (#18, no sign-up
 * interstitial).
 */
export function NextLesson({ as }: { as: "line" | "card" }) {
  const account = useAccount();
  const { ready, signedIn, isDone } = useProgress();
  const level = account?.level ?? null;

  if (!signedIn) return null;

  /* The slot keeps its height from the moment we know somebody is signed in,
     so the pills below it do not jump when IndexedDB answers a moment later.
     Signed out there is no slot to reserve, which is why this sits after the
     check above rather than before it. */
  if (!ready) return as === "line" ? <p className={styles.slot} /> : null;

  const step = nextUp(level, isDone);

  if (!step) {
    /* Everything at their level is ticked. The line simply goes — a home page
       is not the place to be congratulated — but the record's head would leave
       a hole, and a head that vanishes reads as a page that broke. */
    if (as === "line") return null;
    return (
      <section className={styles.card}>
        <h2 className={styles.heading}>La suite</h2>
        <p className={styles.done}>
          Vous avez coché toutes les leçons de votre niveau.
        </p>
      </section>
    );
  }

  const { chapter, lesson, started } = step;
  const verb = started ? "Reprendre" : "Commencer";

  if (as === "line") {
    return (
      <p className={styles.slot}>
        <Link href={lesson.path} className={styles.line}>
          <span className={styles.verb}>{verb}&nbsp;:</span>
          <span className={styles.lesson}>{lesson.title}</span>
          <Chevron />
        </Link>
      </p>
    );
  }

  return (
    <section className={styles.card}>
      {/* « La suite » rather than the verb: the heading names the block, the
          link under it carries the action. */}
      <h2 className={styles.heading}>La suite</h2>
      <Link href={lesson.path} className={styles.target}>
        <span className={styles.mark} aria-hidden="true">
          <ChapterIcon name={chapter.icon} />
        </span>
        <span className={styles.text}>
          <span className={styles.title}>{lesson.title}</span>
          {/* The chapter, because a lesson title alone does not say where it
              sits — the same pairing the crumb makes above every lesson. */}
          <span className={styles.chapter}>{chapter.title}</span>
        </span>
        <Chevron />
      </Link>
    </section>
  );
}

function Chevron() {
  return (
    <svg className={styles.chevron} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M9 5l7 7-7 7" />
    </svg>
  );
}
