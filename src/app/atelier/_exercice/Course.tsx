"use client";

import { useState } from "react";
import { Instructions, Meter } from "@/components/exercice/Drill";
import board from "@/components/exercice/Board.module.css";
import choix from "./Choix.module.css";
import ordre from "./Ordre.module.css";
import styles from "./Course.module.css";

/**
 * « La course » — un jeu d'atelier (#80) : reconstruire un compte rendu
 * morceau par morceau, et corriger chaque morceau en le plaçant.
 *
 * **Un tour, deux étapes.** La grille de départ : les morceaux qui restent,
 * dans le désordre, et l'élève touche celui qui vient maintenant. Puis l'arrêt
 * au stand : le morceau placé, écrit avec ses fautes, et le nombre de fautes
 * qu'il contient. L'élève touche le mot fautif, puis choisit la bonne forme
 * parmi trois. Il se corrige lui-même, sans rien taper (`AGENTS.md` §1).
 *
 * **Chaque erreur coûte cinq secondes** : un morceau pris trop tôt, un mot
 * juste touché comme fautif, une mauvaise forme choisie. On peut toujours
 * réessayer ; la course finit toujours. À l'arrivée, les pénalités donnent une
 * place (deux erreurs par place perdue), puis le texte propre, rangé par
 * parties.
 *
 * **Le désordre est écrit dans les données** (`affichage`), comme dans
 * `Ordre.tsx` : la page reste prérendue, et aucun morceau n'est déjà à sa
 * place. **Un seul ordre défendable** : chaque morceau porte son indice (« Au
 * départ », « Au 40e tour », « En conclusion »).
 *
 * Les styles sont ceux des plateaux voisins — le morceau d'`Ordre`, les mots
 * du plateau, les formes de `Choix` — et ce module ne place que le tableau de
 * bord et l'arrivée. Rien n'est enregistré (#2, #80).
 */

export interface Erreur {
  /** L'index du mot fautif dans `mots`. */
  at: number;
  /** Trois formes, dans l'ordre affiché ; la fautive n'en est pas. */
  options: [string, string, string];
  /** Celle qui est juste. Doit être l'une des trois. */
  bonne: string;
  /** La raison, en une phrase. */
  pourquoi: string;
}

export interface Tour {
  /** Sa partie dans le plan : « L’introduction », « Le développement »… */
  partie: string;
  /** Le morceau tel qu'il est écrit, fautes comprises, mot par mot, la
      ponctuation collée au mot qu'elle suit. */
  mots: string[];
  /** Ses fautes, dans l'ordre du texte. Zéro est permis. */
  erreurs: Erreur[];
  /** Ce qui le mettait à sa place, en une phrase. */
  indice: string;
}

type Etape = "grille" | "stand" | "arrivee";

const SECONDES = 5;

/** La place à l'arrivée : P1 sans erreur ou avec une, puis une place perdue
    toutes les deux erreurs. */
function classement(penalites: number) {
  const place = Math.min(20, 1 + Math.floor(penalites / 2));
  const message =
    place === 1
      ? "Victoire ! Tu as reconstruit le texte et vu presque toutes les fautes du premier coup."
      : place <= 3
        ? "Sur le podium. Refais la course : les pièges qui t’ont coûté du temps sont souvent les mêmes."
        : place <= 10
          ? "Dans les points. Relis le texte propre ci-dessous, puis refais la course pour monter sur le podium."
          : "Tu as fini la course, c’est l’essentiel. Relis le texte propre ci-dessous, puis recommence.";
  return { place, message };
}

