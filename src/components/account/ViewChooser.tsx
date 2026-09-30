"use client";

import { useState, type ReactNode } from "react";
import { CHOOSABLE_LEVELS, LADDER, type Level, type View } from "@/data/navigation";
import { SaveSettingError, saveView, type Lang } from "@/lib/account";
import { Fr, LEVEL_BLURB, WORDS } from "./words";
import styles from "./AccountSettings.module.css";

/*
 * **The chooser offers the levels and rates none of them** (#77): no « en
 * cours », no line saying what a level still lacks. They were written for a
 * stranger, and this course has none — unlisted, no sign-up, every account made
 * by hand. **This is the first thing to put back if the site is ever listed or
 * opens sign-up.**
 */

const UI = {
  fr: {
    title: "Ce que vous voyez",
    intro: (
      <>
        Le sommaire, les chapitres et le menu ne proposent que les niveaux choisis
        ici. Les pages sans niveau, comme les tableaux de conjugaison, sont
        toujours là. Rien n’est verrouillé : une leçon reste lisible si vous
        tombez dessus.
      </>
    ),
    rejected: "Ce niveau n’est pas encore ouvert.",
  },
  es: {
    title: "Lo que ves",
    intro: (
      <>
        El <Fr>«&nbsp;Sommaire&nbsp;»</Fr>, los capítulos y el menú solo muestran los
        niveles elegidos aquí. Las páginas sin nivel, como las tablas de
        conjugación, siempre están. Nada está bloqueado: una lección se puede
        leer si llegas a ella.
      </>
    ),
    rejected: "Este nivel todavía no está abierto.",
  },
} satisfies Record<Lang, { title: string; intro: ReactNode; rejected: string }>;

/**
 * Which levels the listings show (#86): « Tout », or any of the levels.
 *
 * **Toggles, saved on each press.** From « Tout », a level narrows the view to
 * that level alone; a level pressed again leaves the view, and the last one
 * leaving puts « Tout » back — no stored value can hide the whole course.
 * The parcours is chosen above and is untouched by this (#88).
 */
export function ViewChooser({ current, lang }: { current: View; lang: Lang }) {
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function save(next: View) {
    setSaving(true);
    setError(null);
    try {
      /* Nothing to reload: updateUser emits USER_UPDATED, the provider is
         subscribed, and every listing re-renders with the new view. */
      await saveView(next);
    } catch (caught) {
      const problem = caught instanceof SaveSettingError ? caught.problem : null;
      setError(
        problem === "rejected"
          ? UI[lang].rejected
          : problem === "no-session"
            ? WORDS[lang].noSession
            : WORDS[lang].unavailable,
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <section lang={lang}>
      <h2 id="vue">{UI[lang].title}</h2>
      <p>{UI[lang].intro}</p>

      <ul className={styles.choices}>
        <li>
          <Choice
            name="Tout"
            nameLang={lang === "es" ? "fr" : undefined}
            blurb={WORDS[lang].allLevels}
            pressed={current === "all"}
            disabled={saving}
            onPress={() => current !== "all" && save("all")}
          />
        </li>
        {CHOOSABLE_LEVELS.map((level) => (
          <li key={level}>
            <Choice
              name={level}
              blurb={LEVEL_BLURB[lang][level]}
              pressed={current !== "all" && current.includes(level)}
              disabled={saving}
              onPress={() => save(toggleLevel(current, level))}
            />
          </li>
        ))}
      </ul>

      {error && (
        <div className="message message-danger" role="status">
          {error}
        </div>
      )}
    </section>
  );
}

/**
 * The view after pressing one level: from « Tout », that level alone; a level
 * pressed again leaves; the last one leaving puts « Tout » back. Shared with
 * the onboarding, which applies it without saving.
 */
export function toggleLevel(current: View, level: Level): View {
  if (current === "all") return [level];
  const next = current.includes(level)
    ? current.filter((l) => l !== level)
    : LADDER.filter((l) => l === level || current.includes(l));
  return next.length > 0 ? next : "all";
}

/**
 * One card of a chooser: a toggle button whose pressed state is drawn twice, as
 * a fill and as a tick, so it is not carried by colour alone. Shared with the
 * parcours chooser.
 */
export function Choice({
  name,
  blurb,
  icon,
  meta,
  pressed,
  disabled,
  onPress,
  nameLang,
  blurbLang,
}: {
  name: string;
  blurb: string;
  /** Drawn before the name — the language chooser's flags. */
  icon?: ReactNode;
  meta?: string;
  pressed: boolean;
  disabled: boolean;
  onPress: () => void;
  /** `"fr"` when the card sits in Spanish text: the names are French (§1). */
  nameLang?: string;
  /** Likewise for a blurb left in French. */
  blurbLang?: string;
}) {
  return (
    <button
      type="button"
      className={styles.choice}
      aria-pressed={pressed}
      disabled={disabled}
      onClick={onPress}
    >
      <span className={styles.choiceName}>
        {icon}
        <span lang={nameLang}>{name}</span>
        <svg className={styles.choiceTick} viewBox="0 0 24 24" aria-hidden="true">
          <path d="M5 12.5l4.5 4.5L19 7.5" />
        </svg>
        {meta && <span className={styles.choiceMeta}>{meta}</span>}
      </span>
      {blurb && (
        <span className={styles.choiceBlurb} lang={blurbLang}>
          {blurb}
        </span>
      )}
    </button>
  );
}
