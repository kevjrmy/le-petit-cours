"use client";

import { useState } from "react";
import { Instructions, Meter, Score } from "@/components/exercice/Drill";
import { shuffle } from "@/lib/shuffle";
import type { Level } from "@/data/navigation";
import { bankFor, type FaultItem } from "./data";
import styles from "./drill.module.css";

/**
 * Locate the mistake, then repair it: two steps, and the first one is the skill.
 *
 * **Finding the wrong word is the exercise.** A gap already marked — « elle ___
 * fini » — asks which form goes in a hole someone else found; a heritage
 * speaker's actual difficulty is that the sentence looks finished. So the
 * sentence arrives whole and the learner has to see it, which is also why
 * several items carry a *correct* instance of the same word.
 *
 * **The repair is a click, not a text field.** The corrections are `à`, `où`,
 * `est`: accents that cost a dead-key detour on the Spanish keyboard both
 * profiles use (`AGENTS.md` §1, §9). Typing them would test the hardware. The
 * choice is a fixed pool in a stable order, never shuffled and never three
 * distractors drawn per sentence, so the learner recalls the pair rather than
 * eliminating options.
 *
 * **Scored all or nothing per sentence.** Locating the right word and then
 * picking the wrong correction is not half right, and partial credit would hide
 * exactly which of the two steps failed.
 *
 * Never server-rendered: the deck is shuffled in a `useState` initialiser and
 * `drill.tsx` loads this with `ssr: false`. See the note there.
 */
export function Board({ level }: { level: Level | null }) {
  /* Read once. `drill.tsx` remounts this component when the level changes, so
     the initialiser below runs again with the new bank, and the pastilles
     change with it (`docs/decisions.md` #68). */
  const { items, fixes } = bankFor(level);
  const [deck, setDeck] = useState<FaultItem[]>(() => shuffle(items));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [fix, setFix] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const current = deck[currentIndex];
  const foundIt = picked === current.badIndex;
  const right = foundIt && fix === current.fix;

  function restart() {
    setDeck(shuffle(items));
    setCurrentIndex(0);
    setPicked(null);
    setFix(null);
    setChecked(false);
    setScore(0);
    setFinished(false);
  }

  function verify() {
    setChecked(true);
    if (picked === current.badIndex && fix === current.fix) {
      setScore((value) => value + 1);
    }
  }

  function next() {
    if (currentIndex + 1 === deck.length) {
      setFinished(true);
      return;
    }
    setCurrentIndex((value) => value + 1);
    setPicked(null);
    setFix(null);
    setChecked(false);
  }

  if (finished) {
    return <Score score={score} total={deck.length} onRestart={restart} />;
  }

  return (
    <>
      <Instructions>
        Chaque phrase contient <strong>une seule faute</strong>, et c’est
        toujours un homophone. Cliquez sur le mot fautif, puis sur la forme qui
        convient.
      </Instructions>

      <Meter
        value={currentIndex + 1}
        max={deck.length}
        label="Phrase en cours"
      />

      <div className={styles.card}>
        <p className={styles.sentence} role="group" aria-label="Phrase à corriger">
          {current.words.map((word, index) => (
            <button
              key={`${currentIndex}-${index}`}
              type="button"
              className={`${styles.word} ${picked === index ? styles.picked : ""} ${
                checked && index === current.badIndex ? "is-correct" : ""
              } ${checked && picked === index && !foundIt ? "is-wrong" : ""}`}
              disabled={checked}
              aria-pressed={picked === index}
              onClick={() => setPicked(index)}
            >
              {word}
            </button>
          ))}
        </p>

        <p className={styles.step}>
          {picked === null
            ? "1. Cliquez sur le mot fautif."
            : `2. Remplacez « ${current.words[picked]} » par :`}
        </p>

        <div className={styles.fixes}>
          {fixes.map((candidate) => (
            <button
              key={candidate}
              type="button"
              className={`${styles.fix} ${fix === candidate ? styles.chosen : ""}`}
              disabled={picked === null || checked}
              onClick={() => setFix(candidate)}
            >
              {candidate}
            </button>
          ))}
        </div>

        {/* Rendered empty rather than conditionally, so the live region exists
            before the verdict lands in it and is announced. */}
        <div role="status">
          {checked && (
            <div
              className={`${styles.verdict} ${right ? "is-correct" : "is-wrong"}`}
            >
              <p>
                {right
                  ? "✓ Juste."
                  : foundIt
                    ? `✗ Le mot était le bon, mais il fallait écrire « ${current.fix} ».`
                    : `✗ La faute était « ${current.words[current.badIndex]} », à remplacer par « ${current.fix} ».`}
              </p>
              <p className={styles.corrected}>
                {current.words
                  .map((word, index) =>
                    index === current.badIndex ? current.fix : word,
                  )
                  .join(" ")}
              </p>
              <p>{current.because}</p>
            </div>
          )}
        </div>
      </div>

      <div className={styles.actions}>
        {checked ? (
          <button type="button" className="button button-primary" onClick={next}>
            {currentIndex + 1 === deck.length ? "Voir mon score" : "Phrase suivante"}
          </button>
        ) : (
          <button
            type="button"
            className="button button-primary"
            disabled={picked === null || fix === null}
            onClick={verify}
          >
            Vérifier
          </button>
        )}
      </div>
    </>
  );
}
