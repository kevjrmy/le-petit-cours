/**
 * Display-name rules, mirroring `settings_display_name_shape` in
 * `supabase/migrations/20260905190000_display_name.sql`.
 *
 * The client must never be *looser* than the constraint, or a save fails in the
 * database with an error nobody can act on. It is allowed to be stricter.
 */
export const DISPLAY_NAME_MAX = 40;

export type DisplayNameProblem = "too-long" | "control-chars";

export type DisplayNameCheck =
  | { ok: true; value: string | null }
  | { ok: false; problem: DisplayNameProblem };

/**
 * Normalise what the learner typed into what should be stored.
 *
 * An empty field means "I do not want a name" and stores `null` — the same
 * single representation of unset the column uses. Nothing stores `''`.
 */
export function checkDisplayName(raw: string): DisplayNameCheck {
  const value = raw.trim();
  if (value === "") return { ok: true, value: null };

  /* Code points, not UTF-16 units: Postgres `length()` counts characters, and
     `"🙂".length` is 2 in JavaScript. Counting the JS way would let a name
     through here and have the database reject it. */
  if ([...value].length > DISPLAY_NAME_MAX) return { ok: false, problem: "too-long" };

  /* \p{Cc} is C0, DEL and C1 — the same set Postgres's [[:cntrl:]] matches.
     A newline in a name breaks the layout it is rendered into. */
  if (/\p{Cc}/u.test(value)) return { ok: false, problem: "control-chars" };

  return { ok: true, value };
}

/**
 * Persist the chosen name, or `null` to clear it.
 *
 * **Not wired.** There is no Supabase browser client and no session yet, so
 * this throws rather than pretending to save. It is unreachable in the running
 * app — the form is behind `useAccount()`, which returns `null` — and is here
 * so the seam exists in one place when auth lands.
 */
export async function saveDisplayName(value: string | null): Promise<void> {
  throw new Error(
    `no session to save to: cannot ${value === null ? "clear the name" : "store a name"} yet`,
  );
}
