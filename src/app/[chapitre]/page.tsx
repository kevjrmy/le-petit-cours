import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { chapterCount, chapters } from "@/data/navigation";
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

  const { count, label } = chapterCount(chapter);

  return (
    <div className="prose">
      <header className={styles.head}>
        <h1>{chapter.title}</h1>
        <p className={styles.blurb}>{chapter.blurb}</p>
        <p className={styles.count}>
          {count > 0
            ? `${count} ${label} · ${chapter.lessons.length - count} à venir`
            : `${chapter.lessons.length} ${chapter.unit[1]} à venir`}
        </p>
      </header>

      <ul className={styles.list}>
        {chapter.lessons.map((lesson) => {
          const row = (
            <>
              <span className={styles.rowMain}>
                <span className={styles.title}>
                  {lesson.titleHtml ? (
                    <span dangerouslySetInnerHTML={{ __html: lesson.titleHtml }} />
                  ) : (
                    lesson.title
                  )}
                </span>
                {lesson.subtitle && (
                  <span className={styles.subtitle}>{lesson.subtitle}</span>
                )}
              </span>
              <span className={styles.meta}>
                {lesson.tag && <span className={styles.tag}>{lesson.tag}</span>}
                {lesson.levels.map((level) => (
                  <span key={level} className={styles.level}>
                    {level}
                  </span>
                ))}
                {lesson.soon && <span className={styles.soon}>Bientôt</span>}
              </span>
            </>
          );

          return (
            <li key={lesson.path}>
              {lesson.soon ? (
                <span className={`${styles.row} ${styles.rowSoon}`}>{row}</span>
              ) : (
                <Link href={lesson.path} className={styles.row}>
                  {row}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
