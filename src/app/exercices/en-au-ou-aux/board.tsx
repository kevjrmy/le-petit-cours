"use client";

import { useState } from "react";
import { Instructions, Meter, Score } from "@/components/exercice/Drill";
import { shuffle } from "@/lib/shuffle";
import { ITEMS, glue } from "./data";
import styles from "./drill.module.css";

/**
 * Une phrase à la fois, les formes toujours à l'écran.
 *
 * **Cliquer plutôt que taper** : il n'y a rien à orthographier, la difficulté
 * est de choisir (`AGENTS.md` §9). **Le tirage ne bouge pas** (définis puis
 * indéfinis) : on retrouve le paradigme, on ne l'élimine pas.
 *
 * Le lot est fixe, donc rien à mélanger et pas de `ssr: false`. L'état garde
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
  /* Mélangé dans l'initialiseur : le drill est chargé avec `ssr: false`. */
  const [deck, setDeck] = useState(() => shuffle(ITEMS));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
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
          Haz clic en la palabra que completa la frase, y comprueba. Las ocho
          preposiciones se quedan siempre en el mismo orden; con una
          nacionalidad, solo hay dos formas.
        </span>
      </Instructions>

      <Meter value={currentIndex + 1} max={deck.length} label="Phrase en cours" />

      <div className={styles.card}>
        <p className={styles.sentence}>
          {`${current.before} `}
          <span
            className={`${styles.slot} ${picked ? styles.filled : ""} ${
              checked ? (right ? "is-correct" : "is-wrong") : ""
            }`}
          >
            {/* Le blanc garde sa largeur avant d'être rempli, et dit à voix
                haute qu'il manque quelque chose. */}
            {picked ? (
              picked
            ) : (
              <>
                <span aria-hidden="true">{"    "}</span>
                <span className="visually-hidden">blanc à compléter</span>
              </>
            )}
          </span>
          {picked ? glue(picked, current) : current.noun ? " " : ""}
          {current.noun}
          {current.after}
        </p>

        <div className={styles.pool} role="group" aria-label={current.kind === "nationalité" ? "Les deux formes" : "Les huit prépositions"}>
          {current.options.map((form) => (
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
                {`${current.before} `}
                <strong>{current.answer}</strong>
                {glue(current.answer, current)}
                {current.noun}
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
    </div>
  );
}
