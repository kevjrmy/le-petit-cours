"use client";

import { useRef, useState } from "react";
import { AccentBar } from "@/components/exercice/AccentBar";
import { Instructions, Score } from "@/components/exercice/Drill";
import {
  IMPERATIF_PERSONS,
  PRONOUNS,
  findVerb,
  futurForms,
  imparfaitForms,
  plain,
  type Verb,
} from "@/data/conjugaisons";
import type { Level } from "@/data/navigation";
import { bankFor, type Bank, type TenseKey } from "./data";
import styles from "./drill.module.css";

const TENSES: Record<TenseKey, { label: string; note?: string }> = {
  present: { label: "Présent" },
  imparfait: { label: "Imparfait" },
  passeCompose: {
    label: "Passé composé",
    /* Six identical answers, and that is the lesson rather than a flaw in the
       deck: with `avoir` the participe passé does not move. The note is here so
       a learner filling the sixth « é » reads it as a rule instead of a bug. */
    note: "Avec avoir, le participe ne change pas : la même terminaison six fois.",
  },
  futur: { label: "Futur simple" },
  imperatif: {
    label: "Impératif",
    note: "Trois personnes seulement, et aucun pronom devant le verbe.",
  },
};

/**
 * The stepper's chevron, drawn here rather than typed as « ‹ ».
 *
 * Inline SVG, like the chapter icons in the manifest (`AGENTS.md` §6): it works
 * offline, it takes its colour from `currentColor` so the button decides
 * available from unavailable, and it is not at the mercy of whether the body
 * font draws a guillemet the same size as the next one.
 */
