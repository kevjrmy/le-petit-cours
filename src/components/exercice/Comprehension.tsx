"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { findLesson, type Level } from "@/data/navigation";
import { useLessonVariant } from "@/hooks/useLessonVariant";
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

/**
 * A set of questions per level, for a text whose task scales with the rung.
 *
 * **A page with these has `sets` in the manifest, and its keys must be exactly
 * that list** (`docs/decisions.md` #68, #87). The field is
 * what the tick is keyed by, so a second set arriving without it puts two
 * bodies of work behind one circle; the keys are what the level resolves
 * against, so a level listed with no set here falls back to the first and the
 * page quietly shows the wrong questions. The `nav-wiring` audit checks both
 * directions — nothing else does.
 */
export type QuestionSets = Partial<Record<Level, Question[]>>;

/**
 * One set, or one per level — never both. A page with a single set passes
 * `questions` and draws no picker, which is every `lecture` page today.
 */
type ComprehensionProps = (
  | { questions: Question[]; sets?: never }
  | { sets: QuestionSets; questions?: never }
) & {
  /**
   * `"fr"` on an A1 page, whose quiz is asked in Spanish (#85): every « … » in
   * a question, option or `because` is French and gets `lang="fr"` back, so a
   * screen reader does not read the quoted text with a Spanish voice. French
   * outside guillemets is not detected; the data keeps it inside them.
   */
  quotes?: "fr";
};

/** Wrap each « … » in `lang="fr"`; a plain string when `quotes` is unset. */
function inLang(text: string, quotes: "fr" | undefined) {
  if (!quotes) return text;
  return text
    .split(/(«[^»]*»)/)
    .map((part, i) => (part.startsWith("«") ? <span key={i} lang={quotes}>{part}</span> : part));
}

/**
 * « ✓ Juste. » or « ✗ Non : » and the right option.
 *
 * On a French quiz the option is quoted back in guillemets. On an A1 quiz
 * (`quotes`) the label is the shared furniture and stays French, so it is
 * marked `lang="fr"`; a Spanish option is given back as it is, never wrapped
 * in guillemets that `inLang` would then read as French, and a French one keeps
 * the guillemets it already carries.
 */
function verdict(right: boolean, option: string, quotes: "fr" | undefined) {
  if (!quotes) {
    if (right) return "✓ Juste. ";
    return `✗ Non : ${option.startsWith("«") ? option : `« ${option} »`}. `;
  }
  if (right) return <><span lang={quotes}>✓ Juste.</span> </>;
  return <><span lang={quotes}>✗ Non :</span> {inLang(option, quotes)}. </>;
}

export function Comprehension(props: ComprehensionProps) {
  const pathname = usePathname() ?? "";
  const found = findLesson(pathname);
  const level = useLessonVariant(found?.lesson ?? null);

  /* The manifest decides which variant is in view; this only looks it up. A
     level with no set here falls back to the first one written rather than to
     an empty quiz — the page is wrong either way, and a quiz with no questions
     reads as a broken page rather than as a mistake in the data. */
  const sets = props.sets;
  const questions =
    props.questions ??
    (level && sets?.[level]) ??
    Object.values(sets ?? {})[0] ??
    [];

  /* Tagged with the level they answer, and read back through that tag — the
     same trick `ProgressProvider` uses for the account its ticks belong to.
     Switching level replaces the questions, and answers to the old set must not
     survive the swap: **counting them would not catch it**, because an A2 set
     and a B1 set on the same text are both likely to hold seven. Tagging also
     keeps this out of an effect, so a render showing the previous level's
     answers against the new level's questions cannot happen at all. */
  const [chosen, setChosen] = useState<{ level: string; answers: (number | null)[] }>(
    () => ({ level: level ?? "", answers: questions.map(() => null) }),
  );

  const answers =
    chosen.level === (level ?? "") ? chosen.answers : questions.map(() => null);

  const record = (next: (number | null)[]) =>
    setChosen({ level: level ?? "", answers: next });

  const done = questions.length > 0 && answers.every((c) => c !== null);
  const score = answers.filter((c, i) => c === questions[i].answer).length;

  return (
    <>
      <ol className={styles.list}>
        {questions.map((item, index) => {
          const answer = answers[index];
          const answered = answer !== null;
          const right = answer === item.answer;

          return (
            <li key={item.question} className={styles.item}>
              <p className={styles.question}>{inLang(item.question, props.quotes)}</p>

              <div className={styles.options}>
                {item.options.map((option, position) => (
                  <button
                    key={option}
                    type="button"
                    className="button"
                    disabled={answered}
                    onClick={() =>
                      record(
                        answers.map((value, i) => (i === index ? position : value)),
                      )
                    }
                  >
                    {inLang(option, props.quotes)}
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
                    {verdict(right, item.options[item.answer], props.quotes)}
                    {inLang(item.because, props.quotes)}
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
              onClick={() => record(questions.map(() => null))}
            >
              Recommencer
            </button>
          </p>
        </div>
      )}
    </>
  );
}
