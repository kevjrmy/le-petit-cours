"use client";

import Link from "next/link";
import { useAccount } from "@/hooks/useAccount";
import styles from "./LevelNotice.module.css";

/**
 * Says which levels the listing is showing, when the learner chose some (#86).
 *
 * Without it lessons simply are not there, and a learner has no way to tell a
 * filter from a course that has not been written. The filter decides what the
 * course **offers**, never what it permits — a lesson at another level opens
 * normally from a link (#86) — and this line is what makes that legible.
 */
export function LevelNotice() {
  const account = useAccount();
  if (!account || account.view === "all") return null;

  const levels = account.view;
  return (
    <p className={styles.notice}>
      <span>
        Le sommaire montre {levels.length === 1 ? "le niveau" : "les niveaux"}{" "}
        {levels.map((level, index) => (
          <span key={level}>
            {index > 0 && (index === levels.length - 1 ? " et " : ", ")}
            <strong>{level}</strong>
          </span>
        ))}
        , et les pages sans niveau.
      </span>
      <Link href="/compte#vue">Changer</Link>
    </p>
  );
}
