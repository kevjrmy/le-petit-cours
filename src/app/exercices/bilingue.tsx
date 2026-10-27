import { T } from "@/components/lang/T";
import type { Lang } from "@/lib/lang";

/**
 * A line of explanation in both languages (#102), for the drills' data.
 *
 * **A data field typed `Bi` fails to compile without its Spanish.** The French
 * taught that sits inside the Spanish (`*sortir*`, `*elle est sortie*`) is
 * written between asterisks and printed with `lang="fr"`, as `le-la-ou-un`
 * does: nothing checks a plain string, so the helper does it.
 */
export type Bi = { fr: string; es: string };

/** The text with its `*French*` runs in `lang="fr"` (the asterisks are dropped). */
export function Marked({ text }: { text: string }) {
  return text.split("*").map((part, i) =>
    i % 2 === 1 ? (
      <span key={i} className="fr" lang="fr">
        {part}
      </span>
    ) : (
      part
    ),
  );
}

/** Visible text in both languages; the Spanish may carry `*French*` runs. */
export function Bilingue({ text }: { text: Bi }) {
  return <T fr={text.fr} es={<Marked text={text.es} />} />;
}

/** For an attribute or a string built in code: the language in view, asterisks off. */
export function plain(text: Bi, lang: Lang): string {
  return text[lang].replaceAll("*", "");
}
