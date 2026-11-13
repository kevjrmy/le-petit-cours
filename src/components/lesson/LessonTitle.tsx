import { T } from "@/components/lang/T";

/**
 * A page's title, and its subtitle, in both interfaces (#102, #104).
 *
 * Most titles have no Spanish twin: a lesson's title usually names the French
 * it teaches (« La maison », « Se présenter », a book). A `grammaire` or
 * `orthographe` page is titled « Type (forms) » (#104): the type is explanation
 * and gets a Spanish twin, and the forms in parentheses are French taught. They
 * are kept French in the Spanish string too, and marked `lang="fr"` here, so a
 * screen reader does not read « (le, la, les) » as Spanish.
 *
 * One component for every place a lesson is named — the heading, a row, « La
 * suite », the record, « Pour aller plus loin » — so none can forget the twin.
 * The tab title stays French: switching it needs a server read (#102).
 */
export function LessonTitle({ title, titleEs }: { title: string; titleEs?: string }) {
  if (!titleEs) return title;
  return <T fr={title} es={withFrenchHint(titleEs)} />;
}

export function LessonSubtitle({
  subtitle,
  subtitleEs,
}: {
  subtitle: string;
  subtitleEs?: string;
}) {
  if (!subtitleEs) return subtitle;
  return <T fr={subtitle} es={subtitleEs} />;
}

/* « Los artículos definidos (le, la, les) »: the trailing parentheses are the
   French forms. A title without them is returned as it is. */
function withFrenchHint(text: string) {
  const match = /^(.*\S) (\(.+\))$/.exec(text);
  if (!match) return text;
  return (
    <>
      {match[1]} <span lang="fr">{match[2]}</span>
    </>
  );
}
