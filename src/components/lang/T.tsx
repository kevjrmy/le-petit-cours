import type { ReactNode } from "react";

/**
 * A piece of interface text in both languages (#102). Both are printed, and
 * `globals.css` hides the one the page is not showing, before paint — so it
 * works in a Server Component, prerenders, and never flashes French at a
 * Spanish visitor.
 *
 * For an attribute or a string built in code, use `useLang()` instead.
 * For a whole lesson body, render two `<article>`s with `data-ui` (see
 * `.claude/agents/lesson-author.md`).
 */
export function T({ fr, es }: { fr: ReactNode; es: ReactNode }) {
  return (
    <>
      <span data-ui="fr" lang="fr">
        {fr}
      </span>
      <span data-ui="es" lang="es">
        {es}
      </span>
    </>
  );
}
