import type { Lang } from "@/lib/account";
import styles from "./Flag.module.css";

/**
 * The flag of a language the account screens speak (#91). Decorative: it sits
 * beside the language's name, never alone. Both at 3:2, no arms at this size.
 * Their colours are palette tokens kept for this one use (`globals.css`).
 */
export function Flag({ lang }: { lang: Lang }) {
  return (
    <svg className={styles.flag} viewBox="0 0 3 2" aria-hidden="true">
      {lang === "es" ? (
        <>
          {/* The civil flag, stripes 1:2:1. */}
          <rect width="3" height="2" fill="var(--flag-es-red)" />
          <rect y="0.5" width="3" height="1" fill="var(--flag-es-yellow)" />
        </>
      ) : (
        <>
          <rect width="1" height="2" fill="var(--flag-fr-blue)" />
          <rect x="1" width="1" height="2" fill="var(--flag-fr-white)" />
          <rect x="2" width="1" height="2" fill="var(--flag-fr-red)" />
        </>
      )}
    </svg>
  );
}

/** Each language named in itself, as a language chooser does. */
export const LANG_NAME: Record<Lang, string> = { fr: "Français", es: "Español" };
