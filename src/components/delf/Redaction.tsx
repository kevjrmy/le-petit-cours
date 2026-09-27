"use client";

import { createContext, use, useState, type ReactNode } from "react";
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

/**
 * Une copie à rendre : les champs d'une épreuve, et le fichier qu'on en tire
 * (#84).
 *
 * **Rendre, c'est télécharger, et rien d'autre.** Le texte ne part nulle part :
 * le navigateur écrit un fichier, que le candidat envoie à la personne qui
 * corrige, et qu'elle supprime une fois lu. Pas de serveur, pas de table, rien
 * sur le compte (#31), et cela marche hors ligne.
 *
 * **Une copie rendue ne se modifie plus**, comme une feuille ramassée : les
 * champs passent en lecture seule, et seul le téléchargement se refait. Un
 * rechargement de la page rend une copie vierge, puisque rien n'est gardé.
 */
/** Un texte de la copie, dans l'ordre du sujet : le fichier les suit, même
 *  si le candidat commence par le second ou n'écrit jamais le premier. */
interface Exercice {
  id: string;
  titre: string;
}

interface ContexteCopieEcrite {
  textes: Record<string, string>;
  vide: boolean;
  rendue: Date | null;
  ecrire: (id: string, texte: string) => void;
  rendre: () => void;
}

const Contexte = createContext<ContexteCopieEcrite | null>(null);

export function CopieEcrite({
  epreuve,
  exercices,
  children,
}: {
  epreuve: string;
  exercices: Exercice[];
  children: ReactNode;
}) {
  const [textes, setTextes] = useState<Record<string, string>>({});
  const [rendue, setRendue] = useState<Date | null>(null);

  const rendre = () => {
    const date = rendue ?? new Date();
    if (!rendue) setRendue(date);
    telecharger(
      epreuve,
      date,
      exercices.map(({ id, titre }) => ({ titre, texte: textes[id] ?? "" })),
    );
  };

  return (
    <Contexte
      value={{
        textes,
        vide: exercices.every(({ id }) => !(textes[id] ?? "").trim()),
        rendue,
        ecrire: (id, texte) =>
          setTextes((avant) => ({ ...avant, [id]: texte })),
        rendre,
      }}
    >
      {children}
    </Contexte>
  );
}

const heure = (date: Date) =>
  date
    .toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })
    .replace(":", " h ");

function telecharger(
  epreuve: string,
  date: Date,
  champs: { titre: string; texte: string }[],
) {
  const jour = date.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const contenu = [
    epreuve,
    `Copie rendue le ${jour} à ${heure(date)}`,
    ...champs.map(({ titre, texte }) => {
      const mots = compterMots(texte);
      return `\n${titre} · ${mots} mot${mots > 1 ? "s" : ""}\n\n${texte.trim() || "(rien d’écrit)"}`;
    }),
    "",
  ].join("\n");

  const pad = (n: number) => String(n).padStart(2, "0");
  const nom = `${epreuve
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(
      /^-|-$/g,
      "",
    )}-${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}-${pad(date.getHours())}h${pad(date.getMinutes())}.txt`;

  /* Le BOM dit « UTF-8 » aux éditeurs qui devinent mal : sans lui, un Bloc-notes
     ancien montre « Ã© » à la place de « é », sur une copie qui parle d'accents. */
  const url = URL.createObjectURL(
    new Blob(["﻿", contenu], { type: "text/plain;charset=utf-8" }),
  );
  const lien = document.createElement("a");
  lien.href = url;
  lien.download = nom;
  lien.click();
  URL.revokeObjectURL(url);
}

export function Redaction({
  id,
  min,
  max,
  libelle,
  placeholder,
}: {
  /** L'`id` d'un des `exercices` de la `<CopieEcrite>` autour, s'il y en a une. */
  id?: string;
  min: number;
  max: number;
  libelle: string;
  placeholder?: string;
}) {
  const copie = use(Contexte);
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
        readOnly={copie?.rendue != null}
        onChange={(event) => {
          setMots(compterMots(event.target.value));
          if (copie && id) copie.ecrire(id, event.target.value);
        }}
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

/** Le bouton qui ramasse la copie, et ce qu'il faut en faire ensuite. */
export function Rendre() {
  const copie = use(Contexte);
  if (!copie) throw new Error("<Rendre> va dans une <CopieEcrite>");

  if (!copie.rendue) {
    return (
      <div className={styles.rendre}>
        <button
          type="button"
          className="button button-primary"
          onClick={copie.rendre}
          disabled={copie.vide}
        >
          Rendre ma copie
        </button>
        <p className={styles.aide}>
          {copie.vide
            ? "Écrivez d’abord vos textes."
            : "Vos deux textes sont enregistrés dans un fichier, sur cet appareil. Ensuite, on ne peut plus les modifier."}
        </p>
      </div>
    );
  }

  return (
    <div className="card" role="status">
      <p>
        <strong>Copie rendue à {heure(copie.rendue)}.</strong> Le fichier est
        dans vos téléchargements : envoyez-le à la personne qui corrige. Il
        n’est enregistré nulle part ailleurs.
      </p>
      <p>
        <button type="button" className="button" onClick={copie.rendre}>
          Télécharger encore le fichier
        </button>
      </p>
    </div>
  );
}
