"use client";

import Link from "next/link";
import { nextUp } from "@/data/parcours";
import { useAccount } from "@/hooks/useAccount";
import { useProgress } from "@/hooks/useProgress";
import { ChapterIcon } from "@/components/nav/ChapterIcon";
import { T } from "@/components/lang/T";
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
 *
 * **Both languages through `<T>`** (#102). The lesson's title stays French in
 * both (it names the French it teaches); the étape and the chapter have their
 * Spanish twins in the data.
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
            <span className={styles.lesson}>
              <T fr="Choisir un parcours" es="Elegir un recorrido" />
            </span>
            <Chevron />
          </Link>
        </p>
      );
    }
    return (
      <section className={styles.card}>
        <h2 className="label">
          <T fr="La suite" es="Lo siguiente" />
        </h2>
        <p className={styles.done}>
          <T
            fr={
              <>
                Choisissez un parcours, et cette place vous donnera la leçon
                suivante, étape par étape.{" "}
                <Link href="/compte#parcours">Choisir un parcours</Link>
              </>
            }
            es={
              <>
                Elige un recorrido, y aquí verás la lección siguiente, etapa por
                etapa. <Link href="/compte#parcours">Elegir un recorrido</Link>
              </>
            }
          />
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
        <h2 className="label">
          <T fr="La suite" es="Lo siguiente" />
        </h2>
        <p className={styles.done}>
          <T
            fr={
              <>
                Vous avez coché toutes les leçons de votre parcours.{" "}
                <Link href="/compte#parcours">Changer de parcours</Link>
              </>
            }
            es={
              <>
                Has marcado todas las lecciones de tu recorrido.{" "}
                <Link href="/compte#parcours">Cambiar de recorrido</Link>
              </>
            }
          />
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
            <span className={styles.verb}>
              <T fr="Passer :" es="Hacer:" />
            </span>
            <span className={styles.lesson}>
              <T fr="l’examen blanc" es="el simulacro de examen" />
            </span>
            <Chevron />
          </Link>
        </p>
      );
    }
    return (
      <section className={styles.card}>
        <h2 className="label">
          <T fr="La suite" es="Lo siguiente" />
        </h2>
        <p className={styles.done}>
          <T
            fr="Toutes les étapes sont cochées. Reste l’examen blanc, dans l’ordre de l’examen :"
            es="Has marcado todas las etapas. Queda el simulacro de examen, en el orden del examen:"
          />
        </p>
        <Link href={first.lesson.path} className={styles.target}>
          <span className={styles.mark} aria-hidden="true">
            <ChapterIcon name={first.chapter.icon} />
          </span>
          <span className={styles.text}>
            <span className={styles.title}>{first.lesson.title}</span>
            <span className={styles.chapter}>
              {first.lesson.subtitle ?? (
                <T fr={first.chapter.title} es={first.chapter.es.title} />
              )}
            </span>
          </span>
          <Chevron />
        </Link>
      </section>
    );
  }

  const { step, etape, started } = next;
  const verb = started ? (
    <T fr="Reprendre :" es="Continuar:" />
  ) : (
    <T fr="Commencer :" es="Empezar:" />
  );

  if (as === "line") {
    return (
      <p className={styles.slot}>
        <Link href={step.lesson.path} className={styles.line}>
          <span className={styles.verb}>{verb}</span>
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
      <h2 className="label">
          <T fr="La suite" es="Lo siguiente" />
        </h2>
      <Link href={step.lesson.path} className={styles.target}>
        <span className={styles.mark} aria-hidden="true">
          <ChapterIcon name={step.chapter.icon} />
        </span>
        <span className={styles.text}>
          <span className={styles.title}>{step.lesson.title}</span>
          {/* The étape, then the chapter: where the lesson sits in the path,
              and where it lives in the course. */}
          <span className={styles.chapter}>
            <T
              fr={`${etape.title} · ${step.chapter.shortTitle ?? step.chapter.title}`}
              es={`${etape.es.title} · ${step.chapter.es.title}`}
            />
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
