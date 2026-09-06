"use client";

import { useState } from "react";
import { CHOOSABLE_LEVELS, type Level } from "@/data/navigation";
import { SaveSettingError, saveLevel } from "@/lib/account";
import styles from "./AccountSettings.module.css";

/** What each level is for, in the learner's own terms rather than in CEFR's. */
const BLURB: Record<Level, string> = {
  A1: "Vous commencez. Se présenter, compter, demander quelque chose, comprendre une phrase simple.",
  A2: "Vous vous débrouillez. Raconter au passé, donner un avis, tenir une conversation du quotidien.",
  B1: "",
  B2: "",
  C1: "",
  C2: "",
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
                {/* A tick as well as the fill, so the choice is not carried by
                    colour alone. */}
                <svg className={styles.levelTick} viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M5 12.5l4.5 4.5L19 7.5" />
                </svg>
              </span>
              <span className={styles.levelBlurb}>{BLURB[level]}</span>
              {saving === level && (
                <span className="visually-hidden">Enregistrement en cours</span>
              )}
            </button>
          </li>
        ))}
      </ul>

      <p className={styles.aside}>
        Les autres niveaux ne sont pas proposables tant qu’ils sont vides : le
        cours s’écrit en A2 d’abord, et chaque niveau s’ouvrira ici quand il
        aura des leçons.
      </p>

      {error && (
        <div className="message message-danger" role="status">
          {error}
        </div>
      )}
    </section>
  );
}
