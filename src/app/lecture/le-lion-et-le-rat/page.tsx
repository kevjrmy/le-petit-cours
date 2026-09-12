import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";
import { Quiz } from "./quiz";

const PATH = "/lecture/le-lion-et-le-rat";

export const metadata = lessonMetadata(PATH);

export default function Page() {
  return (
    <article className="prose">
      <PageHeader path={PATH} />

      <section>
        <h2>Le texte</h2>

        <p>
          Jean de La Fontaine · <em>Fables</em> · 1668 · Livre II, fable 11 ·
          texte complet
        </p>

        <p>
          Une fable commence par sa morale, et l’histoire vient ensuite la
          prouver. Ici, les deux tiennent en dix-huit vers.
        </p>

        <div className="example">
          <p>
            Il faut, autant qu’on peut, obliger tout le monde :<br />
            On a souvent besoin d’un plus petit que soi.
            <br />
            De cette vérité deux fables feront foi ;<br />
            Tant la chose en preuves abonde.
          </p>
          <p>
            Entre les pattes d’un lion
            <br />
            Un rat sortit de terre assez à l’étourdie.
            <br />
            Le roi des animaux, en cette occasion,
            <br />
            Montra ce qu’il était, et lui donna la vie.
            <br />
            Ce bienfait ne fut pas perdu.
            <br />
            Quelqu’un aurait-il jamais cru
            <br />
            Qu’un lion d’un rat eût affaire ?
          </p>
          <p>
            Cependant il advint qu’au sortir des forêts
            <br />
            Ce lion fut pris dans des rets,
            <br />
            Dont ses rugissements ne le purent défaire.
            <br />
            Sire rat accourut, et fit tant par ses dents
            <br />
            Qu’une maille rongée emporta tout l’ouvrage.
          </p>
          <p>
            Patience et longueur de temps
            <br />
            Font plus que force ni que rage.
          </p>
        </div>

        <div className="attention">
          presque tous les verbes de cette fable sont au passé simple :{" "}
          <span className="fr">sortit</span>,{" "}
          <span className="fr">montra</span>,{" "}
          <span className="fr">accourut</span>,{" "}
          <span className="fr">emporta</span>. Dans un livre on écrit{" "}
          <span className="fr">il sortit</span> ; en parlant, on dit{" "}
          <span className="fr">il est sorti</span>. Vous lirez ce temps souvent,
          vous ne l’écrirez jamais.
        </div>

        <div className="astuce">
          <p className="astuce-hook">
            Les vers n’ont pas tous la même longueur, et ce n’est pas une
            négligence.
          </p>
          <p>
            La Fontaine allonge le vers quand l’action se déroule et le
            raccourcit quand elle se resserre. Les deux derniers, très courts,
            sont la morale : c’est la phrase que tout le monde en France connaît
            par cœur.
          </p>
        </div>
      </section>

      <section>
        <h2>Les mots du texte</h2>

        <div className="table-wrap">
          <table>
            <caption>
              Les mots anciens ou rares de la fable, définis en français
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
                  obliger
                </th>
                <td>rendre service, faire du bien à quelqu’un</td>
                <td className="fr">
                  Il faut obliger tout le monde, autant qu’on peut.
                </td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  à l’étourdie
                </th>
                <td>sans faire attention, sans réfléchir</td>
                <td className="fr">Le rat sort de terre à l’étourdie.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  un bienfait
                </th>
                <td>une bonne action, un service rendu</td>
                <td className="fr">Ce bienfait ne fut pas perdu.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  avoir affaire à
                </th>
                <td>avoir besoin de quelqu’un, devoir traiter avec lui</td>
                <td className="fr">
                  Personne ne croyait qu’un lion aurait affaire à un rat.
                </td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  il advint
                </th>
                <td>il arriva, il se produisit</td>
                <td className="fr">Il advint que le lion fut pris.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  des rets
                </th>
                <td>des filets pour capturer les animaux</td>
                <td className="fr">Le lion fut pris dans des rets.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  un rugissement
                </th>
                <td>le cri très fort du lion</td>
                <td className="fr">
                  Ses rugissements ne purent le libérer.
                </td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  une maille
                </th>
                <td>une boucle du filet, entre deux nœuds</td>
                <td className="fr">Une seule maille rongée suffit.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  ronger
                </th>
                <td>couper peu à peu avec les dents</td>
                <td className="fr">Le rat ronge la corde toute la nuit.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  l’ouvrage
                </th>
                <td>le travail fait, et ici le filet lui-même</td>
                <td className="fr">Une maille rongée emporta tout l’ouvrage.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="exception">
          <span className="fr">des rets</span> ne s’emploie plus aujourd’hui, et{" "}
          <span className="fr">il advint</span> non plus. Ne les apprenez pas
          pour parler : apprenez-les pour lire, comme on apprend un mot qu’on ne
          rencontrera que dans les livres.
        </div>
      </section>

      <section>
        <h2>Avez-vous compris ?</h2>

        <p>
          Sept questions. Répondez sans relire, puis retournez au texte pour
          celles qui vous manquent.
        </p>

        <Quiz />
      </section>
    </article>
  );
}