export function Course({
  tours,
  affichage,
  consigne,
  nom,
}: {
  /** Les morceaux, dans le bon ordre. */
  tours: Tour[];
  /** L'ordre de la grille : des index de `tours`, chacun une fois. */
  affichage: number[];
  /** La consigne, écrite par la page : c'est elle qui sait si elle tutoie. */
  consigne: string;
  /** Le nom du plateau, pour la jauge et les groupes annoncés. */
  nom: string;
}) {
  const [courant, setCourant] = useState(0);
  const [etape, setEtape] = useState<Etape>("grille");
  const [penalites, setPenalites] = useState(0);
  /* Le tour en cours : les fautes corrigées, celle qu'on corrige, et ce qui
     vient de rater, pour le marquer. */
  const [corrigees, setCorrigees] = useState<number[]>([]);
  const [ouverte, setOuverte] = useState<number | null>(null);
  const [rateMorceau, setRateMorceau] = useState<number | null>(null);
  const [rateMot, setRateMot] = useState<number | null>(null);
  const [rateFormes, setRateFormes] = useState<string[]>([]);
  const [message, setMessage] = useState("");

  const tour = tours[courant];
  const pile = affichage.filter((b) => b >= courant);
  const reste = tour.erreurs.length - corrigees.length;
  const boucle = etape === "stand" && reste === 0;
  const erreur = tour.erreurs.find((e) => e.at === ouverte);

  function penalite(texte: string) {
    setPenalites((p) => p + 1);
    setMessage(`Pénalité : +${SECONDES} secondes. ${texte}`);
  }

  function prendre(b: number) {
    if (b !== courant) {
      setRateMorceau(b);
      penalite(
        courant === 0
          ? "Ce morceau ne commence pas le texte : cherche celui qui dit qui, où et quand."
          : "Ce morceau vient plus tard : cherche celui qui suit le dernier placé.",
      );
      return;
    }
    setRateMorceau(null);
    setEtape("stand");
    setMessage(
      tours[b].erreurs.length === 0
        ? "Bien placé, et ce morceau n’a pas de faute."
        : "Bien placé. Arrêt au stand : trouve les fautes.",
    );
  }

  function toucher(at: number) {
    if (boucle || corrigees.includes(at)) return;
    setRateFormes([]);
    if (tour.erreurs.some((e) => e.at === at)) {
      setRateMot(null);
      setOuverte(at);
      setMessage("Bien vu. Choisis la bonne forme.");
      return;
    }
    setOuverte(null);
    setRateMot(at);
    penalite("Ce mot-là est juste.");
  }

  function choisir(forme: string) {
    if (!erreur) return;
    if (forme !== erreur.bonne) {
      setRateFormes((avant) => [...avant, forme]);
      penalite("Ce n’est pas cette forme.");
      return;
    }
    setCorrigees((avant) => [...avant, erreur.at]);
    setOuverte(null);
    setRateFormes([]);
    setMessage(`Corrigé. ${erreur.pourquoi}`);
  }

  function suivant() {
    setCorrigees([]);
    setOuverte(null);
    setRateMot(null);
    setMessage("");
    if (courant + 1 === tours.length) {
      setEtape("arrivee");
      return;
    }
    setCourant((c) => c + 1);
    setEtape("grille");
  }

  function recommencer() {
    setCourant(0);
    setEtape("grille");
    setPenalites(0);
    setCorrigees([]);
    setOuverte(null);
    setRateMorceau(null);
    setRateMot(null);
    setRateFormes([]);
    setMessage("");
  }

  const faits = etape === "arrivee" ? tours.length : courant + (boucle ? 1 : 0);

  return (
    <>
      <Instructions>{consigne}</Instructions>

      <Meter value={faits} max={tours.length} label={`Tours : ${nom}`} />

      <p className={styles.chrono}>
        Pénalités : <strong>+{penalites * SECONDES} s</strong>
      </p>

      {etape === "arrivee" ? (
        <Arrivee tours={tours} penalites={penalites} onRestart={recommencer} />
      ) : (
        <div className={`card ${board.card}`}>
          {courant > 0 && (
            <>
              <p className={ordre.etape}>Ta course</p>
              <div className={styles.course}>
                {tours.slice(0, courant).map((t, i) => (
                  <Propre key={i} tour={t} />
                ))}
              </div>
            </>
          )}

          {etape === "grille" && (
            <>
              <p className={`${ordre.etape} ${courant > 0 ? ordre.suite : ""}`}>
                Grille de départ · tour {courant + 1} :{" "}
                {courant === 0 ? "par quel morceau commence le texte ?" : "quel morceau vient maintenant ?"}
              </p>
              <div
                className={ordre.pile}
                role="group"
                aria-label={`Les morceaux qui restent : ${nom}`}
              >
                {pile.map((b) => (
                  <button
                    key={b}
                    type="button"
                    className={`${ordre.morceau} ${b === rateMorceau ? "is-wrong" : ""}`}
                    onClick={() => prendre(b)}
                  >
                    {b === rateMorceau && <span aria-hidden="true">✗ </span>}
                    {tours[b].mots.join(" ")}
                  </button>
                ))}
              </div>
            </>
          )}

          {etape === "stand" && (
            <>
              <p className={`${ordre.etape} ${courant > 0 ? ordre.suite : ""}`}>
                Arrêt au stand · tour {courant + 1} :{" "}
                {reste === 0
                  ? "tout est corrigé."
                  : reste === 1
                    ? "encore 1 faute à trouver."
                    : `encore ${reste} fautes à trouver.`}
              </p>
              <p
                className={`${board.words} ${board.sentence} ${styles.morceau}`}
                role="group"
                aria-label={`Le morceau à corriger : ${nom}`}
              >
                {tour.mots.map((mot, at) => {
                  const juste = tour.erreurs.find((e) => e.at === at && corrigees.includes(at));
                  const etat = juste
                    ? "is-correct"
                    : at === ouverte
                      ? "is-chosen"
                      : at === rateMot
                        ? "is-missed"
                        : "";
                  return (
                    <button
                      key={at}
                      type="button"
                      className={`${board.word} ${etat}`}
                      onClick={() => toucher(at)}
                      disabled={boucle || Boolean(juste)}
                      aria-pressed={at === ouverte}
                    >
                      {juste ? (
                        <strong>
                          <span aria-hidden="true">✓ </span>
                          {juste.bonne}
                        </strong>
                      ) : (
                        mot
                      )}
                    </button>
                  );
                })}
              </p>

              {erreur && (
                <div
                  className={choix.options}
                  role="group"
                  aria-label={`Les formes pour remplacer « ${tour.mots[erreur.at]} »`}
                >
                  {erreur.options.map((forme) => {
                    const rate = rateFormes.includes(forme);
                    return (
                      <button
                        key={forme}
                        type="button"
                        className={`${choix.option} ${rate ? "is-wrong" : ""}`}
                        onClick={() => choisir(forme)}
                        disabled={rate}
                      >
                        <span className={choix.mark} aria-hidden="true">
                          {rate ? "✗" : ""}
                        </span>
                        {forme}
                      </button>
                    );
                  })}
                </div>
              )}

              {boucle && (
                <p className={styles.indice}>
                  <strong>{tour.partie}.</strong> {tour.indice}
                </p>
              )}
            </>
          )}

          {/* Toujours là, même vide : un lecteur d'écran annonce ce qui
              change dans une région qui existait déjà. */}
          <p className={choix.pourquoi} role="status">
            {message}
          </p>

          {boucle && (
            <div className={board.actions}>
              <button type="button" className="button button-primary" onClick={suivant}>
                {courant + 1 === tours.length ? "Passer la ligne d’arrivée" : "Tour suivant"}
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}

/** Un morceau placé et corrigé : les corrections en gras. */
function Propre({ tour }: { tour: Tour }) {
  return (
    <p className={styles.ligne}>
      {tour.mots.map((mot, at) => {
        const erreur = tour.erreurs.find((e) => e.at === at);
        const espace = at === 0 ? "" : " ";
        return erreur ? (
          <span key={at}>
            {espace}
            <strong>{erreur.bonne}</strong>
          </span>
        ) : (
          <span key={at}>
            {espace}
            {mot}
          </span>
        );
      })}
    </p>
  );
}

/** L'arrivée : la place, puis le texte propre, rangé par parties. */
function Arrivee({
  tours,
  penalites,
  onRestart,
}: {
  tours: Tour[];
  penalites: number;
  onRestart: () => void;
}) {
  const { place, message } = classement(penalites);
  /* Les morceaux qui se suivent dans la même partie font un seul groupe. */
  const parties: { partie: string; tours: Tour[] }[] = [];
  for (const t of tours) {
    const dernier = parties.at(-1);
    if (dernier && dernier.partie === t.partie) dernier.tours.push(t);
    else parties.push({ partie: t.partie, tours: [t] });
  }

  return (
    <div className={`card ${board.card} ${styles.arrivee}`}>
      <p className={styles.place} role="status">
        P{place}
        <span> · +{penalites * SECONDES} s de pénalités</span>
      </p>
      <p>{message}</p>

      <div className={styles.propre}>
        {parties.map((p, i) => (
          <div key={i}>
            <p className={ordre.partie}>{p.partie}</p>
            {p.tours.map((t, i) => (
              <Propre key={i} tour={t} />
            ))}
          </div>
        ))}
      </div>

      <button type="button" className="button" onClick={onRestart}>
        Refaire la course
      </button>
    </div>
  );
}
