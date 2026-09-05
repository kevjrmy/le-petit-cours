"use client";

import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { annexes } from "@/data/navigation";
import { displayName, useAccount } from "@/hooks/useAccount";
import styles from "./AccountMenu.module.css";

type ThemeChoice = "light" | "dark" | "system";

const THEMES: { value: ThemeChoice; label: string }[] = [
  { value: "light", label: "Clair" },
  { value: "dark", label: "Sombre" },
  { value: "system", label: "Système" },
];

/**
 * `system` is the **absence** of `data-theme`, not a third value stored in it —
 * that is what lets `color-scheme: light dark` resolve against the OS. Storing
 * the string "system" would pin the page to whichever theme happened to be
 * active when it was written.
 */
function readTheme(): ThemeChoice {
  try {
    const stored = localStorage.getItem("theme");
    if (stored === "dark" || stored === "light") return stored;
  } catch {
    /* private mode, blocked storage */
  }
  return "system";
}

function applyTheme(choice: ThemeChoice) {
  const root = document.documentElement;
  if (choice === "system") root.removeAttribute("data-theme");
  else root.setAttribute("data-theme", choice);

  try {
    if (choice === "system") localStorage.removeItem("theme");
    else localStorage.setItem("theme", choice);
  } catch {
    /* the choice still holds for this visit */
  }
}

/**
 * The account control at the foot of the sidebar, and the popover it opens.
 *
 * A popover rather than a modal: it is short, it should not block the page, and
 * on a phone the sidebar is already a drawer — a modal inside a drawer is two
 * layers of trap for one list of links.
 *
 * Sign-in itself lives at `/compte`, a real route, so a magic link can return
 * to it (`docs/decisions.md` #26). This menu links there; it never holds a form.
 */
export function AccountMenu({ onNavigate }: { onNavigate: () => void }) {
  const account = useAccount();
  /* Their chosen name if they set one, else the part of the email before the @
     (#31). The full address stays on the line below either way, rather than
     being truncated into uselessness in a 16.5rem rail. */
  const name = account ? displayName(account) : null;
  const [open, setOpen] = useState(false);
  /* Read when the menu opens — an event, not an effect. Reading during render
     would need localStorage on the server, and reading in an effect would be
     the cascading setState the compiler rejects. */
  const [theme, setTheme] = useState<ThemeChoice>("system");
  const root = useRef<HTMLDivElement>(null);

  /* Re-apply after React's Strict Mode remount in `next dev`, which resets
     <html> to the attributes it manages from JSX and so clears the one the
     inline script set. A no-op in production. */
  useLayoutEffect(() => {
    const stored = readTheme();
    if (stored !== "system") document.documentElement.setAttribute("data-theme", stored);
  }, []);

  useEffect(() => {
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const onPointer = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    };

    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  const links = annexes.filter((page) => page.where === "menu");

  return (
    <div className={styles.account} ref={root}>
      {open && (
        <div className={styles.menu} role="menu" aria-label="Compte">
          {/* Signed out there is no header at all — no « Non connecté », and no
              sales pitch either. Signed out is the normal way to read this
              site, and a menu that explains itself every time you open it is a
              menu you stop reading. */}
          {account && (
            <p className={styles.status}>
              <span className={styles.statusLabel}>{name}</span>
              <span className={styles.statusHint}>{account.email}</span>
            </p>
          )}

          <ul className={styles.links}>
            {links.map((page) => (
              <li key={page.path} role="none">
                {page.soon ? (
                  <span className={`${styles.item} ${styles.soon}`} role="menuitem" aria-disabled="true">
                    {page.title}
                    <em>Bientôt</em>
                  </span>
                ) : (
                  <Link
                    href={page.path}
                    className={styles.item}
                    role="menuitem"
                    onClick={() => {
                      setOpen(false);
                      onNavigate();
                    }}
                  >
                    {page.title}
                  </Link>
                )}
              </li>
            ))}
            <li role="none">
              <a
                href="https://github.com/kevjrmy/le-petit-cours"
                className={styles.item}
                role="menuitem"
                onClick={() => setOpen(false)}
              >
                Code source
              </a>
            </li>
          </ul>

          <div className={styles.themeRow}>
            <span id="theme-label" className={styles.themeLabel}>
              Thème
            </span>
            <div className={styles.segmented} role="group" aria-labelledby="theme-label">
              {THEMES.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  className={styles.segment}
                  aria-pressed={theme === option.value}
                  onClick={() => {
                    applyTheme(option.value);
                    setTheme(option.value);
                  }}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <button
        type="button"
        className={styles.trigger}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => {
          if (!open) setTheme(readTheme());
          setOpen((value) => !value);
        }}
      >
        <span className={styles.avatar} aria-hidden="true">
          {name ? (
            /* The initial in the serif, like a chapter card on the sommaire —
               the identity of this project is lettering. */
            <span className={styles.initial}>{name.charAt(0).toUpperCase()}</span>
          ) : (
            <svg viewBox="0 0 24 24">
              <circle cx="12" cy="8.5" r="3.6" />
              <path d="M4.8 20.2a7.2 7.2 0 0 1 14.4 0" />
            </svg>
          )}
        </span>
        <span className={styles.triggerText}>
          <span className={styles.triggerTitle}>{name ?? "Compte"}</span>
          {/* An offer, not a state. « Non connecté » would report the absence
              of something the site does not require. */}
          <span className={styles.triggerSub}>
            {account ? account.email : "Se connecter"}
          </span>
        </span>
        <svg className={styles.chevron} viewBox="0 0 24 24" aria-hidden="true">
          <path d="M7 14l5-5 5 5" />
        </svg>
      </button>
    </div>
  );
}
