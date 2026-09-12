import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";

const PATH = "/astuces/etre-ou-avoir";

export const metadata = lessonMetadata(PATH);

export default function Page() {
  return (
    <article className="prose">
      <PageHeader path={PATH} />

      <section>
        <h2>Renversez la question</h2>

        <div className="astuce">
          <p className="astuce-hook">
            N’apprenez pas la liste de <strong>avoir</strong> : elle n’a pas de
            fin. Apprenez la petite liste de <strong>être</strong>.
          </p>
          <p>
            La quasi-totalité des verbes français forment leur passé composé
            avec <span className="fr">avoir</span>. Seuls{" "}
            <strong>quatorze</strong> prennent{" "}
            <span className="fr">être</span>, plus tous les verbes
            pronominaux. Si le verbe n’est pas dans cette courte liste, la
            réponse est <span className="fr">avoir</span>, sans hésiter.
          </p>
        </div>

        <div className="attention">
          la question ne se pose qu’au passé composé, et elle se pose{" "}
          <strong>avant</strong> d’écrire le participe. Choisir l’auxiliaire,
          c’est déjà décider si le participe va s’accorder ou non.
        </div>
      </section>

      <section>
        <h2>La liste tient par paires</h2>

        <div className="astuce">
          <p className="astuce-hook">
            Les verbes d’<strong>être</strong> vont deux par deux, chacun avec
            son contraire.
          </p>
          <p>
            Retenir un couple coûte à peine plus qu’un verbe seul, et vous en
            gagnez deux. Ce sont tous des verbes de mouvement ou de changement
            d’état. Cinq paires en couvrent dix ; les quatre derniers n’ont pas
            de contraire et s’apprennent seuls.
          </p>
        </div>

        <div className="table-wrap">
          <table>
            <caption>Les cinq paires de contraires, à retenir ensemble</caption>
            <thead>
              <tr>
                <th scope="col">Verbe</th>
                <th scope="col">Son contraire</th>
                <th scope="col">Exemple</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row" className="fr">
                  aller
                </th>
                <td className="fr">venir</td>
                <td className="fr">Je suis allé au marché, puis il est venu.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  entrer
                </th>
                <td className="fr">sortir</td>
                <td className="fr">Elle est entrée à huit heures.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  monter
                </th>
                <td className="fr">descendre</td>
                <td className="fr">Nous sommes montés au dernier étage.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  arriver
                </th>
                <td className="fr">partir</td>
                <td className="fr">Le train est arrivé en retard.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  naître
                </th>
                <td className="fr">mourir</td>
                <td className="fr">Elle est née à Lyon.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="table-wrap">
          <table>
            <caption>
              Les quatre qui n’ont pas de contraire dans la liste
            </caption>
            <thead>
              <tr>
                <th scope="col">Verbe</th>
                <th scope="col">Exemple</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row" className="fr">
                  rester
                </th>
                <td className="fr">Je suis resté à la maison.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  tomber
                </th>
                <td className="fr">Elle est tombée dans l’escalier.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  passer
                </th>
                <td className="fr">Nous sommes passés par Lyon.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  retourner
                </th>
                <td className="fr">Ils sont retournés en France.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="astuce">
          <p className="astuce-hook">
            Un <strong>se</strong> devant le verbe ? C’est{" "}
            <strong>être</strong>, toujours.
          </p>
          <p>
            Aucune exception, aucune liste à apprendre :{" "}
            <span className="fr">se laver</span>,{" "}
            <span className="fr">se lever</span>,{" "}
            <span className="fr">se souvenir</span> prennent{" "}
            <span className="fr">être</span> parce qu’ils sont pronominaux, et
            il suffit de voir le pronom.
          </p>
        </div>

        <div className="example">
          Je me <strong>suis</strong> levé tôt. · Elle s’<strong>est</strong>{" "}
          lavée. · Nous nous <strong>sommes</strong> promenés.
        </div>

        <div className="attention">
          les verbes construits sur ceux de la liste la suivent :{" "}
          <span className="fr">devenir</span>,{" "}
          <span className="fr">revenir</span>,{" "}
          <span className="fr">rentrer</span>,{" "}
          <span className="fr">repartir</span> prennent{" "}
          <span className="fr">être</span> comme{" "}
          <span className="fr">venir</span>,{" "}
          <span className="fr">entrer</span> et{" "}
          <span className="fr">partir</span>.
        </div>
      </section>

      <section>
        <h2>Le prix de la petite liste</h2>

        <div className="astuce">
          <p className="astuce-hook">
            Avec <strong>être</strong>, le participe s’accorde avec le sujet,
            comme un adjectif.
          </p>
          <p>
            Avec <span className="fr">avoir</span>, il ne bouge pas :{" "}
            <span className="fr">elle a mangé</span>, jamais{" "}
            <span className="fr">elle a mangée</span>. C’est la contrepartie de
            la petite liste, et c’est ce que la liste sert vraiment à décider.
          </p>
        </div>

        <div className="example">
          il est allé · elle est allé<strong>e</strong> · ils sont allé
          <strong>s</strong> · elles sont allé<strong>es</strong>
        </div>

        <div className="exception">
          <strong>Quatre verbes jouent double jeu.</strong>{" "}
          <span className="fr">monter</span>,{" "}
          <span className="fr">descendre</span>,{" "}
          <span className="fr">sortir</span> et{" "}
          <span className="fr">passer</span> prennent{" "}
          <span className="fr">avoir</span> quand un complément d’objet les
          suit : <span className="fr">je suis sorti</span> mais{" "}
          <span className="fr">j’ai sorti la poubelle</span>,{" "}
          <span className="fr">elle est montée</span> mais{" "}
          <span className="fr">elle a monté les valises</span>. Le sens change
          avec l’auxiliaire.
        </div>
      </section>

      <div className="resume">
        <h2>En résumé</h2>
        <ul>
          <li>
            Apprenez la liste de <span className="fr">être</span> : tout ce qui
            n’y est pas prend <span className="fr">avoir</span>.
          </li>
          <li>
            Cinq paires de contraires couvrent dix verbes ;{" "}
            <span className="fr">rester</span>,{" "}
            <span className="fr">tomber</span>,{" "}
            <span className="fr">passer</span> et{" "}
            <span className="fr">retourner</span> s’apprennent seuls.
          </li>
          <li>
            Tout verbe pronominal prend{" "}
            <span className="fr">être</span>, sans exception.
          </li>
          <li>
            Avec <span className="fr">être</span>, le participe s’accorde avec
            le sujet ; avec <span className="fr">avoir</span>, il ne bouge pas.
          </li>
          <li>
            <span className="fr">monter</span>,{" "}
            <span className="fr">descendre</span>,{" "}
            <span className="fr">sortir</span> et{" "}
            <span className="fr">passer</span> passent à{" "}
            <span className="fr">avoir</span> dès qu’un complément les suit.
          </li>
        </ul>
      </div>
    </article>
  );
}
