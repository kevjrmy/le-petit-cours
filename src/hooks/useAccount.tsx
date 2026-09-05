"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { SupabaseClient } from "@supabase/supabase-js";
import { getSupabaseClient } from "@/lib/supabase/client";
import type { Level } from "@/data/navigation";

export interface Account {
  email: string;
  /**
   * What the learner chose to be called, or `null` if they never set one.
   * Optional by design (`docs/decisions.md` #31) — `displayName(account)` falls
   * back to the local part of the email, so the interface always has something
   * to show.
   */
  displayName: string | null;
  /**
   * The CEFR level this learner is working at, or `null` if they have not
   * chosen one. Required by the schema, so `null` means the `settings` row does
   * not exist yet — one representation of "not chosen", not two (#22). Use
   * `settingsRead` to tell it apart from "not loaded yet".
   */
  level: Level | null;
}

/** What to call this learner: their chosen name, else the email before the @. */
export function displayName(account: Account): string {
  return account.displayName ?? account.email.split("@")[0];
}

/**
 * The settings row: the name and the level. Neither is in the session, so this
 * is a separate read.
 *
 * A missing row is not an error — `maybeSingle` returns `null` data, and that
 * means the learner has not chosen a level yet (#22). A real error means the
 * table is unreachable, and the right answer is still empty: it must cost them
 * their settings, never their session.
 */
async function readSettings(
  supabase: SupabaseClient,
  userId: string,
): Promise<{ displayName: string | null; level: Level | null }> {
  const { data, error } = await supabase
    .from("settings")
    .select("display_name, level")
    .eq("user_id", userId)
    .maybeSingle();

  if (error) return { displayName: null, level: null };
  return {
    displayName: (data?.display_name as string | null) ?? null,
    level: (data?.level as Level | null) ?? null,
  };
}

const AccountContext = createContext<{
  account: Account | null;
  /** Whether the `settings` read has come back for this session. Without it
   *  `level: null` is ambiguous — "has not chosen" and "we do not know yet"
   *  look identical, and the interface would ask a question already answered. */
  settingsRead: boolean;
  reload: () => void;
} | null>(null);

/**
 * Holds who is signed in, once, for the whole shell.
 *
 * One subscription and one settings read rather than one per consumer — and,
 * more importantly, **one answer**. Two components each holding their own copy
 * would disagree the moment one of them saved a new name, and the sidebar would
 * keep showing the old one until a reload.
 *
 * It lives inside `AppShell`, which is already the single client boundary, so
 * the root layout and every page under it stay Server Components and keep
 * prerendering (`AGENTS.md` §8). The session is never read above a lesson.
 */
export function AccountProvider({ children }: { children: ReactNode }) {
  const [account, setAccount] = useState<Account | null>(null);
  const [settingsRead, setSettingsRead] = useState(false);
  const userId = useRef<string | null>(null);

  useEffect(() => {
    const supabase = getSupabaseClient();
    if (!supabase) return;

    let active = true;

    /* setState in the subscription callback, never in the effect body: this is
       subscribing to an external system, which is what an effect is for.
       onAuthStateChange emits INITIAL_SESSION asynchronously, so nothing here
       fires during the effect itself. */
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      const user = session?.user;
      if (!user?.email) {
        userId.current = null;
        if (active) {
          setAccount(null);
          setSettingsRead(false);
        }
        return;
      }

      const email = user.email;
      userId.current = user.id;
      /* Signed in as soon as the session says so. The settings catch up. */
      if (active) {
        setAccount({ email, displayName: null, level: null });
        setSettingsRead(false);
      }

      void readSettings(supabase, user.id).then((settings) => {
        if (!active) return;
        setAccount((current) =>
          current && current.email === email ? { ...current, ...settings } : current,
        );
        setSettingsRead(true);
      });
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  /** Re-read the settings after a change, so every consumer agrees. */
  function reload() {
    const supabase = getSupabaseClient();
    const id = userId.current;
    if (!supabase || !id) return;

    void readSettings(supabase, id).then((settings) => {
      setAccount((current) => (current ? { ...current, ...settings } : current));
      setSettingsRead(true);
    });
  }

  return (
    <AccountContext.Provider value={{ account, settingsRead, reload }}>
      {children}
    </AccountContext.Provider>
  );
}

/** Who is signed in, or `null`. `null` outside the provider, which is correct
 *  for anything rendered above the shell. */
export function useAccount(): Account | null {
  return useContext(AccountContext)?.account ?? null;
}

/** Whether the `settings` read has resolved for the current session. */
export function useSettingsRead(): boolean {
  return useContext(AccountContext)?.settingsRead ?? false;
}

/** Ask the shell to re-read the settings. A no-op outside the provider. */
export function useReloadAccount(): () => void {
  const context = useContext(AccountContext);
  return context ? context.reload : () => {};
}
