"use client";

import { Comprehension } from "@/components/exercice/Comprehension";
import { SETS } from "./questions";

/** Two levels from one text (`docs/decisions.md` #68). The sets are in `questions.ts`. */
export function Quiz() {
  return <Comprehension sets={SETS} />;
}
