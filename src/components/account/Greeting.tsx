"use client";

import { displayName, useAccount } from "@/hooks/useAccount";
import styles from "./Greeting.module.css";

/**
 * The line under the wordmark: the tagline, or the learner's name.
 *
 * **One slot, two states, never both.** The tagline is a pitch, and a pitch is
 * for somebody who has not signed in yet; a learner who has is told who the app
 * thinks they are, which is the one thing the home page can say that `/compte`
 * would otherwise be the only place to check. Stacking a greeting *under* the
 * tagline would give the first screen two lines that address different people.
 *
 * **The name is `displayName(account)`** — their chosen name if they set one,
 * else their username (#31). Resolved there and nowhere else, so this greeting
 * and the account menu cannot come to call the same person two things.
 *
 * A client leaf, so the page around it stays a Server Component and keeps
 * prerendering (`AGENTS.md` §4, §8): the session lives in `AccountProvider`,
 * which is inside the shell. The prerendered HTML therefore carries the
 * tagline, and a signed-in learner sees it swap once the session is read — the
 * same moment « La suite » appears beneath the field. Reserving the slot and
 * drawing nothing until then would trade that swap for a blank line on the
 * first screen of everyone who is signed out, which is most arrivals.
 */
export function Greeting() {
  const account = useAccount();

  if (!account) {
    return <p className={styles.line}>Apprendre le français petit à petit</p>;
  }

  return (
    <p className={styles.line}>
      Bonjour, <strong className={styles.name}>{displayName(account)}</strong>
    </p>
  );
}
