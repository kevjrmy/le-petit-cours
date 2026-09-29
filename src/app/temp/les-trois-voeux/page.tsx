import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";
import { Copie } from "../_texte/Copie";
import { Corrige } from "../_texte/Corrige";
import atelier from "../_texte/Page.module.css";
import { Choix } from "../_exercice/Choix";
import { Faute } from "../_exercice/Faute";
import { TRUC_1, TRUC_2, TRUC_3, DEFI } from "./exercice";

const PATH = "/temp/les-trois-voeux";

export const metadata = lessonMetadata(PATH);

/* Page d'atelier (#80) : une séance entière, dans l'ordre où elle se fait.

   **Anonyme, et c'est la condition** (`AGENTS.md` §9b) : rien ici ne dit qui
   a écrit le texte, quel âge, ni où.

   **Elle tutoie**, contre la voix du cours : c'est la page d'une séance
   particulière, lue à côté de celui qui l'a écrite.

   Une seule leçon, la forme qui suit « avait », parce que c'est la faute qui
   revient le plus dans le texte ; les autres restent visibles dans le
   corrigé. Chaque truc est suivi de son plateau, puis un défi mélange les
   trois : une règle pratiquée tout de suite tient mieux que trois règles puis
   vingt questions.

   Le corrigé est caché (`Corrige`) : l'élève cherche d'abord ses fautes. */
