"use client";

import { useState } from "react";
import { signIn, SignInError, type SignInProblem } from "@/lib/account";
import styles from "./AccountSettings.module.css";

type State =
  | { kind: "idle" }
  | { kind: "signing" }
  | { kind: "error"; message: string };

/**
 * Username and password, the classic way in.
 *
 * **There is no sign-up form, and that is the design rather than an omission**
 * (`docs/decisions.md` #37). Accounts are created by hand in the Supabase
 * dashboard and the credentials handed over directly. Nothing on this page can
 * create one, and public sign-up is turned off at the Supabase end so nothing
 * else can either.
 *
 * **Either a username or an email address** gets you in (#38) — the `@` is what
 * decides, and `signIn` resolves a username through the database before
 * authenticating.
 *
 * Nothing here is a Server Component's business: the whole exchange happens in
 * the browser client, `signInWithPassword` returns a session directly, and
 * there is no redirect to come back from. That is what let `/auth/callback`
 * and the server client be deleted with it.
 */
const PROBLEM: Record<SignInProblem, string> = {
  unavailable: "La connexion n’est pas configurée sur ce site.",
  credentials: "Identifiant ou mot de passe incorrect.",
  /* Not the learner's mistake: it means the account was created without
     « Auto Confirm User » and no mail can reach a fake address, so it can only
     be fixed in the dashboard (#37). Without naming it, this surfaces as a
     generic failure on correct credentials — miserable to debug. */
  unconfirmed:
    "Ce compte n’a pas été activé. Signalez-le à la personne qui vous l’a donné.",
  failed: "La connexion n’a pas abouti. Réessayez dans un instant.",
};
export function SignInForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [state, setState] = useState<State>({ kind: "idle" });

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (username.trim() === "" || password === "") return;

    setState({ kind: "signing" });
    try {
      /* Nothing to do on success: signInWithPassword emits SIGNED_IN, the
         provider is subscribed, and this component is replaced by the
         settings. */
      await signIn(username, password);
    } catch (error) {
      setState({
        kind: "error",
        message:
          error instanceof SignInError ? PROBLEM[error.problem] : PROBLEM.failed,
      });
      setPassword("");
    }
  }

  return (
    <section>
      <h2>Se connecter</h2>
      <p>
        Tout le contenu du site est en accès libre, sans compte. Un compte sert
        uniquement à garder vos leçons cochées et le niveau que vous avez choisi
        d&rsquo;un appareil à l&rsquo;autre — plus, si vous voulez, le nom sous
        lequel le site vous appelle.
      </p>

      <form className={styles.form} onSubmit={onSubmit} noValidate>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="username">
            Identifiant ou adresse électronique
          </label>
          <input
            id="username"
            className={styles.input}
            type="text"
            value={username}
            autoComplete="username"
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck={false}
            aria-describedby="signin-help"
            onChange={(event) => {
              setUsername(event.target.value);
              setState({ kind: "idle" });
            }}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="password">
            Mot de passe
          </label>
          <input
            id="password"
            className={styles.input}
            type="password"
            value={password}
            autoComplete="current-password"
            aria-describedby="signin-help"
            onChange={(event) => {
              setPassword(event.target.value);
              setState({ kind: "idle" });
            }}
          />
        </div>

        <div className={styles.row}>
          <button
            type="submit"
            className="button button-primary"
            disabled={
              state.kind === "signing" ||
              username.trim() === "" ||
              password === ""
            }
          >
            {state.kind === "signing" ? "Connexion…" : "Se connecter"}
          </button>
        </div>

        <p
          id="signin-help"
          role="status"
          className={`${styles.help} ${state.kind === "error" ? styles.helpBad : ""}`}
        >
          {state.kind === "error" ? state.message : " "}
        </p>
      </form>

      {/* Said plainly rather than hidden behind a « Créer un compte » link that
          leads nowhere. Someone without an account is not stuck — the book is
          the site, and it is open. */}
      <p className={styles.aside}>
        Les comptes ne se créent pas depuis le site : ils sont attribués. Si
        vous n&rsquo;en avez pas, vous pouvez lire et faire tout le site sans en
        avoir un — seule la progression d&rsquo;un appareil à l&rsquo;autre
        demande un compte.
      </p>
    </section>
  );
}
