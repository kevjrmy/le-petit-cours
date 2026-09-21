"use client";

import { useState } from "react";
import { CHOOSABLE_LEVELS, type Level } from "@/data/navigation";
import { SaveSettingError, saveLevel } from "@/lib/account";
import styles from "./AccountSettings.module.css";

/** What each level is for, in the learner's own terms rather than in CEFR's. */
const BLURB: Record<Level, string> = {
  A1: "Vous commencez. Se présenter, compter, demander quelque chose, comprendre une phrase simple.",
  A2: "Vous vous débrouillez. Raconter au passé, donner un avis, tenir une conversation du quotidien.",
  B1: "Vous suivez une conversation. Raconter en détail, expliquer un choix, donner un avis sur un texte.",
  B2: "",
};

/*
 * **The chooser offers the levels and rates none of them** (#77). There was a
 * « en cours » chip here, and a line under each unfinished level saying what it
 * actually held; both are gone with `COURSE_LEVELS` and `IN_PROGRESS`. They
 * were written for a stranger arriving at an unfinished course, and this course
 * has none: it is unlisted, it has no sign-up form, and an account is made by
 * hand for someone who was told what the course is when they were given it.
 *
 * **#51 is not reopened.** It forbids announcing a page that is not written,
 * and nothing here announces one. What was dropped is a *rating* of the levels,
 * which is a different claim. Completeness lives in `docs/programme-a1.md` and
 * in #15, where it was before the chip existed.
 *
 * **This is the first thing to put back if the site is ever listed or opens
 * sign-up.** The badge comes back before the door does.
 */

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
        Une leçon reste proposée aux niveaux au-dessus de celui où elle a été
        écrite : monter d’un niveau n’enlève rien, et ce que vous avez terminé
        reste terminé. Le B2 s’ouvrira ici quand il aura des leçons.
      </p>

      {error && (
        <div className="message message-danger" role="status">
          {error}
        </div>
      )}
    </section>
  );
}
