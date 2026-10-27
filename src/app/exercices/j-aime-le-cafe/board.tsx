"use client";

import { useState } from "react";
import { T } from "@/components/lang/T";
import { useLang } from "@/hooks/useLang";
import { shuffle } from "@/lib/shuffle";
import { Bilingue } from "../bilingue";
import { Instructions, Meter, Score } from "@/components/exercice/Drill";
import { ITEMS, POOL, glue, type Form, type GoutItem } from "./data";
import board from "@/components/exercice/Board.module.css";

/**
 * Une phrase à la fois, les neuf formes toujours à l'écran, la manche mélangée (`ssr: false`).
 *
 * **Cliquer plutôt que taper** : il n'y a rien à orthographier, la difficulté
 * est de choisir (`AGENTS.md` §9). **Le tirage ne bouge pas** (définis puis
 * indéfinis) : on retrouve le paradigme, on ne l'élimine pas.
 *
 * Le lot est mélangé dans l’initialiseur, d’où `ssr: false` dans drill.tsx. L'état garde
 * les noms du brief : `deck`, `currentIndex`, `checked`, `score`, `finished`.
 *
 * Le plateau est en français (`lang="fr"`) ; la consigne, les étiquettes et la
 * correction, qui explique, existent en espagnol et en français (#85, #102) :
 * `<T>` pour le texte visible, `useLang()` pour les attributs.
 */
export function Board() {
  const lang = useLang();
  const [deck, setDeck] = useState<GoutItem[]>(() => shuffle(ITEMS));
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

  return (
    <div lang="fr">
      <Instructions>
        <T
          fr="Cliquez sur l’article qui complète la phrase, puis vérifiez. Les neuf formes restent toujours dans le même ordre."
          es="Haz clic en el artículo que completa la frase, y comprueba. Las nueve formas se quedan siempre en el mismo orden."
        />
      </Instructions>

      <Meter value={currentIndex + 1} max={deck.length} label={{ fr: "Phrase en cours", es: "Frase en curso" }} />

      <div className={`card ${board.card}`}>
        <p className={board.sentence}>
          {`${current.before} `}
          <span
            className={`${board.slot} ${picked ? board.filled : ""} ${
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
                <span className="visually-hidden">
                  <T fr="blanc à compléter" es="hueco por completar" />
                </span>
              </>
            )}
          </span>
          {picked ? glue(picked) : " "}
          {current.noun}
          {current.after}
        </p>

        <div className={board.pool} role="group" aria-label={lang === "es" ? "Las nueve formas" : "Les neuf formes"}>
          {POOL.map((form) => (
            <button
              key={form}
              type="button"
              className={`${board.chip} ${picked === form ? "is-chosen" : ""}`}
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
              className={`${board.verdict} ${right ? "is-correct" : "is-wrong"}`}
            >
              <p>
                {right ? (
                  <T fr="✓ Juste." es="✓ Correcto." />
                ) : (
                  <T
                    fr={`✗ La réponse : « ${current.answer} ».`}
                    es={`✗ La respuesta: « ${current.answer} ».`}
                  />
                )}
              </p>
              <p className={board.corrected}>
                {`${current.before} `}
                <strong>{current.answer}</strong>
                {glue(current.answer)}
                {current.noun}
                {current.after}
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
