import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { chapters } from "@/data/navigation";
import { ChapterLessons } from "@/components/sommaire/ChapterLessons";
import styles from "./page.module.css";

/* Every chapter landing page, generated from the manifest. There is
   deliberately no hand-written one: a bespoke page drifts the moment a lesson
   is added (`.claude/agents/nav-wiring.md`). */
export function generateStaticParams() {
  return chapters.map((chapter) => ({ chapitre: chapter.slug }));
}

/* Only the slugs above exist. Anything else 404s instead of being rendered on
   demand, which is what keeps this dynamic segment from swallowing every
   unmatched top-level path. */
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: PageProps<"/[chapitre]">): Promise<Metadata> {
  const { chapitre } = await params;
  const chapter = chapters.find((item) => item.slug === chapitre);
  return chapter
    ? { title: chapter.title, description: chapter.blurb }
    : {};
}

export default async function ChapterPage({ params }: PageProps<"/[chapitre]">) {
  const { chapitre } = await params;
  const chapter = chapters.find((item) => item.slug === chapitre);
  if (!chapter) notFound();

  return (
    <div className="prose">
      <header className={styles.head}>
        <h1>{chapter.title}</h1>
        <p className={styles.blurb}>{chapter.blurb}</p>
      </header>

      <ChapterLessons chapter={chapter} />
    </div>
  );
}
