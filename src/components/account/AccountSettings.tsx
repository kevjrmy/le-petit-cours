"use client";

import { useState } from "react";
import {
  checkDisplayName,
  DISPLAY_NAME_MAX,
  saveDisplayName,
  SaveDisplayNameError,
  type SaveProblem,
} from "@/lib/account";
import { displayName, useAccount, useReloadAccount } from "@/hooks/useAccount";
import { getSupabaseClient } from "@/lib/supabase/client";
import { SignInForm } from "./SignInForm";
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

  if (!account) return <SignInForm />;

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

      <section>
        <h2>Se déconnecter</h2>
        <p>
          Vos leçons cochées restent gardées ; le contenu du site reste lisible
          sans compte.
        </p>
        <p className={styles.signOut}>
          <button
            type="button"
            className="button"
            onClick={() => {
              /* No local state to clear: the provider is subscribed to
                 onAuthStateChange, so SIGNED_OUT reaches every consumer. */
              void getSupabaseClient()?.auth.signOut();
            }}
          >
            Se déconnecter
          </button>
        </p>
      </section>
    </>
  );
}

type Status =
  | { kind: "idle" }
  | { kind: "saving" }
  | { kind: "saved"; cleared: boolean }
  | { kind: "error"; message: string };

const SAVE_MESSAGE: Record<SaveProblem, string> = {
  unavailable:
    "L’enregistrement n’a pas abouti. Vérifiez votre connexion et réessayez.",
  "no-session": "Votre session a expiré. Reconnectez-vous pour enregistrer.",
  /* Not a failure to apologise for — a step that has not happened yet. */
  "no-settings-row":
    "Choisissez d’abord votre niveau : votre nom est gardé avec vos réglages.",
  rejected: "Ce nom a été refusé. Essayez-en un plus court ou plus simple.",
};

function DisplayNameField({ initial }: { initial: string | null }) {
  const reload = useReloadAccount();
  const [value, setValue] = useState(initial ?? "");
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  /* The name arrives a moment after the session — the field mounts before the
     `settings` read comes back — so it has to adopt a late-arriving value.
     Adjusting during render rather than in an effect, and rather than keying
     the component: a `key` would remount it on every change including the one
     the save itself causes, which would wipe the « Nom enregistré » the learner
     is meant to read. */
  const [lastInitial, setLastInitial] = useState(initial);
  if (initial !== lastInitial) {
    setLastInitial(initial);
    setValue(initial ?? "");
  }

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
      /* Tell the shell, or the sidebar keeps showing the old name until the
         next full load. */
      reload();
      setStatus({ kind: "saved", cleared: check.value === null });
    } catch (error) {
      setStatus({
        kind: "error",
        message:
          error instanceof SaveDisplayNameError
            ? SAVE_MESSAGE[error.problem]
            : SAVE_MESSAGE.unavailable,
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
            result without the field being re-announced on each keystroke. The
            tone is never the only carrier — every branch below says in words
            what happened. */}
        <p
          id="display-name-help"
          role="status"
          className={`${styles.help} ${
            problem !== null || status.kind === "error"
              ? styles.helpBad
              : status.kind === "saved"
                ? styles.helpGood
                : ""
          }`}
        >
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
