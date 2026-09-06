"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { annexes, chapters, unlistedPages } from "@/data/navigation";
import { useAccount } from "@/hooks/useAccount";

/**
 * Sends the learner back where they came from, once they are signed in.
 *
 * `/compte` is a route rather than a modal (`docs/decisions.md` #26), which is
 * what makes it linkable — and what means arriving here from the foot of a
 * lesson otherwise loses the lesson. `?suivant=` carries it back.
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
  const params = useSearchParams();
  const router = useRouter();

  const next = safePath(params.get("suivant"));

  useEffect(() => {
    if (account && next) router.replace(next);
  }, [account, next, router]);

  return null;
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
