"use client";

import { createContext, use, useState, type ReactNode } from "react";
import { T } from "@/components/lang/T";
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
 *
 * Le compte est dit dans les deux langues (#102) ; `libelle` et `placeholder`
 * viennent de l'épreuve et restent en français.
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
 *
 * **Le fichier est en français, quelle que soit la langue de l'interface**
 * (#102) : il part chez la personne qui corrige un DELF, qui se passe en
 * français. Seuls les messages à l'écran sont dans les deux langues.
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

/** L'heure à l'espagnole, pour l'écran : « 14:05 ». */
const hora = (date: Date) =>
  date.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" });

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

  /* Chaque langue a sa phrase entière, et son pluriel : « 0 mot » en
     français, « 0 palabras » en espagnol. */
  const manque = min - mots;
  const trop = mots - max;
  let bilan: { fr: string; es: string };
  if (mots === 0)
    bilan = {
      fr: `${min} à ${max} mots demandés.`,
      es: `Se piden de ${min} a ${max} palabras.`,
    };
  else if (mots < min)
    bilan = {
      fr: `Encore ${manque} mot${manque > 1 ? "s" : ""} pour arriver à ${min}.`,
      es: `${manque > 1 ? "Faltan" : "Falta"} ${manque} palabra${manque > 1 ? "s" : ""} para llegar a ${min}.`,
    };
  else if (mots > max)
    bilan = {
      fr: `${trop} mot${trop > 1 ? "s" : ""} de trop : ${max} au maximum.`,
      es: `${trop} palabra${trop > 1 ? "s" : ""} de más: ${max} como máximo.`,
    };
  else
    bilan = {
      fr: `Dans la longueur demandée, ${min} à ${max}.`,
      es: `Dentro de la longitud pedida, de ${min} a ${max}.`,
    };

  return (
    <>
      <textarea
        className="input"
        rows={6}
        aria-label={libelle}
        placeholder={placeholder}
        readOnly={copie?.rendue != null}
        onChange={(event) => {
          setMots(compterMots(event.target.value));
          if (copie && id) copie.ecrire(id, event.target.value);
        }}
      />
      <p className={styles.compte}>
        <T
          fr={
            <>
              <strong>
                {mots} mot{mots > 1 ? "s" : ""}
              </strong>{" "}
              · {bilan.fr}
            </>
          }
          es={
            <>
              <strong>
                {mots} palabra{mots === 1 ? "" : "s"}
              </strong>{" "}
              · {bilan.es}
            </>
          }
        />
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
          <T fr="Rendre ma copie" es="Entregar mi examen" />
        </button>
        <p className={styles.aide}>
          {copie.vide ? (
            <T
              fr="Écrivez d’abord vos textes."
              es="Escribe primero tus textos."
            />
          ) : (
            <T
              fr="Vos deux textes sont enregistrés dans un fichier, sur cet appareil. Ensuite, on ne peut plus les modifier."
              es="Tus dos textos se guardan en un archivo, en este dispositivo. Después ya no se pueden modificar."
            />
          )}
        </p>
      </div>
    );
  }

  return (
    <div className="card" role="status">
      <p data-ui="fr">
        <strong>Copie rendue à {heure(copie.rendue)}.</strong> Le fichier est
        dans vos téléchargements : envoyez-le à la personne qui corrige. Il
        n’est enregistré nulle part ailleurs.
      </p>
      <p data-ui="es" lang="es">
        <strong>Examen entregado a las {hora(copie.rendue)}.</strong> El
        archivo está en tus descargas: envíaselo a la persona que corrige. No se
        guarda en ningún otro sitio.
      </p>
      <p>
        <button type="button" className="button" onClick={copie.rendre}>
          <T
            fr="Télécharger encore le fichier"
            es="Volver a descargar el archivo"
          />
        </button>
      </p>
    </div>
  );
}
