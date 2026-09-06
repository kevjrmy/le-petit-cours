"use client";

import { useEffect, useState, type ReactNode } from "react";
import { AccountProvider } from "@/hooks/useAccount";
import { useShellMode } from "@/hooks/useShellMode";
import { AppSidebar } from "./AppSidebar";
import { AppTopbar } from "./AppTopbar";
import { Footer } from "./Footer";
import styles from "./AppShell.module.css";

/**
 * The shell, and the only client boundary the chrome needs.
 *
 * `children` is passed in from the root layout, so every page underneath stays
 * a Server Component and keeps prerendering — putting the shell here rather
 * than in each page is also what lets the sidebar hold its scroll position
 * across navigation (`AGENTS.md` §4).
 *
 * Nothing here reads the session. Doing so would opt every lesson out of
 * static prerendering, silently (`AGENTS.md` §8).
 */
export function AppShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const mode = useShellMode();

  /* The drawer closes from the link that was clicked (`onNavigate`), from the
     scrim and from Escape — not from an effect watching the pathname. While it
     is open it covers the page, so those are the only ways to leave it. */

  useEffect(() => {
    if (!open || mode === "sidebar") return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [open, mode]);

  return (
    /* One account for the whole shell: the sidebar and anything a page renders
       read the same answer, so saving a name updates both. */
    <AccountProvider>
      <AppSidebar open={open} onNavigate={() => setOpen(false)} />

      {mode === "drawer" && open && (
        <div
          className={styles.scrim}
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      <div className={styles.main}>
        <AppTopbar mode={mode} open={open} onToggle={() => setOpen((value) => !value)} />
        <main className={styles.content}>{children}</main>
        <Footer />
      </div>
    </AccountProvider>
  );
}
