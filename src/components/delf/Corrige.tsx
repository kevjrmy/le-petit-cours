"use client";

import { useState, type ReactNode } from "react";

/**
 * « Voir les corrections » : the one client island on an épreuve page (#78).
 *
 * **Everything above it is static HTML.** The questions, the radios and the
 * fields are server-rendered and uncontrolled, so a candidate's answers live in
 * the DOM, survive with no JavaScript at all, and are still on screen when the
 * corrigé opens underneath them. That is the whole reason the reveal is a leaf
 * and not a wrapper (`AGENTS.md` §4): making the page a Client Component to get
 * one button would cost the prerender of a page that is mostly text.
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
 * **Nothing is scored and nothing is stored** (#2, #78). The page compares
 * nothing: the candidate reads the corrigé beside what they wrote, exactly as
 * they would with the paper version.
 */
export function Corrige({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <p>
        <button
          type="button"
          className="button"
          aria-expanded={open}
          aria-controls="corrige"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? "Cacher les corrections" : "Voir les corrections"}
        </button>
      </p>

      {open && (
        <div id="corrige" className="corrige">
          {children}
        </div>
      )}
    </>
  );
}
