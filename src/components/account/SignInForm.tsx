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
    /* The page's `<h1>`, not an `<h2>` under one: this *is* the page for
       somebody who came to sign in, and the accent bar an `<h2>` carries is for
       one section among several. A fragment rather than a `<section>` for the
       same reason — there is nothing here for a section to be one of. */
    <>
      <h1>Se connecter</h1>
      <p>
        Un compte garde vos leçons cochées, votre niveau et le nom sous lequel
        le site vous appelle, d&rsquo;un appareil à l&rsquo;autre.
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
          {/* A disabled button must say why it is disabled (`AGENTS.md` §5),
              and « Se connecter » starts disabled because both fields are
              empty — until now the page said so nowhere. The no-break space is
              the idle placeholder: `.help` reserves 1.2em, and an empty <p>
              would collapse the line the message appears on. */}
          {state.kind === "error"
            ? state.message
            : username.trim() === "" || password === ""
              ? "Saisissez votre identifiant et votre mot de passe."
              : " "}
        </p>
      </form>

      {/* Said plainly rather than hidden behind a « Créer un compte » link that
          leads nowhere. Someone without an account is not stuck — the course
          is the site, and it is open.

          Once, though: the paragraph above used to open with « tout le contenu
          du site est en accès libre » and this one closed with the same fact in
          other words, which is the page telling a stranger twice that they do
          not need what they are looking at. */}
      <p className={styles.aside}>
        Les comptes ne se créent pas depuis le site&nbsp;: ils sont attribués.
        Sans compte, tout le cours se lit et se fait quand même&nbsp;; seule la
        progression d&rsquo;un appareil à l&rsquo;autre en demande un.
      </p>
    </>
  );
}
