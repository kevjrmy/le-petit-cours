"use client";

import { useId, useRef, useState } from "react";
import { T } from "@/components/lang/T";
import { ChapterIcon } from "@/components/nav/ChapterIcon";
import { useLang } from "@/hooks/useLang";
import { useSpeech } from "@/hooks/useSpeech";
import { groupDigits, numberToFrench, parseTypedNumber } from "@/lib/numbers";
import { SpeechProblemMessage } from "./SpeechProblemMessage";
import styles from "./NumberSpeaker.module.css";

const SLOW = 0.7;

/* Past this many characters the French drops a step, so « neuf cent
   quatre-vingt-dix-neuf milliards… » wraps in three lines, not six. */
const LONG = 32;

/* Same hand as the chrome (`ChapterIcon`): a 24-grid, round caps, stroked in
   `currentColor`, so each follows its button's ink in both themes. */

/** A speaker and two waves: « hear it ». */
function SpeakerIcon() {
  return (
    <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 9.5h3l4.5-4v13L7 14.5H4z" />
      <path d="M15 9.5a3.5 3.5 0 0 1 0 5" />
      <path d="M17.8 7a7 7 0 0 1 0 10" />
    </svg>
  );
}

/** A square: « stop », the mark every player uses. */
function StopIcon() {
  return (
    <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true">
      <rect x="6.5" y="6.5" width="11" height="11" rx="2" />
    </svg>
  );
}

/** A snail: « slowly ». The shell is a coil, the foot one line, two horns. */
function SnailIcon() {
  return (
    <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="14.5" cy="12" r="6" />
      <path d="M17 12a2.5 2.5 0 1 0-2.5 2.5" />
      <path d="M3.5 19.5H21" />
      <path d="M9 19.5c-2.6 0-4.2-1.8-4.2-4.3" />
      <path d="M4.8 15.2 3.5 11.8M4.8 15.2l1.9-3.2" />
    </svg>
  );
}

/** A cross: « clear the field ». */
function ClearIcon() {
  return (
    <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 7l10 10M17 7 7 17" />
    </svg>
  );
}

/**
 * Type a number in figures, read it in French words and hear it (#94). A leaf
 * on the pages that teach the numbers; the page around it stays a Server
 * Component. Nothing is scored or stored: it is a tool, like
 * `prononciation/ecouter`.
 *
 * **The French is written as the learner types**, before any button: reading
 * *soixante et onze* appear under « 71 » is half of what the tool teaches, and
 * the buttons are only for hearing it. One line under the field holds, in
 * turn, the page's examples (field empty), the French (a number) or what is
 * wrong (anything else) — never two at once.
 *
 * The voice reads the words, not the figures: a device left to read « 81 »
 * would choose its own way, and the page shows what is said.
 */
export function NumberSpeaker({ examples = [] }: { examples?: number[] }) {
  const id = useId();
  const field = useRef<HTMLInputElement>(null);
  const [typed, setTyped] = useState("");
  const { speak, stop, speaking, problem } = useSpeech();
  /* Attributes only (#102): the visible words are `<T>`. */
  const lang = useLang();
  const es = lang === "es";

  const empty = typed.trim() === "";
  const n = empty ? null : parseTypedNumber(typed);
  const words = n === null ? null : numberToFrench(n);
  const invalid = !empty && words === null;

  function say(rate?: number, text = words) {
    if (!text) {
      field.current?.focus();
      return;
    }
    speak(text, { rate });
  }

  function clear() {
    stop();
    setTyped("");
    field.current?.focus();
  }

  return (
    <form
      className={styles.speaker}
      onSubmit={(event) => {
        event.preventDefault();
        say();
      }}
    >
      <label className={`label ${styles.head}`} htmlFor={id}>
        <ChapterIcon name="prononciation" />
        <T fr="Écouter un nombre" es="Escuchar un número" />
      </label>

      <div className={styles.row}>
        <div className={styles.fieldWrap}>
          <input
            id={id}
            ref={field}
            className={`input ${styles.field}`}
            type="text"
            inputMode="numeric"
            enterKeyHint="go"
            autoComplete="off"
            spellCheck={false}
            placeholder={es ? "Escribe un número" : "Tapez un nombre"}
            maxLength={16}
            value={typed}
            aria-invalid={invalid}
            aria-describedby={`${id}-line`}
            onChange={(event) => setTyped(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Escape" && !empty) {
                event.preventDefault();
                clear();
              }
            }}
          />
          {!empty && (
            <button
              type="button"
              className={styles.clear}
              onClick={clear}
              aria-label={es ? "Borrar" : "Effacer"}
            >
              <ClearIcon />
            </button>
          )}
        </div>

        <div className={styles.actions}>
          {/* One place for both: while the voice speaks, « Écouter » becomes
              « Arrêter ». Enter in the field still submits, and restarts. */}
          {speaking ? (
            <button
              type="button"
              className="button button-primary"
              onClick={stop}
            >
              <StopIcon />
              <T fr="Arrêter" es="Parar" />
            </button>
          ) : (
            <button type="submit" className="button button-primary">
              <SpeakerIcon />
              <T fr="Écouter" es="Escuchar" />
            </button>
          )}
          <button type="button" className="button" onClick={() => say(SLOW)}>
            <SnailIcon />
            <T fr="Lentement" es="Despacio" />
          </button>
        </div>
      </div>

      {/* The field's description, read with it on focus. Not a live region:
          it changes on every key, and a screen reader would spell each one. */}
      <div id={`${id}-line`} className={styles.line}>
        {words && (
          <p
            className={styles.words}
            lang="fr"
            data-long={words.length > LONG || undefined}
            data-speaking={speaking || undefined}
          >
            {words}
          </p>
        )}

        {invalid && (
          <p className={styles.wrong} role="alert">
            <T
              fr="Seulement des chiffres, sans virgule, jusqu’à 999 milliards."
              es="Solo cifras, sin coma, hasta 999 000 millones."
            />
          </p>
        )}

        {empty && examples.length > 0 && (
          <div className={styles.examples}>
            <span className={styles.try}>
              <T fr="Essayez :" es="Prueba:" />
            </span>
            {examples.map((example) => {
              const digits = groupDigits(example);
              return (
                <button
                  key={example}
                  type="button"
                  className={styles.chip}
                  onClick={() => {
                    setTyped(digits);
                    say(undefined, numberToFrench(example));
                  }}
                >
                  {digits}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {problem && <SpeechProblemMessage problem={problem} />}
    </form>
  );
}
