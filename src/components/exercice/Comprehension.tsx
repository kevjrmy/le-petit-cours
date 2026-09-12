"use client";

import { useState } from "react";
import styles from "./Comprehension.module.css";

/**
 * The « Avez-vous compris ? » quiz at the foot of a `lecture/` page.
 *
 * **The options are `<button>` elements, never hidden radios.** That is
 * `AGENTS.md` §9, and it is there because this course once shipped a label-wrapped
 * radio whose click targets overlapped: a tap near the edge selected the
 * neighbour, silently, and the learner read her own answer as the mistake.
 *
 * **Graded on screen, stored nowhere.** A score is not a tick: finishing this
 * never marks the lesson done (`docs/decisions.md` #48), and « Recommencer »
 * clears it. Nothing here touches storage, so the page stays offline-safe and
 * the quiz can be replayed in class as often as it is useful.
 *
 * **The verdict carries a mark and a sentence, not a colour.** `.is-correct`
 * and `.is-wrong` tint it, but ✓ / ✗ and the reason say the same thing for a
 * learner who cannot tell the green from the red (`AGENTS.md` §5).
 */
export interface Question {
  /** The question, in French. */
  question: string;
  /** Two to four options, in a fixed order — nothing here shuffles. */
  options: string[];
  /** Index into `options` of the one right answer. */
  answer: number;
  /** One line saying *why*, shown once she has answered. */
  because: string;
}

export function Comprehension({ questions }: { questions: Question[] }) {
  const [chosen, setChosen] = useState<(number | null)[]>(() =>
    questions.map(() => null),
  );

  const done = chosen.every((c) => c !== null);
  const score = chosen.filter((c, i) => c === questions[i].answer).length;

  return (
    <>
      <ol className={styles.list}>
        {questions.map((item, index) => {
          const answer = chosen[index];
          const answered = answer !== null;
          const right = answer === item.answer;

          return (
            <li key={item.question} className={styles.item}>
              <p className={styles.question}>{item.question}</p>

              <div className={styles.options}>
                {item.options.map((option, position) => (
                  <button
                    key={option}
                    type="button"
                    className="button"
                    disabled={answered}
                    onClick={() =>
                      setChosen((previous) =>
                        previous.map((value, i) =>
                          i === index ? position : value,
                        ),
                      )
                    }
                  >
                    {option}
                  </button>
                ))}
              </div>

              {/* Rendered empty rather than conditionally, so the live region
                  exists before the verdict lands in it and is announced. */}
              <p
                role="status"
                className={
                  answered
                    ? `${styles.verdict} ${right ? "is-correct" : "is-wrong"}`
                    : styles.verdict
                }
              >
                {answered && (
                  <>
                    {right
                      ? "✓ Juste. "
                      : `✗ Non : « ${item.options[item.answer]} ». `}
                    {item.because}
                  </>
                )}
              </p>
            </li>
          );
        })}
      </ol>

      {done && (
        <div className="card" role="status">
          <p>
            <strong>
              {score} réponse{score > 1 ? "s" : ""} juste{score > 1 ? "s" : ""}{" "}
              sur {questions.length}.
            </strong>
          </p>
          <p>
            Rien n’est enregistré. Relisez le texte et recommencez autant de
            fois que vous voulez.
          </p>
          <p>
            <button
              type="button"
              className="button"
              onClick={() => setChosen(questions.map(() => null))}
            >
              Recommencer
            </button>
          </p>
        </div>
      )}
    </>
  );
}
