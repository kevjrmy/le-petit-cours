"use client";

import { useState } from "react";
import { Instructions, Meter, Score } from "@/components/exercice/Drill";
import { T } from "@/components/lang/T";
import { useLang } from "@/hooks/useLang";
import { Bilingue } from "../bilingue";
import { shuffle } from "@/lib/shuffle";
import { PARAGRAPHS, type Paragraph } from "./data";
import board from "@/components/exercice/Board.module.css";
import styles from "./drill.module.css";

/**
 * Relire un texte sans savoir ce qu'on y cherche.
 *
 * **Plusieurs fautes, en nombre variable, et aucune n'est signalée.** C'est ce
 * qui sépare cet exercice de `exercices/trouve-la-faute`, où chaque phrase en
 * contient une et une seule : ici il faut décider quand s'arrêter, et c'est la
 * moitié de la compétence. Chaque paragraphe contient aussi la forme bien
 * écrite, pour qu'on ne puisse pas cliquer le mot par réflexe.
 *
 * **Trois états de correction, pas deux** (`.claude/agents/exercise-author.md`).
 * Coché à raison, coché à tort, et **oublié** : ne pas voir une faute n'est pas
 * la même erreur que d'en inventer une, et l'ambre le dit là où le rouge
 * mentirait. Les trois classes sont partagées (`globals.css`), et chacune porte
 * une marque en plus de sa couleur.
 *
 * **Noté tout ou rien par paragraphe.** Trouver deux fautes sur trois n'est pas
 * une demi-relecture : le texte part à l'impression avec une faute dedans. Un
 * crédit partiel cacherait exactement la distinction que les trois états
 * existent pour montrer.
 *
 * Jamais rendu sur le serveur : le tirage est mélangé dans un initialiseur de
 * `useState`, et `drill.tsx` charge ce fichier avec `ssr: false`.
 */
