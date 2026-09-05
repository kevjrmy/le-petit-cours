"use client";

export interface Account {
  /** The only identity an account carries — `docs/decisions.md` #22. */
  email: string;
}

/**
 * Who is signed in, or `null`.
 *
 * A **client** hook on purpose. The session must never be read in the root
 * layout, or in any layout above a lesson: that opts every page underneath out
 * of static prerendering and nothing fails loudly when it happens
 * (`AGENTS.md` §8). `AccountMenu` is a client leaf living inside the layout, so
 * it can know who is signed in without the layout knowing.
 *
 * **Unwired.** Supabase Auth, the browser client and `/auth/callback` do not
 * exist yet, so this returns `null` and the shell renders its signed-out state.
 * When they land this is the only file that changes — swap the body for a
 * subscription to `onAuthStateChange` and the chrome above it already works.
 */
export function useAccount(): Account | null {
  return null;
}
