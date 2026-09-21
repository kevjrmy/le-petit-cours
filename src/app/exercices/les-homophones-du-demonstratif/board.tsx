"use client";

import { useRef, useState } from "react";
import { AccentBar } from "@/components/exercice/AccentBar";
import { Instructions, Meter, Score } from "@/components/exercice/Drill";
import { shuffle } from "@/lib/shuffle";
import { ITEMS, type WordItem } from "./data";
import styles from "./drill.module.css";

/**
 * Écrire le mot, pas le reconnaître.
 *
 * **La saisie est le sujet.** Ailleurs dans le chapitre, taper est un défaut :
 * les accents coûtent un détour sur un clavier espagnol et un choix de
 * pastilles dit la même chose sans tester le matériel. Ici, ce qui s'apprend
 * *est* l'orthographe du mot, et huit pastilles auraient donné la réponse par
 * reconnaissance (`.claude/agents/exercise-author.md`).
 *
 * **La comparaison pardonne deux choses et une seule compte.** La casse, parce
 * que c'est la place dans la phrase qui décide de la majuscule et non le mot ;
 * l'apostrophe droite, parce que c'est celle du clavier. La cédille, elle, ne
 * se pardonne pas : « ca » n'est pas « ça », et `AccentBar` est ce qui rend
 * cette exigence tenable (`AGENTS.md` §1, §9).
 *
 * Jamais rendu sur le serveur : le tirage est mélangé dans un initialiseur de
 * `useState` et `drill.tsx` charge ce fichier avec `ssr: false`.
 */
function same(typed: string, expected: string): boolean {
  const fold = (value: string) =>
    value.toLowerCase().replace(/[’']/g, "'").replace(/\s+/g, "");
  return fold(typed) === fold(expected);
}

export function Board() {
  const [deck, setDeck] = useState<WordItem[]>(() => shuffle(ITEMS));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [typed, setTyped] = useState("");
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  /* Le champ de la phrase en cours : `AccentBar` écrit au curseur, et il n'y a
     qu'un champ à l'écran à la fois. */
  const field = useRef<HTMLInputElement>(null);

  const current = deck[currentIndex];
  const right = same(typed, current.answer);

  function restart() {
    setDeck(shuffle(ITEMS));
    setCurrentIndex(0);
    setTyped("");
    setChecked(false);
    setScore(0);
    setFinished(false);
  }

  function verify() {
    setChecked(true);
    if (same(typed, current.answer)) setScore((value) => value + 1);
  }

  function next() {
    if (currentIndex + 1 === deck.length) {
      setFinished(true);
      return;
    }
    setCurrentIndex((value) => value + 1);
    setTyped("");
    setChecked(false);
  }

  if (finished) {
    return <Score score={score} total={deck.length} onRestart={restart} />;
  }

  return (
    <>
      <Instructions>
        Écrivez le mot qui manque. Les huit mots possibles se prononcent deux à
        deux de la même façon : <span className="fr">ce</span> /{" "}
        <span className="fr">se</span>, <span className="fr">ces</span> /{" "}
        <span className="fr">ses</span>, <span className="fr">c’est</span> /{" "}
        <span className="fr">s’est</span>, <span className="fr">ça</span> /{" "}
        <span className="fr">sa</span>.
      </Instructions>

      <Meter value={currentIndex + 1} max={deck.length} label="Phrase en cours" />

      <div className={styles.card}>
        <p className={styles.sentence}>
          {current.before}
          <input
            ref={field}
            type="text"
            className={`${styles.field} ${
              checked ? (right ? "is-correct" : "is-wrong") : ""
            }`}
            value={typed}
            disabled={checked}
            onChange={(event) => setTyped(event.target.value)}
            onKeyDown={(event) => {
              /* Entrée vérifie, puis passe à la suite : la phrase se finit au
                 clavier, sans aller chercher le bouton à la souris. */
              if (event.key !== "Enter") return;
              event.preventDefault();
              if (checked) next();
              else if (typed.trim() !== "") verify();
            }}
            inputMode="text"
            autoComplete="off"
            autoCapitalize="none"
            spellCheck={false}
            aria-label="Le mot qui manque"
          />
          {current.after}
        </p>

        {/* La cédille de « ça » ne se tape pas sur un clavier espagnol : sans
            cette rangée, le plateau compterait faux une réponse juste. */}
        {!checked && (
          <div className={styles.aid}>
            <h3 className={styles.aidHead}>Accents</h3>
            <AccentBar target={field} />
          </div>
        )}

        {/* Rendu vide plutôt que conditionnellement, pour que la zone existe
            avant que le verdict n'y arrive et soit annoncée. */}
        <div role="status">
          {checked && (
            <div
              className={`${styles.verdict} ${right ? "is-correct" : "is-wrong"}`}
            >
              <p>
                {right ? "✓ Juste." : `✗ Il fallait écrire « ${current.answer} ».`}
              </p>
              <p className={styles.corrected}>
                {current.before}
                <strong>{current.answer}</strong>
                {current.after}
              </p>
              <p>{current.because}</p>
            </div>
          )}
        </div>
      </div>

      <div className={styles.actions}>
        {checked ? (
          <button type="button" className="button button-primary" onClick={next}>
            {currentIndex + 1 === deck.length
              ? "Voir mon score"
              : "Phrase suivante"}
          </button>
        ) : (
          <button
            type="button"
            className="button button-primary"
            disabled={typed.trim() === ""}
            onClick={verify}
          >
            Vérifier
          </button>
        )}
      </div>
    </>
  );
}
