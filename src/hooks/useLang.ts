"use client";

import { useSyncExternalStore } from "react";
import { currentLang, subscribeLang, type Lang } from "@/lib/lang";

/**
 * The interface language, for what CSS cannot switch: an attribute
 * (`aria-label`, `placeholder`), a string built in code, a choice to save.
 *
 * **Visible text uses `<T>` instead.** This hook answers « fr » on the server
 * and during hydration, then the real value: text read from it would show
 * French for a moment to a Spanish visitor. `<T>` prints both and lets
 * `globals.css` hide one before paint (#102).
 */
export function useLang(): Lang {
  return useSyncExternalStore(subscribeLang, currentLang, () => "fr");
}