export function Board() {
  const lang = useLang();
  const [deck, setDeck] = useState<Paragraph[]>(() => shuffle(PARAGRAPHS));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [picked, setPicked] = useState<number[]>([]);
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const current = deck[currentIndex];
  const faults = new Set(current.faults.map((fault) => fault.at));
  const wronglyPicked = picked.filter((index) => !faults.has(index));
  const missed = current.faults.filter((fault) => !picked.includes(fault.at));
  const perfect = wronglyPicked.length === 0 && missed.length === 0;

  /* Le verdict dit laquelle des deux erreurs a été commise, et il peut dire les
     deux : ne pas voir une faute et en inventer une sont deux relectures
     différentes, et c'est la raison d'être du troisième état. */
  const troublesFr = [
    missed.length === 1
      ? "une faute n’a pas été vue"
      : missed.length > 1 && `${missed.length} fautes n’ont pas été vues`,
    wronglyPicked.length === 1
      ? "un mot correct a été signalé"
      : wronglyPicked.length > 1 &&
        `${wronglyPicked.length} mots corrects ont été signalés`,
  ].filter((part): part is string => typeof part === "string");
  const troublesEs = [
    missed.length === 1
      ? "una falta no se ha visto"
      : missed.length > 1 && `${missed.length} faltas no se han visto`,
    wronglyPicked.length === 1
      ? "se ha señalado una palabra correcta"
      : wronglyPicked.length > 1 &&
        `se han señalado ${wronglyPicked.length} palabras correctas`,
  ].filter((part): part is string => typeof part === "string");
  const capital = (text: string) => `${text.charAt(0).toUpperCase()}${text.slice(1)}`;
  const summaryFr = capital(troublesFr.join(", et "));
  const summaryEs = capital(troublesEs.join(", y "));

  function restart() {
    setDeck(shuffle(PARAGRAPHS));
    setCurrentIndex(0);
    setPicked([]);
    setChecked(false);
    setScore(0);
    setFinished(false);
  }

  function verify() {
    setChecked(true);
    const missedNow = current.faults.filter((fault) => !picked.includes(fault.at));
    const wrongNow = picked.filter((index) => !faults.has(index));
    if (missedNow.length === 0 && wrongNow.length === 0) {
      setScore((value) => value + 1);
    }
  }

  function next() {
    if (currentIndex + 1 === deck.length) {
      setFinished(true);
      return;
    }
    setCurrentIndex((value) => value + 1);
    setPicked([]);
    setChecked(false);
  }

  if (finished) {
    return <Score score={score} total={deck.length} onRestart={restart} />;
  }

  return (
    <>
      <Instructions>
        <T
          fr={
            <>
              Cliquez sur <strong>tous</strong> les mots mal écrits, puis
              vérifiez. Leur nombre change d’un paragraphe à l’autre, et les
              mêmes mots sont parfois écrits correctement dans le même texte.
            </>
          }
          es={
            <>
              Haz clic en <strong>todas</strong> las palabras mal escritas y
              comprueba. Su número cambia de un párrafo a otro, y a veces las
              mismas palabras están bien escritas en el mismo texto.
            </>
          }
        />
      </Instructions>

      <Meter
        value={currentIndex + 1}
        max={deck.length}
        label={{ fr: "Paragraphe en cours", es: "Párrafo actual" }}
      />

      <div className={`card ${board.card}`}>
        <p
          className={board.words}
          role="group"
          aria-label={lang === "es" ? "Párrafo que releer" : "Paragraphe à relire"}
        >
          {current.words.map((word, index) => {
            const isPicked = picked.includes(index);
            const isFault = faults.has(index);
            const state = !checked
              ? ""
              : isPicked && isFault
                ? "is-correct"
                : isPicked
                  ? "is-wrong"
                  : isFault
                    ? "is-missed"
                    : "";
            const mark =
              !checked || !state
                ? null
                : state === "is-correct"
                  ? "✓"
                  : state === "is-wrong"
                    ? "✗"
                    : "+";

            return (
              <button
                key={`${currentIndex}-${index}`}
                type="button"
                className={`${board.word} ${isPicked && !checked ? `is-chosen ${styles.picked}` : ""} ${state}`}
                disabled={checked}
                aria-pressed={isPicked}
                onClick={() =>
                  setPicked((previous) =>
                    previous.includes(index)
                      ? previous.filter((value) => value !== index)
                      : [...previous, index],
                  )
                }
              >
                {word}
                {mark && (
                  <span className={styles.mark} aria-hidden="true">
                    {mark}
                  </span>
                )}
              </button>
            );
          })}
        </p>

        {/* Rendu vide plutôt que conditionnellement, pour que la zone existe
            avant que le verdict n'y arrive et soit annoncée. */}
        <div role="status">
          {checked && (
            <div
              className={`${board.verdict} ${perfect ? "is-correct" : "is-wrong"}`}
            >
              <p>
                {perfect ? (
                  current.faults.length === 1 ? (
                    <T
                      fr="✓ Relecture juste : la seule faute du paragraphe est trouvée."
                      es="✓ Relectura correcta: has encontrado la única falta del párrafo."
                    />
                  ) : (
                    <T
                      fr={`✓ Relecture juste : les ${current.faults.length} fautes sont trouvées, et rien de correct n’a été signalé.`}
                      es={`✓ Relectura correcta: has encontrado las ${current.faults.length} faltas y no has señalado nada correcto.`}
                    />
                  )
                ) : (
                  <T fr={`✗ ${summaryFr}.`} es={`✗ ${summaryEs}.`} />
                )}
              </p>

              <p className={board.corrected}>
                {current.words
                  .map((word, index) => {
                    const fault = current.faults.find((item) => item.at === index);
                    return fault ? fault.fix : word;
                  })
                  .join(" ")}
              </p>

              <ul className={styles.corrections}>
                {current.faults.map((fault) => (
                  <li key={fault.at}>
                    <span className={styles.swap}>
                      {current.words[fault.at]} → <strong>{fault.fix}</strong>
                    </span>{" "}
                    <Bilingue text={fault.because} />
                  </li>
                ))}
              </ul>
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
              <T fr="Paragraphe suivant" es="Párrafo siguiente" />
            )}
          </button>
        ) : (
          <button
            type="button"
            className="button button-primary"
            disabled={picked.length === 0}
            onClick={verify}
          >
            <T fr="Vérifier" es="Comprobar" />
          </button>
        )}
      </div>
    </>
  );
}
