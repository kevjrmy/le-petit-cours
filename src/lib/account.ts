/**
 * Display-name rules, mirroring `settings_display_name_shape` in
 * `supabase/migrations/20260905190000_display_name.sql`.
 *
 * The client must never be *looser* than the constraint, or a save fails in the
 * database with an error nobody can act on. It is allowed to be stricter.
 */
import { getSupabaseClient } from "@/lib/supabase/client";

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
 * Why a save can fail, in terms the interface can turn into a sentence.
 *
 * `no-settings-row` is the interesting one, and it is a consequence of the
 * schema rather than a bug: `settings.level` is `not null`, so a row cannot
 * exist before a level is chosen, so a name cannot be stored before one either
 * (`docs/decisions.md` #31). Writing the name would mean inventing a level, and
 * the level is the learner's to choose (#23).
 */
export type SaveProblem = "unavailable" | "no-session" | "no-settings-row" | "rejected";

export class SaveDisplayNameError extends Error {
  constructor(readonly problem: SaveProblem) {
    super(problem);
    this.name = "SaveDisplayNameError";
  }
}

/**
 * Persist the chosen name, or `null` to clear it.
 *
 * An **update**, never an upsert. An upsert would have to supply a `level` to
 * satisfy the not-null constraint, and there is no level this function could
 * supply that would not be a guess made on the learner's behalf.
 */
export async function saveDisplayName(value: string | null): Promise<void> {
  const supabase = getSupabaseClient();
  if (!supabase) throw new SaveDisplayNameError("unavailable");

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new SaveDisplayNameError("no-session");

  /* The `eq` is what targets the row; RLS is what guarantees it could only ever
     have been this learner's. Both, deliberately — the policy is the security
     boundary and the filter is the intent. */
  const { data, error } = await supabase
    .from("settings")
    .update({ display_name: value, updated_at: new Date().toISOString() })
    .eq("user_id", user.id)
    .select("user_id");

  /* 23514 is a check-constraint violation: the name got past checkDisplayName
     but not past settings_display_name_shape, which means the two have drifted
     apart. Worth its own message rather than a generic failure. */
  if (error) throw new SaveDisplayNameError(error.code === "23514" ? "rejected" : "unavailable");
  if (data.length === 0) throw new SaveDisplayNameError("no-settings-row");
}
