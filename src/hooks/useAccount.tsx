"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { readDisplayName, readLevel, readUsername } from "@/lib/account";
import { getSupabaseClient } from "@/lib/supabase/client";
import type { Level } from "@/data/navigation";

export interface Account {
  /**
   * The name they sign in with and are called by. Owned by `public.usernames`,
   * which enforces uniqueness, and read here from the metadata mirror so it is
   * available offline — the table needs a network round trip, the JWT does not
   * (#38). Mutable: `saveUsername` changes it.
   */
  username: string;
  /**
   * The account's address. Independent of the username since #38, and also a
   * way to sign in. Currently a fake `@lepetitcours.test` one for every
   * account — shown in the account menu as the line under the name, since it is
   * what tells two accounts apart once a display name hides the username.
   */
  email: string;
  /**
   * What the learner chose to be called, or `null` if they never set one.
   * `displayName(account)` falls back to the username, so the interface always
   * has something to show.
   */
  displayName: string | null;
  /** The CEFR level they are working at, or `null` if they have not chosen. */
  level: Level | null;
}

/** What to call this learner: their chosen name, else their username. */
export function displayName(account: Account): string {
  return account.displayName ?? account.username;
}

const AccountContext = createContext<Account | null>(null);

/**
 * Holds who is signed in, once, for the whole shell.
 *
 * **Everything about the learner arrives with the session.** The level and the
 * display name live in the account's user metadata (#36), so there is no second
 * read, nothing to be told apart from "not loaded yet", and no cache to
 * invalidate after a save — `updateUser` emits `USER_UPDATED`, which comes back
 * through this same subscription and every consumer re-renders.
 *
 * The username keeps that property despite living in a table (#38): the
 * database mirrors it into the same metadata, so it arrives with the session
 * too. `saveUsername` calls `refreshSession`, whose `TOKEN_REFRESHED` lands
 * here exactly as `USER_UPDATED` does.
 *
 * It lives inside `AppShell`, which is already the single client boundary, so
 * the root layout and every page under it stay Server Components and keep
 * prerendering (`AGENTS.md` §8). The session is never read above a lesson.
 */
export function AccountProvider({ children }: { children: ReactNode }) {
  const [account, setAccount] = useState<Account | null>(null);

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
      if (!active) return;

      const user = session?.user;
      if (!user?.email) {
        setAccount(null);
        return;
      }

      /* Validated on the way in. Metadata is writable by its owner and carries
         no constraints, so a malformed value can exist; the interface simply
         does not believe it (#36). */
      const meta = user.user_metadata ?? {};
      setAccount({
        username: readUsername(meta.username, user.email),
        email: user.email,
        displayName: readDisplayName(meta.display_name),
        level: readLevel(meta.level),
      });
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  return <AccountContext.Provider value={account}>{children}</AccountContext.Provider>;
}

/** Who is signed in, or `null` — which is also the answer outside the provider,
 *  and the correct one for anything rendered above the shell. */
export function useAccount(): Account | null {
  return useContext(AccountContext);
}
