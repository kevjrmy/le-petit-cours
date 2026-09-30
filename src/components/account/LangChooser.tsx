"use client";

import { useState } from "react";
import { SaveSettingError, saveLang, type Lang } from "@/lib/account";
import { Flag, LANG_NAME } from "./Flag";
import { Choice } from "./ViewChooser";
import { WORDS } from "./words";
import styles from "./AccountSettings.module.css";

const LANGS: Lang[] = ["fr", "es"];

const UI = {
  fr: {
    title: "Langue",
    intro: "La langue de cette page et du menu du compte. Les leçons restent en français.",
  },
  es: {
    title: "Idioma",
    intro: "El idioma de esta página y del menú de la cuenta. Las lecciones siguen en francés.",
  },
} satisfies Record<Lang, Record<string, string>>;

/**
 * The language of the account screens (#91): French or Spanish, each named in
 * itself beside its flag. **Saved on the press**, like the view; the page
 * switches when `USER_UPDATED` comes back through the provider.
 */
export function LangChooser({ current }: { current: Lang }) {
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function choose(lang: Lang) {
    if (lang === current) return;
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
