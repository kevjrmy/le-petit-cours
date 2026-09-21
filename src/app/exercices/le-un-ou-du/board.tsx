"use client";

import { useState } from "react";
import { Instructions, Meter, Score } from "@/components/exercice/Drill";
import type { Level } from "@/data/navigation";
import { NOTHING, bankFor, blanksOf, type Piece } from "./data";
import styles from "./drill.module.css";

/**
 * Un texte à trous, et un tirage d'articles qui ne bouge jamais.
 *
 * **Le texte entier est le contexte, et c'est la mécanique.** Une phrase isolée
 * ne peut pas demander le passage de *un chien* à *le chien* ; un paragraphe,
 * si. Les trous se remplissent donc dans l'ordre de la lecture, et la
 * correction arrive d'un coup, à la fin : corriger trou par trou donnerait la
 * réponse du suivant.
 *
 * **Le tirage est fixe**, les définis puis les indéfinis puis les partitifs.
 * On y retrouve le paradigme au lieu d'éliminer trois distracteurs, ce qui
 * serait un QCM déguisé (`.claude/agents/exercise-author.md`).
 *
 * **Rien n'est aléatoire ici**, donc ce plateau se rend sur le serveur sans
 * risque : il n'y a pas de deck à mélanger, et le premier rendu est le texte
 * plutôt que « Préparation de l'exercice… ». C'est pour cela que `drill.tsx`
 * ne passe pas par `dynamic({ ssr: false })`, contrairement aux plateaux qui
 * tirent au sort.
 */

/** Les quelques mots autour du trou, pour que la correction se situe. */
function around(text: Piece[], index: number): { before: string; after: string } {
  const previous = text[index - 1];
  const next = text[index + 1];
  const before =
    typeof previous === "string" ? previous.trimEnd().split(" ").slice(-4).join(" ") : "";
  const after =
    typeof next === "string" ? next.trimStart().split(" ").slice(0, 3).join(" ") : "";
  return { before, after };
}

export function Board({ level }: { level: Level | null }) {
  /* Lu une seule fois : `drill.tsx` remonte ce composant quand le niveau
     change, donc le texte et le tirage changent ensemble (#68). */
  const bank = bankFor(level);
  const blanks = blanksOf(bank);

  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [active, setActive] = useState<string>(blanks[0]?.id ?? "");
  const [checked, setChecked] = useState(false);
  const [finished, setFinished] = useState(false);

  const filled = blanks.filter((blank) => answers[blank.id] !== undefined);
  const wrong = blanks.filter((blank) => answers[blank.id] !== blank.answer);
  const score = blanks.length - wrong.length;

  function restart() {
    setAnswers({});
    setActive(blanks[0]?.id ?? "");
    setChecked(false);
    setFinished(false);
  }

  /* Remplit le trou courant, puis avance jusqu'au premier trou encore vide —
     en repartant du début si les suivants sont déjà faits, pour qu'une
     correction en fin de texte ne laisse pas le curseur nulle part.

     **Sans trou courant, la pioche ne fait rien**, et les pastilles sont
     éteintes pour le dire. Retomber sur le premier trou serait réécrire une
     réponse déjà donnée sur un clic que personne n'a voulu : une fois le texte
     rempli, on revient sur un trou avant d'en changer. */
  function pick(word: string) {
    if (!active) return;
    const next = { ...answers, [active]: word };
    setAnswers(next);
    const order = blanks.map((blank) => blank.id);
    const from = order.indexOf(active);
    const rest = [...order.slice(from + 1), ...order.slice(0, from + 1)];
    setActive(rest.find((id) => next[id] === undefined) ?? "");
  }

  if (finished) {
    return <Score score={score} total={blanks.length} onRestart={restart} />;
  }

  return (
    <>
      <Instructions>
        Cliquez sur un trou, puis sur l’article qui convient. Le texte se lit
        d’un bout à l’autre : c’est lui qui décide, pas le trou tout seul.
      </Instructions>

      <Meter value={filled.length} max={blanks.length} label="Trous remplis" />

      <div className={styles.card}>
        <p className={styles.text}>
          {bank.text.map((piece, index) => {
            if (typeof piece === "string") return <span key={index}>{piece}</span>;

            const position = blanks.findIndex((blank) => blank.id === piece.id);
            const chosen = answers[piece.id];
            const right = chosen === piece.answer;

            return (
              <button
                key={piece.id}
                type="button"
                className={`${styles.slot} ${chosen ? styles.filled : ""} ${
                  active === piece.id && !checked ? styles.active : ""
                } ${checked ? (right ? "is-correct" : "is-wrong") : ""}`}
                disabled={checked}
                aria-pressed={active === piece.id && !checked}
                aria-label={
                  chosen
                    ? `Trou ${position + 1} sur ${blanks.length}, rempli avec ${chosen}`
                    : `Trou ${position + 1} sur ${blanks.length}, à compléter`
                }
                onClick={() => setActive(piece.id)}
              >
                <span aria-hidden="true">{chosen ?? "   "}</span>
              </button>
            );
          })}
        </p>

        <div className={styles.pool} role="group" aria-label="Les articles">
          {bank.pool.map((word) => (
            <button
              key={word}
              type="button"
              className={`${styles.chip} ${word === NOTHING ? styles.nothing : ""}`}
              disabled={checked || !active}
              onClick={() => pick(word)}
            >
              {word}
            </button>
          ))}
        </div>

        {/* Rendu vide plutôt que conditionnellement, pour que la zone existe
            avant que le verdict n'y arrive et soit annoncée. */}
        <div role="status">
          {checked && (
            <>
              <p className={wrong.length === 0 ? "is-correct" : "is-wrong"}>
                {wrong.length === 0
                  ? `✓ Les ${blanks.length} trous sont justes.`
                  : `✗ ${score} sur ${blanks.length}. Les trous marqués en rouge sont à revoir.`}
              </p>

              {wrong.length > 0 && (
                <ul className={styles.corrections}>
                  {wrong.map((blank) => {
                    const index = bank.text.indexOf(blank);
                    const { before, after } = around(bank.text, index);
                    return (
                      <li key={blank.id}>
                        <span className={styles.fragment}>
                          … {before}{" "}
                          <strong>
                            {blank.answer === NOTHING ? "(rien)" : blank.answer}
                          </strong>{" "}
                          {after} …
                        </span>
                        <span className={styles.why}>{blank.because}</span>
                      </li>
                    );
                  })}
                </ul>
              )}
            </>
          )}
        </div>
      </div>

      <div className={styles.actions}>
        {checked ? (
          <button
            type="button"
            className="button button-primary"
            onClick={() => setFinished(true)}
          >
            Voir mon score
          </button>
        ) : (
          <button
            type="button"
            className="button button-primary"
            disabled={filled.length < blanks.length}
            onClick={() => setChecked(true)}
          >
            Vérifier le texte
          </button>
        )}

        {!checked && filled.length > 0 && (
          <button type="button" className="button" onClick={restart}>
            Tout effacer
          </button>
        )}
      </div>
    </>
  );
}
