"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { annexes, chapters, unlistedPages } from "@/data/navigation";
import { useAccount, useAccountReady } from "@/hooks/useAccount";

/**
 * Sends the learner on, once they are signed in.
 *
 * `/compte` is a route rather than a modal (`docs/decisions.md` #26), which is
 * what makes it linkable — and what means arriving here from the foot of a
 * lesson otherwise loses the lesson. `?suivant=` carries it back.
 *
 * **Signing in puts them back on the page they were reading.** Every way in
 * carries `?suivant=` — the tick at the foot of a lesson (#48), the signed-out
 * block on `/ma-progression`, and the popover's « Se connecter », which reads
 * the current path through `signInHref` below. With nothing to return to, the
 * home page: it is where « La suite » names the next lesson, and the settings
 * are what you came through rather than what you came for.
 *
 * **Only for somebody who signed in here.** A learner already signed in who
 * opens `/compte` to change their level must reach it: bouncing them would
 * make the settings unreachable from the popover that links them. Telling the
 * two apart needs `useAccountReady` — before the session is read, an account
 * that is about to appear and one that never will look exactly alike.
 *
 * **It does not tick anything on arrival.** Marking is the learner's own act,
 * on every page type (`AGENTS.md` §8); coming back to a lesson already ticked
 * would be the site finishing it for them.
 *
 * The query is read here, in a client leaf inside a `Suspense` boundary, rather
 * than from the page's `searchParams` — reading it in the page would make
 * `/compte` dynamic, the same rule that keeps `/recherche` static (§6).
 *
 * Renders nothing. It is a navigation, not an interface.
 */
export function ReturnTo() {
  const account = useAccount();
  const ready = useAccountReady();
  const params = useSearchParams();
  const router = useRouter();

  const next = safePath(params.get("suivant"));
  /* Set only once the session has actually been read as empty, which is what
     makes the account appearing afterwards a sign-in rather than a page that
     had not finished loading. */
  const signedOutHere = useRef(false);

  useEffect(() => {
    if (!account) {
      if (ready) signedOutHere.current = true;
      return;
    }
    /* A destination asked for by the link that sent them here is honoured
       whether or not they signed in on this visit. */
    if (next) {
      router.replace(next);
      return;
    }
    if (!signedOutHere.current) return;
    signedOutHere.current = false;
    router.replace(FALLBACK);
  }, [account, ready, next, router]);

  return null;
}

/** Where signing in goes when there is nothing to return to. */
const FALLBACK = "/";

/**
 * The link into `/compte` that comes back here afterwards.
 *
 * It lives beside `safePath` on purpose: the two are the writer and the reader
 * of one query parameter, and a param written in one file and parsed in another
 * is a param that is eventually encoded twice in one of them.
 *
 * **No parameter where it would only spell out the default** — from `/compte`
 * there is nowhere to return to, and from `/` the fallback already lands there.
 * Writing it anyway is not merely a longer URL: the return is honoured whether
 * or not the learner signed in on this visit, so a stale `?suivant=%2F` opened
 * by somebody already signed in would bounce them out of the settings.
 */
export function signInHref(from: string): string {
  return from === "/compte" || from === FALLBACK
    ? "/compte"
    : `/compte?suivant=${encodeURIComponent(from)}`;
}

/**
 * A destination is only ever a page this site declares.
 *
 * Checked against the manifest rather than pattern-matched, because "starts
 * with a slash" is not a safe test — `//evil.example` starts with a slash and
 * is an absolute URL to somewhere else. An allowlist cannot be talked into
 * leaving the site, and this is a value that arrives in a URL a stranger can
 * write.
 */
function safePath(raw: string | null): string | null {
  if (!raw) return null;
  const known = new Set<string>([
    ...unlistedPages,
    ...annexes.map((page) => page.path),
    ...chapters.flatMap((chapter) => [chapter.path, ...chapter.lessons.map((l) => l.path)]),
  ]);
  return known.has(raw) ? raw : null;
}
