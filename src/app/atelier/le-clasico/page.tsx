import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";
import { Copie } from "../_texte/Copie";
import { Corrige } from "../_texte/Corrige";
import atelier from "../_texte/Page.module.css";
import { Quiz } from "../_exercice/Quiz";
import { Trous } from "../_exercice/Trous";
import { QUIZ, TEXTE } from "./exercice";

const PATH = "/atelier/le-clasico";

export const metadata = lessonMetadata(PATH);

/* Page d'atelier (#80) : un compte rendu de match, sur le modèle de celui de
   la semaine passée. L'élève corrige d'abord sa copie lui-même, puis
   un tableau range ses douze fautes en quatre familles, et un quiz sur vingt
   Clasicos ne laisse répondre qu'à une question dont on a reconnu la bonne
   écriture. La suite de la séance se fait à l'oral, sans la page. Elle tutoie
   l'élève qui la lit (#80).

   **Anonyme** (`AGENTS.md` §9b) : rien ne dit qui a écrit le texte. Les noms
   sont ceux des joueurs du match.

   **La section 2 commence par ce qui est resté** de la semaine passée :
   « L'équipe », « mi-temps » sans t, « minute » avec son e, et un passé
   composé au début et à la fin. Le passé simple du milieu reste la première
   famille.

   La copie d'origine est sous le texte à trous, fermée : elle sert à comparer
   une fois les trous remplis, pas à lire d'abord. Les mots barrés par l'élève
   n'y sont pas recopiés. */
export default function Page() {
  return (
    <article className={`prose ${atelier.page}`}>
      <PageHeader path={PATH} />

      <section>
        <h2>1. Corrige ta copie</h2>

        <p>
          Voici ton compte rendu du Clasico. Presque tout est déjà corrigé,
          sauf douze endroits. Pour chaque trou, quatre formes : celle que tu
          avais écrite, la bonne, et deux pièges. À toi de trouver la bonne.
        </p>

        <Trous
          texte={TEXTE}
          consigne="Clique sur un trou et choisis la bonne forme. Pour changer d’avis, clique de nouveau sur le mot."
        />

        <p>
          Pour comparer, voici ta copie, recopiée exactement comme tu l’as
          écrite, sans les mots que tu avais barrés.
        </p>

        <Corrige voir="Voir ta copie" cacher="Cacher ta copie">
          <Copie>
            <p>
              Barcelone a perdu hier contre Real Madrid lors du Clasico joué au
              Camp Nou. L’équipe blanche mit le premier but grace a une erreur
              de Gerard Martin et un coup de chance de Mbappé a la 41 minutes.
              Au second mi-temps Barcelone marca le 1-1 grace a Raphiña, mais a
              la 87ème minute Mbappé mit le deuxième pour Madrid grace a une
              belle course de Camavinga.
            </p>
            <p>
              En conclusion, Barcelone joua un beau match avec plein
              d’opportunité, mais ne les utilisa pas bien, alors que le real
              pris avantage des erreurs defensif de barcalone et ils ont
              remporté la Victoire.
            </p>
          </Copie>
        </Corrige>
      </section>

      <section>
        <h2>2. Ce qu’il fallait voir</h2>

        <p>
          D’abord, ce qui est resté de la semaine dernière. Tu écris{" "}
          <span className="fr">l’équipe</span> avec son accent et son e (tu
          avais écrit <s className="fr">l’equip</s>),{" "}
          <span className="fr">mi-temps</span> sans t, et{" "}
          <span className="fr">minute</span> avec son e. Et ta copie commence
          et finit au passé composé : <span className="fr">a perdu</span>,{" "}
          <span className="fr">ils ont remporté</span>. Quatre corrections
          sont restées.
        </p>

        <p>Voici les douze qui restent à faire, dans les quatre familles.</p>

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
                <td className="fr">a mis · a égalisé · a joué</td>
                <td>
                  Tu commences avec <span className="fr">a perdu</span>, tu
                  finis avec <span className="fr">ont remporté</span>, et au
                  milieu le passé simple revient :{" "}
                  <s className="fr">mit</s>, <s className="fr">joua</s>. C’est
                  le temps des livres ; un match se raconte comme tu le dis :{" "}
                  <span className="fr">il a mis</span>,{" "}
                  <span className="fr">il a joué</span>. Et{" "}
                  <s className="fr">marca</s> n’existe pas : pour le 1-1, on
                  écrit <span className="fr">il a égalisé</span>.
                </td>
              </tr>
              <tr>
                <th scope="row">L’espagnol sous le français</th>
                <td className="fr">
                  Raphinha · plein d’occasions · a profité
                </td>
                <td>
                  Le ñ n’existe pas en français. Un nom garde son orthographe :
                  Raphinha est brésilien, il s’écrit avec{" "}
                  <span className="fr">nh</span> ; Gerard Martín est espagnol,
                  il garde son accent. Au football, une chance de marquer est{" "}
                  <span className="fr">une occasion</span>. On{" "}
                  <span className="fr">profite</span> d’une erreur ;{" "}
                  <span className="fr">prendre l’avantage</span>, c’est passer
                  devant au score.
                </td>
              </tr>
              <tr>
                <th scope="row">L’accord</th>
                <td className="fr">
                  à la 41e minute · en seconde mi-temps · défensives
                </td>
                <td>
                  C’est <span className="fr">la 41e minute</span>, comme{" "}
                  <span className="fr">la 87e minute</span> que tu as bien
                  écrite : une seule minute, sans s.{" "}
                  <span className="fr">mi-temps</span> est féminin :{" "}
                  <span className="fr">la mi-temps</span>, donc{" "}
                  <span className="fr">en seconde mi-temps</span>. Le t est
                  parti, il reste le genre. Et{" "}
                  <span className="fr">des erreurs</span>, féminin pluriel :{" "}
                  <span className="fr">défensives</span>.
                </td>
              </tr>
              <tr>
                <th scope="row">Les petits mots et les signes</th>
                <td className="fr">
                  le Real Madrid · grâce à · la victoire
                </td>
                <td>
                  Un club prend son article, comme en espagnol :{" "}
                  <span className="fr">le Real Madrid</span>,{" "}
                  <span className="fr">le Barça</span>. Une ville n’en prend
                  pas : <span className="fr">Barcelone a perdu</span>.{" "}
                  <span className="fr">grâce à</span> prend deux accents. Si tu
                  peux dire <span className="fr">avait</span>, c’est{" "}
                  <span className="fr">a</span> ; sinon, c’est{" "}
                  <span className="fr">à</span>. Et{" "}
                  <span className="fr">victoire</span> est un nom commun : pas
                  de majuscule, alors que <span className="fr">le Real</span>{" "}
                  en prend une.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2>3. Le quiz</h2>

        <p>
          Vingt Clasicos, de 2006 jusqu’à celui de ta copie, le 25 octobre
          2026. Comme la semaine dernière, chaque
          question arrive écrite de quatre façons, et une seule est sans
          faute. Trouve-la, et tu as le droit de répondre. Pour marquer le
          point, il faut les deux : la bonne écriture, puis la bonne réponse.
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
