import { CHOOSABLE_LEVELS, type Level } from "@/data/navigation";
import { getSupabaseClient } from "@/lib/supabase/client";

/**
 * Display-name rules.
 *
 * These used to mirror a database check constraint. They no longer can: the
 * name lives in the account's user metadata, which has no constraints and which
 * the account holder can write to directly (#36). **These rules are therefore
 * the only ones there are**, and they matter more than when a constraint sat
 * behind them — they are applied on write *and* on read, so a value put there
 * by some other route still cannot reach the interface malformed.
 */
export const DISPLAY_NAME_MAX = 40;

export type DisplayNameProblem = "too-long" | "control-chars";

export type DisplayNameCheck =
  | { ok: true; value: string | null }
  | { ok: false; problem: DisplayNameProblem };

/**
 * Normalise what the learner typed into what should be stored.
 *
 * An empty field means "I do not want a name" and stores `null` — one
 * representation of unset. Nothing stores `''`.
 */
export function checkDisplayName(raw: string): DisplayNameCheck {
  const value = raw.trim();
  if (value === "") return { ok: true, value: null };

  /* Code points, not UTF-16 units: `"🙂".length` is 2 in JavaScript, and the
     limit is a count of characters. */
  if ([...value].length > DISPLAY_NAME_MAX) return { ok: false, problem: "too-long" };

  /* \p{Cc} is C0, DEL and C1. A newline in a name breaks the layout it is
     rendered into, and nothing legitimate needs one. */
  if (/\p{Cc}/u.test(value)) return { ok: false, problem: "control-chars" };

  return { ok: true, value };
}

/**
 * What the metadata says the name is, or `null`.
 *
 * Read-side validation, and not paranoia: user metadata is writable by its
 * owner through the Supabase API, so a value can arrive here without ever
 * passing `checkDisplayName`. The worst case is cosmetic and self-inflicted,
 * which is exactly why the answer is to ignore it rather than to add a table.
 */
export function readDisplayName(raw: unknown): string | null {
  if (typeof raw !== "string") return null;
  const check = checkDisplayName(raw);
  return check.ok ? check.value : null;
}

/** What the metadata says the level is, or `null` if it is not one we offer. */
export function readLevel(raw: unknown): Level | null {
  return typeof raw === "string" && (CHOOSABLE_LEVELS as string[]).includes(raw)
    ? (raw as Level)
    : null;
}

export type SaveProblem = "unavailable" | "no-session" | "rejected";

export class SaveSettingError extends Error {
  constructor(readonly problem: SaveProblem) {
    super(problem);
    this.name = "SaveSettingError";
  }
}

/**
 * Write one or more settings into the account's user metadata.
 *
 * `updateUser` merges rather than replaces, so writing a level leaves a name
 * alone. It also emits `USER_UPDATED` on `onAuthStateChange`, which is how
 * every consumer learns about the change — there is nothing to re-read and no
 * cache to invalidate.
 */
async function saveSettings(data: Record<string, string | null>): Promise<void> {
  const supabase = getSupabaseClient();
  if (!supabase) throw new SaveSettingError("unavailable");

  const { error } = await supabase.auth.updateUser({ data });
  if (error) {
    throw new SaveSettingError(
      error.status === 401 || error.status === 403 ? "no-session" : "unavailable",
    );
  }
}

/** Persist the chosen name, or `null` to clear it. */
export async function saveDisplayName(value: string | null): Promise<void> {
  return saveSettings({ display_name: value });
}

/**
 * Record the level this learner is working at.
 *
 * Checked against `CHOOSABLE_LEVELS` before it is written, because nothing
 * downstream will check it — that is the trade this storage makes (#36).
 */
export async function saveLevel(level: Level): Promise<void> {
  if (!CHOOSABLE_LEVELS.includes(level)) throw new SaveSettingError("rejected");
  return saveSettings({ level });
}
