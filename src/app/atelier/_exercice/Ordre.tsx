"use client";

import { useState } from "react";
import { Instructions } from "@/components/exercice/Drill";
import { Bilan } from "./Bilan";
import board from "@/components/exercice/Board.module.css";
import styles from "./Ordre.module.css";

/**
 * « Remets le texte dans l'ordre » — les morceaux d'un texte arrivent dans le
 * désordre, l'élève les reprend un par un pour reconstruire le plan (#80).
 *
 * **Des clics, jamais un glisser-déposer.** Toucher un morceau l'ajoute à la
 * fin de « Ton texte » ; toucher un morceau déjà placé le renvoie dans la
 * pile. C'est ce qui marche au doigt, au clavier et au lecteur d'écran sans
 * rien de plus, et c'est assez pour trois à six morceaux.
 *
 * **Le désordre est écrit dans les données** (`affichage`), jamais tiré au
 * hasard : la page reste prérendue (`Choix.tsx`), et aucun morceau ne s'y
 * affiche déjà à sa place.
 *
 * **La correction arrive d'un coup, quand tout est placé** : chaque place est
 * marquée juste ou fausse, puis le bon ordre s'affiche avec, pour chaque
 * morceau, sa partie et l'indice qui le plaçait. **Un seul ordre défendable**
 * (`AGENTS.md` §9) : chaque morceau doit porter un indice (« En conclusion »,
 * « Ce lion », « Cependant ») qui l'attache à son voisin.
 *
 * Rien n'est enregistré (#2, #80).
 */

export interface Bloc {
  /** Le morceau. Un `\n` est un retour à la ligne (un vers). */
  texte: string;
  /** Sa partie dans le plan, affichée après la correction. */
  partie: string;
  /** Ce qui le mettait à sa place, en une phrase. */
  indice: string;
}

export function Ordre({
  blocs,
  affichage,
  consigne,
  nom,
}: {
  /** Les morceaux, dans le bon ordre. */
  blocs: Bloc[];
  /** L'ordre de la pile : des index de `blocs`, chacun une fois. */
  affichage: number[];
  /** La consigne, écrite par la page : c'est elle qui sait si elle tutoie. */
  consigne: string;
  /** Le nom du plateau, pour les groupes annoncés au lecteur d'écran. */
  nom: string;
}) {
  const [ordre, setOrdre] = useState<number[]>([]);
  const [corrige, setCorrige] = useState(false);

  const pile = affichage.filter((b) => !ordre.includes(b));
  const score = ordre.filter((b, place) => b === place).length;

  function prendre(bloc: number) {
    if (corrige) return;
    setOrdre((avant) => [...avant, bloc]);
  }

  function rendre(bloc: number) {
    if (corrige) return;
    setOrdre((avant) => avant.filter((b) => b !== bloc));
  }

  function recommencer() {
    setOrdre([]);
    setCorrige(false);
  }

  return (
    <>
      <Instructions>{consigne}</Instructions>

      <div className={`card ${board.card}`}>
        {pile.length > 0 && (
          <>
            <p className={styles.etape}>Les morceaux</p>
            <div
              className={styles.pile}
              role="group"
              aria-label={`Les morceaux à placer : ${nom}`}
            >
              {pile.map((b) => (
                <button
                  key={b}
                  type="button"
                  className={styles.morceau}
                  onClick={() => prendre(b)}
                >
                  {blocs[b].texte}
                </button>
              ))}
            </div>
          </>
        )}

        <p className={`${styles.etape} ${styles.suite}`}>
          Ton texte {ordre.length === 0 && "· touche un morceau pour commencer"}
        </p>
        <ol className={styles.texte} aria-label={`Ton texte : ${nom}`}>
          {ordre.map((b, place) => {
            const juste = b === place;
            const etat = !corrige ? "" : juste ? "is-correct" : "is-wrong";
            return (
              <li key={b} className={styles.ligne}>
                <span className={styles.numero} aria-hidden="true">
                  {corrige ? (juste ? "✓" : "✗") : place + 1}
                </span>
                <button
                  type="button"
                  className={`${styles.morceau} ${etat}`}
                  onClick={() => rendre(b)}
                  disabled={corrige}
                  aria-label={
                    corrige
                      ? `${juste ? "Bien placé" : "Mal placé"} : ${blocs[b].texte}`
                      : `Retirer : ${blocs[b].texte}`
                  }
                >
                  {blocs[b].texte}
                </button>
              </li>
            );
          })}
        </ol>

        {!corrige && (
          <div className={board.actions}>
            <button
              type="button"
              className="button button-primary"
              onClick={() => setCorrige(true)}
              disabled={pile.length > 0}
            >
              Corriger
            </button>
            {ordre.length > 0 && (
              <button type="button" className="button" onClick={recommencer}>
                Tout reprendre
              </button>
            )}
          </div>
        )}

        {corrige && score < blocs.length && (
          <div className={styles.bon} role="status">
            <p className={styles.etape}>Le bon ordre</p>
            <ol className={styles.texte}>
              {blocs.map((bloc, place) => (
                <li key={place} className={styles.ligne}>
                  <span className={styles.numero} aria-hidden="true">
                    {place + 1}
                  </span>
                  <div>
                    <p className={styles.partie}>{bloc.partie}</p>
                    <p className={styles.vers}>{bloc.texte}</p>
                    <p className={styles.indice}>{bloc.indice}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>

      {corrige && (
        <Bilan
          score={score}
          total={blocs.length}
          onRestart={recommencer}
          message={
            score === blocs.length
              ? "Tout est à sa place : tu as retrouvé le plan."
              : "Regarde le bon ordre juste au-dessus : chaque morceau a un mot qui l’attache à son voisin."
          }
        />
      )}
    </>
  );
}
