import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";
import { Copie } from "../_texte/Copie";
import { Corrige } from "../_texte/Corrige";
import atelier from "../_texte/Page.module.css";
import { Quiz } from "../_exercice/Quiz";
import { Trous } from "../_exercice/Trous";
import { QUIZ, TEXTE } from "./exercice";

const PATH = "/atelier/un-compte-rendu-de-match";

export const metadata = lessonMetadata(PATH);

/* Page d'atelier (#80) : un compte rendu de match rendu cette semaine.
   L'élève corrige d'abord sa copie lui-même, puis une explication courte
   range ses douze fautes en quatre familles, et un quiz de football ne
   laisse répondre qu'à une question dont on a reconnu la bonne écriture. La suite de la séance se fait à l'oral, sans la page.
   Elle tutoie l'élève qui la lit (#80).

   **Anonyme** (`AGENTS.md` §9b) : rien ne dit qui a écrit le texte. Les noms
   sont ceux des joueurs du match.

   **Le corrigé est au passé composé**, et c'est la première famille : la
   copie raconte le match avec un passé simple calqué sur l'espagnol.

   La copie d'origine est sous le texte à trous, fermée : elle sert à comparer
   une fois les trous remplis, pas à lire d'abord. */
export default function Page() {
  return (
    <article className={`prose ${atelier.page}`}>
      <PageHeader path={PATH} />

      <section>
        <h2>1. Corrige ta copie</h2>

        <p>
          Voici ton compte rendu. Presque tout est déjà corrigé, sauf douze
          endroits. Pour chaque trou, quatre formes : celle que tu avais
          écrite, la bonne, et deux pièges. À toi de trouver la bonne.
        </p>

        <Trous
          texte={TEXTE}
          consigne="Clique sur un trou et choisis la bonne forme. Pour changer d’avis, clique de nouveau sur le mot."
        />

        <p>
          Pour comparer, voici ta copie, recopiée exactement comme tu l’as
          écrite.
        </p>

        <Corrige voir="Voir ta copie" cacher="Cacher ta copie">
          <Copie>
            <p>
              Espagne a joué contre la Republic Chec et gagna 3-1. Le match
              comenca très bien pour espage, avec un but incroyable de lamin
              Yamal depuis en dehors d l’area. Et juste avant le mit temps,
              Rodri marca le dexiem grace a un arrêt du gardien lacher dans
              l’area.
            </p>
            <p>
              Dans la segond parti Espagne se calma y et la Republic Chec mit
              le 2-1, et ils ont en même mit un deuxième qui a èté annuler a
              cause d’une faute anterieur.
            </p>
            <p>
              Et dans les dernieres minute de jeux Mikel Merino mit le 3-1.
            </p>
            <p>
              En general Espagne était superieur casi tout le match, avec
              quelque moment difficil dans la duxieme parti.
            </p>
            <p>
              Avec ce match ça fait Espagne reste premier dans son groupe et
              continue sa serie de 41 match invanque, le record historic
            </p>
          </Copie>
        </Corrige>
      </section>

      <section>
        <h2>2. Ce qu’il fallait voir</h2>

        <p>
          Douze fautes, mais seulement quatre familles. Les trois premières
          étaient déjà dans ta dernière copie : si tu les connais, tu les
          verras à la prochaine relecture.
        </p>

        <div className="table-wrap">
          <table>
            <caption>Les douze corrections, en quatre familles</caption>
            <thead>
              <tr>
                <th scope="col">La famille</th>
                <th scope="col">Ce qu’il fallait écrire</th>
                <th scope="col">En une phrase</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Le passé</th>
                <td className="fr">
                  a gagné · a très bien commencé · a marqué · s’est calmée
                </td>
                <td>
                  À l’oral, tu dis <span className="fr">elle a gagné</span>,{" "}
                  <span className="fr">il a marqué</span>. Écris-le comme tu le
                  dis : un match se raconte au passé composé.{" "}
                  <span className="fr">gagna</span>, c’est le passé des contes
                  et des romans.
                </td>
              </tr>
              <tr>
                <th scope="row">L’espagnol sous le français</th>
                <td className="fr">l’Espagne · la surface · presque</td>
                <td>
                  Un pays prend son article :{" "}
                  <span className="fr">l’Espagne</span>,{" "}
                  <span className="fr">la France</span>. Au football, on dit{" "}
                  <span className="fr">la surface</span>. Et{" "}
                  <s className="fr">casi</s> se dit{" "}
                  <span className="fr">presque</span>.
                </td>
              </tr>
              <tr>
                <th scope="row">L’accord</th>
                <td className="fr">
                  dernières minutes · quelques moments difficiles · première
                </td>
                <td>
                  Le mot s’accorde avec ce qu’il décrit : au pluriel pour les
                  minutes et les moments, au féminin pour l’Espagne. Devant un
                  pluriel,{" "}
                  <span className="fr">quelques</span> prend un s : c’était
                  déjà dans ta dernière copie.
                </td>
              </tr>
              <tr>
                <th scope="row">Ce qui ne s’entend pas</th>
                <td className="fr">été annulé · la mi-temps</td>
                <td>
                  <span className="fr">annulé</span> et{" "}
                  <span className="fr">annuler</span> se disent pareil. Essaie
                  avec <span className="fr">vendre</span> : tu dis{" "}
                  <span className="fr">a été vendu</span>, donc{" "}
                  <span className="fr">-é</span>. Et{" "}
                  <span className="fr">mi</span> veut dire « au milieu », comme
                  dans <span className="fr">midi</span> et{" "}
                  <span className="fr">minuit</span> : la mi-temps est le
                  milieu du match.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2>3. Le quiz</h2>

        <p>
          Vingt questions de football. Mais attention : chaque question
          arrive écrite de quatre façons, et une seule est sans faute.
          Trouve-la, et tu as le droit de répondre. Pour marquer le point, il
          faut les deux : la bonne écriture, puis la bonne réponse.
        </p>

        <Quiz
          items={QUIZ}
          consigne="D’abord, clique sur la question bien écrite. Ensuite, réponds-y."
          nom="le quiz"
        />
      </section>
    </article>
  );
}
