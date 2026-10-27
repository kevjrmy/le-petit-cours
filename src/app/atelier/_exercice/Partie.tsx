"use client";

import { useState } from "react";
import { Instructions, Meter } from "@/components/exercice/Drill";
import { Bilan } from "./Bilan";
import board from "@/components/exercice/Board.module.css";
import choix from "./Choix.module.css";

/**
 * « Dans quelle partie ? » — une phrase arrive seule, il faut dire où elle va
 * dans le texte (#80).
 *
 * **C'est `Choix` avec plus de deux réponses, et sans trou** : la phrase est
 * entière, ce qu'on cherche est sa place dans le plan. Les réponses sont les
 * mêmes pour tout le plateau (`parties`), données par la page, et elles
 * gardent leur ordre d'un item à l'autre : on apprend un plan, pas une
 * devinette.
 *
 * **Une seule réponse défendable par phrase** (`AGENTS.md` §9) : chaque
 * phrase porte son indice (une minute, « à mon avis », « qui, où, quand »).
 * Une phrase qui pourrait aller dans deux parties n'a rien à faire ici.
 *
 * Les styles sont ceux de `Choix`. Pas de mélange, rien d'enregistré (#2,
 * #80).
 */

export interface PartieItem {
  /** La phrase, entière. */
  phrase: string;
  /** La partie où elle va. Doit être l'une de `parties`. */
  bonne: string;
  /** La raison, en une phrase. Elle s'affiche après le clic, juste ou non. */
  pourquoi: string;
}

export function Partie({
  items,
  parties,
  consigne,
  nom,
}: {
  items: PartieItem[];
  /** Les réponses possibles, dans l'ordre du texte. */
  parties: string[];
  /** La consigne, écrite par la page : c'est elle qui sait si elle tutoie. */
  consigne: string;
  /** Le nom accessible de la jauge ; deux plateaux d'une page n'en partagent pas un. */
  nom: string;
}) {
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const current = items[index];
  const answered = picked !== null;
  const right = picked === current.bonne;

  function choose(partie: string) {
    if (answered) return;
    setPicked(partie);
    if (partie === current.bonne) setScore((s) => s + 1);
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
    return <Bilan score={score} total={items.length} onRestart={restart} />;
  }

  return (
    <>
      <Instructions>{consigne}</Instructions>

      <Meter
        value={index + (answered ? 1 : 0)}
        max={items.length}
        label={`Avancement : ${nom}`}
      />

      <div className={`card ${board.card}`}>
        <p className={choix.sentence}>{current.phrase}</p>

        <div className={choix.options} role="group" aria-label="Les parties du texte">
          {parties.map((partie) => {
            const state = !answered
              ? ""
              : partie === current.bonne
                ? "is-correct"
                : partie === picked
                  ? "is-wrong"
                  : "";

            return (
              <button
                key={partie}
                type="button"
                className={`${choix.option} ${state}`}
                onClick={() => choose(partie)}
                disabled={answered}
              >
                <span className={choix.mark} aria-hidden="true">
                  {state === "is-correct" ? "✓" : state === "is-wrong" ? "✗" : ""}
                </span>
                {partie}
              </button>
            );
          })}
        </div>

        {answered && (
          <p className={choix.pourquoi} role="status">
            <strong>{right ? "Juste." : "Non."}</strong> {current.pourquoi}
          </p>
        )}

        {answered && (
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
