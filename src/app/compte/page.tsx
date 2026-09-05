import type { Metadata } from "next";
import { AccountSettings } from "@/components/account/AccountSettings";

export const metadata: Metadata = { title: "Compte" };

/* A route, not a dialog, so it is linkable and a magic link can return to it
   (docs/decisions.md #26). The page stays a Server Component; everything that
   needs to know who is signed in lives in the client leaf below, which is what
   keeps this route — and the habit — from reading the session (AGENTS.md §8).

   Still to come: the magic-link form itself, /auth/callback, and the level
   chooser this page owns (#23). */
export default function ComptePage() {
  return (
    <article className="prose">
      <h1>Compte</h1>
      <AccountSettings />
    </article>
  );
}
