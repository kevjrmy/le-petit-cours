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
      {/* **No `<h1>` here.** The one heading this page has depends on who is
          asking — « Se connecter » for somebody who came to sign in, « Compte »
          for somebody changing their level — so it is drawn by the client leaf
          that knows, and the prerendered HTML carries the signed-out one. Two
          headings, « Compte » over « Se connecter », spent the page's first
          screen naming the route twice (#26). The `<title>` stays « Compte »:
          static metadata is per-route, which is the one thing one route cannot
          do (#26). */}
      <Suspense fallback={null}>
        <ReturnTo />
      </Suspense>
      <AccountSettings />
    </article>
  );
}
