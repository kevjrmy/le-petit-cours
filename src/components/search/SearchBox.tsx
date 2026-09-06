import Form from "next/form";
import styles from "./SearchBox.module.css";

/**
 * The search field.
 *
 * A `GET` form pointed at `/recherche`, which is the whole mechanism: the query
 * lives in the URL, so a search is linkable, shareable, in the back button and
 * restorable when the service worker serves the page cold. `next/form` adds
 * client-side navigation and prefetches the results route once the field is on
 * screen; without JavaScript it degrades to the plain HTML form it already is.
 *
 * **No hooks, no `'use client'`.** The home page holding it stays a Server
 * Component that ships no JavaScript of its own — the interactivity is `<Form>`,
 * a leaf, exactly as `AGENTS.md` §4 asks.
 */
export function SearchBox({
  defaultValue,
  hero = false,
}: {
  defaultValue?: string;
  /** Big, centred, on the home page. Compact above a page of results. */
  hero?: boolean;
}) {
  return (
    <Form action="/recherche" className={`${styles.form} ${hero ? styles.hero : ""}`} role="search">
      <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="11" cy="11" r="6.5" />
        <path d="M15.8 15.8L20 20" />
      </svg>
      <input
        type="search"
        name="q"
        defaultValue={defaultValue}
        className={styles.input}
        placeholder="Chercher une leçon…"
        aria-label="Chercher dans le cours"
        autoComplete="off"
        /* The browser's own clear button is a second, unstyled control that
           lands in the middle of ours in WebKit. The field is short enough to
           clear by hand. */
        enterKeyHint="search"
      />
      <button type="submit" className={styles.submit}>
        Chercher
      </button>
    </Form>
  );
}
