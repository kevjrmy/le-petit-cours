"use client";

import { useState } from "react";
import { Instructions, Meter, Score } from "@/components/exercice/Drill";
import styles from "./Choix.module.css";

/**
 * « Laquelle des deux ? » — le petit exercice des pages d'atelier (#80).
 *
 * **Un dossier privé, et il part avec le chapitre.** Il est sous
 * `src/app/temp/_exercice/` plutôt que dans `src/components/`, parce que
 * l'atelier se vide : un composant permanent laissé derrière après une remise
 * à zéro serait du code que plus rien n'appelle. Le préfixe `_` le sort du
 * routage de Next **et** de la marche du `page.tsx` que fait l'audit.
 *
 * **Deux formes, un clic.** Les réponses de ces pages portent des accents, des
 * apostrophes et un `œ` : les taper sur un clavier espagnol, c'est noter le
 * matériel (`AGENTS.md` §1, §9). Le choix est donc toujours binaire, et les
 * deux formes sont celles qui s'écrivent vraiment, jamais un distracteur
 * inventé — chaque item vient d'un endroit précis du texte qui est au-dessus.
 *
 * **Aucun mélange.** Le paquet est lu dans l'ordre où il est écrit, ce qui
 * suit l'ordre du texte, et permet au composant d'être rendu par le serveur :
 * un `shuffle` en rendu donnerait deux arbres différents et obligerait à un
 * `ssr: false`, pour un exercice de huit items qu'on fait une fois en classe.
 * La bonne réponse n'est donc pas toujours du même côté : c'est aux données de
 * l'alterner, et le script de vérification en fait le compte.
 *
 * **Rien n'est enregistré et rien ne coche** (#2) : le score s'affiche,
 * « Recommencer » l'efface. Sur une page d'atelier il n'y a de toute façon
 * aucune coche à mettre (#80).
 */

export interface ChoixItem {
  /** Le début de la phrase, espace final compris s'il en faut un. */
  avant: string;
  /** La fin de la phrase, à partir du mot à trouver. */
  apres: string;
  /** Les deux formes proposées, dans l'ordre où elles s'affichent. */
  options: [string, string];
  /** Celle qui est juste. Doit être l'une des deux ci-dessus. */
  bonne: string;
  /** La raison, en une phrase. Elle s'affiche après le clic, juste ou non. */
  pourquoi: string;
}

export function Choix({ items }: { items: ChoixItem[] }) {
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const current = items[index];
  const answered = picked !== null;
  const right = picked === current.bonne;

  function choose(option: string) {
    if (answered) return;
    setPicked(option);
    if (option === current.bonne) setScore((s) => s + 1);
  }

  function next() {
    if (index + 1 === items.length) {
      setFinished(true);
      return;
    }
    setIndex((i) => i + 1);
    setPicked(null);
  }

  function restart() {
    setIndex(0);
    setPicked(null);
    setScore(0);
    setFinished(false);
  }

  if (finished) {
    return <Score score={score} total={items.length} onRestart={restart} />;
  }

  return (
    <>
      <Instructions>
        Choisissez la forme qui s’écrit. Chaque phrase vient du texte plus haut.
      </Instructions>

      <Meter
        value={index + (answered ? 1 : 0)}
        max={items.length}
        label="Avancement de l’exercice"
      />

      <div className={styles.card}>
        <p className={styles.sentence}>
          {current.avant}
          <span className={styles.gap}>
            {answered ? current.bonne : "……"}
          </span>
          {current.apres}
        </p>

        <div className={styles.options}>
          {current.options.map((option) => {
            /* L'état n'est mis que sur le bouton cliqué et sur la bonne
               réponse : teinter les deux boutons à chaque coup ferait de la
               couleur un décor plutôt qu'une réponse (`AGENTS.md` §5). */
            const state = !answered
              ? ""
              : option === current.bonne
                ? "is-correct"
                : option === picked
                  ? "is-wrong"
                  : "";

            return (
              <button
                key={option}
                type="button"
                className={`${styles.option} ${state}`}
                onClick={() => choose(option)}
                disabled={answered}
              >
                <span className={styles.mark} aria-hidden="true">
                  {state === "is-correct" ? "✓" : state === "is-wrong" ? "✗" : ""}
                </span>
                {option}
              </button>
            );
          })}
        </div>

        {answered && (
          /* `role="status"` : la raison arrive après le clic, et un lecteur
             d'écran doit l'entendre sans avoir à la chercher. */
          <p className={styles.pourquoi} role="status">
            <strong>{right ? "Juste." : "Non."}</strong> {current.pourquoi}
          </p>
        )}

        {answered && (
          <div className={styles.actions}>
            <button type="button" className="button" onClick={next}>
              {index + 1 === items.length ? "Terminer" : "Suivante"}
            </button>
          </div>
        )}
      </div>
    </>
  );
}
