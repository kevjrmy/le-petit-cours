"use client";

import { useState } from "react";
import { checkDisplayName, DISPLAY_NAME_MAX, saveDisplayName } from "@/lib/account";
import { displayName, useAccount } from "@/hooks/useAccount";
import styles from "./AccountSettings.module.css";

/**
 * The signed-in half of `/compte`.
 *
 * A client leaf, so the page around it stays a Server Component and keeps
 * prerendering — reading the session in the page itself would make `/compte`
 * dynamic, and the habit is what would eventually make a lesson dynamic too
 * (`AGENTS.md` §8).
 */
export function AccountSettings() {
  const account = useAccount();

  if (!account) {
    return (
      <section>
        <p>
          Tout le contenu du site est en accès libre, sans compte. Un compte
          servira uniquement à garder vos leçons cochées et le niveau que vous
          avez choisi d&rsquo;un appareil à l&rsquo;autre — plus, si vous
          voulez, le nom sous lequel le site vous appelle.
        </p>
        <div className="attention">
          la connexion n&rsquo;est pas encore en service. Elle se fera par un
          lien envoyé par courriel, sans mot de passe.
        </div>
      </section>
    );
  }

  return (
    <>
      <section>
        <h2>Vous êtes connecté</h2>
        <p>
          Sous le nom de <strong>{displayName(account)}</strong>, avec
          l&rsquo;adresse {account.email}.
        </p>
      </section>
      <DisplayNameField initial={account.displayName} />
    </>
  );
}

type Status =
  | { kind: "idle" }
  | { kind: "saving" }
  | { kind: "saved"; cleared: boolean }
  | { kind: "error"; message: string };

function DisplayNameField({ initial }: { initial: string | null }) {
  const [value, setValue] = useState(initial ?? "");
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  const check = checkDisplayName(value);
  const problem = check.ok ? null : check.problem;
  /* Code points, so the counter agrees with the rule that rejects the name. */
  const used = [...value.trim()].length;

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!check.ok) return;

    setStatus({ kind: "saving" });
    try {
      await saveDisplayName(check.value);
      setStatus({ kind: "saved", cleared: check.value === null });
    } catch {
      setStatus({
        kind: "error",
        message:
          "L’enregistrement n’est pas encore en service. Votre nom n’a pas été gardé.",
      });
    }
  }

  return (
    <section>
      <h2>Votre nom</h2>
      <p>
        Le nom sous lequel le site vous appelle. Il n&rsquo;est montré à
        personne d&rsquo;autre. Laissez le champ vide pour revenir à votre
        adresse électronique.
      </p>

      <form className={styles.form} onSubmit={onSubmit} noValidate>
        <label className={styles.label} htmlFor="display-name">
          Nom affiché
        </label>
        <div className={styles.row}>
          <input
            id="display-name"
            className={styles.input}
            type="text"
            value={value}
            maxLength={DISPLAY_NAME_MAX * 2}
            autoComplete="nickname"
            aria-describedby="display-name-help"
            aria-invalid={problem !== null}
            onChange={(event) => {
              setValue(event.target.value);
              setStatus({ kind: "idle" });
            }}
          />
          <button
            type="submit"
            className="button button-primary"
            disabled={problem !== null || status.kind === "saving"}
          >
            {status.kind === "saving" ? "Enregistrement…" : "Enregistrer"}
          </button>
        </div>

        {/* One live region for every outcome, so a screen reader hears the
            result without the field being re-announced on each keystroke. */}
        <p id="display-name-help" className={styles.help} role="status">
          {problem === "too-long" &&
            `${used} caractères sur ${DISPLAY_NAME_MAX} au maximum.`}
          {problem === "control-chars" &&
            "Ce nom contient un caractère qui n’est pas autorisé."}
          {problem === null && status.kind === "saved" && status.cleared &&
            "Nom effacé. Le site utilisera votre adresse électronique."}
          {problem === null && status.kind === "saved" && !status.cleared &&
            "Nom enregistré."}
          {problem === null && status.kind === "error" && status.message}
          {problem === null && status.kind === "idle" &&
            `${used} caractère${used === 1 ? "" : "s"} sur ${DISPLAY_NAME_MAX}.`}
        </p>
      </form>
    </section>
  );
}
