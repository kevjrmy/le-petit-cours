"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { findLesson } from "@/data/navigation";
import { fold } from "@/lib/search";
import styles from "./LessonToc.module.css";

interface Entry {
  id: string;
  text: string;
}

/**
 * « Index » — the lesson's own headings, in the margin, as links.
 *
 * **The outline is read from the page, not declared anywhere.** The manifest
 * knows lessons, not the headings inside them, and a second place to list them
 * would drift from the prose the first time a section was renamed — the same
 * reasoning that makes the verb sheets' cross-links derived rather than typed
 * (`docs/decisions.md` #56). So this walks every `h2` in the article after paint
 * and gives each one an `id` if it has none. A lesson stays a Server Component
 * that renders its prose and nothing else (`AGENTS.md` §4, #49).
 *
 * **Every `h2`, not every section**, which is how « En résumé » joins the list
 * (#67): it closes the lesson and it is the one part a reader comes back for, so
 * a nav that skipped it was listing the page's parts and leaving out its point.
 * The rule is simply that a heading in the article is a place worth going to —
 * nothing here knows what `.resume` is.
 *
 * **It draws only where it has something to point at**: `findLesson` keeps it
 * off chapter pages, the sommaire and the annexes with no allowlist to keep in
 * step, and fewer than two sections means there is nothing to navigate.
 *
 * The ids are slugs of the headings, so `#le-passe-compose-avec-avoir` is a
 * link someone can send. They are generated rather than authored, which means
 * **they are not permanent** — rename a section and its anchor changes. That is
 * the trade for having no outline to maintain; a lesson's *path* is the stable
 * address (#50).
 */
export function LessonToc() {
  const path = usePathname() ?? "";
  const isLesson = Boolean(findLesson(path));
  /* The outline carries the path it was read from, so a lesson never shows the
     previous one's sections for the frame between navigation and the effect.
     Stale is derived away here rather than cleared in the effect — clearing
     would be a setState for something render can already work out. */
  const [outline, setOutline] = useState<{ path: string; items: Entry[] }>({
    path: "",
    items: [],
  });
  const [active, setActive] = useState("");
  const items = outline.path === path ? outline.items : [];

  useEffect(() => {
    if (!isLesson) return;

    const headings = Array.from(
      document.querySelectorAll<HTMLElement>("main .prose h2"),
    );

    const seen = new Set<string>();
    const entries = headings.map((heading, index) => {
      const text = heading.textContent?.trim() ?? "";
      let id = heading.id || slug(text) || `section-${index + 1}`;
      while (seen.has(id)) id = `${id}-${index + 1}`;
      seen.add(id);
      heading.id = id;
      return { id, text };
    });

    if (entries.length < 2) return;

    /* Both state writes happen here, and the outline is published on the first
       frame rather than from the effect body. `snapshot` is built once, so every
       later call passes the same object and React bails out — this is one render
       when the sections are found, not one per scroll.
     *
     * The current section is decided from the rects: the last heading to have
     * passed a line a third of the way down the viewport, which is where the eye
     * is rather than where the page is cut. */
    const snapshot = { path, items: entries };

    const mark = () => {
      const line = window.innerHeight / 3;
      let current = entries[0].id;
      headings.forEach((heading, index) => {
        if (heading.getBoundingClientRect().top <= line) current = entries[index].id;
      });
      /* At the foot of the page the last heading may never reach the line —
         « En résumé » is followed by a few centimetres of tick and links, not by
         a screenful — and a nav whose last entry can never light up is a nav
         that looks broken exactly where the reader has arrived. */
      const bottom =
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 4;
      if (bottom) current = entries[entries.length - 1].id;

      setOutline(snapshot);
      setActive(current);
    };

    /* **A scroll listener, and not an IntersectionObserver.** The obvious
       implementation observes the headings against a zero-height band at the
       reading line, and it is wrong in the one case this nav exists for: follow
       a link in it and the page jumps past every heading at once, so no
       heading's intersection state changes, so the callback never runs and the
       mark stays on the section you left. Reading the rects on scroll cannot
       miss a jump. It is rAF-throttled and passive, and it only exists while a
       lesson is showing the nav at a width that draws it. */
    let frame = 0;
    const schedule = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        mark();
      });
    };

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    schedule();

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [path, isLesson]);

  if (items.length < 2) return null;
  /* Before the first mark there is still a section being read: the first one. */
  const current = active || items[0].id;

  return (
    <nav className={styles.toc} aria-labelledby="index-de-la-page">
      <p className={styles.label} id="index-de-la-page">
        Index
      </p>
      <ol>
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              aria-current={current === item.id ? "true" : undefined}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

/* `fold` already strips the accents and lowercases (`src/lib/search.ts`); what
   is left is everything a fragment cannot hold — guillemets, punctuation, the
   spaces fold leaves behind. */
function slug(text: string): string {
  return fold(text)
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
