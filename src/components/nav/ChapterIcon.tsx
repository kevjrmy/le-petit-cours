import type { IconName } from "@/data/navigation";
import styles from "./ChapterIcon.module.css";

/**
 * The chapter marks, drawn here rather than pulled from a set.
 *
 * **Why they are inline SVG and not an icon font, a sprite or a package.** This
 * is a PWA someone opens in the métro: an icon that arrives over the network is
 * an icon that is missing exactly when the app is supposed to still work. The
 * Vue app solved this with `unplugin-icons`, which compiled `~icons/mdi/*` into
 * the bundle at build time — the mechanism was right and it is what is kept
 * here. What is dropped is the dependency and the third-party licence: these
 * are ours, so the repo owes no attribution (`AGENTS.md` §9b).
 *
 * **A missing icon is a type error, not a fallback glyph.** That is the whole
 * repair to `docs/decisions.md` #29, which removed the icon field precisely
 * because the Vue map ended `?? icons.default`: forget a chapter and it
 * rendered a generic file glyph that looked like a design choice, with nothing
 * failing anywhere. Here `IconName` is declared in the manifest and this map is
 * a `Record<IconName, …>`, so **both** directions are checked at compile time —
 * a chapter with no icon will not typecheck, and an icon nothing names is a
 * dead key you can see. There is no `default` and there must never be one.
 *
 * They are stroke drawings on the same 24-grid, stroke-width 2 and round caps,
 * because the rest of the chrome already is — the magnifier, the chevrons, the
 * account glyph. One hand, so fourteen marks read as one set.
 */
