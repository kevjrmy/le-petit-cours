"use client";

import { useState } from "react";
import { Instructions, Meter, Score } from "@/components/exercice/Drill";
import { shuffle } from "@/lib/shuffle";
import { ITEMS, POOL, label, sentence, type Form } from "./data";
import styles from "./drill.module.css";

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

/**
 * Une phrase à la fois, les sept pastilles toujours à l'écran dans le même
 * ordre. **Cliquer plutôt que taper** : rien à orthographier, la difficulté
 * est de choisir (`AGENTS.md` §9). Le tirage des phrases est mélangé une fois
 * par partie, avec l'unique `shuffle()` ; le plateau n'est donc jamais rendu
 * sur le serveur (`drill.tsx`). L'état garde les noms du brief.
 */
export function Board() {
  const [deck, setDeck] = useState(() => shuffle(ITEMS));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [picked, setPicked] = useState<Form | null>(null);
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

  const slot = (
    <span
      className={`${styles.slot} ${picked ? styles.filled : ""} ${
        checked ? (right ? "is-correct" : "is-wrong") : ""
      }`}
    >
      {picked ? (
        label(picked)
      ) : (
        <>
          <span aria-hidden="true">{"    "}</span>
          <span className="visually-hidden">blanc à compléter</span>
        </>
      )}
    </span>
  );

  return (
    <div lang="fr">
      <Instructions>
        <span lang="es">
          Haz clic en lo que completa la frase, y comprueba. <span lang="fr">∅</span>{" "}
          significa que no falta nada. Las pastillas se quedan siempre en el
          mismo orden.
        </span>
      </Instructions>

      <Meter value={currentIndex + 1} max={deck.length} label="Phrase en cours" />

      <div className={styles.card}>
        {current.hint && (
          <p className={styles.hint} lang="es">
            {current.hint}
          </p>
        )}
        <p className={styles.sentence}>
          {current.before && `${current.before} `}
          {slot}
          {` ${current.after}`}
        </p>

        <div className={styles.pool} role="group" aria-label="Les sept possibilités">
          {POOL.map((form) => (
            <button
              key={form}
              type="button"
              className={`${styles.chip} ${picked === form ? styles.chosen : ""}`}
              disabled={checked}
              aria-pressed={picked === form}
              aria-label={form === "rien" ? "rien, aucun mot" : undefined}
              onClick={() => setPicked(form)}
            >
              {label(form)}
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
                  : `✗ La réponse : « ${label(current.answer)} ».`}
              </p>
              <p className={styles.corrected}>{sentence(current, current.answer)}</p>
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
