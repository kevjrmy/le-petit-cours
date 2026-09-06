import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";

const PATH = "/vocabulaire/l-heure";

export const metadata = lessonMetadata(PATH);

export default function Page() {
  return (
    <article className="prose">
      <PageHeader path={PATH} />

      <section>
        <h2>Quelle heure est-il ?</h2>

        <div className="rule">
          On répond avec <span className="fr">il est</span>, puis le nombre,
          puis le mot <span className="fr">heure</span> ou{" "}
          <span className="fr">heures</span> — qui ne se supprime jamais.
        </div>

        <div className="example">
          Il est une heure. · Il est trois heures. · Il est midi. · Il est
          minuit.
        </div>

        <div className="attention">
          <span className="fr">heure</span> est un nom, et il s’accorde : une{" "}
          <strong>heure</strong>, deux <strong>heures</strong>. On ne dit ni{" "}
          <span className="fr">il est trois</span>, ni{" "}
          <span className="fr">il est une heures</span>.
        </div>

        <h3>Les minutes</h3>

        <div className="table-wrap">
          <table>
            <caption>Dire les minutes après et avant l’heure</caption>
            <thead>
              <tr>
                <th scope="col">Heure</th>
                <th scope="col">On dit</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">8 h 05</th>
                <td className="fr">huit heures cinq</td>
              </tr>
              <tr>
                <th scope="row">8 h 15</th>
                <td className="fr">huit heures et quart</td>
              </tr>
              <tr>
                <th scope="row">8 h 30</th>
                <td className="fr">huit heures et demie</td>
              </tr>
              <tr>
                <th scope="row">8 h 45</th>
                <td className="fr">neuf heures moins le quart</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="rule">
          Après la demie, on annonce <strong>l’heure suivante</strong> et on
          retire les minutes qui manquent, avec{" "}
          <span className="fr">moins</span>.
        </div>

        <div className="example">
          10 h 40 → onze heures moins vingt · 17 h 50 → six heures moins dix
        </div>

        <div className="exception">
          <span className="fr">midi</span> et{" "}
          <span className="fr">minuit</span> sont masculins, donc la demie perd
          son <span className="fr">-e</span> :{" "}
          <span className="fr">midi et demi</span>,{" "}
          <span className="fr">minuit et demi</span> — mais{" "}
          <span className="fr">une heure et demie</span>.
        </div>
      </section>

      <section>
        <h2>L’heure officielle</h2>

        <p>
          Les horaires écrits — trains, cinémas, rendez-vous, magasins —
          utilisent les vingt-quatre heures, avec les minutes dites en entier.
          C’est la forme qu’on lit ; celle de la section précédente est celle
          qu’on parle.
        </p>

        <div className="table-wrap">
          <table>
            <caption>La même heure, à l’écrit et à l’oral</caption>
            <thead>
              <tr>
                <th scope="col">Écrit</th>
                <th scope="col">Officiel</th>
                <th scope="col">Courant</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">13 h 30</th>
                <td className="fr">treize heures trente</td>
                <td className="fr">une heure et demie</td>
              </tr>
              <tr>
                <th scope="row">18 h 15</th>
                <td className="fr">dix-huit heures quinze</td>
                <td className="fr">six heures et quart</td>
              </tr>
              <tr>
                <th scope="row">21 h 45</th>
                <td className="fr">vingt et une heures quarante-cinq</td>
                <td className="fr">dix heures moins le quart</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="attention">
          on écrit <span className="fr">14 h 30</span> avec un{" "}
          <span className="fr">h</span> minuscule et des espaces, jamais avec
          deux points. Et l’heure officielle ne prend ni{" "}
          <span className="fr">et quart</span> ni{" "}
          <span className="fr">moins le quart</span> : ces expressions
          appartiennent à l’oral.
        </div>
      </section>

      <section>
        <h2>Situer un moment dans la journée</h2>

        <div className="table-wrap">
          <table>
            <caption>Les moments de la journée et leur usage</caption>
            <thead>
              <tr>
                <th scope="col">Moment</th>
                <th scope="col">Exemple</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row" className="fr">
                  le matin
                </th>
                <td className="fr">Je travaille le matin.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  l’après-midi
                </th>
                <td className="fr">On se voit cet après-midi ?</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  le soir
                </th>
                <td className="fr">Le soir, je lis.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  la nuit
                </th>
                <td className="fr">Il a plu toute la nuit.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="rule">
          Pour préciser une heure du matin ou du soir, on ajoute{" "}
          <span className="fr">du matin</span>,{" "}
          <span className="fr">de l’après-midi</span> ou{" "}
          <span className="fr">du soir</span> après l’heure.
        </div>

        <div className="example">
          Il est sept heures du matin. · Rendez-vous à huit heures du soir.
        </div>

        <div className="astuce">
          <p className="astuce-hook">
            « À quelle heure ? » demande la préposition « à »
          </p>
          <p>
            <span className="fr">Quelle heure est-il ?</span> demande l’heure
            qu’il est ; <span className="fr">À quelle heure ?</span> demande le
            moment d’un rendez-vous, et la réponse garde le{" "}
            <span className="fr">à</span> :{" "}
            <span className="fr">À neuf heures.</span> Oublier ce{" "}
            <span className="fr">à</span> est l’erreur la plus fréquente en
            fixant un rendez-vous.
          </p>
        </div>
      </section>
    </article>
  );
}
