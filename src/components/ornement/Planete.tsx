import type { ReactNode } from "react";
import styles from "./Planete.module.css";

/* Five stars, drawn from their centre and radius once and written out. */
const STARS = [
  "M36.0 10.5 L37.4 14.1 L41.2 14.3 L38.2 16.7 L39.2 20.4 L36.0 18.4 L32.8 20.4 L33.8 16.7 L30.8 14.3 L34.6 14.1 Z",
  "M124.0 6.0 L125.0 8.6 L127.8 8.8 L125.6 10.5 L126.4 13.2 L124.0 11.7 L121.6 13.2 L122.4 10.5 L120.2 8.8 L123.0 8.6 Z",
  "M110.0 29.2 L110.7 31.0 L112.7 31.1 L111.1 32.4 L111.6 34.3 L110.0 33.2 L108.4 34.3 L108.9 32.4 L107.3 31.1 L109.3 31.0 Z",
  "M50.0 35.7 L50.6 37.2 L52.2 37.3 L50.9 38.3 L51.4 39.9 L50.0 39.0 L48.6 39.9 L49.1 38.3 L47.8 37.3 L49.4 37.2 Z",
  "M138.0 33.7 L138.6 35.2 L140.2 35.3 L138.9 36.3 L139.4 37.9 L138.0 37.0 L136.6 37.9 L137.1 36.3 L135.8 35.3 L137.4 35.2 Z",
];

/**
 * The course's own motif (#100): an open book on a little planet, under a few
 * stars. *Le Petit Prince* gave the mood; the drawing is the course's, and
 * holds none of the book's — no prince, no rose, no fox, no volcano (#60).
 *
 * **Ornament, and said so**: `aria-hidden`, no title, no role. It goes where a
 * page has little to show — a page not found, a search with no result, a
 * chapter with nothing in it, the sign-in screen — and never inside a lesson,
 * where a picture would be read as part of what is taught.
 *
 * Every colour is a token (`--planet`, `--star`, `--accent`), so it follows
 * the theme. A Server Component with no state: a client leaf may import it.
 */
export function Planete({ className }: { className?: string }) {
  return (
    <svg
      className={className ? `${styles.planete} ${className}` : styles.planete}
      viewBox="24 2 120 70"
      aria-hidden="true"
      focusable="false"
    >
      {STARS.map((d) => (
        <path key={d} className={styles.star} d={d} />
      ))}
      {/* The top of a planet, its two craters cut out of it. */}
      <path
        className={styles.ground}
        fillRule="evenodd"
        d="M32 104 a48 48 0 1 0 96 0 a48 48 0 1 0 -96 0 Z
           M62 63 a4 1.4 0 1 0 8 0 a4 1.4 0 1 0 -8 0 Z
           M91 61 a3 1.1 0 1 0 6 0 a3 1.1 0 1 0 -6 0 Z"
      />
      {/* An open book standing on it, its two pages apart at the spine. */}
      <path
        className={styles.book}
        d="M79.4 56 C75.5 53.6 70.5 53 66 53.6 L66 45.6 C70.5 45 75.5 45.6 79.4 48 Z
           M80.6 56 C84.5 53.6 89.5 53 94 53.6 L94 45.6 C89.5 45 84.5 45.6 80.6 48 Z"
      />
    </svg>
  );
}

/**
 * A page with nothing to list: the motif over the sentence that says so. One
 * wrapper, so every empty state is drawn alike; the sentence stays the
 * caller's, since each silence is told its own way (#51).
 */
export function Vide({ children }: { children: ReactNode }) {
  return (
    <div className={styles.vide}>
      <Planete />
      {children}
    </div>
  );
}
