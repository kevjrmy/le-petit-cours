"use client";

import { useState } from "react";
import {
  checkDisplayName,
  checkUsername,
  DISPLAY_NAME_MAX,
  PASSWORD_MIN,
  saveDisplayName,
  savePassword,
  saveUsername,
  SaveSettingError,
  USERNAME_MAX,
  type SaveProblem,
} from "@/lib/account";
import { displayName, useAccount } from "@/hooks/useAccount";
import { LevelChooser } from "./LevelChooser";
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
        {/* The name falls back to the username, so naming both when no name is
            set would say the same word twice — which is what it did the day the
            fallback stopped being the local part of an email address (#37). */}
        {account.displayName === null ? (
          <p>
            Avec l&rsquo;identifiant <strong>{account.username}</strong>.
          </p>
        ) : (
          <p>
            Sous le nom de <strong>{displayName(account)}</strong>, avec
            l&rsquo;identifiant <strong>{account.username}</strong>.
          </p>
        )}
      </section>
      {/* Both arrive with the session, so there is no loading state to show and
          no ordering between them: the level no longer has to exist before a
          name can be saved (#36). The level still comes first because it is the
          one a learner is asked for once, on arrival (#23). */}
      <LevelChooser current={account.level} />
      <UsernameField initial={account.username} />
      <DisplayNameField initial={account.displayName} />
      <PasswordField email={account.email} />

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
  rejected: "Ce nom a été refusé. Essayez-en un plus court ou plus simple.",
  weak: `Ce mot de passe est trop court : ${PASSWORD_MIN} caractères au minimum.`,
  unchanged: "C’est déjà votre mot de passe actuel.",
  taken: "Cet identifiant est déjà pris. Essayez-en un autre.",
};

function DisplayNameField({ initial }: { initial: string | null }) {
  const [value, setValue] = useState(initial ?? "");
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  /* The field has to adopt a value that changes underneath it — after a save,
     when USER_UPDATED comes back through the provider, and when a different
     learner signs in. Adjusting during render rather than in an effect, and
     rather than keying the component: a `key` would remount it on every change
     including the one the save itself causes, which would wipe the « Nom
     enregistré » the learner is meant to read. */
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
      /* Nothing to reload: updateUser emits USER_UPDATED, the provider is
         subscribed, and the sidebar re-renders with the new name. */
      await saveDisplayName(check.value);
      setStatus({ kind: "saved", cleared: check.value === null });
    } catch (error) {
      setStatus({
        kind: "error",
        message:
          error instanceof SaveSettingError
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
        identifiant.
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
            "Nom effacé. Le site utilisera votre identifiant."}
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

/**
 * Changing the password.
 *
 * Present because it is the only recovery path a learner has: an account holds
 * no address, so nothing can be emailed to anyone and a forgotten password is
 * reset by hand in the dashboard (#37). The current password is asked for even
 * though Supabase does not require it — see `savePassword`.
 */
function PasswordField({ email }: { email: string }) {
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  const short = next !== "" && [...next].length < PASSWORD_MIN;
  const ready = current !== "" && next !== "" && !short;

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!ready) return;

    setStatus({ kind: "saving" });
    try {
      await savePassword(email, current, next);
      setCurrent("");
      setNext("");
      setStatus({ kind: "saved", cleared: false });
    } catch (error) {
      setStatus({
        kind: "error",
        message:
          error instanceof SaveSettingError
            ? error.problem === "no-session"
              ? "Votre mot de passe actuel n’est pas le bon."
              : SAVE_MESSAGE[error.problem]
            : SAVE_MESSAGE.unavailable,
      });
    }
  }

  return (
    <section>
      <h2>Votre mot de passe</h2>
      <p>
        Vous pouvez le changer quand vous voulez. Il n&rsquo;y a pas de
        récupération automatique : votre compte ne garde aucune adresse
        électronique, donc si vous l&rsquo;oubliez, il faut en redemander un.
      </p>

      <form className={styles.form} onSubmit={onSubmit} noValidate>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="current-password">
            Mot de passe actuel
          </label>
          <input
            id="current-password"
            className={styles.input}
            type="password"
            value={current}
            autoComplete="current-password"
            aria-describedby="password-help"
            onChange={(event) => {
              setCurrent(event.target.value);
              setStatus({ kind: "idle" });
            }}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="new-password">
            Nouveau mot de passe
          </label>
          <input
            id="new-password"
            className={styles.input}
            type="password"
            value={next}
            autoComplete="new-password"
            aria-describedby="password-help"
            aria-invalid={short}
            onChange={(event) => {
              setNext(event.target.value);
              setStatus({ kind: "idle" });
            }}
          />
        </div>

        <div className={styles.row}>
          <button
            type="submit"
            className="button button-primary"
            disabled={!ready || status.kind === "saving"}
          >
            {status.kind === "saving" ? "Enregistrement…" : "Changer"}
          </button>
        </div>

        <p
          id="password-help"
          role="status"
          className={`${styles.help} ${
            short || status.kind === "error"
              ? styles.helpBad
              : status.kind === "saved"
                ? styles.helpGood
                : ""
          }`}
        >
          {short && `${PASSWORD_MIN} caractères au minimum.`}
          {!short && status.kind === "saved" && "Mot de passe changé."}
          {!short && status.kind === "error" && status.message}
          {!short && (status.kind === "idle" || status.kind === "saving") &&
            `${PASSWORD_MIN} caractères au minimum.`}
        </p>
      </form>
    </section>
  );
}

