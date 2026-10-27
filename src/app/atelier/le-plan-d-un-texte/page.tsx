import Link from "next/link";
import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";
import atelier from "../_texte/Page.module.css";
import { Ordre } from "../_exercice/Ordre";
import { Partie } from "../_exercice/Partie";
import {
  CLASICO,
  CLASICO_AFFICHAGE,
  FABLE,
  FABLE_AFFICHAGE,
  PARTIES,
  PHRASES,
} from "./exercice";

const PATH = "/atelier/le-plan-d-un-texte";

export const metadata = lessonMetadata(PATH);

/* Page d'atelier (#80) : une séance sur le plan d'un texte, demandée en plus
   de la séance habituelle. Ce qui a été demandé : l'introduction, le
   développement et la conclusion, mais plus loin que les trois mots — ce
   qu'on met dans l'introduction (le lieu, le moment, les personnages), où
   vont les faits, où va son avis ; des exercices du plus facile au plus
   difficile ; un texte de foot en parallèle avec un texte littéraire court.

   **Elle part de la page `le-clasico`** : la copie corrigée de l'élève est le
   texte de foot, et la page lui montre que son plan y était déjà. **Le lien
   vers `le-clasico` part avec elle** : si l'une des deux pages est retirée
   avant l'autre, retirer le lien (l'audit le signale, « inline links »).

   Le texte littéraire est « Le Lion et le Rat », déjà dans le cours, parce
   que sa morale est un avis placé au début : c'est la réponse à « où met-on
   son opinion ? », par le contraste.

   Trois plateaux : `Ordre` (trois morceaux), `Partie` (neuf phrases), `Ordre`
   (six morceaux de la fable). **Anonyme** (`AGENTS.md` §9b). Elle tutoie
   l'élève qui la lit (#80). */
