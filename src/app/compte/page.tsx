import type { Metadata } from "next";
import { Suspense } from "react";
import { AccountSettings } from "@/components/account/AccountSettings";

export const metadata: Metadata = { title: "Compte" };

/* A route, not a dialog, so it is linkable and a magic link can return to it
   (docs/decisions.md #26). The page stays a Server Component; everything that
   needs to know who is signed in lives in the client leaf below, which is what
   keeps this route — and the habit — from reading the session (AGENTS.md §8).

   The Suspense boundary is what lets that leaf read `?erreur=` from the URL
   with `useSearchParams` while this page still prerenders as static HTML.
   Without it the whole route would be forced dynamic.

   Still to come: the level chooser this page owns (#23). */
export default function ComptePage() {
  return (
    <article className="prose">
      <h1>Compte</h1>
      <Suspense fallback={null}>
        <AccountSettings />
      </Suspense>
    </article>
  );
}
