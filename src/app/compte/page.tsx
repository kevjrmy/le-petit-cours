import type { Metadata } from "next";

export const metadata: Metadata = { title: "Compte" };

/* A route, not a dialog, so it is linkable and a magic link can return to it
   (docs/decisions.md #26). The sign-in form itself is not written: Supabase
   Auth, the /auth/callback handler and the level question all come later.
   Nothing here reads the session — that stays at the leaves (AGENTS.md §8). */
export default function ComptePage() {
  return (
    <div className="prose">
      <h1>Compte</h1>
      <p style={{ marginTop: "0.75rem" }}>
        Tout le contenu du site est en accès libre, sans compte. Un compte servira
        uniquement à garder votre progression et le niveau que vous avez choisi
        d&rsquo;un appareil à l&rsquo;autre.
      </p>
      <div className="attention" style={{ marginTop: "1.25rem" }}>
        la connexion n&rsquo;est pas encore en service. Elle se fera par lien
        envoyé par courriel, sans mot de passe.
      </div>
    </div>
  );
}
