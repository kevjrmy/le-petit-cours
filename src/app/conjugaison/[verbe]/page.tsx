import { notFound } from "next/navigation";
import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";
import { ConjugationSheet } from "@/components/conjugaison/ConjugationSheet";
import { findVerb, verbs } from "@/data/conjugaisons";

/**
 * Every verb sheet, from one route (`docs/decisions.md` #56) — the same shape
 * `[chapitre]` uses for the chapter pages. Ten near-identical files is ten
 * chances for one of them to drift.
 *
 * `dynamicParams = false` so an unknown verb 404s instead of being rendered on
 * demand, which is also what stops the segment swallowing every unmatched path
 * under `/conjugaison/`.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return verbs.map((verb) => ({ verbe: verb.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/conjugaison/[verbe]">) {
  const { verbe } = await params;
  return lessonMetadata(`/conjugaison/${verbe}`);
}

export default async function Page({ params }: PageProps<"/conjugaison/[verbe]">) {
  const { verbe } = await params;
  const verb = findVerb(verbe);
  if (!verb) notFound();

  return (
    <article className="prose">
      <PageHeader path={`/conjugaison/${verbe}`} />
      <ConjugationSheet verb={verb} />
    </article>
  );
}
