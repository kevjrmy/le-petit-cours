"use client";

import { Comprehension } from "@/components/exercice/Comprehension";
import { SETS } from "./questions";

export function Quiz() {
  return <Comprehension sets={SETS} />;
}
