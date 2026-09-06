"use client";

import { useRef, useState, type ReactNode } from "react";
import { AccentBar } from "./AccentBar";
import styles from "./Traduction.module.css";

/**
 * Every `traduction/` page: a source text with uncoverable words, a place to
 * write, and the model version (`docs/decisions.md` #55).
 *
 * **One component, not one per page.** The first text had its own copy and the
 * second would have been a fork — which is exactly how the Vue app ended up
 * with five dialogue pages carrying ~300 lines of bespoke CSS each. A page here
 * is its text, its three hints and its model, and nothing else.
 *
 * **A hint gives the base form, never the conjugated one.** `se réveiller`, not
 * `je me suis réveillée`: vocabulary is what stops a learner mid-sentence, and
 * the tense, the auxiliary and the agreement are what the page is practising. A
 * hint that hands those over has done the exercise. Three per text, on the
 * words Spanish does not give away.
 *
 * **Nothing is graded and nothing is stored.** A four-sentence text has many
 * right answers, so she writes, reveals, and compares.
 */
export type Part = string | { es: string; fr: string };

function Hint({ es, fr }: { es: string; fr: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className={styles.hint}
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        {es}
        <span className="visually-hidden">
          {open ? " : cacher le mot français" : " : voir le mot français"}
        </span>
      </button>
      {open && (
        <span className={styles.mot} lang="fr">
          {" "}
          ({fr})
        </span>
      )}
    </>
  );
}

export function Traduction({
  lines,
  model,
  note,
}: {
  /** The source text, line by line. A `{ es, fr }` part is an uncoverable word. */
  lines: Part[][];
  /** The model version, line by line. Shown only once she asks for it. */
  model: string[];
  /** What to compare and what to ignore, for this text in particular. */
  note: ReactNode;
}) {
  const [revealed, setRevealed] = useState(false);
  const field = useRef<HTMLTextAreaElement>(null);

  return (
    <>
      {/* The source, and the only Spanish in the course (#55): material to be
          translated, never explanation, so it carries its own `lang`. */}
      <div className="card" lang="es">
        {lines.map((line, index) => (
          <p key={index} className={styles.line}>
            {line.map((part, position) =>
              typeof part === "string" ? (
                <span key={position}>{part}</span>
              ) : (
                <Hint key={position} es={part.es} fr={part.fr} />
              ),
            )}
          </p>
        ))}
      </div>

      <p>
        Trois mots sont surlignés. Cliquez dessus si vous bloquez : ils donnent
        le mot français, jamais la phrase.
      </p>

      <label className="visually-hidden" htmlFor="traduction">
        Votre traduction
      </label>

      <AccentBar target={field} />

      <textarea
        id="traduction"
        ref={field}
        className={styles.zone}
        rows={6}
        spellCheck
        lang="fr"
        placeholder="Écrivez votre version ici."
      />

      <div className={styles.controls}>
        <button
          type="button"
          className="button button-primary"
          onClick={() => setRevealed(true)}
          disabled={revealed}
        >
          Voir la correction
        </button>
      </div>

      {revealed && (
        <>
          <div className="example">
            {model.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>

          <div className="attention">{note}</div>
        </>
      )}
    </>
  );
}
