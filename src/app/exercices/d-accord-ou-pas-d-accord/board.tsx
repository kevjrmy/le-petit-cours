"use client";

import { useEffect, useRef, useState } from "react";
import { Instructions, Meter, Score } from "@/components/exercice/Drill";
import { T } from "@/components/lang/T";
import { useLang } from "@/hooks/useLang";
import { Bilingue } from "../bilingue";
import { ITEMS, TEXT, type Piece } from "./data";
import board from "@/components/exercice/Board.module.css";
import styles from "./drill.module.css";

/**
 * Un dialogue à trous, et un petit menu sous chaque trou. Le plateau est celui
 * de `mais-donc-ou-parce-que` ; seul le nom devant chaque réplique est à lui.
 *
 * **On touche un trou, un menu de trois choix s'ouvre sous lui.** Choisir
 * remplit le trou et ferme le menu ; toucher le mot à nouveau le rouvre pour
 * changer d'avis. Un seul menu ouvert à la fois ; Échap ou un toucher ailleurs
 * le ferment. Rien ne se tape et rien ne se fait glisser.
 *
 * **La correction arrive d'un coup, à la fin** : corriger trou par trou
 * donnerait la réplique suivante. Chaque trou raté reçoit alors sa phrase et ce
 * que la formule y faisait.
 *
 * **Rien n'est aléatoire ici** : le texte est fixe et l'ordre des menus aussi,
 * donc le plateau se rend sur le serveur et `drill.tsx` ne passe pas par
 * `dynamic({ ssr: false })` (`.claude/agents/exercise-author.md`).
 */

/** Les quelques mots autour du trou, pour que la correction se situe. */
function around(pieces: Piece[], index: number): { before: string; after: string } {
  const previous = pieces[index - 1];
  const next = pieces[index + 1];
  const before =
    typeof previous === "string" ? previous.trimEnd().split(" ").slice(-4).join(" ") : "";
  const after =
    typeof next === "string" ? next.trimStart().split(" ").slice(0, 5).join(" ") : "";
  return { before, after };
}

export function Board() {
  const lang = useLang();
  const es = lang === "es";
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
        <T
          fr="Touchez un trou, puis choisissez le mot ou la formule. Lisez la réplique d’avant : c’est ce que la personne répond à l’autre qui décide."
          es="Toca un hueco y elige la palabra o la fórmula. Lee la réplica anterior: lo que decide es lo que la persona responde a la otra."
        />
      </Instructions>

      <Meter value={filled.length} max={ITEMS.length} label={{ fr: "Trous remplis", es: "Huecos rellenados" }} />

      <div className={`card ${board.card} ${board.text}`}>
        {TEXT.map(({ who, pieces }, line) => (
          <p key={line}>
            <span className={styles.who}>{`${who}\u00a0:`}</span>{" "}
            {pieces.map((piece, index) => {
              /* Une virgule qui suit un trou reste collée à lui : sans cela,
                 elle peut passer seule au début de la ligne suivante. */
              const afterBlank = index > 0 && typeof pieces[index - 1] !== "string";
              if (typeof piece === "string") {
                const glued = afterBlank && piece.startsWith(",");
                return <span key={index}>{glued ? piece.slice(1) : piece}</span>;
              }

              const next = pieces[index + 1];
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
                      es
                        ? chosen
                          ? `Hueco ${position + 1} de ${ITEMS.length}, relleno con ${chosen}`
                          : `Hueco ${position + 1} de ${ITEMS.length}, por completar`
                        : chosen
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
                      aria-label={
                        es
                          ? `Opciones para el hueco ${position + 1}`
                          : `Choix pour le trou ${position + 1}`
                      }
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
              {wrong.length === 0 ? (
                <T
                  fr={`✓ Les ${ITEMS.length} trous sont justes.`}
                  es={`✓ Los ${ITEMS.length} huecos están bien.`}
                />
              ) : (
                <T
                  fr={`✗ ${score} sur ${ITEMS.length}. Les trous marqués ✗ sont à revoir.`}
                  es={`✗ ${score} de ${ITEMS.length}. Los huecos marcados con ✗ hay que repasarlos.`}
                />
              )}
            </p>

            {wrong.length > 0 && (
              <ul className={board.corrections}>
                {wrong.map((blank) => {
                  const pieces = TEXT.find((line) => line.pieces.includes(blank))?.pieces ?? [];
                  const { before, after } = around(pieces, pieces.indexOf(blank));
                  return (
                    <li key={blank.id}>
                      <span className={board.fragment}>
                        … {before} <strong>{blank.answer}</strong>
                        {after.startsWith(",") ? "" : " "}
                        {after} …
                      </span>
                      <span className={board.why}>
                        <Bilingue text={blank.because} />
                      </span>
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
            <T fr="Voir mon score" es="Ver mi puntuación" />
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
            <T fr="Vérifier le dialogue" es="Comprobar el diálogo" />
          </button>
        )}

        {!checked && filled.length > 0 && (
          <button type="button" className="button" onClick={restart}>
            <T fr="Tout effacer" es="Borrar todo" />
          </button>
        )}
      </div>
    </>
  );
}
