import type { Metadata } from "next";
import { Suspense } from "react";
import { AccountSettings } from "@/components/account/AccountSettings";
import { ReturnTo } from "@/components/account/ReturnTo";

export const metadata: Metadata = { title: "Compte" };

/* A route, not a dialog, so it is linkable and the topbar stays free of auth UI
   (docs/decisions.md #26). The page stays a Server Component; everything that
   needs to know who is signed in lives in the client leaf below, which is what
   keeps this route — and the habit — from reading the session (AGENTS.md §8).

   The Suspense boundary is back, for a different reason than it went: nothing
   redirects here with an error any more (#37), but the done-tick at the foot of
   a lesson sends a signed-out learner here with `?suivant=`, and reading a
   query in the page rather than in a leaf is what would make this route
   dynamic. */
export default function ComptePage() {
  return (
    <article className="prose">
      <h1>Compte</h1>
      <Suspense fallback={null}>
        <ReturnTo />
      </Suspense>
      <AccountSettings />
    </article>
  );
}
