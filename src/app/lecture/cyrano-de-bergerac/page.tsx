import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";
import { Quiz } from "./quiz";

const PATH = "/lecture/cyrano-de-bergerac";

export const metadata = lessonMetadata(PATH);

export default function Page() {
  return (
    <article className="prose">
      <PageHeader path={PATH} />

      <section>
        <h2>Le texte</h2>

        <p>
          Edmond Rostand · <em>Cyrano de Bergerac</em> · 1897 · acte I, scène
          première (extraits)
        </p>

        <p>
          Paris, 1640. La salle de l’hôtel de Bourgogne, un théâtre. La pièce
          n’a pas commencé et le public arrive. Cyrano, lui, n’est pas encore
          là. Lisez la scène à voix haute, à deux : c’est du théâtre, et les
          répliques sont courtes.
        </p>

        <div className="example">
          <p>
            <strong>Le portier</strong>, <em>le poursuivant</em> — Holà ! vos
            quinze sols !
          </p>
          <p>
            <strong>Le cavalier</strong> — J’entre gratis !
          </p>
          <p>
            <strong>Le portier</strong> — Pourquoi ?
          </p>
          <p>
            <strong>Le cavalier</strong> — Je suis chevau-léger de la maison du
            Roi !
          </p>
          <p>
            <strong>Le portier</strong>, <em>à un autre cavalier qui vient
            d’entrer</em> — Vous ?
          </p>
          <p>
            <strong>Deuxième cavalier</strong> — Je ne paye pas !
          </p>
          <p>
            <strong>Le portier</strong> — Mais…
          </p>
          <p>
            <strong>Deuxième cavalier</strong> — Je suis mousquetaire.
          </p>
          <p>
            <strong>Premier cavalier</strong>, <em>au deuxième</em> — On ne
            commence qu’à deux heures. Le parterre est vide. Exerçons-nous au
            fleuret.
          </p>
          <p>
            <em>(Ils font des armes avec des fleurets qu’ils ont apportés.)</em>
          </p>
          <p>
            <strong>Un laquais</strong>, <em>entrant</em> — Pst… Flanquin…
          </p>
          <p>
            <strong>Un autre</strong>, <em>déjà arrivé</em> — Champagne ?…
          </p>
          <p>
            <strong>Le premier</strong>, <em>lui montrant des jeux qu’il sort de
            son pourpoint</em> — Cartes. Dés. <em>(Il s’assied par terre.)</em>{" "}
            Jouons.
          </p>
          <p>
            <strong>Le deuxième</strong> — Oui, mon coquin.
          </p>
          <p>
            <strong>Premier laquais</strong>, <em>tirant de sa poche un bout de
            chandelle qu’il allume et colle par terre</em> — J’ai soustrait à
            mon maître un peu de luminaire.
          </p>
          <p>[…]</p>
          <p>
            <strong>Un des bretteurs</strong>, <em>recevant un coup de
            fleuret</em> — Touche !
          </p>
          <p>
            <strong>Un des joueurs</strong> — Trèfle !
          </p>
          <p>[…]</p>
          <p>
            <strong>Un homme</strong>, <em>s’asseyant par terre avec d’autres
            porteurs de provisions de bouche</em> — Lorsqu’on vient en avance,
            on est bien pour manger.
          </p>
          <p>
            <strong>Un bourgeois</strong>, <em>conduisant son fils</em> —
            Plaçons-nous là, mon fils.
          </p>
          <p>
            <strong>Un joueur</strong> — Brelan d’as !
          </p>
          <p>
            <strong>Un homme</strong>, <em>tirant une bouteille de sous son
            manteau et s’asseyant aussi</em> — Un ivrogne doit boire son
            bourgogne… <em>(Il boit.)</em> à l’hôtel de Bourgogne !
          </p>
        </div>

        <div className="attention">
          La pièce est écrite en vers. Une phrase peut donc être partagée entre
          deux personnages : le portier dit six syllabes, le cavalier répond
          avec les six autres, et ensemble ils font une ligne. Ne cherchez pas à
          tout comprendre du premier coup ; suivez qui parle et ce qu’il fait.
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
                <th scope="row" className="fr">un portier</th>
                <td>la personne qui garde l’entrée et fait payer</td>
                <td className="fr">Le portier crie : vos quinze sols !</td>
              </tr>
              <tr>
                <th scope="row" className="fr">quinze sols</th>
                <td>le prix de l’entrée. Le sol est une monnaie ancienne</td>
                <td className="fr">Il entre sans payer ses quinze sols.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">gratis</th>
                <td>sans payer</td>
                <td className="fr">J’entre gratis !</td>
              </tr>
              <tr>
                <th scope="row" className="fr">un mousquetaire</th>
                <td>un soldat du roi</td>
                <td className="fr">Je ne paye pas : je suis mousquetaire.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">le parterre</th>
                <td>le bas de la salle, où le public reste debout</td>
                <td className="fr">À midi, le parterre est encore vide.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">un fleuret</th>
                <td>une épée fine, pour s’exercer</td>
                <td className="fr">Exerçons-nous au fleuret.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">un laquais</th>
                <td>
                  un domestique. Ici, ils s’appellent Flanquin et Champagne
                </td>
                <td className="fr">Les deux laquais jouent aux cartes.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">soustraire</th>
                <td>ici : prendre sans demander</td>
                <td className="fr">
                  J’ai soustrait à mon maître un peu de luminaire.
                </td>
              </tr>
              <tr>
                <th scope="row" className="fr">un ivrogne</th>
                <td>une personne qui boit trop de vin</td>
                <td className="fr">Un ivrogne doit boire son bourgogne.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2>Avez-vous compris ?</h2>

        <p>
          Le même texte à deux niveaux : choisissez le vôtre sous ce
          paragraphe. Répondez sans relire, puis retournez au texte pour celles
          qui vous manquent.
        </p>

        <Quiz />
      </section>
    </article>
  );
}
