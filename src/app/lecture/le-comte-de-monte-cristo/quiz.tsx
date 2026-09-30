"use client";

import { Comprehension } from "@/components/exercice/Comprehension";
import { SETS } from "./questions";

/**
 * The first page in the course to serve two levels from one text
 * (`docs/decisions.md` #68). The text, the vocabulary table and the tick are
 * one; only the questions change, and the parcours the learner follows is what
 * picks them (#87).
 */
export function Quiz() {
  return <Comprehension sets={SETS} />;
}
