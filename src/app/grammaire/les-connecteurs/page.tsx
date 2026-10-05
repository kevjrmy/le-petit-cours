import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";

const PATH = "/grammaire/les-connecteurs";

export const metadata = lessonMetadata(PATH);

export default function Page() {
  return (
    <article className="prose">
      <PageHeader path={PATH} />

      <section>
        <h2>Raconter dans l’ordre</h2>

        <div className="rule">
          Un <strong>connecteur</strong> est un petit mot qui relie deux
          phrases. Pour raconter, quatre connecteurs donnent l’ordre des
          actions : <span className="fr">d’abord</span>,{" "}
          <span className="fr">ensuite</span>, <span className="fr">puis</span>
          , <span className="fr">enfin</span>.
        </div>

        <div className="table-wrap">
          <table>
            <caption>
              Quatre connecteurs pour dire quelle action vient avant l’autre
            </caption>
            <thead>
              <tr>
                <th scope="col">Connecteur</th>
                <th scope="col">Il annonce</th>
                <th scope="col">Exemple</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row" className="fr">
                  d’abord
                </th>
                <td>la première action</td>
                <td className="fr">D’abord, je prends une douche.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  ensuite
                </th>
                <td>l’action suivante</td>
                <td className="fr">Ensuite, je m’habille.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  puis
                </th>
                <td>l’action suivante aussi, en plus court</td>
                <td className="fr">Je bois un café, puis je sors.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  enfin
                </th>
                <td>la dernière action</td>
                <td className="fr">Enfin, je prends le bus.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p>
          <span className="fr">ensuite</span> et{" "}
          <span className="fr">puis</span> disent la même chose. Mais{" "}
          <span className="fr">puis</span> se place toujours avant l’action,
          jamais à la fin de la phrase : on dit{" "}
          <span className="fr">je sors ensuite</span>, on ne dit pas{" "}
          <s className="fr">je sors puis</s>.
        </p>

        <p>Sans connecteur, un récit est une liste.</p>

        <div className="example">
          Samedi, j’ai visité Tolède. J’ai pris le train de neuf heures. J’ai
          marché dans la vieille ville. J’ai déjeuné sur une petite place. J’ai
          repris le train à sept heures.
        </div>

        <p>Avec les quatre connecteurs, la liste devient une histoire.</p>

        <div className="example">
          Samedi, j’ai visité Tolède. <strong>D’abord</strong>, j’ai pris le
          train de neuf heures. <strong>Ensuite</strong>, j’ai marché dans la
          vieille ville, <strong>puis</strong> j’ai déjeuné sur une petite
          place. <strong>Enfin</strong>, j’ai repris le train à sept heures.
        </div>

        <div className="attention">
          <span className="fr">puis</span> veut dire{" "}
          <span className="fr">ensuite</span>, et rien d’autre. Il ne sert pas
          à commencer une réponse, ni à chercher ses mots. On ne dit pas{" "}
          <s className="fr">Puis, je ne sais pas</s>. On dit{" "}
          <span className="fr">Eh bien, je ne sais pas</span>.
        </div>
      </section>

      <section>
        <h2>Expliquer : la cause et la conséquence</h2>

        <div className="rule">
          Pour expliquer, on relie deux faits : une cause et sa conséquence.{" "}
          <span className="fr">parce que</span> et{" "}
          <span className="fr">comme</span> annoncent la cause.{" "}
          <span className="fr">donc</span> et{" "}
          <span className="fr">c’est pour ça que</span> annoncent la
          conséquence.
        </div>

        <div className="table-wrap">
          <table>
            <caption>
              Les deux mêmes faits, « il pleut » et « je reste à la maison »,
              reliés de quatre façons
            </caption>
            <thead>
              <tr>
                <th scope="col">Connecteur</th>
                <th scope="col">Il annonce</th>
                <th scope="col">Exemple</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row" className="fr">
                  parce que
                </th>
                <td>la cause</td>
                <td className="fr">Je reste à la maison parce qu’il pleut.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  comme
                </th>
                <td>la cause, au début de la phrase</td>
                <td className="fr">Comme il pleut, je reste à la maison.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  donc
                </th>
                <td>la conséquence</td>
                <td className="fr">Il pleut, donc je reste à la maison.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  c’est pour ça que
                </th>
                <td>la conséquence, surtout à l’oral</td>
                <td className="fr">
                  Il pleut. C’est pour ça que je reste à la maison.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p>
          Les quatre phrases racontent la même chose. Seul l’ordre change : avec{" "}
          <span className="fr">parce que</span>, la cause vient en deuxième ;
          avec <span className="fr">comme</span>, elle vient en premier. Devant
          une voyelle, <span className="fr">que</span> devient{" "}
          <span className="fr">qu’</span> :{" "}
          <span className="fr">parce qu’il pleut</span>,{" "}
          <span className="fr">c’est pour ça qu’elle reste</span>.
        </p>

        <p>Le récit de Tolède dit maintenant pourquoi.</p>

        <div className="example">
          Samedi, j’ai visité Tolède. D’abord, j’ai pris le train de neuf heures{" "}
          <strong>parce que</strong> je voulais arriver tôt. Ensuite, j’ai
          marché dans la vieille ville, puis j’ai déjeuné sur une petite place.{" "}
          <strong>Comme</strong> il faisait très chaud, j’ai choisi une table à
          l’ombre. L’après-midi, le musée était fermé, <strong>donc</strong>{" "}
          j’ai visité la cathédrale. Le soir, j’avais mal aux pieds.{" "}
          <strong>C’est pour ça que</strong> j’ai pris un taxi jusqu’à la gare.
          Enfin, j’ai repris le train à sept heures.
        </div>

        <div className="attention">
          <span className="fr">pourquoi</span> pose la question,{" "}
          <span className="fr">parce que</span> donne la réponse :{" "}
          <span className="fr">Pourquoi tu restes&nbsp;? Parce qu’il pleut.</span> On
          ne dit pas <s className="fr">Je reste pourquoi il pleut</s>.
        </div>
      </section>

      <section>
        <h2>Opposer deux idées</h2>

        <div className="rule">
          Pour nuancer, on oppose deux idées. Le connecteur le plus simple est{" "}
          <span className="fr">mais</span>.{" "}
          <span className="fr">pourtant</span>,{" "}
          <span className="fr">par contre</span> et{" "}
          <span className="fr">même si</span> sont plus précis.
        </div>

        <div className="table-wrap">
          <table>
            <caption>
              Ce que chaque connecteur dit de plus que « mais »
            </caption>
            <thead>
              <tr>
                <th scope="col">Connecteur</th>
                <th scope="col">Il annonce</th>
                <th scope="col">Exemple</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row" className="fr">
                  mais
                </th>
                <td>une idée opposée</td>
                <td className="fr">Il pleut, mais je sors.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  pourtant
                </th>
                <td>une surprise : on attendait le contraire</td>
                <td className="fr">
                  Il pleut. Pourtant, je sors sans parapluie.
                </td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  par contre
                </th>
                <td>une différence entre deux choses</td>
                <td className="fr">
                  Aujourd’hui, il pleut. Par contre, demain, il va faire beau.
                </td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  même si
                </th>
                <td>un obstacle qui ne change rien</td>
                <td className="fr">Je sors même s’il pleut.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p>
          Devant <span className="fr">il</span> et{" "}
          <span className="fr">ils</span>, <span className="fr">si</span>{" "}
          devient <span className="fr">s’</span> :{" "}
          <span className="fr">même s’il pleut</span>. Devant{" "}
          <span className="fr">elle</span> et <span className="fr">on</span>,
          il ne change pas : <span className="fr">même si elle dort</span>.
        </p>

        <div className="attention">
          <span className="fr">pourtant</span> n’annonce jamais une
          conséquence. Il annonce une surprise. On ne dit pas{" "}
          <s className="fr">Il pleut, pourtant je prends un parapluie</s>. On
          dit <span className="fr">Il pleut, donc je prends un parapluie</span>
          .
        </div>

        <p>
          Voici le récit complet. Les douze connecteurs de la leçon y sont.
        </p>

        <div className="example">
          Samedi, j’ai visité Tolède. La ville est petite,{" "}
          <strong>mais</strong> il y a beaucoup de choses à voir.{" "}
          <strong>D’abord</strong>, j’ai pris le train de neuf heures{" "}
          <strong>parce que</strong> je voulais arriver tôt.{" "}
          <strong>Ensuite</strong>, j’ai marché dans la vieille ville,{" "}
          <strong>puis</strong> j’ai déjeuné sur une petite place.{" "}
          <strong>Comme</strong> il faisait très chaud, j’ai choisi une table à
          l’ombre. Le repas était simple. <strong>Pourtant</strong>, il était
          cher. L’après-midi, le musée était fermé, <strong>donc</strong> j’ai
          visité la cathédrale. Je n’ai pas aimé le restaurant.{" "}
          <strong>Par contre</strong>, j’ai adoré la cathédrale. Le soir,
          j’avais mal aux pieds. <strong>C’est pour ça que</strong> j’ai pris un
          taxi jusqu’à la gare. <strong>Enfin</strong>, j’ai repris le train à
          sept heures. Je veux retourner à Tolède, <strong>même s’</strong>il
          fait très chaud en été.
        </div>
      </section>

      <div className="resume">
        <h2>En résumé</h2>
        <ul>
          <li>
            Pour raconter dans l’ordre : <span className="fr">d’abord</span>,{" "}
            <span className="fr">ensuite</span>,{" "}
            <span className="fr">puis</span>, <span className="fr">enfin</span>
            .
          </li>
          <li>
            Pour donner la cause : <span className="fr">parce que</span>,{" "}
            <span className="fr">comme</span>. Pour donner la conséquence :{" "}
            <span className="fr">donc</span>,{" "}
            <span className="fr">c’est pour ça que</span>.
          </li>
          <li>
            Pour opposer deux idées : <span className="fr">mais</span>,{" "}
            <span className="fr">pourtant</span>,{" "}
            <span className="fr">par contre</span>,{" "}
            <span className="fr">même si</span>.
          </li>
          <li>
            <span className="fr">puis</span> veut dire{" "}
            <span className="fr">ensuite</span>, et{" "}
            <span className="fr">pourquoi</span> pose la question :{" "}
            <span className="fr">parce que</span> donne la réponse.
          </li>
          <li>
            <span className="fr">pourtant</span> marque une surprise, jamais
            une conséquence.
          </li>
        </ul>
      </div>
    </article>
  );
}
