import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";
import atelier from "../_texte/Page.module.css";
import { Trous } from "../_exercice/Trous";
import { TEXTE } from "./exercice";

const PATH = "/temp/un-resume-de-roman";

export const metadata = lessonMetadata(PATH);

/* Page d'atelier (#80) : un résumé de roman rendu cette semaine. L'élève
   corrige d'abord sa copie lui-même, puis une explication courte range ses
   douze fautes en quatre familles. La suite de la séance se fait à l'oral,
   sans la page. Elle tutoie l'élève qui la lit (#80).

   **Anonyme** (`AGENTS.md` §9b) : rien ne dit qui a écrit le texte. Les noms
   sont ceux des personnages du roman. */
export default function Page() {
  return (
    <article className={`prose ${atelier.page}`}>
      <PageHeader path={PATH} />

      <section>
        <h2>1. Corrige ta copie</h2>

        <p>
          Voici ton résumé. Presque tout est déjà corrigé, sauf douze endroits.
          Pour chaque trou, quatre formes : celle que tu avais écrite, la
          bonne, et deux pièges. À toi de trouver la bonne.
        </p>

        <Trous
          texte={TEXTE}
          consigne="Clique sur un trou et choisis la bonne forme. Pour changer d’avis, clique de nouveau sur le mot."
        />
      </section>

      <section>
        <h2>2. Ce qu’il fallait voir</h2>

        <p>
          Douze fautes, mais seulement quatre familles. Si tu connais les
          quatre, tu les verras toutes à la prochaine relecture.
        </p>

        <div className="table-wrap">
          <table>
            <caption>Les douze corrections, en quatre familles</caption>
            <thead>
              <tr>
                <th scope="col">La famille</th>
                <th scope="col">Dans ta copie</th>
                <th scope="col">En une phrase</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">L’espagnol sous le français</th>
                <td className="fr">
                  introduction · l’appelle · l’a demandée · jusqu’au jour où
                </td>
                <td>
                  Les mots sont français, la tournure est espagnole. Un seul c
                  dans <span className="fr">introduction</span> ; on appelle et
                  on demande <em>quelqu’un</em>, sans « lui » ni « pour » ; et
                  on écrit <span className="fr">jusqu’au jour où</span>, jamais{" "}
                  <span className="fr">jusqu’à qu’un jour</span>.
                </td>
              </tr>
              <tr>
                <th scope="row">L’accord</th>
                <td className="fr">
                  une fille nommée · l’introduction est finie · quelques
                  semaines · elles
                </td>
                <td>
                  Une fille, une introduction, deux amies : le mot suit qui il
                  décrit, au féminin et au pluriel.
                </td>
              </tr>
              <tr>
                <th scope="row">Le passé</th>
                <td className="fr">
                  elle a connu · ils sont sortis · après avoir emmené
                </td>
                <td>
                  Un résumé se raconte au présent ; ce qui s’est passé avant se
                  dit au passé composé. Et derrière{" "}
                  <span className="fr">après</span>, c’est{" "}
                  <span className="fr">avoir</span> et le participe.
                </td>
              </tr>
              <tr>
                <th scope="row">se ou ce</th>
                <td className="fr">elles doivent se voir</td>
                <td>
                  Devant un verbe, c’est <span className="fr">se</span> :{" "}
                  <span className="fr">se voir</span>,{" "}
                  <span className="fr">se retrouver</span>. Devant un nom, c’est{" "}
                  <span className="fr">ce</span> :{" "}
                  <span className="fr">ce livre</span>.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </article>
  );
}
