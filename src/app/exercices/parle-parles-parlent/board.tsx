"use client";

import { useState } from "react";
import { Instructions, Meter, Score } from "@/components/exercice/Drill";
import { shuffle } from "@/lib/shuffle";
import { ITEMS, full, glue, poolFor, shown } from "./data";
import styles from "./drill.module.css";

/**
 * Una frase a la vez. Le lot est mélangé dans un initialiseur paresseux : c'est
 * pourquoi `drill.tsx` charge ce plateau avec `ssr: false`. Les tirages (six
 * terminaisons, ou `je` / `j’`) restent dans le même ordre : on retrouve le
 * paradigme, on ne l'élimine pas. **Cliquer plutôt que taper** : la difficulté
 * est de choisir la terminaison, pas de trouver un accent (`AGENTS.md` §9).
 *
 * L'état garde les noms du brief. Les mots français d'une correction sont
 * entre astérisques : `lang="fr"` (#85).
 */
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
  const [deck, setDeck] = useState(() => shuffle(ITEMS));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const current = deck[currentIndex];
  const pool = poolFor(current);
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
          Haz clic en lo que falta y comprueba. La terminación se escribe aunque
          no se oiga.
        </span>
      </Instructions>

      <Meter value={currentIndex + 1} max={deck.length} label="Phrase en cours" />

      <div className={styles.card}>
        <p>
          <span lang="es">Verbo:</span> <span className={styles.verb}>{current.verb}</span>
        </p>

        <p className={styles.sentence}>
          {current.before}
          <span
            className={`${styles.slot} ${picked ? styles.filled : ""} ${
              checked ? (right ? "is-correct" : "is-wrong") : ""
            }`}
          >
            {picked ? (
              shown(current, picked)
            ) : (
              <>
                <span aria-hidden="true">{"  "}</span>
                <span className="visually-hidden">blanc à compléter</span>
              </>
            )}
          </span>
          {picked ? glue(current, picked) : current.kind === "sujet" ? " " : ""}
          {current.after}
        </p>

        <div
          className={styles.pool}
          role="group"
          aria-label={current.kind === "fin" ? "Les terminaisons" : "Le sujet"}
        >
          {pool.map((form) => (
            <button
              key={form}
              type="button"
              className={`${styles.chip} ${picked === form ? styles.chosen : ""}`}
              disabled={checked}
              aria-pressed={picked === form}
              onClick={() => setPicked(form)}
            >
              {current.kind === "fin" ? `-${form}` : form}
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
                  : `✗ La réponse : « ${current.kind === "fin" ? "-" : ""}${current.answer} ».`}
              </p>
              <p className={styles.corrected}>
                <strong>{full(current, current.answer)}</strong>
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
