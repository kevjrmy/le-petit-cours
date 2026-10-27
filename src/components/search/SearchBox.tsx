"use client";

import Form from "next/form";
import { useLang } from "@/hooks/useLang";
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
 * **A client leaf, for its words** (#102): the placeholder and the names are
 * attributes, which CSS cannot switch, so they are read from `useLang()` —
 * French on the server and for the length of a hydration, then the
 * interface's. The pages holding it stay Server Components (`AGENTS.md` §4);
 * the field was a client island already, through `<Form>`.
 */
export function SearchBox({
  defaultValue,
  hero = false,
}: {
  defaultValue?: string;
  /** Big, centred, on the home page. Compact above a page of results. */
  hero?: boolean;
}) {
  const es = useLang() === "es";

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
        placeholder={es ? "Buscar una lección…" : "Chercher une leçon…"}
        aria-label={es ? "Buscar en el curso" : "Chercher dans le cours"}
        autoComplete="off"
        /* The browser's own clear button is a second, unstyled control that
           lands in the middle of ours in WebKit. The field is short enough to
           clear by hand. */
        enterKeyHint="search"
      />
      <button type="submit" className={styles.submit} aria-label={es ? "Buscar" : "Chercher"}>
        {/* Same 24-grid, stroke 2, round caps as the rest of the chrome. The
            arrow points up because that is where the answer arrives — the
            results replace the page above it — and because an icon-only submit
            is only legible when it is one of the shapes a field already
            teaches. `aria-label` because there is no text left (§5). */}
        <svg className={styles.submitIcon} viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 19.5V5.5" />
          <path d="M6 11.5L12 5.5l6 6" />
        </svg>
      </button>
    </Form>
  );
}
