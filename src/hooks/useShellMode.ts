"use client";

import { useEffect, useState } from "react";

export type ShellMode = "sidebar" | "drawer";

/**
 * Which shell the viewport is showing.
 *
 * The breakpoint itself lives in `globals.css` and is published as
 * `--shell-mode`, so this hook carries no number of its own — the Vue app kept
 * the value in two files and they drifted. The value is a CSS string, so it
 * comes back with its quotes.
 *
 * Layout is done entirely in CSS; this is only for the behaviour that CSS
 * cannot express — whether the drawer is modal, takes focus, and closes on
 * Escape. It therefore starts as "drawer" on the server and on the first
 * client render, which matches and so cannot cause a hydration mismatch.
 */
export function useShellMode(): ShellMode {
  const [mode, setMode] = useState<ShellMode>("drawer");

  useEffect(() => {
    const read = () =>
      getComputedStyle(document.documentElement)
        .getPropertyValue("--shell-mode")
        .trim() === '"sidebar"'
        ? "sidebar"
        : "drawer";

    const update = () => setMode(read());
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return mode;
}
