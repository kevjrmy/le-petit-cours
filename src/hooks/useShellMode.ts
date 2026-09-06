"use client";

import { useEffect, useLayoutEffect, useState } from "react";

export type ShellMode = "drawer" | "rail" | "sidebar";

/**
 * Collapse or expand the panel, and remember it.
 *
 * The attribute is the single source of truth — CSS resolves it into
 * `--shell-mode` and `--sidebar-now`, and `useShellMode` reads the result back,
 * so nothing here has to know what the breakpoints are. Storage failing is not
 * an error: the choice still holds for this visit.
 */
export function setRail(railed: boolean) {
  const value = railed ? "1" : "0";
  document.documentElement.setAttribute("data-rail", value);
  try {
    localStorage.setItem("rail", value);
  } catch {
    /* private mode, blocked storage */
  }
}

/**
 * Re-apply the stored choice after React's Strict Mode remount in `next dev`,
 * which resets <html> to the attributes it manages from JSX and so clears the
 * one the inline script set. A no-op in production — the same guard the theme
 * needs, for the same reason.
 */
export function useRestoreRail() {
  useLayoutEffect(() => {
    try {
      const stored = localStorage.getItem("rail");
      if (stored === "0" || stored === "1")
        document.documentElement.setAttribute("data-rail", stored);
    } catch {
      /* nothing stored, nothing to restore */
    }
  }, []);
}

/**
 * Which shell the viewport is showing: a drawer on a phone, an icons-only rail
 * on a tablet, the open panel on a laptop.
 *
 * The breakpoints live in `globals.css` and are published as `--shell-mode`, so
 * this hook carries no number of its own — the Vue app kept the value in two
 * files and they drifted. **The learner's collapse choice is in that token too**
 * (`:root[data-rail]` outranks the breakpoint by specificity), which is why
 * reading one computed value is enough and this hook does not know the
 * preference exists. The value is a CSS string, so it comes back quoted.
 *
 * Layout is done entirely in CSS; this is only for what CSS cannot express —
 * whether the drawer is modal, takes focus and closes on Escape, and which way
 * the collapse control points. It therefore starts as "drawer" on the server
 * and on the first client render, which match and so cannot cause a hydration
 * mismatch: the wider shells are an enhancement applied on mount.
 */
export function useShellMode(): ShellMode {
  const [mode, setMode] = useState<ShellMode>("drawer");

  useEffect(() => {
    const read = (): ShellMode => {
      const value = getComputedStyle(document.documentElement)
        .getPropertyValue("--shell-mode")
        .trim()
        .replace(/"/g, "");
      return value === "sidebar" || value === "rail" ? value : "drawer";
    };

    const update = () => setMode(read());
    update();

    window.addEventListener("resize", update);
    /* The collapse control writes `data-rail` on <html>, which changes the
       token without resizing anything. Observing the attribute is what keeps
       this in step with a press; polling or a shared context would both be
       ways of saying the same thing less directly. */
    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-rail"],
    });

    return () => {
      window.removeEventListener("resize", update);
      observer.disconnect();
    };
  }, []);

  return mode;
}
