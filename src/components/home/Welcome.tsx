import Link from "next/link";
import styles from "./Welcome.module.css";

/**
 * The home page for somebody who is not signed in.
 *
 * **It replaces the search field rather than joining it** (#39, amended): the
 * field answers a learner who knows what they are looking for, and somebody
 * arriving for the first time cannot search a course they have not seen. The
 * returning learner who can is exactly the one who is signed in, and gets the
 * field back.
 *
 * **« Tout le cours » is the primary action, not « Se connecter ».** There is no
 * sign-up form anywhere and public sign-up is off (`AGENTS.md` §0) — accounts
 * are made by hand — so for a first visitor the account is a door they cannot
 * open. Emphasising it would sell the one thing this site does not offer. The
 * link is still here, quietly, because this page is the PWA's `start_url`: the
 * account control lives at the foot of the sidebar, which on a phone is behind
 * the drawer, so without this row nothing on the screen a student taps says
 * signing in exists.
 *
 * **« Rechercher » is here because the field is not.** `/recherche` is a real
 * page — the same field, empty — and no row anywhere in the chrome leads to it,
 * so removing the field from this page would otherwise take search out of the
 * app entirely for anybody signed out.
 *
 * It carries no `?suivant=`: from `/` that would only name the fallback the
 * redirect already uses, and it would bounce somebody who is signed in out of
 * the settings they came for (#70).
 *
 * A Server Component, passed to `HomeStart` as a prop, so the prerendered HTML
 * of `/` is this page — which is what most arrivals are, and what a search
 * engine reads.
 */
export function Welcome() {
  return (
    <div className={styles.welcome}>
      {/* Names no chapter and counts nothing. A sentence naming chapters is a
          hand-kept list that drifts in silence — `featuredChapterSlugs` is the
          same list and at least fails soft (#39) — and a number here is §9's
          count that disagrees with the rows under it. « Leçons », « exercices »
          and « lecture » are kinds of page rather than chapters, and all three
          exist: nothing here announces a page that is not written (#51). */}
      <p className={styles.blurb}>
        Des leçons courtes à lire, des exercices à faire, et de la lecture pour
        s&rsquo;entraîner. Tout est gratuit et fonctionne hors ligne.
      </p>

      {/* Not « Par où commencer », which is the pills' own label: this row
          holds a way into the account as well as two ways into the course,
          and the two rows are never on screen together anyway. */}
      <nav className={styles.row} aria-label="Commencer">
        <Link href="/sommaire" className="button button-primary">
          Tout le cours
        </Link>
        <Link href="/recherche" className="button">
          Rechercher
        </Link>
        <Link href="/compte" className="button">
          Se connecter
        </Link>
      </nav>
    </div>
  );
}
