import styles from "./speech.module.css";

/* The marks the course's speaking tools share (`NumberSpeaker`,
   `/prononciation`), so a button that reads aloud looks the same
   wherever it is. Same hand as the chrome (`ChapterIcon`): a 24-grid, round
   caps, stroked in `currentColor`, so each follows its button's ink in both
   themes. Always beside a word: a snail is never asked to say « slowly » on
   its own. */

/** A speaker and two waves: « hear it ». */
export function SpeakerIcon() {
  return (
    <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 9.5h3l4.5-4v13L7 14.5H4z" />
      <path d="M15 9.5a3.5 3.5 0 0 1 0 5" />
      <path d="M17.8 7a7 7 0 0 1 0 10" />
    </svg>
  );
}

/** A square: « stop », the mark every player uses. */
export function StopIcon() {
  return (
    <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true">
      <rect x="6.5" y="6.5" width="11" height="11" rx="2" />
    </svg>
  );
}

/** A snail: « slowly ». The shell is a coil, the foot one line, two horns. */
export function SnailIcon() {
  return (
    <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="14.5" cy="12" r="6" />
      <path d="M17 12a2.5 2.5 0 1 0-2.5 2.5" />
      <path d="M3.5 19.5H21" />
      <path d="M9 19.5c-2.6 0-4.2-1.8-4.2-4.3" />
      <path d="M4.8 15.2 3.5 11.8M4.8 15.2l1.9-3.2" />
    </svg>
  );
}

/** A cross: « clear the field ». */
export function ClearIcon() {
  return (
    <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 7l10 10M17 7 7 17" />
    </svg>
  );
}
