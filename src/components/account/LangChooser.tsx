"use client";

import { useState } from "react";
import { SaveSettingError, saveLang } from "@/lib/account";
import { applyLang, LANGS, type Lang } from "@/lib/lang";
import { Flag, LANG_NAME } from "./Flag";
import { Choice } from "./ViewChooser";
import { WORDS } from "./words";
import styles from "./AccountSettings.module.css";

const UI = {
  fr: {
    title: "Langue",
    intro: "La langue du site et des leçons, sur tous vos appareils.",
  },
  es: {
    title: "Idioma",
    intro: "El idioma del sitio y de las lecciones, en todos tus dispositivos.",
  },
} satisfies Record<Lang, Record<string, string>>;

/**
 * The interface language (#91, #102): French or Spanish, each named in itself
 * beside its flag. **Shown at once and saved on the press**, like the view.
 *
 * `current` is the language on screen (`useLang`); `saved` is the account's
 * copy, `null` while it never chose. Pressing the language already shown still
 * saves it when the account holds none, so the device's guess becomes the
 * account's choice and follows it to the next device.
 */
export function LangChooser({ current, saved }: { current: Lang; saved: Lang | null }) {
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function choose(lang: Lang) {
    if (lang === current && lang === saved) return;
    applyLang(lang);
    setSaving(true);
    setError(null);
    try {
      await saveLang(lang);
    } catch (caught) {
      const problem = caught instanceof SaveSettingError ? caught.problem : null;
      setError(problem === "no-session" ? WORDS[current].noSession : WORDS[current].unavailable);
    } finally {
      setSaving(false);
    }
  }

  return (
    <section lang={current}>
      <h2 id="langue">{UI[current].title}</h2>
      <p>{UI[current].intro}</p>

      <ul className={styles.choices}>
        {LANGS.map((lang) => (
          <li key={lang}>
            <Choice
              name={LANG_NAME[lang]}
              nameLang={lang}
              icon={<Flag lang={lang} />}
              blurb=""
              pressed={current === lang}
              disabled={saving}
              onPress={() => choose(lang)}
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
