"use client";

import Link from "next/link";
import { trackedChapters, type Chapter, type Lesson } from "@/data/navigation";
import { etapesOf, examOf, nextUp, tallyOf, type IsDone, type Parcours } from "@/data/parcours";
import { useAccount } from "@/hooks/useAccount";
import { useProgress } from "@/hooks/useProgress";
import { ChapterIcon } from "@/components/nav/ChapterIcon";
import { signInHref } from "@/components/account/ReturnTo";
import { NextLesson } from "./NextLesson";
import styles from "./Progression.module.css";

/**
 * The learner's dashboard: « La suite », the parcours step by step, then the
 * record of everything ticked, chapter by chapter.
 *
 * **The parcours comes first** (#88): its tally counts its étapes only, never
 * the épreuves it ends on (#89), and each étape lists its lessons ticked or
 * not — the path, seen whole. The étape « La suite » is in opens; the others
 * are one line each.
 *
 * **The record does not filter by view.** Every other listing shows what the
 * course *offers* at the levels chosen (`AGENTS.md` §6); this one shows what
 * they *did*, and a tick hidden because they since narrowed their view would
 * read as a lost tick. It is the same reasoning that makes search group rather
 * than cut, and the same reasoning behind keeping the view out of the key.
 *
 * The denominator is the chapter's lessons, which is now the same thing as the
 * pages that exist: the manifest holds no announced-but-unwritten entries to
 * inflate it (#51). A chapter with none is left out of the list entirely rather
 * than shown as 0 / 0.
 *
 * **`trackedChapters()`, not `chapters`** (#80): a scratch chapter's pages
 * carry no tick anywhere, so counting them would put the total permanently out
 * of reach — and they are gone by next week, which would then move the
 * denominator under a record that is supposed to only grow.
 */
