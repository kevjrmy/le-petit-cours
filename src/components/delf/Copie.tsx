"use client";

import { createContext, use, useState, type ReactNode } from "react";
import { T } from "@/components/lang/T";
import { enPoints, pointsDe, type CopieEpreuve } from "./copie-data";
import styles from "./Copie.module.css";

/**
 * La copie d'une épreuve de compréhension : corrigée une fois, à la fin, et
 * gardée nulle part (#82).
 *
 * **Une seule note, et seulement quand on la demande.** Rien ne s'affiche
 * pendant qu'on répond, parce qu'une épreuve se passe en conditions réelles :
 * un ✓ à la première question dit déjà quelque chose de la deuxième.
 * « Corriger ma copie » marque tout d'un coup, et c'est tout.
 *
 * **Un fournisseur autour de l'épreuve, pas une page cliente.** Les documents,
 * les consignes et les titres restent rendus par le serveur et passent ici en
 * `children` (`AGENTS.md` §4) ; seuls `<Questions>` et `<Correction>` lisent le
 * contexte. C'est ce qui laisse un article de presse au milieu de l'exercice 3
 * sans que ses questions et la note du bas perdent le fil.
 *
 * **Rien n'est enregistré, et rien ne coche la leçon** (#2). La note vit dans
 * cet état et disparaît au rechargement.
 *
 * **Questions et propositions en français, mécanique dans les deux langues**
 * (#102) : un DELF se passe en français, mais le bouton, la note et ce qu'elle
 * dit suivent la langue de l'interface, par `<T>`.
 */

type Reponses = Record<string, number>;

interface ContexteCopie {
  copie: CopieEpreuve;
  reponses: Reponses;
  corrigee: boolean;
  choisir: (cle: string, option: number) => void;
  /** Pose une réponse, ou l'efface avec `null` : pour un exercice où l'on
   *  déplace quelque chose plutôt que de cocher (`Associer`). */
  poser: (cle: string, option: number | null) => void;
  corriger: () => void;
  recommencer: () => void;
}

const Contexte = createContext<ContexteCopie | null>(null);

export function useCopie() {
  const contexte = use(Contexte);
  if (!contexte)
    throw new Error("<Questions> et <Correction> vont dans une <Copie>");
  return contexte;
}

export const cleDe = (id: string, partie: number) => `${id}/${partie}`;

export function Copie({
  copie,
  children,
}: {
  copie: CopieEpreuve;
  children: ReactNode;
}) {
  const [reponses, setReponses] = useState<Reponses>({});
  const [corrigee, setCorrigee] = useState(false);

  const contexte: ContexteCopie = {
    copie,
    reponses,
    corrigee,
    /* Recliquer la proposition choisie la retire : on doit pouvoir rendre une
       question blanche, comme on efface une croix sur le papier. */
    choisir: (cle, option) => {
      if (corrigee) return;
      setReponses((avant) => {
        const apres = { ...avant };
        if (apres[cle] === option) delete apres[cle];
        else apres[cle] = option;
        return apres;
      });
    },
    poser: (cle, option) => {
      if (corrigee) return;
      setReponses((avant) => {
        const apres = { ...avant };
        if (option === null) delete apres[cle];
        else apres[cle] = option;
        return apres;
      });
    },
    corriger: () => setCorrigee(true),
    recommencer: () => {
      setReponses({});
      setCorrigee(false);
    },
  };

  return <Contexte value={contexte}>{children}</Contexte>;
}

