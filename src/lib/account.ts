import { CHOOSABLE_LEVELS, type Level } from "@/data/navigation";
import { getSupabaseClient } from "@/lib/supabase/client";

/**
 * Username rules.
 *
 * **The username is no longer derived from the email.** It lives in
 * `public.usernames`, which owns uniqueness, and is mirrored into the account's
 * metadata so it can be read offline (#38). Nothing in this app builds an email
 * address any more — the fake `@lepetitcours.test` domain is now only something
 * typed into the Supabase dashboard when an account is created.
 *
 * These rules must agree with the `usernames_shape` and `usernames_length`
 * constraints in the migration, and with the re-check inside `set_username()`.
 * The database is the authority; this copy exists to answer the learner while
 * they type rather than after a round trip.
 */
export const USERNAME_MIN = 2;
export const USERNAME_MAX = 30;

export type UsernameProblem = "too-short" | "too-long" | "charset";

export type UsernameCheck =
  | { ok: true; value: string }
  | { ok: false; problem: UsernameProblem };

/**
 * Normalise and check a username.
 *
 * Case-folded, because a learner typing their own name with a capital on a
 * phone keyboard must not be told their password is wrong — and because the
 * column stores it folded, so two accounts cannot differ by case alone.
 * Capitalisation someone actually wants to see is the display name's job.
 */
export function checkUsername(raw: string): UsernameCheck {
  const value = raw.trim().toLowerCase();

  if ([...value].length < USERNAME_MIN) return { ok: false, problem: "too-short" };
  if ([...value].length > USERNAME_MAX) return { ok: false, problem: "too-long" };
  if (!/^[a-z0-9][a-z0-9._-]*[a-z0-9]$/.test(value)) {
    return { ok: false, problem: "charset" };
  }

  return { ok: true, value };
}

/**
 * What the metadata says the username is.
 *
 * Falls back to the local part of the email, which is what every account had
 * before `public.usernames` existed and what the backfill gives them anyway.
 * The fallback is not expected to fire — it is here so that an account somehow
 * lacking the mirror still renders a name rather than an empty strong tag.
 */
export function readUsername(raw: unknown, email: string): string {
  if (typeof raw === "string") {
    const check = checkUsername(raw);
    if (check.ok) return check.value;
  }
  return email.split("@")[0];
}

export const PASSWORD_MIN = 8;

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

export type SaveProblem =
  | "unavailable"
  | "no-session"
  | "rejected"
  | "weak"
  | "unchanged"
  | "taken";

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

/**
 * Change the password of the account currently signed in.
 *
 * **This is the only recovery there is.** An account holds no address, so no
 * link can be emailed to anyone; a forgotten password is reset by hand in the
 * Supabase dashboard (#37). That makes this field worth having rather than a
 * nicety, and it is why it asks for the current password to be re-typed —
 * Supabase does not require it, but an unlocked phone left on a table should
 * not be enough to lock its owner out.
 */
export async function savePassword(
  email: string,
  current: string,
  next: string,
): Promise<void> {
  const supabase = getSupabaseClient();
  if (!supabase) throw new SaveSettingError("unavailable");

  if ([...next].length < PASSWORD_MIN) throw new SaveSettingError("weak");

  /* Re-authenticate rather than trust the session. Takes the account's email
     rather than its username, because the username is now mutable and this has
     to work in the same breath as a rename. A failure here is reported as
     `no-session`, which is the honest reading: the credential offered did not
     match the account. */
  const { error: signIn } = await supabase.auth.signInWithPassword({
    email,
    password: current,
  });
  if (signIn) throw new SaveSettingError("no-session");

  const { error } = await supabase.auth.updateUser({ password: next });
  if (!error) return;

  /* Supabase names these two; anything else is a connection problem as far as
     the learner is concerned. */
  if (error.code === "weak_password") throw new SaveSettingError("weak");
  if (error.code === "same_password") throw new SaveSettingError("unchanged");
  throw new SaveSettingError("unavailable");
}

export type SignInProblem = "unavailable" | "credentials" | "unconfirmed" | "failed";

export class SignInError extends Error {
  constructor(readonly problem: SignInProblem) {
    super(problem);
    this.name = "SignInError";
  }
}

/**
 * Sign in with **either** a username or an email address, GitHub-style (#38).
 *
 * The `@` decides, and nothing else does: an address is handed to Supabase as
 * it stands, while a username is resolved through `email_for_username` first.
 * That resolution is a database call made with no session, which is why the
 * function is `security definer` and granted to `anon` — see the migration for
 * what that costs and when it has to change.
 *
 * **A username that resolves to nothing is reported as bad credentials**, not
 * as "no such user". The lookup is already an enumeration oracle for anyone who
 * calls it directly; the interface does not need to be a second one.
 */
export async function signIn(identifier: string, password: string): Promise<void> {
  const supabase = getSupabaseClient();
  if (!supabase) throw new SignInError("unavailable");

  const typed = identifier.trim();
  let email: string;

  if (typed.includes("@")) {
    email = typed.toLowerCase();
  } else {
    const check = checkUsername(typed);
    if (!check.ok) throw new SignInError("credentials");

    const { data, error } = await supabase.rpc("email_for_username", {
      name: check.value,
    });
    if (error) throw new SignInError("failed");
    if (typeof data !== "string" || data === "") {
      throw new SignInError("credentials");
    }
    email = data;
  }

  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (!error) return;

  if (error.code === "invalid_credentials") throw new SignInError("credentials");
  if (error.code === "email_not_confirmed") throw new SignInError("unconfirmed");
  throw new SignInError("failed");
}

/**
 * Change the username.
 *
 * Goes through `set_username()` rather than writing the table, because that
 * function is the only writer: it re-checks the shape, scopes the write to
 * `auth.uid()` so one account cannot rename another, and refreshes the metadata
 * mirror in the same transaction.
 *
 * `refreshSession` afterwards is what makes the new name appear: the mirror
 * lives in the JWT, and the token in hand was minted before the change. The
 * refresh emits `TOKEN_REFRESHED`, which the provider is already subscribed to,
 * so every consumer re-renders with no reload and nothing to invalidate.
 */
export async function saveUsername(value: string): Promise<void> {
  const supabase = getSupabaseClient();
  if (!supabase) throw new SaveSettingError("unavailable");

  const check = checkUsername(value);
  if (!check.ok) throw new SaveSettingError("rejected");

  const { error } = await supabase.rpc("set_username", { name: check.value });
  if (error) {
    /* 23505 is the unique violation on usernames.username — someone else holds
       the name. Anything else is a connection problem as far as the learner is
       concerned. */
    if (error.code === "23505") throw new SaveSettingError("taken");
    if (error.code === "28000") throw new SaveSettingError("no-session");
    throw new SaveSettingError("unavailable");
  }

  await supabase.auth.refreshSession();
}
