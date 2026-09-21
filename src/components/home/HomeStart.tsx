"use client";

import type { ReactNode } from "react";
import { useAccount } from "@/hooks/useAccount";
import styles from "./HomeStart.module.css";

/**
 * Which home page this is: the welcome, or the app.
 *
 * **The two views are Server Components, handed in as props.** Nothing here
 * imports them, so `SearchBox`, `StartPills` and `Welcome` all stay on the
 * server and this file is the only JavaScript the swap costs. Both trees are
 * rendered once and travel in the payload; only one is ever in the DOM.
 *
 * **The prerendered `/` is the welcome**, because `useAccount()` is `null` on
 * the server and for the moment before the session is read. That is the right
 * half to bake in: it is what most arrivals are, what a search engine reads,
 * and what the offline cache serves to a browser with no session. The cost
 * falls on the learner who *is* signed in — this page is the PWA's `start_url`,
 * so they see the welcome for the length of a hydration before it becomes their
 * app.
 *
 * **Which is why the slot has a floor and not a height.** The swap changes what
 * is in the slot, never where the footer is (#63 draws it on `/`), so a cold
 * launch reads as a page filling in rather than a page rebuilding itself. A
 * fixed height would be the same promise made wrongly: the two views cannot
 * agree on one below the phone breakpoint, where the blurb takes a third line
 * and the pills take a second.
 *
 * **Not `useAccountReady()`.** Telling "signed out" from "not read yet" would
 * mean drawing neither for that moment, which is a blank first screen for
 * everybody who is signed out — most of them — to spare the swap for the few
 * who are not. The greeting above makes the same trade for the same reason.
 */
export function HomeStart({ welcome, app }: { welcome: ReactNode; app: ReactNode }) {
  const account = useAccount();

  return <div className={styles.slot}>{account ? app : welcome}</div>;
}
