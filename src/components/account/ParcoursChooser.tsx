"use client";

import { useState } from "react";
import { etapesOf, PARCOURS, type Parcours } from "@/data/parcours";
import { SaveSettingError, saveParcours } from "@/lib/account";
import { Choice } from "./ViewChooser";
import styles from "./AccountSettings.module.css";

const PROBLEM: Record<string, string> = {
  unavailable: "L’enregistrement n’a pas abouti. Vérifiez votre connexion et réessayez.",
  "no-session": "Votre session a expiré. Reconnectez-vous pour enregistrer.",
  rejected: "Ce parcours n’existe plus.",
};

/** « 38 leçons en 9 étapes » — what choosing the path signs up for. */
function size(parcours: Parcours): string {
  const lessons = etapesOf(parcours).reduce((sum, etape) => sum + etape.steps.length, 0);
  const etapes = parcours.etapes.length;
  return `${lessons} leçons en ${etapes} étape${etapes === 1 ? "" : "s"}`;
}

/**
 * The path « La suite » walks (#88): one parcours, or none.
 *
 * **It does not touch the view** — two settings, one writer each. Someone on
 * the A2 path who sees only A1 is still offered A2 lessons by « La suite »: the
 * view filters what the listings offer, never what the path asks for.
 */
export function ParcoursChooser({ current }: { current: Parcours | null }) {
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function choose(id: string | null) {
    if (id === (current?.id ?? null)) return;
    setSaving(true);
    setError(null);
    try {
      await saveParcours(id);
    } catch (caught) {
      setError(
        caught instanceof SaveSettingError
          ? (PROBLEM[caught.problem] ?? PROBLEM.unavailable)
          : PROBLEM.unavailable,
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <section>
      <h2 id="parcours">{current ? "Votre parcours" : "Choisissez un parcours"}</h2>
      <p>
        Un parcours range des leçons de tous les chapitres en étapes, dans
        l’ordre où les faire, et «&nbsp;La suite&nbsp;» vous donne la prochaine.
        Une leçon cochée l’est dans tous les parcours : en changer ne fait rien
        perdre.
      </p>

      <ul className={styles.choices}>
        {PARCOURS.map((parcours) => (
          <li key={parcours.id}>
            <Choice
              name={parcours.title}
              blurb={parcours.blurb}
              meta={size(parcours)}
              pressed={current?.id === parcours.id}
              disabled={saving}
              onPress={() => choose(parcours.id)}
            />
          </li>
        ))}
        <li>
          <Choice
            name="Aucun parcours"
            blurb="Vous choisissez vos leçons vous-même, sans « La suite »."
            pressed={current === null}
            disabled={saving}
            onPress={() => choose(null)}
          />
        </li>
      </ul>

      {error && (
        <div className="message message-danger" role="status">
          {error}
        </div>
      )}
    </section>
  );
}
