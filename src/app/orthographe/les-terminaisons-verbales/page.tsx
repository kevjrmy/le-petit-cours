import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";

const PATH = "/orthographe/les-terminaisons-verbales";

export const metadata = lessonMetadata(PATH);

export default function Page() {
  return (
    <article className="prose">
      <PageHeader path={PATH} />

      <section>
        <h2>Le même son, trois terminaisons</h2>

        <div className="rule">
          À la fin d’un verbe du premier groupe, un seul son sert à trois
          emplois : l’infinitif, le participe passé, le <span className="fr">vous</span> du
          présent. L’oreille entend la même chose dans les trois cas, donc elle
          ne peut pas choisir. C’est le rôle du verbe dans la phrase qui
          décide de l’orthographe.
        </div>

        <p>
          Le repère le plus sûr est un remplacement. On prend un verbe du
          deuxième ou du troisième groupe dont l’infinitif et le participe
          passé ne se prononcent pas pareil, par exemple{" "}
          <span className="fr">mordre</span> et{" "}
          <span className="fr">mordu</span>, et on le met à la place du
          verbe qui pose problème. La phrase garde son sens, et la
          terminaison, elle, s’entend enfin.
        </p>

        <div className="table-wrap">
          <table>
            <caption>
              Le remplacement par « mordre » qui décide de la terminaison
            </caption>
            <thead>
              <tr>
                <th scope="col">Rôle du verbe</th>
                <th scope="col">On écrit</th>
                <th scope="col">Remplacez par « mordre »</th>
                <th scope="col">Exemple</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">
                  infinitif, après un verbe conjugué ou une préposition
                </th>
                <td className="fr">-er</td>
                <td className="fr">il va mordre → il va manger</td>
                <td className="fr">Il va manger avant de sortir.</td>
              </tr>
              <tr>
                <th scope="row">
                  participe passé, après avoir ou être (avec être, il
                  s’accorde : elle est allée)
                </th>
                <td className="fr">-é</td>
                <td className="fr">il a mordu → il a mangé</td>
                <td className="fr">Il a mangé toute la pizza.</td>
              </tr>
              <tr>
                <th scope="row">vous, au présent</th>
                <td className="fr">-ez</td>
                <td className="fr">vous mordez → vous mangez</td>
                <td className="fr">Vous mangez avec nous ce soir ?</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="example">
          On n’écrit pas <span className="fr">« j’ai manger »</span>, on écrit{" "}
          <span className="fr">« j’ai mangé »</span>.
          <br />
          On n’écrit pas <span className="fr">« il va mangé »</span>, on
          écrit <span className="fr">« il va manger »</span>.
          <br />
          On n’écrit pas <span className="fr">« vous mangé »</span>, on écrit{" "}
          <span className="fr">« vous mangez »</span>.
        </div>

        <div className="exception">
          un verbe du premier groupe ne peut pas servir de remplacement :{" "}
          <span className="fr">chanter</span> et{" "}
          <span className="fr">chanté</span> se prononcent pareil, eux aussi,
          et ne tranchent rien. Choisissez toujours un verbe du deuxième ou du
          troisième groupe, comme <span className="fr">mordre / mordu</span>{" "}
          ou <span className="fr">finir / fini</span>.
        </div>
      </section>

      <section>
        <h2>Un autre son : -ais et -ait à l’imparfait</h2>

        <div className="rule">
          <span className="fr">-ais</span> et <span className="fr">-ait</span>{" "}
          n’ont pas le même son que <span className="fr">-é</span> : la
          bouche s’ouvre davantage, comme dans{" "}
          <span className="fr">après</span> plutôt que comme dans{" "}
          <span className="fr">café</span>. Mais chez beaucoup de gens,
          cette différence s’efface à l’oreille, et c’est là que{" "}
          <span className="fr">« je mangé »</span> s’écrit à la place de{" "}
          <span className="fr">« je mangeais »</span>.
        </div>

        <p>
          Ce n’est pas un participe : c’est le verbe lui-même, conjugué, sans
          avoir ni être devant. <span className="fr">-ais</span> suit{" "}
          <span className="fr">je</span> et <span className="fr">tu</span>,{" "}
          <span className="fr">-ait</span> suit <span className="fr">il</span>
          , <span className="fr">elle</span> et <span className="fr">on</span>
          .
        </p>

        <div className="table-wrap">
          <table>
            <caption>La terminaison de l’imparfait selon le sujet</caption>
            <thead>
              <tr>
                <th scope="col">Sujet</th>
                <th scope="col">Terminaison</th>
                <th scope="col">Exemple</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row" className="fr">
                  je, tu
                </th>
                <td className="fr">-ais</td>
                <td className="fr">
                  Je regardais la télévision tous les soirs.
                </td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  il, elle, on
                </th>
                <td className="fr">-ait</td>
                <td className="fr">
                  Il habitait à Madrid quand il était petit.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p>
          Un repère de temps aide aussi à choisir entre les deux terminaisons.
          <span className="fr"> hier</span>,{" "}
          <span className="fr">un jour</span>,{" "}
          <span className="fr">tout à coup</span> annoncent une action
          unique, terminée : c’est le passé composé, avec{" "}
          <span className="fr">avoir</span> ou <span className="fr">être</span>{" "}
          devant le participe en <span className="fr">-é</span>.{" "}
          <span className="fr">tous les jours</span>,{" "}
          <span className="fr">souvent</span>,{" "}
          <span className="fr">quand j’étais petit</span> annoncent une
          habitude : c’est <span className="fr">-ais</span> ou{" "}
          <span className="fr">-ait</span>.
        </p>

        <div className="example">
          Hier, j’ai mangé chez ma tante. → une seule fois : -é
          <br />
          Quand j’étais petite, je mangeais chez ma tante tous les dimanches.
          → une habitude : -ais
        </div>

        <div className="astuce">
          <p className="astuce-hook">Avec « nous », les deux temps s’entendent.</p>
          <p>
            Sans repère de temps, remplacez le sujet par{" "}
            <span className="fr">nous</span>. Si le verbe se termine par{" "}
            <span className="fr">-ions</span> (<span className="fr">
              nous mangions
            </span>
            ), c’est l’imparfait. S’il faut{" "}
            <span className="fr">avons</span> ou{" "}
            <span className="fr">sommes</span> devant le participe (
            <span className="fr">nous avons mangé</span>), c’est le passé
            composé. À la première personne du pluriel, les deux s’entendent
            très bien, même quand <span className="fr">-ais</span> et{" "}
            <span className="fr">-é</span> se ressemblent.
          </p>
        </div>

        <div className="attention">
          à l’imparfait, la terminaison ne s’écrit jamais{" "}
          <span className="fr">-é</span> : <span className="fr">
            « je mangé »
          </span>{" "}
          n’existe pas, seul <span className="fr">« je mangeais »</span> est
          correct. Et le participe en <span className="fr">-é</span> ne
          s’écrit jamais seul, comme un verbe conjugué :{" "}
          <span className="fr">« il mangé »</span> n’existe pas non plus, il
          faut <span className="fr">« il a mangé »</span> ou{" "}
          <span className="fr">« il mangeait »</span>, selon ce que la phrase
          raconte.
        </div>
      </section>

      <div className="resume">
        <h2>En résumé</h2>
        <ul>
          <li>
            À la fin d’un verbe du premier groupe,{" "}
            <span className="fr">-er</span>, <span className="fr">-é</span>{" "}
            et <span className="fr">-ez</span> se prononcent pareil : c’est le
            rôle du verbe dans la phrase qui décide de l’orthographe, jamais
            l’oreille.
          </li>
          <li>
            Le test : remplacer le verbe par un verbe comme{" "}
            <span className="fr">mordre</span>, dont l’infinitif et le
            participe se prononcent différemment.{" "}
            <span className="fr">-er</span> si{" "}
            <span className="fr">mordre</span> convient,{" "}
            <span className="fr">-é</span> si{" "}
            <span className="fr">mordu</span> convient,{" "}
            <span className="fr">-ez</span> si{" "}
            <span className="fr">mordez</span> convient.
          </li>
          <li>
            <span className="fr">-ais</span> (<span className="fr">je</span>,{" "}
            <span className="fr">tu</span>) et{" "}
            <span className="fr">-ait</span> (<span className="fr">
              il, elle, on
            </span>
            ) sont l’imparfait : un verbe conjugué seul, jamais un participe,
            pour une habitude.
          </li>
          <li>
            Un repère de temps aide à choisir :{" "}
            <span className="fr">hier</span>,{" "}
            <span className="fr">un jour</span> pour le passé composé,{" "}
            <span className="fr">tous les jours</span>,{" "}
            <span className="fr">souvent</span> pour l’imparfait.
          </li>
          <li>
            Sans repère de temps, remplacer le sujet par{" "}
            <span className="fr">nous</span> :{" "}
            <span className="fr">-ions</span>, c’est l’imparfait ;{" "}
            <span className="fr">avons</span> ou{" "}
            <span className="fr">sommes</span> devant le participe, c’est le
            passé composé.
          </li>
        </ul>
      </div>
    </article>
  );
}
