import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";
import { Quiz } from "./quiz";

const PATH = "/lecture/romeo-et-juliette";

export const metadata = lessonMetadata(PATH);

export default function Page() {
  return (
    <article className="prose">
      <PageHeader path={PATH} />

      <section>
        <h2>Le texte</h2>

        <p>
          William Shakespeare · <em>Roméo et Juliette</em> · vers 1595 ·
          traduit de l’anglais par François-Victor Hugo, 1868 · prologue et
          acte I, scène première (extraits)
        </p>

        <div className="attention">
          C’est le seul texte de ce chapitre qui n’a pas été écrit en français.
          La pièce est anglaise ; le français que vous lisez est celui de
          François-Victor Hugo, le fils de Victor Hugo, qui a traduit tout
          Shakespeare. Une traduction est le travail de quelqu’un : elle se cite
          avec son traducteur et sa date.
        </div>

        <p>
          Un acteur vient devant le rideau et raconte la pièce avant qu’elle
          commence.
        </p>

        <div className="example">
          <p>Deux familles, égales en noblesse,</p>
          <p>Dans la belle Vérone, où nous plaçons notre scène,</p>
          <p>
            Sont entraînées par d’anciennes rancunes à des rixes nouvelles
          </p>
          <p>Où le sang des citoyens souille les mains des citoyens.</p>
          <p>Des entrailles prédestinées de ces deux ennemies</p>
          <p>
            A pris naissance, sous des étoiles contraires, un couple d’amoureux
          </p>
          <p>Dont la ruine néfaste et lamentable</p>
          <p>
            Doit ensevelir dans leur tombe l’animosité de leurs parents.
          </p>
          <p>[…]</p>
          <p>Vont en deux heures être exposés sur notre scène.</p>
        </div>

        <p>
          Puis la pièce commence. Une place publique, à Vérone. Samson et
          Grégoire servent les Capulets ; Abraham sert les Montagues. Ils ne se
          connaissent pas et ils cherchent la bagarre.
        </p>

        <div className="example">
          <p>
            <strong>Abraham</strong>, <em>à Samson</em> — Est-ce à notre
            intention que vous mordez votre pouce, monsieur ?
          </p>
          <p>
            <strong>Samson</strong> — Je mords mon pouce, monsieur.
          </p>
          <p>
            <strong>Abraham</strong> — Est-ce à notre intention que vous mordez
            votre pouce, monsieur ?
          </p>
          <p>
            <strong>Samson</strong>, <em>bas, à Grégoire</em> — La loi
            est-elle de notre côté, si je dis oui ?
          </p>
          <p>
            <strong>Grégoire</strong>, <em>bas, à Samson</em> — Non.
          </p>
          <p>
            <strong>Samson</strong>, <em>haut, à Abraham</em> — Non, monsieur,
            ce n’est pas à votre intention que je mords mon pouce, monsieur ;
            mais je mords mon pouce, monsieur.
          </p>
          <p>
            <strong>Grégoire</strong>, <em>à Abraham</em> — Cherchez-vous une
            querelle, monsieur ?
          </p>
          <p>
            <strong>Abraham</strong> — Une querelle, monsieur ? Non, monsieur !
          </p>
          <p>
            <strong>Samson</strong> — Si vous en cherchez une, monsieur, je suis
            votre homme. Je sers un maître aussi bon que le vôtre.
          </p>
          <p>
            <strong>Abraham</strong> — Mais pas meilleur.
          </p>
          <p>[…]</p>
          <p>
            <strong>Samson</strong> — Dégainez, si vous êtes hommes !
          </p>
          <p>
            <strong>Benvolio</strong>, <em>s’avançant, la rapière au poing</em>{" "}
            — Séparez-vous, imbéciles ! rengainez vos épées ; vous ne savez pas
            ce que vous faites.
          </p>
          <p>
            <strong>Tybalt</strong>, <em>s’élançant, l’épée nue, derrière
            Benvolio</em> — Quoi ! l’épée à la main, parmi ces marauds sans
            cœur ! Tourne-toi, Benvolio, et fais face à ta mort.
          </p>
          <p>
            <strong>Benvolio</strong> — Je ne veux ici que maintenir la paix ;
            rengaine ton épée, ou emploie-la, comme moi, à séparer ces hommes.
          </p>
          <p>
            <strong>Tybalt</strong> — Quoi, l’épée à la main, tu parles de paix !
            Ce mot, je le hais, comme je hais l’enfer, tous les Montagues et
            toi. À toi, lâche !
          </p>
        </div>
      </section>

      <section>
        <h2>Les mots du texte</h2>

        <div className="table-wrap">
          <table>
            <caption>Les mots qui bloquent la lecture, définis en français</caption>
            <thead>
              <tr>
                <th scope="col">Mot</th>
                <th scope="col">Définition</th>
                <th scope="col">Exemple</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row" className="fr">une rancune</th>
                <td>une colère ancienne que l’on garde longtemps</td>
                <td className="fr">
                  D’anciennes rancunes séparent les deux familles.
                </td>
              </tr>
              <tr>
                <th scope="row" className="fr">une rixe</th>
                <td>une bagarre, un combat dans la rue</td>
                <td className="fr">La rixe commence sur la place.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">mordre son pouce</th>
                <td>
                  un geste d’insulte, au temps de Shakespeare. Aujourd’hui on ne
                  le fait plus
                </td>
                <td className="fr">Il mord son pouce en les regardant.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">chercher querelle</th>
                <td>provoquer quelqu’un, chercher la bagarre</td>
                <td className="fr">Cherchez-vous une querelle, monsieur ?</td>
              </tr>
              <tr>
                <th scope="row" className="fr">dégainer</th>
                <td>sortir son épée</td>
                <td className="fr">Dégainez, si vous êtes hommes !</td>
              </tr>
              <tr>
                <th scope="row" className="fr">rengainer</th>
                <td>remettre son épée dans son fourreau, le contraire de dégainer</td>
                <td className="fr">Rengainez vos épées.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">un maître</th>
                <td>ici : celui pour qui on travaille, le patron</td>
                <td className="fr">Je sers un maître aussi bon que le vôtre.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">haïr</th>
                <td>
                  détester très fort. <span className="fr">je hais</span>,{" "}
                  <span className="fr">nous haïssons</span>
                </td>
                <td className="fr">Ce mot, je le hais.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2>Avez-vous compris ?</h2>

        <p>
          Sept questions : quatre sur le prologue, trois sur la scène de la rue.
        </p>

        <Quiz />
      </section>
    </article>
  );
}
