import Link from "next/link";
import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";
import { Quiz } from "./quiz";

const PATH = "/lecture/ulysse-et-le-cyclope";

export const metadata = lessonMetadata(PATH);

export default function Page() {
  return (
    <article className="prose">
      <PageHeader path={PATH} />

      <section>
        <h2>Le récit</h2>

        <p>
          Récit écrit pour ce cours · D’après l’Odyssée d’Homère, chant IX ·
          Ulysse et le Cyclope
        </p>

        <p>
          L’Odyssée est un poème grec très ancien. Il raconte le retour
          d’Ulysse, roi d’Ithaque, après la guerre de Troie. Cet épisode est
          l’un des plus connus. Ulysse gagne grâce à son intelligence, et il
          fait aussi une erreur.
        </p>

        <div className="example recit">
          <p>
            La guerre de Troie est finie. Ulysse veut rentrer chez lui, sur
            l’île d’Ithaque, mais le voyage est long. Un jour, il arrive sur
            l’île des Cyclopes avec douze hommes. D’abord, ils entrent dans une
            grande grotte. Il y a du fromage et du lait : ils mangent et ils
            attendent.
          </p>
          <p>
            Le soir, le maître de la grotte rentre avec son troupeau de
            moutons. C’est Polyphème, un géant qui a un seul œil. Il ferme la
            grotte avec un énorme rocher et il mange deux hommes. Pendant la
            nuit, Ulysse veut le tuer. Pourtant, il ne fait rien, parce que les
            hommes ne peuvent pas bouger le rocher. Sans le géant, ils restent
            enfermés.
          </p>
          <p>
            Ulysse prépare une ruse. Il donne du vin au géant et il lui dit :
            « Je m’appelle Personne. » Comme le vin est très fort, Polyphème
            s’endort. Ensuite, les hommes mettent un grand pieu dans le feu,
            puis ils brûlent l’œil du géant. Polyphème crie. Les autres
            Cyclopes arrivent devant la grotte et demandent : « Qui te fait
            mal ? » Il répond : « Personne ! » Ils pensent que tout va bien,
            donc ils repartent.
          </p>
          <p>
            Le matin, Polyphème est aveugle. Il doit ouvrir la grotte pour ses
            moutons. Il ne peut plus voir. Par contre, il peut toucher : il
            passe la main sur le dos de chaque mouton qui sort. C’est pour ça
            que les hommes se cachent sous le ventre des moutons. Enfin, ils
            courent jusqu’à leur bateau.
          </p>
          <p>
            Sur le bateau, Ulysse est libre. Même s’il est encore en danger, il
            crie son vrai nom : « Je suis Ulysse ! » Polyphème demande à son
            père, le dieu Poséidon, de punir Ulysse. Le voyage d’Ulysse va
            durer dix ans.
          </p>
        </div>
      </section>

      <section>
        <h2>Les mots du texte</h2>

        <div className="table-wrap">
          <table>
            <caption>
              Neuf mots du récit, dans l’ordre où ils apparaissent
            </caption>
            <thead>
              <tr>
                <th scope="col">Mot</th>
                <th scope="col">Définition</th>
                <th scope="col">Exemple</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row" className="fr">
                  une grotte
                </th>
                <td>un grand trou dans un rocher, où l’on peut entrer</td>
                <td className="fr">
                  Nous avons visité une grotte au bord de la mer.
                </td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  un troupeau
                </th>
                <td>un groupe d’animaux qui vivent ensemble</td>
                <td className="fr">Un troupeau de vaches traverse la route.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  bouger
                </th>
                <td>changer de place, ou changer une chose de place</td>
                <td className="fr">
                  Cette table est trop lourde, je ne peux pas la bouger.
                </td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  une ruse
                </th>
                <td>
                  une idée intelligente pour faire croire une chose fausse à
                  quelqu’un
                </td>
                <td className="fr">Le renard est connu pour ses ruses.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  un pieu
                </th>
                <td>un long morceau de bois, pointu au bout</td>
                <td className="fr">Il plante un pieu dans la terre.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  crier
                </th>
                <td>parler ou appeler très fort</td>
                <td className="fr">Ne criez pas, le bébé dort.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  aveugle
                </th>
                <td>qui ne peut pas voir</td>
                <td className="fr">Son grand-père est aveugle depuis dix ans.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  se cacher
                </th>
                <td>se mettre à un endroit où personne ne vous voit</td>
                <td className="fr">Le chat se cache sous le lit.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  punir
                </th>
                <td>faire payer une faute à quelqu’un</td>
                <td className="fr">
                  Ses parents le punissent : pas de téléphone ce soir.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="astuce">
          <p className="astuce-hook">
            Douze connecteurs se cachent dans le récit.
          </p>
          <p>
            Relisez le texte et cherchez-les : chacun y est une seule fois. Pour
            chaque connecteur, demandez-vous ce qu’il annonce : la suite, la
            cause, la conséquence ou une opposition. La liste complète est dans{" "}
            <Link href="/grammaire/les-connecteurs">Les connecteurs</Link>.
          </p>
        </div>
      </section>

      <section>
        <h2>Avez-vous compris ?</h2>

        <p>
          Répondez sans relire le récit. Retournez ensuite au texte pour les
          questions qui vous manquent.
        </p>

        <Quiz />
      </section>
    </article>
  );
}
