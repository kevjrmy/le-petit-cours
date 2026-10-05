"use client";

import { Comprehension } from "@/components/exercice/Comprehension";
import { SETS } from "./questions";

/** One set, so no level to choose. The questions are in `questions.ts`. */
export function Quiz() {
  return <Comprehension questions={SETS.A2} />;
}
