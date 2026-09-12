"use client";

import { useState } from "react";
import { Instructions, Meter, Score } from "@/components/exercice/Drill";
import { shuffle } from "@/lib/shuffle";
import type { Level } from "@/data/navigation";
import { bankFor, type VerbItem } from "./data";
import styles from "./drill.module.css";

type Column = "etre" | "avoir";
/** Where a chip currently sits. `null` is the pool. */
type Placed = Record<string, Column | null>;

const COLUMNS: { key: Column; label: string; hint: string }[] = [
  {
    key: "etre",
    label: "être",
    hint: "déplacement, changement d’état, verbes pronominaux",
  },
  { key: "avoir", label: "avoir", hint: "la grande majorité des verbes" },
];

/**
 * A sorting board rather than a questionnaire.
 *
 * **The mechanic is the point.** Sixteen verbs, two columns, everything on
 * screen at once: the learner sees the small family of *être* verbs against the
 * mass of the others, which is the shape of the rule. Asked one verb at a time
 * with four options, the same content is an elimination game
 * (`.claude/agents/exercise-author.md` — prefer a mechanic that does not exist
 * yet over another MCQ).
 *
 * **One click moves a chip.** Pool → être → avoir → pool, which is one control
 * that works with a mouse, a thumb and a keyboard alike; dragging would be a
 * fourth interaction to teach and would leave keyboard users with nothing. The
 * button's accessible name says where the chip is now, so the move is announced
 * rather than merely seen.
 *
 * **This file is never server-rendered**, which is what lets the deck be
 * shuffled in a `useState` initialiser. `'use client'` on its own would not:
 * it means "hydrate this", not "skip the server", so a shuffle in render gives
 * the two sides different decks and React throws a hydration error. `drill.tsx`
 * loads it with `ssr: false` — see the note there.
 */
export function Board({ level }: { level: Level | null }) {
  /* Read once. `drill.tsx` remounts this component when the level changes, so
     the initialiser below runs again with the new bank and every bit of state
     that belonged to the old deck goes with it (`docs/decisions.md` #68). */
  const bank = bankFor(level);
  const [deck, setDeck] = useState<VerbItem[]>(() => shuffle(bank));
  const [placed, setPlaced] = useState<Placed>({});
  const [checked, setChecked] = useState(false);
  const [finished, setFinished] = useState(false);

  const pool = deck.filter((verb) => !placed[verb.id]);
  const sorted = deck.length - pool.length;
  const wrong = deck.filter(
    (verb) => placed[verb.id] && placed[verb.id] !== verb.aux,
  );
  const score = deck.length - wrong.length;

  function move(verb: VerbItem) {
    setPlaced((previous) => {
      const now = previous[verb.id] ?? null;
      const next = now === null ? "etre" : now === "etre" ? "avoir" : null;
      return { ...previous, [verb.id]: next };
    });
  }

  function restart() {
    setDeck(shuffle(bank));
    setPlaced({});
    setChecked(false);
    setFinished(false);
  }

  if (finished) {
    return <Score score={score} total={deck.length} onRestart={restart} />;
  }

  function chip(verb: VerbItem) {
    const where = placed[verb.id] ?? null;
    const right = where === verb.aux;
    const column = where === "etre" ? "être" : where === "avoir" ? "avoir" : null;

    return (
      <button
        key={verb.id}
        type="button"
        className={`${styles.chip} ${checked ? (right ? "is-correct" : "is-wrong") : ""}`}
        disabled={checked}
        onClick={() => move(verb)}
      >
        {checked && (
          <span className={styles.mark} aria-hidden="true">
            {right ? "✓" : "✗"}
          </span>
        )}
        {verb.text}
        <span className="visually-hidden">
          {column ? ` — dans la colonne ${column}` : " — à classer"}
        </span>
      </button>
    );
  }

  return (
    <>
      <Instructions>
        Cliquez sur un verbe pour le déplacer : d’abord vers{" "}
        <span className="fr">être</span>, puis vers{" "}
        <span className="fr">avoir</span>, puis de nouveau dans la réserve.
        Classez les {deck.length} verbes, puis vérifiez.
      </Instructions>

      <Meter value={sorted} max={deck.length} label="Verbes classés" />

      <div className={styles.board}>
        <div className={styles.pool} aria-label="Verbes à classer">
          {pool.length === 0 ? (
            <span className={styles.poolEmpty}>
              Tous les verbes sont classés.
            </span>
          ) : (
            pool.map(chip)
          )}
        </div>

        <div className={styles.columns}>
          {/* `div` and `h3`, deliberately. As a `<section>` with an `<h2>` each
              column collected the accent bar that marks a *lesson* section, the
              second one collected `.prose section + section`'s 4.75rem of
              spacing, and « être » and « avoir » turned up in the page's Index
              as if they were parts of the page (#66). A column head is a label
              inside one section, not a section. */}
          {COLUMNS.map((column) => (
            <div key={column.key} className={styles.column}>
              <h3 className={styles.columnHead}>
                {column.label}
                <span className={styles.columnHint}>{column.hint}</span>
              </h3>
              <div className={styles.slot}>
                {deck.filter((verb) => placed[verb.id] === column.key).map(chip)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {checked && (
        <div role="status">
          <p className={wrong.length === 0 ? "is-correct" : "is-wrong"}>
            {wrong.length === 0
              ? `✓ Les ${deck.length} verbes sont à leur place.`
              : `✗ ${score} sur ${deck.length}. Les verbes marqués d’une croix sont mal classés.`}
          </p>
          {wrong.length > 0 && (
            <ul className={styles.corrections}>
              {wrong.map((verb) => (
                <li key={verb.id}>
                  <span className={styles.verb}>{verb.text}</span> →{" "}
                  <span className="fr">
                    {verb.aux === "etre" ? "être" : "avoir"}
                  </span>{" "}
                  · {verb.because}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

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
          <>
            <button
              type="button"
              className="button button-primary"
              disabled={pool.length > 0}
              onClick={() => setChecked(true)}
            >
              Vérifier
            </button>
            {pool.length > 0 && (
              <span className={styles.remaining}>
                Encore {pool.length} verbe{pool.length > 1 ? "s" : ""} à classer.
              </span>
            )}
          </>
        )}
      </div>
    </>
  );
}
