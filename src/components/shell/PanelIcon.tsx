/**
 * The sidebar control's mark, in the two places that control the sidebar: the
 * topbar button that opens the mobile drawer, and the collapse button at the
 * foot of the panel.
 *
 * Shared rather than drawn twice — they are the same control at two
 * breakpoints, and two copies of a path is how the chevrons end up pointing
 * different ways for the same state.
 *
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
