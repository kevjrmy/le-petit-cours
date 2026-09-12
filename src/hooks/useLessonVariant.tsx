"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";
import type { Lesson, Level } from "@/data/navigation";
import { useAccount } from "./useAccount";

/**
 * Which variant of a multi-level lesson is being looked at.
 *
 * Almost every page has one body of work and this resolves to its only level,
 * or to nothing. It exists for the pages that carry several — a `lecture` text
 * with a question set per level, an `exercices` drill with an item bank per
 * level (`docs/decisions.md` #68) — where two things on screen have to agree
 * about which one she is doing: the questions themselves, and the tick that
 * records having done them.
 *
 * **It is state in the shell, not a query parameter, and that is a deliberate
 * retreat.** `?niveau=b1` would have made the choice shareable, but reading it
 * needs `useSearchParams`, and a component that calls it renders its nearest
 * Suspense fallback into the prerendered HTML rather than its own output. With
 * the boundary anywhere useful — around the shell, around the quiz — every
 * lesson would ship a placeholder as its static page and fill itself in on the
 * client, which is the offline story gone (`AGENTS.md` §8). The choice is worth
 * less than the prerender.
 *
 * **The provider owns it and the picker is a consumer**, the way the theme
 * toggle sets a theme the whole shell reads. Nothing flows upward out of a
 * page.
 *
 * **A choice belongs to the page it was made on.** It is stored with the path
 * and read back through it, so navigating away drops it without an effect
 * watching the pathname — the same tag-and-compare `ProgressProvider` uses to
 * keep one account's ticks from showing for another's.
 */
interface VariantApi {
  level: Level | null;
  choose(level: Level): void;
}

const VariantContext = createContext<VariantApi>({
  level: null,
  choose: () => {},
});

export function LessonVariantProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname() ?? "";
  const [chosen, setChosen] = useState<{ path: string; level: Level } | null>(null);

  const choose = useCallback(
    (level: Level) => setChosen({ path: pathname, level }),
    [pathname],
  );

  const value = useMemo(
    () => ({ level: chosen && chosen.path === pathname ? chosen.level : null, choose }),
    [chosen, pathname, choose],
  );

  return <VariantContext.Provider value={value}>{children}</VariantContext.Provider>;
}

/**
 * The variant in view, for one lesson.
 *
 * Resolved in this order: what she picked on this page, then the level she is
 * working at, then the lesson's first. **The lesson's own `levels` is the
 * authority at every step** — a picked or chosen level the page does not serve
 * is ignored rather than passed on, so this can never name a variant that has
 * no questions behind it.
 *
 * Returns `null` for a lesson tagged `[]`, which is the right answer: a verb
 * sheet or a culture page belongs to no level and has no variant to be in.
 */
export function useLessonVariant(lesson: Lesson | null): {
  level: Level | null;
  levels: Level[];
  choose(level: Level): void;
} {
  const { level: picked, choose } = useContext(VariantContext);
  const account = useAccount();

  const levels = lesson?.levels ?? [];
  const offered = (level: Level | null | undefined) =>
    level && levels.includes(level) ? level : null;

  return {
    level: offered(picked) ?? offered(account?.level) ?? levels[0] ?? null,
    levels,
    choose,
  };
}
