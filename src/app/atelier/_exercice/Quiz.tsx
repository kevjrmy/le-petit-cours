"use client";

import { useState } from "react";
import board from "@/components/exercice/Board.module.css";
import { Instructions, Meter } from "@/components/exercice/Drill";
import { Bilan } from "./Bilan";
import choix from "./Choix.module.css";
import styles from "./Quiz.module.css";

/**
 * Un quiz d'atelier en deux clics par question (#80).
 *
 * **D'abord l'écriture, ensuite la réponse.** La même question arrive écrite
 * de quatre façons, dont une seule est juste. Il faut la reconnaître pour
 * avoir le droit de répondre ; la réponse, elle, est une affaire de
 * connaissance. **Le point demande les deux** : une question mal lue est
 * perdue comme une mauvaise réponse, sans seconde chance.
 *
 * **Une faute par écriture, et les données le garantissent.** Une écriture
 * fausse n'est pas tapée à la main : c'est la question, où un seul morceau
 * (`juste`) est remplacé par un autre (`faux`). Trois phrases recopiées à la
 * main finiraient par différer en deux endroits, et l'élève chercherait une
 * faute qui n'est pas celle qu'on voulait. Le même découpage permet de barrer
 * le morceau fautif après le clic.
 *
 * **Une question perdue enseigne quand même** : la bonne écriture est
 * marquée, chaque faute est barrée avec sa raison, et la réponse est donnée.
 *
 * **Aucun mélange**, pour la raison de `Choix.tsx` : la page reste prérendue.
 * `place` dit où s'affiche la bonne écriture, et c'est aux données de la
 * déplacer d'une question à l'autre, comme la bonne réponse.
 *
 * Rien n'est enregistré et rien ne coche (#2, #80).
 */

/** Une écriture fausse : un morceau de la question, remplacé. */
export interface QuizFaute {
  /** Le morceau tel qu'il est dans la question. Il n'y figure qu'une fois. */
  juste: string;
  /** Ce qui le remplace dans l'écriture fausse. */
  faux: string;
  /** La raison, en une phrase. Elle s'affiche sous l'écriture après le clic. */
  pourquoi: string;
}

export interface QuizItem {
  /** La question, bien écrite. */
  question: string;
  /** Les trois écritures fausses, une faute chacune. */
  fautes: [QuizFaute, QuizFaute, QuizFaute];
  /** Où s'affiche la bonne écriture parmi les quatre, de 0 à 3. */
  place: 0 | 1 | 2 | 3;
  /** Les quatre réponses, dans l'ordre où elles s'affichent. */
  reponses: [string, string, string, string];
  /** Celle qui est juste. Doit être l'une des quatre. */
  bonne: string;
  /** Ce qu'on ajoute à la réponse, en une ou deux phrases. */
  pourquoi: string;
}

export function Quiz({
  items,
  consigne,
  nom,
}: {
  items: QuizItem[];
  /** La consigne, écrite par la page : c'est elle qui sait si elle tutoie. */
  consigne: string;
  /** Le nom accessible de la jauge ; deux plateaux d'une page n'en partagent pas un. */
  nom: string;
}) {
  const [index, setIndex] = useState(0);
  const [ecrit, setEcrit] = useState<number | null>(null);
  const [reponse, setReponse] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const current = items[index];
  /* Les quatre écritures dans l'ordre d'affichage ; `null` est la bonne. */
  const ecritures: (QuizFaute | null)[] = [...current.fautes];
  ecritures.splice(current.place, 0, null);

  const lue = ecrit !== null;
  const bienLue = ecrit === current.place;
  const repondue = reponse !== null;
  const finie = lue && (!bienLue || repondue);

  function lire(at: number) {
    if (lue) return;
    setEcrit(at);
  }

  function repondre(option: string) {
    if (repondue) return;
    setReponse(option);
    if (option === current.bonne) setScore((s) => s + 1);
  }

  function next() {
    if (index + 1 === items.length) {
      setFinished(true);
      return;
    }
    setIndex((i) => i + 1);
    setEcrit(null);
    setReponse(null);
  }

  function restart() {
    setIndex(0);
    setEcrit(null);
    setReponse(null);
    setScore(0);
    setFinished(false);
  }

  if (finished) {
    const share = score / items.length;
    return (
      <Bilan
        score={score}
        total={items.length}
        onRestart={restart}
        message={
          share === 1
            ? "Sans faute. Victoire nette !"
            : share >= 0.7
              ? "Belle victoire. Pour chaque point perdu, demande-toi : c’était le football ou le français ?"
              : "Match difficile. Rejoue-le : les fautes étaient barrées, les réponses étaient données."
        }
      />
    );
  }

  return (
    <>
      <Instructions>{consigne}</Instructions>

      <Meter
        value={index + (finie ? 1 : 0)}
        max={items.length}
        label={`Avancement : ${nom}`}
      />

      <div className={`card ${board.card}`}>
        <p className={styles.etape}>Quelle question est bien écrite ?</p>

        <div
          className={styles.ecritures}
          role="group"
          aria-label="Quatre écritures de la question"
        >
          {ecritures.map((faute, at) => {
            const state = !lue
              ? ""
              : faute === null
                ? "is-correct"
                : at === ecrit
                  ? "is-wrong"
                  : "";
            const [avant, apres] =
              faute === null ? [current.question, ""] : current.question.split(faute.juste);

            return (
              <div key={`${index}-${at}`}>
                <button
                  type="button"
                  className={`${styles.ecriture} ${state}`}
                  onClick={() => lire(at)}
                  disabled={lue}
                >
                  <span className={choix.mark} aria-hidden="true">
                    {state === "is-correct" ? "✓" : state === "is-wrong" ? "✗" : ""}
                  </span>
                  <span>
                    {avant}
                    {faute !== null &&
                      (lue ? <s className="fr">{faute.faux}</s> : faute.faux)}
                    {apres}
                  </span>
                </button>

                {lue && faute !== null && (
                  <p className={styles.raison}>{faute.pourquoi}</p>
                )}
              </div>
            );
          })}
        </div>

        {lue && !bienLue && (
          <p className={choix.pourquoi} role="status">
            <strong>Question perdue.</strong> La bonne écriture est marquée ✓.
            La réponse était : <span className="fr">{current.bonne}</span>.{" "}
            {current.pourquoi}
          </p>
        )}

        {bienLue && (
          <>
            <p className={`${styles.etape} ${styles.suite}`} role="status">
              Bien vu. Maintenant, réponds à la question.
            </p>

            <div className={choix.options}>
              {current.reponses.map((option) => {
                const state = !repondue
                  ? ""
                  : option === current.bonne
                    ? "is-correct"
                    : option === reponse
                      ? "is-wrong"
                      : "";

                return (
                  <button
                    key={`${index}-${option}`}
                    type="button"
                    className={`${choix.option} ${state}`}
                    onClick={() => repondre(option)}
                    disabled={repondue}
                  >
                    <span className={choix.mark} aria-hidden="true">
                      {state === "is-correct" ? "✓" : state === "is-wrong" ? "✗" : ""}
                    </span>
                    {option}
                  </button>
                );
              })}
            </div>
          </>
        )}

        {repondue && (
          <p className={choix.pourquoi} role="status">
            <strong>{reponse === current.bonne ? "Juste." : "Non."}</strong>{" "}
            {current.pourquoi}
          </p>
        )}

        {finie && (
          <div className={board.actions}>
            <button type="button" className="button" onClick={next}>
              {index + 1 === items.length ? "Terminer" : "Suivante"}
            </button>
          </div>
        )}
      </div>
    </>
  );
}
