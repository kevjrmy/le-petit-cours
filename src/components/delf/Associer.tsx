"use client";

import { useRef, useState, type ReactNode } from "react";
import { cleDe, useCopie } from "./Copie";
import styles from "./Associer.module.css";

/** Mouvement, en pixels CSS, avant que le fantôme apparaisse. */
const SEUIL = 6;
/** Distance entre l'appui et le relâchement sous laquelle un geste est un
 *  toucher, quoi qu'il ait fait entre les deux (`exercise-author.md`). */
const TOUCHER = 12;

export interface DocumentAssocie {
  lettre: string;
  texte: string;
  /** Rendu par le serveur et passé tel quel : une photo, un pictogramme. */
  image?: ReactNode;
}

type Zone = number | "reserve";

/**
 * Associer des phrases à des documents, en les glissant (#82).
 *
 * **Les phrases sont des pastilles, les documents des cibles.** C'est la même
 * question que « quelle lettre pour cette phrase ? », posée comme on la pose
 * sur la feuille : on regarde les panneaux, et on y met les phrases. La
 * réponse est rangée dans la `<Copie>` sous la même clé qu'une case cochée,
 * donc la note du bas la compte sans rien savoir de ce mécanisme.
 *
 * **Glisser s'ajoute au clic, il ne le remplace pas** (`exercise-author.md`).
 * Toucher une pastille la choisit, toucher un panneau l'y pose, toucher la
 * réserve l'y remet : un clavier, un lecteur d'écran et un pouce qui a raté sa
 * cible ont tous ce chemin. Événements de pointeur et non l'API HTML de
 * glisser-déposer, qui ne se déclenche pas au doigt.
 *
 * **Un panneau peut recevoir plusieurs phrases**, comme une lettre peut être
 * écrite deux fois sur le papier : l'empêcher dirait déjà qu'une réponse est
 * fausse.
 */
