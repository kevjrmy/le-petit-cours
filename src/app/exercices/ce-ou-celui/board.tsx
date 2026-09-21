"use client";

import { useState } from "react";
import { Instructions, Meter, Score } from "@/components/exercice/Drill";
import { shuffle } from "@/lib/shuffle";
import type { Level } from "@/data/navigation";
import { POOL, bankFor, type PickItem, type Word } from "./data";
import styles from "./drill.module.css";

/**
 * Un tirage fixe de huit mots, une phrase à la fois.
 *
 * **Le tirage ne bouge jamais.** Les quatre déterminants puis les quatre
 * pronoms restent à l'écran dans le même ordre d'un bout à l'autre de la
 * partie : on y retrouve le paradigme, on ne le redécouvre pas. Trois
 * distracteurs tirés par phrase auraient transformé le rappel en élimination,
 * c'est-à-dire en QCM (`.claude/agents/exercise-author.md`).
 *
 * **Cliquer plutôt que taper**, parce que rien ici ne s'apprend en tapant : les
 * huit formes s'écrivent sans accent et la difficulté est de choisir, pas
 * d'orthographier. La saisie est l'affaire de l'exercice sur les homophones,
 * où l'orthographe *est* la compétence (`AGENTS.md` §9).
 *
 * Jamais rendu sur le serveur : le tirage des phrases est mélangé dans un
 * initialiseur de `useState`, et `drill.tsx` charge ce fichier avec
 * `ssr: false`. La note y est.
 */
export function Board({ level }: { level: Level | null }) {
  /* Lu une seule fois : `drill.tsx` remonte ce composant quand le niveau
     change, donc l'initialiseur ci-dessous rejoue avec l'autre lot (#68). */
  const items = bankFor(level);
  const [deck, setDeck] = useState<PickItem[]>(() => shuffle(items));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [picked, setPicked] = useState<Word | null>(null);
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const current = deck[currentIndex];
  const right = picked === current.answer;

  function restart() {
    setDeck(shuffle(items));
    setCurrentIndex(0);
    setPicked(null);
    setChecked(false);
    setScore(0);
    setFinished(false);
  }

  function verify() {
    setChecked(true);
    if (picked === current.answer) setScore((value) => value + 1);
  }

  function next() {
    if (currentIndex + 1 === deck.length) {
      setFinished(true);
      return;
    }
    setCurrentIndex((value) => value + 1);
    setPicked(null);
    setChecked(false);
  }

  if (finished) {
    return <Score score={score} total={deck.length} onRestart={restart} />;
  }

  return (
    <>
      <Instructions>
        Complétez la phrase avec le mot qui convient. Les huit mots restent les
        mêmes d’une phrase à l’autre.
      </Instructions>

      <Meter value={currentIndex + 1} max={deck.length} label="Phrase en cours" />

      <div className={styles.card}>
        <p className={styles.sentence}>
          {current.before}
          <span
            className={`${styles.slot} ${picked ? styles.filled : ""} ${
              checked ? (right ? "is-correct" : "is-wrong") : ""
            }`}
          >
            {/* Le blanc garde sa largeur avant d'être rempli, sinon la phrase
                saute à chaque clic et l'œil perd la ligne qu'il lisait. Quatre
                espaces insécables ne s'entendent pas, d'où le mot caché : lue à
                voix haute, la phrase doit dire qu'il y manque quelque chose. */}
            {picked ?? (
              <>
                <span aria-hidden="true">{"    "}</span>
                <span className="visually-hidden">blanc à compléter</span>
              </>
            )}
          </span>
          {current.after}
        </p>

        <div className={styles.pool} role="group" aria-label="Les huit mots">
          {POOL.map((word) => (
            <button
              key={word}
              type="button"
              className={`${styles.chip} ${picked === word ? styles.chosen : ""}`}
              disabled={checked}
              aria-pressed={picked === word}
              onClick={() => setPicked(word)}
            >
              {word}
            </button>
          ))}
        </div>

        {/* Rendu vide plutôt que conditionnellement, pour que la zone existe
            avant que le verdict n'y arrive et soit annoncée. */}
        <div role="status">
          {checked && (
            <div
              className={`${styles.verdict} ${right ? "is-correct" : "is-wrong"}`}
            >
              <p>
                {right
                  ? "✓ Juste."
                  : `✗ Il fallait écrire « ${current.answer} ».`}
              </p>
              <p className={styles.corrected}>
                {current.before}
                <strong>{current.answer}</strong>
                {current.after}
              </p>
              <p>{current.because}</p>
            </div>
          )}
        </div>
      </div>

      <div className={styles.actions}>
        {checked ? (
          <button type="button" className="button button-primary" onClick={next}>
            {currentIndex + 1 === deck.length
              ? "Voir mon score"
              : "Phrase suivante"}
          </button>
        ) : (
          <button
            type="button"
            className="button button-primary"
            disabled={picked === null}
            onClick={verify}
          >
            Vérifier
          </button>
        )}
      </div>
    </>
  );
}