/**
 * Changing the username.
 *
 * The name is unique across accounts and mutable (#38), which is the pair that
 * put it in a table rather than in metadata: uniqueness needs a constraint, and
 * a constraint needs a column. Everything the learner sees about the outcome —
 * including « déjà pris » — comes from that constraint rejecting the write,
 * never from a check this component made first. Asking "is it free?" before
 * writing would be a race and a second enumeration oracle.
 */
function UsernameField({ initial }: { initial: string }) {
  const [value, setValue] = useState(initial);
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  /* Adopt a value that changed underneath us — after a successful rename, when
     TOKEN_REFRESHED brings the new name back through the provider. Same shape
     as DisplayNameField, and for the same reason: a `key` would remount and
     wipe the confirmation the learner is meant to read. */
  const [lastInitial, setLastInitial] = useState(initial);
  if (initial !== lastInitial) {
    setLastInitial(initial);
    setValue(initial);
  }

  const check = checkUsername(value);
  const problem = check.ok ? null : check.problem;
  const unchanged = check.ok && check.value === initial;

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!check.ok || unchanged) return;

    setStatus({ kind: "saving" });
    try {
      await saveUsername(check.value);
      setStatus({ kind: "saved", cleared: false });
    } catch (error) {
      setStatus({
        kind: "error",
        message:
          error instanceof SaveSettingError
            ? SAVE_MESSAGE[error.problem]
            : SAVE_MESSAGE.unavailable,
      });
    }
  }

  return (
    <section>
      <h2>Votre identifiant</h2>
      <p>
        Ce que vous tapez pour vous connecter. Vous pouvez en changer : votre
        progression suit le compte, pas le nom. Minuscules, chiffres, et{" "}
        <code>. _ -</code> à l&rsquo;intérieur.
      </p>

      <form className={styles.form} onSubmit={onSubmit} noValidate>
        <label className={styles.label} htmlFor="username-field">
          Identifiant
        </label>
        <div className={styles.row}>
          <input
            id="username-field"
            className={styles.input}
            type="text"
            value={value}
            maxLength={USERNAME_MAX * 2}
            autoComplete="username"
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck={false}
            aria-describedby="username-field-help"
            aria-invalid={problem !== null}
            onChange={(event) => {
              setValue(event.target.value);
              setStatus({ kind: "idle" });
            }}
          />
          <button
            type="submit"
            className="button button-primary"
            disabled={problem !== null || unchanged || status.kind === "saving"}
          >
            {status.kind === "saving" ? "Enregistrement…" : "Changer"}
          </button>
        </div>

        <p
          id="username-field-help"
          role="status"
          className={`${styles.help} ${
            problem !== null || status.kind === "error"
              ? styles.helpBad
              : status.kind === "saved"
                ? styles.helpGood
                : ""
          }`}
        >
          {problem === "too-short" && "Deux caractères au minimum."}
          {problem === "too-long" && `${USERNAME_MAX} caractères au maximum.`}
          {problem === "charset" &&
            "Minuscules et chiffres, en début et en fin ; . _ - seulement à l’intérieur."}
          {problem === null && status.kind === "error" && status.message}
          {problem === null && status.kind === "saved" && "Identifiant changé."}
          {problem === null &&
            status.kind !== "error" &&
            status.kind !== "saved" &&
            (unchanged
              ? "C’est votre identifiant actuel."
              : "Vous vous connecterez avec ce nom.")}
        </p>
      </form>
    </section>
  );
}
