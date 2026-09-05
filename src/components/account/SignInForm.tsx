"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { getSupabaseClient } from "@/lib/supabase/client";
import styles from "./AccountSettings.module.css";

type State =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "sent"; email: string }
  | { kind: "error"; message: string };

/** Reasons `/auth/callback` can send someone back here. */
const CALLBACK_ERROR: Record<string, string> = {
  lien: "Ce lien n’est plus valable. Les liens expirent, et ne servent qu’une fois — demandez-en un nouveau.",
  indisponible:
    "La connexion est momentanément indisponible. Réessayez dans un instant.",
};

export function SignInForm() {
  const params = useSearchParams();
  const [email, setEmail] = useState("");
  const [state, setState] = useState<State>({ kind: "idle" });

  const callbackError = CALLBACK_ERROR[params.get("erreur") ?? ""] ?? null;

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    const address = email.trim();
    if (!address) return;

    const supabase = getSupabaseClient();
    if (!supabase) {
      setState({
        kind: "error",
        message: "La connexion n’est pas configurée sur ce site.",
      });
      return;
    }

    setState({ kind: "sending" });
    const { error } = await supabase.auth.signInWithOtp({
      email: address,
      options: {
        /* Must match one of the redirect URLs allowed in the Supabase
           dashboard, or the link bounces to the site URL instead — which on a
           preview deploy means landing in production. */
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      setState({
        kind: "error",
        message:
          "L’envoi n’a pas abouti. Vérifiez l’adresse, puis réessayez dans un instant.",
      });
      return;
    }
    setState({ kind: "sent", email: address });
  }

  if (state.kind === "sent") {
    return (
      <section>
        <h2>Regardez vos courriels</h2>
        <p>
          Un lien de connexion vient d’être envoyé à{" "}
          <strong>{state.email}</strong>. Ouvrez-le sur cet appareil pour être
          connecté.
        </p>
        <p className={styles.aside}>
          Rien reçu ? Le message met parfois une minute, et il arrive qu’il
          tombe dans les indésirables.{" "}
          <button
            type="button"
            className={styles.linkish}
            onClick={() => setState({ kind: "idle" })}
          >
            Réessayer avec une autre adresse
          </button>
          .
        </p>
      </section>
    );
  }

  return (
    <section>
      <h2>Se connecter</h2>
      <p>
        Tout le contenu du site est en accès libre, sans compte. Un compte sert
        uniquement à garder vos leçons cochées et le niveau que vous avez choisi
        d’un appareil à l’autre — plus, si vous voulez, le nom sous lequel le
        site vous appelle.
      </p>
      <p>
        Il n’y a pas de mot de passe : vous recevez un lien par courriel, et
        vous cliquez dessus.
      </p>

      {callbackError && (
        <div className="message message-danger">{callbackError}</div>
      )}

      <form className={styles.form} onSubmit={onSubmit}>
        <label className={styles.label} htmlFor="email">
          Adresse électronique
        </label>
        <div className={styles.row}>
          <input
            id="email"
            className={styles.input}
            type="email"
            value={email}
            required
            autoComplete="email"
            inputMode="email"
            placeholder="vous@exemple.fr"
            aria-describedby="email-help"
            onChange={(event) => {
              setEmail(event.target.value);
              setState({ kind: "idle" });
            }}
          />
          <button
            type="submit"
            className="button button-primary"
            disabled={state.kind === "sending" || email.trim() === ""}
          >
            {state.kind === "sending" ? "Envoi…" : "Recevoir le lien"}
          </button>
        </div>
        <p
          id="email-help"
          role="status"
          className={`${styles.help} ${state.kind === "error" ? styles.helpBad : ""}`}
        >
          {state.kind === "error"
            ? state.message
            : "Votre adresse ne sert qu’à vous connecter."}
        </p>
      </form>
    </section>
  );
}
