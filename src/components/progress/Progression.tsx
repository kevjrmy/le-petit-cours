"use client";

import Link from "next/link";
import { chapters, publishedLessons, type Chapter, type Lesson } from "@/data/navigation";
import { useAccount } from "@/hooks/useAccount";
import { useProgress } from "@/hooks/useProgress";
import { ChapterIcon } from "@/components/nav/ChapterIcon";
import styles from "./Progression.module.css";

/**
 * The learner's own record: what they have finished, chapter by chapter.
 *
 * **This is the one listing that does not filter by level.** Every other
 * listing shows what the course *offers* at the learner's level (`AGENTS.md`
 * §6); this one shows what they *did*, and a tick hidden because they since
 * moved from A2 to A1 would read as a lost tick. It is the same reasoning that
 * makes search group by level rather than cut by it, and the same reasoning
 * behind the migration keeping the level out of the progress key.
 *
 * The denominator is **published** lessons, so a chapter announcing five pages
 * and shipping one is scored out of one — a `soon` entry must never make a
 * finished chapter look unfinished (§8).
 */
export function Progression() {
  const account = useAccount();
  const { state, signedIn } = useProgress();

  if (!signedIn) return <SignedOut />;
  /* Not "nothing done" — not known yet. Saying zero here and three a moment
     later is worse than saying nothing for that moment. */
  if (state === null) return <p className={styles.loading}>Chargement…</p>;

  const rows = chapters
    .map((chapter) => {
      const lessons = publishedLessons(chapter);
      const done = lessons.filter((lesson) => lesson.path in state);
      return { chapter, lessons, done };
    })
    .filter((row) => row.lessons.length > 0);

  const total = rows.reduce((sum, row) => sum + row.lessons.length, 0);
  const finished = rows.reduce((sum, row) => sum + row.done.length, 0);

  return (
    <>
      <section className={styles.summary}>
        <p className={styles.count}>
          <strong>{finished}</strong> {finished === 1 ? "leçon terminée" : "leçons terminées"} sur{" "}
          {total}
        </p>
        <Bar done={finished} total={total} />
        {finished === 0 && (
          <p className={styles.empty}>
            Rien de coché pour l&rsquo;instant. Au bas de chaque leçon, «&nbsp;J&rsquo;ai
            terminé&nbsp;» la range ici. <Link href="/sommaire">Voir le cours</Link>.
          </p>
        )}
      </section>

      <ul className={styles.chapters}>
        {rows.map(({ chapter, lessons, done }) => (
          <li key={chapter.slug} className={styles.chapter}>
            <div className={styles.head}>
              <span className={styles.icon} aria-hidden="true">
                <ChapterIcon name={chapter.icon} />
              </span>
              <Link href={chapter.path} className={styles.name}>
                {chapter.title}
              </Link>
              <span className={styles.tally}>
                {done.length}<span aria-hidden="true">/</span>
                <span className={styles.sr}> sur </span>
                {lessons.length}
              </span>
            </div>

            <Bar done={done.length} total={lessons.length} />

            {done.length > 0 && (
              <ul className={styles.lessons}>
                {done.map((lesson) => (
                  <Done key={lesson.path} lesson={lesson} chapter={chapter} at={state[lesson.path]} />
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>

      <p className={styles.footnote}>
        Cochées par {account ? <strong>{account.username}</strong> : "vous"}, et gardées
        d&rsquo;un appareil à l&rsquo;autre. Rien d&rsquo;autre n&rsquo;est enregistré : ni
        note, ni temps passé, ni page visitée.
      </p>
    </>
  );
}

function Done({ lesson, chapter, at }: { lesson: Lesson; chapter: Chapter; at?: string }) {
  return (
    <li>
      <Link href={lesson.path} className={styles.lesson}>
        {/* A mark, not a colour: the state has to survive a reader who cannot
            tell two greens apart (AGENTS.md §5). */}
        <svg className={styles.check} viewBox="0 0 24 24" aria-hidden="true">
          <path d="M5 12.5l4.5 4.5L19 7.5" />
        </svg>
        <span className={styles.lessonTitle}>{lesson.title}</span>
        <span className={styles.sr}>, {chapter.title}</span>
        {at && (
          <time className={styles.when} dateTime={at}>
            {formatted(at)}
          </time>
        )}
      </Link>
    </li>
  );
}

/**
 * The bar. `role="img"` with a label rather than a `<progress>`: this is a
 * picture of a number already written beside it in words, and a second element
 * announcing "3 of 7" after the text that says so is noise to a screen reader.
 */
function Bar({ done, total }: { done: number; total: number }) {
  const percent = total === 0 ? 0 : Math.round((done / total) * 100);
  return (
    <div className={styles.bar} role="img" aria-label={`${percent} %`}>
      <span className={styles.fill} style={{ inlineSize: `${percent}%` }} />
    </div>
  );
}

/* Dates are formatted in French, like the rest of the chrome. Built on each
   render rather than hoisted: this is a client component and the constructor
   would run on the server too, where the locale data may differ. */
function formatted(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "short" }).format(date);
}

function SignedOut() {
  return (
    <section className={styles.summary}>
      <p>
        Cette page garde la trace des leçons que vous avez terminées. Elle a besoin
        d&rsquo;un compte : les leçons cochées vous suivent d&rsquo;un appareil à
        l&rsquo;autre, ce qu&rsquo;un navigateur seul ne sait pas faire.
      </p>
      <p className={styles.actions}>
        <Link href="/compte?suivant=%2Fma-progression" className="button button-primary">
          Se connecter
        </Link>
      </p>
      <p className={styles.empty}>
        Tout le reste du site se lit et se fait sans compte. Rien n&rsquo;est fermé —
        c&rsquo;est seulement la mémoire qui demande un compte.
      </p>
    </section>
  );
}
