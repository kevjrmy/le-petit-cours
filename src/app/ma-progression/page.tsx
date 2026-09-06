import type { Metadata } from "next";
import { Progression } from "@/components/progress/Progression";

export const metadata: Metadata = {
  title: "Ma progression",
  description: "Les leçons que vous avez terminées, chapitre par chapitre.",
};

/* A Server Component, like every other route. Everything that needs to know
   who is signed in — and what they have ticked — lives in the client leaf
   below, which is what keeps this page from reading the session and dragging
   the route out of static prerendering (AGENTS.md §8). */
export default function MaProgressionPage() {
  return (
    <article className="prose">
      <h1>Ma progression</h1>
      <Progression />
    </article>
  );
}
