"use client";

import { useEffect, useState } from "react";
import styles from "./Chrono.module.css";

/**
 * Le temps d'une épreuve, ou d'une préparation (#82).
 *
 * **Il ne ferme rien quand il arrive à zéro.** Il le dit, c'est tout : en cours
 * particulier, c'est la personne qui fait passer l'épreuve qui décide si l'on
 * finit la phrase. Une copie verrouillée à 00:00 serait plus stricte que le
 * vrai examen, où l'on pose son stylo.
 *
 * **Calculé sur l'heure de fin, pas en comptant les secondes.** Un onglet en
 * arrière-plan ralentit `setInterval` ; décompter à chaque tic ferait durer
 * trente minutes bien plus que trente minutes. L'intervalle ne sert qu'à
 * redessiner.
 *
 * Rien ne lit l'horloge au rendu : le chrono ne part qu'au clic, donc le HTML du
 * serveur et le premier rendu du client affichent la même durée pleine.
 */
export function Chrono({
  minutes,
  libelle,
}: {
  minutes: number;
  libelle: string;
}) {
  const duree = minutes * 60_000;
  /* En marche : l'heure de fin. À l'arrêt : ce qu'il reste. Jamais les deux. */
  const [fin, setFin] = useState<number | null>(null);
  const [reste, setReste] = useState(duree);
  const [maintenant, setMaintenant] = useState(0);

  useEffect(() => {
    if (fin === null) return;
    /* Pas de tic immédiat : `lancer` a déjà posé `maintenant`. */
    const id = window.setInterval(() => setMaintenant(Date.now()), 250);
    return () => window.clearInterval(id);
  }, [fin]);

  const restant = fin === null ? reste : Math.max(0, fin - maintenant);
  const ecoule = restant === 0;
  const secondes = Math.ceil(restant / 1000);
  const affichage = `${String(Math.floor(secondes / 60)).padStart(2, "0")}:${String(secondes % 60).padStart(2, "0")}`;

  const lancer = () => {
    const now = Date.now();
    setMaintenant(now);
    setFin(now + reste);
  };
  const arreter = () => {
    setReste(restant);
    setFin(null);
  };
  const remettre = () => {
    setFin(null);
    setReste(duree);
  };

  return (
    <div className={styles.chrono}>
      <span className={styles.libelle}>{libelle}</span>
      <span className={styles.temps} role="timer" aria-live="off">
        {affichage}
      </span>
      {fin === null || ecoule ? (
        <button
          type="button"
          className="button"
          onClick={lancer}
          disabled={ecoule}
        >
          {reste === duree ? "Lancer" : "Reprendre"}
        </button>
      ) : (
        <button type="button" className="button" onClick={arreter}>
          Pause
        </button>
      )}
      <button
        type="button"
        className="button"
        onClick={remettre}
        disabled={fin === null && reste === duree}
      >
        Remettre à zéro
      </button>
      <span role="status" className={styles.fini}>
        {ecoule ? "Temps écoulé." : ""}
      </span>
    </div>
  );
}
