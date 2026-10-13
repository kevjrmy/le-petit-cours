import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";
import { Copie } from "../_texte/Copie";
import { Corrige } from "../_texte/Corrige";
import atelier from "../_texte/Page.module.css";
import { Quiz } from "../_exercice/Quiz";
import { Trous } from "../_exercice/Trous";
import { QUIZ, TEXTE } from "./exercice";

const PATH = "/atelier/le-barca-contre-getafe";

export const metadata = lessonMetadata(PATH);

/* Page d'atelier (#80) : un compte rendu de match rendu cette semaine, sur
   le modèle de la semaine passée. L'élève corrige d'abord sa copie lui-même,
   puis une explication courte range ses douze fautes en quatre familles, les
   mêmes que la dernière fois, et un quiz sur la Ligue des champions ne laisse
   répondre qu'à une question dont on a reconnu la bonne écriture. La suite de la séance se
   fait à l'oral, sans la page. Elle tutoie l'élève qui la lit (#80).

   **Anonyme** (`AGENTS.md` §9b) : rien ne dit qui a écrit le texte. Les noms
   sont ceux des joueurs du match.

   **Le corrigé est au passé composé**, et c'est encore la première famille :
   la copie raconte le match avec un passé simple calqué sur l'espagnol. Elle
   porte aussi un « a joué » que l'élève a corrigé seul, et la page le dit.

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
              L’autre jour, fC. barcelona a joué contre Getafe dans un match
              de ligue.
            </p>
            <p>Barcalone gagna sans beaucoup de problem 3-0.</p>
            <p>
              L’equip bleu et grenat comenca très bien y pris un pas en avant
              en marquant dans la deuxième minut grace a un but de Antony
              Gordon. Et 28 minutes après dans la trentième minute, Gabriel
              jesus mis le deuxième.
            </p>
            <p>
              Dans le seconde mit-temps, barça continua en controlant les jeux
              avec la domination de possesion et quelques oportunité de but.
              Getaf ne pouvais presque pas ataquer et eu beucoud de dificulter
              pour frener les attaques du barcelone. Et puis finalement, dans
              la soixante-troisième minute Jules Kounde mit le troisième grace
              a une assistance de Lamine Yamal.
            </p>
          </Copie>
        </Corrige>
      </section>

      <section>
        <h2>2. Ce qu’il fallait voir</h2>

        <p>
          Douze fautes, et les quatre mêmes familles que la semaine dernière.
          Mais regarde ce qui est resté : tu écris{" "}
          <span className="fr">a joué</span>,{" "}
          <span className="fr">quelques</span> avec son s, et{" "}
          <span className="fr">presque</span> au lieu de{" "}
          <s className="fr">casi</s>. Trois corrections de la semaine
          dernière sont restées. Voici les suivantes.
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
                  a gagné · a très bien commencé · a mis
                </td>
                <td>
                  Encore la première famille. Tu as écrit{" "}
                  <span className="fr">a joué</span> à la première ligne : tu
                  as même barré <s className="fr">joué</s> pour le corriger.
                  Fais pareil jusqu’au bout :{" "}
                  <span className="fr">il a gagné</span>,{" "}
                  <span className="fr">il a mis</span>, comme tu le dis à
                  l’oral.
                </td>
              </tr>
              <tr>
                <th scope="row">L’espagnol sous le français</th>
                <td className="fr">
                  et · le Barça · freiner · une passe décisive
                </td>
                <td>
                  <s className="fr">y</s> se dit{" "}
                  <span className="fr">et</span>. Un club prend son article :{" "}
                  <span className="fr">le Barça</span>,{" "}
                  <span className="fr">le Real</span>. On écrit{" "}
                  <span className="fr">freiner</span>, comme{" "}
                  <span className="fr">le frein</span>. Et au football,{" "}
                  <s className="fr">une assistance</s> se dit{" "}
                  <span className="fr">une passe décisive</span>.
                </td>
              </tr>
              <tr>
                <th scope="row">L’accord</th>
                <td className="fr">
                  la seconde mi-temps · quelques occasions · pouvait
                </td>
                <td>
                  <span className="fr">mi-temps</span> est féminin :{" "}
                  <span className="fr">la seconde</span>. Après{" "}
                  <span className="fr">quelques</span>, le nom prend un s lui
                  aussi. Et <span className="fr">pouvais</span>, c’est pour{" "}
                  <span className="fr">je</span> et{" "}
                  <span className="fr">tu</span> : pour Getafe, c’est{" "}
                  <span className="fr">pouvait</span>, avec un t.
                </td>
              </tr>
              <tr>
                <th scope="row">Ce qui ne s’entend pas</th>
                <td className="fr">l’équipe · difficulté</td>
                <td>
                  Quand tu entends une consonne à la fin d’un mot, il y a
                  souvent un e muet derrière :{" "}
                  <span className="fr">équipe</span>,{" "}
                  <span className="fr">minute</span>,{" "}
                  <span className="fr">problème</span>.{" "}
                  <span className="fr">difficulté</span> est un nom, il finit
                  par <span className="fr">-té</span> : là où l’espagnol écrit{" "}
                  <span lang="es">dificultad</span>, le français écrit{" "}
                  <span className="fr">difficulté</span>. Et dans{" "}
                  <span className="fr">mi-temps</span>, tu as mis le trait
                  d’union : il reste un t en trop.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2>3. Le quiz</h2>

        <p>
          Vingt matchs célèbres de la Ligue des champions, de 1999 à 2026.
          Comme la semaine dernière, chaque question arrive écrite de quatre
          façons, et une seule est sans faute. Trouve-la, et tu as le droit
          de répondre. Pour marquer le point, il faut les deux : la bonne
          écriture, puis la bonne réponse.
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
