"use client";

import { useLayoutEffect } from "react";
import styles from "./ThemeToggle.module.css";

/**
 * Light / dark, stored in localStorage and applied to `<html>`.
 *
 * It holds **no React state**. `data-theme` on the root element is already the
 * single source of truth — the inline script in the root layout sets it before
 * first paint, and the icon is chosen in CSS from the same attribute. Mirroring
 * that into state would mean either a lazy initialiser reading localStorage
 * during render (which the server cannot do, so the first client render would
 * disagree and hydration would fail) or a setState in an effect (a cascading
 * render the compiler rightly rejects). Reading the DOM at click time has
 * neither problem.
 *
 * localStorage keeps exactly this one job. Progress and the chosen level live
 * in IndexedDB, which is async and so unreadable before first paint (#24).
 */
export function ThemeToggle() {
  /* Re-apply after React's Strict Mode remount in `next dev`, which resets
     <html> to the attributes it manages from JSX and so clears the one the
     inline script set. A no-op in production. */
  useLayoutEffect(() => {
    try {
      const stored = localStorage.getItem("theme");
      if (stored === "dark" || stored === "light") {
        document.documentElement.setAttribute("data-theme", stored);
      }
    } catch {
      /* private mode, blocked storage — the page keeps the OS preference */
    }
  }, []);

  function toggle() {
    const root = document.documentElement;
    const current =
      root.getAttribute("data-theme") ??
      (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    const next = current === "dark" ? "light" : "dark";

    root.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* the toggle still works for this visit */
    }
  }

  return (
    <button
      type="button"
      className={styles.toggle}
      onClick={toggle}
      title="Changer le thème"
    >
      <span className="visually-hidden">Changer le thème</span>
      <svg viewBox="0 0 24 24" aria-hidden="true" className={styles.sun}>
        <circle cx="12" cy="12" r="4.2" />
        <path d="M12 2.6v2.2M12 19.2v2.2M2.6 12h2.2M19.2 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M18.7 5.3l-1.6 1.6M6.9 17.1l-1.6 1.6" />
      </svg>
      <svg viewBox="0 0 24 24" aria-hidden="true" className={styles.moon}>
        <path d="M20 14.2A8.2 8.2 0 0 1 9.8 4a8.4 8.4 0 1 0 10.2 10.2z" />
      </svg>
    </button>
  );
}
