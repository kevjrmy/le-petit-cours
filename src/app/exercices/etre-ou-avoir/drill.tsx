"use client";

import dynamic from "next/dynamic";

/**
 * The client boundary, and the reason it exists: **`ssr: false`**.
 *
 * A drill's deck is shuffled, and a shuffle is the textbook hydration bug —
 * `'use client'` means "hydrate this on the client", not "skip the server", so
 * the server renders one order and the browser another
 * (`.claude/agents/exercise-author.md`). The two ways out are shuffling in an
 * effect after mount, or not server-rendering the drill at all. The first is no
 * longer available: `react-hooks/set-state-in-effect` rejects the `setState`
 * that would publish the deck, and working around a correctness rule to satisfy
 * a lint rule is worse than either. So the board loads in the browser only.
 *
 * Nothing is lost by it. A drill's initial HTML is a board nobody can use until
 * the JavaScript arrives; the page around it — the title, the instructions, the
 * cross-links, the tick — is still a Server Component and still prerenders.
 */
const Board = dynamic(() => import("./board").then((m) => m.Board), {
  ssr: false,
  loading: () => <p>Préparation de l’exercice…</p>,
});

export function EtreOuAvoirDrill() {
  return <Board />;
}
