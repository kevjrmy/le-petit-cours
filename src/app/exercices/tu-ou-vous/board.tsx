"use client";

import { useState } from "react";
import { Instructions, Meter, Score } from "@/components/exercice/Drill";
import { shuffle } from "@/lib/shuffle";
import { bankFor, type SituationItem } from "./data";
import styles from "./drill.module.css";

/**
 * Une situation à la fois, les formules en boutons.
 *
 * **Cliquer plutôt que taper** : il n'y a rien à orthographier, la difficulté
 * est de choisir (`AGENTS.md` §9). Le lot et l'ordre des choix sont mélangés
 * une fois, à la première peinture : le plateau n'est donc jamais rendu par le
 * serveur (`drill.tsx`). L'état garde les noms du brief : `deck`,
 * `currentIndex`, `checked`, `score`, `finished`.
 *
 * La situation et la correction sont en espagnol (#85), les formules en
 * français (`lang="fr"`).
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

function deal(): SituationItem[] {
  return shuffle(bankFor()).map((item) => ({
    ...item,
    options: shuffle(item.options),
  }));
}

export function Board() {
  const [deck, setDeck] = useState(deal);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const current = deck[currentIndex];
  const right = picked === current.answer;
  const last = currentIndex + 1 === deck.length;

  function restart() {
    setDeck(deal());
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
    if (last) {
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
          Lee la situación, haz clic en lo que dirías y comprueba.
        </span>
      </Instructions>

      <Meter value={currentIndex + 1} max={deck.length} label="Situation en cours" />

      <div className={styles.card}>
        <p className={styles.situation} lang="es">
          {current.situation}
        </p>

        <div className={styles.pool} role="group" aria-label="Que dites-vous ?">
          {current.options.map((option) => {
            const state = checked
              ? option === current.answer
                ? "is-correct"
                : option === picked
                  ? "is-wrong"
                  : ""
              : "";
            return (
              <button
                key={option}
                type="button"
                className={`${styles.chip} ${picked === option ? styles.chosen : ""} ${state}`}
                disabled={checked}
                aria-pressed={picked === option}
                onClick={() => setPicked(option)}
              >
                {option}
              </button>
            );
          })}
        </div>

        <div role="status">
          {checked && (
            <div
              className={`${styles.verdict} ${right ? "is-correct" : "is-wrong"}`}
            >
              <p>
                {right ? "✓ Juste." : `✗ La réponse : « ${current.answer} »`}
              </p>
              <p lang="es">{french(current.because)}</p>
            </div>
          )}
        </div>
      </div>

      <div className={styles.actions}>
        {checked ? (
          <button type="button" className="button button-primary" onClick={next}>
            {last ? "Voir mon score" : "Situation suivante"}
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
