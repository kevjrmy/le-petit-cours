"use client";

import Link from "next/link";
import { nextUp } from "@/data/parcours";
import { useAccount } from "@/hooks/useAccount";
import { useProgress } from "@/hooks/useProgress";
import { ChapterIcon } from "@/components/nav/ChapterIcon";
import styles from "./NextLesson.module.css";

/**
 * « La suite »: the one lesson to open now, in the parcours the learner follows
 * (#88).
 *
 * The only thing this app could not tell a signed-in learner. `/ma-progression`
 * is a record of where they have been and `/compte` is a settings drawer;
 * neither answers "what do I do next", which is the question somebody opening
 * the app on their phone actually has.
 *
 * **Two shapes, one component and one rule.** A line under the home page's
 * search field, a card at the head of the record. Drawing the same offer twice
 * is how the two would come to disagree about what "next" means — the rule
 * itself is `nextUp`, in `src/data/parcours`.
 *
 * **No parcours, no « La suite »**: a line offering one takes its place. **Every
 * étape ticked**, and the path's épreuves are offered instead (#89); none, and
 * the line goes while the card says so.
 *
 * Signed out it draws nothing at all: an offer to resume is meaningless without
 * the ticks that say what is left (#18).
 */
export function NextLesson({ as }: { as: "line" | "card" }) {
  const account = useAccount();
  const { ready, signedIn, isDone } = useProgress();

  if (!signedIn) return null;

  /* The slot keeps its height from the moment we know somebody is signed in,
     so the pills below it do not jump when IndexedDB answers a moment later.
     Signed out there is no slot to reserve, which is why this sits after the
     check above rather than before it. */
  if (!ready) return as === "line" ? <p className={styles.slot} /> : null;

  const parcours = account?.parcours ?? null;

  if (!parcours) {
    if (as === "line") {
      return (
        <p className={styles.slot}>
          <Link href="/compte#parcours" className={styles.line}>
            <span className={styles.lesson}>Choisir un parcours</span>
            <Chevron />
          </Link>
        </p>
      );
    }
    return (
      <section className={styles.card}>
        <h2 className={styles.heading}>La suite</h2>
        <p className={styles.done}>
          Choisissez un parcours, et cette place vous donnera la leçon suivante,
          étape par étape. <Link href="/compte#parcours">Choisir un parcours</Link>
        </p>
      </section>
    );
  }

  const next = nextUp(parcours, isDone);

  if (next.kind === "done") {
    /* A home page is not the place to be congratulated, so the line simply
       goes — but the record's head would leave a hole, and a head that vanishes
       reads as a page that broke. */
    if (as === "line") return null;
    return (
      <section className={styles.card}>
        <h2 className={styles.heading}>La suite</h2>
        <p className={styles.done}>
          Vous avez coché toutes les leçons de votre parcours.{" "}
          <Link href="/compte#parcours">Changer de parcours</Link>
        </p>
      </section>
    );
  }

  if (next.kind === "exam") {
    const first = next.steps[0];
    if (as === "line") {
      return (
        <p className={styles.slot}>
          <Link href={first.lesson.path} className={styles.line}>
            <span className={styles.verb}>Passer&nbsp;:</span>
            <span className={styles.lesson}>l’examen blanc</span>
            <Chevron />
          </Link>
        </p>
      );
    }
    return (
      <section className={styles.card}>
        <h2 className={styles.heading}>La suite</h2>
        <p className={styles.done}>
          Toutes les étapes sont cochées. Reste l’examen blanc, dans l’ordre de
          l’examen :
        </p>
        <Link href={first.lesson.path} className={styles.target}>
          <span className={styles.mark} aria-hidden="true">
            <ChapterIcon name={first.chapter.icon} />
          </span>
          <span className={styles.text}>
            <span className={styles.title}>{first.lesson.title}</span>
            <span className={styles.chapter}>{first.lesson.subtitle ?? first.chapter.title}</span>
          </span>
          <Chevron />
        </Link>
      </section>
    );
  }

  const { step, etape, started } = next;
  const verb = started ? "Reprendre" : "Commencer";

  if (as === "line") {
    return (
      <p className={styles.slot}>
        <Link href={step.lesson.path} className={styles.line}>
          <span className={styles.verb}>{verb}&nbsp;:</span>
          <span className={styles.lesson}>{step.lesson.title}</span>
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
      <Link href={step.lesson.path} className={styles.target}>
        <span className={styles.mark} aria-hidden="true">
          <ChapterIcon name={step.chapter.icon} />
        </span>
        <span className={styles.text}>
          <span className={styles.title}>{step.lesson.title}</span>
          {/* The étape, then the chapter: where the lesson sits in the path,
              and where it lives in the course. */}
          <span className={styles.chapter}>
            {etape} · {step.chapter.shortTitle ?? step.chapter.title}
          </span>
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
