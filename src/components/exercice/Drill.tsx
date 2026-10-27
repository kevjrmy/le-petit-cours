"use client";

import type { ReactNode } from "react";
import { T } from "@/components/lang/T";
import { useLang } from "@/hooks/useLang";
import type { Lang } from "@/lib/lang";
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

/**
 * The instruction line. A bilingual drill passes `<T fr="…" es="…" />` as its
 * children (#102); the French items inside keep `lang="fr"` on their span.
 */
export function Instructions({ children }: { children: ReactNode }) {
  return <p className={styles.instructions}>{children}</p>;
}

/**
 * How far through the deck. `role="progressbar"` carries the numbers, and the
 * count beside it prints them, so the bar is never the only statement of where
 * the learner is (`AGENTS.md` §5 — colour, and shape, are never alone).
 *
 * `label` is an attribute, so it cannot be a `<T>`: pass `{ fr, es }` and the
 * one in view is read (#102). A plain string is French, as the atelier's drills
 * still pass it.
 */
export function Meter({
  value,
  max,
  label,
}: {
  value: number;
  max: number;
  label: string | Record<Lang, string>;
}) {
  const lang = useLang();
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
        aria-label={typeof label === "string" ? label : label[lang]}
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
 * says what to do next, in both languages (#102); there is no badge and no
 * stored total.
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
    share === 1 ? (
      <T
        fr="Tout est juste. Cet exercice n’a plus rien à vous apprendre."
        es="Todo está bien. Este ejercicio ya no tiene nada que enseñarte."
      />
    ) : share >= 0.75 ? (
      <T
        fr="C’est presque acquis. Refaites-le une fois : les erreurs qui restent sont toujours les mêmes."
        es="Ya casi lo tienes. Hazlo una vez más: los errores que quedan son siempre los mismos."
      />
    ) : share >= 0.5 ? (
      <T
        fr="La règle est là, l’automatisme non. Relisez la leçon, puis recommencez."
        es="La regla ya está, el automatismo todavía no. Vuelve a leer la lección y empieza de nuevo."
      />
    ) : (
      <T
        fr="Reprenez la leçon avant de refaire l’exercice : le score ne veut rien dire tant que la règle n’est pas claire."
        es="Repasa la lección antes de repetir el ejercicio: la puntuación no significa nada mientras la regla no esté clara."
      />
    );

  return (
    <div className={`card ${styles.score}`} role="status">
      <p className={styles.tally}>
        {score}
        <span> / {total}</span>
      </p>
      <p>{message}</p>
      <p>
        <T
          fr="Rien n’est enregistré : cochez la leçon vous-même quand vous la jugez terminée."
          es="Nada se guarda: marca tú la lección cuando la des por terminada."
        />
      </p>
      <button type="button" className="button" onClick={onRestart}>
        <T fr="Recommencer" es="Empezar de nuevo" />
      </button>
    </div>
  );
}
