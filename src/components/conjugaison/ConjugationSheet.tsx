"use client";

import { useState, type ReactNode } from "react";
import {
  AGREEMENT,
  IMPERATIF_PERSONS,
  PRONOUNS,
  futurForms,
  imparfaitForms,
  plain,
  type Verb,
} from "@/data/conjugaisons";
import styles from "./ConjugationSheet.module.css";

/**
 * One sheet, every verb (`docs/decisions.md` #56). The page under
 * `app/conjugaison/[verbe]/` is a wrapper; everything you see is here.
 *
 * **The two toggles are the reason this is a client component**, and they earn
 * it. Négatif shows where *ne … pas*
 * lands — around the verb in a simple tense, around the *auxiliary* in the passé
 * composé, which is the mistake a Spanish speaker makes for months. Féminin
 * shows the participle agreeing, but only on an `être` verb, which is the other
 * half of the same lesson. A learner reading a static table has to be told both;
 * here she can see them.
 *
 * A form is stored as `radical|terminaison` and drawn in two pieces, so the
 * pattern down a column is visible before any of the words are read.
 */
type Segment = { text: string; kind?: "person" | "stem" | "end" | "neg" | "accord" };

function split(form: string): Segment[] {
  const [stem, ending] = form.split("|");
  return ending === undefined
    ? [{ text: stem, kind: "stem" }]
    : [
        { text: stem, kind: "stem" },
        { text: ending, kind: "end" },
      ];
}

/* `je` becomes `j'` before a vowel, and `ne` becomes `n'` — and **nothing else
   does**. `tu`, `il`, `nous`, `vous`, `elles` never elide, so a general "drop
   the last letter before a vowel" helper prints « i'est » and « tu'as ». The
   two words that elide are named here for that reason.

   No form in these ten begins with h. A mute h would elide and an aspirated one
   would not, which is a fact about the word rather than a rule, so it belongs on
   the verb entry when such a verb arrives. */
const VOWELS = /^[aeiouyâàéèêîïôùû]/i;

function subject(pronoun: string, next: string): string {
  return pronoun === "je" && VOWELS.test(next) ? "j’" : `${pronoun} `;
}

function negation(next: string): string {
  return VOWELS.test(next) ? "n’" : "ne ";
}

