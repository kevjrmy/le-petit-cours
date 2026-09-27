"use client";

import { useState, type ReactNode } from "react";

/**
 * « Voir les corrections » : what an épreuve keeps hidden until it is asked
 * for (#78, #82) — the model texts and the grille of a production, and on the
 * listening épreuve the texts the reader reads aloud, under their own labels.
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
 */
export function Corrige({
  children,
  id = "corrige",
  ouvrir = "Voir les corrections",
  fermer = "Cacher les corrections",
}: {
  children: ReactNode;
  id?: string;
  ouvrir?: string;
  fermer?: string;
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
