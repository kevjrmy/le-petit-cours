"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { findLesson } from "@/data/navigation";
import { setRail, type ShellMode } from "@/hooks/useShellMode";
import { PanelIcon } from "./PanelIcon";
import styles from "./AppTopbar.module.css";

/**
 * The bar above the page: one control for the sidebar, and the trail above the
 * current page.
 *
 * **One control, one place, every breakpoint.** The button used to open the
 * drawer on a phone while a second button at the foot of the sidebar collapsed
 * the panel on a laptop — two controls, two positions, one idea. It is the same
 * button now: it opens the drawer below the breakpoint and collapses the panel
 * above it, and it sits at the left edge of the content, immediately beside the
 * panel it acts on (`docs/decisions.md` #45).
 *
 * **The trail never names the page you are on.** The `<h1>` is directly below
 * it and every page header already prints its own chapter — « Accueil » over
 * the home page is the reductio. What is left is the one thing the page cannot
 * say about itself: the chapter a lesson belongs to, as a link back up. Top
 * level pages therefore show nothing, which is correct rather than empty. When
 * this grows into a full breadcrumb it grows upward, from the ancestors.
 */
export function AppTopbar({
  mode,
  open,
  onToggle,
}: {
  mode: ShellMode;
  open: boolean;
  onToggle: () => void;
}) {
  const pathname = usePathname();
  const parent = findLesson(pathname)?.chapter ?? null;

  const drawer = mode === "drawer";
  const railed = mode === "rail";
  /* The panel is showing when the drawer is open, or when it is not railed. */
  const expanded = drawer ? open : !railed;
  /* One button, but not one verb: a drawer is opened and closed, a panel is
     réduit and développé. Saying « Ouvrir » of a rail that is already on screen
     would describe the wrong thing to the one user who depends on the label. */
  const label = drawer
    ? open
      ? "Fermer le menu"
      : "Ouvrir le menu"
    : expanded
      ? "Réduire le menu"
      : "Développer le menu";

  return (
    <header className={styles.topbar}>
      <button
        type="button"
        className={styles.menu}
        aria-expanded={expanded}
        aria-controls="sidebar"
        onClick={() => (drawer ? onToggle() : setRail(!railed))}
        title={label}
      >
        <span className="visually-hidden">{label}</span>
        <PanelIcon expanded={expanded} />
      </button>

      {parent && (
        <nav className={styles.crumbs} aria-label="Fil d'Ariane">
          <Link href={parent.path}>{parent.shortTitle ?? parent.title}</Link>
        </nav>
      )}
    </header>
  );
}
