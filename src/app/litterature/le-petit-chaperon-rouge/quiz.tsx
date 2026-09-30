"use client";

import { Comprehension } from "@/components/exercice/Comprehension";
import { SETS } from "./questions";

/** One set, at A1: a lower level of a text is a new page, never a set (#72). */
export function Quiz() {
  return <Comprehension sets={SETS} quotes="fr" />;
}
