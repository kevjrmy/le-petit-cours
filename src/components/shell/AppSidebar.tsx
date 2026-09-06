"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { listedChapters, treeAnnexes, visibleLessons, type TreeAnnexe } from "@/data/navigation";
import { ChapterIcon } from "@/components/nav/ChapterIcon";
import { useAccount } from "@/hooks/useAccount";
import { useRestoreRail } from "@/hooks/useShellMode";
import { AccountMenu } from "./AccountMenu";
import styles from "./AppSidebar.module.css";

/**
 * The course's chapters. Mounted in the root layout, not in a page, so it keeps
 * its scroll position across navigation (`AGENTS.md` §4).
 *
 * **One level deep: a chapter is a link, not a disclosure.** The lessons are on
 * the chapter's own landing page, one click away. A tree that opened would be
 * fine at three lessons and unusable at a hundred and nineteen — the size the
 * course is actually heading for — and the sidebar would become the place you
 * scroll rather than the place you navigate (`docs/decisions.md` #40).
 *
 * Everything here derives from `src/data/navigation.ts`. Nothing is hand-listed.
 */
export function AppSidebar({ open, onNavigate }: { open: boolean; onNavigate: () => void }) {
  const pathname = usePathname();
  const account = useAccount();
  const level = account?.level ?? null;
  useRestoreRail();

  /* Either list can be empty — nothing but the manifest decides what is in
     them — and an empty <ul> here is a stray rule across the panel, since both
     carry a border. So each is drawn only if it has rows. */
  const topAnnexes = treeAnnexes("top");
  const tailAnnexes = treeAnnexes("tree");
  /* Empty while the course is unwritten (#52), and the sommaire says why — a
     panel of nothing needs no caption of its own. */
  const listed = listedChapters(level);

  /* One row, wherever the annexe sits. Written once because the two lists are
     the same row in two places, and the day one grows an active state or a
     badge the other has to have it too. */
  const annexeRow = (page: TreeAnnexe) => (
    <li key={page.path}>
      <Link
        href={page.path}
        className={`${styles.lesson} ${pathname === page.path ? styles.activeLesson : ""}`}
        aria-current={pathname === page.path ? "page" : undefined}
        /* The name is on the link itself, so the row keeps it when the rail
           hides the text — an icon-only control must still say what it is
           (`AGENTS.md` §5). `title` gives the sighted rail user the same thing
           on hover. */
        aria-label={page.title}
        title={page.title}
        onClick={onNavigate}
      >
        <ChapterIcon name={page.icon} />
        <span className={styles.label}>{page.title}</span>
      </Link>
    </li>
  );

  return (
    <div
      id="sidebar"
      /* Closed, the panel is `visibility: hidden`, which takes it out of the
         tab order and the accessibility tree without any JS timing to get
         wrong. Above the breakpoint the media query pins it open regardless. */
      className={`${styles.sidebar} ${open ? styles.open : ""}`}
    >
      <div className={styles.head}>
        {/* Both marks are in the DOM and the container query shows one: the
            eleven letters of the wordmark do not survive a 3.75rem rail, and
            the cursive P is the same hand (`AGENTS.md` §5). Swapping in CSS
            rather than in JS keeps the head correct before hydration. */}
        <Link href="/" className={styles.brand} onClick={onNavigate}>
          <span className={styles.wordmark} aria-hidden="true" />
          <span className={styles.mark} aria-hidden="true" />
          <span className="visually-hidden">Le Petit Cours, accueil</span>
        </Link>
      </div>

      <nav className={styles.tree} aria-label="Sommaire du cours">
        {/* Above the chapters, because it is the way into them. */}
        {topAnnexes.length > 0 && (
          /* The rule under this list separates it from the chapters. With none
             to separate it from, it is a line under nothing (#52). */
          <ul className={`${styles.top} ${listed.length === 0 ? styles.topAlone : ""}`}>
            {topAnnexes.map(annexeRow)}
          </ul>
        )}

        <ul className={styles.chapters}>
          {listed.map((chapter) => {
            /* A lesson keeps its chapter marked: the row is the only thing left
               in here saying where you are. */
            const active =
              pathname === chapter.path || pathname.startsWith(`${chapter.path}/`);
            /* Filtered on the same rule as the sommaire and the chapter pages
               — the sidebar is the course's table of contents, and a count here
               that disagreed with the card on the sommaire would just look
               broken. Hiding is never gating: every path still resolves. */
            const total = visibleLessons(chapter, level).length;

            return (
              <li key={chapter.slug}>
                <Link
                  href={chapter.path}
                  className={`${styles.chapter} ${active ? styles.activeChapter : ""}`}
                  aria-current={active ? "page" : undefined}
                  /* Named on the link, so the row still says what it is once
                     the rail hides the text (`AGENTS.md` §5). It repeats the
                     visible label rather than elaborating on it — a different
                     accessible name is what breaks voice control. */
                  aria-label={chapter.shortTitle ?? chapter.title}
                  title={chapter.shortTitle ?? chapter.title}
                  onClick={onNavigate}
                >
                  <ChapterIcon name={chapter.icon} />
                  <span className={styles.chapterTitle}>
                    {chapter.shortTitle ?? chapter.title}
                  </span>
                  {/* What the chapter opens to at this level — every row it
                      lists is a page that exists (#51), so the count and the
                      list can no longer say different things. A chapter with
                      nothing to offer is not drawn at all rather than sitting
                      here as a zero. */}
                  <span className={styles.count}>
                    {total}
                    <span className="visually-hidden">
                      {" "}
                      {chapter.unit[total === 1 ? 0 : 1]}
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>

        {tailAnnexes.length > 0 && (
          <ul className={styles.annexes}>{tailAnnexes.map(annexeRow)}</ul>
        )}
      </nav>

      <AccountMenu onNavigate={onNavigate} />
    </div>
  );
}
