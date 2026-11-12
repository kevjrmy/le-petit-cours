"use client";

import { useId, useRef, useState } from "react";
import { T } from "@/components/lang/T";
import { ChapterIcon } from "@/components/nav/ChapterIcon";
import { useLang } from "@/hooks/useLang";
import { useSpeech } from "@/hooks/useSpeech";
import { groupDigits, numberToFrench, parseTypedNumber } from "@/lib/numbers";
import { ClearIcon, SnailIcon, SpeakerIcon, StopIcon } from "./icons";
import { SpeechProblemMessage } from "./SpeechProblemMessage";
import shared from "./speech.module.css";
import styles from "./NumberSpeaker.module.css";

const SLOW = 0.7;

/* Past this many characters the French drops a step, so « neuf cent
   quatre-vingt-dix-neuf milliards… » wraps in three lines, not six. */
const LONG = 32;

/**
 * Type a number in figures, read it in French words and hear it (#94). A leaf
 * on the pages that teach the numbers; the page around it stays a Server
 * Component. Nothing is scored or stored: it is a tool, like
 * `/prononciation`.
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
      <label className={`label ${shared.head}`} htmlFor={id}>
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
              className={`${shared.clear} ${styles.clear}`}
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
          <div className={shared.examples}>
            <span className={shared.try}>
              <T fr="Essayez :" es="Prueba:" />
            </span>
            {examples.map((example) => {
              const digits = groupDigits(example);
              return (
                <button
                  key={example}
                  type="button"
                  className={shared.chip}
                  data-figures
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
