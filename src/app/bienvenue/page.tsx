import type { Metadata } from "next";
import { Suspense } from "react";
import { Onboarding } from "@/components/account/Onboarding";

export const metadata: Metadata = { title: "Bienvenue", robots: { index: false } };

/* Where a first sign-in lands before going on (`ReturnTo`): the view and the
   parcours, asked once, in slides. A Server Component shell like `/compte` —
   the account and `?suivant=` are read by the client leaf, inside `Suspense`,
   so the route stays prerendered (AGENTS.md §8). */
export default function BienvenuePage() {
  return (
    <article className="prose">
      <Suspense fallback={null}>
        <Onboarding />
      </Suspense>
    </article>
  );
}