function Chevron({ back }: { back?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="22"
      height="22"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={back ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"} />
    </svg>
  );
}

/**
 * One row: sujet, radical, terminaison, the last of them blank.
 *
 * **The auxiliary travels with the subject, not with the radical.** At the
 * passé composé the form is two words, and « j’ai » in the first column leaves
 * the second holding a true radical in every row of every tense — so the third
 * column is pure terminaison throughout, which is what the table is for.
 */
interface Cell {
  key: string;
  tense: TenseKey;
  /** « Sujet » : the pronoun, with its auxiliary at the passé composé. */
  subject: string;
  /** « Radical » : what the ending attaches to. */
  stem: string;
  /** The answer. */
  ending: string;
  /** The whole form on one line, for the corrections list. */
  whole: string;
}

/* `je` becomes `j’` before a vowel and nothing else does — the same two-word
   rule as `ConjugationSheet`, restated rather than shared because there it is a
   local helper. *parler* triggers it at the passé composé: « j’ai parlé ». */
const VOWELS = /^[aeiouyâàéèêîïôùû]/i;

function elide(pronoun: string, next: string): string {
  return pronoun === "je" && VOWELS.test(next) ? "j’" : `${pronoun} `;
}

function simpleForms(verb: Verb, tense: TenseKey): string[] {
  if (tense === "imparfait") return imparfaitForms(verb);
  if (tense === "futur") return futurForms(verb);
  return verb.present;
}

function cellsFor(verb: Verb, bank: Bank): Cell[] {
  /* Annotated, because the three branches below return three different
     literal types of `tense` and inference would fix on the first one. */
  return bank.tenses.flatMap((tense): Cell[] => {
    if (tense === "passeCompose") {
      const aux = findVerb(verb.aux === "avoir" ? "avoir" : "etre");
      if (!aux) return [];
      const [stem, ending] = bank.participe;
      return aux.present.map((form, index) => {
        const auxWord = plain(form);
        const pronoun = PRONOUNS.masculin[index];
        const subject = `${elide(pronoun, auxWord)}${auxWord}`;
        return {
          key: `passeCompose-${index}`,
          tense,
          subject,
          stem,
          ending,
          whole: `${subject} ${stem}${ending}`,
        };
      });
    }

    if (tense === "imperatif") {
      return (verb.imperatif ?? []).flatMap((form, index) => {
        const [stem, ending] = form.split("|");
        if (ending === undefined) return [];
        return [
          {
            key: `imperatif-${index}`,
            tense,
            subject: IMPERATIF_PERSONS[index],
            stem,
            ending,
            whole: `${IMPERATIF_PERSONS[index]} ${stem}${ending}`,
          },
        ];
      });
    }

    return simpleForms(verb, tense).flatMap((form, index) => {
      const [stem, ending] = form.split("|");
      /* A form stored as all stem has no ending to ask for. No tense of a
         regular -er verb is shaped that way; `avoir`'s présent is. */
      if (ending === undefined) return [];
      const pronoun = PRONOUNS.masculin[index];
      return [
        {
          key: `${tense}-${index}`,
          tense,
          subject: pronoun,
          stem,
          ending,
          whole: `${elide(pronoun, stem)}${stem}${ending}`,
        },
      ];
    });
  });
}

/**
 * Compared with case folded and a leading hyphen forgiven, and nothing else.
 *
 * **Accent-sensitive on purpose**: the spelling is the skill here, and at the
 * passé composé it is the whole of it — *parlé* against *parler* is the most
 * common written error in French. `AccentBar` is what keeps that fair on a
 * Spanish keyboard.
 */
function same(typed: string, expected: string): boolean {
  return typed.trim().replace(/^-/, "").toLowerCase() === expected.toLowerCase();
}

/**
 * The five tenses of the verb sheet, with the endings taken out.
 *
 * **The stem is given and only the ending is asked for**, which is the shape of
 * the thing being learnt: one stem, six endings, and the same six endings on
 * every regular verb in the group. Asked as whole forms, the drill would be
 * testing spelling of the stem as much as the paradigm.
 *
 * **Two of the five are not six rows of a stem plus an ending, and both are
 * built rather than read.** At the passé composé the blank is on the participle
 * and the auxiliary is printed conjugated in front of it, the split coming from
 * the bank (`data.ts`); the impératif has three persons, no pronoun, and its
 * own stored forms.
 *
 * **Type-in, with no pool of endings to choose from.** A reserve of the fifteen
 * endings was built and taken out again: it turned recall into recognition, and
 * this drill is for the learner who has to produce the form. `AccentBar` stays,
 * and is now the only aid — `é` at the passé composé is the one answer a Spanish
 * keyboard cannot reach directly (`AGENTS.md` §1, §9).
 *
 * **Every blank ships the context that disambiguates it.** `tu parl___` takes
 * *-es* and *-ais* equally well, so the tense is the table's `<caption>` and the
 * person is the row — an item missing either is a bug, not a hard question.
 *
 * **Nothing here is random**, so unlike the sorting board this file is safe to
 * server-render: there is no shuffle to disagree about, and the drill's first
 * paint is the empty table rather than « Préparation de l’exercice… ».
 */
export function Board({ level }: { level: Level | null }) {
  const bank = bankFor(level);
  const verb = findVerb(bank.verb);
  const cells = verb ? cellsFor(verb, bank) : [];

  const [answers, setAnswers] = useState<Record<string, string>>({});
  /* **Which tenses have been marked, not whether the board has.** A learner
     working one tense at a time wants that tense corrected while it is still in
     front of her, rather than holding twenty-seven answers in her head until
     the end; a learner who fills everything first can still mark the lot in one
     go. Both write into the same set, so the score at the end is the same. */
  const [verified, setVerified] = useState<TenseKey[]>([]);
  const [finished, setFinished] = useState(false);
  /* Which tense is on screen. An index rather than the key, because the strip
     steps forward and back and the bank decides the order. */
  const [shown, setShown] = useState(0);
  const fields = useRef<Record<string, HTMLInputElement | null>>({});
  /* The blank `AccentBar` writes into. One bar under the board, pointed at
     whichever field has focus, rather than twenty-seven bars. */
  const active = useRef<HTMLInputElement | null>(null);

  const tense = bank.tenses[shown] ?? bank.tenses[0];
  const filled = cells.filter((cell) => (answers[cell.key] ?? "").trim() !== "");
  const wrong = cells.filter((cell) => !same(answers[cell.key] ?? "", cell.ending));
  const score = cells.length - wrong.length;

  const isChecked = (key: TenseKey) => verified.includes(key);
  const allChecked = bank.tenses.every(isChecked);
  const checked = isChecked(tense);

  const rowsOf = (key: TenseKey) => cells.filter((cell) => cell.tense === key);
  const isFilled = (key: TenseKey) =>
    rowsOf(key).every((cell) => (answers[cell.key] ?? "").trim() !== "");
  const wrongIn = (key: TenseKey) =>
    rowsOf(key).filter((cell) => !same(answers[cell.key] ?? "", cell.ending));

  const here = rowsOf(tense);
  const wrongHere = wrongIn(tense);

  function restart() {
    setAnswers({});
    setVerified([]);
    setFinished(false);
    setShown(0);
  }

  if (!verb) {
    return <p>Le verbe de cet exercice est introuvable.</p>;
  }

  if (finished) {
    return <Score score={score} total={cells.length} onRestart={restart} />;
  }

  return (
    /* One wrapper, for one custom property. `--form` is the size of a
       conjugated form, and the table and the blanks both read it — so the two
       cannot drift apart the way separate `font-size` declarations did. */
    <div className={styles.board}>
      <Instructions>
        Écrivez la terminaison qui manque, temps par temps.
      </Instructions>

      {/* Which verb is being conjugated, read from the bank rather than typed.

          The page's `<h1>` is « Les terminaisons » and `PageHeader` does not
          draw the manifest's subtitle, so without this the board never names
          the verb its stems come from. Derived, so a second bank on another
          verb (`data.ts`) renames this line and cannot leave it lying — which
          is why the manifest title stays general. */}
      <p className={styles.verbHead}>
        <span className={styles.verbWord}>{verb.infinitif}</span>
        <span className={styles.verbGroup}>{verb.groupe}</span>
      </p>

      <div className={styles.tableWrap}>
        {/* No column heads. Sujet, radical and terminaison are legible from
            the cells themselves, and three labels over six short rows read as
            chrome. The `<caption>` stays — every table on this site has one
            (`AGENTS.md` §5) — and each blank keeps an `aria-label` naming the
            tense, the subject and the stem, so nothing is lost off-screen. */}
        <table className={styles.table} aria-label={TENSES[tense].label}>
          {/* The stepper lives in the `<caption>`: it names which tense the
              table is showing, which is a caption's job, and inside the card it
              reads as the table's own head rather than as a control floating
              above it. `aria-label` on the table keeps the accessible name to
              the one tense — a caption holding five buttons would otherwise
              name the table with all five. */}
          <caption className={styles.caption}>
          <div className={styles.tabs} role="group" aria-label="Temps">
            <button
              type="button"
              className={styles.arrow}
              disabled={shown === 0}
              onClick={() => setShown(shown - 1)}
              aria-label="Temps précédent"
            >
              <Chevron back />
            </button>

            {bank.tenses.map((key, index) => {
              const rows = cells.filter((cell) => cell.tense === key);
              const complete =
                rows.length > 0 &&
                rows.every((cell) => (answers[cell.key] ?? "").trim() !== "");
              return (
                <button
                  key={key}
                  type="button"
                  className={`${styles.tab} ${index === shown ? styles.current : ""}`}
                  aria-current={index === shown ? "true" : undefined}
                  onClick={() => setShown(index)}
                >
                  {TENSES[key].label}
                  {/* Three states in one mark: a tense already corrected shows
                      its score, one filled but not yet corrected shows a tick,
                      one still open shows nothing. Without it a learner has to
                      step through five tenses to find where she is. */}
                  {isChecked(key) ? (
                    <>
                      <span className={styles.tabScore} aria-hidden="true">
                        {rows.length - wrongIn(key).length}/{rows.length}
                      </span>
                      <span className="visually-hidden">
                        {` — corrigé, ${rows.length - wrongIn(key).length} sur ${rows.length}`}
                      </span>
                    </>
                  ) : (
                    complete && (
                      <>
                        <span className={styles.tabDone} aria-hidden="true">
                          ✓
                        </span>
                        <span className="visually-hidden"> — complété</span>
                      </>
                    )
                  )}
                </button>
              );
            })}

            <button
              type="button"
              className={styles.arrow}
              disabled={shown === bank.tenses.length - 1}
              onClick={() => setShown(shown + 1)}
              aria-label="Temps suivant"
            >
              <Chevron />
            </button>
          </div>
          </caption>
          <tbody>
            {cells
              .filter((cell) => cell.tense === tense)
              .map((cell) => {
                const typed = answers[cell.key] ?? "";
                const right = same(typed, cell.ending);
                return (
                  <tr key={cell.key}>
                    <th scope="row" className={styles.person}>
                      {cell.subject}
                    </th>
                    <td className={styles.stem}>{cell.stem}</td>
                    <td className={styles.endingCell}>
                      <span className={styles.form}>
                        {/* The join, written the way the course writes an
                            ending everywhere else: « -ons », « -aient ».
                            Hidden from a screen reader, which already hears
                            « … parl, terminaison » from the field's label. */}
                        <span className={styles.join} aria-hidden="true">
                          -
                        </span>
                        <input
                          ref={(element) => {
                            fields.current[cell.key] = element;
                          }}
                          type="text"
                          className={`${styles.field} ${
                            checked ? (right ? "is-correct" : "is-wrong") : ""
                          }`}
                          value={typed}
                          disabled={checked}
                          onFocus={(event) => {
                            active.current = event.currentTarget;
                          }}
                          onChange={(event) =>
                            setAnswers((previous) => ({
                              ...previous,
                              [cell.key]: event.target.value,
                            }))
                          }
                          inputMode="text"
                          autoComplete="off"
                          autoCapitalize="none"
                          spellCheck={false}
                          aria-label={`${TENSES[tense].label}, ${cell.subject} ${cell.stem}, terminaison`}
                        />
                        {checked && (
                          <span className={styles.mark} aria-hidden="true">
                            {right ? "✓" : "✗"}
                          </span>
                        )}
                      </span>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        {TENSES[tense].note && (
          <p className={styles.note}>{TENSES[tense].note}</p>
        )}
      </div>


      {/* `é` at the passé composé is the only answer outside a–z, and a Spanish
          keyboard reaches it through a dead key. This row is now the drill's
          only aid, which makes it load-bearing rather than a convenience:
          without it the page marks a learner wrong for her hardware
          (`AGENTS.md` §1, §9). */}
      {!checked && (
        <div className={styles.aid}>
          <h3 className={styles.aidHead}>Accents</h3>
          <AccentBar target={active} />
        </div>
      )}

      {/* The verdict for the tense on screen, not for the board: the corrections
          have to sit beside the rows they correct, and five tenses' worth in one
          list is a wall nobody reads. The total is the score screen's job. */}
      {checked && (
        <div role="status">
          <p className={wrongHere.length === 0 ? "is-correct" : "is-wrong"}>
            {wrongHere.length === 0
              ? `✓ ${TENSES[tense].label} : les ${here.length} formes sont justes.`
              : `✗ ${TENSES[tense].label} : ${here.length - wrongHere.length} sur ${here.length}. Les formes marquées d’une croix sont fausses.`}
          </p>
          {wrongHere.length > 0 && (
            <ul className={styles.corrections}>
              {wrongHere.map((cell) => (
                <li key={cell.key}>
                  <span className={styles.verb}>{cell.whole}</span>{" "}
                  · {TENSES[cell.tense].label.toLowerCase()}, terminaison{" "}
                  <span className="fr">-{cell.ending}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      <div className={styles.actions}>
        {/* Correct this tense now, or fill the five and correct them together.
            The second is secondary on purpose: one tense at a time is what the
            stepper above already asks of her. */}
        {!checked && (
          <button
            type="button"
            className="button button-primary"
            disabled={!isFilled(tense)}
            onClick={() => setVerified([...verified, tense])}
          >
            Vérifier {TENSES[tense].label.toLowerCase()}
          </button>
        )}

        {allChecked ? (
          <button
            type="button"
            className="button button-primary"
            onClick={() => setFinished(true)}
          >
            Voir mon score
          </button>
        ) : (
          /* No count beside it: the strip says which tenses are still open, and
             a running total repeated that somewhere you cannot act on. */
          <button
            type="button"
            className={checked ? "button button-primary" : "button"}
            disabled={filled.length < cells.length}
            onClick={() => setVerified([...bank.tenses])}
          >
            Tout vérifier
          </button>
        )}
      </div>
    </div>
  );
}
