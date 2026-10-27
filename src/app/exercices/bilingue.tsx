import { T } from "@/components/lang/T";
import type { Lang } from "@/lib/lang";

/**
 * A line of explanation in both languages (#102), for the drills' data.
 *
 * **A data field typed `Bi` fails to compile without its Spanish.** The foreign
 * words that sit inside an explanation are marked, and printed with their own
 * `lang`, because nothing checks a plain string:
 * - in `es`, the French taught is `*sortir*`, `*elle est sortie*` (`lang="fr"`);
 * - in `fr`, the Spanish of an A1 comparison is `~sortir~`, `~salió~`
 *   (`lang="es"`). A1 drills only; an A2+ French line has no Spanish in it.
 */
export type Bi = { fr: string; es: string };

/** The text with its marked runs in their own `lang` (the marks are dropped). */
export function Marked({ text, lang = "es" }: { text: string; lang?: Lang }) {
  /* In Spanish the foreign run is French, in French it is Spanish. */
  const mark = lang === "es" ? "*" : "~";
  const other = lang === "es" ? "fr" : "es";
  return text.split(mark).map((part, i) =>
    i % 2 === 1 ? (
      <span key={i} className={other === "fr" ? "fr" : undefined} lang={other}>
        {part}
      </span>
    ) : (
      part
    ),
  );
}

/** Visible text in both languages; each may carry its foreign runs marked. */
export function Bilingue({ text }: { text: Bi }) {
  return (
    <T
      fr={<Marked text={text.fr} lang="fr" />}
      es={<Marked text={text.es} lang="es" />}
    />
  );
}

/** For an attribute or a string built in code: the language in view, marks off. */
export function plain(text: Bi, lang: Lang): string {
  return text[lang].replaceAll(lang === "es" ? "*" : "~", "");
}
