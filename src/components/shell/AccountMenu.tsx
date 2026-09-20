"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { menuAnnexes } from "@/data/navigation";
import { signInHref } from "@/components/account/ReturnTo";
import { ChapterIcon } from "@/components/nav/ChapterIcon";
import { displayName, useAccount } from "@/hooks/useAccount";
import { getSupabaseClient } from "@/lib/supabase/client";
import styles from "./AccountMenu.module.css";

type ThemeChoice = "light" | "dark" | "system";

const THEMES: { value: ThemeChoice; label: string }[] = [
  { value: "light", label: "Clair" },
  { value: "dark", label: "Sombre" },
  { value: "system", label: "Système" },
];

const THEME_LABEL: Record<ThemeChoice, string> = {
  light: "Clair",
  dark: "Sombre",
  system: "Système",
};

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
 * It holds what belongs to the account and nothing else: the annexes marked
 * `where: "menu"`, the theme, and — signed in — signing out. « À propos » and
 * the link to the source are about the site rather than the account, and both
 * are reachable from the footer under every page.
 *
 * **Every row carries a mark.** The rows that are pages take it from the
 * manifest, where `icon` is required of a `where: "menu"` annexe exactly as it
 * is of a sidebar row — a row drawn with nothing in it is the failure #29 was
 * removed over (#42). The theme and signing out are not pages and cannot name
 * one, so they are drawn below.
 *
 * **Signed out the panel is two rows**, « Se connecter » and the theme (#47).
 * Which pages that leaves is the manifest's answer, not this component's.
 *
 * **« Se connecter » carries the page they are on**, so signing in returns them
 * to it (#70) — the one thing the manifest cannot say, because it is where the
 * learner is rather than what the page is.
 *
 * A popover rather than a modal: it is short, it should not block the page, and
 * on a phone the sidebar is already a drawer — a modal inside a drawer is two
 * layers of trap for one list of links.
 *
 * The theme is a **submenu that replaces the panel** rather than a flyout to the
 * side. The panel is as wide as the sidebar and anchored to its bottom corner,
 * so a flyout would need collision handling at the viewport edge and would have
 * ~166px to live in inside the mobile drawer. Swapping the contents behaves
 * identically at both breakpoints, which is worth more here than the animation.
 *
 * Sign-in itself lives at `/compte`, a real route rather than a dialog
 * (`docs/decisions.md` #26). This menu links there; it never holds a form.
 * Signing *out* asks for nothing, so it is a row here as well as a section of
 * `/compte` — it is the one account action that needs no page to perform.
 */
export function AccountMenu({ onNavigate }: { onNavigate: () => void }) {
  const account = useAccount();
  /* Their chosen name if they set one, else their username (#31) — never a bare
     "no name", since an account holds no other identity. The address goes on
     the line beneath: once a display name has replaced the username, it is the
     one field that still tells two accounts apart. */
  const name = account ? displayName(account) : null;

  const [open, setOpen] = useState(false);
  const [view, setView] = useState<"root" | "theme">("root");
  /* Read when the menu opens — an event, not an effect. Reading during render
     would need localStorage on the server, and reading in an effect would be
     the cascading setState the compiler rejects. */
  const [theme, setTheme] = useState<ThemeChoice>("system");
  const root = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const backRef = useRef<HTMLButtonElement>(null);
  const themeRowRef = useRef<HTMLButtonElement>(null);
  /* Set when leaving the submenu, so the effect below knows to put focus back
     on the row that opened it rather than leaving it on the panel. */
  const returning = useRef(false);

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
      if (event.key !== "Escape") return;
      /* Escape leaves the submenu before it leaves the menu — one level at a
         time, which is what a nested menu is expected to do. */
      if (view === "theme") {
        returning.current = true;
        setView("root");
      } else setOpen(false);
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
  }, [open, view]);

  /* Move focus with the view, or a keyboard user is left pointing at a control
     that no longer exists. It has to happen *here* rather than in the click
     handler: the row being focused has not re-mounted yet at the moment of the
     click, so focusing it there silently does nothing. Focusing is a DOM
     effect, not a state update. */
  useEffect(() => {
    if (!open) return;
    if (view === "theme") {
      backRef.current?.focus();
    } else if (returning.current) {
      returning.current = false;
      themeRowRef.current?.focus();
    }
  }, [open, view]);

  function close() {
    setOpen(false);
    setView("root");
  }

  /* Signed out this is one row, « Se connecter » — with the theme under it,
     that is the whole panel. */
  const links = menuAnnexes(account !== null);
  const here = usePathname();

  return (
    <div className={styles.account} ref={root}>
      {open && (
        <div className={styles.menu}>
          {view === "root" ? (
            <div role="menu" aria-label="Compte">
              {/* No header: the trigger directly beneath the panel already
                  carries the name and the address, and a popover anchored to
                  the control it opened does not need to restate it. */}
              <ul className={styles.links}>
                {links.map((page) => (
                  <li key={page.path} role="none">
                    <Link
                      href={page.wayIn ? signInHref(here) : page.path}
                      className={styles.item}
                      role="menuitem"
                      onClick={() => {
                        close();
                        onNavigate();
                      }}
                    >
                      <ChapterIcon name={page.icon} />
                      {page.title}
                    </Link>
                  </li>
                ))}
                <li role="none">
                  {/* The row carries the current value, so the theme is legible
                      without opening the submenu at all. */}
                  <button
                    type="button"
                    ref={themeRowRef}
                    className={`${styles.item} ${styles.submenuRow}`}
                    role="menuitem"
                    aria-haspopup="menu"
                    aria-expanded={false}
                    onClick={() => setView("theme")}
                  >
                    {/* Half the disc filled. The control is three-way, so a sun
                        or a moon would put one of the three choices on the row
                        that opens all of them. */}
                    <svg className={styles.mark} viewBox="0 0 24 24" aria-hidden="true">
                      <circle cx="12" cy="12" r="8.5" />
                      <path className={styles.half} d="M12 3.5a8.5 8.5 0 0 1 0 17Z" />
                    </svg>
                    Thème
                    <span className={styles.value}>{THEME_LABEL[theme]}</span>
                    <svg className={styles.into} viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </li>
                {/* Signed out there is nothing to sign out of, and the row
                    would read as the way *in* — « Compte » above is that. */}
                {account && (
                  <li className={styles.signOut} role="none">
                    <button
                      type="button"
                      className={`${styles.item} ${styles.action}`}
                      role="menuitem"
                      onClick={() => {
                        /* No local state to clear: the provider is subscribed
                           to onAuthStateChange, so SIGNED_OUT reaches every
                           consumer. */
                        void getSupabaseClient()?.auth.signOut();
                        close();
                        /* The panel this row lives in is about to unmount, so
                           focus has to be put back by hand or it lands on the
                           body and a keyboard user starts again from the top. */
                        triggerRef.current?.focus();
                      }}
                    >
                      {/* A door and the way out of it, sharing `traduction`'s
                          arrow so the set stays one hand. */}
                      <svg className={styles.mark} viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M13 4.5H7A1.5 1.5 0 0 0 5.5 6v12A1.5 1.5 0 0 0 7 19.5h6" />
                        <path d="M13.5 12h7" />
                        <path d="M17.6 9l3 3-3 3" />
                      </svg>
                      Se déconnecter
                    </button>
                  </li>
                )}
              </ul>
            </div>
          ) : (
            <div role="menu" aria-label="Thème">
              <button
                type="button"
                ref={backRef}
                className={styles.back}
                onClick={() => {
                  returning.current = true;
                  setView("root");
                }}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M15 5l-7 7 7 7" />
                </svg>
                Thème
              </button>

              <ul className={styles.links}>
                {THEMES.map((option) => (
                  <li key={option.value} role="none">
                    <button
                      type="button"
                      className={`${styles.item} ${styles.choice}`}
                      role="menuitemradio"
                      aria-checked={theme === option.value}
                      onClick={() => {
                        applyTheme(option.value);
                        setTheme(option.value);
                      }}
                    >
                      {/* A tick, not just a highlight: the chosen one is not
                          signalled by colour alone. */}
                      <svg className={styles.tick} viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M5 12.5l4.5 4.5L19 7.5" />
                      </svg>
                      {option.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      <button
        type="button"
        ref={triggerRef}
        className={styles.trigger}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => {
          if (open) {
            close();
          } else {
            setTheme(readTheme());
            setView("root");
            setOpen(true);
          }
        }}
      >
        <span className={styles.avatar} aria-hidden="true">
          {name ? (
            /* The initial in the serif, like a chapter card on the sommaire —
               the identity of this project is lettering. */
            <span className={styles.initial}>{name.charAt(0).toUpperCase()}</span>
          ) : (
            /* The same drawing as the « Compte » row above, named once. It is
               sized and weighted by `.avatar svg`, which outranks the mark's
               own class, so it stays the small glyph the disc was built for. */
            <ChapterIcon name="compte" />
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
