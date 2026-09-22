"use client";

import { useRef, useState } from "react";
import { Instructions, Meter, Score } from "@/components/exercice/Drill";
import { AccentBar } from "@/components/exercice/AccentBar";
import styles from "./Ecrire.module.css";

/**
 * « Écrivez la forme » — le seul des trois où l'on produit au lieu de choisir.
 *
 * **C'est la compétence visée, et c'est pour cela qu'on tape ici.** §9 dit de
 * préférer le clic à la frappe quand la réponse porte des accents ; l'exception
 * qu'elle garde ouverte est « là où l'orthographe *est* la compétence », et
 * c'est exactement le cas d'un locuteur qui dit la phrase parfaitement et ne
 * sait pas l'écrire. Reconnaître la bonne forme entre deux, il y arrive
 * souvent ; la produire, c'est ce qui manque.
 *
 * **Donc `AccentBar`, obligatoirement.** Sans elle, la frappe noterait le
 * clavier espagnol : `é` coûte un détour par une touche morte, `ç` et `œ` ne
 * s'y tapent pas du tout (`AGENTS.md` §1). Une seule barre, pointée sur le
 * champ, comme dans `exercices/les-terminaisons`.
 *
 * **La comparaison ignore la casse et les espaces, rien d'autre.** Pas de
 * variante acceptée : l'accent et le trait d'union *sont* la réponse, et un
 * `accept` qui les laisserait passer viderait l'exercice de son objet. C'est
 * la même règle que §9 pose dans l'autre sens — une liste `accept` ne porte
 * jamais un autre nombre ni un autre genre.
 *
 * Rien n'est enregistré et rien ne coche (#2, #80).
 */

export interface EcrireItem {
  /** Le début de la phrase, espace final compris. */
  avant: string;
  /** La fin de la phrase, à partir du mot à écrire. */
  apres: string;
  /** La forme attendue, accents et apostrophes compris. */
  reponse: string;
  /** Ce qu'on donne pour poser la question : l'infinitif, le mot fautif. */
  indice: string;
  /** La raison, en une phrase, affichée après la vérification. */
  pourquoi: string;
}

/** Casse et espaces seulement. Les accents comptent, c'est le sujet. */
function same(typed: string, expected: string): boolean {
  return typed.trim().toLocaleLowerCase("fr") === expected.toLocaleLowerCase("fr");
}

export function Ecrire({ items }: { items: EcrireItem[] }) {
  const field = useRef<HTMLInputElement>(null);
  const [index, setIndex] = useState(0);
  const [value, setValue] = useState("");
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const current = items[index];
  const right = checked && same(value, current.reponse);

  function verify() {
    if (checked || value.trim() === "") return;
    setChecked(true);
    if (same(value, current.reponse)) setScore((s) => s + 1);
  }

  function next() {
    if (index + 1 === items.length) {
      setFinished(true);
      return;
    }
    setIndex((i) => i + 1);
    setValue("");
    setChecked(false);
  }

  function restart() {
    setIndex(0);
    setValue("");
    setChecked(false);
    setScore(0);
    setFinished(false);
  }

  if (finished) {
    return <Score score={score} total={items.length} onRestart={restart} />;
  }

  return (
    <>
      <Instructions>
        Écrivez la forme qui manque. Les accents comptent : la rangée sous le
        champ donne ceux que le clavier ne donne pas.
      </Instructions>

      <Meter
        value={index + (checked ? 1 : 0)}
        max={items.length}
        label="Avancement de l’exercice"
      />

      <div className={styles.card}>
        <p className={styles.sentence}>
          {current.avant}
          <span className={styles.gap}>……</span>
          {current.apres}
        </p>

        <p className={styles.indice}>
          À écrire : <span className="fr">{current.indice}</span>
        </p>

        {/* `form` plutôt qu'un champ nu : Entrée vérifie, ce qui est le geste
            qu'on fait sans y penser après avoir tapé un mot. */}
        <form
          className={styles.field}
          onSubmit={(event) => {
            event.preventDefault();
            verify();
          }}
        >
          <input
            ref={field}
            type="text"
            className={`${styles.input} ${checked ? (right ? "is-correct" : "is-wrong") : ""}`}
            value={value}
            onChange={(event) => setValue(event.target.value)}
            readOnly={checked}
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
            aria-label="La forme à écrire"
          />
          {!checked && (
            <button type="submit" className="button" disabled={value.trim() === ""}>
              Vérifier
            </button>
          )}
        </form>

        {!checked && <AccentBar target={field} />}

        {checked && (
          <div className={styles.verdict} role="status">
            <p className={styles.corrected}>
              {right ? (
                <>
                  <span aria-hidden="true">✓</span> {current.avant}
                  <strong>{current.reponse}</strong>
                  {current.apres}
                </>
              ) : (
                <>
                  <span aria-hidden="true">✗</span> On écrit{" "}
                  <strong>{current.reponse}</strong>.
                </>
              )}
            </p>
            <p className={styles.pourquoi}>{current.pourquoi}</p>
            <div className={styles.actions}>
              <button type="button" className="button" onClick={next}>
                {index + 1 === items.length ? "Terminer" : "Suivante"}
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
