"use client";

import { useState } from "react";
import { Instructions, Meter, Score } from "@/components/exercice/Drill";
import { T } from "@/components/lang/T";
import { useLang } from "@/hooks/useLang";
import { shuffle } from "@/lib/shuffle";
import { Bilingue } from "../bilingue";
import { ITEMS, POOL, label, sentence, type Form } from "./data";
import board from "@/components/exercice/Board.module.css";
import styles from "./drill.module.css";

/**
 * Une phrase à la fois, les sept pastilles toujours à l'écran dans le même
 * ordre. **Cliquer plutôt que taper** : rien à orthographier, la difficulté
 * est de choisir (`AGENTS.md` §9). Le tirage des phrases est mélangé une fois
 * par partie, avec l'unique `shuffle()` ; le plateau n'est donc jamais rendu
 * sur le serveur (`drill.tsx`). L’état garde les noms du brief. La consigne, les
 * étiquettes, la pista et la correction existent en espagnol et en français
 * (#85, #102) : `<T>` pour le texte visible, `useLang()` pour les attributs.
 */
export function Board() {
  const lang = useLang();
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
      className={`${board.slot} ${picked ? board.filled : ""} ${
        checked ? (right ? "is-correct" : "is-wrong") : ""
      }`}
    >
      {picked ? (
        label(picked)
      ) : (
        <>
          <span aria-hidden="true">{"    "}</span>
          <span className="visually-hidden">
            <T fr="blanc à compléter" es="hueco por completar" />
          </span>
        </>
      )}
    </span>
  );

  return (
    <div lang="fr">
      <Instructions>
        <T
          fr={
            <>
              Cliquez sur ce qui complète la phrase, puis vérifiez.{" "}
              <span lang="fr">∅</span> veut dire qu’il ne manque rien. Les
              pastilles restent toujours dans le même ordre.
            </>
          }
          es={
            <>
              Haz clic en lo que completa la frase, y comprueba.{" "}
              <span lang="fr">∅</span> significa que no falta nada. Las
              pastillas se quedan siempre en el mismo orden.
            </>
          }
        />
      </Instructions>

      <Meter value={currentIndex + 1} max={deck.length} label={{ fr: "Phrase en cours", es: "Frase en curso" }} />

      <div className={`card ${board.card}`}>
        {current.hint && (
          <p className={styles.hint}>
            <Bilingue text={current.hint} />
          </p>
        )}
        <p className={board.sentence}>
          {current.before && `${current.before} `}
          {slot}
          {` ${current.after}`}
        </p>

        <div className={board.pool} role="group" aria-label={lang === "es" ? "Las siete posibilidades" : "Les sept possibilités"}>
          {POOL.map((form) => (
            <button
              key={form}
              type="button"
              className={`${board.chip} ${picked === form ? "is-chosen" : ""}`}
              disabled={checked}
              aria-pressed={picked === form}
              aria-label={
                form === "rien"
                  ? lang === "es" ? "rien, ninguna palabra" : "rien, aucun mot"
                  : undefined
              }
              onClick={() => setPicked(form)}
            >
              {label(form)}
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
                    fr={`✗ La réponse : « ${label(current.answer)} ».`}
                    es={`✗ La respuesta: « ${label(current.answer)} ».`}
                  />
                )}
              </p>
              <p className={board.corrected}>{sentence(current, current.answer)}</p>
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