export function Progression() {
  const account = useAccount();
  const { ready, signedIn, isDone, doneAt } = useProgress();
  /* The set a page holding several is counted at: the parcours's (#87). */
  const parcours = account?.parcours ?? null;
  const level = parcours?.level ?? null;

  if (!signedIn) return <SignedOut />;
  /* Not "nothing done" — not known yet. Saying zero here and three a moment
     later is worse than saying nothing for that moment. */
  if (!ready) return <p className={styles.loading}>Chargement…</p>;

  /* The lessons are not filtered by view — that is what this page is (#48) —
     but a lesson carrying a tick per set still has to be asked about one, and
     the honest one to ask about is the parcours's. */
  const rows = trackedChapters()
    .map((chapter) => {
      const lessons = chapter.lessons;
      const done = lessons.filter((lesson) => isDone(lesson, level));
      return { chapter, lessons, done };
    })
    .filter((row) => row.lessons.length > 0);

  const total = rows.reduce((sum, row) => sum + row.lessons.length, 0);
  const finished = rows.reduce((sum, row) => sum + row.done.length, 0);

  /* No lesson exists to have been ticked (#51). « 0 sur 0 » with an empty bar
     under it reads as a broken page rather than as an unwritten course. */
  if (total === 0) {
    return (
      <p className="message">
        Le cours n&rsquo;a pas encore de leçon à cocher. Dès qu&rsquo;il y en
        aura une, «&nbsp;J&rsquo;ai terminé&nbsp;» au bas de la page la rangera
        ici.
      </p>
    );
  }

  return (
    <>
      {/* The offer, above the record. It follows the parcours and the record
          below does not — two claims on one page, which is why the rule about
          this page not filtering is about the tally and not about the head
          (#48). */}
      <NextLesson as="card" />

      {parcours && <ParcoursRecord parcours={parcours} isDone={isDone} />}

      <section className={styles.summary}>
        {parcours && <h2 className={styles.part}>Tout le cours</h2>}
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
                  <Done
                    key={lesson.id}
                    lesson={lesson}
                    chapter={chapter}
                    at={doneAt(lesson, level)}
                  />
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

/**
 * The path, étape by étape: a tally and a bar for the whole, then each étape as
 * a disclosure with its own count. The étape holding « La suite » opens; the
 * rest stay one line — a finished étape needs no more, an unstarted one is
 * read when it comes. The épreuves close it, offered and not counted (#89).
 */
function ParcoursRecord({ parcours, isDone }: { parcours: Parcours; isDone: IsDone }) {
  const { done, total } = tallyOf(parcours, isDone);
  const next = nextUp(parcours, isDone);
  const current = next.kind === "lesson" ? next.etape : null;
  const exam = examOf(parcours);

  return (
    <section className={styles.summary}>
      <h2 className={styles.part}>{parcours.title}</h2>
      <p className={styles.count}>
        <strong>{done}</strong> {done === 1 ? "leçon terminée" : "leçons terminées"} sur {total}
      </p>
      <Bar done={done} total={total} />

      <ol className={styles.etapes}>
        {etapesOf(parcours).map((etape, index) => {
          const ticked = etape.steps.filter((step) => isDone(step.lesson, parcours.level));
          const finished = ticked.length === etape.steps.length;
          return (
            <li key={etape.title}>
              <details className={styles.etape} open={etape.title === current}>
                <summary className={styles.etapeHead}>
                  <span className={styles.etapeNumber}>{index + 1}</span>
                  <span className={styles.etapeTitle}>{etape.title}</span>
                  <span className={styles.tally}>
                    {finished && (
                      <svg className={styles.check} viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M5 12.5l4.5 4.5L19 7.5" />
                      </svg>
                    )}
                    {ticked.length}
                    <span aria-hidden="true">/</span>
                    <span className={styles.sr}> sur </span>
                    {etape.steps.length}
                  </span>
                </summary>
                <ul className={styles.lessons}>
                  {etape.steps.map(({ chapter, lesson }) => (
                    <Step
                      key={lesson.id}
                      lesson={lesson}
                      chapter={chapter}
                      done={isDone(lesson, parcours.level)}
                    />
                  ))}
                </ul>
              </details>
            </li>
          );
        })}
      </ol>

      {exam.length > 0 && (
        <div className={styles.exam}>
          <h3 className={styles.examTitle}>L’examen blanc</h3>
          <p className={styles.empty}>
            Pour finir le parcours, dans l’ordre de l’examen. Une épreuve ne se coche
            pas : elle se repasse autant qu’il le faut.
          </p>
          <ul className={styles.lessons}>
            {exam.map(({ chapter, lesson }) => (
              <li key={lesson.id}>
                <Link href={lesson.path} className={styles.lesson}>
                  <span className={styles.lessonTitle}>{lesson.title}</span>
                  <span className={styles.sr}>, {chapter.title}</span>
                  {lesson.subtitle && <span className={styles.when}>{lesson.subtitle}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}

/** A lesson of an étape: a tick or an empty ring, and never colour alone. */
function Step({ lesson, chapter, done }: { lesson: Lesson; chapter: Chapter; done: boolean }) {
  return (
    <li>
      <Link href={lesson.path} className={styles.lesson}>
        {done ? (
          <svg className={styles.check} viewBox="0 0 24 24" aria-hidden="true">
            <path d="M5 12.5l4.5 4.5L19 7.5" />
          </svg>
        ) : (
          <span className={styles.ring} aria-hidden="true" />
        )}
        <span className={styles.lessonTitle}>{lesson.title}</span>
        <span className={styles.sr}>
          , {chapter.title}, {done ? "terminée" : "pas encore terminée"}
        </span>
        <span className={styles.when}>{chapter.shortTitle ?? chapter.title}</span>
      </Link>
    </li>
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
        {/* Not the literal `?suivant=%2Fma-progression` this used to hold:
            one writer, so the encoding and the fallback rule cannot drift
            (#70). */}
        <Link href={signInHref("/ma-progression")} className="button button-primary">
          Se connecter
        </Link>
      </p>
      <p className={styles.empty}>
        Tout le reste du site se lit et se fait sans compte. Rien n&rsquo;est fermé :
        c&rsquo;est seulement la mémoire qui demande un compte.
      </p>
    </section>
  );
}
