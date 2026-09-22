"use client";

import { useState } from "react";
import { Instructions, Meter, Score } from "@/components/exercice/Drill";
import styles from "./Faute.module.css";

/**
 * « Trouvez la faute » — la phrase arrive entière, il faut voir le mot fautif.
 *
 * **C'est l'exercice qui vise la vraie difficulté.** « Laquelle des deux ? »
 * pose la question à la place de l'apprenant : le trou est déjà creusé, il ne
 * reste qu'à choisir. Or ce qui manque à un locuteur d'origine, ce n'est pas
 * de choisir, c'est de voir — sa phrase lui paraît finie. Ici rien n'est
 * signalé : la phrase est celle qu'il a écrite, et le mot fautif ne se
 * distingue pas des autres.
 *
 * **Un clic, pas deux.** La version du cours (`exercices/trouve-la-faute`)
 * demande ensuite la correction, et compte l'item faux si l'une des deux
 * étapes rate. Ici la correction s'affiche toute seule : l'exercice d'atelier
 * se fait en classe, à voix haute, et c'est le professeur qui demande
 * pourquoi.
 *
 * Les mots sont des `<button>` et non des `<span>` cliquables : c'est ce qui
 * les met dans l'ordre de tabulation et leur donne un état annonçable.
 *
 * Pas de mélange, comme dans `Choix.tsx` : l'ordre suit le texte, la page reste
 * prérendue, et rien n'est enregistré (#2, #80).
 */

export interface FauteItem {
  /** La phrase découpée en mots, ponctuation collée au mot qu'elle suit. */
  mots: string[];
  /** L'index du mot fautif dans `mots`. Un seul par phrase. */
  fautif: number;
  /** Ce qu'il fallait écrire à la place. */
  correction: string;
  /** La raison, en une phrase. */
  pourquoi: string;
}

export function Faute({ items }: { items: FauteItem[] }) {
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const current = items[index];
  const answered = picked !== null;
  const right = picked === current.fautif;

  function choose(at: number) {
    if (answered) return;
    setPicked(at);
    if (at === current.fautif) setScore((s) => s + 1);
  }

  function next() {
    if (index + 1 === items.length) {
      setFinished(true);
      return;
    }
    setIndex((i) => i + 1);
    setPicked(null);
  }

  function restart() {
    setIndex(0);
    setPicked(null);
    setScore(0);
    setFinished(false);
  }

  if (finished) {
    return <Score score={score} total={items.length} onRestart={restart} />;
  }

  return (
    <>
      <Instructions>
        Une seule faute par phrase. Cliquez sur le mot qui ne va pas.
      </Instructions>

      <Meter
        value={index + (answered ? 1 : 0)}
        max={items.length}
        label="Avancement de l’exercice"
      />

      <div className={styles.card}>
        <p className={styles.sentence}>
          {current.mots.map((mot, at) => {
            /* Après la réponse, le mot fautif est toujours marqué, même quand
               l'apprenant a cliqué ailleurs : sans cela un item raté
               n'apprendrait rien. */
            const state = !answered
              ? ""
              : at === current.fautif
                ? "is-wrong"
                : at === picked
                  ? "is-missed"
                  : "";

            return (
              <button
                key={`${mot}-${at}`}
                type="button"
                className={`${styles.mot} ${state}`}
                onClick={() => choose(at)}
                disabled={answered}
              >
                {mot}
              </button>
            );
          })}
        </p>

        {answered && (
          <div className={styles.verdict} role="status">
            <p className={styles.corrected}>
              {current.mots.map((mot, at) =>
                at === current.fautif ? (
                  <strong key={at}>{current.correction} </strong>
                ) : (
                  <span key={at}>{mot} </span>
                ),
              )}
            </p>
            <p className={styles.pourquoi}>
              <strong>{right ? "Trouvée." : "Ce n’était pas celui-là."}</strong>{" "}
              {current.pourquoi}
            </p>
          </div>
        )}

        {answered && (
          <div className={styles.actions}>
            <button type="button" className="button" onClick={next}>
              {index + 1 === items.length ? "Terminer" : "Suivante"}
            </button>
          </div>
        )}
      </div>
    </>
  );
}
