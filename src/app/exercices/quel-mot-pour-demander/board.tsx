"use client";

import { useState } from "react";
import { Instructions, Meter, Score } from "@/components/exercice/Drill";
import { shuffle } from "@/lib/shuffle";
import { ITEMS, POOL, shown, type Word } from "./data";
import styles from "./drill.module.css";

/**
 * Une phrase à la fois, les douze mots toujours à l'écran.
 *
 * **Cliquer plutôt que taper** : il n'y a rien à orthographier, la difficulté
 * est de choisir (`AGENTS.md` §9). **Le tirage ne bouge pas** (mots invariables, puis
 * `quel`, puis `est-ce que`) : on retrouve le paradigme, on ne l'élimine pas.
 *
 * L'état garde
 * les noms du brief : `deck`, `currentIndex`, `checked`, `score`, `finished`.
 *
 * Le plateau est en français (`lang="fr"`) ; seules la consigne et la
 * correction, qui explique, sont en espagnol (#85).
 */
/** Les mots français d'une correction sont entre astérisques : `lang="fr"`. */
function french(text: string) {
  return text
    .split("*")
    .map((run, i) =>
      i % 2 ? (
        <span key={i} lang="fr">
          {run}
        </span>
      ) : (
        run
      ),
    );
}

export function Board() {
  /* Mélangé dans un initialiseur : le plateau n'est jamais rendu sur le serveur
     (`drill.tsx`, `ssr: false`). */
  const [deck, setDeck] = useState(() => shuffle(ITEMS));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [picked, setPicked] = useState<Word | null>(null);
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const current = deck[currentIndex];
  const right = picked === current.answer;

  function restart() {
    setDeck(shuffle(ITEMS));
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
    return (
      <div lang="fr">
        <Score score={score} total={deck.length} onRestart={restart} />
      </div>
    );
  }

  return (
    <div lang="fr">
      <Instructions>
        <span lang="es">
          Haz clic en la palabra que completa la pregunta, y comprueba. Las doce
          palabras se quedan siempre en el mismo orden.
        </span>
      </Instructions>

      <Meter value={currentIndex + 1} max={deck.length} label="Question en cours" />

      <div className={styles.card}>
        <p className={styles.sentence}>
          {current.before && `${current.before} `}
          <span
            className={`${styles.slot} ${picked ? styles.filled : ""} ${
              checked ? (right ? "is-correct" : "is-wrong") : ""
            }`}
          >
            {/* Le blanc garde sa largeur avant d'être rempli, et dit à voix
                haute qu'il manque quelque chose. */}
            {picked ? (
              shown(current, picked)
            ) : (
              <>
                <span aria-hidden="true">{"    "}</span>
                <span className="visually-hidden">blanc à compléter</span>
              </>
            )}
          </span>
          {current.after}
        </p>
        <p className={styles.reply}>
          <span aria-hidden="true">— </span>
          {current.reply}
        </p>

        <div className={styles.pool} role="group" aria-label="Les douze mots">
          {POOL.map((form) => (
            <button
              key={form}
              type="button"
              className={`${styles.chip} ${picked === form ? styles.chosen : ""}`}
              disabled={checked}
              aria-pressed={picked === form}
              onClick={() => setPicked(form)}
            >
              {form}
            </button>
          ))}
        </div>

        <div role="status">
          {checked && (
            <div
              className={`${styles.verdict} ${right ? "is-correct" : "is-wrong"}`}
            >
              <p>
                {right
                  ? "✓ Juste."
                  : `✗ La réponse : « ${current.answer} ».`}
              </p>
              <p className={styles.corrected}>
                {current.before && `${current.before} `}
                <strong>{shown(current, current.answer)}</strong>
                {current.after}
              </p>
              <p lang="es">{french(current.because)}</p>
            </div>
          )}
        </div>
      </div>

      <div className={styles.actions}>
        {checked ? (
          <button type="button" className="button button-primary" onClick={next}>
            {currentIndex + 1 === deck.length
              ? "Voir mon score"
              : "Question suivante"}
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
    </div>
  );
}