export default function Page() {
  return (
    <article className={`prose ${atelier.page}`}>
      <PageHeader path={PATH} />

      <section>
        <h2>1. Ton Clasico avait déjà un plan</h2>

        <p>
          Relis ta dernière copie, <Link href="/atelier/le-clasico">Le Clasico</Link>.
          Tu as raconté le match en deux paragraphes, et le plan d’un bon texte
          y est déjà : ta première phrase présente le match, le milieu raconte
          ce qui s’est passé, et la fin commence par{" "}
          <span className="fr">En conclusion</span>. Il manque une seule chose :
          ta première phrase mérite d’être seule, dans son propre paragraphe.
          Un texte bien construit a trois parties, donc trois paragraphes.
        </p>

        <div className="table-wrap">
          <table>
            <caption>Les trois parties d’un compte rendu</caption>
            <thead>
              <tr>
                <th scope="col">La partie</th>
                <th scope="col">Ce qu’on y met</th>
                <th scope="col">Dans ton Clasico</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">L’introduction</th>
                <td>
                  Qui, où, quand : les personnages, le lieu, le moment. Pour un
                  match, le résultat aussi.
                </td>
                <td>
                  <span className="fr">Barcelone</span> et{" "}
                  <span className="fr">le Real Madrid</span>,{" "}
                  <span className="fr">hier</span>,{" "}
                  <span className="fr">au Camp Nou</span> : Barcelone a perdu.
                </td>
              </tr>
              <tr>
                <th scope="row">Le développement</th>
                <td>Les faits, dans l’ordre où ils se sont passés.</td>
                <td>
                  <span className="fr">à la 41e minute</span>, puis{" "}
                  <span className="fr">en seconde mi-temps</span>, puis{" "}
                  <span className="fr">à la 87e minute</span>.
                </td>
              </tr>
              <tr>
                <th scope="row">La conclusion</th>
                <td>Le bilan, et ton avis.</td>
                <td>
                  <span className="fr">En conclusion, Barcelone a joué un beau match</span>
                  .
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3>Exercice 1 · facile : remets ton Clasico dans l’ordre</h3>

        <Ordre
          blocs={CLASICO}
          affichage={CLASICO_AFFICHAGE}
          consigne="Touche les trois morceaux dans l’ordre où ils doivent se lire. Pour en retirer un, touche-le de nouveau."
          nom="ton Clasico"
        />
      </section>

      <section>
        <h2>2. Un fait ou un avis ?</h2>

        <p>
          Pour savoir où va une phrase, pose-toi une question : est-ce un fait,
          ou un avis ? Un fait, tout le monde peut le vérifier : une minute, un
          score, un buteur. Un avis, c’est ce que toi, tu en penses :{" "}
          <span className="fr">beau</span>,{" "}
          <span className="fr">mérité</span>,{" "}
          <span className="fr">décevant</span>. Dans un compte rendu, les faits
          vont dans le développement, et ton avis attend la conclusion.
        </p>

        <div className="astuce">
          <p className="astuce-hook">Certains mots disent où ils vont.</p>
          <p>
            <span className="fr">À mon avis</span>,{" "}
            <span className="fr">je trouve que</span>,{" "}
            <span className="fr">pour conclure</span>,{" "}
            <span className="fr">en conclusion</span> : la conclusion. Une
            minute, un buteur : le développement. Qui, où, quand :
            l’introduction. Sauf dans une fable : là, l’avis vient d’abord. On
            le voit juste après.
          </p>
        </div>

        <h3>Exercice 2 · moyen : dans quelle partie ?</h3>

        <Partie
          items={PHRASES}
          parties={PARTIES}
          consigne="Lis la phrase, puis choisis la partie du compte rendu où elle va."
          nom="dans quelle partie"
        />
      </section>

      <section>
        <h2>3. Le même plan dans une fable</h2>

        <p>
          Ce plan n’est pas réservé au football. Voici{" "}
          <Link href="/litterature/le-lion-et-le-rat">« Le Lion et le Rat »</Link>
          , une fable de Jean de La Fontaine, écrite en 1668. Un lion laisse
          partir un rat ; plus tard, c’est le petit rat qui sauve le grand
          lion.
        </p>

        <h3>Exercice 3 · difficile : remets la fable dans l’ordre</h3>

        <p>
          Les vers sont anciens : ne cherche pas à tout comprendre. Cherche les
          petits mots qui accrochent un morceau au précédent :{" "}
          <span className="fr">ce</span>,{" "}
          <span className="fr">cependant</span>,{" "}
          <span className="fr">lui</span>.
        </p>

        <Ordre
          blocs={FABLE}
          affichage={FABLE_AFFICHAGE}
          consigne="Touche les six morceaux dans l’ordre de la fable. Pour en retirer un, touche-le de nouveau."
          nom="la fable"
        />

        <p>Maintenant, mets les deux textes côte à côte.</p>

        <div className="table-wrap">
          <table>
            <caption>Ton Clasico et la fable, partie par partie</caption>
            <thead>
              <tr>
                <th scope="col">On cherche</th>
                <th scope="col">Dans ton Clasico</th>
                <th scope="col">Dans la fable</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Qui, où, quand</th>
                <td>
                  Ta première phrase : <span className="fr">Barcelone</span>,{" "}
                  <span className="fr">hier</span>,{" "}
                  <span className="fr">au Camp Nou</span>.
                </td>
                <td>
                  Le début de l’histoire : <span className="fr">un lion</span>,{" "}
                  <span className="fr">un rat</span>,{" "}
                  <span className="fr">au sortir des forêts</span>. Pas de
                  date : <span className="fr">il advint</span>, « un jour ».
                </td>
              </tr>
              <tr>
                <th scope="row">Les faits</th>
                <td>Dans l’ordre des minutes : la 41e, la seconde mi-temps, la 87e.</td>
                <td>
                  Dans l’ordre de l’histoire : le lion laisse partir le rat, le
                  lion est pris, le rat ronge le filet.
                </td>
              </tr>
              <tr>
                <th scope="row">Les mots qui font avancer</th>
                <td>
                  <span className="fr">à la 41e minute</span>,{" "}
                  <span className="fr">en seconde mi-temps</span>,{" "}
                  <span className="fr">mais</span>
                </td>
                <td>
                  <span className="fr">Ce bienfait</span>,{" "}
                  <span className="fr">Cependant</span>,{" "}
                  <span className="fr">Ce lion</span>
                </td>
              </tr>
              <tr>
                <th scope="row">L’avis</th>
                <td>
                  À la fin, après les faits :{" "}
                  <span className="fr">un beau match</span>.
                </td>
                <td>
                  Au début et à la fin : la morale,{" "}
                  <span className="fr">on a souvent besoin d’un plus petit que soi</span>.
                </td>
              </tr>
              <tr>
                <th scope="row">Le temps des verbes</th>
                <td>
                  Le passé composé : <span className="fr">a mis</span>,{" "}
                  <span className="fr">a égalisé</span>.
                </td>
                <td>
                  Le passé simple : <span className="fr">sortit</span>,{" "}
                  <span className="fr">accourut</span>. C’est le temps des
                  livres : tu le lis, tu ne l’écris pas.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p>
          Pourquoi La Fontaine donne-t-il son avis dès le début ? Parce qu’une
          fable sert à prouver une idée : il l’annonce, et l’histoire en est la
          preuve. Un compte rendu fait l’inverse : le lecteur veut d’abord
          savoir ce qui s’est passé, et ensuite ce que tu en penses.
        </p>
      </section>

      <div className="resume">
        <h2>En résumé</h2>
        <ul>
          <li>
            Un texte a trois parties, l’introduction, le développement et la
            conclusion : trois paragraphes.
          </li>
          <li>
            L’introduction dit qui, où, quand ; pour un match, elle donne aussi
            le résultat.
          </li>
          <li>
            Le développement raconte les faits dans l’ordre, avec des mots qui
            font avancer : <span className="fr">à la 41e minute</span>,{" "}
            <span className="fr">cependant</span>.
          </li>
          <li>
            La conclusion fait le bilan et donne ton avis :{" "}
            <span className="fr">en conclusion</span>,{" "}
            <span className="fr">à mon avis</span>.
          </li>
          <li>
            Une fable met son avis, la morale, au début et à la fin ; un compte
            rendu le garde pour la fin.
          </li>
        </ul>
      </div>
    </article>
  );
}
