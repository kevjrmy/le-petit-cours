"use client";

import { Comprehension } from "@/components/exercice/Comprehension";
import { SETS } from "./questions";

/**
 * The first page in the course to serve two levels from one text
 * (`docs/decisions.md` #68). The text, the vocabulary table and the tick are
 * one; only the questions change, and the level the learner is working at is
 * what picks them (#73). **The B1 set is written and currently unreachable**,
 * because B1 is not in `CHOOSABLE_LEVELS` — it comes back the day B1 does.
 */
export function Quiz() {
  return <Comprehension sets={SETS} />;
}