/** Les questions d'un groupe, à l'endroit de la page où elles se posent. */
export function Questions({ groupe }: { groupe: string }) {
  const { copie, reponses, corrigee, choisir } = useCopie();
  const questions = copie.questions.filter((q) => q.groupe === groupe);

  return (
    <ol className="questions">
      {questions.map((question) => (
        <li key={question.id}>
          <span className="enonce">
            <span>{question.enonce}</span>
            <span className="points">
              {/* L'espagnol met au pluriel tout ce qui n'est pas 1 :
                  « 0,5 puntos ». */}
              <T
                fr={`${enPoints(pointsDe(question))} point${pointsDe(question) > 1 ? "s" : ""}`}
                es={`${enPoints(pointsDe(question))} punto${pointsDe(question) === 1 ? "" : "s"}`}
              />
            </span>
          </span>

          {question.parties.map((partie, indice) => {
            const cle = cleDe(question.id, indice);
            const choisie = reponses[cle];

            return (
              <div key={cle} className={styles.partie}>
                {partie.consigne && (
                  <p className={styles.consigne}>{partie.consigne}</p>
                )}

                <div
                  role="group"
                  aria-label={partie.consigne ?? question.enonce}
                  className={styles.options}
                >
                  {partie.options.map((option, position) => {
                    const juste = position === partie.reponse;
                    const prise = position === choisie;

                    /* Trois états une fois corrigée, et le troisième est
                       l'ambre (`AGENTS.md` §5) : la bonne réponse qu'on n'a pas
                       donnée est un oubli, pas une faute. Chacun porte sa
                       marque, pour ne jamais dire la chose par la couleur seule. */
                    let etat = "";
                    let marque = "";
                    if (corrigee && prise && juste)
                      [etat, marque] = ["is-correct", "✓ "];
                    else if (corrigee && prise)
                      [etat, marque] = ["is-wrong", "✗ "];
                    else if (corrigee && juste)
                      [etat, marque] = ["is-missed", "+ "];

                    return (
                      <button
                        key={option}
                        type="button"
                        className={[
                          "button",
                          styles.option,
                          !corrigee && prise ? "is-chosen" : "",
                          etat,
                        ].join(" ")}
                        aria-pressed={prise}
                        /* `aria-disabled` et pas `disabled` : un bouton
                           désactivé passe à mi-opacité, et c'est justement
                           la copie corrigée qu'on veut lire. */
                        aria-disabled={corrigee || undefined}
                        onClick={() => choisir(cle, position)}
                      >
                        {marque}
                        {option}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}

          {corrigee && question.pourquoi && (
            <p className={styles.pourquoi}>{question.pourquoi}</p>
          )}
        </li>
      ))}
    </ol>
  );
}

/**
 * Le bouton qui corrige, puis la note : par exercice, et sur le total de
 * l'épreuve, 25 partout sauf sur le spécimen de `/design`.
 * `children` s'affiche sous la note une fois la copie corrigée.
 */
export function Correction({ children }: { children?: ReactNode }) {
  const { copie, reponses, corrigee, corriger, recommencer } = useCopie();

  const parties = copie.questions.flatMap((q) =>
    q.parties.map((partie, indice) => ({
      exercice: q.exercice,
      partie,
      reponse: reponses[cleDe(q.id, indice)],
    })),
  );
  const sansReponse = parties.filter((p) => p.reponse === undefined).length;
  const noteDe = (exercice?: number) =>
    parties
      .filter((p) => exercice === undefined || p.exercice === exercice)
      .reduce(
        (t, p) => t + (p.reponse === p.partie.reponse ? p.partie.points : 0),
        0,
      );

  if (!corrigee) {
    return (
      <div className={styles.corriger}>
        <button
          type="button"
          className="button button-primary"
          onClick={corriger}
        >
          <T fr="Corriger ma copie" es="Corregir mi examen" />
        </button>
        <p className={styles.reste}>
          {sansReponse === 0 ? (
            <T
              fr="Toutes les réponses sont données."
              es="Has respondido a todas las preguntas."
            />
          ) : (
            <T
              fr={`${sansReponse} réponse${sansReponse > 1 ? "s" : ""} sans croix : ${sansReponse > 1 ? "elles comptent" : "elle compte"} zéro.`}
              es={`${sansReponse} pregunta${sansReponse > 1 ? "s" : ""} sin marcar: ${sansReponse > 1 ? "cuentan" : "cuenta"} cero.`}
            />
          )}
        </p>
      </div>
    );
  }

  const note = noteDe();
  const total = copie.exercices.reduce((t, e) => t + e.points, 0);

  return (
    <div className="corrige" role="status">
      <h3>
        <T
          fr={`Votre note : ${enPoints(note)} sur ${enPoints(total)}`}
          es={`Tu nota: ${enPoints(note)} de ${enPoints(total)}`}
        />
      </h3>
      <ul className={styles.detail}>
        {copie.exercices.map(({ numero, points }) => (
          <li key={numero}>
            <T
              fr={`Exercice ${numero} : ${enPoints(noteDe(numero))} sur ${points}`}
              es={`Ejercicio ${numero}: ${enPoints(noteDe(numero))} de ${points}`}
            />
          </li>
        ))}
      </ul>
      <p data-ui="fr">
        Dans la copie, ✓ marque une bonne réponse, ✗ une mauvaise, et + la bonne
        réponse que vous n’avez pas donnée.{" "}
        {total === 25 &&
          (note >= 5
            ? "Vous avez les 5 points qu’il faut au minimum dans chaque épreuve."
            : "Il faut au moins 5 points sur 25 dans chaque épreuve : celle-ci ne les a pas.")}
      </p>
      <p data-ui="es" lang="es">
        En el examen, ✓ marca una respuesta correcta, ✗ una incorrecta, y + la
        respuesta correcta que no diste.{" "}
        {total === 25 &&
          (note >= 5
            ? "Tienes los 5 puntos mínimos que se exigen en cada prueba."
            : "Hacen falta al menos 5 puntos de 25 en cada prueba, y en esta no los tienes.")}
      </p>
      {children}
      <p>
        <button type="button" className="button" onClick={recommencer}>
          <T fr="Recommencer" es="Empezar de nuevo" />
        </button>
      </p>
    </div>
  );
}