export default function Page() {
  return (
    <article className={`prose ${atelier.page}`}>
      <PageHeader path={PATH} />

      <section>
        <h2>1. Lis ton texte</h2>

        <p>
          Voici ton texte, recopié exactement comme tu l’as écrit. Lis-le à
          voix haute. À l’oral, tout va bien : l’histoire se comprend, et elle
          est drôle. Les fautes ne s’entendent pas, elles se voient seulement.
          C’est pour ça qu’elles sont difficiles à trouver.
        </p>

        <Copie>
          <p>
            … trouver le sorcier heureusement il avait pas trop durer avant de
            lui trouver. Il lui avait dis en chinois qu’il voulait retresir,
            mais le sorcier n’avait pas les bonne pohion alors le sorcier lui
            avait dis d’aller chez la sorcierre breton. Quand il arriva a
            bretagne la sorciere lui avait donné la potion de grandir avad que
            celle de retresir. Alors il avait aller visiter le pape a Rome, et
            le pape ne povait rien faire alors il apela Saint Vierge Marie ou
            S.V.M. Marie lui avait dit qu’il fallait s’enlever les chausete
            aller au bord de la mer et repeter son nom trois fois et comme ça
            il aurait trois veux.
          </p>
          <p>
            Apres l’avoir fais il etait la taille d’un humain et en plus il
            avait trois veux le premier il l’avait utilizé pour revenir au
            village le deuxsieme pour retresir les chaussette et le troisieme
            por que ça soit le jour du mariage
          </p>
        </Copie>
      </section>

      <section>
        <h2>2. La chasse aux fautes</h2>

        <p>
          Relis ton texte en silence, cette fois avec les yeux d’un détective.
          Trouve au moins cinq fautes et dis-les à voix haute. Ensuite
          seulement, ouvre le corrigé : ce qui a changé est en gras.
        </p>

        <Corrige>
          <Copie>
            <p>
              … trouver le sorcier. Heureusement, <strong>ça n’avait</strong>{" "}
              pas trop <strong>duré</strong> avant de <strong>le</strong>{" "}
              trouver. Il lui avait <strong>dit</strong> en chinois qu’il
              voulait <strong>rétrécir</strong>, mais le sorcier n’avait pas
              les <strong>bonnes potions</strong>, alors le sorcier lui avait{" "}
              <strong>dit</strong> d’aller chez la{" "}
              <strong>sorcière bretonne</strong>. Quand il arriva{" "}
              <strong>en Bretagne</strong>, la <strong>sorcière</strong> lui{" "}
              <strong>donna</strong> la potion <strong>pour</strong> grandir{" "}
              <strong>avant celle pour rétrécir</strong>. Alors il{" "}
              <strong>était allé voir</strong> le pape <strong>à</strong>{" "}
              Rome, et le pape ne <strong>pouvait</strong> rien faire, alors
              il <strong>appela la Sainte</strong> Vierge Marie, ou S.V.M.
              Marie lui avait dit qu’il fallait{" "}
              <strong>enlever ses chaussettes</strong>, aller au bord de la mer
              et <strong>répéter</strong> son nom trois fois, et comme ça il
              aurait trois <strong>vœux</strong>.
            </p>
            <p>
              <strong>Après</strong> l’avoir <strong>fait</strong>, il{" "}
              <strong>avait</strong> la taille d’un humain, et en plus il avait
              trois <strong>vœux</strong>. Le premier, il l’avait{" "}
              <strong>utilisé</strong> pour revenir au village, le{" "}
              <strong>deuxième</strong> pour <strong>rétrécir</strong> les{" "}
              <strong>chaussettes</strong>, et le <strong>troisième</strong>{" "}
              <strong>pour</strong> que ça soit le jour du mariage.
            </p>
          </Copie>

          <p>
            Beaucoup de gras ! Mais regarde bien : une faute revient plus que
            les autres. C’est le mot qui vient juste après{" "}
            <span className="fr">avait</span> :{" "}
            <span className="fr">avait durer</span>,{" "}
            <span className="fr">avait dis</span>,{" "}
            <span className="fr">l’avoir fais</span>,{" "}
            <span className="fr">avait aller</span>. Aujourd’hui, on règle
            celle-là, avec trois trucs.
          </p>
        </Corrige>
      </section>

      <section>
        <h2>3. Premier truc : -é ou -er ?</h2>

        <p>
          <span className="fr">duré</span> et{" "}
          <span className="fr">durer</span> se disent pareil. Pour savoir
          lequel écrire, remplace le verbe par{" "}
          <span className="fr">vendre</span>. Lui, il ne se dit pas pareil.
        </p>

        <div className="rule">
          Tu dis <span className="fr">vendu</span> ? Écris{" "}
          <span className="fr">-é</span>. Tu dis{" "}
          <span className="fr">vendre</span> ? Écris{" "}
          <span className="fr">-er</span>.
        </div>

        <div className="example">
          il avait <strong>duré</strong> (il avait vendu) · il fallait{" "}
          <strong>répéter</strong> (il fallait vendre)
        </div>

        <Choix
          items={TRUC_1}
          consigne="Choisis la bonne forme. Dans ta tête, essaie avec vendre."
          nom="premier truc"
        />
      </section>

      <section>
        <h2>4. Deuxième truc : dit ou dis ?</h2>

        <p>
          <span className="fr">dit</span> et <span className="fr">dis</span>{" "}
          se disent pareil, eux aussi. La lettre de la fin est muette. Pour
          l’entendre, mets le mot au féminin.
        </p>

        <div className="rule">
          <span className="fr">une chose dite</span> : on entend le t, donc{" "}
          <span className="fr">il avait dit</span>.{" "}
          <span className="fr">une chose faite</span>, donc{" "}
          <span className="fr">il avait fait</span>.{" "}
          <span className="fr">une chose prise</span> : on entend le s, donc{" "}
          <span className="fr">il avait pris</span>.
        </div>

        <div className="astuce">
          <p className="astuce-hook">« je dis », « je fais » : c’est maintenant.</p>
          <p>
            <span className="fr">je dis</span>,{" "}
            <span className="fr">tu fais</span> : avec un s, c’est le présent.
            Après <span className="fr">avait</span>, jamais de{" "}
            <span className="fr">dis</span> ni de{" "}
            <span className="fr">fais</span>.
          </p>
        </div>

        <Choix
          items={TRUC_2}
          consigne="Choisis la bonne forme. Dis-la d’abord au féminin dans ta tête."
          nom="deuxième truc"
        />
      </section>

      <section>
        <h2>5. Troisième truc : avait ou était ?</h2>

        <p>
          Dans ton texte : <span className="fr">il avait aller</span>. Pourtant,
          à l’oral, tu ne dirais jamais{" "}
          <span className="fr">hier, il a allé à Rome</span>. Tu dis{" "}
          <span className="fr">hier, il est allé à Rome</span>. Ton oreille
          connaît déjà la réponse : il suffit de lui poser la question.
        </p>

        <div className="rule">
          Dis la phrase en commençant par{" "}
          <span className="fr">hier, il…</span> Tu entends{" "}
          <span className="fr">il est</span> ? Écris{" "}
          <span className="fr">il était</span>. Tu entends{" "}
          <span className="fr">il a</span> ? Écris{" "}
          <span className="fr">il avait</span>.
        </div>

        <div className="table-wrap">
          <table>
            <caption>Ce que tu dis, ce que tu écris</caption>
            <thead>
              <tr>
                <th scope="col">Tu dis</th>
                <th scope="col">Tu écris</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="fr">hier, il est allé</td>
                <td className="fr">il était allé</td>
              </tr>
              <tr>
                <td className="fr">hier, il est revenu</td>
                <td className="fr">il était revenu</td>
              </tr>
              <tr>
                <td className="fr">hier, il a appelé</td>
                <td className="fr">il avait appelé</td>
              </tr>
              <tr>
                <td className="fr">hier, il a marché</td>
                <td className="fr">il avait marché</td>
              </tr>
            </tbody>
          </table>
        </div>

        <Choix
          items={TRUC_3}
          consigne="avait ou était ? Dis d’abord la phrase avec « hier, il… ». Attention, il y a un piège."
          nom="troisième truc"
        />
      </section>

      <section>
        <h2>6. Le défi</h2>

        <p>
          Les trois trucs, tous mélangés. Cette fois, personne ne te dit où
          est la faute : c’est exactement ce que tu fais quand tu relis ta
          copie. Une seule faute par phrase.
        </p>

        <Faute
          items={DEFI}
          consigne="Clique sur le mot qui ne va pas."
          nom="le défi"
        />
      </section>

      <div className="resume">
        <h2>En résumé</h2>
        <ul>
          <li>
            Autour de <span className="fr">avait</span>, les fautes ne
            s’entendent pas. Les trois trucs font parler ton oreille.
          </li>
          <li>
            <strong>-é ou -er ?</strong> Essaie avec{" "}
            <span className="fr">vendre</span> : tu dis{" "}
            <span className="fr">vendu</span>, écris{" "}
            <span className="fr">-é</span> ; tu dis{" "}
            <span className="fr">vendre</span>, écris{" "}
            <span className="fr">-er</span>.
          </li>
          <li>
            <strong>dit ou dis ?</strong> Mets au féminin :{" "}
            <span className="fr">une chose dite</span>, donc{" "}
            <span className="fr">il avait dit</span>. Pareil pour{" "}
            <span className="fr">fait</span> et{" "}
            <span className="fr">pris</span>.
          </li>
          <li>
            <strong>avait ou était ?</strong> Dis la phrase avec{" "}
            <span className="fr">hier, il…</span> :{" "}
            <span className="fr">il est</span> donne{" "}
            <span className="fr">était</span>,{" "}
            <span className="fr">il a</span> donne{" "}
            <span className="fr">avait</span>.
          </li>
          <li>
            Quand tu relis ta copie, cherche chaque{" "}
            <span className="fr">avait</span> et vérifie le mot d’après.
          </li>
        </ul>
      </div>
    </article>
  );
}
