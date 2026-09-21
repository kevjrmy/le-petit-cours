"use client";

import { useState } from "react";
import { CHOOSABLE_LEVELS, COURSE_LEVELS, type Level } from "@/data/navigation";
import { SaveSettingError, saveLevel } from "@/lib/account";
import styles from "./AccountSettings.module.css";

/** What each level is for, in the learner's own terms rather than in CEFR's. */
const BLURB: Record<Level, string> = {
  A1: "Vous commencez. Se présenter, compter, demander quelque chose, comprendre une phrase simple.",
  A2: "Vous vous débrouillez. Raconter au passé, donner un avis, tenir une conversation du quotidien.",
  B1: "Vous suivez une conversation. Raconter en détail, expliquer un choix, donner un avis sur un texte.",
  B2: "",
};

/**
 * What a level offered before it is written actually contains, today.
 *
 * **Without this the blurb above is a promise the course cannot keep** (#51,
 * #74). A1 says « se présenter, compter, demander quelque chose » and would
 * hand someone the conjugation tables and the spelling pages, because those are
 * tagged `[]` and show at every level — so the honest line is the one that says
 * so before they choose, not a sommaire that looks broken afterwards.
 *
 * **B1 is unfinished in the other direction** (#76): it already lists every A2
 * lesson, because a page is offered from its floor upward, so it is already a
 * full course with nothing of its own in it yet. Saying so is what stops someone
 * choosing B1, recognising the A2 sommaire and concluding the setting is
 * broken.
 *
 * A level in `COURSE_LEVELS` draws none of this. **Keep the two in step**: move
 * a level into `COURSE_LEVELS` and delete its line here in the same edit, or
 * the course goes on apologising for a level it has finished.
 */
const IN_PROGRESS: Partial<Record<Level, string>> = {
  A1: "En cours d’écriture. Pour l’instant ce niveau montre les premières leçons de vocabulaire et de conversation écrites pour lui, les tableaux de conjugaison et l’orthographe.",
  B1: "En cours d’écriture. Ce niveau reprend tout le cours d’A2, y ajoute des questions plus difficiles dans les lectures et les exercices, et commence à avoir ses propres leçons de grammaire.",
};

const PROBLEM: Record<string, string> = {
  unavailable: "L’enregistrement n’a pas abouti. Vérifiez votre connexion et réessayez.",
  "no-session": "Votre session a expiré. Reconnectez-vous pour enregistrer.",
  rejected: "Ce niveau n’est pas encore ouvert.",
};

export function LevelChooser({ current }: { current: Level | null }) {
  const [saving, setSaving] = useState<Level | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function choose(level: Level) {
    if (level === current) return;
    setSaving(level);
    setError(null);
    try {
      /* Nothing to reload: updateUser emits USER_UPDATED, the provider is
         subscribed, and every consumer re-renders with the new value. */
      await saveLevel(level);
    } catch (caught) {
      setError(
        caught instanceof SaveSettingError
          ? (PROBLEM[caught.problem] ?? PROBLEM.unavailable)
          : PROBLEM.unavailable,
      );
    } finally {
      setSaving(null);
    }
  }

  return (
    <section>
      <h2>{current ? "Votre niveau" : "Choisissez votre niveau"}</h2>
      <p>
        Il décide de ce que le sommaire vous propose. Rien n’est verrouillé :
        une leçon d’un autre niveau reste lisible si vous tombez dessus, et vous
        pouvez changer d’avis quand vous voulez sans rien perdre.
      </p>

      <ul className={styles.levels}>
        {CHOOSABLE_LEVELS.map((level) => (
          <li key={level}>
            <button
              type="button"
              className={styles.level}
              aria-pressed={current === level}
              disabled={saving !== null}
              onClick={() => choose(level)}
            >
              <span className={styles.levelName}>
                {level}
                {!COURSE_LEVELS.includes(level) && (
                  <span className={styles.levelTag}>en cours</span>
                )}
                {/* A tick as well as the fill, so the choice is not carried by
                    colour alone. */}
                <svg className={styles.levelTick} viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M5 12.5l4.5 4.5L19 7.5" />
                </svg>
              </span>
              <span className={styles.levelBlurb}>{BLURB[level]}</span>
              {IN_PROGRESS[level] && (
                <span className={styles.levelNote}>{IN_PROGRESS[level]}</span>
              )}
              {saving === level && (
                <span className="visually-hidden">Enregistrement en cours</span>
              )}
            </button>
          </li>
        ))}
      </ul>

      <p className={styles.aside}>
        L’A2 est le niveau écrit ; l’A1 et le B1 s’écrivent en ce moment et sont
        proposés pour que vous puissiez les suivre. Une leçon reste proposée aux
        niveaux au-dessus de celui où elle a été écrite : monter d’un niveau
        n’enlève rien, et ce que vous avez terminé reste terminé. Le B2 s’ouvrira
        ici quand il aura des leçons.
      </p>

      {error && (
        <div className="message message-danger" role="status">
          {error}
        </div>
      )}
    </section>
  );
}