export function Associer({
  groupe,
  documents,
}: {
  groupe: string;
  documents: DocumentAssocie[];
}) {
  const { copie, reponses, corrigee, poser } = useCopie();
  const phrases = copie.questions.filter((q) => q.groupe === groupe);

  const [choisie, setChoisie] = useState<string | null>(null);
  const [glisse, setGlisse] = useState<{
    id: string;
    x: number;
    y: number;
    sur: Zone | null;
  } | null>(null);
  const geste = useRef<{
    id: string;
    x: number;
    y: number;
    bouge: boolean;
  } | null>(null);
  const zones = useRef<Map<Zone, HTMLElement>>(new Map());

  const ou = (id: string): number | undefined => reponses[cleDe(id, 0)];

  function zoneA(x: number, y: number): Zone | null {
    for (const [nom, element] of zones.current) {
      const r = element.getBoundingClientRect();
      if (x >= r.left && x <= r.right && y >= r.top && y <= r.bottom)
        return nom;
    }
    return null;
  }

  function mettre(id: string, zone: Zone) {
    poser(cleDe(id, 0), zone === "reserve" ? null : zone);
    setChoisie(null);
  }

  function pastille(id: string) {
    const phrase = phrases.find((p) => p.id === id)!;
    const place = ou(id);
    const juste = place === phrase.parties[0].reponse;

    let etat = "";
    let marque = "";
    if (corrigee && place === undefined) [etat, marque] = ["is-missed", "+ "];
    else if (corrigee && juste) [etat, marque] = ["is-correct", "✓ "];
    else if (corrigee) [etat, marque] = ["is-wrong", "✗ "];

    return (
      <button
        key={id}
        type="button"
        className={[
          styles.pastille,
          choisie === id ? styles.choisie : "",
          glisse?.id === id ? styles.enCours : "",
          etat,
        ].join(" ")}
        aria-pressed={choisie === id}
        aria-disabled={corrigee || undefined}
        onPointerDown={(event) => {
          if (corrigee || !event.isPrimary) return;
          geste.current = {
            id,
            x: event.clientX,
            y: event.clientY,
            bouge: false,
          };
          event.currentTarget.setPointerCapture(event.pointerId);
        }}
        onPointerMove={(event) => {
          const g = geste.current;
          if (!g) return;
          if (
            !g.bouge &&
            Math.hypot(event.clientX - g.x, event.clientY - g.y) <= SEUIL
          )
            return;
          g.bouge = true;
          setGlisse({
            id,
            x: event.clientX,
            y: event.clientY,
            sur: zoneA(event.clientX, event.clientY),
          });
        }}
        onPointerUp={(event) => {
          const g = geste.current;
          geste.current = null;
          if (!g) return;
          setGlisse(null);
          if (Math.hypot(event.clientX - g.x, event.clientY - g.y) <= TOUCHER) {
            setChoisie((avant) => (avant === id ? null : id));
            return;
          }
          const cible = zoneA(event.clientX, event.clientY);
          /* Lâchée sur rien : elle reste où elle était. */
          if (cible !== null) mettre(id, cible);
        }}
        onPointerCancel={() => {
          geste.current = null;
          setGlisse(null);
        }}
        onClick={(event) => {
          /* Clavier seulement : Entrée ou Espace donnent un clic sans
             événement de pointeur, avec `detail === 0`. */
          if (event.detail === 0 && !corrigee)
            setChoisie((avant) => (avant === id ? null : id));
        }}
      >
        {marque}
        {phrase.enonce}
        <span className="visually-hidden">
          {place === undefined
            ? " — pas encore posée"
            : ` — sur le panneau ${documents[place].lettre}`}
        </span>
      </button>
    );
  }

  const enReserve = phrases.filter((p) => ou(p.id) === undefined);

  return (
    <>
      <div
        ref={(element) => {
          if (element) zones.current.set("reserve", element);
          else zones.current.delete("reserve");
        }}
        className={[
          styles.reserve,
          glisse?.sur === "reserve" ? styles.survol : "",
        ].join(" ")}
      >
        {enReserve.length === 0 ? (
          <span className={styles.vide}>Toutes les phrases sont posées.</span>
        ) : (
          enReserve.map((p) => pastille(p.id))
        )}
        {/* Le chemin sans glisser pour reprendre une phrase déjà posée. */}
        {choisie && ou(choisie) !== undefined && (
          <button
            type="button"
            className="button"
            onClick={() => mettre(choisie, "reserve")}
          >
            Remettre dans la réserve
          </button>
        )}
      </div>

      <ul className="documents illustres">
        {documents.map((document, index) => (
          <li
            key={document.lettre}
            className={glisse?.sur === index ? styles.survol : undefined}
          >
            <button
              ref={(element) => {
                if (element) zones.current.set(index, element);
                else zones.current.delete(index);
              }}
              type="button"
              className={styles.face}
              aria-disabled={corrigee || !choisie || undefined}
              onClick={() => choisie && mettre(choisie, index)}
            >
              {document.image}
              <span>{document.texte}</span>
              <span className="lettre">{document.lettre}</span>
              {choisie && (
                <span className="visually-hidden">
                  {" "}
                  — poser la phrase choisie ici
                </span>
              )}
            </button>
            <div className={styles.posees}>
              {phrases
                .filter((p) => ou(p.id) === index)
                .map((p) => pastille(p.id))}
            </div>
          </li>
        ))}
      </ul>

      {corrigee && (
        <ol className={styles.corrections}>
          {phrases.map((p) => (
            <li key={p.id}>
              <strong>{p.enonce}</strong> {p.pourquoi}
            </li>
          ))}
        </ol>
      )}

      {glisse && (
        <span
          className={styles.fantome}
          style={{ left: glisse.x, top: glisse.y }}
          aria-hidden="true"
        >
          {phrases.find((p) => p.id === glisse.id)?.enonce}
        </span>
      )}
    </>
  );
}
