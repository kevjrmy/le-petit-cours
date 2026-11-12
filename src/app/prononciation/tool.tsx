"use client";

import { useId, useRef, useState } from "react";
import { AccentMenu } from "@/components/exercice/AccentMenu";
import { T } from "@/components/lang/T";
import { ChapterIcon } from "@/components/nav/ChapterIcon";
import {
  ClearIcon,
  SnailIcon,
  SpeakerIcon,
  StopIcon,
} from "@/components/speech/icons";
import { SpeechProblemMessage } from "@/components/speech/SpeechProblemMessage";
import shared from "@/components/speech/speech.module.css";
import { useLang } from "@/hooks/useLang";
import { useSpeech } from "@/hooks/useSpeech";
import styles from "./tool.module.css";

const SLOW = 0.7;

/* Two sentences at most: Chrome's online voices stop by themselves after about
   fifteen seconds, mid-word and without an error. */
const MAX_LENGTH = 200;

/* The count appears only near the end, where it is news. */
const NEAR_LIMIT = 150;

/* Something to hear before typing anything, each one a thing the voice shows
   better than a rule: an enchaînement, a plural heard in the vowel, a liaison,
   and the « fils » the page's intro warns about. French in both
   interfaces (#102). */
const EXAMPLES = [
  "Il est huit heures.",
  "Un œuf, des œufs",
  "Vous avez des enfants ?",
  "Mes fils sont grands.",
];

/**
 * Type French, hear it in the device's French voice (#94). Built like
 * `NumberSpeaker`, its sibling on the number pages: the chapter's mark on a
 * label, « Écouter » that becomes « Arrêter » while the voice reads, the
 * snail, the clear cross, « Essayez : » chips while the field is empty.
 *
 * **Every control is inside the field**, along its bottom edge, like a
 * message box: the accents (`AccentMenu`, a menu — here they help now and
 * then, and fourteen keys on show outweighed the field) on the left, the snail
 * and « Écouter » on the right, the clear cross in the top corner. The field
 * is still `.input` (#97): the controls are placed over it, never a second
 * frame drawn around a bare textarea.
 */
export function ListenTool() {
  const id = useId();
  const field = useRef<HTMLTextAreaElement>(null);
  /* Controlled: `AccentMenu`'s keys fire an `input` after writing at the caret, so
     the state hears a tapped « é » like a typed one. */
  const [text, setText] = useState("");
  const { speak, stop, speaking, problem } = useSpeech();
  /* Attributes only (#102): the visible words are `<T>`. The voice stays
     French in both languages — it reads the French typed, never the
     interface. */
  const es = useLang() === "es";

  const empty = text.trim() === "";

  function listen(rate?: number, said = text) {
    const words = said.trim();
    if (!words) {
      field.current?.focus();
      return;
    }
    speak(words, { rate });
  }

  function clear() {
    stop();
    setText("");
    field.current?.focus();
  }

  return (
    <form
      className={styles.tool}
      onSubmit={(event) => {
        event.preventDefault();
        listen();
      }}
    >
      <label className={`label ${shared.head}`} htmlFor={id}>
        <ChapterIcon name="prononciation" />
        <T fr="Mot ou phrase" es="Palabra o frase" />
      </label>

      <div className={styles.fieldWrap}>
        <textarea
          id={id}
          ref={field}
          className={`input ${styles.zone}`}
          rows={2}
          maxLength={MAX_LENGTH}
          spellCheck
          autoCapitalize="sentences"
          enterKeyHint="go"
          lang="fr"
          placeholder={
            es ? "Escribe en francés…" : "Écrivez en français…"
          }
          value={text}
          onChange={(event) => setText(event.target.value)}
          /* Entrée écoute : un retour à la ligne ne changerait rien à la
             lecture. Échap efface, comme dans le champ des nombres. */
          onKeyDown={(event) => {
            if (event.nativeEvent.isComposing) return;
            if (event.key === "Enter") {
              event.preventDefault();
              listen();
            } else if (event.key === "Escape" && !empty) {
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

        {/* The field's own toolbar, along its bottom edge: what to do with the
            text sits where the text is. The accents start it, the voice ends
            it; the gap between is the field, and a click there writes. */}
        <div className={styles.toolbar}>
          <AccentMenu
            target={field}
            triggerClassName={shared.ghost}
            align="start"
          />

          <div className={styles.speak}>
            <button
              type="button"
              className={shared.ghost}
              onClick={() => listen(SLOW)}
              aria-label={es ? "Escuchar despacio" : "Écouter lentement"}
            >
              <SnailIcon />
              <span className={styles.slowWord} aria-hidden="true">
                <T fr="Lentement" es="Despacio" />
              </span>
            </button>

            {/* One place for both: while the voice speaks, « Écouter »
                becomes « Arrêter ». Enter in the field still submits, and
                restarts. */}
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
          </div>
        </div>
      </div>

      {/* The examples while the field is empty; once it is not, the count near
          the limit. The voice that works goes unnamed: only a voice that does
          not gets a word, the message below. */}
      <div className={styles.line}>
        {empty ? (
          <div className={shared.examples}>
            <span className={shared.try}>
              <T fr="Essayez :" es="Prueba:" />
            </span>
            {EXAMPLES.map((example) => (
              <button
                key={example}
                type="button"
                className={shared.chip}
                lang="fr"
                data-sentence
                onClick={() => {
                  setText(example);
                  listen(undefined, example);
                }}
              >
                {example}
              </button>
            ))}
          </div>
        ) : (
          text.length >= NEAR_LIMIT && (
            <span className={styles.count}>
              {text.length} / {MAX_LENGTH}
            </span>
          )
        )}
      </div>

      <div role="status">
        {problem && <SpeechProblemMessage problem={problem} />}
      </div>
    </form>
  );
}
