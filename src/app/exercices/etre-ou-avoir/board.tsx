"use client";

import { useRef, useState } from "react";
import { Instructions, Meter, Score } from "@/components/exercice/Drill";
import { shuffle } from "@/lib/shuffle";
import type { Level } from "@/data/navigation";
import { bankFor, type VerbItem } from "./data";
import styles from "./drill.module.css";

type Column = "etre" | "avoir";
/** Where a chip currently sits. `null` is the pool. */
type Placed = Record<string, Column | null>;
/** A drop target: the two columns, or back to the pool. */
type Zone = Column | "pool";

const COLUMNS: { key: Column; label: string; hint: string }[] = [
  {
    key: "etre",
    label: "être",
    hint: "déplacement, changement d’état, verbes pronominaux",
  },
  { key: "avoir", label: "avoir", hint: "la grande majorité des verbes" },
];

/** Movement, in CSS pixels, before the ghost appears and a drag looks started. */
const DRAG_THRESHOLD = 6;
/**
 * How far from where it began a gesture may end and still count as a tap.
 *
 * **Judged on the distance between pointerdown and pointerup, never on whether
 * the pointer moved in between.** A trackpad click drifts, and a touch tap
 * always does; with only a start threshold such a click registered as a drag,
 * dropped the chip in the zone it was already in, and read on screen as a click
 * that did nothing (reported 2026-09-15). Ending where you started is a tap
 * whatever happened along the way, and a real drag that returns to its origin
 * is a change of mind that cycling would get wrong anyway.
 */
const TAP_SLOP = 12;

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
 * **Two ways to move a chip, and the second never replaces the first.** Drag it
 * into a column, or click it to cycle pool → être → avoir → pool. Dragging is
 * what the board looks like it should do and is the faster gesture once you
 * have the rule; the click is what a keyboard, a screen reader and a thumb that
 * missed the column all still have. A chip is therefore still a `<button>`,
 * still moves on Enter, and still says which column it is in — dragging is
 * added on top of that with pointer events and takes nothing away. The one cost
 * is `touch-action: none` on a chip: a touch that starts on a chip now drags
 * instead of scrolling the page, so the page is scrolled from anywhere else.
 *
 * **Pointer events, not the HTML drag-and-drop API.** `dragstart`/`drop` do not
 * fire for touch at all, which would have made this a mouse-only feature on the
 * device the course is most used on.
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

  /* What the pointer is doing, in two halves. `drag` is state because it paints
     the ghost and the highlighted zone; `gesture` is a ref because it changes
     on every pointermove and no pixel of the page depends on it. */
  const [drag, setDrag] = useState<{
    verb: VerbItem;
    x: number;
    y: number;
    over: Zone | null;
  } | null>(null);
  const gesture = useRef<{ verb: VerbItem; x: number; y: number; moved: boolean } | null>(null);

  const zones = useRef<Partial<Record<Zone, HTMLElement | null>>>({});

  const pool = deck.filter((verb) => !placed[verb.id]);
  const sorted = deck.length - pool.length;
  const wrong = deck.filter(
    (verb) => placed[verb.id] && placed[verb.id] !== verb.aux,
  );
  const score = deck.length - wrong.length;

  /** The zone under the pointer, or `null` between them. */
  function zoneAt(x: number, y: number): Zone | null {
    for (const [name, element] of Object.entries(zones.current)) {
      if (!element) continue;
      const box = element.getBoundingClientRect();
      if (x >= box.left && x <= box.right && y >= box.top && y <= box.bottom) {
        return name as Zone;
      }
    }
    return null;
  }

  function put(verb: VerbItem, where: Column | null) {
    setPlaced((previous) => ({ ...previous, [verb.id]: where }));
  }

  /** The click path: one control, three stops, no pointer required. */
  function move(verb: VerbItem) {
    const now = placed[verb.id] ?? null;
    put(verb, now === null ? "etre" : now === "etre" ? "avoir" : null);
  }

  function restart() {
    setDeck(shuffle(bank));
    setPlaced({});
    setChecked(false);
    setFinished(false);
    setDrag(null);
    gesture.current = null;
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
        className={[
          styles.chip,
          drag?.verb.id === verb.id ? styles.dragging : "",
          checked ? (right ? "is-correct" : "is-wrong") : "",
        ]
          .filter(Boolean)
          .join(" ")}
        disabled={checked}
        onPointerDown={(event) => {
          if (checked || !event.isPrimary) return;
          gesture.current = {
            verb,
            x: event.clientX,
            y: event.clientY,
            moved: false,
          };
          /* Capture, so the chip keeps receiving moves once the pointer has
             left it — which it does immediately, that being the point. */
          event.currentTarget.setPointerCapture(event.pointerId);
        }}
        onPointerMove={(event) => {
          const held = gesture.current;
          if (!held) return;
          const far =
            Math.hypot(event.clientX - held.x, event.clientY - held.y) >
            DRAG_THRESHOLD;
          if (!held.moved && !far) return;
          held.moved = true;
          setDrag({
            verb: held.verb,
            x: event.clientX,
            y: event.clientY,
            over: zoneAt(event.clientX, event.clientY),
          });
        }}
        onPointerUp={(event) => {
          const held = gesture.current;
          gesture.current = null;
          if (!held) return;
          setDrag(null);
          /* A gesture that ends where it began is a tap, and a tap is the click
             path. Both live here rather than one here and one in `onClick`
             because a drop can move the chip's DOM node to another column, and
             a click on a node that has just been unmounted may never be
             dispatched — a suppression flag set on drop would then survive into
             the next gesture and swallow it. Pointer events fire either way. */
          if (
            Math.hypot(event.clientX - held.x, event.clientY - held.y) <=
            TAP_SLOP
          ) {
            move(held.verb);
            return;
          }
          const zone = zoneAt(event.clientX, event.clientY);
          /* Dropped on nothing: the chip stays where it was, rather than
             falling back to the pool and undoing a placement by accident. */
          if (zone) put(held.verb, zone === "pool" ? null : zone);
        }}
        onPointerCancel={() => {
          gesture.current = null;
          setDrag(null);
        }}
        onClick={(event) => {
          /* Keyboard only. A button activated with Enter or Space fires a click
             with `detail === 0` and no pointer events at all; a mouse or touch
             click reports 1 or more and has already been handled above. */
          if (event.detail === 0) move(verb);
        }}
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
        Glissez un verbe dans une colonne, ou cliquez dessus pour le déplacer :
        d’abord vers <span className="fr">être</span>, puis vers{" "}
        <span className="fr">avoir</span>, puis de nouveau dans la réserve.
        Classez les {deck.length} verbes, puis vérifiez.
      </Instructions>

      <Meter value={sorted} max={deck.length} label="Verbes classés" />

      <div className={styles.board}>
        <div
          ref={(element) => {
            zones.current.pool = element;
          }}
          className={`${styles.pool} ${drag?.over === "pool" ? styles.over : ""}`}
          aria-label="Verbes à classer"
        >
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
            <div
              key={column.key}
              ref={(element) => {
                zones.current[column.key] = element;
              }}
              className={`${styles.column} ${drag?.over === column.key ? styles.over : ""}`}
            >
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

      {/* The chip under the finger. `position: fixed` and inert, so it never
          becomes the thing the pointer is over. */}
      {drag && (
        <span
          className={styles.ghost}
          style={{ left: drag.x, top: drag.y }}
          aria-hidden="true"
        >
          {drag.verb.text}
        </span>
      )}

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
