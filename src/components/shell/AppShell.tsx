"use client";

import { useEffect, useState, type ReactNode } from "react";
import { AccountProvider } from "@/hooks/useAccount";
import { ProgressProvider } from "@/hooks/useProgress";
import { useShellMode } from "@/hooks/useShellMode";
import { LessonEnd } from "@/components/lesson/LessonEnd";
import { LessonToc } from "@/components/lesson/LessonToc";
import { AppSidebar } from "./AppSidebar";
import { AppTopbar } from "./AppTopbar";
import { Footer } from "./Footer";
import styles from "./AppShell.module.css";
/* For its listener alone: Chrome offers the install once per page load, on
   whatever page that is, and `/installer` reads the offer later (#101). */
import "@/lib/install";

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

    /* Focus goes into the drawer with the eye: to the row of the page you are
       on, else its first link. The drawer comes *before* the page in the
       DOM, so without this a keyboard or switch user opened it and had to
       travel backwards to reach it. The page behind is `inert` (below), so
       Tab stays inside until the drawer closes. */
    /* Retried a frame at a time until it takes, for at most ten: the panel's
       `visibility` transitions from hidden and a hidden element refuses
       focus, and when it becomes focusable depends on the motion setting
       (measured: one frame is too early with motion, two with reduced
       motion still missed). Ten frames is a sixth of a second. */
    let frame = 0;
    let tries = 0;
    const settle = () => {
      const panel = document.getElementById("sidebar");
      const target =
        panel?.querySelector<HTMLElement>('[aria-current="page"]') ??
        panel?.querySelector<HTMLElement>("a[href], button");
      target?.focus();
      if (target && document.activeElement !== target && ++tries < 10) {
        frame = requestAnimationFrame(settle);
      }
    };
    frame = requestAnimationFrame(settle);

    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
      /* Closed by Escape, the scrim or a link: focus returns to the button
         that opened it, rather than to a row that is no longer on screen. */
      if (mode === "drawer") document.getElementById("sidebar-toggle")?.focus();
    };
  }, [open, mode]);

  /* Behind an open drawer the page is covered, so it is out of reach for the
     keyboard and the screen reader too. Only in the drawer: a panel beside
     the page covers nothing. */
  const covered = mode === "drawer" && open;

  return (
    /* One account and one set of ticks for the whole shell: the sidebar, the
       done-tick and anything a page renders read the same answer, so saving a
       name — or ticking a lesson — updates every one of them at once. */
    <AccountProvider>
      <ProgressProvider>
        <AppSidebar open={open} onNavigate={() => setOpen(false)} />

        {mode === "drawer" && open && (
          <div
            className={styles.scrim}
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
        )}

        <div className={styles.main} inert={covered}>
          <AppTopbar mode={mode} open={open} onToggle={() => setOpen((value) => !value)} />
          {/* Before `<main>` in the DOM, because a table of contents is read
              before what it indexes — and fixed, so the order costs no layout.
              It draws only on a lesson, and only where the margin has room for
              it (`LessonToc.module.css`). */}
          <LessonToc />
          <main className={styles.content}>
            {children}
            {/* The done-tick and « Pour aller plus loin », in that order. Both
                come from the manifest, so a lesson renders its prose and
                nothing else — and cannot forget either of them. */}
            <LessonEnd />
          </main>
          <Footer />
        </div>
      </ProgressProvider>
    </AccountProvider>
  );
}
