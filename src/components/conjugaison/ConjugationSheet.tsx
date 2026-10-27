"use client";

import { useState, type ReactNode } from "react";
import { T } from "@/components/lang/T";
import { useLang } from "@/hooks/useLang";
import {
  AGREEMENT,
  GROUPE_ES,
  IMPERATIF_PERSONS,
  PRONOUNS,
  futurForms,
  imparfaitForms,
  plain,
  type Explication,
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
 *
 * **Bilingual chrome, French forms** (#102): every label, title and note is
 * printed in both languages and `globals.css` hides one before paint; the
 * forms are French in both. A block is paired whole (`data-ui`), a heading
 * too — « Index » skips the hidden one rather than reading « PrésentPresente ».
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

/** A Spanish explanation, its `{…}` French put back in `lang="fr"`. */
function french(text: string): ReactNode {
  return text.split(/(\{[^}]*\})/).map((part, i) =>
    part.startsWith("{") ? (
      <span key={i} lang="fr">
        {part.slice(1, -1)}
      </span>
    ) : (
      part
    ),
  );
}

/** One explanation as a pair of blocks, the Spanish one `lang="es"`. */
function Paired({
  text,
  className,
  as: Tag = "div",
}: {
  text: Explication;
  className?: string;
  as?: "div" | "p";
}) {
  return (
    <>
      <Tag className={className} data-ui="fr">
        {text.fr}
      </Tag>
      <Tag className={className} data-ui="es" lang="es">
        {french(text.es)}
      </Tag>
    </>
  );
}

export function ConjugationSheet({ verb }: { verb: Verb }) {
  const [negative, setNegative] = useState(false);
  const [feminine, setFeminine] = useState(false);
  /* The two toggles' names are attributes, so not a `<T>` (#102). */
  const es = useLang() === "es";

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
          <dt className="label">
            <T fr="Groupe" es="Grupo" />
          </dt>
          <dd>
            <T fr={verb.groupe} es={GROUPE_ES[verb.groupe]} />
          </dd>
        </div>
        <div>
          <dt className="label">
            <T fr="Auxiliaire" es="Auxiliar" />
          </dt>
          <dd>{verb.aux}</dd>
        </div>
        <div>
          <dt className="label">
            <T fr="Participe passé" es="Participio pasado" />
          </dt>
          <dd>{verb.participe}</dd>
        </div>
        <div>
          <dt className="label">
            <T fr="Participe présent" es="Participio presente" />
          </dt>
          <dd>{plain(verb.ppresent)}</dd>
        </div>
      </dl>

      {/* Two boxes, so the Spanish one's label reads « Recuerda » (`:lang(es)`). */}
      {verb.note && <Paired text={verb.note} className="attention" />}

      <div className={styles.controls}>
        <div
          className={styles.toggle}
          role="group"
          aria-label={es ? "Forma" : "Forme"}
        >
          <button
            type="button"
            aria-pressed={!negative}
            onClick={() => setNegative(false)}
          >
            <T fr="Affirmatif" es="Afirmativo" />
          </button>
          <button
            type="button"
            aria-pressed={negative}
            onClick={() => setNegative(true)}
          >
            <T fr="Négatif" es="Negativo" />
          </button>
        </div>

        <div
          className={styles.toggle}
          role="group"
          aria-label={es ? "Género del sujeto" : "Genre du sujet"}
        >
          <button
            type="button"
            aria-pressed={!feminine}
            onClick={() => setFeminine(false)}
          >
            <T fr="Masculin" es="Masculino" />
          </button>
          <button
            type="button"
            aria-pressed={feminine}
            onClick={() => setFeminine(true)}
          >
            <T fr="Féminin" es="Femenino" />
          </button>
        </div>
      </div>

      {feminine && genderIsInert && (
        <>
          <p className="message" data-ui="fr">
            Avec l’auxiliaire <strong>avoir</strong>, le participe passé ne
            s’accorde pas : le genre ne change que les pronoms.
          </p>
          <p className="message" data-ui="es" lang="es">
            Con el auxiliar <strong lang="fr">avoir</strong>, el participio
            pasado no concuerda: el género solo cambia los pronombres.
          </p>
        </>
      )}

      {/* One list, each item bilingual: never two lists alternating. */}
      <ul className={styles.legend}>
        <li className={styles.stem}>
          <T fr="radical" es="raíz" />
        </li>
        <li className={styles.end}>
          <T fr="terminaison" es="terminación" />
        </li>
        {negative && (
          <li className={styles.neg}>
            <T fr="négation" es="negación" />
          </li>
        )}
        {verb.aux === "être" && (
          <li className={styles.accord}>
            <T fr="accord" es="concordancia" />
          </li>
        )}
      </ul>

      <div className={styles.grid}>
        <Tense title={{ fr: "Présent", es: "Presente" }} lines={present} />
        <Tense title={{ fr: "Imparfait", es: "Imperfecto" }} lines={imparfait} />
        <Tense
          /* Named by its French name in Spanish too: the learner meets it
             under that name everywhere else. */
          title={{ fr: "Passé composé", es: "Passé composé" }}
          lines={passeCompose}
          /* The `vous` line above reads as several people. Said to one person
             out of politeness — which is most of the time, for a learner — the
             participle is singular, and nothing else on the sheet shows that. */
          note={
            verb.aux === "être"
              ? {
                  fr: (
                    <>
                      Un « vous » de politesse s’adresse à une seule personne :
                      le participe reste alors au singulier, «{" "}
                      <span className={styles.stem}>
                        vous êtes {verb.participe}
                        {feminine ? "e" : ""}
                      </span>{" "}
                      ».
                    </>
                  ),
                  es: (
                    <>
                      Un <span lang="fr">« vous »</span> de cortesía (el «usted»
                      del español) se dirige a una sola persona: entonces el
                      participio queda en singular,{" "}
                      <span lang="fr">
                        «{" "}
                        <span className={styles.stem}>
                          vous êtes {verb.participe}
                          {feminine ? "e" : ""}
                        </span>{" "}
                        »
                      </span>
                      .
                    </>
                  ),
                }
              : undefined
          }
        />
        <Tense title={{ fr: "Futur simple", es: "Futuro simple" }} lines={futur} />

        <section className={styles.tense}>
          <Heading title={{ fr: "Impératif", es: "Imperativo" }} />
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
            <Paired
              as="p"
              text={
                verb.imperatifNote ?? {
                  fr: "Ce verbe n’a pas d’impératif.",
                  es: "Este verbo no tiene imperativo.",
                }
              }
            />
          )}
        </section>
      </div>
    </>
  );
}

/** A tense's title, one `h2` per language; a name both share is one `h2`. */
function Heading({ title }: { title: Explication }) {
  if (title.fr === title.es) return <h2>{title.fr}</h2>;
  return (
    <>
      <h2 data-ui="fr">{title.fr}</h2>
      <h2 data-ui="es" lang="es">
        {title.es}
      </h2>
    </>
  );
}

function Tense({
  title,
  lines,
  note,
}: {
  title: Explication;
  lines: Segment[][];
  note?: { fr: ReactNode; es: ReactNode };
}) {
  return (
    <section className={styles.tense}>
      <Heading title={title} />
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
      {note && (
        <>
          <p className={styles.footnote} data-ui="fr">
            {note.fr}
          </p>
          <p className={styles.footnote} data-ui="es" lang="es">
            {note.es}
          </p>
        </>
      )}
    </section>
  );
}