export function ConjugationSheet({ verb }: { verb: Verb }) {
  const [negative, setNegative] = useState(false);
  const [feminine, setFeminine] = useState(false);

  const pronouns = feminine ? PRONOUNS.feminin : PRONOUNS.masculin;
  const agreement = feminine ? AGREEMENT.feminin : AGREEMENT.masculin;
  const genderIsInert = verb.aux === "avoir";

  /** A simple tense: pronoun + form, with *ne … pas* around the form. */
  function simple(forms: string[]): Segment[][] {
    return forms.map((form, i) => {
      const whole = plain(form);
      const parts = split(form);

      if (!negative) {
        return [
          { text: subject(pronouns[i], whole), kind: "person" as const },
          ...parts,
        ];
      }
      return [
        { text: `${pronouns[i]} `, kind: "person" as const },
        { text: negation(whole), kind: "neg" as const },
        ...parts,
        { text: " pas", kind: "neg" as const },
      ];
    });
  }

  const present = simple(verb.present);
  /* Both generated in the data file, where the -ger / -cer softening rule lives
     next to the verbs it applies to. */
  const imparfait = simple(imparfaitForms(verb));
  const futur = simple(futurForms(verb));

  /* The passé composé is the one tense with three moving pieces: the negation
     wraps the auxiliary alone, and the participle takes the accord only when
     that auxiliary is être. */
  const auxForms =
    verb.aux === "avoir"
      ? ["ai", "as", "a", "avons", "avez", "ont"]
      : ["suis", "es", "est", "sommes", "êtes", "sont"];

  const passeCompose: Segment[][] = auxForms.map((aux, i) => {
    const accord = verb.aux === "être" ? agreement[i] : "";
    const participle: Segment[] = accord
      ? [{ text: verb.participe, kind: "stem" as const }, { text: accord, kind: "accord" as const }]
      : [{ text: verb.participe, kind: "stem" as const }];

    if (!negative) {
      return [
        { text: subject(pronouns[i], aux), kind: "person" as const },
        { text: aux, kind: "end" as const },
        { text: " " },
        ...participle,
      ];
    }
    return [
      { text: `${pronouns[i]} `, kind: "person" as const },
      { text: negation(aux), kind: "neg" as const },
      { text: aux, kind: "end" as const },
      { text: " pas ", kind: "neg" as const },
      ...participle,
    ];
  });

  return (
    <>
      <dl className={styles.meta}>
        <div>
          <dt>Groupe</dt>
          <dd>{verb.groupe}</dd>
        </div>
        <div>
          <dt>Auxiliaire</dt>
          <dd>{verb.aux}</dd>
        </div>
        <div>
          <dt>Participe passé</dt>
          <dd>{verb.participe}</dd>
        </div>
        <div>
          <dt>Participe présent</dt>
          <dd>{plain(verb.ppresent)}</dd>
        </div>
      </dl>

      {verb.note && <div className="attention">{verb.note}</div>}

      <div className={styles.controls}>
        <div className={styles.toggle} role="group" aria-label="Forme">
          <button
            type="button"
            aria-pressed={!negative}
            onClick={() => setNegative(false)}
          >
            Affirmatif
          </button>
          <button
            type="button"
            aria-pressed={negative}
            onClick={() => setNegative(true)}
          >
            Négatif
          </button>
        </div>

        <div className={styles.toggle} role="group" aria-label="Genre du sujet">
          <button
            type="button"
            aria-pressed={!feminine}
            onClick={() => setFeminine(false)}
          >
            Masculin
          </button>
          <button
            type="button"
            aria-pressed={feminine}
            onClick={() => setFeminine(true)}
          >
            Féminin
          </button>
        </div>
      </div>

      {feminine && genderIsInert && (
        <p className="message">
          Avec l’auxiliaire <strong>avoir</strong>, le participe passé ne
          s’accorde pas : le genre ne change que les pronoms.
        </p>
      )}

      <ul className={styles.legend}>
        <li className={styles.stem}>radical</li>
        <li className={styles.end}>terminaison</li>
        {negative && <li className={styles.neg}>négation</li>}
        {verb.aux === "être" && <li className={styles.accord}>accord</li>}
      </ul>

      <div className={styles.grid}>
        <Tense title="Présent" lines={present} />
        <Tense title="Imparfait" lines={imparfait} />
        <Tense
          title="Passé composé"
          lines={passeCompose}
          /* The `vous` line above reads as several people. Said to one person
             out of politeness — which is most of the time, for a learner — the
             participle is singular, and nothing else on the sheet shows that. */
          note={
            verb.aux === "être" ? (
              <>
                Un « vous » de politesse s’adresse à une seule personne : le
                participe reste alors au singulier, «{" "}
                <span className={styles.stem}>
                  vous êtes {verb.participe}
                  {feminine ? "e" : ""}
                </span>{" "}
                ».
              </>
            ) : undefined
          }
        />
        <Tense title="Futur simple" lines={futur} />

        <section className={styles.tense}>
          <h2>Impératif</h2>
          {verb.imperatif ? (
            <ol>
              {verb.imperatif.map((form, i) => (
                <li key={form}>
                  <span className={styles.person}>
                    {IMPERATIF_PERSONS[i]}{" "}
                  </span>
                  {split(form).map((segment, j) => (
                    <span
                      key={j}
                      className={segment.kind ? styles[segment.kind] : undefined}
                    >
                      {segment.text}
                    </span>
                  ))}
                </li>
              ))}
            </ol>
          ) : (
            <p>{verb.imperatifNote ?? "Ce verbe n’a pas d’impératif."}</p>
          )}
        </section>
      </div>
    </>
  );
}

function Tense({
  title,
  lines,
  note,
}: {
  title: string;
  lines: Segment[][];
  note?: ReactNode;
}) {
  return (
    <section className={styles.tense}>
      <h2>{title}</h2>
      <ol>
        {lines.map((line, i) => (
          <li key={i}>
            {line.map((segment, j) => (
              <span
                key={j}
                className={segment.kind ? styles[segment.kind] : undefined}
              >
                {segment.text}
              </span>
            ))}
          </li>
        ))}
      </ol>
      {note && <p className={styles.footnote}>{note}</p>}
    </section>
  );
}
