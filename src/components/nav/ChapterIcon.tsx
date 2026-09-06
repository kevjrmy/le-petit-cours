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
  /* A paradigm table: header row, first column. */
  conjugaison: (
    <>
      <rect x="3.5" y="4.5" width="17" height="15" rx="2" />
      <path d="M3.5 9.5h17M9.5 9.5v10" />
    </>
  ),
  /* A letter and a tick — spelling checked. */
  orthographe: (
    <>
      <path d="M3.5 14 7 4l3.5 10" />
      <path d="M4.7 11.2h4.6" />
      <path d="M13 15.5l3 3 5-6" />
    </>
  ),
  /* Two cards, one behind the other: a word and its translation. */
  vocabulaire: (
    <>
      <path d="M7.5 8.5V6a1.5 1.5 0 0 1 1.5-1.5h9A1.5 1.5 0 0 1 19.5 6v9a1.5 1.5 0 0 1-1.5 1.5h-2.5" />
      <rect x="4.5" y="8.5" width="11" height="11" rx="1.5" />
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
  /* Annexes. The contents page: rows with their marks. */
  sommaire: (
    <path d="M4.5 7h1M9 7h10.5M4.5 12h1M9 12h10.5M4.5 17h1M9 17h10.5" />
  ),
  /* What is new: a star on the calendar. */
  nouveautes: (
    <>
      <rect x="3.5" y="5.5" width="17" height="15" rx="2" />
      <path d="M3.5 10h17M8 3.5v4M16 3.5v4" />
      <path d="m12 12.5 1.1 2.3 2.4.3-1.8 1.7.5 2.4-2.2-1.2-2.2 1.2.5-2.4-1.8-1.7 2.4-.3Z" />
    </>
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
