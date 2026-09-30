"use client";

import { useState, type ReactNode } from "react";
import { PARCOURS, type Parcours } from "@/data/parcours";
import { SaveSettingError, saveParcours, type Lang } from "@/lib/account";
import { Choice } from "./ViewChooser";
import { Fr, parcoursBlurb, parcoursSize, WORDS } from "./words";
import styles from "./AccountSettings.module.css";

const UI = {
  fr: {
    current: "Votre parcours",
    choose: "Choisissez un parcours",
    intro: (
      <>
        Un parcours range des leçons de tous les chapitres en étapes, dans
        l’ordre où les faire, et «&nbsp;La suite&nbsp;» vous donne la prochaine.
        Une leçon cochée l’est dans tous les parcours : en changer ne fait rien
        perdre.
      </>
    ),
    rejected: "Ce parcours n’existe plus.",
  },
  es: {
    current: "Tu parcours",
    choose: "Elige un parcours",
    intro: (
      <>
        Un <Fr>parcours</Fr> ordena en etapas lecciones de todos los capítulos,
        en el orden en que hacerlas, y <Fr>«&nbsp;La suite&nbsp;»</Fr> te da la
        siguiente. Una lección marcada lo está en todos los <Fr>parcours</Fr>:
        cambiar no te hace perder nada.
      </>
    ),
    rejected: "Esta opción ya no existe. Elige otra.",
  },
} satisfies Record<Lang, Record<string, ReactNode>>;

/**
 * The path « La suite » walks (#88): one parcours, or none.
 *
 * **It does not touch the view** — two settings, one writer each. Someone on
 * the A2 path who sees only A1 is still offered A2 lessons by « La suite »: the
 * view filters what the listings offer, never what the path asks for.
 */
export function ParcoursChooser({
  current,
  lang,
}: {
  current: Parcours | null;
  lang: Lang;
}) {
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function choose(id: string | null) {
    if (id === (current?.id ?? null)) return;
    setSaving(true);
    setError(null);
    try {
      await saveParcours(id);
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
      <h2 id="parcours">{current ? UI[lang].current : UI[lang].choose}</h2>
      <p>{UI[lang].intro}</p>

      <ul className={styles.choices}>
        {PARCOURS.map((parcours) => {
          const blurb = parcoursBlurb(parcours, lang);
          return (
            <li key={parcours.id}>
              <Choice
                name={parcours.title}
                nameLang={lang === "es" ? "fr" : undefined}
                blurb={blurb.text}
                blurbLang={blurb.lang}
                meta={parcoursSize(parcours, lang)}
                pressed={current?.id === parcours.id}
                disabled={saving}
                onPress={() => choose(parcours.id)}
              />
            </li>
          );
        })}
        <li>
          <Choice
            name="Aucun parcours"
            nameLang={lang === "es" ? "fr" : undefined}
            blurb={WORDS[lang].noParcours}
            pressed={current === null}
            disabled={saving}
            onPress={() => choose(null)}
          />
        </li>
      </ul>

      {error && (
        <div className="message message-danger" role="status">
          {error}
        </div>
      )}
    </section>
  );
}
