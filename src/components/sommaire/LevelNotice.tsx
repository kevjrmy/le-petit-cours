"use client";

import Link from "next/link";
import { useAccount } from "@/hooks/useAccount";
import styles from "./LevelNotice.module.css";

/**
 * Says which level the listing is showing, when one is chosen.
 *
 * Without it lessons simply are not there, and a learner has no way to tell a
 * filter from a book that has not been written. The filter decides what the
 * book **offers**, never what it permits — a lesson at another level opens
 * normally from a link (#23) — and this line is what makes that legible.
 */
export function LevelNotice() {
  const account = useAccount();
  if (!account?.level) return null;

  return (
    <p className={styles.notice}>
      <span>
        Le sommaire montre le programme <strong>{account.level}</strong>.
      </span>
      <Link href="/compte">Changer de niveau</Link>
    </p>
  );
}
