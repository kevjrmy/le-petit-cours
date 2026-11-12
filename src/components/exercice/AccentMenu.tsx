"use client";

import { useEffect, useId, useRef, useState, type RefObject } from "react";
import { useLang } from "@/hooks/useLang";
import { AccentBar } from "./AccentBar";
import styles from "./AccentMenu.module.css";

/**
 * `AccentBar` folded behind one button: « é à ç ▾ ». For a field where accents
 * are an occasional help, not the skill being tested — the listening tool
 * (`/prononciation`), where fourteen keys always on show outweighed
 * the field they serve. **A drill whose answer is the spelling keeps the bar
 * open** (§9): there, hiding the keys hides the fairness.
 *
 * It behaves like a phone's long-press menu: a letter lands at the caret and
 * the menu closes, so typing carries on. A tap elsewhere or Échap closes it
 * too; Échap is caught before the field's own handler, which may clear it.
 */
export function AccentMenu({
  target,
  className,
  triggerClassName = "button",
  align = "end",
}: {
  target: RefObject<HTMLTextAreaElement | HTMLInputElement | null>;
  /** Placement only. */
  className?: string;
  /**
   * The button's look: the shared `.button` by default, or a borderless one
   * where the menu sits inside a field (`speech.module.css`'s `.ghost`).
   */
  triggerClassName?: string;
  /** Which edge of the button the menu lines up with: opening inward. */
  align?: "start" | "end";
}) {
  const id = useId();
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  /* Attributes only (#102). */
  const es = useLang() === "es";

  useEffect(() => {
    if (!open) return;

    function outside(event: PointerEvent) {
      const node = event.target as Node;
      if (panel.current?.contains(node)) return;
      if (trigger.current?.contains(node)) return;
      setOpen(false);
    }
    /* Capture: before React's own handlers, so the field's Échap (which
       clears it) never sees the one that closes the menu. */
    function escape(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      event.preventDefault();
      event.stopPropagation();
      if (panel.current?.contains(document.activeElement)) {
        trigger.current?.focus();
      }
      setOpen(false);
    }
    document.addEventListener("pointerdown", outside);
    document.addEventListener("keydown", escape, true);
    return () => {
      document.removeEventListener("pointerdown", outside);
      document.removeEventListener("keydown", escape, true);
    };
  }, [open]);

  return (
    <div className={`${styles.place} ${className ?? ""}`}>
      <button
        ref={trigger}
        type="button"
        className={`${triggerClassName} ${styles.trigger}`}
        aria-expanded={open}
        aria-controls={id}
        aria-label={es ? "Letras acentuadas" : "Lettres accentuées"}
        /* A pointer keeps the caret in the field (and a phone its keyboard
           up); a keyboard opening the menu walks into it instead. */
        onMouseDown={(event) => event.preventDefault()}
        onClick={(event) => {
          const opening = !open;
          setOpen(opening);
          if (opening && event.detail === 0) {
            requestAnimationFrame(() =>
              panel.current?.querySelector("button")?.focus(),
            );
          }
        }}
      >
        <span className={styles.glyphs} aria-hidden="true">
          é à ç
        </span>
        <svg className={styles.chevron} viewBox="0 0 24 24" aria-hidden="true">
          <path d="m7 10 5 5 5-5" />
        </svg>
      </button>

      {open && (
        <div
          ref={panel}
          id={id}
          className={styles.menu}
          data-align={align}
        >
          <AccentBar
            target={target}
            className={styles.keys}
            onInsert={() => setOpen(false)}
          />
        </div>
      )}
    </div>
  );
}
