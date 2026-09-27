"use client";

import { useState } from "react";
import styles from "./Redaction.module.css";

/**
 * Le champ d'une production écrite, qui compte ses mots (#82).
 *
 * **Compté comme le compte l'examen : un mot est ce qui tient entre deux
 * espaces.** « c’est » fait un mot, « je ne l’ai pas vu » en fait cinq. Une
 * ponctuation isolée (« : » précédé d'une espace, à la française) n'en est pas
 * un, faute de lettre ou de chiffre.
 *
 * **Il ne dit jamais « faux ».** Trop court ou trop long, c'est dit en toutes
 * lettres et sans le rouge, qui dans ce cours signale une faute de français
 * (`AGENTS.md` §5) : la longueur est une consigne, pas une erreur de langue.
 */
export const compterMots = (texte: string) =>
  texte.split(/\s+/).filter((mot) => /[\p{L}\p{N}]/u.test(mot)).length;

export function Redaction({
  min,
  max,
  libelle,
  placeholder,
}: {
  min: number;
  max: number;
  libelle: string;
  placeholder?: string;
}) {
  const [mots, setMots] = useState(0);

  let bilan: string;
  if (mots === 0) bilan = `${min} à ${max} mots demandés.`;
  else if (mots < min)
    bilan = `Encore ${min - mots} mot${min - mots > 1 ? "s" : ""} pour arriver à ${min}.`;
  else if (mots > max)
    bilan = `${mots - max} mot${mots - max > 1 ? "s" : ""} de trop : ${max} au maximum.`;
  else bilan = `Dans la longueur demandée, ${min} à ${max}.`;

  return (
    <>
      <textarea
        className="redaction"
        aria-label={libelle}
        placeholder={placeholder}
        onChange={(event) => setMots(compterMots(event.target.value))}
      />
      <p className={styles.compte}>
        <strong>
          {mots} mot{mots > 1 ? "s" : ""}
        </strong>{" "}
        · {bilan}
      </p>
    </>
  );
}
