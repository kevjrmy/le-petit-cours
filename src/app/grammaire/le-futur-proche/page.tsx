import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";

const PATH = "/grammaire/le-futur-proche";

export const metadata = lessonMetadata(PATH);

export default function Page() {
  return (
    <article className="prose">
      <PageHeader path={PATH} />

      <section>
        <h2>Le verbe « aller », puis l’infinitif</h2>

        <div className="rule">
          Le futur proche se construit avec{" "}
          <span className="fr">aller</span> au présent, suivi du verbe à{" "}
          <strong>l’infinitif</strong>. Les deux verbes se touchent : il n’y a
          rien entre eux.
        </div>

        <div className="attention">
          on écrit <span className="fr">je vais manger</span>, jamais{" "}
          <span className="fr">je vais à manger</span>. Aucune préposition ne
          sépare <span className="fr">aller</span> de l’infinitif. C’est la
          faute la plus fréquente sur ce temps, et la seule chose à surveiller.
        </div>

        <div className="table-wrap">
          <table>
            <caption>
              Le futur proche, personne par personne, avec des verbes différents
            </caption>
            <thead>
              <tr>
                <th scope="col">Sujet</th>
                <th scope="col">aller</th>
                <th scope="col">Infinitif</th>
                <th scope="col">Exemple</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row" className="fr">
                  je
                </th>
                <td className="fr">vais</td>
                <td className="fr">parler</td>
                <td className="fr">Je vais parler au directeur.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  tu
                </th>
                <td className="fr">vas</td>
                <td className="fr">finir</td>
                <td className="fr">Tu vas finir avant midi ?</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  il / elle / on
                </th>
                <td className="fr">va</td>
                <td className="fr">partir</td>
                <td className="fr">Le train va partir.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  nous
                </th>
                <td className="fr">allons</td>
                <td className="fr">manger</td>
                <td className="fr">Nous allons manger à huit heures.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  vous
                </th>
                <td className="fr">allez</td>
                <td className="fr">prendre</td>
                <td className="fr">Vous allez prendre un dessert ?</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  ils / elles
                </th>
                <td className="fr">vont</td>
                <td className="fr">venir</td>
                <td className="fr">Elles vont venir dimanche.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="exception">
          quand le verbe à l’infinitif est justement{" "}
          <span className="fr">aller</span>, on le répète :{" "}
          <span className="fr">je vais aller à la gare</span>. La phrase paraît
          lourde, elle est correcte, et c’est ce que tout le monde dit.
        </div>
      </section>

      <section>
        <h2>La négation et les pronoms</h2>

        <div className="rule">
          Le verbe conjugué de la phrase, c’est{" "}
          <span className="fr">aller</span>. C’est donc lui, et lui seul, que{" "}
          <span className="fr">ne … pas</span> encadre. L’infinitif reste
          dehors, après <span className="fr">pas</span>.
        </div>

        <div className="example">
          Je <strong>ne</strong> vais <strong>pas</strong> travailler demain.
          <br />
          Ils <strong>ne</strong> vont <strong>pas</strong> venir.
          <br />
          On <strong>ne</strong> va <strong>pas</strong> rester longtemps.
        </div>

        <p>
          Un pronom, lui, ne se place pas au même endroit : il se colle à
          l’infinitif, parce que c’est l’infinitif qui le gouverne.
        </p>

        <div className="table-wrap">
          <table>
            <caption>Où se met le pronom dans une phrase au futur proche</caption>
            <thead>
              <tr>
                <th scope="col">Type de pronom</th>
                <th scope="col">Sa place</th>
                <th scope="col">Exemple</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">réfléchi</th>
                <td>devant l’infinitif</td>
                <td className="fr">Je vais me coucher tôt.</td>
              </tr>
              <tr>
                <th scope="row">objet direct</th>
                <td>devant l’infinitif</td>
                <td className="fr">Ce livre ? Je vais le lire ce soir.</td>
              </tr>
              <tr>
                <th scope="row">objet indirect</th>
                <td>devant l’infinitif</td>
                <td className="fr">Je vais lui téléphoner demain.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="attention">
          le pronom ne se met jamais devant{" "}
          <span className="fr">aller</span>. On écrit{" "}
          <span className="fr">tu vas te laver</span>, jamais{" "}
          <span className="fr">tu te vas laver</span>. Et quand la phrase est
          négative, le pronom reste avec son infinitif, donc derrière{" "}
          <span className="fr">pas</span> :{" "}
          <span className="fr">je ne vais pas me coucher</span>.
        </div>
      </section>

      <section>
        <h2>Quand on l’emploie</h2>

        <p>
          Le futur proche dit ce qui va arriver bientôt, ou ce qui est déjà
          décidé. C’est le futur de la conversation : dans une journée ordinaire,
          on l’emploie presque tout le temps.
        </p>

        <div className="example">
          Attention, tu <strong>vas tomber</strong> ! · Je{" "}
          <strong>vais chercher</strong> les enfants dans dix minutes. · On{" "}
          <strong>va déménager</strong> le mois prochain.
        </div>

        <p>
          Les mots qui l’accompagnent disent la même chose que lui :{" "}
          <span className="fr">tout de suite</span>,{" "}
          <span className="fr">dans cinq minutes</span>,{" "}
          <span className="fr">ce soir</span>,{" "}
          <span className="fr">demain</span>,{" "}
          <span className="fr">la semaine prochaine</span>.
        </p>

        <div className="astuce">
          <p className="astuce-hook">
            Deux verbes que vous connaissez déjà, et le futur est fait.
          </p>
          <p>
            Le futur simple demande un radical par verbe :{" "}
            <span className="fr">je ferai</span>,{" "}
            <span className="fr">je viendrai</span>,{" "}
            <span className="fr">je pourrai</span>. Le futur proche n’en demande
            aucun. Si vous savez conjuguer{" "}
            <span className="fr">aller</span> au présent, vous pouvez mettre
            n’importe quel verbe au futur, sans rien apprendre de plus.
            Servez-vous-en pendant que vous apprenez l’autre.
          </p>
        </div>
      </section>

      <div className="resume">
        <h2>En résumé</h2>
        <ul>
          <li>
            <span className="fr">aller</span> au présent, puis l’infinitif, et
            rien entre les deux.
          </li>
          <li>
            <span className="fr">ne … pas</span> encadre{" "}
            <span className="fr">aller</span> seul ; l’infinitif se met après{" "}
            <span className="fr">pas</span>.
          </li>
          <li>
            Le pronom se colle à l’infinitif :{" "}
            <span className="fr">je vais me coucher</span>,{" "}
            <span className="fr">je vais le lire</span>.
          </li>
          <li>
            Il dit ce qui arrive bientôt ou ce qui est décidé, et va avec{" "}
            <span className="fr">ce soir</span>,{" "}
            <span className="fr">demain</span>,{" "}
            <span className="fr">la semaine prochaine</span>.
          </li>
          <li>
            Il ne demande aucun radical nouveau : c’est le futur le plus rapide
            à produire.
          </li>
        </ul>
      </div>
    </article>
  );
}
