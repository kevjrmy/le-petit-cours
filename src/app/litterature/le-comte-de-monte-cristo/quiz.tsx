"use client";

import { Comprehension } from "@/components/exercice/Comprehension";
import { SETS } from "./questions";

/** The set for the level in view, like the body above it (#92). */
export function Quiz() {
  return <Comprehension sets={SETS} quotes="fr" />;
}
