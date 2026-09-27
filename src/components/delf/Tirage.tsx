"use client";

import { useState } from "react";
import styles from "./Tirage.module.css";

/**
 * Les sujets d'une partie orale, et le bouton qui en tire un (#82).
 *
 * **Tous les sujets restent affichés**, comme sur la table de l'examinateur :
 * le tirage en désigne un, il n'en cache aucun. On peut donc aussi choisir à la
 * main, en cours, sans le bouton.
 *
 * **Jamais deux fois le même d'affilée** : un second tirage qui retombe sur le
 * premier se lit comme un bouton qui ne marche pas. Un seul nombre au hasard,
 * au clic, jamais au rendu, donc rien qui diffère entre le serveur et le
 * client.
 */
export function Tirage({ sujets }: { sujets: string[] }) {
  const [tire, setTire] = useState<number | null>(null);

  const tirer = () => {
    const autres = sujets.map((_, i) => i).filter((i) => i !== tire);
    setTire(autres[Math.floor(Math.random() * autres.length)]);
  };

  return (
    <>
      <ul className="documents">
        {sujets.map((sujet, index) => (
          <li
            key={sujet}
            className={index === tire ? styles.tire : undefined}
            aria-current={index === tire || undefined}
          >
            <span>{sujet}</span>
            <span className="lettre">
              {index === tire ? `Sujet tiré · ${index + 1}` : index + 1}
            </span>
          </li>
        ))}
      </ul>
      <p className={styles.ligne}>
        <button type="button" className="button" onClick={tirer}>
          {tire === null ? "Tirer un sujet" : "Tirer un autre sujet"}
        </button>
        <span role="status">
          {tire === null ? "" : `Sujet ${tire + 1} : ${sujets[tire]}`}
        </span>
      </p>
    </>
  );
}
