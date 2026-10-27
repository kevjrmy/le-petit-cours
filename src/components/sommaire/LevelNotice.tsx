"use client";

import Link from "next/link";
import type { Level } from "@/data/navigation";
import { T } from "@/components/lang/T";
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
  /* Each language's whole sentence (#102): only the levels are shared. */
  return (
    <p className={styles.notice}>
      <span>
        <T
          fr={
            <>
              Le sommaire montre {levels.length === 1 ? "le niveau" : "les niveaux"}{" "}
              {listOf(levels, " et ")}, et les pages sans niveau.
            </>
          }
          es={
            <>
              El índice muestra {levels.length === 1 ? "el nivel" : "los niveles"}{" "}
              {listOf(levels, " y ")} y las páginas sin nivel.
            </>
          }
        />
      </span>
      <Link href="/compte#vue">
        <T fr="Changer" es="Cambiar" />
      </Link>
    </p>
  );
}

/** « A1, A2 et B1 » — the last pair joined by the language's own word. */
function listOf(levels: Level[], and: string) {
  return levels.map((level, index) => (
    <span key={level}>
      {index > 0 && (index === levels.length - 1 ? and : ", ")}
      <strong>{level}</strong>
    </span>
  ));
}
