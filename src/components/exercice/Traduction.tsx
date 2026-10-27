"use client";

import { isValidElement, useRef, useState, type ReactNode } from "react";
import { T } from "@/components/lang/T";
import { useLang } from "@/hooks/useLang";
import { AccentBar } from "./AccentBar";
import styles from "./Traduction.module.css";

/**
 * Every `traduction/` page: a source text with uncoverable words, a place to
 * write, and the model version (`docs/decisions.md` #55).
 *
 * **One component, not one per page.** The first text had its own copy and the
 * second would have been a fork — which is exactly how five dialogue pages once
 * ended up carrying ~300 lines of bespoke CSS each. A page here is its text, its
 * three hints and its model, and nothing else.
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
          {open ? (
            <T fr=" : cacher le mot français" es=": ocultar la palabra francesa" />
          ) : (
            <T fr=" : voir le mot français" es=": ver la palabra francesa" />
          )}
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

function isPair(
  note: ReactNode | { fr: ReactNode; es: ReactNode },
): note is { fr: ReactNode; es: ReactNode } {
  return (
    typeof note === "object" &&
    note !== null &&
    !isValidElement(note) &&
    "fr" in note &&
    "es" in note
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
  /**
   * What to compare and what to ignore, for this text in particular. Pass
   * `{ fr, es }` for both interface languages (#102): each gets its own
   * `.attention` box, the Spanish one `lang="es"`, so its label reads
   * « Recuerda ». A bare node is French.
   */
  note: ReactNode | { fr: ReactNode; es: ReactNode };
}) {
  const [revealed, setRevealed] = useState(false);
  const field = useRef<HTMLTextAreaElement>(null);
  /* For the placeholder, an attribute (#102). */
  const lang = useLang();

  return (
    <>
      {/* The source (#55): material to be translated, not explanation, so it
          stays Spanish in both interface languages and carries its own `lang`. */}
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

      <p data-ui="fr">
        Trois mots sont surlignés. Cliquez dessus si vous bloquez : ils donnent
        le mot français, jamais la phrase.
      </p>
      <p data-ui="es" lang="es">
        Hay tres palabras resaltadas. Haz clic en ellas si te atascas: te dan la
        palabra francesa, nunca la frase.
      </p>

      <label className="visually-hidden" htmlFor="traduction">
        <T fr="Votre traduction" es="Tu traducción" />
      </label>

      <AccentBar target={field} />

      <textarea
        id="traduction"
        ref={field}
        className="input"
        rows={6}
        spellCheck
        lang="fr"
        placeholder={
          lang === "es" ? "Escribe aquí tu versión." : "Écrivez votre version ici."
        }
      />

      <div className={styles.controls}>
        <button
          type="button"
          className="button button-primary"
          onClick={() => setRevealed(true)}
          disabled={revealed}
        >
          <T fr="Voir la correction" es="Ver la corrección" />
        </button>
      </div>

      {revealed && (
        <>
          <div className="example">
            {model.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>

          {isPair(note) ? (
            <>
              <div className="attention" data-ui="fr">
                {note.fr}
              </div>
              <div className="attention" data-ui="es" lang="es">
                {note.es}
              </div>
            </>
          ) : (
            <div className="attention">{note}</div>
          )}
        </>
      )}
    </>
  );
}
