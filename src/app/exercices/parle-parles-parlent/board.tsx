"use client";

import { useState } from "react";
import { Instructions, Meter, Score } from "@/components/exercice/Drill";
import { T } from "@/components/lang/T";
import { useLang } from "@/hooks/useLang";
import { shuffle } from "@/lib/shuffle";
import { Bilingue } from "../bilingue";
import { ITEMS, full, glue, poolFor, shown } from "./data";
import board from "@/components/exercice/Board.module.css";
import styles from "./drill.module.css";

/**
 * Una frase a la vez. Le lot est mélangé dans un initialiseur paresseux : c'est
 * pourquoi `drill.tsx` charge ce plateau avec `ssr: false`. Les tirages (six
 * terminaisons, ou `je` / `j’`) restent dans le même ordre : on retrouve le
 * paradigme, on ne l'élimine pas. **Cliquer plutôt que taper** : la difficulté
 * est de choisir la terminaison, pas de trouver un accent (`AGENTS.md` §9).
 *
 * L’état garde les noms du brief. La consigne, les étiquettes et la correction
 * existent en espagnol et en français (#85, #102) : `<T>` pour le texte
 * visible, `useLang()` pour les attributs.
 */
export function Board() {
  const lang = useLang();
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
        <T
          fr="Cliquez sur ce qui manque, puis vérifiez. La terminaison s’écrit même si on ne l’entend pas."
          es="Haz clic en lo que falta y comprueba. La terminación se escribe aunque no se oiga."
        />
      </Instructions>

      <Meter value={currentIndex + 1} max={deck.length} label={{ fr: "Phrase en cours", es: "Frase en curso" }} />

      <div className={`card ${board.card}`}>
        <p>
          <T fr="Verbe :" es="Verbo:" /> <span className={styles.verb}>{current.verb}</span>
        </p>

        <p className={board.sentence}>
          {current.before}
          <span
            className={`${board.slot} ${styles.slot} ${picked ? board.filled : ""} ${
              checked ? (right ? "is-correct" : "is-wrong") : ""
            }`}
          >
            {picked ? (
              shown(current, picked)
            ) : (
              <>
                <span aria-hidden="true">{"  "}</span>
                <span className="visually-hidden">
                  <T fr="blanc à compléter" es="hueco por completar" />
                </span>
              </>
            )}
          </span>
          {picked ? glue(current, picked) : current.kind === "sujet" ? " " : ""}
          {current.after}
        </p>

        <div
          className={board.pool}
          role="group"
          aria-label={
            current.kind === "fin"
              ? lang === "es" ? "Las terminaciones" : "Les terminaisons"
              : lang === "es" ? "El sujeto" : "Le sujet"
          }
        >
          {pool.map((form) => (
            <button
              key={form}
              type="button"
              className={`${board.chip} ${picked === form ? "is-chosen" : ""}`}
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
              className={`${board.verdict} ${right ? "is-correct" : "is-wrong"}`}
            >
              <p>
                {right ? (
                  <T fr="✓ Juste." es="✓ Correcto." />
                ) : (
                  <T
                    fr={`✗ La réponse : « ${current.kind === "fin" ? "-" : ""}${current.answer} ».`}
                    es={`✗ La respuesta: « ${current.kind === "fin" ? "-" : ""}${current.answer} ».`}
                  />
                )}
              </p>
              <p className={board.corrected}>
                <strong>{full(current, current.answer)}</strong>
              </p>
              <p>
                <Bilingue text={current.because} />
              </p>
            </div>
          )}
        </div>
      </div>

      <div className={board.actions}>
        {checked ? (
          <button type="button" className="button button-primary" onClick={next}>
            {currentIndex + 1 === deck.length ? (
              <T fr="Voir mon score" es="Ver mi puntuación" />
            ) : (
              <T fr="Phrase suivante" es="Frase siguiente" />
            )}
          </button>
        ) : (
          <button
            type="button"
            className="button button-primary"
            disabled={picked === null}
            onClick={verify}
          >
            <T fr="Vérifier" es="Comprobar" />
          </button>
        )}
      </div>
    </div>
  );
}
