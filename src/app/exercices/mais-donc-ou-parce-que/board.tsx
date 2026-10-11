"use client";

import { useEffect, useRef, useState } from "react";
import { Instructions, Meter, Score } from "@/components/exercice/Drill";
import { ITEMS, TEXT, type Piece } from "./data";
import board from "@/components/exercice/Board.module.css";

/**
 * Un récit à trous, et un petit menu sous chaque trou.
 *
 * **On touche un trou, un menu de trois connecteurs s'ouvre sous lui.** Choisir
 * remplit le trou et ferme le menu ; toucher le mot à nouveau le rouvre pour
 * changer d'avis. Un seul menu ouvert à la fois ; Échap ou un toucher ailleurs
 * le ferment. Rien ne se tape et rien ne se fait glisser.
 *
 * **La correction arrive d'un coup, à la fin** : corriger trou par trou
 * donnerait le lien de la phrase suivante. Chaque trou raté reçoit alors sa
 * phrase et le lien qu'elle demandait.
 *
 * **Rien n'est aléatoire ici** : le texte est fixe et l'ordre des menus aussi,
 * donc le plateau se rend sur le serveur et `drill.tsx` ne passe pas par
 * `dynamic({ ssr: false })` (`.claude/agents/exercise-author.md`).
 */

/** Les quelques mots autour du trou, pour que la correction se situe. */
function around(paragraph: Piece[], index: number): { before: string; after: string } {
  const previous = paragraph[index - 1];
  const next = paragraph[index + 1];
  const before =
    typeof previous === "string" ? previous.trimEnd().split(" ").slice(-4).join(" ") : "";
  const after =
    typeof next === "string" ? next.trimStart().split(" ").slice(0, 5).join(" ") : "";
  return { before, after };
}

export function Board() {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [open, setOpen] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);
  const [finished, setFinished] = useState(false);
  const menu = useRef<HTMLSpanElement>(null);
  const slots = useRef<Map<string, HTMLButtonElement>>(new Map());

  const filled = ITEMS.filter((blank) => answers[blank.id] !== undefined);
  const wrong = ITEMS.filter((blank) => answers[blank.id] !== blank.answer);
  const score = ITEMS.length - wrong.length;

  /* Menu ouvert : le premier choix prend le focus, Échap et un toucher
     ailleurs le ferment. */
  useEffect(() => {
    if (open === null) return;
    const id = open;
    menu.current?.querySelector("button")?.focus();

    function outside(event: PointerEvent) {
      const target = event.target as Node;
      if (menu.current?.contains(target)) return;
      if (slots.current.get(id)?.contains(target)) return;
      setOpen(null);
    }
    function escape(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      slots.current.get(id)?.focus();
      setOpen(null);
    }
    document.addEventListener("pointerdown", outside);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("pointerdown", outside);
      document.removeEventListener("keydown", escape);
    };
  }, [open]);

  function pick(id: string, word: string) {
    setAnswers((before) => ({ ...before, [id]: word }));
    setOpen(null);
    slots.current.get(id)?.focus();
  }

  function restart() {
    setAnswers({});
    setOpen(null);
    setChecked(false);
    setFinished(false);
  }

  if (finished) {
    return <Score score={score} total={ITEMS.length} onRestart={restart} />;
  }

  return (
    <>
      <Instructions>
        Touchez un trou, puis choisissez le connecteur. Lisez la phrase
        d’avant et la phrase d’après : c’est le lien entre les deux idées qui
        décide.
      </Instructions>

      <Meter value={filled.length} max={ITEMS.length} label="Trous remplis" />

      <div className={`card ${board.card} ${board.text}`}>
        {TEXT.map((paragraph, p) => (
          <p key={p}>
            {paragraph.map((piece, index) => {
              /* Une virgule qui suit un trou reste collée à lui : sans cela,
                 elle peut passer seule au début de la ligne suivante. */
              const afterBlank = index > 0 && typeof paragraph[index - 1] !== "string";
              if (typeof piece === "string") {
                const glued = afterBlank && piece.startsWith(",");
                return <span key={index}>{glued ? piece.slice(1) : piece}</span>;
              }

              const next = paragraph[index + 1];
              const comma = typeof next === "string" && next.startsWith(",");
              const position = ITEMS.findIndex((blank) => blank.id === piece.id);
              const chosen = answers[piece.id];
              const right = chosen === piece.answer;

              return (
                <span key={piece.id} className={board.place}>
                  <button
                    ref={(element) => {
                      if (element) slots.current.set(piece.id, element);
                      else slots.current.delete(piece.id);
                    }}
                    type="button"
                    className={`${board.slot} ${chosen ? board.filled : ""} ${
                      open === piece.id ? board.active : ""
                    } ${checked ? (right ? "is-correct" : "is-wrong") : ""}`}
                    disabled={checked}
                    aria-haspopup="true"
                    aria-expanded={open === piece.id}
                    aria-label={
                      chosen
                        ? `Trou ${position + 1} sur ${ITEMS.length}, rempli avec ${chosen}`
                        : `Trou ${position + 1} sur ${ITEMS.length}, à compléter`
                    }
                    onClick={() =>
                      setOpen((before) => (before === piece.id ? null : piece.id))
                    }
                  >
                    <span aria-hidden="true">
                      {checked ? (right ? "✓ " : "✗ ") : ""}
                      {chosen ?? "……"}
                    </span>
                  </button>

                  {open === piece.id && (
                    <span
                      ref={menu}
                      className={board.menu}
                      role="group"
                      aria-label={`Choix pour le trou ${position + 1}`}
                    >
                      {piece.options.map((option) => (
                        <button
                          key={option}
                          type="button"
                          className={`${board.option} ${
                            chosen === option ? "is-chosen" : ""
                          }`}
                          aria-pressed={chosen === option}
                          onClick={() => pick(piece.id, option)}
                        >
                          {option}
                        </button>
                      ))}
                    </span>
                  )}
                  {comma && ","}
                </span>
              );
            })}
          </p>
        ))}
      </div>

      {/* Rendu vide plutôt que conditionnellement, pour que la zone existe
          avant que le verdict n'y arrive et soit annoncée. */}
      <div role="status">
        {checked && (
          <>
            <p className={wrong.length === 0 ? "is-correct" : "is-wrong"}>
              {wrong.length === 0
                ? `✓ Les ${ITEMS.length} trous sont justes.`
                : `✗ ${score} sur ${ITEMS.length}. Les trous marqués ✗ sont à revoir.`}
            </p>

            {wrong.length > 0 && (
              <ul className={board.corrections}>
                {wrong.map((blank) => {
                  const paragraph = TEXT.find((pieces) => pieces.includes(blank)) ?? [];
                  const { before, after } = around(paragraph, paragraph.indexOf(blank));
                  return (
                    <li key={blank.id}>
                      <span className={board.fragment}>
                        … {before} <strong>{blank.answer}</strong>
                        {after.startsWith(",") ? "" : " "}
                        {after} …
                      </span>
                      <span className={board.why}>{blank.because}</span>
                    </li>
                  );
                })}
              </ul>
            )}
          </>
        )}
      </div>

      <div className={board.actions}>
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
            disabled={filled.length < ITEMS.length}
            onClick={() => {
              setOpen(null);
              setChecked(true);
            }}
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
