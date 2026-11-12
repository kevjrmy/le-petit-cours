/**
 * The sidebar control's marks. One button, every breakpoint (#45), and its
 * glyph follows the mode as its label does: a drawer is a menu to open, a
 * panel is a pane to fold.
 *
 * `PanelIcon` — the panel beside the page, for the rail and the open panel.
 * `expanded` is the panel's **current** state; the chevron points the way it
 * will move, which is the only part of the icon anyone actually reads.
 */
export function PanelIcon({
  expanded,
  className,
}: {
  expanded: boolean;
  className?: string;
}) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3.5" y="4.5" width="17" height="15" rx="2" />
      <path d="M9.5 4.5v15" />
      <path d={expanded ? "M16.5 9.5L14 12l2.5 2.5" : "M13.5 9.5l2.5 2.5-2.5 2.5"} />
    </svg>
  );
}

/**
 * The drawer's mark, below the drawer breakpoint: three lines, the glyph a
 * phone reads as « the menu » — two full, the last one shorter, aligned on
 * the left like the text the menu sits beside. The panel mark there read as « fold », which is
 * not what a closed drawer does, and nothing on a phone is folded.
 */
export function MenuIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 7h16M4 12h16M4 17h10" />
    </svg>
  );
}
