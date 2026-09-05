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

export interface Account {
  email: string;
  /**
   * What the learner chose to be called, or `null` if they never set one.
   * Optional by design (`docs/decisions.md` #31) — `displayName(account)` falls
   * back to the local part of the email, so the interface always has something
   * to show.
   */
  displayName: string | null;
}

/** What to call this learner: their chosen name, else the email before the @. */
export function displayName(account: Account): string {
  return account.displayName ?? account.email.split("@")[0];
}

/**
 * The display name lives in `settings`, not in the session, so it is a separate
 * read. A missing row is not an error — `maybeSingle` returns `null` data, and
 * that means the learner has not chosen a level yet (#22). A real error means
 * the table is unreachable, and the right answer is still `null`: it must cost
 * them their name, never their session.
 */
async function readDisplayName(
  supabase: SupabaseClient,
  userId: string,
): Promise<string | null> {
  const { data, error } = await supabase
    .from("settings")
    .select("display_name")
    .eq("user_id", userId)
    .maybeSingle();

  return error ? null : ((data?.display_name as string | null) ?? null);
}

const AccountContext = createContext<{
  account: Account | null;
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
        if (active) setAccount(null);
        return;
      }

      const email = user.email;
      userId.current = user.id;
      /* Signed in as soon as the session says so. The name catches up. */
      if (active) setAccount({ email, displayName: null });

      void readDisplayName(supabase, user.id).then((name) => {
        if (!active) return;
        setAccount((current) =>
          current && current.email === email
            ? { ...current, displayName: name }
            : current,
        );
      });
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  /** Re-read the name after it has been changed, so every consumer agrees. */
  function reload() {
    const supabase = getSupabaseClient();
    const id = userId.current;
    if (!supabase || !id) return;

    void readDisplayName(supabase, id).then((name) => {
      setAccount((current) => (current ? { ...current, displayName: name } : current));
    });
  }

  return (
    <AccountContext.Provider value={{ account, reload }}>
      {children}
    </AccountContext.Provider>
  );
}

/** Who is signed in, or `null`. `null` outside the provider, which is correct
 *  for anything rendered above the shell. */
export function useAccount(): Account | null {
  return useContext(AccountContext)?.account ?? null;
}

/** Ask the shell to re-read the display name. A no-op outside the provider. */
export function useReloadAccount(): () => void {
  const context = useContext(AccountContext);
  return context ? context.reload : () => {};
}
