import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";
import atelier from "../_texte/Page.module.css";
import { Course } from "../_exercice/Course";
import { AFFICHAGE, TOURS } from "./exercice";

const PATH = "/atelier/le-grand-prix-d-austin";

export const metadata = lessonMetadata(PATH);

/* Page d'atelier (#80) : un jeu. Un compte rendu écrit pour l'atelier, le
   Grand Prix des États-Unis du 25 octobre 2026, dans la langue des copies de
   l'élève et avec ses fautes qui reviennent. L'élève le reconstruit morceau
   par morceau (l'introduction, le développement, la conclusion), et corrige
   chaque morceau en le plaçant (`_exercice/Course.tsx`). Chaque erreur coûte
   cinq secondes ; à l'arrivée, une place.

   Elle reprend le plan de « Le plan d'un texte » (retirée le 3 novembre) sans
   y renvoyer, et les fautes de « Le Grand Prix du Mexique » et de « La
   sorcière du placard aux balais » : elles reviennent ici dans un texte
   nouveau, comme un trou plutôt qu'un plateau (`docs/atelier.md`).

   **Aucun texte d'élève** : le compte rendu est écrit pour la page, et ses
   faits sont sourcés dans `exercice.ts`. Elle tutoie l'élève qui la lit. */
export default function Page() {
  return (
    <article className={`prose ${atelier.page}`}>
      <PageHeader path={PATH} />

      <section>
        <h2>1. Le plan d’un compte rendu</h2>

        <p>
          Un compte rendu a trois parties. Chacune a son travail, et des mots
          qui montrent où on est.
        </p>

        <div className="table-wrap">
          <table>
            <caption>Les trois parties d’un compte rendu</caption>
            <thead>
              <tr>
                <th scope="col">La partie</th>
                <th scope="col">Ce qu’on y met</th>
                <th scope="col">Les mots qui la montrent</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">L’introduction</th>
                <td>Qui, où, quand, et le résultat.</td>
                <td>
                  <span className="fr">Hier, au Mexique, Verstappen a gagné…</span>
                </td>
              </tr>
              <tr>
                <th scope="row">Le développement</th>
                <td>Les faits, dans l’ordre où ils se sont passés.</td>
                <td>
                  <span className="fr">Au départ… Au 10e tour… À la fin…</span>
                </td>
              </tr>
              <tr>
                <th scope="row">La conclusion</th>
                <td>Le bilan, et ton avis.</td>
                <td>
                  <span className="fr">En conclusion… À mon avis…</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2>2. La course</h2>

        <p>
          Voici le compte rendu d’une autre course : le Grand Prix des
          États-Unis, à Austin, le dimanche 25 octobre 2026. Il est coupé en
          six morceaux, mélangés, et il est écrit avec dix fautes.
        </p>

        <ul>
          <li>
            <strong>Grille de départ</strong> : touche le morceau qui vient
            maintenant. Cherche les mots qui montrent sa place.
          </li>
          <li>
            <strong>Arrêt au stand</strong> : le morceau placé te dit combien
            il a de fautes. Touche le mot fautif, puis choisis la bonne forme.
          </li>
          <li>
            <strong>Chaque erreur coûte 5 secondes</strong> : un morceau pris
            trop tôt, un mot juste touché, une mauvaise forme. À l’arrivée,
            tes secondes donnent ta place.
          </li>
        </ul>

        <Course
          tours={TOURS}
          affichage={AFFICHAGE}
          consigne="Six tours : place un morceau, corrige-le, puis le suivant."
          nom="le Grand Prix d’Austin"
        />
      </section>

      <div className="resume">
        <h2>En résumé</h2>
        <ul>
          <li>
            <strong>L’introduction</strong> dit qui, où, quand, et le
            résultat : <span className="fr">dimanche 25 octobre, à Austin</span>.
          </li>
          <li>
            <strong>Le développement</strong> raconte les faits dans l’ordre :{" "}
            <span className="fr">au départ</span>,{" "}
            <span className="fr">au 24e tour</span>,{" "}
            <span className="fr">à sept tours de la fin</span>.
          </li>
          <li>
            <strong>La conclusion</strong> fait le bilan et donne ton avis :{" "}
            <span className="fr">en conclusion</span>.
          </li>
          <li>
            <strong>a ou à</strong> : si tu peux dire{" "}
            <span className="fr">avait</span> à la place, c’est{" "}
            <span className="fr">a</span> (
            <span className="fr">il a gagné</span>,{" "}
            <span className="fr">il avait gagné</span>). Sinon,{" "}
            <span className="fr">à</span> : <span className="fr">à Austin</span>.
          </li>
          <li>
            <strong>Avec être</strong>, regarde le sujet :{" "}
            <span className="fr">Russell est sorti</span>,{" "}
            <span className="fr">ses adversaires se sont arrêtés</span>. Et
            pour dire où on se trouve, c’est être :{" "}
            <span className="fr">il était loin devant</span>.
          </li>
        </ul>
      </div>
    </article>
  );
}
