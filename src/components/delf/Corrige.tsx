"use client";

import { useState, type ReactNode } from "react";
import { T } from "@/components/lang/T";

/**
 * What an épreuve keeps hidden until it is asked for (#78, #82). Today that is
 * one thing: the texts of the listening épreuve, which the reader opens on
 * their own screen under « Montrer les textes à lire ». No épreuve prints a
 * corrigé any more — the compréhensions mark themselves (`<Correction>`) and
 * the productions are corrected by the person running them.
 *
 * **A leaf, not a wrapper** (`AGENTS.md` §4): the épreuve around it stays
 * server-rendered, and so does whatever is passed in as `children`.
 *
 * **Hidden by default, and it has to be.** A corrigé visible while the
 * candidate works is not a corrigé, it is the answers — and an épreuve is the
 * one page type in this course whose value is entirely in being attempted
 * first.
 *
 * **Not a `<details>`.** The button says what happens and the panel is
 * announced when it arrives; a `<details>` would open on a stray Enter while
 * someone is tabbing through the fields above, which on this page means seeing
 * the answers by accident. `aria-expanded` and `aria-controls` carry the same
 * relationship without that failure.
 *
 * **Nothing here scores and nothing is stored** (#2). A compréhension épreuve
 * is marked by `<Correction>` instead (#82); this block only reveals.
 *
 * **The labels are nodes, so a page can pass `<T fr="…" es="…" />`** (#102);
 * the defaults already are. A plain string stays as it is.
 */
export function Corrige({
  children,
  id = "corrige",
  ouvrir = <T fr="Voir les corrections" es="Ver las correcciones" />,
  fermer = <T fr="Cacher les corrections" es="Ocultar las correcciones" />,
}: {
  children: ReactNode;
  id?: string;
  ouvrir?: ReactNode;
  fermer?: ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <p>
        <button
          type="button"
          className="button"
          aria-expanded={open}
          aria-controls={id}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? fermer : ouvrir}
        </button>
      </p>

      {open && (
        <div id={id} className="corrige">
          {children}
        </div>
      )}
    </>
  );
}
