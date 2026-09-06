"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { canonicalPath } from "@/data/navigation";
import { localStore } from "@/lib/progress/local";
import { remoteStore } from "@/lib/progress/remote";
import { applyPending, type Progress } from "@/lib/progress/store";
import { useAccount } from "./useAccount";

export interface ProgressApi {
  /**
   * `null` until the cache has answered — which is not the same as "empty".
   * Rendering « rien de terminé » during the load would flash the wrong answer
   * at a learner who has ticked forty lessons.
   */
  state: Progress | null;
  /** Whether there is an account to keep any of this. */
  signedIn: boolean;
  isDone(path: string): boolean;
  toggle(path: string): void;
}

const ProgressContext = createContext<ProgressApi>({
  state: null,
  signedIn: false,
  isDone: () => false,
  toggle: () => {},
});

/**
 * Holds the learner's ticks, once, for the whole shell.
 *
 * **The local copy is the read path.** Every render answers from memory, backed
 * by the IndexedDB cache; the server is a sync target and never something a
 * render waits on (`AGENTS.md` §8). Ticking underground writes locally, queues
 * the operation, and replays it when the connection comes back.
 *
 * **A tick needs an account.** Not because the content is gated — none of it is
 * — but because a tick with nowhere to be kept is a promise the site cannot
 * make good on: browser storage alone is evicted without warning, and forty
 * ticks lost that way are lost silently. Signed out, `DoneTick` offers the way
 * in rather than a control that pretends to remember.
 *
 * It sits inside `AccountProvider`, itself inside `AppShell`, so nothing above
 * a lesson reads the session and every route stays static.
 */
export function ProgressProvider({ children }: { children: ReactNode }) {
  const account = useAccount();
  const userId = account?.id ?? null;

  /* Tagged with the account it belongs to, and read back through that tag
     below. Signing out is then the *absence* of a match rather than a reset to
     run — which is what keeps this provider from calling setState in an effect
     body, and keeps one learner's ticks from showing for a moment after another
     signs in on the same browser. */
  const [loaded, setLoaded] = useState<{ id: string; ticks: Progress } | null>(null);
  const state = loaded && loaded.id === userId ? loaded.ticks : null;

  /* What Supabase is believed to hold. Never rendered from — `save` is handed
     it so it can write the difference. */
  const server = useRef<Progress>({});

  useEffect(() => {
    if (!userId) {
      server.current = {};
      return;
    }

    let active = true;
    const local = localStore(userId);
    const remote = remoteStore(userId);

    (async () => {
      /* The cache first, so a lesson opened offline knows its own tick without
         waiting for a request that may never answer. */
      const cached = await local.load();
      if (!active) return;
      setLoaded({ id: userId, ticks: cached });

      try {
        const pending = await local.loadPending();
        const fetched = await remote.load();
        if (!active) return;

        /* The server is the truth, and whatever this device did while it could
           not be reached is replayed on top. That order is what makes an unmark
           made on another device stick — a plain union would put the tick back. */
        const merged = applyPending(fetched, pending);
        if (Object.keys(pending).length > 0) {
          await remote.save(merged, fetched);
          await local.savePending({});
        }
        if (!active) return;

        server.current = merged;
        await local.save(merged, cached);
        if (active) setLoaded({ id: userId, ticks: merged });
      } catch {
        /* Offline, or Supabase is not configured. The cache stands and the
           queue waits — nothing is lost here, it is only not shared yet. */
      }
    })();

    return () => {
      active = false;
    };
  }, [userId]);

  const toggle = useCallback(
    (rawPath: string) => {
      if (!userId || state === null) return;

      const path = canonicalPath(rawPath);
      const next = { ...state };
      const marking = !(path in next);
      if (marking) next[path] = new Date().toISOString();
      else delete next[path];

      /* On screen immediately. The write is not awaited: the learner has said
         what they did, and a slow network is not a reason to make them watch. */
      setLoaded({ id: userId, ticks: next });

      void (async () => {
        const local = localStore(userId);
        const remote = remoteStore(userId);
        await local.save(next, state);
        try {
          await remote.save(next, server.current);
          server.current = { ...next };
        } catch {
          /* Queued as an operation, not as a snapshot, so replaying it later
             cannot undo what another device did in between. */
          const pending = await local.loadPending();
          await local.savePending({ ...pending, [path]: marking ? next[path] : null });
        }
      })();
    },
    [userId, state],
  );

  const isDone = useCallback((path: string) => !!state?.[canonicalPath(path)], [state]);

  return (
    <ProgressContext.Provider value={{ state, signedIn: !!userId, isDone, toggle }}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress(): ProgressApi {
  return useContext(ProgressContext);
}
