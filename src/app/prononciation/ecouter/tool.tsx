"use client";

import { useRef } from "react";
import { AccentBar } from "@/components/exercice/AccentBar";
import { T } from "@/components/lang/T";
import { SpeechProblemMessage } from "@/components/speech/SpeechProblemMessage";
import { useLang } from "@/hooks/useLang";
import { useSpeech } from "@/hooks/useSpeech";
import styles from "./tool.module.css";

const SLOW = 0.7;

/* Two sentences at most: Chrome's online voices stop by themselves after about
   fifteen seconds, mid-word and without an error. */
const MAX_LENGTH = 200;

export function ListenTool() {
  /* Uncontrolled, read on demand: `AccentBar` writes into the element itself,
     which a controlled field would overwrite at its next render. */
  const field = useRef<HTMLTextAreaElement>(null);
  const { speak, stop, speaking, problem, voiceName } = useSpeech();
  /* The placeholder only: an attribute (#102). The voice stays French in both
     languages — it reads the French typed, never the interface. */
  const lang = useLang();

  function listen(rate?: number) {
    const text = field.current?.value.trim() ?? "";
    if (!text) {
      field.current?.focus();
      return;
    }
    speak(text, { rate });
  }

  return (
    <form
      className={styles.tool}
      onSubmit={(event) => {
        event.preventDefault();
        listen();
      }}
    >
      <label className="visually-hidden" htmlFor="a-ecouter">
        <T fr="Mot ou phrase à écouter" es="Palabra o frase para escuchar" />
      </label>

      <AccentBar target={field} />

      <textarea
        id="a-ecouter"
        ref={field}
        className={`input ${styles.zone}`}
        rows={2}
        maxLength={MAX_LENGTH}
        spellCheck
        lang="fr"
        placeholder={
          lang === "es"
            ? "Escribe una palabra o una frase."
            : "Écrivez un mot ou une phrase."
        }
        /* Entrée écoute ; un retour à la ligne ne changerait rien à la lecture. */
        onKeyDown={(event) => {
          if (event.key !== "Enter" || event.nativeEvent.isComposing) return;
          event.preventDefault();
          listen();
        }}
      />

      <div className={styles.controls}>
        <button type="submit" className="button button-primary">
          <T fr="Écouter" es="Escuchar" />
        </button>
        <button type="button" className="button" onClick={() => listen(SLOW)}>
          <T fr="Lentement" es="Despacio" />
        </button>
        <button
          type="button"
          className="button"
          onClick={stop}
          disabled={!speaking}
        >
          <T fr="Arrêter" es="Parar" />
        </button>
      </div>

      <div className={styles.status} role="status">
        {problem && <SpeechProblemMessage problem={problem} />}
        {!problem && voiceName && (
          <p className={styles.voice}>
            <T fr={`Voix : ${voiceName}`} es={`Voz: ${voiceName}`} />
          </p>
        )}
      </div>
    </form>
  );
}
