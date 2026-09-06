"use client";

import type { RefObject } from "react";
import styles from "./AccentBar.module.css";

/**
 * The characters a French text needs and a Spanish keyboard will not give you.
 *
 * **This is not a convenience, it is the constraint in `AGENTS.md` §1.** Both
 * profiles type on a Spanish keyboard: `é`, `è` and `ê` cost a dead-key detour,
 * and `ç` and `œ` cannot be typed at all. Without this row, a page that asks
 * for written French is testing the keyboard rather than the French — which is
 * why §9's rule is to prefer clicking to typing. Where the *spelling is the
 * skill* and typing has to stay, this is what makes it fair.
 *
 * Grouped by base letter and separated by a gap rather than a rule, because at
 * this size a separator reads as one more key.
 */
const GROUPS = [
  ["é", "è", "ê", "ë"],
  ["à", "â"],
  ["î", "ï"],
  ["ô"],
  ["ù", "û", "ü"],
  ["ç", "œ"],
];

export function AccentBar({
  target,
}: {
  /** The field to type into. Its caret position is where the character lands. */
  target: RefObject<HTMLTextAreaElement | null>;
}) {
  function insert(character: string) {
    const field = target.current;
    if (!field) return;

    /* `setRangeText` writes at the caret and, with "end", leaves the caret
       after what it wrote — so a run of taps types a word rather than
       reversing it. It also replaces a selection, which is what you want when
       someone highlights a bare `e` to accent it. */
    const start = field.selectionStart;
    const end = field.selectionEnd;
    field.setRangeText(character, start, end, "end");
    field.focus();
  }

  return (
    <div className={styles.bar} role="group" aria-label="Lettres accentuées">
      {GROUPS.map((group, index) => (
        <div key={group[0]} className={styles.bar}>
          {index > 0 && <span className={styles.gap} aria-hidden="true" />}
          {group.map((character) => (
            <button
              key={character}
              type="button"
              className={styles.key}
              aria-label={`Insérer ${character}`}
              /* Keeps the caret in the field: without this the mousedown moves
                 focus to the button first, and the field scrolls away on a
                 phone just as the character lands. */
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => insert(character)}
            >
              {character}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}
