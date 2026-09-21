import Link from "next/link";
import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";

const PATH = "/grammaire/les-pronoms-demonstratifs";

export const metadata = lessonMetadata(PATH);

export default function Page() {
  return (
    <article className="prose">
      <PageHeader path={PATH} />

      <section>
        <h2>Quatre formes, et jamais toutes seules</h2>

        <div className="rule">
          Le pronom démonstratif remplace un nom déjà dit, pour ne pas le
          répéter. Il s’accorde avec ce nom, et il ne reste jamais seul : il
          faut toujours quelque chose derrière lui.
        </div>

        <div className="table-wrap">
          <table>
            <caption>Les quatre formes, et le nom que chacune remplace</caption>
            <thead>
              <tr>
                <th scope="col">Le nom remplacé</th>
                <th scope="col">Le pronom</th>
                <th scope="col">Exemple</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">masculin singulier</th>
                <td className="fr">celui</td>
                <td className="fr">Quel gâteau ? Celui-là.</td>
              </tr>
              <tr>
                <th scope="row">féminin singulier</th>
                <td className="fr">celle</td>
                <td className="fr">Ma voiture est celle de gauche.</td>
              </tr>
              <tr>
                <th scope="row">masculin pluriel</th>
                <td className="fr">ceux</td>
                <td className="fr">Ces livres ? Ceux-là sont à moi.</td>
              </tr>
              <tr>
                <th scope="row">féminin pluriel</th>
                <td className="fr">celles</td>
                <td className="fr">Mes clés sont celles du tiroir.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="attention">
          <span className="fr">celui</span> ne vit jamais seul. On ne dit pas{" "}
          <span className="fr">je prends celui</span>. Il faut une suite, et il
          n’y en a que trois : <span className="fr">-ci</span> ou{" "}
          <span className="fr">-là</span>, <span className="fr">de</span> et un
          nom, ou une phrase qui commence par{" "}
          <span className="fr">qui</span> ou <span className="fr">que</span>.
        </div>

        <p>
          Le genre vient du nom remplacé, pas de la chose montrée du doigt. Si
          le mot était <span className="fr">une écharpe</span>, le pronom est{" "}
          <span className="fr">celle</span>, même si la personne qui parle tient
          déjà l’objet dans la main.
        </p>
      </section>

      <section>
        <h2>celui-ci, celui-là : choisir entre deux</h2>

        <div className="rule">
          Avec <strong>-ci</strong> et <strong>-là</strong>, le pronom montre.
          Il sert à choisir entre deux choses qu’on vient de nommer :{" "}
          <span className="fr">-ci</span> pour la plus proche,{" "}
          <span className="fr">-là</span> pour l’autre.
        </div>

        <div className="example">
          Ces deux manteaux me plaisent. <strong>Celui-ci</strong> est plus
          chaud, mais <strong>celui-là</strong> est moins cher.
          <br />
          Vous préférez quelle chambre ? <strong>Celle-là</strong>, avec la
          fenêtre.
        </div>

        <p>
          Le trait d’union est obligatoire, comme après le nom dans{" "}
          <Link href="/grammaire/les-determinants-demonstratifs">
            Les déterminants démonstratifs
          </Link>
          . La différence est simple à voir : le déterminant garde son nom
          derrière lui, le pronom l’a remplacé.
        </p>

        <div className="example">
          <strong>ce pull-là</strong> est trop grand. · Le rouge ? Non,{" "}
          <strong>celui-là</strong>.
        </div>

        <div className="astuce">
          <p className="astuce-hook">
            Dans un magasin, <strong>celui-là</strong> et{" "}
            <strong>celle-là</strong> suffisent à tout acheter.
          </p>
          <p>
            Le vendeur a nommé l’objet, vous n’avez plus qu’à le reprendre au
            bon genre : <span className="fr">je prends celui-là</span> pour un
            pull, <span className="fr">je prends celle-là</span> pour une
            écharpe. C’est la phrase la plus utile de cette leçon.
          </p>
        </div>
      </section>

      <section>
        <h2>celui de, celui qui : dire lequel</h2>

        <div className="rule">
          Pour dire à qui la chose appartient, ou d’où elle vient, on met{" "}
          <strong>de</strong> après le pronom. Pour la décrire, on met une
          phrase qui commence par <strong>qui</strong> ou{" "}
          <strong>que</strong>.
        </div>

        <div className="example">
          Mon vélo est <strong>celui de</strong> mon frère.
          <br />
          Prends <strong>celle qui</strong> est sur la table.
          <br />
          La photo que je préfère, c’est <strong>celle du</strong> mariage.
        </div>

        <p>
          <span className="fr">de</span> se contracte devant{" "}
          <span className="fr">le</span> et <span className="fr">les</span>,
          comme partout ailleurs :{" "}
          <span className="fr">celui du voisin</span>,{" "}
          <span className="fr">celles des enfants</span>.
        </p>

        <div className="table-wrap">
          <table>
            <caption>Les trois suites possibles, sur un même nom</caption>
            <thead>
              <tr>
                <th scope="col">La suite</th>
                <th scope="col">Ce qu’elle dit</th>
                <th scope="col">Exemple</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row" className="fr">
                  -ci / -là
                </th>
                <td>on le montre</td>
                <td className="fr">Ce sac ? Celui-là.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  de
                </th>
                <td>on dit à qui il est</td>
                <td className="fr">C’est celui de Marie.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  qui / que
                </th>
                <td>on le décrit</td>
                <td className="fr">C’est celui qui coûte le moins cher.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="attention">
          dans <span className="fr">celui qui</span>, le verbe qui suit s’accorde
          avec le pronom, donc avec le nom remplacé :{" "}
          <span className="fr">ceux qui arrivent en retard attendent</span>,{" "}
          <span className="fr">celle qui est sur la table est à moi</span>.
        </div>

        <div className="exception">
          quand la chose n’a pas de nom, parce qu’il s’agit d’une idée ou de
          toute une phrase, le pronom n’est ni{" "}
          <span className="fr">celui</span> ni <span className="fr">celle</span>{" "}
          mais <span className="fr">ce</span> :{" "}
          <span className="fr">ce qui compte, c’est d’essayer</span>. C’est la
          suite de cette leçon, dans{" "}
          <Link href="/grammaire/ce-qui-ce-que-ce-dont">
            Ce qui, ce que, ce dont
          </Link>
          .
        </div>
      </section>

      <div className="resume">
        <h2>En résumé</h2>
        <ul>
          <li>
            Quatre formes, accordées avec le nom remplacé :{" "}
            <span className="fr">celui</span>, <span className="fr">celle</span>
            , <span className="fr">ceux</span>,{" "}
            <span className="fr">celles</span>.
          </li>
          <li>
            Le pronom ne reste jamais seul : il faut{" "}
            <span className="fr">-ci</span> ou <span className="fr">-là</span>,{" "}
            <span className="fr">de</span> et un nom, ou{" "}
            <span className="fr">qui</span> et une phrase.
          </li>
          <li>
            <span className="fr">celui-là</span> montre et choisit ;{" "}
            <span className="fr">celui de</span> dit à qui la chose est ;{" "}
            <span className="fr">celui qui</span> la décrit.
          </li>
          <li>
            Le déterminant garde son nom derrière lui, le pronom l’a remplacé :{" "}
            <span className="fr">ce pull-là</span> contre{" "}
            <span className="fr">celui-là</span>.
          </li>
          <li>
            Pour une idée sans nom, le pronom est{" "}
            <span className="fr">ce</span>, pas{" "}
            <span className="fr">celui</span>.
          </li>
        </ul>
      </div>
    </article>
  );
}
