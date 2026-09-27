"use client";

import { useState } from "react";
import { enPoints } from "./copie-data";
import styles from "./Grille.module.css";

/**
 * La grille d'une épreuve de production, à cliquer par la personne qui corrige
 * (#82).
 *
 * **Une production ne se corrige pas toute seule** (#54) : soixante mots ont
 * des centaines de versions justes, et une réponse orale ne laisse rien à
 * comparer. La page ne note donc rien ; elle donne la grille, par demi-point
 * comme à l'examen, et fait l'addition.
 *
 * **Les totaux sont ceux de l'examen, les mots sont ceux du cours.** Le nombre
 * de points de chaque critère suit le barème publié ; ce que chaque ligne dit
 * est écrit ici (§9b). `Grille` jette si un groupe ne tombe pas sur son total,
 * pour la même raison que `verifierCopie`.
 */
export interface Critere {
  titre: string;
  detail: string;
  max: number;
}

export interface GroupeCriteres {
  titre: string;
  total: number;
  criteres: Critere[];
}

export function Grille({ groupes }: { groupes: GroupeCriteres[] }) {
  const [notes, setNotes] = useState<Record<string, number>>({});

  /* Au prérendu aussi : une grille fausse casse `next build`. */
  for (const groupe of groupes) {
    const somme = groupe.criteres.reduce((t, c) => t + c.max, 0);
    if (somme !== groupe.total) {
      throw new Error(
        `Grille : « ${groupe.titre} » annonce ${groupe.total}, ses critères font ${somme}`,
      );
    }
  }

  const cles = groupes.flatMap((g) =>
    g.criteres.map((c) => `${g.titre}/${c.titre}`),
  );
  const total = groupes.reduce((t, g) => t + g.total, 0);
  const note = cles.reduce((t, cle) => t + (notes[cle] ?? 0), 0);
  const manquent = cles.filter((cle) => notes[cle] === undefined).length;

  const noter = (cle: string, valeur: number) =>
    setNotes((avant) => ({ ...avant, [cle]: valeur }));

  return (
    <div className={styles.grille}>
      {groupes.map((groupe) => (
        <div key={groupe.titre} className={styles.groupe}>
          <h4 className={styles.titre}>
            <span>{groupe.titre}</span>
            <span className={styles.sur}>
              {enPoints(
                groupe.criteres.reduce(
                  (t, c) => t + (notes[`${groupe.titre}/${c.titre}`] ?? 0),
                  0,
                ),
              )}{" "}
              sur {groupe.total}
            </span>
          </h4>

          {groupe.criteres.map((critere) => {
            const cle = `${groupe.titre}/${critere.titre}`;
            const pas = Array.from(
              { length: critere.max * 2 + 1 },
              (_, i) => i / 2,
            );

            return (
              <div key={cle} className={styles.critere}>
                <p className={styles.nom}>
                  <strong>{critere.titre}</strong>{" "}
                  <span className={styles.max}>
                    sur {enPoints(critere.max)}
                  </span>
                </p>
                <p className={styles.detail}>{critere.detail}</p>
                <div
                  role="group"
                  aria-label={critere.titre}
                  className={styles.pas}
                >
                  {pas.map((valeur) => (
                    <button
                      key={valeur}
                      type="button"
                      className={`button ${styles.valeur} ${notes[cle] === valeur ? styles.prise : ""}`}
                      aria-pressed={notes[cle] === valeur}
                      onClick={() => noter(cle, valeur)}
                    >
                      {enPoints(valeur)}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ))}

      <p className={styles.total} role="status">
        Total : {enPoints(note)} sur {total}
        {manquent > 0 && (
          <span className={styles.manque}>
            {" "}
            · {manquent} critère{manquent > 1 ? "s" : ""} pas encore noté
            {manquent > 1 ? "s" : ""}
          </span>
        )}
      </p>
      <p>
        <button
          type="button"
          className="button"
          onClick={() => setNotes({})}
          disabled={manquent === cles.length}
        >
          Effacer la grille
        </button>
      </p>
    </div>
  );
}
