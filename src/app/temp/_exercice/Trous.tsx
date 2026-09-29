"use client";

import { useEffect, useRef, useState } from "react";
import { Instructions } from "@/components/exercice/Drill";
import { Bilan } from "./Bilan";
import styles from "./Trous.module.css";

/** Un trou : la forme juste, celle que la copie portait, et deux pièges. */
export interface Trou {
  juste: string;
  copie: string;
  pieges: [string, string];
}

/** Un paragraphe est une suite de texte et de trous. */
export type Morceau = string | Trou;

/**
 * Un texte à trous où l'élève corrige sa propre copie (#80).
 *
 * **On touche un trou, un petit menu s'ouvre sous lui avec quatre formes** :
 * la juste, celle que la copie portait et deux pièges, dans l'ordre
 * alphabétique, qui ne dit rien de laquelle est laquelle. Choisir remplit le trou et ferme le menu ;
 * toucher le mot à nouveau rouvre le menu pour changer d'avis. Un seul menu
 * ouvert à la fois ; Échap ou un toucher ailleurs le ferment.
 *
 * **La correction arrive d'un coup, à la fin** : corriger trou par trou
 * donnerait la réponse du suivant. Rien n'est enregistré (#2, #80).
 */
export function Trous({
  texte,
  consigne,
}: {
  texte: Morceau[][];
  consigne: string;
}) {
  const trous: Trou[] = texte.flat().filter((m): m is Trou => typeof m !== "string");
  /* Le numéro de chaque trou, dans l'ordre de lecture. */
  const numeros = texte.map((paragraphe, p) =>
    paragraphe.map(
      (_, m) =>
        texte.slice(0, p).flat().filter((x) => typeof x !== "string").length +
        paragraphe.slice(0, m).filter((x) => typeof x !== "string").length,
    ),
  );

  const [choix, setChoix] = useState<Record<number, string>>({});
  const [ouvert, setOuvert] = useState<number | null>(null);
  const [corrigee, setCorrigee] = useState(false);
  const menu = useRef<HTMLSpanElement>(null);
  const boutons = useRef<Map<number, HTMLButtonElement>>(new Map());

  const score = trous.filter((t, i) => choix[i] === t.juste).length;

  /* Menu ouvert : le premier choix prend le focus, Échap et un toucher
     ailleurs le ferment. */
  useEffect(() => {
    if (ouvert === null) return;
    const trou = ouvert;
    menu.current?.querySelector("button")?.focus();

    function dehors(event: PointerEvent) {
      const cible = event.target as Node;
      if (menu.current?.contains(cible)) return;
      if (boutons.current.get(trou)?.contains(cible)) return;
      setOuvert(null);
    }
    function echap(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      boutons.current.get(trou)?.focus();
      setOuvert(null);
    }
    document.addEventListener("pointerdown", dehors);
    document.addEventListener("keydown", echap);
    return () => {
      document.removeEventListener("pointerdown", dehors);
      document.removeEventListener("keydown", echap);
    };
  }, [ouvert]);

  function choisir(trou: number, mot: string) {
    setChoix((avant) => ({ ...avant, [trou]: mot }));
    setOuvert(null);
    boutons.current.get(trou)?.focus();
  }

  function recommencer() {
    setChoix({});
    setOuvert(null);
    setCorrigee(false);
  }

  return (
    <>
      <Instructions>{consigne}</Instructions>

      <div className={styles.texte}>
        {texte.map((paragraphe, p) => (
          <p key={p}>
            {paragraphe.map((morceau, m) => {
              if (typeof morceau === "string") return <span key={m}>{morceau}</span>;
              const trou = numeros[p][m];
              const mot = choix[trou];
              const juste = mot === morceau.juste;
              const etat = !corrigee ? "" : !mot ? "is-missed" : juste ? "is-correct" : "is-wrong";
              const marque = !corrigee ? "" : !mot ? "+ " : juste ? "✓ " : "✗ ";
              const options = [morceau.juste, morceau.copie, ...morceau.pieges].sort((a, b) =>
                a.localeCompare(b, "fr"),
              );

              return (
                <span key={m} className={styles.place}>
                  <button
                    ref={(element) => {
                      if (element) boutons.current.set(trou, element);
                      else boutons.current.delete(trou);
                    }}
                    type="button"
                    className={[
                      styles.trou,
                      mot ? styles.rempli : "",
                      ouvert === trou ? styles.actif : "",
                      etat,
                    ].join(" ")}
                    aria-haspopup="true"
                    aria-expanded={ouvert === trou}
                    aria-label={`Trou ${trou + 1} : ${mot ?? "vide"}`}
                    aria-disabled={corrigee || undefined}
                    onClick={() => {
                      if (!corrigee) setOuvert((avant) => (avant === trou ? null : trou));
                    }}
                  >
                    {marque}
                    {mot ?? "……"}
                  </button>

                  {ouvert === trou && (
                    <span
                      ref={menu}
                      className={styles.menu}
                      role="group"
                      aria-label={`Choix pour le trou ${trou + 1}`}
                    >
                      {options.map((option) => (
                        <button
                          key={option}
                          type="button"
                          className={`${styles.option} ${mot === option ? styles.pris : ""}`}
                          aria-pressed={mot === option}
                          onClick={() => choisir(trou, option)}
                        >
                          {option}
                        </button>
                      ))}
                    </span>
                  )}

                  {corrigee && !juste && (
                    <span className={styles.attendu}>{morceau.juste}</span>
                  )}
                </span>
              );
            })}
          </p>
        ))}
      </div>

      {!corrigee ? (
        <div className={styles.actions}>
          <button
            type="button"
            className="button button-primary"
            onClick={() => {
              setOuvert(null);
              setCorrigee(true);
            }}
            disabled={Object.keys(choix).length === 0}
          >
            Corriger
          </button>
        </div>
      ) : (
        <Bilan
          score={score}
          total={trous.length}
          onRestart={recommencer}
          message={
            score === trous.length
              ? "Tout est juste : tu as corrigé ta copie toi-même."
              : "Chaque mot marqué ✗ a sa bonne forme juste à côté. On en parle dans la partie suivante."
          }
        />
      )}
    </>
  );
}
