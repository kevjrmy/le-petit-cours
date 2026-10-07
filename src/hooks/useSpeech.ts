"use client";

import { useEffect, useRef, useState } from "react";

/** Why nothing was said: no speech in this browser, or no voice for the language. */
export type SpeechProblem = "unsupported" | "no-voice";

/* Chrome fills its list after the page has loaded and says so with
   `voiceschanged`; a browser that never fires it has told us all it will. */
const VOICES_TIMEOUT = 1500;

/** The voice's language tag, with the underscore Android still writes (`fr_FR`) folded. */
function tagOf(voice: SpeechSynthesisVoice): string {
  return voice.lang.replace("_", "-").toLowerCase();
}

/** A voice of `lang`'s own language: its region first (`fr-FR`), else any (`fr-CA`). */
function pickVoice(
  voices: SpeechSynthesisVoice[],
  lang: string,
): SpeechSynthesisVoice | null {
  const wanted = lang.toLowerCase();
  const [base] = wanted.split("-");
  const matching = voices.filter((voice) => {
    const tag = tagOf(voice);
    return tag === base || tag.startsWith(`${base}-`);
  });
  return matching.find((voice) => tagOf(voice) === wanted) ?? matching[0] ?? null;
}

function loadVoices(synth: SpeechSynthesis): Promise<SpeechSynthesisVoice[]> {
  return new Promise((resolve) => {
    const settle = () => {
      window.clearTimeout(timer);
      synth.removeEventListener?.("voiceschanged", settle);
      resolve(synth.getVoices());
    };
    const timer = window.setTimeout(settle, VOICES_TIMEOUT);
    /* Optional call: before Safari 16 `speechSynthesis` is not an event target,
       and the timeout is then the only way out. */
    synth.addEventListener?.("voiceschanged", settle);
  });
}

/**
 * The one way the course speaks (`docs/decisions.md` #94). Never hand-roll a
 * `SpeechSynthesisUtterance` beside it.
 *
 * **A voice of the language asked, or silence.** An utterance carrying only
 * `lang` is read by the device's default voice wherever no voice matches, so a
 * browser set to Spanish reads French with Spanish sounds and nothing fails.
 * The voice is therefore chosen here and set on the utterance, and when there
 * is none `speak` says nothing and `problem` says why.
 *
 * `problem` is known **after the first `speak`**, never on mount: the list of
 * voices is empty until the browser has loaded it, and a check on mount flashes
 * a false alarm.
 */
export function useSpeech(lang = "fr-FR") {
  const [speaking, setSpeaking] = useState(false);
  const [problem, setProblem] = useState<SpeechProblem | null>(null);
  const [voiceName, setVoiceName] = useState<string | null>(null);

  /* Held for two reasons: Chrome drops `onend` when the utterance is garbage
     collected mid-speech, and the `end` of a cancelled utterance arrives after
     the next one has started, where it must not clear `speaking`. */
  const current = useRef<SpeechSynthesisUtterance | null>(null);
  /* Counts the calls, so a `speak` still waiting for its voices knows it has
     been overtaken, by a later call, by `stop` or by the page going away. */
  const turn = useRef(0);

  useEffect(() => {
    const synth: SpeechSynthesis | undefined = window.speechSynthesis;
    /* Asking is what starts the list loading, so the first click finds it
       ready and speaks inside its own gesture. */
    synth?.getVoices();
    const calls = turn;
    return () => {
      calls.current += 1;
      synth?.cancel();
    };
  }, []);

  function speak(text: string, { rate = 1 }: { rate?: number } = {}) {
    const synth: SpeechSynthesis | undefined = window.speechSynthesis;
    if (!synth || typeof SpeechSynthesisUtterance === "undefined") {
      setProblem("unsupported");
      return;
    }

    turn.current += 1;
    const ticket = turn.current;
    if (synth.speaking || synth.pending) synth.cancel();

    const start = (voices: SpeechSynthesisVoice[]) => {
      if (ticket !== turn.current) return;

      const voice = pickVoice(voices, lang);
      if (!voice) {
        current.current = null;
        setSpeaking(false);
        setProblem("no-voice");
        return;
      }

      const utterance = new SpeechSynthesisUtterance(text);
      /* Both, on purpose: Chrome on Android has ignored `voice` and read by
         `lang` alone. */
      utterance.voice = voice;
      utterance.lang = voice.lang.replace("_", "-");
      utterance.rate = rate;

      const done = () => {
        if (current.current !== utterance) return;
        current.current = null;
        setSpeaking(false);
      };
      utterance.onend = done;
      utterance.onerror = done;

      current.current = utterance;
      setProblem(null);
      setVoiceName(voice.name);
      setSpeaking(true);
      synth.speak(utterance);
    };

    /* Synchronous when the list is there: Safari on a phone only speaks from
       inside the gesture that asked. */
    const voices = synth.getVoices();
    if (voices.length > 0) start(voices);
    else void loadVoices(synth).then(start);
  }

  function stop() {
    turn.current += 1;
    current.current = null;
    const synth: SpeechSynthesis | undefined = window.speechSynthesis;
    synth?.cancel();
    setSpeaking(false);
  }

  return { speak, stop, speaking, problem, voiceName };
}
