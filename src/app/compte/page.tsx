import type { Metadata } from "next";
import { AccountSettings } from "@/components/account/AccountSettings";

export const metadata: Metadata = { title: "Compte" };

/* A route, not a dialog, so it is linkable and the topbar stays free of auth UI
   (docs/decisions.md #26). The page stays a Server Component; everything that
   needs to know who is signed in lives in the client leaf below, which is what
   keeps this route — and the habit — from reading the session (AGENTS.md §8).

   It used to need a Suspense boundary so the leaf could read `?erreur=` from
   the URL without forcing the route dynamic. Nothing redirects here with a
   reason any more: username and password sign in without leaving the page, so
   there is no callback and no error to carry back (#37). */
export default function ComptePage() {
  return (
    <article className="prose">
      <h1>Compte</h1>
      <AccountSettings />
    </article>
  );
}