const PATHS: Record<IconName, React.ReactNode> = {
  /* An open book, spine in the middle. */
  grammaire: (
    <>
      <path d="M12 7v13" />
      <path d="M12 7c-1.6-1.4-4.3-2-8-1.6v12.6c3.7-.4 6.4.2 8 1.6" />
      <path d="M12 7c1.6-1.4 4.3-2 8-1.6v12.6c-3.7-.4-6.4.2-8 1.6" />
    </>
  ),
  /* A paradigm table: a header row, the persons down one side, the forms
     beside them. One rule and one column short of this it read as the layout
     glyph — a panel with a sidebar, which is what the app itself looks like. */
  conjugaison: (
    <>
      <rect x="3.5" y="4.5" width="17" height="15" rx="2" />
      <path d="M3.5 9h17M12 9v10.5M3.5 14.25h17" />
    </>
  ),
  /* A letter and a tick — spelling checked. Both stand on one baseline: the
     tick used to hang below the A's feet, where it read as a subscript. */
  orthographe: (
    <>
      <path d="M3 15.5 6.75 5.5l3.75 10" />
      <path d="M4.4 12.3h4.7" />
      <path d="M13 11.6l2.7 2.9 5.3-6" />
    </>
  ),
  /* ABC — the words themselves. The two shapes it is not: a tag says « label »
     and offset cards are the copy glyph every operating system already owns.

     It is the one mark in the set drawn as letterforms rather than an object,
     so the spacing is load-bearing and tighter than it looks. The gaps between
     the three are 3.2 units, measured centreline to centreline at the letters'
     closest approach: at the 19px a sidebar row actually draws this, a 1.8
     stroke eats 1.4px of any gap, and at 2.8 the A's right leg fused into the
     B's stem. The A is 5 wide against 11 tall for the same reason — narrower
     and its crossbar closes on its own legs and it reads as a 4. Retune one
     letter, check all three at pixel size, not zoomed. */
  vocabulaire: (
    <>
      <path d="M1.5 17.5 4 6.5l2.5 11" />
      <path d="M2.1 14.9h3.8" />
      <path d="M9.7 6.5v11" />
      <path d="M9.7 6.5h1a2.75 2.75 0 0 1 0 5.5H9.7" />
      <path d="M9.7 12h1.2a2.75 2.75 0 0 1 0 5.5H9.7" />
      <path d="M22.36 8.95a3.6 3.6 0 1 0 0 6.1" />
    </>
  ),
  /* A bulb: the thing you remember instead of the rule. */
  astuces: (
    <>
      <path d="M12 3a6 6 0 0 1 3.6 10.8c-.7.5-1.1 1.3-1.1 2.2h-5c0-.9-.4-1.7-1.1-2.2A6 6 0 0 1 12 3Z" />
      <path d="M9.5 18.5h5M10.5 21h3" />
    </>
  ),
  /* A waveform — the voice, not the music. */
  prononciation: (
    <path d="M4 10.5v3M8 6.5v11M12 3.5v17M16 7.5v9M20 10.5v3" />
  ),
  /* A dumbbell: the drills. */
  exercices: (
    <path d="M6.5 8.5v7M4 10.5v3M17.5 8.5v7M20 10.5v3M6.5 12h11" />
  ),
  /* A die — a game redraws every round. */
  jeux: (
    <>
      <rect x="4.5" y="4.5" width="15" height="15" rx="3" />
      <circle cx="9" cy="9" r="1.15" className={styles.dot} />
      <circle cx="12" cy="12" r="1.15" className={styles.dot} />
      <circle cx="15" cy="15" r="1.15" className={styles.dot} />
    </>
  ),
  /* Headphones: listen, then write it down. */
  dictees: (
    <>
      <path d="M4.5 14.5v-2.5a7.5 7.5 0 0 1 15 0v2.5" />
      <path d="M4.5 13.5h2.2a1 1 0 0 1 1 1v3.2a1 1 0 0 1-1 1H6a1.5 1.5 0 0 1-1.5-1.5v-3.7Z" />
      <path d="M19.5 13.5h-2.2a1 1 0 0 0-1 1v3.2a1 1 0 0 0 1 1H18a1.5 1.5 0 0 0 1.5-1.5v-3.7Z" />
    </>
  ),
  /* A speech bubble. */
  conversation: (
    <path d="M6 4.5h12A2.5 2.5 0 0 1 20.5 7v7a2.5 2.5 0 0 1-2.5 2.5h-6l-4.5 3.5v-3.5H6A2.5 2.5 0 0 1 3.5 14V7A2.5 2.5 0 0 1 6 4.5Z" />
  ),
  /* A text and where it is going: three lines for the source, an arrow out of
     it — this chapter gives her a text and asks for it back in French. The
     lines sit 4.5 units apart because 3.5 closes up at the 19px the sidebar
     actually draws them at.

     The three shapes it is not: the two-arrow swap reads as "sync" beside a
     chapter about writing; a letter plus an arrow plus the lines it becomes
     packed five strokes into 24 units and came out a smudge; and a bar, an
     arrow down and a second bar is the download glyph exactly. */
  traduction: (
    <>
      <path d="M3.5 7.5h8M3.5 12h5.5M3.5 16.5h8" />
      <path d="M13.5 12h7" />
      <path d="M17.6 9 20.6 12l-3 3" />
    </>
  ),
  /* A page with text on it — a text to read, not a book to study. */
  lecture: (
    <>
      <path d="M6.5 3.5h7L18.5 9v10.5a1.5 1.5 0 0 1-1.5 1.5H6.5A1.5 1.5 0 0 1 5 19.5V5a1.5 1.5 0 0 1 1.5-1.5Z" />
      <path d="M13.5 3.5V9h5" />
      <path d="M8.5 13h6M8.5 16.5h4" />
    </>
  ),
  /* A quill: what was written rather than what is read. */
  litterature: (
    <>
      <path d="M20 4c-8 1-13 6-14.5 12.5L4 20l3.5-1.5C14 17 19 12 20 4Z" />
      <path d="M9 15c2-3 4.5-5 7.5-6.5" />
    </>
  ),
  /* Two beamed notes. */
  musique: (
    <>
      <path d="M9 17.5V6l10-2v11.5" />
      <circle cx="6.5" cy="17.5" r="2.5" />
      <circle cx="16.5" cy="15.5" r="2.5" />
    </>
  ),
  /* The tower, because the chapter is the country behind the language. */
  culture: (
    <>
      <path d="M12 3.5c0 6.5 2 13 4 17.5M12 3.5c0 6.5-2 13-4 17.5" />
      <path d="M10.2 11h3.6M9 15.5h6" />
    </>
  ),
  /* Annexes. The contents page: rows with their marks. There is one because
     one annexe is drawn in the sidebar; « Nouveautés » had a calendar glyph and
     it went with the page (#51) — an icon nothing names is a dead key. */
  sommaire: (
    <path d="M4.5 7h1M9 7h10.5M4.5 12h1M9 12h10.5M4.5 17h1M9 17h10.5" />
  ),
};

/**
 * One chapter's mark. `aria-hidden` always: the row around it carries the name,
 * and an icon that announces itself says everything twice.
 */
export function ChapterIcon({ name }: { name: IconName }) {
  return (
    <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true">
      {PATHS[name]}
    </svg>
  );
}
