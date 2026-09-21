"use client";

import { useState } from "react";
import { Instructions, Meter, Score } from "@/components/exercice/Drill";
import { shuffle } from "@/lib/shuffle";
import { PARAGRAPHS, type Paragraph } from "./data";
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
  const troubles = [
    missed.length === 1
      ? "une faute n’a pas été vue"
      : missed.length > 1 && `${missed.length} fautes n’ont pas été vues`,
    wronglyPicked.length === 1
      ? "un mot correct a été signalé"
      : wronglyPicked.length > 1 &&
        `${wronglyPicked.length} mots corrects ont été signalés`,
  ].filter((part): part is string => typeof part === "string");
  const summary = troubles.join(", et ");

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
        Cliquez sur <strong>tous</strong> les mots mal écrits, puis vérifiez.
        Leur nombre change d’un paragraphe à l’autre, et les mêmes mots sont
        parfois écrits correctement dans le même texte.
      </Instructions>

      <Meter
        value={currentIndex + 1}
        max={deck.length}
        label="Paragraphe en cours"
      />

      <div className={styles.card}>
        <p
          className={styles.paragraph}
          role="group"
          aria-label="Paragraphe à relire"
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
                className={`${styles.word} ${isPicked && !checked ? styles.picked : ""} ${state}`}
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
              className={`${styles.verdict} ${perfect ? "is-correct" : "is-wrong"}`}
            >
              <p>
                {perfect
                  ? current.faults.length === 1
                    ? "✓ Relecture juste : la seule faute du paragraphe est trouvée."
                    : `✓ Relecture juste : les ${current.faults.length} fautes sont trouvées, et rien de correct n’a été signalé.`
                  : `✗ ${summary.charAt(0).toUpperCase()}${summary.slice(1)}.`}
              </p>

              <p className={styles.corrected}>
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
                    {fault.because}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className={styles.actions}>
        {checked ? (
          <button type="button" className="button button-primary" onClick={next}>
            {currentIndex + 1 === deck.length
              ? "Voir mon score"
              : "Paragraphe suivant"}
          </button>
        ) : (
          <button
            type="button"
            className="button button-primary"
            disabled={picked.length === 0}
            onClick={verify}
          >
            Vérifier
          </button>
        )}
      </div>
    </>
  );
}
